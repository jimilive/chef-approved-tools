import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getCleanerComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'method-all-purpose-cleaner',
    'seventh-generation-all-purpose-cleaner',
    'mrs-meyers-multi-surface-cleaner',
    'blueland-multi-surface-cleaner'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: 'All-Purpose Cleaner Comparison',
    subtitle: 'How Method Pink Grapefruit compares to top eco-friendly cleaners',
    products: [
      {
        name: 'Method Pink Grapefruit',
        slug: 'method-all-purpose-cleaner',
        affiliateLink: getLink('method-all-purpose-cleaner'),
        size: '28 oz',
        greaseCutting: 'Excellent',
        fragrance: 'Citrus/Grapefruit',
        sustainability: 'Recycled bottle',
        bestFor: 'Power cleaning',
        isHighlighted: true
      },
      {
        name: 'Seventh Generation',
        slug: 'seventh-generation-all-purpose-cleaner',
        affiliateLink: getLink('seventh-generation-all-purpose-cleaner'),
        size: '23 oz',
        greaseCutting: 'Good',
        fragrance: 'Fragrance-free',
        sustainability: 'Recycled bottle',
        bestFor: 'Sensitive skin'
      },
      {
        name: "Mrs. Meyer's Lemon Verbena",
        slug: 'mrs-meyers-multi-surface-cleaner',
        affiliateLink: getLink('mrs-meyers-multi-surface-cleaner'),
        size: '16 oz',
        greaseCutting: 'Moderate',
        fragrance: 'Essential oils',
        sustainability: '25% recycled',
        bestFor: 'Scent lovers'
      },
      {
        name: 'Blueland Tablets',
        slug: 'blueland-multi-surface-cleaner',
        affiliateLink: getLink('blueland-multi-surface-cleaner'),
        size: '24 oz (mixed)',
        greaseCutting: 'Good',
        fragrance: 'Light lemon',
        sustainability: 'Zero plastic',
        bestFor: 'Eco-warriors'
      }
    ],
    comparisonRows: [
      { label: 'Bottle Size', field: 'size' as const },
      { label: 'Grease Cutting', field: 'greaseCutting' as const },
      { label: 'Fragrance', field: 'fragrance' as const },
      { label: 'Sustainability', field: 'sustainability' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'method-all-purpose-cleaner'
  }
}
