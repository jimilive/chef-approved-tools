import Link from 'next/link'

interface RelatedArticle {
  name: string
  description: string
  emoji: string
  href: string
}

interface RelatedArticlesGridProps {
  title: string
  articles: RelatedArticle[]
}

export default function RelatedArticlesGrid({
  title,
  articles
}: RelatedArticlesGridProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article, index) => (
          <Link key={index} href={article.href} className="group no-underline">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="w-full aspect-[3/1] bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <span className="text-5xl">{article.emoji}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {article.name}
                </h3>
                <p className="text-sm text-slate-700 mb-3 flex-1">
                  {article.description}
                </p>
                <div className="text-orange-700 font-semibold text-sm">
                  Read Article →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
