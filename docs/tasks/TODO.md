# TODO - Chef Approved Tools

## 📧 Email Marketing Setup (BLOCKED - Waiting for email signups)

**Status:** ⏸️ ON HOLD - No email list yet

### Tasks to complete once email signups begin:

1. **ConvertKit/Email Service Setup**
   - [ ] Choose email service provider (ConvertKit, Mailchimp, etc.)
   - [ ] Create account and integrate with signup forms
   - [ ] Set up API keys in `.env.local`
   - [ ] Configure welcome email sequence
   - [ ] Create lead magnet delivery automation

2. **Contact Form Email Notifications**
   - [ ] Integrate transactional email service (Resend, SendGrid, or AWS SES) for contact form
   - [ ] Configure to send contact form submissions to your inbox
   - [ ] Note: Email Octopus only handles newsletter campaigns, not transactional emails
   - [ ] Update `/app/api/contact/route.ts` with chosen email service

2. **Email Sequences to Create**
   - [ ] Welcome email series (5-7 emails)
   - [ ] Product recommendation emails based on category interest
   - [ ] Newsletter template with kitchen tips + product recommendations
   - [ ] Re-engagement series for inactive subscribers

3. **Compliance Requirements**
   - [ ] Add unsubscribe link to all emails (CAN-SPAM)
   - [ ] Include physical mailing address in footer
   - [ ] Honor unsubscribe requests within 10 days
   - [ ] Maintain double opt-in for GDPR compliance

4. **Newsletter Content Strategy**
   - [ ] Weekly/monthly newsletter schedule
   - [ ] Content calendar: kitchen tips, product reviews, seasonal recommendations
   - [ ] Affiliate product recommendations in newsletter
   - [ ] Exclusive subscriber-only deals/content

5. **Forms Currently in Place (Ready to Activate)**
   - ✅ Newsletter signup form on homepage
   - ✅ Exit-intent popup with lead magnet offer
   - ✅ Contact form with email capture
   - ✅ Price alert signup (future feature)

### Why Waiting?
- No subscribers yet, so email service costs aren't justified
- Want to validate content and get initial traffic first
- Will activate once we have 50-100+ signups organically

---

## 🎯 Content Creation

### Product Reviews (7 completed / 18 listed / 20+ target)

**📋 See REVIEWS_TO_WRITE.md for additional 13 reviews to be written**

**✅ Complete Reviews (7):**
- ✅ Le Creuset 7.25-qt Dutch Oven (comprehensive 10-year review)
- ✅ KitchenAid KSM8990WH Commercial Mixer
- ✅ Wüsthof Classic IKON 16-Piece Knife Set
- ✅ John Boos Platinum Commercial Cutting Board
- ✅ Robot Coupe R2 Dice Food Processor
- ✅ Vitamix 5200 Blender
- ✅ Lodge Seasoned Cast Iron 3-Skillet Bundle

**📝 Listed on Reviews Page but Not Yet Written (12):**
- [ ] Victorinox Fibrox Pro 10" Chef's Knife
- [ ] Victorinox Fibrox Pro 8" Chef's Knife
- [ ] Victorinox 4" Paring Knife
- [ ] Victorinox Granton Edge Boning Knife
- [ ] Victorinox Offset Bread Knife
- [ ] OXO Good Grips Swivel Peeler
- [ ] OXO Good Grips Bench Scraper
- [ ] Winco Heavy Duty Tongs
- [ ] Benriner Large Mandoline
- [ ] Gold Textiles Bar Mops
- [ ] Epicurean Kitchen Cutting Board
- [ ] NoCry Cut Resistant Gloves (Amazon: https://amzn.to/4mUTNTs)

**🎯 Additional reviews needed:** 2+ more to reach 20+ target

### Product Review Roadmap (From PRODUCT_REVIEW_ROADMAP.md)
**7 Core Tools from Daily Professional Toolkit:**
- [ ] Victorinox Fibrox Professional Chef's Knife (10") - Priority: High
- [ ] Victorinox Fibrox Professional Chef's Knife (8") - Priority: High
- [ ] Victorinox Fibrox Boning Knife - Priority: Medium
- [ ] Forschner Offset Bread Knife - Priority: Medium
- [ ] OXO Good Grips Swivel Peeler - Priority: Low
- [ ] OXO Good Grips Bench Scraper - Priority: Low
- [ ] Beriner Professional Mandoline - Priority: High

### Buying Guides (4 completed)
- ✅ Best Chef Knives Guide (`/guides/best-chef-knives`)
- ✅ Best Cookware Guide (`/guides/best-cookware`)
- ✅ Kitchen Appliances Guide (`/guides/kitchen-appliances`)
- ✅ Knife Care Guide (`/guides/knife-care`)
- [ ] Additional category guides needed

### Blog Content (1 completed / 50 planned)

**📋 See BLOG_ARTICLES_TO_WRITE.md for complete list of 50 blog articles**

- ✅ How to Sear Steaks Like a Restaurant Chef (`/blog/how-to-sear-steaks-like-restaurant-chef`)
- [ ] 50 additional blog articles organized by category (see BLOG_ARTICLES_TO_WRITE.md)
  - Kitchen Safety & Hygiene (7 articles)
  - Knife Skills & Maintenance (3 articles)
  - Kitchen Tools & Equipment (3 articles)
  - Food Science & Techniques (8 articles)
  - Meat & Protein (6 articles)
  - Seasonings & Flavor (5 articles)
  - Sauces & Basics (3 articles)
  - Vegetables & Produce (7 articles)
  - Cooking Techniques & Tips (6 articles)
  - Plating & Presentation (1 article)
  - Health & Nutrition (1 article)

### Category Pages (3 completed)
- ✅ Knives category page (`/knives`)
- ✅ Cookware category page (`/cookware`)
- ✅ Appliances category page (`/appliances`)
- [ ] Additional category pages as needed

### Informational Pages (All completed ✅)
- ✅ About page (`/about`)
- ✅ Methodology page (`/methodology`)
- ✅ Contact page (`/contact`)
- ✅ Privacy Policy (`/privacy-policy`)
- ✅ Terms of Service (`/terms`)
- ✅ Cookie Policy (`/cookie-policy`)
- ✅ FTC Disclosure (`/disclosure`)

---

## 🎯 CTA A/B Testing Implementation

### Phase 1: Testing (Before Deploy)
- [ ] Test locally with `npm run dev`
- [ ] Test button variations on 2-3 review pages
- [ ] Verify affiliate links contain `?tag=chefapprovedtools-20`
- [ ] Test sticky mobile CTA on phone/mobile view
- [ ] Check browser console for errors
- [ ] Verify GA4 tracking fires (Network tab in dev tools)
- [ ] Test variant assignment: `localStorage.getItem('cta_variant')` in console
- [ ] Clear localStorage and verify new variant assigned on refresh

### Phase 2: Legal Clarification
- [ ] Contact Amazon Associates via https://affiliate-program.amazon.com/help/
- [ ] Ask about "Prime Eligible" text usage (no logo)
- [ ] Ask about available badges beyond "Available at Amazon"
- [ ] Ask about generic trust signals ("Free Returns Available", etc.)
- [ ] Get written confirmation on approved button text
- [ ] Save Amazon's response
- [ ] Update implementation based on their guidance

### Phase 3: Site Integration
- [ ] Choose 1 high-traffic review page to update first
- [ ] Update that page to use new AffiliateButton component
- [ ] Test updated page thoroughly
- [ ] Update remaining 26 review pages with new buttons
- [ ] Optionally add TrustSignals component to pages
- [ ] Verify all affiliate links still work

### Phase 4: Deploy to Production
- [ ] Commit changes with legal compliance message
- [ ] Push to main branch
- [ ] Monitor Vercel deployment dashboard
- [ ] Test on live site after deployment
- [ ] Verify affiliate links work on production
- [ ] Test on real mobile devices

### Phase 5: Monitor & Optimize (2-4 weeks after deploy)
- [ ] Check GA4 for `cta_variant_assigned` events
- [ ] Compare click-through rates by variant (A, B, C)
- [ ] Need 100+ clicks per variant for statistical significance
- [ ] If clear winner (>10% difference), implement site-wide
- [ ] If no clear winner, continue testing or use best performer
- [ ] Monitor error tracking in Vercel dashboard
- [ ] Check for user feedback/issues

**CTA Button Variations (Legal Compliant):**
- Variant A: "View on Amazon"
- Variant B: "Check Current Price"
- Variant C: "See Product Details"

**Blocked (Awaiting Amazon Verification):**
- Prime badge/logo usage
- "Prime Eligible" text with Amazon branding
- Any Amazon Prime brand colors for badges

**Related Files:**
- `docs/LEGAL-TODO.md` - Legal tracking document
- `docs/AB_TESTING_GUIDE.md` - Implementation guide
- `components/AffiliateButton.tsx` - Updated button
- `components/TrustSignals.tsx` - Generic trust badges
- `lib/ab-test.ts` - A/B test logic

---

## 🔍 SEO & Marketing

### On-Site SEO
- ✅ Structured data (Schema.org) implemented on all reviews
- ✅ Dynamic sitemap generation
- ✅ OpenGraph and Twitter Card meta tags
- ✅ Canonical URLs on all pages
- ✅ Mobile-responsive design
- [ ] Build backlinks from kitchen/cooking websites
- [ ] Guest post on culinary blogs
- [ ] Reach out to other food bloggers for collaboration
- [ ] Submit to kitchen equipment directories

### Google Search Console
- [ ] Set up Google Search Console (see GOOGLE_SEARCH_CONSOLE_SETUP.md)
- [ ] Submit sitemap
- [ ] Monitor indexing status
- [ ] Track keyword rankings
- [ ] Fix any crawl errors

### Content Marketing
- [ ] Pinterest strategy for visual product content
  - ✅ Victorinox Fibrox 10-inch pin created (`pinterest-pins/victorinox-fibrox-10-inch.md`)
  - ✅ OXO Bench Scraper pin created (`pinterest-pins/oxo-bench-scraper.md`)
  - [ ] Create pins for all reviews (5+ more needed)
- [ ] Social media strategy (see docs/social-media-for-introverts.md)
- [ ] Press outreach (template available in press-outreach-emails.md)

---

## 💰 Monetization

### Amazon Associates
- ✅ Amazon Associates integration with tracking
- ✅ Affiliate links on all product pages
- ✅ FTC-compliant disclosures
- [ ] Monitor Amazon Associates dashboard for first sales
- [ ] Track which products generate most clicks/conversions
- [ ] Optimize affiliate link placement based on analytics

### Additional Affiliate Programs
- [ ] Williams Sonoma affiliate program
- [ ] Sur La Table affiliate program
- [ ] Le Creuset direct affiliate program
- [ ] Other kitchen equipment retailers

### Future Revenue Streams
- [ ] Display ads (once traffic reaches 10k+ monthly visitors)
- [ ] Sponsored content (with proper disclosure)
- [ ] Digital products (buying guides, courses)
- [ ] Consulting services for home cooks

---

## 🚀 Technical & Performance

### Implementation Status (See IMPLEMENTATION_COMPLETE.md)
- ✅ Core Web Vitals optimization
- ✅ Service Worker for offline functionality
- ✅ Image optimization with Next.js
- ✅ Analytics integration (Google Analytics 4)
- ✅ Conversion optimization components
- ✅ A/B testing framework
- ✅ Security headers configuration

### Deployment (See NETLIFY_DEPLOYMENT_CHECKLIST.md)
- ✅ Netlify hosting configured
- ✅ Automatic deployments from GitHub
- ✅ Environment variables configured
- ✅ Custom domain setup
- [ ] Monitor Lighthouse CI scores
- [ ] Regular performance audits

### Testing & Quality
- ✅ TypeScript type checking
- ✅ ESLint configuration
- [ ] Set up automated testing
- [ ] Regular accessibility audits
- [ ] Browser compatibility testing

---

## 📊 Analytics & Metrics

### Google Analytics 4
- ✅ GA4 tracking code implemented
- [ ] Configure custom events for affiliate clicks
- [ ] Set up conversion goals
- [ ] Create custom dashboards
- [ ] Monitor Core Web Vitals in GA4

### Performance Monitoring
- ✅ Lighthouse CI integration
- [ ] Set up uptime monitoring
- [ ] Error tracking and logging
- [ ] Regular performance reports

### Performance Benchmarks (Lighthouse Scores)

**Baseline Benchmark - October 14, 2025**
- **Mobile:**
  - Performance: 96/100
  - Accessibility: 100/100
  - Best Practices: 100/100
  - SEO: 100/100
- **Desktop:**
  - Performance: 100/100
  - Accessibility: 96/100
  - Best Practices: 100/100
  - SEO: 100/100

**Notes:**
- Excellent baseline scores across all categories
- Mobile performance at 96 is exceptional (anything >90 is considered good)
- Desktop performance at perfect 100
- All SEO and Best Practices at 100
- Target: Maintain these scores or improve as site scales

### Key Metrics to Track
- [ ] Organic traffic growth
- [ ] Affiliate click-through rates
- [ ] Email signup conversion rate
- [ ] Average time on page
- [ ] Bounce rate by page type
- [ ] Search rankings for target keywords

---

## 📝 Recent Updates

### October 4, 2025
- ✅ Updated Le Creuset 7.25-qt Dutch Oven review with comprehensive content
  - Added 10-year testing methodology and results
  - Added customer reviews from Amazon (5,847 verified purchasers)
  - Added detailed comparison vs Staub and Lodge
  - Added comprehensive FAQ section (7 questions)
  - Added historical pricing analysis and buying strategy
  - Added lead magnet CTAs for cookware buying guide
  - Matched structure to KitchenAid/Wusthof review format
  - Fixed TypeScript warnings (removed unused imports)

---

## 🎯 Priority Tasks (Next 30 Days)

1. **CRITICAL (Do First - Revenue & Conversion Blockers)**
   - [x] **P1:** Check and fix Amazon affiliate links (COMPLETED - all links working)
   - [x] **P1.5:** Set up automated daily task to check Amazon links (COMPLETED - GitHub Action created)
   - [ ] **P1.6:** Add CJ Affiliate links for John Boos and Zwilling (2 products: John Boos cutting board, Wusthof 16-piece)
   - [x] **P2:** Fix images not working on some product pages (COMPLETED - 4 pages fixed)
   - [ ] **P3:** Fix review page images - they look horrible (conversion blocker)
     - [x] Temporary fix: Reduced image height to 480px with object-cover (cropping top/bottom)
     - [ ] TODO: Optimize actual product images to proper aspect ratio instead of CSS cropping
   - [ ] **P4:** Fix pagespeed issues (SEO/UX blocker)

2. **HIGH PRIORITY (Foundation - Do Before Content Creation)**
   - [ ] **P5:** Create new review template based on Le Creuset review (use best practices from featured reviews for SEO and conversions)
   - [ ] **P6:** Phase 1 - Upgrade the 7 featured reviews to new template
     - [ ] Le Creuset 7.25-qt Dutch Oven (base template)
     - [ ] KitchenAid KSM8990WH Commercial Mixer
     - [ ] Wüsthof Classic IKON 16-Piece Knife Set
     - [ ] John Boos Platinum Commercial Cutting Board
     - [ ] Robot Coupe R2 Dice Food Processor
     - [ ] Vitamix 5200 Blender
     - [ ] Lodge Seasoned Cast Iron 3-Skillet Bundle
   - [ ] **P7:** Phase 2 - Upgrade the remaining 11 reviews (including Fibrox 10" and 8" which are already written)
     - [ ] Victorinox Fibrox Pro 10" Chef's Knife (already written, needs upgrade)
     - [ ] Victorinox Fibrox Pro 8" Chef's Knife (already written, needs upgrade)
     - [ ] Victorinox 4" Paring Knife
     - [ ] Victorinox Granton Edge Boning Knife
     - [ ] Victorinox Offset Bread Knife
     - [ ] OXO Good Grips Swivel Peeler
     - [ ] OXO Good Grips Bench Scraper
     - [ ] Winco Heavy Duty Tongs
     - [ ] Benriner Large Mandoline
     - [ ] Gold Textiles Bar Mops
     - [ ] Epicurean Kitchen Cutting Board
   - [ ] **P8:** Audit every word of site (quality control after template updates)

3. **MEDIUM PRIORITY (Content Expansion)**
   - [ ] **P9:** Write new product reviews (see REVIEWS_TO_WRITE.md for full list)
     - [ ] Write Cuisinart review
     - [ ] Write KitchenAid Professional Stand Mixer review
     - [ ] Write Black and Decker toaster oven review
   - [ ] **P10:** Write 50 blogs (see BLOG_ARTICLES_TO_WRITE.md for full list)

4. **LOW PRIORITY (Marketing & Testing - After Content is Solid)**
   - [ ] **P11:** Setup 50 pins (Pinterest)
   - [ ] **P12:** Start testing products for future reviews
     - [ ] Start testing Ninja blender
     - [ ] Start testing Ninja air fryer
     - [ ] Start testing Instapot Duo
   - [ ] Write NoCry Cut Resistant Gloves review (affiliate: https://amzn.to/4mUTNTs)
     - [ ] Cross-link with Benriner Mandoline review (safety pairing)
     - [ ] Add safety callout box in mandoline review recommending gloves
     - [ ] Add to kitchen-bundle page (Part 1: Core Essentials, ~$15)
     - [ ] Add to sitemap and pricing data
   - [ ] Write Victorinox Fibrox 10" Chef's Knife review (from roadmap)
   - [ ] Write Victorinox Fibrox 8" Chef's Knife review (from roadmap)
   - [ ] Set up Google Search Console and submit sitemap
   - [ ] Create Pinterest pins for existing reviews
   - [ ] Monitor Amazon Associates for first conversions

2. **Medium Priority**
   - [ ] Write 2-3 blog posts for SEO (technique guides, tips)
   - [ ] Start building backlinks (reach out to 5-10 food bloggers)
   - [ ] Optimize existing reviews based on search data
   - [ ] Create comparison guides (Le Creuset vs Staub detailed comparison)

3. **Low Priority**
   - [ ] Expand social media presence
   - [ ] Create video content for YouTube
   - [ ] Develop email welcome sequence (when list grows)
   - [ ] Research additional affiliate programs

---

## 🔪 NoCry Cut Resistant Gloves - Product Addition Checklist

**Product:** NoCry Cut Resistant Gloves
**Amazon Affiliate Link:** https://amzn.to/4mUTNTs
**Price Point:** ~$15-20
**Strategic Positioning:** Safety essential, pairs with mandoline

### Tasks:
- [ ] Write comprehensive product review page (`/reviews/nocry-cut-resistant-gloves`)
  - [ ] Professional testing narrative (restaurant kitchen use)
  - [ ] Safety benefits and use cases
  - [ ] Comparison with other cut-resistant gloves
  - [ ] When to use (mandoline, oyster shucking, etc.)
- [ ] Cross-link with Benriner Mandoline review
  - [ ] Add safety callout box in mandoline review
  - [ ] Link to cut gloves review from mandoline page
  - [ ] Link to mandoline review from cut gloves page
- [ ] Add to kitchen-bundle page
  - [ ] Add to Part 1: Core Essentials (~$150 Foundation)
  - [ ] Update total investment calculation
  - [ ] Include dual CTAs (Amazon + Review link)
- [ ] Update site infrastructure
  - [ ] Add to `/app/sitemap.ts`
  - [ ] Add to `/data/pricing.ts`
  - [ ] Add to `/app/api/check-links/route.ts`
  - [ ] Update reviews index page

---

**Last Updated:** 2025-10-14

**Current Status:**
- 7 comprehensive product reviews completed
- Core site infrastructure complete
- SEO foundation in place
- ✅ A/B testing framework implemented (legal compliant)
- ✅ Legal compliance documentation created
- Ready for testing and deployment
- Ready for content scaling and traffic growth
