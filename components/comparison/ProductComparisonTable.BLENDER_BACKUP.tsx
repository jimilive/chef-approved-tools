'use client'

interface ComparisonProduct {
  name: string
  brand: string
  affiliateLink: string
  motorPower: string
  capacity: string
  performance: number // 1-5 stars
  durability: string
  warranty: string
  proUse: 'standard' | 'some' | 'limited' | 'home-only'
  controls: string
  height: string
  madeIn: string
  bestFor: string
  priceTier: 'luxury' | 'premium' | 'mid-range' | 'budget'
}

interface ProductComparisonTableProps {
  products: ComparisonProduct[]
  highlightedProduct: string // Product name to highlight
}

export default function ProductComparisonTable({
  products,
  highlightedProduct
}: ProductComparisonTableProps) {

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating)
  }

  const renderProUseIcon = (status: string) => {
    switch(status) {
      case 'standard': return '✅ Standard'
      case 'some': return '✅ Some'
      case 'limited': return '⚠️ Limited'
      case 'home-only': return '⚠️ Home Only'
      default: return status
    }
  }

  const getPriceTierLabel = (tier: string) => {
    switch(tier) {
      case 'luxury': return 'Luxury'
      case 'premium': return 'Premium'
      case 'mid-range': return 'Mid-Range'
      case 'budget': return 'Budget'
      default: return tier
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">
        Compare Professional Blenders
      </h2>

      <p className="text-slate-600 mb-6">
        See how the Vitamix 5200 stacks up against top competitors
      </p>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-2 font-semibold text-slate-900 bg-gray-50 sticky left-0 w-24 text-sm">
                Feature
              </th>
              {products.map((product, index) => (
                <th
                  key={index}
                  className={`px-1 py-2 text-center font-semibold w-1/5 ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : 'bg-white'
                  }`}
                  style={{ width: '20%' }}
                >
                  <div className="text-xs text-slate-500 uppercase mb-1">{product.brand}</div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">{product.name}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Motor Power */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Motor Power
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600 font-semibold'
                      : ''
                  }`}
                >
                  {product.motorPower}
                </td>
              ))}
            </tr>

            {/* Capacity */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Container Size
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600 font-semibold'
                      : ''
                  }`}
                >
                  {product.capacity}
                </td>
              ))}
            </tr>

            {/* Performance */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Performance
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`p-2 text-center ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  <div className="text-lg">
                    {renderStars(product.performance)}
                  </div>
                </td>
              ))}
            </tr>

            {/* Durability */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Expected Lifespan
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600 font-semibold'
                      : ''
                  }`}
                >
                  {product.durability}
                </td>
              ))}
            </tr>

            {/* Warranty */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Warranty
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600 font-semibold'
                      : ''
                  }`}
                >
                  {product.warranty}
                </td>
              ))}
            </tr>

            {/* Professional Use */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Pro Kitchen Use
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  {renderProUseIcon(product.proUse)}
                </td>
              ))}
            </tr>

            {/* Controls */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Controls
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  {product.controls}
                </td>
              ))}
            </tr>

            {/* Height */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Height
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  {product.height}
                </td>
              ))}
            </tr>

            {/* Made In */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Made In
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  {product.madeIn}
                </td>
              ))}
            </tr>

            {/* Best For */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Best For
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  {product.bestFor}
                </td>
              ))}
            </tr>

            {/* Price Tier */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 bg-gray-50 sticky left-0 text-xs">
                Price Tier
              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`px-1 py-2 text-center text-xs ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  {getPriceTierLabel(product.priceTier)}
                </td>
              ))}
            </tr>

            {/* CTA Row */}
            <tr className="bg-gray-50">
              <td className="p-2 font-semibold text-slate-700 sticky left-0 text-xs">

              </td>
              {products.map((product, index) => (
                <td
                  key={index}
                  className={`p-2 text-center ${
                    product.name === highlightedProduct
                      ? 'bg-orange-50 border-l-2 border-r-2 border-orange-600'
                      : ''
                  }`}
                >
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                      product.name === highlightedProduct
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700'
                        : 'bg-white border-2 border-orange-600 text-orange-700 hover:bg-orange-50'
                    }`}
                  >
                    View on Amazon
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`border-2 rounded-xl p-4 ${
              product.name === highlightedProduct
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-xs text-slate-500 uppercase mb-1">{product.brand}</div>
              <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
              {product.name === highlightedProduct && (
                <span className="inline-block mt-2 px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                  RECOMMENDED
                </span>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-slate-700">Motor Power:</span>
                <span className="text-sm text-slate-900">{product.motorPower}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-slate-700">Capacity:</span>
                <span className="text-sm text-slate-900">{product.capacity}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-slate-700">Performance:</span>
                <span className="text-lg">{renderStars(product.performance)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-slate-700">Lifespan:</span>
                <span className="text-sm text-slate-900">{product.durability}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-slate-700">Warranty:</span>
                <span className="text-sm text-slate-900">{product.warranty}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-slate-700">Pro Use:</span>
                <span className="text-sm">{renderProUseIcon(product.proUse)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-slate-700">Best For:</span>
                <span className="text-sm text-slate-900 text-right">{product.bestFor}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-slate-700">Price Tier:</span>
                <span className="text-sm text-slate-900">{getPriceTierLabel(product.priceTier)}</span>
              </div>
            </div>

            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all ${
                product.name === highlightedProduct
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700'
                  : 'bg-white border-2 border-orange-600 text-orange-700 hover:bg-orange-50'
              }`}
            >
              View on Amazon
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-slate-700">
        <p className="font-semibold mb-2">Why Trust This Comparison?</p>
        <p>
          This comparison is based on 24 years of professional kitchen experience testing blenders in high-volume restaurant settings.
          All recommendations are honest assessments - we earn a small commission if you purchase through our links.
        </p>
      </div>
    </div>
  )
}
