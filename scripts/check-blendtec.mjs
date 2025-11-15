import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkBlendtec() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  console.log('=== BLENDTEC PRODUCTS ===\n')

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('brand', '%blendtec%')

  if (error) {
    console.error('Error:', error)
  } else {
    data?.forEach(product => {
      console.log(`Product: ${product.name}`)
      console.log(`Slug: ${product.slug}`)
      console.log(`Affiliate Links:`)
      product.affiliate_links?.forEach(link => {
        console.log(`  - ${link.merchant}: ${link.url}`)
      })
      console.log()
    })
  }
}

checkBlendtec()
