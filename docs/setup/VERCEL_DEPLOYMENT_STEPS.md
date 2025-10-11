# VERCEL DEPLOYMENT STEPS

**Site:** Chef Approved Tools (www.chefapprovedtools.com)
**Date Created:** October 10, 2025
**Purpose:** Step-by-step guide for deploying to Vercel

---

## ⚠️ BEFORE YOU START

### Prerequisites Checklist

- [ ] You have a GitHub account with this repository
- [ ] All code is committed and pushed to GitHub
- [ ] You have reviewed all audit documents
- [ ] You have gathered all environment variable values
- [ ] You understand the rollback plan (keep Netlify active during testing)

### Have These Values Ready

```
AMAZON_ASSOCIATE_TAG=chefapprovedtools-20
NEXT_PUBLIC_GA_TRACKING_ID=G-819D3VNNGD
NEXT_PUBLIC_SITE_URL=https://www.chefapprovedtools.com
NEXT_PUBLIC_SITE_NAME=Chef Approved Tools
EMAILOCTOPUS_API_KEY=[your-key]
EMAILOCTOPUS_LIST_ID=[your-list-id]
```

---

## PHASE 1: CREATE VERCEL ACCOUNT & IMPORT PROJECT

### Step 1.1: Sign Up for Vercel

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Select your pricing plan:
   - **Hobby (Free)**: Good for testing, has limits
   - **Pro ($20/month)**: Recommended for production revenue site

### Step 1.2: Import Your Repository

1. From Vercel dashboard, click "Add New..." → "Project"
2. Find "chef-approved-tools" repository
3. Click "Import"

### Step 1.3: Configure Build Settings

**Framework Preset:** Next.js (auto-detected)

**Build Settings** (should auto-populate):
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**Root Directory:** Leave as `./` (root)

**✅ DO NOT change these** - Vercel auto-detects correctly for Next.js

### Step 1.4: Configure Environment Variables (CRITICAL!)

**Before clicking "Deploy", add environment variables:**

Click "Environment Variables" section, then add each one:

#### Critical Variables (MUST ADD):

| Variable Name | Value | All Environments? |
|--------------|-------|-------------------|
| `AMAZON_ASSOCIATE_TAG` | `chefapprovedtools-20` | ✅ Yes (all 3) |
| `NEXT_PUBLIC_GA_TRACKING_ID` | `G-819D3VNNGD` | ✅ Yes (all 3) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.chefapprovedtools.com` | ✅ Yes (all 3) |
| `NEXT_PUBLIC_SITE_NAME` | `Chef Approved Tools` | ✅ Yes (all 3) |
| `EMAILOCTOPUS_API_KEY` | [your-key-here] | ✅ Yes (all 3) |
| `EMAILOCTOPUS_LIST_ID` | [your-list-id] | ✅ Yes (all 3) |

**For each variable:**
1. Enter Name (exactly as shown above - case sensitive!)
2. Enter Value
3. Check ALL THREE boxes: Production, Preview, Development
4. Click "Add"

**⚠️ DOUBLE-CHECK SPELLING** - Variable names must match exactly!

### Step 1.5: Deploy to Preview

1. After adding all env vars, click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Watch the build logs for any errors

**Expected Result:**
- ✅ Build completes successfully
- ✅ You get a preview URL like: `chef-approved-tools-abc123.vercel.app`

**If build fails:**
- Check build logs for specific error
- Verify all environment variables are set correctly
- Ensure all dependencies are in package.json

---

## PHASE 2: TEST ON PREVIEW URL

**🚨 DO NOT connect custom domain until all tests pass!**

Test everything on the Vercel preview URL first.

### Step 2.1: Basic Functionality Test

Visit your preview URL: `https://chef-approved-tools-[unique-id].vercel.app`

- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] Footer links work
- [ ] Images display correctly
- [ ] No console errors in browser dev tools

### Step 2.2: Affiliate Links Test (REVENUE CRITICAL!)

**Test on 3 review pages:**

1. Navigate to: `/reviews/kitchenaid-ksm8990wh`
2. Click "Check Amazon Price" button (above fold)
3. **Verify in browser:**
   - Link opens in new tab
   - URL contains: `tag=chefapprovedtools-20`
   - You're redirected to Amazon product page

4. Repeat for:
   - `/reviews/victorinox-fibrox-8-inch-chefs-knife`
   - `/reviews/le-creuset-signature-7-25-qt-dutch-oven`

5. Test different button positions:
   - Above fold button
   - Final CTA button

**✅ PASS CRITERIA:** All affiliate links contain `tag=chefapprovedtools-20`

**❌ FAIL:** If tag is missing, check `AMAZON_ASSOCIATE_TAG` env var is set

### Step 2.3: Redirects Test

Open browser dev tools → Network tab (to see redirects)

Test each redirect:

**Test 1: Products → Reviews**
- Visit: `[preview-url]/products/victorinox-fibrox-8-inch-chefs-knife`
- Should redirect to: `/reviews/victorinox-fibrox-8-inch-chefs-knife`
- Status: 301 (permanent)

**Test 2: Wusthof SKU Correction**
- Visit: `[preview-url]/reviews/wusthof-classic-ikon-15-piece`
- Should redirect to: `/reviews/wusthof-classic-ikon-16-piece`
- Status: 301 (permanent)

**✅ PASS CRITERIA:** Both redirects work correctly

### Step 2.4: Google Analytics Test

1. Open browser dev tools → Network tab
2. Visit homepage on preview URL
3. Filter network requests by "google-analytics" or "gtag"
4. Verify you see requests to:
   - `www.googletagmanager.com/gtag/js?id=G-819D3VNNGD`
   - Analytics events firing

**✅ PASS CRITERIA:** GA script loads and fires pageview event

**Note:** Real data won't show in GA dashboard until custom domain is connected

### Step 2.5: Schema Markup Test

1. Go to: https://search.google.com/test/rich-results
2. Enter your preview URL + a review page path:
   - Example: `https://chef-approved-tools-abc123.vercel.app/reviews/kitchenaid-ksm8990wh`
3. Click "Test URL"

**✅ PASS CRITERIA:**
- Product schema detected
- FAQ schema detected (if page has FAQs)
- Breadcrumb schema detected
- No critical errors

### Step 2.6: Email Forms Test

**Newsletter Signup:**
1. Visit `/newsletter`
2. Enter a test email address
3. Submit form

**Contact Form:**
1. Visit `/contact`
2. Fill out form with test data
3. Submit

**✅ PASS CRITERIA:**
- Forms submit without errors
- Check EmailOctopus dashboard to verify submissions arrived

**Note:** If forms don't work, verify `EMAILOCTOPUS_API_KEY` and `EMAILOCTOPUS_LIST_ID` are correct

### Step 2.7: Mobile Responsiveness Test

1. Open browser dev tools
2. Toggle device toolbar (mobile view)
3. Test iPhone SE (375px width)
4. Test iPad (768px width)

**Check:**
- [ ] Navigation menu works on mobile
- [ ] Affiliate buttons are clickable
- [ ] Images scale properly
- [ ] Text is readable (not too small)
- [ ] No horizontal scrolling

### Step 2.8: Performance Test

1. Go to: https://pagespeed.web.dev/
2. Enter your preview URL
3. Run test for Mobile and Desktop

**Target Scores:**
- Performance: 90+ (mobile), 95+ (desktop)
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**Note:** Preview URLs may score slightly lower than production. Custom domain scores will be better.

---

## PHASE 3: CONNECT CUSTOM DOMAIN

**⚠️ ONLY proceed if ALL Phase 2 tests passed!**

### Step 3.1: Add Domain in Vercel

1. In Vercel dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `www.chefapprovedtools.com`
4. Click "Add"

Vercel will show you DNS configuration instructions.

### Step 3.2: Add Apex Domain (Non-WWW)

1. Click "Add Domain" again
2. Enter: `chefapprovedtools.com` (without www)
3. Click "Add"

**Vercel will automatically redirect apex → www**

### Step 3.3: Choose DNS Configuration Method

**Option A: CNAME Method (Faster - Recommended)**

At your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

1. **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `3600` (or lowest available)

2. **For apex domain (non-www):**
   - Type: `A`
   - Name: `@` or blank
   - Value: `76.76.19.19`
   - TTL: `3600`

   Add second A record:
   - Type: `A`
   - Name: `@` or blank
   - Value: `76.223.126.88`
   - TTL: `3600`

**Propagation time: 5-30 minutes**

**Option B: Nameserver Method (Slower)**

1. Get nameservers from Vercel
2. Update nameservers at your domain registrar
3. Wait for propagation: **up to 48 hours**

**Recommendation:** Use CNAME method for faster migration

### Step 3.4: Remove Old DNS Records

**Before adding Vercel records, remove:**

- [ ] Old Netlify CNAME records
- [ ] Old Netlify A records
- [ ] Any conflicting DNS records for www or apex

**Keep only:**
- MX records (email)
- TXT records (domain verification, SPF, DKIM)

### Step 3.5: Wait for DNS Propagation

**Check propagation:**
```bash
# Check if www resolves to Vercel
dig www.chefapprovedtools.com

# Should show Vercel IPs or CNAME to vercel
```

Or use online tool: https://www.whatsmydns.net/

Enter: `www.chefapprovedtools.com`

**✅ Ready when:** Multiple locations show Vercel IPs

### Step 3.6: SSL Certificate Provisioning

Vercel automatically provisions SSL certificate.

1. Go to Vercel dashboard → Domains
2. Wait for status to change to: "Certificate Ready"
3. Usually takes 1-5 minutes after DNS propagates

**✅ Verified when:** Green checkmark next to domain

---

## PHASE 4: PRODUCTION TESTING

**Test on actual domain: www.chefapprovedtools.com**

### Step 4.1: Domain Accessibility

- [ ] Visit `https://www.chefapprovedtools.com`
- [ ] Site loads from Vercel (check page source for Vercel comments)
- [ ] SSL certificate is valid (🔒 lock icon in browser)

### Step 4.2: Non-WWW Redirect

- [ ] Visit `http://chefapprovedtools.com` (no www, http)
- [ ] Redirects to `https://www.chefapprovedtools.com`
- [ ] Status: 301 or 308 (permanent)

### Step 4.3: Affiliate Links on Production (CRITICAL!)

**Test on LIVE domain:**

1. Visit `https://www.chefapprovedtools.com/reviews/kitchenaid-ksm8990wh`
2. Click affiliate button
3. **Verify:** URL contains `tag=chefapprovedtools-20`

**Test 5 different review pages to be sure!**

### Step 4.4: Google Analytics on Production

1. Visit homepage
2. Open browser dev tools → Network tab
3. Verify GA fires with correct tracking ID: `G-819D3VNNGD`

**Check GA Dashboard:**
1. Go to Google Analytics
2. View Real-Time reports
3. Should see your visit

**Note:** May take 5-10 minutes for real-time data to appear

### Step 4.5: Search Console Verification

1. Go to: https://search.google.com/search-console
2. Check for crawl errors
3. Submit sitemap: `https://www.chefapprovedtools.com/sitemap.xml`

**Monitor for 24-48 hours** to ensure no new errors appear

### Step 4.6: Test All Critical Pages

Visit and verify each loads correctly:

- [ ] Homepage `/`
- [ ] `/reviews/kitchenaid-ksm8990wh`
- [ ] `/reviews/victorinox-fibrox-8-inch-chefs-knife`
- [ ] `/reviews/le-creuset-signature-7-25-qt-dutch-oven`
- [ ] `/kitchen-bundle`
- [ ] `/guides/best-chef-knives`
- [ ] `/knives`
- [ ] `/cookware`
- [ ] `/appliances`
- [ ] `/newsletter`
- [ ] `/contact`

**All should load without errors!**

---

## PHASE 5: MONITORING (First 48 Hours)

### Step 5.1: Traffic Monitoring

**In Vercel Analytics:**
- Monitor page views
- Check for 404 errors
- Watch for unusual traffic patterns

**In Google Analytics:**
- Verify traffic numbers match expected levels
- Check affiliate click events
- Monitor bounce rate

### Step 5.2: Revenue Tracking

**Monitor affiliate clicks:**
- Check that clicks are being tracked in GA
- Verify Amazon Associates dashboard shows clicks
- Monitor for any drop in click-through rate

**⚠️ If clicks drop significantly:**
- Immediately check affiliate links for `tag=chefapprovedtools-20`
- Verify env vars are set correctly in Vercel

### Step 5.3: Error Monitoring

**Check for errors:**
1. Vercel dashboard → Your Project → Logs
2. Look for runtime errors
3. Check for failed API requests

**In browser:**
- Visit pages and check console for errors
- Test all interactive elements

### Step 5.4: Search Console Monitoring

- Monitor for new crawl errors
- Check index coverage doesn't drop
- Watch for any deindexing issues

---

## PHASE 6: CLEANUP

**Only after 48+ hours of successful operation!**

### Step 6.1: Disable Netlify Site

**Option A: Pause Deployment (Safer)**
1. Netlify dashboard → Site Settings
2. Pause automatic deployments
3. Keep site published as backup

**Option B: Delete Site (After 1 week)**
1. Only after confirming everything works perfectly
2. Netlify dashboard → Site Settings → Delete Site

### Step 6.2: Update Repository

**Remove Netlify-specific files:**

```bash
git rm netlify.toml
git rm public/_redirects
git rm -r netlify/

git commit -m "Remove Netlify configuration after Vercel migration"
git push
```

### Step 6.3: Update Documentation

**In README.md**, update deployment section:

- Remove Netlify deployment instructions
- Add Vercel deployment instructions
- Update environment variable documentation

---

## TROUBLESHOOTING

### Issue: Build Fails on Vercel

**Check:**
1. Build logs for specific error message
2. All dependencies in package.json
3. Node version compatibility
4. Environment variables set correctly

**Common fixes:**
- Clear build cache: Vercel dashboard → Deployments → [...] → Redeploy
- Check package.json has all dependencies
- Verify no Netlify-specific code

### Issue: Affiliate Tag Missing from Links

**Check:**
1. `AMAZON_ASSOCIATE_TAG` env var is set in Vercel
2. Value is exactly: `chefapprovedtools-20`
3. Env var is set for Production environment
4. Redeploy after adding env var

**Test:**
```javascript
// Add temporary debug log in /lib/amazon-affiliates.ts
console.log('AMAZON_TAG:', AMAZON_TAG)
```

### Issue: Google Analytics Not Working

**Check:**
1. `NEXT_PUBLIC_GA_TRACKING_ID` env var is set
2. Value is exactly: `G-819D3VNNGD`
3. Variable name has `NEXT_PUBLIC_` prefix
4. Clear browser cache and test in incognito mode

### Issue: Images Not Loading

**Check:**
1. next.config.js has correct image domains
2. Images exist at source URLs
3. Check browser console for CORS errors

**Current image domains should be:**
- images.unsplash.com
- m.media-amazon.com
- images-na.ssl-images-amazon.com

### Issue: Redirects Not Working

**Check:**
1. vercel.json has redirects configured
2. next.config.js has redirects configured
3. Redeploy to apply redirect changes

### Issue: SSL Certificate Pending

**Wait:** Can take up to 1 hour
**If stuck:** Remove domain and re-add it
**Check:** DNS records are correct

### Issue: Forms Not Working

**Check:**
1. `EMAILOCTOPUS_API_KEY` is set
2. `EMAILOCTOPUS_LIST_ID` is set
3. API routes in /app/api/ are present
4. Check browser network tab for API errors

---

## ROLLBACK PROCEDURE

**If critical issues occur:**

### Immediate Rollback:

1. **Point DNS back to Netlify:**
   - Change CNAME record back to Netlify
   - Or change nameservers back
   - Propagation: 5-30 minutes

2. **Fix issues on Vercel:**
   - Debug using preview URL
   - Check all env vars
   - Test thoroughly
   - Attempt migration again

3. **Communication:**
   - If downtime > 30 minutes, post notice on social media
   - Monitor affiliate revenue during outage

---

## SUCCESS CHECKLIST

Migration is complete when ALL of these are true:

- [ ] Site loads on www.chefapprovedtools.com
- [ ] SSL certificate active (green lock icon)
- [ ] Non-www redirects to www
- [ ] All 18 review pages load correctly
- [ ] Affiliate links contain `tag=chefapprovedtools-20` on ALL pages
- [ ] Google Analytics tracking active
- [ ] Newsletter signup works
- [ ] Contact form works
- [ ] All redirects function correctly
- [ ] No console errors in browser
- [ ] Search Console shows no critical errors
- [ ] Performance scores maintained (90+)
- [ ] Mobile site works perfectly
- [ ] 48 hours of stable operation
- [ ] Affiliate revenue tracking verified
- [ ] No traffic drop in Analytics

---

## SUPPORT & RESOURCES

**Vercel Documentation:**
- Deployments: https://vercel.com/docs/deployments/overview
- Domains: https://vercel.com/docs/projects/domains
- Environment Variables: https://vercel.com/docs/projects/environment-variables

**Vercel Support:**
- Dashboard → Help → Contact Support
- Community: https://github.com/vercel/vercel/discussions

**Testing Tools:**
- Google Rich Results: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev/
- DNS Checker: https://www.whatsmydns.net/

---

**NEXT STEPS:**

1. Review this document thoroughly
2. Gather all environment variable values
3. Schedule migration during off-peak hours
4. Follow steps in order - don't skip testing!
5. Keep Netlify active as backup for first week

**Good luck with the migration! 🚀**
