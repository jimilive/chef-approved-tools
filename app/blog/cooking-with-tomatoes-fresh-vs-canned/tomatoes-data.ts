// ============================================================================
// COOKING WITH TOMATOES: FRESH VS CANNED - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const tomatoesData = {
  breadcrumb: {
    category: "Blog",
    title: "Cooking with Tomatoes: Fresh vs Canned"
  },

  hero: {
    title: "Cooking with Tomatoes: Fresh vs Canned (And When to Use Each)",
    introduction: [
      "Understanding when to use fresh tomatoes versus canned tomatoes, and how to get the best results from each in your cooking."
    ]
  },

  quickAnswer: {
    optionA: {
      title: "Use Fresh Tomatoes When:",
      points: [
        "Raw applications (salads, salsas, sandwiches)",
        "Quick-cooked dishes under 15 minutes",
        "Peak summer season (July-September)",
        "Buying from farmers markets or local growers"
      ]
    },
    optionB: {
      title: "Use Canned Tomatoes When:",
      points: [
        "Long-cooked sauces (marinara, bolognese, pizza sauce)",
        "Soups, stews, and braises",
        "Off-season cooking (November-June)",
        "You need consistent, concentrated tomato flavor"
      ]
    }
  },

  comparisonTable: {
    title: "Fresh vs Canned Tomatoes: At a Glance",
    columnA: "Fresh Tomatoes",
    columnB: "Canned Tomatoes",
    features: [
      {
        feature: "Flavor (Peak Season)",
        columnA: { rating: "Excellent", description: "Unbeatable when vine-ripened and local" },
        columnB: { rating: "Very Good", description: "Consistent quality year-round" }
      },
      {
        feature: "Flavor (Off-Season)",
        columnA: { rating: "Poor", description: "Picked green, gassed, bland" },
        columnB: { rating: "Excellent", description: "Vine-ripened at peak, packed fresh" }
      },
      {
        feature: "Raw Applications",
        columnA: { rating: "Excellent", description: "Essential for salads, salsas, sandwiches" },
        columnB: { rating: "Poor", description: "Wrong texture and flavor" }
      },
      {
        feature: "Long-Cooked Sauces",
        columnA: { rating: "Limited", description: "Too watery, need 2x quantity" },
        columnB: { rating: "Excellent", description: "Already concentrated, consistent" }
      },
      {
        feature: "Convenience",
        columnA: { rating: "Limited", description: "Peeling, seeding, chopping required" },
        columnB: { rating: "Excellent", description: "Ready to use, no prep" }
      },
      {
        feature: "Consistency",
        columnA: { rating: "Limited", description: "Varies by season and source" },
        columnB: { rating: "Excellent", description: "Same quality every time" }
      },
      {
        feature: "Cost",
        columnA: { rating: "Limited", description: "$3-6/lb, seasonal availability" },
        columnB: { rating: "Very Good", description: "$2-4 per 28oz can" }
      },
      {
        feature: "Shelf Life",
        columnA: { rating: "Poor", description: "Days at room temp, week refrigerated" },
        columnB: { rating: "Excellent", description: "Years in pantry" }
      }
    ]
  },

  faq: {
    questions: [
      {
        question: "Should I use whole, crushed, or diced canned tomatoes?",
        answer: "Whole peeled gives you the most control. Crush them by hand for your desired texture. Crushed is convenient for smooth sauces (marinara, pizza sauce). Diced works for chunky sauces, soups, and chilis. All three are just tomatoes processed differently. Start with whole peeled and you can make the others yourself."
      },
      {
        question: "Can I substitute fresh for canned in recipes?",
        answer: "Yes, but you'll need more fresh tomatoes (they're watery). Use 2 pounds of fresh tomatoes for every 28oz can. Roast or cook them down first to concentrate flavor. Otherwise your sauce will be thin and bland."
      },
      {
        question: "What's the best brand of canned tomatoes?",
        answer: "For special dishes: San Marzano DOP (Cento, La Valle). For everyday cooking: Muir Glen Organic, Bianco DiNapoli. For budget cooking: Hunt's or any domestic brand (not generic store brand, those are too watery)."
      }
    ]
  },

  relatedLinks: [
    { href: "/blog/understanding-acids-cooking", text: "Understanding Acids in Cooking" },
    { href: "/blog/onions-cooking-guide", text: "Complete Guide to Cooking Onions" },
    { href: "/blog/benefits-cooking-with-garlic", text: "Benefits of Cooking with Garlic" },
    { href: "/blog/fat-is-flavor", text: "Why Fat is Flavor" }
  ]
}
