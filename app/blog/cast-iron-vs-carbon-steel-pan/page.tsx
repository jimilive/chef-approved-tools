import Link from 'next/link'
import { processBoldMarkdown } from '@/lib/format-content'
import { comparisonData } from './cast-iron-vs-carbon-steel-data'
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
import { getBlogMetadata } from '@/data/metadata'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export const metadata = generateBlogMetadata('cast-iron-vs-carbon-steel-pan')

export default function CastIronVsCarbonSteelComparison() {
  const blogMeta = getBlogMetadata('cast-iron-vs-carbon-steel-pan')

  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'cast-iron-vs-carbon-steel-pan',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/cast-iron-vs-carbon-steel-pan' }
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
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <BlogQuickAnswer
          optionA={comparisonData.quickAnswer.castIronChoice}
          optionB={comparisonData.quickAnswer.carbonSteelChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Cast Iron"
          columnB="Carbon Steel"
          features={comparisonData.comparisonTable.features}
        />
        <p className="text-sm text-gray-600 mt-4">
          Read our full review: <Link href="/reviews/lodge-seasoned-cast-iron-3-skillet-bundle" className="text-orange-700 hover:text-orange-800">Lodge Cast Iron Skillet Set</Link>
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
                      <p key={pIndex} className="text-slate-700 leading-relaxed mb-3 last:mb-0">{processBoldMarkdown(paragraph)}</p>
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
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.castIronChoice.title}</h3>
                <ul className="space-y-3 text-slate-700">
                  {comparisonData.quickAnswer.castIronChoice.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-700 text-xl mt-1 flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-blue-600 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.carbonSteelChoice.title}</h3>
                <ul className="space-y-3 text-slate-700">
                  {comparisonData.quickAnswer.carbonSteelChoice.points.map((point, index) => (
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
                <strong>Professional Perspective:</strong> Professional kitchens often use both types for different applications. Cast iron for searing, baking, and oven work where heat retention matters. Carbon steel for sauté, stir-fry, and delicate proteins where temperature control and maneuverability are priorities. Many serious home cooks find value in owning both, using each for its specific strengths.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Top Picks for Each Type</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{comparisonData.productRecommendations.castIron.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {comparisonData.productRecommendations.castIron.products.map((product, index) => (
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
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{comparisonData.productRecommendations.carbonSteel.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {comparisonData.productRecommendations.carbonSteel.products.map((product, index) => (
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

        <section className="bg-slate-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Reading</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/cast-iron-seasoning-care" className="text-orange-700 hover:text-orange-800 font-semibold">
              → How to Season and Clean Cast Iron Skillets
            </Link>
            <Link href="/blog/guide-cooking-oils-smoke-points" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Guide to Cooking Oils & Smoke Points
            </Link>
          </div>
        </section>

        <BlogFAQ questions={comparisonData.faq.questions} />
        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
