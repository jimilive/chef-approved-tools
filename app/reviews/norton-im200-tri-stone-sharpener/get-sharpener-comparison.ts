import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch tri-stone sharpener comparison data
 * Returns the comparison table structure with live affiliate links
 *
 * Research Notes:
 * - Norton IM200: 8" x 2" stones, 120/200/400 grits, Crystolon + India stones, plastic case, USA
 * - Smith's TRI6: 6" x 1.625" stones, 300/800/1000 grits, synthetic + Arkansas, plastic base, USA
 * - Best Arkansas 10": 10" stones, 150/600-800/800-1000 grits, silicon carbide + Arkansas, wood base
 * - Dan's TRI-10: 10" x 1.625" stones, 150/600-800/800-1000 grits, genuine Arkansas Novaculite, wood base, USA
 */
export async function getSharpenerComparison() {
  // Fetch Norton IM200 from database for primary affiliate link
  const nortonProduct = await getProductBySlug('norton-im200-tri-stone-sharpener')

  // Map products to comparison table structure
  const comparisonProducts = [
    {
      name: 'IM200 Tri-Stone',
      brand: 'Norton',
      affiliateLink: nortonProduct
        ? getPrimaryAffiliateLink(nortonProduct)
        : 'https://amzn.to/3XXXXXXX',
      stoneSize: '8" x 2" x 1/2"',
      grits: '120 / 200 / 400',
      stoneMaterials: 'Crystolon (2) + India',
      baseMaterial: 'Heavy-duty plastic',
      oilReservoir: '✅ Yes',
      madeIn: 'USA',
      proUse: 'standard' as const,
      bestFor: 'Professional kitchens, high-volume sharpening',
      priceTier: 'mid-range' as const,
    },
    {
      name: 'TRI6 Arkansas',
      brand: "Smith's",
      affiliateLink: 'https://amzn.to/4qhcxyr',
      stoneSize: '6" x 1.625" x 3/8"',
      grits: '300 / 800 / 1000',
      stoneMaterials: 'Synthetic (2) + Arkansas',
      baseMaterial: 'Molded plastic',
      oilReservoir: '❌ No (V-trough)',
      madeIn: 'USA',
      proUse: 'limited' as const,
      bestFor: 'Home use, smaller knives',
      priceTier: 'budget' as const,
    },
    {
      name: 'Tri-Hone 10"',
      brand: 'Best Arkansas',
      affiliateLink: 'https://amzn.to/44CB2ho',
      stoneSize: '10" x 1.625" x 1/2"',
      grits: '150 / 600-800 / 800-1000',
      stoneMaterials: 'Silicon carbide + Arkansas (2)',
      baseMaterial: 'Wood',
      oilReservoir: '❌ No',
      madeIn: 'USA (Arkansas)',
      proUse: 'some' as const,
      bestFor: 'Natural stone enthusiasts',
      priceTier: 'mid-range' as const,
    },
    {
      name: 'TRI-10 Whetstone',
      brand: "Dan's",
      affiliateLink: 'https://amzn.to/4s6iEaO',
      stoneSize: '10" x 1.625" x 1/2"',
      grits: '150 / 600-800 / 800-1000',
      stoneMaterials: 'Silicon carbide + Novaculite (2)',
      baseMaterial: 'Wood',
      oilReservoir: '❌ No',
      madeIn: 'USA (Arkansas)',
      proUse: 'some' as const,
      bestFor: 'Premium natural stone quality',
      priceTier: 'premium' as const,
    }
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'IM200 Tri-Stone',
    title: 'Compare Tri-Stone Sharpening Systems',
    subtitle: 'See how the Norton IM200 stacks up against other tri-stone sharpeners',
    comparisonRows: [
      { label: 'Stone Size', field: 'stoneSize' },
      { label: 'Grit Levels', field: 'grits' },
      { label: 'Stone Materials', field: 'stoneMaterials' },
      { label: 'Base Material', field: 'baseMaterial' },
      { label: 'Oil Reservoir', field: 'oilReservoir' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Pro Kitchen Use', field: 'proUse', format: 'proUse' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    ],
    trustMessage: 'This comparison is based on 24 years of professional kitchen experience testing sharpening equipment. The Norton IM200 has been my personal sharpening system for over a decade. All recommendations are honest assessments - we earn a small commission if you purchase through our links.'
  }
}
