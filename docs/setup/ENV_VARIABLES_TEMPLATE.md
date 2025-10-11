# ENVIRONMENT VARIABLES TEMPLATE

**Generated:** October 10, 2025
**Purpose:** Complete list of environment variables needed for Vercel deployment

---

## HOW TO SET ENVIRONMENT VARIABLES IN VERCEL

1. Go to Vercel Dashboard → Your Project
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable below
4. Set environment: **Production**, **Preview**, and **Development** (check all three)
5. Click **Save**

---

## CRITICAL (REQUIRED FOR BASIC FUNCTIONALITY)

These variables are **essential** for the site to function properly.

### 1. Site Configuration

```env
NEXT_PUBLIC_SITE_URL=https://www.chefapprovedtools.com
NEXT_PUBLIC_SITE_NAME=Chef Approved Tools
```

**Purpose:**
- `NEXT_PUBLIC_SITE_URL`: Base URL for canonical links, sitemaps, and Open Graph tags
- `NEXT_PUBLIC_SITE_NAME`: Site name for metadata

**Set in Vercel:** ✅ Yes
**Prefix NEXT_PUBLIC:** Yes (accessible in browser)

---

### 2. Amazon Affiliate Tracking (CRITICAL FOR REVENUE)

```env
AMAZON_ASSOCIATE_TAG=chefapprovedtools-20
```

**Purpose:** Amazon Associates affiliate tracking tag
**Used in:** `/lib/amazon-affiliates.ts`
**Impact if missing:** Revenue loss - affiliate commissions won't be tracked
**Fallback:** Hardcoded as `chefapprovedtools-20` in code

**Set in Vercel:** ✅ **CRITICAL - MUST SET**
**Prefix NEXT_PUBLIC:** No (server-side only)

---

### 3. Google Analytics

```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_GA_TRACKING_ID=your-google-analytics-id
```

**Purpose:** Google Analytics tracking for visitor analytics
**Format:** `G-XXXXXXXXXX` (GA4) or `UA-XXXXXXXXX` (Universal Analytics)
**Impact if missing:** No visitor tracking, no conversion data

**Set in Vercel:** ✅ Yes
**Prefix NEXT_PUBLIC:** Yes (client-side tracking)

**NEEDS CLARIFICATION:** Get actual Google Analytics ID from your Google Analytics account

---

## OPTIONAL (NICE TO HAVE)

These variables enable additional features but aren't required for basic site operation.

### 4. Hotjar Heatmap Tracking

```env
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id
```

**Purpose:** User behavior tracking (heatmaps, recordings)
**Impact if missing:** No heatmap data
**Set in Vercel:** Only if you use Hotjar

---

### 5. Facebook Pixel

```env
NEXT_PUBLIC_FB_PIXEL_ID=your-facebook-pixel-id
```

**Purpose:** Facebook advertising conversion tracking
**Impact if missing:** No Facebook ad conversion data
**Set in Vercel:** Only if running Facebook ads

---

### 6. Email Service Integration

#### Option A: Mailchimp

```env
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_LIST_ID=your-mailchimp-list-id
```

#### Option B: ConvertKit

```env
CONVERTKIT_API_KEY=your-convertkit-api-key
CONVERTKIT_FORM_ID=your-convertkit-form-id
```

**Purpose:** Newsletter signup integration
**Current Status:** ⚠️ Newsletter form exists but appears to be client-side only (no server integration)
**File:** `/components/Newsletter.tsx` - Uses `trackNewsletterSignup()` but no email service integration
**Impact if missing:** Newsletter signups won't be sent to email service
**Recommendation:** Clarify which email service you're using

**Set in Vercel:** Only if email service is configured

---

### 7. Contact Form (SendGrid)

```env
SENDGRID_API_KEY=your-sendgrid-api-key
CONTACT_EMAIL=hello@chefapprovedtools.com
```

**Purpose:** Contact form email delivery
**Current Status:** Not found in codebase - may not be used
**Set in Vercel:** Only if using contact forms

---

### 8. Node Environment

```env
NODE_ENV=production
```

**Purpose:** Tells Next.js to run in production mode
**Set in Vercel:** ✅ Automatic - Vercel sets this automatically
**Action needed:** None

---

## ENVIRONMENT VARIABLE CHECKLIST

### Minimum Required (Must Set):
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.chefapprovedtools.com`
- [ ] `NEXT_PUBLIC_SITE_NAME=Chef Approved Tools`
- [ ] `AMAZON_ASSOCIATE_TAG=chefapprovedtools-20` ⚠️ **CRITICAL FOR REVENUE**
- [ ] `NEXT_PUBLIC_GA_ID=` (Get from Google Analytics)

### Optional (Set if using):
- [ ] `NEXT_PUBLIC_HOTJAR_ID=` (if using Hotjar)
- [ ] `NEXT_PUBLIC_FB_PIXEL_ID=` (if running Facebook ads)
- [ ] `MAILCHIMP_API_KEY=` and `MAILCHIMP_LIST_ID=` (if using Mailchimp)
- [ ] `CONVERTKIT_API_KEY=` and `CONVERTKIT_FORM_ID=` (if using ConvertKit)

---

## COMPARISON: .env FILES VS VERCEL

### Current Setup (.env.local on your machine):

Your `.env.local` file is **NOT** committed to git (it's in .gitignore).
These values need to be manually entered in Vercel dashboard.

### Vercel Environment Variables:

- Set via Vercel dashboard UI
- Encrypted and secure
- Can be scoped to Production/Preview/Development
- Not visible in repository

---

## FOUND IN YOUR CODEBASE

### .env.local.example (Template with examples)
Located at: `/Users/scottbradley/chef-approved-tools/.env.local.example`

Contains:
```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
AMAZON_ASSOCIATE_TAG=your-amazon-associate-id
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id
NEXT_PUBLIC_FB_PIXEL_ID=your-facebook-pixel-id
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_LIST_ID=your-mailchimp-list-id
CONVERTKIT_API_KEY=your-convertkit-api-key
CONVERTKIT_FORM_ID=your-convertkit-form-id
SENDGRID_API_KEY=your-sendgrid-api-key
CONTACT_EMAIL=hello@chefapprovedtools.com
NEXT_PUBLIC_SITE_URL=https://www.chefapprovedtools.com
NEXT_PUBLIC_SITE_NAME="Chef Approved Tools"
NODE_ENV=production
```

### .env.example (Minimal template)
Located at: `/Users/scottbradley/chef-approved-tools/.env.example`

Contains:
```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_TRACKING_ID=
AMAZON_ASSOCIATE_TAG=
```

---

## WHERE VARIABLES ARE USED

### Amazon Affiliate Tag
- **File:** `/lib/amazon-affiliates.ts` (line 4)
- **Code:** `export const AMAZON_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'chefapprovedtools-20'`

### Google Analytics
- **File:** `/lib/analytics.ts` (referenced in multiple components)
- **Components:** Tracking in AffiliateButton, Newsletter, etc.

### Site URL
- **Used in:** Metadata, Open Graph tags, sitemaps
- **Files:** Most page.tsx files in /app directory

---

## TESTING AFTER DEPLOYMENT

### Test Environment Variables Loaded:

1. **Check build logs** in Vercel for any missing variable warnings
2. **Test affiliate links** - Click and verify `tag=chefapprovedtools-20` in URL
3. **Check Google Analytics** - Verify pageviews are tracked
4. **Inspect page source** - Check meta tags have correct site URL

### Debug Missing Variables:

If something doesn't work:
1. Check Vercel dashboard → Settings → Environment Variables
2. Verify variable names match exactly (case-sensitive)
3. Ensure variables are set for Production environment
4. Redeploy after adding variables (Vercel may need rebuild)

---

## NEXT STEPS AFTER READING THIS

1. **Gather actual values:**
   - Get Google Analytics ID from your GA account
   - Confirm Amazon Associate Tag (should be `chefapprovedtools-20`)
   - Determine if using Hotjar, Facebook Pixel, email services

2. **Prepare to set in Vercel:**
   - Have all values ready before Vercel deployment
   - Set during initial Vercel project setup
   - Or add via dashboard after deployment

3. **Questions to answer:**
   - Which email service are you using (Mailchimp? ConvertKit? Neither?)
   - Are you using Hotjar for heatmaps?
   - Are you running Facebook ads with pixel tracking?
   - Do you have a contact form that sends emails?

---

**END OF ENVIRONMENT VARIABLES TEMPLATE**
