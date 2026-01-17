/**
 * Sync Images from lib/images.ts Registry to Supabase
 *
 * This script syncs the `images.primary` field in Supabase with the
 * hero/og images defined in lib/images.ts.
 *
 * SAFETY: Runs in DRY RUN mode by default. Pass --execute to make changes.
 *
 * Usage:
 *   npx tsx scripts/sync-images-to-supabase.ts          # Dry run (shows changes)
 *   npx tsx scripts/sync-images-to-supabase.ts --execute # Actually make changes
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'
import { productImages } from '../lib/images'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// Check if --execute flag was passed
const isExecuteMode = process.argv.includes('--execute')

interface ProductUpdate {
  slug: string
  name: string
  currentImage: string | null
  newImage: string
}

async function syncImagesToSupabase() {
  console.log('\n========================================')
  console.log(isExecuteMode
    ? '🚀 EXECUTE MODE - Changes will be made to Supabase'
    : '🔍 DRY RUN MODE - No changes will be made'
  )
  console.log('========================================\n')

  // 1. Fetch all products from Supabase
  const { data: products, error } = await supabase
    .from('products')
    .select('slug, name, images')
    .order('slug')

  if (error) {
    console.error('Error fetching products:', error)
    return
  }

  console.log(`Found ${products.length} products in Supabase\n`)

  // 2. Find products that need updating
  const updates: ProductUpdate[] = []
  const skipped: string[] = []
  const noRegistryImage: string[] = []

  for (const product of products) {
    const registryEntry = productImages[product.slug]

    // Get the best image from registry (hero > og > first gallery image)
    const registryImage = registryEntry?.hero || registryEntry?.og || registryEntry?.gallery?.[0]

    if (!registryImage) {
      // No image in registry for this product
      noRegistryImage.push(product.slug)
      continue
    }

    const currentImage = product.images?.primary || null

    // Check if update is needed
    if (currentImage === registryImage) {
      skipped.push(product.slug)
      continue
    }

    updates.push({
      slug: product.slug,
      name: product.name,
      currentImage,
      newImage: registryImage
    })
  }

  // 3. Report findings
  console.log('📊 SUMMARY:')
  console.log(`   Products with registry images that need updating: ${updates.length}`)
  console.log(`   Products already in sync: ${skipped.length}`)
  console.log(`   Products with no registry image (skipped): ${noRegistryImage.length}`)
  console.log('')

  if (updates.length === 0) {
    console.log('✅ All products with registry images are already in sync!')
    return
  }

  // 4. Show what will be changed
  console.log('📝 CHANGES TO BE MADE:\n')
  updates.forEach((update, i) => {
    console.log(`${i + 1}. ${update.slug}`)
    console.log(`   Name: ${update.name}`)
    console.log(`   BEFORE: ${update.currentImage || '(empty)'}`)
    console.log(`   AFTER:  ${update.newImage}`)
    console.log('')
  })

  // 5. Execute if in execute mode
  if (!isExecuteMode) {
    console.log('========================================')
    console.log('⚠️  DRY RUN COMPLETE - No changes made')
    console.log('    To apply these changes, run:')
    console.log('    npx tsx scripts/sync-images-to-supabase.ts --execute')
    console.log('========================================\n')
    return
  }

  // Execute updates one at a time
  console.log('========================================')
  console.log('🚀 EXECUTING UPDATES...')
  console.log('========================================\n')

  let successCount = 0
  let failCount = 0

  for (const update of updates) {
    const newImages = {
      primary: update.newImage,
      alt: update.name
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ images: newImages })
      .eq('slug', update.slug)

    if (updateError) {
      console.log(`❌ FAILED: ${update.slug}`)
      console.log(`   Error: ${updateError.message}`)
      failCount++
    } else {
      console.log(`✅ Updated: ${update.slug}`)
      console.log(`   images.primary = ${update.newImage}`)
      successCount++
    }
  }

  console.log('\n========================================')
  console.log('📊 EXECUTION COMPLETE')
  console.log(`   Successful: ${successCount}`)
  console.log(`   Failed: ${failCount}`)
  console.log('========================================\n')
}

syncImagesToSupabase()
