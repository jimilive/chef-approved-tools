#!/usr/bin/env node
/**
 * Validate Amazon affiliate links are properly formatted
 *
 * Checks for:
 * - Proper tag format (should include your associate tag)
 * - No hardcoded ASINs (should use environment variables or database)
 * - Links using approved shortlink format
 */

import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const ASSOCIATE_TAG = process.env.AMAZON_ASSOCIATE_TAG

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

let errors = 0
let warnings = 0

console.log(`${BOLD}Validating Amazon Affiliate Links...${RESET}\n`)

if (!ASSOCIATE_TAG) {
  console.log(`${RED}✗ AMAZON_ASSOCIATE_TAG not found in .env.local${RESET}`)
  process.exit(1)
}

console.log(`Using associate tag: ${ASSOCIATE_TAG}\n`)

// Find all TSX files
const files = []
function findFiles(dir) {
  const items = readdirSync(dir, { withFileTypes: true })
  items.forEach(item => {
    const fullPath = join(dir, item.name)
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      findFiles(fullPath)
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      files.push(fullPath)
    }
  })
}

findFiles('./app')
findFiles('./components')

const issues = []

files.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8')

  // Find Amazon links
  const amazonLinkPattern = /(https?:\/\/(?:www\.)?amazon\.com\/[^"'\s]+)/g
  const matches = [...content.matchAll(amazonLinkPattern)]

  matches.forEach(match => {
    const url = match[1]

    // Check if it has the associate tag
    if (!url.includes(ASSOCIATE_TAG)) {
      issues.push({
        file: filePath.replace('./', ''),
        url: url.substring(0, 80) + '...',
        issue: 'Missing associate tag',
        severity: 'error'
      })
      errors++
    }

    // Warn about direct Amazon links (should use short links)
    if (url.includes('amazon.com/') && !url.includes('amzn.to')) {
      if (!url.includes('tag=')) {
        issues.push({
          file: filePath.replace('./', ''),
          url: url.substring(0, 80) + '...',
          issue: 'Direct Amazon link without tag parameter',
          severity: 'error'
        })
        errors++
      }
    }

    // Check for hardcoded ASINs in code (not strings)
    if (url.includes('/dp/') && content.includes('href="http')) {
      issues.push({
        file: filePath.replace('./', ''),
        url: url.substring(0, 80) + '...',
        issue: 'Hardcoded ASIN link (should come from database)',
        severity: 'warning'
      })
      warnings++
    }
  })
})

if (issues.length === 0) {
  console.log(`${GREEN}✓ All Amazon affiliate links are properly formatted${RESET}`)
  console.log(`${GREEN}✓ Checked ${files.length} files${RESET}\n`)
  process.exit(0)
} else {
  console.log(`${RED}Found ${issues.length} affiliate link issue(s):${RESET}\n`)

  issues.forEach(issue => {
    const color = issue.severity === 'error' ? RED : YELLOW
    const symbol = issue.severity === 'error' ? '✗' : '⚠'
    console.log(`${color}${symbol} ${issue.file}${RESET}`)
    console.log(`  ${issue.issue}`)
    console.log(`  ${issue.url}`)
    console.log('')
  })

  if (errors > 0) {
    console.log(`${RED}✗ ${errors} ERROR(S) - Fix before deployment${RESET}`)
  }
  if (warnings > 0) {
    console.log(`${YELLOW}⚠ ${warnings} WARNING(S)${RESET}`)
  }
  console.log('')

  process.exit(errors > 0 ? 1 : 0)
}
