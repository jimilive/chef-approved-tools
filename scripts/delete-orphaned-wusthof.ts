import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function deleteOrphanedProduct() {
  console.log('🗑️  Deleting orphaned Wusthof sample product...\n')
  
  // First, check what we're about to delete
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', 'wusthof-classic-8-chef-knife')
    .single()
  
  if (fetchError || !product) {
    console.log('⚠️  Product not found - may already be deleted')
    return
  }
  
  console.log('Found orphaned product:')
  console.log(`  Name: ${product.name}`)
  console.log(`  Slug: ${product.slug}`)
  console.log(`  (No review page exists for this product)\n`)
  
  // Delete it
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('slug', 'wusthof-classic-8-chef-knife')
  
  if (deleteError) {
    console.error('❌ Error deleting product:', deleteError)
    process.exit(1)
  } else {
    console.log('✅ Orphaned product deleted successfully!')
    console.log('   Your admin dashboard now only shows real products\n')
  }
}

deleteOrphanedProduct()
