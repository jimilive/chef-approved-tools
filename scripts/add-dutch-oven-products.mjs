import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const dutchOvenProducts = [
  {
    slug: 'staub-cast-iron-7-qt-round-cocotte',
    name: 'Staub Cast Iron 7 Qt Round Cocotte',
    brand: 'Staub',
    category: 'Cookware',
    subcategory: 'Dutch Ovens',
    expert_rating: null, // No full review - comparison only
    description: 'French-made enameled cast iron cocotte with self-basting lid featuring unique spikes for superior moisture retention. Matte black enamel interior prevents sticking and promotes excellent browning. Heavier than competitors for superior heat retention.',
    affiliate_links: [
      {
        merchant: 'zwilling_cj',
        url: 'https://www.dpbolvw.net/click-101557027-15728361',
        is_primary: true,
        label: '7 Qt Round Cocotte',
        commission_rate: 8
      }
    ],
    primary_affiliate: 'zwilling_cj',
    in_stock: true
  },
  {
    slug: 'lodge-enameled-cast-iron-7-5-qt-dutch-oven',
    name: 'Lodge Enameled Cast Iron 7.5 Qt Dutch Oven',
    brand: 'Lodge',
    category: 'Cookware',
    subcategory: 'Dutch Ovens',
    expert_rating: null, // No full review - comparison only
    description: 'Budget-friendly enameled cast iron Dutch oven made in China. Larger capacity than premium competitors at a fraction of the price. Performs well for braising, slow cooking, and bread baking. Limited lifetime warranty.',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/4hOHYgI',
        is_primary: true,
        label: '7.5 Qt Dutch Oven'
      }
    ],
    primary_affiliate: 'amazon',
    in_stock: true
  },
  {
    slug: 'cuisinart-chef-classic-enameled-7-qt-round-covered-casserole',
    name: 'Cuisinart Chef\'s Classic Enameled 7 Qt Round Covered Casserole',
    brand: 'Cuisinart',
    category: 'Cookware',
    subcategory: 'Dutch Ovens',
    expert_rating: null, // No full review - comparison only
    description: 'Mid-range enameled cast iron casserole with porcelain enamel interior. America\'s Test Kitchen Best Buy winner. Made in China with lifetime manufacturer warranty. Excellent value for performance.',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/47uTQkE',
        is_primary: true,
        label: '7 Qt Round Covered Casserole'
      }
    ],
    primary_affiliate: 'amazon',
    in_stock: true
  }
]

async function addDutchOvenProducts() {
  console.log('Adding Dutch oven comparison products to Supabase...\n')

  for (const product of dutchOvenProducts) {
    console.log(`Checking if ${product.name} already exists...`)

    // Check if product already exists
    const { data: existing, error: checkError } = await supabase
      .from('products')
      .select('slug')
      .eq('slug', product.slug)
      .single()

    if (existing) {
      console.log(`  ⚠️  ${product.name} already exists. Skipping.\n`)
      continue
    }

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = not found (expected)
      console.error(`  ❌ Error checking ${product.name}:`, checkError)
      continue
    }

    // Insert the product
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()

    if (error) {
      console.error(`  ❌ Error adding ${product.name}:`, error)
      console.error('     Error details:', JSON.stringify(error, null, 2))
    } else {
      console.log(`  ✅ Added ${product.name}`)
      console.log(`     - Slug: ${product.slug}`)
      console.log(`     - Category: ${product.category} / ${product.subcategory}`)
      console.log(`     - Expert Rating: ${product.expert_rating} (comparison-only)`)
      console.log(`     - Primary Affiliate: ${product.primary_affiliate}`)
      console.log(`     - Affiliate Link: ${product.affiliate_links[0].url}\n`)
    }
  }

  console.log('Done!')
}

addDutchOvenProducts()
