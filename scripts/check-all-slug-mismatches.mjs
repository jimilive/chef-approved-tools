import { createClient } from '@supabase/supabase-js'
import { readdirSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Get all products from Supabase
const { data: products, error } = await supabase
  .from('products')
  .select('slug, name')

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

// Get all review folders
const reviewsDir = './app/reviews'
const folders = readdirSync(reviewsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

console.log('=== SLUG MISMATCH CHECK ===\n')
console.log(`Found ${folders.length} review folders`)
console.log(`Found ${products.length} products in database\n`)

const dbSlugs = new Set(products.map(p => p.slug))
const mismatches = []
const matches = []

// Check each folder
folders.forEach(folder => {
  if (dbSlugs.has(folder)) {
    matches.push(folder)
  } else {
    // Try to find similar slug in database
    const similar = products.find(p =>
      p.slug.includes(folder) || folder.includes(p.slug.split('-').slice(0, 3).join('-'))
    )
    mismatches.push({
      folder,
      dbSlug: similar ? similar.slug : 'NOT FOUND',
      productName: similar ? similar.name : 'N/A'
    })
  }
})

if (mismatches.length === 0) {
  console.log('✅ All review folders match database slugs perfectly!\n')
  console.log(`${matches.length}/${folders.length} folders verified`)
} else {
  console.log(`❌ Found ${mismatches.length} mismatch(es):\n`)
  mismatches.forEach((m, i) => {
    console.log(`${i + 1}. FOLDER: ${m.folder}`)
    console.log(`   DATABASE: ${m.dbSlug}`)
    console.log(`   PRODUCT: ${m.productName}`)
    console.log('')
  })
  console.log(`✅ ${matches.length} folders match correctly`)
}
