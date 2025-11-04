import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

/**
 * ProductComparisonTable - Optimized for Conversion
 *
 * Based on Master Research Findings + claude.ai recommendations:
 * - 2-4 product comparison (flexible columns)
 * - Large product images for visibility
 * - Star ratings for scannability
 * - Highlight why featured product wins
 * - Focus on decision-making specs
 * - CTA buttons for each product
 * - Product names as clickable affiliate links
 * - Mobile-responsive with overflow-x-auto
 *
 * Research shows comparison tables are "CONVERSION MACHINES"
 */

interface ComparisonProduct {
  name: string
  slug?: string // Optional: link to internal review
  affiliateUrl: string
  imageUrl?: string // Optional: product image
  imageAlt?: string
  badge?: string // Optional: "Best Overall", "Best Value", "Premium Choice"
  badgeColor?: 'orange' | 'green' | 'blue' | 'purple'
  rating?: number // Star rating (e.g., 4.5)
  isFeatured?: boolean // Highlight as your top recommendation
}

interface ComparisonFeature {
  label: string
  values: (string | ReactNode)[] // One value per product
  // Optionally highlight specific products for this feature
  highlights?: number[] // Array of product indexes to highlight (0-based)
}

interface ProductComparisonTableProps {
  title: string
  subtitle?: string
  introText?: ReactNode
  products: ComparisonProduct[] // 2-4 products
  features: ComparisonFeature[]
  ctaText?: string
  position?: string // For tracking
}

export default function ProductComparisonTable({
  title,
  subtitle,
  introText,
  products,
  features,
  ctaText = "Check Price on Amazon →",
  position = "comparison-table"
}: ProductComparisonTableProps) {

  // Validate: Must have 2-4 products
  if (products.length < 2 || products.length > 4) {
    console.error('ProductComparisonTable: Must have 2-4 products')
    return null
  }

  // Validate: Features must have same number of values as products
  const invalidFeatures = features.filter(f => f.values.length !== products.length)
  if (invalidFeatures.length > 0) {
    console.error('ProductComparisonTable: All features must have values for each product')
    return null
  }

  const getBadgeColor = (color?: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'purple':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'orange':
      default:
        return 'bg-orange-100 text-orange-800 border-orange-300'
    }
  }

  const renderStars = (rating?: number) => {
    if (!rating) return null
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    return (
      <div className="flex items-center gap-1">
        <span className="text-lg text-amber-500">
          {'★'.repeat(fullStars)}
          {hasHalfStar ? '½' : ''}
          {'☆'.repeat(emptyStars)}
        </span>
        <span className="text-sm font-semibold text-slate-700">
          {rating.toFixed(1)}
        </span>
      </div>
    )
  }

  // Calculate column widths based on number of products
  const featureColWidth = products.length === 2 ? 'w-1/3' : products.length === 3 ? 'w-1/4' : 'w-1/5'
  const productColWidth = products.length === 2 ? 'w-1/3' : products.length === 3 ? 'w-1/4' : 'w-1/5'

  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-8 shadow-sm mb-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-[1.3]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {introText && (
        <div className="text-slate-600 mb-6 leading-relaxed text-base">
          {introText}
        </div>
      )}

      {/* Comparison Table - Mobile Responsive with Horizontal Scroll */}
      <div className="overflow-x-auto -mx-6 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">

            {/* Table View - Works on all screen sizes with horizontal scroll on mobile */}
            <div className="min-w-[640px]">
              <table className="w-full border-collapse">
                {/* Product Headers with Images and CTAs */}
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {/* Empty cell for feature labels */}
                    <th className={featureColWidth + " px-4 py-4"}></th>

                    {/* Product Columns */}
                    {products.map((product, index) => {
                      const isFeatured = product.isFeatured
                      const bgColor = isFeatured ? 'bg-orange-50' : 'bg-gray-50'
                      const borderColor = isFeatured ? 'border-l-2 border-orange-200' : 'border-l border-gray-200'

                      return (
                        <th key={index} className={`${productColWidth} px-4 py-6 ${bgColor} ${borderColor}`}>
                          <div className="flex flex-col items-center gap-3">
                            {/* Badge */}
                            {product.badge && (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(product.badgeColor)}`}>
                                {product.badge}
                              </span>
                            )}

                            {/* Product Image */}
                            {product.imageUrl && (
                              <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full max-w-[160px] aspect-square relative hover:opacity-90 transition-opacity"
                              >
                                <Image
                                  src={product.imageUrl}
                                  alt={product.imageAlt || product.name}
                                  fill
                                  className="object-contain"
                                  sizes="160px"
                                />
                              </a>
                            )}

                            {/* Product Name (clickable) */}
                            <h3 className="text-sm font-bold text-slate-900 text-center mt-2 mb-0 leading-tight">
                              {product.slug ? (
                                <Link
                                  href={`/reviews/${product.slug}`}
                                  className="text-orange-700 hover:underline no-underline"
                                >
                                  {product.name}
                                </Link>
                              ) : (
                                <a
                                  href={product.affiliateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-orange-700 hover:underline no-underline"
                                >
                                  {product.name}
                                </a>
                              )}
                            </h3>

                            {/* Star Rating */}
                            {product.rating && (
                              <div className="mt-1">
                                {renderStars(product.rating)}
                              </div>
                            )}

                            {/* CTA Button */}
                            <CTAVisibilityTracker
                              ctaId={`${position}-product-${index}`}
                              position={position}
                            >
                              <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-all hover:scale-105 mt-2"
                              >
                                {ctaText}
                              </a>
                            </CTAVisibilityTracker>

                            {/* Text Link */}
                            <a
                              href={product.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-orange-700 underline hover:text-orange-800 transition-colors"
                            >
                              View details
                            </a>
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>

                {/* Feature Comparison Rows */}
                <tbody>
                  {features.map((feature, featureIndex) => (
                    <tr
                      key={featureIndex}
                      className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-4 font-semibold text-slate-900 text-sm">
                        {feature.label}
                      </td>
                      {feature.values.map((value, productIndex) => {
                        const product = products[productIndex]
                        const isFeatured = product.isFeatured
                        const isHighlighted = feature.highlights?.includes(productIndex)
                        const bgColor = isHighlighted ? 'bg-green-50' : ''
                        const textColor = isHighlighted ? 'font-semibold text-green-900' : 'text-slate-600'
                        const borderColor = isFeatured ? 'border-l-2 border-orange-200' : 'border-l border-gray-200'

                        return (
                          <td key={productIndex} className={`px-4 py-4 text-sm ${textColor} ${bgColor} ${borderColor}`}>
                            {value}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="sm:hidden text-center mt-3">
        <p className="text-xs text-slate-500 italic">
          👉 Scroll horizontally to see all products
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-700 italic mt-6 mb-0">
        *Prices and availability subject to change. As an Amazon Associate, I earn from qualifying purchases.
      </p>
    </div>
  )
}
