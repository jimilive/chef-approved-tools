#!/usr/bin/env node
/**
 * Sync Git Dates to Metadata
 *
 * This script updates publishedTime/modifiedTime in data/metadata.ts
 * based on actual git commit history. Run automatically via pre-commit hook.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const METADATA_FILE = 'data/metadata.ts'

/**
 * Get git dates for a file
 */
function getGitDates(filePath) {
  try {
    // Check if file exists in git
    try {
      execSync(`git ls-files --error-unmatch "${filePath}"`, { encoding: 'utf-8', stdio: 'pipe' })
    } catch {
      return null // File not tracked by git
    }

    // Get first commit date (oldest)
    const firstCommit = execSync(
      `git log --follow --format="%aI" -- "${filePath}" | tail -1`,
      { encoding: 'utf-8', stdio: 'pipe' }
    ).trim()

    // Get last commit date (newest)
    const lastCommit = execSync(
      `git log --follow --format="%aI" -1 -- "${filePath}"`,
      { encoding: 'utf-8', stdio: 'pipe' }
    ).trim()

    if (!firstCommit || !lastCommit) {
      return null
    }

    // Convert to ISO format with T10:00:00Z time (consistent with existing format)
    const formatDate = (isoDate) => {
      const date = new Date(isoDate)
      return date.toISOString().split('T')[0] + 'T10:00:00Z'
    }

    return {
      publishedTime: formatDate(firstCommit),
      modifiedTime: formatDate(lastCommit)
    }
  } catch (error) {
    return null
  }
}

/**
 * Get all review and blog slugs from the filesystem
 */
function getContentSlugs() {
  const reviews = []
  const blogs = []

  // Get review slugs
  const reviewsDir = 'app/reviews'
  if (fs.existsSync(reviewsDir)) {
    for (const dir of fs.readdirSync(reviewsDir)) {
      const pagePath = path.join(reviewsDir, dir, 'page.tsx')
      if (fs.existsSync(pagePath)) {
        reviews.push({ slug: dir, filePath: pagePath })
      }
    }
  }

  // Get blog slugs
  const blogDir = 'app/blog'
  if (fs.existsSync(blogDir)) {
    for (const dir of fs.readdirSync(blogDir)) {
      const pagePath = path.join(blogDir, dir, 'page.tsx')
      if (fs.existsSync(pagePath)) {
        blogs.push({ slug: dir, filePath: pagePath })
      }
    }
  }

  return { reviews, blogs }
}

/**
 * Update a single date field in metadata content
 */
function updateDateField(content, slug, section, field, newValue) {
  // Match the pattern: 'slug': { ... field: "value" ... }
  // This regex finds the specific entry and updates the field
  const entryPattern = new RegExp(
    `('${slug}':\\s*\\{[^}]*?)(${field}:\\s*")([^"]+)(")`,
    's'
  )

  const match = content.match(entryPattern)
  if (match && match[3] !== newValue) {
    return {
      content: content.replace(entryPattern, `$1$2${newValue}$4`),
      updated: true,
      oldValue: match[3]
    }
  }

  return { content, updated: false }
}

/**
 * Main sync function
 */
function syncDates() {
  console.log('Syncing git dates to metadata...\n')

  // Read current metadata
  let metadataContent = fs.readFileSync(METADATA_FILE, 'utf-8')
  let updatedCount = 0
  const updates = []

  const { reviews, blogs } = getContentSlugs()

  // Process reviews
  for (const { slug, filePath } of reviews) {
    const dates = getGitDates(filePath)
    if (!dates) continue

    // Update publishedTime
    let result = updateDateField(metadataContent, slug, 'reviews', 'publishedTime', dates.publishedTime)
    if (result.updated) {
      metadataContent = result.content
      updates.push(`  [review] ${slug}: publishedTime ${result.oldValue} -> ${dates.publishedTime}`)
      updatedCount++
    }

    // Update modifiedTime
    result = updateDateField(metadataContent, slug, 'reviews', 'modifiedTime', dates.modifiedTime)
    if (result.updated) {
      metadataContent = result.content
      updates.push(`  [review] ${slug}: modifiedTime ${result.oldValue} -> ${dates.modifiedTime}`)
      updatedCount++
    }
  }

  // Process blogs - they use publishedDate/lastUpdated format (YYYY-MM-DD)
  for (const { slug, filePath } of blogs) {
    const dates = getGitDates(filePath)
    if (!dates) continue

    const publishedDate = dates.publishedTime.split('T')[0]
    const lastUpdated = dates.modifiedTime.split('T')[0]

    // Update publishedDate
    let result = updateDateField(metadataContent, slug, 'blog', 'publishedDate', publishedDate)
    if (result.updated) {
      metadataContent = result.content
      updates.push(`  [blog] ${slug}: publishedDate ${result.oldValue} -> ${publishedDate}`)
      updatedCount++
    }

    // Update lastUpdated
    result = updateDateField(metadataContent, slug, 'blog', 'lastUpdated', lastUpdated)
    if (result.updated) {
      metadataContent = result.content
      updates.push(`  [blog] ${slug}: lastUpdated ${result.oldValue} -> ${lastUpdated}`)
      updatedCount++
    }

    // Also update publishedTime/modifiedTime if they exist in blogs
    result = updateDateField(metadataContent, slug, 'blog', 'publishedTime', dates.publishedTime)
    if (result.updated) {
      metadataContent = result.content
      updatedCount++
    }

    result = updateDateField(metadataContent, slug, 'blog', 'modifiedTime', dates.modifiedTime)
    if (result.updated) {
      metadataContent = result.content
      updatedCount++
    }
  }

  if (updatedCount > 0) {
    // Write updated metadata
    fs.writeFileSync(METADATA_FILE, metadataContent)

    // Stage the metadata file
    execSync(`git add ${METADATA_FILE}`)

    console.log(`Updated ${updatedCount} date fields:`)
    updates.forEach(u => console.log(u))
    console.log(`\nStaged ${METADATA_FILE}`)
  } else {
    console.log('All dates are up to date.')
  }
}

// Run
syncDates()
