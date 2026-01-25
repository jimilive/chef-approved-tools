// ============================================================================
// COMPLETE GUIDE TO SALTS - Educational Blog Data
// Migrated from inline (389 lines) to data-driven architecture
// ============================================================================

export const educationalData = {
  metadata: {
    title: "Cooking Salts Guide: Kosher vs Sea Salt vs Fleur de Sel",
    description: "Understanding different types of salt, their uses in cooking, and why choosing the right salt actually matters for your food.",
    publishedDate: "2025-10-05",
    lastUpdated: "2025-10-24",
    primaryKeyword: "cooking salts",
    secondaryKeywords: ["kosher salt", "sea salt", "fleur de sel", "Diamond Crystal", "finishing salt"],
    readTime: "7 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "Cooking Salts Guide: Kosher vs Sea Salt vs Fleur de Sel"
  },

  hero: {
    title: "Cooking Salts Guide: Kosher vs Sea Salt vs Fleur de Sel",
    introduction: [
      "Understanding different types of salt, their uses in cooking, and why choosing the right salt actually matters for your food."
    ]
  },

  sections: [
    {
      id: "intro",
      title: "",
      restaurantReality: {
        title: "Restaurant Reality",
        content: [
          "**First week on the line,** I grabbed the salt closest to me and started seasoning vegetables for service. The sous chef stopped me immediately.",
          "\"What salt are you using?\"",
          "\"Uh... this one?\" I held up the container.",
          "\"That's table salt. You'll over-season everything. Use this.\" He handed me Diamond Crystal kosher salt. \"Same volume, half the sodium. You can actually taste as you go without destroying the dish.\" That lesson changed everything. Salt isn't just salt. The type you use changes how you cook, how food tastes, and whether you can season accurately. **Professional kitchens don't use random salt. They use specific salts for specific purposes.**"
        ]
      },
      intro: [
        "After 24 years in professional kitchens, I can tell you: most home cooks use the wrong salt, in the wrong amount, at the wrong time.",
        "Here's everything you need to know about salt to cook like a professional."
      ]
    },
    {
      id: "why-salt-matters",
      title: "Why Salt Type Actually Matters",
      intro: [
        "Salt is sodium chloride. Chemically, all salt is the same.",
        "But physically? Completely different."
      ],
      whatChanges: [
        { label: "Crystal size", description: "Fine vs coarse vs flaky" },
        { label: "Density", description: "How much fits in a teaspoon" },
        { label: "Dissolving speed", description: "Fast vs slow" },
        { label: "Texture", description: "Crunchy vs melting" },
        { label: "Mineral content", description: "Pure vs trace minerals" }
      ],
      closing: "These differences change how you measure, how you season, and how food tastes.",
      example: "**Example:** 1 teaspoon of Diamond Crystal kosher salt = 1.5 teaspoons of Morton kosher salt = 2 teaspoons of fine sea salt by weight."
    },
    {
      id: "essential-salts",
      title: "The Four Essential Salts",
      salts: [
        {
          name: "Kosher Salt (Diamond Crystal)",
          whatItIs: "Large, flaky crystals with hollow pyramid shapes. Very low density.",
          whyProfessionalsUseIt: [
            "Easy to pinch and control",
            "Dissolves quickly on food",
            "Difficult to over-salt (large crystals, low density)",
            "Clean, pure flavor",
            "No additives"
          ],
          bestFor: [
            "All-purpose cooking",
            "Seasoning meat, vegetables, pasta water",
            "Salting in layers as you cook",
            "Any situation where you're tasting and adjusting"
          ],
          proTip: {
            title: "Pro Tip: Diamond Crystal vs Morton",
            warning: "**These are NOT interchangeable!**",
            comparison: [
              { brand: "Diamond Crystal", description: "Hollow crystals, low density, 1:1 in recipes" },
              { brand: "Morton Kosher", description: "Dense crystals, higher sodium by volume" }
            ]
          }
        },
        {
          name: "Fine Sea Salt",
          whatItIs: "Evaporated seawater, ground to fine powder. Slightly more mineral content than table salt.",
          bestFor: [
            "Baking (precise measurements matter)",
            "Dry rubs and spice blends",
            "Situations where you can't taste and adjust",
            "Seasoning at the table"
          ]
        },
        {
          name: "Table Salt",
          whatItIs: "Highly refined sodium chloride, very fine crystals, usually with iodine and anti-caking agents added.",
          whyNotUseIt: [
            "Hard to control (fine crystals, easy to over-salt)",
            "Chemical taste from additives",
            "Doesn't dissolve as evenly as kosher salt",
            "Professional kitchens don't use it"
          ]
        },
        {
          name: "Finishing Salt (Flaky Salt)",
          whatItIs: "Large, irregular, crunchy flakes. Examples: Maldon, Fleur de Sel, Jacobsen.",
          whySpecial: [
            "Crunchy texture adds interest",
            "Bright, clean salt flavor",
            "Melts slowly on the tongue",
            "Adds visual appeal"
          ],
          bestFor: [
            "Finishing grilled meats",
            "Topping fresh tomatoes, avocado",
            "Chocolate and caramel desserts",
            "Fresh bread with butter",
            "Anything where salt texture matters"
          ]
        }
      ]
    },
    {
      id: "seasoning-stages",
      title: "How to Season Food at Different Stages",
      intro: "Professional cooking isn't about adding salt at the end. It's about seasoning in layers throughout the cooking process.",
      stages: [
        {
          stage: 1,
          title: "Season Raw Ingredients",
          when: "Before cooking starts",
          why: "Salt penetrates and seasons from within. It also helps proteins retain moisture and vegetables stay crisp.",
          how: [
            "Salt meat 30-60 minutes before cooking (or overnight for roasts)",
            "Salt vegetables right before cooking (or they'll release water)",
            "Salt pasta water heavily (it should taste like the ocean)"
          ]
        },
        {
          stage: 2,
          title: "Season As You Cook",
          when: "While building a dish",
          why: "Each ingredient needs its own seasoning. If you only salt at the end, the dish tastes flat.",
          example: "When making a soup, salt the onions as you sauté them, salt the stock when you add it, salt the vegetables as they cook, taste and adjust at the end. This builds depth.",
          onionsLink: "/blog/onions-cooking-guide"
        },
        {
          stage: 3,
          title: "Season At The Finish",
          when: "Right before serving",
          why: "This is your final adjustment. It adds brightness and brings all the flavors forward."
        }
      ],
      chefTechnique: {
        title: "Chef's Technique: Tasting As You Go",
        content: "**Professional cooks taste constantly.** Not at the end, but throughout. After every addition, every stage, every adjustment: taste. This is how you develop instincts for seasoning. You learn what \"not enough\" tastes like, what \"just right\" tastes like, and what \"too much\" tastes like. If you're not tasting as you cook, you're guessing. And guessing doesn't work."
      }
    },
    {
      id: "common-mistakes",
      title: "Common Salt Mistakes (And How to Fix Them)",
      mistakes: [
        {
          number: 1,
          title: "Using Measurements Instead of Tasting",
          problem: "Recipes say \"1 teaspoon salt\" but your salt, your ingredients, and your taste are different from the recipe writer's.",
          fix: "Use recipes as a starting point. Season conservatively, taste, and adjust. Your palate is the final judge."
        },
        {
          number: 2,
          title: "Only Salting At The End",
          problem: "Food tastes flat and one-dimensional.",
          fix: "Season in layers. Salt the onions, salt the meat, salt the sauce. Each ingredient needs its own seasoning."
        },
        {
          number: 3,
          title: "Using Morton When The Recipe Calls for Kosher Salt",
          problem: "Your food is way too salty.",
          fix: "If you only have Morton, use 2/3 the amount the recipe calls for. Or switch to Diamond Crystal and follow recipes as written."
        }
      ]
    },
    {
      id: "takeaway",
      title: "The Takeaway: Salt Smart, Not Hard",
      intro: "Salt is the most important ingredient in your kitchen. But it's not about expensive specialty salts or complicated techniques.",
      itsAbout: [
        "Using the right salt for the job (kosher for cooking, finishing for texture)",
        "Seasoning in layers (not just at the end)",
        "Tasting constantly (your palate is the judge)",
        "Building instincts through practice"
      ],
      quickReference: [
        { salt: "Diamond Crystal kosher salt", use: "All-purpose cooking, seasoning in layers, everyday use", link: "/reviews/diamond-crystal-kosher-salt" },
        { salt: "Fine Sea Salt", use: "Baking, dry rubs, table salt substitute" },
        { salt: "Finishing Salt (Maldon, Fleur de Sel)", use: "Garnish, texture, special occasions" },
        { salt: "Table Salt", use: "Baking (if recipe specifies), iodine needs" }
      ],
      closing: "Master salt and everything you cook tastes better. It's the foundation of good cooking. Not fancy techniques, not expensive equipment. Just salt."
    }
  ],

  faq: {
    questions: [
      {
        question: "Is kosher salt healthier than table salt?",
        answer: "No. Both are sodium chloride. Kosher salt just has no additives. If you need iodine, table salt or iodized sea salt is better."
      },
      {
        question: "What's the best salt for everyday cooking?",
        answer: "Diamond Crystal kosher salt. It's what professional kitchens use. It's cheap, consistent, and easy to control."
      },
      {
        question: "Can you over-salt food?",
        answer: "Yes, but it's hard to fix. Add slowly, taste constantly. If you do over-salt, add acid (lemon juice, vinegar), fat (butter, cream), or dilute (more liquid or ingredients)."
      }
    ]
  },

  relatedArticles: [
    { href: "/blog/understanding-acids-cooking", title: "Understanding Acids in Cooking" },
    { href: "/blog/fat-is-flavor", title: "Why Fat is Flavor (And How to Use It)" },
    { href: "/blog/onions-cooking-guide", title: "Complete Guide to Cooking Onions" },
    { href: "/blog/potatoes-cooking-guide", title: "Complete Guide to Cooking Potatoes" }
  ]
}
