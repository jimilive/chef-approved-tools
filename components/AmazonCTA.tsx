'use client'

import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

type CTAPosition = 'above_fold' | 'mid_article' | 'comparison_table' | 'who_should_buy' | 'final_cta' | 'sticky_mobile'
type CTAVariant = 'button' | 'textLink' | 'styledBox'

interface AmazonCTAProps {
  productSlug: string
  affiliateUrl: string
  position: CTAPosition
  variant?: CTAVariant
  text?: string
  boxHeading?: string
  className?: string
}

/**
 * AmazonCTA Component
 *
 * Single-button CTA for Amazon affiliate links with 3 variant styles.
 * Use this for the common case where Amazon is the only purchase option.
 *
 * For multiple vendors (Amazon + manufacturer site), use MultiVendorCTA instead.
 *
 * Variants:
 * - button: Bold gradient button (hero, final CTA, mobile sticky)
 * - textLink: Subtle underlined link with arrow prefix (mid-article)
 * - styledBox: Button inside an orange highlight box (comparison table, who should buy)
 *
 * Features:
 * - Consistent styling across all review pages
 * - Built-in CTAVisibilityTracker for analytics
 * - Centralized text (change once, update everywhere)
 * - Smart defaults by position
 */
export default function AmazonCTA({
  productSlug,
  affiliateUrl,
  position,
  variant,
  text,
  boxHeading = 'Ready to upgrade your kitchen?',
  className = ''
}: AmazonCTAProps) {
  // Default variants by position
  const defaultVariants: Record<CTAPosition, CTAVariant> = {
    above_fold: 'button',
    mid_article: 'textLink',
    comparison_table: 'styledBox',
    who_should_buy: 'styledBox',
    final_cta: 'button',
    sticky_mobile: 'button'
  }

  // Default text by position
  const defaultText: Record<CTAPosition, string> = {
    above_fold: 'Check Price on Amazon',
    mid_article: 'Check price and reviews on Amazon',
    comparison_table: 'Check Price on Amazon',
    who_should_buy: 'Check Price on Amazon',
    final_cta: 'Check Price on Amazon',
    sticky_mobile: 'Check Price on Amazon'
  }

  const resolvedVariant = variant || defaultVariants[position]
  const resolvedText = text || defaultText[position]

  // Button variant styling
  const buttonStyles = "inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-lg"

  // Text link variant styling
  const textLinkStyles = "text-orange-700 hover:text-orange-800 font-medium underline"

  const renderLink = (linkClassName: string, linkText: string) => (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`${linkClassName} ${className}`.trim()}
    >
      {linkText}
    </a>
  )

  const renderContent = () => {
    switch (resolvedVariant) {
      case 'button':
        return renderLink(buttonStyles, resolvedText)

      case 'textLink':
        return renderLink(textLinkStyles, `→ ${resolvedText}`)

      case 'styledBox':
        return (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center my-8">
            <p className="text-lg font-medium text-slate-900 mb-4">
              {boxHeading}
            </p>
            {renderLink(buttonStyles, resolvedText)}
          </div>
        )

      default:
        return renderLink(buttonStyles, resolvedText)
    }
  }

  return (
    <CTAVisibilityTracker
      ctaId={`${productSlug}-${position}`}
      position={position}
      productSlug={productSlug}
      merchant="amazon"
    >
      {renderContent()}
    </CTAVisibilityTracker>
  )
}
