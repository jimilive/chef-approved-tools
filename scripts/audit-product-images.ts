import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'
import { productImages } from '../lib/images'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function auditProductImages() {
  const { data, error } = await supabase
    .from('products')
    .select('slug, name, images')
    .order('slug')

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log(`\n📊 Product Images Audit\n`)
  console.log(`Total products in Supabase: ${data.length}\n`)

  const missingInSupabase: typeof data = []
  const hasSupabaseImage: typeof data = []

  data.forEach(product => {
    const hasImage = product.images?.primary && product.images.primary !== ''
    if (hasImage) {
      hasSupabaseImage.push(product)
    } else {
      missingInSupabase.push(product)
    }
  })

  console.log(`✅ Products WITH images.primary in Supabase: ${hasSupabaseImage.length}`)
  console.log(`❌ Products WITHOUT images.primary in Supabase: ${missingInSupabase.length}\n`)

  if (missingInSupabase.length > 0) {
    console.log(`\n❌ MISSING images.primary in Supabase:\n`)
    missingInSupabase.forEach((p, i) => {
      const registryEntry = productImages[p.slug]
      const hasRegistryImage = registryEntry?.hero || registryEntry?.og || registryEntry?.gallery?.[0]
      const suggestedImage = registryEntry?.hero || registryEntry?.og || registryEntry?.gallery?.[0] || 'NO IMAGE IN REGISTRY'

      console.log(`${i+1}. ${p.slug}`)
      console.log(`   Name: ${p.name}`)
      console.log(`   Current images field: ${JSON.stringify(p.images)}`)
      console.log(`   Registry has image: ${hasRegistryImage ? '✅ YES' : '❌ NO'}`)
      if (hasRegistryImage) {
        console.log(`   Suggested: ${suggestedImage}`)
      }
      console.log('')
    })
  }

  if (hasSupabaseImage.length > 0) {
    console.log(`\n✅ Products WITH images.primary in Supabase:\n`)
    hasSupabaseImage.forEach((p, i) => {
      console.log(`${i+1}. ${p.slug}`)
      console.log(`   images.primary: ${p.images?.primary}`)
      console.log('')
    })
  }
}

auditProductImages()
