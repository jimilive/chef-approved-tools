'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'

interface RecentProduct {
  slug: string
  name: string
  image: string
  price?: number
  viewedAt: number
}

const STORAGE_KEY = 'chef-approved-recently-viewed'
const MAX_RECENT_ITEMS = 6

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
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-orange-600" />
          <h2 className="text-2xl font-bold text-slate-900">
            Recently Viewed Products
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/reviews/${product.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-1">
                  {product.name}
                </h3>
                {product.price && (
                  <p className="text-sm text-orange-600 font-semibold">
                    ${product.price}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY)
              setRecentProducts([])
            }}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear history
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
  image: string
  price?: number
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