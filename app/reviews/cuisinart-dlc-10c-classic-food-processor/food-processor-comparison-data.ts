/**
 * Food Processor Comparison Data for Cuisinart DLC-10SY Review
 * Research completed: December 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch food processor comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getFoodProcessorComparison() {
  // Fetch all 4 food processor products from database
  const products = await getProductsBySlugs([
    'cuisinart-dlc-10c-classic-food-processor',
    'kitchenaid-kfp0718-food-processor',
    'hamilton-beach-70725a-food-processor',
    'ninja-bn601-food-processor'
  ])

  // Map database products to comparison table structure
  const comparisonProducts = [
    // CUISINART DLC-10SY - The Featured Product
    {
      name: 'Cuisinart DLC-10SY 7-Cup',
      brand: 'Cuisinart',
      affiliateLink: products.find(p => p.slug === 'cuisinart-dlc-10c-classic-food-processor')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'cuisinart-dlc-10c-classic-food-processor')!)
        : '#',
      motorPower: '600W',
      capacity: '7 cups',
      durability: '15-30 years',
      warranty: '5yr motor / 3yr unit',
      feedTube: 'Extra-large',
      assembly: 'Twist-lock',
      weight: '14-16 lbs',
      noiseLevel: 'Very quiet',
      specialFeatures: 'Flat cover option',
      bestFor: 'Buy-it-for-life',
    },

    // KITCHENAID KFP0718
    {
      name: 'KitchenAid KFP0718 7-Cup',
      brand: 'KitchenAid',
      affiliateLink: products.find(p => p.slug === 'kitchenaid-kfp0718-food-processor')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'kitchenaid-kfp0718-food-processor')!)
        : '#',
      motorPower: '300W',
      capacity: '7 cups',
      durability: '3-7 years',
      warranty: '1 year',
      feedTube: 'Standard',
      assembly: 'One-click',
      weight: '10 lbs',
      noiseLevel: 'Moderate',
      specialFeatures: '3 speeds, colors',
      bestFor: 'KitchenAid fans',
    },

    // HAMILTON BEACH 70725A
    {
      name: 'Hamilton Beach 70725A 12-Cup',
      brand: 'Hamilton Beach',
      affiliateLink: products.find(p => p.slug === 'hamilton-beach-70725a-food-processor')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'hamilton-beach-70725a-food-processor')!)
        : '#',
      motorPower: '450W',
      capacity: '12 cups',
      durability: '3-5 years',
      warranty: '1 year',
      feedTube: 'Big Mouth',
      assembly: 'Stack & snap',
      weight: '8-10 lbs',
      noiseLevel: 'Moderate',
      specialFeatures: 'Sealed bowl, pour spout',
      bestFor: 'Budget + large batches',
    },

    // NINJA BN601
    {
      name: 'Ninja BN601 9-Cup',
      brand: 'Ninja',
      affiliateLink: products.find(p => p.slug === 'ninja-bn601-food-processor')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'ninja-bn601-food-processor')!)
        : '#',
      motorPower: '1000W (peak)',
      capacity: '9 cups',
      durability: '2-5 years',
      warranty: '1 year',
      feedTube: 'Standard',
      assembly: 'Twist-lock',
      weight: '7-8 lbs',
      noiseLevel: 'Very quiet',
      specialFeatures: 'Auto-iQ presets',
      bestFor: 'Power + convenience',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Cuisinart DLC-10SY 7-Cup',
    title: 'Compare Food Processors',
    subtitle: 'See how the Cuisinart stacks up against top competitors',
    comparisonRows: [
      { label: 'Motor Power', field: 'motorPower' },
      { label: 'Capacity', field: 'capacity' },
      { label: 'Durability', field: 'durability' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Feed Tube', field: 'feedTube' },
      { label: 'Assembly', field: 'assembly' },
      { label: 'Weight', field: 'weight' },
      { label: 'Noise Level', field: 'noiseLevel' },
      { label: 'Special Features', field: 'specialFeatures' },
      { label: 'Best For', field: 'bestFor' },
    ],
  }
}

// Key differentiators (for reference)
export const keyDifferentiators = {
  kitchenaid: 'One-click assembly, multiple color options to match stand mixers. BUT only 300W motor (half of Cuisinart) and bowls crack after 3-7 years. Style over substance.',
  hamiltonBeach: 'Budget king at $50-80. Sealed 12-cup bowl great for soups/liquids. Stack & snap assembly is easiest of all. Good value but 3-5 year lifespan.',
  ninja: 'Most powerful at 1000W peak. Auto-iQ presets for beginners. Compact footprint. BUT 2-5 year lifespan vs Cuisinart\'s 15-30 years.',
}
