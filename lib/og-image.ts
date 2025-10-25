/**
 * Generate dynamic OG image URL for product pages
 */
export function generateOGImageURL(params: {
  title: string
  rating: number
  testingPeriod: string
  tier: 1 | 2 | 3
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chefapprovedtools.com'

  const searchParams = new URLSearchParams({
    title: params.title,
    rating: params.rating.toString(),
    testingPeriod: params.testingPeriod,
    tier: params.tier.toString(),
  })

  return `${baseUrl}/api/og?${searchParams.toString()}`
}
