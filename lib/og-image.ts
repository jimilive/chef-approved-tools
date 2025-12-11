import fs from 'fs'
import path from 'path'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chefapprovedtools.com'

/**
 * Get static OG image URL if it exists for a product
 * Looks for: /images/products/[slug]/[slug]-og.jpg
 */
export function getStaticOGImageURL(productSlug: string): string | null {
  const imagePath = `/images/products/${productSlug}/${productSlug}-og.jpg`
  const fullPath = path.join(process.cwd(), 'public', imagePath)

  if (fs.existsSync(fullPath)) {
    return `${baseUrl}${imagePath}`
  }
  return null
}

/**
 * Get static Pin image URL if it exists for a product
 * Looks for: /images/products/[slug]/[slug]-pin.jpg
 */
export function getStaticPinImageURL(productSlug: string): string | null {
  const imagePath = `/images/products/${productSlug}/${productSlug}-pin.jpg`
  const fullPath = path.join(process.cwd(), 'public', imagePath)

  if (fs.existsSync(fullPath)) {
    return `${baseUrl}${imagePath}`
  }
  return null
}

/**
 * Get static Hero image URL if it exists for a product
 * Looks for: /images/products/[slug]/[slug]-hero.jpg
 */
export function getStaticHeroImageURL(productSlug: string): string | null {
  const imagePath = `/images/products/${productSlug}/${productSlug}-hero.jpg`
  const fullPath = path.join(process.cwd(), 'public', imagePath)

  if (fs.existsSync(fullPath)) {
    return imagePath // Return relative path for Next.js Image component
  }
  return null
}

/**
 * Generate dynamic OG image URL for product pages
 * Use this as fallback when no static OG image exists
 */
export function generateOGImageURL(params: {
  title: string
  rating: number
  testingPeriod: string
  tier: 1 | 2 | 3
}): string {
  const searchParams = new URLSearchParams({
    title: params.title,
    rating: params.rating.toString(),
    testingPeriod: params.testingPeriod,
    tier: params.tier.toString(),
  })

  return `${baseUrl}/api/og?${searchParams.toString()}`
}

/**
 * Get the best available OG image for a product
 * Prefers static image, falls back to dynamic generation
 */
export function getOGImageURL(params: {
  productSlug: string
  title: string
  rating: number
  testingPeriod: string
  tier: 1 | 2 | 3
}): string {
  const staticUrl = getStaticOGImageURL(params.productSlug)
  if (staticUrl) {
    return staticUrl
  }

  return generateOGImageURL({
    title: params.title,
    rating: params.rating,
    testingPeriod: params.testingPeriod,
    tier: params.tier,
  })
}
