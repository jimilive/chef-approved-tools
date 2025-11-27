import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch air fryer comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 *
 * Research completed: November 4, 2025
 * Research time: 2 hours
 * Sources: TechGearLab, America's Test Kitchen, Good Housekeeping, Amazon reviews
 */
export async function getAirFryerComparison() {
  // Fetch air fryer products from database
  const products = await getProductsBySlugs([
    'ninja-air-fryer-af101',
    'cosori-air-fryer-pro-5qt',
    'instant-pot-vortex-plus-4qt',
    'chefman-turbofry-4qt',
  ])

  // Helper to get affiliate link safely
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  // Map database products to comparison table structure
  const comparisonProducts = [
    // NINJA AF101 - The Featured Product
    {
      name: 'AF101 4 Qt',
      brand: 'Ninja',
      affiliateLink: getLink('ninja-air-fryer-af101'),

      // Air fryer-specific fields
      capacity: '4 qt (round)',
      power: '1550W',
      tempRange: '105°F - 400°F',
      functions: '4-in-1',
      coating: 'Ceramic (PTFE-free)',
      basketShape: 'Round',
      smartFeatures: 'Fan speed adjustment',
      weight: '12 lbs',
      tempAccuracy: '±3.2°F (best tested)',

      // Universal fields
      durability: '3-5+ years',
      warranty: '1 year',
      proUse: 'limited' as const,
      keyAdvantage: 'Most accurate temp, easiest cleaning',
      bestFor: 'Accuracy, durability, health-conscious',
      priceTier: 'mid-range' as const,
      madeIn: 'China (designed in USA)',
    },

    // COSORI Air Fryer Pro 5-Quart
    {
      name: 'Pro 5 Qt',
      brand: 'Cosori',
      affiliateLink: getLink('cosori-air-fryer-pro-5qt'),

      capacity: '5 qt (square)',
      power: '1700W',
      tempRange: '170°F - 400°F',
      functions: '9-in-1',
      coating: 'Ceramic (PTFE-free)',
      basketShape: 'Square',
      smartFeatures: 'VeSync app, shake reminder',
      weight: '11 lbs',
      tempAccuracy: 'Good',

      durability: '3-5 years',
      warranty: '1-2 years',
      proUse: 'limited' as const,
      keyAdvantage: 'Most presets, app connectivity',
      bestFor: 'Tech-savvy, preset cooking',
      priceTier: 'mid-range' as const,
      madeIn: 'China',
    },

    // Instant Pot Vortex Plus 4-Quart
    {
      name: 'Vortex Plus 4 Qt',
      brand: 'Instant Pot',
      affiliateLink: getLink('instant-pot-vortex-plus-4qt'),

      capacity: '4 qt (square)',
      power: '1500W',
      tempRange: '95°F - 400°F',
      functions: '6-in-1',
      coating: 'PTFE non-stick',
      basketShape: 'Square',
      smartFeatures: 'EvenCrisp technology',
      weight: '10 lbs',
      tempAccuracy: 'Excellent',

      durability: '3-5 years',
      warranty: '1 year',
      proUse: 'limited' as const,
      keyAdvantage: 'ATK Winner, lowest temp (95°F)',
      bestFor: 'ATK quality, dehydrating',
      priceTier: 'mid-range' as const,
      madeIn: 'China',
    },

    // Chefman TurboFry 4-Quart
    {
      name: 'TurboFry 4 Qt',
      brand: 'Chefman',
      affiliateLink: getLink('chefman-turbofry-4qt'),

      capacity: '4 qt (round)',
      power: '1700W',
      tempRange: '90°F - 450°F',
      functions: '4 presets',
      coating: 'Non-stick',
      basketShape: 'Round',
      smartFeatures: 'Hi-Fry 450°F boost',
      weight: '9 lbs',
      tempAccuracy: 'Fair',

      durability: '2-3 years',
      warranty: '1 year',
      proUse: 'home-only' as const,
      keyAdvantage: 'Lowest price, highest temp',
      bestFor: 'Budget buyers, extra crisp',
      priceTier: 'budget' as const,
      madeIn: 'China',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'AF101 4 Qt',
    title: 'Compare Air Fryers',
    subtitle: 'See how the Ninja AF101 stacks up against top competitors',
    comparisonRows: [
      // Category-specific fields
      { label: 'Capacity', field: 'capacity' },
      { label: 'Power', field: 'power' },
      { label: 'Temp Range', field: 'tempRange' },
      { label: 'Functions', field: 'functions' },
      { label: 'Coating', field: 'coating' },
      { label: 'Basket Shape', field: 'basketShape' },
      { label: 'Smart Features', field: 'smartFeatures' },
      { label: 'Temp Accuracy', field: 'tempAccuracy' },
      { label: 'Weight', field: 'weight' },
      // Universal fields
      { label: 'Durability', field: 'durability' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Professional Use', field: 'proUse', format: 'proUse' },
      { label: 'Key Advantage', field: 'keyAdvantage' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
      { label: 'Made In', field: 'madeIn' },
    ],
  }
}
