/**
 * Paring Knife Comparison Data for Victorinox 4-Inch Review
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch paring knife comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getParingKnifeComparison() {
  // Fetch all 3 paring knife products from database
  const products = await getProductsBySlugs([
    'victorinox-4-inch-paring-knife',
    'wusthof-classic-4-inch-paring-knife',
    'mercer-genesis-3-5-inch-paring-knife'
  ])

  const comparisonProducts = [
    // VICTORINOX 4-INCH - The Featured Product
    {
      name: 'Victorinox 4"',
      brand: 'Victorinox',
      affiliateLink: products.find(p => p.slug === 'victorinox-4-inch-paring-knife')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'victorinox-4-inch-paring-knife')!)
        : '#',

      priceRange: '$10-15',
      bladeMaterial: 'High-carbon stainless',
      handleMaterial: 'Fibrox (slip-resistant)',
      origin: 'Switzerland',
      sharpness: '★★★★★',
      edgeRetention: '★★★★★',
      ergonomics: '★★★★★',
      professionalRating: '★★★★★',
      warranty: 'Lifetime',
      bestFor: 'Best value - pro quality at budget price',
    },

    // WÜSTHOF 4" PARING
    {
      name: 'Wüsthof 4"',
      brand: 'Wüsthof',
      affiliateLink: products.find(p => p.slug === 'wusthof-classic-4-inch-paring-knife')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'wusthof-classic-4-inch-paring-knife')!)
        : '#',

      priceRange: '$35-50',
      bladeMaterial: 'High-carbon stainless',
      handleMaterial: 'POM (Polyoxymethylene)',
      origin: 'Germany',
      sharpness: '★★★★★',
      edgeRetention: '★★★★★',
      ergonomics: '★★★★☆',
      professionalRating: '★★★★★',
      warranty: 'Lifetime',
      bestFor: 'Premium feel, slightly heavier',
    },

    // MERCER 3.5" PARING
    {
      name: 'Mercer 3.5"',
      brand: 'Mercer',
      affiliateLink: products.find(p => p.slug === 'mercer-genesis-3-5-inch-paring-knife')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'mercer-genesis-3-5-inch-paring-knife')!)
        : '#',

      priceRange: '$8-12',
      bladeMaterial: 'High-carbon Japanese steel',
      handleMaterial: 'Santoprene',
      origin: 'Taiwan',
      sharpness: '★★★★☆',
      edgeRetention: '★★★★☆',
      ergonomics: '★★★★☆',
      professionalRating: '★★★★☆',
      warranty: 'Limited lifetime',
      bestFor: 'Budget option, good performance',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Victorinox 4"',
    title: 'Paring Knife Comparison: How Victorinox Stacks Up',
    subtitle: 'See how the Victorinox 4" compares to popular alternatives',
    comparisonRows: [
      { label: 'Price Range', field: 'priceRange' },
      { label: 'Blade Material', field: 'bladeMaterial' },
      { label: 'Handle Material', field: 'handleMaterial' },
      { label: 'Country of Origin', field: 'origin' },
      { label: 'Out-of-Box Sharpness', field: 'sharpness' },
      { label: 'Edge Retention', field: 'edgeRetention' },
      { label: 'Ergonomics', field: 'ergonomics' },
      { label: 'Professional Use Rating', field: 'professionalRating' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
    ],
    trustMessage: 'The Victorinox delivers 95% of the Wüsthof\'s performance at 25% of the price. The Wüsthof feels slightly more premium in hand, but for precision cutting tasks, I can\'t tell the difference. The Mercer is a solid budget alternative, but the Victorinox\'s superior edge retention and ergonomics make it worth the small price difference.',
  }
}
