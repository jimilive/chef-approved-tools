#!/usr/bin/env node
/**
 * Add a competitor product to Supabase for comparison tables
 *
 * Usage:
 *   node scripts/add-competitor-product.mjs <slug> <name> <brand> <affiliateUrl> [category] [merchant]
 *
 * Examples:
 *   node scripts/add-competitor-product.mjs ninja-foodi-11-in-1-pro "Ninja Foodi 11-in-1 Pro 6.5 Qt" "Ninja" "https://amzn.to/xxxxx"
 *   node scripts/add-competitor-product.mjs breville-fast-slow-pro "Breville Fast Slow Pro 6 Qt" "Breville" "https://amzn.to/xxxxx" "appliances" "amazon"
 *
 * Or run without args for interactive mode (prompts for each field)
 */

import 'dotenv/config'
import readline from 'readline'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function addProduct({ slug, name, brand, affiliateUrl, category = 'appliances', merchant = 'amazon' }) {
  console.log(`\nAdding product: ${slug}`)
  console.log(`  Name: ${name}`)
  console.log(`  Brand: ${brand}`)
  console.log(`  URL: ${affiliateUrl}`)
  console.log(`  Category: ${category}`)
  console.log(`  Merchant: ${merchant}`)

  try {
    const response = await fetch(`${BASE_URL}/api/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, name, brand, affiliateUrl, category, merchant })
    })

    const result = await response.json()

    if (result.success) {
      console.log(`\n✅ ${result.message}`)
      return true
    } else {
      console.error(`\n❌ Error: ${result.error}`)
      return false
    }
  } catch (error) {
    console.error(`\n❌ Failed to connect: ${error.message}`)
    console.log('Make sure the dev server is running: npm run dev')
    return false
  }
}

// Interactive mode using readline
async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve))

  console.log('\n🛒 Add Competitor Product to Supabase\n')
  console.log('Enter product details (or Ctrl+C to cancel):\n')

  const slug = await question('Slug (e.g., ninja-foodi-11-in-1-pro): ')
  const name = await question('Full Name (e.g., Ninja Foodi 11-in-1 Pro 6.5 Qt): ')
  const brand = await question('Brand (e.g., Ninja): ')
  const affiliateUrl = await question('Affiliate URL: ')
  const category = await question('Category [appliances]: ') || 'appliances'
  const merchant = await question('Merchant [amazon]: ') || 'amazon'

  rl.close()

  await addProduct({ slug, name, brand, affiliateUrl, category, merchant })
}

// Main
const args = process.argv.slice(2)

if (args.length === 0) {
  // Interactive mode
  interactiveMode()
} else if (args.length >= 4) {
  // Command line mode
  const [slug, name, brand, affiliateUrl, category, merchant] = args
  addProduct({ slug, name, brand, affiliateUrl, category, merchant })
} else {
  console.log(`
Usage:
  node scripts/add-competitor-product.mjs <slug> <name> <brand> <affiliateUrl> [category] [merchant]

Or run without arguments for interactive mode.

Examples:
  node scripts/add-competitor-product.mjs ninja-foodi-11-in-1-pro "Ninja Foodi 11-in-1 Pro 6.5 Qt" "Ninja" "https://amzn.to/xxxxx"
  `)
}
