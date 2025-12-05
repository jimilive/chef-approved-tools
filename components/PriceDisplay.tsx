'use client'

import { TrendingDown, TrendingUp, DollarSign, ExternalLink } from 'lucide-react'
import { Vendor } from '@/types/product'

interface PriceRange {
  min: number
  max: number
  currency: string
}

interface PriceDisplayProps {
  productName: string
  priceRange?: PriceRange
  dealStatus?: 'sale' | 'normal' | 'high' | 'trending'
  dealText?: string
  affiliateLinks?: {
    retailer: string
    url: string
    price?: number
    originalPrice?: number
  }[]
  vendors?: Vendor[] // New multi-vendor support
  lastUpdated?: string
  ctaText?: string // Customizable CTA text for A/B testing
}

export default function PriceDisplay({
  productName,
  priceRange,
  dealStatus = 'normal',
  dealText,
  affiliateLinks,
  vendors,
  lastUpdated,
  ctaText = 'Check Current Price' // Default CTA text
}: PriceDisplayProps) {
  // Use vendors if provided, otherwise fall back to affiliateLinks
  const displayVendors: Vendor[] = vendors || (affiliateLinks?.map(link => ({
    name: link.retailer,
    url: link.url,
    price: link.price,
    originalPrice: link.originalPrice,
    merchant: 'other' as const,
    lastChecked: new Date().toISOString()
  })) || [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: priceRange?.currency || 'USD'
    }).format(price)
  }

  const getDealBadge = () => {
    switch (dealStatus) {
      case 'sale':
        return (
          <div className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
            <TrendingDown className="w-3 h-3" />
            On Sale
          </div>
        )
      case 'trending':
        return (
          <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )
      case 'high':
        return (
          <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
            Higher than usual
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
      {/* Price Range Header */}
      {priceRange && (
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
              </span>
              {getDealBadge()}
            </div>
            {dealText && (
              <p className="text-sm text-green-700 font-medium">{dealText}</p>
            )}
            <p className="text-xs text-gray-500">
              Price range across retailers • {lastUpdated || 'Updated weekly'}
            </p>
          </div>
        </div>
      )}

      {/* Deal Alert */}
      {dealStatus === 'sale' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <TrendingDown className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Price Drop Alert!</p>
              <p className="text-xs text-red-700">
                {productName} is currently below average price. Great time to buy!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Retailer Links */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Compare Prices Across Retailers:</h3>
        <div className="grid gap-2">
          {displayVendors.map((vendor, index) => {
            const hasSavings = vendor.originalPrice && vendor.price && vendor.price < vendor.originalPrice
            const savingsPercent = hasSavings
              ? Math.round(((vendor.originalPrice! - vendor.price!) / vendor.originalPrice!) * 100)
              : 0

            return (
              <a
                key={index}
                href={vendor.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-medium text-gray-900 min-w-[120px]">{vendor.name}</span>
                  {vendor.price ? (
                    <div className="flex items-center gap-2 flex-1">
                      {hasSavings && (
                        <span className="text-xs line-through text-gray-500">
                          {formatPrice(vendor.originalPrice!)}
                        </span>
                      )}
                      <span className={`text-sm font-semibold ${hasSavings ? 'text-green-600' : 'text-gray-900'}`}>
                        {formatPrice(vendor.price)}
                      </span>
                      {hasSavings && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                          Save {savingsPercent}%
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-600">{ctaText}</span>
                  )}
                  {vendor.inStock === false && (
                    <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-700 flex-shrink-0" />
              </a>
            )
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Comparing prices helps you find the best deal and supports our site at no extra cost
        </p>
      </div>
    </div>
  )
}