// ============================================================================
// HOW TO PREP AND GRILL ASPARAGUS - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const asparagusData = {
  breadcrumb: {
    category: "Blog",
    title: "How to Prep and Grill Asparagus"
  },

  hero: {
    title: "How to Prep and Grill Asparagus",
    introduction: [
      "Very high heat, less time than you think, and one trick that perfectly removes the woody ends every time"
    ]
  },

  howToSchema: {
    name: "How to Prep and Grill Asparagus",
    description: "Professional chef technique for grilling asparagus. High heat, minimal time, and the bending trick for perfect charred spears.",
    datePublished: "2025-11-20",
    totalTime: "PT15M",
    tools: ["Grill or grill pan", "Tongs", "Olive oil", "Paper towels"],
    steps: [
      { name: "Select and Clean", text: "Choose thick asparagus spears (pencil-thin overcooks quickly). Rinse under cold water and pat dry thoroughly." },
      { name: "Remove Woody Ends", text: "Hold spear at each end and bend until it snaps naturally. The asparagus breaks exactly where the woody portion ends—no guessing required." },
      { name: "Season Simply", text: "Toss with olive oil, salt, and pepper. Don't overcomplicate—asparagus flavor shines with minimal seasoning." },
      { name: "Preheat Grill to High", text: "Get grill screaming hot (500°F+). High heat creates char marks and caramelization before the inside overcooks." },
      { name: "Grill Perpendicular to Grates", text: "Place asparagus perpendicular to grill grates to prevent falling through. Don't crowd—single layer only." },
      { name: "Cook 3-4 Minutes Total", text: "Grill 1.5-2 minutes per side. Asparagus should be bright green with char marks, tender but still have snap. Remove immediately." }
    ]
  },

  faq: {
    questions: [
      {
        question: "Should I use thick or thin asparagus for grilling?",
        answer: "Use thick asparagus (pencil-thick or larger) for grilling. Thick spears maintain their structure under high heat and develop proper char before overcooking internally. Thin asparagus turns limp and mushy before achieving char marks. Save thin spears for other cooking methods."
      },
      {
        question: "How do you know where to trim asparagus ends?",
        answer: "Use the bending trick: hold the spear at each end and gently bend until it snaps naturally. The asparagus breaks exactly where the woody portion ends—no guessing required. This method is faster and more accurate than cutting with a knife."
      },
      {
        question: "How long does asparagus take to grill?",
        answer: "At proper high heat (500°F+), asparagus takes only 3-4 minutes total. Cook 1.5-2 minutes per side, rolling once or twice. If your asparagus takes longer than 5 minutes, your grill isn't hot enough. Most home cooks dramatically overcook asparagus."
      },
      {
        question: "How do you prevent asparagus from falling through grill grates?",
        answer: "Place asparagus perpendicular to the grill grates so spears lay across multiple grates rather than between them. Alternatively, use a grill basket with small perforations. Arrange spears side by side with minimal spacing for easy rolling."
      },
      {
        question: "Should I oil asparagus before grilling?",
        answer: "Yes, coat asparagus lightly with high smoke-point oil before grilling. Use about one tablespoon per pound. Too little oil causes sticking; too much causes flare-ups. Pat asparagus completely dry before oiling—wet spears steam rather than char."
      },
      {
        question: "How do you know when grilled asparagus is done?",
        answer: "Asparagus is done when it has visible char marks on multiple sides and bends slightly when lifted with tongs—but still maintains enough structure to hold its shape. Remove immediately when done; it continues cooking from residual heat."
      }
    ]
  },

  relatedLinks: [
    { href: "/blog/vegetable-roasting-guide", text: "The Complete Guide to Roasting Vegetables" },
    { href: "/blog/cast-iron-seasoning-care", text: "Cast Iron Seasoning and Care" },
    { href: "/blog/how-to-preheat-a-pan", text: "How to Preheat a Pan Properly" }
  ]
}
