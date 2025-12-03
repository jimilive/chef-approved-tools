/**
 * John Boos Cutting Board Comparison Data
 * Comparing John Boos Platinum Commercial vs Teakhaus, Shun Hinoki, and Boardsmith
 * Research Date: December 2, 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch John Boos cutting board comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getJohnBoosComparison() {
  // Fetch all cutting board products from database
  const products = await getProductsBySlugs([
    'john-boos-platinum-commercial-cutting-board',
    'teakhaus-edge-grain-cutting-board',
    'shun-hinoki-cutting-board',
    'boardsmith-maple-carolina-slab'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    {
      name: 'John Boos R2418',
      brand: 'John Boos',
      affiliateLink: products.find(p => p.slug === 'john-boos-platinum-commercial-cutting-board')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'john-boos-platinum-commercial-cutting-board')!)
        : 'https://amzn.to/4pNOIy9',
      material: 'Hard Maple (1,450 Janka)',
      grainType: 'Edge Grain',
      durability: '10-20+ years',
      proUse: 'standard' as const,
      maintenance: 'High (frequent oil)',
      weight: '21 lbs',
      thickness: '1.75"',
      knifeFriendly: 'Harder on edges',
      madeIn: '🇺🇸 USA (Illinois)',
      brandEst: '1887',
      certification: 'NSF',
      bestFor: 'Restaurant pros, heavy-duty',
    },
    {
      name: 'Teakhaus 24×18',
      brand: 'Teakhaus',
      affiliateLink: products.find(p => p.slug === 'teakhaus-edge-grain-cutting-board')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'teakhaus-edge-grain-cutting-board')!)
        : 'https://amzn.to/3KbuWxz',
      material: 'Teak (1,100 Janka)',
      grainType: 'Edge Grain',
      durability: '10-15 years',
      proUse: 'some' as const,
      maintenance: 'Low (occasional oil)',
      weight: '14 lbs',
      thickness: '1.5"',
      knifeFriendly: 'Moderate',
      madeIn: '🇲🇽 Mexico',
      brandEst: '2000s',
      certification: 'None',
      bestFor: 'Low-maintenance, eco-conscious',
    },
    {
      name: 'Shun Hinoki Large',
      brand: 'Shun',
      affiliateLink: products.find(p => p.slug === 'shun-hinoki-cutting-board')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'shun-hinoki-cutting-board')!)
        : 'https://amzn.to/44F9Car',
      material: 'Hinoki Cypress (500-800 Janka)',
      grainType: 'Edge Grain',
      durability: '5-15 years',
      proUse: 'sushi-only' as const,
      maintenance: 'Low (dampen before use)',
      weight: '2 lbs',
      thickness: '0.75"',
      knifeFriendly: 'Gentlest on edges',
      madeIn: '🇯🇵 Japan',
      brandEst: '1908 (Kai Corp)',
      certification: 'None',
      bestFor: 'Japanese knife owners',
    },
    {
      name: 'Boardsmith Carolina Slab',
      brand: 'Boardsmith',
      affiliateLink: 'https://theboardsmith.com/products/edge-grain-cutting-board',
      material: 'Hard Maple',
      grainType: 'End Grain',
      durability: '15-20+ years',
      proUse: 'home-only' as const,
      maintenance: 'High (frequent oil)',
      weight: '18-20 lbs',
      thickness: '2"',
      knifeFriendly: 'Gentle (end grain)',
      madeIn: '🇺🇸 USA (Texas)',
      brandEst: '2010s',
      certification: 'None',
      bestFor: 'Knife enthusiasts',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'John Boos R2418',
    title: 'Wood Cutting Board Comparison',
    subtitle: 'Comparing commercial maple vs low-maintenance teak, Japanese hinoki, and artisan end grain boards.',
    comparisonRows: [
      { label: 'Material', field: 'material' },
      { label: 'Grain Type', field: 'grainType' },
      { label: 'Durability', field: 'durability' },
      { label: 'Professional Use', field: 'proUse', format: 'proUse' },
      { label: 'Maintenance', field: 'maintenance' },
      { label: 'Weight', field: 'weight' },
      { label: 'Thickness', field: 'thickness' },
      { label: 'Knife Impact', field: 'knifeFriendly' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Brand Est.', field: 'brandEst' },
      { label: 'Certification', field: 'certification' },
      { label: 'Best For', field: 'bestFor' },
    ],
    trustMessage: 'This comparison is based on professional kitchen experience and extensive research. John Boos boards are the industry standard for commercial use, but your best choice depends on your priorities: durability vs maintenance vs knife edge preservation.',
  }
}
