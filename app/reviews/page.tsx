import { getAllProducts } from '@/lib/product-helpers'
import { EDITORIAL_METADATA } from '@/lib/editorial-metadata'
import { generateItemListSchema, generateBreadcrumbSchema } from '@/lib/schema'
import ReviewsClient from './ReviewsClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0 // Never cache - always fetch fresh data
export const fetchCache = 'force-no-store'

export const metadata = {
  title: 'All Equipment Reviews: 37 Products Chef-Tested In Restaurants',
  description: 'Complete collection of 37 kitchen equipment reviews tested in real restaurant environments and home kitchens by Chef Scott Bradley. Professional testing.',
}

// Map Product to Review interface with editorial fields
function mapProductToReview(product: any, index: number) {
  const editorial = EDITORIAL_METADATA[product.slug]

  return {
    id: index + 1,
    tier: editorial?.tier || 1,
    testingPeriod: editorial?.testingPeriod || product.description || 'Professional testing',
    name: product.name,
    slug: product.slug,
    rating: product.expertRating || product.reviews?.rating || 4.5,
    hook: editorial?.hook || product.expertOpinion || product.description || '',
    revenueScore: editorial?.revenueScore || 40,
    category: product.category
  }
}

export default async function ReviewsPage() {
  // Fetch all products from Supabase
  const products = await getAllProducts()

  // Map products to review format
  const reviews = products.map((product, index) => mapProductToReview(product, index))

  // Generate schemas
  const itemListSchema = generateItemListSchema(
    products,
    'Professional Kitchen Equipment Reviews'
  )

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Reviews', url: 'https://www.chefapprovedtools.com/reviews' }
  ])

  return (
    <>
      {/* Schema.org markup */}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ReviewsClient reviews={reviews} />
    </>
  )
}
