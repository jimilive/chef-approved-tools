#!/usr/bin/env node
/**
 * Fix blog post links to use correct review slugs
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const BLOG_DIR = './app/blog'

// Map of broken slugs to correct ones
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
  'lodge-5-quart-enameled-dutch-oven-review': 'le-creuset-signature-7-25-qt-dutch-oven',
  'lodge-6-qt-enameled-dutch-oven-review': 'le-creuset-signature-7-25-qt-dutch-oven',
  'lodge-enameled-dutch-oven-review': 'le-creuset-signature-7-25-qt-dutch-oven',
  'oxo-good-grips-12-inch-tongs-review': 'winco-heavy-duty-tongs',
  'oxo-good-grips-tongs-review': 'winco-heavy-duty-tongs',
  'checkered-chef-sheet-pans-review': 'nordic-ware-half-sheet-pan',
}

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

blogPosts.forEach(filePath => {
  let content = readFileSync(filePath, 'utf-8')
  let modified = false

  Object.entries(linkFixes).forEach(([broken, correct]) => {
    const oldPattern1 = `href="/reviews/${broken}"`
    const newPattern1 = `href="/reviews/${correct}"`

    const oldPattern2 = `to="/reviews/${broken}"`
    const newPattern2 = `to="/reviews/${correct}"`

    if (content.includes(oldPattern1)) {
      content = content.replaceAll(oldPattern1, newPattern1)
      modified = true
      linksFixed++
    }

    if (content.includes(oldPattern2)) {
      content = content.replaceAll(oldPattern2, newPattern2)
      modified = true
      linksFixed++
    }
  })

  if (modified) {
    writeFileSync(filePath, content, 'utf-8')
    filesModified++
    console.log(`✓ Fixed links in: ${filePath.replace('./app/blog/', '')}`)
  }
})

console.log(`\n✓ ${linksFixed} links fixed across ${filesModified} blog posts`)
