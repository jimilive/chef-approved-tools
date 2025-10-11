# REDIRECT AUDIT

**Generated:** October 10, 2025
**Purpose:** Document all redirects for Netlify to Vercel migration

---

## EXECUTIVE SUMMARY

Redirects are configured in **three locations**:
1. `netlify.toml` (Netlify-specific)
2. `vercel.json` (Vercel-specific, already exists!)
3. `next.config.js` (Platform-agnostic, built into Next.js)
4. `public/_redirects` (Netlify-specific file)

**Good news:** Your site already has vercel.json configured with basic redirects!

---

## 1. SEO REDIRECTS (URL Structure Changes)

### Products → Reviews Redirect

**Purpose:** Legacy URL migration
**Type:** 301 Permanent
**Why:** Search engines may have indexed old /products/ URLs

#### Current Configuration:

**netlify.toml** (lines 34-38):
```toml
[[redirects]]
  from = "/products/*"
  to = "/reviews/:splat"
  status = 301
```

**vercel.json** (lines 10-14):
```json
{
  "source": "/products/:path*",
  "destination": "/reviews/:path*",
  "permanent": true
}
```

**next.config.js** (lines 203-209):
```javascript
{
  source: '/products/:slug',
  destination: '/reviews/:slug',
  permanent: true,
}
```

**Status:** ✅ Already configured in all three files - ready for Vercel!

---

### Wusthof Product SKU Redirect

**Purpose:** Product name correction (15-piece → 16-piece)
**Type:** 301 Permanent

#### Current Configuration:

**next.config.js** (lines 210-214):
```javascript
{
  source: '/reviews/wusthof-classic-ikon-15-piece',
  destination: '/reviews/wusthof-classic-ikon-16-piece',
  permanent: true,
}
```

**Status:** ✅ Configured in next.config.js - platform-agnostic, will work on Vercel

---

## 2. AFFILIATE REDIRECTS

### Amazon Tracking Redirect

**Purpose:** Future click tracking through custom domain
**Type:** 302 Temporary (for tracking purposes)
**Status:** ⚠️ Configured but **NOT CURRENTLY USED** (all links use direct amzn.to URLs)

#### Current Configuration:

**netlify.toml** (lines 28-32):
```toml
[[redirects]]
  from = "/go/amazon/*"
  to = "https://amazon.com/:splat"
  status = 302
  force = true
```

**vercel.json** (lines 5-9):
```json
{
  "source": "/go/amazon/:path*",
  "destination": "https://amazon.com/:path*",
  "statusCode": 302
}
```

**Usage Pattern:**
- Intended: `https://www.chefapprovedtools.com/go/amazon/ASIN?tag=...`
- Current: Direct `amzn.to` short links

**Migration Action:** Keep configured for future use, no immediate action needed

---

## 3. DOMAIN REDIRECTS

### Non-WWW → WWW

**File:** `public/_redirects`
**Purpose:** Force www prefix for brand consistency
**Type:** 301 Permanent

```
# Redirect non-www to www
https://chefapprovedtools.com/* https://www.chefapprovedtools.com/:splat 301!
http://chefapprovedtools.com/* https://www.chefapprovedtools.com/:splat 301!
```

**Netlify-Specific:** Uses `_redirects` file format

**Vercel Equivalent:** Handle via Vercel domain settings:
- Configure www.chefapprovedtools.com as primary domain
- Vercel automatically redirects apex → www

**Migration Action:**
1. Set www.chefapprovedtools.com as primary domain in Vercel
2. Add chefapprovedtools.com as alias
3. Vercel handles redirects automatically

---

### HTTP → HTTPS Force

**netlify.toml** (lines 41-45, 47-51):
```toml
[[redirects]]
  from = "http://chefapprovedtools.netlify.app/*"
  to = "https://chefapprovedtools.netlify.app/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://www.chefapprovedtools.com/*"
  to = "https://www.chefapprovedtools.com/:splat"
  status = 301
  force = true
```

**Vercel Equivalent:** Automatic!
- Vercel forces HTTPS by default
- No configuration needed

**Migration Action:** None - Vercel handles automatically

---

## 4. NETLIFY-SPECIFIC REDIRECTS TO REMOVE

These are Netlify deployment URLs that won't apply to Vercel:

```toml
[[redirects]]
  from = "http://chefapprovedtools.netlify.app/*"
  to = "https://chefapprovedtools.netlify.app/:splat"
  status = 301
  force = true
```

**Migration Action:** Delete netlify.toml file after successful Vercel migration

---

## REDIRECT SUMMARY TABLE

| From | To | Type | Status | Platform |
|------|-----|------|--------|----------|
| /products/* | /reviews/* | 301 | ✅ Ready | next.config.js + vercel.json |
| /reviews/wusthof-classic-ikon-15-piece | /reviews/wusthof-classic-ikon-16-piece | 301 | ✅ Ready | next.config.js |
| /go/amazon/* | https://amazon.com/* | 302 | ✅ Ready (unused) | vercel.json |
| chefapprovedtools.com | www.chefapprovedtools.com | 301 | ⚠️ Configure in Vercel | Vercel domain settings |
| http:// | https:// | 301 | ✅ Automatic | Vercel default |

---

## FILES THAT HANDLE REDIRECTS

### Platform-Agnostic (Work Everywhere)
1. **next.config.js** (lines 203-216)
   - Products → Reviews
   - Wusthof SKU correction
   - Built into Next.js, works on any platform

### Vercel-Specific
2. **vercel.json** (lines 4-15)
   - Products → Reviews
   - Amazon affiliate redirect
   - Already configured!

### Netlify-Specific (Remove After Migration)
3. **netlify.toml** (lines 28-51)
   - All redirects configured for Netlify
   - Delete this file after successful Vercel migration

4. **public/_redirects**
   - Netlify-only format
   - Handles non-www → www
   - Can keep file (Vercel ignores it) or delete

---

## MIGRATION CHECKLIST

### Before Migration
- [x] Verify vercel.json contains all necessary redirects
- [x] Verify next.config.js redirects are platform-agnostic
- [ ] Document any custom redirect needs

### During Vercel Setup
- [ ] Configure www.chefapprovedtools.com as primary domain
- [ ] Add chefapprovedtools.com as domain alias
- [ ] Verify HTTPS is enforced (should be automatic)

### After Migration
- [ ] Test /products/* → /reviews/* redirect
- [ ] Test /reviews/wusthof-classic-ikon-15-piece → 16-piece redirect
- [ ] Verify non-www → www redirect works
- [ ] Check http:// → https:// redirect
- [ ] Test /go/amazon/* redirect (even if unused)

### Cleanup
- [ ] Delete netlify.toml after successful migration
- [ ] Optionally delete public/_redirects (not used by Vercel)

---

## REDIRECT TESTING COMMANDS

After Vercel deployment, test with curl:

```bash
# Test products → reviews redirect
curl -I https://www.chefapprovedtools.com/products/victorinox-fibrox-8-inch-chefs-knife
# Expected: 301 redirect to /reviews/victorinox-fibrox-8-inch-chefs-knife

# Test Wusthof redirect
curl -I https://www.chefapprovedtools.com/reviews/wusthof-classic-ikon-15-piece
# Expected: 301 redirect to /reviews/wusthof-classic-ikon-16-piece

# Test non-www → www
curl -I https://chefapprovedtools.com/
# Expected: 301 redirect to https://www.chefapprovedtools.com/

# Test HTTP → HTTPS
curl -I http://www.chefapprovedtools.com/
# Expected: 301 redirect to https://www.chefapprovedtools.com/
```

---

## NOTES

1. **Good news:** Most redirects already configured in vercel.json and next.config.js
2. **Domain setup:** Primary migration task is domain configuration in Vercel dashboard
3. **Testing:** All redirects should be tested on staging deployment before production
4. **SEO preservation:** 301 redirects preserve link equity from search engines

---

**END OF REDIRECT AUDIT**
