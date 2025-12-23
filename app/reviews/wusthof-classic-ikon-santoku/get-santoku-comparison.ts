import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch santoku knife comparison data
 * Returns the comparison table structure with live affiliate links
 *
 * Research Notes:
 * - Wüsthof Classic Ikon 7": X50CrMoV15, 58 HRC, 10°/side, 7.1 oz, Germany
 * - Zwilling Pro 7": Special Formula, 57 HRC, 11°/side, 7.7 oz, Germany
 * - Henckels Classic Precision 7": German Stainless, ~56-57 HRC, 10°/side, ~6-7 oz, Spain
 * - Shun Classic DM0718 7": VG-MAX/Damascus, 60-61 HRC, 16°/side, 6.8 oz, Japan
 */
export async function getSantokuComparison() {
  // Fetch Wusthof from database for primary affiliate link
  const wusthofProduct = await getProductBySlug('wusthof-classic-ikon-santoku')

  // Map products to comparison table structure
  const comparisonProducts = [
    {
      name: 'Classic Ikon 7" Santoku',
      brand: 'Wüsthof',
      affiliateLink: wusthofProduct
        ? getPrimaryAffiliateLink(wusthofProduct)
        : 'https://amzn.to/3XXXXXXX',
      bladeSteel: 'X50CrMoV15',
      hardness: '58 HRC',
      edgeAngle: '10° per side',
      bladeLength: '7"',
      weight: '7.1 oz (202g)',
      handle: 'Contoured POM',
      construction: 'Fully forged',
      madeIn: 'Germany',
      warranty: 'Lifetime',
      bestFor: 'Balance, durability, everyday use',
      priceTier: 'premium' as const,
    },
    {
      name: 'Pro 7" Hollow Edge Santoku',
      brand: 'Zwilling',
      affiliateLink: 'https://amzn.to/4977U3k',
      bladeSteel: 'Special Formula Steel',
      hardness: '57 HRC',
      edgeAngle: '11° per side',
      bladeLength: '7"',
      weight: '7.7 oz (219g)',
      handle: 'Triple-riveted resin',
      construction: 'SIGMAFORGE',
      madeIn: 'Germany',
      warranty: 'Lifetime',
      bestFor: 'Heft, pinch grip comfort',
      priceTier: 'premium' as const,
    },
    {
      name: 'Classic Precision 7" Santoku',
      brand: 'Henckels',
      affiliateLink: 'https://amzn.to/3NeQ0Ef',
      bladeSteel: 'German Stainless',
      hardness: '56-57 HRC',
      edgeAngle: '10° per side',
      bladeLength: '7"',
      weight: '~6.5 oz',
      handle: 'Triple-riveted ergonomic',
      construction: 'Fully forged',
      madeIn: 'Spain',
      warranty: 'Lifetime',
      bestFor: 'Value, lighter weight',
      priceTier: 'mid-range' as const,
    },
    {
      name: 'Classic 7" Hollow Ground (DM0718)',
      brand: 'Shun',
      affiliateLink: 'https://amzn.to/4pPiJhk',
      bladeSteel: 'VG-MAX + 68-layer Damascus',
      hardness: '60-61 HRC',
      edgeAngle: '16° per side',
      bladeLength: '7"',
      weight: '6.8 oz (194g)',
      handle: 'D-shaped PakkaWood',
      construction: 'Damascus-clad',
      madeIn: 'Japan',
      warranty: 'Lifetime + free sharpening',
      bestFor: 'Edge retention, precision cuts',
      priceTier: 'luxury' as const,
    }
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Classic Ikon 7" Santoku',
    title: 'Compare Premium Santoku Knives',
    subtitle: 'See how the Wüsthof Classic Ikon stacks up against top competitors',
    comparisonRows: [
      { label: 'Blade Steel', field: 'bladeSteel' },
      { label: 'Hardness', field: 'hardness' },
      { label: 'Edge Angle', field: 'edgeAngle' },
      { label: 'Blade Length', field: 'bladeLength' },
      { label: 'Weight', field: 'weight' },
      { label: 'Handle', field: 'handle' },
      { label: 'Construction', field: 'construction' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    ],
    trustMessage: 'This comparison is based on 24 years of professional kitchen experience testing knives in high-volume restaurant settings. The Wüsthof Classic Ikon offers the best balance of German durability and Japanese-inspired design. All recommendations are honest assessments - we earn a small commission if you purchase through our links.'
  }
}
