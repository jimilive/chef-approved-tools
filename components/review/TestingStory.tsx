import Image from 'next/image'

/**
 * TestingStory Component
 *
 * E-E-A-T narrative section that tells the personal testing story.
 * Establishes credibility through authentic experience descriptions.
 *
 * Position: Section 6 - After Testing Results Grid, before CTA #2
 */

interface TestingStoryImage {
  src: string
  alt: string
  caption?: string
}

interface ProfessionalContext {
  title: string
  items: string[]
}

interface TestingStoryProps {
  title?: string
  paragraphs: string[]
  professionalContext?: ProfessionalContext
  images?: TestingStoryImage[]
}

export default function TestingStory({
  title = "The Testing Story",
  paragraphs,
  professionalContext,
  images
}: TestingStoryProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      {/* Main narrative paragraphs */}
      <div className="prose prose-slate max-w-none mb-8">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-slate-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Optional gallery images */}
      {images && images.length > 0 && (
        <div className={`grid gap-4 mb-8 ${images.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
          {images.map((image, index) => (
            <div key={index} className="relative">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              {image.caption && (
                <p className="text-sm text-slate-700 mt-2 italic text-center">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Professional context callout */}
      {professionalContext && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0">
            {professionalContext.title}
          </h3>
          <ul className="space-y-2">
            {professionalContext.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-amber-600 mt-1">•</span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
