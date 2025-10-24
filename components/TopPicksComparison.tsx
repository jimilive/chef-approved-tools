import { getProductBySlug } from '@/lib/product-helpers'
import TopPicksComparisonClient from './TopPicksComparisonClient'

export default async function TopPicksComparison() {
  // Fetch Vitamix as hero product from Supabase
  const product = await getProductBySlug('vitamix-5200')

  if (!product) {
    return null
  }

  // Map to the format expected by the client component
  const topPick = {
    id: product.slug,
    name: product.name,
    shortName: 'Vitamix 5200',
    rating: product.expertRating || 4.7,
    badge: 'Best Overall',
    badgeColor: 'bg-green-700',
    category: product.category,
    affiliateUrl: product.affiliateLinks[0]?.url || '#',
    keyFeature: '2.0 HP motor with 7-year full warranty',
    testPeriod: '5 years proven',
    whyBest: product.expertOpinion || 'Still running strong after 5 years of daily use with zero maintenance. Blades still sharp, motor still powerful.'
  }

  return <TopPicksComparisonClient topPick={topPick} />
}
