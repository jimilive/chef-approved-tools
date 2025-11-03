import Link from 'next/link'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

interface ReviewHeroProps {
  title: string
  authorName: string
  authorCredentials: string
  rating: number
  tierBadge: {
    icon: string
    text: string
    linkText?: string
    linkHref?: string
  }
  verdict: string
  verdictStrong: string
  ctaUrl?: string
  ctaText?: string
  ctaSubtext?: string
  customCTA?: React.ReactNode
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
  ctaText = "View on Amazon →",
  ctaSubtext = "Check current pricing and availability",
  customCTA
}: ReviewHeroProps) {
  // Generate star display (★★★★☆ format)
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const stars = '★'.repeat(fullStars) + (hasHalfStar ? '★' : '') + '☆'.repeat(emptyStars)

  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 shadow-sm mb-6">
      {/* FTC Disclosure */}
      <div className="bg-amber-100 border-l-[3px] border-amber-500 px-4 py-3 text-[13px] text-amber-900 mb-8 rounded min-h-[80px]">
        <strong>Disclosure:</strong> This page contains affiliate links. As an Amazon Associate, I earn from qualifying purchases at no additional cost to you. All recommendations are based on my 24 years of professional kitchen experience. <Link href="/disclosure" className="text-orange-700 font-semibold hover:underline">Full disclosure policy</Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-5">
        {title}
      </h1>

      {/* Meta Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-gray-200 mb-4 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            👨‍🍳
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-900 text-sm sm:text-base">{authorName}</div>
            <div className="text-xs sm:text-sm text-slate-600 truncate">{authorCredentials}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 flex-shrink-0">
          <div className="text-xl font-bold text-orange-700">{rating.toFixed(1)}</div>
          <div className="text-amber-500 text-base">{stars}</div>
        </div>
      </div>

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

      {/* Verdict Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-6 min-h-[120px]">
        <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">Professional Verdict</div>
        <p className="text-slate-900 text-base leading-[1.7] m-0">
          <strong>{verdictStrong}</strong> {verdict}
        </p>
      </div>

      {/* CTA Section */}
      {customCTA ? (
        customCTA
      ) : (
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl px-10 py-5 text-center max-w-[500px] mx-auto flex flex-col justify-center items-center">
          <CTAVisibilityTracker ctaId="primary-hero-cta" position="above_fold">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-orange-700 font-semibold px-12 py-4 rounded-lg text-base transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg mb-2.5"
            >
              {ctaText}
            </a>
          </CTAVisibilityTracker>
          <p className="text-white/90 text-[15px] m-0">{ctaSubtext}</p>
        </div>
      )}
    </div>
  )
}
