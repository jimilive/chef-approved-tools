import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

console.log('Searching for Vitamix products...\n')

const { data: products, error } = await supabase
  .from('products')
  .select('slug, name')
  .ilike('name', '%vitamix%')

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

console.log('Found products:')
products.forEach(p => console.log(`  ${p.slug} - ${p.name}`))

// Also check all slugs with '5200'
const { data: fivetwohundred } = await supabase
  .from('products')
  .select('slug, name')
  .ilike('slug', '%5200%')

console.log('\nProducts with 5200 in slug:')
if (fivetwohundred && fivetwohundred.length > 0) {
  fivetwohundred.forEach(p => console.log(`  ${p.slug} - ${p.name}`))
} else {
  console.log('  None found')
}
