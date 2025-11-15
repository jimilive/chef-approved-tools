import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkDutchOvensBroad() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  console.log('=== SEARCHING FOR DUTCH OVEN PRODUCTS (BROAD SEARCH) ===\n')

  // Search for each brand without requiring "dutch" in name
  const searches = [
    { brand: 'Le Creuset', size: '7.25' },
    { brand: 'Le Creuset', size: '7' },
    { brand: 'Staub', size: '7' },
    { brand: 'Lodge', size: '7.5' },
    { brand: 'Lodge', size: '7' },
    { brand: 'Cuisinart', size: '7' },
  ]

  for (const search of searches) {
    console.log(`\n--- ${search.brand} ${search.size} Qt ---`)

    const { data, error } = await supabase
      .from('products')
      .select('slug, name, brand, category, affiliate_links')
      .ilike('brand', `%${search.brand}%`)
      .ilike('name', `%${search.size}%`)

    if (error) {
      console.error(`Error:`, error)
    } else if (!data || data.length === 0) {
      console.log(`❌ No ${search.brand} ${search.size} Qt found`)
    } else {
      data.forEach(product => {
        console.log(`✅ Found: ${product.name}`)
        console.log(`   Slug: ${product.slug}`)
        console.log(`   Brand: ${product.brand}`)
        console.log(`   Category: ${product.category}`)
        console.log(`   Affiliate links: ${product.affiliate_links?.length || 0}`)
        if (product.affiliate_links && product.affiliate_links.length > 0) {
          product.affiliate_links.forEach(link => {
            console.log(`     - ${link.merchant}${link.tag ? ` (${link.tag})` : ''}${link.is_primary ? ' [PRIMARY]' : ''}: ${link.url}`)
          })
        }
      })
    }
  }

  // Also check by exact brand names
  console.log('\n\n=== ALL PRODUCTS BY BRAND ===')
  const brands = ['Le Creuset', 'Staub', 'Lodge', 'Cuisinart']

  for (const brand of brands) {
    const { data, error } = await supabase
      .from('products')
      .select('slug, name, category')
      .eq('brand', brand)

    console.log(`\n${brand}: ${data?.length || 0} products`)
    if (data && data.length > 0 && data.length <= 5) {
      data.forEach(p => console.log(`  - ${p.name}`))
    }
  }
}

checkDutchOvensBroad()
