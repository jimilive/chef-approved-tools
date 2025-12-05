interface QuickAnswerOption {
  title: string
  points: string[]
}

interface BlogQuickAnswerProps {
  optionA: QuickAnswerOption
  optionB: QuickAnswerOption
}

/**
 * BlogQuickAnswer - TL;DR section for comparison posts
 *
 * Displays "Choose if" recommendations for both options in a comparison.
 * Orange border styling matches site design system.
 *
 * @example
 * ```tsx
 * import { BlogQuickAnswer } from '@/components/blog'
 *
 * <BlogQuickAnswer
 *   optionA={{
 *     title: "Choose Carbon Steel If:",
 *     points: [
 *       "You want maximum sharpness",
 *       "You're willing to maintain daily",
 *       "You appreciate patina development"
 *     ]
 *   }}
 *   optionB={{
 *     title: "Choose Stainless Steel If:",
 *     points: [
 *       "You want minimal maintenance",
 *       "Rust resistance is priority",
 *       "You cut acidic foods frequently"
 *     ]
 *   }}
 * />
 * ```
 */
export default function BlogQuickAnswer({ optionA, optionB }: BlogQuickAnswerProps) {
  return (
    <section className="bg-orange-50 border-l-4 border-orange-600 rounded-r-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Quick Answer</h2>
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-slate-900 mb-2">
            <span className="text-orange-700">{optionA.title}</span>
          </p>
          <ul className="space-y-1 text-slate-700 ml-4">
            {optionA.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-900 mb-2">
            <span className="text-orange-700">{optionB.title}</span>
          </p>
          <ul className="space-y-1 text-slate-700 ml-4">
            {optionB.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-slate-700 pt-2">
          Keep reading for detailed performance testing and professional insights.
        </p>
      </div>
    </section>
  )
}
