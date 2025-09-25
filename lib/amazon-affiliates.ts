// Amazon Affiliates Link Management
import { trackAffiliateClick } from './analytics'

export const AMAZON_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'chefapprovedtools-20'

interface AffiliateLink {
  url: string
  text: string
  category: string
  productName: string
  price?: number
}

// Amazon domain mappings for different regions
const AMAZON_DOMAINS = {
  US: 'amazon.com',
  UK: 'amazon.co.uk', 
  CA: 'amazon.ca',
  DE: 'amazon.de',
  FR: 'amazon.fr',
  IT: 'amazon.it',
  ES: 'amazon.es',
  JP: 'amazon.co.jp'
}

// Common Amazon product URL patterns
const AMAZON_URL_PATTERNS = [
  /amazon\.com\/.*\/dp\/([A-Z0-9]{10})/,
  /amazon\.com\/dp\/([A-Z0-9]{10})/,
  /amazon\.com\/gp\/product\/([A-Z0-9]{10})/,
]

export function extractASIN(url: string): string | null {
  for (const pattern of AMAZON_URL_PATTERNS) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function buildAffiliateUrl(
  baseUrl: string, 
  options: {
    tag?: string
    region?: keyof typeof AMAZON_DOMAINS
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
  } = {}
): string {
  const {
    tag = AMAZON_TAG,
    region = 'US',
    utm_source = 'chefapprovedtools',
    utm_medium = 'affiliate',
    utm_campaign = 'product-review'
  } = options

  try {
    const url = new URL(baseUrl)
    
    // Ensure we're using the correct Amazon domain
    if (!url.hostname.includes('amazon.')) {
      throw new Error('Not an Amazon URL')
    }

    // Add affiliate tag
    url.searchParams.set('tag', tag)
    
    // Add UTM parameters for tracking
    if (utm_source) url.searchParams.set('utm_source', utm_source)
    if (utm_medium) url.searchParams.set('utm_medium', utm_medium)
    if (utm_campaign) url.searchParams.set('utm_campaign', utm_campaign)
    
    // Add additional affiliate parameters
    url.searchParams.set('linkCode', 'll1')
    url.searchParams.set('linkId', generateLinkId())
    
    return url.toString()
  } catch (error) {
    console.error('Error building affiliate URL:', error)
    return baseUrl
  }
}

function generateLinkId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Price tracking and display utilities
export interface PriceInfo {
  current: number
  original?: number
  currency: string
  discount?: number
  lastUpdated: string
}

export function formatPrice(price: PriceInfo): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency
  })
  
  return formatter.format(price.current)
}