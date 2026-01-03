// ============================================================================
// HOW TO MAKE A PERFECT ROUX: THE FOUNDATION OF GREAT SAUCES - Blog Data
// Migrated from inline (369 lines) to data-driven architecture
// ============================================================================

export const rouxData = {
  metadata: {
    title: "How to Make a Perfect Roux: The Foundation of Great Sauces",
    description: "Learn how to make a roux the right way and master the foundation of countless professional sauces.",
    publishedDate: "2025-09-24",
    lastUpdated: "2025-10-24",
    primaryKeyword: "how to make roux",
    secondaryKeywords: ["roux", "béchamel", "white sauce", "dark roux", "gumbo"],
    readTime: "10 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "How to Make a Perfect Roux"
  },

  hero: {
    title: "How to Make a Perfect Roux: The Foundation of Great Sauces",
    introduction: [
      "The single most important sauce technique you can learn—how to make a proper roux, why it matters, and how professionals use it to create everything from béchamel to gumbo."
    ]
  },

  howToSchema: {
    name: "How to Make a Perfect Roux",
    description: "Master the foundation of classic sauces. Learn to make white, blonde, and dark roux with professional technique for béchamel, gravy, and gumbo.",
    datePublished: "2025-09-24",
    totalTime: "PT10M",
    tools: ["Heavy-bottomed saucepan", "Whisk or wooden spoon", "Measuring cups"],
    steps: [
      { name: "Measure Equal Parts", text: "Use equal parts fat and flour by weight (e.g., 2 oz butter to 2 oz flour). This ratio ensures proper thickening without greasiness or pastiness." },
      { name: "Melt the Fat", text: "Melt butter (or other fat) over medium heat until foaming subsides. Don't let it brown unless making a dark roux." },
      { name: "Add Flour All at Once", text: "Add all the flour at once and stir immediately. This prevents lumps and ensures even cooking." },
      { name: "Cook and Stir Constantly", text: "Stir constantly to prevent burning. For white roux: 2-3 minutes (no color). For blonde roux: 4-5 minutes (light tan). For dark roux: 30-40 minutes (deep brown)." },
      { name: "Test for Raw Flour Smell", text: "The roux is ready when the raw flour smell disappears and it smells nutty. White roux should still be pale; darker roux develops deeper color and aroma." },
      { name: "Add Liquid or Cool", text: "Either add hot liquid gradually while whisking to make a sauce, or spread on a plate to cool for later use. Roux keeps refrigerated for weeks." }
    ]
  },

  sections: [
    {
      id: "intro",
      title: "",
      content: [
        "If there's one technique that separates cooks who make good sauces from cooks who make **great** sauces, it's knowing how to make a proper roux.",
        "A roux is absurdly simple—just flour and fat cooked together—but it's the foundation of countless classic dishes: béchamel, velouté, cheese sauce, gumbo, étouffée, sawmill gravy, and more. Master the roux, and you've unlocked an entire category of cooking.",
        "But here's the thing: most home cooks either don't know how to make a roux at all, or they make it wrong—raw-tasting flour, lumpy sauce, burnt bits, grainy texture. In 24 years of professional cooking, I've made thousands of gallons of roux-based sauces. Let me show you the right way—the professional way—so your sauces are always smooth, flavorful, and perfectly thickened."
      ]
    },
    {
      id: "what-is-roux",
      title: "What is a Roux?",
      definition: "**A roux** (pronounced \"roo\") is equal parts fat and flour cooked together to create a thickening agent for sauces, soups, and stews. That's it. Two ingredients, one technique, infinite applications.",
      science: "**The science:** Flour contains starch granules. When you heat starch in fat, it gelatinizes—the granules swell and thicken liquid. But raw flour tastes terrible. By cooking the flour in fat first, you:",
      benefits: [
        { label: "Eliminate the raw flour taste", detail: "that chalky, pasty flavor" },
        { label: "Develop nutty, toasted flavor", detail: "especially in darker roux" },
        { label: "Create a stable thickening base", detail: "smooth, not lumpy" }
      ],
      ratio: "**The basic ratio:** 1:1 by weight. Equal parts fat and flour. That's the classic French technique, and it works perfectly every time.",
      restaurantReality: {
        title: "Restaurant Reality: The Line Cook's First Lesson",
        content: "At Purple Café, one of the first things you learned as a new line cook was **how to make a proper blonde roux for béchamel**. Not because it's difficult, but because it teaches you patience, attention, and heat control—the foundations of professional cooking. I watched new cooks rush it, burn it, or walk away and ruin an entire batch. The Chef would make them start over until they got it right. **\"If you can't make a roux,\"** he'd say, **\"you can't work my line.\"** Why? Because a roux-based sauce is on almost every menu. Cheese sauce, cream sauce, gravy, soup bases—they all start with a roux. Get this right, and you've got a fundamental building block for hundreds of dishes. **The lesson:** Mastery of fundamentals isn't optional. It's the foundation everything else is built on."
      }
    },
    {
      id: "three-types",
      title: "The Three Types of Roux",
      intro: "Roux is classified by color and cooking time. Each has different uses and flavor profiles:",
      types: [
        {
          name: "White Roux",
          cookingTime: "2-3 minutes",
          colorClass: "bg-amber-100",
          details: [
            { label: "Color", value: "Barely colored, pale ivory, almost white" },
            { label: "Cooking time", value: "2-3 minutes (just until raw flour smell is gone)" },
            { label: "Flavor", value: "Neutral, mild, clean" },
            { label: "Thickening power", value: "Strongest (least flavor compounds, most starch available)" },
            { label: "Uses", value: "Béchamel, white sauces, cream soups, alfredo, mac and cheese" }
          ]
        },
        {
          name: "Blonde Roux",
          cookingTime: "5-7 minutes",
          colorClass: "bg-amber-300",
          details: [
            { label: "Color", value: "Light tan, golden, like wet sand" },
            { label: "Cooking time", value: "5-7 minutes (stir constantly as it darkens)" },
            { label: "Flavor", value: "Mild nutty notes, slightly toasted" },
            { label: "Thickening power", value: "Medium (some starch broken down, still plenty of thickening)" },
            { label: "Uses", value: "Velouté, chicken gravy, lighter cream sauces, bisques" }
          ]
        },
        {
          name: "Brown/Dark Roux",
          cookingTime: "15-45 minutes",
          colorClass: "bg-amber-700",
          details: [
            { label: "Color", value: "Milk chocolate to dark chocolate brown" },
            { label: "Cooking time", value: "15-45 minutes (patience required, constant stirring)" },
            { label: "Flavor", value: "Deeply nutty, toasted, complex, almost caramelized" },
            { label: "Thickening power", value: "Weakest (starch gelatinization reduced by prolonged cooking)" },
            { label: "Uses", value: "Gumbo, étouffée, brown gravy, Cajun/Creole sauces" }
          ]
        }
      ]
    },
    {
      id: "how-to-make",
      title: "How to Make a White Roux (Step-by-Step)",
      equipment: ["Heavy-bottomed saucepan (even heat distribution)", "Whisk or wooden spoon", "Measuring cups"],
      ingredients: ["4 tablespoons butter (or oil, if preferred)", "4 tablespoons all-purpose flour"],
      steps: [
        {
          title: "Step 1: Melt the Fat",
          content: "Heat your pan over medium heat. Add butter and let it melt completely. It should foam slightly but not brown. If using oil, just heat until shimmering."
        },
        {
          title: "Step 2: Add the Flour",
          content: "When the fat is melted, add all the flour at once. Immediately start whisking to combine. The mixture will look like wet sand or paste—that's normal."
        },
        {
          title: "Step 3: Cook (2-3 Minutes)",
          content: "Whisk constantly over medium heat. You're looking for:",
          bullets: [
            "The raw flour smell to disappear (about 2 minutes)",
            "The mixture to become smooth and slightly bubbly",
            "No color change (it should stay pale)"
          ]
        },
        {
          title: "Step 4: Use or Cool",
          content: "Either use immediately (for hot sauces) or cool completely before storing (refrigerate up to a week, freeze up to 3 months)."
        }
      ],
      summary: "**That's it.** Two ingredients, 3 minutes, perfect foundation for béchamel or any white sauce.",
      proTip: {
        title: "Pro Tip: The Ratio Rule",
        intro: "For a medium-thick sauce (like classic béchamel), use this ratio:",
        ratio: "3 tablespoons roux : 1 cup liquid",
        details: "That's about 1.5 tbsp butter + 1.5 tbsp flour per cup of milk. Want thicker? Use 4-5 tablespoons roux per cup. Want thinner? Use 2 tablespoons per cup. **Why this matters:** Most recipes don't tell you the ratio—they just give amounts. Understanding the ratio means you can scale any sauce up or down and adjust thickness to your preference."
      }
    },
    {
      id: "common-mistakes",
      title: "Common Roux Mistakes (And Fixes)",
      hasIcon: true,
      mistakes: [
        {
          name: "Lumpy Sauce",
          cause: "Hot roux + hot liquid added too fast, or not enough whisking.",
          fix: {
            prevention: "Temperature contrast (hot + cold) and constant whisking",
            recovery: "Push through a fine-mesh strainer, reheat, and continue whisking"
          }
        },
        {
          name: "Raw Flour Taste",
          cause: "Didn't cook the roux long enough before adding liquid.",
          fix: "Once sauce is made, simmer it longer (10-15 minutes) to cook out the raw flour taste. For next time, cook your roux 1-2 minutes longer."
        },
        {
          name: "Burnt Roux",
          cause: "Heat too high, not stirring constantly, or walked away.",
          fix: "There is no fix. Burnt roux tastes bitter and acrid. Throw it out and start over. **Burnt roux ruins everything it touches.**"
        }
      ]
    },
    {
      id: "checklist",
      title: "Perfect Roux Checklist",
      hasCheckIcon: true,
      sections: [
        {
          title: "Before you start:",
          items: [
            "Heavy pan with even heat distribution",
            "Whisk or wooden spoon ready",
            "Fat and flour measured (equal parts by weight)",
            "Liquid measured and temperature appropriate",
            "Timer if making dark roux (20-40 minutes)",
            "Nothing else competing for your attention"
          ]
        },
        {
          title: "During cooking:",
          items: [
            "Constant stirring (especially for dark roux)",
            "Watch for color changes",
            "Smell for nuttiness (not burning)",
            "Adjust heat as needed",
            "Remove from heat when color is right"
          ]
        },
        {
          title: "When making sauce:",
          items: [
            "Use temperature contrast (hot/cold)",
            "Whisk constantly while adding liquid",
            "Bring to full simmer",
            "Simmer 8-12 minutes minimum",
            "Taste and adjust seasoning",
            "Strain if lumpy (but shouldn't be)"
          ]
        }
      ]
    },
    {
      id: "conclusion",
      title: "The Bottom Line: Master the Roux, Master Sauces",
      content: [
        "After 24 years in professional kitchens, I can tell you this: **if you can make a proper roux, you can make almost any sauce**.",
        "It's not complicated. It's not difficult. It just requires:"
      ],
      requirements: [
        "Equal parts fat and flour",
        "Heat control",
        "Constant stirring",
        "Patience (especially for dark roux)",
        "Temperature contrast when adding liquid"
      ],
      closing: [
        "Get this right and you've unlocked béchamel, cheese sauce, gravy, gumbo, cream soups, velouté, and dozens of other foundations. Every professional chef makes roux-based sauces weekly—many daily. It's that fundamental.",
        "The next time you make mac and cheese, skip the packet and make a real cheese sauce from a proper roux. Or make biscuits and gravy with a blonde roux and watch how much better it tastes than the jarred stuff. Or spend 40 minutes making a dark roux for authentic gumbo.",
        "Once you've tasted the difference, you'll never go back to shortcuts.",
        "That's the power of mastering fundamentals. Welcome to better sauces."
      ]
    }
  ],

  faq: {
    questions: [
      {
        question: "Can I use something other than butter?",
        answer: "Absolutely. Common options include butter (classic French technique), clarified butter/ghee (higher smoke point), vegetable oil (neutral flavor, best for dark roux), bacon fat or sausage drippings (adds flavor), or olive oil (less common but works). Choose based on your dish's flavor profile and heat requirements."
      },
      {
        question: "Do I have to use all-purpose flour?",
        answer: "All-purpose flour is best for consistent, neutral results. Bread flour works but produces thicker texture. Cake flour works but has less thickening power. Don't use self-rising flour (leavening agents interfere) or whole wheat (too heavy, grainy)."
      },
      {
        question: "Why is my sauce lumpy even though I whisked?",
        answer: "Likely causes: Added hot liquid to hot roux too fast, didn't whisk constantly, used cold milk that curdled, or roux had burned bits. Fix for current batch: Push through fine-mesh strainer, reheat, continue whisking. Fix for next time: Temperature contrast + constant whisking + patience."
      },
      {
        question: "How do I know when my dark roux is done?",
        answer: "Color: Dark milk chocolate brown (Hershey bar color). Smell: Deep, toasted, nutty—almost like roasted coffee. Time: 30-40 minutes usually, but go by color and smell, not time. Warning sign: If it smells even slightly burnt or acrid, it's gone too far. Start over."
      }
    ]
  },

  relatedArticles: [
    { href: "/blog/cheese-sauce-mac-and-cheese", title: "How to Make Perfect Cheese Sauce for Mac and Cheese" },
    { href: "/blog/what-is-braising", title: "What is Braising and Why It's Amazing" },
    { href: "/blog/caramelization-science", title: "The Science of Caramelization" },
    { href: "/reviews/lodge-seasoned-cast-iron-3-skillet-bundle", title: "Lodge Cast Iron Skillet Bundle Review" }
  ]
}
