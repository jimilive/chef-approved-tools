#!/usr/bin/env node
/**
 * One-time script to add air fryer competitor products to Supabase
 * Run with: node scripts/add-air-fryer-competitors.mjs
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const competitorProducts = [
  {
    slug: 'cosori-air-fryer-pro-5qt',
    name: 'Cosori Air Fryer Pro 5 Qt',
    brand: 'Cosori',
    category: 'appliances',
    affiliate_links: [{ url: 'https://amzn.to/3M4TKHZ', merchant: 'amazon', isPrimary: true }],
    primary_affiliate: 'amazon',
    in_stock: true,
    description: 'Cosori Air Fryer Pro 5 Qt - 9-in-1 with VeSync app connectivity',
  },
  {
    slug: 'instant-pot-vortex-plus-4qt',
    name: 'Instant Pot Vortex Plus 4 Qt',
    brand: 'Instant Pot',
    category: 'appliances',
    affiliate_links: [{ url: 'https://amzn.to/4rptEiY', merchant: 'amazon', isPrimary: true }],
    primary_affiliate: 'amazon',
    in_stock: true,
    description: 'Instant Pot Vortex Plus 4 Qt - America\'s Test Kitchen Winner with EvenCrisp technology',
  },
  {
    slug: 'chefman-turbofry-4qt',
    name: 'Chefman TurboFry 4 Qt',
    brand: 'Chefman',
    category: 'appliances',
    affiliate_links: [{ url: 'https://amzn.to/4ilHYFa', merchant: 'amazon', isPrimary: true }],
    primary_affiliate: 'amazon',
    in_stock: true,
    description: 'Chefman TurboFry 4 Qt - Budget air fryer with Hi-Fry 450°F boost',
  },
]

async function addProducts() {
  console.log('🍟 Adding air fryer competitor products to Supabase...\n')

  for (const product of competitorProducts) {
    console.log(`Processing: ${product.slug}`)

    // Check if product already exists
    const { data: existing } = await supabase
      .from('products')
      .select('id, slug')
      .eq('slug', product.slug)
      .single()

    if (existing) {
      // Update existing product
      const { error } = await supabase
        .from('products')
        .update({
          affiliate_links: product.affiliate_links,
          primary_affiliate: product.primary_affiliate,
          updated_at: new Date().toISOString()
        })
        .eq('slug', product.slug)

      if (error) {
        console.log(`  ❌ Error updating: ${error.message}`)
      } else {
        console.log(`  ✅ Updated existing product`)
      }
    } else {
      // Insert new product
      const { error } = await supabase
        .from('products')
        .insert(product)

      if (error) {
        console.log(`  ❌ Error inserting: ${error.message}`)
      } else {
        console.log(`  ✅ Created new product`)
      }
    }
  }

  console.log('\n✨ Done!')
}

addProducts()
