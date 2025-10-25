/**
 * Script to add the 4 hotel pan products to Supabase
 *
 * Usage: npx tsx scripts/add-hotel-pans.ts
 */

// Load environment variables from .env.local
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

// Create Supabase client with loaded env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.error('   Needed: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Use service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const hotelPanProducts = [
  // 1. Small Plastic Hotel Pans - Home use hero product
  {
    slug: 'small-plastic-hotel-pans',
    name: 'Small Plastic Hotel Pans',
    brand: 'Curta',
    model: '1/6 Pan 6-Pack (Plastic)',
    category: 'storage',
    subcategory: 'food-storage',
    in_stock: true,
    availability: 'in-stock',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/47oh8qZ',
        displayName: 'Amazon',
        isPrimary: true
      }
    ],
    vendors: [],
    primary_affiliate: 'amazon',
    reviews: null,
    expert_rating: 5,
    pros: [
      'Eliminates Tupperware chaos with modular stacking',
      'Restaurant-grade NSF-approved durability',
      'Dishwasher safe (survives commercial cycles)',
      'Perfect stacking - maximizes fridge space',
      'Almost indestructible - 20+ year lifespan',
      'Won\'t stain (opaque white)',
      'Freezer safe',
      'Affordable system ($75-180 for complete setup)'
    ],
    cons: [
      'Takes up consistent space (standardized footprints)',
      'Upfront cost feels high compared to cheap Tupperware',
      '"Too commercial" aesthetic for some',
      '1/9 pans can tip over when full',
      'Learning curve for choosing sizes'
    ],
    description: 'NSF-approved plastic hotel pans in 1/6 and 1/9 sizes. Perfect for home meal prep, organization, and cold storage. Restaurant-grade quality at consumer prices.',
    expert_opinion: 'After 20 years of using plastic hotel pans at home, I can tell you this is the single best upgrade you can make to your kitchen organization. These small plastic hotel pans (1/6 and 1/9 sizes) eliminate the total chaos of the Tupperware drawer, stack perfectly in your refrigerator, and handle daily dishwasher cycles without cracking or warping. They\'re NSF-approved restaurant-grade quality at a fraction of the cost of building a mismatched container collection.',
    usage_scenarios: [
      'Weekly meal prep for 2-6 people',
      'Kitchen organization and cold storage',
      'Everyday leftovers',
      'Marinating proteins',
      'Storing shredded cheese and prepped vegetables'
    ],
    alternatives: [],
    images: {
      primary: '/images/products/small-plastic-hotel-pans.jpg',
      alt: 'Curta small plastic hotel pans stacked in refrigerator'
    }
  },

  // 2. Large Plastic Hotel Pans - Catering/commercial cold storage
  {
    slug: 'large-plastic-hotel-pans',
    name: 'Large Plastic Hotel Pans',
    brand: 'Curta',
    model: 'Full & 1/3 Pan (Plastic)',
    category: 'storage',
    subcategory: 'food-storage',
    in_stock: true,
    availability: 'in-stock',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/48O97Ow',
        displayName: 'Amazon',
        isPrimary: true
      }
    ],
    vendors: [],
    primary_affiliate: 'amazon',
    reviews: null,
    expert_rating: 5,
    pros: [
      'Commercial capacity for high-volume operations',
      'NSF-approved food safety standards',
      'Stackable system maximizes cooler space',
      'Dishwasher safe (commercial cycles)',
      'Lightweight for transport to events',
      'Freezer safe',
      'Won\'t stain (opaque white)',
      'Affordable inventory building (40-50% cheaper than Cambro)'
    ],
    cons: [
      'Too large for most home kitchens',
      'Overkill for small households (2-4 people)',
      'Not oven-safe',
      'Requires significant storage space',
      'Upfront cost for catering inventory ($200-300+)'
    ],
    description: 'Commercial-grade plastic hotel pans in full and 1/3 sizes. Essential for catering businesses, large families (8+ people), and church/community kitchens.',
    expert_opinion: 'Large plastic hotel pans (full and 1/3 sizes) are commercial workhorses designed for high-volume food storage. After 24 years using them in professional kitchens, I can tell you these are essential for catering operations, large-batch meal prep, and commercial cold storage—but they\'re overkill for most home cooks. If you\'re cooking for 8+ people regularly, run a catering business, or manage a church/community kitchen, these are exactly what you need.',
    usage_scenarios: [
      'Catering business operations',
      'Large family cooking (8+ people)',
      'Church/community kitchen events',
      'Bulk batch cooking for freezer storage',
      'Major holiday meal prep'
    ],
    alternatives: [],
    images: {
      primary: '/images/products/large-plastic-hotel-pans.jpg',
      alt: 'Curta large plastic hotel pans for commercial use'
    }
  },

  // 3. Small Metal Hotel Pans - Hosting/BBQ/oven use
  {
    slug: 'small-metal-hotel-pans',
    name: 'Small Metal Hotel Pans',
    brand: 'Curta',
    model: '1/6 Pan 6-Pack (Metal)',
    category: 'storage',
    subcategory: 'food-storage',
    in_stock: true,
    availability: 'in-stock',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3Wny7og',
        displayName: 'Amazon',
        isPrimary: true
      }
    ],
    vendors: [],
    primary_affiliate: 'amazon',
    reviews: null,
    expert_rating: 5,
    pros: [
      'Hot holding capability (140°F+ for hours)',
      'Oven-safe versatility (up to 500°F+)',
      'Virtually indestructible stainless steel',
      'Professional appearance for buffets',
      'NSF-approved food safety',
      'Dishwasher safe',
      'No staining or odor retention',
      'Notched lid innovation for serving'
    ],
    cons: [
      'More expensive than plastic (2x cost)',
      'Heavier when full',
      'Conducts heat (hot to touch)',
      '1/9 pans can tip over',
      'Overkill for cold storage only'
    ],
    description: 'Stainless steel hotel pans in 1/6 and 1/9 sizes. Perfect for hot holding at BBQs, oven roasting, chafing dish setups, and family gatherings.',
    expert_opinion: 'Small metal hotel pans (stainless steel 1/6 and 1/9 sizes) are versatile workhorses for hot holding, oven use, and family gatherings. After 24 years using them in professional kitchens, I can tell you these excel when you need durability beyond what plastic can offer: BBQ hot holding, oven roasting, chafing dish setups, and commercial-level abuse. At home, I use them for family gatherings, holiday meals, and any situation where food needs to stay hot for hours.',
    usage_scenarios: [
      'Family BBQs and outdoor gatherings',
      'Holiday meal hot holding',
      'Chafing dish buffet setups',
      'Oven roasting and baking',
      'Steam table service'
    ],
    alternatives: [],
    images: {
      primary: '/images/products/small-metal-hotel-pans.jpg',
      alt: 'Curta small metal hotel pans in chafing dish'
    }
  },

  // 4. Large Metal Hotel Pans - Catering/commercial hot holding
  {
    slug: 'large-metal-hotel-pans',
    name: 'Large Metal Hotel Pans',
    brand: 'Curta',
    model: 'Full & 1/3 Pan (Metal)',
    category: 'storage',
    subcategory: 'food-storage',
    in_stock: true,
    availability: 'in-stock',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/4qtLn8G',
        displayName: 'Amazon',
        isPrimary: true
      }
    ],
    vendors: [],
    primary_affiliate: 'amazon',
    reviews: null,
    expert_rating: 5,
    pros: [
      'Hot holding for hours (140°F+)',
      'Commercial capacity for large events',
      'Oven-safe versatility (up to 500°F+)',
      'Virtually indestructible',
      'Professional appearance',
      'NSF-approved food safety',
      'Dishwasher safe',
      'Notched lid innovation for buffets'
    ],
    cons: [
      'Expensive (2-3x plastic cost)',
      'Overkill for home use (unless 50+ people)',
      'Heavy when full (requires 2 people)',
      'Requires significant storage space',
      'Initial investment ($400-600+ for inventory)'
    ],
    description: 'Commercial stainless steel hotel pans in full and 1/3 sizes. Essential for catering businesses, commercial kitchens, and large-scale event hosting.',
    expert_opinion: 'Large metal hotel pans (full and 1/3 sizes in stainless steel) are commercial workhorses for catering, large-scale events, and professional hot food service. After 24 years using them in restaurants, I can tell you these are essential for operations that need to hold hot food safely for hours, transport dishes to off-site events, or serve 50+ people buffet-style. They\'re overkill for typical home use but indispensable for catering businesses, church kitchens, and anyone regularly cooking for crowds.',
    usage_scenarios: [
      'Catering business operations',
      'Commercial kitchen hot holding',
      'Church/community event buffets',
      'Wedding and large event hosting',
      'Batch cooking for large groups'
    ],
    alternatives: [],
    images: {
      primary: '/images/products/large-metal-hotel-pans.jpg',
      alt: 'Curta large metal hotel pans for commercial catering'
    }
  }
]

async function addHotelPans() {
  console.log('🚀 Adding hotel pan products to Supabase...\n')

  let successCount = 0
  let errorCount = 0

  for (const product of hotelPanProducts) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()

      if (error) {
        console.error(`❌ Error inserting ${product.slug}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Added: ${product.slug}`)
        successCount++
      }
    } catch (err) {
      console.error(`❌ Unexpected error with ${product.slug}:`, err)
      errorCount++
    }
  }

  console.log('\n📊 Summary:')
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Failed: ${errorCount}`)
  console.log(`   📦 Total: ${hotelPanProducts.length}`)

  if (errorCount === 0) {
    console.log('\n🎉 All hotel pan products added successfully!')
  } else {
    console.log('\n⚠️  Some products failed. Check errors above.')
  }
}

// Run the script
addHotelPans()
  .then(() => {
    console.log('\n✨ Complete!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('\n💥 Failed:', err)
    process.exit(1)
  })
