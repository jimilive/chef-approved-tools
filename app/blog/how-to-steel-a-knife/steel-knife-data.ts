// ============================================================================
// HOW TO STEEL A KNIFE - Educational Blog Data
// Migrated from inline (450 lines) to data-driven architecture
// ============================================================================

export const educationalData = {
  metadata: {
    title: "How to Steel a Knife (The Right Way to Hone Like a Chef)",
    description: "Learn how to steel a knife properly using a honing steel. Professional chef guide to honing vs sharpening, perfect technique, and top tool recommendations.",
    publishedDate: "2025-09-13",
    lastUpdated: "2025-09-13",
    primaryKeyword: "how to steel a knife",
    secondaryKeywords: ["honing steel", "knife honing", "sharpening vs honing", "honing technique"],
    readTime: "6 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "How to Steel a Knife"
  },

  hero: {
    title: "How to Steel a Knife (The Right Way to Hone Like a Chef)",
    introduction: [
      "If you spend any time in a professional kitchen, you'll see one tool come out far more often than a whetstone: the sharpening steel. It's that long, rod-shaped tool chefs use to \"steel\" their knives before prep. You've probably seen it in movies: quick, rhythmic strokes before the cook dives into slicing onions like a magician."
    ]
  },

  howToSchema: {
    name: "How to Steel a Knife",
    description: "Learn proper knife honing technique using a honing steel. Professional chef guide to maintaining razor-sharp edges between sharpenings.",
    datePublished: "2025-09-13",
    totalTime: "PT2M",
    tools: ["Honing steel (traditional rod)", "Kitchen knife"],
    steps: [
      { name: "Grip the Steel Securely", text: "Hold the honing steel vertically with the tip resting on a cutting board or towel for stability. Keep your grip firm but relaxed." },
      { name: "Position the Knife", text: "Place the knife heel against the steel at a 15-20 degree angle (roughly the angle of a matchbook). The blade should be perpendicular to the steel." },
      { name: "Draw the Blade Down", text: "Using light pressure, draw the knife down and across the steel in a sweeping motion from heel to tip. Maintain the same angle throughout the stroke." },
      { name: "Alternate Sides", text: "Repeat on the opposite side of the blade. Perform 5-8 strokes per side, alternating after each stroke for even honing." },
      { name: "Test the Edge", text: "Test sharpness with the paper test: hold paper vertically and slice down. A properly honed knife cuts cleanly without tearing." }
    ]
  },

  // Products fetched from Supabase
  products: {
    victorinox8: 'victorinox-fibrox-8-inch-chefs-knife',
    victorinox10: 'victorinox-fibrox-10-inch-chefs-knife',
    henckelsSteel: 'henckels-sharpening-steel'
  },

  sections: [
    {
      id: "intro",
      title: "",
      content: [
        "But what exactly are they doing? Are they sharpening the knife? Why do they do it so often? And how should you do it at home without nicking your fingers or wrecking your edge?",
        "In this guide, we'll walk through **how to steel a knife properly**: the difference between honing and sharpening, the right technique, and why it's one of the easiest ways to extend the life of your blades."
      ],
      seeAlsoLinks: [
        { href: "/reviews/victorinox-fibrox-8-inch-chefs-knife", text: "Victorinox Fibrox 8\" Chef's Knife Review" },
        { href: "/guides/knife-care", text: "Knife Care Guide" }
      ]
    },
    {
      id: "what-steeling-means",
      title: "What \"Steeling\" a Knife Actually Means",
      content: [
        "**Steeling a knife is not sharpening it.** When you sharpen a knife, you remove metal from the edge to create a new bevel. When you hone or steel it, you're simply **realigning the existing edge** that's bent or rolled from use.",
        "A honing steel brings that fine edge back to center, making your knife feel sharp again without grinding away precious metal. Think of honing as alignment maintenance; sharpening is edge reconstruction."
      ],
      sharpeningGuideLink: { href: "/reviews/norton-im200-tri-stone-sharpener", text: "sharpening with a tri-stone" }
    },
    {
      id: "why-honing-matters",
      title: "Why Honing Matters More Than You Think",
      benefits: [
        { icon: "✅", label: "Cleaner, safer cuts", description: "less pressure means fewer slips." },
        { icon: "✅", label: "Longer edge life", description: "between sharpenings." },
        { icon: "✅", label: "Consistent performance", description: "across proteins, veggies, and herbs." },
        { icon: "✅", label: "Protects your investment", description: "in quality blades like the Victorinox Fibrox knives." }
      ],
      closing: "Regular honing is quick and prevents your knife from dulling prematurely. A small ritual with big returns.",
      purpleCafeCallout: {
        title: "From Purple Café",
        content: "At Purple Café, we honed knives before every service. Two hundred covers nightly meant knives needed to be sharp constantly. A quick session with the honing steel (15 seconds per knife) kept our Victorinox and specialty blades performing perfectly throughout rush. It became muscle memory: clock in, grab your knives, steel them, then start prep."
      }
    },
    {
      id: "tools",
      title: "The Tools You'll Need",
      tools: [
        {
          name: "A Quality Honing Steel",
          description: "The essential tool here is a dependable **honing steel**. The Henckels 10-Inch Sharpening Steel is a classic: balanced, grippy, and durable, with just enough abrasion to realign an edge without stripping metal. It's the same kind I've used for decades in professional kitchens.",
          product: "henckelsSteel"
        },
        {
          name: "A Chef's Knife Worth Caring For",
          description: "Your knife should already be sharp. The Victorinox Fibrox 8-Inch Chef's Knife is perfect for home cooks, while the Victorinox Fibrox 10-Inch Chef's Knife offers extra reach and heft for larger jobs. Both respond beautifully to a steel.",
          products: ["victorinox8", "victorinox10"]
        }
      ]
    },
    {
      id: "step-by-step",
      title: "How to Steel a Knife (Step-by-Step)",
      steps: [
        { step: 1, title: "Grip the steel vertically", content: "Hold it steady on a towel or board for control." },
        { step: 2, title: "Set your angle (15–20°)", content: "Western knives ≈ 20°, Japanese ≈ 15°." },
        { step: 3, title: "Draw the blade down and across", content: "Heel to tip in one smooth motion." },
        { step: 4, title: "Alternate sides", content: "Six to eight passes per side is ideal." },
        { step: 5, title: "Wipe and test", content: "Clean the blade and test on paper or tomato skin." }
      ],
      closing: "Keep movements deliberate and consistent. Speed isn't the goal; precision is."
    },
    {
      id: "honing-vs-sharpening",
      title: "Honing vs. Sharpening",
      comparisonTable: {
        headers: ["Action", "Tool", "Purpose", "Frequency"],
        rows: [
          { cells: ["Honing", "Honing steel", "Realigns edge", "Every few uses"] },
          { cells: ["Sharpening", "Whetstone or sharpener", "Removes metal to form new edge", "Every 3–6 months"] }
        ]
      }
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes to Avoid",
      mistakes: [
        "Using too much pressure.",
        "Changing angles mid-stroke.",
        "Speeding instead of focusing on accuracy.",
        "Honing dirty knives.",
        "Using a damaged or worn-out steel."
      ]
    },
    {
      id: "pro-tips",
      title: "Pro Chef Tips",
      tips: [
        "Hone *before* cooking, not after.",
        "Listen for a clean, even sound. It signals the right angle.",
        "Alternate strokes evenly on both sides.",
        "Replace your steel every few years if it smooths out.",
        "Store your steel safely to prevent damage."
      ]
    },
    {
      id: "maintenance-schedule",
      title: "Maintenance Schedule",
      schedule: [
        "Hone every 2–3 uses (daily for pros).",
        "Sharpen every 3–6 months.",
        "Use wood or plastic boards, never glass.",
        "Wash and dry knives immediately after use.",
        "Store safely in a block, strip, or guard."
      ]
    },
    {
      id: "recommended-tools",
      title: "Recommended Tools",
      intro: "Professional-Grade Tools for Home Cooks:",
      tools: [
        { icon: "🪄", name: "Henckels 10-Inch Sharpening Steel", product: "henckelsSteel" },
        { icon: "🔪", name: "Victorinox Fibrox 8\" Chef's Knife", product: "victorinox8" },
        { icon: "🍖", name: "Victorinox Fibrox 10\" Chef's Knife", product: "victorinox10" }
      ],
      disclaimer: "We earn commission at no extra cost to you.",
      seeAlsoLinks: [
        { href: "/guides/best-chef-knives", text: "Best Kitchen Knives for Everyday Cooking" },
        { href: "/kitchen-bundle", text: "Kitchen Starter Kit" }
      ]
    },
    {
      id: "final-thoughts",
      title: "Final Thoughts",
      content: [
        "Learning how to steel a knife is a simple but necessary skill. Once you master it, every prep task feels smoother, cleaner, and more professional. Your knives will last longer, perform better, and turn kitchen work into a true craft.",
        "Grab your Henckels Honing Steel, pick up your favorite Victorinox Fibrox Knife, and keep that edge chef-sharp, because the best cooks always respect their tools."
      ]
    }
  ],

  faq: {
    questions: [
      {
        question: "What's the difference between honing and sharpening a knife?",
        answer: "Honing (using a steel) realigns the edge without removing metal, while sharpening (using a stone) removes metal to create a new edge. At Purple Café, we honed knives before every service but only sharpened every 2-4 weeks. Think of honing as straightening a bent edge and sharpening as rebuilding a dull edge. Honing maintains sharpness; sharpening restores it."
      },
      {
        question: "How often should I steel my kitchen knives?",
        answer: "Steel (hone) your knives every 2-3 uses for home cooking, or before every shift in professional kitchens. At Purple Café (2007-2012), we required every cook to hone their knives at the start of service. Regular honing extends the time between sharpenings from weeks to months. If honing no longer restores sharpness, it's time to sharpen."
      },
      {
        question: "What angle should I hold the knife against the honing steel?",
        answer: "Hold the knife at 15-20 degrees against the steel, roughly the angle of a matchbook. This matches the factory edge angle on most kitchen knives. Consistency matters more than precision. After 6 years honing knives daily at Purple Café, the angle becomes muscle memory. Start with the matchbook visual until it feels natural."
      },
      {
        question: "Should I use a ceramic steel or traditional steel rod?",
        answer: "Traditional steel rods realign edges (true honing), while ceramic steels lightly abrade and sharpen. For daily maintenance, traditional steel is better because it's gentler and extends knife life. Ceramic steels remove metal and should be used sparingly. At Purple Café, we used traditional Henckels steel rods exclusively. Save ceramic for knives that need more than realignment but less than full sharpening."
      },
      {
        question: "How many strokes should I use when steeling a knife?",
        answer: "Use 5-8 strokes per side for regular maintenance. At Purple Café, our standard was 6 strokes alternating sides (12 total). More strokes don't improve results. Consistency and proper angle matter more than quantity. If 8 strokes don't restore the edge, honing won't help; the knife needs sharpening."
      },
      {
        question: "Why isn't my knife getting sharper when I steel it?",
        answer: "Honing steel realigns edges but doesn't sharpen dull knives. If steeling doesn't restore sharpness, your knife is dull and needs actual sharpening with a stone. Other causes: wrong angle (too steep or too shallow), damaged steel rod (inspect for grooves), or applying too much pressure (light pressure works better). Remember: steeling maintains sharp knives; it can't fix dull ones."
      },
      {
        question: "Can I damage my knife by using a honing steel?",
        answer: "You can damage knives by using excessive pressure, wrong angle, or cheap diamond-coated steels that remove too much metal. Traditional smooth steel rods used properly won't damage knives. We honed the same knives daily for 6 years at Purple Café without issues. Use light pressure (let the steel do the work), maintain consistent angle, and choose quality traditional steel over aggressive diamond or ceramic options."
      },
      {
        question: "Do I need to steel Japanese knives differently than German knives?",
        answer: "Yes. Japanese knives need a shallower angle (10-15 degrees) compared to German knives (15-20 degrees), and lighter pressure because Japanese steel is harder and more brittle. At Purple Café, we had both: Wüsthof German knives and Shun Japanese knives. Japanese knives also need honing less frequently because harder steel holds edges longer but chips more easily with rough treatment."
      },
      {
        question: "Should I steel a knife before or after using it?",
        answer: "Steel knives before use, not after. At Purple Café, we required all cooks to hone at the start of their shift, not the end. Honing before use ensures optimal sharpness when you need it. Honing after use when the knife is already dirty is less effective and can transfer food particles to the steel, reducing its effectiveness."
      },
      {
        question: "How do I test if my knife is properly honed?",
        answer: "The paper test: hold paper vertically and slice. A well-honed knife cuts cleanly without tearing. Or the tomato test: rest the blade on tomato skin and slice with no downward pressure; it should glide through. At Purple Café, we used the fingernail test: gently rest the edge on your thumbnail. If it grips instead of sliding, it's sharp. These tests confirm proper edge alignment after honing."
      }
    ]
  },

  relatedArticles: [
    { href: "/reviews/victorinox-fibrox-8-inch-chefs-knife", title: "Victorinox Fibrox 8\" Chef's Knife", description: "The professional-grade chef's knife that responds beautifully to regular honing and sharpening." },
    { href: "/guides/knife-care", title: "Complete Knife Care Guide", description: "Professional knife maintenance techniques including honing, sharpening, storage, and cleaning." }
  ]
}
