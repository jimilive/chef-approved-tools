/**
 * Ninja Air Fryer AF101 Review Data
 *
 * This file contains all content for the Ninja AF101 air fryer review page.
 * Separated from page.tsx for maintainability and reusability.
 */

export const reviewData = {
  // METADATA
  metadata: {
    title: "Ninja Air Fryer AF101: 4-Month Daily Use Test (Honest Results)",
    description: "Professional chef tests the Ninja Air Fryer AF101 for 4 months of daily use. What this countertop convection oven does well and what disappoints.",
    ogTitle: "Ninja Air Fryer AF101 Review: 4-Month Professional Test",
    ogDescription: "After 4 months testing wings, frozen foods, and everything in between.",
    testingPeriod: "4 Months Testing",
    tier: 3
  },

  // PRODUCT SLUG
  productSlug: "ninja-air-fryer-af101",

  // TRACKING DATA
  tracking: {
    testingPeriod: "4 months",
    hook: "85% of deep-fryer results with zero oil mess",
  },

  // BREADCRUMB
  breadcrumb: {
    productName: "Ninja Air Fryer AF101"
  },

  // SECTION 1: HERO
  hero: {
    title: "Ninja Air Fryer AF101 Review: 4-Month Wing & Frozen Food Test",
    authorName: "Scott Bradley",
    authorCredentials: "24 Years in Professional Kitchens",
    rating: 4.4,
    tierBadge: {
      tier: 3,
      text: "Tier 3: Expert Evaluation",
      icon: "🔬"
    },
    verdict: "After 4 months of testing with 24 years of professional kitchen experience, the Ninja AF101 is a legitimate cooking tool that delivers approximately 85% of deep-fryer results. Wings come out crispy-skinned with juicy meat inside. However, this is a compact convection oven with a 4-quart capacity sized for small households, not families or gatherings. The non-stick coating requires gentle handling with only wood, silicone, or plastic utensils.",
    verdictStrong: "delivers approximately 85% of deep-fryer results",
    ctaText: "Check Amazon Price →",
    badge: {
      text: "4 MONTHS WING & FROZEN FOOD TESTING",
      className: "bg-orange-500/20 border-orange-500/30 text-orange-200"
    }
  },

  // TESTING IN PROGRESS
  testingInProgress: {
    title: "Testing In Progress",
    intro: "I purchased the Ninja AF101 in October 2025 specifically to review it for this site. I am currently at 4 months of testing with fresh wings (multiple batches), plus every type of frozen food I could find at the grocery store.",
    nextUpdate: "April 2026 (6-month mark with non-stick durability assessment)",
    tier2Upgrade: "October 2026 (12-month mark with long-term performance data)"
  },

  // SECTION 2: PROFESSIONAL CONTEXT
  professionalContext: {
    title: "Professional Context: Why I Can Evaluate This",
    paragraphs: [
      "Over 24 years in professional kitchens, I have used everything from commercial deep fryers at Mellow Mushroom (churning out hundreds of wings and fries per night) to $15,000 commercial convection ovens at Purple Café and Feierabend. I understand airflow patterns, heating element placement, and what separates good convection from great convection. I know what properly fried chicken wings should taste like: crispy skin with juicy meat inside, proper Maillard reaction browning, no greasiness.",
      "Air fryers are essentially compact, high-powered convection ovens. The marketing calls them revolutionary, but the technology is just rapid air circulation around food, something commercial convection ovens have done since the 1970s. The question is: can a $70-90 consumer appliance replicate commercial convection performance? After 4 months of testing, I have the answer."
    ]
  },

  // SECTION 3: REAL-WORLD TESTING
  realWorldTesting: {
    title: "Real-World Testing: 4 Months with Wings & Frozen Foods",
    tests: [
      {
        title: "Fresh Whole Wings Test (The Signature Dish)",
        setup: "Fresh whole chicken wings, 400°F, 20 minutes total (flipped halfway).",
        results: "Wings came out with crispy skin and juicy meat, approximately 85% as good as deep-fried. The skin crisped properly, the fat rendered correctly, and the meat stayed moist. However, they lack the deep golden-brown color of true deep-fried wings. The texture is excellent, but the visual appearance is slightly lighter."
      },
      {
        title: "Frozen Foods Test (Fries, Tots, Tenders)",
        setup: "",
        results: "Frozen foods are where the AF101 truly shines. French fries, tater tots, chicken tenders, and breaded cutlets all came out crispy and evenly cooked. The crisper plate design prevents soggy bottoms, and the even airflow ensures consistent results. Follow package instructions and adjust based on your preference. The quick reference guide is often inaccurate."
      },
      {
        title: "The Non-Stick Coating Reality",
        setup: "",
        results: "Warning: I scratched the non-stick coating with a metal spatula during testing. The scratches are permanent and will reduce basket lifespan. Use only wood, silicone, or plastic utensils. This is the AF101's biggest weakness: the coating is not durable enough for daily use without careful handling."
      }
    ]
  },

  // Pros & Cons title overrides
  prosConsTitle: "What Works vs. Limitations",
  prosTitle: "What Works",
  consTitle: "Limitations",

  // Who Should Buy
  whoShouldBuy: {
    title: "Who This Is For",
    perfectForTitle: "Buy the Ninja AF101 if you:",
    considerAlternativesTitle: "Skip the Ninja AF101 if you:",
    perfectFor: [
      "Cook for 2-3 people regularly: The 4-quart capacity is perfect for small households",
      "Want fried food without oil management and cleanup: Zero oil means no hot oil handling, disposal, or splatter cleanup",
      "Make frozen foods frequently: Fries, tots, tenders, and cutlets all come out crispy and evenly cooked",
      "Have limited counter space: Compact footprint (8.5\" x 10.25\" x 11\") fits under most cabinets",
      "Want simple controls without complexity: Temperature dial and timer are straightforward"
    ],
    considerAlternatives: [
      "Cook for families of 4+ people regularly: The 4-quart capacity means cooking in batches",
      "Need true deep-fryer results: Air frying is 85% as good, not 100%",
      "Want a window to check food without opening: No interior light or viewing window",
      "Expect the non-stick coating to handle metal utensils: It will not, and scratches are permanent"
    ]
  },

  // FAQ data
  faq: {
    title: "Frequently Asked Questions",
    items: [] as { question: string; answer: string }[],
  },

  // FAQ SCHEMA DATA
  faqData: [
    {
      question: "Do air fryers really work or are they just hype?",
      answer: "After 4 months of testing with 24 years of professional kitchen experience, air fryers are legitimate cooking tools, not gimmicks. The Ninja AF101 delivers approximately 85% of deep-fryer results using rapid air circulation. Wings come out crispy-skinned with juicy meat inside. However, they are compact convection ovens, not magic. You need proper technique and temperature control."
    },
    {
      question: "How many chicken wings fit in the Ninja AF101?",
      answer: "Approximately 5 full chicken wings in a single layer without overcrowding. For best results, wings should not touch or overlap. If you are cooking for more than 2-3 people, expect to cook in multiple batches. The 4-quart capacity is sized for small households, not families or gatherings."
    },
    {
      question: "Can I use metal utensils in the Ninja air fryer?",
      answer: "No. Use only wood, silicone, or plastic utensils. I learned this the hard way by scratching the non-stick coating with a metal spatula. The scratches are permanent and will reduce the lifespan of the basket. Treat the non-stick surface gently to maximize longevity."
    },
    {
      question: "How does the Ninja AF101 compare to deep frying?",
      answer: "The AF101 delivers approximately 85% of deep-fryer results. Wings have crispy skin and juicy meat, but they lack the deep golden-brown color and slight greasiness of true deep-fried wings. The texture is excellent, but the visual appearance and exact flavor profile are slightly different. For home use without oil management and cleanup, this is an excellent trade-off."
    },
    {
      question: "Is the Ninja AF101 loud?",
      answer: "The fan is audible but not loud. It is quieter than commercial fryers and louder than complete silence. The noise level is comparable to a household convection oven. You will hear it running, but it would not disrupt a conversation in the next room. For apartment living or open-concept homes, the noise is acceptable."
    },
    {
      question: "Why should I follow package instructions instead of the quick reference guide?",
      answer: "The included quick reference guide is generic and often inaccurate for specific products. Frozen food manufacturers test their products extensively and provide timing based on their specific formulations. Following package instructions and adjusting based on your preference produces better results than following the guide blindly. After 2-3 test runs per food type, you will dial in perfect timing."
    }
  ],

  // WHERE TO BUY
  whereToBuy: {
    title: "Where to Buy",
    introText: "The Ninja AF101 Air Fryer is available through Amazon with Prime shipping, verified customer reviews, and easy returns. At ~$70-90, this delivers genuine value for small households.",
    disclaimer: "As an Amazon Associate, I earn from qualifying purchases. Amazon Prime members get free 2-day shipping."
  },

  // BOTTOM LINE
  bottomLine: {
    title: "Final Recommendation",
    paragraphs: [
      "After 4 months of testing, the Ninja AF101 delivers 85% of deep-fryer results with zero oil mess. For small households who want fried food without the hassle, this is a genuine convenience tool, not a novelty.",
      "The 4-quart capacity is perfect for 2-3 people, the compact footprint fits under most cabinets, and the simple controls make it easy to use. However, the non-stick coating requires gentle handling, and you'll cook in batches for larger groups."
    ],
    finalRating: {
      overall: "⭐⭐⭐⭐ 4.4/5",
      breakdown: [
        "Wing Performance: 4.5/5 (85% of deep-fryer results)",
        "Frozen Foods: 5/5 (Perfect for fries, tots, tenders)",
        "Ease of Use: 5/5 (Simple controls, easy cleanup)",
        "Capacity: 3/5 (Great for 2-3 people, limited for families)",
        "Durability Concerns: 3.5/5 (Non-stick coating scratches easily)"
      ],
      wouldBuyAgain: "Would I buy this again? Yes, for a small household. No, if cooking for 4+ people regularly."
    },
    ctaText: "Check Amazon Price →"
  },

  // TESTING RESULTS
  testingResults: {
    title: "Testing Results",
    testingEnvironment: [
      { label: "Testing Duration", value: "4 months dedicated testing" },
      { label: "Location", value: "Home kitchen counter" },
      { label: "Primary Use", value: "Frozen foods, fresh wings, reheating" },
      { label: "Testing Frequency", value: "4-5 times per week" },
      { label: "Batch Testing", value: "Multiple batches of wings, fries, vegetables" }
    ],
    outstandingPerformance: [
      "Delivers approximately 85% of deep-fryer results on wings and frozen foods",
      "4-quart capacity perfect for 2-3 people or side dishes for families",
      "Ceramic-coated basket provides genuine non-stick release",
      "Simple controls with minimal learning curve, works out of the box",
      "Compact footprint fits under most kitchen cabinets",
      "Dehydrate function adds unexpected versatility for jerky and dried fruit"
    ],
    minorConsiderations: [
      "4-quart capacity limits batch size, not ideal for families of 4+",
      "Loud at full speed, will wake light sleepers during early morning use",
      "Preset times often too long, expect to adjust cooking times through trial and error",
      "Non-stick coating requires careful utensil selection (no metal)",
      "Not a replacement for deep frying, results are close but not identical"
    ],
    sections: [
      {
        title: "Wing Performance Test",
        content: "Wings were the real test. After years of deep-frying wings in restaurant kitchens, I know what properly cooked wings should taste like. The Ninja AF101 delivers crispy skin with juicy meat, approximately 85% of deep-fryer results. The key is proper technique: pat wings completely dry, light oil coating, don't overcrowd the basket. Results won't fool a professional, but they'll satisfy anyone looking for healthier fried food at home."
      },
      {
        title: "Frozen Food Convenience",
        content: "Where the AF101 truly shines is frozen food. Frozen fries come out crispier than any oven can achieve. Frozen chicken tenders, fish sticks, mozzarella sticks, all better than oven directions suggest. The rapid air circulation creates that crispy exterior that ovens can't match. For households that regularly cook frozen convenience foods, this alone justifies the purchase."
      },
      {
        title: "Capacity Reality Check",
        content: "The 4-quart basket fits approximately 2 pounds of wings or fries in a single layer. That's enough for 2-3 people as a main dish or 4-5 as an appetizer. For larger families or entertaining, you'll need to cook in batches. This isn't a criticism. It's the trade-off for a compact footprint. Know your household's needs before buying."
      },
      {
        title: "Daily Use Observations",
        content: "After 4 months of regular use, the ceramic coating shows no wear. Cleanup is genuinely easy: a quick wipe for light use, soapy water soak for stubborn residue. The unit preheats in 3 minutes versus 15+ for a conventional oven. For quick weeknight cooking, this speed matters. I find myself using it for reheating pizza (better than microwave) and roasting vegetables (faster than oven) more than expected."
      }
    ]
  },

  // PERFORMANCE ANALYSIS
  performanceAnalysis: {
    title: "Performance Analysis",
    sections: [
      {
        title: "What an Air Fryer Actually Is",
        content: "Let's be clear: an air fryer is a compact convection oven with a powerful fan. It doesn't 'fry' anything. It circulates hot air rapidly around food. The result is similar to frying because the high-speed air creates a crispy exterior without submerging food in oil. After 24 years in professional kitchens, I initially dismissed air fryers as gimmicks. I was wrong. For home use, they deliver genuine value."
      },
      {
        title: "The 85% Rule",
        content: "Air fryer results are approximately 85% as good as deep frying, close enough to satisfy most people, different enough that purists will notice. Wings are crispy but not quite as crackling. Fries are excellent but lack that oil-soaked richness. If you need 100% authentic fried taste, keep your deep fryer. If 85% with dramatically less mess and oil appeals to you, the air fryer makes sense."
      },
      {
        title: "Temperature Accuracy and Consistency",
        content: "The Ninja AF101 maintains accurate temperature throughout cooking, no hot spots, no cold zones. The temperature range (105°F-400°F) covers everything from dehydrating at low heat to high-heat crisping. The controls are responsive and accurate. This matters because consistent temperature means consistent results batch after batch."
      },
      {
        title: "Honest Comparison to Commercial Equipment",
        content: "In professional kitchens, we used commercial convection ovens and dedicated fryers. Those cost thousands and require ventilation. The Ninja AF101 delivers home-appropriate results for under $100 with no installation required. It won't replace professional equipment, but it was never meant to. For home cooking, it fills the gap between a standard oven and restaurant equipment."
      },
      {
        title: "Long-Term Durability Projection",
        content: "Based on 4 months of testing and 24 years of equipment experience: expect 3-5 years of regular home use. The motor and heating element are straightforward and reliable. The weak point is typically the non-stick coating. Treat it gently with proper utensils and it should last. At this price point, 3-5 years represents good value."
      }
    ]
  },

  // RELATED PRODUCTS
  relatedProducts: {
    title: "Complete Your Kitchen Setup",
    products: [
      {
        emoji: "🍗",
        name: "Lodge Cast Iron Skillet",
        description: "For when you want true deep-frying results. Perfect complement to air fryer. Use Lodge for high-heat searing, Ninja for convenient frozen foods.",
        href: "/reviews/lodge-seasoned-cast-iron-3-skillet-bundle"
      },
      {
        emoji: "🔪",
        name: "Victorinox 8\" Chef Knife",
        description: "Professional knife for prepping ingredients before they go in the air fryer. Perfect balance and edge retention.",
        href: "/reviews/victorinox-fibrox-8-inch-chefs-knife"
      },
      {
        emoji: "📋",
        name: "John Boos Cutting Board",
        description: "The prep surface that matches the Ninja's quality. Stage ingredients before air frying for professional results.",
        href: "/reviews/john-boos-platinum-commercial-cutting-board"
      }
    ]
  },

  // LEGACY PRODUCT DATA (fallback for Supabase)
  legacyProductData: {
    name: "Ninja Air Fryer AF101",
    slug: "ninja-air-fryer-af101",
    brand: "Ninja",
    model: "AF101",
    sku: "AF101",
    gtin13: "",
    dealStatus: "normal" as const,
    rating: 4.4,
    reviewCount: 1,
    category: "Appliances",
    pros: [
      "Delivers ~85% of deep-fryer results for wings",
      "Frozen foods come out crispy and evenly cooked",
      "Compact footprint fits under most cabinets",
      "Simple controls: temperature dial and timer",
      "Zero oil means no hot oil handling or cleanup",
      "Dishwasher-safe basket and crisper plate",
      "Quiet operation compared to commercial fryers",
      "Affordable price point (~$70-90)"
    ],
    cons: [
      "4-quart capacity limits batch size (5 wings max)",
      "Non-stick coating scratches easily with metal utensils",
      "No viewing window or interior light",
      "Quick reference guide is often inaccurate",
      "Wings lack deep golden-brown color of deep-frying",
      "Requires cooking in batches for families of 4+"
    ],
    affiliateLinks: [],
    inStock: true,
    expertRating: 4.4,
    expertOpinion: "After 4 months of testing with 24 years of professional kitchen experience, the Ninja AF101 is a legitimate cooking tool that delivers approximately 85% of deep-fryer results. Wings come out crispy-skinned with juicy meat inside. However, this is a compact convection oven with a 4-quart capacity sized for small households, not families or gatherings. The non-stick coating requires gentle handling with only wood, silicone, or plastic utensils.",
    dateAdded: "2025-10-01",
    lastUpdated: "2025-10-01"
  }
}

// Populate FAQ items from faqData (single source of truth)
reviewData.faq.items = reviewData.faqData.map(faq => ({
  question: faq.question,
  answer: faq.answer
}))
