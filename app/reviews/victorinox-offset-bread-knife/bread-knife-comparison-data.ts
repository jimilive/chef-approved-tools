import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getBreadKnifeComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'victorinox-offset-bread-knife',
    'dexter-russell-sani-safe-offset-bread-knife',
    'mercer-culinary-millennia-offset-bread-knife',
    'lamson-premier-forged-offset-bread-knife'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: 'Offset Bread Knife Comparison',
    subtitle: 'Professional offset bread knives: Swiss precision vs American workhorses',
    products: [
      {
        name: 'Victorinox 9" Offset',
        slug: 'victorinox-offset-bread-knife',
        affiliateLink: getLink('victorinox-offset-bread-knife'),
        material: 'Swiss High-Carbon SS',
        bladeLength: '9"',
        durability: '5-7+ years',
        warranty: 'Lifetime',
        madeIn: 'Switzerland',
        bestFor: 'Pro quality at budget price',
        isHighlighted: true
      },
      {
        name: 'Dexter-Russell 9" Offset',
        slug: 'dexter-russell-sani-safe-offset-bread-knife',
        affiliateLink: getLink('dexter-russell-sani-safe-offset-bread-knife'),
        material: 'USA DEXSTEEL',
        bladeLength: '9"',
        durability: '5-7 years',
        warranty: 'Limited',
        madeIn: 'USA',
        bestFor: 'High-volume commercial'
      },
      {
        name: 'Mercer Millennia 9" Offset',
        slug: 'mercer-culinary-millennia-offset-bread-knife',
        affiliateLink: getLink('mercer-culinary-millennia-offset-bread-knife'),
        material: 'Japanese High-Carbon SS',
        bladeLength: '9"',
        durability: '3-5 years',
        warranty: 'Limited',
        madeIn: 'Taiwan',
        bestFor: 'Culinary students'
      },
      {
        name: 'Lamson 7" Forged Offset',
        slug: 'lamson-premier-forged-offset-bread-knife',
        affiliateLink: getLink('lamson-premier-forged-offset-bread-knife'),
        material: 'German 4116 SS',
        bladeLength: '7"',
        durability: '10-20+ years',
        warranty: 'Lifetime + FREE sharpening',
        madeIn: 'USA',
        bestFor: 'Heirloom quality'
      }
    ],
    comparisonRows: [
      { label: 'Material', field: 'material' as const },
      { label: 'Blade Length', field: 'bladeLength' as const },
      { label: 'Durability', field: 'durability' as const },
      { label: 'Warranty', field: 'warranty' as const },
      { label: 'Made In', field: 'madeIn' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'victorinox-offset-bread-knife'
  }
}
