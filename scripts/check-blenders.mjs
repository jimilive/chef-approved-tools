import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkBlenders() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  console.log('=== SEARCHING FOR BLENDER PRODUCTS ===\n')

  // Search for each product
  const searches = [
    { brand: 'Vitamix', model: '5200' },
    { brand: 'Blendtec', model: '725' },
    { brand: 'Ninja', model: 'Professional Plus' },
    { brand: 'KitchenAid', model: 'K400' },
  ]

  for (const search of searches) {
    console.log(`\n--- ${search.brand} ${search.model} ---`)

    const { data, error } = await supabase
      .from('products')
      .select('slug, name, brand, affiliate_links')
      .ilike('brand', `%${search.brand}%`)
      .ilike('name', `%${search.model}%`)

    if (error) {
      console.error(`Error:`, error)
    } else if (!data || data.length === 0) {
      console.log(`❌ No ${search.brand} ${search.model} found`)
    } else {
      data.forEach(product => {
        console.log(`✅ Found: ${product.name}`)
        console.log(`   Slug: ${product.slug}`)
        console.log(`   Affiliate links: ${product.affiliate_links?.length || 0}`)
        if (product.affiliate_links && product.affiliate_links.length > 0) {
          product.affiliate_links.forEach(link => {
            console.log(`     - ${link.merchant}${link.is_primary ? ' [PRIMARY]' : ''}: ${link.url}`)
          })
        }
      })
    }
  }

  // Also search more broadly for blenders
  console.log('\n\n=== ALL BLENDER PRODUCTS ===\n')
  const { data: allBlenders, error: allError } = await supabase
    .from('products')
    .select('slug, name, brand')
    .or('category.ilike.%blender%,subcategory.ilike.%blender%,name.ilike.%blender%')

  if (allError) {
    console.error('Error:', allError)
  } else {
    console.log(`Found ${allBlenders?.length || 0} total blender products:`)
    allBlenders?.forEach(product => {
      console.log(`  - ${product.name} (${product.slug})`)
    })
  }
}

checkBlenders()
