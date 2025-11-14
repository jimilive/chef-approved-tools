import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function getProductExample() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  console.log('=== RAW SUPABASE PRODUCT OBJECT (from database) ===\n')
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'Knives')
    .eq('slug', 'victorinox-fibrox-8-inch-chefs-knife')
    .single()

  if (error) {
    console.error('Error:', error)
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
}

getProductExample()
