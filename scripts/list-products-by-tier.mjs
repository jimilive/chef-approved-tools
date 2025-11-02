#!/usr/bin/env node
/**
 * List Tier 1 and Tier 2 Products (Without Broken Links)
 */

import { createClient } from '@supabase/supabase-js'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('📊 Finding Tier 1 & 2 Products with Working Links\n')

// Get all products from Supabase with affiliate links
const { data: products } = await supabase
  .from('products')
  .select('slug, name, affiliate_links')
  .order('name')

// Filter products that have Amazon affiliate links
const productsWithLinks = new Set(
  products
    ?.filter(p => p.affiliate_links && p.affiliate_links.length > 0)
    ?.filter(p => p.affiliate_links.some(l => l.merchant === 'amazon'))
    ?.map(p => p.slug)
)

// Read tier info from review data files
const reviewsDir = 'app/reviews'
const reviewFolders = readdirSync(reviewsDir)

const tier1Products = []
const tier2Products = []
const tier3Products = []
const unknownProducts = []

for (const folder of reviewFolders) {
  try {
    // Read page.tsx file where tier info is stored
    const pagePath = join(reviewsDir, folder, 'page.tsx')

    if (!require('fs').existsSync(pagePath)) {
      continue
    }

    const dataFile = readFileSync(pagePath, 'utf-8')

    // Extract tier from metadata
    const tierMatch = dataFile.match(/tier:\s*(\d+)/)
    if (tierMatch) {
      const tier = parseInt(tierMatch[1])
      const product = products?.find(p => p.slug === folder)
      const name = product?.name || folder
      const hasLinks = productsWithLinks.has(folder)

      if (tier === 1) {
        tier1Products.push({ slug: folder, name, hasLinks })
      } else if (tier === 2) {
        tier2Products.push({ slug: folder, name, hasLinks })
      } else if (tier === 3) {
        tier3Products.push({ slug: folder, name, hasLinks })
      }
    } else {
      const product = products?.find(p => p.slug === folder)
      const name = product?.name || folder
      const hasLinks = productsWithLinks.has(folder)
      unknownProducts.push({ slug: folder, name, hasLinks })
    }
  } catch (error) {
    // Skip if can't read file
  }
}

// Filter only products WITH working links for HARO
const tier1WithLinks = tier1Products.filter(p => p.hasLinks)
const tier2WithLinks = tier2Products.filter(p => p.hasLinks)

console.log('🏆 TIER 1 PRODUCTS WITH WORKING LINKS:')
console.log('=' .repeat(60))
if (tier1WithLinks.length > 0) {
  tier1WithLinks.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`)
    console.log(`   URL: https://www.chefapprovedtools.com/reviews/${p.slug}`)
    console.log()
  })
} else {
  console.log('No Tier 1 products with working links\n')
}

console.log('\n🥈 TIER 2 PRODUCTS WITH WORKING LINKS:')
console.log('=' .repeat(60))
if (tier2WithLinks.length > 0) {
  tier2WithLinks.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`)
    console.log(`   URL: https://www.chefapprovedtools.com/reviews/${p.slug}`)
    console.log()
  })
} else {
  console.log('No Tier 2 products with working links\n')
}

console.log('\n🔴 TIER 1 PRODUCTS WITHOUT LINKS (Need fixing):')
console.log('=' .repeat(60))
const tier1NoLinks = tier1Products.filter(p => !p.hasLinks)
if (tier1NoLinks.length > 0) {
  tier1NoLinks.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (${p.slug})`)
  })
  console.log()
} else {
  console.log('All Tier 1 products have working links!\n')
}

console.log('\n🔴 TIER 2 PRODUCTS WITHOUT LINKS (Need fixing):')
console.log('=' .repeat(60))
const tier2NoLinks = tier2Products.filter(p => !p.hasLinks)
if (tier2NoLinks.length > 0) {
  tier2NoLinks.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (${p.slug})`)
  })
  console.log()
} else {
  console.log('All Tier 2 products have working links!\n')
}

console.log('\n🥉 TIER 3 PRODUCTS (Basic Reviews):')
console.log('=' .repeat(60))
if (tier3Products.length > 0) {
  tier3Products.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`)
    console.log(`   Slug: ${p.slug}`)
    console.log()
  })
} else {
  console.log('No Tier 3 products found\n')
}

if (unknownProducts.length > 0) {
  console.log('\n❓ PRODUCTS WITHOUT TIER INFO:')
  console.log('=' .repeat(60))
  unknownProducts.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (${p.slug})`)
  })
  console.log()
}

console.log('\n📈 SUMMARY FOR HARO:')
console.log('=' .repeat(60))
console.log(`✅ Tier 1 with working links: ${tier1WithLinks.length}`)
console.log(`✅ Tier 2 with working links: ${tier2WithLinks.length}`)
console.log(`❌ Tier 1 without links: ${tier1NoLinks.length}`)
console.log(`❌ Tier 2 without links: ${tier2NoLinks.length}`)
console.log()
console.log(`📊 Total Tier 1 + 2 products ready for HARO: ${tier1WithLinks.length + tier2WithLinks.length}`)
console.log()
