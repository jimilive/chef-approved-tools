// ============================================================================
// ESSENTIAL KNIFE CUTS - Educational Blog Data
// Migrated from inline (794 lines) to data-driven architecture
// ============================================================================

export const educationalData = {
  breadcrumb: {
    category: "Blog",
    title: "5 Knife Cuts Every Cook Should Master"
  },

  hero: {
    title: "5 Knife Cuts Every Cook Should Master (With Photos)",
    introduction: [
      "Most home cooks think \"knife skills\" mean cutting faster. They don't. In professional kitchens, knife technique is about control, consistency, and safety — speed comes later."
    ]
  },

  howToSchema: {
    name: "How to Master Essential Knife Cuts",
    description: "Learn the five professional knife cuts—dice, julienne, chiffonade, mince, and bias—taught by chef Scott Bradley. Technique, precision, and practice tips for home cooks.",
    datePublished: "2025-10-12",
    tools: [
      "8-inch chef's knife",
      "Cutting board (end-grain wood or heavy plastic)",
      "Honing rod",
      "Bench scraper",
      "Damp towel"
    ],
    steps: [
      { name: "Set Up Your Station", text: "Place a damp towel under your cutting board to prevent slipping. Use the pinch grip—thumb and index finger on the blade just ahead of the handle. This gives maximum control." },
      { name: "Master Medium Dice", text: "Trim one side of the vegetable to create a flat base. Cut lengthwise planks to ½-inch thickness, stack them, slice lengthwise again, then cross-cut into ½-inch cubes. This is the foundation cut—master it first." },
      { name: "Learn Julienne", text: "Cut vegetable into 2-2.5 inch segments. Slice thin layers off all sides to create a rectangle. Cut into ⅛-inch thick planks, stack them, then slice into ⅛-inch matchsticks." },
      { name: "Practice Chiffonade", text: "Stack leafy herbs or greens, roll into a tight cigar, and slice crosswise into fine ribbons using a razor-sharp knife. Keep the knife angled forward with a smooth slicing motion." },
      { name: "Perfect Your Mince", text: "After rough chopping garlic or shallots, anchor your knife tip and rock the blade back and forth, gathering the pile as you go. Add a pinch of salt when mincing garlic to create a paste." },
      { name: "Master Bias Cuts", text: "Hold your knife at a 30° angle and slice diagonally. This increases surface area for faster cooking and better presentation, especially for scallions, carrots, and asparagus." }
    ]
  },

  tableOfContents: [
    { id: "why", title: "Why Knife Cuts Matter" },
    { id: "problem", title: "The Problem (And Why It Happens)" },
    { id: "method", title: "The 5 Essential Cuts (Step-by-Step)" },
    { id: "classical", title: "Classical Cuts with Measurements" },
    { id: "precision", title: "When Precision Matters (And When It Doesn't)" },
    { id: "mistakes", title: "Common Mistakes (And How to Avoid Them)" },
    { id: "equipment", title: "Equipment That Makes This Easier" },
    { id: "practice", title: "Practice Exercises That Work" },
    { id: "troubleshooting", title: "Troubleshooting Guide" },
    { id: "faq", title: "Frequently Asked Questions" }
  ],

  sections: [
    {
      id: "intro",
      title: "",
      content: [
        "In professional kitchens, new cooks learn through repetition—cutting a single onion 100 times the same way. No shortcuts, no tricks — just repetition. Two weeks later, they're twice as fast and ten times more accurate.",
        "Classical knife cuts seem pretentious to a lot of home cooks—like culinary school gatekeeping that doesn't matter in real life. Why can't you just call everything \"chopped\" or \"diced\"? But when a chef calls for a brunoise, everyone on the line knows exactly what size that means. That precision matters.",
        "The reality is that these standardized cuts exist for practical reasons: **uniform pieces cook evenly, specific sizes create specific textures, and precise cutting makes food look professional.** Once you understand the basic cuts, you'll cook better and faster because you'll stop having carrots that are burnt on the outside and raw in the middle.",
        "By the end of this comprehensive guide, you'll understand the five fundamental cuts every restaurant relies on — plus the classical terminology and measurements that help recipes communicate accurately — and how to practice them at home so your knife finally feels like an extension of your hand."
      ]
    },
    {
      id: "why",
      title: "Why Standardized Cuts Matter",
      subsections: [
        {
          id: "even-cooking",
          title: "1. Even Cooking",
          problem: "A carrot sliced in random sizes will have thin pieces that are mushy and thick pieces that are crunchy—all in the same dish. Most home cooks never learned the why behind knife cuts. They just chop until pieces look small enough. The problem is that uneven cuts cook at different speeds — your carrots burn while your onions are still raw.",
          solution: "Uniform cuts cook at the same rate, finishing together. No more sorting through your food to find the properly cooked pieces. Restaurants avoid that by cutting everything to uniform size. That consistency isn't just cosmetic; it's science. Same size = same cooking rate = predictable results."
        },
        {
          id: "appearance",
          title: "2. Professional Appearance",
          content: "Restaurant food looks better partly because of proper knife work. A salad with precise julienned vegetables looks intentional and elegant. A salad with random chunks looks sloppy. This matters even at home—we eat with our eyes first."
        },
        {
          id: "timing",
          title: "3. Predictable Cooking Times",
          content: "When a recipe says \"dice the potatoes\" and you cut them into 2-inch chunks while the recipe assumes ½-inch dice, your timing will be completely wrong. Standardized cuts let recipes communicate accurately."
        }
      ],
      warning: {
        title: "Important Reality Check",
        content: "Perfect knife cuts take practice. Your first attempts will be slower and less uniform than you'd like. That's completely normal. I've watched culinary students practice brunoise for weeks before getting consistent results. Focus on safety first, uniformity second, speed last."
      }
    },
    {
      id: "problem",
      title: "The Problem: Why Home Knife Work Looks Uneven",
      content: [
        "Another common issue: the wrong motion. Home cooks push straight down like they're chopping firewood. Professional chefs slice forward and down, letting the edge do the work. A sharp knife used incorrectly still crushes cell walls and bleeds flavor out of food.",
        "Finally, confidence plays a huge role. A hesitant hand creates jagged edges and inconsistent thickness. Confidence comes from muscle memory — and that comes from practice with a plan."
      ]
    },
    {
      id: "method",
      title: "The 5 Essential Cuts (Step-by-Step)",
      intro: "Below are the five cuts every line cook masters in training. Start slowly; accuracy before speed. You'll find yourself cooking faster and more precisely without trying.",
      cuts: [
        {
          id: "dice",
          title: "1. Dice (½-inch or ¼-inch Cubes)",
          usedFor: "soups, stews, sautéed vegetables",
          how: "Trim one side of the vegetable to create a flat base. Cut lengthwise planks to desired thickness, stack them, slice lengthwise again, then cross-cut into cubes.",
          proTip: {
            type: "warning",
            content: "If you can see light through your cuts, they're too thin for a dice — switch to julienne. Practice on carrots and potatoes until each cube is identical."
          }
        },
        {
          id: "julienne",
          title: "2. Julienne (Matchsticks)",
          usedFor: "stir-fries, salads, garnishes",
          how: "Cut planks ⅛-inch thick and stack them like cards. Slice into thin sticks about ⅛ × ⅛ × 2 inches. Every restaurant I've worked in tests this cut on carrots — the firm texture forces discipline.",
          proTip: {
            type: "info",
            content: "Thin uniform strips cook instantly and look clean on the plate. Uneven ones steam instead of sear. Thin cuts mean fast, even cooking. Perfect for high-heat, quick applications."
          }
        },
        {
          id: "chiffonade",
          title: "3. Chiffonade (Herb or Leaf Ribbons)",
          usedFor: "basil, spinach, mint, kale, any leafy herb or green",
          how: "Stack leaves, roll into a tight cigar, and slice crosswise into fine ribbons. Keep the knife angled forward and use a smooth slicing motion.",
          proTip: {
            type: "warning",
            content: "Use a razor-sharp knife. Dull edges bruise greens, turning them black.",
            link: { href: "/blog/how-to-steel-a-knife", text: "How to Steel a Knife Guide" }
          }
        },
        {
          id: "mince",
          title: "4. Mince (Very Fine Cuts)",
          usedFor: "garlic, shallots, herbs",
          how: "After rough chopping, anchor your knife tip and rock the blade back and forth, gathering the pile as you go. Professionals don't rush this; it's about control.",
          proTip: {
            type: "info",
            content: "Add a pinch of salt when mincing garlic. It draws out moisture and creates a paste texture that dissolves into sauces."
          }
        },
        {
          id: "bias",
          title: "5. Bias Cut (Angled Slices)",
          usedFor: "scallions, carrots, celery, asparagus",
          how: "Hold your knife at a 30° angle and slice diagonally. This increases surface area, which means faster cooking and better presentation. Asian stir-fries and sautéed veggies often use this cut for that reason."
        }
      ]
    },
    {
      id: "classical",
      title: "Classical Knife Cuts (with Precise Measurements)",
      icon: "Ruler",
      intro: "Understanding classical terminology helps you follow recipes accurately and communicate clearly about what you need. Here are the standard measurements professional kitchens use:",
      classicalCuts: [
        {
          name: "Small Dice",
          size: "¼\" × ¼\" × ¼\"",
          bestFor: "Potatoes for hash, onions for salsas, vegetables for soups, standard \"diced\" preparations."
        },
        {
          name: "Medium Dice",
          size: "½\" × ½\" × ½\"",
          bestFor: "Roasted vegetables, stews and braises, hearty soups, general \"chopped\" applications. This is the foundation cut — master it first."
        },
        {
          name: "Large Dice",
          size: "¾\" × ¾\" × ¾\"",
          bestFor: "Long-cooking stews, roasted root vegetables, stocks (where pieces will be strained out), rustic preparations."
        },
        {
          name: "Julienne",
          size: "⅛\" × ⅛\" × 2-2.5\"",
          bestFor: "Carrots in stir-fries, potatoes for pommes frites, bell peppers in salads, ginger and garlic (fine julienne)."
        },
        {
          name: "Brunoise",
          size: "⅛\" × ⅛\" × ⅛\"",
          bestFor: "Mirepoix in sauces, shallots in vinaigrettes, garnishes for soups, any application where vegetables should \"disappear\" into the dish.",
          note: "Brunoise starts as julienne, then you dice the julienne into cubes. It's a two-step process."
        }
      ]
    },
    {
      id: "julienne-tutorial",
      title: "Step-by-Step: How to Cut Julienne",
      intro: "**Starting with a carrot** (the classic learning vegetable):",
      steps: [
        {
          title: "Step 1: Create a Flat Side",
          points: [
            "Cut a thin slice lengthwise off one side of the carrot",
            "This creates a stable base so the carrot won't roll"
          ]
        },
        {
          title: "Step 2: Square Off the Carrot",
          points: [
            "Cut the carrot into 2-2.5\" segments",
            "Slice thin layers off all four sides to create a rectangle",
            "Save the rounded trimmings for stock or soup"
          ]
        },
        {
          title: "Step 3: Create Planks",
          points: [
            "Stand rectangle on end",
            "Slice downward into ⅛\" thick planks",
            "Stack planks on top of each other"
          ]
        },
        {
          title: "Step 4: Create Matchsticks",
          points: [
            "Slice planks lengthwise into ⅛\" sticks",
            "You now have julienne"
          ]
        }
      ],
      timeInvestment: "5-8 minutes for one carrot when learning. With practice, 2-3 minutes."
    },
    {
      id: "brunoise-tutorial",
      title: "Step-by-Step: How to Cut Brunoise",
      intro: "**Starting with an onion:**",
      steps: [
        {
          title: "Step 1: Halve and Peel",
          points: [
            "Cut onion in half through root end",
            "Peel off papery outer layers",
            "Leave root end intact (holds onion together)"
          ]
        },
        {
          title: "Step 2: Make Horizontal Cuts",
          points: [
            "With onion flat side down, make horizontal cuts parallel to cutting board",
            "Cut from stem end toward (but not through) root end",
            "Make cuts ⅛\" apart",
            "Keep root end intact"
          ]
        },
        {
          title: "Step 3: Make Vertical Cuts",
          points: [
            "Make vertical cuts perpendicular to board",
            "Again, ⅛\" apart",
            "Cut toward but not through root end",
            "Onion layers should still be connected at root"
          ]
        },
        {
          title: "Step 4: Dice",
          points: [
            "Cut perpendicular to previous cuts (horizontally across the onion)",
            "⅛\" slices",
            "Results in ⅛\" × ⅛\" × ⅛\" cubes"
          ]
        }
      ],
      timeInvestment: "3-5 minutes for one onion when learning. With practice, 1-2 minutes."
    },
    {
      id: "precision",
      title: "When Precision Actually Matters (and When It Doesn't)",
      precisionMatters: [
        { item: "Stir-fries", reason: "Uneven pieces = some burned, some raw" },
        { item: "Gratins and layered dishes", reason: "Even slices = even cooking" },
        { item: "Garnishes", reason: "Appearance is the entire point" },
        { item: "Quick-cooking methods", reason: "Fast cooking exposes size inconsistencies" },
        { item: "Professional presentation", reason: "When looks matter" }
      ],
      precisionDoesntMatter: [
        { item: "Stocks and broths", reason: "Everything gets strained out" },
        { item: "Pureed soups", reason: "Everything gets blended" },
        { item: "Long braises", reason: "Hours of cooking makes size differences irrelevant" },
        { item: "Food processor prep", reason: "Machine homogenizes everything" },
        { item: "Rustic, home-style cooking", reason: "Where rough-hewn is the aesthetic" }
      ],
      rule: "Match your effort level to the application. Don't brunoise onions for a 6-hour beef stew—it's wasted precision."
    },
    {
      id: "mistakes",
      title: "Common Mistakes (And How to Avoid Them)",
      mistakes: [
        {
          number: 1,
          title: "Chopping Instead of Slicing",
          problem: "Pressing straight down smashes food fibers and dulls your knife. Chopping uses downward force and creates uneven pieces. Professional chefs always cut, never chop.",
          fix: "Use a forward-down or backward-down slicing motion. Let the edge work for you. Cutting uses a slicing motion (forward or backward with downward pressure) that creates clean, uniform pieces."
        },
        {
          number: 2,
          title: "Using a Dull Knife",
          problem: "Dull knives slip and tear instead of cutting cleanly. This creates dangerous slipping, tearing vegetables, and crushing instead of clean cuts.",
          fix: "Hone daily, sharpen as needed. A properly sharp knife is safer and more precise than a dull one."
        },
        {
          number: 3,
          title: "Incorrect Grip",
          problem: "The \"handle grip\" is unstable and leads to poor control, tired hands, and imprecise cuts.",
          fix: "Use the pinch grip — thumb and index on the blade just ahead of the handle. This gives maximum control."
        },
        {
          number: 4,
          title: "Wrong Board / Unstable Cutting Board",
          problem: "Glass and marble destroy edges. A sliding board is dangerous and leads to imprecise cuts.",
          fix: "Use end-grain wood or heavy plastic. Put a damp towel under your cutting board. Board should never move."
        },
        {
          number: 5,
          title: "Cutting Too Fast Too Soon / Going Too Fast",
          problem: "Speed without accuracy means waste and injury. Inconsistent cuts and danger.",
          fix: "Perfect form first — speed comes naturally after repetition. Slow down. Speed comes from efficiency of motion, not frantic chopping. Smooth, controlled cuts become fast naturally with practice."
        }
      ]
    },
    {
      id: "equipment",
      title: "Equipment That Makes This Easier",
      intro: "The right tools make learning knife cuts significantly easier. Here's what I recommend:",
      items: [
        { name: "Chef Knife", description: "light, balanced, and forgiving for new hands. The knife that makes precise cuts effortless.", link: "/reviews/victorinox-fibrox-8-inch-chefs-knife", linkText: "Victorinox Fibrox 8\" Chef's Knife" },
        { name: "Bench Scraper", description: "move ingredients without ruining your edge.", link: "/reviews/rubbermaid-commercial-cooks-scraper", linkText: "Rubbermaid Commercial Cook's Scraper" },
        { name: "Cutting Board", description: "End-grain maple or NSF plastic — gentle on blades." },
        { name: "Honing Rod", description: "Ceramic is ideal for every steel type." },
        { name: "Towels", description: "Place a damp one under your board to stop slipping — a line cook's secret weapon." }
      ]
    },
    {
      id: "practice",
      title: "Practice Exercises That Actually Work",
      exercises: [
        {
          title: "Exercise 1: The Onion Challenge",
          goal: "Consistent medium dice in under 3 minutes",
          method: [
            "Buy 5 onions",
            "Dice all 5 using proper technique",
            "Focus on uniformity first, speed second",
            "Freeze diced onions for later use (nothing wasted)"
          ]
        },
        {
          title: "Exercise 2: Carrot Julienne",
          goal: "⅛\" × ⅛\" matchsticks",
          method: [
            "Square off 3 carrots",
            "Create julienne from all 3",
            "Compare results—consistency improves with practice",
            "Use in stir-fry (practical application)"
          ]
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting Guide",
      issues: [
        { problem: "If cuts look uneven:", solution: "You're not anchoring your knife tip or your board is sliding. Put a damp towel under your board and focus on consistent thickness with each cut." },
        { problem: "If food sticks to blade:", solution: "Wipe occasionally or use a granton-edge knife." },
        { problem: "If greens bruise:", solution: "Knife is too dull or pressure too heavy. Sharpen your knife and use a lighter touch with leafy herbs." },
        { problem: "If you get fatigued:", solution: "Handle too large or grip too tight. Relax your hand and use the proper pinch grip." }
      ]
    },
    {
      id: "bottom-line",
      title: "Putting It All Together",
      icon: "CheckCircle2",
      intro: "After 24 years of professional cooking and thousands of hours of knife work, here's what I want home cooks to understand:",
      mainPoint: "**Good knife skills aren't about perfection—they're about control and consistency.**",
      content: [
        "Mastering these five cuts transforms your cooking in ways that go beyond just looking professional. Uniform cuts mean consistent cooking, which means better flavor and texture in every dish. The confidence that comes from knife competency changes how you approach recipes — you stop avoiding dishes with lots of prep because prep becomes faster and more enjoyable.",
        "You don't need culinary school precision to cook great food at home. But understanding the basic cuts and knowing when to use them will make you a significantly better cook. Your vegetables will cook evenly. Your food will look intentional. Your recipes will work as written.",
        "Start with one cut. Practice it on a single vegetable type until you can do it without thinking. Then add the next cut. Within a month of daily practice, you'll notice your speed doubling and your waste decreasing. That's not magic — it's muscle memory."
      ],
      keyLessons: [
        { lesson: "Start with medium dice", reason: "Foundation for everything else" },
        { lesson: "Uniform cuts cook evenly", reason: "No more burnt and raw in same dish" },
        { lesson: "Practice with cheap vegetables", reason: "Onions, carrots, potatoes" },
        { lesson: "Focus on safety first", reason: "Speed comes naturally with practice" },
        { lesson: "Know when to take shortcuts", reason: "Food processor for stocks, hand-cut for presentation" },
        { lesson: "Match precision to application", reason: "Don't waste effort on cuts that don't matter" }
      ],
      closing: "The best investment you can make isn't a more expensive knife — it's 15 minutes a day practicing these fundamental cuts. That practice pays dividends every time you cook for the rest of your life. Master medium dice. Everything else is just variations. Practice deliberately. Speed will come."
    }
  ],

  relatedGuides: {
    technique: [
      { href: "/blog/knife-safety-rules-professional-kitchens", title: "Knife Safety: 10 Rules From 24 Years in Pro Kitchens" },
      { href: "/blog/how-to-steel-a-knife", title: "How to Steel a Knife: Honing Guide for Sharp Edges" },
      { href: "/blog/how-to-sharpen-with-tri-stone", title: "How to Sharpen with a Tri-Stone" }
    ],
    equipment: [
      { href: "/reviews/victorinox-fibrox-8-inch-chefs-knife", title: "Victorinox Fibrox 8\" Chef's Knife Review" },
      { href: "/reviews/rubbermaid-commercial-cooks-scraper", title: "Rubbermaid Commercial Cook's Scraper Review" },
      { href: "/reviews/diamond-crystal-kosher-salt", title: "Diamond Crystal Kosher Salt Review" }
    ]
  },

  faq: {
    questions: [
      {
        question: "How long does it take to master knife skills?",
        answer: "Two weeks of daily practice makes a visible difference. Real proficiency takes months — but it's worth it. For specific cuts: beginners take 5-8 minutes to dice an onion, intermediate cooks take 2-3 minutes, and professional line cooks take 45-60 seconds. Speed comes from efficiency and muscle memory, not rushing."
      },
      {
        question: "What's the most important cut to master first?",
        answer: "Medium dice. It's the foundation for almost everything else, used constantly, and teaches all the basic principles. Once you can dice an onion properly, other cuts are just variations."
      },
      {
        question: "Should I use a smaller knife for control?",
        answer: "Not usually. An 8″ chef's knife gives better leverage and rhythm."
      },
      {
        question: "How often should I hone my knife?",
        answer: "Before each use — it takes 20 seconds and extends sharpness 5–10×."
      },
      {
        question: "What's the best practice food?",
        answer: "Onions and carrots — cheap, durable, and great feedback on consistency. Start with firm vegetables like carrots, potatoes, and onions. They provide immediate feedback on uniformity and don't slide around as easily as softer produce."
      },
      {
        question: "Do I need a Japanese knife to cut like a chef?",
        answer: "No. Technique matters far more than steel. Start with a forgiving Western-style knife."
      },
      {
        question: "Why do professional cooks practice the same cuts repeatedly?",
        answer: "Muscle memory. Repetition builds the unconscious precision that lets you cut quickly without looking. In restaurants, speed and consistency come from thousands of repetitions, not shortcuts."
      },
      {
        question: "Can I practice knife cuts on any vegetable?",
        answer: "Yes, but start with firm vegetables like carrots, potatoes, and onions. They provide immediate feedback on uniformity and don't slide around as easily as softer produce."
      },
      {
        question: "What's the difference between chopping and cutting?",
        answer: "Chopping uses downward force and creates uneven pieces. Cutting uses a slicing motion (forward or backward with downward pressure) that creates clean, uniform pieces. Professional chefs always cut, never chop."
      },
      {
        question: "Can I use a food processor instead of hand cutting?",
        answer: "For rough chop, yes. For precise cuts, no. Food processors create inconsistent pieces and turn some vegetables to mush. Hand cutting gives you control over size and texture."
      },
      {
        question: "When does precision actually matter?",
        answer: "Precision matters for stir-fries (uneven pieces = some burned, some raw), gratins and layered dishes, garnishes, quick-cooking methods, and professional presentation. Precision doesn't matter for stocks and broths, pureed soups, long braises, food processor prep, or rustic home-style cooking."
      }
    ]
  },

  relatedArticles: [
    { href: "/blog/knife-safety-rules-professional-kitchens", title: "Knife Safety: 10 Rules From 24 Years in Pro Kitchens" },
    { href: "/blog/how-to-steel-a-knife", title: "How to Steel a Knife" }
  ]
}
