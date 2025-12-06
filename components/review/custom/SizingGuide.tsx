import { ReactNode } from 'react'

interface SizeOption {
  name: string
  dimensions: string
  bestFor: string[]
  considerations?: string[]
  recommended?: boolean
}

interface SizingGuideProps {
  title: string
  introText?: ReactNode
  sizes: SizeOption[]
}

export default function SizingGuide({
  title,
  introText,
  sizes
}: SizingGuideProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      {introText && (
        <div className="text-slate-700 leading-relaxed mb-6">
          {introText}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 border-2 ${
              size.recommended
                ? 'bg-green-50 border-green-400'
                : 'bg-white border-gray-200'
            }`}
          >
            {size.recommended && (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-200 px-3 py-1 rounded-full mb-3">
                ⭐ RECOMMENDED
              </div>
            )}

            <h3 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              {size.name}
            </h3>

            <div className="text-sm font-semibold text-slate-700 mb-4">
              {size.dimensions}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-900 mb-2 mt-0">
                ✅ Best For:
              </h4>
              <ul className="list-none p-0 m-0 space-y-1">
                {size.bestFor.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-sm text-slate-700 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {size.considerations && size.considerations.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2 mt-0">
                  ⚠️ Consider:
                </h4>
                <ul className="list-none p-0 m-0 space-y-1">
                  {size.considerations.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-slate-700 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div className="text-sm text-blue-900 leading-relaxed">
            <strong>Pro Tip:</strong> When in doubt, go one size larger. It&apos;s easier to work with extra space than to struggle with a size that&apos;s too small for your needs.
          </div>
        </div>
      </div>
    </div>
  )
}
