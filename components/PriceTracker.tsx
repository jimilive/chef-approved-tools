'use client'

import { Clock, TrendingUp, TrendingDown } from 'lucide-react'

interface PriceTrackerProps {
  currentPrice: number
  originalPrice?: number
  lastChecked?: Date | string
  priceHistory?: {
    price: number
    date: Date | string
  }[]
  size?: 'sm' | 'md' | 'lg'
}

export default function PriceTracker({
  currentPrice,
  originalPrice,
  lastChecked,
  priceHistory = [],
  size = 'md'
}: PriceTrackerProps) {
  const lastCheckedDate = lastChecked ? new Date(lastChecked) : new Date()
  const hoursAgo = Math.floor((Date.now() - lastCheckedDate.getTime()) / (1000 * 60 * 60))

  // Calculate price trend if we have history
  const getPriceTrend = () => {
    if (priceHistory.length < 2) return null

    const latest = priceHistory[priceHistory.length - 1].price
    const previous = priceHistory[priceHistory.length - 2].price

    if (latest < previous) return 'down'
    if (latest > previous) return 'up'
    return 'stable'
  }

  const trend = getPriceTrend()
  const savings = originalPrice ? originalPrice - currentPrice : 0

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const formatTimeAgo = (hours: number) => {
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      {/* Price Display */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-slate-900 ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'}`}>
            ${currentPrice.toFixed(2)}
          </span>

          {originalPrice && (
            <span className={`text-gray-500 line-through ${sizeClasses[size]}`}>
              ${originalPrice.toFixed(2)}
            </span>
          )}

          {trend && (
            <div className={`flex items-center gap-1 ${trend === 'down' ? 'text-green-600' : trend === 'up' ? 'text-red-600' : 'text-gray-600'}`}>
              {trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            </div>
          )}
        </div>

        {savings > 0 && (
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
            Save ${savings.toFixed(2)}
          </div>
        )}
      </div>

      {/* Last Checked Indicator */}
      <div className="flex items-center gap-1 text-gray-600">
        <Clock className="w-3 h-3" />
        <span className={sizeClasses[size]}>
          Price checked {formatTimeAgo(hoursAgo)}
        </span>

        {hoursAgo < 6 && (
          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-medium ml-2">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            Fresh
          </span>
        )}
      </div>

      {/* Price Trend Indicator */}
      {trend && (
        <div className={`mt-1 text-xs ${trend === 'down' ? 'text-green-600' : trend === 'up' ? 'text-red-600' : 'text-gray-600'}`}>
          {trend === 'down' && '↓ Price dropped recently'}
          {trend === 'up' && '↑ Price increased recently'}
          {trend === 'stable' && '→ Price stable'}
        </div>
      )}
    </div>
  )
}

// Enhanced version with urgency messaging
export function PriceTrackerWithUrgency({
  currentPrice,
  originalPrice,
  lastChecked,
  priceHistory = [],
  size = 'md',
  showUrgency = true
}: PriceTrackerProps & { showUrgency?: boolean }) {
  const lastCheckedDate = lastChecked ? new Date(lastChecked) : new Date()
  const hoursAgo = Math.floor((Date.now() - lastCheckedDate.getTime()) / (1000 * 60 * 60))

  const getUrgencyMessage = () => {
    if (!showUrgency) return null

    const savings = originalPrice ? originalPrice - currentPrice : 0

    if (savings > 50) {
      return {
        message: 'Significant discount - may not last long',
        color: 'text-red-600 bg-red-50 border-red-200'
      }
    }

    if (hoursAgo < 2) {
      return {
        message: 'Price just verified - accurate as of now',
        color: 'text-green-600 bg-green-50 border-green-200'
      }
    }

    return null
  }

  const urgency = getUrgencyMessage()

  return (
    <div className="space-y-2">
      <PriceTracker
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        lastChecked={lastChecked}
        priceHistory={priceHistory}
        size={size}
      />

      {urgency && (
        <div className={`border rounded-lg p-2 text-xs font-medium ${urgency.color}`}>
          ⏰ {urgency.message}
        </div>
      )}
    </div>
  )
}