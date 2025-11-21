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
    displayName: 'Knives & Cutting',
    supabaseCategory: 'Knives',

    metaTitle: 'Best Knives & Cutting Tools: Pro Reviews (2025)',
    metaDescription: 'Professional chef reviews of knives and cutting tools tested over 24 years in restaurant kitchens. Chef knives, paring knives, specialty blades.',
    canonicalUrl: 'https://www.chefapprovedtools.com/knives',

    h1: 'Best Knives & Cutting Tools for Serious Home Cooks',
    introParagraph1: 'After 24 years of professional kitchen experience—including 6 years at Purple Café making thousands of precise cuts during 200+ cover dinner services—I&apos;ve tested dozens of knives across every category. These reviews come from real restaurant use, not manufacturer claims.',
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
        title: 'How to Sharpen a Knife with a Tri-Stone',
        href: '/blog/how-to-sharpen-with-tri-stone',
        description: 'Master professional sharpening techniques using a three-stage whetstone system.'
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
        question: "What&apos;s the difference between German and Japanese chef knives?",
        answer: "German knives (like Wüsthof) have thicker, heavier blades designed for rocking cuts and durability through restaurant abuse. Japanese knives have thinner, sharper blades for precision slicing. After 24 years in professional kitchens, I use German knives for general prep and Japanese knives for delicate work like sashimi."
      },
      {
        question: "How often should I sharpen my chef knife?",
        answer: "Hone with a steel before each use to maintain the edge. Fully sharpen every 3-6 months for home use, or monthly for heavy professional use. The key is regular honing—most home cooks never need full sharpening if they hone consistently."
      },
      {
        question: "Are expensive chef knives worth the investment?",
        answer: "Not always. I&apos;ve used the same $45 Victorinox 8-inch chef&apos;s knife for 20 years in professional kitchens. It outperforms knives costing 10x more for daily tasks. Expensive knives make sense if you&apos;re a serious enthusiast or need specialized blades, but most home cooks do better with quality mid-range options."
      },
      {
        question: "What size chef knife is best for home cooks?",
        answer: "An 8-inch chef&apos;s knife handles 80% of home kitchen tasks and is more maneuverable than larger options. Choose a 10-inch if you have larger hands or frequently prep large vegetables. Under 8 inches limits functionality for most cooks."
      }
    ]
  },

  cookware: {
    slug: 'cookware',
    displayName: 'Cookware & Bakeware',
    supabaseCategory: 'Cookware',

    metaTitle: 'Best Cookware & Bakeware: Pro-Tested Reviews (2025)',
    metaDescription: 'Professional chef reviews of pots, pans, and baking equipment tested in restaurant kitchens over 24 years. Cast iron, stainless steel, nonstick.',
    canonicalUrl: 'https://www.chefapprovedtools.com/cookware',

    h1: 'Best Cookware & Bakeware for Serious Home Cooks',
    introParagraph1: 'After 24 years cooking professionally—including years on the line at Feierabend and Purple Café—I&apos;ve used every type of cookware in demanding commercial environments. These reviews come from cooking thousands of meals, not kitchen theory.',
    introParagraph2: 'Professional kitchens reveal cookware weaknesses fast. Warped pans, failed nonstick coatings, handles that crack—I&apos;ve seen it all. The cookware reviewed here survived daily restaurant use and earned permanent spots in both my professional and home kitchens.',

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
        answer: "Stainless steel for 90% of tasks—it handles high heat, metal utensils, and dishwashers. Cast iron for searing and oven work. Nonstick only for eggs and delicate fish. After 24 years in restaurants, I&apos;ve never seen a professional kitchen rely on nonstick as their primary cookware."
      },
      {
        question: "Is expensive cookware worth the investment?",
        answer: "Depends on the type. Premium stainless steel (All-Clad, Demeyere) lasts decades and performs noticeably better than cheap options—worth it. Expensive nonstick is a waste—all nonstick coatings fail eventually, so buy mid-range and replace every 2-3 years. Cast iron quality matters less; even cheap Lodge performs well if seasoned properly."
      },
      {
        question: "Why does food stick to my stainless steel pans?",
        answer: "You&apos;re not preheating properly. Heat the pan over medium-high for 2-3 minutes until water droplets dance across the surface. Add fat, let it heat until shimmering, then add food. Most sticking happens because the pan isn&apos;t hot enough when food hits it."
      },
      {
        question: "How do I know when my nonstick pan needs replacing?",
        answer: "When food starts sticking or you see any coating damage—chips, scratches, or discoloration. Nonstick coatings degrade with use and high heat. In restaurants, nonstick pans last 6-12 months with daily use. At home, expect 2-3 years with proper care (low-medium heat, no metal utensils)."
      }
    ]
  },

  appliances: {
    slug: 'appliances',
    displayName: 'Kitchen Appliances',
    supabaseCategory: 'Appliances',

    metaTitle: 'Best Kitchen Appliances: Pro Reviews (2025)',
    metaDescription: 'Professional reviews of blenders, mixers, and kitchen appliances tested in commercial settings over 24 years. Stand mixers, food processors, immersion blenders.',
    canonicalUrl: 'https://www.chefapprovedtools.com/appliances',

    h1: 'Best Kitchen Appliances for Serious Home Cooks',
    introParagraph1: 'After 24 years in professional kitchens—including mixing hundreds of batches of cracker dough at Purple Café with a KitchenAid Commercial NSF—I&apos;ve tested appliances under conditions that reveal their true capabilities and limitations.',
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
        question: "What&apos;s the difference between KitchenAid home and commercial models?",
        answer: "Commercial models have all-metal gears, stronger motors, and NSF certification for restaurant use. Home models have some plastic gears but still perform well for typical home baking. Unless you&apos;re mixing heavy dough daily, the home Artisan series handles everything most home bakers need."
      },
      {
        question: "Do I need an immersion blender if I have a regular blender?",
        answer: "Yes. Immersion blenders excel at tasks where regular blenders fail—blending soup in the pot, small quantities, sauces in shallow pans. In 24 years of professional cooking, I&apos;ve used immersion blenders almost daily. They&apos;re more versatile than countertop blenders for everyday cooking."
      },
      {
        question: "Are expensive blenders like Vitamix worth it?",
        answer: "For daily smoothies, nut butters, or professional use—absolutely. The 7-year warranty and metal drive system justify the cost. For occasional blending, mid-range options perform adequately. After using Vitamix blenders in restaurants for decades, they&apos;re one of the few appliances where premium quality delivers measurable long-term value."
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
