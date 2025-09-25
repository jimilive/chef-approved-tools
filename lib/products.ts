import { Product, ProductCollection, SearchFilters } from '@/types/product'
import { sampleProducts } from '@/data/products'
import { filterProducts, sortProducts } from '@/utils/formatters'

// Simulate API delay for realistic loading states
const simulateDelay = (ms: number = 100) => 
  new Promise(resolve => setTimeout(resolve, ms))

// Get all products
export async function getProducts(): Promise<Product[]> {
  await simulateDelay()
  
  const allProducts: Product[] = [
    ...sampleProducts.knives,
    ...sampleProducts.cookware,
    ...sampleProducts.appliances,
    ...sampleProducts.tools,
    ...sampleProducts.baking,
    ...sampleProducts.storage
  ]
  
  return allProducts
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  await simulateDelay()
  
  const categoryProducts = sampleProducts[category as keyof ProductCollection]
  return categoryProducts || []
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await simulateDelay()
  
  const allProducts = await getProducts()
  return allProducts.find(p => p.slug === slug) || null
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  await simulateDelay()
  
  const allProducts = await getProducts()
  return allProducts.filter(p => p.featured)
}

// Search products
export async function searchProducts(
  query: string,
  filters?: SearchFilters
): Promise<Product[]> {
  await simulateDelay()
  
  let products = await getProducts()
  
  // Text search
  if (query) {
    const searchQuery = query.toLowerCase()
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.brand.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    )
  }
  
  // Apply filters
  if (filters) {
    products = filterProducts(products, filters)
  }
  
  // Apply sorting
  if (filters?.sortBy) {
    products = sortProducts(products, filters.sortBy)
  }
  
  return products
}

// Get related products
export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<Product[]> {
  await simulateDelay()
  
  const allProducts = await getProducts()
  const currentProduct = allProducts.find(p => p.id === productId)
  
  if (!currentProduct) return []
  
  // Find products in same category or with similar tags
  const related = allProducts
    .filter(p => 
      p.id !== productId && (
        p.category === currentProduct.category ||
        p.tags.some(tag => currentProduct.tags.includes(tag))
      )
    )
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1
      if (b.category === currentProduct.category && a.category !== currentProduct.category) return 1
      
      // Then sort by number of matching tags
      const aTagMatches = a.tags.filter(tag => currentProduct.tags.includes(tag)).length
      const bTagMatches = b.tags.filter(tag => currentProduct.tags.includes(tag)).length
      return bTagMatches - aTagMatches
    })
    .slice(0, limit)
  
  return related
}

// Get products for comparison
export async function getComparisonProducts(ids: string[]): Promise<Product[]> {
  await simulateDelay()
  
  const allProducts = await getProducts()
  return allProducts.filter(p => ids.includes(p.id))
}

// Update product prices (simulated - in production would call API)
export async function updateProductPrices(): Promise<void> {
  // In production, this would:
  // 1. Call Amazon Product Advertising API
  // 2. Update database with new prices
  // 3. Set lastUpdated timestamp
  console.log('Updating product prices...')
  await simulateDelay(1000)
}

// Get product price history (simulated)
export async function getProductPriceHistory(productId: string): Promise<any[]> {
  await simulateDelay()
  
  // In production, this would fetch from database
  const mockHistory = [
    { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), price: 189.99 },
    { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), price: 179.99 },
    { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), price: 169.99 },
    { date: new Date(), price: 169.95 },
  ]
  
  return mockHistory
}

// Check product availability (simulated)
export async function checkProductAvailability(productId: string): Promise<boolean> {
  await simulateDelay()
  
  // In production, this would check real-time availability
  return Math.random() > 0.1 // 90% chance of being in stock
}