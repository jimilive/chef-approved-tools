#!/usr/bin/env node
/**
 * READ-ONLY script to extract competitor products from research files
 * Does NOT modify any files - only reads and extracts data
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const researchDir = '/Users/scottbradley/Documents/Projects/ChefApprovedTools/ComparisonTableResearch'

console.log('🔍 Reading research files...\n')

const files = readdirSync(researchDir).filter(f => f.endsWith('.md') || f.endsWith('.txt'))

let totalCompetitors = 0
const allCompetitors = []

files.forEach(filename => {
  try {
    const content = readFileSync(join(researchDir, filename), 'utf-8')

    // Extract main product name (first YOUR PRODUCT or PRODUCT section)
    const mainProductMatch = content.match(/(?:YOUR PRODUCT|PRODUCT #\d+):\s*(.+?)(?:\n|$)/i)
    const mainProduct = mainProductMatch ? mainProductMatch[1].trim() : 'Unknown'

    // Find all COMPETITOR sections
    const competitorMatches = content.matchAll(/##?\s*COMPETITOR\s+\d+:\s*(.+?)(?:\n|$)/gi)
    const competitors = [...competitorMatches].map(match => match[1].trim())

    // Extract ASINs for each competitor
    const asinMatches = content.matchAll(/ASIN[:\s]+([A-Z0-9]{10})/gi)
    const asins = [...asinMatches].map(match => match[1])

    if (competitors.length > 0) {
      console.log(`📄 ${filename}`)
      console.log(`   Main Product: ${mainProduct}`)
      console.log(`   Competitors: ${competitors.length}`)
      competitors.forEach((comp, idx) => {
        console.log(`     ${idx + 1}. ${comp}`)
        if (asins[idx + 1]) { // Skip first ASIN (main product)
          console.log(`        ASIN: ${asins[idx + 1]}`)
        }
      })
      console.log()

      allCompetitors.push({
        file: filename,
        mainProduct,
        competitors: competitors.map((name, idx) => ({
          name,
          asin: asins[idx + 1] || 'Not found'
        }))
      })

      totalCompetitors += competitors.length
    }
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message)
  }
})

console.log(`\n✅ SUMMARY:`)
console.log(`   Files processed: ${files.length}`)
console.log(`   Total competitors found: ${totalCompetitors}`)
console.log(`\n📊 This is a READ-ONLY extraction - no files were modified`)
