#!/usr/bin/env node
/**
 * Validate that all image references point to existing files
 *
 * Checks:
 * 1. All <img src="..."> tags point to real files
 * 2. All Next.js <Image src="..."> components point to real files
 * 3. All background-image URLs in styles point to real files
 * 4. Warns about missing alt attributes
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'fs'
import { join, resolve } from 'path'

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

let errors = 0
let warnings = 0

console.log(`${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║       IMAGE VALIDATION - STARTING         ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

// Get all TSX/JSX files
const files = []
function findFiles(dir) {
  const items = readdirSync(dir, { withFileTypes: true })
  items.forEach(item => {
    const fullPath = join(dir, item.name)
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      findFiles(fullPath)
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.jsx')) {
      files.push(fullPath)
    }
  })
}

findFiles('./app')
findFiles('./components')

const issues = []
const missingAltTags = []
const poorAltText = []

// Function to validate alt text quality
function validateAltTextQuality(altText, imageSrc) {
  const issues = []

  // Check for empty alt (only OK for decorative images)
  if (altText.trim() === '') {
    // Empty alt is acceptable for decorative images
    return issues
  }

  // Check for redundant phrases
  const badPhrases = ['image of', 'picture of', 'photo of', 'graphic of', 'illustration of']
  const lowerAlt = altText.toLowerCase()
  badPhrases.forEach(phrase => {
    if (lowerAlt.startsWith(phrase)) {
      issues.push({
        type: 'redundant',
        message: `Starts with "${phrase}" (redundant)`,
        suggestion: `Remove "${phrase}" and start with the subject`
      })
    }
  })

  // Check length (should be under 125 characters)
  if (altText.length > 125) {
    issues.push({
      type: 'too_long',
      message: `${altText.length} characters (max 125)`,
      suggestion: 'Shorten to key information only'
    })
  }

  // Check for filename-like alt text
  if (altText.includes('.jpg') || altText.includes('.png') || altText.includes('.webp')) {
    issues.push({
      type: 'filename',
      message: 'Contains file extension',
      suggestion: 'Use descriptive text, not filename'
    })
  }

  return issues
}

// Function to check if image path exists
function checkImagePath(imagePath, sourceFile) {
  // Skip external URLs
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return true
  }

  // Skip data URLs
  if (imagePath.startsWith('data:')) {
    return true
  }

  // Handle absolute paths from public directory
  let fullPath
  if (imagePath.startsWith('/')) {
    fullPath = join('./public', imagePath)
  } else {
    fullPath = imagePath
  }

  return existsSync(fullPath)
}

console.log(`${BOLD}1. Checking Image References...${RESET}`)

files.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8')

  // Find <img src="..." /> tags
  const imgTagRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g
  let imgMatches = [...content.matchAll(imgTagRegex)]

  imgMatches.forEach(match => {
    const imageSrc = match[1]

    if (!checkImagePath(imageSrc, filePath)) {
      issues.push({
        file: filePath.replace('./', ''),
        image: imageSrc,
        type: '<img> tag',
        severity: 'error'
      })
      errors++
    }

    // Check for missing alt attribute
    if (!match[0].includes('alt=')) {
      missingAltTags.push({
        file: filePath.replace('./', ''),
        image: imageSrc
      })
    } else {
      // Check alt text quality
      const altMatch = match[0].match(/alt=["']([^"']*)["']/)
      if (altMatch) {
        const altText = altMatch[1]
        const qualityIssues = validateAltTextQuality(altText, imageSrc)
        if (qualityIssues.length > 0) {
          poorAltText.push({
            file: filePath.replace('./', ''),
            image: imageSrc,
            altText: altText,
            issues: qualityIssues
          })
        }
      }
    }
  })

  // Find Next.js <Image src="..." /> components
  const nextImageRegex = /<Image\s+[^>]*src=["']([^"']+)["'][^>]*>/g
  let nextImageMatches = [...content.matchAll(nextImageRegex)]

  nextImageMatches.forEach(match => {
    const imageSrc = match[1]

    // Skip dynamic imports and variables
    if (imageSrc.startsWith('{') || imageSrc.startsWith('$')) {
      return
    }

    if (!checkImagePath(imageSrc, filePath)) {
      issues.push({
        file: filePath.replace('./', ''),
        image: imageSrc,
        type: 'Next.js <Image>',
        severity: 'error'
      })
      errors++
    }

    // Check for missing alt attribute
    if (!match[0].includes('alt=')) {
      missingAltTags.push({
        file: filePath.replace('./', ''),
        image: imageSrc
      })
    } else {
      // Check alt text quality
      const altMatch = match[0].match(/alt=["']([^"']*)["']/)
      if (altMatch) {
        const altText = altMatch[1]
        const qualityIssues = validateAltTextQuality(altText, imageSrc)
        if (qualityIssues.length > 0) {
          poorAltText.push({
            file: filePath.replace('./', ''),
            image: imageSrc,
            altText: altText,
            issues: qualityIssues
          })
        }
      }
    }
  })

  // Find background-image in style attributes
  const bgImageRegex = /background(?:-image)?:\s*url\(['"]?([^'")\s]+)['"]?\)/g
  let bgMatches = [...content.matchAll(bgImageRegex)]

  bgMatches.forEach(match => {
    const imageSrc = match[1]

    if (!checkImagePath(imageSrc, filePath)) {
      issues.push({
        file: filePath.replace('./', ''),
        image: imageSrc,
        type: 'background-image',
        severity: 'warning'
      })
      warnings++
    }
  })
})

if (issues.length === 0) {
  console.log(`${GREEN}✓ All image references point to existing files${RESET}`)
  console.log(`${GREEN}✓ Checked ${files.length} files${RESET}`)
} else {
  console.log(`${RED}✗ Found ${issues.length} broken image reference(s):${RESET}\n`)

  issues.forEach(issue => {
    const color = issue.severity === 'error' ? RED : YELLOW
    const symbol = issue.severity === 'error' ? '✗' : '⚠'
    console.log(`${color}${symbol} ${issue.file}${RESET}`)
    console.log(`  Type: ${issue.type}`)
    console.log(`  Missing: ${issue.image}`)
    console.log('')
  })
}

console.log(`\n${BOLD}2. Checking Alt Attributes...${RESET}`)

if (missingAltTags.length === 0) {
  console.log(`${GREEN}✓ All images have alt attributes${RESET}`)
} else {
  console.log(`${YELLOW}⚠ ${missingAltTags.length} image(s) missing alt attributes:${RESET}`)
  console.log(`  (Important for accessibility and SEO)\n`)

  // Group by file
  const byFile = {}
  missingAltTags.forEach(item => {
    if (!byFile[item.file]) byFile[item.file] = []
    byFile[item.file].push(item.image)
  })

  Object.entries(byFile).slice(0, 10).forEach(([file, images]) => {
    console.log(`  ${file}`)
    images.slice(0, 3).forEach(img => console.log(`    - ${img}`))
    if (images.length > 3) {
      console.log(`    ... and ${images.length - 3} more`)
    }
  })

  if (Object.keys(byFile).length > 10) {
    console.log(`\n  ... and ${Object.keys(byFile).length - 10} more files`)
  }

  console.log(`\n  ${YELLOW}Note: Missing alt tags are warnings, not errors${RESET}`)
}

console.log(`\n${BOLD}3. Checking Alt Text Quality...${RESET}`)

if (poorAltText.length === 0) {
  console.log(`${GREEN}✓ All alt text follows best practices${RESET}`)
} else {
  console.log(`${YELLOW}⚠ ${poorAltText.length} image(s) with alt text quality issues:${RESET}`)
  console.log(`  (Can improve accessibility and SEO)\n`)

  poorAltText.slice(0, 5).forEach(item => {
    console.log(`  ${item.file}`)
    console.log(`    Image: ${item.image}`)
    console.log(`    Current: "${item.altText}"`)
    item.issues.forEach(issue => {
      console.log(`    ${YELLOW}⚠${RESET} ${issue.message}`)
      console.log(`      → ${issue.suggestion}`)
    })
    console.log('')
  })

  if (poorAltText.length > 5) {
    console.log(`  ... and ${poorAltText.length - 5} more`)
  }

  console.log(`  ${YELLOW}Note: Alt text quality issues are suggestions, not errors${RESET}`)
}

console.log(`\n${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║           VALIDATION SUMMARY               ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

if (errors === 0 && warnings === 0 && missingAltTags.length === 0) {
  console.log(`${BOLD}${GREEN}✓✓✓ ALL IMAGE CHECKS PASSED!${RESET}\n`)
  process.exit(0)
} else {
  if (errors > 0) {
    console.log(`${BOLD}${RED}✗ ${errors} broken image reference(s) - MUST FIX${RESET}`)
  }
  if (warnings > 0) {
    console.log(`${BOLD}${YELLOW}⚠ ${warnings} background image warning(s)${RESET}`)
  }
  if (missingAltTags.length > 0) {
    console.log(`${BOLD}${YELLOW}ℹ ${missingAltTags.length} missing alt attribute(s) (accessibility)${RESET}`)
  }
  console.log('')

  // Only exit with error if there are actual broken images
  process.exit(errors > 0 ? 1 : 0)
}
