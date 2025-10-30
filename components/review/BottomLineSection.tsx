import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { ReactNode } from 'react'

interface BottomLineSectionProps {
  title: string
  paragraphs: ReactNode[]
  ctaUrl?: string
  ctaText?: string
  customCTA?: ReactNode
}

export default function BottomLineSection({
  title,
  paragraphs,
  ctaUrl,
  ctaText = "View Current Pricing on Amazon →",
  customCTA
}: BottomLineSectionProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 rounded-xl px-10 py-10 text-white">
        <div className="text-sm font-bold text-purple-200 uppercase tracking-wide mb-4">The Bottom Line</div>

        <h2 className="text-2xl font-bold text-white mb-5 mt-0 leading-[1.3]">
          {title}
        </h2>

        {paragraphs.map((paragraph, index) => (
          <div key={index} className={`text-base leading-[1.8] text-white/95 ${index < paragraphs.length - 1 ? 'mb-4' : 'mb-8'}`}>
            {paragraph}
          </div>
        ))}

        <div className="pt-8 border-t border-white/20">
          {customCTA ? (
            customCTA
          ) : (
            <div className="text-center">
              <CTAVisibilityTracker ctaId="bottom-line-final-cta" position="final_cta">
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-purple-800 font-semibold px-12 py-4 rounded-lg text-base transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl hover:bg-purple-50"
                >
                  {ctaText}
                </a>
              </CTAVisibilityTracker>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
