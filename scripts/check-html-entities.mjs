import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkHTMLEncoding() {
  console.log('=== CHECKING FOR HTML ENTITY ENCODING ===\n')

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
    data.forEach(product => {
      console.log(`${product.slug}:`)
      console.log(`  Name: "${product.name}"`)
      console.log(`  Has &quot;: ${product.name.includes('&quot;')}`)
      console.log(`  Has &#34;: ${product.name.includes('&#34;')}`)
      console.log(`  Has \\": ${product.name.includes('\\"')}`)
      console.log(`  Has \\\\": ${product.name.includes('\\\\"')}`)
      console.log(`  Raw JSON: ${JSON.stringify(product.name)}`)
      console.log('')
    })
  }
}

checkHTMLEncoding()
