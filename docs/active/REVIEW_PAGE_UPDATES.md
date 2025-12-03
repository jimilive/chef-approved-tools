# Review Page Updates Needed

This document tracks all changes needed when updating the 35+ product review pages.

## Completed (Lodge page as template)

- [x] **Image architecture** - Side-by-side layout with 400px image on left, content on right
- [x] **Tier badge standardization** - Using centralized `getTierBadge()` from `lib/editorial-metadata.ts`
- [x] **Dynamic git dates** - Using `getReviewGitDates()` from `lib/git-dates.ts`
- [x] **CTA layout restructuring** - Simple CTA button in right column, verdict below, customCTA box full width
- [x] **Container width** - Changed to `max-w-5xl` (1024px)

## Pending Changes (Apply to all review pages)

### High Priority

1. **Ratings from Supabase**
   - Currently: Mixed - some hardcoded in data files, some from Supabase
   - Should be: ALL ratings come from `expertRating` field in Supabase
   - Affected: Individual review data files, guide pages like `best-chef-knives`

2. **Remove hardcoded prices from guide pages**
   - `app/guides/best-chef-knives/page.tsx` shows $45, $50, $12, $40
   - Prices should not be displayed (they change and become inaccurate)

3. **Testing period accuracy**
   - Victorinox knives: "10 years professional kitchen use, 20+ years total"
   - Each product needs accurate testing period in Supabase/editorial metadata

4. **Value highlights line**
   - Currently hardcoded: "💰 Outstanding Value Investment | ✔ Pre-Seasoned | ✔ Made in USA | ✔ 3 Versatile Sizes"
   - Should be: Dynamic prop passed per product

### Medium Priority

5. **Tier badge in individual review data files**
   - Remove hardcoded tier data from individual review data files
   - Use centralized `getTierBadge(slug)` function instead

6. **Mobile responsive layout**
   - Verify image layout stacks correctly on mobile
   - Test CTA visibility on small screens

### Guide Pages Specifically

7. **`app/guides/best-chef-knives/page.tsx`**
   - Remove price column from comparison table
   - Pull ratings from Supabase instead of hardcoded `topKnives` array
   - Update testing claims to accurate "10 years professional + 20 years total"
   - Google has cached old title "Pro Chef Tests 8 Knives" - request re-index after fixes

## Reference: Lodge Page as Template

The Lodge Cast Iron review (`app/reviews/lodge-seasoned-cast-iron-3-skillet-bundle/page.tsx`) is the reference implementation with:
- `heroImage` prop for side-by-side layout
- `getTierBadge()` for centralized tier
- `getReviewGitDates()` for dynamic dates
- `ctaUrl` passed to ReviewHero
- `max-w-5xl` container

## Files to Update

### Review Pages (35+)
All files in `app/reviews/*/page.tsx`

### Guide Pages
- `app/guides/best-chef-knives/page.tsx`
- `app/guides/best-budget-chef-knife/page.tsx`
- Other guide pages with product comparisons

### Data Files
- All `*-data.ts` files in review directories
- `lib/editorial-metadata.ts` - ensure all products have entries

### Components
- `components/review/ReviewHero.tsx` - add `valueHighlights` prop

---

## CTA Component Specification

### Overview

All affiliate CTAs on review pages should use one of two components:
- **`AmazonCTA`** - For products with Amazon as the only vendor (most common)
- **`MultiVendorCTA`** - For products with multiple vendors (Amazon + manufacturer site)

### Component Locations
- `/components/AmazonCTA.tsx`
- `/components/review/MultiVendorCTA.tsx`

### CTA Positions (5 placements per review page + mobile sticky)

| Position | Location on Page | Default Variant |
|----------|------------------|-----------------|
| `above_fold` | Hero section | `button` |
| `mid_article` | After Testing Story section | `textLink` |
| `comparison_table` | After Comparison Table | `styledBox` |
| `who_should_buy` | After Who Should Buy section | `styledBox` |
| `final_cta` | Bottom Line / Final verdict | `button` |
| `sticky_mobile` | Fixed mobile footer | `button` |

### Variant Styles

#### `button` (Hero, Final CTA, Mobile Sticky)
```tsx
className="inline-block bg-gradient-to-r from-orange-600 to-red-600
           hover:from-orange-700 hover:to-red-700 text-white font-semibold
           px-8 py-4 rounded-xl transition-all hover:scale-105 text-lg"
```

#### `textLink` (After Testing Story)
```tsx
className="text-orange-700 hover:text-orange-800 font-medium underline"
// Prefix with arrow: "→ "
```

#### `styledBox` (After Comparison Table, After Who Should Buy)
```tsx
// Orange highlight box wrapper
<div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center my-8">
  <p className="text-lg font-medium text-slate-900 mb-4">
    Ready to upgrade your kitchen?
  </p>
  {/* Button inside */}
</div>
```

### Default Text by Position

| Position | Default Text |
|----------|--------------|
| `above_fold` | "Check Price on Amazon" |
| `mid_article` | "Check price and reviews on Amazon" |
| `comparison_table` | "Check Price on Amazon" |
| `who_should_buy` | "Check Price on Amazon" |
| `final_cta` | "Check Price on Amazon" |
| `sticky_mobile` | "Check Price on Amazon" |

### Usage Examples

#### AmazonCTA (Single Vendor - Most Common)
```tsx
import AmazonCTA from '@/components/AmazonCTA'

// Hero CTA
<AmazonCTA
  productSlug="vitamix-5200"
  affiliateUrl={affiliateUrl}
  position="above_fold"
/>

// After Testing Story (softer text link)
<AmazonCTA
  productSlug="vitamix-5200"
  affiliateUrl={affiliateUrl}
  position="mid_article"
/>

// After Comparison Table (styled box)
<AmazonCTA
  productSlug="vitamix-5200"
  affiliateUrl={affiliateUrl}
  position="comparison_table"
/>

// Custom text override
<AmazonCTA
  productSlug="vitamix-5200"
  affiliateUrl={affiliateUrl}
  position="above_fold"
  text="See Current Price on Amazon"
/>

// Custom box heading
<AmazonCTA
  productSlug="vitamix-5200"
  affiliateUrl={affiliateUrl}
  position="who_should_buy"
  boxHeading="Found your perfect blender?"
/>
```

#### MultiVendorCTA (Multiple Vendors)
```tsx
import MultiVendorCTA from '@/components/review/MultiVendorCTA'

<MultiVendorCTA
  affiliateLinks={[
    { url: amazonUrl, vendor: 'amazon', is_primary: true },
    { url: vitamixUrl, vendor: 'vitamix_cj' }
  ]}
  productName="Vitamix 5200"
  ctaId="vitamix-5200-hero"
  position="above_fold"
  productSlug="vitamix-5200"
/>
```

### Props Reference

#### AmazonCTA Props
| Prop | Type | Required | Default |
|------|------|----------|---------|
| `productSlug` | string | Yes | - |
| `affiliateUrl` | string | Yes | - |
| `position` | CTAPosition | Yes | - |
| `variant` | 'button' \| 'textLink' \| 'styledBox' | No | Based on position |
| `text` | string | No | Based on position |
| `boxHeading` | string | No | "Ready to upgrade your kitchen?" |
| `className` | string | No | "" |

#### MultiVendorCTA Props
| Prop | Type | Required | Default |
|------|------|----------|---------|
| `affiliateLinks` | Array<{url, vendor, label?, is_primary?}> | Yes | - |
| `productName` | string | Yes | - |
| `ctaId` | string | Yes | - |
| `position` | CTAPosition | Yes | - |
| `productSlug` | string | No | - |
| `variant` | 'button' \| 'textLink' \| 'styledBox' | No | Based on position |
| `boxHeading` | string | No | "Ready to upgrade your kitchen?" |

### Link Requirements (Applied Automatically)
All CTA links include:
```tsx
target="_blank"
rel="noopener noreferrer sponsored"
```

### Analytics Integration
Both components automatically wrap CTAs in `CTAVisibilityTracker` for analytics tracking:
- Impression tracking when CTA enters viewport
- Time-in-view tracking
- Scroll depth at first view
- Device type detection

### Migration Notes
When updating existing review pages:
1. Replace hardcoded "Check Price on Amazon" links with `<AmazonCTA />`
2. Use appropriate `position` prop for placement
3. Get `affiliateUrl` from Supabase data (already available in most pages)
4. Add all 5 CTA positions where missing
