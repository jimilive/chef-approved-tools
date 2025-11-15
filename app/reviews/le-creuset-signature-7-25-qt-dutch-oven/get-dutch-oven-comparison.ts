import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch Dutch oven comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getDutchOvenComparison() {
  // Fetch all 4 Dutch oven products from database
  const products = await getProductsBySlugs([
    'le-creuset-signature-7-25-qt-dutch-oven',
    'staub-cast-iron-7-qt-round-cocotte',
    'lodge-enameled-cast-iron-7-5-qt-dutch-oven',
    'cuisinart-chef-classic-enameled-7-qt-round-covered-casserole'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    {
      name: 'Le Creuset 7.25 Qt',
      brand: 'Le Creuset',
      affiliateLink: products.find(p => p.slug === 'le-creuset-signature-7-25-qt-dutch-oven')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'le-creuset-signature-7-25-qt-dutch-oven')!)
        : '#',
      capacity: '7.25 Qt',
      weight: '12.8 lbs',
      dimensions: '11.5" diameter x 7.5" tall',
      warranty: 'Lifetime',
      ovenSafe: 'Up to 500°F',
      madeIn: 'France',
      interior: 'Light sand enamel',
      bestFor: 'Heirloom quality & even heating',
      priceTier: 'luxury' as const,
    },
    {
      name: 'Staub 7 Qt',
      brand: 'Staub',
      affiliateLink: products.find(p => p.slug === 'staub-cast-iron-7-qt-round-cocotte')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'staub-cast-iron-7-qt-round-cocotte')!)
        : '#',
      capacity: '7 Qt',
      weight: '15.6 lbs',
      dimensions: '11.25" diameter x 7.25" tall',
      warranty: 'Lifetime',
      ovenSafe: 'Up to 500°F (900°F without lid)',
      madeIn: 'France',
      interior: 'Matte black enamel',
      bestFor: 'Self-basting lid & browning',
      priceTier: 'luxury' as const,
    },
    {
      name: 'Lodge 7.5 Qt',
      brand: 'Lodge',
      affiliateLink: products.find(p => p.slug === 'lodge-enameled-cast-iron-7-5-qt-dutch-oven')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'lodge-enameled-cast-iron-7-5-qt-dutch-oven')!)
        : '#',
      capacity: '7.5 Qt',
      weight: '18 lbs',
      dimensions: '12.9" diameter x 6.7" tall',
      warranty: 'Limited lifetime',
      ovenSafe: 'Up to 500°F',
      madeIn: 'China',
      interior: 'Beige enamel',
      bestFor: 'Budget-friendly performance',
      priceTier: 'budget' as const,
    },
    {
      name: 'Cuisinart 7 Qt',
      brand: 'Cuisinart',
      affiliateLink: products.find(p => p.slug === 'cuisinart-chef-classic-enameled-7-qt-round-covered-casserole')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'cuisinart-chef-classic-enameled-7-qt-round-covered-casserole')!)
        : '#',
      capacity: '7 Qt',
      weight: '17 lbs',
      dimensions: '13" diameter x 6.2" tall',
      warranty: 'Lifetime (manufacturer)',
      ovenSafe: 'Stovetop, broiler, oven safe',
      madeIn: 'China',
      interior: 'Porcelain enamel',
      bestFor: 'Mid-range value',
      priceTier: 'mid-range' as const,
    }
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Le Creuset 7.25 Qt',
    title: 'Compare Dutch Ovens',
    subtitle: 'See how the Le Creuset 7.25 Qt stacks up against top competitors',
    comparisonRows: [
      { label: 'Capacity', field: 'capacity' },
      { label: 'Weight', field: 'weight' },
      { label: 'Dimensions', field: 'dimensions' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Oven Safe', field: 'ovenSafe' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Interior Enamel', field: 'interior' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    ],
  }
}
