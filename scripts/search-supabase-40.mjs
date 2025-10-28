import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

console.log('Searching Supabase for "40"...\n')

const { data: products, error } = await supabase
  .from('products')
  .select('*')

if (error) {
  console.error('Error fetching products:', error)
  process.exit(1)
}

let found = false

products.forEach(product => {
  const fields = [
    'name', 'slug', 'description', 'expertOpinion',
    'professionalContext', 'whyItMatters', 'personalExperience'
  ]

  fields.forEach(field => {
    if (product[field] && typeof product[field] === 'string' && product[field].includes('40')) {
      console.log(`Product: ${product.slug}`)
      console.log(`Field: ${field}`)
      console.log(`Content: ${product[field]}`)
      console.log('---')
      found = true
    }
  })

  // Check nested objects
  if (product.reviews && typeof product.reviews === 'object') {
    const reviewStr = JSON.stringify(product.reviews)
    if (reviewStr.includes('40')) {
      console.log(`Product: ${product.slug}`)
      console.log(`Field: reviews`)
      console.log(`Content: ${reviewStr}`)
      console.log('---')
      found = true
    }
  }
})

if (!found) {
  console.log('No instances of "40" found in Supabase products table.')
}
