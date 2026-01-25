// ============================================================================
// COOKWARE MATERIALS EXPLAINED - Educational Blog Page (Data-Driven)
// Migrated from inline (509 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { educationalData } from './cookware-materials-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA'
import AuthorBio from '@/components/review/AuthorBio'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('cookware-materials-explained')

export default function CookwareMaterialsPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'cookware-materials-explained',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/cookware-materials-explained' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
  }

  const problemSection = educationalData.sections[1] as {
    id: string
    title: string
    content: string[]
  }

  const materialsSection = educationalData.sections[2] as {
    id: string
    title: string
    materials: {
      name: string
      subtitle: string
      pros: string
      cons: string
      description: string
      useFor?: string
      avoidFor?: string
      extra?: string
      proTip: { content: string; link?: { href: string; text: string } }
    }[]
  }

  const setupSection = educationalData.sections[3] as {
    id: string
    title: string
    intro: string
    coreSetup: { item: string; use: string }[]
    closing: string
  }

  const mistakesSection = educationalData.sections[4] as {
    id: string
    title: string
    mistakes: { number: number; title: string; problem: string; fix: string }[]
  }

  const equipmentSection = educationalData.sections[5] as {
    id: string
    title: string
    recommendations: { material: string; product: string; link?: string }[]
  }

  const conclusionSection = educationalData.sections[6] as {
    id: string
    title: string
    content: string[]
    relatedGuides: {
      techniques: { href: string; title: string }[]
      equipment: { href: string; title: string }[]
      buyingGuides: { href: string; title: string }[]
    }
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={educationalData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={educationalData.hero.title}
          introduction={educationalData.hero.introduction}
          publishedDate={educationalData.metadata.publishedDate}
          lastUpdated={educationalData.metadata.lastUpdated}
          readTime={educationalData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {educationalData.tableOfContents.map((item, index) => (
                <li key={index}>
                  • <a href={`#${item.id}`} className="text-blue-700 underline">{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Problem Section */}
          <h2 id={problemSection.id}>{problemSection.title}</h2>
          {problemSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Materials Section */}
          <h2 id={materialsSection.id}>{materialsSection.title}</h2>
          {materialsSection.materials.map((material, index) => (
            <div key={index}>
              <h3>{index + 1}. {material.name}: {material.subtitle}</h3>
              <p><strong>Pros:</strong> {material.pros}</p>
              <p><strong>Cons:</strong> {material.cons}</p>
              <p>{material.description}</p>
              {material.useFor && (
                <p>
                  <strong>Use for:</strong> {material.useFor}<br />
                  <strong>Avoid for:</strong> {material.avoidFor}
                </p>
              )}
              {material.extra && <p>{material.extra}</p>}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                <p className="text-blue-800 mb-0">
                  <strong>Pro Tip:</strong> {material.proTip.content}
                  {material.proTip.link && (
                    <>
                      {' '}See{' '}
                      <CTAVisibilityTracker
                        ctaId={`blog-cookware-materials-${material.name.toLowerCase().replace(/\s+/g, '-')}-guide`}
                        position="mid_article"
                        productSlug="cookware-materials-explained"
                        merchant="internal"
                      >
                        <Link href={material.proTip.link.href} className="text-blue-800 underline">
                          {material.proTip.link.text}
                        </Link>
                      </CTAVisibilityTracker>.
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}

          {/* Setup Section */}
          <h2 id={setupSection.id}>{setupSection.title}</h2>
          <p>{setupSection.intro}</p>
          <p><strong>Chef&apos;s Core Setup:</strong></p>
          <ul>
            {setupSection.coreSetup.map((item, index) => (
              <li key={index}><strong>{item.item}</strong> – {item.use}</li>
            ))}
          </ul>
          <p>{setupSection.closing}</p>

          <BlogNewsletterCTA slug="cookware-materials-explained" />

          {/* Mistakes Section */}
          <h2 id={mistakesSection.id}>{mistakesSection.title}</h2>
          {mistakesSection.mistakes.map((mistake) => (
            <div key={mistake.number}>
              <h3>Mistake #{mistake.number}: {mistake.title}</h3>
              <p>{mistake.problem}</p>
              <p><strong>Fix:</strong> {mistake.fix}</p>
            </div>
          ))}

          {/* Equipment Section */}
          <h2 id={equipmentSection.id}>{equipmentSection.title}</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-slate-800 mb-4">Top Cookware by Material</h3>
            <ul className="space-y-3">
              {equipmentSection.recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.material}:</strong>{' '}
                  {rec.link ? (
                    <CTAVisibilityTracker
                      ctaId={`blog-cookware-materials-${rec.material.toLowerCase()}-pick`}
                      position="mid_article"
                      productSlug="cookware-materials-explained"
                      merchant="internal"
                    >
                      <Link href={rec.link} className="text-orange-700 hover:text-orange-800 underline">
                        {rec.product}
                      </Link>
                    </CTAVisibilityTracker>
                  ) : (
                    rec.product
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Related Guides */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-orange-800 mb-3">Keep Learning: Related Guides</h3>

            <div className="mb-6">
              <h4 className="font-bold text-orange-800 mb-2">Technique Guides:</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                {conclusionSection.relatedGuides.techniques.map((guide, index) => (
                  <li key={index}>
                    •{' '}
                    <CTAVisibilityTracker
                      ctaId={`blog-cookware-materials-technique-${index}`}
                      position="final_cta"
                      productSlug="cookware-materials-explained"
                      merchant="internal"
                    >
                      <Link href={guide.href} className="text-orange-700 underline">
                        {guide.title}
                      </Link>
                    </CTAVisibilityTracker>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-orange-800 mb-2">Essential Equipment:</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                {conclusionSection.relatedGuides.equipment.map((guide, index) => (
                  <li key={index}>
                    •{' '}
                    <CTAVisibilityTracker
                      ctaId={`blog-cookware-materials-equipment-${index}`}
                      position="final_cta"
                      productSlug="cookware-materials-explained"
                      merchant="internal"
                    >
                      <Link href={guide.href} className="text-orange-700 underline">
                        {guide.title}
                      </Link>
                    </CTAVisibilityTracker>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-orange-800 mb-2">Complete Buying Guides:</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                {conclusionSection.relatedGuides.buyingGuides.map((guide, index) => (
                  <li key={index}>
                    •{' '}
                    <CTAVisibilityTracker
                      ctaId={`blog-cookware-materials-buying-${index}`}
                      position="final_cta"
                      productSlug="cookware-materials-explained"
                      merchant="internal"
                    >
                      <Link href={guide.href} className="text-orange-700 underline">
                        {guide.title}
                      </Link>
                    </CTAVisibilityTracker>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Reading */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationalData.relatedArticles.map((article, index) => (
              <Link
                key={index}
                href={article.href}
                className="text-orange-700 hover:text-orange-800 font-semibold"
              >
                → {article.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Email Capture */}
        <BlogEmailCapture />

        {/* Author Bio */}
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
