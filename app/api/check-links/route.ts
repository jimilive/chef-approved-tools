import { NextResponse } from 'next/server'

/**
 * Affiliate Link Health Check API
 * Verifies that Amazon affiliate links are still valid and responding
 * Run this periodically to catch broken links before they cost you commissions
 */

interface LinkCheckResult {
  url: string
  status: 'valid' | 'invalid' | 'error'
  statusCode?: number
  redirects?: boolean
  error?: string
  checkedAt: string
}

// Sample product slugs to check - expand this list with your actual products
const PRODUCT_SLUGS = [
  'lodge-seasoned-cast-iron-3-skillet-bundle',
  'vitamix-5200',
  'kitchenaid-ksm8990wh',
  'robot-coupe-r2-dice',
  'wusthof-classic-ikon-16-piece',
  'le-creuset-signature-7-25-qt-dutch-oven',
  'john-boos-platinum-commercial-cutting-board',
  'victorinox-fibrox-pro-knife-set'
]

async function checkAffiliateLink(url: string): Promise<LinkCheckResult> {
  const checkedAt = new Date().toISOString()

  try {
    // Use HEAD request with proper browser headers to avoid Amazon bot blocking
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual', // Don't follow redirects automatically
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })

    const statusCode = response.status
    const isRedirect = statusCode >= 300 && statusCode < 400

    // Amazon links should return 200 or redirect (301/302)
    const isValid = statusCode === 200 || isRedirect

    return {
      url,
      status: isValid ? 'valid' : 'invalid',
      statusCode,
      redirects: isRedirect,
      checkedAt
    }
  } catch (error) {
    return {
      url,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      checkedAt
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testUrl = searchParams.get('url')

  // If specific URL provided, check just that one
  if (testUrl) {
    const result = await checkAffiliateLink(testUrl)
    return NextResponse.json(result)
  }

  // Otherwise, check all product affiliate links
  // In production, you'd fetch these from your database/product data
  const results: LinkCheckResult[] = []

  // Sample check of primary Amazon affiliate link format
  const baseAmazonUrl = 'https://www.amazon.com/dp/'
  const testASINs = [
    'B07RNBR6L5', // Lodge cast iron set
    'B008H4SLV6', // Vitamix
    'B00XPRRHFW', // KitchenAid
  ]

  for (const asin of testASINs) {
    const url = `${baseAmazonUrl}${asin}?tag=chefapprovedt-20`
    const result = await checkAffiliateLink(url)
    results.push(result)

    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const validCount = results.filter(r => r.status === 'valid').length
  const invalidCount = results.filter(r => r.status === 'invalid').length
  const errorCount = results.filter(r => r.status === 'error').length

  return NextResponse.json({
    summary: {
      total: results.length,
      valid: validCount,
      invalid: invalidCount,
      errors: errorCount,
      checkedAt: new Date().toISOString()
    },
    results
  })
}

/**
 * POST endpoint for webhook/scheduled checks
 * Set up a cron job to hit this endpoint weekly
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { urls } = body

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'Invalid request: urls array required' },
        { status: 400 }
      )
    }

    const results = await Promise.all(
      urls.map(url => checkAffiliateLink(url))
    )

    const invalidLinks = results.filter(r => r.status !== 'valid')

    // In production, you might want to:
    // - Send email alert if links are broken
    // - Log to monitoring service
    // - Update database with link status

    return NextResponse.json({
      checked: results.length,
      invalidLinks,
      needsAttention: invalidLinks.length > 0
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}