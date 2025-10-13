# Review Page Standardization Plan

**Created:** 2025-10-13
**Status:** Planning
**Target:** 12 problem pages (eventually all 27)

---

## Audit Summary

- **Total Pages:** 27
- **Pages with tracker:** 15 ✅
- **Pages needing work:** 12 ❌
- **Most common issues:**
  - 16 pages using `<img>` instead of `<Image>`
  - 12 pages missing ProductViewTrackerWrapper
  - 11 pages missing productData structure
  - 7 pages with poor internal linking

---

## Scope: What We'll Fix on the 12 Problem Pages

### **MUST FIX (Critical - Do Now)**

#### 1. Add ProductViewTrackerWrapper
```tsx
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'

// In component return:
<div className="min-h-screen bg-gray-50">
  <ProductViewTrackerWrapper
    slug={productData.slug}
    name={productData.name}
    image="/logo.png"
    price={productData.priceRange.min}
  />
  {/* rest of content */}
</div>
```
**Impact:** Enables "Recently Viewed" feature
**Effort:** Low (import + component)

---

#### 2. Standardize productData Structure
Create or fix productData constant:
```tsx
const productData = {
  name: string,           // Full product name
  slug: string,           // URL-friendly identifier
  brand: string,          // Manufacturer
  model?: string,         // Model number if applicable
  category: string,       // Product category
  priceRange: {
    min: number,
    max: number,
    currency: "USD"
  },
  affiliateLinks: [
    {
      retailer: string,
      url: string         // Full affiliate URL
    }
  ],
  expertRating: number,   // 0-5 rating
  expertOpinion: string,  // One-line summary
  pros: string[],         // Array of pros
  cons: string[],         // Array of cons
  dateAdded: string,      // YYYY-MM-DD
  lastUpdated: string     // YYYY-MM-DD
}
```
**Impact:** Enables future features (search, filters, comparisons)
**Effort:** Medium (extract from existing content)

---

#### 3. Convert `<img>` to Next.js `<Image>`
```tsx
// BEFORE
<img src="/images/team/head-shot-1.jpg" alt="Scott Bradley" />

// AFTER
import Image from 'next/image'

<Image
  src="/images/team/head-shot-1.jpg"
  alt="Scott Bradley, Professional Chef"
  width={100}
  height={100}
  className="rounded-full"
/>
```
**Impact:** Performance (lazy loading, optimization, Core Web Vitals)
**Effort:** Low (find & replace + add dimensions)

---

#### 4. Standardize Page Structure
All pages should use this pattern:
```tsx
export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper {...} />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3">
        {/* breadcrumb content */}
      </nav>

      {/* Main Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* review content */}
      </article>
    </div>
  )
}
```
**Impact:** Consistency, easier maintenance
**Effort:** Medium (restructure return)

---

### **SHOULD FIX (High Value - Do Now)**

#### 5. Add AuthorBio Component
```tsx
import AuthorBio from '@/components/AuthorBio'

// Near end of article:
<AuthorBio />
```
**Impact:** SEO (Person schema), consistency, trust
**Effort:** Low (import + add component)
**Pages Affected:** 6 pages

---

#### 6. Improve Internal Linking (SEO + UX)
Add 3-5 contextual links to related products:

**Guidelines:**
- Link to complementary products (knife → cutting board)
- Link to comparison reviews (8" vs 10" knife)
- Link to category pages
- Use descriptive anchor text
- Natural placement in content

**Examples:**
```tsx
// In knife review:
"Pair this with the <Link href="/reviews/john-boos-platinum-commercial-cutting-board">
John Boos cutting board</Link> for optimal performance."

// In mixer review:
"For larger batches, see our <Link href="/reviews/kitchenaid-ksm8990wh">
KitchenAid commercial mixer review</Link>."
```
**Impact:** SEO (crawlability, PageRank), reduced bounce rate, better UX
**Effort:** Medium (identify relationships + add links)
**Pages Affected:** 7 pages with <3 links

---

#### 7. Accessibility Improvements

**A. Image Alt Text Audit**
All images must have descriptive alt text:
```tsx
// BAD
<Image src="/logo.png" alt="logo" />

// GOOD
<Image src="/logo.png" alt="Chef Approved Tools - Professional Kitchen Equipment Reviews" />

// GOOD (decorative)
<Image src="/decorative-icon.svg" alt="" role="presentation" />
```

**B. Semantic HTML**
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<nav>`, `<article>`, `<section>` appropriately
- Add ARIA labels where needed

**C. Keyboard Navigation**
- Ensure all interactive elements are keyboard accessible
- Skip links for screen readers
- Focus indicators visible

**Verification:**
```bash
# Run Lighthouse accessibility audit
npm run lighthouse

# Check against WCAG 2.1 AA standards
npx axe https://www.chefapprovedtools.com/reviews/[slug]
```

**Impact:** Legal compliance (ADA), better UX for all users, SEO boost
**Effort:** Low-Medium (audit + fix)
**Pages Affected:** All pages need verification

---

#### 8. Add Testimonials Placeholder
```tsx
<section className="mb-12" id="testimonials">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">
    What Real Users Are Saying
  </h2>
  <p className="text-sm text-slate-600 mb-4 italic">
    Customer reviews curated from verified purchasers.
  </p>

  {/* TODO: Add 6-8 testimonials from Amazon verified purchasers */}
  <div className="space-y-4">
    {/* Testimonials will be added here */}
  </div>
</section>
```
**Impact:** Conversion optimization (social proof), reminds to add content
**Effort:** Low (copy template)
**Pages Affected:** 11 pages

---

### **SKIP FOR NOW (Content Creation)**

These require writing/research, handle separately:
- ❌ Writing actual testimonials (requires Amazon review scraping)
- ❌ Writing pros/cons content (5 pages missing)
- ❌ Adding FAQ sections (some pages missing)
- ❌ Cost-per-use analysis content

---

## Implementation Strategy

### Phase 1: Create Template (30 min)
1. Identify best example page (e.g., `wusthof-classic-ikon-16-piece`)
2. Extract reusable patterns
3. Document structure

### Phase 2: Fix 12 Problem Pages (2-3 hours)
Work through each page systematically:

**Per-Page Checklist:**
- [ ] Add ProductViewTrackerWrapper import + usage
- [ ] Create/fix productData structure
- [ ] Convert all `<img>` to `<Image>`
- [ ] Standardize page structure (MIN_H_DIV pattern)
- [ ] Add AuthorBio if missing
- [ ] Add 3-5 internal links to related reviews
- [ ] Audit image alt text for accessibility
- [ ] Verify heading hierarchy (single h1, proper nesting)
- [ ] Add testimonials placeholder
- [ ] Test page locally

**Pages to Fix:**
1. nordic-ware-half-sheet-pan
2. norton-im200-tri-stone-sharpener
3. black-decker-toaster-oven
4. bodum-chambord-french-press
5. method-all-purpose-cleaner
6. zuperia-bar-mops
7. victorinox-offset-bread-knife
8. diamond-crystal-kosher-salt
9. victorinox-fibrox-8-inch-chefs-knife
10. victorinox-fibrox-10-inch-chefs-knife
11. benriner-large-mandoline
12. cuisinart-8-inch-nonstick-pan

### Phase 3: Verify & Test (30 min)
- [ ] Run TypeScript compilation
- [ ] Run Lighthouse accessibility audits
- [ ] Test Recently Viewed feature
- [ ] Visual QA on 2-3 sample pages
- [ ] Check mobile responsiveness

### Phase 4: Deploy & Monitor (15 min)
- [ ] Commit changes
- [ ] Deploy to production
- [ ] Monitor error logs
- [ ] Verify tracker working in production

---

## Success Metrics

**Immediate (After Phase 3):**
- ✅ All 27 pages have ProductViewTrackerWrapper
- ✅ All 27 pages use Next.js Image component
- ✅ All pages have productData structure
- ✅ All pages have consistent structure
- ✅ All pages pass accessibility audit (Lighthouse score >90)
- ✅ All pages have 3+ internal links

**Short-term (1 week):**
- 📈 Recently Viewed engagement rate
- 📈 Internal link click-through rate
- 📈 Reduced bounce rate
- 📈 Improved Lighthouse performance scores

**Long-term (1 month):**
- 📈 Better organic search rankings (from internal linking)
- 📈 Longer session duration
- 📈 Higher pages per session

---

## Future Improvements (Separate Tasks)

1. **Content Enhancements:**
   - Add testimonials to all pages
   - Complete pros/cons sections
   - Add cost-per-use analysis sections

2. **Advanced Features:**
   - Product comparison tool
   - Review search/filter functionality
   - Related products widget

3. **Performance:**
   - Upgrade to Next.js 15 + enable PPR
   - Implement ISR for review pages
   - Add edge caching

4. **SEO:**
   - Complete schema.org markup audit
   - Add FAQ schema to more pages
   - Implement review ratings aggregate

---

## Notes

- Keep backup of original files before major changes
- Test accessibility with real screen readers
- Document any edge cases or issues found
- Update this plan as we learn during implementation
