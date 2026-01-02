import Link from 'next/link'
import { comparisonData } from './air-fryer-vs-toaster-oven-data'
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

export const metadata = generateBlogMetadata('air-fryer-vs-toaster-oven')

export default function AirFryerVsToasterOven() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'air-fryer-vs-toaster-oven',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/air-fryer-vs-toaster-oven' }
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
          optionA={comparisonData.quickAnswer.airFryerChoice}
          optionB={comparisonData.quickAnswer.toasterOvenChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Air Fryer"
          columnB="Toaster Oven"
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.airFryerChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.airFryerChoice.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl mt-1 flex-shrink-0">&#10003;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-blue-600 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.toasterOvenChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.toasterOvenChoice.points.map((point, index) => (
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
              <strong>Professional Perspective:</strong> Many households find value in owning both a small air fryer for quick, crispy snacks and a toaster oven for versatile cooking tasks. This combination provides maximum flexibility without requiring an expensive hybrid unit.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Recommended Products</h2>
          <p className="text-slate-700 mb-4">
            For those interested in air frying performance, the <CTAVisibilityTracker ctaId="blog-air-fryer-vs-toaster-oven-ninja-af101" position="mid_article" productSlug="ninja-air-fryer-af101" merchant="internal"><Link href="/reviews/ninja-air-fryer-af101" className="text-orange-700 hover:text-orange-800 underline">Ninja Air Fryer AF101</Link></CTAVisibilityTracker> delivers excellent results at a reasonable price. It&apos;s compact, powerful, and perfect for achieving crispy textures with minimal oil.
          </p>
          <p className="text-slate-700 mb-4">
            If versatility matters more, consider the <CTAVisibilityTracker ctaId="blog-air-fryer-vs-toaster-oven-black-decker" position="mid_article" productSlug="black-decker-toaster-oven" merchant="internal"><Link href="/reviews/black-decker-toaster-oven" className="text-orange-700 hover:text-orange-800 underline">Black+Decker Toaster Oven</Link></CTAVisibilityTracker> with convection capabilities. It handles everything from toasting to baking to air frying in one appliance.
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
