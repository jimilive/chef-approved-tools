// components/StickyMobileCTA.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
 * - Fades in after 3 seconds or 50% scroll (whichever first)
 * - Hides when user reaches bottom of page
 * - Only appears on /reviews/* pages
 */
export default function StickyMobileCTA({
  productName,
  affiliateUrl,
  merchant = 'amazon',
  productSlug
}: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CTAVariant>('a');
  const pathname = usePathname();
  const hasTriggered = useRef(false);
  const triggerTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Only show on review pages
    if (!pathname?.startsWith('/reviews/')) {
      return;
    }

    // Get assigned A/B test variant
    setVariant(getAssignedVariant());

    // Trigger after 3 seconds
    triggerTimer.current = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        setIsVisible(true);
      }
    }, 3000);

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll percentage
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Show after 50% scroll
      if (scrollPercentage >= 50 && !hasTriggered.current) {
        hasTriggered.current = true;
        setIsVisible(true);
        if (triggerTimer.current) {
          clearTimeout(triggerTimer.current);
        }
      }

      // Hide at bottom (last 10% of page)
      if (scrollPercentage >= 90) {
        setIsVisible(false);
      } else if (hasTriggered.current && scrollPercentage < 90) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (triggerTimer.current) {
        clearTimeout(triggerTimer.current);
      }
    };
  }, [pathname]);

  // Don't render on desktop or non-review pages
  if (!pathname?.startsWith('/reviews/')) {
    return null;
  }

  return (
    <>
      {/* Mobile only - hidden on md breakpoint and above */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transform transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
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
      </div>
    </>
  );
}

/**
 * Wrapper component for lazy loading
 * Use this in your review pages
 */
export function StickyMobileCTAWrapper(props: StickyMobileCTAProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid SSR hydration issues
  }

  return <StickyMobileCTA {...props} />;
}
