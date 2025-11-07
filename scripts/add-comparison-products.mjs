import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const comparisonProducts = [
  {
    slug: 'blendtec-total-classic',
    name: 'Blendtec Total Classic',
    brand: 'Blendtec',
    category: 'Appliances',
    subcategory: 'Blenders',
    expert_rating: null, // No full review - comparison only
    description: 'High-powered blender with 3 HP motor and 8-year warranty',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3JkHbHJ',
        primary: true
      }
    ],
    primary_affiliate: 'amazon',
    in_stock: true
  },
  {
    slug: 'ninja-professional-plus',
    name: 'Ninja Professional Plus',
    brand: 'Ninja',
    category: 'Appliances',
    subcategory: 'Blenders',
    expert_rating: null, // No full review - comparison only
    description: 'Budget-friendly blender with 1,400W motor and Auto-iQ technology',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/4ol99Ch',
        primary: true
      }
    ],
    primary_affiliate: 'amazon',
    in_stock: true
  },
  {
    slug: 'kitchenaid-k400',
    name: 'KitchenAid K400',
    brand: 'KitchenAid',
    category: 'Appliances',
    subcategory: 'Blenders',
    expert_rating: null, // No full review - comparison only
    description: 'Mid-range blender with 1.5 HP motor and stylish design',
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/3LqCWLc',
        primary: true
      }
    ],
    primary_affiliate: 'amazon',
    in_stock: true
  }
]

async function addComparisonProducts() {
  console.log('Adding comparison products to Supabase...\n')

  for (const product of comparisonProducts) {
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
    } else {
      console.log(`  ✅ Added ${product.name}`)
      console.log(`     - Slug: ${product.slug}`)
      console.log(`     - Category: ${product.category}`)
      console.log(`     - Expert Rating: ${product.expert_rating} (comparison-only)`)
      console.log(`     - Affiliate Link: ${product.affiliate_links[0].url}\n`)
    }
  }

  console.log('Done!')
}

addComparisonProducts()
