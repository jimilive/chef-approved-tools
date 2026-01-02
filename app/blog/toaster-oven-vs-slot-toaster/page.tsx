import Link from 'next/link'
import { comparisonData } from './toaster-oven-vs-slot-toaster-data'
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

export const metadata = generateBlogMetadata('toaster-oven-vs-slot-toaster')

export default function ToasterOvenVsSlotToaster() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'toaster-oven-vs-slot-toaster',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/toaster-oven-vs-slot-toaster' }
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
          optionA={comparisonData.quickAnswer.toasterOvenChoice}
          optionB={comparisonData.quickAnswer.slotToasterChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Toaster Oven"
          columnB="Slot Toaster"
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.toasterOvenChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.toasterOvenChoice.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl mt-1 flex-shrink-0">&#10003;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-blue-600 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.slotToasterChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.slotToasterChoice.points.map((point, index) => (
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
              <strong>Professional Perspective:</strong> After 24 years of professional cooking, here&apos;s what I&apos;d tell you: buy based on how you actually cook. If your morning routine depends on perfect toast and you have a working oven, get a quality slot toaster. If you want a small oven replacement that happens to also make toast, get a toaster oven and accept the trade-offs in toast speed and consistency. For toast quality and efficiency, slot toasters win. For versatility, toaster ovens win.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Recommended Toaster Oven</h2>
          <p className="text-slate-700 mb-4">
            If versatility matters to you, the <CTAVisibilityTracker ctaId="blog-toaster-oven-vs-slot-black-decker" position="mid_article" productSlug="black-decker-toaster-oven" merchant="internal"><Link href="/reviews/black-decker-toaster-oven" className="text-orange-700 hover:text-orange-800 underline">Black+Decker Toaster Oven</Link></CTAVisibilityTracker> offers solid performance for small households. It handles toast, reheating, and small baking tasks without dominating your counter space. The controls are straightforward, cleanup is simple, and the build quality holds up to daily use.
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
