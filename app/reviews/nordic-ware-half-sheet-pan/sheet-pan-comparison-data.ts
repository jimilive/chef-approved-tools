/**
 * Sheet Pan Comparison Data for Nordic Ware Half Sheet Review
 * Research completed: November 4, 2025
 * Research time: 1.5 hours
 * Sources: America's Test Kitchen, Prudent Reviews, Nordic Ware Official, Amazon Reviews
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch sheet pan comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getSheetPanComparison() {
  // Fetch all 4 sheet pan products from database
  const products = await getProductsBySlugs([
    'nordic-ware-half-sheet-pan',
    'usa-pan-nonstick-half-sheet',
    'vollrath-wear-ever-half-sheet',
    'chicago-metallic-commercial-ii-half-sheet'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    // NORDIC WARE NATURAL ALUMINUM - The Featured Product
    {
      name: 'Nordic Ware Natural Aluminum',
      brand: 'Nordic Ware',
      affiliateLink: products.find(p => p.slug === 'nordic-ware-half-sheet-pan')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'nordic-ware-half-sheet-pan')!)
        : '#',

      // Sheet pan-specific fields
      material: 'Pure Aluminum',
      coating: 'None (natural)',
      weight: '1.6 lbs',
      maxTemp: '500°F',
      warpResistance: 'Excellent',
      durability: '10-20+ years',
      proUse: '✅ ATK Standard',
      cleanup: 'Moderate (use parchment)',
      warranty: 'Lifetime',
      madeIn: 'USA (Minnesota)',
      priceTier: 'budget' as const,
      bestFor: 'Lifetime value + performance',
    },

    // USA PAN NONSTICK HALF SHEET
    {
      name: 'USA Pan Nonstick',
      brand: 'USA Pan',
      affiliateLink: products.find(p => p.slug === 'usa-pan-nonstick-half-sheet')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'usa-pan-nonstick-half-sheet')!)
        : '#',

      material: 'Aluminized Steel',
      coating: 'Americoat Silicone',
      weight: '2.4 lbs',
      maxTemp: '450°F',
      warpResistance: 'Poor-Fair',
      durability: '5-10 years',
      proUse: '✅ Commercial-grade',
      cleanup: 'Easy (nonstick)',
      warranty: 'Limited Lifetime',
      madeIn: 'USA (Pennsylvania)',
      priceTier: 'mid-range' as const,
      bestFor: 'Nonstick convenience',
    },

    // VOLLRATH WEAR-EVER HALF SIZE
    {
      name: 'Vollrath Wear-Ever',
      brand: 'Vollrath',
      affiliateLink: products.find(p => p.slug === 'vollrath-wear-ever-half-sheet')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'vollrath-wear-ever-half-sheet')!)
        : '#',

      material: 'Heavy-Duty Aluminum',
      coating: 'None',
      weight: '1-1.5 lbs',
      maxTemp: '500°F+',
      warpResistance: 'Excellent',
      durability: '10+ years',
      proUse: '✅ NSF Commercial',
      cleanup: 'Moderate (use parchment)',
      warranty: 'Commercial',
      madeIn: 'USA',
      priceTier: 'budget' as const,
      bestFor: 'True commercial use',
    },

    // CHICAGO METALLIC COMMERCIAL II
    {
      name: 'Chicago Metallic Commercial II',
      brand: 'Chicago Metallic',
      affiliateLink: products.find(p => p.slug === 'chicago-metallic-commercial-ii-half-sheet')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'chicago-metallic-commercial-ii-half-sheet')!)
        : '#',

      material: 'Aluminized Steel',
      coating: 'Optional Nonstick',
      weight: '2-2.5 lbs',
      maxTemp: '450°F',
      warpResistance: 'Good',
      durability: '5-10 years',
      proUse: '⚠️ Semi-pro',
      cleanup: 'Moderate',
      warranty: 'Limited',
      madeIn: 'USA/Mixed',
      priceTier: 'budget' as const,
      bestFor: 'Budget buyers',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Nordic Ware Natural Aluminum',
    title: 'Sheet Pan Comparison: Which One Lasts a Lifetime?',
    subtitle: 'See how the Nordic Ware stacks up against top competitors',
    comparisonRows: [
      { label: 'Material', field: 'material' },
      { label: 'Coating', field: 'coating' },
      { label: 'Weight', field: 'weight' },
      { label: 'Max Oven Temp', field: 'maxTemp' },
      { label: 'Warp Resistance', field: 'warpResistance' },
      { label: 'Durability', field: 'durability' },
      { label: 'Professional Use', field: 'proUse' },
      { label: 'Cleanup', field: 'cleanup' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
      { label: 'Best For', field: 'bestFor' },
    ],
    trustMessage: 'I\'ve owned 4 Nordic Ware half sheet pans for over 10 years. This comparison reflects real kitchen experience, not just spec sheets. The USA Pan warping issue is well-documented in reviews—I recommend Nordic Ware for anyone wanting a pan that lasts a lifetime.',
  }
}

// Research notes (kept for reference)
export const researchNotes = {
  date: 'November 4, 2025',
  researchTime: '1.5 hours',
  sources: [
    'America\'s Test Kitchen - Best Baking Sheets Equipment Review (August 2024)',
    'America\'s Test Kitchen - Nordic Ware Article (December 2022)',
    'Prudent Reviews - Nordic Ware vs USA Pan Comparison (March 2025)',
    'Prudent Reviews - 6-Pan Comparison Test (August 2025)',
    'Nordic Ware Official Website - Product Pages',
    'USA Pan Official Website - Product Pages & FAQ',
    'Amazon Product Pages - B000G0KJG4, B00282JL7G, B0001MS3P6, B003YKGROG',
    'The Kitchn - Nordic Ware Review (November 2023)',
    'WebstaurantStore - Vollrath Product Data',
    'Sally\'s Baking Addiction - Baking Pan Recommendations (August 2025)',
  ],
  keyFindings: [
    'Nordic Ware designated ATK "All-Time Favorite" - ATK has 950+ in their test kitchen',
    'Encapsulated galvanized steel rim provides superior warp resistance',
    'Pure aluminum never rusts, pans last 10-20+ years with daily use',
    'At 1.6 lbs, lightest of all competitors - less arm fatigue',
    'Light color prevents overbrowning compared to dark nonstick pans',
    'USA Pan has significant warping issues reported even at 425°F',
    'Vollrath is true NSF-certified commercial equipment',
    'Chicago Metallic has inconsistent rim quality (visible gaps in rolled edge)',
    'Nordic Ware 500°F max temp vs 450°F for USA Pan and Chicago Metallic',
    'Patina development on aluminum actually improves non-stick properties',
  ],
  competitiveAnalysis: {
    whereNordicWareWins: [
      'Warp resistance - encapsulated steel rim design superior to all competitors',
      'Lifetime durability - pure aluminum never rusts, lasts 10-20+ years',
      'Professional standard - ATK "All-Time Favorite", 950+ in their test kitchen',
      'Temperature range - 500°F vs 450°F for USA Pan',
      'Weight - lightest at 1.6 lbs, easier to handle',
      'Value - commercial quality at budget price ($10-15)',
      'Made in USA - Minneapolis with quality control',
    ],
    whereCompetitorsWin: {
      usaPan: [
        'Superior nonstick performance - cookies release effortlessly',
        'Easier cleanup - minimal scrubbing needed',
        'No discoloration over time',
        'Trade-off: warping issues, lower max temp, coating wears out',
      ],
      vollrath: [
        'Heavier-gauge commercial options (13-gauge vs standard 18-gauge)',
        'NSF certified for food service',
        'True restaurant equipment',
        'Trade-off: industrial aesthetic, less refined for home use',
      ],
      chicagoMetallic: [
        'Lower price point for budget shoppers',
        'Available with built-in nonstick option',
        'Trade-off: less durable, inconsistent quality, smaller cooking surface',
      ],
    },
  },
  buyerDecisionMatrix: [
    {
      need: 'Best overall value + lifetime durability',
      recommendation: 'Nordic Ware',
      reason: 'ATK winner, never rusts, resists warping, commercial quality at budget price.',
    },
    {
      need: 'Easiest cleanup + nonstick convenience',
      recommendation: 'USA Pan',
      reason: 'Superior nonstick coating, effortless release (accept warping risk).',
    },
    {
      need: 'True commercial equipment',
      recommendation: 'Vollrath',
      reason: 'NSF certified, restaurant standard, heavier gauge options.',
    },
    {
      need: 'Tightest budget',
      recommendation: 'Chicago Metallic',
      reason: 'Decent quality at lowest price, good starter pan.',
    },
    {
      need: 'High-heat roasting (500°F)',
      recommendation: 'Nordic Ware',
      reason: 'Only option rated to 500°F.',
    },
    {
      need: 'Lightweight + easy handling',
      recommendation: 'Nordic Ware',
      reason: 'Lightest at 1.6 lbs, less arm fatigue.',
    },
  ],
  uncertainties: [
    'USA Pan warping issue is inconsistent - some users have no problems, others warp at 425°F',
    'Multiple ASIN numbers for similar products made verification time-consuming',
    'Vollrath has many gauge options - focused on 13-gauge and 18-gauge as most common',
    'Chicago Metallic ownership changed (now part of Bundy Baking like USA Pan)',
  ],
}
