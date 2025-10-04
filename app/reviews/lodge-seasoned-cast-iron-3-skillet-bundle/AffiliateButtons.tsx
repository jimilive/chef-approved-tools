'use client'

import { trackAffiliateClick } from '@/lib/analytics'

interface AffiliateLink {
  retailer: string
  url: string
  price: number
}

interface ProductData {
  name: string
  category: string
  brand: string
  affiliateLinks: AffiliateLink[]
}

interface AffiliateButtonsProps {
  productData: ProductData
}

export default function AffiliateButtons({ productData }: AffiliateButtonsProps) {
  const handleAffiliateClick = (retailer: string, price: number) => {
    trackAffiliateClick(productData.name, productData.category, price, productData.brand)
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productData.affiliateLinks.map((link, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-slate-900">{link.retailer}</h3>
              <span className="text-2xl font-bold text-orange-700">${link.price}</span>
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick(link.retailer, link.price)}
              className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            >
              Get Best Deal Now →
            </a>
            {index === 0 && (
              <p className="text-xs text-gray-600 mt-2 text-center">Made in USA • Best price</p>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-600 mt-4 text-center">
        💡 <strong>Pro Tip:</strong> Factor in shipping costs - cast iron is heavy and shipping can add $15-25.
      </p>
    </div>
  )
}