import { ReactNode } from 'react'

interface PerformanceSection {
  title: string
  content: ReactNode
  metrics?: {
    label: string
    score: string
    maxScore: string
  }[]
  bulletPoints?: {
    label: string
    value: string
  }[]
}

interface PerformanceAnalysisProps {
  title: string
  sections: PerformanceSection[]
}

export default function PerformanceAnalysis({
  title,
  sections
}: PerformanceAnalysisProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      {sections.map((section, index) => (
        <div
          key={index}
          className={`bg-white border border-gray-200 rounded-xl p-6 ${
            index < sections.length - 1 ? 'mb-6' : ''
          }`}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0">{section.title}</h3>
          <div className="text-slate-600 leading-[1.7]">
            {section.content}
          </div>

          {/* Optional metrics grid */}
          {section.metrics && section.metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              {section.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-green-700 mb-2">
                    {metric.score}/{metric.maxScore}
                  </div>
                  <div className="text-sm text-slate-600 leading-snug">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Optional bullet points list */}
          {section.bulletPoints && section.bulletPoints.length > 0 && (
            <ul className="list-none p-0 m-0 mt-4">
              {section.bulletPoints.map((point, pointIndex) => (
                <li
                  key={pointIndex}
                  className="text-slate-600 py-2 pl-6 relative leading-relaxed before:content-['•'] before:absolute before:left-0 before:text-orange-700 before:font-bold before:text-xl"
                >
                  <strong className="text-slate-900 font-semibold">{point.label}:</strong> {point.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
