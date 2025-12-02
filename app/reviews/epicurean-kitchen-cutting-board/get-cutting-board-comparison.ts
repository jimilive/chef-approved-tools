/**
 * Cutting Board Comparison Data
 * Comparing Epicurean Kitchen Series vs budget alternatives and commercial options
 * Research Date: December 1, 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch cutting board comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getCuttingBoardComparison() {
  // Fetch all 4 cutting board products from database
  const products = await getProductsBySlugs([
    'epicurean-kitchen-cutting-board',
    'freshware-wood-fiber-cutting-board',
    'belwares-composite-cutting-board',
    'winco-statikboard'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    {
      name: 'Epicurean Kitchen Series',
      brand: 'Epicurean',
      affiliateLink: products.find(p => p.slug === 'epicurean-kitchen-cutting-board')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'epicurean-kitchen-cutting-board')!)
        : '#',
      material: 'Richlite (Paper Composite)',
      madeIn: '🇺🇸 USA',
      durability: '15-20+ years',
      proUse: 'standard' as const,
      dishwasherSafe: '✓ Yes',
      nsfCertified: '✓ Yes',
      heatResistant: '350°F',
      nonSlipFeet: '✗ No',
      warranty: 'Limited Lifetime',
      bestFor: 'USA-made longevity',
    },
    {
      name: 'Freshware Wood Fiber',
      brand: 'Freshware',
      affiliateLink: products.find(p => p.slug === 'freshware-wood-fiber-cutting-board')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'freshware-wood-fiber-cutting-board')!)
        : '#',
      material: 'Wood Fiber Composite',
      madeIn: 'Imported',
      durability: '5-10 years',
      proUse: 'home-only' as const,
      dishwasherSafe: '✓ Yes',
      nsfCertified: '✗ No',
      heatResistant: '350°F',
      nonSlipFeet: '⚠️ Some models',
      warranty: '1 Year',
      bestFor: 'Budget alternative',
    },
    {
      name: 'Belwares Composite',
      brand: 'Belwares',
      affiliateLink: products.find(p => p.slug === 'belwares-composite-cutting-board')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'belwares-composite-cutting-board')!)
        : '#',
      material: 'Wood Fiber (80% Pine)',
      madeIn: 'Imported',
      durability: '5-10 years',
      proUse: 'home-only' as const,
      dishwasherSafe: '✓ Yes',
      nsfCertified: '✗ No',
      heatResistant: '350°F',
      nonSlipFeet: '⚠️ Some models',
      warranty: 'Satisfaction Guarantee',
      bestFor: 'Eco-conscious budget',
    },
    {
      name: 'Winco STATIKBoard',
      brand: 'Winco',
      affiliateLink: products.find(p => p.slug === 'winco-statikboard')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'winco-statikboard')!)
        : '#',
      material: 'Copolymer Plastic',
      madeIn: 'Imported',
      durability: '10+ years',
      proUse: 'standard' as const,
      dishwasherSafe: '✓ Yes (commercial)',
      nsfCertified: '✓ Yes',
      heatResistant: 'Heat resistant',
      nonSlipFeet: '✓ Rubberized',
      warranty: 'NSF Certified',
      bestFor: 'Commercial grade',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Epicurean Kitchen Series',
    title: 'Cutting Board Comparison',
    subtitle: 'Comparing dishwasher-safe cutting boards: the USA-made original vs budget alternatives and commercial options.',
    comparisonRows: [
      { label: 'Material', field: 'material' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Durability', field: 'durability' },
      { label: 'Professional Use', field: 'proUse', format: 'proUse' },
      { label: 'Dishwasher Safe', field: 'dishwasherSafe' },
      { label: 'NSF Certified', field: 'nsfCertified' },
      { label: 'Heat Resistant', field: 'heatResistant' },
      { label: 'Non-Slip Feet', field: 'nonSlipFeet' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Best For', field: 'bestFor' },
    ],
    trustMessage: 'This comparison is based on 10+ years of personal use and professional kitchen experience. Epicurean boards cost more upfront but their 15-20+ year lifespan makes them cheaper per year than budget alternatives that need replacement every 5 years.',
  }
}
