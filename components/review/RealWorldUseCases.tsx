import Image from 'next/image'

/**
 * RealWorldUseCases Component
 *
 * E-E-A-T section showing specific real-world scenarios where
 * the product excels. Demonstrates practical experience.
 *
 * Position: Section 9 - After Performance Analysis, before Comparison Table
 */

interface UseCaseImage {
  src: string
  alt: string
}

interface UseCase {
  title: string
  description: string
  bullets?: string[]
  image?: UseCaseImage
}

interface RealWorldUseCasesProps {
  title?: string
  subtitle?: string
  useCases: UseCase[]
}

export default function RealWorldUseCases({
  title = "Real-World Use Cases",
  subtitle,
  useCases
}: RealWorldUseCasesProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-[1.3]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-700 mb-8">{subtitle}</p>
      )}

      <div className="space-y-8">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className={`${useCase.image ? 'md:grid md:grid-cols-2 md:gap-6' : ''} ${index > 0 ? 'pt-8 border-t border-gray-200' : ''}`}
          >
            {/* Content */}
            <div className={useCase.image ? 'order-1' : ''}>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 mt-0">
                {useCase.title}
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                {useCase.description}
              </p>

              {useCase.bullets && useCase.bullets.length > 0 && (
                <ul className="space-y-2">
                  {useCase.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3">
                      <span className="text-green-600 mt-1 flex-shrink-0">✓</span>
                      <span className="text-slate-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Optional image */}
            {useCase.image && (
              <div className="order-2 mt-4 md:mt-0">
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <Image
                    src={useCase.image.src}
                    alt={useCase.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
