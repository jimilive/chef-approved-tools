#!/usr/bin/env node

/**
 * RESTORE FROM CACHE-BUSTING BACKUPS
 *
 * Restores all files from .cache-busting-backups/ to their original locations
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const BACKUP_DIR = '.cache-busting-backups'

console.log('\n🔄 RESTORING FILES FROM BACKUPS...\n')

const backups = readdirSync(BACKUP_DIR).filter(f => f.endsWith('.tsx'))
console.log(`Found ${backups.length} backup files\n`)

let restored = 0

for (const backup of backups) {
  // Extract original path from backup filename
  // Format: 2025-11-15T21-36-51-wood-vs-composite-cutting-board-page.tsx
  const match = backup.match(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-(.+)-page\.tsx$/)

  if (!match) {
    console.log(`⚠️  Skipping ${backup} - can't parse filename`)
    continue
  }

  const folderName = match[1]

  // Try blog first, then reviews
  let targetPath = `app/blog/${folderName}/page.tsx`
  if (!readdirSync('app/blog').includes(folderName)) {
    targetPath = `app/reviews/${folderName}/page.tsx`
  }

  try {
    const content = readFileSync(join(BACKUP_DIR, backup), 'utf-8')
    writeFileSync(targetPath, content, 'utf-8')
    console.log(`✅ Restored: ${targetPath}`)
    restored++
  } catch (error) {
    console.log(`❌ Error restoring ${backup}: ${error.message}`)
  }
}

console.log(`\n✅ COMPLETE: Restored ${restored}/${backups.length} files\n`)
