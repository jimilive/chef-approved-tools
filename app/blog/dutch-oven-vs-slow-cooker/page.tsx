import Link from 'next/link'
import { comparisonData } from './dutch-oven-vs-slow-cooker-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import {
  BlogLayout,
  BlogHero,
  BlogQuickAnswer,
  BlogComparisonTable,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'

// CACHE-BUSTING: Prevent Next.js from serving stale HTML
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'


export const metadata = generateBlogMetadata('dutch-oven-vs-slow-cooker')

export default function DutchOvenVsSlowCookerComparison() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/dutch-oven-vs-slow-cooker' }
  ])

  const faqSchema = generateFAQSchema(comparisonData.faq.questions)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={comparisonData.breadcrumb.title}>
        <BlogHero
          title={comparisonData.hero.title}
          introduction={comparisonData.hero.introduction}
          publishedDate={comparisonData.metadata.publishedDate}
          lastUpdated={comparisonData.metadata.lastUpdated}
          readTime={comparisonData.metadata.readTime}
        />

        <BlogQuickAnswer
          optionA={comparisonData.quickAnswer.dutchOvenChoice}
          optionB={comparisonData.quickAnswer.slowCookerChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Dutch Oven"
          columnB="Slow Cooker"
          features={comparisonData.comparisonTable.features}
        />

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Detailed Comparison: What Actually Matters</h2>
          {comparisonData.detailedSections.map((section, sectionIndex) => (
            <div key={section.id} className={sectionIndex > 0 ? 'mt-8' : ''}>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">{section.title}</h3>
              {section.subsections.map((subsection, subIndex) => (
                <div key={subIndex} className={`bg-gray-50 rounded-lg p-6 ${subIndex > 0 ? 'mt-4' : ''}`}>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">{subsection.title}</h4>
                  {subsection.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-slate-700 leading-relaxed mb-3 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Which Should You Choose?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-orange-600 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.dutchOvenChoice.title}</h3>
                <ul className="space-y-3 text-slate-700">
                  {comparisonData.quickAnswer.dutchOvenChoice.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-700 text-xl mt-1 flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-blue-600 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.slowCookerChoice.title}</h3>
                <ul className="space-y-3 text-slate-700">
                  {comparisonData.quickAnswer.slowCookerChoice.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 text-xl mt-1 flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
              <p className="text-slate-700 leading-relaxed">
                <strong>Professional Perspective:</strong> Professional kitchens typically use Dutch ovens for braising when superior flavor and browning matter (fine dining applications), while institutional kitchens often use slow cookers for large-batch convenience. Many home cooks find value in owning both—Dutch oven for weekend cooking when home, slow cooker for weeknight convenience when away. If choosing one: Dutch oven for active cooks, slow cooker for busy schedules.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Top Picks for Each Type</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{comparisonData.productRecommendations.dutchOven.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {comparisonData.productRecommendations.dutchOven.products.map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                      <p className="text-sm text-slate-600 mb-1">{product.size}</p>
                      <p className="text-sm text-slate-600 mb-3">{product.priceRange}</p>
                      <p className="text-slate-700 mb-3">{product.whyBest}</p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {product.features.map((feature, fIndex) => (
                          <li key={fIndex}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{comparisonData.productRecommendations.slowCooker.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {comparisonData.productRecommendations.slowCooker.products.map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                      <p className="text-sm text-slate-600 mb-1">{product.size}</p>
                      <p className="text-sm text-slate-600 mb-3">{product.priceRange}</p>
                      <p className="text-slate-700 mb-3">{product.whyBest}</p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {product.features.map((feature, fIndex) => (
                          <li key={fIndex}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        <BlogFAQ questions={comparisonData.faq.questions} />
        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
