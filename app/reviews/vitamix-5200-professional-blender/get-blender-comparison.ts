import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch blender comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getBlenderComparison() {
  // Fetch all 4 blender products from database
  const products = await getProductsBySlugs([
    'vitamix-5200-professional-blender',
    'blendtec-designer-725',
    'ninja-professional-plus',
    'kitchenaid-k400'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    {
      name: 'Vitamix 5200',
      brand: 'Vitamix',
      affiliateLink: products.find(p => p.slug === 'vitamix-5200-professional-blender')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'vitamix-5200-professional-blender')!)
        : '#',
      motorPower: '2 HP (1,380W)',
      capacity: '64 oz',
      durability: '10-15+ years',
      warranty: '7 years full',
      proUse: 'standard' as const,
      controls: 'Analog variable speed dial (10 speeds)',
      height: '20.5" (tall)',
      madeIn: 'USA (Cleveland, OH)',
      bestFor: 'Professional results, durability, smoothest blends',
      priceTier: 'luxury' as const,
    },
    {
      name: 'Designer 725',
      brand: 'Blendtec',
      affiliateLink: products.find(p => p.slug === 'blendtec-designer-725')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'blendtec-designer-725')!)
        : '#',
      motorPower: '3.8 HP (1,725W)',
      capacity: '90 oz',
      durability: '8-10+ years',
      warranty: '8 years',
      proUse: 'some' as const,
      controls: 'Touchscreen (100 speeds + 6 presets)',
      height: '15.25" (fits cabinets)',
      madeIn: 'USA',
      bestFor: 'Max power, tech features, fits under cabinets',
      priceTier: 'luxury' as const,
    },
    {
      name: 'Professional Plus',
      brand: 'Ninja',
      affiliateLink: products.find(p => p.slug === 'ninja-professional-plus')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'ninja-professional-plus')!)
        : '#',
      motorPower: '1,400W',
      capacity: '72 oz',
      durability: '2-3 years',
      warranty: '1 year',
      proUse: 'home-only' as const,
      controls: 'Auto-iQ preset programs',
      height: 'Standard',
      madeIn: 'China',
      bestFor: 'Budget-conscious, occasional use, basic smoothies',
      priceTier: 'mid-range' as const,
    },
    {
      name: 'K400',
      brand: 'KitchenAid',
      affiliateLink: products.find(p => p.slug === 'kitchenaid-k400')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'kitchenaid-k400')!)
        : '#',
      motorPower: '1.5 HP (1,200W)',
      capacity: '56 oz',
      durability: '5-8 years',
      warranty: '5 years',
      proUse: 'limited' as const,
      controls: 'Dial + 3 presets (Ice Crush, Icy Drink, Smoothie)',
      height: 'Standard',
      madeIn: 'Not specified',
      bestFor: 'Style + mid-tier performance, KitchenAid ecosystem',
      priceTier: 'premium' as const,
    }
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Vitamix 5200',
    title: 'Compare Professional Blenders',
    subtitle: 'See how the Vitamix 5200 stacks up against top competitors',
    comparisonRows: [
      { label: 'Motor Power', field: 'motorPower' },
      { label: 'Container Size', field: 'capacity' },
      { label: 'Expected Lifespan', field: 'durability' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Pro Kitchen Use', field: 'proUse', format: 'proUse' },
      { label: 'Controls', field: 'controls' },
      { label: 'Height', field: 'height' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    ],
  }
}
