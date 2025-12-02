/**
 * Stand Mixer Comparison Data for KitchenAid Professional 600 Review
 * Research completed: November 21, 2025
 * Research time: 3 hours
 * Sources: America's Test Kitchen, iFixit, KitchenAid.com, Bosch.com, Consumer Reports
 *
 * NOTE: Pro 600 discontinued 2023, replaced by KSM55/KSM60/KSM70 series
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch stand mixer comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getStandMixerComparison() {
  // Fetch all 4 stand mixer products from database
  const products = await getProductsBySlugs([
    'kitchenaid-kp26m1xlc-professional-600',
    'kitchenaid-ksm55-5-5-qt',
    'kitchenaid-ksm70-7-qt',
    'bosch-universal-plus'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    // PRODUCT 1: KITCHENAID PROFESSIONAL 600 (Featured Product - Discontinued)
    {
      name: 'Professional 600',
      brand: 'KitchenAid',
      affiliateLink: products.find(p => p.slug === 'kitchenaid-kp26m1xlc-professional-600')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'kitchenaid-kp26m1xlc-professional-600')!)
        : '#',

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
      proUse: 'limited' as const,
      keyAdvantage: 'Proven 18+ year track record',
      bestFor: 'Proven reliability, traditional design',
      priceTier: 'premium' as const,
    },

    // PRODUCT 2: KITCHENAID KSM55 (5.5 Quart - Modern Replacement)
    {
      name: 'KSM55 (5.5 Qt)',
      brand: 'KitchenAid',
      affiliateLink: products.find(p => p.slug === 'kitchenaid-ksm55-5-5-qt')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'kitchenaid-ksm55-5-5-qt')!)
        : '#',

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
      proUse: 'limited' as const,
      keyAdvantage: 'Quieter dual planetary gearbox',
      bestFor: 'Modern engineering, quieter operation',
      priceTier: 'premium' as const,
    },

    // PRODUCT 3: KITCHENAID KSM70 (7.0 Quart - Larger Replacement)
    {
      name: 'KSM70 (7.0 Qt)',
      brand: 'KitchenAid',
      affiliateLink: products.find(p => p.slug === 'kitchenaid-ksm70-7-qt')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'kitchenaid-ksm70-7-qt')!)
        : '#',

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
      proUse: 'limited' as const,
      keyAdvantage: 'Largest capacity, includes shield',
      bestFor: 'Large batches, modern engineering',
      priceTier: 'premium' as const,
    },

    // PRODUCT 4: BOSCH UNIVERSAL PLUS (No Kneading Restrictions)
    {
      name: 'Universal Plus',
      brand: 'Bosch',
      affiliateLink: products.find(p => p.slug === 'bosch-universal-plus')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'bosch-universal-plus')!)
        : '#',

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
      proUse: 'standard' as const,
      keyAdvantage: 'No kneading restrictions, lightest',
      bestFor: 'Bread bakers, no kneading restrictions',
      priceTier: 'premium' as const,
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Professional 600',
    title: 'Compare Stand Mixers',
    subtitle: 'See how the KitchenAid Professional 600 stacks up against top alternatives',
    comparisonRows: [
      // Category-specific fields
      { label: 'Motor Power', field: 'motorPower' },
      { label: 'Bowl Capacity', field: 'bowlCapacity' },
      { label: 'Speed Settings', field: 'speedSettings' },
      { label: 'Design', field: 'design' },
      { label: 'Gearbox', field: 'gearbox' },
      { label: 'Weight', field: 'weight' },
      { label: 'Touchpoints', field: 'touchpoints' },
      { label: 'Pouring Shield', field: 'pouringShield' },
      { label: 'Performance', field: 'performance', format: 'stars' },
      // Universal fields
      { label: 'Durability', field: 'durability' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Professional Use', field: 'proUse', format: 'proUse' },
      { label: 'Key Advantage', field: 'keyAdvantage' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
      { label: 'Made In', field: 'madeIn' },
    ],
  }
}

// Research documentation (kept for reference)
export const researchNotes = {
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
}
