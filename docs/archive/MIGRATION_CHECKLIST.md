# NETLIFY TO VERCEL MIGRATION CHECKLIST

**Generated:** October 10, 2025
**Site:** Chef Approved Tools (www.chefapprovedtools.com)

---

## MIGRATION OVERVIEW

**Current Platform:** Netlify
**Target Platform:** Vercel
**Reason:** Netlify usage limits exceeded
**Framework:** Next.js 14 (App Router)
**Risk Level:** Medium (revenue-dependent affiliate links)

---

## PRE-MIGRATION CHECKLIST

### 1. Information Gathering ✅

- [x] Audit Amazon affiliate link implementation → See AMAZON_AFFILIATE_AUDIT.md
- [x] Audit redirect configuration → See REDIRECT_AUDIT.md
- [x] Audit environment variables → See ENV_VARIABLES_TEMPLATE.md
- [x] Audit current performance baselines
- [x] Audit image hosting setup
- [x] Audit internal linking patterns
- [x] Audit schema markup implementation
- [x] Audit email capture setup

### 2. Environment Variables Preparation

**CRITICAL - Gather these values before migration:**

- [ ] `AMAZON_ASSOCIATE_TAG` - Confirm value is `chefapprovedtools-20`
- [ ] `NEXT_PUBLIC_GA_ID` - Get from Google Analytics dashboard
- [ ] `NEXT_PUBLIC_SITE_URL` - Will be `https://www.chefapprovedtools.com`
- [ ] Email service credentials (if using Mailchimp/ConvertKit)
- [ ] Hotjar ID (if using)
- [ ] Facebook Pixel ID (if using)

**Reference:** See ENV_VARIABLES_TEMPLATE.md for complete list

### 3. Domain Configuration Info

- [ ] Confirm primary domain: `www.chefapprovedtools.com`
- [ ] Confirm domain registrar and DNS access
- [ ] Have DNS credentials ready for nameserver changes

### 4. Backup Current Site

- [ ] Full git repository is committed and pushed
- [ ] Document current Netlify build settings
- [ ] Screenshot Netlify environment variables (don't capture secrets)
- [ ] Export any Netlify analytics you want to preserve
- [ ] Backup any Netlify form submissions (if applicable)

---

## VERCEL SETUP CHECKLIST

### Step 1: Create Vercel Project

- [ ] Sign up for Vercel account (if new)
- [ ] Import Git repository to Vercel
- [ ] Select framework: **Next.js**
- [ ] Leave build settings as default (Vercel auto-detects Next.js)

**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)
**Install Command:** `npm install` (auto-detected)

### Step 2: Configure Environment Variables

**Go to: Project Settings → Environment Variables**

#### Critical (Must Set):
- [ ] `AMAZON_ASSOCIATE_TAG=chefapprovedtools-20` ⚠️ **REVENUE CRITICAL**
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.chefapprovedtools.com`
- [ ] `NEXT_PUBLIC_SITE_NAME=Chef Approved Tools`
- [ ] `NEXT_PUBLIC_GA_ID=[your-ga-id]`

#### Optional (if using):
- [ ] `NEXT_PUBLIC_HOTJAR_ID=[your-hotjar-id]`
- [ ] `NEXT_PUBLIC_FB_PIXEL_ID=[your-fb-pixel-id]`
- [ ] Email service variables (Mailchimp or ConvertKit)

**Important:**
- Check all three environments: Production, Preview, Development
- Variables with `NEXT_PUBLIC_` prefix are accessible in browser
- Server-only variables (like AMAZON_ASSOCIATE_TAG) should not have NEXT_PUBLIC_ prefix

### Step 3: Initial Deployment to Staging

- [ ] Deploy to Vercel preview URL (e.g., project-name.vercel.app)
- [ ] Wait for build to complete
- [ ] Check build logs for errors
- [ ] Verify deployment succeeded

---

## STAGING TESTING CHECKLIST

**Test on Vercel preview URL BEFORE connecting custom domain**

### Critical Functionality Tests

#### 1. Affiliate Links (REVENUE CRITICAL)
- [ ] Visit 3 review pages:
  - [ ] /reviews/kitchenaid-ksm8990wh
  - [ ] /reviews/victorinox-fibrox-8-inch-chefs-knife
  - [ ] /reviews/le-creuset-signature-7-25-qt-dutch-oven
- [ ] Click "Check Amazon Price" buttons
- [ ] Verify affiliate tag in destination URL: `tag=chefapprovedtools-20`
- [ ] Test above_fold, mid_article, and final_cta positions

#### 2. Redirects
- [ ] Test: `/products/victorinox-fibrox-8-inch-chefs-knife`
  - Should redirect to `/reviews/victorinox-fibrox-8-inch-chefs-knife`
- [ ] Test: `/reviews/wusthof-classic-ikon-15-piece`
  - Should redirect to `/reviews/wusthof-classic-ikon-16-piece`
- [ ] Test: `/go/amazon/test` (optional, currently unused)

#### 3. Pages Load Correctly
- [ ] Homepage (`/`)
- [ ] All review pages load
- [ ] Category pages (/knives, /cookware, /appliances)
- [ ] Guide pages (/guides/best-chef-knives)
- [ ] Newsletter page (/newsletter)

#### 4. Images Load
- [ ] Product images display correctly
- [ ] Team photos load (/images/team/)
- [ ] Branding images load
- [ ] Check for any broken image icons

#### 5. Internal Links
- [ ] Navigation menu works
- [ ] Footer links work
- [ ] Breadcrumbs function
- [ ] Cross-linking between reviews works

#### 6. Schema Markup
- [ ] Use Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Test a review page URL
- [ ] Verify Product schema detected
- [ ] Verify FAQ schema detected (if page has FAQs)
- [ ] Verify Breadcrumb schema detected

#### 7. Meta Tags & SEO
- [ ] View page source on homepage
- [ ] Check `<title>` tag exists
- [ ] Check Open Graph tags have correct site URL
- [ ] Check canonical URL is correct

#### 8. Analytics
- [ ] Open browser developer tools → Network tab
- [ ] Visit homepage
- [ ] Look for Google Analytics requests (gtag, analytics)
- [ ] Verify GA tracking is firing

#### 9. Mobile Responsiveness
- [ ] Test on mobile device or browser mobile emulation
- [ ] Navigation works on mobile
- [ ] Affiliate buttons clickable
- [ ] Images responsive

---

## DOMAIN MIGRATION CHECKLIST

**Only proceed after staging tests pass!**

### Step 1: Add Custom Domain to Vercel

**In Vercel Dashboard → Project → Settings → Domains:**

- [ ] Add domain: `www.chefapprovedtools.com` (set as primary)
- [ ] Add domain: `chefapprovedtools.com` (will auto-redirect to www)
- [ ] Vercel will provide DNS configuration instructions

### Step 2: Update DNS Records

**At your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):**

#### Option A: Use Vercel Nameservers (Recommended)
- [ ] Copy nameservers from Vercel
- [ ] Update nameservers at registrar
- [ ] Wait for propagation (can take up to 48 hours)

#### Option B: Use CNAME Records (Faster)
- [ ] Add CNAME record: `www` → `cname.vercel-dns.com`
- [ ] Add A records for apex domain to Vercel IPs:
  - `76.76.19.19`
  - `76.223.126.88`
- [ ] Propagation usually takes 5-30 minutes

### Step 3: SSL Certificate

- [ ] Vercel automatically provisions SSL certificate
- [ ] Wait for "Certificate Ready" status in Vercel dashboard
- [ ] Verify HTTPS works

### Step 4: Verify Production Domain

- [ ] Visit https://www.chefapprovedtools.com
- [ ] Confirm it loads Vercel-deployed site
- [ ] Test http://chefapprovedtools.com redirects to www
- [ ] Test http:// redirects to https://

---

## PRODUCTION TESTING CHECKLIST

**Run these tests on live domain after DNS propagation**

### Critical Tests (Revenue Protection)

- [ ] Click affiliate links on 5 review pages
- [ ] Verify `tag=chefapprovedtools-20` in all Amazon links
- [ ] Test all button positions (above_fold, mid_article, final_cta)
- [ ] Check Google Analytics receiving traffic
- [ ] Verify mobile affiliate buttons work

### SEO & Redirects

- [ ] Test all redirects from REDIRECT_AUDIT.md
- [ ] Verify canonical URLs use production domain
- [ ] Check robots.txt is accessible: /robots.txt
- [ ] Check sitemap.xml is accessible: /sitemap.xml
- [ ] Verify meta tags show production URL

### Performance

- [ ] Run Lighthouse on homepage (target: 90+ performance score)
- [ ] Run Lighthouse on review page
- [ ] Check Core Web Vitals
- [ ] Verify images load with Next.js Image optimization

---

## POST-MIGRATION CHECKLIST

### Immediate (Within 24 Hours)

- [ ] Monitor Vercel analytics for traffic
- [ ] Check Google Analytics for visitor data
- [ ] Monitor for any error reports
- [ ] Test affiliate link clicks actually track
- [ ] Check Search Console for crawl errors

### Within 1 Week

- [ ] Monitor Google Search Console for any ranking changes
- [ ] Check affiliate earnings to ensure tracking works
- [ ] Review Vercel bandwidth usage
- [ ] Compare Vercel performance to Netlify baseline
- [ ] Update any documentation with new deployment info

### Cleanup (After Successful Migration)

- [ ] Delete Netlify site (or pause deployment)
- [ ] Remove `netlify.toml` from repository
- [ ] Optionally remove `public/_redirects` file
- [ ] Update README.md with Vercel deployment info
- [ ] Archive Netlify build logs/analytics if needed

---

## ROLLBACK PLAN

**If critical issues occur during migration:**

### Emergency Rollback to Netlify

1. **DNS Rollback:**
   - Change nameservers back to Netlify
   - Or update CNAME to point to Netlify
   - Propagation: 5-30 minutes

2. **Fix Issues:**
   - Review Vercel build logs
   - Check environment variables
   - Test on Vercel preview URL
   - Resolve blockers

3. **Retry Migration:**
   - Test thoroughly on staging
   - Re-attempt domain migration

### Common Issues & Solutions

**Problem:** Affiliate links missing tag
**Solution:** Check `AMAZON_ASSOCIATE_TAG` env var is set

**Problem:** Images not loading
**Solution:** Check next.config.js image domains configuration

**Problem:** Redirects not working
**Solution:** Verify vercel.json and next.config.js redirects

**Problem:** Build fails
**Solution:** Check build logs, ensure all dependencies in package.json

---

## SUCCESS CRITERIA

Migration is successful when:

- ✅ Site loads on www.chefapprovedtools.com
- ✅ All affiliate links contain `tag=chefapprovedtools-20`
- ✅ Google Analytics tracking works
- ✅ All redirects function correctly
- ✅ Images load properly
- ✅ Mobile site works
- ✅ SSL certificate active
- ✅ Performance scores maintained or improved
- ✅ No console errors in browser
- ✅ Search Console shows no critical errors

---

## REFERENCE DOCUMENTS

Created during this audit:

1. **AMAZON_AFFILIATE_AUDIT.md** - Affiliate link implementation details
2. **REDIRECT_AUDIT.md** - All redirect configurations
3. **ENV_VARIABLES_TEMPLATE.md** - Environment variable guide
4. **CURRENT_SETUP_SUMMARY.md** - Executive summary of findings
5. **MIGRATION_CHECKLIST.md** - This document

---

## NOTES

- **Estimated migration time:** 2-4 hours (plus DNS propagation)
- **Recommended migration window:** Off-peak hours to minimize revenue impact
- **Testing is critical:** Do not skip staging tests
- **Have rollback plan ready:** Keep Netlify site active during initial testing

---

**END OF MIGRATION CHECKLIST**
