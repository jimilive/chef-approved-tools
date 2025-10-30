#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const slug = process.argv[2] || 'diamond-crystal-kosher-salt'

const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('slug', slug)
  .single()

if (error || !data) {
  console.error(`❌ Product "${slug}" not found`)
  process.exit(1)
}

console.log(`\n📦 Product: ${data.name}`)
console.log(`   Slug: ${data.slug}`)
console.log(`   Brand: ${data.brand}`)
console.log(`\n🔗 Affiliate Links:`)
if (data.affiliate_links && data.affiliate_links.length > 0) {
  data.affiliate_links.forEach((link, i) => {
    console.log(`   ${i + 1}. [${link.merchant}] ${link.url}${link.isPrimary ? ' (PRIMARY)' : ''}`)
  })
} else {
  console.log('   (none)')
}
console.log()
