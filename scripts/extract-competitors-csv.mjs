#!/usr/bin/env node
/**
 * READ-ONLY script to extract competitor products to CSV
 * Does NOT modify any files - only reads and creates CSV output
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const researchDir = '/Users/scottbradley/Documents/Projects/ChefApprovedTools/ComparisonTableResearch'

console.log('🔍 Reading research files and creating CSV...\n')

const files = readdirSync(researchDir).filter(f => f.endsWith('.md') || f.endsWith('.txt'))

// CSV header
let csv = 'Main Product,Competitor Name,ASIN,Suggested Slug,Research File\n'

let totalCompetitors = 0

files.forEach(filename => {
  try {
    const content = readFileSync(join(researchDir, filename), 'utf-8')

    // Extract main product name
    const mainProductMatch = content.match(/(?:YOUR PRODUCT|PRODUCT #\d+):\s*(.+?)(?:\n|$)/i)
    const mainProduct = mainProductMatch ? mainProductMatch[1].trim() : 'Unknown'

    // Find all COMPETITOR sections with their names
    const competitorMatches = [...content.matchAll(/##?\s*COMPETITOR\s+\d+:\s*(.+?)(?:\n|$)/gi)]

    // Extract all ASINs in order (first one is main product, rest are competitors)
    const asinMatches = [...content.matchAll(/ASIN[:\s]+([A-Z0-9]{10})/gi)]
    const asins = asinMatches.map(match => match[1])

    competitorMatches.forEach((match, idx) => {
      const competitorName = match[1].trim()
      const asin = asins[idx + 1] || 'NEED ASIN' // Skip first ASIN (main product)

      // Generate slug from competitor name
      const slug = competitorName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Remove duplicate hyphens
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

      // CSV row (escape commas in names)
      const escapedMainProduct = `"${mainProduct.replace(/"/g, '""')}"`
      const escapedCompetitor = `"${competitorName.replace(/"/g, '""')}"`

      csv += `${escapedMainProduct},${escapedCompetitor},${asin},${slug},${filename}\n`

      totalCompetitors++
    })
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message)
  }
})

// Write CSV file
const outputPath = '/Users/scottbradley/chef-approved-tools/COMPETITOR_PRODUCTS_STAGING.csv'
writeFileSync(outputPath, csv, 'utf-8')

console.log(`✅ CSV created successfully!`)
console.log(`   File: COMPETITOR_PRODUCTS_STAGING.csv`)
console.log(`   Total competitors: ${totalCompetitors}`)
console.log(`   Files processed: ${files.length}`)
