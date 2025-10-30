#!/usr/bin/env node
/**
 * Fix All Broken Affiliate Links
 * Based on October 29, 2025 audit
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Products that need fixing
const FIXES = [
  // CRITICAL: Add Benriner links (currently has none!)
  {
    slug: 'benriner-large-mandoline',
    action: 'add_links',
    note: 'Currently has NO affiliate links - page shows #',
    links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/47NKzE8', // Large
        isPrimary: true
      },
      {
        merchant: 'amazon',
        url: 'https://amzn.to/4hG8jO6', // Original/Medium
        isPrimary: false
      }
    ]
  },

  // Goes to Amazon Homepage (Broken ASIN)
  {
    slug: 'vitamix-5200-professional-blender',
    action: 'update_link',
    note: 'Goes to Amazon homepage',
    links: [
      {
        merchant: 'amazon',
        url: 'NEED_CORRECT_LINK', // TODO: Get correct Vitamix link
        isPrimary: true
      }
    ]
  },
  {
    slug: 'lodge-seasoned-cast-iron-3-skillet-bundle',
    action: 'update_link',
    note: 'Goes to Amazon homepage',
    links: [
      {
        merchant: 'amazon',
        url: 'NEED_CORRECT_LINK', // TODO: Get correct Lodge link
        isPrimary: true
      }
    ]
  },
  {
    slug: 'cuisinart-dlc-10c-classic-food-processor',
    action: 'update_link',
    note: 'Goes to Amazon homepage',
    links: [
      {
        merchant: 'amazon',
        url: 'NEED_CORRECT_LINK', // TODO: Get correct Cuisinart link
        isPrimary: true
      }
    ]
  },
  {
    slug: 'victorinox-offset-bread-knife',
    action: 'update_link',
    note: 'Goes to Amazon homepage',
    links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/47NKm3O',
        isPrimary: true
      }
    ]
  },

  // Wrong Product Link - ALREADY FIXED
  {
    slug: 'diamond-crystal-kosher-salt',
    action: 'already_fixed',
    note: 'Already fixed to https://amzn.to/4hEzEA6'
  },
  {
    slug: 'black-decker-toaster-oven',
    action: 'update_link',
    note: 'Links to Robot Coupe (wrong product)',
    links: [
      {
        merchant: 'amazon',
        url: 'NEED_CORRECT_LINK', // TODO: Get correct toaster oven link
        isPrimary: true
      }
    ]
  },

  // Self-Referential (these need affiliate links added to Supabase)
  {
    slug: 'cuisinart-8-inch-nonstick-pan',
    action: 'add_links',
    note: 'Links to itself - needs affiliate link',
    links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/432IOjM',
        isPrimary: true
      }
    ]
  },
  {
    slug: 'norton-im200-tri-stone-sharpener',
    action: 'add_links',
    note: 'Links to itself - needs affiliate link',
    links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/4ob467f',
        isPrimary: true
      }
    ]
  },
  {
    slug: 'bodum-chambord-french-press',
    action: 'add_links',
    note: 'Links to itself - needs affiliate link',
    links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3JbiwoV',
        isPrimary: true
      }
    ]
  },
  {
    slug: 'method-all-purpose-cleaner',
    action: 'add_links',
    note: 'Links to itself - needs affiliate link',
    links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3WYNCTQ',
        isPrimary: true
      }
    ]
  },
  {
    slug: 'zuperia-bar-mops',
    action: 'add_links',
    note: 'Links to itself - needs affiliate link',
    links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3JwX8dP',
        isPrimary: true
      }
    ]
  }
]

console.log('🔧 Fixing All Broken Affiliate Links\n')
console.log(`Found ${FIXES.length} products to fix\n`)

// First, let's check current state
console.log('📊 Current State Check:\n')
for (const fix of FIXES) {
  const { data } = await supabase
    .from('products')
    .select('slug, name, affiliate_links')
    .eq('slug', fix.slug)
    .single()

  if (data) {
    const amazonLinks = data.affiliate_links?.filter(l => l.merchant === 'amazon') || []
    console.log(`  ${fix.slug}:`)
    console.log(`    Current: ${amazonLinks.length} Amazon link(s)`)
    console.log(`    Action needed: ${fix.action}`)
    console.log(`    Note: ${fix.note}`)
    if (amazonLinks.length > 0) {
      amazonLinks.forEach((link, i) => {
        console.log(`      ${i + 1}. ${link.url}`)
      })
    }
  } else {
    console.log(`  ❌ ${fix.slug} - NOT FOUND IN SUPABASE`)
  }
  console.log()
}

// Now apply fixes
console.log('\n🔨 Applying Fixes:\n')

for (const fix of FIXES) {
  if (fix.action === 'already_fixed') {
    console.log(`  ✅ ${fix.slug} - already fixed, skipping`)
    continue
  }

  if (fix.links.some(link => link.url.includes('NEED_CORRECT_LINK'))) {
    console.log(`  ⏭️  ${fix.slug} - still needs correct link, skipping`)
    continue
  }

  const { error } = await supabase
    .from('products')
    .update({
      affiliate_links: fix.links,
      updated_at: new Date().toISOString()
    })
    .eq('slug', fix.slug)

  if (error) {
    console.error(`  ❌ ${fix.slug} - Error: ${error.message}`)
  } else {
    console.log(`  ✅ ${fix.slug} - Updated with ${fix.links.length} link(s)`)
  }
}

// Final count
console.log('\n📊 Final Check:\n')
const { data: allProducts } = await supabase
  .from('products')
  .select('slug, affiliate_links')

let totalLinks = 0
allProducts?.forEach(p => {
  if (p.affiliate_links) {
    const amazonLinks = p.affiliate_links.filter(l => l.merchant === 'amazon')
    totalLinks += amazonLinks.length
  }
})

console.log(`✅ Total Amazon affiliate links in Supabase: ${totalLinks}`)
console.log(`   (This is what the link checker will see tomorrow)\n`)

console.log('⚠️  Still Need Links For:')
const stillNeed = FIXES.filter(f => f.links?.some(l => l.url.includes('NEED_CORRECT_LINK')))
if (stillNeed.length > 0) {
  stillNeed.forEach(f => {
    console.log(`   - ${f.slug}`)
  })
} else {
  console.log('   None! All links are ready.\n')
}
