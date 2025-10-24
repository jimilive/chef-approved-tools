import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixSlug() {
  console.log('🔧 Fixing paring knife slug in Supabase...\n')
  
  const { data, error } = await supabase
    .from('products')
    .update({ slug: 'victorinox-4-inch-paring-knife' })
    .eq('slug', 'victorinox-paring-knife')
    .select()
  
  if (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } else if (data && data.length > 0) {
    console.log('✅ Slug updated successfully!')
    console.log(`   Old: victorinox-paring-knife`)
    console.log(`   New: victorinox-4-inch-paring-knife`)
    console.log(`   Product: ${data[0].name}`)
  } else {
    console.log('⚠️  No product found with slug "victorinox-paring-knife"')
  }
}

fixSlug()
