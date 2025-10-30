# Review Page Creation Guide

## Quick Start (5 Steps)

### 1. Copy Templates
```bash
# From /templates/ directory:
cp review-template.tsx app/reviews/[product-slug]/page.tsx
cp review-data-template.ts app/reviews/[product-slug]/[product-slug]-data.ts
```

### 2. Replace ALL Placeholders
Search for `[` and replace every bracketed placeholder with real content.

**Critical placeholders:**
- `[PRODUCT_SLUG]` → actual product slug (e.g., `vitamix-5200-professional-blender`)
- `[PRODUCT_NAME]` → actual product name (e.g., `Vitamix5200`)
- `[X+ years]` → actual testing period (e.g., `5+ years`)
- `[AFFILIATE_URL]` → actual affiliate link

### 3. Fill Data Object
Work through `[product-slug]-data.ts` systematically:

**Start with easy sections:**
1. `productSlug` and `metadata`
2. `legacyProductData` (name, brand, pros, cons)
3. `hero` (title, rating, verdict)
4. `prosConsTitle` (uses data from legacyProductData)

**Then tackle content sections:**
5. `testingResults` (3 prose sections + environment + performance lists)
6. `performanceAnalysis` (3 sections with metrics/bullets)
7. `comparison` (table rows)
8. `whoShouldBuy` (2 lists)
9. `faq` (6-10 Q&A pairs)
10. `whereToBuy`, `bottomLine`, `relatedProducts`

### 4. Add Custom Sections (If Needed)

**For dangerous tools (knives, mandolines):**
```tsx
// In page.tsx, uncomment:
import SafetySection from '@/components/review/custom/SafetySection'

// Add between Performance Analysis and Comparison:
<SafetySection
  title="Safety: Respect the Blade"
  warnings={reviewData.safety.warnings}
  guidelines={reviewData.safety.guidelines}
/>
```

**For compatibility guides (oils, ingredients):**
```tsx
import CompatibilityGuide from '@/components/review/custom/CompatibilityGuide'

<CompatibilityGuide
  title="What Works Best"
  categories={reviewData.compatibility.categories}
/>
```

**For size considerations:**
```tsx
import SizingGuide from '@/components/review/custom/SizingGuide'

<SizingGuide
  title="Size Considerations"
  sizes={reviewData.sizing.options}
/>
```

### 5. Test Locally
```bash
npm run dev
# Visit: http://localhost:3000/reviews/[product-slug]
```

---

## Component Architecture

### Standard Sections (Always Included)
1. **ReviewHero** - Title, rating, verdict, primary CTA
2. **TestingResultsGrid** - Testing details + performance boxes
3. **PerformanceAnalysis** - Prose sections with metrics
4. **ComparisonTable** - Feature comparison grid
5. **ProsConsGrid** - Pros & cons side-by-side
6. **WhoShouldBuyGrid** - Perfect for / Consider alternatives
7. **FAQSection** - Q&A list
8. **Where to Buy** (inline) - Retailer CTAs
9. **EmailCaptureSection** - Purple gradient form
10. **BottomLineSection** - Final verdict + CTA
11. **RelatedProductsGrid** - 4-card related products
12. **Author Bio** (inline) - Scott's credentials

### Custom Sections (Product-Specific)
Insert between standard sections as needed:

**SafetySection** - For dangerous tools
- Use after Performance Analysis
- Critical safety warnings + guidelines
- Example: Mandolines, sharp knives, hot tools

**CompatibilityGuide** - For "what works with this" lists
- Use after Performance Analysis or before Pros & Cons
- Categorized lists (e.g., vegetables for mandoline, oils for cast iron)
- Example: Cookware, slicers, specialized tools

**SizingGuide** - For products with size options
- Use in Who Should Buy section or after
- Size comparison with use cases
- Example: Cutting boards, cookware, storage

---

## Content Guidelines

### Writing Style
- **Professional but conversational** - "After 5+ years..." not "I think maybe..."
- **Specific numbers/details** - "2.0 HP motor" not "powerful motor"
- **Honest about limitations** - Include real cons, not just "expensive"
- **Link to related reviews** - Build internal link network

### Pros & Cons (7 pros / 5 cons ideal)
✅ **Good pros:**
- "2.0 peak HP motor handles restaurant volume"
- "Blades still sharp after 5 years daily use"
- "Zero maintenance required in 5 years"

❌ **Bad pros:**
- "Very powerful"
- "Good quality"
- "Works great"

✅ **Good cons:**
- "Tall 20.5\" height won't fit under standard cabinets"
- "Higher noise level than newer models"
- "No pre-programmed settings (manual control only)"

❌ **Bad cons:**
- "Expensive"
- "Heavy"
- "Loud"

### FAQ Best Practices
- **6-10 questions total**
- Start with "Is [Product] worth the money?"
- Include model comparisons, concerns, maintenance
- Use real professional experience
- Be honest about limitations

### Testing Results Section
**3 subsections:**
1. **Performance Category** - What it does well + links to related tools
2. **Durability** - How it held up over time + comparison to similar quality tool
3. **Why Professionals Choose It** - Industry adoption + specific reasons

---

## Common Patterns

### Internal Linking
Always link to related reviews in prose sections:
```tsx
<Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">
  KitchenAid commercial mixer
</Link>
```

### CTA Visibility Tracking
Always wrap CTAs:
```tsx
<CTAVisibilityTracker ctaId="unique-cta-id" position="above_fold|mid_article|final_cta">
  <a href={affiliateUrl}>...</a>
</CTAVisibilityTracker>
```

### Comparison Table Styling
Style options for cells:
- `'success'` - Green (your product's strengths)
- `'warning'` - Orange (cautions/trade-offs)
- `'info'` - Blue (competitor strengths)
- `'default'` - Gray (neutral info)

---

## Checklist Before Publishing

### Content Complete
- [ ] All `[BRACKETED]` placeholders replaced
- [ ] 7 pros / 5 cons written
- [ ] 6-10 FAQs with detailed answers
- [ ] Testing Results has 3 subsections
- [ ] Performance Analysis has 3 sections
- [ ] Comparison table has 5-7 rows
- [ ] Related products all have valid hrefs

### Technical Requirements
- [ ] Product slug matches filename
- [ ] All affiliate links working
- [ ] Internal links point to real pages (or #)
- [ ] No console errors in dev mode
- [ ] Page renders without breaking
- [ ] Images/emojis display correctly

### SEO & Metadata
- [ ] Title follows pattern: "[Product] Review: [X+ Years] Professional Testing | Chef Approved Tools"
- [ ] Description is 1-2 sentences with key finding
- [ ] OG title and description set
- [ ] Testing period consistent throughout
- [ ] Tier (1/2/3) matches testing level

### Style Consistency
- [ ] Numbers use specific details (not vague)
- [ ] Links styled with `text-orange-700` class
- [ ] CTAs use orange-to-red gradient
- [ ] Purple sections use purple-600 to purple-800
- [ ] Author bio unchanged (standard template)
- [ ] All sections use proper spacing (mb-6)

---

## Example: Minimal Review (No Custom Sections)

See `/app/reviews/vitamix-5200-professional-blender/` for reference implementation.

## Example: Review with Custom Sections

See `/app/reviews/benriner-large-mandoline/` for:
- SafetySection (life-critical blade safety)
- CompatibilityGuide (vegetable recommendations)

---

## Troubleshooting

**"Module not found" errors:**
- Check import paths use `@/components/review`
- Verify custom section imports only if actually used

**Content not displaying:**
- Check for missing commas in data object
- Verify arrays/objects use proper JSON format
- Look for unclosed JSX tags in content sections

**Styling looks wrong:**
- Verify all Tailwind classes match template exactly
- Check for missing className props
- Ensure no custom CSS overriding styles

**Affiliate links not working:**
- Verify product exists in Supabase
- Check `getPrimaryAffiliateLink()` returns valid URL
- Ensure fallback `'#'` in place if no product data

---

## Need Help?

1. **Check existing reviews** - Look at Vitamix (standard) or Benriner (custom sections)
2. **Verify component props** - Check `/components/review/*.tsx` for prop types
3. **Test incrementally** - Don't fill everything at once, test as you go
4. **Use TypeScript errors** - They'll catch missing/wrong props early

---

**Goal: 34 more reviews to transform. Use this system for consistency.**
