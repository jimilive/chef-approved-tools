#!/usr/bin/env node
/**
 * Test Link Redirects
 * Check where each affiliate link actually redirects to
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvlbhphozxjmkszxjwj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxiaHBob3p4am1rc3p4andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTA5NjUsImV4cCI6MjA3NjgyNjk2NX0.1RC_AJNa9JhyaxuXhvKlw0eDwPwMuOfwfppXZ6Y2fVM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Products the user mentioned as broken
const PRODUCTS_TO_CHECK = [
  'vitamix-5200-professional-blender',
  'lodge-seasoned-cast-iron-3-skillet-bundle',
  'cuisinart-dlc-10c-classic-food-processor',
  'victorinox-offset-bread-knife',
  'diamond-crystal-kosher-salt',
  'black-decker-toaster-oven'
]

console.log('🔍 Testing Link Redirects for Potentially Broken Products\n')

async function testRedirect(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow'
    })
    return response.url
  } catch (error) {
    return `Error: ${error.message}`
  }
}

for (const slug of PRODUCTS_TO_CHECK) {
  const { data } = await supabase
    .from('products')
    .select('slug, name, affiliate_links')
    .eq('slug', slug)
    .single()

  if (!data) {
    console.log(`❌ ${slug} - NOT FOUND IN SUPABASE\n`)
    continue
  }

  console.log(`📦 ${data.name}`)
  console.log(`   Slug: ${slug}`)

  if (data.affiliate_links && data.affiliate_links.length > 0) {
    const amazonLink = data.affiliate_links.find(l => l.merchant === 'amazon')
    if (amazonLink) {
      console.log(`   Short URL: ${amazonLink.url}`)
      const finalUrl = await testRedirect(amazonLink.url)
      console.log(`   Redirects to: ${finalUrl}`)

      // Check if it goes to Amazon homepage
      if (finalUrl.includes('amazon.com/?') || finalUrl === 'https://www.amazon.com/' || finalUrl.includes('amazon.com/ref=')) {
        console.log(`   ⚠️  WARNING: Goes to Amazon homepage!`)
      } else {
        console.log(`   ✅ Goes to specific product page`)
      }
    } else {
      console.log(`   ⚠️  No Amazon link found`)
    }
  } else {
    console.log(`   ❌ No affiliate links!`)
  }

  console.log()
}

console.log('✅ Done!\n')
