import { Product } from '@/types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  featured?: boolean
  columns?: 2 | 3 | 4
  className?: string
}

export default function ProductGrid({ 
  products, 
  featured = false,
  columns = 3,
  className = ''
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
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          featured={featured && index < 3}
        />
      ))}
    </div>
  )
}