import Link from 'next/link'
import { ReactNode } from 'react'

interface TestingEnvironmentItem {
  label: string
  value: string
}

interface TestingResultsGridProps {
  title: string
  sections: {
    title: string
    content: ReactNode
  }[]
  testingEnvironment: TestingEnvironmentItem[]
  outstandingPerformance: string[]
  minorConsiderations: string[]
}

export default function TestingResultsGrid({
  title,
  sections,
  testingEnvironment,
  outstandingPerformance,
  minorConsiderations
}: TestingResultsGridProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      {/* Prose content sections */}
      {sections.map((section, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0">{section.title}</h3>
          <div className="text-slate-600 leading-[1.7]">
            {section.content}
          </div>
        </div>
      ))}

      {/* Testing Environment & Performance Results */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4 mt-0">Testing Environment</h4>
          <ul className="list-none p-0 m-0">
            {testingEnvironment.map((item, index) => (
              <li key={index} className="text-slate-600 py-2 border-b border-gray-100 last:border-0">
                <strong className="text-slate-900 font-semibold">{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900 mb-4 mt-0">Performance Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 rounded-lg p-5">
              <h4 className="text-base font-semibold mb-3 mt-0 flex items-center gap-2 text-green-700">
                ✅ Outstanding Performance
              </h4>
              <ul className="list-none p-0 m-0">
                {outstandingPerformance.map((item, index) => (
                  <li key={index} className="text-sm py-1.5 pl-5 relative text-green-900 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-xl">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <h4 className="text-base font-semibold mb-3 mt-0 flex items-center gap-2 text-orange-700">
                ⚠️ Minor Considerations
              </h4>
              <ul className="list-none p-0 m-0">
                {minorConsiderations.map((item, index) => (
                  <li key={index} className="text-sm py-1.5 pl-5 relative text-amber-900 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-xl">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
