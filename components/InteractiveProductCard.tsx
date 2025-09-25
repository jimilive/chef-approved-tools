'use client'
import { useState } from 'react'
import Link from 'next/link'
import { trackAffiliateClick, trackProductView } from '@/lib/analytics'

interface Product {
  id: string | number
  name: string
  brand: string
  affiliateUrl: string
  slug: string
}

interface InteractiveProductCardProps {
  product: Product
  category?: string
}

export default function InteractiveProductCard({
  product,
  category = 'product'
}: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAffiliateClick = () => {
    trackAffiliateClick(product.name, category, 0, product.brand)
  }

  const handleReviewClick = () => {
    trackProductView(product.name, category)
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
        isHovered ? 'shadow-lg -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with title and badge */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight flex-1 pr-2">
          {product.name}
        </h3>
        <div className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
          CHEF TESTED
        </div>
      </div>

      {/* Brand */}
      <p className="text-slate-600 mb-3 text-sm">
        by {product.brand}
      </p>
      
      {/* Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-base">★★★★★</span>
          <span className="text-slate-600 text-sm ml-1">9.8/10</span>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <p className="text-slate-700 text-sm leading-relaxed">
          Professional blade tested over 6+ months in commercial kitchen settings.{' '}
          <Link
            href={`/reviews/${product.slug}`}
            className="text-orange-700 hover:text-orange-700 font-medium"
          >
            Read full review →
          </Link>
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener"
          onClick={handleAffiliateClick}
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg text-center text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          🛒 Check Price
        </a>
        <Link
          href={`/reviews/${product.slug}`}
          onClick={handleReviewClick}
          className="flex-1 border-2 border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white font-semibold py-3 px-4 rounded-lg text-center text-sm transition-all duration-200 active:scale-95"
        >
          Review
        </Link>
      </div>
      
      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        <span className="text-orange-700 font-medium">Paid link</span>
      </p>
    </div>
  )
}