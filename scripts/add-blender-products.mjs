import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const blenderProducts = [
  {
    slug: 'blendtec-designer-725',
    name: 'Blendtec Designer 725',
    brand: 'Blendtec',
    category: 'Appliances',
    subcategory: 'Blenders',
    expert_rating: null, // No full review - comparison only
    description: 'High-powered commercial blender with 3.8 HP motor and touchscreen controls. Used in Jamba Juice locations. Features 100 speed settings and 6 preset programs. Made in USA with 8-year warranty. Shorter profile fits under most kitchen cabinets.',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3JkHbHJ',
        is_primary: true,
        label: 'Designer 725'
      }
    ],
    primary_affiliate: 'amazon',
    in_stock: true
  }
]

async function addBlenderProducts() {
  console.log('Adding blender comparison products to Supabase...\n')

  for (const product of blenderProducts) {
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

addBlenderProducts()
