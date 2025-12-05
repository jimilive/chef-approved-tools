// components/StickyMobileCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AffiliateButtonCompact } from './AffiliateButtonVariations';
import { getAssignedVariant, type CTAVariant } from '@/lib/ab-test';

interface StickyMobileCTAProps {
  productName: string;
  affiliateUrl: string;
  merchant?: 'amazon' | 'williams_sonoma' | 'kitchenaid_direct' | 'sur_la_table' | 'other';
  productSlug: string;
}

/**
 * Sticky mobile CTA that appears at bottom of screen
 * - Only shows on mobile devices
 * - Fades in after 1 second
 * - Only appears on /reviews/* pages
 *
 * This component is client-only (uses createPortal and browser APIs)
 */
function StickyMobileCTAClient({
  productName,
  affiliateUrl,
  merchant = 'amazon',
  productSlug
}: StickyMobileCTAProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [variant, setVariant] = useState<CTAVariant>('a');
  const pathname = usePathname();

  // Check if we're on a review page
  const isReviewPage = pathname?.startsWith('/reviews/');

  useEffect(() => {
    if (!isReviewPage) return;

    // Get A/B test variant
    setVariant(getAssignedVariant());

    // Simple: show after 1 second
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isReviewPage]);

  // Don't render on non-review pages
  if (!isReviewPage) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ease-in-out shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] ${
        shouldShow ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative px-4 py-3 safe-area-bottom">
        {/* Product name - truncated */}
        <div className="text-xs font-semibold text-slate-700 mb-2 truncate">
          {productName}
        </div>

        {/* CTA Button */}
        <AffiliateButtonCompact
          href={affiliateUrl}
          merchant={merchant}
          product={productSlug}
          position="final_cta"
          variant={variant}
        />
      </div>
    </div>,
    document.body
  );
}

// Default export for backward compatibility
export default StickyMobileCTAClient;

/**
 * Dynamic wrapper that prevents SSR hydration issues
 * Use this in your review pages
 */
export const StickyMobileCTAWrapper = dynamic(
  () => Promise.resolve(StickyMobileCTAClient),
  { ssr: false }
);
