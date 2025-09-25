'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import StarRating from './StarRating'

interface ProductCardProps {
  product: Product
  showReviewLink?: boolean
  featured?: boolean
  compact?: boolean
}

export default function ProductCard({
  product,
  showReviewLink = true,
  featured = false,
  compact = false,
}: ProductCardProps) {
  const primaryLink = product.affiliateLinks[0]
    
  return (
    <article className={`
      bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200
      ${featured ? 'border-brand-500 ring-2 ring-brand-100' : 'border-gray-200'}
      ${compact ? 'p-4' : 'p-6'}
      relative overflow-hidden group
    `}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          EDITOR&rsquo;S CHOICE
        </div>
      )}
      

      {/* Popular Choice Badge */}
      {!compact && (
        <div className="absolute bottom-4 left-4 bg-red-100 text-red-800 px-2 py-1 rounded text-xs z-10">
          🔥 Popular Choice
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.images.primary}
          alt={product.images.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Product Info */}
      <div className="space-y-3">
        {/* Title & Brand */}
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>
        
        {/* Rating */}
        <StarRating 
          rating={product.reviews.rating} 
          reviewCount={product.reviews.count}
          size={compact ? 'xs' : 'sm'}
        />
        
        
        {/* Quick Pros (if not compact) */}
        {!compact && product.pros.length > 0 && (
          <div className="space-y-1">
            {product.pros.slice(0, 3).map((pro, index) => (
              <div key={index} className="flex items-start gap-1">
                <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">{pro}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Stock Status */}
        <div className="flex items-center gap-2">
          {product.inStock ? (
            <>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-green-700">In Stock</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-sm text-red-700">Out of Stock</span>
            </>
          )}
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="space-y-2 pt-2">
          <a
            href={primaryLink.url}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-center block"
            aria-label={`View ${product.name} on Amazon (opens in new tab)`}
          >
            🛒 Check Latest Price on Amazon
          </a>

          <div className="flex gap-2">
            {showReviewLink && (
              <Link
                href={`/reviews/${product.slug}`}
                className="flex-1 text-blue-600 hover:text-blue-700 font-medium text-sm py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                📊 See Why I Chose This Over 12 Others
              </Link>
            )}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              ✓ <span>Free Prime Shipping</span>
            </span>
            <span className="flex items-center gap-1">
              ✓ <span>30-Day Returns</span>
            </span>
          </div>
        </div>

      </div>
    </article>
  )
}