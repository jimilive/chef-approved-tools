#!/usr/bin/env node
/**
 * Fix broken blog links and generate redirects
 *
 * This script:
 * 1. Finds all broken /reviews/ links in blog posts
 * 2. Maps them to actual review folder names
 * 3. Generates redirect rules for next.config.js
 * 4. Optionally fixes the links in the blog files
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const BLOG_DIR = './app/blog'
const REVIEWS_DIR = './app/reviews'

// Get all valid review slugs
const validReviewSlugs = readdirSync(REVIEWS_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

// Get all blog post files
const blogPosts = []
function findBlogPosts(dir) {
  const items = readdirSync(dir, { withFileTypes: true })
  items.forEach(item => {
    const fullPath = join(dir, item.name)
    if (item.isDirectory() && !item.name.startsWith('.')) {
      findBlogPosts(fullPath)
    } else if (item.name === 'page.tsx') {
      blogPosts.push(fullPath)
    }
  })
}
findBlogPosts(BLOG_DIR)

console.log(`Found ${blogPosts.length} blog posts`)
console.log(`Found ${validReviewSlugs.length} valid review slugs\n`)

// Find all broken links and map to correct ones
const brokenLinksMap = new Map()
const linkPattern = /(?:href|to)=['"`]\/reviews\/([a-z0-9-]+)['"`]/g

blogPosts.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8')
  const matches = [...content.matchAll(linkPattern)]

  matches.forEach(match => {
    const slug = match[1]
    if (!validReviewSlugs.includes(slug)) {
      // Try to find the correct slug
      let correctSlug = null

      // Common patterns:
      // 1. Remove "-review" suffix
      const withoutReview = slug.replace(/-review$/, '')
      if (validReviewSlugs.includes(withoutReview)) {
        correctSlug = withoutReview
      }

      // 2. Try adding "s" to make plural (chef-knife -> chefs-knife)
      if (!correctSlug) {
        const variations = [
          withoutReview.replace('chef-knife', 'chefs-knife'),
          withoutReview.replace('cutting-board', 'commercial-cutting-board'),
          withoutReview.replace('cast-iron-skillet', 'cast-iron-skillet-12-inch'),
        ]
        for (const variant of variations) {
          if (validReviewSlugs.includes(variant)) {
            correctSlug = variant
            break
          }
        }
      }

      // 3. Fuzzy match - find closest slug
      if (!correctSlug) {
        const slugWords = withoutReview.split('-')
        for (const validSlug of validReviewSlugs) {
          const validWords = validSlug.split('-')
          const matchCount = slugWords.filter(w => validWords.includes(w)).length
          if (matchCount >= Math.min(3, slugWords.length - 1)) {
            correctSlug = validSlug
            break
          }
        }
      }

      if (!brokenLinksMap.has(slug)) {
        brokenLinksMap.set(slug, {
          correctSlug,
          occurrences: 0,
          files: []
        })
      }
      const entry = brokenLinksMap.get(slug)
      entry.occurrences++
      if (!entry.files.includes(filePath)) {
        entry.files.push(filePath)
      }
    }
  })
})

console.log('=== BROKEN LINKS ANALYSIS ===\n')
console.log(`Found ${brokenLinksMap.size} unique broken links\n`)

const redirects = []
const cannotMap = []

brokenLinksMap.forEach((info, brokenSlug) => {
  console.log(`${brokenSlug}`)
  console.log(`  Occurrences: ${info.occurrences}`)
  console.log(`  Suggested: ${info.correctSlug || 'NOT FOUND'}`)
  console.log(`  Files: ${info.files.length}`)
  console.log('')

  if (info.correctSlug) {
    redirects.push({
      source: `/reviews/${brokenSlug}`,
      destination: `/reviews/${info.correctSlug}`,
      permanent: true
    })
  } else {
    cannotMap.push(brokenSlug)
  }
})

console.log('\n=== REDIRECT RULES ===\n')
console.log('Add these to next.config.js redirects:\n')
console.log(JSON.stringify(redirects, null, 2))

if (cannotMap.length > 0) {
  console.log('\n=== CANNOT AUTO-MAP ===')
  console.log('These need manual review:\n')
  cannotMap.forEach(slug => console.log(`  - ${slug}`))
}

console.log(`\n✓ ${redirects.length} redirects ready to add`)
console.log(`✗ ${cannotMap.length} need manual mapping`)

// Write redirects to a file
writeFileSync(
  './scripts/blog-link-redirects.json',
  JSON.stringify(redirects, null, 2)
)
console.log('\nRedirects saved to scripts/blog-link-redirects.json')
