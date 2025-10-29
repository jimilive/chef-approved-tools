#!/usr/bin/env node
/**
 * Comprehensive Site Integrity Validator
 *
 * This script validates:
 * 1. Product slugs match between filesystem, database, and page content
 * 2. Internal links point to valid pages
 * 3. Canonical URLs match actual page routes
 * 4. Product fetches in pages will succeed
 * 5. No broken getProductBySlug() calls
 *
 * Run before deployment to catch issues like the Vitamix 404
 */

import { createClient } from '@supabase/supabase-js'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ANSI color codes
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

let errors = 0
let warnings = 0

console.log(`${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║   SITE INTEGRITY VALIDATION - STARTING    ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

// ============================================================================
// 1. VALIDATE PRODUCT SLUGS (Filesystem vs Database)
// ============================================================================
console.log(`${BOLD}1. Validating Product Slugs...${RESET}`)

const { data: products, error: dbError } = await supabase
  .from('products')
  .select('slug, name')

if (dbError) {
  console.error(`${RED}✗ Database connection failed:${RESET}`, dbError.message)
  process.exit(1)
}

const reviewsDir = './app/reviews'
const reviewFolders = readdirSync(reviewsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

const dbSlugs = new Set(products.map(p => p.slug))
const slugMismatches = []

reviewFolders.forEach(folder => {
  if (!dbSlugs.has(folder)) {
    const similar = products.find(p =>
      p.slug.includes(folder) || folder.includes(p.slug)
    )
    slugMismatches.push({
      folder,
      dbSlug: similar?.slug || 'NOT FOUND',
      productName: similar?.name || 'N/A'
    })
  }
})

if (slugMismatches.length === 0) {
  console.log(`${GREEN}✓ All ${reviewFolders.length} review folders match database slugs${RESET}`)
} else {
  errors += slugMismatches.length
  console.log(`${RED}✗ Found ${slugMismatches.length} slug mismatch(es):${RESET}`)
  slugMismatches.forEach(m => {
    console.log(`  ${RED}•${RESET} Folder: ${YELLOW}${m.folder}${RESET}`)
    console.log(`    Expected: ${GREEN}${m.dbSlug}${RESET}`)
    console.log(`    Product: ${m.productName}`)
  })
}

// ============================================================================
// 2. VALIDATE getProductBySlug() CALLS MATCH DATABASE
// ============================================================================
console.log(`\n${BOLD}2. Validating getProductBySlug() calls...${RESET}`)

const pageFiles = reviewFolders.map(folder => ({
  folder,
  path: join(reviewsDir, folder, 'page.tsx')
})).filter(f => existsSync(f.path))

let slugCallIssues = []

pageFiles.forEach(({ folder, path }) => {
  const content = readFileSync(path, 'utf-8')

  // Find getProductBySlug calls
  const regex = /getProductBySlug\(['"`]([^'"`]+)['"`]\)/g
  const matches = [...content.matchAll(regex)]

  matches.forEach(match => {
    const slugInCode = match[1]
    if (!dbSlugs.has(slugInCode)) {
      slugCallIssues.push({
        file: `app/reviews/${folder}/page.tsx`,
        slugInCode,
        issue: 'Slug not found in database - will cause 404!'
      })
      errors++
    } else if (slugInCode !== folder) {
      // Check if this is a related product fetch (common pattern: const relatedProduct = await getProductBySlug(...))
      const isRelatedProduct = content.includes('relatedProduct') && content.includes(`getProductBySlug('${slugInCode}')`)

      if (!isRelatedProduct) {
        slugCallIssues.push({
          file: `app/reviews/${folder}/page.tsx`,
          slugInCode,
          issue: `Slug mismatch: folder is "${folder}" but code uses "${slugInCode}"`
        })
        warnings++
      }
    }
  })
})

if (slugCallIssues.length === 0) {
  console.log(`${GREEN}✓ All getProductBySlug() calls are valid${RESET}`)
} else {
  console.log(`${RED}✗ Found ${slugCallIssues.length} issue(s) with getProductBySlug():${RESET}`)
  slugCallIssues.forEach(issue => {
    const color = issue.issue.includes('404') ? RED : YELLOW
    console.log(`  ${color}•${RESET} ${issue.file}`)
    console.log(`    Slug: ${YELLOW}${issue.slugInCode}${RESET}`)
    console.log(`    Issue: ${issue.issue}`)
  })
}

// ============================================================================
// 3. VALIDATE CANONICAL URLs
// ============================================================================
console.log(`\n${BOLD}3. Validating Canonical URLs...${RESET}`)

let canonicalIssues = []

pageFiles.forEach(({ folder, path }) => {
  const content = readFileSync(path, 'utf-8')

  // Find canonical URL
  const canonicalMatch = content.match(/canonical:\s*['"`](https:\/\/[^'"`]+)['"`]/)
  if (canonicalMatch) {
    const canonicalUrl = canonicalMatch[1]
    const expectedUrl = `https://www.chefapprovedtools.com/reviews/${folder}`

    if (canonicalUrl !== expectedUrl) {
      canonicalIssues.push({
        file: `app/reviews/${folder}/page.tsx`,
        current: canonicalUrl,
        expected: expectedUrl
      })
      errors++
    }
  } else {
    canonicalIssues.push({
      file: `app/reviews/${folder}/page.tsx`,
      current: 'NOT FOUND',
      expected: `https://www.chefapprovedtools.com/reviews/${folder}`
    })
    warnings++
  }
})

if (canonicalIssues.length === 0) {
  console.log(`${GREEN}✓ All canonical URLs are correct${RESET}`)
} else {
  console.log(`${RED}✗ Found ${canonicalIssues.length} canonical URL issue(s):${RESET}`)
  canonicalIssues.forEach(issue => {
    const color = issue.current === 'NOT FOUND' ? YELLOW : RED
    console.log(`  ${color}•${RESET} ${issue.file}`)
    console.log(`    Current: ${YELLOW}${issue.current}${RESET}`)
    console.log(`    Expected: ${GREEN}${issue.expected}${RESET}`)
  })
}

// ============================================================================
// 4. VALIDATE INTERNAL LINKS
// ============================================================================
console.log(`\n${BOLD}4. Validating Internal Review Links...${RESET}`)

const allFiles = []
function findFiles(dir) {
  const items = readdirSync(dir, { withFileTypes: true })
  items.forEach(item => {
    const fullPath = join(dir, item.name)
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      findFiles(fullPath)
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      allFiles.push(fullPath)
    }
  })
}

findFiles('./app')
findFiles('./components')

let brokenLinks = []
const validReviewSlugs = new Set(reviewFolders)

allFiles.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8')

  // Find all /reviews/ links
  const linkRegex = /(?:href|to)=['"`]\/reviews\/([a-z0-9-]+)['"`]/g
  const matches = [...content.matchAll(linkRegex)]

  matches.forEach(match => {
    const slug = match[1]
    if (!validReviewSlugs.has(slug)) {
      // Check if there's a redirect for it
      const redirectsContent = readFileSync('./next.config.js', 'utf-8')
      const hasRedirect = redirectsContent.includes(`source: '/reviews/${slug}'`)

      if (!hasRedirect) {
        brokenLinks.push({
          file: filePath.replace(/^\.\//, ''),
          slug,
          issue: 'Points to non-existent review page (no redirect found)'
        })
        errors++
      }
    }
  })
})

if (brokenLinks.length === 0) {
  console.log(`${GREEN}✓ All internal review links are valid${RESET}`)
} else {
  console.log(`${RED}✗ Found ${brokenLinks.length} potentially broken link(s):${RESET}`)
  brokenLinks.forEach(link => {
    console.log(`  ${RED}•${RESET} ${link.file}`)
    console.log(`    Link: ${YELLOW}/reviews/${link.slug}${RESET}`)
    console.log(`    Issue: ${link.issue}`)
  })
}

// ============================================================================
// 5. VALIDATE LEGACY PRODUCT DATA SLUGS
// ============================================================================
console.log(`\n${BOLD}5. Validating Legacy Product Data...${RESET}`)

let legacySlugIssues = []

pageFiles.forEach(({ folder, path }) => {
  const content = readFileSync(path, 'utf-8')

  // Find legacyProductData.slug
  const legacyMatch = content.match(/const\s+legacyProductData\s*=\s*{[^}]*slug:\s*['"`]([^'"`]+)['"`]/)
  if (legacyMatch) {
    const legacySlug = legacyMatch[1]
    if (legacySlug !== folder) {
      legacySlugIssues.push({
        file: `app/reviews/${folder}/page.tsx`,
        legacySlug,
        folder,
        issue: 'Legacy slug does not match folder name'
      })
      errors++
    }
  }
})

if (legacySlugIssues.length === 0) {
  console.log(`${GREEN}✓ All legacy product data slugs match folder names${RESET}`)
} else {
  console.log(`${RED}✗ Found ${legacySlugIssues.length} legacy slug issue(s):${RESET}`)
  legacySlugIssues.forEach(issue => {
    console.log(`  ${RED}•${RESET} ${issue.file}`)
    console.log(`    Legacy slug: ${YELLOW}${issue.legacySlug}${RESET}`)
    console.log(`    Folder: ${GREEN}${issue.folder}${RESET}`)
  })
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log(`\n${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║           VALIDATION SUMMARY               ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

if (errors === 0 && warnings === 0) {
  console.log(`${BOLD}${GREEN}✓✓✓ ALL CHECKS PASSED! Site integrity verified.${RESET}\n`)
  process.exit(0)
} else {
  if (errors > 0) {
    console.log(`${BOLD}${RED}✗ ${errors} ERROR(S) found - MUST FIX before deployment!${RESET}`)
  }
  if (warnings > 0) {
    console.log(`${BOLD}${YELLOW}⚠ ${warnings} WARNING(S) found - should review${RESET}`)
  }
  console.log('')
  process.exit(errors > 0 ? 1 : 0)
}
