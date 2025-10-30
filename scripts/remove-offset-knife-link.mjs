#!/usr/bin/env node
/**
 * Remove Offset Bread Knife Link (Not on Amazon)
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('🔧 Removing Offset Bread Knife affiliate link (not available on Amazon)\n')

const { error } = await supabase
  .from('products')
  .update({
    affiliate_links: [],
    updated_at: new Date().toISOString()
  })
  .eq('slug', 'victorinox-offset-bread-knife')

if (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}

console.log('✅ Removed affiliate link from victorinox-offset-bread-knife')
console.log('   Product page will show "Currently Unavailable" instead of broken link\n')

// Verify
const { data } = await supabase
  .from('products')
  .select('slug, affiliate_links')
  .eq('slug', 'victorinox-offset-bread-knife')
  .single()

console.log('🔍 Verified:')
console.log(`   Affiliate links: ${data?.affiliate_links?.length || 0}`)
console.log()
