import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch pressure cooker comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 *
 * Research completed: November 4, 2025
 * Research time: 2.5 hours
 * Sources: TechGearLab, Good Housekeeping, Tom's Guide, TechRadar, Amazon reviews
 */
export async function getPressureCookerComparison() {
  // Fetch all 4 pressure cooker products from database
  const products = await getProductsBySlugs([
    'instant-pot-duo-plus-6qt',
    'ninja-foodi-11-in-1-pro',
    'breville-fast-slow-pro',
    'cosori-premium-6qt'
  ])

  // Helper to get affiliate link safely
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    // INSTANT POT DUO PLUS 6 QT - The Featured Product
    {
      name: 'Duo Plus 6 Qt',
      brand: 'Instant Pot',
      affiliateLink: getLink('instant-pot-duo-plus-6qt'),

      // Pressure cooker-specific fields
      capacity: '6 quart',
      functions: '9-in-1',
      power: '1000 watts',
      innerPotMaterial: '18/8 stainless steel (3-ply)',
      steamRelease: 'WhisperQuiet (30° angled)',
      presets: '25 customizable presets',
      controls: 'Dial + digital display',
      weight: '12 lbs',
      airFryer: 'No',
      recipeSupport: 'Massive (millions)',

      // Universal fields
      durability: '5-7 years',
      warranty: '1 year limited',
      proUse: 'limited' as const,
      keyAdvantage: 'Best value, largest recipe community',
      bestFor: 'All-around cooking, families',
      priceTier: 'mid-range' as const,
      madeIn: 'China (designed in Canada)',
    },

    // NINJA FOODI 11-IN-1 PRO 6.5 QT (FD302)
    {
      name: 'Foodi Pro 6.5 Qt',
      brand: 'Ninja',
      affiliateLink: getLink('ninja-foodi-11-in-1-pro'),

      capacity: '6.5 quart',
      functions: '11-in-1',
      power: '1400 watts',
      innerPotMaterial: 'Ceramic-coated nonstick',
      steamRelease: 'Manual valve',
      presets: '45+ recipes included',
      controls: 'Digital touchpad',
      weight: '26 lbs',
      airFryer: 'Yes (TenderCrisp)',
      recipeSupport: 'Growing community',

      durability: '4-6 years',
      warranty: '1 year limited',
      proUse: 'home-only' as const,
      keyAdvantage: 'Air frying + pressure cooking',
      bestFor: 'Air frying enthusiasts',
      priceTier: 'premium' as const,
      madeIn: 'China (designed in USA)',
    },

    // BREVILLE FAST SLOW PRO 6 QT (BPR700BSS)
    {
      name: 'Fast Slow Pro 6 Qt',
      brand: 'Breville',
      affiliateLink: getLink('breville-fast-slow-pro'),

      capacity: '6 quart',
      functions: '11+ functions',
      power: '1100 watts',
      innerPotMaterial: 'Ceramic-coated (PFOA-free)',
      steamRelease: 'Hands-free automatic',
      presets: '12 pressure + slow presets',
      controls: 'Three intuitive dials',
      weight: '15 lbs',
      airFryer: 'No',
      recipeSupport: 'Moderate community',

      durability: '7-10 years',
      warranty: '1 year limited',
      proUse: 'limited' as const,
      keyAdvantage: 'Hands-free release, best meat',
      bestFor: 'Meat perfectionists, safety-first',
      priceTier: 'luxury' as const,
      madeIn: 'China (Australian company)',
    },

    // COSORI CP016-PC 6 QT
    {
      name: 'Premium 6 Qt',
      brand: 'Cosori',
      affiliateLink: getLink('cosori-premium-6qt'),

      capacity: '6 quart',
      functions: '9-in-1',
      power: '1000-1100 watts',
      innerPotMaterial: 'Stainless steel or ceramic',
      steamRelease: 'Manual (30° angled)',
      presets: '13 preset programs',
      controls: 'Digital touchpad',
      weight: '11 lbs',
      airFryer: 'No',
      recipeSupport: 'Small (uses IP recipes)',

      durability: '3-5 years',
      warranty: '1 year limited',
      proUse: 'home-only' as const,
      keyAdvantage: 'Best budget, includes glass lid',
      bestFor: 'Budget-conscious buyers',
      priceTier: 'budget' as const,
      madeIn: 'China (designed in USA)',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Duo Plus 6 Qt',
    title: 'Compare Electric Pressure Cookers',
    subtitle: 'See how the Instant Pot Duo Plus stacks up against top competitors',
    comparisonRows: [
      // Category-specific fields
      { label: 'Capacity', field: 'capacity' },
      { label: 'Functions', field: 'functions' },
      { label: 'Power', field: 'power' },
      { label: 'Inner Pot', field: 'innerPotMaterial' },
      { label: 'Steam Release', field: 'steamRelease' },
      { label: 'Presets', field: 'presets' },
      { label: 'Controls', field: 'controls' },
      { label: 'Weight', field: 'weight' },
      { label: 'Air Fryer', field: 'airFryer' },
      { label: 'Recipe Support', field: 'recipeSupport' },
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
