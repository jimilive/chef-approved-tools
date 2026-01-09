import Link from 'next/link'
import { comparisonData } from './dutch-oven-vs-slow-cooker-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  BlogLayout,
  BlogHero,
  BlogQuickAnswer,
  BlogComparisonTable,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export const metadata = generateBlogMetadata('dutch-oven-vs-slow-cooker')

export default function DutchOvenVsSlowCookerComparison() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'dutch-oven-vs-slow-cooker',
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
        <p className="text-sm text-gray-600 mt-4">
          Read our full review: <CTAVisibilityTracker ctaId="blog-dutch-oven-vs-slow-cooker-le-creuset" position="mid_article" productSlug="le-creuset-signature-7-25-qt-dutch-oven" merchant="internal"><Link href="/reviews/le-creuset-signature-7-25-qt-dutch-oven" className="text-orange-700 hover:text-orange-800">Le Creuset 7.25-Qt Dutch Oven</Link></CTAVisibilityTracker>
        </p>

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
                <strong>Professional Perspective:</strong> In 24 years working restaurant kitchens, I&apos;ve never seen a Dutch oven or slow cooker on the line—we braise in stockpots on the stove and hotel pans in the oven. Dutch ovens and slow cookers are home kitchen equipment. But the cooking principles are identical: browning builds flavor, and low-slow heat tenderizes tough cuts. For home cooks, the trade-off is active involvement (Dutch oven) versus set-and-forget convenience (slow cooker).
              </p>
              <p className="text-slate-700 mt-4">
                Considering an electric option? Read our comparison: <Link href="/blog/instant-pot-vs-crockpot" className="text-orange-700 hover:text-orange-800 underline">Instant Pot vs Crock Pot: Which One Should You Buy?</Link>
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
                      <p className="text-sm text-slate-700 mb-1">{product.size}</p>
                      <p className="text-sm text-slate-700 mb-3">{product.priceRange}</p>
                      <p className="text-slate-700 mb-3">{product.whyBest}</p>
                      <ul className="text-sm text-slate-700 space-y-1">
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
                      <p className="text-sm text-slate-700 mb-1">{product.size}</p>
                      <p className="text-sm text-slate-700 mb-3">{product.priceRange}</p>
                      <p className="text-slate-700 mb-3">{product.whyBest}</p>
                      <ul className="text-sm text-slate-700 space-y-1">
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
