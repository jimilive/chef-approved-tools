// ============================================================================
// WHAT IS MIREPOIX - Blog Data
// Migrated from inline (417 lines) to data-driven architecture
// ============================================================================

export const mirepoixData = {
  metadata: {
    title: "What is Mirepoix and Why Professional Chefs Use It",
    description: "Learn the French aromatic base that appears in professional kitchens worldwide. Understand the 2:1:1 ratio, dice sizes, cooking methods, and global variations.",
    publishedDate: "2025-01-20",
    lastUpdated: "2025-01-20",
    primaryKeyword: "mirepoix",
    secondaryKeywords: ["aromatic base", "French cooking", "holy trinity", "soffritto"],
    readTime: "11 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "What is Mirepoix"
  },

  hero: {
    title: "What is Mirepoix and Why Professional Chefs Use It",
    introduction: [
      "Mirepoix, the three-vegetable foundation of French cooking, appears in professional kitchens worldwide because it builds flavor depth that you can't taste directly but would notice immediately if it was missing.",
      "Understanding this aromatic base transforms dozens of recipes from good to professional-quality."
    ]
  },

  tableOfContents: [
    { id: "definition", label: "What Mirepoix Is (The Simple Definition)" },
    { id: "why-use", label: "Why Professional Kitchens Use Mirepoix" },
    { id: "variables", label: "Dice Size, Cooking Method, Fat Choice" },
    { id: "variations", label: "Global Variations Across Cuisines" },
    { id: "technique", label: "How to Prep Mirepoix Efficiently" },
    { id: "mistakes", label: "Common Mistakes to Avoid" },
    { id: "faq", label: "Frequently Asked Questions" }
  ],

  sections: [
    {
      id: "definition",
      title: "What Mirepoix Is (The Simple Definition)",
      content: [
        "Mirepoix is a combination of diced onions, carrots, and celery cooked in fat until softened. That's it. The ratio matters, the size of the dice matters, and the cooking method matters, but the concept is straightforward."
      ],
      ratio: {
        title: "Classic Mirepoix Ratio",
        parts: [
          { ingredient: "onion", amount: "2 parts", percentage: "50% of total volume" },
          { ingredient: "carrot", amount: "1 part", percentage: "25% of total volume" },
          { ingredient: "celery", amount: "1 part", percentage: "25% of total volume" }
        ],
        byWeight: "1 pound onions (roughly 2 large onions), 8 ounces carrots (roughly 3 medium carrots), 8 ounces celery (roughly 4 stalks with leaves removed) = 6 cups diced mirepoix"
      },
      history: {
        title: "History and Etymology",
        content: "The name comes from Charles-Pierre-Gaston François de Lévis, Duke of Mirepoix, an 18th-century French marshal whose chef popularized the mixture. But the technique predates the name by centuries. Aromatic vegetables cooked in fat as a flavor base appear in medieval European cooking, Middle Eastern cooking, and Asian cooking under different names."
      }
    },
    {
      id: "why-use",
      title: "Why Professional Kitchens Use Mirepoix",
      subsections: [
        {
          title: "It Builds Foundational Flavor",
          content: [
            "Mirepoix doesn't add a specific taste you can identify. It adds depth. The science: onions contain sulfur compounds that become sweet when cooked slowly. Carrots add natural sugars that caramelize. Celery contributes savory, slightly bitter notes that balance the sweetness. Combined, they create a flavor base that makes everything layered on top taste more complete."
          ]
        },
        {
          title: "It Replaces Multiple Ingredients",
          content: [
            "Professional kitchens value efficiency. Mirepoix provides what would otherwise require five or six separate aromatics. One prep step (dice mirepoix) replaces multiple steps (peel and dice onions, peel and dice carrots, wash and dice celery, measure garlic, measure herbs, measure spices).",
            "During high-volume service, nobody has time to measure individual aromatics for each pan. Mirepoix is pre-portioned, ready to go, consistent."
          ]
        },
        {
          title: "It Improves Stock Extraction",
          content: [
            "The most important use of mirepoix is in stocks. The vegetables serve as an extraction vehicle: as they cook, their cell walls break down and release enzymes that help pull flavor compounds and gelatin from bones into the liquid.",
            "Stock made with mirepoix has more body, richer flavor, and better gelatin content than stock made with bones and water alone. The vegetables themselves get discarded, but the extraction they enable is what makes professional stock different from basic stock."
          ]
        }
      ]
    },
    {
      id: "variables",
      title: "The Three Variables That Actually Matter",
      diceSize: {
        title: "Dice Size Determines Cooking Time and Flavor Extraction",
        intro: "Professional kitchens use three different dice sizes depending on the application:",
        sizes: [
          {
            name: "Small dice (¼ inch)",
            use: "For quick-cooking dishes like pan sauces, quick braises, or sautés. Softens in 5-8 minutes, releases flavor fast, integrates into the final dish. Use when the vegetables need to disappear. Nobody wants to bite into a chunk of carrot in a refined pan sauce."
          },
          {
            name: "Medium dice (½ inch)",
            use: "The standard for most applications. Takes 10-15 minutes to soften, provides steady flavor release throughout cooking, maintains some texture if you want visible vegetables. Efficient prep time, versatile application."
          },
          {
            name: "Large dice (¾-1 inch)",
            use: "For long-cooking stocks and braises. Won't break down during 6-8 hour simmers, releases flavor gradually over extended cooking, easier to strain out at the end. Use for stocks that simmer all day."
          }
        ]
      },
      cookingMethod: {
        title: "Cooking Method Changes the Flavor Profile",
        intro: "Mirepoix isn't always cooked the same way. The method you choose determines the final flavor:",
        methods: [
          {
            name: "Sweating (low heat, covered)",
            description: "Softens vegetables without browning. Preserves fresh, bright flavors. Use for white stocks, delicate fish sauces, light-colored soups. Professional kitchens sweat mirepoix for cream-based soups when they want vegetable flavor without any caramelization that would darken the soup."
          },
          {
            name: "Sautéing (medium-high heat, uncovered)",
            description: "Softens vegetables with light browning. Adds mild caramel notes without overpowering. Use for tomato sauces, braises, most stocks. The standard method: enough caramelization to add depth, not so much that it dominates."
          },
          {
            name: "Caramelizing (high heat, stirring frequently)",
            description: "Browns vegetables deeply for maximum flavor. Adds rich, sweet, complex notes. Use for brown stocks, rich gravies, deeply-flavored braises. The dark brown vegetables give finished stock its deep mahogany color."
          }
        ]
      },
      fatChoice: {
        title: "Fat Choice Affects the Base Flavor",
        intro: "Mirepoix is always cooked in fat. The fat carries and amplifies the aromatic compounds released by the vegetables. The fat you choose matters:",
        fats: [
          {
            name: "Butter",
            description: "Traditional French choice. Adds richness and mild dairy notes. Use for refined sauces, cream-based soups, French-style braises. Professional kitchens use clarified butter (to prevent burning) for mirepoix in pan sauces."
          },
          {
            name: "Olive oil",
            description: "Mediterranean choice. Adds fruity, slightly peppery notes. Use for Italian sauces, Mediterranean braises, rustic soups. Standard for marinara and tomato-based sauces."
          },
          {
            name: "Rendered animal fat",
            description: "Traditional for stocks. Adds deep, meaty flavor. Use bacon fat for pork stocks, chicken fat for chicken stocks, beef fat for beef stocks. This amplifies the protein flavor beyond what olive oil or butter can provide."
          }
        ]
      }
    },
    {
      id: "variations",
      title: "Global Variations Across Cuisines",
      intro: "The concept of aromatic vegetables cooked in fat as a flavor base appears in nearly every cuisine. The specific vegetables change, but the technique remains:",
      variations: [
        {
          name: "The Holy Trinity (Cajun/Creole Cooking)",
          description: "Replace carrots with green bell peppers. Same ratio: 2 parts onion, 1 part celery, 1 part green bell pepper. The bell pepper adds a vegetal, slightly bitter note that carrots don't provide. It's essential for authentic Cajun flavor in gumbo, jambalaya, and étouffée."
        },
        {
          name: "Soffritto (Italian Cooking)",
          description: "Add garlic, tomato paste, and sometimes pancetta to the base mirepoix. Onion, carrot, celery, and garlic sautéed in olive oil until soft, then tomato paste added and cooked until it darkens. The garlic and tomato paste intensify the base beyond what plain mirepoix provides. Used for Bolognese and many Italian braises."
        },
        {
          name: "Sofrito (Spanish/Latin American Cooking)",
          description: "Onion, garlic, tomatoes, and peppers (no carrots or celery). Cooked in olive oil until the tomatoes break down into a thick paste. The result is brighter, more acidic, and tomato-forward compared to French mirepoix. Used as the base for paella and many Spanish dishes."
        }
      ]
    },
    {
      id: "technique",
      title: "How to Prep Mirepoix Efficiently",
      professionalMethod: {
        title: "The Professional Method",
        intro: "Professional kitchens prep mirepoix in large batches during morning prep, enough for the entire day's service. Home cooks can replicate this efficiency:",
        steps: [
          {
            step: 1,
            instruction: "Prep vegetables separately, then combine.",
            detail: "Dice all onions first, all carrots second, all celery third. Don't alternate between vegetables. Every time you switch, you lose efficiency picking up a different vegetable, washing a different cutting board, resetting your knife rhythm."
          },
          {
            step: 2,
            instruction: "Use the correct ratio by weight, not volume.",
            detail: "Volume measurements are inconsistent because onions compress more than carrots. Professional kitchens weigh everything. Home cooks should do the same for consistency."
          },
          {
            step: 3,
            instruction: "Store in airtight containers with damp paper towels on top.",
            detail: "Mirepoix oxidizes quickly. Onions brown, carrots dry out, celery wilts. Cover prepped mirepoix with a damp paper towel, seal the container, refrigerate. It stays fresh for 48 hours."
          }
        ]
      },
      toolNote: {
        title: "The Tool That Matters Most",
        content: [
          "A sharp chef's knife with good balance makes mirepoix prep faster and produces better results. Sharp knives make clean cuts that preserve cell structure. The vegetables release less moisture during storage, staying firmer longer. Dull knives crush cells, releasing enzymes that cause browning and off-flavors.",
          "Mirepoix prepped with a dull knife turns brown and slimy within 12 hours. Mirepoix prepped with a sharp knife stays fresh for 48+ hours refrigerated."
        ]
      }
    },
    {
      id: "mistakes",
      title: "Common Mistakes to Avoid",
      mistakes: [
        {
          name: "Uneven Dice Sizes",
          problem: "¼-inch pieces next to ¾-inch pieces. Small pieces burn while large pieces stay raw. Uneven cooking means uneven flavor extraction.",
          fix: "Take an extra 60 seconds to dice consistently. All pieces should be roughly the same size within ⅛ inch. It's fine if onions are slightly larger than carrots (onions soften faster), but within each vegetable, consistency matters."
        },
        {
          name: "Cooking Over High Heat",
          problem: "Using high heat to \"save time.\" The onions burn around the edges before the carrots soften, and the final stock tastes bitter.",
          fix: "Medium heat, patience. Mirepoix takes 10-15 minutes to soften properly. There's no shortcut. If you try to rush it with high heat, you'll get burnt aromatics and harsh flavors."
        },
        {
          name: "Forgetting Salt",
          problem: "Mirepoix cooked without salt doesn't release moisture properly and stays drier than it should.",
          whyItMatters: "Vegetables need salt to release their moisture and flavors. Salt draws out water, which prevents steaming and enables proper sautéing. Professional kitchens salt mirepoix as soon as it hits the pan: a three-finger pinch of kosher salt per 4 cups of vegetables.",
          fix: "Salt isn't optional. It's a chemical catalyst that makes the entire process work. Always add salt when you add mirepoix to the pan."
        }
      ]
    },
    {
      id: "conclusion",
      title: "Putting It All Together",
      content: [
        "Mirepoix isn't flashy. It doesn't have visual drama or technical complexity. But professional kitchens worldwide use some form of aromatic vegetable base in nearly every refined savory dish.",
        "The reason: it's reliable. Dice it consistently, cook it properly, let it do its job, and the results are predictable. That matters in professional kitchens where the same dish needs to taste identical whether it's cooked on Tuesday or Saturday.",
        "Home cooks benefit from the same reliability. Master mirepoix (the ratio, the dice, the cooking method) and dozens of recipes suddenly become easier to execute. Stocks gain body, braises gain depth, sauces gain complexity. The vegetables themselves disappear, but their impact persists in every bite."
      ]
    }
  ],

  newsletterCTA: {
    slug: "what-is-mirepoix"
  },

  faq: {
    questions: [
      {
        question: "What is the correct mirepoix ratio?",
        answer: "The classic French ratio is 2 parts onion, 1 part carrot, 1 part celery by weight. For example: 1 pound onions (2 large), 8 ounces carrots (3 medium), 8 ounces celery (4 stalks). This produces approximately 6 cups diced mirepoix."
      },
      {
        question: "Why do professional kitchens use mirepoix?",
        answer: "Mirepoix builds foundational flavor depth without adding identifiable taste. It provides aromatic complexity in one step instead of measuring multiple seasonings. It's essential for stock extraction, helping pull flavor compounds and gelatin from bones. Professional kitchens value the efficiency and consistency."
      },
      {
        question: "What dice size should I use for mirepoix?",
        answer: "Small dice (¼ inch) for quick-cooking dishes and sauces. Medium dice (½ inch) for most applications (the standard). Large dice (¾-1 inch) for long-cooking stocks and braises. Consistent dice size within each batch ensures even cooking."
      },
      {
        question: "What's the difference between sweating, sautéing, and caramelizing mirepoix?",
        answer: "Sweating (low heat, covered) softens vegetables without browning for light-colored sauces. Sautéing (medium-high heat) adds mild caramel notes for tomato sauces and braises. Caramelizing (high heat, stirring frequently) creates deep brown color and rich flavor for brown stocks and gravies."
      },
      {
        question: "What is the Holy Trinity and how is it different from mirepoix?",
        answer: "Holy Trinity is the Cajun/Creole aromatic base: onion, celery, and green bell pepper (replacing carrots). Same 2:1:1 ratio. The bell pepper adds vegetal, slightly bitter notes essential for authentic gumbo, jambalaya, and étouffée. It's the Louisiana version of French mirepoix."
      },
      {
        question: "Should I peel vegetables for mirepoix?",
        answer: "For stocks: don't peel, just wash thoroughly. The peels add color and flavor. For sauces where vegetables will be left in: peel carrots, trim celery ends, peel onions as usual. The goal is clean flavor without bitterness."
      },
      {
        question: "Why does my mirepoix burn before softening?",
        answer: "Heat is too high. Mirepoix needs steady, moderate heat (medium or medium-low) to release flavors without burning. Cook for 10-15 minutes. There's no shortcut. High heat creates burnt aromatics and harsh, bitter flavors."
      },
      {
        question: "What's the difference between soffritto and sofrito?",
        answer: "Soffritto (Italian) is mirepoix plus garlic and sometimes tomato paste/pancetta, sautéed in olive oil. Sofrito (Spanish/Latin) uses onion, garlic, tomatoes, and peppers (no carrots or celery), cooked until tomatoes break down. Different aromatic bases for different cuisines."
      }
    ]
  },

  relatedArticles: [
    { href: "/blog/making-stock-professional-chef-method", title: "Making Stock: The Professional Method" },
    { href: "/blog/knife-skills-how-to-hold-chef-knife", title: "Master Knife Skills for Efficient Prep" }
  ]
}
