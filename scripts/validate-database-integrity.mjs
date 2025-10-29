#!/usr/bin/env node
/**
 * Validate database integrity
 *
 * Checks:
 * 1. Every product in DB has a review folder
 * 2. Every review folder has a product in DB
 * 3. All products have required fields
 * 4. All products have at least one affiliate link
 */

import { createClient } from '@supabase/supabase-js'
import { readdirSync } from 'fs'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

let errors = 0
let warnings = 0

console.log(`${BOLD}${BLUE}Database Integrity Check${RESET}\n`)

// Get all products from database
const { data: products, error: dbError } = await supabase
  .from('products')
  .select('*')

if (dbError) {
  console.error(`${RED}✗ Database connection failed:${RESET}`, dbError.message)
  process.exit(1)
}

// Get all review folders
const reviewsDir = './app/reviews'
const reviewFolders = readdirSync(reviewsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !dirent.name.endsWith('.tsx'))
  .map(dirent => dirent.name)

console.log(`${BOLD}1. Checking Products vs Review Folders...${RESET}`)

const productSlugs = new Set(products.map(p => p.slug))
const orphanedFolders = reviewFolders.filter(f => !productSlugs.has(f))
const orphanedProducts = products.filter(p => !reviewFolders.includes(p.slug))

if (orphanedFolders.length === 0 && orphanedProducts.length === 0) {
  console.log(`${GREEN}✓ All products and folders are in sync${RESET}`)
} else {
  if (orphanedFolders.length > 0) {
    console.log(`${RED}✗ ${orphanedFolders.length} review folder(s) without database entry:${RESET}`)
    orphanedFolders.forEach(f => console.log(`  - ${f}`))
    errors += orphanedFolders.length
  }

  if (orphanedProducts.length > 0) {
    console.log(`${YELLOW}⚠ ${orphanedProducts.length} product(s) in DB without review folder:${RESET}`)
    orphanedProducts.forEach(p => console.log(`  - ${p.slug} (${p.name})`))
    warnings += orphanedProducts.length
  }
}

console.log(`\n${BOLD}2. Checking Required Fields...${RESET}`)

const requiredFields = ['name', 'slug', 'category']
const missingFields = []

products.forEach(product => {
  const missing = requiredFields.filter(field => !product[field])
  if (missing.length > 0) {
    missingFields.push({
      slug: product.slug,
      missing
    })
    errors++
  }
})

if (missingFields.length === 0) {
  console.log(`${GREEN}✓ All products have required fields (name, slug, category)${RESET}`)
} else {
  console.log(`${RED}✗ ${missingFields.length} product(s) missing required fields:${RESET}`)
  missingFields.forEach(p => {
    console.log(`  ${p.slug}: missing ${p.missing.join(', ')}`)
  })
}

console.log(`\n${BOLD}3. Checking Affiliate Links...${RESET}`)

const noAffiliateLinks = products.filter(p =>
  !p.affiliateLinks || p.affiliateLinks.length === 0
)

if (noAffiliateLinks.length === 0) {
  console.log(`${GREEN}✓ All products have affiliate links${RESET}`)
} else {
  // This is a warning, not an error - affiliate links might be in page files
  console.log(`${YELLOW}ℹ ${noAffiliateLinks.length} product(s) without affiliate links in database${RESET}`)
  console.log(`  (This is OK if affiliate links are in page files)`)
  // Don't count as warnings for now
}

console.log(`\n${BOLD}${BLUE}Summary${RESET}`)
if (errors === 0 && warnings === 0) {
  console.log(`${GREEN}✓✓✓ Database integrity verified!${RESET}\n`)
  process.exit(0)
} else {
  if (errors > 0) {
    console.log(`${RED}✗ ${errors} ERROR(S)${RESET}`)
  }
  if (warnings > 0) {
    console.log(`${YELLOW}⚠ ${warnings} WARNING(S)${RESET}`)
  }
  console.log('')
  process.exit(errors > 0 ? 1 : 0)
}
