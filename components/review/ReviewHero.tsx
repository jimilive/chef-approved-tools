import Link from 'next/link'
import Image from 'next/image'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { ReviewHeroCTA } from './ReviewHeroCTA'

interface ReviewHeroProps {
  title?: string | null
  authorName: string
  authorCredentials: string
  rating: number
  tierBadge: {
    icon: string
    text: string
    linkText?: string
    linkHref?: string
  }
  verdict?: string | null
  verdictStrong?: string | null
  ctaUrl?: string
  ctaText?: string
  ctaSubtext?: string
  customCTA?: React.ReactNode
  publishedDate?: string
  lastUpdated?: string
  // Image support - optional, renders without image if not provided
  heroImage?: string | null
  productName?: string
  // Value highlights - optional, only shows if provided
  valueHighlights?: string
}

export default function ReviewHero({
  title,
  authorName,
  authorCredentials,
  rating,
  tierBadge,
  verdict,
  verdictStrong,
  ctaUrl,
  ctaText = "Check Price on Amazon →",
  ctaSubtext = "View current pricing and availability",
  customCTA,
  publishedDate,
  lastUpdated,
  heroImage,
  productName,
  valueHighlights
}: ReviewHeroProps) {
  // Generate star display (★★★★☆ format)
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const stars = '★'.repeat(fullStars) + (hasHalfStar ? '★' : '') + '☆'.repeat(emptyStars)

  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 shadow-sm mb-6">
      {/* FTC Disclosure */}
      <div className="bg-amber-100 border-l-[3px] border-amber-500 px-4 py-3 text-[13px] text-amber-900 mb-8 rounded">
        <strong>Disclosure:</strong> This page contains affiliate links. As an Amazon Associate, I earn from qualifying purchases at no additional cost to you. All recommendations are based on my 24 years of professional kitchen experience. <Link href="/disclosure" className="text-orange-700 font-semibold hover:underline">Full disclosure policy</Link>
      </div>

      {/* Conditional layout: with image = side-by-side, without = standard */}
      {heroImage ? (
        <>
        {/* Two-column layout with image - stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          {/* Image column - LEFT */}
          <div className="w-full sm:w-[400px] sm:flex-shrink-0">
            <div className="relative w-full h-[250px] sm:h-[300px]">
              <Image
                src={heroImage}
                alt={`${productName || title || 'Product'} - professional review`}
                fill
                className="object-cover rounded-lg"
                quality={75}
                priority
                sizes="(max-width: 640px) 100vw, 400px"
              />
            </div>
          </div>

          {/* Content column - RIGHT */}
          <div className="flex flex-col">
            {/* Title */}
            {title && (
              <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-3">
                {title}
              </h1>
            )}

            {/* Meta Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-gray-200 mb-3 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  👨‍🍳
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{authorName}</div>
                  <div className="text-xs text-slate-700 truncate">{authorCredentials}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200 flex-shrink-0">
                <div className="text-lg font-bold text-orange-700">{rating.toFixed(1)}</div>
                <div className="text-amber-500 text-sm">{stars}</div>
              </div>
            </div>

            {/* Dates - optional */}
            {(publishedDate || lastUpdated) && (
              <div className="flex items-center gap-3 text-xs text-slate-700 mb-2">
                {publishedDate && <span>Published: {publishedDate}</span>}
                {publishedDate && lastUpdated && <span>•</span>}
                {lastUpdated && <span>Updated: {lastUpdated}</span>}
              </div>
            )}

            {/* Tier Badge */}
            <div className="inline-flex items-center gap-1.5 text-[13px] text-amber-900 bg-amber-100 px-3 py-1 rounded-md font-medium">
              <span>{tierBadge.icon}</span>
              <span>{tierBadge.text}</span>
              {tierBadge.linkText && tierBadge.linkHref && (
                <Link href={tierBadge.linkHref} className="text-orange-700 font-semibold hover:underline">
                  {tierBadge.linkText}
                </Link>
              )}
            </div>

            {/* Value highlights - only show if provided */}
            {valueHighlights && (
              <div className="mt-2 text-sm text-slate-700">
                {valueHighlights}
              </div>
            )}

            {/* CTA Button - simple button below tier badge for image layout */}
            <div className="mt-3">
              <CTAVisibilityTracker ctaId="primary-hero-cta" position="above_fold">
                <ReviewHeroCTA
                  ctaUrl={ctaUrl || '#'}
                  ctaText={ctaText}
                  productName={title || 'Product'}
                  position="review-hero-button"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
                />
              </CTAVisibilityTracker>
            </div>

          </div>
        </div>

        {/* Verdict Section - for image layout, before customCTA */}
        {verdict && verdictStrong && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-6">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">Professional Verdict</div>
            <p className="text-slate-900 text-base leading-[1.7] m-0">
              <strong>{verdictStrong}</strong> {verdict}
            </p>
          </div>
        )}

        {/* Custom CTA content (if provided) - full width below verdict */}
        {customCTA && (
          <div className="mb-6">
            {customCTA}
          </div>
        )}
        </>
      ) : (
        // No image - render exactly like before
        <>
          {/* Title - only render if provided */}
          {title && (
            <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-5">
              {title}
            </h1>
          )}

          {/* Meta Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-gray-200 mb-4 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                👨‍🍳
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 text-sm sm:text-base">{authorName}</div>
                <div className="text-xs sm:text-sm text-slate-700 truncate">{authorCredentials}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 flex-shrink-0">
              <div className="text-xl font-bold text-orange-700">{rating.toFixed(1)}</div>
              <div className="text-amber-500 text-base">{stars}</div>
            </div>
          </div>

          {/* Dates - optional */}
          {(publishedDate || lastUpdated) && (
            <div className="flex items-center gap-3 text-xs text-slate-700 mb-4">
              {publishedDate && <span>Published: {publishedDate}</span>}
              {publishedDate && lastUpdated && <span>•</span>}
              {lastUpdated && <span>Updated: {lastUpdated}</span>}
            </div>
          )}

          {/* Tier Badge */}
          <div className="inline-flex items-center gap-1.5 text-[13px] text-amber-900 bg-amber-100 px-3 py-1 rounded-md font-medium mb-5">
            <span>{tierBadge.icon}</span>
            <span>{tierBadge.text}</span>
            {tierBadge.linkText && tierBadge.linkHref && (
              <Link href={tierBadge.linkHref} className="text-orange-700 font-semibold hover:underline">
                {tierBadge.linkText}
              </Link>
            )}
          </div>
        </>
      )}

      {/* Verdict Section - only for non-image layout (image layout has verdict inside) */}
      {!heroImage && verdict && verdictStrong && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-6 min-h-[120px]">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">Professional Verdict</div>
          <p className="text-slate-900 text-base leading-[1.7] m-0">
            <strong>{verdictStrong}</strong> {verdict}
          </p>
        </div>
      )}

      {/* CTA Section - only for non-image layout (image layout has CTA in right column) */}
      {!heroImage && (
        customCTA ? (
          customCTA
        ) : (
          <div className="bg-gradient-to-br from-orange-700 to-red-700 rounded-xl px-10 py-5 text-center max-w-[500px] mx-auto flex flex-col justify-center items-center">
            <CTAVisibilityTracker ctaId="primary-hero-cta" position="above_fold">
              <ReviewHeroCTA
                ctaUrl={ctaUrl || '#'}
                ctaText={ctaText}
                productName={title || 'Product'}
                position="review-hero-button"
                className="inline-block bg-white text-orange-700 font-semibold px-12 py-4 rounded-lg text-base transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg mb-2.5"
              />
            </CTAVisibilityTracker>
            <p className="text-white/90 text-[15px] m-0 mb-2">{ctaSubtext}</p>
            <ReviewHeroCTA
              ctaUrl={ctaUrl || '#'}
              ctaText="View product details"
              productName={title || 'Product'}
              position="review-hero-text-link"
              className="text-base text-white underline hover:text-white/80 transition-colors"
            />
          </div>
        )
      )}
    </div>
  )
}
