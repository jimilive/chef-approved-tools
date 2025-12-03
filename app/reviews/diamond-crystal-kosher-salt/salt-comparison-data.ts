import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getSaltComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'diamond-crystal-kosher-salt',
    'morton-coarse-kosher-salt',
    'maldon-sea-salt-flakes',
    'redmond-real-salt-kosher'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: 'Kosher Salt Comparison',
    subtitle: 'Crystal structure, density, and best use cases for each salt type',
    products: [
      {
        name: 'Diamond Crystal',
        slug: 'diamond-crystal-kosher-salt',
        affiliateLink: getLink('diamond-crystal-kosher-salt'),
        crystalStructure: 'Hollow pyramids',
        density: '2.8g per tsp',
        additives: 'None',
        dissolveSpeed: 'Very fast',
        madeIn: 'USA',
        bestFor: 'Everyday cooking control',
        isHighlighted: true
      },
      {
        name: 'Morton Coarse',
        slug: 'morton-coarse-kosher-salt',
        affiliateLink: getLink('morton-coarse-kosher-salt'),
        crystalStructure: 'Dense flat flakes',
        density: '4.8g per tsp',
        additives: 'Anti-caking agent',
        dissolveSpeed: 'Slow',
        madeIn: 'USA',
        bestFor: 'Budget, brining'
      },
      {
        name: 'Maldon Sea Salt',
        slug: 'maldon-sea-salt-flakes',
        affiliateLink: getLink('maldon-sea-salt-flakes'),
        crystalStructure: 'Large pyramids',
        density: '3.5g per tsp',
        additives: 'None',
        dissolveSpeed: 'Medium',
        madeIn: 'England',
        bestFor: 'Finishing, garnishing'
      },
      {
        name: 'Redmond Real Salt',
        slug: 'redmond-real-salt-kosher',
        affiliateLink: getLink('redmond-real-salt-kosher'),
        crystalStructure: 'Coarse crystals',
        density: '3.2g per tsp',
        additives: 'None (60+ minerals)',
        dissolveSpeed: 'Medium',
        madeIn: 'USA (Utah)',
        bestFor: 'Health-conscious'
      }
    ],
    comparisonRows: [
      { label: 'Crystal Structure', field: 'crystalStructure' as const },
      { label: 'Density', field: 'density' as const },
      { label: 'Additives', field: 'additives' as const },
      { label: 'Dissolve Speed', field: 'dissolveSpeed' as const },
      { label: 'Made In', field: 'madeIn' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'diamond-crystal-kosher-salt'
  }
}
