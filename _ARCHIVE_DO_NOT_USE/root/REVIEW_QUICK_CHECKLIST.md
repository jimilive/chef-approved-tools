# Review Quality Quick Checklist

**Use this for rapid quality assessment of any review.**

---

## Essential Components (Must Have All)

### Structure
- [ ] Proper imports (FTCDisclosure, AffiliateButton, schema generators, Link, Tier Badge)
- [ ] productData object with all fields
- [ ] breadcrumbs array
- [ ] metadata export
- [ ] Tier badge with testing period

### Content Sections (In Order)
1. [ ] Breadcrumb navigation
2. [ ] H1 title with year
3. [ ] Author byline
4. [ ] Tier badge
5. [ ] Quick stats box
6. [ ] FTC Disclosure
7. [ ] Quick Navigation (6+ links)
8. [ ] Primary CTA (AffiliateButton, above_fold)
9. [ ] Professional Verdict (2-3 paragraphs)
10. [ ] "Perfect For / Consider Alternatives" box
11. [ ] Hero features grid (4 boxes)
12. [ ] Main review content (1,500+ words)
13. [ ] Customer Testimonials (6-8, with `id="testimonials"`)
14. [ ] Cost-Per-Use Analysis (with `id="cost-analysis"`)
15. [ ] Performance Metrics (with `id="performance"`)
16. [ ] Mid-article CTA (AffiliateButton, mid_article)
17. [ ] Specifications Table (with `id="specs"`)
18. [ ] Competitor Comparison (with `id="comparison"`)
19. [ ] FAQ Section (8-10 questions, with `id="faq"` and schema)
20. [ ] Related Products (3 items)
21. [ ] Final CTA (AffiliateButton, final_cta)
22. [ ] Author bio
23. [ ] Structured data schemas (ProductReview + Breadcrumb)

---

## Critical Rules (Zero Tolerance)

### ❌ NEVER Do These
1. **NO raw `<a>` tags for affiliate links** → Use AffiliateButton
2. **NO specific current prices** → Use "Check price below" or ranges
3. **NO unescaped apostrophes** → Use `&apos;` not `'`
4. **NO unescaped quotes** → Use `&quot;` or proper quotes
5. **NO missing section IDs** → Quick Nav links must match section IDs
6. **NO vague claims** → "Very durable" is useless; "15 years without failure" is proof

---

## Quality Tier Standards

### Tier 1 (9.5-10/10)
- 15-20+ years testing
- 8-12 testimonials
- 3,500+ words
- 4 competitors in comparison
- 10+ FAQ items
- Example: KitchenAid KSM8990WH review

### Tier 2 (8.5-9.5/10)
- 5-15 years testing
- 6-8 testimonials
- 2,500+ words
- 2-3 competitors in comparison
- 8-10 FAQ items
- Example: Black+Decker Toaster Oven review

### Tier 3 (7-8.5/10) - NEEDS IMPROVEMENT
- 1-5 years testing
- 0-4 testimonials
- 1,500-2,500 words
- Missing key sections
- **Goal:** Upgrade all to Tier 2+

---

## Pre-Commit Commands

Run these before every commit:

```bash
# 1. Check for unescaped apostrophes
grep -n "It's\|don't\|won't\|can't\|I'm\|you're" app/reviews/[product-slug]/page.tsx

# 2. Check for specific prices
grep -n '\$[0-9][0-9][0-9]\.' app/reviews/[product-slug]/page.tsx

# 3. Check for raw affiliate links
grep -n 'href="https://www.amazon.com' app/reviews/[product-slug]/page.tsx | grep -v AffiliateButton

# 4. TypeScript check
npx tsc --noEmit

# 5. Build test
npm run build
```

**All must pass clean before committing!**

---

## Find Reviews Needing Updates

```bash
# Find reviews with raw affiliate links
grep -r "href=\"https://www.amazon.com" app/reviews/ --include="*.tsx" | grep -v "AffiliateButton"

# Find reviews missing testimonials
grep -L "What Real Users Are Saying" app/reviews/*/page.tsx

# Find reviews missing cost analysis
grep -L "Cost-Per-Use Analysis" app/reviews/*/page.tsx

# Find reviews missing performance metrics
grep -L "Performance Metrics" app/reviews/*/page.tsx

# Find reviews missing specs table
grep -L "Complete Specifications" app/reviews/*/page.tsx

# Find reviews missing comparison table
grep -L "vs. Competing" app/reviews/*/page.tsx

# Find short reviews (under 2,500 words)
for file in app/reviews/*/page.tsx; do
  words=$(wc -w < "$file")
  if [ "$words" -lt 2500 ]; then
    echo "$file: $words words (NEEDS EXPANSION)"
  fi
done
```

---

## Component Quick Reference

### AffiliateButton
```tsx
<AffiliateButton
  href="[full-url-with-tag]"
  merchant="amazon"
  product="product-slug"
  position="above_fold|mid_article|final_cta"
  variant="primary|secondary"
>
  Check Amazon Price →
</AffiliateButton>
```

### Link (Internal)
```tsx
<Link href="/reviews/product-slug" className="text-orange-600 hover:text-orange-800 underline">
  Product Name
</Link>
```

### Section with ID (for Quick Nav)
```tsx
<section className="mb-12" id="testimonials">
  <h2 className="text-3xl font-bold mb-6">What Real Users Are Saying</h2>
  {/* content */}
</section>
```

### FAQ with Schema
```tsx
<div itemScope itemType="https://schema.org/FAQPage">
  <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
       style={{ margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '6px' }}>
    <h3 itemProp="name">Question?</h3>
    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
      <div itemProp="text">
        <p>Answer</p>
      </div>
    </div>
  </div>
</div>
```

---

## 5-Minute Quality Check

**Can you answer YES to all of these?**

1. [ ] Does it have AffiliateButton for ALL affiliate links?
2. [ ] Does it have 6-8 customer testimonials?
3. [ ] Does it have cost-per-use analysis with calculations?
4. [ ] Does it have performance metrics with specific data?
5. [ ] Does it have complete specs table (2 columns)?
6. [ ] Does it have competitor comparison (2-4 competitors)?
7. [ ] Does it have Quick Navigation with working links?
8. [ ] Does it have 8-10 FAQ items with schema?
9. [ ] Does it have 3 related products with internal links?
10. [ ] Does it have structured data (ProductReview + Breadcrumb)?
11. [ ] Is it 2,500+ words?
12. [ ] NO specific prices in content?
13. [ ] NO unescaped apostrophes or quotes?
14. [ ] TypeScript compiles without errors?

**If you answered NO to any of these, the review needs work.**

---

## Common Fix Patterns

### Replace Raw Affiliate Link
**Find:**
```tsx
<a href="https://www.amazon.com/..." target="_blank" rel="nofollow noopener">
  Check Price
</a>
```

**Replace with:**
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

### Fix Unescaped Apostrophes
**Find:** `It's`, `don't`, `won't`, `can't`, `chef's`

**Replace with:** `It&apos;s`, `don&apos;t`, `won&apos;t`, `can&apos;t`, `chef&apos;s`

### Remove Specific Prices
**Find:** "costs $299.99", "priced at $450", "only $199"

**Replace with:** "Check current price below", "Budget-friendly pricing", "$200-400 range"

---

## Word Count Targets

- **Tier 1:** 3,500-5,000 words
- **Tier 2:** 2,500-4,000 words
- **Minimum acceptable:** 2,000 words

**Check word count:**
```bash
wc -w app/reviews/[product-slug]/page.tsx
```

---

## SEO Validation

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
   - Paste review URL
   - Verify ProductReview schema passes
   - Verify FAQPage schema passes

2. **Schema.org Validator:** https://validator.schema.org/
   - Copy structured data JSON
   - Verify no errors

---

For complete details, see `REVIEW_CREATION_GUIDE.md`.
