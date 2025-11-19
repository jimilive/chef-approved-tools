/**
 * Toaster Oven Comparison Data for Black+Decker TO1785SG Review
 * Research completed: November 4, 2025
 * Sources: Good Housekeeping, Food Network, Consumer Reports, ConsumerAffairs
 */

export const toasterOvenComparisonData = {
  products: [
    // BLACK+DECKER TO1785SG - The Featured Product
    {
      name: 'TO1785SG',
      brand: 'BLACK+DECKER',
      affiliateLink: 'https://amzn.to/placeholder', // Will be replaced with live link from Supabase
      material: 'Stainless steel',
      performance: 3, // ⭐⭐⭐
      durability: '1-2 years',
      warranty: '2 years',
      proUse: 'home-only' as const,
      functions: '5',
      power: 'Not specified',
      capacity: '4 slice / 9" pizza',
      timer: '30 min',
      interiorLight: '❌ No',
      bestFor: 'Extreme budget',
      priceTier: 'budget' as const,
    },

    // HAMILTON BEACH SURE-CRISP 31403
    {
      name: 'Sure-Crisp 31403',
      brand: 'Hamilton Beach',
      affiliateLink: 'https://amzn.to/4oSmDWu', // Will be replaced with live link from Supabase
      material: 'Stainless steel',
      performance: 4, // ⭐⭐⭐⭐
      durability: '2-3 years',
      warranty: '1 year',
      proUse: 'some' as const,
      functions: '4',
      power: 'Not specified',
      capacity: '4 slice / 9" pizza',
      timer: '30 min',
      interiorLight: '❌ No',
      bestFor: 'Budget air frying',
      priceTier: 'budget' as const,
    },

    // CUISINART TOA-70
    {
      name: 'TOA-70',
      brand: 'Cuisinart',
      affiliateLink: 'https://amzn.to/4o2YpYc', // Will be replaced with live link from Supabase
      material: 'Brushed stainless',
      performance: 4, // ⭐⭐⭐⭐
      durability: '4-6 years',
      warranty: '3 years',
      proUse: 'home-only' as const,
      functions: '8',
      power: '1800W',
      capacity: '6 slice / 12" pizza',
      timer: '60 min',
      interiorLight: '✅ Yes',
      bestFor: 'Multi-function versatility',
      priceTier: 'premium' as const,
    },

    // COSORI SMART 12-IN-1
    {
      name: 'Smart 12-in-1',
      brand: 'COSORI',
      affiliateLink: 'https://amzn.to/4ictKXa', // Will be replaced with live link from Supabase
      material: 'Stainless steel',
      performance: 5, // ⭐⭐⭐⭐⭐
      durability: '3-4 years',
      warranty: '1 year (+1 registration)',
      proUse: 'some' as const,
      functions: '12',
      power: '1800W',
      capacity: '6 slice / 12" pizza',
      timer: 'Digital precision',
      interiorLight: '✅ Yes',
      bestFor: 'Maximum versatility',
      priceTier: 'premium' as const,
    },
  ],

  highlightedProduct: 'TO1785SG', // Which product to highlight with orange border

  // Additional context for the comparison section
  title: 'Compare Air Fryer Toaster Ovens',
  subtitle: 'See how the Black+Decker TO1785SG stacks up against top competitors',

  comparisonRows: [
    { label: 'Material', field: 'material' },
    { label: 'Performance', field: 'performance', format: 'stars' },
    { label: 'Expected Lifespan', field: 'durability' },
    { label: 'Warranty', field: 'warranty' },
    { label: 'Pro Kitchen Use', field: 'proUse', format: 'proUse' },
    { label: 'Functions', field: 'functions' },
    { label: 'Power', field: 'power' },
    { label: 'Capacity', field: 'capacity' },
    { label: 'Timer', field: 'timer' },
    { label: 'Interior Light', field: 'interiorLight' },
    { label: 'Best For', field: 'bestFor' },
    { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
  ],
}
