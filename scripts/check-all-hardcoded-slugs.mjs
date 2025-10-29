import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { execSync } from 'child_process'

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

const validSlugs = new Set(products.map(p => p.slug))

console.log('=== CHECKING ALL HARDCODED SLUGS ===\n')
console.log(`Database has ${products.length} products\n`)

// Find all files with getProductBySlug
const files = execSync('grep -r "getProductBySlug" app --include="*.tsx" --include="*.ts" | cut -d: -f1 | sort -u', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(f => f)

console.log(`Checking ${files.length} files...\n`)

const issues = []

files.forEach(file => {
  const content = readFileSync(file, 'utf8')

  // Match getProductBySlug('slug-name') or getProductBySlug("slug-name")
  const matches = content.matchAll(/getProductBySlug\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g)

  for (const match of matches) {
    const slug = match[1]
    if (!validSlugs.has(slug)) {
      issues.push({
        file: file.replace('/Users/scottbradley/chef-approved-tools/', ''),
        slug,
        lineContext: content.split('\n').find(line => line.includes(slug))?.trim()
      })
    }
  }
})

if (issues.length === 0) {
  console.log('✅ All hardcoded slugs are valid!\n')
} else {
  console.log(`❌ Found ${issues.length} invalid slug(s):\n`)
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. FILE: ${issue.file}`)
    console.log(`   SLUG: "${issue.slug}"`)
    console.log(`   LINE: ${issue.lineContext}`)

    // Try to find similar
    const similar = products.find(p =>
      p.slug.includes(issue.slug) || issue.slug.includes(p.slug.split('-').slice(0, 2).join('-'))
    )
    if (similar) {
      console.log(`   SUGGESTION: "${similar.slug}"`)
    }
    console.log('')
  })
}
