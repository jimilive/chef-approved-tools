// Centralized pricing data for all reviewed products
// Price ranges based on typical retailer pricing (no real-time API needed)

export interface ProductPricing {
  productSlug: string
  priceRange: {
    min: number
    max: number
    currency: string
  }
  dealStatus: 'sale' | 'normal' | 'high' | 'trending'
  dealText?: string
  retailerNote?: string
  lastUpdated: string
}

export const productPricing: Record<string, ProductPricing> = {
  'vitamix-5200': {
    productSlug: 'vitamix-5200',
    priceRange: {
      min: 349,
      max: 449,
      currency: 'USD'
    },
    dealStatus: 'normal',
    dealText: 'Best value at Vitamix direct or Amazon during sales',
    retailerNote: 'Price varies by color - black is typically cheapest',
    lastUpdated: '2024-09-26'
  },

  'le-creuset-signature-7-25-qt-dutch-oven': {
    productSlug: 'le-creuset-signature-7-25-qt-dutch-oven',
    priceRange: {
      min: 320,
      max: 450,
      currency: 'USD'
    },
    dealStatus: 'trending',
    dealText: 'Williams Sonoma often has 20% off sales',
    retailerNote: 'Color affects price - Flame and Cherry are premium colors',
    lastUpdated: '2024-09-26'
  },

  'wusthof-classic-ikon-15-piece': {
    productSlug: 'wusthof-classic-ikon-15-piece',
    priceRange: {
      min: 380,
      max: 499,
      currency: 'USD'
    },
    dealStatus: 'normal',
    dealText: 'Amazon typically has best pricing',
    retailerNote: 'Buying individual knives costs 40% more than the set',
    lastUpdated: '2024-09-26'
  },

  'john-boos-platinum-commercial-cutting-board': {
    productSlug: 'john-boos-platinum-commercial-cutting-board',
    priceRange: {
      min: 189,
      max: 229,
      currency: 'USD'
    },
    dealStatus: 'normal',
    dealText: 'Restaurant supply stores sometimes beat retail pricing',
    retailerNote: 'Size affects price significantly - this is for 20x15 inch',
    lastUpdated: '2024-09-26'
  },

  'robot-coupe-r2-dice': {
    productSlug: 'robot-coupe-r2-dice',
    priceRange: {
      min: 1299,
      max: 1499,
      currency: 'USD'
    },
    dealStatus: 'high',
    dealText: 'Professional equipment - consider used/refurbished options',
    retailerNote: 'Restaurant supply houses may offer better pricing for bulk',
    lastUpdated: '2024-09-26'
  },

  'lodge-seasoned-cast-iron-3-skillet-bundle': {
    productSlug: 'lodge-seasoned-cast-iron-3-skillet-bundle',
    priceRange: {
      min: 89,
      max: 129,
      currency: 'USD'
    },
    dealStatus: 'sale',
    dealText: 'Lodge Direct often has bundle deals',
    retailerNote: 'Individual skillets cost more than the bundle',
    lastUpdated: '2024-09-26'
  },

  'kitchenaid-ksm8990wh': {
    productSlug: 'kitchenaid-ksm8990wh',
    priceRange: {
      min: 499,
      max: 649,
      currency: 'USD'
    },
    dealStatus: 'normal',
    dealText: 'Commercial series - worth the premium over home models',
    retailerNote: 'NSF certification adds to cost but necessary for commercial use',
    lastUpdated: '2024-09-26'
  }
}

/**
 * Get pricing data for a specific product
 */
export function getProductPricing(productSlug: string): ProductPricing | null {
  return productPricing[productSlug] || null
}

/**
 * Get all products currently on sale
 */
export function getProductsOnSale(): ProductPricing[] {
  return Object.values(productPricing).filter(product => product.dealStatus === 'sale')
}

/**
 * Get products in specific price range
 */
export function getProductsByPriceRange(minPrice: number, maxPrice: number): ProductPricing[] {
  return Object.values(productPricing).filter(product =>
    product.priceRange.min >= minPrice && product.priceRange.max <= maxPrice
  )
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price)
}