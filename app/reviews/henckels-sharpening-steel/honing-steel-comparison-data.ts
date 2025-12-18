/**
 * Honing Steel Comparison Data for Henckels 9" Review
 * Research completed: December 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch honing steel comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getHoningSteelComparison() {
  // Fetch all 4 honing steel products from database
  const products = await getProductsBySlugs([
    'henckels-sharpening-steel',
    'wusthof-9-inch-honing-steel',
    'zwilling-9-inch-sharpening-steel',
    'idahone-ceramic-12-inch-honing-rod'
  ])

  // Map database products to comparison table structure
  const comparisonProducts = [
    // HENCKELS 9" - The Featured Product
    {
      name: 'Henckels 9" Steel',
      brand: 'Henckels',
      affiliateLink: products.find(p => p.slug === 'henckels-sharpening-steel')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'henckels-sharpening-steel')!)
        : '#',
      material: 'Stainless steel',
      rodLength: '9 inches',
      construction: 'Fine-edge grooved',
      handle: 'Ergonomic composite',
      durability: '10+ years',
      professionalUse: 'Home-focused',
      bestFor: 'Budget German quality',
      madeIn: 'Germany/China',
      warranty: 'Lifetime',
      atkRating: 'Not tested',
    },

    // WUSTHOF 9"
    {
      name: 'Wusthof 9" Steel',
      brand: 'Wusthof',
      affiliateLink: products.find(p => p.slug === 'wusthof-9-inch-honing-steel')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'wusthof-9-inch-honing-steel')!)
        : '#',
      material: 'German stainless',
      rodLength: '9 inches',
      construction: 'Precision-forged, magnetic',
      handle: 'Black composite',
      durability: '15-20+ years',
      professionalUse: '✅ Some pros',
      bestFor: 'Premium German steel',
      madeIn: 'Solingen, Germany 🇩🇪',
      warranty: 'Lifetime',
      atkRating: 'Not tested',
    },

    // ZWILLING 9"
    {
      name: 'ZWILLING 9" Steel',
      brand: 'ZWILLING',
      affiliateLink: products.find(p => p.slug === 'zwilling-9-inch-sharpening-steel')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'zwilling-9-inch-sharpening-steel')!)
        : '#',
      material: 'Steel alloy',
      rodLength: '9 inches',
      construction: 'Hard steel alloy',
      handle: 'Black poly w/ finger guard',
      durability: '10-15+ years',
      professionalUse: 'Home + enthusiast',
      bestFor: 'ZWILLING knife owners',
      madeIn: 'Germany 🇩🇪',
      warranty: 'Lifetime',
      atkRating: 'Not tested',
    },

    // IDAHONE CERAMIC 12"
    {
      name: 'Idahone Ceramic 12"',
      brand: 'Idahone',
      affiliateLink: products.find(p => p.slug === 'idahone-ceramic-12-inch-honing-rod')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'idahone-ceramic-12-inch-honing-rod')!)
        : '#',
      material: 'High-alumina ceramic',
      rodLength: '12 inches',
      construction: 'Near-diamond hardness',
      handle: 'Pakkawood',
      durability: '10-15+ years',
      professionalUse: '✅ Japanese knife owners',
      bestFor: 'Japanese knives',
      madeIn: 'USA 🇺🇸',
      warranty: 'Limited',
      atkRating: 'Best Buy',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Henckels 9" Steel',
    title: 'Compare Honing Steels',
    subtitle: 'See how the Henckels stacks up against top competitors',
    comparisonRows: [
      { label: 'Material', field: 'material' },
      { label: 'Rod Length', field: 'rodLength' },
      { label: 'Construction', field: 'construction' },
      { label: 'Handle', field: 'handle' },
      { label: 'Durability', field: 'durability' },
      { label: 'Professional Use', field: 'professionalUse' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'ATK Rating', field: 'atkRating' },
    ],
  }
}

// Key differentiators (for reference)
export const keyDifferentiators = {
  wusthof: 'True Solingen designation = highest German quality standard. Magnetic steel attracts metal filings during honing. Heavier professional feel. 7 generations of family knife-making expertise.',
  zwilling: 'Premium line from same parent company as Henckels (Zwilling J.A. Henckels). Higher quality materials than Henckels value line. 4.7/5 rating. Perfect upgrade for those already owning ZWILLING knives.',
  idahone: 'America\'s Test Kitchen "Best Buy" winner. Near-diamond hardness (9.5 on Mohs scale). Gentler on expensive Japanese knives than steel rods. USA-made, handcrafted quality.',
}
