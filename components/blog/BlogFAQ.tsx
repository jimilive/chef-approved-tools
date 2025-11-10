interface FAQItem {
  question: string
  answer: string
}

interface BlogFAQProps {
  questions: FAQItem[]
  title?: string
}

/**
 * BlogFAQ - Standardized FAQ section for blog posts
 *
 * Renders FAQ section with consistent styling. Should be used with generateFAQSchema()
 * for proper SEO schema markup.
 *
 * @example
 * ```tsx
 * import BlogFAQ from '@/components/blog/BlogFAQ'
 * import { generateFAQSchema } from '@/lib/schema'
 *
 * const faqSchema = generateFAQSchema(comparisonData.faq.questions)
 *
 * // In page.tsx:
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
 * <BlogFAQ questions={comparisonData.faq.questions} />
 * ```
 */
export default function BlogFAQ({ questions, title = 'Common Questions' }: BlogFAQProps) {
  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {questions.map((item, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.question}</h3>
            <p className="text-slate-700 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
