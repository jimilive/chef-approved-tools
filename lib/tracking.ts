// lib/tracking.ts

/**
 * Tracking utilities for Google Tag Manager
 * Pushes events to dataLayer for GTM to capture
 */

/**
 * Track affiliate link clicks
 * @param merchant - Affiliate merchant name (e.g., 'amazon', 'williams_sonoma')
 * @param product - Product slug (e.g., 'kitchenaid-ksm8990wh')
 * @param position - CTA position on page (e.g., 'above_fold', 'mid_article', 'final_cta')
 * @param price - Optional product price for value tracking
 */
export const trackAffiliateClick = (
  merchant: string,
  product: string,
  position: string,
  price?: number
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'affiliate_click',
      merchant: merchant,
      product: product,
      cta_position: position,
      product_price: price || 0,
      click_value: 1,
      timestamp: new Date().toISOString()
    });

    // Console log for debugging (remove in production)
    console.log('Affiliate click tracked:', { merchant, product, position, price });
  }
};

/**
 * Track email signups
 * @param location - Where signup occurred (e.g., 'price_alert', 'content_upgrade', 'newsletter')
 * @param upgradeType - Optional content upgrade type (e.g., 'mixer_guide', 'dutch_oven_guide')
 */
export const trackEmailSignup = (
  location: string,
  upgradeType?: string
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'email_signup',
      signup_location: location,
      upgrade_type: upgradeType || 'general',
      signup_value: 5,
      timestamp: new Date().toISOString()
    });

    console.log('Email signup tracked:', { location, upgradeType });
  }
};

/**
 * Track internal link clicks (for cross-selling analysis)
 * @param sourcePage - Current page slug
 * @param destinationPage - Destination page slug
 * @param linkType - Type of link (e.g., 'related_product', 'bundle', 'guide')
 */
export const trackInternalClick = (
  sourcePage: string,
  destinationPage: string,
  linkType: string
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'internal_click',
      source_page: sourcePage,
      destination_page: destinationPage,
      link_type: linkType,
      timestamp: new Date().toISOString()
    });

    console.log('Internal click tracked:', { sourcePage, destinationPage, linkType });
  }
};

/**
 * Track scroll depth milestones
 * @param depth - Scroll depth percentage (25, 50, 75, 100)
 * @param pageSlug - Current page slug
 */
export const trackScrollDepth = (
  depth: number,
  pageSlug: string
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'scroll_depth',
      scroll_depth: depth,
      page_slug: pageSlug,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Track A/B test variant assignment
 * @param variant - Assigned variant ('a', 'b', or 'c')
 * @param variantText - The CTA text for this variant
 */
export const trackVariantAssignment = (
  variant: string,
  variantText: string
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'cta_variant_assigned',
      variant: variant,
      variant_text: variantText,
      timestamp: new Date().toISOString()
    });

    console.log('CTA variant assigned:', { variant, variantText });
  }
};

/**
 * Track A/B test variant click (when user clicks CTA)
 * @param variant - The variant that was clicked
 * @param variantText - The CTA text
 * @param merchant - Affiliate merchant
 * @param product - Product slug
 * @param position - CTA position on page
 */
export const trackVariantClick = (
  variant: string,
  variantText: string,
  merchant: string,
  product: string,
  position: string
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'cta_variant_click',
      variant: variant,
      variant_text: variantText,
      merchant: merchant,
      product: product,
      cta_position: position,
      timestamp: new Date().toISOString()
    });

    console.log('CTA variant clicked:', { variant, variantText, merchant, product, position });
  }
};
