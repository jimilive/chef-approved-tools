// ============================================================================
// GUIDE TO COOKING OILS & SMOKE POINTS - Educational Blog Data
// Migrated from inline (453 lines) to data-driven architecture
// ============================================================================

export const educationalData = {
  metadata: {
    title: "Guide to Cooking Oils & Smoke Points",
    description: "Understanding different cooking oils, their smoke points, flavor profiles, and which oils work best for different cooking methods.",
    publishedDate: "2025-10-02",
    lastUpdated: "2025-10-24",
    primaryKeyword: "cooking oils",
    secondaryKeywords: ["smoke point", "avocado oil", "olive oil", "canola oil"],
    readTime: "8 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "Guide to Cooking Oils & Smoke Points"
  },

  hero: {
    title: "Guide to Cooking Oils & Smoke Points: Which Oil for Which Job",
    introduction: [
      "Understanding different cooking oils, their smoke points, flavor profiles, and which oils work best for different cooking methods."
    ]
  },

  sections: [
    {
      id: "intro",
      title: "",
      restaurantReality: {
        title: "Restaurant Reality",
        content: [
          "**Working the sauté station,** a new line cook grabbed the olive oil for searing steaks. I stopped him before he hit the heat.",
          "\"Use this.\" I handed him the canola oil. \"Olive oil will smoke before the steak gets a crust. You'll fill the kitchen with smoke and the steak will taste burnt.\"",
          "\"But isn't olive oil healthier?\"",
          "\"Not when it's smoking. Different oils for different jobs. High heat needs high smoke point. Olive oil is for finishing or moderate heat.\" **Every oil has a purpose. Use the wrong one and you're fighting your ingredients.**"
        ]
      },
      intro: [
        "After 24 years in professional kitchens, I've learned: the oil matters as much as the technique. Use the right oil and cooking becomes easier. Use the wrong one and you'll fight smoke, burnt flavors, and poor results.",
        "Here's everything you need to know about cooking oils."
      ]
    },
    {
      id: "smoke-point",
      title: "What is a Smoke Point (And Why It Matters)",
      definition: "**Smoke point:** The temperature where oil starts to break down and smoke.",
      whyItMatters: [
        "Smoking oil tastes burnt and bitter",
        "Smoking oil fills your kitchen with smoke (and triggers smoke alarms)",
        "Past smoke point, oil breaks down into harmful compounds",
        "High-heat cooking needs high smoke point oils"
      ],
      rule: "**The rule:** Match the oil's smoke point to your cooking temperature.",
      smokePointTable: {
        title: "Smoke Point Quick Reference",
        headers: ["Oil", "Smoke Point", "Best Use"],
        rows: [
          { oil: "Avocado Oil", smokePoint: "520°F", bestUse: "Searing, high-heat cooking" },
          { oil: "Refined Canola", smokePoint: "400°F", bestUse: "All-purpose, frying, searing" },
          { oil: "Grapeseed Oil", smokePoint: "420°F", bestUse: "High-heat sautéing, searing" },
          { oil: "Peanut Oil", smokePoint: "450°F", bestUse: "Deep frying, stir-frying" },
          { oil: "Extra Virgin Olive", smokePoint: "375°F", bestUse: "Medium heat, finishing" },
          { oil: "Butter", smokePoint: "350°F", bestUse: "Medium heat, finishing" },
          { oil: "Toasted Sesame", smokePoint: "350°F", bestUse: "Finishing only (burns easily)" }
        ]
      }
    },
    {
      id: "essential-oils",
      title: "The Essential Oils for Your Kitchen",
      oils: [
        {
          name: "Neutral Oil (Canola, Vegetable, or Grapeseed)",
          smokePoint: "400-420°F",
          flavor: "Neutral (doesn't affect food taste)",
          bestFor: [
            "High-heat searing (steaks, chops, chicken)",
            "Stir-frying",
            "Deep frying",
            "Any time you don't want oil flavor"
          ],
          professionalStandard: "Most restaurant kitchens use canola or blended vegetable oil for 90% of cooking. It's cheap, consistent, and handles high heat."
        },
        {
          name: "Extra Virgin Olive Oil",
          smokePoint: "375°F",
          flavor: "Fruity, peppery, grassy (varies by brand/region)",
          bestFor: [
            "Medium-heat sautéing",
            "Roasting vegetables (under 400°F)",
            "Finishing dishes",
            "Salad dressings and vinaigrettes",
            "Dipping bread"
          ],
          proTip: "Don't waste expensive olive oil on high-heat cooking. The flavor compounds break down above 375°F. Save good olive oil for finishing or drizzling."
        },
        {
          name: "Butter",
          smokePoint: "350°F",
          flavor: "Rich, creamy, slightly nutty",
          bestFor: [
            "Medium-heat sautéing",
            "Finishing sauces",
            "Basting meat (butter-basting a steak)",
            "Cooking eggs",
            "Flavor boost at the end of dishes"
          ],
          whyEssential: "Butter adds flavor that no oil can match. It makes food taste rich and satisfying.",
          fatFlavorLink: "/blog/fat-is-flavor"
        },
        {
          name: "Toasted Sesame Oil",
          smokePoint: "350°F",
          flavor: "Intensely nutty, toasted, aromatic",
          bestFor: [
            "Finishing Asian dishes (stir-fries, noodles, rice)",
            "Drizzling over vegetables",
            "Adding to marinades and dressings",
            "A few drops for huge flavor impact"
          ],
          howToUse: [
            "**Never cook with it at high heat** (burns easily, tastes bitter)",
            "Add 1-2 teaspoons at the very end of stir-fries",
            "Mix into sauces and dressings for depth"
          ]
        }
      ]
    },
    {
      id: "cooking-methods",
      title: "How to Use Oils for Different Cooking Methods",
      methods: [
        {
          name: "High-Heat Searing (450°F+)",
          goal: "Get a hard crust on meat or fish",
          bestOils: [
            "Avocado oil (520°F smoke point)",
            "Canola oil (400°F smoke point)",
            "Grapeseed oil (420°F smoke point)",
            "Refined peanut oil (450°F smoke point)"
          ],
          dontUse: "Butter (burns), extra virgin olive oil (smokes), unrefined oils (smoke and burn)"
        },
        {
          name: "Medium-Heat Sautéing (325-375°F)",
          bestOils: [
            "Extra virgin olive oil (adds flavor)",
            "Butter (adds richness)",
            "Canola oil (neutral)"
          ],
          proTip: "Start with neutral oil, finish with butter. This gives you higher heat tolerance plus butter flavor at the end."
        },
        {
          name: "Deep Frying (350-375°F)",
          bestOils: [
            "Peanut oil (best flavor, highest smoke point)",
            "Canola oil (cheap, neutral, works great)",
            "Vegetable oil (cheap alternative)"
          ],
          dontUse: "Olive oil (too expensive, smokes), butter (burns instantly), specialty oils (waste of money)"
        },
        {
          name: "Finishing (No Heat)",
          bestOils: [
            "Extra virgin olive oil (fruity, peppery)",
            "Toasted sesame oil (nutty, aromatic)",
            "Nut oils (walnut, hazelnut, pistachio)",
            "Infused oils (chili oil, garlic oil, herb oil)"
          ],
          examples: "Drizzle olive oil over grilled steak, sesame oil over stir-fried noodles, walnut oil over roasted beets."
        }
      ],
      chefTechnique: {
        title: "Chef's Technique: Layering Fats",
        intro: "**Professional kitchens layer fats for maximum flavor:**",
        steps: [
          "**Start with neutral oil** for high-heat searing or sautéing",
          "**Add butter mid-cook** for basting or deglazing",
          "**Finish with good olive oil** for brightness and complexity"
        ]
      }
    },
    {
      id: "mistakes",
      title: "Common Oil Mistakes (And How to Fix Them)",
      mistakes: [
        {
          number: 1,
          title: "Using Extra Virgin Olive Oil for High-Heat Searing",
          problem: "Kitchen fills with smoke, oil tastes burnt, food has bitter flavor.",
          fix: "Use neutral oil (canola, grapeseed) for searing. Save olive oil for finishing or medium heat."
        },
        {
          number: 2,
          title: "Not Heating the Pan Before Adding Oil",
          problem: "Food sticks, steams instead of sears, absorbs too much oil.",
          fix: "Preheat the pan first, THEN add oil. This prevents sticking and gives better browning.",
          maillardLink: "/blog/maillard-reaction-browning-flavor"
        },
        {
          number: 3,
          title: "Using Too Much Oil",
          problem: "Food tastes greasy, heavy, or oily.",
          fix: "Use just enough to coat the pan or ingredients. A thin film is plenty. More oil doesn't mean better cooking—it just means greasy food."
        }
      ]
    },
    {
      id: "takeaway",
      title: "The Takeaway: Match the Oil to the Job",
      intro: "Cooking oils aren't interchangeable. Each has a purpose. Use the right one and cooking becomes easier.",
      quickReference: [
        { use: "High-Heat Searing/Frying", oils: "Canola, avocado, peanut, grapeseed (neutral, high smoke point)" },
        { use: "Medium-Heat Sautéing", oils: "Olive oil, butter, canola (adds flavor, moderate heat)" },
        { use: "Finishing/Drizzling", oils: "Extra virgin olive oil, sesame oil, nut oils (flavor without heat)" },
        { use: "All-Purpose Cooking", oils: "Canola or vegetable oil (cheap, neutral, versatile)" }
      ],
      professionalApproach: "Keep two oils in your kitchen: neutral oil (canola) for high heat, and good olive oil for finishing. That covers 95% of home cooking. Add specialty oils (sesame, avocado, butter) as needed.",
      closing: "Master oils and everything you cook tastes better. Not fancy techniques. Not expensive equipment. Just using the right fat for the job."
    }
  ],

  faq: {
    questions: [
      {
        question: "What's the healthiest cooking oil?",
        answer: "For high-heat: Avocado oil or refined canola (stable at high temps). For medium-heat/finishing: Extra virgin olive oil (high in monounsaturated fats, antioxidants). For omega-3s: Flaxseed oil (no heat), walnut oil (finishing only). 'Healthiest' depends on use. All oils are calorie-dense. Focus on using the right oil for the job and not overusing any oil."
      },
      {
        question: "Can I mix different oils?",
        answer: "Yes! Mixing oils combines benefits. Examples: Olive oil + canola = flavor + higher smoke point. Butter + canola = flavor + prevents burning. Professional kitchens do this all the time."
      },
      {
        question: "What oil do restaurants use?",
        answer: "Most use canola or blended vegetable oil for 90% of cooking (cheap, neutral, high smoke point). They save olive oil, butter, and specialty oils for finishing or flavor."
      }
    ]
  },

  relatedArticles: [
    { href: "/blog/fat-is-flavor", title: "Why Fat is Flavor (And How to Use It)" },
    { href: "/blog/maillard-reaction-browning-flavor", title: "The Maillard Reaction: Why Browning = Flavor" },
    { href: "/blog/complete-guide-to-salts", title: "The Complete Guide to Salts" },
    { href: "/reviews/lodge-seasoned-cast-iron-3-skillet-bundle", title: "Lodge Cast Iron Skillet Bundle Review" }
  ]
}
