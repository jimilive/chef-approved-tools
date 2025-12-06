'use client'

import { trackAffiliateClick } from '@/lib/tracking'

/**
 * Flexible Product Comparison Table Component
 *
 * Works with ANY product type by accepting dynamic comparison rows.
 * Each product review defines which fields matter for their category.
 *
 * Usage:
 *   <ProductComparisonTable
 *     title="Compare Dutch Ovens"
 *     products={[...]}  // Array of products with any fields
 *     comparisonRows={[...]}  // Which fields to show and their labels
 *     highlightedProduct="Le Creuset 7.25 Qt"
 *   />
 */

interface ComparisonRow {
  label: string  // Display label (e.g., "Capacity", "Weight")
  field: string  // Product property key (e.g., "capacity", "weight")
  format?: string  // Optional format hint: 'stars', 'proUse', 'priceTier'
}

interface ProductComparisonTableProps {
  title?: string  // Table title (default: "Compare Products")
  subtitle?: string  // Table subtitle
  products: Record<string, any>[]  // Array of products (any shape)
  comparisonRows: ComparisonRow[]  // Which fields to compare
  highlightedProduct: string  // Product name to highlight
  trustMessage?: string  // Custom trust message at bottom
}

export default function ProductComparisonTable({
  title = "Compare Products",
  subtitle,
  products,
  comparisonRows,
  highlightedProduct,
  trustMessage
}: ProductComparisonTableProps) {

  // Helper to get price tier label
  const getPriceTierLabel = (tier: string) => {
    switch(tier) {
      case 'luxury': return 'Luxury'
      case 'premium': return 'Premium'
      case 'mid-range': return 'Mid-Range'
      case 'budget': return 'Budget'
      default: return tier
    }
  }

  // Helper to detect affiliate network from URL and generate consistent button text
  const getButtonText = (affiliateLink: string) => {
    if (affiliateLink.includes('amazon.com') || affiliateLink.includes('amzn.to')) {
      return 'Check Price on Amazon'
    }
    if (affiliateLink.includes('kitchenaid.com') || affiliateLink.includes('dpbolvw.net') || affiliateLink.includes('jdoqocy.com')) {
      return 'Check Price on KitchenAid'
    }
    if (affiliateLink.includes('zwilling.com') || affiliateLink.includes('anrdoezrs.net')) {
      return 'Check Price on Zwilling'
    }
    if (affiliateLink.includes('vitamix.com')) {
      return 'Check Price on Vitamix'
    }
    if (affiliateLink.includes('henckels.com')) {
      return 'Check Price on Henckels'
    }
    if (affiliateLink.includes('lecreuset.com')) {
      return 'Check Price on Le Creuset'
    }
    if (affiliateLink.includes('lodge.com') || affiliateLink.includes('lodgecastiron.com')) {
      return 'Check Price on Lodge'
    }
    // DEVELOPER NOTE: If you see "Check Price" without a merchant name,
    // ASK SCOTT to add the merchant detection for this affiliate link.
    // We want all CTAs to say "Check Price on [Merchant]" for consistency.
    console.warn(`Unknown merchant for affiliate link: ${affiliateLink}. Ask Scott to add merchant detection.`)
    return 'Check Price'
  }

  // Helper to detect merchant from affiliate URL
  const getMerchant = (affiliateLink: string): string => {
    if (affiliateLink.includes('amazon.com') || affiliateLink.includes('amzn.to')) {
      return 'amazon'
    }
    if (affiliateLink.includes('kitchenaid.com') || affiliateLink.includes('dpbolvw.net') || affiliateLink.includes('jdoqocy.com')) {
      return 'kitchenaid_direct'
    }
    return 'other'
  }

  // Handle affiliate click with tracking
  const handleAffiliateClick = (product: Record<string, unknown>) => {
    const merchant = getMerchant(product.affiliateLink as string)
    const productName = (product.name as string) || 'Unknown Product'
    trackAffiliateClick(merchant, productName, 'comparison_table', 0)
  }

  // Helper to render cell value
  const renderCellValue = (product: Record<string, any>, row: ComparisonRow) => {
    const value = product[row.field]

    // Use format hint if provided
    if (row.format === 'stars' && typeof value === 'number') {
      return '⭐'.repeat(value)
    }

    if (row.format === 'proUse') {
      switch(value) {
        case 'standard': return '✅ Standard'
        case 'some': return '✅ Some'
        case 'limited': return '⚠️ Limited'
        case 'home-only': return '⚠️ Home Only'
        default: return value
      }
    }

    // Special handling for priceTier
    if (row.field === 'priceTier' || row.format === 'priceTier') {
      return getPriceTierLabel(value)
    }

    // Default: just display the value
    return value
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-700 mb-6">
          {subtitle}
        </p>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-2 font-semibold text-slate-900 bg-gray-50 sticky left-0 text-sm" style={{ width: '17%' }}>
                Feature
              </th>
              {products.map((product, index) => (
                <th
                  key={index}
                  className={`px-1 py-2 text-center font-semibold ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : 'bg-white'
                  }`}
                >
                  <div className="text-xs text-slate-700 uppercase mb-1">{product.brand}</div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">{product.name}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Dynamic comparison rows */}
            {comparisonRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                  {row.label}
                </td>
                {products.map((product, productIndex) => (
                  <td
                    key={productIndex}
                    className={`px-1 py-2 text-center text-xs ${
                      product.name === highlightedProduct
                        ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600 font-semibold'
                        : ''
                    }`}
                  >
                    {renderCellValue(product, row)}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA Row */}
            <tr className="bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 sticky left-0 text-xs">
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`p-2 text-center ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={() => handleAffiliateClick(product)}
                    className={`block px-3 py-2 rounded-lg font-semibold text-xs transition-all leading-tight ${
                      product.name === highlightedProduct
                        ? 'bg-gradient-to-r from-orange-700 to-red-700 text-white hover:from-orange-800 hover:to-red-800'
                        : 'bg-white border-2 border-orange-700 text-orange-800 hover:bg-orange-50'
                    }`}
                  >
                    {getButtonText(product.affiliateLink)}
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`border-2 rounded-xl p-4 ${
              product.name === highlightedProduct
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-xs text-slate-700 uppercase mb-1">{product.brand}</div>
              <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
              {product.name === highlightedProduct && (
                <span className="inline-block mt-2 px-3 py-1 bg-orange-900 text-white text-xs font-semibold rounded-full">
                  RECOMMENDED
                </span>
              )}
            </div>

            <div className="space-y-3 mb-4">
              {comparisonRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-slate-700">{row.label}:</span>
                  <span className="text-sm text-slate-900 text-right">
                    {renderCellValue(product, row)}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick(product)}
              className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all ${
                product.name === highlightedProduct
                  ? 'bg-gradient-to-r from-orange-700 to-red-700 text-white hover:from-orange-800 hover:to-red-800'
                  : 'bg-white border-2 border-orange-700 text-orange-800 hover:bg-orange-50'
              }`}
            >
              {getButtonText(product.affiliateLink)}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-slate-700">
        <p className="font-semibold mb-2">Why Trust This Comparison?</p>
        <p>
          {trustMessage || 'This comparison is based on 24 years of professional kitchen experience testing equipment in high-volume restaurant settings. All recommendations are honest assessments - we earn a small commission if you purchase through our links.'}
        </p>
      </div>
    </div>
  )
}
