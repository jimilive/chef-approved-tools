'use client'

import { trackAffiliateClick } from '@/lib/analytics'

interface AffiliateLink {
  retailer: string
  url: string
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
  const handleAffiliateClick = (retailer: string) => {
    trackAffiliateClick(productData.name, productData.category, 0, productData.brand)
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productData.affiliateLinks.map((link, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-slate-900">{link.retailer}</h3>
              <span className="text-sm font-medium text-green-600">Check Current Price</span>
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick(link.retailer)}
              className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            >
              View Current Price & Deals →
            </a>
            {index === 0 && (
              <p className="text-xs text-gray-600 mt-2 text-center">⚡ Often has the best deals + free shipping</p>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-600 mt-4 text-center">
        💡 <strong>Pro Tip:</strong> Compare individual knife prices - sometimes buying the set saves hundreds.
      </p>
    </div>
  )
}