/**
 * Category Configuration System
 *
 * Purpose: Single source of truth for all category pages
 * Prevents inconsistency and ensures unique content per category
 */

export interface CategoryConfig {
  // Core identifiers
  slug: string
  displayName: string
  supabaseCategory: string | string[] // Exact match for Supabase query (can be array for multiple categories)

  // SEO metadata
  metaTitle: string
  metaDescription: string
  canonicalUrl: string

  // Page content
  h1: string
  introParagraph1: string
  introParagraph2: string

  // Analytics
  listName: string

  // Related content (internal linking for SEO)
  relatedGuides: Array<{
    title: string
    href: string
    description: string
  }>

  relatedBlogs: Array<{
    title: string
    href: string
    description: string
  }>

  // CRITICAL: Each category must have unique FAQs
  faqs: Array<{
    question: string
    answer: string
  }>
}

export const categoryConfigs: Record<string, CategoryConfig> = {
  knives: {
    slug: 'knives',
    displayName: 'Knives & Cutting Tools',
    supabaseCategory: 'Knives & Cutting Tools',

    metaTitle: 'Best Knives & Cutting Tools: Pro Reviews (2025)',
    metaDescription: 'Professional chef reviews of knives and cutting tools tested over 24 years in restaurant kitchens. Chef knives, paring knives, specialty blades.',
    canonicalUrl: 'https://www.chefapprovedtools.com/knives',

    h1: 'Best Knives & Cutting Tools for Serious Home Cooks',
    introParagraph1: 'After 24 years of professional kitchen experience—including 6 years at Purple Café making thousands of precise cuts during 200+ cover dinner services—I\'ve tested dozens of knives across every category. These reviews come from real restaurant use, not manufacturer claims.',
    introParagraph2: 'Every knife here has survived the test that matters: daily professional use. From chef knives that stayed sharp through years of service to specialty blades that handled specific tasks, these are the tools that proved their worth in commercial kitchens.',

    listName: 'category_knives',

    relatedGuides: [
      {
        title: 'Complete Knife Buying Guide',
        href: '/guides/best-chef-knives',
        description: 'Everything you need to know about choosing knives for your kitchen, from blade materials to handle design.'
      },
      {
        title: 'Knife Care & Maintenance',
        href: '/guides/knife-care',
        description: 'How to sharpen, hone, store, and maintain your knives for decades of use.'
      }
    ],

    relatedBlogs: [
      {
        title: 'How to Choose Your First Chef Knife',
        href: '/blog/how-to-choose-first-chef-knife',
        description: 'Step-by-step guide to selecting the right chef knife based on hand size, cutting style, and budget.'
      },
      {
        title: 'How to Sharpen a Kitchen Knife',
        href: '/blog/how-to-sharpen-a-kitchen-knife',
        description: 'Professional chef guide to sharpening kitchen knives on a tri-stone system.'
      },
      {
        title: 'Essential Knife Cuts Every Cook Should Master',
        href: '/blog/essential-knife-cuts-every-cook-should-master',
        description: 'Learn the fundamental cutting techniques used in professional kitchens.'
      },
      {
        title: 'Knife Storage: Protecting Your Blades for Decades',
        href: '/blog/knife-storage-protecting-blades-for-decades',
        description: 'Why your storage method matters and what actually protects knife edges.'
      }
    ],

    faqs: [
      {
        question: "What's the difference between German and Japanese chef knives?",
        answer: "German knives (like Wüsthof) have thicker, heavier blades designed for rocking cuts and durability through restaurant abuse. Japanese knives have thinner, sharper blades for precision slicing. After 24 years in professional kitchens, I use German knives for general prep and Japanese knives for delicate work like sashimi."
      },
      {
        question: "How often should I sharpen my chef knife?",
        answer: "Hone with a steel before each use to maintain the edge. Fully sharpen every 3-6 months for home use, or monthly for heavy professional use. The key is regular honing—most home cooks never need full sharpening if they hone consistently."
      },
      {
        question: "Are expensive chef knives worth the investment?",
        answer: "Not always. I've used the same $45 Victorinox 8-inch chef's knife for 20 years in professional kitchens. It outperforms knives costing 10x more for daily tasks. Expensive knives make sense if you're a serious enthusiast or need specialized blades, but most home cooks do better with quality mid-range options."
      },
      {
        question: "What size chef knife is best for home cooks?",
        answer: "An 8-inch chef's knife handles 80% of home kitchen tasks and is more maneuverable than larger options. Choose a 10-inch if you have larger hands or frequently prep large vegetables. Under 8 inches limits functionality for most cooks."
      }
    ]
  },

  cookware: {
    slug: 'cookware',
    displayName: 'Cookware & Bakeware',
    supabaseCategory: 'Cookware & Bakeware',

    metaTitle: 'Best Cookware & Bakeware: Pro-Tested Reviews (2025)',
    metaDescription: 'Professional chef reviews of pots, pans, and baking equipment tested in restaurant kitchens over 24 years. Cast iron, stainless steel, nonstick.',
    canonicalUrl: 'https://www.chefapprovedtools.com/cookware',

    h1: 'Best Cookware & Bakeware for Serious Home Cooks',
    introParagraph1: 'After 24 years cooking professionally—including years on the line at Feierabend and Purple Café—I\'ve used every type of cookware in demanding commercial environments. These reviews come from cooking thousands of meals, not kitchen theory.',
    introParagraph2: 'Professional kitchens reveal cookware weaknesses fast. Warped pans, failed nonstick coatings, handles that crack—I\'ve seen it all. The cookware reviewed here survived daily restaurant use and earned permanent spots in both my professional and home kitchens.',

    listName: 'category_cookware',

    relatedGuides: [
      {
        title: 'Complete Cookware Buying Guide',
        href: '/guides/best-cookware',
        description: 'Professional guide to choosing pots and pans based on 24 years of restaurant testing.'
      },
      {
        title: 'Cookware Materials Explained',
        href: '/guides/cookware-materials',
        description: 'Understanding stainless steel, cast iron, carbon steel, and nonstick—what works and why.'
      }
    ],

    relatedBlogs: [
      {
        title: 'Why Food Sticks to Stainless Steel Pans',
        href: '/blog/stainless-steel-why-food-sticks',
        description: 'The science behind sticking and the technique that prevents it.'
      },
      {
        title: 'How to Clean Burnt Stainless Steel Pans',
        href: '/blog/how-to-clean-burnt-stainless-steel-pans',
        description: 'Professional method for removing burnt-on food without damaging the pan.'
      },
      {
        title: 'Cast Iron Seasoning & Care',
        href: '/blog/cast-iron-seasoning-care',
        description: 'How to season, maintain, and restore cast iron cookware for decades of use.'
      },
      {
        title: 'Nonstick vs Stainless Steel Pans',
        href: '/blog/nonstick-vs-stainless-steel-pans',
        description: 'When to use each type and why professional kitchens prefer stainless.'
      }
    ],

    faqs: [
      {
        question: "What cookware do professional kitchens actually use?",
        answer: "Stainless steel for 90% of tasks—it handles high heat, metal utensils, and dishwashers. Cast iron for searing and oven work. Nonstick only for eggs and delicate fish. After 24 years in restaurants, I've never seen a professional kitchen rely on nonstick as their primary cookware."
      },
      {
        question: "Is expensive cookware worth the investment?",
        answer: "Depends on the type. Premium stainless steel (All-Clad, Demeyere) lasts decades and performs noticeably better than cheap options—worth it. Expensive nonstick is a waste—all nonstick coatings fail eventually, so buy mid-range and replace every 2-3 years. Cast iron quality matters less; even cheap Lodge performs well if seasoned properly."
      },
      {
        question: "Why does food stick to my stainless steel pans?",
        answer: "You're not preheating properly. Heat the pan over medium-high for 2-3 minutes until water droplets dance across the surface. Add fat, let it heat until shimmering, then add food. Most sticking happens because the pan isn't hot enough when food hits it."
      },
      {
        question: "How do I know when my nonstick pan needs replacing?",
        answer: "When food starts sticking or you see any coating damage—chips, scratches, or discoloration. Nonstick coatings degrade with use and high heat. In restaurants, nonstick pans last 6-12 months with daily use. At home, expect 2-3 years with proper care (low-medium heat, no metal utensils)."
      }
    ]
  },

  appliances: {
    slug: 'appliances',
    displayName: 'Small Appliances',
    supabaseCategory: 'Small Appliances',

    metaTitle: 'Best Kitchen Appliances: Pro Reviews (2025)',
    metaDescription: 'Professional reviews of blenders, mixers, and kitchen appliances tested in commercial settings over 24 years. Stand mixers, food processors, immersion blenders.',
    canonicalUrl: 'https://www.chefapprovedtools.com/appliances',

    h1: 'Best Kitchen Appliances for Serious Home Cooks',
    introParagraph1: 'After 24 years in professional kitchens—including mixing hundreds of batches of cracker dough at Purple Café with a KitchenAid Commercial NSF—I\'ve tested appliances under conditions that reveal their true capabilities and limitations.',
    introParagraph2: 'Restaurant use is the ultimate appliance stress test. Motors burn out, gears strip, and plastic components crack under daily commercial workloads. The appliances reviewed here survived extended professional use and earned recommendations based on real performance, not marketing claims.',

    listName: 'category_appliances',

    relatedGuides: [
      {
        title: 'Kitchen Appliances Buying Guide',
        href: '/guides/kitchen-appliances',
        description: 'Professional guide to choosing appliances that actually last and perform.'
      },
      {
        title: 'Affordable Kitchen Appliances That Perform',
        href: '/guides/affordable-kitchen-appliances',
        description: 'Budget appliances that deliver professional-level results for home cooks.'
      }
    ],

    relatedBlogs: [
      {
        title: 'Stand Mixer Buying Guide',
        href: '/blog/stand-mixer-buying-guide',
        description: 'How to choose between KitchenAid, commercial models, and budget options.'
      },
      {
        title: 'Stand Mixer vs Hand Mixer: Which Do You Need?',
        href: '/blog/stand-mixer-vs-hand-mixer',
        description: 'When a hand mixer is enough and when you need the power of a stand mixer.'
      },
      {
        title: 'Immersion Blender Guide',
        href: '/blog/immersion-blender-restaurant-workhorse',
        description: 'Why immersion blenders are the most versatile tool in professional kitchens.'
      },
      {
        title: 'Food Processor vs Blender',
        href: '/blog/food-processor-vs-blender-professional-uses',
        description: 'Understanding which appliance handles which tasks better and why.'
      }
    ],

    faqs: [
      {
        question: "Is a KitchenAid stand mixer worth the price for home use?",
        answer: "Yes, if you bake regularly (weekly or more). After testing a KitchenAid Commercial NSF for 18 months at Purple Café mixing 300+ batches of dough with zero failures, I trust the brand. For occasional baking (monthly or less), a quality hand mixer saves money and counter space."
      },
      {
        question: "What's the difference between KitchenAid home and commercial models?",
        answer: "Commercial models have all-metal gears, stronger motors, and NSF certification for restaurant use. Home models have some plastic gears but still perform well for typical home baking. Unless you're mixing heavy dough daily, the home Artisan series handles everything most home bakers need."
      },
      {
        question: "Do I need an immersion blender if I have a regular blender?",
        answer: "Yes. Immersion blenders excel at tasks where regular blenders fail—blending soup in the pot, small quantities, sauces in shallow pans. In 24 years of professional cooking, I've used immersion blenders almost daily. They're more versatile than countertop blenders for everyday cooking."
      },
      {
        question: "Are expensive blenders like Vitamix worth it?",
        answer: "For daily smoothies, nut butters, or professional use—absolutely. The 7-year warranty and metal drive system justify the cost. For occasional blending, mid-range options perform adequately. After using Vitamix blenders in restaurants for decades, they're one of the few appliances where premium quality delivers measurable long-term value."
      }
    ]
  },

  'moving-stirring': {
    slug: 'moving-stirring',
    displayName: 'Moving & Stirring Tools',
    supabaseCategory: 'Moving & Stirring Tools',

    metaTitle: 'Best Spatulas, Tongs & Stirring Tools: Pro Reviews (2025)',
    metaDescription: 'Professional chef reviews of spatulas, tongs, whisks, and stirring tools tested over 24 years in restaurant kitchens. The tools that move your food.',
    canonicalUrl: 'https://www.chefapprovedtools.com/moving-stirring',

    h1: 'Best Moving & Stirring Tools for Serious Home Cooks',
    introParagraph1: 'After 24 years flipping, stirring, and plating in professional kitchens—where the right spatula or pair of tongs can make or break service—I\'ve tested every style of tool that moves food. These reviews come from thousands of hours on the line.',
    introParagraph2: 'In a busy restaurant kitchen, your tongs become an extension of your hand. The wrong tool slows you down, damages food, or fails at the worst moment. The tools reviewed here earned their place through years of daily professional use.',

    listName: 'category_moving_stirring',

    relatedGuides: [],

    relatedBlogs: [
      {
        title: 'How to Make Perfect Scrambled Eggs',
        href: '/blog/best-scrambled-eggs',
        description: 'Spatula technique that separates restaurant eggs from rubbery home versions.'
      },
      {
        title: 'How to Make a Roux',
        href: '/blog/how-to-make-roux',
        description: 'The whisking technique behind every great sauce and gravy.'
      },
      {
        title: 'How to Make Perfect Risotto',
        href: '/blog/how-to-make-perfect-risotto',
        description: 'Why constant stirring creates creamy risotto—and when to stop.'
      },
      {
        title: 'Deglazing & Pan Sauces',
        href: '/blog/deglazing-pan-sauces',
        description: 'Using your spatula to capture every bit of fond for restaurant-quality sauces.'
      }
    ],

    faqs: [
      {
        question: "What tongs do professional chefs actually use?",
        answer: "Spring-loaded stainless steel tongs with scalloped edges, typically 12-inch for most tasks and 16-inch for grilling. Avoid tongs with plastic tips or locking mechanisms that fail. After 24 years in kitchens, simple spring tongs outlast everything else."
      },
      {
        question: "Silicone or metal spatulas—which is better?",
        answer: "Both, for different tasks. Silicone for nonstick pans and scraping bowls clean. Metal fish spatulas for delicate items and crispy-bottomed foods. A thin, flexible metal spatula slides under food without tearing it—essential for fish, eggs, and pancakes."
      },
      {
        question: "Why do professional kitchens use wooden spoons?",
        answer: "Wood doesn't conduct heat (won't burn your hand), won't scratch pans, and develops a natural patina that resists bacteria. A quality wooden spoon lasts decades. I still use wooden spoons from my first kitchen job 24 years ago."
      }
    ]
  },

  'prep-tools': {
    slug: 'prep-tools',
    displayName: 'Prep Tools',
    supabaseCategory: 'Prep Tools',

    metaTitle: 'Best Kitchen Prep Tools: Pro Reviews (2025)',
    metaDescription: 'Professional chef reviews of cutting boards, peelers, bench scrapers, and prep tools tested over 24 years in restaurant kitchens.',
    canonicalUrl: 'https://www.chefapprovedtools.com/prep-tools',

    h1: 'Best Prep Tools for Serious Home Cooks',
    introParagraph1: 'After 24 years of mise en place in professional kitchens—where prep speed and organization separate good cooks from great ones—I\'ve tested every tool designed to make prep work faster and cleaner.',
    introParagraph2: 'Restaurant prep is relentless. Cutting boards that slip, peelers that clog, scrapers that bend—bad tools cost time and create frustration. The prep tools reviewed here survived the daily grind and made the work easier.',

    listName: 'category_prep_tools',

    relatedGuides: [],

    relatedBlogs: [
      {
        title: 'Cutting Board Materials Guide',
        href: '/blog/cutting-board-materials-guide',
        description: 'Wood, plastic, composite—which cutting board material is right for your kitchen.'
      },
      {
        title: 'Wood vs Composite Cutting Boards',
        href: '/blog/wood-vs-composite-cutting-board',
        description: 'Head-to-head comparison of traditional wood and modern composite boards.'
      },
      {
        title: 'Mise en Place: Professional Prep Organization',
        href: '/blog/mis-en-place-professional-cooking',
        description: 'The prep system that makes professional kitchens run smoothly.'
      },
      {
        title: 'Restaurant-Style Prep Station Setup',
        href: '/blog/meal-prep-station-setup-restaurant-efficiency',
        description: 'How to organize your prep workspace like a professional kitchen.'
      }
    ],

    faqs: [
      {
        question: "What cutting board material is best?",
        answer: "Wood or quality plastic, depending on use. Wood is gentler on knife edges and naturally antibacterial—best for general prep. Plastic is dishwasher-safe and better for raw meat where sanitation is critical. Avoid glass and bamboo—both destroy knife edges quickly."
      },
      {
        question: "How often should I replace my cutting board?",
        answer: "When deep grooves develop that you can't sand out or clean properly. For plastic boards used for raw meat, replace when scoring becomes excessive—bacteria hide in deep cuts. Quality wood boards can last decades with proper care and occasional resurfacing."
      },
      {
        question: "Is a bench scraper really necessary?",
        answer: "Absolutely. It's one of the most underrated kitchen tools. Use it to transfer chopped ingredients, portion dough, scrape your board clean, and keep your workspace organized. After 24 years, I reach for my bench scraper dozens of times per service."
      },
      {
        question: "Y-peeler or straight peeler?",
        answer: "Y-peeler for most tasks—more natural wrist motion, faster, and easier to control. Straight peelers work better for long vegetables like carrots when you need length. Most professional kitchens stock both, but if you only buy one, get a Y-peeler."
      }
    ]
  },

  'cleaning-maintenance': {
    slug: 'cleaning-maintenance',
    displayName: 'Cleaning & Maintenance',
    supabaseCategory: 'Cleaning & Maintenance',

    metaTitle: 'Best Kitchen Cleaning & Maintenance Tools: Pro Reviews (2025)',
    metaDescription: 'Professional chef reviews of kitchen cleaners, bar mops, sharpening tools, and maintenance equipment tested over 24 years in restaurant kitchens.',
    canonicalUrl: 'https://www.chefapprovedtools.com/cleaning-maintenance',

    h1: 'Best Cleaning & Maintenance Tools for Serious Home Cooks',
    introParagraph1: 'After 24 years in professional kitchens—where health inspectors visit regularly and clean equipment is non-negotiable—I\'ve tested every cleaning product and maintenance tool that keeps kitchens running safely.',
    introParagraph2: 'Restaurant kitchens demand tools that work fast and effectively, night after night. The cleaning and maintenance products reviewed here are what professionals actually use, not marketing-driven consumer products.',

    listName: 'category_cleaning_maintenance',

    relatedGuides: [
      {
        title: 'Knife Care & Maintenance',
        href: '/guides/knife-care',
        description: 'How to sharpen, hone, store, and maintain your knives for decades of use.'
      }
    ],

    relatedBlogs: [
      {
        title: 'How to Sharpen a Kitchen Knife',
        href: '/blog/how-to-sharpen-a-kitchen-knife',
        description: 'Professional chef guide to sharpening kitchen knives on a tri-stone system.'
      },
      {
        title: 'How to Steel a Knife',
        href: '/blog/how-to-steel-a-knife',
        description: 'The proper technique for honing your knife edge between sharpenings.'
      }
    ],

    faqs: [
      {
        question: "How often should I sharpen my knives?",
        answer: "Hone with a steel before each use. Fully sharpen every 3-6 months for home use, monthly for heavy use. Most home cooks over-sharpen and under-hone. Regular honing maintains the edge; sharpening removes metal and should be done sparingly."
      },
      {
        question: "What's the difference between honing and sharpening?",
        answer: "Honing realigns the knife's edge without removing metal—do this frequently. Sharpening grinds away metal to create a new edge—do this rarely. A honing steel is for maintenance; whetstones and sharpeners are for repair."
      },
      {
        question: "Why do restaurants use bar mops instead of paper towels?",
        answer: "Cost, absorbency, and durability. Bar mops handle heavy-duty cleaning, can be sanitized and reused hundreds of times, and don't fall apart when wet. A stack of bar mops costs less over time than endless paper towel rolls."
      },
      {
        question: "What cleaner do professional kitchens actually use?",
        answer: "For general cleaning, simple degreaser solutions. For sanitizing, quaternary ammonium or diluted bleach solutions that meet health code requirements. Avoid heavily scented consumer products—they can transfer odors to food and surfaces."
      }
    ]
  }
}

/**
 * Get category configuration by slug
 */
export function getCategoryConfig(slug: string): CategoryConfig {
  const config = categoryConfigs[slug]

  if (!config) {
    throw new Error(`Category config not found for slug: ${slug}`)
  }

  return config
}

/**
 * Get all category slugs
 */
export function getAllCategorySlugs(): string[] {
  return Object.keys(categoryConfigs)
}
