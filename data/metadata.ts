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
  description: string; // 150-160 chars
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
      description: "24 years in professional kitchens—Purple Café, Mellow Mushroom, Feierabend. Every product tested through real commercial use or extensive long-term home testing.",
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
      description: "Kitchen appliances guide from 24 years professional testing: What works, what fails, what lasts. Honest recommendations based on commercial use and long-term home testing.",
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
      description: "Complete guide to cookware materials from 24 years professional use: Stainless for versatility, cast iron for heat retention, carbon steel for responsiveness. When each wins.",
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
      description: "Cast iron holds heat 3x longer for searing. Carbon steel heats/cools fast for control. After 24 years testing both, here's when each type wins.",
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
    
    // TODO: Add remaining ~67 blog posts
    // Reference phase2-violations-full.txt for complete list
    // PRIORITY: Do this AFTER reviews are migrated
  },
  
  // ==========================================================================
  // REVIEW PAGES (~37 pages) - MIGRATE THESE FIRST
  // ==========================================================================
  
  reviews: {
    'vitamix-5200': {
      title: "Vitamix 5200: 6 Years Professional Restaurant Testing",
      description: "After 6 years at Purple Café making sauces, salsas, and purees, the Vitamix 5200 proved what professional-grade means: zero maintenance, zero failures, zero compromises.",
      canonical: "https://www.chefapprovedtools.com/reviews/vitamix-5200",
      author: "Scott Bradley",
      imageUrl: "/images/reviews/vitamix-5200-hero.jpg",
      imageAlt: "Vitamix 5200 blender tested in professional restaurant kitchen",
      tier: 1,
      testingPeriod: "6 Years Professional Testing",
      productSlug: "vitamix-5200",
      publishedTime: "2024-05-15T10:00:00Z",
      modifiedTime: "2025-11-10T10:00:00Z",
      searchIntent: "transactional",
      conversionPotential: "high",
      affiliateProgram: "amazon",
      commissionRate: 4.0,
      averagePrice: "200-plus",
      productCategory: "blenders",
      brand: "Vitamix",
      model: "5200",
      articleSection: "Blender Reviews",
    } as ReviewMetadata,
    
    'kitchenaid-ksm8990wh': {
      title: "KitchenAid Commercial NSF: Survived 18 Months at Purple Café",
      description: "18 months at Purple Café: mixed 300+ cracker dough batches—zero failures. NSF-certified commercial mixer that actually survives restaurant workload.",
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
      description: "Method All-Purpose cleaner tested 5 years in a real kitchen: 1,800+ messes from bacon grease to tomato sauce cleaned without harsh fumes. Find out when it beats the classic blue stuff.",
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
      description: "KitchenAid Pro 600 review from 18 years of use: 575W motor mixing triple pizza dough batches and 900+ baking sessions. See if this metal-gear workhorse belongs in your kitchen.",
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
      title: "Victorinox Fibrox 8\": Held Edge Through 10,000+ Restaurant Cuts",
      description: "20 years, 5 professional kitchens: stayed sharp through daily line work at Purple Café. NSF-certified Swiss steel. Sharpened 2x/year, not 2x/month.",
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
      title: "Epicurean Cutting Board: 10-Year, 2,000-Cycle Dishwasher Test",
      description: "Epicurean Kitchen cutting board tested 10 years and 2,000+ dishwasher cycles with no warping or cracking. See why it replaced warped wood boards and how it holds up to daily prep.",
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
      description: "Vitamix 5200 review from a pro chef after 6 years at Purple Café blending sauces, soups and smoothies with zero failures. See if its price really matches the performance.",
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
      title: "Le Creuset 7.25-Qt: Enamel Still Perfect After 12 Years Heavy Use",
      description: "12 years heavy use: braised 300+ roasts, baked 200+ loaves—enamel coating still perfect. Zero staining, zero chipping. Lifetime warranty proven.",
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
      description: "Ninja BL660 tested 90 days: first pitcher cracked after two weeks, replacement handled daily smoothies and wing sauce. Learn if the low price outweighs durability and noise issues.",
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
      title: "Diamond Crystal Kosher Salt: Used in Every Restaurant I Worked (18 Years)",
      description: "18 years, 5 professional kitchens: flaky texture gives precise seasoning control. Purple Café, Mellow Mushroom, Feierabend—all used Diamond Crystal.",
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
      description: "OXO Good Grips swivel peeler tested 20 years peeling 10,000+ potatoes and veggies. Soft handle prevents hand fatigue while the blade stays sharp. Find out why chefs still recommend it.",
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
      description: "OXO Good Grips bench scraper reviewed after 20 years in restaurant kitchens: portioning dough, scraping benches and grills daily. Learn the tricks that make it a top prep tool at home.",
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
      description: "John Boos maple cutting board tested 14 years: oiled a few times, still flat and smooth after 5,000+ meals. See how to care for it so it truly becomes a lifetime board.",
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
      title: "Instant Pot Duo Plus: Rice Perfect, Pot Roast Disappointing (90 Days)",
      description: "90 days testing: rice and beans perfect every time. Pot roast lacked browning. Saves time on some dishes, not all. Chef's honest assessment.",
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
      description: "Norton IM200 tri-stone sharpener reviewed after 6 years at Purple Café keeping eight knives razor-sharp. Three grits restore edges in about 15 minutes. Learn the simple sharpening routine.",
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
      title: "Benriner Mandoline: Sliced 10,000+ Vegetables at Purple Café",
      description: "Benriner large mandoline tested in a pro kitchen slicing 10,000+ vegetables into paper-thin cuts. See how to use it safely, avoid cuts, and decide if it beats bulkier metal slicers",
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

    // TODO: Add remaining ~22 review pages (Batch 4-7)
    // PRIORITY: Continue migration after Batch 3 validated
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
    if (meta.description.length < 150) {
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
    if (meta.description.length < 150) {
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
    if (meta.description.length < 150) {
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
    if (meta.description.length < 150) {
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
