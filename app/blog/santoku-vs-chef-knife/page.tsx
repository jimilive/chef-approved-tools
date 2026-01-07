import Link from 'next/link'
import { comparisonData } from './santoku-vs-chef-knife-data'
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

export const metadata = generateBlogMetadata('santoku-vs-chef-knife')

export default function SantokuVsChefKnife() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'santoku-vs-chef-knife',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/santoku-vs-chef-knife' }
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
          optionA={comparisonData.quickAnswer.chefKnifeChoice}
          optionB={comparisonData.quickAnswer.santokuChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Chef's Knife"
          columnB="Santoku"
          features={comparisonData.comparisonTable.features}
        />

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Detailed Comparison</h2>
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.chefKnifeChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.chefKnifeChoice.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl mt-1 flex-shrink-0">&#10003;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-blue-600 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{comparisonData.quickAnswer.santokuChoice.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {comparisonData.quickAnswer.santokuChoice.points.map((point, index) => (
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
              <strong>Professional Perspective:</strong> The santoku and chef&apos;s knife aren&apos;t competitors—they&apos;re complementary tools. After 24 years in professional kitchens using both, here&apos;s my recommendation: Start with an 8-inch chef&apos;s knife. It handles everything competently. Once you&apos;re cooking regularly and find yourself doing heavy vegetable prep, add a santoku for the tasks where precision matters.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Recommended Knives</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{comparisonData.productRecommendations.chefKnife.title}</h3>
              <p className="text-slate-700 mb-4">{comparisonData.productRecommendations.chefKnife.description}</p>
              <ul className="text-sm text-slate-700 space-y-1 mb-4">
                {comparisonData.productRecommendations.chefKnife.features.map((feature, index) => (
                  <li key={index}>&#8226; {feature}</li>
                ))}
              </ul>
              <CTAVisibilityTracker ctaId="santoku-vs-chef-victorinox" position="mid_article" productSlug="victorinox-fibrox-8-inch-chefs-knife" merchant="internal">
                <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-700 hover:text-orange-800 font-semibold">
                  Read full Victorinox review &rarr;
                </Link>
              </CTAVisibilityTracker>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{comparisonData.productRecommendations.santoku.title}</h3>
              <p className="text-slate-700 mb-4">{comparisonData.productRecommendations.santoku.description}</p>
              <ul className="text-sm text-slate-700 space-y-1 mb-4">
                {comparisonData.productRecommendations.santoku.features.map((feature, index) => (
                  <li key={index}>&#8226; {feature}</li>
                ))}
              </ul>
              <CTAVisibilityTracker ctaId="santoku-vs-chef-wusthof" position="mid_article" productSlug="wusthof-classic-ikon-santoku" merchant="internal">
                <Link href="/reviews/wusthof-classic-ikon-santoku" className="text-orange-700 hover:text-orange-800 font-semibold">
                  Read full Wusthof Santoku review &rarr;
                </Link>
              </CTAVisibilityTracker>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Reading</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comparisonData.relatedLinks.map((link, index) => (
              <Link key={index} href={link.href} className="text-orange-700 hover:text-orange-800 font-semibold">
                &rarr; {link.title}
              </Link>
            ))}
          </div>
        </section>

        <BlogFAQ questions={comparisonData.faq.questions} />
        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
