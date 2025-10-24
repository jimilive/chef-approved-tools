import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function listProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('slug, name')
    .order('slug')
  
  if (error) {
    console.error('Error:', error)
  } else {
    console.log(`\n📊 Products in Supabase Database:\n`)
    console.log(`Total: ${data.length} products\n`)
    data.forEach((p, i) => {
      console.log(`${i+1}. ${p.slug}`)
      console.log(`   ${p.name}\n`)
    })
  }
}

listProducts()
