/**
 * Blender Comparison Data for Vitamix 5200 Review
 * Research completed: November 4, 2025
 * Sources: America's Test Kitchen, CNN Underscored, RTINGS, Consumer Reports
 */

export const blenderComparisonData = {
  products: [
    // VITAMIX 5200 - The Featured Product
    {
      name: 'Vitamix 5200',
      brand: 'Vitamix',
      affiliateLink: 'https://amzn.to/4qP2W3c',
      motorPower: '2 HP (1,380W)',
      capacity: '64 oz',
      performance: 5, // ⭐⭐⭐⭐⭐
      durability: '10-15+ years',
      warranty: '7 years full',
      proUse: 'standard' as const,
      controls: 'Analog variable speed dial (10 speeds)',
      height: '20.5" (tall)',
      madeIn: 'USA (Cleveland, OH)',
      bestFor: 'Professional results, durability, smoothest blends',
      priceTier: 'luxury' as const,
    },

    // BLENDTEC DESIGNER 725
    {
      name: 'Designer 725',
      brand: 'Blendtec',
      affiliateLink: 'https://amzn.to/3JkHbHJ',
      motorPower: '3.8 HP (1,725W)',
      capacity: '90 oz',
      performance: 5, // ⭐⭐⭐⭐⭐
      durability: '8-10+ years',
      warranty: '8 years',
      proUse: 'some' as const, // Used at Jamba Juice
      controls: 'Touchscreen (100 speeds + 6 presets)',
      height: '15.25" (fits cabinets)',
      madeIn: 'USA',
      bestFor: 'Max power, tech features, fits under cabinets',
      priceTier: 'luxury' as const,
    },

    // NINJA PROFESSIONAL PLUS
    {
      name: 'Professional Plus',
      brand: 'Ninja',
      affiliateLink: 'https://amzn.to/4ol99Ch',
      motorPower: '1,400W',
      capacity: '72 oz',
      performance: 4, // ⭐⭐⭐⭐
      durability: '2-3 years',
      warranty: '1 year',
      proUse: 'home-only' as const,
      controls: 'Auto-iQ preset programs',
      height: 'Standard',
      madeIn: 'China',
      bestFor: 'Budget-conscious, occasional use, basic smoothies',
      priceTier: 'mid-range' as const,
    },

    // KITCHENAID K400
    {
      name: 'K400',
      brand: 'KitchenAid',
      affiliateLink: 'https://amzn.to/3LqCWLc',
      motorPower: '1.5 HP (1,200W)',
      capacity: '56 oz',
      performance: 4, // ⭐⭐⭐⭐
      durability: '5-8 years',
      warranty: '5 years',
      proUse: 'limited' as const,
      controls: 'Dial + 3 presets (Ice Crush, Icy Drink, Smoothie)',
      height: 'Standard',
      madeIn: 'Not specified',
      bestFor: 'Style + mid-tier performance, KitchenAid ecosystem',
      priceTier: 'premium' as const,
    },
  ],

  highlightedProduct: 'Vitamix 5200', // Which product to highlight with orange border

  // Additional context for the comparison section
  title: 'Compare Professional Blenders',
  subtitle: 'See how the Vitamix 5200 stacks up against top competitors',

  // Define which fields to compare and their display labels
  comparisonRows: [
    { label: 'Motor Power', field: 'motorPower' },
    { label: 'Container Size', field: 'capacity' },
    { label: 'Performance', field: 'performance', format: 'stars' },
    { label: 'Expected Lifespan', field: 'durability' },
    { label: 'Warranty', field: 'warranty' },
    { label: 'Pro Kitchen Use', field: 'proUse', format: 'proUse' },
    { label: 'Controls', field: 'controls' },
    { label: 'Height', field: 'height' },
    { label: 'Made In', field: 'madeIn' },
    { label: 'Best For', field: 'bestFor' },
    { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
  ],

  // Research notes
  researchNotes: {
    date: 'November 4, 2025',
    sources: [
      'America\'s Test Kitchen Blender Testing 2024-2025',
      'CNN Underscored - Best Blenders 2025',
      'RTINGS.com - Side-by-side blender comparisons',
      'Consumer Reports - Ninja vs Vitamix',
      'Gear Patrol - Vitamix vs Blendtec',
    ],
    keyFindings: [
      'Vitamix 5200 is America\'s Test Kitchen winner',
      'Blendtec has more powerful motor but some users report chunks vs Vitamix smoothness',
      'Ninja is good value but motors burn out 2-3 years with daily use',
      'KitchenAid K400 offers good mid-tier performance with beautiful design',
      'Vitamix produces smoothest blends according to professional testing',
    ],
  },
}
