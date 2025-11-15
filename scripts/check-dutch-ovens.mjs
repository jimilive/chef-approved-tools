import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkDutchOvens() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  console.log('=== SEARCHING FOR DUTCH OVEN PRODUCTS ===\n')

  // Search for each brand
  const brands = ['Le Creuset', 'Staub', 'Lodge', 'Cuisinart']

  for (const brand of brands) {
    console.log(`\n--- ${brand} ---`)

    const { data, error } = await supabase
      .from('products')
      .select('slug, name, brand, affiliate_links')
      .ilike('name', `%${brand}%`)
      .ilike('name', '%dutch%')

    if (error) {
      console.error(`Error searching for ${brand}:`, error)
    } else if (!data || data.length === 0) {
      console.log(`❌ No ${brand} Dutch oven found`)
    } else {
      data.forEach(product => {
        console.log(`✅ Found: ${product.name}`)
        console.log(`   Slug: ${product.slug}`)
        console.log(`   Affiliate links: ${product.affiliate_links?.length || 0}`)
        if (product.affiliate_links && product.affiliate_links.length > 0) {
          product.affiliate_links.forEach(link => {
            console.log(`     - ${link.merchant}${link.tag ? ` (${link.tag})` : ''}: ${link.url}`)
          })
        }
      })
    }
  }

  // Also search more broadly
  console.log('\n\n=== ALL DUTCH OVEN PRODUCTS ===\n')
  const { data: allDutch, error: allError } = await supabase
    .from('products')
    .select('slug, name, brand, affiliate_links')
    .or('name.ilike.%dutch%,category.ilike.%dutch%')

  if (allError) {
    console.error('Error:', allError)
  } else {
    console.log(`Found ${allDutch?.length || 0} total products:`)
    allDutch?.forEach(product => {
      console.log(`  - ${product.name} (${product.slug})`)
    })
  }
}

checkDutchOvens()
