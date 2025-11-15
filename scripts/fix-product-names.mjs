import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function fixProductNames() {
  console.log('=== FIXING PRODUCT NAME ISSUES ===\n')

  const fixes = [
    {
      slug: 'john-boos-platinum-commercial-cutting-board',
      currentName: 'John Boos Platinum Commercial Series Rectangular Wooden Maple Cutting Board 24x18x1.75\\',
      correctName: 'John Boos Platinum Commercial Series Rectangular Wooden Maple Cutting Board 24x18x1.75"',
      issue: 'Escaped backslash before quote'
    },
    {
      slug: 'bodum-chambord-french-press',
      currentName: 'Bodum chambord french press',
      correctName: 'Bodum Chambord French Press',
      issue: 'Lowercase title'
    },
    {
      slug: 'norton-im200-tri-stone-sharpener',
      currentName: 'Norton im200 tri stone sharpener',
      correctName: 'Norton IM200 Tri Stone Sharpener',
      issue: 'Lowercase title'
    }
  ]

  for (const fix of fixes) {
    console.log(`\n${fix.slug}:`)
    console.log(`  Issue: ${fix.issue}`)
    console.log(`  Current: "${fix.currentName}"`)
    console.log(`  Correct: "${fix.correctName}"`)

    // Check current value
    const { data: current, error: fetchError } = await supabase
      .from('products')
      .select('name')
      .eq('slug', fix.slug)
      .single()

    if (fetchError) {
      console.error(`  ❌ Error fetching: ${fetchError.message}`)
      continue
    }

    console.log(`  Database has: "${current.name}"`)

    // Update the name
    const { error: updateError } = await supabase
      .from('products')
      .update({ name: fix.correctName })
      .eq('slug', fix.slug)

    if (updateError) {
      console.error(`  ❌ Error updating: ${updateError.message}`)
    } else {
      console.log(`  ✅ FIXED!`)
    }
  }

  console.log('\n\n=== VERIFICATION ===\n')

  // Verify all fixes
  for (const fix of fixes) {
    const { data, error } = await supabase
      .from('products')
      .select('name')
      .eq('slug', fix.slug)
      .single()

    if (!error && data) {
      const isCorrect = data.name === fix.correctName
      console.log(`${isCorrect ? '✅' : '❌'} ${fix.slug}`)
      console.log(`   "${data.name}"`)
    }
  }

  console.log('\n✅ All product names fixed!')
}

fixProductNames()
