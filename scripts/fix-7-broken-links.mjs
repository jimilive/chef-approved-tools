#!/usr/bin/env node
/**
 * Fix 7 Broken Affiliate Links
 * Critical fixes for products with broken/missing links
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const FIXES = [
  {
    slug: 'victorinox-fibrox-10-inch-chefs-knife',
    name: 'Victorinox 10" Knife',
    url: 'https://amzn.to/47NKm3O'
  },
  {
    slug: 'benriner-large-mandoline',
    name: 'Benriner Mandoline',
    url: 'https://amzn.to/47NKzE8'
  },
  {
    slug: 'bodum-chambord-french-press',
    name: 'Bodum French Press',
    url: 'https://amzn.to/3JbiwoV'
  },
  {
    slug: 'cuisinart-8-inch-nonstick-pan',
    name: 'Cuisinart 8" Pan',
    url: 'https://amzn.to/432IOjM'
  },
  {
    slug: 'method-all-purpose-cleaner',
    name: 'Method Cleaner',
    url: 'https://amzn.to/3WYNCTQ'
  },
  {
    slug: 'norton-im200-tri-stone-sharpener',
    name: 'Norton Sharpener',
    url: 'https://amzn.to/4ob467f'
  },
  {
    slug: 'zuperia-bar-mops',
    name: 'Zuperia Bar Mops',
    url: 'https://amzn.to/3JwX8dP'
  }
]

console.log('🔧 Fixing 7 Broken Affiliate Links\n')

let successCount = 0
let errorCount = 0

for (const fix of FIXES) {
  console.log(`Updating ${fix.name} (${fix.slug})...`)

  const affiliateLinks = [{
    url: fix.url,
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
    console.error(`  ❌ Error: ${error.message}`)
    errorCount++
  } else {
    console.log(`  ✅ Updated with ${fix.url}`)
    successCount++
  }
}

console.log(`\n📊 Results:`)
console.log(`  ✅ Success: ${successCount}`)
console.log(`  ❌ Errors: ${errorCount}`)

// Verify the fixes
console.log('\n🔍 Verifying fixes...\n')

for (const fix of FIXES) {
  const { data } = await supabase
    .from('products')
    .select('slug, affiliate_links')
    .eq('slug', fix.slug)
    .single()

  if (data?.affiliate_links && data.affiliate_links.length > 0) {
    const amazonLink = data.affiliate_links.find(l => l.merchant === 'amazon')
    if (amazonLink) {
      console.log(`  ✅ ${fix.slug}: ${amazonLink.url}`)
    } else {
      console.log(`  ⚠️  ${fix.slug}: Has links but no Amazon link`)
    }
  } else {
    console.log(`  ❌ ${fix.slug}: No affiliate links found!`)
  }
}

console.log('\n✅ Done!\n')
