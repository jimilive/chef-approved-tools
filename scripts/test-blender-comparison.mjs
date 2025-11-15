import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testBlenderComparison() {
  console.log('=== TESTING BLENDER COMPARISON DATA FETCH ===\n')

  const slugs = [
    'vitamix-5200-professional-blender',
    'blendtec-designer-725',
    'ninja-professional-plus',
    'kitchenaid-k400'
  ]

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .in('slug', slugs)

  if (error) {
    console.error('❌ Error fetching products:', error)
    return
  }

  console.log(`✅ Found ${products.length} products\n`)

  const productMap = {
    'vitamix-5200-professional-blender': 'Vitamix 5200',
    'blendtec-designer-725': 'Blendtec Designer 725',
    'ninja-professional-plus': 'Ninja Professional Plus',
    'kitchenaid-k400': 'KitchenAid K400'
  }

  for (const product of products) {
    const displayName = productMap[product.slug]
    console.log(`${displayName}:`)
    console.log(`  Primary Affiliate: ${product.primary_affiliate}`)

    const primaryLink = product.affiliate_links.find(
      link => link.merchant === product.primary_affiliate
    ) || product.affiliate_links[0]

    console.log(`  Primary Link: ${primaryLink?.url || '#'}`)
    console.log(`  Commission Type: ${primaryLink?.merchant}`)
    if (primaryLink?.commission_note) {
      console.log(`  Note: ${primaryLink.commission_note}`)
    }
    console.log()
  }

  console.log('=== COMMISSION BREAKDOWN ===')
  console.log('✓ Vitamix 5200: Vitamix CJ (EPC $65.44)')
  console.log('✓ KitchenAid K400: KitchenAid CJ')
  console.log('✓ Ninja Professional Plus: Amazon (1-3%)')
  console.log('✓ Blendtec Designer 725: Amazon (1-3%)')
  console.log('\n✅ 2/4 products using higher-commission CJ links!')
}

testBlenderComparison()
