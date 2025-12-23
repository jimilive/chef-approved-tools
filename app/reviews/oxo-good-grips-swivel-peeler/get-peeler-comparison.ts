import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch vegetable peeler comparison data
 * Returns the comparison table structure with live affiliate links
 *
 * Research Notes:
 * - OXO Good Grips Swivel: 7" x 1" x 1", Japanese stainless steel swivel blade, rubber handle, USA design/China made
 * - Kuhn Rikon Swiss: 4" x 2.5", carbon steel blade, plastic handle, Switzerland
 * - Spring Chef Premium: 7.5" x 1.5", stainless steel blade, rubber handle, lifetime warranty
 * - Swissmar Y-Peeler: Swiss-made, stainless steel scalpel blade, ergonomic handle
 */
export async function getPeelerComparison() {
  // Fetch OXO peeler from database for primary affiliate link
  const oxoProduct = await getProductBySlug('oxo-good-grips-swivel-peeler')

  // Map products to comparison table structure
  const comparisonProducts = [
    {
      name: 'Good Grips Swivel',
      brand: 'OXO',
      affiliateLink: oxoProduct
        ? getPrimaryAffiliateLink(oxoProduct)
        : 'https://amzn.to/3XXXXXXX',
      bladeType: 'Swivel (dual blade)',
      bladeMaterial: 'Japanese stainless steel',
      handleMaterial: 'Non-slip Santoprene rubber',
      dimensions: '7" x 1" x 1"',
      eyeRemover: '✅ Built-in',
      dishwasherSafe: '✅ Yes',
      handedness: 'Ambidextrous',
      madeIn: 'China',
      bestFor: 'Comfort, arthritis-friendly',
      priceTier: 'budget' as const,
    },
    {
      name: 'Original Swiss Peeler',
      brand: 'Kuhn Rikon',
      affiliateLink: 'https://amzn.to/4p13yAw',
      bladeType: 'Y-style (fixed)',
      bladeMaterial: 'Carbon steel',
      handleMaterial: 'Lightweight plastic',
      dimensions: '4" x 2.5" x 0.5"',
      eyeRemover: '✅ Built-in',
      dishwasherSafe: '⚠️ Hand wash recommended',
      handedness: 'Ambidextrous',
      madeIn: 'Switzerland',
      bestFor: 'Ultra-thin peels, precision',
      priceTier: 'budget' as const,
    },
    {
      name: 'Premium Swivel Peeler',
      brand: 'Spring Chef',
      affiliateLink: 'https://amzn.to/4pOr05o',
      bladeType: 'Swivel (dual blade)',
      bladeMaterial: 'Stainless steel',
      handleMaterial: 'Non-slip rubber',
      dimensions: '7.5" x 1.5"',
      eyeRemover: '✅ Built-in',
      dishwasherSafe: '✅ Yes',
      handedness: 'Ambidextrous',
      madeIn: 'China',
      bestFor: 'Value, everyday use',
      priceTier: 'budget' as const,
    },
    {
      name: 'Y-Peeler Scalpel Blade',
      brand: 'Swissmar',
      affiliateLink: 'https://amzn.to/4pS7XHs',
      bladeType: 'Y-style (fixed)',
      bladeMaterial: 'Stainless steel scalpel',
      handleMaterial: 'Ergonomic plastic',
      dimensions: '5" x 3"',
      eyeRemover: '✅ Side cutter',
      dishwasherSafe: '✅ Yes',
      handedness: 'Ambidextrous',
      madeIn: 'Switzerland',
      bestFor: 'Precision, Swiss quality',
      priceTier: 'budget' as const,
    }
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Good Grips Swivel',
    title: 'Compare Vegetable Peelers',
    subtitle: 'See how the OXO Good Grips stacks up against popular alternatives',
    comparisonRows: [
      { label: 'Blade Type', field: 'bladeType' },
      { label: 'Blade Material', field: 'bladeMaterial' },
      { label: 'Handle', field: 'handleMaterial' },
      { label: 'Dimensions', field: 'dimensions' },
      { label: 'Eye Remover', field: 'eyeRemover' },
      { label: 'Dishwasher Safe', field: 'dishwasherSafe' },
      { label: 'Handedness', field: 'handedness' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    ],
    trustMessage: 'This comparison is based on 24 years of professional kitchen experience. The OXO Good Grips has been my go-to peeler for over 20 years because of its unmatched comfort and durability. All recommendations are honest assessments - we earn a small commission if you purchase through our links.'
  }
}
