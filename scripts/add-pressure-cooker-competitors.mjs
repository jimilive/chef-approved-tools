#!/usr/bin/env node
/**
 * One-time script to add pressure cooker competitor products to Supabase
 * Run with: node scripts/add-pressure-cooker-competitors.mjs
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
    slug: 'ninja-foodi-11-in-1-pro',
    name: 'Ninja Foodi 11-in-1 Pro 6.5 Qt',
    brand: 'Ninja',
    category: 'appliances',
    affiliate_links: [{ url: 'https://amzn.to/43R2EPA', merchant: 'amazon', isPrimary: true }],
    primary_affiliate: 'amazon',
    in_stock: true,
    description: 'Ninja Foodi 11-in-1 Pro - Pressure cooker with TenderCrisp air frying technology',
  },
  {
    slug: 'breville-fast-slow-pro',
    name: 'Breville Fast Slow Pro 6 Qt',
    brand: 'Breville',
    category: 'appliances',
    affiliate_links: [{ url: 'https://amzn.to/48gmXqU', merchant: 'amazon', isPrimary: true }],
    primary_affiliate: 'amazon',
    in_stock: true,
    description: 'Breville Fast Slow Pro - Premium pressure cooker with hands-free steam release',
  },
  // Cosori not currently available on Amazon - skipping
]

async function addProducts() {
  console.log('🛒 Adding pressure cooker competitor products to Supabase...\n')

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
