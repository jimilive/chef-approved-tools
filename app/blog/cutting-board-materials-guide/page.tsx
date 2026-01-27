// ============================================================================
// CUTTING BOARD MATERIALS GUIDE - Educational Blog Page (Data-Driven)
// Migrated from inline (554 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { Target } from 'lucide-react'
import { educationalData } from './cutting-board-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'
import { getBlogMetadata } from '@/data/metadata'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('cutting-board-materials-guide')

export default function CuttingBoardMaterialsPage() {
  const blogMeta = getBlogMetadata('cutting-board-materials-guide')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'cutting-board-materials-guide',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/cutting-board-materials-guide' }
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
      bestFor?: string
      avoidFor?: string
      proTip?: string
    }[]
  }

  const chooseSection = educationalData.sections[3] as {
    id: string
    title: string
    intro: string
    recommendation: { board: string; use: string }[]
    closing: string
    scraperTip: { text: string; link: string; linkText: string; suffix: string }
    newsletterCta: { title: string; description: string; buttonText: string; buttonLink: string }
  }

  const mistakesSection = educationalData.sections[4] as {
    id: string
    title: string
    mistakes: { number: number; title: string; problem: string; fix: string }[]
  }

  const equipmentSection = educationalData.sections[5] as {
    id: string
    title: string
    recommendations: { material: string; product: string; link?: string; description: string }[]
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
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
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
              {material.bestFor && (
                <p>
                  <strong>Best for:</strong> {material.bestFor}<br />
                  <strong>Avoid for:</strong> {material.avoidFor}
                </p>
              )}
              {material.proTip && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                  <p className="text-blue-800 mb-0">
                    <strong>Pro Tip:</strong> {material.proTip}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Choose Section */}
          <h2 id={chooseSection.id}>{chooseSection.title}</h2>
          <p>{chooseSection.intro}</p>
          <p><strong>My Professional Recommendation:</strong></p>
          <ul>
            {chooseSection.recommendation.map((item, index) => (
              <li key={index}><strong>{item.board}</strong>: {item.use}</li>
            ))}
          </ul>
          <p>{chooseSection.closing}</p>
          <p>
            <strong>Bonus:</strong> {chooseSection.scraperTip.text}{' '}
            <CTAVisibilityTracker
              ctaId="blog-cutting-board-materials-scraper-1"
              position="mid_article"
              productSlug="cutting-board-materials-guide"
              merchant="internal"
            >
              <Link href={chooseSection.scraperTip.link} className="text-blue-700 underline">
                {chooseSection.scraperTip.linkText}
              </Link>
            </CTAVisibilityTracker>
            {' '}{chooseSection.scraperTip.suffix}
          </p>

          {/* Newsletter CTA */}
          <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              {chooseSection.newsletterCta.title}
            </h3>
            <p className="text-yellow-800 mb-4">
              {chooseSection.newsletterCta.description}
            </p>
            <CTAVisibilityTracker
              ctaId="blog-cutting-board-materials-newsletter-cta-1"
              position="mid_article"
              productSlug="cutting-board-materials-guide"
              merchant="internal"
            >
              <Link
                href={chooseSection.newsletterCta.buttonLink}
                className="bg-orange-900 !text-white hover:bg-orange-800 px-6 py-2 rounded-lg font-semibold transition-colors inline-block"
              >
                {chooseSection.newsletterCta.buttonText}
              </Link>
            </CTAVisibilityTracker>
          </div>

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
            <h3 className="font-bold text-slate-800 mb-4">Top Cutting Board Picks</h3>
            <ul className="space-y-3">
              {equipmentSection.recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.material}:</strong>{' '}
                  {rec.link ? (
                    <CTAVisibilityTracker
                      ctaId={`blog-cutting-board-materials-${rec.material.toLowerCase().replace(/\s+/g, '-')}-pick`}
                      position="mid_article"
                      productSlug="cutting-board-materials-guide"
                      merchant="internal"
                    >
                      <Link href={rec.link} className="text-orange-700 hover:text-orange-800 underline">
                        {rec.product}
                      </Link>
                    </CTAVisibilityTracker>
                  ) : (
                    rec.product
                  )}
                  {' '}- {rec.description}
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
                      ctaId={`blog-cutting-board-materials-technique-${index}`}
                      position="final_cta"
                      productSlug="cutting-board-materials-guide"
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
                      ctaId={`blog-cutting-board-materials-equipment-${index}`}
                      position="final_cta"
                      productSlug="cutting-board-materials-guide"
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
                      ctaId={`blog-cutting-board-materials-buying-${index}`}
                      position="final_cta"
                      productSlug="cutting-board-materials-guide"
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
