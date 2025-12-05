'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import StarRating from './StarRating'
import { formatPrice } from '@/utils/formatters'

// Format date consistently without timezone issues (avoids hydration mismatch)
function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[month - 1]} ${day}, ${year}`
}

interface ComparisonTableProps {
  products: Product[]
  title?: string
  ctaText?: string // Customizable CTA text for A/B testing
}

export default function ComparisonTable({ products, title, ctaText = 'Check Price on Amazon' }: ComparisonTableProps) {
  const [expandedSpecs, setExpandedSpecs] = useState(false)
  
  if (products.length === 0) {
    return null
  }
  
  // Find the best value (best rating/price ratio)
  const bestValue = products.reduce((best, product) => {
    if (!product.price || !best.price) return best
    const currentRatio = product.reviews.rating / product.price.current
    const bestRatio = best.reviews.rating / best.price.current
    return currentRatio > bestRatio ? product : best
  })
  
  // Find the highest rated
  const topRated = products.reduce((best, product) => 
    product.reviews.rating > best.reviews.rating ? product : best
  )
  
  // Find the budget pick
  const budgetPick = products.reduce((cheapest, product) => {
    if (!product.price || !cheapest.price) return cheapest
    return product.price.current < cheapest.price.current ? product : cheapest
  })
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {title && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}

      {/* Mobile Card Layout */}
      <div className="md:hidden">
        <div className="divide-y divide-gray-200">
          {products.map((product) => {
            const isBestValue = product.id === bestValue.id
            const isTopRated = product.id === topRated.id
            const isBudgetPick = product.id === budgetPick.id

            return (
              <div key={product.id} className={`p-4 ${isBestValue ? 'bg-green-50' : isTopRated ? 'bg-blue-50' : ''}`}>
                {/* Product Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.images.primary}
                      alt={product.images.alt}
                      fill
                      sizes="80px"
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/reviews/${product.slug}`}
                      className="font-medium text-gray-900 hover:text-brand-600 transition-colors line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">{product.brand}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {isBestValue && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          BEST VALUE
                        </span>
                      )}
                      {isTopRated && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          TOP RATED
                        </span>
                      )}
                      {isBudgetPick && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          BUDGET PICK
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-600 mb-1">Rating</div>
                  <StarRating rating={product.reviews.rating} size="sm" showNumeric />
                  <div className="text-xs text-gray-500 mt-1">
                    {product.reviews.count.toLocaleString()} reviews
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-600 mb-1">Best For</div>
                  <div className="text-sm text-gray-700">
                    {product.bestFor?.[0] || 'General use'}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-600 mb-1">Price</div>
                  {product.price ? (
                    <>
                      <div className="font-semibold text-gray-900">
                        {formatPrice(product.price.current, product.price.currency)}
                      </div>
                      {product.price.original && product.price.original > product.price.current && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price.original, product.price.currency)}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">Price not available</div>
                  )}
                </div>

                {/* Key Features */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-600 mb-1">Key Features</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {product.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2">
                  <a
                    href={product.affiliateLinks[0].url}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 bg-amazon hover:bg-amazon-dark text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {ctaText}
                  </a>
                  <Link
                    href={`/reviews/${product.slug}`}
                    className="inline-flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                  >
                    Read Full Review
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Product</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Rating</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Price*</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Best For</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Key Features</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const isBestValue = product.id === bestValue.id
              const isTopRated = product.id === topRated.id
              const isBudgetPick = product.id === budgetPick.id
              
              return (
                <tr 
                  key={product.id} 
                  className={`
                    ${index !== products.length - 1 ? 'border-b border-gray-100' : ''}
                    ${isBestValue ? 'bg-green-50' : ''}
                    ${isTopRated ? 'bg-blue-50' : ''}
                    hover:bg-gray-50 transition-colors
                  `}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={product.images.primary}
                          alt={product.images.alt}
                          fill
                          sizes="64px"
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <Link 
                          href={`/reviews/${product.slug}`}
                          className="font-medium text-gray-900 hover:text-brand-600 transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                        {isBestValue && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                            BEST VALUE
                          </span>
                        )}
                        {isTopRated && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            TOP RATED
                          </span>
                        )}
                        {isBudgetPick && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                            BUDGET PICK
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <StarRating rating={product.reviews.rating} size="sm" showNumeric />
                    <div className="text-xs text-gray-500 mt-1">
                      {product.reviews.count.toLocaleString()} reviews
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    {product.price ? (
                      <>
                        <div className="font-semibold text-gray-900">
                          {formatPrice(product.price.current, product.price.currency)}
                        </div>
                        {product.price.original && product.price.original > product.price.current && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price.original, product.price.currency)}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          as of {formatDate(product.price.lastUpdated)}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">Price not available</div>
                    )}
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">
                      {product.bestFor?.[0] || 'General use'}
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <ul className="text-sm text-gray-700 space-y-1">
                      {product.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      <a
                        href={product.affiliateLinks[0].url}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-amazon hover:bg-amazon-dark text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                      >
                        {ctaText}
                      </a>
                      <Link
                        href={`/reviews/${product.slug}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                      >
                        Full Review
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Expanded Specifications */}
      {expandedSpecs && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Detailed Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-3">{product.name}</h5>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <dt className="text-gray-600 capitalize">{key.replace(/-/g, ' ')}:</dt>
                      <dd className="font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Toggle Specifications Button */}
      <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
        <button
          onClick={() => setExpandedSpecs(!expandedSpecs)}
          className="text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          {expandedSpecs ? 'Hide' : 'Show'} Detailed Specifications
        </button>
      </div>
      
      {/* Footer Disclaimer */}
      <div className="border-t border-gray-200 px-6 py-3 bg-amber-50">
        <p className="text-xs text-amber-800">
          * Affiliate links - we earn commissions from qualifying purchases at no extra cost to you.
          Prices may vary.
          <Link href="/disclosure" className="underline ml-1">Full disclosure</Link>
        </p>
      </div>
    </div>
  )
}