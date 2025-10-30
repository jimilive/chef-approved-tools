#!/usr/bin/env node
/**
 * Fix Victorinox Offset Bread Knife Link
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('🔧 Fixing Victorinox Offset Bread Knife link...\n')

const { error } = await supabase
  .from('products')
  .update({
    affiliate_links: [{
      url: 'https://amzn.to/47NKm3O',
      merchant: 'amazon',
      tag: 'chefapprovedt-20',
      is_primary: true,
      verified_at: new Date().toISOString(),
      status: 'active'
    }],
    updated_at: new Date().toISOString()
  })
  .eq('slug', 'victorinox-offset-bread-knife')

if (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}

console.log('✅ Updated victorinox-offset-bread-knife')
console.log('   Link: https://amzn.to/47NKm3O\n')
