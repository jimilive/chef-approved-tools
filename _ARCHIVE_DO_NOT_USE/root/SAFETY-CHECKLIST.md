# Site Safety & Integrity Checklist

## Automated Checks (Run Before Every Deployment)

### ✅ Currently Implemented

Run `npm run validate:all` to execute all checks at once.

#### 1. Site Integrity (`npm run validate`)
**Auto-runs before every build**

Checks:
- ✅ Product slugs match between filesystem and database
- ✅ `getProductBySlug()` calls won't cause 404s
- ✅ Canonical URLs match actual page routes
- ✅ Internal review links point to valid pages
- ✅ Legacy product data is consistent

**This prevented:** Vitamix page being down for days

#### 2. Database Integrity (`npm run validate:db`)
Checks:
- ✅ Every product in database has a review folder
- ✅ Every review folder has a product in database
- ✅ All products have required fields (name, slug, category)
- ℹ️ Reports products without affiliate links (informational)

#### 3. Image References (`npm run validate:images`)
Checks:
- ✅ All `<img>` tags point to existing files
- ✅ All Next.js `<Image>` components point to real files
- ✅ Background images exist
- ℹ️ Reports missing alt attributes (accessibility)

#### 4. Affiliate Links (`npm run validate:links`)
Checks:
- ✅ Amazon links include your associate tag
- ✅ No untagged direct Amazon links
- ⚠️ Warns about hardcoded ASINs (should come from database)

#### 5. TypeScript Strict Mode
**Already enabled** in `tsconfig.json`
- ✅ Catches type errors at compile time
- ✅ Prevents undefined/null reference errors
- ✅ Enforces proper typing throughout codebase

---

## Manual Checks (Do Periodically)

### Before Major Releases

- [ ] Run `npm run build` - confirms all auto-checks pass
- [ ] Test critical user flows (homepage → review → Amazon)
- [ ] Check Google Search Console for 404s
- [ ] Verify images load on review pages
- [ ] Test on mobile device

### Weekly

- [ ] Check Google Analytics for unusual 404 patterns
- [ ] Review Netlify deploy logs for build warnings
- [ ] Run `npm run validate:all` manually to catch any drift

### Monthly

- [ ] Review and update product affiliate links
- [ ] Check for broken external links (tools, resources)
- [ ] Verify all review pages still render correctly
- [ ] Test site speed with Lighthouse

---

## Production Monitoring (Recommended Next Steps)

### Setup Guides Available

📖 **See `docs/PRODUCTION-MONITORING-SETUP.md` for detailed setup instructions**

### High Priority (Do This Week)

- [ ] **Error Tracking** - Setup Sentry (free, 30 min setup)
  - Catches JavaScript errors in production
  - Get alerts when things break
  - See exactly what went wrong

- [ ] **404 Monitoring** - Enable Google Search Console alerts (free, 5 min)
  - See which pages users try to access
  - Find broken links from external sites
  - Add redirects for common 404s

- [ ] **Uptime Monitoring** - Setup UptimeRobot (free, 10 min)
  - Know immediately if site goes down
  - Email/SMS alerts
  - 5-minute check intervals

### Medium Priority (Optional)

- [ ] **Real User Monitoring** - Add Vercel Speed Insights
- [ ] **Advanced 404 Tracking** - Custom analytics events
- [ ] **Performance Alerts** - Core Web Vitals degradation

### Low Priority

- [ ] **Dead External Link Checker** - Find broken external URLs
- [ ] **Performance Regression Tests** - Catch speed issues before deploy
- [ ] **Accessibility Checker** - Automated a11y testing
- [ ] **SEO Validator** - Meta descriptions, title lengths, etc.

---

## Emergency Procedures

### If Site Goes Down

1. Check Netlify deploy logs
2. Roll back to previous deploy if needed
3. Run `npm run validate:all` locally to diagnose
4. Fix issues and redeploy

### If Product Page is 404

1. Check if slug matches database: `node scripts/check-hotel-pans.mjs` (modify for product)
2. Verify folder exists: `ls app/reviews/[product-slug]`
3. Check redirects in `next.config.js`
4. Run `npm run validate` to find the issue

### If Affiliate Links Broken

1. Run `npm run validate:links` to find issues
2. Check `.env.local` has correct `AMAZON_ASSOCIATE_TAG`
3. Verify links in Supabase or page files have proper format

---

## Validation Scripts Reference

| Command | What It Does | When to Run |
|---------|-------------|-------------|
| `npm run validate` | Site integrity check | Auto-runs before build |
| `npm run validate:db` | Database integrity | After DB changes |
| `npm run validate:images` | Image existence check | Before major releases |
| `npm run validate:links` | Affiliate link check | Before major releases |
| `npm run validate:all` | All checks at once | Weekly manual check |
| `npm run type-check` | TypeScript errors | Before commits |
| `npm run build` | Build + all validations | Before deploy |

---

## What Would Have Prevented Past Issues

### Vitamix Page Down for Days
- ✅ **PREVENTED BY:** `npm run validate`
- Caught: Slug mismatch between page code and database
- Fixed: Automatic validation before build stops deployment

### Broken Blog Links (84 issues)
- ✅ **PREVENTED BY:** `npm run validate`
- Caught: Internal links to non-existent review pages
- Fixed: Validation + automatic link fixing script

---

## Notes

- All validation scripts exit with code 1 on errors, blocking deployment
- `prebuild` hook in package.json ensures validation runs automatically
- Errors stop deployment; warnings are informational only
- Scripts use colored output: 🔴 Red = Error, 🟡 Yellow = Warning, 🟢 Green = Success
