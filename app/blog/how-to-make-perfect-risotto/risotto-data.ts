// ============================================================================
// HOW TO MAKE PERFECT RISOTTO - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const risottoData = {
  breadcrumb: {
    category: "Blog",
    title: "Perfect Risotto: Italian Restaurant Technique Explained"
  },

  hero: {
    title: "Perfect Risotto: Italian Restaurant Technique Explained",
    introduction: [
      "Master risotto from a professional chef with 24 years of restaurant experience. Learn proper technique, timing, stock selection, and the science behind perfectly creamy rice without cream."
    ]
  },

  howToSchema: {
    name: "How to Make Perfect Risotto",
    description: "Master restaurant-quality risotto with proper Italian technique. Learn the science of starch release for creamy risotto without cream.",
    datePublished: "2025-09-30",
    totalTime: "PT35M",
    tools: ["Wide, heavy-bottomed pan or Dutch oven", "Wooden spoon", "Ladle", "Saucepan for stock"],
    steps: [
      { name: "Heat the Stock", text: "Bring 6 cups of stock to a simmer in a separate pot. Keep it hot throughout cooking. Cold stock shocks the rice and creates uneven texture." },
      { name: "Make the Soffritto", text: "Sauté finely diced onion in butter and olive oil over medium heat until translucent, about 3-4 minutes. Don't brown." },
      { name: "Toast the Rice", text: "Add 1.5 cups Arborio or Carnaroli rice. Stir to coat with fat and toast for 2 minutes until edges become translucent. This develops nutty flavor." },
      { name: "Add Wine", text: "Pour in 1/2 cup dry white wine. Stir until completely absorbed. The acid helps break down the rice's outer layer." },
      { name: "Add Stock Gradually", text: "Add one ladle of hot stock at a time, stirring frequently. Wait until each addition is mostly absorbed before adding more. This takes 18-22 minutes." },
      { name: "Test for Doneness", text: "Taste the rice. It should have slight resistance (al dente) but not be crunchy. The texture should be creamy and flow slowly." },
      { name: "Finish with Mantecatura", text: "Remove from heat. Vigorously stir in cold butter and grated Parmigiano-Reggiano. This creates the final creamy emulsion. Serve immediately." }
    ]
  },

  faq: {
    questions: [
      {
        question: "Can I make risotto ahead of time?",
        answer: "Not really. Risotto is best fresh. You can parcook it to 80% done, spread on a sheet pan to stop cooking, then finish later (restaurant technique). Add stock and reheat over medium heat, finish with butter and cheese. But it's never quite as good as fresh."
      },
      {
        question: "Do I really need to use hot stock?",
        answer: "Yes. Cold stock shocks the rice, stops the cooking process, and creates uneven texture. Keep stock at a steady simmer throughout cooking."
      },
      {
        question: "Can I use brown rice or wild rice?",
        answer: "No. Brown rice and wild rice don't have the right starch content and won't create creamy texture. Stick with Arborio or Carnaroli."
      },
      {
        question: "Why did my risotto turn out gluey?",
        answer: "Over-stirring breaks rice grains and releases too much starch. Stir frequently but not constantly, every 30-45 seconds is sufficient."
      },
      {
        question: "How do I know when risotto is done?",
        answer: "Taste it. Rice should have slight resistance when you bite (al dente), but not be crunchy or hard. The texture should be creamy and flow slowly on the plate."
      }
    ]
  },

  relatedLinks: [
    { href: "/blog/stock-vs-broth-vs-bouillon", text: "Stock vs Broth vs Bouillon: What's the Difference?" },
    { href: "/blog/understanding-acids-cooking", text: "Understanding Acids in Cooking" },
    { href: "/blog/fat-is-flavor", text: "Fat is Flavor: The Science Behind Richness" }
  ]
}
