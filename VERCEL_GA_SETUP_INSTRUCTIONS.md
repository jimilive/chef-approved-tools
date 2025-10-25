# Vercel Google Analytics Setup Instructions

## ✅ Local Environment Fixed
I've updated your `.env.local` file to use the correct measurement ID: **G-819D3VNNGD**

## 🔧 Next Step: Update Vercel Production

### Option 1: Vercel Dashboard (Recommended - 2 minutes)

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Select your project**: `chef-approved-tools`
3. **Navigate to**: Settings → Environment Variables
4. **Look for** `NEXT_PUBLIC_GA_TRACKING_ID`:
   - If it exists: Click **Edit** and change value to `G-819D3VNNGD`
   - If it doesn't exist: Click **Add New**
5. **Enter**:
   - **Name**: `NEXT_PUBLIC_GA_TRACKING_ID`
   - **Value**: `G-819D3VNNGD`
   - **Environments**: ✅ Check ALL three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
6. **Click Save**

7. **Redeploy**:
   - Go to **Deployments** tab
   - Click **⋮** (three dots) on latest deployment
   - Select **Redeploy**
   - Wait ~2-3 minutes for deployment to complete

### Option 2: Vercel CLI (If you prefer command line)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Add/update environment variable
vercel env rm NEXT_PUBLIC_GA_TRACKING_ID production
vercel env add NEXT_PUBLIC_GA_TRACKING_ID production
# When prompted, enter: G-819D3VNNGD

# Also add for preview and development
vercel env add NEXT_PUBLIC_GA_TRACKING_ID preview
# Enter: G-819D3VNNGD
vercel env add NEXT_PUBLIC_GA_TRACKING_ID development
# Enter: G-819D3VNNGD

# Redeploy
vercel --prod
```

## ✅ Verification Steps (After Deployment)

### Test 1: Check if GA code is on production site
```bash
# Run this in terminal
curl -s https://www.chefapprovedtools.com/ | grep -o "G-819D3VNNGD"
```
**Expected result**: Should show `G-819D3VNNGD`

### Test 2: Check in browser
1. Visit: https://www.chefapprovedtools.com/test-datalayer
2. Open DevTools Console (F12)
3. Type: `window.gtag`
4. **Should show**: `ƒ gtag(){dataLayer.push(arguments);}`
5. Type: `window.dataLayer`
6. **Should show**: An array with events

### Test 3: Google Analytics Real-Time
1. Visit https://analytics.google.com
2. Select: **Chef Approved Tools** property
3. Go to: **Reports** → **Realtime** → **Overview**
4. In another browser tab, visit your site
5. **Within 30 seconds**: You should see yourself in the real-time report

### Test 4: Verify Data Collection Started
1. In Google Analytics, go back to **Admin** (gear icon)
2. Click **Setup Assistant**
3. **"Collect website and app data"** should change from "Not Started" to showing activity
4. You may need to wait 24-48 hours for it to fully change status

## 📊 What To Expect After Fix

### Immediately (0-30 seconds)
- Real-time reports will show visitors
- Events will appear in DebugView (Admin → DebugView)

### Within 24 hours
- "Collect website and app data" status will update
- Basic reports will populate
- You'll see page views, events, user counts

### Within 48-72 hours
- All reports will be fully populated
- Historical data will show trends
- Custom events (affiliate_click, etc.) will appear in reports

## 🐛 Troubleshooting

### If Real-Time still shows no data after deployment:

1. **Clear browser cache** and visit your site
2. **Check browser console** for errors (F12 → Console tab)
3. **Check Network tab** (F12 → Network tab):
   - Filter for "google-analytics"
   - You should see requests to `google-analytics.com/g/collect`
4. **Verify environment variable**:
   ```bash
   vercel env ls
   ```
   Should show NEXT_PUBLIC_GA_TRACKING_ID in Production

### If you see errors in console:

- **Content Security Policy errors**: The CSP in `vercel.json` already allows GTM scripts
- **gtag is not defined**: Environment variable not set or deployment not complete
- **403 Forbidden**: Measurement ID is incorrect

## 📝 Summary

**Your Correct Settings:**
- **Property ID**: 503007335
- **Measurement ID**: G-819D3VNNGD
- **Stream Name**: Chef Approved Tools
- **Stream URL**: https://www.chefapprovedtools.com

**Files Updated:**
- ✅ `.env.local` - Fixed with correct measurement ID
- ⏳ Vercel Environment Variables - **You need to do this step**
- ✅ Code implementation - Already correct

**Next Action:** Set the Vercel environment variable and redeploy (follow Option 1 above).

---

After you complete the Vercel setup and redeploy, check your Google Analytics Real-Time report. You should see data flowing immediately!
