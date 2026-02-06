/**
 * Format a date string as "Month DD, YYYY"
 * Uses direct string parsing to avoid timezone shift issues
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-').map(Number)
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  return `${months[month - 1]} ${day}, ${year}`
}
