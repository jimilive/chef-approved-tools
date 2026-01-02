import { METADATA } from '@/data/metadata'

export interface SearchResult {
  slug: string
  title: string
  excerpt: string
  url: string
  category?: string
  relevance?: number
}

/**
 * Check if text contains the query as a word (not substring)
 * Matches: "knife", "chef's knife", "knife-set", "pans"
 * Doesn't match: "pankakes" for "pan"
 */
function matchesWord(text: string, query: string): boolean {
  if (!text) return false
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()

  // Create regex that matches word boundaries
  const pattern = new RegExp(`(^|[\\s\\-_.,;:!?'"\`()\\[\\]/])${escapeRegex(lowerQuery)}($|[s]?[\\s\\-_.,;:!?'"\`()\\[\\]/]|s?$)`, 'i')

  return pattern.test(lowerText) ||
         lowerText === lowerQuery ||
         lowerText.startsWith(lowerQuery + ' ') ||
         lowerText.startsWith(lowerQuery + '-') ||
         lowerText.startsWith(lowerQuery + 's') ||
         lowerText.endsWith(' ' + lowerQuery) ||
         lowerText.endsWith('-' + lowerQuery)
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Calculate relevance score for sorting
 * Higher = more relevant
 */
function calculateRelevance(slug: string, meta: any, query: string): number {
  let score = 0
  const lowerQuery = query.toLowerCase()

  // Title match = highest relevance
  if (meta.title?.toLowerCase().includes(lowerQuery)) {
    score += 100
    // Exact word match in title = bonus
    if (matchesWord(meta.title, query)) score += 50
  }

  // Slug match = high relevance
  const slugAsWords = slug.replace(/-/g, ' ')
  if (slugAsWords.includes(lowerQuery)) {
    score += 80
  }

  // Description match = medium relevance
  if (meta.description?.toLowerCase().includes(lowerQuery)) {
    score += 30
  }

  // Category match only = lower relevance
  if (meta.productCategory?.toLowerCase().includes(lowerQuery)) {
    score += 20
  }

  return score
}

/**
 * Search reviews by query
 * Uses METADATA.reviews - only actual review pages, no competitor products
 */
export function searchReviews(query: string, limit: number = 6): SearchResult[] {
  if (!query || query.length < 2) return []

  const searchQuery = query.toLowerCase()
  const reviewEntries = Object.entries(METADATA.reviews) as [string, any][]

  const results = reviewEntries
    .filter(([slug, meta]) => {
      // Word-based matching for title and description
      const titleMatch = matchesWord(meta.title || '', searchQuery)
      const descMatch = matchesWord(meta.description || '', searchQuery)

      // Slug matching (convert hyphens to spaces for word matching)
      const slugAsWords = slug.replace(/-/g, ' ')
      const slugMatch = matchesWord(slugAsWords, searchQuery)

      // Category matching - handle singular/plural
      const category = meta.productCategory?.toLowerCase() || ''
      const categoryMatch =
        category.includes(searchQuery) ||
        (searchQuery === 'knife' && category === 'knives') ||
        (searchQuery === 'knives' && category === 'knives') ||
        (searchQuery === 'pan' && (category === 'cookware' || category === 'pans' || slugAsWords.includes('pan'))) ||
        (searchQuery === 'pans' && (category === 'cookware' || category === 'pans' || slugAsWords.includes('pan')))

      return titleMatch || descMatch || slugMatch || categoryMatch
    })
    .map(([slug, meta]) => ({
      slug,
      title: meta.title || slug,
      excerpt: meta.description || '',
      url: `/reviews/${slug}`,
      category: meta.productCategory || 'reviews',
      relevance: calculateRelevance(slug, meta, searchQuery)
    }))
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit)

  return results
}

/**
 * Search blog posts by query
 * Searches title, description, and primary keyword
 */
export function searchBlogs(query: string, limit: number = 6): SearchResult[] {
  if (!query || query.length < 2) return []

  const searchQuery = query.toLowerCase()
  const blogEntries = Object.entries(METADATA.blog) as [string, any][]

  const results = blogEntries
    .filter(([slug, meta]) => {
      // Word-based matching
      const titleMatch = matchesWord(meta.title || '', searchQuery)
      const descMatch = matchesWord(meta.description || '', searchQuery)
      const keywordMatch = matchesWord(meta.keywords?.primary || '', searchQuery)

      // Slug matching
      const slugAsWords = slug.replace(/-/g, ' ')
      const slugMatch = matchesWord(slugAsWords, searchQuery)

      return titleMatch || descMatch || keywordMatch || slugMatch
    })
    .map(([slug, meta]) => ({
      slug,
      title: meta.title || slug,
      excerpt: meta.description || '',
      url: `/blog/${slug}`,
      category: slug.includes('-vs-') ? 'comparison' : 'educational',
      relevance: calculateRelevance(slug, meta, searchQuery)
    }))
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit)

  return results
}

/**
 * Combined search - returns both reviews and blogs
 */
export function searchAll(query: string, limitPerType: number = 6): { reviews: SearchResult[]; blogs: SearchResult[] } {
  return {
    reviews: searchReviews(query, limitPerType),
    blogs: searchBlogs(query, limitPerType)
  }
}

/**
 * Get total result counts without limit
 */
export function getSearchCounts(query: string): { reviews: number; blogs: number; total: number } {
  const reviews = searchReviews(query, 1000).length
  const blogs = searchBlogs(query, 1000).length
  return { reviews, blogs, total: reviews + blogs }
}
