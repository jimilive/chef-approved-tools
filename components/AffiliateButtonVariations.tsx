// components/AffiliateButtonVariations.tsx
'use client';

import { trackAffiliateClick } from '@/lib/tracking';
import type { CTAVariant } from '@/lib/ab-test';
import { CTA_VARIANTS } from '@/lib/ab-test';

interface AffiliateButtonVariationsProps {
  href: string;
  merchant: 'amazon' | 'williams_sonoma' | 'kitchenaid_direct' | 'sur_la_table' | 'other';
  product: string;
  position: 'above_fold' | 'mid_article' | 'final_cta' | 'comparison_table' | 'related_products';
  variant: CTAVariant;
  price?: number;
  className?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
}

/**
 * Affiliate button with A/B test variations
 * Renders different CTA text based on assigned variant
 */
export default function AffiliateButtonVariations({
  href,
  merchant,
  product,
  position,
  variant,
  price,
  className = '',
  buttonVariant = 'primary'
}: AffiliateButtonVariationsProps) {

  const handleClick = () => {
    // Track affiliate click with variant info
    trackAffiliateClick(merchant, product, position, price);

    // Track which variant was clicked
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_variant_click',
        variant: variant,
        variant_text: CTA_VARIANTS[variant].text,
        merchant: merchant,
        product: product,
        position: position,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Get CTA text for this variant
  const ctaText = CTA_VARIANTS[variant].text;

  // Button variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white',
    secondary: 'bg-orange-800 hover:bg-orange-900 text-white',
    outline: 'border-2 border-orange-500 text-orange-700 hover:bg-orange-50'
  };

  const baseStyles = 'inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="nofollow noopener"
      className={`${baseStyles} ${variantStyles[buttonVariant]} ${className}`}
      aria-label={`${ctaText} - Opens in new window`}
    >
      {ctaText}
    </a>
  );
}

/**
 * Compact version for mobile sticky CTA
 */
export function AffiliateButtonCompact({
  href,
  merchant,
  product,
  position,
  variant,
  price,
  className = ''
}: Omit<AffiliateButtonVariationsProps, 'buttonVariant'>) {

  const handleClick = () => {
    trackAffiliateClick(merchant, product, position, price);

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_variant_click',
        variant: variant,
        variant_text: CTA_VARIANTS[variant].text,
        merchant: merchant,
        product: product,
        position: position,
        cta_type: 'sticky_mobile',
        timestamp: new Date().toISOString()
      });
    }
  };

  const ctaText = CTA_VARIANTS[variant].text;

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="nofollow noopener"
      className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-bold text-base rounded-lg shadow-lg transition-all duration-200 active:scale-95 ${className}`}
      aria-label={`${ctaText} - Opens in new window`}
    >
      {ctaText} →
    </a>
  );
}
