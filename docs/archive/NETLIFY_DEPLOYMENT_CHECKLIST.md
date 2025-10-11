# Netlify Deployment Checklist

Complete guide for configuring Netlify for optimal performance and monetization.

## ✅ Initial Setup (One-Time Configuration)

### 1. Connect GitHub Repository

- [ ] Sign in to Netlify: https://app.netlify.com
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Choose "GitHub" and authorize Netlify
- [ ] Select repository: `jimilive/chef-approved-tools`
- [ ] Click "Deploy site"

### 2. Configure Build Settings

In Netlify dashboard → **Site settings** → **Build & deploy**:

**Build settings:**
```
Base directory: (leave empty)
Build command: npm run build
Publish directory: .next
```

**Build image:**
- [ ] Use Ubuntu Focal 20.04 (default)
- [ ] Node version: 18 (set in netlify.toml)

**Deploy contexts:**

- [ ] **Production branch**: `main`
  - Deploy URL: `https://www.chefapprovedtools.com`
  - Auto-deploy: ✅ Enabled

- [ ] **Branch deploys**: Enable for `development` branch
  - Deploy URL: `https://development--chefapprovedtools.netlify.app`
  - Auto-deploy: ✅ Enabled

- [ ] **Deploy previews**: Enable for all pull requests
  - Creates unique URL per PR
  - Auto-comment on PR with preview link

### 3. Environment Variables

Go to **Site settings** → **Environment variables**:

- [ ] `NODE_VERSION` = `18`
- [ ] `NEXT_PUBLIC_AMAZON_TAG` = `chefapproved-20`
- [ ] `NEXT_TELEMETRY_DISABLED` = `1` (optional, reduces noise)

**Add more as needed:**
- [ ] `NEXT_PUBLIC_GA_ID` (when Google Analytics set up)
- [ ] Any API keys for future integrations

---

## 🌐 Domain Configuration

### 4. Custom Domain Setup

Go to **Site settings** → **Domain management**:

**Primary domain:**
- [ ] Click "Add custom domain"
- [ ] Enter: `www.chefapprovedtools.com`
- [ ] Click "Verify"

**DNS Configuration:**

If your domain is registered with:

**Option A: Use Netlify DNS (Recommended)**
- [ ] Click "Set up Netlify DNS"
- [ ] Update nameservers at your registrar to Netlify's nameservers
- [ ] Wait for DNS propagation (5 minutes - 48 hours)

**Option B: External DNS (Advanced)**
- [ ] Add CNAME record: `www` → `chefapprovedtools.netlify.app`
- [ ] Add A record: `@` → Netlify's load balancer IP
- [ ] Or add ALIAS/ANAME record: `@` → `chefapprovedtools.netlify.app`

**Domain redirects:**
- [ ] Enable "Redirect `chefapprovedtools.com` to `www.chefapprovedtools.com`"
- [ ] Enable "Force HTTPS" (automatic with Let's Encrypt)

### 5. SSL/HTTPS Certificate

- [ ] Verify "HTTPS" badge shows "Enabled"
- [ ] Certificate provider: Let's Encrypt (automatic)
- [ ] Auto-renewal: ✅ Enabled
- [ ] Force HTTPS: ✅ Enabled (already in netlify.toml)

---

## ⚡ Performance Optimization

### 6. Asset Optimization

Go to **Site settings** → **Build & deploy** → **Post processing**:

- [ ] **Pretty URLs**: ✅ Enabled (strip `.html` from URLs)
- [ ] **Bundle optimization**: ⚠️ Skip (Next.js handles this)
- [ ] **Image optimization**: ⚠️ Skip (Next.js Image component handles this)
- [ ] **Minify CSS**: ⚠️ Skip (Next.js handles this)
- [ ] **Minify JS**: ⚠️ Skip (Next.js handles this)

> **Note**: Next.js already optimizes everything. Netlify's post-processing can interfere.

### 7. Caching Configuration

Already configured in `netlify.toml`:
- ✅ Static assets: 1 year cache
- ✅ Images: 30 days cache
- ✅ HTML: No cache (dynamic content)
- ✅ _next/static: Immutable cache

**Verify caching headers work:**
```bash
curl -I https://www.chefapprovedtools.com/_next/static/css/app.css
# Should see: Cache-Control: public, max-age=31536000, immutable
```

---

## 📧 Forms & Email Capture

### 8. Netlify Forms Setup

For newsletter signup forms:

- [ ] Go to **Site settings** → **Forms**
- [ ] Enable form detection: ✅ Auto-enabled
- [ ] Configure spam filtering: ✅ Enabled (reCAPTCHA v2)

**In your HTML forms, add:**
```html
<form name="newsletter" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="newsletter" />
  <input type="email" name="email" placeholder="Your email" required />
  <button type="submit">Subscribe</button>
</form>
```

**Form notifications:**
- [ ] Set up email notifications: **Forms** → **Form notifications**
- [ ] Add your email to receive submissions
- [ ] Or integrate with Zapier/Mailchimp/ConvertKit

### 9. Spam Protection

- [ ] Enable Netlify's built-in spam detection (free)
- [ ] Optional: Add reCAPTCHA for extra protection
- [ ] Set up honeypot fields (invisible to users)

---

## 📊 Analytics & Monitoring

### 10. Netlify Analytics (Recommended)

Go to **Analytics** tab:

- [ ] Enable Netlify Analytics: **$9/month** (worth it!)
- [ ] Provides server-side analytics (no cookie banner needed)
- [ ] Tracks:
  - Page views
  - Top pages
  - Traffic sources
  - Bandwidth usage
  - 404 errors
  - Top exit pages

**Benefits over Google Analytics:**
- ✅ No client-side JavaScript (better performance)
- ✅ Not blocked by ad blockers
- ✅ 100% accurate (no sampling)
- ✅ No cookie consent required
- ✅ GDPR compliant

### 11. Deploy Notifications

Go to **Site settings** → **Build & deploy** → **Deploy notifications**:

- [ ] **Deploy started**: Slack/email notification (optional)
- [ ] **Deploy succeeded**: Email notification ✅
- [ ] **Deploy failed**: Email notification ✅ (important!)
- [ ] **Deploy preview ready**: Comment on GitHub PR ✅

**Recommended setup:**
- [ ] Email notification to your inbox for failed deploys
- [ ] Slack webhook for team notifications (if applicable)
- [ ] GitHub PR comments for deploy previews

---

## 🔐 Security Configuration

### 12. Security Headers

Already configured in `netlify.toml`:
- ✅ `X-Frame-Options: DENY` (prevent clickjacking)
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Strict-Transport-Security` (HSTS)
- ✅ `Content-Security-Policy`

**Verify headers:**
```bash
curl -I https://www.chefapprovedtools.com
```

### 13. Access Control

Go to **Site settings** → **Access control**:

**Branch deploy access:**
- [ ] Set `development` branch to "Public" or "Password protected"
- [ ] If password protected, share password with team

**Deploy preview access:**
- [ ] Keep "Public" for easy PR reviews
- [ ] Or set to "Private - Members only" for sensitive content

---

## 🚀 Advanced Features

### 14. Build Plugins (Optional)

Go to **Plugins** → **Manage plugins**:

**Recommended plugins:**

- [ ] **Next.js Plugin** (auto-installed for Next.js sites)
  - Optimizes Next.js deployments
  - Handles ISR (Incremental Static Regeneration)

- [ ] **Sitemap Plugin** (optional - you already have sitemap)
  - Auto-generates sitemap on build
  - Your current sitemap is already excellent

- [ ] **Lighthouse Plugin** (recommended)
  - Runs Lighthouse on every deploy
  - Fails build if scores drop below threshold
  - Install: `npm install --save-dev @netlify/plugin-lighthouse`

**To enable Lighthouse plugin:**

Add to `netlify.toml`:
```toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"
  [plugins.inputs]
    thresholds.performance = 0.9
    thresholds.accessibility = 0.9
    thresholds.best-practices = 0.9
    thresholds.seo = 0.9
```

### 15. Edge Functions (Future Enhancement)

For advanced use cases:

- [ ] **Geo-location redirects**: Show different content by country
- [ ] **A/B testing**: Test different layouts/content
- [ ] **Personalization**: Dynamic content based on user behavior

**Currently not needed**, but available when you want to:
- Redirect international visitors to region-specific Amazon sites
- A/B test different homepage layouts
- Personalize product recommendations

### 16. Serverless Functions

Your current setup includes:
- ✅ `/api/check-links` - Affiliate link health monitoring

**Future function ideas:**
- `/api/track-click` - Track affiliate link clicks server-side
- `/api/product-prices` - Fetch real-time Amazon prices
- `/api/contact` - Contact form handler
- `/api/analytics` - Custom analytics events

Functions directory: `netlify/functions/` (already configured)

---

## 📈 Performance Monitoring

### 17. Lighthouse CI (Optional but Recommended)

Set up automated Lighthouse tests:

```bash
npm install --save-dev @lhci/cli
```

**In `.github/workflows/lighthouse.yml`:**
```yaml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

**Benefits:**
- Automatic performance testing on every PR
- Prevents performance regressions
- Shows score trends over time

### 18. Real User Monitoring

Monitor actual user experience:

- [ ] Enable Netlify Analytics ($9/mo)
- [ ] Or add Google Analytics 4 (free)
- [ ] Track Core Web Vitals in production
- [ ] Monitor 404 errors and fix them

---

## 🔄 Continuous Deployment Workflow

### 19. Deploy Triggers

Already configured:

**Auto-deploy triggers:**
- ✅ Push to `main` → Deploy to production
- ✅ Push to `development` → Deploy to staging
- ✅ Create PR → Deploy preview
- ✅ Update PR → Re-deploy preview

**Manual deploys:**
- [ ] Can trigger from Netlify dashboard: **Deploys** → **Trigger deploy**
- [ ] Options: Clear cache and deploy / Deploy without cache

### 20. Build Hooks (Webhooks)

For external integrations:

- [ ] Go to **Site settings** → **Build & deploy** → **Build hooks**
- [ ] Create webhook: `https://api.netlify.com/build_hooks/[YOUR-HOOK-ID]`

**Use cases:**
- Trigger deploy from CMS (Contentful, Sanity)
- Scheduled deploys (via cron job)
- Deploy from external CI/CD

**Example: Daily auto-deploy for price updates:**
```bash
# In external cron service (cron-job.org)
curl -X POST -d '{}' https://api.netlify.com/build_hooks/[YOUR-HOOK-ID]
```

---

## ✅ Pre-Launch Checklist

### Final Verification Before Going Live:

**DNS & Domain:**
- [ ] Custom domain configured: `www.chefapprovedtools.com`
- [ ] SSL certificate active (green padlock in browser)
- [ ] HTTP → HTTPS redirect working
- [ ] `chefapprovedtools.com` → `www.chefapprovedtools.com` redirect working

**Performance:**
- [ ] Lighthouse score 100/100 on production URL
- [ ] No console errors in browser
- [ ] All images loading correctly
- [ ] Site loads in < 2 seconds

**Functionality:**
- [ ] All affiliate links work (test 3-5 randomly)
- [ ] Recently Viewed feature works (visit 3+ reviews)
- [ ] Mobile navigation works
- [ ] Forms submit successfully (if applicable)
- [ ] Search works (if applicable)

**SEO:**
- [ ] `sitemap.xml` accessible: https://www.chefapprovedtools.com/sitemap.xml
- [ ] `robots.txt` accessible: https://www.chefapprovedtools.com/robots.txt
- [ ] Meta descriptions present on all pages
- [ ] OpenGraph images display correctly (test with https://metatags.io)
- [ ] Schema.org structured data valid (test with https://validator.schema.org)

**Analytics & Monitoring:**
- [ ] Netlify Analytics enabled
- [ ] Google Analytics 4 installed (if using)
- [ ] Google Search Console verified
- [ ] Bing Webmaster Tools verified
- [ ] Deploy notifications working (test with dummy deploy)

**Content:**
- [ ] All 8 product reviews published
- [ ] Glossary page complete
- [ ] About/Contact pages ready (if applicable)
- [ ] FTC disclosures present on all review pages
- [ ] Affiliate disclaimers clear and compliant

**Legal & Compliance:**
- [ ] Amazon Associates terms complied with
- [ ] FTC affiliate disclosure on every page
- [ ] Privacy policy published (if collecting emails)
- [ ] Cookie policy (if using tracking cookies)

---

## 🛠️ Post-Launch Maintenance

### Weekly Tasks:

- [ ] Check Netlify Analytics for traffic trends
- [ ] Monitor 404 errors and fix broken links
- [ ] Review top-performing pages
- [ ] Run `/api/check-links` to verify affiliate links

### Monthly Tasks:

- [ ] Update product pricing on review pages
- [ ] Check Google Search Console for indexing issues
- [ ] Review and respond to any form submissions
- [ ] Update content based on search queries (GSC)
- [ ] Add 1-2 new product reviews

### Quarterly Tasks:

- [ ] Audit site performance (Lighthouse)
- [ ] Update dependencies (`npm outdated` → `npm update`)
- [ ] Review and optimize underperforming pages
- [ ] Check competitor sites for new trends
- [ ] Update seasonal content

---

## 🆘 Troubleshooting

### Build Failures

**Error: "Build script not found"**
- Check `netlify.toml` has `command = "npm run build"`
- Verify `package.json` has `"build": "next build"`

**Error: "Module not found"**
- Check all dependencies are in `package.json`
- Verify `package-lock.json` is committed
- Clear cache and redeploy

**Error: "Out of memory"**
- Increase Node memory: `NODE_OPTIONS=--max_old_space_size=4096 next build`
- Contact Netlify support for build limits

### Deployment Issues

**Site shows old content:**
- Clear browser cache
- Check deploy time in Netlify dashboard
- Clear CDN cache: **Deploys** → **Trigger deploy** → **Clear cache and deploy**

**404 errors on page refresh:**
- Verify `netlify.toml` has SPA redirect rule
- Check Next.js is exporting properly

**Slow site performance:**
- Check Lighthouse scores
- Review Netlify Analytics for large assets
- Optimize images with Next.js Image component

### Domain Issues

**Site not accessible:**
- Verify DNS propagation: https://dnschecker.org
- Check nameservers are correct
- Wait up to 48 hours for full propagation

**SSL certificate error:**
- Verify domain is correctly configured
- Check DNS points to Netlify
- Regenerate certificate in Netlify dashboard

---

## 📚 Resources

- **Netlify Docs**: https://docs.netlify.com
- **Next.js on Netlify**: https://docs.netlify.com/frameworks/next-js/overview/
- **Build Settings**: https://docs.netlify.com/configure-builds/overview/
- **Custom Domains**: https://docs.netlify.com/domains-https/custom-domains/
- **Forms**: https://docs.netlify.com/forms/setup/
- **Functions**: https://docs.netlify.com/functions/overview/

**Support:**
- Netlify Support: https://answers.netlify.com
- Community Forum: https://answers.netlify.com
- Status Page: https://www.netlifystatus.com

---

## ✅ You're All Set!

Your Netlify configuration is production-ready. Key features:

✅ Continuous deployment from GitHub
✅ Branch deploys for staging
✅ Deploy previews for PRs
✅ Custom domain with SSL
✅ Security headers configured
✅ Performance optimization
✅ Amazon affiliate redirects
✅ Form handling ready
✅ Analytics-ready

**Next Steps:**
1. Complete domain DNS setup
2. Enable Netlify Analytics ($9/mo)
3. Submit sitemap to Google/Bing
4. Start monitoring traffic and conversions

**🚀 Ready to monetize!**