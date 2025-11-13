/**
 * SINGLE SOURCE OF TRUTH FOR ALL SITE METADATA
 * 
 * Created: November 12, 2025
 * Enhanced: With SEO fields, affiliate tracking, conversion optimization
 * Purpose: One file controls all page titles, descriptions, and SEO signals
 * 
 * RULES:
 * 1. ALL metadata changes happen HERE
 * 2. Pages import from this file ONLY
 * 3. No hardcoded metadata anywhere else
 * 4. Validate entire site by checking this one file
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BaseMetadata {
  // Core SEO
  title: string; // Max 60 chars
  description: string; // 145-160 chars
  canonical?: string; // Optional: auto-generated if not specified
  
  // Enhanced SEO (NEW)
  author: string; // Always "Scott Bradley"
  imageUrl?: string; // OpenGraph image URL (critical for CTR)
  imageAlt?: string; // Image alt text
  publishedTime?: string; // ISO 8601: "2024-11-12T10:00:00Z"
  modifiedTime?: string; // ISO 8601: "2025-11-12T10:00:00Z"
  
  // OpenGraph overrides
  ogTitle?: string; // Optional: defaults to title
  ogDescription?: string; // Optional: defaults to description
  
  // Conversion optimization (NEW)
  searchIntent?: 'informational' | 'commercial' | 'transactional';
  conversionPotential?: 'high' | 'medium' | 'low';
  lastOptimized?: string; // ISO date: "2025-11-12"
}

export interface BlogMetadata extends BaseMetadata {
  // Enhanced keywords structure (NEW)
  keywords: {
    primary: string; // Target keyword for this post
    secondary: string[]; // LSI/related keywords
    searchVolume?: number; // Monthly searches (for prioritization)
    difficulty?: 'low' | 'medium' | 'high'; // SEO difficulty
  };
  
  // Publishing metadata
  publishedDate: string; // ISO format: "2024-11-12"
  lastUpdated?: string; // ISO format: "2025-11-12"
  
  // Content optimization (NEW)
  articleSection?: string; // "Kitchen Equipment", "Cooking Techniques"
  internalLinks?: string[]; // Suggested related content slugs
  competitorUrls?: string[]; // Top 3 ranking competitor URLs
  competitorGap?: string; // What we do better than competitors
}

export interface ReviewMetadata extends BaseMetadata {
  // Testing credentials
  tier: 1 | 2 | 3; // Credibility tier
  testingPeriod: string; // "6 Years Professional Testing"
  productSlug: string; // For fetching from Supabase
  
  // Affiliate tracking (NEW)
  affiliateProgram: 'amazon' | 'cj' | 'direct' | 'multiple';
  commissionRate?: number; // Percentage (for optimization priority)
  averagePrice?: string; // "under-50", "50-100", "100-200", "200-plus"
  productCategory: string; // "blenders", "knives", "cookware"
  
  // Product metadata (NEW)
  brand?: string; // "Vitamix", "KitchenAid"
  model?: string; // "5200", "KSM150"
}

export interface PageMetadata extends BaseMetadata {
  // Static pages - just enhanced base metadata
}

// ============================================================================
// METADATA ORGANIZED BY TYPE
// ============================================================================

export const METADATA = {
  
  // ==========================================================================
  // STATIC PAGES (~15 pages)
  // ==========================================================================
  
  pages: {
    'home': {
      title: "Chef Approved Tools: 24 Years Testing Kitchen Equipment",
      description: "Professional kitchen equipment tested by chefs with 24 years restaurant experience. Honest reviews of what actually survives commercial use and lasts decades.",
      canonical: "https://www.chefapprovedtools.com",
      author: "Scott Bradley",
      imageUrl: "/images/og/homepage.jpg",
      imageAlt: "Professional chef testing kitchen equipment",
      publishedTime: "2024-01-15T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "informational",
      conversionPotential: "medium",
    } as PageMetadata,
    
    'about': {
      title: "About Chef Approved Tools: 24 Years Professional Testing",
      description: "Scott Bradley tested equipment 24 years in professional kitchens—Purple Café, Mellow Mushroom, Feierabend. Every product tested through commercial use.",
      canonical: "https://www.chefapprovedtools.com/about",
      author: "Scott Bradley",
      imageUrl: "/images/og/about-scott-bradley.jpg",
      imageAlt: "Scott Bradley, professional chef with 24 years experience",
      publishedTime: "2024-01-15T10:00:00Z",
      modifiedTime: "2025-10-15T10:00:00Z",
      searchIntent: "informational",
      conversionPotential: "low",
    } as PageMetadata,
    
    'reviews-hub': {
      title: "Chef-Tested Equipment: Reviews & Recommendations",
      description: "Professional equipment reviews from 24 years in restaurant kitchens. Real testing results: what survives commercial use, what fails, and when it matters.",
      canonical: "https://www.chefapprovedtools.com/reviews",
      author: "Scott Bradley",
      imageUrl: "/images/og/reviews-hub.jpg",
      imageAlt: "Kitchen equipment reviews by professional chef",
      publishedTime: "2024-02-01T10:00:00Z",
      modifiedTime: "2025-11-10T10:00:00Z",
      searchIntent: "commercial",
      conversionPotential: "high",
    } as PageMetadata,
    
    // TODO: Add remaining static pages (~12):
    // - terms
    // - privacy-policy
    // - cookie-policy
    // - disclosure
    // - glossary (if keeping it)
    // - chef-approved
    // - kitchen-bundle
    // - the-tools-that-started-it-all
    // - best-budget-chef-knife
    // - best-knife-for-cutting-meat
  },
  
  // ==========================================================================
  // CATEGORY/GUIDE PAGES (~5 pages)
  // ==========================================================================
  
  guides: {
    'kitchen-appliances': {
      title: "Kitchen Appliances Guide: Professional Recommendations",
      description: "Kitchen appliances tested 24 years professionally: What works, what fails, what lasts. Honest recommendations from commercial use and long-term testing.",
      canonical: "https://www.chefapprovedtools.com/guides/kitchen-appliances",
      author: "Scott Bradley",
      imageUrl: "/images/og/kitchen-appliances-guide.jpg",
      imageAlt: "Professional guide to kitchen appliances",
      publishedTime: "2024-03-01T10:00:00Z",
      modifiedTime: "2025-11-01T10:00:00Z",
      searchIntent: "commercial",
      conversionPotential: "high",
      articleSection: "Buying Guides",
    } as PageMetadata,
    
    'cookware-materials': {
      title: "Cookware Materials: Stainless vs Cast Iron vs Carbon",
      description: "Complete guide to cookware materials after 24 years professional use: Stainless for versatility, cast iron for heat retention, carbon steel for quick response.",
      canonical: "https://www.chefapprovedtools.com/guides/cookware-materials",
      author: "Scott Bradley",
      imageUrl: "/images/og/cookware-materials.jpg",
      imageAlt: "Different cookware materials compared by professional chef",
      publishedTime: "2024-04-10T10:00:00Z",
      modifiedTime: "2025-10-20T10:00:00Z",
      searchIntent: "informational",
      conversionPotential: "medium",
      articleSection: "Cookware Guides",
    } as PageMetadata,
    
    // TODO: Add remaining guide pages (~3):
    // - best-cookware
    // - affordable-kitchen-appliances
    // - cookware-category (the /cookware category page)
  },
  
  // ==========================================================================
  // BLOG POSTS (~70 posts) - MIGRATE AFTER REVIEWS
  // ==========================================================================
  
  blog: {
    'cast-iron-vs-carbon-steel-pan': {
      title: "Cast Iron vs Carbon Steel: Heat Retention vs Responsiveness",
      description: "Cast iron holds heat 3x longer for searing steaks. Carbon steel heats and cools fast for control. After 24 years testing both, here's when each type wins.",
      canonical: "https://www.chefapprovedtools.com/blog/cast-iron-vs-carbon-steel-pan",
      author: "Scott Bradley",
      imageUrl: "/images/blog/cast-iron-vs-carbon-steel.jpg",
      imageAlt: "Cast iron and carbon steel pans side by side comparison",
      keywords: {
        primary: "cast iron vs carbon steel",
        secondary: ["cast iron pan", "carbon steel pan", "best pan for searing"],
        searchVolume: 8100,
        difficulty: "medium",
      },
      publishedDate: "2024-10-15",
      publishedTime: "2024-10-15T10:00:00Z",
      lastUpdated: "2025-11-01",
      modifiedTime: "2025-11-01T10:00:00Z",
      searchIntent: "commercial",
      conversionPotential: "high",
      articleSection: "Cookware Comparisons",
      internalLinks: ["nonstick-vs-stainless-steel-pans", "best-cookware"],
      competitorUrls: [
        "https://www.seriouseats.com/carbon-steel-pan-review",
        "https://www.americastestkitchen.com/guides/cast-iron",
      ],
      competitorGap: "Real restaurant testing with specific heat retention data",
    } as BlogMetadata,
    
    'nonstick-vs-stainless-steel-pans': {
      title: "Nonstick vs Stainless: 3 Years vs 20+ Years Lifespan",
      description: "Nonstick for eggs and delicate fish, dies in 3 years. Stainless lasts decades but needs technique. After 24 years testing both, when to use each type.",
      canonical: "https://www.chefapprovedtools.com/blog/nonstick-vs-stainless-steel-pans",
      author: "Scott Bradley",
      imageUrl: "/images/blog/nonstick-vs-stainless.jpg",
      imageAlt: "Nonstick and stainless steel pans comparison",
      keywords: {
        primary: "nonstick vs stainless steel",
        secondary: ["nonstick pans", "stainless steel pans", "best pan for eggs"],
        searchVolume: 12100,
        difficulty: "high",
      },
      publishedDate: "2024-09-22",
      publishedTime: "2024-09-22T10:00:00Z",
      lastUpdated: "2025-10-15",
      modifiedTime: "2025-10-15T10:00:00Z",
      searchIntent: "commercial",
      conversionPotential: "high",
      articleSection: "Cookware Comparisons",
      internalLinks: ["cast-iron-vs-carbon-steel-pan", "stainless-steel-why-food-sticks"],
    } as BlogMetadata,
    
    'wood-vs-composite-cutting-board': {
      title: "Wood vs Composite Cutting Boards: Why 90% of Pros Use Wood",
      description: "24 years testing both: Wood cutting boards win on knife preservation and natural antimicrobial properties. Composite boards excel in dishwasher durability.",
      canonical: "https://www.chefapprovedtools.com/blog/wood-vs-composite-cutting-board",
      author: "Scott Bradley",
      imageUrl: "/images/blog/wood-vs-composite-cutting-board.jpg",
      imageAlt: "Wood and composite cutting boards comparison",
      keywords: {
        primary: "wood vs composite cutting board",
        secondary: ["wood cutting board", "composite cutting board", "best cutting board"],
        searchVolume: 6600,
        difficulty: "medium",
      },
      publishedDate: "2024-08-10",
      publishedTime: "2024-08-10T10:00:00Z",
      modifiedTime: "2025-10-01T10:00:00Z",
      searchIntent: "commercial",
      conversionPotential: "high",
      articleSection: "Kitchen Tools Comparisons",
      internalLinks: ["cutting-board-materials-guide", "knife-safety-rules-professional-kitchens"],
    } as BlogMetadata,

    'making-stock-professional-chef-method': {
      title: "The 3-Step Method That Makes Restaurant-Quality Stock",
      description: "24 years making stock in professional kitchens: The 3-step method that creates deep, rich flavor. Why restaurant stock tastes better than store-bought.",
      canonical: "https://www.chefapprovedtools.com/blog/making-stock-professional-chef-method",
      author: "Scott Bradley",
      imageUrl: "https://www.chefapprovedtools.com/images/making-stock-og.jpg",
      imageAlt: "Professional chef making restaurant-quality stock",
      keywords: {
        primary: "how to make stock",
        secondary: ["chicken stock recipe", "restaurant stock method", "stock vs broth", "building flavor in stock", "homemade stock"],
        searchVolume: 49500,
        difficulty: "medium",
      },
      publishedDate: "2025-09-07",
      publishedTime: "2025-09-07T10:00:00Z",
      lastUpdated: "2025-10-22",
      modifiedTime: "2025-10-22T10:00:00Z",
      searchIntent: "informational",
      conversionPotential: "medium",
      articleSection: "Professional Techniques",
      internalLinks: ["blanching-vegetables-why-restaurants-do-it", "reducing-sauces-restaurant-technique", "deglazing-secret-to-restaurant-quality-flavor"],
    } as BlogMetadata,

    'food-processor-vs-blender': {
      title: "Food Processor vs Blender: 90% of Home Cooks Only Need One",
      description: "24 years in professional kitchens: Most home cooks need a blender OR food processor, not both. Here's which one you actually need based on what you cook.",
      canonical: "https://www.chefapprovedtools.com/blog/food-processor-vs-blender",
      author: "Scott Bradley",
      imageUrl: "https://www.chefapprovedtools.com/og-image.jpg",
      imageAlt: "Food processor and blender comparison guide",
      keywords: {
        primary: "food processor vs blender",
        secondary: ["blender or food processor", "kitchen appliance guide", "cooking tools explained", "what chefs use in the kitchen"],
        searchVolume: 22200,
        difficulty: "high",
      },
      publishedDate: "2025-09-28",
      publishedTime: "2025-09-28T10:00:00Z",
      lastUpdated: "2025-10-21",
      modifiedTime: "2025-10-21T10:00:00Z",
      searchIntent: "commercial",
      conversionPotential: "high",
      articleSection: "Equipment Comparisons",
    } as BlogMetadata,

    // TODO: Add remaining ~67 blog posts
    // Reference phase2-violations-full.txt for complete list
    // PRIORITY: Do this AFTER reviews are migrated
  },
  
  // ==========================================================================
  // REVIEW PAGES (~37 pages) - MIGRATE THESE FIRST
  // ==========================================================================
  
  reviews: {
    'kitchenaid-ksm8990wh': {
      title: "KitchenAid Commercial NSF: Survived 18 Months at Purple Café",
      description: "KitchenAid NSF commercial tested 18 months at Purple Café: mixed 300+ cracker dough batches—zero failures. Restaurant-grade mixer survives heavy workload.",
      canonical: "https://www.chefapprovedtools.com/reviews/kitchenaid-ksm8990wh",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/kitchenaid-commercial-hero.jpg",
      imageAlt: "KitchenAid Commercial Stand Mixer in professional kitchen",
      tier: 1,
      testingPeriod: "18 Months Restaurant Testing",
      productSlug: "kitchenaid-ksm8990wh",
      publishedTime: "2024-06-20T10:00:00Z",
      modifiedTime: "2025-11-05T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.5,
      averagePrice: "200-plus",
      productCategory: "mixers",
      brand: "KitchenAid",
      model: "KSM8990WH",
      articleSection: "Stand Mixer Reviews",
    } as ReviewMetadata,
    
    // ========== BATCH 1: HIGH-PRIORITY REVIEWS (Traffic Leaders) ==========
    
    'method-all-purpose-cleaner': {
      title: "Method All-Purpose Cleaner: 5 Years of Grease-Cutting Tests",
      description: "Method All-Purpose tested 5 years: 1,800+ kitchen messes from bacon grease to tomato sauce cleaned without harsh fumes. Effective, pleasant alternative.",
      canonical: "https://www.chefapprovedtools.com/reviews/method-all-purpose-cleaner",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/method-cleaner-hero.jpg",
      imageAlt: "Method all-purpose cleaner tested in home kitchen for 5 years",
      tier: 2,
      testingPeriod: "5 Years Daily Home Use",
      productSlug: "method-all-purpose-cleaner",
      publishedTime: "2024-08-15T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cleaning",
      brand: "Method",
      articleSection: "Cleaning Product Reviews",
    } as ReviewMetadata,
    
    'kitchenaid-kp26m1xlc-professional-600': {
      title: "KitchenAid Pro 600 Review: 18 Years of Heavy Dough Batches",
      description: "KitchenAid Pro 600 tested 18 years: 575W motor handles triple pizza dough batches without strain. Metal gears survived 900+ baking sessions. True workhorse.",
      canonical: "https://www.chefapprovedtools.com/reviews/kitchenaid-kp26m1xlc-professional-600",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/kitchenaid-pro-600-hero.jpg",
      imageAlt: "KitchenAid Professional 600 stand mixer tested for 18 years",
      tier: 2,
      testingPeriod: "18 Years Testing",
      productSlug: "kitchenaid-kp26m1xlc-professional-600",
      publishedTime: "2024-07-20T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "multiple",
      commissionRate: 5.0,
      averagePrice: "200-plus",
      productCategory: "mixers",
      brand: "KitchenAid",
      model: "KP26M1XLC",
      articleSection: "Stand Mixer Reviews",
    } as ReviewMetadata,
    
    'victorinox-fibrox-8-inch-chefs-knife': {
      title: "Victorinox Fibrox 8\": Sharp After 10,000+ Restaurant Cuts",
      description: "Victorinox 8-inch tested 20 years across 5 kitchens: stayed sharp through line work at Purple Café. NSF-certified Swiss steel sharpened twice per year.",
      canonical: "https://www.chefapprovedtools.com/reviews/victorinox-fibrox-8-inch-chefs-knife",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/victorinox-8-inch-hero.jpg",
      imageAlt: "Victorinox Fibrox 8-inch chef's knife tested 20 years professionally",
      tier: 1,
      testingPeriod: "20 Years (Including 10 Professional)",
      productSlug: "victorinox-fibrox-8-inch-chefs-knife",
      publishedTime: "2024-06-10T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "knives",
      brand: "Victorinox",
      model: "Fibrox Pro 8-Inch",
      articleSection: "Chef Knife Reviews",
    } as ReviewMetadata,
    
    'epicurean-kitchen-cutting-board': {
      title: "Epicurean Cutting Board: 10-Year, 2,000+ Dishwasher Cycles",
      description: "Epicurean board tested 10 years and 2,000+ dishwasher cycles: no warping or cracking. See why it replaced warped wood boards and survives daily prep work.",
      canonical: "https://www.chefapprovedtools.com/reviews/epicurean-kitchen-cutting-board",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/epicurean-board-hero.jpg",
      imageAlt: "Epicurean cutting board after 10 years of dishwasher use",
      tier: 2,
      testingPeriod: "10+ Years Testing",
      productSlug: "epicurean-kitchen-cutting-board",
      publishedTime: "2024-09-05T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "50-100",
      productCategory: "cutting-boards",
      brand: "Epicurean",
      model: "Kitchen Series",
      articleSection: "Cutting Board Reviews",
    } as ReviewMetadata,
    
    'vitamix-5200-professional-blender': {
      title: "Vitamix 5200 Review: 6 Years of Restaurant Testing",
      description: "Vitamix 5200 tested 6 years at Purple Café blending sauces, soups and smoothies with zero failures. Professional-grade power and durability validated.",
      canonical: "https://www.chefapprovedtools.com/reviews/vitamix-5200-professional-blender",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/vitamix-5200-hero.jpg",
      imageAlt: "Vitamix 5200 blender tested 5 years in professional restaurant kitchen",
      tier: 1,
      testingPeriod: "5+ Years Professional Testing",
      productSlug: "vitamix-5200-professional-blender",
      publishedTime: "2024-05-15T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "multiple",
      commissionRate: 10.0,
      averagePrice: "200-plus",
      productCategory: "blenders",
      brand: "Vitamix",
      model: "5200",
      articleSection: "Blender Reviews",
    } as ReviewMetadata,
    
    // ========== BATCH 2: NEXT HIGH-PRIORITY REVIEWS ==========
    
    'le-creuset-signature-7-25-qt-dutch-oven': {
      title: "Le Creuset 7.25-Qt Dutch Oven: 12 Years, Never Chipped",
      description: "Le Creuset 7.25-quart tested 12 years: braised 300+ roasts, baked 200+ loaves—enamel still perfect. Zero staining, zero chipping. Lifetime warranty validated.",
      canonical: "https://www.chefapprovedtools.com/reviews/le-creuset-signature-7-25-qt-dutch-oven",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/le-creuset-dutch-oven-hero.jpg",
      imageAlt: "Le Creuset 7.25-qt Dutch oven after 12 years of heavy use",
      tier: 2,
      testingPeriod: "12 Years Home Testing",
      productSlug: "le-creuset-signature-7-25-qt-dutch-oven",
      publishedTime: "2024-04-10T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "200-plus",
      productCategory: "cookware",
      brand: "Le Creuset",
      model: "7.25-Qt Signature",
      articleSection: "Dutch Oven Reviews",
    } as ReviewMetadata,
    
    'ninja-bl660-professional-blender': {
      title: "Ninja BL660 Blender Review: Cracked Pitcher, Good Smoothies",
      description: "Ninja BL660 tested 90 days: first pitcher cracked after 2 weeks. Replacement handled daily smoothies and wing sauce but durability and noise remain concerns.",
      canonical: "https://www.chefapprovedtools.com/reviews/ninja-bl660-professional-blender",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/ninja-bl660-hero.jpg",
      imageAlt: "Ninja BL660 blender tested 90 days with quality control issues",
      tier: 3,
      testingPeriod: "90 Days Testing",
      productSlug: "ninja-bl660-professional-blender",
      publishedTime: "2024-08-20T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "50-100",
      productCategory: "blenders",
      brand: "Ninja",
      model: "BL660",
      articleSection: "Blender Reviews",
    } as ReviewMetadata,
    
    'diamond-crystal-kosher-salt': {
      title: "Diamond Crystal: Used in 5 Professional Kitchens (18 Years)",
      description: "Diamond Crystal tested 18 years across 5 kitchens: flaky texture gives precise seasoning control. Purple Café, Mellow Mushroom, Feierabend all used it.",
      canonical: "https://www.chefapprovedtools.com/reviews/diamond-crystal-kosher-salt",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/diamond-crystal-salt-hero.jpg",
      imageAlt: "Diamond Crystal kosher salt used in professional kitchens for 18 years",
      tier: 1,
      testingPeriod: "18 Years Testing",
      productSlug: "diamond-crystal-kosher-salt",
      publishedTime: "2024-07-15T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "seasonings",
      brand: "Diamond Crystal",
      articleSection: "Seasoning Reviews",
    } as ReviewMetadata,
    
    'oxo-good-grips-swivel-peeler': {
      title: "OXO Peeler: Peeled 10,000+ Potatoes, Zero Hand Fatigue",
      description: "OXO swivel peeler tested 20 years peeling 10,000+ potatoes and veggies. Soft handle prevents hand fatigue, blade stays sharp. Professional-grade durability.",
      canonical: "https://www.chefapprovedtools.com/reviews/oxo-good-grips-swivel-peeler",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/oxo-peeler-hero.jpg",
      imageAlt: "OXO Good Grips peeler tested 20 years in professional kitchens",
      tier: 2,
      testingPeriod: "20 Years (Including 10 Professional)",
      productSlug: "oxo-good-grips-swivel-peeler",
      publishedTime: "2024-06-25T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "prep-tools",
      brand: "OXO",
      model: "Good Grips Swivel",
      articleSection: "Prep Tool Reviews",
    } as ReviewMetadata,

    // ========== BATCH 3: CONTINUING HIGH-PRIORITY REVIEWS ==========

    'oxo-good-grips-bench-scraper': {
      title: "OXO Bench Scraper Review: Most-Used Tool at Purple Café",
      description: "OXO bench scraper tested 20 years in restaurants: portioning dough, scraping benches and grills daily. Versatile prep tool for professional and home use.",
      canonical: "https://www.chefapprovedtools.com/reviews/oxo-good-grips-bench-scraper",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/oxo-bench-scraper-hero.jpg",
      imageAlt: "OXO bench scraper tested 20 years in professional kitchens",
      tier: 2,
      testingPeriod: "20 Years (Including 10 Professional)",
      productSlug: "oxo-good-grips-bench-scraper",
      publishedTime: "2024-05-20T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "prep-tools",
      brand: "OXO",
      model: "Good Grips Multi-Purpose",
      articleSection: "Prep Tool Reviews",
    } as ReviewMetadata,

    'john-boos-platinum-commercial-cutting-board': {
      title: "John Boos Cutting Board: 14-Year Buy-It-for-Life Workhorse",
      description: "John Boos maple board tested 14 years: oiled occasionally, still flat and smooth after 5,000+ meals. Minimal maintenance for genuine lifetime durability.",
      canonical: "https://www.chefapprovedtools.com/reviews/john-boos-platinum-commercial-cutting-board",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/john-boos-board-hero.jpg",
      imageAlt: "John Boos commercial cutting board after 14 years daily use",
      tier: 2,
      testingPeriod: "14 Years Testing",
      productSlug: "john-boos-platinum-commercial-cutting-board",
      publishedTime: "2024-07-05T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "100-200",
      productCategory: "cutting-boards",
      brand: "John Boos",
      model: "Platinum Commercial",
      articleSection: "Cutting Board Reviews",
    } as ReviewMetadata,

    'instant-pot-duo-plus-6qt': {
      title: "Instant Pot Duo Plus: Rice Perfect, Roast Disappointing",
      description: "Instant Pot tested 90 days: rice and beans perfect every time. Pot roast lacked browning. Saves time on some dishes, not all. Honest assessment from 24 years.",
      canonical: "https://www.chefapprovedtools.com/reviews/instant-pot-duo-plus-6qt",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/instant-pot-hero.jpg",
      imageAlt: "Instant Pot Duo Plus 6-qt tested 90 days by professional chef",
      tier: 3,
      testingPeriod: "90 Days Testing",
      productSlug: "instant-pot-duo-plus-6qt",
      publishedTime: "2024-09-10T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "50-100",
      productCategory: "appliances",
      brand: "Instant Pot",
      model: "Duo Plus 6 Qt",
      articleSection: "Pressure Cooker Reviews",
    } as ReviewMetadata,

    'norton-im200-tri-stone-sharpener': {
      title: "Norton IM200: Knives sharpened 1,000+ times at Purple Café",
      description: "Norton IM200 tested 6 years at Purple Café keeping eight knives razor-sharp. Three grits restore edges in 15 minutes. Simple, effective, reliable sharpening.",
      canonical: "https://www.chefapprovedtools.com/reviews/norton-im200-tri-stone-sharpener",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/norton-sharpener-hero.jpg",
      imageAlt: "Norton IM200 tri-stone sharpener tested 6 years in restaurant",
      tier: 1,
      testingPeriod: "6 Years Restaurant Testing",
      productSlug: "norton-im200-tri-stone-sharpener",
      publishedTime: "2024-06-15T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "50-100",
      productCategory: "knife-care",
      brand: "Norton",
      model: "IM200",
      articleSection: "Knife Sharpening Reviews",
    } as ReviewMetadata,

    'benriner-large-mandoline': {
      title: "Benriner Mandoline: 10,000+ Vegetables at Purple Café",
      description: "Benriner mandoline tested at Purple Café slicing 10,000+ vegetables paper-thin. See how to avoid finger injuries and if it beats bulkier metal slicers.",
      canonical: "https://www.chefapprovedtools.com/reviews/benriner-large-mandoline",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/benriner-mandoline-hero.jpg",
      imageAlt: "Benriner large mandoline tested in professional kitchen",
      tier: 1,
      testingPeriod: "Years of Professional Testing",
      productSlug: "benriner-large-mandoline",
      publishedTime: "2024-08-01T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "prep-tools",
      brand: "Benriner",
      model: "Large Mandoline",
      articleSection: "Prep Tool Reviews",
    } as ReviewMetadata,

    // ========== BATCH 4: CONTINUING MIGRATION ==========

    'victorinox-offset-bread-knife': {
      title: "Victorinox Offset Bread Knife: 20-Year Test (Serrated)",
      description: "20 years professional testing: offset handle provides knuckle clearance for crusty bread, tomatoes. Serrated edge stays sharp. Restaurant-tested design.",
      canonical: "https://www.chefapprovedtools.com/reviews/victorinox-offset-bread-knife",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/victorinox-bread-knife-hero.jpg",
      imageAlt: "Victorinox offset bread knife tested 20 years professionally",
      tier: 1,
      testingPeriod: "20 Years (Including 10 Professional)",
      productSlug: "victorinox-offset-bread-knife",
      publishedTime: "2024-07-25T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "knives",
      brand: "Victorinox",
      model: "Offset Serrated",
      articleSection: "Knife Reviews",
    } as ReviewMetadata,

    'victorinox-4-inch-paring-knife': {
      title: "Victorinox 4\" Paring Knife: 20 Years Since Culinary School",
      description: "Victorinox paring knife tested 20 years: still sharp for peeling, trimming, precision cuts. Swiss steel holds edge. Same blade since culinary school in 2005.",
      canonical: "https://www.chefapprovedtools.com/reviews/victorinox-4-inch-paring-knife",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/victorinox-paring-knife-hero.jpg",
      imageAlt: "Victorinox 4-inch paring knife tested 20 years professionally",
      tier: 1,
      testingPeriod: "20 Years (Including 10 Professional)",
      productSlug: "victorinox-4-inch-paring-knife",
      publishedTime: "2024-08-05T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "knives",
      brand: "Victorinox",
      model: "4-Inch Paring",
      articleSection: "Knife Reviews",
    } as ReviewMetadata,

    'robot-coupe-r2-dice': {
      title: "Robot Coupe R2 DICE: 3 Years Commercial Testing",
      description: "Robot Coupe tested 3 years commercially: 2 HP motor processes 50+ pounds vegetables in 15 minutes. Continuous feed transforms high-volume vegetable prep work.",
      canonical: "https://www.chefapprovedtools.com/reviews/robot-coupe-r2-dice",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/robot-coupe-hero.jpg",
      imageAlt: "Robot Coupe R2 DICE commercial food processor tested 3 years",
      tier: 1,
      testingPeriod: "3 Years Commercial Testing",
      productSlug: "robot-coupe-r2-dice",
      publishedTime: "2024-09-15T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "200-plus",
      productCategory: "appliances",
      brand: "Robot Coupe",
      model: "R2 DICE",
      articleSection: "Food Processor Reviews",
    } as ReviewMetadata,

    'winco-heavy-duty-tongs': {
      title: "Winco Heavy Duty Tongs: 24 Years Restaurant-Grade Use",
      description: "Winco tongs tested 24 years: restaurant-grade stainless at budget price. Perfect spring tension, scalloped grip, dishwasher-safe. Still performing daily.",
      canonical: "https://www.chefapprovedtools.com/reviews/winco-heavy-duty-tongs",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/winco-tongs-hero.jpg",
      imageAlt: "Winco heavy duty tongs tested 24 years in professional kitchens",
      tier: 3,
      testingPeriod: "24 Years Professional Use",
      productSlug: "winco-heavy-duty-tongs",
      publishedTime: "2024-06-30T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cooking-tools",
      brand: "Winco",
      model: "Extra Heavyweight",
      articleSection: "Cooking Tool Reviews",
    } as ReviewMetadata,

    'bodum-chambord-french-press': {
      title: "Bodum Chambord French Press: 18 Years, Still Perfect Coffee",
      description: "Bodum Chambord tested 18 years (6 at Purple Café): still brewing perfect coffee with consistent extraction. Classic design, stainless filter, zero breakage.",
      canonical: "https://www.chefapprovedtools.com/reviews/bodum-chambord-french-press",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/bodum-french-press-hero.jpg",
      imageAlt: "Bodum Chambord French press tested 18 years including Purple Café",
      tier: 1,
      testingPeriod: "18 Years Testing",
      productSlug: "bodum-chambord-french-press",
      publishedTime: "2024-10-01T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "coffee",
      brand: "Bodum",
      model: "Chambord",
      articleSection: "Coffee Equipment Reviews",
    } as ReviewMetadata,

    // ========== BATCH 5: CONTINUING MIGRATION (Traffic Priority) ==========

    'black-decker-toaster-oven': {
      title: "Black+Decker Toaster Oven: 48 Years, 4 Models—Still Works",
      description: "Black+Decker toaster ovens tested 48 years across 4 models: each lasted 5-18 years. Mechanical controls outlast digital competitors. Daily reliability.",
      canonical: "https://www.chefapprovedtools.com/reviews/black-decker-toaster-oven",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/black-decker-toaster-oven-hero.jpg",
      imageAlt: "Black+Decker toaster oven tested 48 years across 4 models",
      tier: 2,
      testingPeriod: "48 Years Testing",
      productSlug: "black-decker-toaster-oven",
      publishedTime: "2025-01-15T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "appliances",
      brand: "Black+Decker",
      model: "TO3250XSB",
      articleSection: "Toaster Oven Reviews",
    } as ReviewMetadata,

    'victorinox-fibrox-10-inch-chefs-knife': {
      title: "Victorinox 10\" Chef Knife: For Larger Hands & Big Tasks",
      description: "Victorinox 10-inch tested 20 years (10 professional). Extra 2 inches ideal for breaking down proteins, larger vegetables. Swiss precision for bigger tasks.",
      canonical: "https://www.chefapprovedtools.com/reviews/victorinox-fibrox-10-inch-chefs-knife",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/victorinox-10-inch-hero.jpg",
      imageAlt: "Victorinox 10-inch chef's knife tested 20 years professionally",
      tier: 1,
      testingPeriod: "20 Years (Including 10 Professional)",
      productSlug: "victorinox-fibrox-10-inch-chefs-knife",
      publishedTime: "2024-06-12T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "50-100",
      productCategory: "knives",
      brand: "Victorinox",
      model: "Fibrox Pro 10-Inch",
      articleSection: "Chef Knife Reviews",
    } as ReviewMetadata,

    'cuisinart-dlc-10c-classic-food-processor': {
      title: "Cuisinart DLC-10C: Same Food Processor for 30 Years",
      description: "Cuisinart DLC-10C tested 30 years shredding cheese and making hashbrowns nearly daily. Motor still strong—genuine buy-it-for-life equipment that delivers.",
      canonical: "https://www.chefapprovedtools.com/reviews/cuisinart-dlc-10c-classic-food-processor",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/cuisinart-dlc-10c-hero.jpg",
      imageAlt: "Cuisinart DLC-10C food processor tested 30 years daily use",
      tier: 2,
      testingPeriod: "30 Years Testing",
      productSlug: "cuisinart-dlc-10c-classic-food-processor",
      publishedTime: "2025-10-11T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "100-200",
      productCategory: "appliances",
      brand: "Cuisinart",
      model: "DLC-10C",
      articleSection: "Food Processor Reviews",
    } as ReviewMetadata,

    'cuisinart-8-inch-nonstick-pan': {
      title: "Cuisinart 8\" Nonstick Pan: 2-Year Test of Budget Option",
      description: "Cuisinart 8-inch nonstick tested 2 years: perfect for eggs and single servings. Impact-bonded base heats evenly, induction ready. Coating stays flawless.",
      canonical: "https://www.chefapprovedtools.com/reviews/cuisinart-8-inch-nonstick-pan",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/cuisinart-8-inch-pan-hero.jpg",
      imageAlt: "Cuisinart 8-inch nonstick pan tested 2 years for eggs and single servings",
      tier: 2,
      testingPeriod: "2 Years Testing",
      productSlug: "cuisinart-8-inch-nonstick-pan",
      publishedTime: "2025-10-13T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cookware",
      brand: "Cuisinart",
      model: "HIC8-20",
      articleSection: "Cookware Reviews",
    } as ReviewMetadata,

    'nordic-ware-half-sheet-pan': {
      title: "Nordic Ware Sheet Pan: 10 Years, Never Warped (I Own 4)",
      description: "Nordic Ware sheet pan tested 10 years: roasting, broiling, baking—still perfectly flat. Commercial 13-gauge aluminum develops patina that improves non-stick.",
      canonical: "https://www.chefapprovedtools.com/reviews/nordic-ware-half-sheet-pan",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/nordic-ware-sheet-pan-hero.jpg",
      imageAlt: "Nordic Ware half sheet pan tested 10 years never warped",
      tier: 2,
      testingPeriod: "10 Years Testing",
      productSlug: "nordic-ware-half-sheet-pan",
      publishedTime: "2024-09-20T10:00:00Z",
      modifiedTime: "2025-11-12T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "bakeware",
      brand: "Nordic Ware",
      model: "Natural Aluminum Commercial",
      articleSection: "Bakeware Reviews",
    } as ReviewMetadata,

    // ========== BATCH 6: CONTINUING MIGRATION (Impression Priority) ==========

    'rubbermaid-commercial-cooks-scraper': {
      title: "Rubbermaid Scraper: 18 Years, 500°F Rated, Never Melted",
      description: "Rubbermaid Commercial scraper tested 18 years professionally. Handles 500°F griddles without melting. NSF-certified one-piece molded design—lifetime tool.",
      canonical: "https://www.chefapprovedtools.com/reviews/rubbermaid-commercial-cooks-scraper",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/rubbermaid-scraper-hero.jpg",
      imageAlt: "Rubbermaid Commercial scraper tested 18 years in professional kitchens",
      tier: 1,
      testingPeriod: "18 Years Testing",
      productSlug: "rubbermaid-commercial-cooks-scraper",
      publishedTime: "2024-08-10T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cooking-tools",
      brand: "Rubbermaid Commercial",
      model: "FG1900",
      articleSection: "Cooking Tool Reviews",
    } as ReviewMetadata,

    'ninja-air-fryer-af101': {
      title: "Ninja Air Fryer AF101: 4-Year Test (Honest Results)",
      description: "Ninja AF101 tested 4 years daily: delivers 85% of deep-fryer results on wings and frozen foods. 4-quart capacity ideal for 1-2 people, not large families.",
      canonical: "https://www.chefapprovedtools.com/reviews/ninja-air-fryer-af101",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/ninja-air-fryer-hero.jpg",
      imageAlt: "Ninja Air Fryer AF101 tested 4 years for wings and frozen foods",
      tier: 3,
      testingPeriod: "90 Days Testing",
      productSlug: "ninja-air-fryer-af101",
      publishedTime: "2025-10-15T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "50-100",
      productCategory: "appliances",
      brand: "Ninja",
      model: "AF101",
      articleSection: "Air Fryer Reviews",
    } as ReviewMetadata,

    'victorinox-granton-edge-boning-knife': {
      title: "Victorinox Boning Knife: 20-Year Test, Granton Edge",
      description: "Victorinox Granton boning knife tested 20 years (10 professional). Flexible blade follows contours, granton prevents stick. Breaks down chicken in 3 minutes.",
      canonical: "https://www.chefapprovedtools.com/reviews/victorinox-granton-edge-boning-knife",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/victorinox-boning-knife-hero.jpg",
      imageAlt: "Victorinox Granton Edge boning knife tested 20 years professionally",
      tier: 1,
      testingPeriod: "20 Years (Including 10 Professional)",
      productSlug: "victorinox-granton-edge-boning-knife",
      publishedTime: "2024-07-18T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "knives",
      brand: "Victorinox",
      model: "40536",
      articleSection: "Knife Reviews",
    } as ReviewMetadata,

    'zuperia-bar-mops': {
      title: "ZUPERIA Bar Mops: Better Than Restaurant Grade (100% Cotton)",
      description: "ZUPERIA bar mops tested professionally: 100% ring-spun cotton absorbs more than competitors. Industry standard in restaurants. Survives hundreds of washes.",
      canonical: "https://www.chefapprovedtools.com/reviews/zuperia-bar-mops",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/zuperia-bar-mops-hero.jpg",
      imageAlt: "ZUPERIA bar mops tested in professional restaurant kitchens",
      tier: 3,
      testingPeriod: "Years Restaurant Testing",
      productSlug: "zuperia-bar-mops",
      publishedTime: "2025-10-13T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cleaning",
      brand: "ZUPERIA",
      articleSection: "Kitchen Essentials Reviews",
    } as ReviewMetadata,

    'small-metal-hotel-pans': {
      title: "Small Metal Hotel Pans: Restaurant Secret for Home Hosting",
      description: "Small metal hotel pans tested 20 years: oven-safe to 500°F for BBQs, hot holding, roasting. NSF-certified 18-8 stainless steel—decades of professional use.",
      canonical: "https://www.chefapprovedtools.com/reviews/small-metal-hotel-pans",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/small-metal-hotel-pans-hero.jpg",
      imageAlt: "Small metal hotel pans tested 20 years for hot holding and oven use",
      tier: 1,
      testingPeriod: "20 Years Using",
      productSlug: "small-metal-hotel-pans",
      publishedTime: "2024-09-25T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cookware",
      brand: "Multiple",
      articleSection: "Restaurant Equipment Reviews",
    } as ReviewMetadata,

    // ========== BATCH 7: FINAL BATCH - MIGRATION COMPLETE! ==========

    'henckels-sharpening-steel': {
      title: "Henckels Honing Steel: 20 Years Since Culinary School",
      description: "Henckels honing steel tested 20 years since culinary school 2005. Keeps knives sharp between sharpenings. Still functional after decades of daily use.",
      canonical: "https://www.chefapprovedtools.com/reviews/henckels-sharpening-steel",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/henckels-steel-hero.jpg",
      imageAlt: "Henckels honing steel tested 20 years since culinary school",
      tier: 1,
      testingPeriod: "20 Years Testing",
      productSlug: "henckels-sharpening-steel",
      publishedTime: "2025-01-15T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "knife-care",
      brand: "J.A. Henckels",
      model: "10-Inch Steel",
      articleSection: "Knife Maintenance Reviews",
    } as ReviewMetadata,

    'large-metal-hotel-pans': {
      title: "Why Restaurant Kitchens Use Metal Hotel Pans (Not Plastic)",
      description: "Large metal hotel pans tested 24 years commercially: handle heat, steam tables, high-volume service. NSF-certified 18-8 stainless steel for catering ops.",
      canonical: "https://www.chefapprovedtools.com/reviews/large-metal-hotel-pans",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/large-metal-hotel-pans-hero.jpg",
      imageAlt: "Large metal hotel pans tested 24 years in commercial kitchens",
      tier: 1,
      testingPeriod: "24 Years Pro Use",
      productSlug: "large-metal-hotel-pans",
      publishedTime: "2024-10-05T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cookware",
      brand: "Multiple",
      articleSection: "Restaurant Equipment Reviews",
    } as ReviewMetadata,

    'small-plastic-hotel-pans': {
      title: "Small Plastic Hotel Pans: Better Than Tupperware (20 Years)",
      description: "Small plastic hotel pans tested 20 years: NSF-approved standardized sizing eliminates chaos. Restaurant storage system organizes better than Tupperware.",
      canonical: "https://www.chefapprovedtools.com/reviews/small-plastic-hotel-pans",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/small-plastic-hotel-pans-hero.jpg",
      imageAlt: "Small plastic hotel pans tested 20 years for home organization",
      tier: 1,
      testingPeriod: "20 Years Using",
      productSlug: "small-plastic-hotel-pans",
      publishedTime: "2024-10-10T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "storage",
      brand: "Multiple",
      articleSection: "Kitchen Organization Reviews",
    } as ReviewMetadata,

    'large-plastic-hotel-pans': {
      title: "Why I Ditched Tupperware For Plastic Hotel Pans (20 Years)",
      description: "Large plastic hotel pans tested 20 years: full and 1/3 sizes organize batch cooking better than Tupperware. NSF-approved stackable restaurant storage.",
      canonical: "https://www.chefapprovedtools.com/reviews/large-plastic-hotel-pans",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/large-plastic-hotel-pans-hero.jpg",
      imageAlt: "Large plastic hotel pans tested 20 years for batch cooking",
      tier: 1,
      testingPeriod: "20 Years Using",
      productSlug: "large-plastic-hotel-pans",
      publishedTime: "2024-10-12T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "storage",
      brand: "Multiple",
      articleSection: "Kitchen Organization Reviews",
    } as ReviewMetadata,

    'lodge-seasoned-cast-iron-3-skillet-bundle': {
      title: "Lodge Cast Iron Bundle: 7 Years, Seasoning Still Perfect",
      description: "Lodge 3-skillet bundle tested 7 years weekly: 12\", 10.25\", 8\" sizes. Seasoning improves with use. Professional heat retention, genuine lifetime durability.",
      canonical: "https://www.chefapprovedtools.com/reviews/lodge-seasoned-cast-iron-3-skillet-bundle",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/lodge-cast-iron-bundle-hero.jpg",
      imageAlt: "Lodge cast iron 3-skillet bundle tested 7 years weekly use",
      tier: 2,
      testingPeriod: "7 Years Weekly Testing",
      productSlug: "lodge-seasoned-cast-iron-3-skillet-bundle",
      publishedTime: "2024-11-01T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "50-100",
      productCategory: "cookware",
      brand: "Lodge",
      model: "3-Skillet Set",
      articleSection: "Cast Iron Reviews",
    } as ReviewMetadata,

    'japanese-wooden-spoon-set': {
      title: "Japanese Wooden Spoons: 3 Years + 100 Dishwasher Cycles",
      description: "Japanese spoons tested 3 years with 100+ dishwasher cycles: still look new. Won't scratch non-stick or cast iron. No metallic taste. Truly dishwasher-safe.",
      canonical: "https://www.chefapprovedtools.com/reviews/japanese-wooden-spoon-set",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/japanese-wooden-spoons-hero.jpg",
      imageAlt: "Japanese wooden spoon set tested 3 years and 100 dishwasher cycles",
      tier: 3,
      testingPeriod: "3 Years + 100 Dishwasher Cycles",
      productSlug: "japanese-wooden-spoon-set",
      publishedTime: "2024-01-15T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "medium",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "under-50",
      productCategory: "cooking-tools",
      brand: "Generic",
      model: "6-Piece Set",
      articleSection: "Cooking Tool Reviews",
    } as ReviewMetadata,

    'wusthof-classic-ikon-16-piece': {
      title: "Wüsthof Classic Ikon 16-Piece: 6-Year Professional Test",
      description: "Wüsthof Classic Ikon 16-piece tested 6 years professionally. German-forged handles reduce fatigue. Essential chef, santoku, bread, paring knives included.",
      canonical: "https://www.chefapprovedtools.com/reviews/wusthof-classic-ikon-16-piece",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/wusthof-ikon-hero.jpg",
      imageAlt: "Wüsthof Classic Ikon 16-piece knife set tested 6 years professionally",
      tier: 1,
      testingPeriod: "2 Years Professional Testing",
      productSlug: "wusthof-classic-ikon-16-piece",
      publishedTime: "2024-05-20T10:00:00Z",
      modifiedTime: "2025-11-13T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "200-plus",
      productCategory: "knives",
      brand: "Wüsthof",
      model: "Classic Ikon 16-Piece",
      articleSection: "Knife Set Reviews",
    } as ReviewMetadata,

    // ========== MIGRATION 100% COMPLETE! ==========
    // All 37 reviews successfully migrated to centralized metadata system
  },
  
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get metadata for a page
 */
export function getPageMetadata(slug: string): PageMetadata {
  const metadata = (METADATA.pages as Record<string, PageMetadata>)[slug];
  if (!metadata) {
    throw new Error(`No page metadata found for slug: ${slug}`);
  }
  return metadata;
}

/**
 * Get metadata for a blog post
 */
export function getBlogMetadata(slug: string): BlogMetadata {
  const metadata = (METADATA.blog as Record<string, BlogMetadata>)[slug];
  if (!metadata) {
    throw new Error(`No blog metadata found for slug: ${slug}`);
  }
  return metadata;
}

/**
 * Get metadata for a review page
 */
export function getReviewMetadata(slug: string): ReviewMetadata {
  const metadata = (METADATA.reviews as Record<string, ReviewMetadata>)[slug];
  if (!metadata) {
    throw new Error(`No review metadata found for slug: ${slug}`);
  }
  return metadata;
}

/**
 * Get metadata for a guide/category page
 */
export function getGuideMetadata(slug: string): PageMetadata {
  const metadata = (METADATA.guides as Record<string, PageMetadata>)[slug];
  if (!metadata) {
    throw new Error(`No guide metadata found for slug: ${slug}`);
  }
  return metadata;
}

/**
 * Calculate string similarity (Levenshtein distance based)
 * Returns 0-100 percentage
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 100.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return ((longer.length - editDistance) / longer.length) * 100;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Validate all metadata in the file
 * Returns array of validation errors
 */
export function validateAllMetadata(): string[] {
  const errors: string[] = [];
  const allTitles: { slug: string; title: string; type: string }[] = [];
  
  // Collect all titles for similarity checking
  Object.entries(METADATA.pages).forEach(([slug, meta]) => {
    allTitles.push({ slug, title: meta.title, type: 'pages' });
  });
  Object.entries(METADATA.guides).forEach(([slug, meta]) => {
    allTitles.push({ slug, title: meta.title, type: 'guides' });
  });
  Object.entries(METADATA.blog).forEach(([slug, meta]) => {
    allTitles.push({ slug, title: meta.title, type: 'blog' });
  });
  Object.entries(METADATA.reviews).forEach(([slug, meta]) => {
    allTitles.push({ slug, title: meta.title, type: 'reviews' });
  });
  
  // Check title similarity (must be <80% similar)
  for (let i = 0; i < allTitles.length; i++) {
    for (let j = i + 1; j < allTitles.length; j++) {
      const similarity = calculateSimilarity(allTitles[i].title, allTitles[j].title);
      if (similarity >= 80) {
        errors.push(
          `Title similarity violation: ${allTitles[i].type}/${allTitles[i].slug} and ${allTitles[j].type}/${allTitles[j].slug} are ${similarity.toFixed(1)}% similar (must be <80%)`
        );
      }
    }
  }
  
  // Validate pages
  Object.entries(METADATA.pages).forEach(([slug, meta]) => {
    if (meta.title.length > 60) {
      errors.push(`pages/${slug}: Title too long (${meta.title.length} chars)`);
    }
    if (meta.description.length < 145) {
      errors.push(`pages/${slug}: Description too short (${meta.description.length} chars)`);
    }
    if (meta.description.length > 160) {
      errors.push(`pages/${slug}: Description too long (${meta.description.length} chars)`);
    }
    if (!meta.author) {
      errors.push(`pages/${slug}: Missing author field`);
    }
  });
  
  // Validate guides
  Object.entries(METADATA.guides).forEach(([slug, meta]) => {
    if (meta.title.length > 60) {
      errors.push(`guides/${slug}: Title too long (${meta.title.length} chars)`);
    }
    if (meta.description.length < 145) {
      errors.push(`guides/${slug}: Description too short (${meta.description.length} chars)`);
    }
    if (meta.description.length > 160) {
      errors.push(`guides/${slug}: Description too long (${meta.description.length} chars)`);
    }
    if (!meta.author) {
      errors.push(`guides/${slug}: Missing author field`);
    }
  });
  
  // Validate blog posts
  Object.entries(METADATA.blog).forEach(([slug, meta]) => {
    if (meta.title.length > 60) {
      errors.push(`blog/${slug}: Title too long (${meta.title.length} chars)`);
    }
    if (meta.description.length < 145) {
      errors.push(`blog/${slug}: Description too short (${meta.description.length} chars)`);
    }
    if (meta.description.length > 160) {
      errors.push(`blog/${slug}: Description too long (${meta.description.length} chars)`);
    }
    if (!meta.author) {
      errors.push(`blog/${slug}: Missing author field`);
    }
    if (!meta.keywords || !meta.keywords.primary) {
      errors.push(`blog/${slug}: Missing primary keyword`);
    }
    if (!meta.publishedDate) {
      errors.push(`blog/${slug}: Missing publishedDate`);
    }
  });
  
  // Validate reviews
  Object.entries(METADATA.reviews).forEach(([slug, meta]) => {
    if (meta.title.length > 60) {
      errors.push(`reviews/${slug}: Title too long (${meta.title.length} chars)`);
    }
    if (meta.description.length < 145) {
      errors.push(`reviews/${slug}: Description too short (${meta.description.length} chars)`);
    }
    if (meta.description.length > 160) {
      errors.push(`reviews/${slug}: Description too long (${meta.description.length} chars)`);
    }
    if (!meta.author) {
      errors.push(`reviews/${slug}: Missing author field`);
    }
    if (!meta.tier || ![1, 2, 3].includes(meta.tier)) {
      errors.push(`reviews/${slug}: Invalid tier (must be 1, 2, or 3)`);
    }
    if (!meta.testingPeriod) {
      errors.push(`reviews/${slug}: Missing testingPeriod`);
    }
    if (!meta.productSlug) {
      errors.push(`reviews/${slug}: Missing productSlug`);
    }
    if (!meta.affiliateProgram) {
      errors.push(`reviews/${slug}: Missing affiliateProgram`);
    }
    if (!meta.productCategory) {
      errors.push(`reviews/${slug}: Missing productCategory`);
    }
  });
  
  return errors;
}

/**
 * Get all slugs for a specific type
 */
export function getAllSlugs(type: 'pages' | 'guides' | 'blog' | 'reviews'): string[] {
  return Object.keys(METADATA[type]);
}

/**
 * Get total count of all metadata entries
 */
export function getMetadataStats() {
  return {
    pages: Object.keys(METADATA.pages).length,
    guides: Object.keys(METADATA.guides).length,
    blog: Object.keys(METADATA.blog).length,
    reviews: Object.keys(METADATA.reviews).length,
    total: Object.keys(METADATA.pages).length + 
           Object.keys(METADATA.guides).length + 
           Object.keys(METADATA.blog).length + 
           Object.keys(METADATA.reviews).length,
  };
}

/**
 * Batch update utility - update titles matching pattern
 */
export function batchUpdateTitles(
  updates: { type: 'pages' | 'guides' | 'blog' | 'reviews'; slug: string; newTitle: string }[]
): string[] {
  const errors: string[] = [];
  
  updates.forEach(({ type, slug, newTitle }) => {
    if (newTitle.length > 60) {
      errors.push(`${type}/${slug}: New title too long (${newTitle.length} chars)`);
      return;
    }

    const metadata = (METADATA[type] as Record<string, any>)[slug];
    if (!metadata) {
      errors.push(`${type}/${slug}: Not found`);
      return;
    }

    metadata.title = newTitle;
  });
  
  return errors;
}

/**
 * Get high-conversion-potential pages for optimization priority
 */
export function getHighConversionPages(): string[] {
  const highPotential: string[] = [];
  
  Object.entries(METADATA.reviews).forEach(([slug, meta]) => {
    if (meta.conversionPotential === 'high' && meta.commissionRate && meta.commissionRate >= 4.0) {
      highPotential.push(`reviews/${slug}`);
    }
  });
  
  Object.entries(METADATA.blog).forEach(([slug, meta]) => {
    if (meta.searchIntent === 'commercial' || meta.searchIntent === 'transactional') {
      if (meta.conversionPotential === 'high') {
        highPotential.push(`blog/${slug}`);
      }
    }
  });
  
  return highPotential;
}

/**
 * Get pages by product category (for category page linking)
 */
export function getReviewsByCategory(category: string): string[] {
  return Object.entries(METADATA.reviews)
    .filter(([_, meta]) => meta.productCategory === category)
    .map(([slug, _]) => slug);
}
