/**
 * Dutch Oven Comparison Data for Le Creuset 7.25 Qt Review
 * Research completed: November 4, 2025
 * Sources: America's Test Kitchen, Prudent Reviews, Consumer Reports
 * 
 * AFFILIATE LINK UPDATE: November 8, 2025
 * - Staub link changed from Amazon (1-3%) to Zwilling direct (8%)
 * - Using CJ Affiliate Link ID: 15728361 (Staub Cocotte category)
 */

export const dutchOvenComparisonData = {
  products: [
    // LE CREUSET 7.25 QT - The Featured Product
    {
      name: 'Le Creuset 7.25 Qt',
      brand: 'Le Creuset',
      affiliateLink: 'https://amzn.to/4qCgf6S',
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

    // STAUB 7 QT - Updated to Zwilling Direct (8% commission)
    {
      name: 'Staub 7 Qt',
      brand: 'Staub',
      affiliateLink: 'https://www.dpbolvw.net/click-101557027-15728361',
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

    // LODGE 7.5 QT
    {
      name: 'Lodge 7.5 Qt',
      brand: 'Lodge',
      affiliateLink: 'https://amzn.to/4hOHYgI',
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

    // CUISINART 7 QT
    {
      name: 'Cuisinart 7 Qt',
      brand: 'Cuisinart',
      affiliateLink: 'https://amzn.to/47uTQkE',
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
  ],

  highlightedProduct: 'Le Creuset 7.25 Qt',

  // Table context
  title: 'Compare Dutch Ovens',
  subtitle: 'See how the Le Creuset 7.25 Qt stacks up against top competitors',

  // Define which fields to compare and their display labels
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

  // Research notes
  researchNotes: {
    date: 'November 4, 2025',
    sources: [
      'America\'s Test Kitchen Dutch Oven Review 2025',
      'Prudent Reviews Le Creuset Alternatives',
      'Prudent Reviews Staub Review',
      'Consumer Reports Dutch Oven Testing',
    ],
    keyFindings: [
      'Le Creuset 7.25qt is lightest per quart in its class',
      'Staub offers superior heat retention with self-basting lid',
      'Lodge provides excellent value at 1/4 the price',
      'Cuisinart named ATK Best Buy for mid-range performance',
      'All four perform well for braising and bread baking',
    ],
  },
}
