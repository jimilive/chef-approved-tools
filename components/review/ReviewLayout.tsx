/**
 * ReviewLayout - Consistent wrapper for ALL product review pages
 *
 * UPDATED: December 15, 2025
 * - Added schema script handling (TOP position)
 * - Added dates display
 * - Added AuthorBio (automatic)
 * - Added ProductViewTrackerWrapper (BOTTOM position)
 * - Added StickyMobileCTAWrapper (automatic)
 *
 * This component enforces the REVIEW_PAGE_MASTER_SPEC_V3.md structure.
 * All review pages MUST use this layout.
 *
 * @example
 * ```tsx
 * <ReviewLayout
 *   product={productData}
 *   slug={PRODUCT_SLUG}
 *   affiliateUrl={affiliateUrl}
 *   gitDates={gitDates}
 *   categoryBreadcrumb={categoryBreadcrumb}
 *   faqData={reviewData.faqData}
 *   tier={1}
 *   testingPeriod="20 years"
 * >
 *   <ReviewHero {...} />
 *   <TestingResultsGrid {...} />
 *   {/* etc - Layout handles everything else *\/}
 * </ReviewLayout>
 * ```
 */

import Link from 'next/link'
import { ReactNode } from 'react'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import AuthorBio from '@/components/review/AuthorBio'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// ==================== TYPES ====================

interface CategoryBreadcrumb {
  label: string
  href: string
}

interface FAQItem {
  question: string
  answer: string
}

interface ProductData {
  name: string
  slug: string
  brand?: string
  category?: string
  expertRating?: number
  expertOpinion?: string
  pros?: string[]
  cons?: string[]
}

interface GitDates {
  firstPublished: string | null
  lastUpdated: string | null
}

interface ReviewLayoutProps {
  // Required
  children: ReactNode

  // New pattern (preferred)
  product?: ProductData
  slug?: string
  affiliateUrl?: string

  // Breadcrumbs (supports old and new patterns)
  categoryBreadcrumb?: CategoryBreadcrumb | null
  /** @deprecated Use categoryBreadcrumb instead */
  breadcrumbCategory?: string | { href: string; label: string }
  /** @deprecated Use product.name instead */
  breadcrumbTitle?: string

  // Dates
  gitDates?: GitDates
  showDates?: boolean

  // Schema
  faqData?: FAQItem[]

  // Tracking
  tier?: 1 | 2 | 3
  testingPeriod?: string
  hook?: string

  // Optional UI
  backLinkHref?: string
  backLinkText?: string
}

// ==================== COMPONENT ====================

export default function ReviewLayout({
  children,
  product,
  slug,
  affiliateUrl,
  categoryBreadcrumb,
  breadcrumbCategory, // deprecated
  breadcrumbTitle,    // deprecated
  gitDates,
  showDates = true,
  faqData,
  tier = 1,
  testingPeriod,
  hook,
  backLinkHref,
  backLinkText,
}: ReviewLayoutProps) {

  // ==================== BREADCRUMB LOGIC ====================
  // Support both old and new prop patterns for backwards compatibility

  const resolvedCategory = categoryBreadcrumb
    || (typeof breadcrumbCategory === 'object' ? breadcrumbCategory : null)

  const productName = product?.name || breadcrumbTitle || 'Product'
  const productSlug = slug || product?.slug || ''

  // Build breadcrumbs array for schema
  const breadcrumbs = resolvedCategory
    ? [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: resolvedCategory.label, url: `https://www.chefapprovedtools.com${resolvedCategory.href}` },
        { name: productName, url: `https://www.chefapprovedtools.com/reviews/${productSlug}` }
      ]
    : [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: 'Reviews', url: 'https://www.chefapprovedtools.com/reviews' },
        { name: productName, url: `https://www.chefapprovedtools.com/reviews/${productSlug}` }
      ]

  // ==================== SCHEMA GENERATION ====================
  // Only generate schemas if we have the new props

  const productSchema = product && productSlug ? generateProductSchema({
    name: product.name,
    slug: product.slug,
    description: product.expertOpinion || '',
    brand: product.brand || '',
    rating: product.expertRating,
    reviewCount: 1,
    url: `https://www.chefapprovedtools.com/reviews/${product.slug}`,
    pros: product.pros,
    cons: product.cons,
  }) : null

  const breadcrumbSchema = productSlug ? generateBreadcrumbSchema(breadcrumbs) : null
  const faqSchema = faqData && faqData.length > 0 ? generateFAQSchema(faqData) : null

  // ==================== DATE FORMATTING ====================

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const hasVisibleDates = showDates && gitDates && (gitDates.firstPublished || gitDates.lastUpdated)

  // ==================== RENDER ====================

  return (
    <>
      {/* ========== SCHEMA SCRIPTS - TOP ========== */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ========== MAIN CONTENT WRAPPER ========== */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <nav
            className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-700 mb-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            {resolvedCategory ? (
              <>
                <Link href={resolvedCategory.href} className="hover:text-orange-700">
                  {resolvedCategory.label}
                </Link>
                {' / '}
              </>
            ) : (
              <>
                <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
                {' / '}
              </>
            )}
            <span aria-current="page">{productName}</span>
          </nav>

          {/* BACK LINK (optional) */}
          {backLinkHref && backLinkText && (
            <Link
              href={backLinkHref}
              className="text-orange-700 hover:text-orange-800 text-sm flex items-center gap-1 mb-4"
            >
              ← {backLinkText}
            </Link>
          )}

          {/* DATES */}
          {hasVisibleDates && (
            <div className="text-sm text-gray-600 mb-4 flex flex-wrap gap-x-4 gap-y-1">
              {gitDates.firstPublished && (
                <span>
                  <span className="font-medium">Published:</span>{' '}
                  <time dateTime={gitDates.firstPublished}>
                    {formatDate(gitDates.firstPublished)}
                  </time>
                </span>
              )}
              {gitDates.lastUpdated && gitDates.lastUpdated !== gitDates.firstPublished && (
                <span>
                  <span className="font-medium">Updated:</span>{' '}
                  <time dateTime={gitDates.lastUpdated}>
                    {formatDate(gitDates.lastUpdated)}
                  </time>
                </span>
              )}
            </div>
          )}

          {/* ========== UNIQUE PAGE CONTENT ========== */}
          {children}

          {/* AUTHOR BIO - Automatic */}
          <AuthorBio />

        </div>
      </div>

      {/* ========== PRODUCT VIEW TRACKER - BOTTOM ========== */}
      {product && productSlug && testingPeriod && hook && product.expertRating && product.category && (
        <ProductViewTrackerWrapper
          slug={productSlug}
          name={product.name}
          tier={tier}
          testingPeriod={testingPeriod}
          rating={product.expertRating}
          hook={hook}
          category={product.category}
        />
      )}

      {/* ========== STICKY MOBILE CTA ========== */}
      {product && affiliateUrl && productSlug && (
        <StickyMobileCTAWrapper
          productName={product.name}
          affiliateUrl={affiliateUrl}
          merchant="amazon"
          productSlug={productSlug}
        />
      )}
    </>
  )
}
