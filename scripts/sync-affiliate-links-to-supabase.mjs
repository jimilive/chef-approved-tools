#!/usr/bin/env node
/**
 * Sync Affiliate Links to Supabase
 *
 * This script extracts affiliate links from review pages and syncs them to Supabase.
 * Run this after adding new review pages or updating affiliate links.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Products to check/sync
const PRODUCTS_TO_SYNC = [
  {
    slug: 'benriner-large-mandoline',
    name: 'Benriner Large Mandoline',
    brand: 'Benriner',
    category: 'Kitchen Equipment',
    affiliateLinks: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3DkW8jO', // Large
        isPrimary: true
      },
      {
        merchant: 'amazon',
        url: 'https://amzn.to/4hG8jO6', // Original/Medium
        isPrimary: false
      }
    ]
  },
  {
    slug: 'vitamix-5200-professional-blender',
    name: 'Vitamix 5200 Professional Blender',
    brand: 'Vitamix',
    category: 'Appliances',
    affiliateLinks: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3Vv8jO6', // Replace with actual URL from page
        isPrimary: true
      },
      {
        merchant: 'vitamix',
        url: 'https://www.anrdoezrs.net/links/101557027/type/dlg/sid/7745121/https://www.vitamix.com/us/en_us/products/5200-standard-getting-started',
        isPrimary: false
      }
    ]
  }
]

async function syncProducts() {
  console.log('🔄 Syncing affiliate links to Supabase...\n')

  for (const product of PRODUCTS_TO_SYNC) {
    console.log(`Checking ${product.slug}...`)

    // Check if product exists
    const { data: existing, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', product.slug)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error(`  ❌ Error fetching ${product.slug}:`, fetchError)
      continue
    }

    if (existing) {
      // Update existing product
      console.log(`  ✏️  Product exists, updating affiliate_links...`)

      const { error: updateError } = await supabase
        .from('products')
        .update({
          affiliate_links: product.affiliateLinks,
          updated_at: new Date().toISOString()
        })
        .eq('slug', product.slug)

      if (updateError) {
        console.error(`  ❌ Error updating ${product.slug}:`, updateError)
      } else {
        console.log(`  ✅ Updated ${product.slug} with ${product.affiliateLinks.length} affiliate link(s)`)
      }
    } else {
      // Insert new product
      console.log(`  ➕ Product doesn't exist, creating...`)

      const { error: insertError } = await supabase
        .from('products')
        .insert({
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          category: product.category,
          affiliate_links: product.affiliateLinks,
          in_stock: true,
          expert_rating: 4.5, // Default, update as needed
          pros: [],
          cons: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (insertError) {
        console.error(`  ❌ Error inserting ${product.slug}:`, insertError)
      } else {
        console.log(`  ✅ Created ${product.slug} with ${product.affiliateLinks.length} affiliate link(s)`)
      }
    }
  }

  // Verify total count
  console.log('\n📊 Verifying total affiliate link count...')
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

  console.log(`\n✅ Total Amazon affiliate links in Supabase: ${totalLinks}`)
  console.log(`   (This is what the link checker will see tomorrow)\n`)
}

syncProducts().catch(console.error)
