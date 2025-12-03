import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Affiliate Link Health Check API
 * Verifies that Amazon affiliate links are still valid and responding
 * Run this periodically to catch broken links before they cost you commissions
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface LinkCheckResult {
  url: string
  productSlug: string
  productName: string
  linkTag?: string
  status: 'valid' | 'invalid' | 'error'
  statusCode?: number
  redirects?: boolean
  error?: string
  checkedAt: string
}

async function checkAffiliateLink(
  url: string,
  productSlug: string,
  productName: string,
  linkTag?: string
): Promise<LinkCheckResult> {
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
      productSlug,
      productName,
      linkTag,
      status: isValid ? 'valid' : 'invalid',
      statusCode,
      redirects: isRedirect,
      checkedAt
    }
  } catch (error) {
    return {
      url,
      productSlug,
      productName,
      linkTag,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      checkedAt
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testUrl = searchParams.get('url')
  const testSlug = searchParams.get('slug')

  // If specific URL provided, check just that one
  if (testUrl) {
    const result = await checkAffiliateLink(testUrl, 'manual-test', 'Manual URL Test')
    return NextResponse.json(result)
  }

  try {
    // Fetch all products from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('slug, name, affiliateLinks')
      .not('affiliateLinks', 'is', null)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products from database', details: error.message },
        { status: 500 }
      )
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'No products with affiliate links found in database' },
        { status: 404 }
      )
    }

    // If specific slug provided, check only that product
    const productsToCheck = testSlug
      ? products.filter(p => p.slug === testSlug)
      : products

    if (testSlug && productsToCheck.length === 0) {
      return NextResponse.json(
        { error: `Product with slug '${testSlug}' not found` },
        { status: 404 }
      )
    }

    const results: LinkCheckResult[] = []

    // Check all affiliate links for each product
    for (const product of productsToCheck) {
      const links = Array.isArray(product.affiliateLinks) ? product.affiliateLinks : []

      for (const link of links) {
        if (link.url && link.vendor === 'amazon') {
          const result = await checkAffiliateLink(
            link.url,
            product.slug,
            product.name,
            link.tag || undefined
          )
          results.push(result)

          // Add small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
    }

    if (results.length === 0) {
      return NextResponse.json(
        { message: 'No Amazon affiliate links found to check' },
        { status: 200 }
      )
    }

    const validCount = results.filter(r => r.status === 'valid').length
    const invalidCount = results.filter(r => r.status === 'invalid').length
    const errorCount = results.filter(r => r.status === 'error').length

    return NextResponse.json({
      summary: {
        total: results.length,
        products: productsToCheck.length,
        valid: validCount,
        invalid: invalidCount,
        errors: errorCount,
        checkedAt: new Date().toISOString()
      },
      results
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * POST endpoint for webhook/scheduled checks
 * Set up a cron job to hit this endpoint weekly
 * Can accept either:
 * - { checkAll: true } to check all products from Supabase
 * - { urls: [...] } to check specific URLs (legacy support)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { urls, checkAll } = body

    // If checkAll flag is set, fetch from Supabase and check everything
    if (checkAll) {
      const { data: products, error } = await supabase
        .from('products')
        .select('slug, name, affiliateLinks')
        .not('affiliateLinks', 'is', null)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch products from database', details: error.message },
          { status: 500 }
        )
      }

      if (!products || products.length === 0) {
        return NextResponse.json(
          { message: 'No products with affiliate links found' },
          { status: 200 }
        )
      }

      const results: LinkCheckResult[] = []

      for (const product of products) {
        const links = Array.isArray(product.affiliateLinks) ? product.affiliateLinks : []

        for (const link of links) {
          if (link.url && link.vendor === 'amazon') {
            const result = await checkAffiliateLink(
              link.url,
              product.slug,
              product.name,
              link.tag || undefined
            )
            results.push(result)
            await new Promise(resolve => setTimeout(resolve, 500))
          }
        }
      }

      const invalidLinks = results.filter(r => r.status !== 'valid')

      return NextResponse.json({
        checked: results.length,
        products: products.length,
        invalidLinks,
        needsAttention: invalidLinks.length > 0
      })
    }

    // Legacy support: check specific URLs
    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'Invalid request: either checkAll: true or urls array required' },
        { status: 400 }
      )
    }

    const results = await Promise.all(
      urls.map(url => checkAffiliateLink(url, 'manual', 'Manual URL'))
    )

    const invalidLinks = results.filter(r => r.status !== 'valid')

    return NextResponse.json({
      checked: results.length,
      invalidLinks,
      needsAttention: invalidLinks.length > 0
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}