import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateRatings() {
  console.log('🔄 Updating knife ratings in Supabase...\n')

  // Update 10-inch Fibrox to 5.0
  const { data: fibrox10, error: error1 } = await supabase
    .from('products')
    .update({
      expert_rating: 5.0,
      reviews: {
        rating: 5.0,
        count: 6234,
        verified: true,
        source: 'Amazon',
        lastUpdated: '2025-10-14T00:00:00Z'
      }
    })
    .eq('slug', 'victorinox-fibrox-10-inch-chefs-knife')
    .select()

  if (error1) {
    console.error('❌ Error updating 10-inch Fibrox:', error1)
  } else {
    console.log('✅ Updated Victorinox 10-inch Fibrox rating to 5.0')
    console.log('   Records updated:', fibrox10?.length || 0)
  }

  // Update paring knife to 4.9
  const { data: paring, error: error2 } = await supabase
    .from('products')
    .update({
      expert_rating: 4.9,
      reviews: {
        rating: 4.9,
        count: 12453,
        verified: true,
        source: 'Amazon',
        lastUpdated: '2025-10-14T00:00:00Z'
      }
    })
    .eq('slug', 'victorinox-4-inch-paring-knife')
    .select()

  if (error2) {
    console.error('❌ Error updating paring knife:', error2)
  } else {
    console.log('✅ Updated Victorinox paring knife rating to 4.9')
    console.log('   Records updated:', paring?.length || 0)
  }

  console.log('\n✨ Rating updates complete!')
}

updateRatings().catch(console.error)
