'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock } from 'lucide-react'

interface RecentProduct {
  slug: string
  name: string
  tier: 1 | 2 | 3
  testingPeriod: string
  rating: number
  hook: string
  category: string
  viewedAt: number
}

const STORAGE_KEY = 'chef-approved-recently-viewed'
const MAX_RECENT_ITEMS = 6

// Tier Badge Components
const Tier1Badge = () => (
  <div className="inline-flex items-center gap-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-md font-bold text-sm shadow-md shadow-yellow-400/30 mb-3">
    <span className="text-lg">🛡️</span>
    <span>TIER 1: Professional Kitchen Tested</span>
  </div>
);

const Tier2Badge: React.FC<{ testingPeriod: string }> = ({ testingPeriod }) => (
  <div className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm shadow-md shadow-blue-500/30 mb-3">
    <span className="text-lg">🏠</span>
    <span>TIER 2: Home Tested ({testingPeriod})</span>
  </div>
);

/**
 * Recently Viewed Products Component
 * Increases conversions by showing products the user has already shown interest in
 * Uses localStorage for client-side tracking (no backend needed)
 */
export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as RecentProduct[]
        // Sort by most recent first
        const sorted = parsed.sort((a, b) => b.viewedAt - a.viewedAt)
        setRecentProducts(sorted.slice(0, MAX_RECENT_ITEMS))
      } catch (error) {
        console.error('Failed to parse recently viewed:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Don't render on server (causes hydration mismatch)
  if (!isLoaded || recentProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-20 mb-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center gap-3 mb-8">
        <Clock className="w-6 h-6 text-orange-700" />
        <h2 className="text-3xl font-bold m-0 text-gray-900">
          Recently Viewed Products
        </h2>
      </div>

      <p className="text-base text-gray-600 mb-8 leading-relaxed">
        Pick up where you left off. These are the products you&apos;ve been researching.
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
        {recentProducts.map((product) => (
          <div
            key={product.slug}
            className="bg-white border border-gray-300 rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-xl"
          >
            {/* Tier Badge */}
            {product.tier === 1 ? (
              <Tier1Badge />
            ) : (
              <Tier2Badge testingPeriod={product.testingPeriod} />
            )}

            {/* Category Tag */}
            <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">
              {product.category}
            </div>

            {/* Product Name */}
            <h3 className="text-lg font-bold m-0 mb-3 leading-snug text-gray-900">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="text-yellow-400 text-lg">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '½'}
                {'☆'.repeat(5 - Math.ceil(product.rating))}
              </div>
              <span className="text-sm font-bold text-gray-800">
                {product.rating}/5
              </span>
            </div>

            {/* Testing Period */}
            <div className="bg-gray-100 px-3 py-2 rounded text-xs text-gray-700 mb-3 italic">
              📊 Tested: {product.testingPeriod}
            </div>

            {/* Hook */}
            <p className="text-[15px] leading-relaxed text-gray-700 m-0 mb-5 flex-1">
              {product.hook}
            </p>

            {/* CTA Button */}
            <Link
              href={`/reviews/${product.slug}`}
              className="block bg-green-600 text-white px-6 py-3 text-center rounded-md no-underline font-bold text-[15px] transition-colors hover:bg-green-700"
            >
              Read Full Review →
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY)
              setRecentProducts([])
            }}
            className="bg-transparent border-none text-gray-600 underline text-sm cursor-pointer px-4 py-2 hover:text-gray-900"
          >
            Clear viewing history
          </button>
        </div>
      </div>
    </section>
  )
}

/**
 * Hook to track product views
 * Call this from your product/review pages
 */
export function useTrackProductView(product: {
  slug: string
  name: string
  tier: 1 | 2 | 3
  testingPeriod: string
  rating: number
  hook: string
  category: string
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const existing = stored ? JSON.parse(stored) : []

      // Remove existing entry for this product (to update timestamp)
      const filtered = existing.filter(
        (item: RecentProduct) => item.slug !== product.slug
      )

      // Add to front of array
      const updated = [
        {
          ...product,
          viewedAt: Date.now()
        },
        ...filtered
      ].slice(0, MAX_RECENT_ITEMS) // Keep only most recent

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to track product view:', error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug])
}