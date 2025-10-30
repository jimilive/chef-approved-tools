# Google Analytics Tracking Fix - October 25, 2025

## Issues Found

### 1. Multiple Tracking IDs
You have TWO different GA4 tracking IDs configured:
- **Local (.env.local)**: `G-6GZ4LTCWCT`
- **Production (.env.production.example)**: `G-819D3VNNGD`

### 2. Local Tracking Works ✅
The GA code IS being properly injected on localhost. Confirmed via curl tests showing:
```javascript
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6GZ4LTCWCT';
gtag('config', 'G-6GZ4LTCWCT', { send_page_view: false });
```

### 3. Production Environment Variable Missing ❌
The environment variable `NEXT_PUBLIC_GA_TRACKING_ID` is likely:
- Not set in Vercel
- Set to the wrong value
- Or was never added to production environment

## Fix Steps

### Step 1: Decide Which Tracking ID to Use

**Option A: Use G-6GZ4LTCWCT (Current Local ID)**
- This is what's currently in `.env.local`
- Use this if it's your main production property

**Option B: Use G-819D3VNNGD (Documented Production ID)**
- This is in `.env.production.example`
- Use this if you set up a separate production property

**Recommendation**: Check your Google Analytics account at https://analytics.google.com to see which property you want to use for production data.

### Step 2: Set Environment Variable in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project: `chef-approved-tools`
3. Go to **Settings** → **Environment Variables**
4. Add or update:
   - **Name**: `NEXT_PUBLIC_GA_TRACKING_ID`
   - **Value**: `G-6GZ4LTCWCT` (or your chosen ID)
   - **Environments**: Check all three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

5. Click **Save**

### Step 3: Redeploy

After saving the environment variable:
1. Go to **Deployments** tab
2. Click the **⋮** menu on the latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete

### Step 4: Verify Production Tracking

Once deployed, test on your live site:

1. Visit https://www.chefapprovedtools.com/test-datalayer
2. Open DevTools Console (F12)
3. Type: `window.gtag`
4. Should show: `ƒ gtag(){dataLayer.push(arguments);}` (not undefined)
5. Type: `window.dataLayer`
6. Should show an array with events

### Step 5: Check Google Analytics Real-Time

1. Go to https://analytics.google.com
2. Select your property (G-6GZ4LTCWCT or G-819D3VNNGD)
3. Go to **Reports** → **Realtime**
4. Visit your site in another tab
5. You should see yourself in the real-time report within 30 seconds

## Current Implementation Status

### ✅ Working Correctly
- GA4 script injection in layout.tsx (lines 360-407)
- Environment variable loading (.env.local)
- GTM integration (GTM-PX8GPHKF)
- Deferred loading for performance
- Consent management
- Analytics component for page views
- Event tracking functions in lib/analytics.ts

### ❌ Needs Attention
- Vercel production environment variable not set
- Multiple tracking IDs causing confusion
- No verification that production is sending data

## Testing Commands

### Test Local Tracking
```bash
# Start dev server
npm run dev

# In another terminal, check if GA code is injected
curl -s http://localhost:3000/ | grep -o "gtag.*G-6GZ4LTCWCT"
```

### Test Production Tracking
```bash
# Check production site
curl -s https://www.chefapprovedtools.com/ | grep -o "gtag.*G-" | head -1
```

If production shows no results, the environment variable isn't set.

## Quick Fix Command Line

If you have Vercel CLI installed:
```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Set environment variable
vercel env add NEXT_PUBLIC_GA_TRACKING_ID
# When prompted, enter: G-6GZ4LTCWCT
# Select: Production, Preview, Development

# Redeploy
vercel --prod
```

## Monitoring After Fix

### Week 1
- Check GA4 Real-Time daily
- Verify events are being tracked:
  - page_view
  - affiliate_click
  - scroll (25%, 50%, 75%, 100%)

### Week 2
- Check GA4 Reports (data should be flowing)
- Review: Reports → Engagement → Events
- Should see custom events: affiliate_click, newsletter_signup, etc.

### Ongoing
- Use /test-datalayer page to verify tracking
- Monitor GA4 weekly for data accuracy
- Check for any console errors on production

## Contact Information

If issues persist after following these steps:
1. Check browser console for errors
2. Verify network requests to google-analytics.com
3. Check GA4 DebugView (Admin → DebugView)
4. Verify GTM container is loading

## Files Involved

- `app/layout.tsx` - GA4 script injection
- `lib/analytics.ts` - Tracking functions
- `components/Analytics.tsx` - Page view tracking
- `.env.local` - Local environment variables
- `types/global.d.ts` - TypeScript definitions

---

**Last Updated**: October 25, 2025
**Status**: Awaiting Vercel environment variable configuration
