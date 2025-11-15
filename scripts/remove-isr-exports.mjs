#!/usr/bin/env node

/**
 * REMOVE ISR EXPORTS FROM REVIEW PAGES
 *
 * Removes these conflicting lines:
 * - export const revalidate = 3600
 * - export const fetchCache = 'force-cache'
 * - Comments about ISR
 *
 * These conflict with the cache-busting exports we just added.
 */

import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'

const reviews = globSync('app/reviews/*/page.tsx')
console.log(`\n🔍 Found ${reviews.length} review pages\n`)

let fixed = 0

for (const file of reviews) {
  const content = readFileSync(file, 'utf-8')

  // Skip if no ISR exports
  if (!content.includes('export const revalidate = 3600')) {
    continue
  }

  const lines = content.split('\n')
  const newLines = []
  let skipNext = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip ISR comment lines (any variation)
    if (trimmed.startsWith('// Use ISR') ||
        trimmed.startsWith('// ISR configuration') ||
        trimmed.startsWith('// Enable fetch caching')) {
      skipNext = true
      continue
    }

    // Skip ISR export lines (catch ALL variations)
    if (trimmed.startsWith('export const revalidate = 3600') ||
        trimmed === "export const fetchCache = 'force-cache'") {
      skipNext = true
      continue
    }

    // Skip blank lines after ISR exports
    if (skipNext && trimmed === '') {
      skipNext = false
      continue
    }

    skipNext = false
    newLines.push(line)
  }

  writeFileSync(file, newLines.join('\n'), 'utf-8')
  console.log(`✅ FIXED: ${file}`)
  fixed++
}

console.log(`\n✅ COMPLETE: Removed ISR exports from ${fixed} files\n`)
