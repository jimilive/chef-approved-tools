import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const { data, error } = await supabase
  .from('products')
  .select('slug, name')
  .order('name')

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

console.log('\n=== CHECKING FOR MISSING OR PROBLEMATIC NAMES ===\n')

const issues = []

data.forEach(p => {
  const hasName = p.name && p.name.trim().length > 0
  const hasLowercase = p.name && p.name !== p.name.toUpperCase() && p.name === p.name.toLowerCase()

  if (!hasName) {
    issues.push({ slug: p.slug, issue: 'MISSING NAME', name: p.name })
    console.log(`❌ ${p.slug} - MISSING NAME`)
  } else if (hasLowercase) {
    issues.push({ slug: p.slug, issue: 'LOWERCASE', name: p.name })
    console.log(`⚠️  ${p.slug} - LOWERCASE: "${p.name}"`)
  } else {
    console.log(`✅ ${p.slug} - "${p.name}"`)
  }
})

console.log(`\n=== SUMMARY ===`)
console.log(`Total products: ${data.length}`)
console.log(`Products with issues: ${issues.length}`)

if (issues.length > 0) {
  console.log('\n=== ISSUES FOUND ===')
  issues.forEach(i => {
    console.log(`${i.slug}: ${i.issue} - "${i.name}"`)
  })
}
