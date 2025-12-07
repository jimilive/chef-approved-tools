// components/AffiliateButton.tsx
'use client';

import { useEffect, useRef } from 'react';
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

// Default CTA text that matches what the server renders
const DEFAULT_CTA_TEXT = 'Check Price on Amazon';

/**
 * Enhanced Affiliate Button with A/B Testing
 *
 * By default, uses A/B tested CTA text variations
 * Set enableABTest={false} to use custom children text
 *
 * Note: To avoid hydration errors, the button always renders with a consistent
 * initial text. The A/B variant is applied via DOM manipulation after mount.
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
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const ctaVariantRef = useRef<CTAVariant>('a');

  // Apply A/B test variant text after mount (DOM manipulation, no re-render)
  useEffect(() => {
    if (enableABTest && buttonRef.current) {
      ctaVariantRef.current = getAssignedVariant();
      const variantText = getVariantText(ctaVariantRef.current);
      buttonRef.current.textContent = variantText;
      buttonRef.current.setAttribute('aria-label', `${variantText} - Opens in new window`);
    }
  }, [enableABTest]);

  const handleClick = () => {
    trackAffiliateClick(merchant, product, position, price);

    // Track A/B test variant click if enabled
    if (enableABTest && typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_variant_click',
        variant: ctaVariantRef.current,
        variant_text: getVariantText(ctaVariantRef.current),
        merchant: merchant,
        product: product,
        position: position,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 !text-white',
    secondary: 'bg-orange-900 hover:bg-orange-950 !text-white',
    outline: 'border-2 border-orange-500 text-orange-700 hover:bg-orange-50'
  };

  const baseStyles = 'inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';

  // Use children if provided, otherwise use default text
  // A/B test text is applied via DOM after mount to avoid hydration mismatch
  const displayText = children || DEFAULT_CTA_TEXT;

  return (
    <a
      ref={buttonRef}
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
