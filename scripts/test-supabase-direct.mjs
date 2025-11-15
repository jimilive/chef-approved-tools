import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testDirectFetch() {
  console.log('=== DIRECT SUPABASE QUERY ===\n')

  const { data, error } = await supabase
    .from('products')
    .select('name, slug')
    .in('slug', [
      'john-boos-platinum-commercial-cutting-board',
      'bodum-chambord-french-press',
      'norton-im200-tri-stone-sharpener'
    ])

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Raw Supabase response:')
    data.forEach(product => {
      console.log(`\n${product.slug}:`)
      console.log(`  Raw name: ${JSON.stringify(product.name)}`)
      console.log(`  Display: "${product.name}"`)

      // Show each character
      console.log(`  Characters:`)
      for (let i = 0; i < product.name.length; i++) {
        const char = product.name[i]
        const code = product.name.charCodeAt(i)
        if (code < 32 || code > 126) {
          console.log(`    [${i}]: char=${JSON.stringify(char)} code=${code} (SPECIAL)`)
        } else if (char === '\\' || char === '"') {
          console.log(`    [${i}]: char=${JSON.stringify(char)} code=${code}`)
        }
      }
      const lastIdx = product.name.length - 1
      console.log(`  Last char: ${JSON.stringify(product.name[lastIdx])} (code ${product.name.charCodeAt(lastIdx)})`)
    })
  }
}

testDirectFetch()
