'use client'

import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

interface MultiVendorCTAProps {
  affiliateLinks: Array<{
    url: string
    label?: string
    vendor: string
    is_primary?: boolean
    primary?: boolean
  }>
  productName: string
  ctaId: string
  position: 'above_fold' | 'mid_article' | 'final_cta' | 'where_to_buy'
  productSlug?: string
}

/**
 * MultiVendorCTA Component
 *
 * Displays multiple affiliate buying options (Amazon, manufacturer sites, etc.)
 * in a professional button row on product review pages.
 *
 * Features:
 * - Primary button gets prominent gradient styling
 * - Secondary buttons get subtle outline styling
 * - Responsive: horizontal row on desktop, stacked on mobile
 * - Each button wrapped in CTAVisibilityTracker for analytics
 * - Merchant name in button text (e.g., "Buy on Amazon →")
 */
export default function MultiVendorCTA({
  affiliateLinks,
  productName,
  ctaId,
  position,
  productSlug
}: MultiVendorCTAProps) {
  // If no links, don't render anything
  if (!affiliateLinks || affiliateLinks.length === 0) {
    return null
  }

  // Helper: Generate merchant display name
  const getMerchantLabel = (merchant: string, label?: string): string => {
    // Use provided label first
    if (label && label !== merchant) {
      return label
    }

    // Otherwise map merchant code to display name
    const merchantMap: Record<string, string> = {
      'amazon': 'Amazon',
      'vitamix_cj': 'Vitamix.com',
      'zwilling_cj': 'Zwilling.com',
      'kitchenaid': 'KitchenAid.com',
      'henckels': 'Henckels.com',
      'cj': 'Manufacturer Site'
    }

    return merchantMap[merchant] || 'Manufacturer Site'
  }

  // Helper: Generate button text
  const getButtonText = (merchant: string, label: string, isPrimary: boolean): string => {
    const merchantLabel = getMerchantLabel(merchant, label)

    if (isPrimary) {
      return `Buy on ${merchantLabel} →`
    } else {
      return `Also on ${merchantLabel} →`
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
      {affiliateLinks.map((link, index) => {
        const isPrimary = link.is_primary || link.primary || false
        const buttonText = getButtonText(link.vendor, link.label || '', isPrimary)
        const merchantLabel = getMerchantLabel(link.vendor, link.label || '')

        return (
          <CTAVisibilityTracker
            key={`${ctaId}-${link.vendor}-${index}`}
            ctaId={`${ctaId}-${link.vendor}`}
            position={position}
            productSlug={productSlug}
            merchant={link.vendor}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={
                isPrimary
                  ? "inline-block w-full sm:w-auto text-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  : "inline-block w-full sm:w-auto text-center border-2 border-gray-300 hover:border-orange-600 bg-white text-gray-700 hover:text-orange-700 font-semibold px-6 py-3 rounded-lg text-base transition-all hover:scale-105 whitespace-nowrap"
              }
              aria-label={`Buy ${productName} on ${merchantLabel}`}
            >
              {buttonText}
            </a>
          </CTAVisibilityTracker>
        )
      })}
    </div>
  )
}
