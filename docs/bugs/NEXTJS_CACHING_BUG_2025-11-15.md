# Critical Next.js Caching Bug - November 15, 2025

## ⚠️ SEVERITY: CRITICAL

**Status**: RESOLVED
**Date Discovered**: November 15, 2025
**Time to Resolution**: ~3 hours, 7+ fix attempts
**Impact**: Product names displaying incorrect data from stale cache despite database corrections

---

## 🐛 Bug Summary

Next.js was serving stale static content on the `/reviews` page despite:
- ✅ Database having correct data
- ✅ Using `export const dynamic = 'force-dynamic'`
- ✅ Multiple rebuilds and redeployments
- ✅ Clearing browser cache
- ✅ Vercel "Clear Build Cache" redeployments

The page was pre-rendering at build time and serving static content, ignoring the `force-dynamic` directive.

---

## 💥 Symptoms

### What We Saw
1. **Product names on `/reviews` page had formatting issues:**
   - John Boos: `24x18x1.75\` (escaped backslash visible)
   - Bodum: `Bodum chambord french press` (lowercase)
   - Norton: `Norton im200 tri stone sharpener` (lowercase)

2. **Database had correct data:**
   ```
   John Boos: "John Boos Platinum Commercial Series... 24x18x1.75"" ✅
   Bodum: "Bodum Chambord French Press" ✅
   Norton: "Norton IM200 Tri Stone Sharpener" ✅
   ```

3. **Page configuration looked correct:**
   ```typescript
   export const dynamic = 'force-dynamic'
   ```

4. **Build output showed static generation:**
   ```
   ├ ○ /reviews    2.5 kB    210 kB
   ```
   The `○` symbol = Static (PROBLEM!)

---

## 🔍 Investigation Process

### Failed Fix Attempts (7+ iterations)

1. **Attempt 1-3**: Updated database records multiple times
   - **Result**: Database showed correct data, but page still wrong ❌

2. **Attempt 4-5**: Rebuilt and redeployed multiple times
   - **Result**: Same stale data served ❌

3. **Attempt 6**: User redeployed Vercel with "Clear Build Cache"
   - **Result**: Still served stale data ❌

4. **Attempt 7**: User cleared ALL browser history and cache
   - **Result**: Still showed wrong data ❌

### The Diagnosis

We discovered that despite `export const dynamic = 'force-dynamic'`, Next.js 14.2.32 was:
1. Fetching data from Supabase **during build time**
2. Baking that data into **static HTML**
3. Serving the static HTML on **every request**
4. **Ignoring** the `force-dynamic` directive

The database had been corrected, but the static build from *before* the database fix was still being served.

---

## ✅ The Fix

### Code Changes

**File**: `app/reviews/page.tsx`

```typescript
// BEFORE (BROKEN)
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'All Equipment Reviews: 37 Products Chef-Tested In Restaurants',
  description: '...',
}
```

```typescript
// AFTER (FIXED)
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Never cache - always fetch fresh data
export const fetchCache = 'force-no-store' // Force fresh fetch, no store

export const metadata = {
  title: 'All Equipment Reviews: 37 Products Chef-Tested In Restaurants',
  description: '...',
}
```

### Build Output After Fix

```
├ ƒ /reviews    2.5 kB    210 kB
```

The `ƒ` symbol = **Dynamic** (server-rendered on demand) ✅

---

## 🎯 Root Cause Analysis

### Why `force-dynamic` Alone Didn't Work

In Next.js 14.2.32 App Router:

1. **`export const dynamic = 'force-dynamic'`** tells Next.js to render the page dynamically
   - BUT it can still cache the data fetches
   - BUT it can still pre-render if all data is available at build time

2. **Without explicit cache directives**, Next.js will:
   - Fetch data during build if possible
   - Cache the results
   - Pre-render the page
   - Serve static HTML

3. **The fix requires BOTH:**
   ```typescript
   export const dynamic = 'force-dynamic'  // Don't pre-render
   export const revalidate = 0             // Don't cache (no ISR)
   export const fetchCache = 'force-no-store' // Force fresh fetches
   ```

### Why Multiple Rebuilds Didn't Help

Each rebuild would:
1. Connect to Supabase (which had correct data)
2. Fetch product data
3. **Pre-render the page with that data**
4. Deploy the static HTML

The problem wasn't the data source - it was that Next.js kept converting it to static HTML.

---

## 📋 Prevention Checklist

### For Dynamic Data Pages

When creating pages that should ALWAYS fetch fresh data:

```typescript
// ✅ CORRECT - Truly dynamic page
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function MyPage() {
  // This will ALWAYS fetch fresh data
  const data = await getDataFromDatabase()
  return <div>{data}</div>
}
```

### Verify Dynamic Rendering

After `npm run build`, check the output:

```bash
# GOOD - Dynamic rendering
├ ƒ /reviews    2.5 kB    210 kB

# BAD - Static pre-rendering (will cache data!)
├ ○ /reviews    2.5 kB    210 kB
```

### Testing Dynamic Pages

1. **Update database directly** (not through the app)
2. **Hard refresh the page** (Cmd+Shift+R / Ctrl+F5)
3. **Verify changes appear immediately**

If changes don't appear, the page is being cached somewhere.

---

## 🚨 Red Flags to Watch For

### Symptoms that indicate caching issues:

1. ✅ **Database has correct data**
2. ✅ **Multiple rebuilds deployed**
3. ✅ **Browser cache cleared**
4. ❌ **Page still shows old data**

### The telltale sign:

```bash
npm run build
# Look for the route in output
├ ○ /my-dynamic-page   # ← WARNING: Static! Should be ƒ
```

If you see `○` for a page that should be dynamic, add cache-busting directives.

---

## 📚 Related Next.js Concepts

### Rendering Modes

| Symbol | Mode | Behavior |
|--------|------|----------|
| `○` | Static | Pre-rendered at build time, serves HTML |
| `ƒ` | Dynamic | Server-rendered on each request |
| `◐` | SSG + ISR | Static with periodic regeneration |

### Cache Control Exports

```typescript
// Tell Next.js HOW to render
export const dynamic = 'force-dynamic' | 'force-static' | 'auto'

// Tell Next.js WHEN to revalidate (ISR)
export const revalidate = 3600  // seconds (1 hour)
export const revalidate = 0     // never cache (always fresh)
export const revalidate = false // cache forever

// Tell Next.js HOW to fetch data
export const fetchCache = 'auto' | 'default-cache' | 'only-cache' |
                          'force-cache' | 'default-no-store' | 'only-no-store' |
                          'force-no-store'
```

### The Nuclear Option (Always Fresh)

```typescript
export const dynamic = 'force-dynamic'  // Don't pre-render
export const revalidate = 0             // No ISR caching
export const fetchCache = 'force-no-store' // No fetch caching
export const runtime = 'nodejs'          // Use Node.js runtime (not Edge)
```

---

## 🔗 References

- [Next.js Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)

---

## 💡 Key Learnings

1. **`force-dynamic` is NOT enough** to prevent caching in Next.js 14
2. **Always check build output** for `○` vs `Ɠƒ` symbols
3. **Database correctness ≠ page correctness** when caching is involved
4. **Multiple cache layers exist**: Build cache, ISR cache, fetch cache, browser cache
5. **Explicit is better than implicit**: Use all three cache directives for truly dynamic pages

---

## ✅ Resolution

**Fix Deployed**: Commit `e4fc86d`
**Status**: ✅ RESOLVED
**Verification**: Product names now display correctly from live database data

### Before Fix
```
John Boos: "24x18x1.75\" ❌
Bodum: "Bodum chambord french press" ❌
Norton: "Norton im200 tri stone sharpener" ❌
```

### After Fix
```
John Boos: "24x18x1.75"" ✅
Bodum: "Bodum Chambord French Press" ✅
Norton: "Norton IM200 Tri Stone Sharpener" ✅
```

---

## 📝 Notes

- This bug persisted through **7+ fix attempts** over **~3 hours**
- User frustration level: **EXTREME** ("this is an outrage", "RAID couldn't kill this motherfucker")
- Root cause was **Next.js caching behavior**, not database or code logic
- Fix was **3 lines of code** but took extensive debugging to identify
- **Lesson**: Next.js caching is more aggressive than documented; always verify render mode in build output

---

**Document created**: November 15, 2025
**Last updated**: November 15, 2025
**Author**: Claude (AI Assistant) & Scott Bradley
