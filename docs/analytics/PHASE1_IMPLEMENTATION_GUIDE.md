# Phase 1: Enhanced Analytics Implementation Guide

## Overview
Phase 1 adds powerful tracking capabilities to understand:
- Which products users see vs which they click
- CTA effectiveness (visibility vs clicks)
- Mobile vs desktop behavior differences
- Content type performance

## New Components Created

### 1. ProductImpressionTracker
**Location:** `/components/ProductImpressionTracker.tsx`

**What it does:** Tracks when products become visible to users (not just clicks)

**Use case:** Wrap any product card to track impressions

**Example:**
```tsx
import ProductImpressionTracker from '@/components/ProductImpressionTracker'

<ProductImpressionTracker
  productName="Victorinox 8-inch Chef's Knife"
  productSlug="victorinox-fibrox-8-inch-chefs-knife"
  category="Knives"
  brand="Victorinox"
  price={45}
  position={1}
  listName="homepage_featured"
>
  <ProductCard product={product} />
</ProductImpressionTracker>
```

**GA4 Events Tracked:**
- `view_item` - When product becomes 50% visible for 1+ seconds
- Includes: device_type, item details, list position

---

### 2. CTAVisibilityTracker
**Location:** `/components/CTAVisibilityTracker.tsx`

**What it does:** Tracks CTA visibility, view time, and engagement patterns

**Use case:** Wrap affiliate buttons or CTAs to measure effectiveness

**Example:**
```tsx
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

<CTAVisibilityTracker
  ctaId="victorinox-8in-above-fold"
  position="above_fold"
  productSlug="victorinox-fibrox-8-inch-chefs-knife"
  merchant="amazon"
>
  <AffiliateButton href="..." merchant="amazon" product="...">
    View on Amazon →
  </AffiliateButton>
</CTAVisibilityTracker>
```

**GA4 Events Tracked:**
- `cta_impression` - When CTA becomes 50% visible (includes scroll depth at first view)
- `cta_engagement` - On page exit (includes total time in view, view count)

---

### 3. Enhanced Device Detection
**Location:** `/lib/device-detection.ts`

**What it provides:** Consistent device type detection across all events

**Available functions:**
```typescript
import { getDeviceType, isMobile, isTablet, isDesktop, getDeviceContext } from '@/lib/device-detection'

// Get device type
const device = getDeviceType() // Returns: 'mobile' | 'tablet' | 'desktop'

// Check device type
if (isMobile()) { /* ... */ }

// Get complete context
const context = getDeviceContext()
// Returns: { device_type, viewport_width, viewport_height, orientation, is_touch }
```

---

### 4. Updated Tracking Library
**Location:** `/lib/tracking.ts`

**What changed:** All tracking functions now include device_type automatically

**New exports:**
```typescript
// Content type taxonomy
export type ContentType = 'review' | 'guide' | 'blog' | 'category' | 'homepage' | 'about' | 'newsletter' | 'contact'
export type ReviewTier = 1 | 2 | 3 | null

// Get page context with device info
export function getPageContext(contentType: ContentType, tier?: ReviewTier)
```

**Enhanced functions:**
- `trackAffiliateClick()` - Now includes device_type, viewport_width
- `trackEmailSignup()` - Now includes device_type
- `trackInternalClick()` - Now includes device_type
- `trackScrollDepth()` - Now includes device_type

---

## Implementation Examples

### Example 1: Homepage Product Grid

**Before:**
```tsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

**After (with impression tracking):**
```tsx
import ProductImpressionTracker from '@/components/ProductImpressionTracker'

{products.map((product, index) => (
  <ProductImpressionTracker
    key={product.id}
    productName={product.name}
    productSlug={product.slug}
    category={product.category}
    brand={product.brand}
    price={product.price}
    position={index + 1}
    listName="homepage_featured"
  >
    <ProductCard product={product} />
  </ProductImpressionTracker>
))}
```

---

### Example 2: Review Page with CTA Tracking

**Before:**
```tsx
<AffiliateButton
  href="https://amazon.com/..."
  merchant="amazon"
  product="victorinox-fibrox-8-inch"
  position="above_fold"
>
  View on Amazon →
</AffiliateButton>
```

**After (with visibility tracking):**
```tsx
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

<CTAVisibilityTracker
  ctaId="victorinox-8in-above-fold"
  position="above_fold"
  productSlug="victorinox-fibrox-8-inch-chefs-knife"
  merchant="amazon"
>
  <AffiliateButton
    href="https://amazon.com/..."
    merchant="amazon"
    product="victorinox-fibrox-8-inch"
    position="above_fold"
  >
    View on Amazon →
  </AffiliateButton>
</CTAVisibilityTracker>
```

---

### Example 3: Content Type Tracking

**Add to each page type:**

```tsx
// In review pages
import { getPageContext } from '@/lib/tracking'

const pageContext = getPageContext('review', 1) // tier 1 review

// In guide pages
const pageContext = getPageContext('guide')

// In blog posts
const pageContext = getPageContext('blog')
```

Then push to dataLayer on page load:
```tsx
useEffect(() => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_context',
      ...pageContext
    })
  }
}, [])
```

---

## Quick Implementation Checklist

### Homepage (/app/page.tsx)
- [ ] Wrap featured products with `ProductImpressionTracker`
- [ ] Wrap category cards with `ProductImpressionTracker`
- [ ] Add page context: `getPageContext('homepage')`

### Review Pages (/app/reviews/*/page.tsx)
- [ ] Wrap all affiliate CTAs with `CTAVisibilityTracker`
- [ ] Add page context: `getPageContext('review', tierNumber)`
- [ ] Product impression already tracked by ProductViewTrackerWrapper

### Category Pages (/app/knives, /app/cookware, /app/appliances)
- [ ] Wrap product grids with `ProductImpressionTracker`
- [ ] Add page context: `getPageContext('category')`

### Guide Pages (/app/guides/*)
- [ ] Wrap recommended products with `ProductImpressionTracker`
- [ ] Wrap affiliate links with `CTAVisibilityTracker`
- [ ] Add page context: `getPageContext('guide')`

---

## What Data You'll Get

### In Google Analytics 4

#### Product Performance
**Report:** Engagement > Events > view_item
- See which products get impressions without clicks
- Compare impression rates by device type
- Identify products that scroll into view but don't convert

#### CTA Effectiveness
**Report:** Engagement > Events > cta_impression, cta_engagement
- See which CTAs are viewed but not clicked
- Measure time-in-view before click
- Compare CTA position effectiveness
- Identify mobile vs desktop CTA preferences

#### Device Segmentation
**All events now include device_type**
- Compare mobile vs desktop conversion rates
- Identify mobile-specific barriers
- Optimize content length by device
- Adjust CTA strategy per device

#### Content Performance
**Using content_type dimension**
- Compare reviews vs guides vs blog posts
- Measure tier 1 vs tier 2 vs tier 3 review performance
- Identify highest-converting content types

---

## Key Metrics to Monitor

### Impression-to-Click Ratio
```
Product Clicks / Product Impressions = Click-Through Rate
```
- Low ratio = Product needs better positioning or messaging
- High ratio = Strong product-market fit

### CTA Visibility-to-Click Ratio
```
CTA Clicks / CTA Impressions = CTA Effectiveness
```
- Low ratio = CTA needs better design or copy
- High ratio = Strong value proposition

### Device Conversion Gap
```
Mobile CTR / Desktop CTR = Mobile Performance Index
```
- <1.0 = Mobile experience needs optimization
- ~1.0 = Consistent cross-device experience
- >1.0 = Mobile-first design working well

### Content Type ROI
```
Clicks per Content Type / Time Investment = Content ROI
```
- Identifies which content types to create more of
- Guides content strategy

---

## Troubleshooting

### Events not appearing in GA4?
1. Check that GTM is loading: `window.dataLayer` should exist
2. Open browser console - tracking events log to console
3. Use GTM Preview mode to verify events are firing
4. GA4 has a 24-48 hour delay for custom reports

### Device type showing "desktop" for mobile?
1. Check that component is client-side (`'use client'`)
2. Verify window object exists before detection
3. Test on real mobile device (not just responsive mode)

### Duplicate events firing?
1. Ensure components aren't re-rendering unnecessarily
2. Check that impression tracking uses `impressionTracked.current` flag
3. Verify observer is cleaned up properly on unmount

---

## Next Steps

After implementing Phase 1:
1. Let data collect for 1-2 weeks
2. Review GA4 reports (see "What Data You'll Get" section)
3. Identify optimization opportunities
4. Ready for Phase 2: FAQ tracking, trust signals, exit analysis

---

## Support

Questions? Issues? Check:
- `/docs/analytics/PHASE1_IMPLEMENTATION_GUIDE.md` (this file)
- Component files have inline documentation
- Console logs show tracking activity in dev mode
