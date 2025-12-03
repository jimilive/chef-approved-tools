import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getFoodProcessorComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'robot-coupe-r2-dice',
    'waring-commercial-wfp14s',
    'cuisinart-dfp-14bcny',
    'kitchenaid-kfp1318'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: 'Food Processor Comparison',
    subtitle: 'Commercial vs prosumer food processors: power, capacity, and best use cases',
    products: [
      {
        name: 'Robot Coupe R2 Dice',
        slug: 'robot-coupe-r2-dice',
        affiliateLink: getLink('robot-coupe-r2-dice'),
        motor: '2 HP',
        capacity: '3 qt',
        dicing: 'Yes (10mm)',
        continuousFeed: 'Yes',
        warranty: '1 year',
        madeIn: 'France',
        bestFor: 'Commercial kitchens',
        isHighlighted: true
      },
      {
        name: 'Waring WFP14S',
        slug: 'waring-commercial-wfp14s',
        affiliateLink: getLink('waring-commercial-wfp14s'),
        motor: '1 HP',
        capacity: '3.5 qt',
        dicing: 'No',
        continuousFeed: 'Yes (SC model)',
        warranty: '5 yr motor',
        madeIn: 'USA',
        bestFor: 'Commercial/liquids'
      },
      {
        name: 'Cuisinart DFP-14BCNY',
        slug: 'cuisinart-dfp-14bcny',
        affiliateLink: getLink('cuisinart-dfp-14bcny'),
        motor: '720W',
        capacity: '14 cups',
        dicing: 'No',
        continuousFeed: 'No',
        warranty: '3-5 years',
        madeIn: 'China',
        bestFor: 'Home (ATK winner)'
      },
      {
        name: 'KitchenAid KFP1318',
        slug: 'kitchenaid-kfp1318',
        affiliateLink: getLink('kitchenaid-kfp1318'),
        motor: '500W',
        capacity: '13 cups',
        dicing: 'No',
        continuousFeed: 'No',
        warranty: '1 year',
        madeIn: 'China',
        bestFor: 'Home/storage'
      }
    ],
    comparisonRows: [
      { label: 'Motor Power', field: 'motor' as const },
      { label: 'Capacity', field: 'capacity' as const },
      { label: 'Dicing', field: 'dicing' as const },
      { label: 'Continuous Feed', field: 'continuousFeed' as const },
      { label: 'Warranty', field: 'warranty' as const },
      { label: 'Made In', field: 'madeIn' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'robot-coupe-r2-dice'
  }
}
