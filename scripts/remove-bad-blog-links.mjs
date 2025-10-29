#!/usr/bin/env node
/**
 * Remove links to non-existent product reviews from blog posts
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs'
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
  'john-boos-reversible-maple-board-review': 'john-boos-platinum-commercial-cutting-board',
  'john-boos-maple-reversible-board-review': 'john-boos-platinum-commercial-cutting-board',
  'nordic-ware-half-sheet-pan-review': 'nordic-ware-half-sheet-pan',
  'nordic-ware-sheet-pan-review': 'nordic-ware-half-sheet-pan',
  'le-creuset-7-25-qt-dutch-oven': 'le-creuset-signature-7-25-qt-dutch-oven',
  'cuisinart-saute-pan': 'cuisinart-8-inch-nonstick-pan',
}

// Links to remove (products don't exist)
const linksToRemove = [
  'spider-strainer-review',
  'thermoworks-thermapen-one-review',
  'thermapen-thermometer',
  'thermopro-tp19',
  'cambro-4-qt-square-containers-review',
  'cambro-1-qt-containers-review',
  'cambro-2-qt-containers-review',
  'cambro-2-qt-storage-container-review',
  'cambro-containers-review',
  'all-clad-d3-10-inch-skillet-review',
  'all-clad-d3-stainless-10-inch-review',
  'all-clad-d3-stainless-10-inch-skillet-review',
  'all-clad-d3-stainless-skillet-review',
  'made-in-stainless-saucier-review',
  'lodge-5-quart-enameled-dutch-oven-review',
  'lodge-6-qt-enameled-dutch-oven-review',
  'lodge-enameled-dutch-oven-review',
  'magnetic-knife-strip-review',
  'bamboo-knife-drawer-insert-review',
  'professional-knife-roll-review',
  'food-grade-mineral-oil-review',
  'best-stockpots',
  'large-stockpot-review',
  'oxo-good-grips-12-inch-tongs-review',
  'oxo-good-grips-tongs-review',
  'oxo-fine-mesh-strainer-review',
  'checkered-chef-sheet-pans-review',
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

let filesModified = 0
let linksFixed = 0
let linksRemoved = 0

blogPosts.forEach(filePath => {
  let content = readFileSync(filePath, 'utf-8')
  let modified = false

  // Fix links that map to actual products
  Object.entries(linkFixes).forEach(([broken, correct]) => {
    const patterns = [
      { old: `href="/reviews/${broken}"`, new: `href="/reviews/${correct}"` },
      { old: `to="/reviews/${broken}"`, new: `to="/reviews/${correct}"` },
    ]

    patterns.forEach(({ old, new: newVal }) => {
      if (content.includes(old)) {
        content = content.replaceAll(old, newVal)
        modified = true
        linksFixed++
      }
    })
  })

  // Remove links to non-existent products
  linksToRemove.forEach(slug => {
    // Match <Link href="/reviews/slug">text</Link> or <a href="/reviews/slug">text</a>
    const linkPatterns = [
      new RegExp(`<Link[^>]*href="/reviews/${slug}"[^>]*>([^<]+)</Link>`, 'g'),
      new RegExp(`<a[^>]*href="/reviews/${slug}"[^>]*>([^<]+)</a>`, 'g'),
    ]

    linkPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          // Extract just the link text
          const textMatch = match.match(/>([^<]+)</)
          if (textMatch) {
            const linkText = textMatch[1]
            // Replace entire link with just the text
            content = content.replace(match, linkText)
            modified = true
            linksRemoved++
          }
        })
      }
    })
  })

  if (modified) {
    writeFileSync(filePath, content, 'utf-8')
    filesModified++
    console.log(`✓ Modified: ${filePath.replace('./app/blog/', '')}`)
  }
})

console.log(`\n=== SUMMARY ===`)
console.log(`✓ ${linksFixed} links fixed (redirected to actual products)`)
console.log(`✓ ${linksRemoved} links removed (products don't exist)`)
console.log(`✓ ${filesModified} blog posts modified`)
