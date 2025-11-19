import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch toaster oven comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getToasterOvenComparison() {
  // Fetch all 4 toaster oven products from database
  const products = await getProductsBySlugs([
    'black-decker-toaster-oven',
    'hamilton-beach-sure-crisp-31403',
    'cuisinart-toa-70',
    'cosori-smart-12-in-1'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    {
      name: 'TO1785SG',
      brand: 'BLACK+DECKER',
      affiliateLink: products.find(p => p.slug === 'black-decker-toaster-oven')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'black-decker-toaster-oven')!)
        : '#',
      material: 'Stainless steel',
      durability: '1-2 years',
      warranty: '2 years',
      proUse: 'home-only' as const,
      functions: '5',
      power: 'Not specified',
      capacity: '4 slice / 9" pizza',
      timer: '30 min',
      interiorLight: '❌ No',
      bestFor: 'Extreme budget',
      priceTier: 'budget' as const,
    },
    {
      name: 'Sure-Crisp 31403',
      brand: 'Hamilton Beach',
      affiliateLink: products.find(p => p.slug === 'hamilton-beach-sure-crisp-31403')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'hamilton-beach-sure-crisp-31403')!)
        : '#',
      material: 'Stainless steel',
      durability: '2-3 years',
      warranty: '1 year',
      proUse: 'some' as const,
      functions: '4',
      power: 'Not specified',
      capacity: '4 slice / 9" pizza',
      timer: '30 min',
      interiorLight: '❌ No',
      bestFor: 'Budget air frying',
      priceTier: 'budget' as const,
    },
    {
      name: 'TOA-70',
      brand: 'Cuisinart',
      affiliateLink: products.find(p => p.slug === 'cuisinart-toa-70')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'cuisinart-toa-70')!)
        : '#',
      material: 'Brushed stainless',
      durability: '4-6 years',
      warranty: '3 years',
      proUse: 'home-only' as const,
      functions: '8',
      power: '1800W',
      capacity: '6 slice / 12" pizza',
      timer: '60 min',
      interiorLight: '✅ Yes',
      bestFor: 'Multi-function versatility',
      priceTier: 'premium' as const,
    },
    {
      name: 'Smart 12-in-1',
      brand: 'COSORI',
      affiliateLink: products.find(p => p.slug === 'cosori-smart-12-in-1')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'cosori-smart-12-in-1')!)
        : '#',
      material: 'Stainless steel',
      durability: '3-4 years',
      warranty: '1 year (+1 registration)',
      proUse: 'some' as const,
      functions: '12',
      power: '1800W',
      capacity: '6 slice / 12" pizza',
      timer: 'Digital precision',
      interiorLight: '✅ Yes',
      bestFor: 'Maximum versatility',
      priceTier: 'premium' as const,
    }
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'TO1785SG',
    title: 'Compare Air Fryer Toaster Ovens',
    subtitle: 'See how the Black+Decker TO1785SG stacks up against top competitors',
    comparisonRows: [
      { label: 'Material', field: 'material' },
      { label: 'Expected Lifespan', field: 'durability' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Pro Kitchen Use', field: 'proUse', format: 'proUse' },
      { label: 'Functions', field: 'functions' },
      { label: 'Power', field: 'power' },
      { label: 'Capacity', field: 'capacity' },
      { label: 'Timer', field: 'timer' },
      { label: 'Interior Light', field: 'interiorLight' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    ],
  }
}
