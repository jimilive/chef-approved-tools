#!/usr/bin/env node

/**
 * SAFE CACHE-BUSTING SCRIPT
 *
 * Adds these lines to blog posts and review pages:
 *
 * export const dynamic = 'force-dynamic'
 * export const revalidate = 0
 * export const fetchCache = 'force-no-store'
 *
 * SAFETY FEATURES:
 * - Creates backups before modifying files
 * - Dry-run mode to preview changes first
 * - Validates file structure before modifying
 * - Skips files that already have cache-busting
 * - Detailed logging of all changes
 *
 * USAGE:
 *   node scripts/add-cache-busting-SAFE.mjs --dry-run    # Preview changes
 *   node scripts/add-cache-busting-SAFE.mjs              # Apply changes
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { globSync } from 'glob'
import { dirname, basename } from 'path'

// Parse command line args
const isDryRun = process.argv.includes('--dry-run')

const CACHE_BUSTING_CODE = `// CACHE-BUSTING: Prevent Next.js from serving stale HTML
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

`

const BACKUP_DIR = '.cache-busting-backups'

function createBackup(filePath) {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]
    const backupPath = `${BACKUP_DIR}/${timestamp}-${basename(dirname(filePath))}-page.tsx`

    // Create backup directory if it doesn't exist
    mkdirSync(BACKUP_DIR, { recursive: true })

    // Copy original file to backup
    const content = readFileSync(filePath, 'utf-8')
    writeFileSync(backupPath, content, 'utf-8')

    return backupPath
  } catch (error) {
    console.error(`❌ ERROR creating backup for ${filePath}:`, error.message)
    return null
  }
}

function validateFileStructure(content, filePath) {
  // Basic validation: file should have imports and exports
  const hasImports = content.includes('import ')
  const hasExports = content.includes('export ')

  if (!hasImports || !hasExports) {
    console.error(`⚠️  WARNING: ${filePath} has unusual structure - skipping for safety`)
    return false
  }

  return true
}

function findInsertionPoint(content) {
  const lines = content.split('\n')
  let lastImportOrConstIndex = -1

  // Find the last import statement OR top-level const that ends with ]);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Track import lines
    if (line.startsWith('import ')) {
      lastImportOrConstIndex = i
    }

    // Track multi-line const declarations that end with ]); or });
    // These are typically schema objects: const faqSchema = generateFAQSchema([...]);
    if (line === ']);' || line === '});') {
      lastImportOrConstIndex = i
    }

    // Stop at first function or default export
    if (line.startsWith('export default function ') || line.startsWith('export default async function ')) {
      break
    }
  }

  // Insert after the last import or const declaration
  let insertIndex = lastImportOrConstIndex + 1

  // Skip any blank lines
  while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
    insertIndex++
  }

  return insertIndex
}

function addCacheBusting(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')

    // Check if cache-busting already exists
    if (content.includes("export const dynamic = 'force-dynamic'")) {
      console.log(`⏭️  SKIP: ${filePath}`)
      console.log(`   Reason: Already has cache-busting\n`)
      return { status: 'skipped', reason: 'already-exists' }
    }

    // Validate file structure
    if (!validateFileStructure(content, filePath)) {
      return { status: 'skipped', reason: 'invalid-structure' }
    }

    // Find insertion point
    const insertIndex = findInsertionPoint(content)
    const lines = content.split('\n')

    if (isDryRun) {
      console.log(`📝 DRY-RUN: Would modify ${filePath}`)
      console.log(`   Insert after line ${insertIndex}: "${lines[insertIndex - 1]?.substring(0, 60)}..."`)
      console.log(`   Add: ${CACHE_BUSTING_CODE.split('\n')[0]}`)
      console.log(`        + 2 more lines\n`)
      return { status: 'would-fix', insertIndex }
    }

    // Create backup
    const backupPath = createBackup(filePath)
    if (!backupPath) {
      return { status: 'error', reason: 'backup-failed' }
    }

    // Insert cache-busting code
    lines.splice(insertIndex, 0, CACHE_BUSTING_CODE)

    // Write back
    writeFileSync(filePath, lines.join('\n'), 'utf-8')

    console.log(`✅ FIXED: ${filePath}`)
    console.log(`   Backup: ${backupPath}`)
    console.log(`   Inserted after line ${insertIndex}\n`)

    return { status: 'fixed', backupPath }

  } catch (error) {
    console.error(`❌ ERROR processing ${filePath}:`, error.message)
    return { status: 'error', reason: error.message }
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

console.log('\n' + '='.repeat(70))
console.log(`🚀 CACHE-BUSTING SCRIPT ${isDryRun ? '(DRY-RUN MODE)' : ''}`)
console.log('='.repeat(70) + '\n')

if (isDryRun) {
  console.log('⚠️  DRY-RUN MODE: No files will be modified')
  console.log('   Remove --dry-run flag to apply changes\n')
}

// Find all blog post page.tsx files
const blogPosts = globSync('app/blog/*/page.tsx')
console.log(`🔍 Found ${blogPosts.length} blog posts\n`)

const blogResults = {
  fixed: 0,
  skipped: 0,
  errors: 0,
  wouldFix: 0
}

for (const file of blogPosts) {
  const result = addCacheBusting(file)
  if (result.status === 'fixed') blogResults.fixed++
  else if (result.status === 'skipped') blogResults.skipped++
  else if (result.status === 'error') blogResults.errors++
  else if (result.status === 'would-fix') blogResults.wouldFix++
}

// Find all review page.tsx files
const reviews = globSync('app/reviews/*/page.tsx')
console.log(`\n🔍 Found ${reviews.length} review pages\n`)

const reviewResults = {
  fixed: 0,
  skipped: 0,
  errors: 0,
  wouldFix: 0
}

for (const file of reviews) {
  const result = addCacheBusting(file)
  if (result.status === 'fixed') reviewResults.fixed++
  else if (result.status === 'skipped') reviewResults.skipped++
  else if (result.status === 'error') reviewResults.errors++
  else if (result.status === 'would-fix') reviewResults.wouldFix++
}

// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n' + '='.repeat(70))
console.log(`${isDryRun ? '📊 DRY-RUN SUMMARY' : '✅ EXECUTION COMPLETE'}`)
console.log('='.repeat(70))

if (isDryRun) {
  console.log(`\nBlog Posts:`)
  console.log(`  Would fix: ${blogResults.wouldFix}`)
  console.log(`  Would skip: ${blogResults.skipped}`)
  console.log(`  Errors: ${blogResults.errors}`)

  console.log(`\nReview Pages:`)
  console.log(`  Would fix: ${reviewResults.wouldFix}`)
  console.log(`  Would skip: ${reviewResults.skipped}`)
  console.log(`  Errors: ${reviewResults.errors}`)

  console.log(`\nTotal changes: ${blogResults.wouldFix + reviewResults.wouldFix} files`)
  console.log(`\n✅ Run without --dry-run to apply these changes`)
} else {
  console.log(`\nBlog Posts:`)
  console.log(`  Fixed: ${blogResults.fixed}`)
  console.log(`  Skipped: ${blogResults.skipped}`)
  console.log(`  Errors: ${blogResults.errors}`)

  console.log(`\nReview Pages:`)
  console.log(`  Fixed: ${reviewResults.fixed}`)
  console.log(`  Skipped: ${reviewResults.skipped}`)
  console.log(`  Errors: ${reviewResults.errors}`)

  console.log(`\nTotal modified: ${blogResults.fixed + reviewResults.fixed} files`)

  if (blogResults.fixed + reviewResults.fixed > 0) {
    console.log(`\n💾 Backups saved to: ${BACKUP_DIR}/`)
    console.log(`\n🔥 Next.js caching nightmare ENDED.`)
  }
}

console.log('\n' + '='.repeat(70) + '\n')

// Exit with error code if any errors occurred
if (blogResults.errors + reviewResults.errors > 0) {
  process.exit(1)
}
