import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const { data, error } = await supabase
  .from('products')
  .select('slug, name')
  .ilike('slug', '%hotel-pans%')

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

console.log('Hotel pan products in database:')
data.forEach(p => console.log(`  ${p.slug} - ${p.name}`))
