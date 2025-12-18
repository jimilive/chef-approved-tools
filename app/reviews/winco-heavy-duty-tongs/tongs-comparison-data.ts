/**
 * Tongs Comparison Data for Winco UT-12 Review
 * Research completed: December 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch tongs comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getTongsComparison() {
  // Fetch all 4 tongs products from database
  const products = await getProductsBySlugs([
    'winco-heavy-duty-tongs',
    'oxo-good-grips-12-inch-tongs',
    'edlund-4412hdl-heavy-duty-tongs',
    'kitchenaid-12-inch-stainless-tongs'
  ])

  // Map database products to comparison table structure
  const comparisonProducts = [
    // WINCO UT-12 - The Featured Product
    {
      name: 'Winco UT-12 12"',
      brand: 'Winco',
      affiliateLink: products.find(p => p.slug === 'winco-heavy-duty-tongs')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'winco-heavy-duty-tongs')!)
        : '#',
      material: '0.9mm stainless steel',
      springType: 'Coiled spring',
      lockingMechanism: '❌ None',
      handleType: 'Bare stainless',
      scallopedEdges: '✅ Yes',
      nsfApproved: '✅ Yes',
      dishwasherSafe: '✅ Yes',
      madeIn: 'Import',
      proKitchenUse: '✅ Industry standard',
      replaceableParts: '❌ No',
      expectedLifespan: '5+ years',
      warranty: 'Standard',
      bestFor: 'Pro kitchens, value seekers',
    },

    // OXO GOOD GRIPS
    {
      name: 'OXO Good Grips 12"',
      brand: 'OXO',
      affiliateLink: products.find(p => p.slug === 'oxo-good-grips-12-inch-tongs')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'oxo-good-grips-12-inch-tongs')!)
        : '#',
      material: 'Brushed stainless steel',
      springType: 'Internal spring',
      lockingMechanism: '✅ Pull-tab',
      handleType: 'Soft silicone grip',
      scallopedEdges: '✅ Yes',
      nsfApproved: '❌ No',
      dishwasherSafe: '✅ Yes',
      madeIn: 'Import',
      proKitchenUse: '✅ Some kitchens',
      replaceableParts: '❌ No',
      expectedLifespan: '5+ years',
      warranty: 'Satisfaction guarantee',
      bestFor: 'Home chef comfort',
    },

    // EDLUND 4412HDL
    {
      name: 'Edlund 4412HDL 12"',
      brand: 'Edlund',
      affiliateLink: products.find(p => p.slug === 'edlund-4412hdl-heavy-duty-tongs')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'edlund-4412hdl-heavy-duty-tongs')!)
        : '#',
      material: 'Heavy-gauge stainless steel',
      springType: 'Flat spring (replaceable)',
      lockingMechanism: '✅ Two-position',
      handleType: 'Bare stainless',
      scallopedEdges: '✅ Yes',
      nsfApproved: '✅ Yes',
      dishwasherSafe: '✅ Yes',
      madeIn: 'Vermont, USA 🇺🇸',
      proKitchenUse: '✅ Industry standard',
      replaceableParts: '✅ Yes (spring)',
      expectedLifespan: '10+ years',
      warranty: 'Commercial + parts',
      bestFor: 'High-volume commercial',
    },

    // KITCHENAID
    {
      name: 'KitchenAid 12"',
      brand: 'KitchenAid',
      affiliateLink: products.find(p => p.slug === 'kitchenaid-12-inch-stainless-tongs')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'kitchenaid-12-inch-stainless-tongs')!)
        : '#',
      material: '430 stainless steel',
      springType: 'Internal spring',
      lockingMechanism: '✅ Pull-tab',
      handleType: 'Ergonomic stainless',
      scallopedEdges: '✅ Yes',
      nsfApproved: '❌ No',
      dishwasherSafe: '✅ Yes',
      madeIn: 'Import',
      proKitchenUse: '⚠️ Home use mainly',
      replaceableParts: '❌ No',
      expectedLifespan: '5+ years',
      warranty: 'Lifetime',
      bestFor: 'Brand-conscious home cooks',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Winco UT-12 12"',
    title: 'Compare 12" Kitchen Tongs',
    subtitle: 'See how the Winco stacks up against top competitors',
    comparisonRows: [
      { label: 'Material', field: 'material' },
      { label: 'Spring Type', field: 'springType' },
      { label: 'Locking Mechanism', field: 'lockingMechanism' },
      { label: 'Handle Type', field: 'handleType' },
      { label: 'Scalloped Edges', field: 'scallopedEdges' },
      { label: 'NSF Approved', field: 'nsfApproved' },
      { label: 'Dishwasher Safe', field: 'dishwasherSafe' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Pro Kitchen Use', field: 'proKitchenUse' },
      { label: 'Replaceable Parts', field: 'replaceableParts' },
      { label: 'Expected Lifespan', field: 'expectedLifespan' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
    ],
  }
}

// Key differentiators (for reference)
export const keyDifferentiators = {
  winco: 'Restaurant industry standard, 0.9mm heavyweight steel, coiled spring never breaks, NSF approved, incredible value (pro quality under $10).',
  oxo: 'America\'s Test Kitchen winner, soft silicone handles with thumb rests, pressure-absorbing grips, best comfort for home cooks.',
  edlund: 'Made in Vermont USA, replaceable flat springs = 10+ year lifespan, two-position locking, "gold standard" commercial durability.',
  kitchenaid: 'Lifetime warranty, brand recognition, aesthetic appeal, good for home kitchens matching KitchenAid appliances.',
}
