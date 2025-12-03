import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getBlenderComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'ninja-bl660-professional-blender',
    'nutribullet-blender-combo-1200w',
    'hamilton-beach-power-elite-blender',
    'oster-pro-1200-blender'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: 'Countertop Blender Comparison',
    subtitle: 'Budget blenders compared: power, versatility, and value',
    products: [
      {
        name: 'Ninja BL660',
        slug: 'ninja-bl660-professional-blender',
        affiliateLink: getLink('ninja-bl660-professional-blender'),
        motor: '1100W',
        capacity: '72 oz + 16 oz cups',
        jarMaterial: 'Plastic',
        warranty: '1 year',
        madeIn: 'China',
        bestFor: 'Ice crushing + versatility',
        isHighlighted: true
      },
      {
        name: 'NutriBullet Combo 1200W',
        slug: 'nutribullet-blender-combo-1200w',
        affiliateLink: getLink('nutribullet-blender-combo-1200w'),
        motor: '1200W',
        capacity: '64 oz + 32/24 oz cups',
        jarMaterial: 'Plastic',
        warranty: '1 year',
        madeIn: 'China',
        bestFor: 'Silky smoothies'
      },
      {
        name: 'Hamilton Beach Power Elite',
        slug: 'hamilton-beach-power-elite-blender',
        affiliateLink: getLink('hamilton-beach-power-elite-blender'),
        motor: '700W',
        capacity: '40 oz',
        jarMaterial: 'Glass',
        warranty: '3 years',
        madeIn: 'China',
        bestFor: 'Budget basics'
      },
      {
        name: 'Oster Pro 1200',
        slug: 'oster-pro-1200-blender',
        affiliateLink: getLink('oster-pro-1200-blender'),
        motor: '1200W',
        capacity: '48 oz',
        jarMaterial: 'Glass',
        warranty: '3 yr + 10 yr drive',
        madeIn: 'China',
        bestFor: 'Power + durability'
      }
    ],
    comparisonRows: [
      { label: 'Motor Power', field: 'motor' as const },
      { label: 'Capacity', field: 'capacity' as const },
      { label: 'Jar Material', field: 'jarMaterial' as const },
      { label: 'Warranty', field: 'warranty' as const },
      { label: 'Made In', field: 'madeIn' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'ninja-bl660-professional-blender'
  }
}
