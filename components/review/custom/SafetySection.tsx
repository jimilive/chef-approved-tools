import { ReactNode } from 'react'

interface SafetySectionProps {
  title: string
  warnings: ReactNode[]
  guidelines: {
    title: string
    items: string[]
  }
}

export default function SafetySection({
  title,
  warnings,
  guidelines
}: SafetySectionProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      {/* Critical Warnings */}
      <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl flex-shrink-0">⚠️</div>
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-2 mt-0">CRITICAL SAFETY WARNINGS</h3>
            <p className="text-sm text-red-800 m-0">
              Read and understand these warnings before use. Failure to follow safety guidelines can result in serious injury.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {warnings.map((warning, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
              <div className="text-red-900 font-semibold leading-relaxed">
                {warning}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0 flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          {guidelines.title}
        </h3>
        <ul className="list-none p-0 m-0">
          {guidelines.items.map((item, index) => (
            <li
              key={index}
              className="py-3 pl-6 relative leading-relaxed text-slate-700 border-b border-gray-100 last:border-0 before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
