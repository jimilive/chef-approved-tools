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

      // Dutch oven-specific fields
      capacity: '7.25 Qt',
      weight: '12.8 lbs',
      dimensions: '11.5" diameter x 7.5" tall',
      ovenSafe: 'Up to 500°F',
      interior: 'Light sand enamel',
      lidDesign: 'Traditional domed lid',
      handleDesign: 'Wide loop handles',

      // Universal fields
      durability: '50-100+ years',
      warranty: 'Lifetime',
      proUse: 'standard' as const,
      keyAdvantage: 'Lightest per quart, superior heat distribution',
      bestFor: 'Heirloom quality & even heating',
      priceTier: 'luxury' as const,
      madeIn: 'France',
    },

    // STAUB 7 QT - Updated to Zwilling Direct (8% commission)
    {
      name: 'Staub 7 Qt',
      brand: 'Staub',
      affiliateLink: 'https://www.dpbolvw.net/click-101557027-15728361',

      // Dutch oven-specific fields
      capacity: '7 Qt',
      weight: '15.6 lbs',
      dimensions: '11.25" diameter x 7.25" tall',
      ovenSafe: 'Up to 500°F (900°F without lid)',
      interior: 'Matte black enamel',
      lidDesign: 'Self-basting spikes on lid',
      handleDesign: 'Brass or nickel knob',

      // Universal fields
      durability: '50-100+ years',
      warranty: 'Lifetime',
      proUse: 'standard' as const,
      keyAdvantage: 'Self-basting lid, superior browning',
      bestFor: 'Self-basting lid & browning',
      priceTier: 'luxury' as const,
      madeIn: 'France',
    },

    // LODGE 7.5 QT
    {
      name: 'Lodge 7.5 Qt',
      brand: 'Lodge',
      affiliateLink: 'https://amzn.to/4hOHYgI',

      // Dutch oven-specific fields
      capacity: '7.5 Qt',
      weight: '18 lbs',
      dimensions: '12.9" diameter x 6.7" tall',
      ovenSafe: 'Up to 500°F',
      interior: 'Beige enamel',
      lidDesign: 'Traditional domed lid',
      handleDesign: 'Standard loop handles',

      // Universal fields
      durability: '20-30+ years',
      warranty: 'Limited lifetime',
      proUse: 'limited' as const,
      keyAdvantage: 'Best value, American heritage brand',
      bestFor: 'Budget-friendly performance',
      priceTier: 'budget' as const,
      madeIn: 'China',
    },

    // CUISINART 7 QT
    {
      name: 'Cuisinart 7 Qt',
      brand: 'Cuisinart',
      affiliateLink: 'https://amzn.to/47uTQkE',

      // Dutch oven-specific fields
      capacity: '7 Qt',
      weight: '17 lbs',
      dimensions: '13" diameter x 6.2" tall',
      ovenSafe: 'Stovetop, broiler, oven safe',
      interior: 'Porcelain enamel',
      lidDesign: 'Traditional domed lid',
      handleDesign: 'Wide cast iron handles',

      // Universal fields
      durability: '15-25+ years',
      warranty: 'Lifetime (manufacturer)',
      proUse: 'limited' as const,
      keyAdvantage: 'ATK Best Buy, great mid-range value',
      bestFor: 'Mid-range value',
      priceTier: 'mid-range' as const,
      madeIn: 'China',
    }
  ],

  highlightedProduct: 'Le Creuset 7.25 Qt',

  // Table context
  title: 'Compare Dutch Ovens',
  subtitle: 'See how the Le Creuset 7.25 Qt stacks up against top competitors',

  // Define which fields to compare and their display labels
  comparisonRows: [
    // Category-specific fields
    { label: 'Capacity', field: 'capacity' },
    { label: 'Weight', field: 'weight' },
    { label: 'Dimensions', field: 'dimensions' },
    { label: 'Oven Safe', field: 'ovenSafe' },
    { label: 'Interior Enamel', field: 'interior' },
    { label: 'Lid Design', field: 'lidDesign' },
    { label: 'Handle Design', field: 'handleDesign' },
    // Universal fields
    { label: 'Durability', field: 'durability' },
    { label: 'Warranty', field: 'warranty' },
    { label: 'Professional Use', field: 'proUse', format: 'proUse' },
    { label: 'Key Advantage', field: 'keyAdvantage' },
    { label: 'Best For', field: 'bestFor' },
    { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    { label: 'Made In', field: 'madeIn' },
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
