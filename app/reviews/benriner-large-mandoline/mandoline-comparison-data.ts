/**
 * Mandoline Comparison Data for Benriner Super Benriner Review
 * Research completed: November 4, 2025
 * Research time: 2.5 hours
 * Sources: America's Test Kitchen, The Kitchn, Serious Eats, Cook's Illustrated
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch mandoline comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getMandolineComparison() {
  // Fetch all 4 mandoline products from database
  const products = await getProductsBySlugs([
    'benriner-large-mandoline',
    'oxo-chefs-mandoline-2',
    'swissmar-borner-v-slicer-plus',
    'dash-safe-slice'
  ])

  // Map database products to comparison table structure
  // Note: Static specs are kept here since they're not in the database
  const comparisonProducts = [
    // BENRINER SUPER BENRINER - The Featured Product
    {
      name: 'Super Benriner',
      brand: 'Benriner',
      affiliateLink: products.find(p => p.slug === 'benriner-large-mandoline')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'benriner-large-mandoline')!)
        : '#',

      // Mandoline-specific fields
      bladeMaterial: 'Japanese stainless steel (hand-sharpened)',
      construction: 'Hand-compressed, heat-treated blades',
      bladeType: 'Straight blade (diagonal angle)',
      thicknessRange: '0.5-8mm (infinite adjustment)',
      julienneSizes: '3 (fine/medium/coarse)',
      specialCuts: 'None',
      safetyGuard: 'Basic hand guard',
      madeIn: 'Japan (Yamaguchi prefecture)',
      weight: 'Ultra-light plastic',
      storage: 'Compact (fits in drawer)',

      // Universal fields
      durability: '10+ years',
      warranty: 'Parts replaceable',
      proUse: 'standard' as const, // Industry standard
      sharpness: 'Sharpest (ATK winner)',
      keyAdvantage: 'Sharpest blade, infinite adjustment',
      bestFor: 'Professionals & serious cooks',
      priceTier: 'budget' as const,
    },

    // OXO GOOD GRIPS CHEF'S MANDOLINE 2.0
    {
      name: 'Chef\'s Mandoline 2.0',
      brand: 'OXO',
      affiliateLink: products.find(p => p.slug === 'oxo-chefs-mandoline-2')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'oxo-chefs-mandoline-2')!)
        : '#',

      bladeMaterial: 'Dual-sided Japanese stainless steel',
      construction: 'Hardened, angled blade',
      bladeType: 'Straight + wavy (crinkle)',
      thicknessRange: '21 presets (0.5mm intervals)',
      julienneSizes: '2 (preset widths)',
      specialCuts: 'Waffle/crinkle cuts',
      safetyGuard: 'Spring-loaded food holder',
      madeIn: 'Not specified',
      weight: 'Medium-heavy',
      storage: 'Foldable base',

      durability: '3-5 years',
      warranty: 'OXO Better Guarantee',
      proUse: 'limited' as const, // Mainly home use
      sharpness: 'Sharp (but not as sharp as Benriner)',
      keyAdvantage: 'User-friendly, clear settings',
      bestFor: 'Beginners wanting guidance',
      priceTier: 'premium' as const,
    },

    // SWISSMAR BÖRNER V-SLICER PLUS
    {
      name: 'V-Slicer Plus',
      brand: 'Swissmar Börner',
      affiliateLink: products.find(p => p.slug === 'swissmar-borner-v-slicer-plus')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'swissmar-borner-v-slicer-plus')!)
        : '#',

      bladeMaterial: 'German surgical-grade stainless steel',
      construction: 'V-blade design (dual blades)',
      bladeType: 'V-shaped blade',
      thicknessRange: '2 presets (1/16" and 1/4")',
      julienneSizes: '2 (3.5mm and 7mm)',
      specialCuts: 'Dicing function',
      safetyGuard: 'Steel prongs holder',
      madeIn: 'Germany (60+ years)',
      weight: 'Lightweight plastic',
      storage: 'Caddy included (wall-mount)',

      durability: '5+ years',
      warranty: '5 years',
      proUse: 'some' as const, // Some professional use
      sharpness: 'Sharp (V-blade requires more force)',
      keyAdvantage: 'Storage caddy, dicing function',
      bestFor: 'Organized storage, versatility',
      priceTier: 'mid-range' as const,
    },

    // DASH SAFE SLICE
    {
      name: 'Safe Slice',
      brand: 'DASH',
      affiliateLink: products.find(p => p.slug === 'dash-safe-slice')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'dash-safe-slice')!)
        : '#',

      bladeMaterial: 'Stainless steel (built-in)',
      construction: 'Enclosed blade design',
      bladeType: 'Enclosed chute system',
      thicknessRange: '1-8mm (30+ settings)',
      julienneSizes: 'Preset sizes available',
      specialCuts: 'Matchstick, dice',
      safetyGuard: 'Enclosed chute (hands never near blade)',
      madeIn: 'Not specified',
      weight: 'Lightweight',
      storage: 'Folds flat',

      durability: '2-3 years',
      warranty: '2 years',
      proUse: 'home-only' as const, // Home use only
      sharpness: 'Adequate (not as sharp as traditional)',
      keyAdvantage: 'Safest design, family-friendly',
      bestFor: 'Maximum safety, beginners',
      priceTier: 'budget' as const,
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Super Benriner', // Which product to highlight with orange border
    title: 'Compare Professional Mandolines',
    subtitle: 'See how the Benriner Super Benriner stacks up against top competitors',
    comparisonRows: [
      { label: 'Blade Material', field: 'bladeMaterial' },
      { label: 'Construction', field: 'construction' },
      { label: 'Blade Type', field: 'bladeType' },
      { label: 'Thickness Range', field: 'thicknessRange' },
      { label: 'Julienne Sizes', field: 'julienneSizes' },
      { label: 'Special Cuts', field: 'specialCuts' },
      { label: 'Safety Guard', field: 'safetyGuard' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Weight', field: 'weight' },
      { label: 'Storage', field: 'storage' },
      { label: 'Durability', field: 'durability' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Professional Use', field: 'proUse', format: 'proUse' },
      { label: 'Sharpness', field: 'sharpness' },
      { label: 'Key Advantage', field: 'keyAdvantage' },
      { label: 'Best For', field: 'bestFor' },
      { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
    ],
  }
}

// Research notes (kept for reference but not exported)
export const researchNotes = {
  date: 'November 4, 2025',
  researchTime: '2.5 hours',
  sources: [
    'America\'s Test Kitchen - Equipment Reviews (Benriner named winner)',
    'The Kitchn - Benriner Review (March 1, 2022)',
    'Serious Eats Forums - Kenji Lopez-Alt recommendations',
    'Cook\'s Illustrated - Börner V-Slicer winner (May/June 2014)',
    'Food Network - DASH Safe Slice best for beginners',
    'Amazon customer reviews (analyzed across all products)',
    'Reddit r/Cooking and r/AskCulinary discussions',
    'Professional chef testimonials and demonstrations',
  ],
  keyFindings: [
    'Benriner confirmed as sharpest blade by ATK - slices toughest vegetables "like butter"',
    'Multiple sources report 10+ years of daily use with no blade dulling',
    'Benriner is industry standard in professional kitchens worldwide',
    'Infinite thickness adjustment (0.5-8mm) vs competitors\' preset notches',
    'Three julienne sizes vs competitors\' 0-2 options',
    'Straight blade requires less force than V-slicers (Börner)',
    'OXO struggles with fibrous vegetables despite user-friendly features',
    'DASH safest design but plastic durability concerns after 2-3 years',
    'All parts on Benriner are replaceable for sustainable longevity',
    'Hand-sharpened Japanese blades vs mass-produced alternatives',
  ],
  competitiveAnalysis: {
    whereBenrinerWins: [
      'Sharpest blade on market - ATK confirmed superior cutting performance',
      'Infinite thickness adjustability (no preset notches)',
      'Professional industry standard - go-to in commercial kitchens',
      'Three julienne sizes (fine/medium/coarse) vs 0-2 on competitors',
      'Straight blade design requires less force than V-slicers',
      'Made in Japan quality - hand-sharpened blades in Yamaguchi prefecture',
      '10+ year longevity with daily use',
      'All parts replaceable for sustainable use',
      'Best value - professional results at budget-mid price',
      'Compact and simple - dishwasher safe, stores in drawer',
    ],
    whereCompetitorsWin: {
      oxo: [
        'Better for beginners - indicator window with clear measurements',
        'Waffle/crinkle cuts - dual-sided blade for decorative cuts',
        'Spring-loaded food holder feels safer (though has reliability issues)',
        'Foolproof preset settings',
      ],
      borner: [
        'Storage solution - included caddy keeps all parts organized',
        'Dicing function - can dice vegetables in addition to slicing',
        'Longer warranty - 5 years vs Benriner unspecified',
        'German engineering reputation',
      ],
      dash: [
        'Safest design - hands never near blade with enclosed chute',
        'Family-friendly - best for households with children',
        'Suction cup base - superior stability vs rubber feet',
        'Folds flat for easy storage',
      ],
    },
  },
  buyerDecisionMatrix: [
    {
      need: 'Sharpest blade & professional results',
      recommendation: 'Benriner Super Benriner',
      reason: 'ATK winner, industry standard, 10+ year lifespan with superior cutting performance.',
    },
    {
      need: 'User-friendly with safety features',
      recommendation: 'OXO Chef\'s Mandoline 2.0',
      reason: 'Clear measurements, spring-loaded holder, foolproof settings for beginners.',
    },
    {
      need: 'Maximum safety for families',
      recommendation: 'DASH Safe Slice',
      reason: 'Enclosed chute keeps hands away from blade, best for accident prevention.',
    },
    {
      need: 'German quality with organized storage',
      recommendation: 'Swissmar Börner V-Slicer',
      reason: 'Storage caddy, dicing function, 5-year warranty, German engineering.',
    },
    {
      need: 'Best long-term value',
      recommendation: 'Benriner Super Benriner',
      reason: 'Proven 10+ year lifespan, replaceable parts, professional performance at budget price.',
    },
  ],
  uncertainties: [
    'OXO blade quality appears inconsistent - some users report dull blades out of box',
    'DASH durability concerns may be from older versions (product has been updated)',
    'Specific durability timelines based on review patterns, not manufacturer testing',
  ],
}
