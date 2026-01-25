// ============================================================================
// HOW TO MAKE PERFECT FRENCH PRESS COFFEE - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const coffeeData = {
  metadata: {
    title: "How to Make Perfect French Press Coffee Every Time",
    description: "Master French press coffee with 24 years of professional experience. Learn the perfect ratio, step-by-step technique, common mistakes to avoid, and pro tips for cafe-quality coffee at home.",
    publishedDate: "2025-10-24",
    lastUpdated: "2025-10-24",
    primaryKeyword: "how to make french press coffee",
    secondaryKeywords: ["french press technique", "french press ratio", "perfect french press"],
    readTime: "9 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "How to Make Perfect French Press Coffee"
  },

  hero: {
    title: "How to Make Perfect French Press Coffee Every Time",
    introduction: [
      "Master French press coffee with 24 years of professional experience. Learn the perfect ratio, step-by-step technique, common mistakes to avoid, and pro tips for cafe-quality coffee at home."
    ]
  },

  howToSchema: {
    name: "How to Make Perfect French Press Coffee",
    description: "Master French press coffee with professional technique. Learn the perfect ratio, timing, and method for cafe-quality coffee at home.",
    datePublished: "2025-10-24",
    totalTime: "PT10M",
    tools: ["French press (8-cup/34oz)", "Burr coffee grinder", "Kitchen scale", "Kettle", "Timer"],
    steps: [
      { name: "Heat Water", text: "Bring water to a boil, then let it cool for 30-45 seconds to reach 200°F (93°C). Water that's too hot over-extracts and creates bitter coffee." },
      { name: "Measure and Grind Coffee", text: "Weigh 60g of coffee beans. Grind coarse, like raw sugar or coarse sea salt. You should still see the original bean shape on most particles." },
      { name: "Pre-warm the Press", text: "Pour hot water into the empty French press to warm the glass. Swirl and discard. This prevents temperature drop during brewing." },
      { name: "Add Coffee and Bloom", text: "Add ground coffee to the press. Pour 120g of water to saturate grounds. Wait 30 seconds for CO2 to release (you'll see bubbles)." },
      { name: "Add Remaining Water", text: "Pour remaining water (840g) in a slow, steady stream. Total water: 960g. Place the lid on with plunger pulled up." },
      { name: "Steep for 4 Minutes", text: "Set a timer for exactly 4 minutes. Don't touch the press. Let the coffee steep undisturbed for proper extraction." },
      { name: "Press Slowly", text: "Press the plunger down with slow, steady pressure over 15-20 seconds. Forcing it down fast stirs up fine particles and makes coffee muddy." },
      { name: "Serve Immediately", text: "Pour all coffee into cups or a thermal carafe immediately. Coffee left in the press continues extracting and becomes bitter." }
    ]
  },

  faq: {
    questions: [
      {
        question: "What's the ideal water temperature for French press coffee?",
        answer: "200°F (93°C) is the sweet spot for French press. After 24 years brewing French press daily in professional settings, I've found that water above 205°F over-extracts and creates bitter coffee, while water below 195°F under-extracts and tastes weak and sour. Bring water to a boil, then let it sit for 30-45 seconds to reach the ideal temperature."
      },
      {
        question: "What coffee-to-water ratio should I use?",
        answer: "Use a 1:16 ratio (1 gram of coffee to 16 grams of water) for balanced French press coffee. For the standard 8-cup Bodum Chambord, that's 60g coffee to 960g water. This ratio balances strength and clarity without being too intense or too weak. It's what I've used for thousands of brews."
      },
      {
        question: "How coarse should I grind coffee for French press?",
        answer: "Grind coarse, like raw sugar or coarse sea salt. If you can still see the original bean shape on most particles, you're in the right range. Grind too fine and you'll get over-extracted, bitter coffee with sludge at the bottom. Grind too coarse and your coffee will be weak and under-extracted."
      },
      {
        question: "How long should I steep French press coffee?",
        answer: "Steep for exactly 4 minutes after adding all the water. This timing allows for proper extraction, the sweet spot between under-extracted (sour, weak) and over-extracted (bitter, harsh). In professional settings, we timed every brew because consistency matters."
      },
      {
        question: "Why is my French press coffee bitter?",
        answer: "Bitterness comes from over-extraction, caused by water that's too hot (above 205°F), steeping too long (over 5 minutes), or grinding too fine. The most common culprit is using boiling water straight from the kettle. Let it cool for 30-45 seconds first."
      },
      {
        question: "Why is my French press coffee weak?",
        answer: "Weak coffee results from under-extraction: using too little coffee, grinding too coarse, water that's too cool (below 195°F), or not steeping long enough. Check your ratio first—most home brewers use too little coffee. A kitchen scale eliminates guesswork."
      },
      {
        question: "Why is my French press coffee muddy or sludgy?",
        answer: "Muddy coffee comes from grinding too fine or plunging too aggressively. Fine particles pass through the mesh filter and create sediment. Use a coarse grind and press slowly with steady, gentle pressure. Forcing the plunger down fast stirs up fine particles and makes coffee muddy."
      },
      {
        question: "Should I bloom the coffee before brewing?",
        answer: "Yes. Add about 120g of water first, let it bloom for 30 seconds (you'll see bubbles and expansion), then add the remaining water. Blooming allows trapped CO2 to escape and improves extraction and flavor. This technique comes from professional barista training."
      },
      {
        question: "Do I need to pre-warm my French press?",
        answer: "Pre-warming the glass with hot water prevents temperature drop when you add brewing water. Temperature stability during the 4-minute steep is critical for even extraction. Dump the warming water, add your grounds, then brew normally. It takes 10 seconds and makes a noticeable difference."
      },
      {
        question: "How do I clean a French press properly?",
        answer: "Disassemble the plunger completely and wash all parts with hot, soapy water after every use. Coffee oils build up in the mesh screens and turn rancid, creating off flavors in future brews. In professional cafes, deep-cleaning French presses daily is standard practice. Stale coffee oils ruin even the best beans."
      }
    ]
  },

  relatedLinks: [
    { href: "/reviews/bodum-chambord-french-press", text: "Bodum Chambord French Press Review" },
    { href: "/guides/best-chef-knives", text: "Best Chef Knives Guide" }
  ]
}
