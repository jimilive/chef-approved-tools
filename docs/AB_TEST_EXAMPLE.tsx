// Example: How to use A/B testing on a review page
// File: app/reviews/victorinox-fibrox-8-inch-chefs-knife/page.tsx

import AffiliateButton from '@/components/AffiliateButton';
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA';

export default function VictorinoxReviewPage() {
  const productData = {
    name: "Victorinox Fibrox 8-Inch Chef's Knife",
    slug: "victorinox-fibrox-8-inch-chefs-knife",
    affiliateUrl: "https://www.amazon.com/dp/B008M5U1C2?tag=chefapprovedt-20"
  };

  return (
    <article>
      {/*
        OPTION 1: Existing Buttons (Automatic A/B Testing)
        No changes needed! Your existing AffiliateButton components
        will automatically use A/B test variations.
      */}

      {/* Above-fold CTA - Will show variant A, B, or C automatically */}
      <AffiliateButton
        href={productData.affiliateUrl}
        merchant="amazon"
        product={productData.slug}
        position="above_fold"
        variant="primary"
      >
        View on Amazon
        {/* ↑ This text is IGNORED when A/B testing is enabled */}
        {/* Button will show "View on Amazon", "Check Price & Reviews", or "See Details on Amazon" */}
      </AffiliateButton>

      {/* Your review content here */}
      <div>
        <h1>Product Review Content</h1>
        <p>Your detailed review...</p>
      </div>

      {/*
        Mid-article CTA - Also uses A/B testing
      */}
      <AffiliateButton
        href={productData.affiliateUrl}
        merchant="amazon"
        product={productData.slug}
        position="mid_article"
        variant="secondary"
      >
        Check Amazon Price
      </AffiliateButton>

      {/* More content */}

      {/*
        OPTION 2: Disable A/B Testing (Custom Text)
        Use when you want specific custom CTA text
      */}
      <AffiliateButton
        href={productData.affiliateUrl}
        merchant="amazon"
        product={productData.slug}
        position="final_cta"
        enableABTest={false}  // ← Disable A/B testing
      >
        Get My Recommended Knife Now →
        {/* ↑ This custom text WILL be used */}
      </AffiliateButton>

      {/*
        OPTION 3: Add Sticky Mobile CTA
        This automatically appears on mobile after 3s or 50% scroll
        Uses A/B test variants automatically
      */}
      <StickyMobileCTAWrapper
        productName={productData.name}
        affiliateUrl={productData.affiliateUrl}
        merchant="amazon"
        productSlug={productData.slug}
      />
    </article>
  );
}

// ============================================
// EXAMPLE 2: Comparison Table
// ============================================

export function ComparisonTableExample() {
  const products = [
    {
      name: "Victorinox 8-Inch",
      slug: "victorinox-fibrox-8-inch-chefs-knife",
      url: "https://amazon.com/..."
    },
    {
      name: "Wusthof Classic",
      slug: "wusthof-classic-8-inch-chefs-knife",
      url: "https://amazon.com/..."
    }
  ];

  return (
    <table>
      <tbody>
        {products.map(product => (
          <tr key={product.slug}>
            <td>{product.name}</td>
            <td>
              {/* Each button will show same A/B variant for consistency */}
              <AffiliateButton
                href={product.url}
                merchant="amazon"
                product={product.slug}
                position="comparison_table"
                variant="outline"
              >
                View Product
              </AffiliateButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================
// EXAMPLE 3: Lazy Loading for Performance
// ============================================

import { lazy, Suspense } from 'react';

const StickyMobileCTA = lazy(() => import('@/components/StickyMobileCTA').then(mod => ({
  default: mod.StickyMobileCTAWrapper
})));

export function OptimizedReviewPage() {
  return (
    <>
      {/* Your content */}

      {/* Lazy load sticky CTA for better performance */}
      <Suspense fallback={null}>
        <StickyMobileCTA
          productName="Lodge Cast Iron Skillet"
          affiliateUrl="https://amazon.com/..."
          merchant="amazon"
          productSlug="lodge-cast-iron-skillet"
        />
      </Suspense>
    </>
  );
}

// ============================================
// EXAMPLE 4: Testing Different Positions
// ============================================

export function MultiplePositionsExample() {
  const productUrl = "https://amazon.com/...";
  const productSlug = "example-product";

  return (
    <article>
      {/* Above fold - Primary CTA */}
      <AffiliateButton
        href={productUrl}
        merchant="amazon"
        product={productSlug}
        position="above_fold"  // ← Track position
        variant="primary"
      >
        CTA Text (will be replaced by A/B test)
      </AffiliateButton>

      {/* Content */}

      {/* Mid article - Secondary CTA */}
      <AffiliateButton
        href={productUrl}
        merchant="amazon"
        product={productSlug}
        position="mid_article"  // ← Different position
        variant="secondary"
      >
        CTA Text
      </AffiliateButton>

      {/* More content */}

      {/* Final CTA - Primary again */}
      <AffiliateButton
        href={productUrl}
        merchant="amazon"
        product={productSlug}
        position="final_cta"  // ← Final position
        variant="primary"
      >
        CTA Text
      </AffiliateButton>
    </article>
  );
}

// ============================================
// EXAMPLE 5: Non-Amazon Merchants
// ============================================

export function OtherMerchantsExample() {
  return (
    <>
      {/* Williams Sonoma - No A/B test needed */}
      <AffiliateButton
        href="https://williams-sonoma.com/..."
        merchant="williams_sonoma"
        product="le-creuset-dutch-oven"
        position="above_fold"
        enableABTest={false}  // Disable for non-Amazon
      >
        View at Williams Sonoma
      </AffiliateButton>

      {/* Amazon - Full A/B test */}
      <AffiliateButton
        href="https://amazon.com/..."
        merchant="amazon"
        product="kitchenaid-mixer"
        position="above_fold"
        enableABTest={true}  // Enable for Amazon (default)
      >
        View on Amazon
      </AffiliateButton>
    </>
  );
}

// ============================================
// KEY POINTS TO REMEMBER
// ============================================

/*
1. EXISTING BUTTONS WORK AUTOMATICALLY
   - No changes needed to existing AffiliateButton components
   - They automatically get A/B testing enabled
   - Children text is ignored when A/B testing is on

2. VISITOR CONSISTENCY
   - Each visitor sees the SAME variant across all pages
   - Stored in localStorage as 'cta_variant'
   - Assignment persists across sessions

3. MOBILE STICKY CTA
   - Only shows on mobile (< 768px)
   - Only on /reviews/* pages
   - Appears after 3s OR 50% scroll
   - Hides near bottom of page

4. TRACKING
   - All clicks tracked with variant info
   - Check browser console for logs
   - View in GTM preview mode
   - Analyze in GA4 after data collection

5. CUSTOMIZATION
   - Use enableABTest={false} for custom text
   - Add TrustSignals component below button for trust indicators
   - All existing props still work

6. PERFORMANCE
   - No layout shift (CLS)
   - Client-side only (no SSR issues)
   - Lazy loading recommended for sticky CTA
*/
