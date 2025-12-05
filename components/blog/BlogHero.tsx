interface BlogHeroProps {
  title: string
  introduction: string[]
  publishedDate: string
  lastUpdated: string
  readTime: string
  authorName?: string
  authorYears?: string
}

/**
 * BlogHero - Standardized hero section for blog posts
 *
 * Displays article title, author info, dates, and introduction paragraphs.
 * Ensures consistent styling and structure across all blog posts.
 *
 * @example
 * ```tsx
 * import BlogHero from '@/components/blog/BlogHero'
 *
 * <BlogHero
 *   title={comparisonData.hero.title}
 *   introduction={comparisonData.hero.introduction}
 *   publishedDate={comparisonData.metadata.publishedDate}
 *   lastUpdated={comparisonData.metadata.lastUpdated}
 *   readTime={comparisonData.metadata.readTime}
 * />
 * ```
 */
export default function BlogHero({
  title,
  introduction,
  publishedDate,
  lastUpdated,
  readTime,
  authorName = 'Scott Bradley',
  authorYears = '24 years professional kitchen experience'
}: BlogHeroProps) {
  return (
    <>
      {/* Date Stamps */}
      <div className="text-sm text-slate-700 mb-4">
        <time dateTime={publishedDate}>
          {new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        {' • '}
        <span>Updated: <time dateTime={lastUpdated}>
          {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time></span>
      </div>

      {/* Hero Article */}
      <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-700 mb-6">
          <span>By {authorName}</span>
          <span>•</span>
          <span>{authorYears}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <div className="prose prose-lg max-w-none">
          {introduction.map((paragraph, index) => (
            <p key={index} className={`text-slate-700 leading-relaxed mb-4 ${index === 0 ? 'text-lg' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  )
}
