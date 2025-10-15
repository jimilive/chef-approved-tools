# Homepage Implementation Example

This shows exactly how to add Phase 1 tracking to your homepage (`/app/page.tsx`)

## Changes Overview

1. Add ProductImpressionTracker to featured products
2. Track homepage as content type
3. Wrap CTAs with visibility tracking

## Implementation

### Step 1: Add Imports

Add these imports at the top of `/app/page.tsx`:

```tsx
import ProductImpressionTracker from '@/components/ProductImpressionTracker'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { useEffect } from 'react' // If not already imported
```

### Step 2: Add Page Context Tracking

Add this useEffect hook near the top of your HomePage component:

```tsx
export default function HomePage() {
  // Track page context on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_context',
        content_type: 'homepage',
        review_tier: null,
        device_type: getDeviceType(),
        viewport_width: getViewportSize().width,
        viewport_height: getViewportSize().height
      })
    }
  }, [])

  return (
    // ... rest of component
  )
}
```

### Step 3: Wrap Featured Products

Find this section (around line 263-284):

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {sampleProducts.map((product, index) => {
    const category = index === 0 || index === 5 ? 'knives' : index === 1 || index === 4 ? 'cookware' : 'appliances'
    return (
      <div key={product.id}>
        {/* Add structured data for each product */}
        <SimpleProductSchema
          name={product.name}
          brand={product.brand}
          rating={product.rating}
          reviewCount={product.reviews}
          category={category}
          image={product.image}
          affiliateUrl={product.affiliateUrl}
        />
        <EnhancedProductCard
          product={product}
        />
      </div>
    )
  })}
</div>
```

**Replace with:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {sampleProducts.map((product, index) => {
    const category = index === 0 || index === 5 ? 'knives' : index === 1 || index === 4 ? 'cookware' : 'appliances'
    return (
      <ProductImpressionTracker
        key={product.id}
        productName={product.name}
        productSlug={product.id}
        category={category}
        brand={product.brand}
        price={45} // Add actual price if available
        position={index + 1}
        listName="homepage_featured_products"
      >
        <div>
          {/* Add structured data for each product */}
          <SimpleProductSchema
            name={product.name}
            brand={product.brand}
            rating={product.rating}
            reviewCount={product.reviews}
            category={category}
            image={product.image}
            affiliateUrl={product.affiliateUrl}
          />
          <EnhancedProductCard
            product={product}
          />
        </div>
      </ProductImpressionTracker>
    )
  })}
</div>
```

### Step 4: Wrap CTA Buttons in EnhancedProductCard

Find the AffiliateButton in EnhancedProductCard (around line 89-97):

```tsx
<AffiliateButton
  href={product.affiliateUrl}
  merchant="amazon"
  product={product.name}
  position="above_fold"
  className="w-full text-center"
>
  View on Amazon →
</AffiliateButton>
```

**Replace with:**

```tsx
<CTAVisibilityTracker
  ctaId={`${product.id}-homepage-card`}
  position="above_fold"
  productSlug={product.id}
  merchant="amazon"
>
  <AffiliateButton
    href={product.affiliateUrl}
    merchant="amazon"
    product={product.name}
    position="above_fold"
    className="w-full text-center"
  >
    View on Amazon →
  </AffiliateButton>
</CTAVisibilityTracker>
```

### Step 5: Track Category Card Clicks

Find the category links section (around line 376-399):

```tsx
<a href="/knives" className="group bg-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all">
  <div className="relative w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
    <Image src="/logo.png" alt="Knives" width={40} height={40} sizes="40px" className="object-contain" />
  </div>
  <h3 className="text-xl font-bold mb-2 sm:mb-2 text-slate-900">Professional Knives</h3>
  <p className="text-slate-600 text-sm mt-2 sm:mt-0">German vs Japanese, what actually lasts</p>
</a>
```

**Wrap each category card with ProductImpressionTracker:**

```tsx
<ProductImpressionTracker
  productName="Professional Knives Category"
  productSlug="knives"
  category="Category Navigation"
  position={1}
  listName="homepage_categories"
>
  <a href="/knives" className="group bg-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all">
    <div className="relative w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
      <Image src="/logo.png" alt="Knives" width={40} height={40} sizes="40px" className="object-contain" />
    </div>
    <h3 className="text-xl font-bold mb-2 sm:mb-2 text-slate-900">Professional Knives</h3>
    <p className="text-slate-600 text-sm mt-2 sm:mt-0">German vs Japanese, what actually lasts</p>
  </a>
</ProductImpressionTracker>
```

Repeat for cookware and appliances categories (positions 2 and 3).

---

## What You'll Learn

After implementing these changes, you'll be able to answer:

### Product Performance Questions
- Which featured products get the most impressions?
- Which products are seen but not clicked?
- What's the impression-to-click ratio for each product?
- Do mobile users engage with different products than desktop?

### CTA Effectiveness Questions
- Are CTAs visible but not being clicked?
- How long do users view CTAs before deciding?
- Which CTA positions perform best?
- Do mobile CTAs need different placement?

### Category Navigation Questions
- Which category gets the most attention?
- Are categories being scrolled past without engagement?
- Should category order be changed?

---

## Testing Your Implementation

### 1. Open Browser Console
- Navigate to homepage
- Watch for console logs like:
  ```
  Product impression tracked: { productName: "Vitamix 5200...", listName: "homepage_featured_products", position: 1 }
  CTA impression tracked: { ctaId: "vitamix-5200-homepage-card", position: "above_fold" }
  ```

### 2. Check dataLayer
In browser console:
```javascript
window.dataLayer
```
You should see events like:
- `page_context`
- `view_item`
- `cta_impression`
- `cta_engagement`

### 3. Use GTM Preview Mode
1. Go to Google Tag Manager
2. Click "Preview"
3. Enter your site URL
4. Watch events fire in real-time

---

## Expected Results

After 7 days of data:
- ~500-1000 product impressions (depending on traffic)
- ~50-200 CTA impressions per product
- Clear mobile vs desktop behavior patterns
- Conversion funnel visibility (impression → click)

---

## Next: Review Pages

Once homepage is working, implement on review pages for even deeper insights:
- See `/docs/analytics/REVIEW_PAGE_IMPLEMENTATION.md` (coming in Phase 1 completion)
