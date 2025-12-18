/**
 * French Press Comparison Data for Bodum Chambord Review
 * Research completed: December 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch French press comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getFrenchPressComparison() {
  // Fetch all 4 French press products from database
  const products = await getProductsBySlugs([
    'bodum-chambord-french-press',
    'espro-p3-french-press',
    'stanley-stay-hot-french-press',
    'bodum-columbia-french-press'
  ])

  // Map database products to comparison table structure
  const comparisonProducts = [
    // BODUM CHAMBORD - The Featured Product
    {
      name: 'Bodum Chambord 34oz',
      brand: 'Bodum',
      affiliateLink: products.find(p => p.slug === 'bodum-chambord-french-press')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'bodum-chambord-french-press')!)
        : '#',
      capacity: '34 oz',
      material: 'Borosilicate glass',
      heatRetention: '~30 min',
      filterType: 'Standard mesh',
      weight: 'Under 2 lbs',
      dishwasherSafe: 'Partial (glass only)',
      seeBrewing: '✅ Yes',
      sedimentLevel: 'Standard',
      warranty: 'Standard',
      bestFor: 'Classic design lovers',
    },

    // ESPRO P3
    {
      name: 'ESPRO P3 32oz',
      brand: 'ESPRO',
      affiliateLink: products.find(p => p.slug === 'espro-p3-french-press')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'espro-p3-french-press')!)
        : '#',
      capacity: '32 oz',
      material: '40% thicker borosilicate',
      heatRetention: '~45 min',
      filterType: 'Double micro-filter',
      weight: 'Light',
      dishwasherSafe: 'Yes',
      seeBrewing: '✅ Yes',
      sedimentLevel: 'Virtually none',
      warranty: 'Standard',
      bestFor: 'Grit-free coffee',
    },

    // STANLEY STAY HOT
    {
      name: 'Stanley Stay Hot 48oz',
      brand: 'Stanley',
      affiliateLink: products.find(p => p.slug === 'stanley-stay-hot-french-press')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'stanley-stay-hot-french-press')!)
        : '#',
      capacity: '48 oz',
      material: 'Double-wall stainless steel',
      heatRetention: '4+ hours',
      filterType: 'Standard mesh',
      weight: '2.5 lbs',
      dishwasherSafe: 'Yes (entire unit)',
      seeBrewing: '❌ No',
      sedimentLevel: 'Standard',
      warranty: 'Lifetime',
      bestFor: 'Camping/outdoors',
    },

    // BODUM COLUMBIA
    {
      name: 'Bodum Columbia 34oz',
      brand: 'Bodum',
      affiliateLink: products.find(p => p.slug === 'bodum-columbia-french-press')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'bodum-columbia-french-press')!)
        : '#',
      capacity: '34 oz',
      material: 'Double-wall stainless steel',
      heatRetention: '~2 hours',
      filterType: 'Silicone + mesh',
      weight: 'Moderate',
      dishwasherSafe: 'Yes',
      seeBrewing: '❌ No',
      sedimentLevel: 'Low',
      warranty: 'Standard',
      bestFor: 'Elegant durability',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Bodum Chambord 34oz',
    title: 'Compare French Press Coffee Makers',
    subtitle: 'See how the Bodum Chambord stacks up against top competitors',
    comparisonRows: [
      { label: 'Capacity', field: 'capacity' },
      { label: 'Material', field: 'material' },
      { label: 'Heat Retention', field: 'heatRetention' },
      { label: 'Filter Type', field: 'filterType' },
      { label: 'Weight', field: 'weight' },
      { label: 'Dishwasher Safe', field: 'dishwasherSafe' },
      { label: 'See Brewing', field: 'seeBrewing' },
      { label: 'Sediment Level', field: 'sedimentLevel' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
    ],
  }
}

// Key differentiators (for reference)
export const keyDifferentiators = {
  bodumChambord: 'Classic 1950s design still in production, chrome-plated steel frame with borosilicate glass, affordable entry to quality French press, Made in Portugal.',
  espro: 'Patented double micro-filter eliminates grit, stops extraction after plunge, NYT/Wirecutter pick, 40% thicker Schott-Duran glass.',
  stanley: 'Vacuum insulated (4+ hours hot), rugged outdoor build, lifetime warranty, largest capacity at 48oz.',
  bodumColumbia: 'Premium upgrade from Chambord, stainless won\'t break, 2-hour heat retention, ATK co-winner with Stanley.',
}
