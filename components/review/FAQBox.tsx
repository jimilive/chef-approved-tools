import Link from 'next/link'

/**
 * FAQ Box Component - Handles complex FAQ answers with lists, sections, and rich text
 *
 * Supports multiple answer formats:
 * 1. Simple text answers
 * 2. Answers with bullet lists (ordered or unordered)
 * 3. Answers with multiple sections and nested lists
 * 4. Answers with inline links
 */

export interface FAQItem {
  question: string
  answer: string | FAQAnswer
}

export interface FAQAnswer {
  intro?: string
  sections?: FAQSection[]
  lists?: FAQList[]
  conclusion?: string
}

export interface FAQSection {
  heading?: string
  text?: string
  items?: string[]
  listType?: 'ul' | 'ol'
}

export interface FAQList {
  heading?: string
  items: string[]
  type?: 'ul' | 'ol'
}

interface FAQBoxProps {
  question: string
  answer: string | FAQAnswer
}

export default function FAQBox({ question, answer }: FAQBoxProps) {
  return (
    <div className="my-5 p-5 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mt-0">{question}</h3>
      <div>
        {typeof answer === 'string' ? (
          // Simple text answer
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        ) : (
          // Complex structured answer
          <>
            {answer.intro && <p className="mb-4">{answer.intro}</p>}

            {answer.sections?.map((section, idx) => (
              <div key={idx} className="mb-4">
                {section.heading && <p className="font-semibold mb-2">{section.heading}</p>}
                {section.text && <p className="mb-2">{section.text}</p>}
                {section.items && section.items.length > 0 && (
                  section.listType === 'ol' ? (
                    <ol className="ml-5 leading-relaxed list-decimal">
                      {section.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ol>
                  ) : (
                    <ul className="ml-5 leading-relaxed">
                      {section.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  )
                )}
              </div>
            ))}

            {answer.lists?.map((list, idx) => (
              <div key={idx} className="mb-4">
                {list.heading && <p className="font-semibold mb-2">{list.heading}</p>}
                {list.type === 'ol' ? (
                  <ol className="ml-5 leading-relaxed list-decimal">
                    {list.items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ol>
                ) : (
                  <ul className="ml-5 leading-relaxed">
                    {list.items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {answer.conclusion && <p className="mt-4">{answer.conclusion}</p>}
          </>
        )}
      </div>
    </div>
  )
}

/**
 * FAQ Grid Component - Renders multiple FAQs in a grid
 */
interface FAQGridProps {
  faqs: FAQItem[]
}

export function FAQGrid({ faqs }: FAQGridProps) {
  return (
    <div>
      {faqs.map((faq, index) => (
        <FAQBox key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  )
}
