import Link from 'next/link'
import { comparisonData } from './ninja-vs-vitamix-data'
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

export const revalidate = 3600

export const metadata = generateBlogMetadata('ninja-vs-vitamix')

export default function NinjaVsVitamix() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'ninja-vs-vitamix',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/ninja-vs-vitamix' }
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
          optionA={comparisonData.quickAnswer.vitamixChoice}
          optionB={comparisonData.quickAnswer.ninjaChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Vitamix"
          columnB="Ninja"
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
            <div className="border-2 border-green-600 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.vitamixChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.vitamixChoice.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl mt-1 flex-shrink-0">&#10003;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-blue-600 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.ninjaChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.ninjaChoice.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl mt-1 flex-shrink-0">&#10003;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
            <p className="text-slate-700 leading-relaxed">
              <strong>Professional Perspective:</strong> For serious home cooks and health enthusiasts who blend daily, Vitamix represents better long-term value despite the higher initial cost. The superior performance, durability, and warranty make it a buy-it-for-life investment. For occasional users or those on tight budgets, Ninja offers adequate performance at an accessible price point.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Recommended Products</h2>
          <p className="text-slate-700 mb-4">
            The <CTAVisibilityTracker ctaId="blog-ninja-vs-vitamix-vitamix-5200" position="mid_article" productSlug="vitamix-5200-professional-blender" merchant="internal"><Link href="/reviews/vitamix-5200-professional-blender" className="text-orange-700 hover:text-orange-800 underline">Vitamix 5200 Professional Blender</Link></CTAVisibilityTracker> delivers exceptional performance and reliability for those seeking the best. It&apos;s a professional-grade blender that will last for decades with proper care.
          </p>
          <p className="text-slate-700 mb-4">
            For a more budget-friendly option, the <CTAVisibilityTracker ctaId="blog-ninja-vs-vitamix-ninja-bl660" position="mid_article" productSlug="ninja-bl660-professional-blender" merchant="internal"><Link href="/reviews/ninja-bl660-professional-blender" className="text-orange-700 hover:text-orange-800 underline">Ninja BL660 Professional Blender</Link></CTAVisibilityTracker> provides solid everyday blending at a fraction of the cost.
          </p>
          <p className="text-slate-700">
            Browse our full selection of <Link href="/appliances" className="text-orange-700 hover:text-orange-800 underline">kitchen appliances</Link> for more options.
          </p>
        </section>

        <BlogFAQ questions={comparisonData.faq.questions} />
        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
