import { Product, ProductCollection } from '@/types/product'
import { sampleProducts } from '@/data/products'

/**
 * Get a product by its slug from the products database
 * @param slug - The product slug (e.g., 'victorinox-fibrox-8-inch-chefs-knife')
 * @returns The product object or undefined if not found
 */
export function getProductBySlug(slug: string): Product | undefined {
  // Search through all categories in the product collection
  const allProducts = [
    ...sampleProducts.knives,
    ...sampleProducts.cookware,
    ...sampleProducts.appliances,
    ...sampleProducts.tools,
    ...sampleProducts.baking,
    ...sampleProducts.storage
  ]

  return allProducts.find(product => product.slug === slug)
}

/**
 * Get multiple products by their slugs
 * @param slugs - Array of product slugs
 * @returns Array of products (excludes any not found)
 */
export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map(slug => getProductBySlug(slug))
    .filter((product): product is Product => product !== undefined)
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
export function getProductsByCategory(category: keyof ProductCollection): Product[] {
  return sampleProducts[category] || []
}

/**
 * Get related products based on category, excluding the current product
 * @param currentProductSlug - Slug of current product to exclude
 * @param category - Category to search in
 * @param limit - Maximum number of products to return (default: 3)
 * @returns Array of related products
 */
export function getRelatedProducts(
  currentProductSlug: string,
  category: keyof ProductCollection,
  limit: number = 3
): Product[] {
  const categoryProducts = getProductsByCategory(category)

  return categoryProducts
    .filter(product => product.slug !== currentProductSlug)
    .slice(0, limit)
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
