#!/usr/bin/env node
/**
 * PREVIEW ONLY - Shows what would change without actually modifying files
 */

import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

const BLOG_DIR = './app/blog'

// Links to fix (map to actual products)
const linkFixes = {
  'victorinox-fibrox-8-inch-chef-knife': 'victorinox-fibrox-8-inch-chefs-knife',
  'victorinox-fibrox-8-inch-chef-knife-review': 'victorinox-fibrox-8-inch-chefs-knife',
  'victorinox-fibrox-chef-knife': 'victorinox-fibrox-10-inch-chefs-knife',
  'rubbermaid-commercial-cooks-scraper-review': 'rubbermaid-commercial-cooks-scraper',
  'lodge-cast-iron-skillet-bundle': 'lodge-seasoned-cast-iron-3-skillet-bundle',
  'lodge-cast-iron-skillet-review': 'lodge-seasoned-cast-iron-3-skillet-bundle',
  'lodge-cast-iron-skillet': 'lodge-seasoned-cast-iron-3-skillet-bundle',
  'john-boos-platinum-cutting-board': 'john-boos-platinum-commercial-cutting-board',
  'nordic-ware-half-sheet-pan-review': 'nordic-ware-half-sheet-pan',
  'le-creuset-7-25-qt-dutch-oven': 'le-creuset-signature-7-25-qt-dutch-oven',
}

// Links to remove (products don't exist)
const linksToRemove = [
  'spider-strainer-review',
  'thermoworks-thermapen-one-review',
  'cambro-4-qt-square-containers-review',
  'all-clad-d3-10-inch-skillet-review',
  'made-in-stainless-saucier-review',
  'lodge-5-quart-enameled-dutch-oven-review',
]

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

console.log('=== PREVIEW OF CHANGES (NO FILES WILL BE MODIFIED) ===\n')

let totalFixes = 0
let totalRemovals = 0

blogPosts.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8')
  let hasChanges = false
  const changes = []

  // Check for fixable links
  Object.entries(linkFixes).forEach(([broken, correct]) => {
    if (content.includes(`/reviews/${broken}"`)) {
      changes.push(`  FIX: /reviews/${broken} → /reviews/${correct}`)
      totalFixes++
      hasChanges = true
    }
  })

  // Check for removable links
  linksToRemove.forEach(slug => {
    if (content.includes(`/reviews/${slug}"`)) {
      const linkMatch = content.match(new RegExp(`<[^>]*href="/reviews/${slug}"[^>]*>([^<]+)</[^>]+>`))
      if (linkMatch) {
        changes.push(`  REMOVE LINK: "${linkMatch[1]}" (product doesn't exist)`)
        totalRemovals++
        hasChanges = true
      }
    }
  })

  if (hasChanges) {
    console.log(`${filePath.replace('./app/blog/', '')}`)
    changes.forEach(c => console.log(c))
    console.log('')
  }
})

console.log('=== SUMMARY ===')
console.log(`${totalFixes} links would be fixed`)
console.log(`${totalRemovals} links would be removed`)
console.log(`\nTo apply changes, run: node scripts/remove-bad-blog-links.mjs`)
