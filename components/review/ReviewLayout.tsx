import Link from 'next/link'
import { ReactNode } from 'react'

interface ReviewLayoutProps {
  children: ReactNode
  breadcrumbCategory: string | { href: string; label: string }
  breadcrumbTitle: string
}

/**
 * ReviewLayout - Consistent wrapper for all product review pages
 *
 * Provides:
 * - Gray background with proper max-width container
 * - Breadcrumb navigation
 * - Consistent spacing between review components
 * - Cache-busting to prevent stale HTML
 *
 * All review pages should use this layout for consistency.
 *
 * @example
 * ```tsx
 * import ReviewLayout from '@/components/review/ReviewLayout'
 *
 * export default function VitamixReview() {
 *   return (
 *     <ReviewLayout 
 *       breadcrumbCategory="Appliances"
 *       breadcrumbTitle="Vitamix 5200 Professional Blender"
 *     >
 *       <ReviewHero {...} />
 *       <TestingResultsGrid {...} />
 *       <PerformanceAnalysis {...} />
 *       {/* Layout handles spacing and structure *\/}
 *     </ReviewLayout>
 *   )
 * }
 * ```
 */
export default function ReviewLayout({ 
  children, 
  breadcrumbCategory,
  breadcrumbTitle 
}: ReviewLayoutProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-5">
        
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-700 mb-4">
          <Link href="/" className="hover:text-orange-700">Home</Link>
          {' / '}
          {typeof breadcrumbCategory === 'string' ? (
            <>
              <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
              {' / '}
              <Link href={`/${breadcrumbCategory.toLowerCase()}`} className="hover:text-orange-700">
                {breadcrumbCategory}
              </Link>
            </>
          ) : (
            <Link href={breadcrumbCategory.href} className="hover:text-orange-700">
              {breadcrumbCategory.label}
            </Link>
          )}
          {' / '}
          <span>{breadcrumbTitle}</span>
        </div>

        {/* Review content - components handle their own spacing */}
        {children}
        
      </div>
    </div>
  )
}
