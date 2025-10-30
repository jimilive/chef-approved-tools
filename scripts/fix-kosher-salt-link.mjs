#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('🔧 Fixing Diamond Crystal Kosher Salt affiliate link...\n')

// Update the link
const { data, error } = await supabase
  .from('products')
  .update({
    affiliate_links: [
      {
        merchant: 'amazon',
        url: 'https://amzn.to/4hEzEA6',
        isPrimary: true
      }
    ],
    updated_at: new Date().toISOString()
  })
  .eq('slug', 'diamond-crystal-kosher-salt')
  .select()

if (error) {
  console.error('❌ Error updating:', error)
  process.exit(1)
}

console.log('✅ Updated diamond-crystal-kosher-salt')
console.log('   Old (wrong): https://amzn.to/4o6pPwW → Chef Knife')
console.log('   New (correct): https://amzn.to/4hEzEA6 → Kosher Salt')
console.log('\n✅ Link fixed in Supabase!\n')
