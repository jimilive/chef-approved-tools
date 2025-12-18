/**
 * Nonstick Pan Comparison Data for Cuisinart 8" Review
 * Research completed: December 2025
 *
 * *Cuisinart warranty requires $7-10 shipping fee for claims
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch nonstick pan comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getNonstickPanComparison() {
  // Fetch all 4 nonstick pan products from database
  const products = await getProductsBySlugs([
    'cuisinart-8-inch-nonstick-pan',
    't-fal-experience-8-inch-nonstick',
    'all-clad-d3-pro-8-inch-nonstick',
    'tramontina-tri-ply-base-8-inch-nonstick'
  ])

  // Map database products to comparison table structure
  const comparisonProducts = [
    // CUISINART 722-20NS - The Featured Product
    {
      name: 'Cuisinart 722-20NS 8"',
      brand: 'Cuisinart',
      affiliateLink: products.find(p => p.slug === 'cuisinart-8-inch-nonstick-pan')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'cuisinart-8-inch-nonstick-pan')!)
        : '#',
      construction: 'Tri-ply base (SS-Al-SS)',
      nonstickCoating: 'Quantanium® PTFE',
      inductionCompatible: '✅ Yes',
      ovenSafe: '500°F',
      expectedLifespan: '2-3 years',
      professionalGrade: 'Home use',
      madeIn: 'China',
      warranty: 'Lifetime*',
      bestFor: 'Budget + Induction',
    },

    // T-FAL EXPERIENCE 8"
    {
      name: 'T-fal Experience 8"',
      brand: 'T-fal',
      affiliateLink: products.find(p => p.slug === 't-fal-experience-8-inch-nonstick')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 't-fal-experience-8-inch-nonstick')!)
        : '#',
      construction: 'Heavy-gauge aluminum',
      nonstickCoating: 'ProGlide titanium PTFE',
      inductionCompatible: '✅ Yes',
      ovenSafe: '400°F',
      expectedLifespan: '2-4 years',
      professionalGrade: 'Home use',
      madeIn: 'Multiple',
      warranty: 'Limited lifetime',
      bestFor: 'Budget + Heat indicator',
    },

    // ALL-CLAD D3 PRO 8"
    {
      name: 'All-Clad D3 Pro 8"',
      brand: 'All-Clad',
      affiliateLink: products.find(p => p.slug === 'all-clad-d3-pro-8-inch-nonstick')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'all-clad-d3-pro-8-inch-nonstick')!)
        : '#',
      construction: 'Full tri-ply to rim',
      nonstickCoating: 'D3 Pro (30% tougher)',
      inductionCompatible: '✅ Yes',
      ovenSafe: '500°F',
      expectedLifespan: '4-6 years',
      professionalGrade: '✅ Professional',
      madeIn: 'USA 🇺🇸',
      warranty: 'Limited lifetime',
      bestFor: 'Serious cooks',
    },

    // TRAMONTINA TRI-PLY BASE 8"
    {
      name: 'Tramontina Tri-Ply 8"',
      brand: 'Tramontina',
      affiliateLink: products.find(p => p.slug === 'tramontina-tri-ply-base-8-inch-nonstick')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'tramontina-tri-ply-base-8-inch-nonstick')!)
        : '#',
      construction: '18/10 SS + tri-ply base',
      nonstickCoating: 'Reinforced PTFE',
      inductionCompatible: '✅ Yes',
      ovenSafe: '500°F',
      expectedLifespan: '3-5 years',
      professionalGrade: 'Home use',
      madeIn: 'Brazil 🇧🇷',
      warranty: 'Lifetime',
      bestFor: 'Quality at mid-price',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Cuisinart 722-20NS 8"',
    title: 'Compare 8" Nonstick Pans',
    subtitle: 'See how the Cuisinart stacks up against top competitors',
    comparisonRows: [
      { label: 'Construction', field: 'construction' },
      { label: 'Nonstick Coating', field: 'nonstickCoating' },
      { label: 'Induction Compatible', field: 'inductionCompatible' },
      { label: 'Oven Safe', field: 'ovenSafe' },
      { label: 'Expected Lifespan', field: 'expectedLifespan' },
      { label: 'Professional Grade', field: 'professionalGrade' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
    ],
  }
}

// Key differentiators (for reference)
export const keyDifferentiators = {
  tfal: 'Thermo-Spot heat indicator turns solid red when preheated - great for beginners',
  allClad: 'Made in USA, full tri-ply construction to rim (not just base), 30% better scratch resistance, longest lifespan',
  tramontina: 'Premium 18/10 stainless steel vessel (better than aluminum body competitors), Made in Brazil by established brand (since 1911)',
}
