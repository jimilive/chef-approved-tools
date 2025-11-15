import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkNames() {
  const slugs = [
    'john-boos-platinum-commercial-cutting-board',
    'bodum-chambord-french-press',
    'norton-im200-tri-stone-sharpener'
  ]

  for (const slug of slugs) {
    const { data, error } = await supabase
      .from('products')
      .select('name, slug')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error(`Error fetching ${slug}:`, error.message)
    } else {
      console.log(`\n${slug}:`)
      console.log(`  name: "${data.name}"`)
      console.log(`  length: ${data.name.length}`)
      const lastChar = data.name.charAt(data.name.length - 1)
      console.log(`  last char: "${lastChar}"`)
      console.log(`  last char code: ${data.name.charCodeAt(data.name.length - 1)}`)
    }
  }
}

checkNames()
