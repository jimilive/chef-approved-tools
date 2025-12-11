import { getReviewMetadata, getBlogMetadata } from '@/data/metadata'

interface GitDates {
  firstPublished: string
  lastUpdated: string
}

/**
 * Format ISO date string to readable format
 * "2024-06-20T10:00:00Z" -> "June 20, 2024"
 */
function formatDateString(isoDate: string | undefined): string {
  if (!isoDate) return 'Unknown'

  try {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Unknown'
  }
}

/**
 * Get dates for a review page from centralized metadata
 * @param slug - The review slug (e.g., 'lodge-seasoned-cast-iron-3-skillet-bundle')
 */
export function getReviewGitDates(slug: string): GitDates {
  try {
    const metadata = getReviewMetadata(slug)
    return {
      firstPublished: formatDateString(metadata.publishedTime),
      lastUpdated: formatDateString(metadata.modifiedTime)
    }
  } catch {
    return {
      firstPublished: 'Unknown',
      lastUpdated: 'Unknown'
    }
  }
}

/**
 * Get dates for a blog post from centralized metadata
 * @param slug - The blog slug (e.g., 'how-to-choose-first-chef-knife')
 */
export function getBlogGitDates(slug: string): GitDates {
  try {
    const metadata = getBlogMetadata(slug)
    return {
      firstPublished: formatDateString(metadata.publishedDate || metadata.publishedTime),
      lastUpdated: formatDateString(metadata.lastUpdated || metadata.modifiedTime)
    }
  } catch {
    return {
      firstPublished: 'Unknown',
      lastUpdated: 'Unknown'
    }
  }
}
