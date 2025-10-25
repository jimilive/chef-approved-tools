#!/usr/bin/env tsx
/**
 * Fix category name capitalization inconsistencies
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixCategories() {
  console.log('🔧 Fixing category name capitalization...\n')

  const fixes = [
    { from: 'knives', to: 'Knives' },
    { from: 'appliances', to: 'Appliances' },
    { from: 'cookware', to: 'Cookware' },
  ]

  for (const { from, to } of fixes) {
    const { data, error } = await supabase
      .from('products')
      .update({ category: to })
      .eq('category', from)
      .select('slug')

    if (error) {
      console.error(`❌ Error updating ${from} -> ${to}:`, error.message)
    } else if (data && data.length > 0) {
      console.log(`✅ Updated ${data.length} products: "${from}" -> "${to}"`)
      data.forEach(p => console.log(`   - ${p.slug}`))
    } else {
      console.log(`⏭️  No products with category "${from}"`)
    }
  }

  // Verify final state
  console.log('\n📊 Final category breakdown:')
  const { data: all } = await supabase.from('products').select('category')
  const counts: Record<string, number> = {}
  all?.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1
  })

  Object.entries(counts).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`)
  })
}

fixCategories().catch(console.error)
