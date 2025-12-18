/**
 * Boning Knife Comparison Data for Victorinox Granton 6" Review
 * Research completed: December 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch boning knife comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getBoningKnifeComparison() {
  // Fetch all 4 boning knife products from database
  const products = await getProductsBySlugs([
    'victorinox-granton-edge-boning-knife',
    'dexter-russell-1376pcp-boning-knife',
    'mercer-genesis-m20106-stiff-boning-knife',
    'dexter-russell-s116-6-sani-safe-boning-knife'
  ])

  // Map database products to comparison table structure
  const comparisonProducts = [
    // VICTORINOX GRANTON - The Featured Product
    {
      name: 'Victorinox Granton 6"',
      brand: 'Victorinox',
      affiliateLink: products.find(p => p.slug === 'victorinox-granton-edge-boning-knife')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'victorinox-granton-edge-boning-knife')!)
        : '#',
      bladeType: 'Curved Wide STIFF',
      grantonEdge: '✅ Yes',
      bladeMaterial: 'High-carbon SS',
      construction: 'Stamped',
      handleMaterial: 'Fibrox Pro',
      handleColor: 'Black',
      madeIn: 'Switzerland',
      nsfCertified: '✅ Yes',
      hardness: '~56 HRC',
      warranty: 'Lifetime',
      bestFor: 'Non-stick repetitive work',
    },

    // DEXTER RUSSELL 1376PCP TRADITIONAL
    {
      name: 'Dexter 1376PCP Traditional 6"',
      brand: 'Dexter Russell',
      affiliateLink: products.find(p => p.slug === 'dexter-russell-1376pcp-boning-knife')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'dexter-russell-1376pcp-boning-knife')!)
        : '#',
      bladeType: 'Wide STIFF',
      grantonEdge: '❌ No',
      bladeMaterial: 'High-carbon steel',
      construction: 'Traditional forged',
      handleMaterial: 'Beech wood',
      handleColor: 'Natural wood',
      madeIn: 'USA 🇺🇸',
      nsfCertified: '✅ Yes',
      hardness: '~56 HRC',
      warranty: 'Limited lifetime',
      bestFor: 'Traditional butchers',
    },

    // MERCER GENESIS M20106
    {
      name: 'Mercer Genesis M20106 6"',
      brand: 'Mercer Culinary',
      affiliateLink: products.find(p => p.slug === 'mercer-genesis-m20106-stiff-boning-knife')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'mercer-genesis-m20106-stiff-boning-knife')!)
        : '#',
      bladeType: 'Straight STIFF',
      grantonEdge: '❌ No',
      bladeMaterial: 'German X50CrMoV15',
      construction: 'Precision forged',
      handleMaterial: 'Santoprene',
      handleColor: 'Black',
      madeIn: 'Taiwan',
      nsfCertified: '✅ Yes',
      hardness: '56 HRC',
      warranty: 'Limited lifetime',
      bestFor: 'Culinary students',
    },

    // DEXTER RUSSELL S116-6 SANI-SAFE
    {
      name: 'Dexter Sani-Safe S116-6 6"',
      brand: 'Dexter Russell',
      affiliateLink: products.find(p => p.slug === 'dexter-russell-s116-6-sani-safe-boning-knife')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'dexter-russell-s116-6-sani-safe-boning-knife')!)
        : '#',
      bladeType: 'Curved STIFF',
      grantonEdge: '❌ No',
      bladeMaterial: 'High-carbon SS',
      construction: 'Stamped',
      handleMaterial: 'Polypropylene',
      handleColor: 'White',
      madeIn: 'USA 🇺🇸',
      nsfCertified: '✅ Yes',
      hardness: '~56 HRC',
      warranty: 'Limited lifetime',
      bestFor: 'Commercial/sanitary',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Victorinox Granton 6"',
    title: 'Compare 6" Boning Knives',
    subtitle: 'See how the Victorinox Granton stacks up against top competitors',
    comparisonRows: [
      { label: 'Blade Type', field: 'bladeType' },
      { label: 'Granton Edge', field: 'grantonEdge' },
      { label: 'Blade Material', field: 'bladeMaterial' },
      { label: 'Construction', field: 'construction' },
      { label: 'Handle Material', field: 'handleMaterial' },
      { label: 'Handle Color', field: 'handleColor' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'NSF Certified', field: 'nsfCertified' },
      { label: 'Hardness', field: 'hardness' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
    ],
  }
}

// Key differentiators (for reference)
export const keyDifferentiators = {
  victorinox: 'ONLY knife with Granton edge (prevents sticking), Swiss quality, Fibrox grip, best value for repetitive work.',
  dexterTraditional: 'American heritage since 1818, wood handle preferred by old-school butchers, high-carbon takes sharper edge.',
  mercer: 'Forged construction (better balance), culinary school standard, German steel at mid-range price.',
  dexterSaniSafe: 'White handle for HACCP compliance, textured non-slip grip, commercial kitchen standard.',
}
