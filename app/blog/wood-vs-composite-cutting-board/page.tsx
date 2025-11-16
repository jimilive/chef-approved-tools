import Link from 'next/link'
import Image from 'next/image'
import { comparisonData } from './wood-vs-composite-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import {
  BlogLayout,
  BlogHero,
  BlogQuickAnswer,
  BlogComparisonTable,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'
import { generateBlogMetadata } from '@/lib/metadata-helpers'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export const metadata = generateBlogMetadata('wood-vs-composite-cutting-board')

export default function WoodVsCompositeComparison() {
  // Generate schemas
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
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/wood-vs-composite-cutting-board' }
  ])

  const faqSchema = generateFAQSchema(comparisonData.faq.questions)

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogLayout breadcrumbTitle={comparisonData.breadcrumb.title}>
        <BlogHero
          title={comparisonData.hero.title}
          introduction={comparisonData.hero.introduction}
          publishedDate={comparisonData.metadata.publishedDate}
          lastUpdated={comparisonData.metadata.lastUpdated}
          readTime={comparisonData.metadata.readTime}
        />

        <BlogQuickAnswer
          optionA={comparisonData.quickAnswer.woodChoice}
          optionB={comparisonData.quickAnswer.compositeChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Wood"
          columnB="Composite"
          features={comparisonData.comparisonTable.features}
        />

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Detailed Comparison: What Actually Matters
          </h2>

          {comparisonData.detailedSections.map((section, sectionIndex) => (
            <div key={section.id} className={sectionIndex > 0 ? 'mt-8' : ''}>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {section.title}
              </h3>

              {section.subsections.map((subsection, subIndex) => (
                <div key={subIndex} className={`bg-gray-50 rounded-lg p-6 ${subIndex > 0 ? 'mt-4' : ''}`}>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">
                    {subsection.title}
                  </h4>
                  {subsection.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-slate-700 leading-relaxed mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </section>

          {/* Which Should You Choose */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Which Should You Choose?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Wood Choice */}
              <div className="border-2 border-orange-600 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {comparisonData.quickAnswer.woodChoice.title}
                </h3>

                <ul className="space-y-3 text-slate-700">
                  {comparisonData.quickAnswer.woodChoice.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-700 text-xl mt-1 flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Composite Choice */}
              <div className="border-2 border-blue-600 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {comparisonData.quickAnswer.compositeChoice.title}
                </h3>

                <ul className="space-y-3 text-slate-700">
                  {comparisonData.quickAnswer.compositeChoice.points.map((point, index) => (
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
                <strong>Professional Perspective:</strong> In professional kitchens, both types serve specific purposes.
                Composite boards dominate commercial settings due to NSF certification and dishwasher sanitation.
                Wood boards are preferred by knife-focused culinary professionals and those who prioritize traditional craftsmanship.
                For home cooks, the choice often comes down to whether you value convenience (composite) or knife care and longevity (wood).
              </p>
            </div>
          </section>

          {/* Product Recommendations */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Top Picks for Each Type
            </h2>

            <div className="space-y-8">
              {/* Wood Recommendations */}
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {comparisonData.productRecommendations.wood.title}
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {comparisonData.productRecommendations.wood.products.slice(0, 2).map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h4>
                      <p className="text-sm text-slate-600 mb-1">{product.size}</p>
                      <p className="text-sm text-slate-600 mb-3">{product.priceRange}</p>
                      <p className="text-slate-700 mb-3">{product.whyBest}</p>
                      <ul className="text-sm text-slate-600 space-y-1 mb-3">
                        {product.features.map((feature, fIndex) => (
                          <li key={fIndex}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Composite Recommendations */}
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {comparisonData.productRecommendations.composite.title}
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {comparisonData.productRecommendations.composite.products.slice(0, 2).map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h4>
                      <p className="text-sm text-slate-600 mb-1">{product.size}</p>
                      <p className="text-sm text-slate-600 mb-3">{product.priceRange}</p>
                      <p className="text-slate-700 mb-3">{product.whyBest}</p>
                      <ul className="text-sm text-slate-600 space-y-1 mb-3">
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
