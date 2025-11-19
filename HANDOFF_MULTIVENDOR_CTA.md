# MultiVendorCTA Feature Implementation Handoff

**Date:** November 19, 2025
**Status:** Ready to implement
**Priority:** High - Needed for 4+ products immediately

---

## 📋 Overview

Build a new component to display multiple affiliate buying options (Amazon, manufacturer sites, other retailers) in a professional button row on product review pages.

---

## 🎯 Business Requirements

### Products That Need This (Initial Rollout):
1. **Henckels Sharpening Steel** - Amazon + Henckels.com (CJ)
2. **KitchenAid Mixers** (multiple models) - Amazon + KitchenAid.com
3. **Vitamix Blender** - Amazon + Vitamix.com
4. **Staub Dutch Oven** - Amazon + Zwilling.com (CJ)

### User Experience Goals:
- Show all buying options in a clear, scannable row
- Primary option (usually Amazon) should be visually prominent
- Mobile: Stack buttons vertically
- Desktop: Show buttons in a horizontal row
- Each button should clearly identify the merchant
- Maintain current affiliate tracking and rel attributes

---

## 🏗️ Technical Architecture

### 1. New Component: `MultiVendorCTA`

**Location:** `/components/review/MultiVendorCTA.tsx`

**Props Interface:**
```typescript
interface MultiVendorCTAProps {
  affiliateLinks: Array<{
    url: string
    label: string
    merchant: string
    is_primary: boolean
  }>
  productName: string
  ctaId: string  // For CTAVisibilityTracker
  position: 'above_fold' | 'mid_article' | 'final_cta'
  productSlug?: string  // Optional for tracking
}
```

**Features:**
- Accepts array of affiliate links from Supabase
- Primary link gets prominent styling (larger, gradient button)
- Secondary links get subtle styling (outline buttons)
- Wraps each button in `CTAVisibilityTracker` for analytics
- Responsive layout (flex-col on mobile, flex-row on desktop)
- Shows merchant name in button text (e.g., "Buy on Amazon →", "Buy on Henckels.com →")

**Styling Guidelines:**
- Primary button: Same gradient as current (orange-600 to red-600)
- Secondary buttons: Border style, gray text, hover to orange
- Gap between buttons: 3-4 spacing units
- Mobile: Full width buttons, 2-3 spacing between
- Desktop: Auto-width buttons, horizontal row with gap-4

---

### 2. Helper Function Update

**Location:** `/lib/product-helpers.ts`

**New Function:**
```typescript
/**
 * Get all affiliate links for a product, sorted by priority
 * @param product - The product object
 * @returns Array of affiliate links with primary first
 */
export function getAllAffiliateLinks(product: Product): Array<{
  url: string
  label: string
  merchant: string
  is_primary: boolean
}> {
  // Sort so primary is first, then alphabetically by merchant
  return [...product.affiliateLinks].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.merchant.localeCompare(b.merchant)
  })
}
```

---

### 3. Review Page Updates

**Files to Update (Initial 4):**
1. `/app/reviews/henckels-sharpening-steel/page.tsx` (if exists)
2. `/app/reviews/kitchenaid-*/page.tsx` (multiple files)
3. `/app/reviews/vitamix-5200-professional-blender/page.tsx`
4. `/app/reviews/le-creuset-signature-7-25-qt-dutch-oven/page.tsx` (for Staub in comparison)

**Changes Needed in Each:**

**BEFORE (current single-button approach):**
```tsx
const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

// In render:
<a href={affiliateUrl} ...>
  Check Price on Amazon →
</a>
```

**AFTER (multi-vendor approach):**
```tsx
import MultiVendorCTA from '@/components/review/MultiVendorCTA'
import { getAllAffiliateLinks } from '@/lib/product-helpers'

const affiliateLinks = product ? getAllAffiliateLinks(product) : []

// In render:
<MultiVendorCTA
  affiliateLinks={affiliateLinks}
  productName={productData.name}
  ctaId="hero-cta"
  position="above_fold"
  productSlug={productData.slug}
/>
```

**Update all 3 CTA locations per page:**
1. Hero section (above_fold)
2. Where to Buy section (mid_article)
3. Bottom Line section (final_cta)

---

## 📊 Database Structure (Already Correct)

Products table `affiliate_links` field should be JSONB array:

```json
[
  {
    "url": "https://amzn.to/xxxxx",
    "label": "Amazon",
    "merchant": "amazon",
    "is_primary": true
  },
  {
    "url": "https://www.tkqlhce.com/click-101557027-13778316?url=...",
    "label": "Vitamix.com",
    "merchant": "vitamix_cj",
    "is_primary": false
  }
]
```

**Important:** `merchant` field should match product's `primary_affiliate` for the primary link.

---

## 🎨 Design Reference

**Desktop Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [  Buy on Amazon  →  ]  [Buy on Henckels.com →]    │
│   (gradient, large)      (outline, medium)          │
└─────────────────────────────────────────────────────┘
```

**Mobile Layout (stacked):**
```
┌──────────────────────┐
│  Buy on Amazon  →    │  (full width, gradient)
├──────────────────────┤
│  Buy on Henckels.com │  (full width, outline)
└──────────────────────┘
```

---

## ✅ Testing Checklist

### Functionality:
- [ ] Primary button shows correct affiliate link
- [ ] Secondary buttons show correct affiliate links
- [ ] All buttons have proper `rel="noopener noreferrer sponsored"`
- [ ] All buttons open in new tab (`target="_blank"`)
- [ ] CTAVisibilityTracker fires for each button
- [ ] Mobile: Buttons stack vertically
- [ ] Desktop: Buttons show in horizontal row
- [ ] Hover states work on all buttons

### Products to Test:
- [ ] Henckels Sharpening Steel (Amazon + Henckels.com)
- [ ] KitchenAid mixers (Amazon + KitchenAid.com)
- [ ] Vitamix 5200 (Amazon + Vitamix.com)
- [ ] Le Creuset page (check Staub comparison table link still works)

### Edge Cases:
- [ ] Product with only 1 affiliate link (should show single button, styled as primary)
- [ ] Product with 3+ affiliate links (should all display)
- [ ] Very long merchant names (should truncate gracefully)
- [ ] No affiliate links (should show fallback or hide component)

---

## 🐛 Known Gotchas

1. **Affiliate Link Caching:** After updating Supabase `affiliate_links`, you may need to:
   - Delete `.next` folder
   - Restart dev server
   - Clear browser cache/history
   - Wait up to 1 hour in production (ISR revalidation)

2. **Primary Affiliate Matching:** The `getPrimaryAffiliateLink()` function looks for `link.merchant === product.primary_affiliate`. Make sure these match or the wrong link will be primary.

3. **Button Text:** Generate dynamically from merchant:
   - `amazon` → "Buy on Amazon"
   - `vitamix_cj` → "Buy on Vitamix.com"
   - `cj` → "Buy on [Brand].com"
   - Extract brand name from product if merchant is generic "cj"

4. **Mobile Touch Targets:** Ensure buttons are at least 44px tall for good touch UX

---

## 📦 Deliverables

### Phase 1 (Initial Implementation):
1. Create `MultiVendorCTA.tsx` component
2. Add `getAllAffiliateLinks()` to `product-helpers.ts`
3. Update Henckels review page
4. Update Vitamix review page
5. Test on desktop and mobile

### Phase 2 (Rollout):
6. Update KitchenAid mixer pages
7. Update any other products with multiple affiliate options
8. Update comparison tables if needed (separate component?)

### Phase 3 (Future Enhancement):
9. Add merchant logos/icons to buttons
10. A/B test button copy ("Buy on Amazon" vs "Check Price on Amazon")
11. Add sale badges if product has active promotion

---

## 🔗 Related Files

**Created in this session:**
- `/Users/scottbradley/chef-approved-tools/ADD_HENCKELS_AMAZON_LINK.sql` - SQL to add Amazon link back
- `/Users/scottbradley/chef-approved-tools/FIX_STAUB_AFFILIATE_LINK.sql` - Staub CJ deep link
- `/Users/scottbradley/chef-approved-tools/FIX_HENCKELS_AFFILIATE_LINK.sql` - Henckels CJ deep link

**Existing components to reference:**
- `/components/review/ReviewHero.tsx` - Current CTA location
- `/components/CTAVisibilityTracker.tsx` - Wrap each button
- `/components/comparison/ProductComparisonTable.tsx` - Shows how to handle multiple products

**Helper functions:**
- `/lib/product-helpers.ts` - `getPrimaryAffiliateLink()` to extend

---

## 💡 Implementation Notes

### Merchant Label Generation:
```typescript
function getMerchantLabel(merchant: string, productBrand?: string): string {
  const merchantMap: Record<string, string> = {
    'amazon': 'Amazon',
    'vitamix_cj': 'Vitamix.com',
    'zwilling_cj': 'Zwilling.com',
    'kitchenaid': 'KitchenAid.com',
    'henckels': 'Henckels.com'
  }

  return merchantMap[merchant] || `${productBrand || 'Manufacturer'}.com`
}
```

### Button Text Generation:
```typescript
function getButtonText(merchant: string, isPrimary: boolean, productBrand?: string): string {
  const label = getMerchantLabel(merchant, productBrand)
  return `${isPrimary ? 'Buy' : 'Also available'} on ${label} →`
}
```

---

## 🚀 Success Criteria

**MVP Complete When:**
- ✅ MultiVendorCTA component built and styled
- ✅ 4 initial products showing multiple buying options
- ✅ Desktop and mobile layouts working
- ✅ Analytics tracking working (CTAVisibilityTracker)
- ✅ All affiliate links going to correct destinations
- ✅ No console errors or warnings

**Future Enhancement Ideas:**
- Show pricing comparison if available
- Show stock status per merchant
- Add "Best Price" badge
- Show estimated delivery times
- Integration with price tracking APIs

---

## 📝 Questions to Resolve

1. **Button order:** Always show Amazon first, or sort by commission rate?
2. **Max buttons:** Limit to 2-3 options, or show all available?
3. **Fallback:** If only 1 link available, use new component or old single-button approach?
4. **Mobile layout:** Stack all buttons or show 2 per row on tablets?
5. **Analytics:** Track which merchant button gets clicked most?

---

## ⚠️ Important Reminders

- **DO NOT** change `primary_affiliate` field without updating `affiliate_links` array to match
- **DO NOT** use Amazon review data in affiliate links or anywhere else (TOS violation)
- **DO** test affiliate links actually work before deploying
- **DO** clear all caches when testing database changes
- **DO** commit SQL files for documentation even though changes are in database

---

**Next Session Start Here:**
1. Read this handoff doc completely
2. Create MultiVendorCTA component
3. Update product-helpers.ts with getAllAffiliateLinks()
4. Test on Henckels product first (simplest - only 2 links)
5. Roll out to other products once working

---

**End of Handoff**
**Status:** Ready for implementation
**Estimated Time:** 2-3 hours for MVP

