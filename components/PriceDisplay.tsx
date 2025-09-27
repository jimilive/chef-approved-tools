'use client'

import { useState } from 'react'
import { TrendingDown, TrendingUp, DollarSign, ExternalLink, Bell } from 'lucide-react'

interface PriceRange {
  min: number
  max: number
  currency: string
}

interface PriceDisplayProps {
  productName: string
  priceRange: PriceRange
  dealStatus?: 'sale' | 'normal' | 'high' | 'trending'
  dealText?: string
  affiliateLinks: {
    retailer: string
    url: string
    price?: number
    originalPrice?: number
  }[]
  lastUpdated?: string
}

export default function PriceDisplay({
  productName,
  priceRange,
  dealStatus = 'normal',
  dealText,
  affiliateLinks,
  lastUpdated
}: PriceDisplayProps) {
  const [showPriceAlert, setShowPriceAlert] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: priceRange.currency
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
        <h4 className="text-sm font-semibold text-gray-700">Check Current Prices:</h4>
        <div className="grid gap-2">
          {affiliateLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">{link.retailer}</span>
                {link.originalPrice && link.price && link.price < link.originalPrice && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs line-through text-gray-500">
                      {formatPrice(link.originalPrice)}
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      {formatPrice(link.price)}
                    </span>
                  </div>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
            </a>
          ))}
        </div>
      </div>

      {/* Price Alert Signup */}
      <div className="border-t pt-4">
        {!showPriceAlert ? (
          <button
            onClick={() => setShowPriceAlert(true)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Bell className="w-4 h-4" />
            Get price drop alerts for this item
          </button>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Price Drop Alerts</span>
            </div>
            <p className="text-xs text-blue-700 mb-3">
              Get notified when {productName} drops below {formatPrice(priceRange.min)}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                Alert Me
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}