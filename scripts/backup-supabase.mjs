#!/usr/bin/env node

/**
 * Backup Supabase database (Free Plan workaround)
 *
 * Exports all products table data to JSON file
 * Run: node scripts/backup-supabase.mjs
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

// Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function backupProducts() {
  console.log('🔄 Backing up products table...')

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('❌ Backup failed:', error)
    process.exit(1)
  }

  // Create backup directory if it doesn't exist
  const backupDir = path.join(__dirname, '..', 'supabase-backups')
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')
  const dateStr = timestamp[0]
  const timeStr = timestamp[1].split('Z')[0]
  const filename = path.join(backupDir, `products-backup-${dateStr}-${timeStr}.json`)

  // Write backup file
  fs.writeFileSync(filename, JSON.stringify(data, null, 2))

  console.log('✅ Backup completed successfully!')
  console.log(`📁 File: ${filename}`)
  console.log(`📊 Products backed up: ${data.length}`)
  console.log(`💾 File size: ${(fs.statSync(filename).size / 1024).toFixed(2)} KB`)

  // Show sample of what was backed up
  console.log('\n📋 Sample product (first in backup):')
  console.log(`   - ${data[0]?.name} (${data[0]?.brand})`)
  console.log(`   - Affiliate links: ${data[0]?.affiliate_links?.length || 0}`)
  console.log(`   - Rating: ${data[0]?.expert_rating || 'N/A'}`)
}

// Run backup
backupProducts().catch(error => {
  console.error('❌ Unexpected error:', error)
  process.exit(1)
})
