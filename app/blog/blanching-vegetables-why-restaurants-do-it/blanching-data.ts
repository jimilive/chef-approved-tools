// ============================================================================
// BLANCHING VEGETABLES - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const blanchingData = {
  breadcrumb: {
    category: "Blog",
    title: "Why Restaurant Vegetables Stay Vibrant"
  },

  hero: {
    title: "Why Restaurant Vegetables Stay Vibrant (You Skip This)",
    introduction: [
      "Learn why professional kitchens blanch vegetables before service. Preserve color, texture, and flavor with a chef-tested method for perfect results."
    ]
  },

  howToSchema: {
    name: "How to Blanch Vegetables Like a Restaurant",
    description: "Learn why professional kitchens blanch vegetables before service. Preserve color, texture, and flavor with a chef-tested method for perfect results.",
    datePublished: "2025-10-07",
    totalTime: "PT15M",
    tools: ["Large stockpot (8-quart minimum)", "Spider strainer or slotted spoon", "Large bowl for ice bath", "Kitchen timer", "Clean towels"],
    steps: [
      { name: "Prep Salted Boiling Water", text: "Fill a large stockpot with water and add 1 tablespoon kosher salt per quart. The water should taste like the sea. Bring to a rolling boil—bubbles should be aggressive across the entire surface." },
      { name: "Prepare Ice Bath", text: "Fill a large bowl with a 50/50 ratio of ice to water. You need at least a gallon of ice water for every pound of vegetables. The ice bath must be ready before you start blanching." },
      { name: "Blanch in Small Batches", text: "Add vegetables to boiling water in small batches (about 1 pound at a time) to maintain water temperature. Blanch briefly: green beans 2-3 min, broccoli 1½-2 min, asparagus 2-4 min depending on thickness." },
      { name: "Shock Immediately", text: "Transfer vegetables to ice bath within 5 seconds using a spider strainer. Leave in ice bath until completely cold to the touch (2-3 minutes). This stops cooking and locks in color." },
      { name: "Drain and Dry Thoroughly", text: "Remove from ice bath and spread in a single layer on clean kitchen towels. Pat dry gently. Store blanched vegetables in the refrigerator for up to 2-3 days before final cooking." }
    ]
  },

  sections: [
    {
      id: "intro",
      content: [
        "If you've ever wondered why restaurant green beans stay crisp and bright while yours turn dull and mushy, here's the secret: we blanch everything.",
        "At Purple Café, our mornings were a ballet of boiling and ice water. We'd blanch broccoli, asparagus, and green beans before lunch rush—so they'd reheat perfectly without overcooking.",
        "By the end of this guide, you'll know exactly why we do it, how to do it properly, and what mistakes to avoid when blanching at home."
      ]
    },
    {
      id: "problem",
      title: "The Problem: Why Home Vegetables Lose Color and Texture",
      hasIcon: true,
      iconType: "sparkles",
      content: [
        "When you drop vegetables straight into a sauté pan or roast them raw, enzymes keep working until the heat destroys them. Those enzymes dull color and break down chlorophyll, leaving you with olive-green beans or brownish broccoli.",
        "Blanching—brief boiling followed by ice shocking—stops enzyme activity instantly, locking in color and crispness. It also makes peeling tomatoes, peaches, or almonds effortless.",
        "Professionals blanch not because it's fancy, but because it saves time and keeps food visually stunning on the plate. In a restaurant, presentation matters as much as flavor. A dull, overcooked vegetable says \"we don't care\" before the guest even takes a bite."
      ],
      accomplishes: [
        { label: "Preserves color", description: "Locks in chlorophyll for vibrant greens" },
        { label: "Sets texture", description: "Maintains crisp-tender structure" },
        { label: "Stops enzymes", description: "Prevents flavor degradation and discoloration" },
        { label: "Loosens skins", description: "Makes peeling tomatoes and stone fruit effortless" },
        { label: "Reduces cook time", description: "Vegetables are 80% done before final service" },
        { label: "Improves freezing", description: "Deactivates enzymes that cause freezer burn and off-flavors" }
      ]
    },
    {
      id: "method",
      title: "The Professional Method: Blanching Step-by-Step",
      hasIcon: true,
      iconType: "timer",
      steps: [
        {
          number: 1,
          title: "Prep a Big Pot of Salted Water",
          content: [
            "Use at least **1 tablespoon kosher salt per quart of water**. You want it salty like the sea—this seasons and stabilizes chlorophyll.",
            "I use a 12-quart stockpot for home blanching. Professional kitchens use 20+ gallon tilt skillets, but the principle is the same: more water means better temperature recovery when cold vegetables hit the pot."
          ]
        },
        {
          number: 2,
          title: "Boil Hard",
          content: [
            "Get a rolling boil before adding vegetables. Half-hearted simmering leads to uneven cooking and longer blanching times, which breaks down texture.",
            "The water should be bubbling aggressively—so much that you can see movement across the entire surface. When you add vegetables, the temperature will drop. A proper boil recovers quickly."
          ]
        },
        {
          number: 3,
          title: "Blanch Briefly (Timing Chart)",
          content: ["Drop in vegetables and watch closely. Timing depends on size and density:"],
          hasTimingTable: true
        },
        {
          number: 4,
          title: "Shock Immediately",
          hasIcon: true,
          iconType: "droplets",
          content: [
            "Transfer to an ice bath (50/50 ice and water). This stops cooking instantly and locks in color.",
            "Use a spider strainer or slotted spoon to move vegetables from boiling water to ice bath in one motion. The faster you transfer, the better the texture. Professionals do this in under 5 seconds.",
            "Leave vegetables in the ice bath until completely cold to the touch—usually 2-3 minutes. If you remove them while still warm, carryover heat continues cooking."
          ]
        },
        {
          number: 5,
          title: "Drain and Dry Thoroughly",
          content: [
            "Lay on towels or a rack before storing. Moisture ruins texture when reheated.",
            "I spread blanched vegetables in a single layer on clean kitchen towels, then gently pat dry. In restaurants, we use perforated hotel pans over sheet pans—the air circulation dries them faster."
          ]
        }
      ],
      proTip: "Blanch ahead, then finish with butter or oil just before serving—restaurant trick for perfect timing. Blanched vegetables reheat in 2-3 minutes, which means you can time six side dishes simultaneously during dinner rush."
    },
    {
      id: "timing-table",
      timingTable: {
        headers: ["Vegetable", "Blanching Time", "Notes"],
        rows: [
          { vegetable: "Green beans", time: "2–3 min", notes: "Test at 2 min—should be tender-crisp" },
          { vegetable: "Broccoli florets", time: "1½–2 min", notes: "Stems need 30 sec longer than florets", isAlt: true },
          { vegetable: "Asparagus (thin)", time: "2 min", notes: "Pencil-thick spears" },
          { vegetable: "Asparagus (thick)", time: "3–4 min", notes: "Thumb-thick spears", isAlt: true },
          { vegetable: "Spinach/leafy greens", time: "30–60 sec", notes: "Just until wilted" },
          { vegetable: "Snap peas", time: "1–2 min", notes: "Color should intensify", isAlt: true },
          { vegetable: "Carrots (sliced)", time: "3–4 min", notes: "Depends on thickness" },
          { vegetable: "Cauliflower florets", time: "2–3 min", notes: "Should still have bite", isAlt: true },
          { vegetable: "Brussels sprouts", time: "3–4 min", notes: "Halve large ones first" }
        ]
      },
      testNote: "**Test doneness:** Pull one piece after the minimum time and bite it. It should be tender but still have snap—never soft or mushy."
    },
    {
      id: "mistakes",
      title: "Common Mistakes (And How to Avoid Them)",
      mistakes: [
        {
          number: 1,
          title: "Not Enough Salt",
          content: [
            "Under-seasoned water dulls flavor and color. Use a handful per gallon—the water should taste like the ocean.",
            "Salt does two things: it seasons the vegetables from the inside out, and it helps stabilize chlorophyll, keeping greens vibrant. Unsalted water produces pale, bland vegetables even with perfect timing."
          ]
        },
        {
          number: 2,
          title: "Skipping the Ice Bath",
          content: [
            "Without shocking, carryover heat keeps cooking your vegetables to mush. I've seen home cooks blanch perfectly, then drain and let sit—five minutes later, they're overcooked.",
            "The ice bath isn't optional. It's the entire point of blanching: controlled cooking that stops on command. Room-temperature water isn't cold enough—you need actual ice."
          ]
        },
        {
          number: 3,
          title: "Overcrowding the Pot",
          content: [
            "Each batch cools the water. Blanch in small amounts so temperature stays high and recovery is fast.",
            "When I trained new cooks, they'd dump an entire case of green beans into one pot. The water temperature would plummet, boiling would stop, and the beans would steam instead of blanch. Work in batches—1 pound at a time for home kitchens."
          ]
        },
        {
          number: 4,
          title: "Using the Same Water Repeatedly",
          content: [
            "Chlorophyll breaks down and darkens the water—swap it after a few rounds for best color retention.",
            "After 3-4 batches, blanching water turns murky green and loses salinity. Fresh water ensures consistent results across every batch."
          ]
        },
        {
          number: 5,
          title: "Storing Wet Vegetables",
          content: ["Excess moisture turns blanched vegetables soggy when reheated. Always dry thoroughly and store on towels or in a single layer."]
        },
        {
          number: 6,
          title: "Blanching Everything the Same Time",
          content: ["Dense vegetables like carrots need longer than delicate asparagus tips. Never blanch mixed vegetables together—do each type separately and combine after shocking."]
        }
      ]
    },
    {
      id: "equipment",
      title: "Equipment That Helps",
      equipment: [
        { name: "Large Stockpot", description: "Deep enough for rolling boils. Minimum 8-quart capacity for home use." },
        { name: "Spider Strainer", description: "Wire-mesh skimmer that lifts vegetables efficiently without draining the pot." },
        { name: "Ice Bath Setup", description: "Large stainless bowl + colander inside for easy draining. Restaurants use bus tubs." },
        { name: "Kitchen Timer", description: "Precision matters—30 seconds can mean the difference between crisp and mushy." }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting Guide",
      issues: [
        {
          problem: "If vegetables turn dull or olive-colored:",
          solution: "Water wasn't salty enough, ice bath was too weak, or blanching time was too long. Check your salt level (should taste like seawater) and ensure ice bath is truly 50/50 ice to water. Green vegetables lose brightness after 30 seconds of overcooking."
        },
        {
          problem: "If they're mushy:",
          solution: "Overcooked or not shocked fast enough. Reduce blanching time by 30 seconds and transfer to ice bath more quickly. Remember: vegetables continue cooking from residual heat even after leaving the water."
        },
        {
          problem: "If they taste bland:",
          solution: "Season the blanching water—never rely solely on post-seasoning. Vegetables absorb salt during blanching. If you season only after cooking, flavor stays on the surface instead of permeating the interior."
        },
        {
          problem: "If vegetables are unevenly cooked:",
          solution: "Pieces were different sizes or pot was overcrowded. Cut vegetables uniformly before blanching, and work in smaller batches to maintain consistent water temperature."
        }
      ]
    },
    {
      id: "when-not-to-blanch",
      title: "When NOT to Blanch",
      intro: "Blanching isn't universal. Skip it for:",
      skipFor: [
        { label: "Vegetables you're roasting", reason: "Direct high heat is the goal—blanching adds unnecessary moisture" },
        { label: "Soft vegetables", reason: "Eggplant, mushrooms, zucchini turn to mush when blanched" },
        { label: "Quick sautés", reason: "Tender vegetables like spinach or pea shoots cook in seconds—blanching is overkill" },
        { label: "Grilled vegetables", reason: "You want char and smoke, not the clean flavor of blanching" }
      ]
    },
    {
      id: "conclusion",
      title: "Final Thoughts",
      content: [
        "Blanching is one of those techniques that seems fussy until you understand why it works. Then it becomes second nature—part of your workflow, not an extra step.",
        "At Purple Café, we'd blanch pounds of vegetables every morning before service. By the time dinner rush hit, we could plate six different sides in under 10 minutes—all perfectly crisp, all brilliantly colored, all timed to finish together.",
        "That's the power of blanching. It's not about adding work—it's about adding control."
      ]
    }
  ],

  faq: {
    questions: [
      {
        question: "Do you always need to blanch before freezing?",
        answer: "Yes—blanching deactivates enzymes that cause spoilage in frozen vegetables. Without blanching, frozen vegetables develop off-flavors, lose color, and become mushy within weeks. Blanching stops enzyme activity, preserves nutrients, and maintains texture for months in the freezer. This is why commercially frozen vegetables are always blanched before freezing."
      },
      {
        question: "Can you reuse blanching water?",
        answer: "A few batches are fine, but color fades after multiple uses—fresh water preserves brightness. After 3-4 batches, the water becomes cloudy with starch and broken-down chlorophyll, which can discolor subsequent vegetables. Salt concentration also drops. For best results, change water when it looks murky or stops boiling vigorously."
      },
      {
        question: "Do you salt the ice bath?",
        answer: "No—just water and ice. Salt lowers freezing point, slowing chilling. The goal of the ice bath is rapid cooling to stop enzyme activity and cooking immediately. Pure ice water (32°F) achieves this. Adding salt makes the water colder but slows the cooling process for the vegetables themselves. Save the salt for the blanching water only."
      },
      {
        question: "Why do restaurant vegetables stay so bright green?",
        answer: "Because we blanch and shock them properly. The combination of salted boiling water, precise timing, and immediate ice shocking preserves chlorophyll and stops enzyme activity. Many restaurants also finish vegetables with a touch of butter, which adds sheen and makes colors pop even more on the plate."
      },
      {
        question: "Can you blanch vegetables the day before?",
        answer: "Absolutely—that's exactly what restaurants do. Blanched and shocked vegetables can be refrigerated for 2-3 days before final cooking. Store them in a single layer on towels to absorb excess moisture, or in a container with paper towels. When ready to serve, quickly sauté, roast, or reheat—they'll finish in 2-3 minutes instead of 10."
      },
      {
        question: "What vegetables should NOT be blanched?",
        answer: "Soft vegetables like tomatoes (unless peeling), eggplant, mushrooms, and zucchini don't benefit from blanching. They have high water content and become mushy. Also skip blanching for vegetables you're roasting or grilling—direct high heat is the goal. Blanching is best for firm, fibrous vegetables that need partial cooking before finishing."
      },
      {
        question: "How do you know when vegetables are done blanching?",
        answer: "They should be vibrant in color and tender-crisp—easily pierced with a knife but still firm. Test one piece before shocking the whole batch. For green vegetables, watch for the color to intensify from dull to bright emerald. Overcooked vegetables lose that snap and can't be rescued, so err on the side of undercooking—you'll finish them later anyway."
      },
      {
        question: "Why does my ice bath not cool vegetables fast enough?",
        answer: "You need a true 50/50 ratio of ice to water, and enough volume to handle the batch size. Too little ice means the vegetables warm the bath too quickly. Refresh ice between batches, and work in smaller portions. Professional kitchens use large bus tubs filled with ice—you need at least a gallon of ice water for every pound of vegetables."
      }
    ]
  },

  relatedLinks: [
    { href: "/blog/vegetable-roasting-guide", text: "Learn how to roast vegetables perfectly" },
    { href: "/blog/meal-prep-station-setup-restaurant-efficiency", text: "Learn how to set up a professional meal prep station" }
  ]
}
