import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function verifyDutchOvens() {
  console.log('=== VERIFYING ALL 4 DUTCH OVEN PRODUCTS ===\n')

  const slugs = [
    'le-creuset-signature-7-25-qt-dutch-oven',
    'staub-cast-iron-7-qt-round-cocotte',
    'lodge-enameled-cast-iron-7-5-qt-dutch-oven',
    'cuisinart-chef-classic-enameled-7-qt-round-covered-casserole'
  ]

  for (const slug of slugs) {
    const { data, error } = await supabase
      .from('products')
      .select('slug, name, brand, primary_affiliate, affiliate_links')
      .eq('slug', slug)
      .single()

    if (error) {
      console.log(`❌ ${slug}: NOT FOUND`)
      console.log(`   Error: ${error.message}\n`)
    } else {
      console.log(`✅ ${data.name}`)
      console.log(`   Slug: ${data.slug}`)
      console.log(`   Brand: ${data.brand}`)
      console.log(`   Primary: ${data.primary_affiliate}`)
      console.log(`   Links: ${data.affiliate_links?.length || 0}`)
      if (data.affiliate_links && data.affiliate_links.length > 0) {
        data.affiliate_links.forEach(link => {
          console.log(`     - ${link.merchant}: ${link.url}`)
        })
      }
      console.log()
    }
  }
}

verifyDutchOvens()
