/**
 * Centralized Image Registry
 *
 * Single source of truth for all product image paths.
 * Change paths here and they update everywhere.
 *
 * Image types:
 * - hero: Large featured image (used in ReviewHero)
 * - og: Open Graph image for social sharing (1200x630)
 * - gallery: Array of product images
 */

export const FALLBACK_OG = '/og-image.jpg'

export const productImages: Record<string, {
  hero?: string
  og?: string
  gallery?: string[]
}> = {
  // ============================================
  // ✅ PRODUCTS WITH HERO + OG + GALLERY
  // ============================================

  'benriner-large-mandoline': {
    hero: '/images/products/benriner-large-mandoline/benriner-large-mandoline-hero.jpg',
    og: '/images/products/benriner-large-mandoline/benriner-large-mandoline-og.jpg',
    gallery: [
      '/images/products/benriner-large-mandoline/benriner-large-mandoline-1.webp',
      '/images/products/benriner-large-mandoline/benriner-large-mandoline-2.webp',
      '/images/products/benriner-large-mandoline/benriner-large-mandoline-3.webp',
      '/images/products/benriner-large-mandoline/benriner-large-mandoline-4.webp',
      '/images/products/benriner-large-mandoline/benriner-large-mandoline-5.webp',
      '/images/products/benriner-large-mandoline/benriner-large-mandoline-6.webp',
    ]
  },

  'bodum-chambord-french-press': {
    hero: '/images/products/bodum-chambord-french-press/bodum-chambord-french-press-hero.jpg',
    og: '/images/products/bodum-chambord-french-press/bodum-chambord-french-press-og.jpg',
    gallery: [
      '/images/products/bodum-chambord-french-press/bodum-chambord-french-press-1.jpg',
    ]
  },

  'cuisinart-dlc-10c-classic-food-processor': {
    hero: '/images/products/cuisinart-dlc-10c-classic-food-processor/cuisinart-dlc-10c-classic-food-processor-hero.jpg',
    og: '/images/products/cuisinart-dlc-10c-classic-food-processor/cuisinart-dlc-10c-classic-food-processor-og.jpg',
    gallery: [
      '/images/products/cuisinart-dlc-10c-classic-food-processor/cuisinart-dlc-10c-classic-food-processor-1.jpg',
    ]
  },

  'diamond-crystal-kosher-salt': {
    hero: '/images/products/diamond-crystal-kosher-salt/diamond-crystal-kosher-salt-hero.jpg',
    og: '/images/products/diamond-crystal-kosher-salt/diamond-crystal-kosher-salt-og.jpg',
    gallery: [
      '/images/products/diamond-crystal-kosher-salt/diamond-crystal-kosher-salt-1.jpg',
    ]
  },

  'epicurean-kitchen-cutting-board': {
    hero: '/images/products/epicurean-kitchen-cutting-board/epicurean-kitchen-cutting-board-hero.jpg',
    og: '/images/products/epicurean-kitchen-cutting-board/epicurean-kitchen-cutting-board-og.jpg',
    gallery: [
      '/images/products/epicurean-kitchen-cutting-board/epicurean-kitchen-cutting-board-1.jpg',
    ]
  },

  'kitchenaid-kp26m1xlc-professional-600': {
    hero: '/images/products/kitchenaid-kp26m1xlc-professional-600/kitchenaid-kp26m1xlc-professional-600-hero.jpg',
    og: '/images/products/kitchenaid-kp26m1xlc-professional-600/kitchenaid-kp26m1xlc-professional-600-og.jpg',
    gallery: [
      '/images/products/kitchenaid-kp26m1xlc-professional-600/kitchenaid-kp26m1xlc-professional-600-1.jpg',
    ]
  },

  'le-creuset-signature-7-25-qt-dutch-oven': {
    hero: '/images/products/le-creuset-signature-7-25-qt-dutch-oven/le-creuset-signature-7-25-qt-dutch-oven-hero.jpg',
    og: '/images/products/le-creuset-signature-7-25-qt-dutch-oven/le-creuset-signature-7-25-qt-dutch-oven-og.jpg',
    gallery: [
      '/images/products/le-creuset-signature-7-25-qt-dutch-oven/le-creuset-signature-7-25-qt-dutch-oven-1.jpg',
    ]
  },

  'lodge-seasoned-cast-iron-3-skillet-bundle': {
    hero: '/images/products/lodge-seasoned-cast-iron-3-skillet-bundle/lodge-seasoned-cast-iron-3-skillet-bundle-hero.jpg',
    og: '/images/products/lodge-seasoned-cast-iron-3-skillet-bundle/lodge-seasoned-cast-iron-3-skillet-bundle-og.jpg',
    gallery: [
      '/images/products/lodge-seasoned-cast-iron-3-skillet-bundle/lodge-seasoned-cast-iron-3-skillet-bundle-1.jpg',
    ]
  },

  'method-all-purpose-cleaner': {
    hero: '/images/products/method-all-purpose-cleaner/method-all-purpose-cleaner-hero.jpg',
    og: '/images/products/method-all-purpose-cleaner/method-all-purpose-cleaner-og.jpg',
    gallery: [
      '/images/products/method-all-purpose-cleaner/method-all-purpose-cleaner-1.jpg',
    ]
  },

  'ninja-air-fryer-af101': {
    hero: '/images/products/ninja-air-fryer-af101/ninja-air-fryer-af101-hero.jpg',
    og: '/images/products/ninja-air-fryer-af101/ninja-air-fryer-af101-og.jpg',
    gallery: []
  },

  'victorinox-fibrox-8-inch-chefs-knife': {
    hero: '/images/products/victorinox-fibrox-8-inch-chefs-knife/victorinox-fibrox-8-inch-chefs-knife-hero.jpg',
    og: '/images/products/victorinox-fibrox-8-inch-chefs-knife/victorinox-fibrox-8-inch-chefs-knife-og.jpg',
    gallery: [
      '/images/products/victorinox-fibrox-8-inch-chefs-knife/victorinox-fibrox-8-inch-chefs-knife-1.jpg',
      '/images/products/victorinox-fibrox-8-inch-chefs-knife/victorinox-fibrox-8-inch-chefs-knife-2.webp',
      '/images/products/victorinox-fibrox-8-inch-chefs-knife/victorinox-fibrox-8-inch-chefs-knife-3.webp',
    ]
  },

  'victorinox-fibrox-10-inch-chefs-knife': {
    hero: '/images/products/victorinox-fibrox-10-inch-chefs-knife/victorinox-fibrox-10-inch-chefs-knife-hero.jpg',
    og: '/images/products/victorinox-fibrox-10-inch-chefs-knife/victorinox-fibrox-10-inch-chefs-knife-og.jpg',
    gallery: [
      '/images/products/victorinox-fibrox-10-inch-chefs-knife/victorinox-fibrox-10-inch-chefs-knife-1.webp',
      '/images/products/victorinox-fibrox-10-inch-chefs-knife/victorinox-fibrox-10-inch-chefs-knife-2.webp',
      '/images/products/victorinox-fibrox-10-inch-chefs-knife/victorinox-fibrox-10-inch-chefs-knife-3.webp',
      '/images/products/victorinox-fibrox-10-inch-chefs-knife/victorinox-fibrox-10-inch-chefs-knife-4.webp',
    ]
  },

  'wusthof-classic-ikon-16-piece': {
    hero: '/images/products/wusthof-classic-ikon-16-piece/wusthof-classic-ikon-16-piece-hero.jpg',
    og: '/images/products/wusthof-classic-ikon-16-piece/wusthof-classic-ikon-16-piece-og.jpg',
    gallery: [
      '/images/products/wusthof-classic-ikon-16-piece/wusthof-classic-ikon-16-piece-1.jpg',
    ]
  },

  'wusthof-classic-ikon-santoku': {
    hero: '/images/products/wusthof-classic-ikon-santoku/wusthof-classic-ikon-santoku-hero.jpg',
    og: '/images/products/wusthof-classic-ikon-santoku/wusthof-classic-ikon-santoku-og.jpg',
    gallery: [
      '/images/products/wusthof-classic-ikon-santoku/wusthof-classic-ikon-santoku-hero.jpg',
    ]
  },

  // ============================================
  // ⚠️ PRODUCTS WITH GALLERY ONLY (no hero/og)
  // Will fallback to first gallery image for OG
  // ============================================

  'john-boos-platinum-commercial-cutting-board': {
    gallery: [
      '/images/products/john-boos-platinum-commercial-cutting-board/john-boos-platinum-commercial-cutting-board-1.webp',
      '/images/products/john-boos-platinum-commercial-cutting-board/john-boos-platinum-commercial-cutting-board-2.webp',
      '/images/products/john-boos-platinum-commercial-cutting-board/john-boos-platinum-commercial-cutting-board-3.webp',
      '/images/products/john-boos-platinum-commercial-cutting-board/john-boos-platinum-commercial-cutting-board-5.webp',
      '/images/products/john-boos-platinum-commercial-cutting-board/john-boos-platinum-commercial-cutting-board-6.webp',
    ]
  },

  'oxo-good-grips-bench-scraper': {
    gallery: [
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-1.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-2.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-3.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-4.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-5.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-6.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-7.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-8.webp',
      '/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-9.webp',
    ]
  },

  'oxo-good-grips-swivel-peeler': {
    gallery: [
      '/images/products/oxo-good-grips-swivel-peeler/oxo-good-grips-swivel-peeler-1.webp',
      '/images/products/oxo-good-grips-swivel-peeler/oxo-good-grips-swivel-peeler-2.webp',
    ]
  },

  'victorinox-4-inch-paring-knife': {
    gallery: [
      '/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-1.webp',
      '/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-2.webp',
      '/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-3.webp',
      '/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-4.webp',
      '/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-5.webp',
      '/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-6.webp',
    ]
  },

  'victorinox-granton-edge-boning-knife': {
    gallery: [
      '/images/products/victorinox-granton-edge-boning-knife/victorinox-granton-edge-boning-knife-1.webp',
      '/images/products/victorinox-granton-edge-boning-knife/victorinox-granton-edge-boning-knife-2.webp',
    ]
  },

  'victorinox-offset-bread-knife': {
    gallery: [
      '/images/products/victorinox-offset-bread-knife/victorinox-offset-bread-knife-1.webp',
      '/images/products/victorinox-offset-bread-knife/victorinox-offset-bread-knife-2.webp',
      '/images/products/victorinox-offset-bread-knife/victorinox-offset-bread-knife-3.webp',
      '/images/products/victorinox-offset-bread-knife/victorinox-offset-bread-knife-4.webp',
      '/images/products/victorinox-offset-bread-knife/victorinox-offset-bread-knife-5.webp',
      '/images/products/victorinox-offset-bread-knife/victorinox-offset-bread-knife-6.webp',
    ]
  },

  'vitamix-5200-professional-blender': {
    gallery: [
      '/images/products/vitamix-5200-professional-blender/vitamix-5200-professional-blender-1.jpg',
    ]
  },

  'winco-heavy-duty-tongs': {
    gallery: [
      '/images/products/winco-heavy-duty-tongs/winco-heavy-duty-tongs-1.webp',
      '/images/products/winco-heavy-duty-tongs/winco-heavy-duty-tongs-2.webp',
      '/images/products/winco-heavy-duty-tongs/winco-heavy-duty-tongs-3.webp',
    ]
  },

  // ============================================
  // 🔄 SLUG ALIASES (review slug → image folder slug)
  // Same product, different naming
  // ============================================

  'henckels-sharpening-steel': {
    gallery: [
      '/images/products/henckels-sharpening-steel/henckels-sharpening-steel-1.webp',
      '/images/products/henckels-sharpening-steel/henckels-sharpening-steel-2.webp',
      '/images/products/henckels-sharpening-steel/henckels-sharpening-steel-3.webp',
      '/images/products/henckels-sharpening-steel/henckels-sharpening-steel-4.webp',
    ]
  },

  // cuisinart-8-inch-nonstick-pan uses cuisinart-egg-pan images
  'cuisinart-8-inch-nonstick-pan': {
    gallery: [
      '/images/products/cuisinart-egg-pan/cuisinart-non-stick-pan-1.webp',
      '/images/products/cuisinart-egg-pan/cuisinart-non-stick-pan-2.webp',
      '/images/products/cuisinart-egg-pan/cuisinart-non-stick-pan-3.webp',
      '/images/products/cuisinart-egg-pan/cuisinart-non-stick-pan-4.webp',
    ]
  },

  // zuperia-bar-mops uses gold-textiles-bar-mops images
  'zuperia-bar-mops': {
    gallery: [
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-1.webp',
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-2.webp',
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-3.webp',
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-4.webp',
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-5.webp',
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-6.webp',
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-7.webp',
      '/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-8.webp',
    ]
  },

  // ============================================
  // 🔴 PRODUCTS WITH NO IMAGES
  // Will use FALLBACK_OG
  // ============================================

  'black-decker-toaster-oven': {},
  'instant-pot-duo-plus-6qt': {},
  'japanese-wooden-spoon-set': {},
  'kitchenaid-ksm8990wh': {},
  'large-metal-hotel-pans': {},
  'large-plastic-hotel-pans': {},
  'ninja-bl660-professional-blender': {},
  'nordic-ware-half-sheet-pan': {},
  'norton-im200-tri-stone-sharpener': {},
  'robot-coupe-r2-dice': {},
  'rubbermaid-commercial-cooks-scraper': {},
  'small-metal-hotel-pans': {},
  'small-plastic-hotel-pans': {},
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the best available OG image for a product
 * Fallback chain: og → hero → first gallery image → FALLBACK_OG
 */
export function getProductOgImage(slug: string): string {
  const product = productImages[slug]
  if (!product) return FALLBACK_OG

  return product.og || product.hero || product.gallery?.[0] || FALLBACK_OG
}

/**
 * Get hero image for a product (or null if none exists)
 */
export function getProductHeroImage(slug: string): string | null {
  const product = productImages[slug]
  return product?.hero || null
}

/**
 * Get all gallery images for a product
 */
export function getProductGallery(slug: string): string[] {
  const product = productImages[slug]
  return product?.gallery || []
}

/**
 * Check if a product has any images
 */
export function productHasImages(slug: string): boolean {
  const product = productImages[slug]
  if (!product) return false
  return !!(product.og || product.hero || (product.gallery && product.gallery.length > 0))
}
