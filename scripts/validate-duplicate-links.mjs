#!/usr/bin/env node
/**
 * Validates that no two products share the same affiliate link
 * This prevents revenue loss from ambiguous affiliate tracking
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const BOLD = '\x1b[1m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

console.log(`${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║  DUPLICATE AFFILIATE LINK VALIDATION      ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

const { data: products, error } = await supabase
  .from('products')
  .select('slug, name, affiliate_links')

if (error) {
  console.error(`${RED}Error fetching products:${RESET}`, error)
  process.exit(1)
}

// Build a map of affiliate links to products
const linkMap = new Map() // url -> [products]

products.forEach(product => {
  if (product.affiliate_links) {
    product.affiliate_links.forEach(link => {
      if (link.url) {
        if (!linkMap.has(link.url)) {
          linkMap.set(link.url, [])
        }
        linkMap.get(link.url).push({
          slug: product.slug,
          name: product.name,
          merchant: link.merchant
        })
      }
    })
  }
})

// Find duplicates
const duplicates = []
for (const [url, productList] of linkMap) {
  if (productList.length > 1) {
    duplicates.push({ url, products: productList })
  }
}

console.log(`${BOLD}Checking ${linkMap.size} unique affiliate links across ${products.length} products...${RESET}\n`)

if (duplicates.length === 0) {
  console.log(`${GREEN}✓ No duplicate affiliate links found!${RESET}`)
  console.log(`${GREEN}✓ All ${linkMap.size} affiliate links are unique${RESET}\n`)
  process.exit(0)
} else {
  console.log(`${RED}${BOLD}✗ CRITICAL: ${duplicates.length} affiliate link(s) used by multiple products${RESET}\n`)

  duplicates.forEach((dup, index) => {
    console.log(`${RED}${BOLD}Error ${index + 1}:${RESET} ${dup.url}`)
    console.log(`${YELLOW}Used by ${dup.products.length} products:${RESET}`)
    dup.products.forEach(p => {
      console.log(`  - ${p.name} (${p.slug}) [${p.merchant}]`)
    })
    console.log()
  })

  console.log(`${RED}${BOLD}WHY THIS IS CRITICAL:${RESET}`)
  console.log(`${YELLOW}When multiple products share the same affiliate link:${RESET}`)
  console.log(`  1. Amazon can't track which product was actually purchased`)
  console.log(`  2. You lose attribution data and potential revenue`)
  console.log(`  3. Users may be directed to the wrong product`)
  console.log()
  console.log(`${BOLD}FIX: Each product needs its own unique affiliate link from Amazon Associates.${RESET}\n`)

  process.exit(1)
}
