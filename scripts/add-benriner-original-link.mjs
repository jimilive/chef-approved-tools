#!/usr/bin/env node
/**
 * Add Benriner Original/Medium Link as Secondary Option
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('🔧 Adding Benriner Original/Medium link...\n')

const affiliateLinks = [
  {
    url: 'https://amzn.to/47NKzE8',
    merchant: 'amazon',
    tag: 'chefapprovedt-20',
    is_primary: true,
    verified_at: new Date().toISOString(),
    status: 'active',
    label: 'Large'
  },
  {
    url: 'https://amzn.to/4hG8jO6',
    merchant: 'amazon',
    tag: 'chefapprovedt-20',
    is_primary: false,
    verified_at: new Date().toISOString(),
    status: 'active',
    label: 'Original'
  }
]

const { error } = await supabase
  .from('products')
  .update({
    affiliate_links: affiliateLinks,
    updated_at: new Date().toISOString()
  })
  .eq('slug', 'benriner-large-mandoline')

if (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}

console.log('✅ Updated benriner-large-mandoline with both links:')
console.log('   1. Large: https://amzn.to/47NKzE8 (primary)')
console.log('   2. Original: https://amzn.to/4hG8jO6')

// Verify
const { data } = await supabase
  .from('products')
  .select('affiliate_links')
  .eq('slug', 'benriner-large-mandoline')
  .single()

console.log('\n🔍 Verified:')
data?.affiliate_links?.forEach((link, i) => {
  console.log(`   ${i + 1}. ${link.label || link.merchant}: ${link.url}`)
})

console.log('\n✅ Done!\n')
