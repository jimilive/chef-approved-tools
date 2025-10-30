#!/usr/bin/env node
/**
 * Check what products are in Supabase (READ ONLY)
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function checkProducts() {
  console.log('📊 Checking Supabase products table...\n')

  // Get all products
  const { data: allProducts, error } = await supabase
    .from('products')
    .select('slug, name, affiliate_links')

  if (error) {
    console.error('❌ Error fetching products:', error)
    return
  }

  console.log(`Found ${allProducts.length} total products in Supabase\n`)

  // Check specific products
  const checkSlugs = [
    'benriner-large-mandoline',
    'vitamix-5200-professional-blender',
    'vitamix-5200'
  ]

  console.log('Checking specific products:')
  for (const slug of checkSlugs) {
    const product = allProducts.find(p => p.slug === slug)
    if (product) {
      const amazonLinks = product.affiliate_links?.filter(l => l.merchant === 'amazon') || []
      console.log(`  ✅ ${slug}`)
      console.log(`     Amazon links: ${amazonLinks.length}`)
      if (amazonLinks.length > 0) {
        amazonLinks.forEach((link, i) => {
          console.log(`       ${i + 1}. ${link.url}`)
        })
      }
    } else {
      console.log(`  ❌ ${slug} - NOT FOUND IN SUPABASE`)
    }
  }

  // Count total Amazon links
  let totalAmazonLinks = 0
  allProducts.forEach(p => {
    if (p.affiliate_links) {
      const amazonLinks = p.affiliate_links.filter(l => l.merchant === 'amazon')
      totalAmazonLinks += amazonLinks.length
    }
  })

  console.log(`\n📈 Total Amazon affiliate links: ${totalAmazonLinks}`)
  console.log('   (This is what the link checker sees)\n')

  // Show all products with Amazon links
  console.log('All products with Amazon links:')
  allProducts.forEach(p => {
    if (p.affiliate_links) {
      const amazonLinks = p.affiliate_links.filter(l => l.merchant === 'amazon')
      if (amazonLinks.length > 0) {
        console.log(`  • ${p.slug} (${amazonLinks.length} link${amazonLinks.length > 1 ? 's' : ''})`)
      }
    }
  })
}

checkProducts().catch(console.error)
