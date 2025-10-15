# GA4 Reporting Guide - Phase 1 Analytics

## Quick Access: Where to Find Your Data

This guide shows you **exactly where to click** in Google Analytics 4 to see your new tracking data. No analytics degree required!

---

## 🎯 Top 5 Reports You Need to Check Weekly

### 1. Product Impression Performance
**Answers:** Which products are people seeing? Are they clicking?

**How to Access:**
1. Open Google Analytics 4
2. Click **Reports** (left sidebar)
3. Click **Engagement** > **Events**
4. Search for: `view_item`
5. Click on `view_item` event

**What to Look For:**
- **Event count** = Total product impressions
- Click "View item name" dimension to see which products
- High impressions + Low clicks = Product needs better positioning

**Decision:** Feature high-impression, low-click products more prominently OR remove products that don't interest anyone.

---

### 2. CTA Visibility vs Clicks
**Answers:** Are people seeing CTAs but not clicking? Where should CTAs be placed?

**How to Access:**
1. **Reports** > **Engagement** > **Events**
2. Search for: `cta_impression`
3. Click on event, then add dimension: `cta_position`

**What to Look For:**
- Compare `cta_impression` count to `affiliate_click` count
- If ratio is low (< 10% clicks per impression), CTAs need work
- Check which positions get most impressions

**Decision:** Move CTAs to higher-performing positions. Test different CTA copy on low-performing positions.

---

### 3. Mobile vs Desktop Conversion
**Answers:** Is mobile traffic converting differently than desktop?

**How to Access:**
1. **Reports** > **Engagement** > **Events**
2. Click on `affiliate_click` event
3. Click "+ Add dimension" button
4. Add: `device_type` (custom dimension)

**What to Look For:**
- Compare click counts by device type
- Calculate CTR: clicks / impressions for each device
- Mobile should be similar to desktop (~70-100% of desktop rate)

**Decision:** If mobile is < 70% of desktop, you have mobile UX issues to fix. Check CTA sizes, page speed, content length.

---

### 4. Scroll Depth Before Conversion
**Answers:** How far do people scroll before clicking affiliate links?

**How to Access:**
1. **Reports** > **Engagement** > **Events**
2. Click on `cta_impression`
3. Add parameter: `scroll_depth_at_view`

**What to Look For:**
- Average scroll depth when CTAs first viewed
- If CTAs viewed at 80%+ scroll, they're too far down
- Best performing CTAs are usually viewed at 20-40% scroll

**Decision:** Move high-performing products' CTAs higher on page. Add more CTAs above the fold for popular items.

---

### 5. Content Type Performance
**Answers:** Which content types drive the most conversions?

**How to Access:**
1. **Reports** > **Engagement** > **Events**
2. Click on `affiliate_click`
3. Add dimension: `content_type`

**What to Look For:**
- Clicks per content type (review, guide, blog, category)
- Time investment vs conversion rate
- Which tier reviews (1, 2, 3) convert best

**Decision:** Create more of the content type that converts best. If Tier 1 reviews convert 3x better than Tier 3, prioritize Tier 1 content.

---

## 📊 Setting Up Custom Reports (One-Time Setup)

### Create "Product Performance Dashboard"

This shows all product data in one place.

**Steps:**
1. Click **Explore** (left sidebar)
2. Click **Blank** template
3. Name it: "Product Performance Dashboard"
4. **Dimensions** section: Click "+" and add:
   - `item_name`
   - `item_category`
   - `device_type`
   - `content_type`
5. **Metrics** section: Click "+" and add:
   - `Event count` (for view_item)
   - `Event count` (for affiliate_click)
6. **Tab settings:** Add visualization: Table
7. Drag dimensions and metrics to table
8. Save

**How to Use:**
- See all products in one table
- Compare impressions vs clicks
- Sort by conversion rate
- Filter by device type or category

---

### Create "CTA Effectiveness Report"

Shows which CTAs are working (and which aren't).

**Steps:**
1. **Explore** > **Blank** template
2. Name it: "CTA Effectiveness"
3. **Dimensions:** Add:
   - `cta_id`
   - `cta_position`
   - `device_type`
4. **Metrics:** Add:
   - `Event count` (cta_impression)
   - `Event count` (cta_engagement)
   - `Event count` (affiliate_click)
5. Create calculated metric: `CTR = affiliate_click / cta_impression * 100`
6. Add table visualization
7. Save

**How to Use:**
- See click-through rate for each CTA
- Identify underperforming CTAs
- Compare above_fold vs mid_article vs final_cta
- Find mobile vs desktop differences

---

### Create "Mobile vs Desktop Comparison"

**Steps:**
1. **Explore** > **Blank**
2. Name it: "Device Comparison"
3. **Segments:** Add:
   - Mobile Traffic (filter: device_type = mobile)
   - Desktop Traffic (filter: device_type = desktop)
4. **Metrics:** Add:
   - Sessions
   - Events (view_item)
   - Events (affiliate_click)
   - Conversion rate
5. Visualization: Bar chart comparing mobile vs desktop
6. Save

**How to Use:**
- Quick visual comparison
- Spot mobile problems immediately
- Track improvements over time

---

## 🔍 Daily Quick Check (5 Minutes)

### Morning Dashboard Check

**Goal:** Spot problems quickly

1. **Check Total Traffic:** Reports > Life Cycle > Acquisition > Traffic Acquisition
   - Any sudden drops/spikes?

2. **Check Conversions:** Reports > Engagement > Events > affiliate_click
   - How many clicks yesterday?
   - Compare to last week

3. **Check Device Split:** affiliate_click event > add device_type dimension
   - Is mobile still converting?

4. **Check Top Products:** view_item event > item_name dimension
   - Which products got most attention?

---

## 📈 Weekly Review (30 Minutes)

### Monday Morning Routine

**Goal:** Make data-driven decisions

1. **Product Performance (10 min)**
   - Open "Product Performance Dashboard"
   - Sort by impressions (descending)
   - Note: Products with high impressions, low clicks
   - **Action:** Update copy or images for underperformers

2. **CTA Optimization (10 min)**
   - Open "CTA Effectiveness Report"
   - Find CTAs with < 5% CTR
   - Compare positions (above_fold vs mid_article)
   - **Action:** Move or rewrite low-performing CTAs

3. **Mobile Check (5 min)**
   - Open "Mobile vs Desktop Comparison"
   - Calculate mobile/desktop conversion ratio
   - **Action:** If mobile < 70% of desktop, add to fix list

4. **Content Planning (5 min)**
   - Check content_type performance
   - Check review_tier performance
   - **Action:** Plan next week's content based on winners

---

## 🎓 Reading Your Data (Quick Guide)

### What "Good" Looks Like

**Product Impressions:**
- 100+ impressions per product per week = Good visibility
- < 50 impressions = Product buried, needs better placement

**Click-Through Rate (CTR):**
- 5-10% = Good (5-10 clicks per 100 impressions)
- 2-5% = Okay, room for improvement
- < 2% = Problem - CTA or product not compelling

**CTA Time-in-View:**
- 3-8 seconds = Good (user is considering)
- < 2 seconds = User scrolling past quickly
- > 15 seconds = User reading carefully but not convinced

**Mobile vs Desktop Ratio:**
- 0.7-1.2 = Great (mobile converting similarly)
- 0.4-0.7 = Fair (mobile needs work)
- < 0.4 = Critical (mobile experience broken)

**Scroll Depth at CTA View:**
- 20-40% = Perfect (CTA seen early)
- 40-60% = Good (reasonable scroll required)
- 60-80% = Fair (CTA might be too far down)
- > 80% = Poor (most users never see it)

---

## 🚨 Red Flags to Watch For

### Immediate Action Required

1. **Sudden Drop in affiliate_click Events**
   - Check: Are tracking scripts still loading?
   - Check: Did you break something in last deploy?
   - Fix: Rollback changes or fix tracking code

2. **Mobile Conversions < 50% of Desktop**
   - Check: Mobile page speed (use PageSpeed Insights)
   - Check: CTAs visible on mobile viewport
   - Fix: Improve mobile UX, test on real devices

3. **High Impressions, Zero Clicks on Product**
   - Check: Is affiliate link broken?
   - Check: Is price obviously too high?
   - Fix: Update product or remove from featured

4. **CTA Impressions but 0% CTR**
   - Check: Is CTA button broken?
   - Check: Is CTA copy confusing?
   - Fix: Test CTA, update copy

---

## 📱 Mobile App (Check Data Anywhere)

### Google Analytics App

**Download:** iOS App Store or Google Play Store

**Setup:**
1. Install "Google Analytics" app
2. Sign in with your Google account
3. Select Chef Approved Tools property

**What to Check:**
- Real-time active users
- Today's affiliate clicks
- Top products viewed
- Device breakdown

**Use case:** Check conversions while away from desk

---

## 🎯 Making Decisions from Data

### Decision Framework

**Example 1: Product Gets High Impressions, Low Clicks**

Data shows:
- Victorinox knife: 500 impressions, 10 clicks (2% CTR)
- Wusthof knife: 200 impressions, 30 clicks (15% CTR)

**Decision:** Move Wusthof to featured position, make Victorinox less prominent OR improve Victorinox copy/images.

---

**Example 2: Mobile CTR Is 50% of Desktop**

Data shows:
- Desktop: 100 CTA impressions, 12 clicks (12% CTR)
- Mobile: 200 CTA impressions, 12 clicks (6% CTR)

**Decision:** Mobile users see CTAs but don't click. Check:
- CTA button size (too small?)
- Page speed (too slow?)
- Content length (too much reading required?)

**Action:** Test larger CTAs on mobile, optimize images, reduce content above CTAs.

---

**Example 3: Final CTA Has Low Impressions**

Data shows:
- above_fold CTA: 1000 impressions, 80 clicks
- final_cta CTA: 100 impressions, 5 clicks

**Decision:** Only 10% of users scroll to final CTA. Either:
- Content too long (users leave before final CTA)
- Early CTAs converting (no need for final CTA)

**Action:** Add mid-article CTA, shorten content, or remove final CTA entirely.

---

## 🔧 Troubleshooting

### "I don't see my custom events"

**Check:**
1. Are you in the right GA4 property?
2. Did you wait 24-48 hours? (GA4 has delay for new events)
3. Is GTM installed and working? (Check with GTM Preview mode)
4. Are events showing in DebugView? (Reports > Admin > DebugView)

**Fix:** Use DebugView (real-time) to test immediately

---

### "device_type dimension not showing"

**Setup Required:**
1. Go to **Admin** (left sidebar, bottom)
2. Click **Custom definitions**
3. Click **Create custom dimension**
4. Name: `device_type`
5. Scope: `Event`
6. Parameter name: `device_type`
7. Click **Save**

Repeat for:
- `content_type`
- `review_tier`
- `cta_position`
- `cta_id`

**Note:** These will only work for NEW data (after creation)

---

### "Data looks wrong / inconsistent"

**Common Causes:**
1. Testing in incognito mode (cookies blocked)
2. Ad blockers preventing tracking
3. Multiple people testing simultaneously
4. Local development traffic mixing with production

**Fix:**
- Filter out internal traffic (Admin > Data Streams > Configure tag settings > Define internal traffic)
- Use GTM environments to separate dev/prod tracking

---

## 📚 Next Steps

**After 2 Weeks of Data:**
1. Run your first weekly review
2. Identify top 3 optimization opportunities
3. Implement changes
4. Measure results after another 2 weeks

**Ready for Phase 2?**
Once you're comfortable with Phase 1 reports, Phase 2 adds:
- FAQ interaction tracking
- Trust signal effectiveness
- Exit point analysis
- Time-in-view measurements

---

## Quick Reference: Key Event Names

| Event Name | What It Tracks | Where to Find |
|------------|----------------|---------------|
| `view_item` | Product impressions | Engagement > Events |
| `cta_impression` | CTA visibility | Engagement > Events |
| `cta_engagement` | CTA time in view | Engagement > Events |
| `affiliate_click` | Affiliate link clicks | Engagement > Events |
| `email_signup` | Newsletter signups | Engagement > Events |
| `scroll_depth` | How far users scroll | Engagement > Events |
| `page_context` | Page type context | Engagement > Events |

---

## Questions?

If you can't find an answer:
1. Check GA4 documentation: analytics.google.com/analytics/academy
2. Check your browser console for tracking logs
3. Use GTM Preview mode to debug events
4. Review `/docs/analytics/PHASE1_IMPLEMENTATION_GUIDE.md`

**Remember:** It's better to track consistently and make small optimizations than to get overwhelmed trying to track everything perfectly.

Start with the Top 5 Reports. Everything else is bonus! 🚀
