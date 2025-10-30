# A/B Testing Implementation Guide

## Overview

This guide covers the A/B testing system for affiliate CTA buttons on Chef Approved Tools. The system tests three variations of CTA button text to optimize conversion rates.

## Test Variations

| Variant | CTA Text | Description |
|---------|----------|-------------|
| A (Control) | "View on Amazon" | Original/baseline version |
| B | "Check Current Price" | Emphasizes price checking |
| C | "See Product Details" | Emphasizes product details |

## Implementation

### 1. Core Files

#### `lib/ab-test.ts`
- Randomly assigns visitors to variants (A, B, or C)
- Stores assignment in localStorage (`cta_variant`)
- Tracks assignment to Google Analytics/GTM
- Equal distribution: 33.3% each variant

#### `components/AffiliateButton.tsx` (Updated)
- Main affiliate button component
- Auto-detects and applies A/B test variant
- Maintains backward compatibility
- Props:
  - `enableABTest={true}` - Enable A/B testing (default)
  - All existing props maintained

#### `components/AffiliateButtonVariations.tsx` (New)
- Explicit variant-based button component
- Used internally by updated AffiliateButton
- Export `AffiliateButtonCompact` for mobile sticky CTA

#### `components/TrustSignals.tsx` (New)
- Generic trust signals component (legally compliant)
- Shows "Free Returns", "Secure Checkout", "Fast Shipping"
- No Amazon trademarks or branding
- Variants: compact, full

#### `components/StickyMobileCTA.tsx` (New)
- Fixed bottom CTA for mobile devices
- Only appears on `/reviews/*` pages
- Triggers after 3 seconds OR 50% scroll (whichever first)
- Hides at bottom 10% of page
- Hidden on desktop (md breakpoint+)

### 2. Analytics Tracking

#### Events Tracked

**Variant Assignment** (`cta_variant_assigned`)
```javascript
{
  event: 'cta_variant_assigned',
  variant: 'a' | 'b' | 'c',
  variant_text: 'View on Amazon',
  timestamp: '2025-01-15T10:30:00Z'
}
```

**Variant Click** (`cta_variant_click`)
```javascript
{
  event: 'cta_variant_click',
  variant: 'a' | 'b' | 'c',
  variant_text: 'View on Amazon',
  merchant: 'amazon',
  product: 'victorinox-fibrox-8-inch-chefs-knife',
  position: 'above_fold',
  timestamp: '2025-01-15T10:35:00Z'
}
```

### 3. Usage Examples

#### Basic Usage (Existing Buttons - No Changes Required)
```tsx
// Your existing buttons automatically get A/B testing
<AffiliateButton
  href="https://amazon.com/..."
  merchant="amazon"
  product="product-slug"
  position="above_fold"
>
  View on Amazon
</AffiliateButton>

// The children text is IGNORED when enableABTest=true (default)
// Button will show the A/B test variant text instead
```

#### Disable A/B Testing (Custom Text)
```tsx
<AffiliateButton
  href="https://amazon.com/..."
  merchant="amazon"
  product="product-slug"
  position="mid_article"
  enableABTest={false}
>
  Custom CTA Text Here
</AffiliateButton>
```

#### Add Generic Trust Signals Below Button
```tsx
import TrustSignals from '@/components/TrustSignals';

<div>
  <AffiliateButton
    href="https://amazon.com/..."
    merchant="amazon"
    product="product-slug"
    position="final_cta"
  />
  <TrustSignals variant="compact" className="mt-2" />
</div>
```

#### Add Sticky Mobile CTA to Review Pages
```tsx
// Add to your review page layout
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA';

export default function ProductReview() {
  return (
    <>
      {/* Your review content */}

      {/* Sticky mobile CTA */}
      <StickyMobileCTAWrapper
        productName="Victorinox Fibrox 8-Inch Chef's Knife"
        affiliateUrl="https://www.amazon.com/dp/B008M5U1C2?tag=chefapprovedt-20"
        merchant="amazon"
        productSlug="victorinox-fibrox-8-inch-chefs-knife"
      />
    </>
  );
}
```

## Testing Locally

### 1. Check Assigned Variant
Open browser console:
```javascript
localStorage.getItem('cta_variant') // Returns 'a', 'b', or 'c'
```

### 2. Force Reassign Variant (Development Only)
```javascript
// Import the function
import { forceReassignVariant } from '@/lib/ab-test';

// Force specific variant
forceReassignVariant('b'); // Force variant B

// Clear assignment (will reassign on next page load)
forceReassignVariant();
```

### 3. View Tracking Events
Open browser console to see tracking logs:
- "CTA variant assigned: ..."
- "CTA variant clicked: ..."

## Google Analytics Setup

### 1. Custom Dimensions (Recommended)
Add custom dimensions in GA4:
- `cta_variant` - The variant assigned (a/b/c)
- `variant_text` - The actual CTA text shown

### 2. Explore Reports
Create custom exploration in GA4:
1. Go to Explore → Create new exploration
2. Add dimensions: `cta_variant`, `event_name`
3. Add metrics: `event_count`, `conversions`
4. Filter by events: `cta_variant_click`, `affiliate_click`

### 3. Conversion Tracking
Track which variant drives more conversions:
- Primary metric: Click-through rate (CTR)
- Secondary metrics: Time to click, scroll depth at click

## Mobile Responsiveness

### Button Sizing
- Desktop: `px-8 py-4` (larger padding)
- Mobile: `px-6 py-3` (compact padding)
- Font: `text-base sm:text-lg` (responsive)

### Sticky CTA Behavior
- **Mobile only**: Visible below md breakpoint (< 768px)
- **Trigger**: After 3s OR 50% scroll
- **Hide**: At 90%+ scroll (near bottom)
- **Z-index**: 40 (below modals, above content)
- **Safe area**: Respects mobile safe zones

## Performance Considerations

### 1. No Layout Shift (CLS)
- Sticky CTA uses `transform` for animations
- No height changes that cause layout shift
- Fixed positioning doesn't affect document flow

### 2. Lazy Loading
```tsx
// Lazy load sticky CTA
const StickyMobileCTA = lazy(() => import('@/components/StickyMobileCTA'));

<Suspense fallback={null}>
  <StickyMobileCTA {...props} />
</Suspense>
```

### 3. Client-Side Only
- All A/B test logic runs client-side
- No SSR hydration issues
- `mounted` state prevents flashing

## Accessibility

### ARIA Labels
```tsx
aria-label="View on Amazon - Opens in new window"
```

### Keyboard Navigation
- All buttons fully keyboard accessible
- Tab order preserved
- Enter/Space key triggers click

### Screen Readers
- Semantic HTML (`<a>` tags)
- Descriptive labels
- "Opens in new window" announcement

## Troubleshooting

### Variant Not Changing
**Issue**: Same variant always shows
**Solution**: Clear localStorage or force reassign
```javascript
localStorage.removeItem('cta_variant');
```

### Sticky CTA Not Showing
**Checklist**:
- Are you on a `/reviews/*` page?
- Wait 3 seconds or scroll to 50%
- Check mobile viewport (< 768px)
- Verify not at bottom 10% of page

### Trust Signals Not Showing
**Check**:
- Did you import TrustSignals component?
- Is it placed below the button in your JSX?
- Check console for any React errors

### Events Not Tracking
**Debug**:
1. Check console for tracking logs
2. Verify `window.dataLayer` exists
3. Check GTM is installed
4. Test in production (not always reliable in dev)

## Best Practices

### 1. Let Test Run Long Enough
- Minimum: 2 weeks
- Ideal: 4-6 weeks for statistical significance
- Aim for 1000+ clicks per variant

### 2. Don't Modify During Test
- Don't change button styling
- Don't add/remove trust signals mid-test
- Keep test conditions consistent

### 3. Track Full Funnel
- Clicks (CTR)
- Amazon purchases (if possible via Amazon Attribution)
- Return visitors

### 4. Mobile vs Desktop Analysis
- Analyze mobile and desktop separately
- Sticky CTA only affects mobile metrics
- Different user behaviors on each platform

## Future Enhancements

### Planned Features
- [ ] Weighted distribution (e.g., 50% A, 25% B, 25% C)
- [ ] Dynamic button colors A/B test
- [ ] Position-based variants (above fold vs mid-article)
- [ ] Amazon Attribution pixel integration
- [ ] Multi-variate testing (text + color + position)

### Analytics Integration
- [ ] Google Optimize integration
- [ ] Conversion API for server-side tracking
- [ ] Revenue attribution (when available)

## Questions?

For implementation questions or issues, check:
1. This documentation
2. Code comments in each file
3. Console logs in browser DevTools
4. GTM preview mode for tracking verification
