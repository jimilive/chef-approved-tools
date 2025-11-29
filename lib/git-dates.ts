import { execSync } from 'child_process'

interface GitDates {
  firstPublished: string
  lastUpdated: string
}

/**
 * Get git commit dates for a file
 * @param filePath - Path relative to repo root (e.g., 'app/reviews/some-product/page.tsx')
 * @returns Object with formatted date strings
 */
export function getGitDates(filePath: string): GitDates {
  try {
    // Get first commit date (oldest)
    const firstCommitRaw = execSync(
      `git log --follow --format="%ad" --date=format:"%B %d, %Y" -- "${filePath}" | tail -1`,
      { encoding: 'utf-8' }
    ).trim()

    // Get last commit date (newest)
    const lastCommitRaw = execSync(
      `git log --follow --format="%ad" --date=format:"%B %d, %Y" -1 -- "${filePath}"`,
      { encoding: 'utf-8' }
    ).trim()

    return {
      firstPublished: firstCommitRaw || 'Unknown',
      lastUpdated: lastCommitRaw || 'Unknown'
    }
  } catch (error) {
    console.error('Error getting git dates:', error)
    return {
      firstPublished: 'Unknown',
      lastUpdated: 'Unknown'
    }
  }
}

/**
 * Get git dates for a review page by slug
 * @param slug - The review slug (e.g., 'lodge-seasoned-cast-iron-3-skillet-bundle')
 */
export function getReviewGitDates(slug: string): GitDates {
  return getGitDates(`app/reviews/${slug}/page.tsx`)
}
