'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { searchProducts } from '@/lib/products'
import { Product } from '@/types/product'
import { formatPrice } from '@/utils/formatters'
import { trackSearch } from '@/lib/tracking'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  
  // Handle click outside to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 1) {
        setIsLoading(true)
        const searchResults = await searchProducts(query)
        setResults(searchResults.slice(0, 5))
        setIsLoading(false)
        setShowResults(true)

        // Track search query
        trackSearch(query, searchResults.length)
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowResults(false)
      setQuery('')
    }
  }
  
  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for knives, cookware, appliances..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            aria-label="Search products"
            aria-autocomplete="list"
            aria-controls="search-results"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </form>
      
      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div
          id="search-results"
          className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="max-h-96 overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/reviews/${product.slug}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setShowResults(false)
                  setQuery('')
                }}
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={product.images.primary}
                    alt={product.images.alt}
                    fill
                    sizes="64px"
                    className="object-contain rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">{product.brand}</p>
                  <p className="text-sm font-bold text-brand-600 mt-1">
                    {product.price ? formatPrice(product.price.current, product.price.currency) : 'Price unavailable'}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs text-gray-500">
                    ★ {product.reviews.rating.toFixed(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="w-full text-center text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          </div>
        </div>
      )}
      
      {/* No Results */}
      {showResults && query.length > 1 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 text-center">
            No products found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  )
}