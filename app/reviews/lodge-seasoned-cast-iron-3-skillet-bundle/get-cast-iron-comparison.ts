/**
 * Cast Iron 3-Piece Set Comparison Data
 * Only three brands offer complete 8", 10", 12" skillet sets on Amazon
 */

export function getCastIronComparison() {
  const comparisonProducts = [
    {
      name: 'Lodge 3-Skillet Set',
      brand: 'Lodge',
      affiliateLink: 'https://amzn.to/4qwcAaV',
      madeIn: '🇺🇸 Tennessee, USA',
      durability: '20+ years',
      proUse: 'standard' as const,
      preSeasoning: 'Vegetable oil (proven)',
      construction: 'Thickest/heaviest',
      warranty: 'Limited lifetime',
      bestFor: 'Serious cooks, investment buyers',
    },
    {
      name: 'Utopia Kitchen Set',
      brand: 'Utopia Kitchen',
      affiliateLink: 'https://amzn.to/3KxBF4X',
      madeIn: 'China',
      durability: '10-15 years',
      proUse: 'home-only' as const,
      preSeasoning: 'Vegetable (basic)',
      construction: 'Thinnest/lightest',
      warranty: '1 year',
      bestFor: 'Extreme budget',
    },
    {
      name: 'Cuisinel Set',
      brand: 'Cuisinel',
      affiliateLink: 'https://amzn.to/4pIWdGO',
      madeIn: 'China',
      durability: '10-15 years',
      proUse: 'home-only' as const,
      preSeasoning: 'Vegetable (multi-layer)',
      construction: 'Medium',
      warranty: 'Limited lifetime',
      bestFor: 'Beginners (includes handle covers)',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Lodge 3-Skillet Set',
    title: 'Cast Iron 3-Piece Set Comparison',
    subtitle: 'Only three brands offer complete 8", 10", 12" skillet sets on Amazon. Here\'s how they compare after professional testing.',
    comparisonRows: [
      { label: 'Made In', field: 'madeIn' },
      { label: 'Durability', field: 'durability' },
      { label: 'Professional Use', field: 'proUse', format: 'proUse' },
      { label: 'Pre-Seasoning', field: 'preSeasoning' },
      { label: 'Construction', field: 'construction' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
    ],
    trustMessage: 'This comparison is based on 7 years of home testing and 24 years of professional kitchen experience. Lodge costs $10-30 more but lasts 2x longer—that\'s actually cheaper per year of use.',
  }
}
