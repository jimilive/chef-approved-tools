# Chef Approved Tools - Review System Documentation

**Complete guide to creating and maintaining high-quality product reviews**

---

## 📚 Documentation Overview

This repository contains a comprehensive review creation and update system based on Tier 1 and Tier 2 quality standards established through the Black+Decker Toaster Oven and KitchenAid Commercial Mixer reviews.

### Available Documents

1. **[REVIEW_CREATION_GUIDE.md](./REVIEW_CREATION_GUIDE.md)** (6,420 words)
   - Complete step-by-step guide for creating new reviews
   - Detailed instructions for updating existing reviews
   - Component reference with code examples
   - Content writing guidelines
   - SEO and schema requirements
   - Quality assurance checklists

2. **[REVIEW_QUICK_CHECKLIST.md](./REVIEW_QUICK_CHECKLIST.md)** (2,500 words)
   - Rapid quality assessment checklist
   - Essential components list
   - Critical rules (zero tolerance items)
   - Pre-commit commands
   - Quick reference for components
   - 5-minute quality check

3. **[REVIEW_TEMPLATE.tsx](./REVIEW_TEMPLATE.tsx)** (working code)
   - Copy-paste template for new reviews
   - All required sections pre-structured
   - Placeholder text with instructions
   - Proper component usage examples
   - Ready to customize and deploy

---

## 🎯 Quality Tier System

### Tier 1 Reviews (9.5-10/10)
- **Testing Period:** 15-20+ years
- **Word Count:** 3,500-5,000 words
- **Testimonials:** 8-12 customer reviews
- **Competitors:** 3-4 comparison products
- **FAQ Items:** 10+ questions with schema

**Example:** `/app/reviews/kitchenaid-ksm8990wh/page.tsx`

### Tier 2 Reviews (8.5-9.5/10)
- **Testing Period:** 5-15 years
- **Word Count:** 2,500-4,000 words
- **Testimonials:** 6-8 customer reviews
- **Competitors:** 2-3 comparison products
- **FAQ Items:** 8-10 questions with schema

**Example:** `/app/reviews/black-decker-toaster-oven/page.tsx`

### Tier 3 Reviews (7-8.5/10) - NEEDS UPGRADE
- **Testing Period:** 1-5 years
- **Word Count:** 1,500-2,500 words
- **Testimonials:** 0-4 (or missing)
- Missing key sections (cost analysis, performance metrics, specs, comparison)

**Goal:** Upgrade all Tier 3 reviews to Tier 2 quality minimum.

---

## 🚀 Quick Start Guide

### Creating a New Review

1. **Copy the template:**
   ```bash
   cp REVIEW_TEMPLATE.tsx app/reviews/[product-slug]/page.tsx
   ```

2. **Replace all placeholders:**
   - Search for `[PLACEHOLDER]` and replace with actual content
   - Update productData object
   - Write your testing experience
   - Add 6-8 customer testimonials
   - Complete all required sections

3. **Run quality checks:**
   ```bash
   # Check for unescaped characters
   grep -n "It's\|don't\|won't" app/reviews/[product-slug]/page.tsx

   # Check for specific prices
   grep -n '\$[0-9][0-9][0-9]\.' app/reviews/[product-slug]/page.tsx

   # TypeScript check
   npx tsc --noEmit

   # Build test
   npm run build
   ```

4. **Deploy:** If all checks pass, commit and deploy.

### Updating an Existing Review

1. **Assess current quality** (see REVIEW_QUICK_CHECKLIST.md)

2. **Identify missing components:**
   ```bash
   # Find reviews needing updates
   grep -L "What Real Users Are Saying" app/reviews/*/page.tsx
   grep -L "Cost-Per-Use Analysis" app/reviews/*/page.tsx
   grep -L "Performance Metrics" app/reviews/*/page.tsx
   ```

3. **Add missing sections** (see REVIEW_CREATION_GUIDE.md, "Updating Existing Reviews")

4. **Replace raw affiliate links:**
   ```bash
   grep -n 'href="https://www.amazon.com' app/reviews/[product-slug]/page.tsx
   ```
   Replace all `<a>` tags with `<AffiliateButton>` component

5. **Run quality checks** (same as new reviews above)

---

## ✅ Critical Requirements (Zero Tolerance)

### 1. NO Raw Affiliate Links
**❌ Wrong:**
```tsx
<a href="https://www.amazon.com/...">Check Price</a>
```

**✅ Correct:**
```tsx
<AffiliateButton
  href="https://www.amazon.com/..."
  merchant="amazon"
  product="product-slug"
  position="above_fold"
  variant="primary"
>
  Check Amazon Price →
</AffiliateButton>
```

### 2. NO Specific Prices
**❌ Wrong:**
- "This costs $299.99"
- "Priced at $450 on Amazon"
- "Only $199 right now"

**✅ Correct:**
- "Check current price below"
- "Budget-friendly pricing"
- "$200-400 range" (acceptable for comparisons)
- "I paid $450 in 2007" (acceptable for historical cost analysis)

### 3. NO Unescaped Apostrophes or Quotes
**❌ Wrong:**
```tsx
<p>It's great for chef's knives</p>
```

**✅ Correct:**
```tsx
<p>It&apos;s great for chef&apos;s knives</p>
```

**Find these errors:**
```bash
grep -n "It's\|don't\|won't\|can't\|I'm" app/reviews/[product-slug]/page.tsx
```

### 4. ALL Sections Must Have Matching IDs
**❌ Wrong:**
```tsx
<nav>
  <a href="#testimonials">User Reviews</a>
</nav>
<!-- Section has no id -->
<section>
  <h2>What Real Users Are Saying</h2>
</section>
```

**✅ Correct:**
```tsx
<nav>
  <a href="#testimonials">User Reviews</a>
</nav>
<section id="testimonials">
  <h2>What Real Users Are Saying</h2>
</section>
```

---

## 📋 Required Components Checklist

Every review must have:

### Structure
- [ ] Imports (FTCDisclosure, AffiliateButton, schema generators, Link, Tier Badge)
- [ ] productData object
- [ ] breadcrumbs array
- [ ] metadata export

### Content Sections (in order)
1. [ ] Breadcrumb navigation
2. [ ] H1 title with year
3. [ ] Author byline
4. [ ] Tier badge
5. [ ] Quick stats box
6. [ ] FTC Disclosure
7. [ ] Quick Navigation (6+ links)
8. [ ] Primary CTA (AffiliateButton, above_fold)
9. [ ] Professional Verdict
10. [ ] "Perfect For / Consider Alternatives" box
11. [ ] Hero features grid (4 boxes)
12. [ ] Main testing content
13. [ ] Customer Testimonials (6-8, id="testimonials")
14. [ ] Cost-Per-Use Analysis (id="cost-analysis")
15. [ ] Performance Metrics (id="performance")
16. [ ] Mid-article CTA (AffiliateButton, mid_article)
17. [ ] Specifications Table (id="specs")
18. [ ] Competitor Comparison (id="comparison")
19. [ ] FAQ Section (8-10 items, id="faq", with schema)
20. [ ] Related Products (3 items)
21. [ ] Final CTA (AffiliateButton, final_cta)
22. [ ] Author bio
23. [ ] Structured data schemas (ProductReview + Breadcrumb)

---

## 🔍 Finding Reviews That Need Updates

### Quick Commands

```bash
# Find ALL reviews with quality issues
cd /Users/scottbradley/chef-approved-tools

# 1. Reviews using raw affiliate links (HIGH PRIORITY)
echo "=== Reviews with raw affiliate links ==="
grep -r "href=\"https://www.amazon.com" app/reviews/ --include="*.tsx" | grep -v "AffiliateButton" | cut -d: -f1 | sort -u

# 2. Reviews missing testimonials
echo "=== Reviews missing testimonials ==="
grep -L "What Real Users Are Saying\|Customer Testimonials" app/reviews/*/page.tsx

# 3. Reviews missing cost analysis
echo "=== Reviews missing cost analysis ==="
grep -L "Cost-Per-Use Analysis\|cost-analysis" app/reviews/*/page.tsx

# 4. Reviews missing performance metrics
echo "=== Reviews missing performance metrics ==="
grep -L "Performance Metrics\|Measured Performance" app/reviews/*/page.tsx

# 5. Reviews missing specs table
echo "=== Reviews missing specifications table ==="
grep -L "Complete Specifications\|Technical Specifications" app/reviews/*/page.tsx

# 6. Reviews missing competitor comparison
echo "=== Reviews missing comparison table ==="
grep -L "vs. Competing\|Comparison Table" app/reviews/*/page.tsx

# 7. Reviews with unescaped apostrophes (BREAKS BUILD)
echo "=== Reviews with unescaped apostrophes ==="
grep -r "It's\|don't\|won't\|can't" app/reviews/ --include="*.tsx" | cut -d: -f1 | sort -u

# 8. Reviews with specific prices (SHOULD REMOVE)
echo "=== Reviews with specific prices ==="
grep -r "costs \$[0-9]\|priced at \$[0-9]" app/reviews/ --include="*.tsx" | cut -d: -f1 | sort -u

# 9. Short reviews needing expansion
echo "=== Reviews under 2,500 words ==="
for file in app/reviews/*/page.tsx; do
  words=$(wc -w < "$file")
  if [ "$words" -lt 2500 ]; then
    echo "$file: $words words (NEEDS EXPANSION)"
  fi
done
```

### Priority Order for Updates

1. **Critical (breaks functionality):**
   - Unescaped apostrophes/quotes (prevents build)
   - Raw affiliate links (breaks tracking)

2. **High Priority (major quality issues):**
   - Missing productData object
   - Missing customer testimonials
   - Missing cost-per-use analysis
   - Specific prices in content

3. **Medium Priority (quality improvements):**
   - Missing performance metrics
   - Missing specifications table
   - Missing competitor comparison
   - Short word count (<2,500 words)

4. **Low Priority (nice to have):**
   - Fewer than 8 FAQ items
   - Fewer than 3 related products
   - Missing Quick Navigation

---

## 🛠️ Pre-Commit Checklist

**Run these commands before EVERY commit:**

```bash
# 1. Check for unescaped characters
grep -n "It's\|don't\|won't\|can't\|I'm\|you're\|chef's" app/reviews/[product-slug]/page.tsx

# 2. Check for specific prices
grep -n '\$[0-9][0-9][0-9]\.\|costs \$\|priced at' app/reviews/[product-slug]/page.tsx

# 3. Check for raw affiliate links
grep -n 'href="https://www.amazon.com' app/reviews/[product-slug]/page.tsx | grep -v AffiliateButton

# 4. TypeScript check (MUST PASS)
npx tsc --noEmit

# 5. Build test (MUST PASS)
npm run build

# 6. Word count check
wc -w app/reviews/[product-slug]/page.tsx
# Should be 2,500+ for Tier 2, 3,500+ for Tier 1
```

**If ANY of these fail, DO NOT COMMIT.**

---

## 📊 Quality Metrics

### Target Metrics for New/Updated Reviews

| Metric | Tier 1 | Tier 2 | Minimum |
|--------|--------|--------|---------|
| Word Count | 3,500+ | 2,500+ | 2,000 |
| Testing Period | 15+ years | 5-15 years | 1+ years |
| Customer Testimonials | 8-12 | 6-8 | 6 |
| Competitors Compared | 3-4 | 2-3 | 2 |
| FAQ Items | 10+ | 8-10 | 8 |
| CTAs (AffiliateButton) | 3+ | 3 | 3 |
| Related Products | 3+ | 3 | 3 |
| Structured Data Schemas | 2 | 2 | 2 |

### Success Indicators

**A quality review has:**
- ✅ All required components present
- ✅ 2,500+ words of substantive content
- ✅ Specific measurements (not vague claims)
- ✅ 6-8 customer testimonials with attribution
- ✅ Cost-per-use analysis with calculations
- ✅ Performance metrics with measured data
- ✅ Complete specifications table
- ✅ Competitor comparison (2-4 products)
- ✅ 8-10 FAQ items with schema markup
- ✅ 3 CTAs using AffiliateButton
- ✅ 3 related products with internal links
- ✅ NO specific prices (except historical)
- ✅ NO unescaped apostrophes/quotes
- ✅ NO raw affiliate links
- ✅ Passes TypeScript compilation
- ✅ Passes build without errors

---

## 🎓 Learning Resources

### Example Reviews (Study These)

**Tier 1 Standard:**
- `/app/reviews/kitchenaid-ksm8990wh/page.tsx`
  - 23 years of professional testing
  - Comprehensive cost analysis
  - Multiple comparison points
  - Rich testimonials

**Tier 2 Standard:**
- `/app/reviews/black-decker-toaster-oven/page.tsx`
  - 48 years across 4 models
  - Detailed cost-per-use breakdown
  - Thorough specifications
  - Strong competitor analysis

### Component Examples

**AffiliateButton:**
- See any of the example reviews for proper usage
- Three positions: above_fold, mid_article, final_cta
- Two variants: primary (orange), secondary (blue)

**Customer Testimonials:**
- Black+Decker review: 8 testimonials, well-attributed
- KitchenAid review: 6 testimonials, professional context

**Cost Analysis:**
- Black+Decker: 48-year breakdown, $0.01/use calculation
- KitchenAid: 18-year ROI, $0.18/use with context

**Performance Metrics:**
- Both reviews have specific measurements
- Temperature accuracy, longevity data, reliability stats
- Grid layout for easy scanning

---

## 🐛 Common Issues and Solutions

### Issue 1: Build Fails with JSX Syntax Error
**Cause:** Unescaped apostrophes (`It's` instead of `It&apos;s`)

**Solution:**
```bash
grep -n "It's\|don't\|won't" app/reviews/[product-slug]/page.tsx
# Replace all with escaped versions
```

### Issue 2: Affiliate Links Not Tracking
**Cause:** Using raw `<a>` tags instead of AffiliateButton

**Solution:**
```bash
grep -n 'href="https://www.amazon.com' app/reviews/[product-slug]/page.tsx
# Replace with AffiliateButton component
```

### Issue 3: Quick Navigation Links Don't Work
**Cause:** Section missing `id` attribute

**Solution:** Ensure every Quick Navigation link has a matching section:
```tsx
<a href="#testimonials">User Reviews</a>
<!-- Must have corresponding: -->
<section id="testimonials">...</section>
```

### Issue 4: Schema Validation Fails
**Cause:** Incomplete productData object

**Solution:** Verify all required fields:
- name, slug, brand, model, category
- priceRange (min, max, currency)
- rating, reviewCount
- pros, cons (arrays)
- affiliateLinks (array)
- expertRating, expertOpinion
- dateAdded, lastUpdated

### Issue 5: TypeScript Errors
**Cause:** Missing imports or incorrect types

**Solution:**
```tsx
// Ensure these imports are present:
import { Tier2Badge } from '@/components/ReviewTierBadge';
import FTCDisclosure from '@/components/FTCDisclosure';
import AffiliateButton from '@/components/AffiliateButton';
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import type { Metadata } from 'next';
```

---

## 📈 Workflow Summary

### New Review Workflow

1. Copy `REVIEW_TEMPLATE.tsx` to `app/reviews/[product-slug]/page.tsx`
2. Update metadata and productData
3. Write testing history and main content (2,500+ words)
4. Add customer testimonials (6-8)
5. Add cost-per-use analysis with calculations
6. Add performance metrics with specific data
7. Add specifications table (2-column layout)
8. Add competitor comparison (2-4 products)
9. Write FAQ section (8-10 questions with schema)
10. Add related products (3 items)
11. Run pre-commit checks (ALL must pass)
12. Commit and deploy

**Time estimate:** 3-5 hours for Tier 2 quality

### Update Existing Review Workflow

1. Assess current quality (use REVIEW_QUICK_CHECKLIST.md)
2. Create list of missing components
3. Add missing sections (start with critical items)
4. Replace raw affiliate links with AffiliateButton
5. Fix unescaped apostrophes/quotes
6. Remove specific prices
7. Add section IDs for Quick Navigation
8. Run pre-commit checks (ALL must pass)
9. Commit and deploy

**Time estimate:** 2-4 hours depending on current state

---

## 🎯 Goals and Metrics

### Short-Term Goals (Q1 2025)
- [ ] Upgrade all Tier 3 reviews to Tier 2 minimum
- [ ] Replace all raw affiliate links with AffiliateButton
- [ ] Fix all unescaped apostrophes/quotes
- [ ] Remove all specific prices from content
- [ ] Ensure all reviews have customer testimonials

### Medium-Term Goals (Q2 2025)
- [ ] All reviews 2,500+ words
- [ ] All reviews have cost-per-use analysis
- [ ] All reviews have performance metrics
- [ ] All reviews have specifications tables
- [ ] All reviews have competitor comparisons

### Long-Term Goals (2025)
- [ ] 50% of reviews at Tier 2 quality (8.5-9.5/10)
- [ ] 25% of reviews at Tier 1 quality (9.5-10/10)
- [ ] Consistent voice and quality across all reviews
- [ ] Strong internal linking network
- [ ] Comprehensive FAQ coverage across product categories

---

## 📞 Questions or Issues?

If you encounter problems or have questions:

1. **Check the guides:**
   - REVIEW_CREATION_GUIDE.md (comprehensive)
   - REVIEW_QUICK_CHECKLIST.md (rapid reference)

2. **Study example reviews:**
   - Black+Decker Toaster Oven (Tier 2)
   - KitchenAid Commercial Mixer (Tier 1)

3. **Validate your work:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org Validator](https://validator.schema.org/)

4. **Check component source:**
   - `components/AffiliateButton.tsx`
   - `components/ReviewTierBadge.tsx`
   - `lib/schema.ts`

---

**Last Updated:** January 2025
**System Version:** 1.0
