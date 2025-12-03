import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getChefKnifeComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'victorinox-fibrox-10-inch-chefs-knife',
    'wusthof-classic-10-inch-chef-knife',
    'mercer-culinary-millennia-10-inch-chef-knife',
    'shun-classic-10-inch-chef-knife'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: '10-Inch Chef\'s Knife Comparison',
    subtitle: 'Budget workhorses vs premium heirlooms: construction, steel, and value',
    products: [
      {
        name: 'Victorinox Fibrox Pro',
        slug: 'victorinox-fibrox-10-inch-chefs-knife',
        affiliateLink: getLink('victorinox-fibrox-10-inch-chefs-knife'),
        steel: 'X50CrMoV15 (stamped)',
        weight: 'Light (6 oz)',
        edgeRetention: 'Good',
        warranty: 'Lifetime',
        madeIn: 'Switzerland',
        bestFor: 'Value + proven performance',
        isHighlighted: true
      },
      {
        name: 'Wüsthof Classic',
        slug: 'wusthof-classic-10-inch-chef-knife',
        affiliateLink: getLink('wusthof-classic-10-inch-chef-knife'),
        steel: 'X50CrMoV15 (forged)',
        weight: 'Heavy (9 oz)',
        edgeRetention: 'Excellent',
        warranty: 'Lifetime',
        madeIn: 'Germany',
        bestFor: 'Heirloom investment'
      },
      {
        name: 'Mercer Millennia',
        slug: 'mercer-culinary-millennia-10-inch-chef-knife',
        affiliateLink: getLink('mercer-culinary-millennia-10-inch-chef-knife'),
        steel: 'Japanese steel (stamped)',
        weight: 'Very light (5 oz)',
        edgeRetention: 'Fair',
        warranty: '1 year',
        madeIn: 'Taiwan',
        bestFor: 'Budget + pro credibility'
      },
      {
        name: 'Shun Classic',
        slug: 'shun-classic-10-inch-chef-knife',
        affiliateLink: getLink('shun-classic-10-inch-chef-knife'),
        steel: 'VG-MAX Damascus',
        weight: 'Medium (7 oz)',
        edgeRetention: 'Excellent',
        warranty: 'Lifetime + free sharpening',
        madeIn: 'Japan',
        bestFor: 'Japanese precision'
      }
    ],
    comparisonRows: [
      { label: 'Steel', field: 'steel' as const },
      { label: 'Weight', field: 'weight' as const },
      { label: 'Edge Retention', field: 'edgeRetention' as const },
      { label: 'Warranty', field: 'warranty' as const },
      { label: 'Made In', field: 'madeIn' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'victorinox-fibrox-10-inch-chefs-knife'
  }
}
