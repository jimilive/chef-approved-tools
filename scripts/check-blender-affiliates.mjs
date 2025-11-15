import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkBlenderAffiliates() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  console.log('=== CHECKING BLENDER AFFILIATE LINKS ===\n')

  const slugs = [
    'vitamix-5200-professional-blender',
    'kitchenaid-k400',
    'ninja-professional-plus',
    'blendtec-designer-725'
  ]

  for (const slug of slugs) {
    const { data, error } = await supabase
      .from('products')
      .select('slug, name, brand, primary_affiliate, affiliate_links')
      .eq('slug', slug)
      .single()

    if (error) {
      console.log(`❌ ${slug}: NOT FOUND`)
    } else {
      console.log(`${data.name}:`)
      console.log(`  Primary: ${data.primary_affiliate}`)
      console.log(`  Links:`)
      data.affiliate_links?.forEach(link => {
        console.log(`    - ${link.merchant}${link.is_primary ? ' [PRIMARY]' : ''}: ${link.url}`)
      })
      console.log()
    }
  }

  console.log('\n=== BRANDS THAT SHOULD USE CJ ===')
  console.log('✓ Vitamix - CJ available')
  console.log('✓ KitchenAid - CJ available')
  console.log('✓ Staub/Zwilling - CJ available (already using)')
  console.log('✗ Ninja - Amazon only')
  console.log('✗ Blendtec - Amazon only')
}

checkBlenderAffiliates()
