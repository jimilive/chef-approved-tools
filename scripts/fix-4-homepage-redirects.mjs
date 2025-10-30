#!/usr/bin/env node
/**
 * Fix 4 Products That Redirect to Amazon Homepage
 * These all have broken ASINs
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const FIXES = [
  {
    slug: 'vitamix-5200-professional-blender',
    name: 'Vitamix 5200',
    oldUrl: 'https://amzn.to/4e6GceC',
    newUrl: 'https://amzn.to/3WsqZHh'
  },
  {
    slug: 'lodge-seasoned-cast-iron-3-skillet-bundle',
    name: 'Lodge Cast Iron Bundle',
    oldUrl: 'https://amzn.to/3IhHcdl',
    newUrl: 'https://amzn.to/4qwcAaV'
  },
  {
    slug: 'cuisinart-dlc-10c-classic-food-processor',
    name: 'Cuisinart Food Processor',
    oldUrl: 'https://amzn.to/42NmxE',
    newUrl: 'https://amzn.to/4hy7dUi'
  },
  {
    slug: 'black-decker-toaster-oven',
    name: 'Black & Decker Toaster',
    oldUrl: 'https://amzn.to/4gVgENj',
    newUrl: 'https://amzn.to/48QaIDp'
  }
]

console.log('🔧 Fixing 4 Products That Redirect to Homepage\n')

let successCount = 0
let skipCount = 0

for (const fix of FIXES) {
  console.log(`Processing ${fix.name} (${fix.slug})...`)

  if (fix.newUrl === 'NEED_LINK') {
    console.log(`  ⏭️  Skipping - still need correct link\n`)
    skipCount++
    continue
  }

  const affiliateLinks = [{
    url: fix.newUrl,
    merchant: 'amazon',
    tag: 'chefapprovedt-20',
    is_primary: true,
    verified_at: new Date().toISOString(),
    status: 'active'
  }]

  const { error } = await supabase
    .from('products')
    .update({
      affiliate_links: affiliateLinks,
      updated_at: new Date().toISOString()
    })
    .eq('slug', fix.slug)

  if (error) {
    console.error(`  ❌ Error: ${error.message}\n`)
  } else {
    console.log(`  ✅ Updated`)
    console.log(`     Old: ${fix.oldUrl} → HOMEPAGE`)
    console.log(`     New: ${fix.newUrl} → Product Page\n`)
    successCount++
  }
}

console.log(`\n📊 Results:`)
console.log(`  ✅ Fixed: ${successCount}`)
console.log(`  ⏭️  Skipped: ${skipCount}`)

if (skipCount > 0) {
  console.log(`\n⚠️  Still need links for:`)
  FIXES.filter(f => f.newUrl === 'NEED_LINK').forEach(f => {
    console.log(`   - ${f.name}`)
  })
}

console.log('\n✅ Done!\n')
