# Review Quality Levels

**Note:** This is SEPARATE from the 3-Tier Expertise System (Professional/Home/Recommended badges shown to users)

---

## Overview

Quality Levels measure the **SEO strength, content quality, and conversion potential** of each review - not just word count.

---

## Quality Level 1 (Premium)

**Target:** Top-performing reviews that dominate search results and convert readers

### SEO Criteria:
- ✅ **Comprehensive keyword coverage** - Targets primary + 5+ related keywords naturally
- ✅ **Strong internal linking** - Links to 3+ related products, guides, and category pages
- ✅ **Rich structured data** - ProductReview schema, BreadcrumbList, FAQPage schema
- ✅ **Optimal readability** - Clear headings (H2-H3), short paragraphs, scannable layout
- ✅ **Image optimization** - All images have descriptive alt text, proper sizing

### Content Quality:
- ✅ **8+ detailed customer testimonials** - Real examples showing various use cases
- ✅ **Comprehensive FAQ** (8+ items) - Addresses all major questions with schema markup
- ✅ **Deep competitor analysis** - Compares 2-3 alternatives with specific pros/cons
- ✅ **Detailed specifications** - Complete tech specs and dimensions table
- ✅ **Performance metrics** - Real-world testing data and measurements
- ✅ **Expert insights** - Professional experience woven throughout (not generic)
- ✅ **Word count: 3,500+ words** (as a quality indicator, not the goal)

### Conversion Optimization:
- ✅ **3+ strategic CTAs** - Above fold, mid-article, final (using AffiliateButton)
- ✅ **Cost-per-use analysis** - Helps readers justify the purchase
- ✅ **Clear value proposition** - Why THIS product vs alternatives
- ✅ **Trust signals** - Professional testing, real usage timeframes
- ✅ **Related products section** - Cross-sell opportunities

### Technical Requirements:
- ✅ No unescaped characters (breaks build)
- ✅ No raw `<a>` tags for affiliate links
- ✅ No specific prices (use dynamic pricing language)
- ✅ All AffiliateButtons have position tracking
- ✅ TypeScript compiles without errors

---

## Quality Level 2 (Standard)

**Target:** Solid reviews that rank well and convert adequately

### SEO Criteria:
- ✅ Targets primary keyword + 2-3 related keywords
- ✅ Links to 2+ related products or guides
- ✅ Has ProductReview and Breadcrumb schemas
- ✅ Good heading structure
- ✅ Images have alt text

### Content Quality:
- ✅ **6+ customer testimonials** - Mix of use cases
- ✅ **6-8 FAQ items** with schema
- ✅ **Basic competitor comparison** - 1-2 alternatives mentioned
- ✅ **Specifications table** - Key specs covered
- ✅ **Performance overview** - General performance notes
- ✅ **Word count: 2,500+ words** (as a quality indicator)

### Conversion Optimization:
- ✅ **2-3 CTAs** - At least above fold and final
- ✅ **Basic value justification**
- ✅ **Clear pros/cons**

### Technical Requirements:
- ✅ Same as Quality Level 1

---

## Quality Level 3 (Needs Improvement)

**Characteristics:**
- ❌ Under 2,500 words OR
- ❌ Missing key sections (testimonials, FAQ, specs) OR
- ❌ Weak SEO (no internal links, poor structure) OR
- ❌ Low conversion elements (fewer than 2 CTAs) OR
- ❌ Technical issues (unescaped characters, raw links)

**Action:** Prioritize for upgrade to Level 2 minimum

---

## How Validation Works

The `review-validate.js` script checks:

1. **Structure** (20 points)
   - Required imports
   - productData object
   - Schemas
   - Navigation

2. **Content** (40 points)
   - Testimonial count
   - FAQ depth
   - Competitor comparison
   - Specifications completeness
   - Word count (as indicator, not sole criterion)

3. **SEO** (20 points)
   - Internal linking
   - Keyword coverage
   - Heading structure
   - Image optimization

4. **Conversion** (20 points)
   - CTA placement and count
   - Value proposition clarity
   - Cost-per-use analysis
   - Trust signals

**Scoring:**
- 90-100 points = Quality Level 1
- 75-89 points = Quality Level 2
- Below 75 = Quality Level 3

---

## Word Count Guidelines

Word count is an **indicator** of depth, not a goal:

- **Quality Level 1**: Usually 3,500+ words (but could be less if extremely well-optimized)
- **Quality Level 2**: Usually 2,500+ words (but could be less if very focused and valuable)

Focus on:
- ✅ Answering all user questions
- ✅ Providing actionable insights
- ✅ Including real examples and data
- ✅ Making the purchase decision easier

NOT on:
- ❌ Hitting an arbitrary word count
- ❌ Adding fluff content
- ❌ Repeating information

---

## Upgrade Priority

**High Priority** (upgrade these first):
- Products with high traffic potential
- Products you've used professionally
- Products in competitive niches
- Products with strong affiliate commissions

**Medium Priority:**
- Products with moderate search volume
- Products with unique angles
- Products filling content gaps

**Lower Priority:**
- Products with very low search volume
- Products we may discontinue reviewing
- Products already performing well despite lower quality level

---

## Remember

Quality Levels are **internal** - users never see them. They only see:
- The Expertise Tier badge (Professional/Home/Recommended)
- The review content quality
- The conversion elements

Use Quality Levels to guide your optimization work, not as a marketing message.
