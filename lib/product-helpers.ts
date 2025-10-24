import { Product } from '@/types/product'
import { getSupabase } from '@/lib/supabase'

/**
 * Map Supabase database row to Product type
 */
function mapDatabaseToProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    brand: dbProduct.brand || '',
    model: dbProduct.model,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory,
    inStock: dbProduct.in_stock ?? true,
    availability: dbProduct.availability,
    affiliateLinks: dbProduct.affiliate_links || [],
    vendors: dbProduct.vendors || [],
    primaryAffiliate: dbProduct.primary_affiliate || 'amazon',
    reviews: dbProduct.reviews || { rating: 0, count: 0, verified: false, source: '', lastUpdated: '' },
    expertRating: dbProduct.expert_rating,
    pros: dbProduct.pros || [],
    cons: dbProduct.cons || [],
    description: dbProduct.description || '',
    expertOpinion: dbProduct.expert_opinion || '',
    usageScenarios: dbProduct.usage_scenarios || [],
    alternatives: dbProduct.alternatives || [],
    images: dbProduct.images || { primary: '', alt: '' },
    videos: [],
    tags: [],
    specifications: {},
    featured: false,
    bestFor: [],
    dateAdded: dbProduct.created_at,
    lastUpdated: dbProduct.updated_at,
    updateFrequency: 'monthly' as const
  }
}

/**
 * Get a product by its slug from Supabase
 * @param slug - The product slug (e.g., 'victorinox-fibrox-8-inch-chefs-knife')
 * @returns The product object or null if not found
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    console.error('Error fetching product:', error)
    return null
  }

  return mapDatabaseToProduct(data)
}

/**
 * Get multiple products by their slugs
 * @param slugs - Array of product slugs
 * @returns Array of products (excludes any not found)
 */
export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .in('slug', slugs)

  if (error || !data) {
    console.error('Error fetching products:', error)
    return []
  }

  return data.map(mapDatabaseToProduct)
}

/**
 * Get the primary affiliate link for a product
 * @param product - The product object
 * @returns The primary affiliate URL
 */
export function getPrimaryAffiliateLink(product: Product): string {
  // Return the first affiliate link that matches the primary affiliate
  const primaryLink = product.affiliateLinks.find(
    link => link.merchant === product.primaryAffiliate
  )

  // Fallback to first available link if primary not found
  return primaryLink?.url || product.affiliateLinks[0]?.url || '#'
}

/**
 * Get all products in a specific category
 * @param category - Category name (e.g., 'knives', 'cookware')
 * @returns Array of products in that category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .eq('category', category)

  if (error || !data) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data.map(mapDatabaseToProduct)
}

/**
 * Get related products based on category, excluding the current product
 * @param currentProductSlug - Slug of current product to exclude
 * @param category - Category to search in
 * @param limit - Maximum number of products to return (default: 3)
 * @returns Array of related products
 */
export async function getRelatedProducts(
  currentProductSlug: string,
  category: string,
  limit: number = 3
): Promise<Product[]> {
  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('slug', currentProductSlug)
    .limit(limit)

  if (error || !data) {
    console.error('Error fetching related products:', error)
    return []
  }

  return data.map(mapDatabaseToProduct)
}

/**
 * Get the vendor with the best price for a product
 * @param product - The product object
 * @returns The vendor with the lowest price, or undefined if no vendors
 */
export function getBestPriceVendor(product: Product) {
  if (!product.vendors || product.vendors.length === 0) {
    return undefined
  }

  return product.vendors.reduce((best, current) => {
    if (!current.price) return best
    if (!best.price) return current
    return current.price < best.price ? current : best
  })
}

/**
 * Format the last updated date for display
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatLastUpdated(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
