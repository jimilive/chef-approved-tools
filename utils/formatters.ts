// Utility functions for formatting and data manipulation

export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function generateMetaDescription(text: string, maxLength: number = 160): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= maxLength) return cleaned
  
  const truncated = cleaned.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.substring(0, lastSpace) + '...'
}

export function calculateDiscount(original: number, current: number): number {
  if (original <= 0) return 0
  return Math.round(((original - current) / original) * 100)
}

export function sortProducts(products: any[], sortBy: string): any[] {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => (a.price?.current || 0) - (b.price?.current || 0))
    case 'price-desc':
      return sorted.sort((a, b) => (b.price?.current || 0) - (a.price?.current || 0))
    case 'rating':
      return sorted.sort((a, b) => b.reviews.rating - a.reviews.rating)
    case 'reviews':
      return sorted.sort((a, b) => b.reviews.count - a.reviews.count)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

export function filterProducts(products: any[], filters: any): any[] {
  let filtered = [...products]
  
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category)
  }
  
  if (filters.priceRange) {
    filtered = filtered.filter(p =>
      p.price?.current &&
      p.price.current >= filters.priceRange.min &&
      p.price.current <= filters.priceRange.max
    )
  }
  
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(p => filters.brands.includes(p.brand))
  }
  
  if (filters.rating) {
    filtered = filtered.filter(p => p.reviews.rating >= filters.rating)
  }
  
  if (filters.inStock !== undefined) {
    filtered = filtered.filter(p => p.inStock === filters.inStock)
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(p => 
      filters.tags.some((tag: string) => p.tags.includes(tag))
    )
  }
  
  return filtered
}

export function groupProductsByCategory(products: any[]): Record<string, any[]> {
  return products.reduce((acc, product) => {
    const category = product.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {} as Record<string, any[]>)
}

export function extractUniqueBrands(products: any[]): string[] {
  const brands = new Set(products.map(p => p.brand))
  return Array.from(brands).sort()
}

export function extractUniqueTags(products: any[]): string[] {
  const tags = new Set(products.flatMap(p => p.tags))
  return Array.from(tags).sort()
}

export function getPriceRange(products: any[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 }

  const prices = products.filter(p => p.price?.current).map(p => p.price.current)
  if (prices.length === 0) return { min: 0, max: 0 }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}