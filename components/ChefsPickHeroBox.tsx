import Image from 'next/image'
import Link from 'next/link'
import { trackAffiliateClick } from '@/lib/analytics'

interface ChefsPickProps {
  product: {
    name: string
    slug: string
    image: string
    rating: number
    price?: string
    amazonUrl: string
    whyPicked: string
    pros: string[]
    brand: string
  }
  category: string
}

export default function ChefsPickHeroBox({ product, category }: ChefsPickProps) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-xl">
      {/* Badge */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full font-bold text-sm sm:text-base shadow-lg">
          🏆 CHEF'S TOP PICK
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
        {/* Product Image */}
        <div className="relative aspect-square bg-white rounded-xl p-6 shadow-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-500 text-lg">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-slate-700 font-semibold">{product.rating}/5</span>
          </div>

          {/* Why I Picked This */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-orange-200">
            <p className="text-sm font-semibold text-orange-800 mb-2">Why I Picked This:</p>
            <p className="text-slate-700 leading-relaxed">{product.whyPicked}</p>
          </div>

          {/* Quick Pros */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-800 mb-2">Key Advantages:</p>
            <ul className="space-y-2">
              {product.pros.slice(0, 3).map((pro, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackAffiliateClick(product.name, category, 0, product.brand)}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-center active:scale-95"
            >
              🛒 Check Price on Amazon
            </a>
            <Link
              href={`/reviews/${product.slug}`}
              className="flex-1 border-2 border-orange-600 text-orange-700 hover:bg-orange-50 font-semibold py-4 px-6 rounded-xl transition-all duration-200 text-center"
            >
              Read Full Review →
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              ✓ <span>Free Prime Shipping</span>
            </span>
            <span className="flex items-center gap-1">
              ✓ <span>30-Day Returns</span>
            </span>
            {product.price && (
              <span className="flex items-center gap-1">
                💰 <span>{product.price}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
