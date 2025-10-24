import { getAllProducts } from '@/lib/product-helpers'
import ReviewsClient from './ReviewsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'All Reviews: Chef-Tested Kitchen Equipment',
  description: 'Complete collection of professional kitchen equipment reviews tested in real restaurant environments and home kitchens.',
}

// Map Product to Review interface with editorial fields
// TODO: Eventually move tier, testingPeriod, hook, revenueScore to Supabase
function mapProductToReview(product: any, index: number) {
  return {
    id: index + 1,
    tier: 1 as 1 | 2, // Default to tier 1, can be customized per product
    testingPeriod: product.description || 'Professional testing',
    name: product.name,
    slug: product.slug,
    rating: product.expertRating || product.reviews?.rating || 4.5,
    hook: product.expertOpinion || product.description || '',
    revenueScore: 80, // Default score, can be customized
    category: product.category
  }
}

export default async function ReviewsPage() {
  // Fetch all products from Supabase
  const products = await getAllProducts()

  // Map products to review format
  const reviews = products.map((product, index) => mapProductToReview(product, index))

  return <ReviewsClient reviews={reviews} />
}
