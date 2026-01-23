// ============================================================================
// HOW TO COOK PERFECT PASTA - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const pastaData = {
  metadata: {
    title: "How to Cook Perfect Pasta: The Professional's Guide to Al Dente Every Time",
    description: "Master pasta cooking from a professional chef with 24 years of restaurant experience. Learn proper water ratios, timing, salt levels, and the secret to restaurant-quality pasta at home.",
    publishedDate: "2025-10-21",
    lastUpdated: "2025-10-24",
    primaryKeyword: "how to cook perfect pasta",
    secondaryKeywords: ["al dente pasta", "pasta cooking technique", "restaurant pasta"],
    readTime: "9 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "How to Cook Perfect Pasta"
  },

  hero: {
    title: "How to Cook Perfect Pasta: The Professional's Guide to Al Dente Every Time",
    introduction: [
      "Master pasta cooking from a professional chef with 24 years of restaurant experience. Learn proper water ratios, timing, salt levels, and the secret to restaurant-quality pasta at home."
    ]
  },

  howToSchema: {
    name: "How to Cook Perfect Pasta",
    description: "Professional chef technique for cooking pasta al dente every time. Learn proper water ratios, salting, timing, and the pasta water trick.",
    datePublished: "2025-10-21",
    totalTime: "PT15M",
    tools: ["Large pot (6+ quarts)", "Colander", "Tongs or spider strainer", "Timer"],
    steps: [
      { name: "Boil Plenty of Water", text: "Use 4-6 quarts of water per pound of pasta. Too little water causes pasta to stick and cook unevenly." },
      { name: "Salt the Water Generously", text: "Add 1-2 tablespoons kosher salt per pound of pasta. The water should taste like the sea. This is your only chance to season the pasta itself." },
      { name: "Add Pasta and Stir", text: "Add pasta to rapidly boiling water. Stir immediately and occasionally during cooking to prevent sticking." },
      { name: "Cook to Al Dente", text: "Cook 1-2 minutes less than package directions. Pasta should have slight resistance when bitten, it continues cooking in the sauce." },
      { name: "Reserve Pasta Water", text: "Before draining, save 1 cup of starchy pasta water. This starchy water helps emulsify and thicken your sauce." },
      { name: "Finish in the Sauce", text: "Transfer pasta directly to sauce (don't rinse). Toss with sauce over heat for 1-2 minutes, adding pasta water as needed for silky consistency." }
    ]
  },

  faq: {
    questions: [
      {
        question: "Should I add oil to the pasta water?",
        answer: "No. Oil floats on top and does nothing to prevent sticking. Proper water amount and occasional stirring prevent sticking. Oil actually makes sauce slide off pasta."
      },
      {
        question: "How much pasta per person?",
        answer: "2 oz dried pasta per person as a side, 4 oz as a main course. That's 1/4 pound for 2 people as main course."
      },
      {
        question: "Why does restaurant pasta taste better than mine?",
        answer: "Three reasons: (1) They salt the water properly, (2) They finish pasta in the sauce with pasta water, (3) They add fat at the end. Follow those three steps and yours will taste restaurant-quality."
      }
    ]
  },

  relatedLinks: [
    { href: "/blog/benefits-cooking-with-garlic", text: "Benefits of Cooking with Garlic" },
    { href: "/blog/fat-is-flavor", text: "Why Fat is Flavor" },
    { href: "/blog/understanding-acids-cooking", text: "Understanding Acids in Cooking" },
    { href: "/blog/vegetable-roasting-guide", text: "Vegetable Roasting Guide" }
  ]
}
