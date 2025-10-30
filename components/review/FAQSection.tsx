import { ReactNode } from 'react'

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQSectionProps {
  title: string
  faqs: FAQItem[]
}

export default function FAQSection({
  title,
  faqs
}: FAQSectionProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 mt-0">
              {faq.question}
            </h3>
            <div className="text-[15px] text-slate-600 leading-relaxed space-y-4">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
