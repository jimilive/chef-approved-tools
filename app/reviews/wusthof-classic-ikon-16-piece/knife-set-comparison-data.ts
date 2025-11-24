/**
 * Knife Set Comparison Data for Wüsthof Classic Ikon 16-Piece Review
 * Research completed: November 23, 2025
 * Research time: 3 hours
 * Sources: Nothing But Knives, TechGearLab, Amazon reviews, manufacturer specs
 */

export const knifeSetComparisonData = {
  products: [
    // WÜSTHOF CLASSIC IKON 16-PIECE - The Featured Product
    {
      name: 'Classic Ikon 16-Piece',
      brand: 'Wüsthof',
      affiliateLink: 'https://amzn.to/3XdVcdu',

      // Knife set-specific fields
      steelType: 'X50CrMoV15 German',
      construction: 'Precision forged, full tang',
      rockwellHardness: '58 HRC',
      bladeAngle: '14° per side (28° total)',
      handleMaterial: 'POM synthetic (contoured, 3-riveted)',
      bolsterType: 'Half bolster (modern)',
      weight: 'Medium',
      madeIn: 'Solingen, Germany',
      piecesIncluded: '16 (4 forged steak knives)',
      steakKnives: '4 (forged)',

      // Universal fields
      durability: '15-20+ years',
      warranty: 'Lifetime warranty',
      proUse: 'standard' as const, // Industry standard in Western kitchens
      edgeTechnology: 'PEtec (20% sharper, 2x retention)',
      keyAdvantage: 'Best ergonomics, full-length sharpening',
      bestFor: 'Professional workhorse, best all-around',
      priceTier: 'luxury' as const,
    },

    // ZWILLING PROFESSIONAL S 18-PIECE
    {
      name: 'Professional S 18-Piece',
      brand: 'Zwilling',
      affiliateLink: 'https://www.anrdoezrs.net/links/101557027/type/dlg/https://www.zwilling.com/us/zwilling-professional-s-18-pc-knife-block-set-natural-35617-100/35617-100-0.html',

      steelType: 'Special Formula German (280+ years)',
      construction: 'SIGMAFORGE precision forged, full tang',
      rockwellHardness: '57 HRC',
      bladeAngle: '15° per side (30° total)',
      handleMaterial: 'Polypropylene (ergonomic, 3-riveted)',
      bolsterType: 'Full bolster (traditional)',
      weight: 'Medium-Heavy',
      madeIn: 'Solingen, Germany',
      piecesIncluded: '18 (8 forged steak knives + extra slots)',
      steakKnives: '8 (forged)',

      durability: '15-20+ years',
      warranty: 'Lifetime warranty',
      proUse: 'standard' as const, // Professional kitchen standard
      edgeTechnology: 'FRIODUR ice-hardened (superior retention)',
      keyAdvantage: 'Most steak knives, expansion slots',
      bestFor: 'Traditional German quality, entertaining',
      priceTier: 'premium' as const,
    },

    // SHUN PREMIER 15-PIECE
    {
      name: 'Premier 15-Piece',
      brand: 'Shun',
      affiliateLink: 'https://amzn.to/4ohkqmr',

      steelType: 'VG-MAX core + 68-layer Damascus cladding',
      construction: 'Handcrafted (100+ steps per knife)',
      rockwellHardness: '60-61 HRC',
      bladeAngle: '16° per side (32° total)',
      handleMaterial: 'Walnut PakkaWood (contoured, embossed)',
      bolsterType: 'Minimal (Japanese style)',
      weight: 'Light',
      madeIn: 'Seki, Japan',
      piecesIncluded: '15 (4 steak knives + specialized blades)',
      steakKnives: '4 (forged)',

      durability: '10-20 years (careful use required)',
      warranty: 'Lifetime + FREE lifetime sharpening',
      proUse: 'limited' as const, // Specialty/high-end home use
      edgeTechnology: 'Hammered tsuchime finish (food release)',
      keyAdvantage: 'Hardest/sharpest, Damascus beauty',
      bestFor: 'Precision artistry, careful users',
      priceTier: 'luxury' as const,
    },

    // GLOBAL 20-PIECE
    {
      name: '20-Piece Set',
      brand: 'Global',
      affiliateLink: 'https://amzn.to/49x4gl2',

      steelType: 'Cromova 18 Japanese',
      construction: 'One-piece seamless (blade + handle)',
      rockwellHardness: '56-58 HRC',
      bladeAngle: '10-15° per side (20-30° total)',
      handleMaterial: 'Stainless steel (sand-filled, dimpled)',
      bolsterType: 'None (balanced handle)',
      weight: 'Very Light',
      madeIn: 'Niigata, Japan',
      piecesIncluded: '20 (6 steak knives + specialty blades)',
      steakKnives: '6 (fine edge)',

      durability: '10-15+ years',
      warranty: 'Lifetime warranty',
      proUse: 'standard' as const, // Common in professional kitchens
      edgeTechnology: 'Face-ground blades (long taper)',
      keyAdvantage: 'Most pieces, ultimate hygiene',
      bestFor: 'Lightweight precision, maximum hygiene',
      priceTier: 'premium' as const,
    },
  ],

  highlightedProduct: 'Classic Ikon 16-Piece', // Which product to highlight with orange border

  // Additional context for the comparison section
  title: 'Compare Premium Knife Sets',
  subtitle: 'See how the Wüsthof Classic Ikon stacks up against top competitors',

  // Define which fields to compare and their display labels
  comparisonRows: [
    { label: 'Steel Type', field: 'steelType' },
    { label: 'Construction', field: 'construction' },
    { label: 'Rockwell Hardness', field: 'rockwellHardness' },
    { label: 'Blade Angle', field: 'bladeAngle' },
    { label: 'Handle Material', field: 'handleMaterial' },
    { label: 'Bolster Type', field: 'bolsterType' },
    { label: 'Weight', field: 'weight' },
    { label: 'Made In', field: 'madeIn' },
    { label: 'Pieces Included', field: 'piecesIncluded' },
    { label: 'Steak Knives', field: 'steakKnives' },
    { label: 'Durability', field: 'durability' },
    { label: 'Warranty', field: 'warranty' },
    { label: 'Professional Use', field: 'proUse', format: 'proUse' },
    { label: 'Edge Technology', field: 'edgeTechnology' },
    { label: 'Key Advantage', field: 'keyAdvantage' },
    { label: 'Best For', field: 'bestFor' },
    { label: 'Price Tier', field: 'priceTier', format: 'priceTier' },
  ],

  // Research notes
  researchNotes: {
    date: 'November 23, 2025',
    researchTime: '3 hours',
    sources: [
      'Nothing But Knives - Wüsthof Classic Ikon Review (October 2024)',
      'Nothing But Knives - Zwilling Professional S Review (June 2021)',
      'Nothing But Knives - Shun Premier Review (July 2022)',
      'TechGearLab - Best Kitchen Knife Sets of 2025 (March 2025)',
      'Kitchen Knife Guru - Shun Premier Analysis (June 2024)',
      'Steamy Kitchen - Wüsthof Classic Ikon Review (March 2017)',
      'Borough Kitchen - Classic vs Ikon Differences (August 2024)',
      'Amazon customer reviews (100+ analyzed across all products)',
      'Manufacturer websites (Wüsthof.com, Zwilling.com, Shun, Global)',
      'Reddit r/Cooking, r/AskCulinary, r/Chefit discussions',
    ],
    keyFindings: [
      'Wüsthof Ikon occupies "Goldilocks" position - not as delicate as Shun, more refined than Zwilling, warmer than Global',
      'Half bolster (Wüsthof) allows full-length sharpening throughout lifetime - major differentiator vs. Zwilling full bolster',
      'PEtec technology delivers measurable 20% sharper edge with 2x retention vs. standard German knives',
      'Zwilling offers 8 steak knives vs. Wüsthof\'s 4 - significant for entertaining',
      'Shun\'s free lifetime sharpening service adds ongoing value over product lifetime',
      'Global\'s seamless one-piece construction genuinely superior for hygiene (no crevices)',
      'Professional use varies: German knives (Wüsthof, Zwilling) are commercial workhorses; Japanese knives (Shun, Global) are professionals\' precision tools',
      'Edge retention: Harder steel (Shun 60-61 HRC) should hold edge longer, but users report Wüsthof PEtec at 58 HRC gets better longevity - composition matters as much as hardness',
      'Handle material strongly impacts user preference: PakkaWood (warm, grippy) vs. synthetic (practical, durable) vs. all-metal (modern, polarizing)',
    ],
    competitiveAnalysis: {
      whereWusthofWins: [
        'Superior ergonomics - half bolster with contoured POM handles universally praised as most comfortable',
        'Full-length sharpening capability - half bolster allows entire blade edge to be maintained throughout lifetime',
        'Professional kitchen standard - "easy answer" recommended by line cooks and chefs per Nothing But Knives',
        'PEtec edge technology - proprietary treatment delivers measurable performance advantage',
        'Complete set value - all 15 block slots filled with matching pieces, includes fully forged steak knives',
        'Lifetime durability track record - users commonly report 15-20+ years of heavy use',
        'Best compromise - tougher than Shun (won\'t chip), more refined than Zwilling, warmer than Global',
      ],
      whereCompetitorsWin: {
        zwilling: [
          'More steak knives (8 vs. 4) - better for entertaining',
          'Extra expansion slots in block - allows building custom collection',
          'Lower price point ($800-900 vs. $1,000+) - 15-20% less expensive',
          'Traditional aesthetic - classic three-rivet styling appeals to purists',
          'Officially dishwasher safe (though hand wash still recommended)',
        ],
        shun: [
          'Superior sharpness - 60-61 HRC vs. 58 HRC holds sharper edge',
          'Aesthetic beauty - Damascus pattern with tsuchime finish objectively more striking',
          'Lighter weight - significantly lighter, less fatigue for precision work',
          'Free lifetime sharpening - mail-in service adds ongoing value',
          'Food release - hammered tsuchime finish improves food release from blade',
          'More specialized knives - includes boning/fillet, nakiri, longer slicing knife',
        ],
        global: [
          'Most comprehensive set - 20 pieces vs. competitors\' 15-18',
          'Ultimate hygiene - seamless one-piece eliminates bacteria-harboring crevices',
          'Lightest weight - maximum agility for delicate work',
          'Unique design - distinctive aesthetic prevents "borrowing" in kitchens',
          '6 steak knives - more than Wüsthof\'s 4',
          'Lower price than Shun - $600-800 less for comprehensive set',
        ],
      },
    },
    buyerDecisionMatrix: [
      {
        need: 'Best all-around professional workhorse',
        recommendation: 'Wüsthof Ikon',
        reason: 'Perfect balance of durability, comfort, performance, and professional pedigree. Half bolster is key feature for lifetime value.',
      },
      {
        need: 'Traditional German knife, budget-conscious',
        recommendation: 'Zwilling Professional S',
        reason: '90% of Wüsthof quality for 20% less money. Extra steak knives. Full bolster for classic feel.',
      },
      {
        need: 'Precision slicing, artistic cooking, careful user',
        recommendation: 'Shun Premier',
        reason: 'Hardest, sharpest, most beautiful. Best for delicate work. Requires commitment to proper care.',
      },
      {
        need: 'Lightweight agility, maximum hygiene',
        recommendation: 'Global 20-Piece',
        reason: 'Lightest weight, seamless hygiene, comprehensive set. Unique aesthetic. Best for smaller hands.',
      },
      {
        need: 'Best for beginners transitioning to premium',
        recommendation: 'Wüsthof Ikon',
        reason: 'Forgiving durability, comfortable handles, will last through skill progression. Resists abuse better than Japanese options.',
      },
      {
        need: 'Professional line cook / restaurant kitchen',
        recommendation: 'Wüsthof Ikon or Zwilling',
        reason: 'Both handle commercial kitchen abuse. Wüsthof edges ahead on ergonomics for long shifts.',
      },
      {
        need: 'Home chef who entertains frequently',
        recommendation: 'Zwilling Professional S',
        reason: '8 steak knives vs. 4 makes difference for dinner parties. Extra block slots allow expansion.',
      },
      {
        need: 'Collector / knife enthusiast',
        recommendation: 'Shun Premier',
        reason: 'Most visually impressive. Damascus patterns make each knife unique. Display-worthy aesthetics.',
      },
    ],
    uncertainties: [
      'Exact long-term durability timelines vary by use intensity - estimates based on user reports',
      'Amazon ratings and review counts fluctuate - captured November 23, 2025 snapshot',
      'Shun VG-MAX edge retention claims vs. user reports suggest brittleness may offset hardness benefits',
    ],
  },
}
