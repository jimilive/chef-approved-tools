/**
 * Stand Mixer Comparison Data for KitchenAid Professional 600 Review
 * Research completed: November 21, 2025
 * Research time: 3 hours
 * Sources: America's Test Kitchen, iFixit, KitchenAid.com, Bosch.com, Consumer Reports
 *
 * NOTE: Pro 600 discontinued 2023, replaced by KSM55/KSM60/KSM70 series
 */

export const kitchenaidPro600ComparisonData = {
  products: [
    // PRODUCT 1: KITCHENAID PROFESSIONAL 600 (Featured Product - Discontinued)
    {
      name: 'Professional 600',
      brand: 'KitchenAid',
      affiliateLink: 'https://www.dpbolvw.net/click-101557027-14071349?url=https%3A%2F%2Fwww.kitchenaid.com%2Fcountertop-appliances%2Fstand-mixers%2Fbowl-lift-stand-mixers%2Fp.kitchenaid-5-5-quart-bowl-lift-stand-mixer.KSM55SXXXBM.html', // Links to KSM55 replacement

      // Stand mixer-specific fields
      motorPower: '575 watts',
      bowlCapacity: '6 quarts',
      speedSettings: '10 speeds',
      design: 'Bowl-lift',
      gearbox: 'Worm-follower (old design)',
      weight: '29 lbs',
      touchpoints: '67 planetary',
      pouringShield: 'Yes (included)',
      madeIn: 'USA',

      // Universal fields
      performance: 5,
      durability: '18+ years proven',
      warranty: '1 year limited',
      proUse: 'limited',
      bestFor: 'Proven reliability, traditional design',
      priceTier: 'premium',
    },

    // PRODUCT 2: KITCHENAID KSM55 (5.5 Quart - Modern Replacement)
    {
      name: 'KSM55 (5.5 Qt)',
      brand: 'KitchenAid',
      affiliateLink: 'https://www.dpbolvw.net/click-101557027-14071349?url=https%3A%2F%2Fwww.kitchenaid.com%2Fcountertop-appliances%2Fstand-mixers%2Fbowl-lift-stand-mixers%2Fp.kitchenaid-5-5-quart-bowl-lift-stand-mixer.KSM55SXXXBM.html',

      motorPower: '500 watts (new design)',
      bowlCapacity: '5.5 quarts',
      speedSettings: '11 speeds (+ 1/2 speed)',
      design: 'Bowl-lift',
      gearbox: 'Dual planetary (new)',
      weight: '~25 lbs',
      touchpoints: '67 planetary',
      pouringShield: 'No (sold separately)',
      madeIn: 'USA',

      performance: 5,
      durability: '10-20+ years expected',
      warranty: '1 year limited',
      proUse: 'limited',
      bestFor: 'Modern engineering, quieter operation',
      priceTier: 'premium',
    },

    // PRODUCT 3: KITCHENAID KSM70 (7.0 Quart - Larger Replacement)
    {
      name: 'KSM70 (7.0 Qt)',
      brand: 'KitchenAid',
      affiliateLink: 'https://www.dpbolvw.net/click-101557027-14071349?url=https%3A%2F%2Fwww.kitchenaid.com%2Fcountertop-appliances%2Fstand-mixers%2Fbowl-lift-stand-mixers%2Fp.7-quart-bowl-lift-stand-mixer-with-redesigned-premium-touchpoints.KSM70SNDXBM.html',

      motorPower: '500 watts (new design)',
      bowlCapacity: '7 quarts',
      speedSettings: '11 speeds (+ 1/2 speed)',
      design: 'Bowl-lift',
      gearbox: 'Dual planetary (new)',
      weight: '~28 lbs',
      touchpoints: '67 planetary',
      pouringShield: 'Yes (included)',
      madeIn: 'USA',

      performance: 5,
      durability: '10-20+ years expected',
      warranty: '1 year limited',
      proUse: 'limited',
      bestFor: 'Large batches, modern engineering',
      priceTier: 'premium',
    },

    // PRODUCT 4: BOSCH UNIVERSAL PLUS (No Kneading Restrictions)
    {
      name: 'Universal Plus',
      brand: 'Bosch',
      affiliateLink: 'https://amzn.to/47W2WqP',

      motorPower: '500 watts (belt-driven)',
      bowlCapacity: '6.5 quarts',
      speedSettings: '4 speeds + Pulse',
      design: 'Bottom-drive',
      gearbox: 'Belt-driven',
      weight: '19 lbs',
      touchpoints: 'N/A (bottom-drive)',
      pouringShield: 'Yes (open-top design)',
      madeIn: 'Germany',

      performance: 5,
      durability: '15-30+ years proven',
      warranty: '1 year limited',
      proUse: 'standard',
      bestFor: 'Bread bakers, no kneading restrictions',
      priceTier: 'premium',
    },
  ],

  // Specify which product to highlight
  highlightedProduct: 'Professional 600',

  // Define which fields to compare and their display labels
  comparisonRows: [
    { label: 'Motor Power', field: 'motorPower' },
    { label: 'Bowl Capacity', field: 'bowlCapacity' },
    { label: 'Speed Settings', field: 'speedSettings' },
    { label: 'Design', field: 'design' },
    { label: 'Gearbox', field: 'gearbox' },
    { label: 'Weight', field: 'weight' },
    { label: 'Touchpoints', field: 'touchpoints' },
    { label: 'Pouring Shield', field: 'pouringShield' },
    { label: 'Performance', field: 'performance', format: 'stars' },
    { label: 'Durability', field: 'durability' },
    { label: 'Warranty', field: 'warranty' },
    { label: 'Professional Use', field: 'proUse', format: 'proUse' },
    { label: 'Best For', field: 'bestFor' },
    { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    { label: 'Made In', field: 'madeIn' },
  ],

  // Research documentation
  researchNotes: {
    date: 'November 21, 2025',
    researchTime: '3 hours',
    sources: [
      'iFixit Technical Documentation (KitchenAid 2023 redesign)',
      'America\'s Test Kitchen (KitchenAid restrictions)',
      'KitchenAid.com Official Specs',
      'Bosch Official Product Page',
      'Consumer Reports',
      'Professional baker reviews (That Sourdough Gal, Amy Bakes Bread)',
    ],
    keyFindings: [
      'Pro 600 discontinued 2023, replaced by KSM55/KSM60/KSM70',
      'New KSM models have dual planetary gearbox (quieter, mechanically affixed planetary)',
      'ALL KitchenAid models subject to speed 2 kneading restriction',
      'Bosch Universal Plus has NO kneading restrictions - major differentiator',
      'iFixit reports new gearbox design having some early failures under heavy use',
      'Pro 600 has 18+ year proven track record vs new models unproven long-term',
    ],
    uncertainties: [
      'Pro 600 only available refurbished - hard to find new units',
      'Long-term durability of new KSM55/KSM70 gearbox design unknown',
    ],
  },
}
