import { formatDate } from '@/lib/format-date'

/**
 * DateDisplay Component
 *
 * Displays published and updated dates consistently across all content pages.
 * Required on ALL review and blog pages per content standards.
 *
 * Usage:
 *   <DateDisplay
 *     published="2024-10-15"
 *     updated="2025-01-20"
 *     variant="review"  // or "blog"
 *   />
 */

interface DateDisplayProps {
  published: string    // ISO date string (YYYY-MM-DD)
  updated?: string     // ISO date string (YYYY-MM-DD), optional
  variant?: 'review' | 'blog'  // Changes formatting slightly
  className?: string   // Additional CSS classes
}

export default function DateDisplay({
  published,
  updated,
  variant = 'blog',
  className = ''
}: DateDisplayProps) {

  const publishedFormatted = formatDate(published)
  const updatedFormatted = updated ? formatDate(updated) : null

  if (variant === 'review') {
    // Review format: "Published: October 15, 2024 • Updated: January 20, 2025"
    return (
      <div className={`text-sm text-slate-700 ${className}`}>
        <time dateTime={published}>Published: {publishedFormatted}</time>
        {updatedFormatted && (
          <>
            {' • '}
            <time dateTime={updated}>Updated: {updatedFormatted}</time>
          </>
        )}
      </div>
    )
  }

  // Blog format: "November 5, 2024 • Updated: January 10, 2025"
  return (
    <div className={`text-sm text-slate-700 ${className}`}>
      <time dateTime={published}>{publishedFormatted}</time>
      {updatedFormatted && (
        <>
          {' • '}
          <time dateTime={updated}>Updated: {updatedFormatted}</time>
        </>
      )}
    </div>
  )
}
