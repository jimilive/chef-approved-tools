// components/AffiliateButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { trackAffiliateClick } from '@/lib/tracking';
import { getAssignedVariant, getVariantText, type CTAVariant } from '@/lib/ab-test';

interface AffiliateButtonProps {
  href: string;
  merchant: 'amazon' | 'williams_sonoma' | 'kitchenaid_direct' | 'sur_la_table' | 'other';
  product: string;
  position: 'above_fold' | 'mid_article' | 'final_cta' | 'comparison_table' | 'related_products';
  price?: number;
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  enableABTest?: boolean; // Toggle A/B testing on/off
}

/**
 * Enhanced Affiliate Button with A/B Testing
 *
 * By default, uses A/B tested CTA text variations
 * Set enableABTest={false} to use custom children text
 */
export default function AffiliateButton({
  href,
  merchant,
  product,
  position,
  price,
  children,
  className = '',
  variant = 'primary',
  enableABTest = true
}: AffiliateButtonProps) {
  const [ctaVariant, setCtaVariant] = useState<CTAVariant>('a');
  const [mounted, setMounted] = useState(false);

  // Get A/B test variant on client side
  useEffect(() => {
    setMounted(true);
    if (enableABTest) {
      setCtaVariant(getAssignedVariant());
    }
  }, [enableABTest]);

  const handleClick = () => {
    trackAffiliateClick(merchant, product, position, price);

    // Track A/B test variant click if enabled
    if (enableABTest && typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_variant_click',
        variant: ctaVariant,
        variant_text: getVariantText(ctaVariant),
        merchant: merchant,
        product: product,
        position: position,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white',
    secondary: 'bg-orange-500 hover:bg-orange-600 text-white',
    outline: 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50'
  };

  const baseStyles = 'inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';

  // Determine CTA text
  const ctaText = enableABTest && mounted ? getVariantText(ctaVariant) : children;

  // If A/B testing not enabled and no children provided, use default
  const displayText = ctaText || 'View on Amazon';

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="nofollow noopener"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={`${displayText} - Opens in new window`}
    >
      {displayText}
    </a>
  );
}
