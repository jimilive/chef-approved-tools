/**
 * One-time migration script to move products from /data/products.ts to Supabase
 *
 * Usage: npx tsx scripts/migrate-products-to-supabase.ts
 */

// Load environment variables from .env.local
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'
import { sampleProducts } from '../data/products'

// Create Supabase client with loaded env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.error('   Needed: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Use service role key to bypass RLS for migration
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrateProducts() {
  console.log('🚀 Starting product migration to Supabase...\n')

  // Combine all products from all categories
  const allProducts = [
    ...sampleProducts.knives,
    ...sampleProducts.cookware,
    ...sampleProducts.appliances,
    ...sampleProducts.tools,
    ...sampleProducts.baking,
    ...sampleProducts.storage
  ]

  console.log(`📦 Found ${allProducts.length} products to migrate\n`)

  let successCount = 0
  let errorCount = 0

  for (const product of allProducts) {
    try {
      // Map the product data to match Supabase schema
      const productData = {
        slug: product.slug,
        name: product.name,
        brand: product.brand || null,
        model: product.model || null,
        category: product.category,
        subcategory: product.subcategory || null,
        in_stock: product.inStock ?? true,
        availability: product.availability || null,
        affiliate_links: product.affiliateLinks || [],
        vendors: product.vendors || [],
        primary_affiliate: product.primaryAffiliate || 'amazon',
        reviews: product.reviews || null,
        expert_rating: product.expertRating || null,
        pros: product.pros || [],
        cons: product.cons || [],
        description: product.description || null,
        expert_opinion: product.expertOpinion || null,
        usage_scenarios: product.usageScenarios || [],
        alternatives: product.alternatives || [],
        images: product.images || null
      }

      // Insert product into Supabase
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()

      if (error) {
        console.error(`❌ Error inserting ${product.slug}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Migrated: ${product.slug}`)
        successCount++
      }
    } catch (err) {
      console.error(`❌ Unexpected error with ${product.slug}:`, err)
      errorCount++
    }
  }

  console.log('\n📊 Migration Summary:')
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Failed: ${errorCount}`)
  console.log(`   📦 Total: ${allProducts.length}`)

  if (errorCount === 0) {
    console.log('\n🎉 All products migrated successfully!')
  } else {
    console.log('\n⚠️  Some products failed to migrate. Check errors above.')
  }
}

// Run migration
migrateProducts()
  .then(() => {
    console.log('\n✨ Migration complete!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('\n💥 Migration failed:', err)
    process.exit(1)
  })
