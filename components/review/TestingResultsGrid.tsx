import Link from 'next/link'
import { ReactNode } from 'react'
import { processBoldMarkdown } from '@/lib/format-content'

interface TestingEnvironmentItem {
  label: string
  value: string
}

interface SectionLink {
  text: string
  href: string
}

interface TestingSection {
  title: string
  content: ReactNode
  links?: SectionLink[]
}

interface TestingResultsGridProps {
  title: string
  sections: TestingSection[]
  testingEnvironment: TestingEnvironmentItem[]
  outstandingPerformance: string[]
  minorConsiderations: string[]
}

// Helper to process content and inject links
function processContentWithLinks(content: ReactNode, links?: SectionLink[]): ReactNode {
  // If content is not a string, return as-is
  if (typeof content !== 'string') {
    return content
  }

  // If no links, just process bold markdown
  if (!links || links.length === 0) {
    return processBoldMarkdown(content)
  }

  // Build result by finding and replacing link text
  let result: (string | JSX.Element)[] = [content]

  links.forEach((link, linkIndex) => {
    const newResult: (string | JSX.Element)[] = []

    result.forEach((part, partIndex) => {
      if (typeof part !== 'string') {
        newResult.push(part)
        return
      }

      const splitIndex = part.indexOf(link.text)
      if (splitIndex === -1) {
        newResult.push(part)
        return
      }

      // Split and insert link
      const before = part.slice(0, splitIndex)
      const after = part.slice(splitIndex + link.text.length)

      if (before) newResult.push(before)
      newResult.push(
        <Link
          key={`link-${linkIndex}-${partIndex}`}
          href={link.href}
          className="text-orange-700 hover:text-orange-800 underline"
        >
          {link.text}
        </Link>
      )
      if (after) newResult.push(after)
    })

    result = newResult
  })

  return <>{result.map((part, i) => typeof part === 'string' ? <span key={`bold-${i}`}>{processBoldMarkdown(part)}</span> : part)}</>
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
          <div className="text-slate-700 leading-[1.7]">
            {processContentWithLinks(section.content, section.links)}
          </div>
        </div>
      ))}

      {/* Testing Environment & Performance Results */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0">Testing Environment</h3>
          <ul className="list-none p-0 m-0">
            {testingEnvironment.map((item, index) => (
              <li key={index} className="text-slate-700 py-2 border-b border-gray-100 last:border-0">
                <strong className="text-slate-900 font-semibold">{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0">Performance Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-base font-semibold mb-3 mt-0 flex items-center gap-2 text-green-800">
                ✅ Outstanding Performance
              </p>
              <ul className="list-none p-0 m-0">
                {outstandingPerformance.map((item, index) => (
                  <li key={index} className="text-sm py-1.5 pl-5 relative text-green-900 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-xl">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-base font-semibold mb-3 mt-0 flex items-center gap-2 text-orange-800">
                ⚠️ Minor Considerations
              </p>
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
