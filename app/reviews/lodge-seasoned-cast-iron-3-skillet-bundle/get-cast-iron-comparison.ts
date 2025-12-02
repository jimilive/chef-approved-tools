/**
 * Cast Iron 3-Piece Set Comparison Data
 * Only three brands offer complete 8", 10", 12" skillet sets on Amazon
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch cast iron comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getCastIronComparison() {
  // Fetch all 3 cast iron set products from database
  const products = await getProductsBySlugs([
    'lodge-seasoned-cast-iron-3-skillet-bundle',
    'utopia-kitchen-cast-iron-set',
    'cuisinel-cast-iron-set'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    {
      name: 'Lodge 3-Skillet Set',
      brand: 'Lodge',
      affiliateLink: products.find(p => p.slug === 'lodge-seasoned-cast-iron-3-skillet-bundle')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'lodge-seasoned-cast-iron-3-skillet-bundle')!)
        : '#',
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
      affiliateLink: products.find(p => p.slug === 'utopia-kitchen-cast-iron-set')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'utopia-kitchen-cast-iron-set')!)
        : '#',
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
      affiliateLink: products.find(p => p.slug === 'cuisinel-cast-iron-set')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'cuisinel-cast-iron-set')!)
        : '#',
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
