import Link from 'next/link'

interface RelatedProduct {
  name: string
  description: string
  emoji: string
  href: string
}

interface RelatedProductsGridProps {
  title: string
  products: RelatedProduct[]
}

export default function RelatedProductsGrid({
  title,
  products
}: RelatedProductsGridProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product, index) => (
          <Link key={index} href={product.href} className="group no-underline">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[40px] mb-3 rounded-lg">
                {product.emoji}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 mb-3 flex-1">
                  {product.description}
                </p>
                <div className="text-orange-700 font-semibold text-sm">
                  Read Review →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
