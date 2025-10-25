#!/usr/bin/env tsx
/**
 * Extract product data from page.tsx files and insert into Supabase
 * This fixes the issue where we converted pages to fetch from Supabase
 * but never populated the database with the actual product data.
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Product directories to process
const productSlugs = [
  'benriner-large-mandoline',
  'black-decker-toaster-oven',
  'bodum-chambord-french-press',
  'cuisinart-8-inch-nonstick-pan',
  'cuisinart-dlc-10c-classic-food-processor',
  'diamond-crystal-kosher-salt',
  'epicurean-kitchen-cutting-board',
  'john-boos-platinum-commercial-cutting-board',
  'kitchenaid-kp26m1xlc-professional-600',
  'kitchenaid-ksm8990wh',
  'le-creuset-signature-7-25-qt-dutch-oven',
  'lodge-seasoned-cast-iron-3-skillet-bundle',
  'method-all-purpose-cleaner',
  'nordic-ware-half-sheet-pan',
  'norton-im200-tri-stone-sharpener',
  'oxo-good-grips-bench-scraper',
  'oxo-good-grips-swivel-peeler',
  'robot-coupe-r2-dice',
  'rubbermaid-commercial-cooks-scraper',
  'winco-heavy-duty-tongs',
  'wusthof-classic-ikon-16-piece',
  'zuperia-bar-mops',
]

// Category mapping based on product names/types
function inferCategory(slug: string, name: string): string {
  if (slug.includes('knife') || slug.includes('wusthof')) return 'Knives'
  if (slug.includes('pan') || slug.includes('pot') || slug.includes('cookware') ||
      slug.includes('dutch-oven') || slug.includes('skillet') || slug.includes('clad')) return 'Cookware'
  if (slug.includes('mixer') || slug.includes('processor') || slug.includes('blender') ||
      slug.includes('toaster')) return 'Appliances'
  if (slug.includes('board') || slug.includes('scraper') || slug.includes('peeler') ||
      slug.includes('tongs') || slug.includes('mandoline') || slug.includes('sharpener')) return 'Tools & Accessories'
  if (slug.includes('salt') || slug.includes('cleaner') || slug.includes('mop')) return 'Pantry & Cleaning'

  return 'Tools & Accessories' // default
}

// Extract legacyProductData from a file
function extractProductData(filePath: string): any | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')

    // Extract legacyProductData object
    const match = content.match(/const legacyProductData = \{[\s\S]*?\n\}/m)
    if (!match) {
      console.warn(`  ⚠️  No legacyProductData found`)
      return null
    }

    const dataBlock = match[0]

    // Extract key fields using regex
    const name = dataBlock.match(/name:\s*["']([^"']+)["']/)?.[1]
    const slug = dataBlock.match(/slug:\s*["']([^"']+)["']/)?.[1]
    const brand = dataBlock.match(/brand:\s*["']([^"']+)["']/)?.[1]
    const model = dataBlock.match(/model:\s*["']([^"']+)["']/)?.[1]
    const rating = parseFloat(dataBlock.match(/rating:\s*([\d.]+)/)?.[1] || '0')
    const expertRating = parseFloat(dataBlock.match(/expertRating:\s*([\d.]+)/)?.[1] || rating.toString())
    const reviewCount = parseInt(dataBlock.match(/reviewCount:\s*(\d+)/)?.[1] || '0')
    const category = dataBlock.match(/category:\s*["']([^"']+)["']/)?.[1]
    const inStock = dataBlock.match(/inStock:\s*(true|false)/)?.[1] === 'true'

    // Extract expertOpinion
    const expertOpinionMatch = dataBlock.match(/expertOpinion:\s*["']([^"']+)["']/)?.[1] ||
      dataBlock.match(/expertOpinion:\s*"([^"]+)"/s)?.[1]

    // Extract pros array
    const prosMatch = dataBlock.match(/pros:\s*\[([\s\S]*?)\]/)?.[1]
    const pros = prosMatch ?
      prosMatch.match(/["']([^"']+)["']/g)?.map(s => s.replace(/["']/g, '')) || [] :
      []

    // Extract cons array
    const consMatch = dataBlock.match(/cons:\s*\[([\s\S]*?)\]/)?.[1]
    const cons = consMatch ?
      consMatch.match(/["']([^"']+)["']/g)?.map(s => s.replace(/["']/g, '')) || [] :
      []

    // Extract affiliate links
    const affiliateLinksMatch = dataBlock.match(/affiliateLinks:\s*\[([\s\S]*?)\]/)?.[1]
    const affiliateLinks = []
    if (affiliateLinksMatch) {
      const linkMatches = affiliateLinksMatch.matchAll(/\{[\s\S]*?retailer:\s*["']([^"']+)["'][\s\S]*?url:\s*["']([^"']+)["']/g)
      for (const match of linkMatches) {
        affiliateLinks.push({
          retailer: match[1],
          url: match[2]
        })
      }
    }

    return {
      name,
      slug,
      brand,
      model,
      rating,
      expertRating,
      reviewCount,
      category,
      inStock,
      expertOpinion: expertOpinionMatch,
      pros,
      cons,
      affiliateLinks
    }
  } catch (error) {
    console.error(`  ❌ Error parsing file:`, error)
    return null
  }
}

async function migrateProducts() {
  console.log('🚀 Starting product migration to Supabase...\n')

  let successCount = 0
  let errorCount = 0
  let skippedCount = 0

  for (const slug of productSlugs) {
    console.log(`📦 Processing: ${slug}`)

    // Check if already exists
    const { data: existing } = await supabase
      .from('products')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (existing) {
      console.log(`  ⏭️  Already exists, skipping`)
      skippedCount++
      continue
    }

    // Read the page.tsx file
    const filePath = path.join(process.cwd(), 'app', 'reviews', slug, 'page.tsx')

    if (!fs.existsSync(filePath)) {
      console.log(`  ❌ File not found: ${filePath}`)
      errorCount++
      continue
    }

    const productData = extractProductData(filePath)
    if (!productData || !productData.name) {
      console.log(`  ❌ Could not extract product data`)
      errorCount++
      continue
    }

    // Map to database schema
    const dbProduct = {
      slug: slug,
      name: productData.name,
      brand: productData.brand || '',
      model: productData.model || '',
      category: inferCategory(slug, productData.name),
      subcategory: productData.category || '',
      in_stock: productData.inStock ?? true,
      availability: 'in-stock',
      affiliate_links: (productData.affiliateLinks || []).map((link: any) => ({
        merchant: link.retailer.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
        url: link.url,
        price: null
      })),
      primary_affiliate: 'amazon',
      reviews: {
        rating: productData.rating || 0,
        count: productData.reviewCount || 0,
        verified: false,
        source: 'amazon',
        lastUpdated: new Date().toISOString()
      },
      expert_rating: productData.expertRating || productData.rating || 0,
      pros: productData.pros || [],
      cons: productData.cons || [],
      description: '',
      expert_opinion: productData.expertOpinion || '',
      usage_scenarios: [],
      alternatives: [],
      images: {
        primary: '/logo.png',
        alt: productData.name
      }
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('products')
      .insert(dbProduct)

    if (error) {
      console.log(`  ❌ Error inserting: ${error.message}`)
      console.log(`  Data:`, JSON.stringify(dbProduct, null, 2))
      errorCount++
    } else {
      console.log(`  ✅ Inserted successfully`)
      successCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Migration Summary:')
  console.log(`  ✅ Success: ${successCount}`)
  console.log(`  ❌ Errors: ${errorCount}`)
  console.log(`  ⏭️  Skipped: ${skippedCount}`)
  console.log('='.repeat(50))
}

migrateProducts().catch(console.error)
