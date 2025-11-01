import { Product } from '@/types/product'
import ProductCard from './ProductCard'
import { getEditorialMetadataWithDefaults } from '@/lib/editorial-metadata'

interface ProductGridProps {
  products: Product[]
  featured?: boolean
  columns?: 2 | 3 | 4
  className?: string
  listName?: string
  ctaPrefix?: string
}

export default function ProductGrid({
  products,
  featured = false,
  columns = 3,
  className = '',
  listName = 'product_grid',
  ctaPrefix = 'product-grid'
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found matching your criteria.</p>
      </div>
    )
  }

  const gridColumns = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridColumns[columns]} gap-6 ${className}`}>
      {products.map((product, index) => {
        const editorial = getEditorialMetadataWithDefaults(product.slug)
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            category={product.category}
            tier={editorial.tier}
            testingPeriod={editorial.testingPeriod}
            rating={product.expertRating || 4.5}
            hook={editorial.hook}
            position={index + 1}
            listName={listName}
            featured={featured && index < 3}
            ctaPrefix={ctaPrefix}
          />
        )
      })}
    </div>
  )
}