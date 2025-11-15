# Next.js Dynamic Pages Checklist

## ⚡ Quick Reference: Making Pages Truly Dynamic

Use this checklist when creating pages that should **ALWAYS** fetch fresh data from the database.

---

## ✅ The Template (Copy & Paste)

```typescript
// At the top of your page.tsx file
export const dynamic = 'force-dynamic'      // Don't pre-render at build time
export const revalidate = 0                 // Never use ISR caching
export const fetchCache = 'force-no-store'  // Always fetch fresh data

export const metadata = {
  title: 'Your Page Title',
  description: 'Your description',
}

export default async function YourPage() {
  // This will ALWAYS fetch fresh data from database
  const data = await getDataFromDatabase()

  return <div>{/* Your JSX */}</div>
}
```

---

## 🔍 Verification Steps

### 1. Check Build Output

After running `npm run build`, look for your route:

```bash
# ✅ GOOD - Dynamic rendering
├ ƒ /your-page    Size    First Load JS

# ❌ BAD - Static caching (will serve stale data!)
├ ○ /your-page    Size    First Load JS
```

**If you see `○`, you're still caching!** Add the three exports above.

### 2. Test with Database Updates

1. Update data directly in Supabase dashboard
2. Hard refresh page (Cmd+Shift+R / Ctrl+F5)
3. Verify changes appear immediately

**If changes don't appear**, you have caching somewhere.

---

## 🚨 When You Need This

Use dynamic rendering when:

- ✅ Data changes frequently (user-generated content, inventory, etc.)
- ✅ Page shows real-time database data
- ✅ Users expect to see latest updates immediately
- ✅ Data correctness is more important than performance

Don't use for:

- ❌ Static content (blog posts, about pages)
- ❌ Low-traffic pages with expensive queries
- ❌ Content that updates monthly/yearly

---

## 📊 Symbol Reference

| Symbol | Name | What it means |
|--------|------|---------------|
| `○` | Static | Pre-rendered at build time (CACHES DATA!) |
| `ƒ` | Dynamic | Server-rendered per request (FRESH DATA!) |
| `◐` | ISR | Static + periodic revalidation |

---

## 🐛 Troubleshooting

### "My page still shows old data!"

Check these in order:

1. **Build output has `ƒ` symbol?**
   - No → Add the three exports above
   - Yes → Continue to #2

2. **Clear ALL caches:**
   - Browser: Hard refresh (Cmd+Shift+R)
   - Vercel: Redeploy with "Clear Build Cache"
   - Local: Delete `.next` folder, rebuild

3. **Database actually updated?**
   - Query database directly to verify
   - Check for typos in slug/ID
   - Verify environment variables point to correct database

4. **Still broken?**
   - See `/docs/bugs/NEXTJS_CACHING_BUG_2025-11-15.md`
   - Check for middleware caching
   - Verify Supabase client configuration

---

## 💾 Keep This Document Handy!

When creating new dynamic pages, refer to this checklist. The three exports are NOT optional if you want truly fresh data.

**Last updated**: November 15, 2025
