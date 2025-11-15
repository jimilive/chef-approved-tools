import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function updateBlenderCJLinks() {
  console.log('=== UPDATING BLENDER CJ AFFILIATE LINKS ===\n')

  // 1. Update Vitamix 5200 - Add Vitamix Direct CJ link as primary
  console.log('1. Updating Vitamix 5200...')
  const { data: vitamix, error: vitamixFetchError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', 'vitamix-5200-professional-blender')
    .single()

  if (vitamixFetchError) {
    console.error('  ❌ Error fetching Vitamix:', vitamixFetchError)
  } else {
    const updatedLinks = [
      {
        merchant: 'vitamix_cj',
        url: 'https://www.anrdoezrs.net/click-101557027-7745121',
        is_primary: true,
        label: 'Vitamix 5200 Direct',
        commission_note: 'EPC: $65.44, CJ Affiliate'
      },
      {
        merchant: 'vitamix_cj_deals',
        url: 'https://www.jdoqocy.com/click-101557027-15472587',
        is_primary: false,
        label: 'Vitamix Deals Page',
        commission_note: 'EPC: $178.16 (HIGHEST), Sale page'
      },
      {
        merchant: 'amazon',
        url: vitamix.affiliate_links[0].url, // Keep existing Amazon as fallback
        is_primary: false,
        label: 'Amazon'
      }
    ]

    const { error: updateError } = await supabase
      .from('products')
      .update({
        affiliate_links: updatedLinks,
        primary_affiliate: 'vitamix_cj'
      })
      .eq('slug', 'vitamix-5200-professional-blender')

    if (updateError) {
      console.error('  ❌ Error updating Vitamix:', updateError)
    } else {
      console.log('  ✅ Updated Vitamix 5200')
      console.log('     - Primary: Vitamix CJ Direct (EPC: $65.44)')
      console.log('     - Secondary: Vitamix Deals (EPC: $178.16)')
      console.log('     - Fallback: Amazon\n')
    }
  }

  // 2. Update KitchenAid K400 - Add KitchenAid Direct CJ link
  console.log('2. Updating KitchenAid K400...')
  const { data: kitchenaid, error: kitchenaidFetchError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', 'kitchenaid-k400')
    .single()

  if (kitchenaidFetchError) {
    console.error('  ❌ Error fetching KitchenAid:', kitchenaidFetchError)
  } else {
    const updatedLinks = [
      {
        merchant: 'kitchenaid_cj',
        url: 'https://www.jdoqocy.com/click-101557027-15736726',
        is_primary: true,
        label: 'KitchenAid K400 Blender',
        commission_note: 'CJ Affiliate - general KitchenAid link'
      },
      {
        merchant: 'amazon',
        url: kitchenaid.affiliate_links[0].url, // Keep existing Amazon as fallback
        is_primary: false,
        label: 'Amazon'
      }
    ]

    const { error: updateError } = await supabase
      .from('products')
      .update({
        affiliate_links: updatedLinks,
        primary_affiliate: 'kitchenaid_cj'
      })
      .eq('slug', 'kitchenaid-k400')

    if (updateError) {
      console.error('  ❌ Error updating KitchenAid:', updateError)
    } else {
      console.log('  ✅ Updated KitchenAid K400')
      console.log('     - Primary: KitchenAid CJ')
      console.log('     - Fallback: Amazon\n')
    }
  }

  console.log('=== SUMMARY ===')
  console.log('✓ Vitamix 5200: Now using Vitamix Direct (CJ) as primary')
  console.log('✓ KitchenAid K400: Now using KitchenAid Direct (CJ) as primary')
  console.log('✓ Ninja Professional Plus: Remains Amazon (no CJ program)')
  console.log('✓ Blendtec Designer 725: Remains Amazon (no CJ program)')
  console.log('\nAll blenders now use best available commission rates!')
}

updateBlenderCJLinks()
