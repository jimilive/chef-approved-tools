#!/usr/bin/env node
/**
 * HARO Products List - Tier 1 & 2 with Working Links
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Master editorial metadata from /app/reviews/page.tsx
const TIER_1_PRODUCTS = [
  'kitchenaid-ksm8990wh',
  'vitamix-5200-professional-blender',
  'robot-coupe-r2-dice',
  'victorinox-fibrox-8-inch-chefs-knife',
  'wusthof-classic-ikon-16-piece',
  'victorinox-fibrox-10-inch-chefs-knife',
  'diamond-crystal-kosher-salt',
  'norton-im200-tri-stone-sharpener',
  'bodum-chambord-french-press',
  'rubbermaid-commercial-cooks-scraper',
  'victorinox-offset-bread-knife',
  'benriner-large-mandoline',
  'oxo-good-grips-bench-scraper',
  'oxo-good-grips-swivel-peeler',
  'victorinox-4-inch-paring-knife',
  'victorinox-granton-edge-boning-knife',
  'small-plastic-hotel-pans',
  'small-metal-hotel-pans',
  'large-plastic-hotel-pans',
  'large-metal-hotel-pans'
]

const TIER_2_PRODUCTS = [
  'le-creuset-signature-7-25-qt-dutch-oven',
  'john-boos-platinum-commercial-cutting-board',
  'lodge-seasoned-cast-iron-3-skillet-bundle',
  'kitchenaid-kp26m1xlc-professional-600',
  'cuisinart-8-inch-nonstick-pan',
  'nordic-ware-half-sheet-pan',
  'cuisinart-dlc-10c-classic-food-processor',
  'method-all-purpose-cleaner',
  'black-decker-toaster-oven',
  'epicurean-kitchen-cutting-board',
  'japanese-wooden-spoon-set'
]

console.log('📊 HARO Products List - Tier 1 & 2 with Working Links\n')

// Get all products from Supabase
const { data: products } = await supabase
  .from('products')
  .select('slug, name, affiliate_links')

// Create lookup
const productMap = {}
products?.forEach(p => {
  productMap[p.slug] = p
})

// Check which have working Amazon affiliate links
function hasWorkingLinks(slug) {
  const product = productMap[slug]
  if (!product || !product.affiliate_links) return false
  return product.affiliate_links.some(l => l.merchant === 'amazon' && l.url)
}

const tier1WithLinks = TIER_1_PRODUCTS.filter(hasWorkingLinks)
const tier2WithLinks = TIER_2_PRODUCTS.filter(hasWorkingLinks)
const tier1NoLinks = TIER_1_PRODUCTS.filter(slug => !hasWorkingLinks(slug))
const tier2NoLinks = TIER_2_PRODUCTS.filter(slug => !hasWorkingLinks(slug))

console.log('🏆 TIER 1 PRODUCTS WITH WORKING LINKS (For HARO):')
console.log('=' .repeat(70))
tier1WithLinks.forEach((slug, i) => {
  const product = productMap[slug]
  console.log(`${i + 1}. ${product.name}`)
  console.log(`   https://www.chefapprovedtools.com/reviews/${slug}`)
  console.log()
})

console.log('\n🥈 TIER 2 PRODUCTS WITH WORKING LINKS (For HARO):')
console.log('=' .repeat(70))
tier2WithLinks.forEach((slug, i) => {
  const product = productMap[slug]
  console.log(`${i + 1}. ${product.name}`)
  console.log(`   https://www.chefapprovedtools.com/reviews/${slug}`)
  console.log()
})

console.log('\n🔴 TIER 1 PRODUCTS WITHOUT LINKS:')
console.log('=' .repeat(70))
if (tier1NoLinks.length > 0) {
  tier1NoLinks.forEach((slug, i) => {
    const product = productMap[slug]
    console.log(`${i + 1}. ${product?.name || slug}`)
  })
} else {
  console.log('✅ All Tier 1 products have working links!')
}

console.log('\n🔴 TIER 2 PRODUCTS WITHOUT LINKS:')
console.log('=' .repeat(70))
if (tier2NoLinks.length > 0) {
  tier2NoLinks.forEach((slug, i) => {
    const product = productMap[slug]
    console.log(`${i + 1}. ${product?.name || slug}`)
  })
} else {
  console.log('✅ All Tier 2 products have working links!')
}

console.log('\n📈 HARO SUMMARY:')
console.log('=' .repeat(70))
console.log(`✅ Tier 1 products ready: ${tier1WithLinks.length} of ${TIER_1_PRODUCTS.length}`)
console.log(`✅ Tier 2 products ready: ${tier2WithLinks.length} of ${TIER_2_PRODUCTS.length}`)
console.log(`📊 Total products for HARO: ${tier1WithLinks.length + tier2WithLinks.length}`)
console.log()
