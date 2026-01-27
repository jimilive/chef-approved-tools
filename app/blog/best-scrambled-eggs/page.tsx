// ============================================================================
// BEST SCRAMBLED EGGS - Educational Blog Page (Data-Driven)
// Migrated from inline (619 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { educationalData } from './scrambled-eggs-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
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
export const metadata = generateBlogMetadata('best-scrambled-eggs')

export default function BestScrambledEggsPage() {
  const blogMeta = getBlogMetadata('best-scrambled-eggs')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'best-scrambled-eggs',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/best-scrambled-eggs' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as { id: string; title: string; content: string[] }

  const whySection = educationalData.sections[1] as {
    id: string
    title: string
    intro: string
    benefits: { label: string; value: string }[]
    purpleCafe: { content: string }
  }

  const equipmentSection = educationalData.sections[2] as {
    id: string
    title: string
    ingredients: { title: string; items: string[]; saltLink: { href: string; text: string } }
    equipment: { title: string; items: { name: string; description: string; link?: string; linkText?: string }[] }
    note: string
  }

  const techniqueSection = educationalData.sections[3] as {
    id: string
    title: string
    steps: { step: number; title: string; content: string; panLink?: boolean }[]
    keyTechnique: string
  }

  const noMilkSection = educationalData.sections[4] as {
    id: string
    title: string
    intro: string
    reasons: { label: string; reason: string }[]
    conclusion: string
  }

  const tipsSection = educationalData.sections[5] as {
    id: string
    title: string
    tips: { tip: string; detail: string; panLink?: boolean }[]
    proInsight: string
  }

  const problemsSection = educationalData.sections[6] as {
    id: string
    title: string
    problemsTable: { headers: string[]; rows: { cells: string[]; panLink?: boolean }[] }
  }

  const variationsSection = educationalData.sections[7] as {
    id: string
    title: string
    intro: string
    variations: { name: string; description: string }[]
    warning: string
  }

  const cleanupSection = educationalData.sections[8] as {
    id: string
    title: string
    intro: string
    points: string[]
    tools: { name: string; link: string }[]
  }

  const storySection = educationalData.sections[9] as { id: string; title: string; content: string[] }

  const bottomLineSection = educationalData.sections[10] as { id: string; title: string; content: string[] }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToSchema
        name={educationalData.howToSchema.name}
        description={educationalData.howToSchema.description}
        datePublished={educationalData.howToSchema.datePublished}
        totalTime={educationalData.howToSchema.totalTime}
        tools={educationalData.howToSchema.tools}
        steps={educationalData.howToSchema.steps}
      />

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
            <p key={index} className="text-slate-700 leading-relaxed">{paragraph}</p>
          ))}

          {/* Why This Method Works */}
          <h2>{whySection.title}</h2>
          <p>{whySection.intro}</p>
          <ul>
            {whySection.benefits.map((benefit, index) => (
              <li key={index}>
                <strong>{benefit.label}:</strong> {benefit.value}
              </li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>From Purple Café:</strong> {whySection.purpleCafe.content}
            </p>
          </div>

          {/* Equipment Section */}
          <h2>{equipmentSection.title}</h2>

          <h3>{equipmentSection.ingredients.title}</h3>
          <ul>
            {equipmentSection.ingredients.items.map((item, index) => {
              if (item.includes("Pinch of salt")) {
                return (
                  <li key={index}>
                    Pinch of salt (I use{' '}
                    <CTAVisibilityTracker
                      ctaId="blog-scrambled-eggs-salt-1"
                      position="mid_article"
                      productSlug="best-scrambled-eggs"
                      merchant="internal"
                    >
                      <Link href={equipmentSection.ingredients.saltLink.href} className="text-blue-700 underline">
                        {equipmentSection.ingredients.saltLink.text}
                      </Link>
                    </CTAVisibilityTracker>{' '}
                    for best flavor control)
                  </li>
                )
              }
              return <li key={index}>{item}</li>
            })}
          </ul>

          <h3>{equipmentSection.equipment.title}</h3>
          <ul>
            {equipmentSection.equipment.items.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> — {item.description}
                {item.link && (
                  <>
                    {' '}I use the{' '}
                    <CTAVisibilityTracker
                      ctaId={`blog-scrambled-eggs-equipment-${index}`}
                      position="mid_article"
                      productSlug="best-scrambled-eggs"
                      merchant="internal"
                    >
                      <Link href={item.link} className="text-blue-700 underline">
                        {item.linkText}
                      </Link>
                    </CTAVisibilityTracker>
                    {' '}for this technique—the nonstick surface and even heating are ideal for eggs.
                  </>
                )}
              </li>
            ))}
          </ul>
          <p>{equipmentSection.note}</p>

          {/* Technique Section */}
          <h2>{techniqueSection.title}</h2>
          <ol>
            {techniqueSection.steps.map((step) => (
              <li key={step.step}>
                <strong>{step.title}:</strong>{' '}
                {step.panLink ? (
                  <>
                    Place your{' '}
                    <CTAVisibilityTracker
                      ctaId={`blog-scrambled-eggs-technique-${step.step}`}
                      position="mid_article"
                      productSlug="best-scrambled-eggs"
                      merchant="internal"
                    >
                      <Link href="/reviews/cuisinart-8-inch-nonstick-pan" className="text-blue-700 underline">
                        nonstick pan
                      </Link>
                    </CTAVisibilityTracker>{' '}
                    over medium-low heat. Let it warm for 1-2 minutes. Lower heat = more control.
                  </>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: step.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                )}
              </li>
            ))}
          </ol>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>KEY TECHNIQUE:</strong> {techniqueSection.keyTechnique}
            </p>
          </div>

          {/* Why No Milk */}
          <h2>{noMilkSection.title}</h2>
          <p>{noMilkSection.intro}</p>
          <ul>
            {noMilkSection.reasons.map((reason, index) => (
              <li key={index}>
                <strong>{reason.label}:</strong> {reason.reason}
              </li>
            ))}
          </ul>
          <p>{noMilkSection.conclusion}</p>

          {/* Tips Section */}
          <h2>{tipsSection.title}</h2>
          <ul>
            {tipsSection.tips.map((tip, index) => (
              <li key={index}>
                <strong>{tip.tip}:</strong> {tip.detail}
                {tip.panLink && (
                  <>
                    {' '}The{' '}
                    <CTAVisibilityTracker
                      ctaId={`blog-scrambled-eggs-tip-${index}`}
                      position="mid_article"
                      productSlug="best-scrambled-eggs"
                      merchant="internal"
                    >
                      <Link href="/reviews/cuisinart-8-inch-nonstick-pan" className="text-blue-700 underline">
                        Cuisinart 8-inch pan
                      </Link>
                    </CTAVisibilityTracker>
                    {' '}is perfect for this technique.
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>Professional Insight:</strong> {tipsSection.proInsight}
            </p>
          </div>

          {/* Problems Table */}
          <h2>{problemsSection.title}</h2>
          <div className="overflow-x-auto my-6">
            <table>
              <thead>
                <tr>
                  {problemsSection.problemsTable.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {problemsSection.problemsTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.cells[0]}</td>
                    <td>
                      {row.panLink ? (
                        <>
                          Use more butter. Ensure pan is high-quality nonstick. The{' '}
                          <CTAVisibilityTracker
                            ctaId={`blog-scrambled-eggs-problem-${rowIndex}`}
                            position="mid_article"
                            productSlug="best-scrambled-eggs"
                            merchant="internal"
                          >
                            <Link href="/reviews/cuisinart-8-inch-nonstick-pan" className="text-blue-700 underline">
                              Cuisinart pan
                            </Link>
                          </CTAVisibilityTracker>
                          {' '}solves this issue.
                        </>
                      ) : (
                        row.cells[1]
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Variations */}
          <h2>{variationsSection.title}</h2>
          <p>{variationsSection.intro}</p>
          {variationsSection.variations.map((variation, index) => (
            <div key={index}>
              <h3>{variation.name}</h3>
              <p>{variation.description}</p>
            </div>
          ))}

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>Important:</strong> {variationsSection.warning}
            </p>
          </div>

          {/* Cleanup */}
          <h2>{cleanupSection.title}</h2>
          <p>{cleanupSection.intro}</p>
          <ul>
            {cleanupSection.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p>
            A{' '}
            <CTAVisibilityTracker
              ctaId="blog-scrambled-eggs-scraper"
              position="mid_article"
              productSlug="best-scrambled-eggs"
              merchant="internal"
            >
              <Link href={cleanupSection.tools[0].link} className="text-blue-700 underline">
                {cleanupSection.tools[0].name}
              </Link>
            </CTAVisibilityTracker>
            {' '}helps remove any stubborn bits if needed. Clean up with{' '}
            <CTAVisibilityTracker
              ctaId="blog-scrambled-eggs-mops"
              position="mid_article"
              productSlug="best-scrambled-eggs"
              merchant="internal"
            >
              <Link href={cleanupSection.tools[1].link} className="text-blue-700 underline">
                {cleanupSection.tools[1].name}
              </Link>
            </CTAVisibilityTracker>
            {' '}for quick drying.
          </p>

          {/* Story */}
          <h2>{storySection.title}</h2>
          {storySection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Final Thoughts */}
          <h2>{bottomLineSection.title}</h2>
          {bottomLineSection.content.map((paragraph, index) => {
            if (paragraph.includes("nonstick pan")) {
              return (
                <p key={index}>
                  The no-bowl, no-whisk method eliminates unnecessary steps while producing superior texture. Try it tomorrow morning. Crack eggs directly into your{' '}
                  <CTAVisibilityTracker
                    ctaId="blog-scrambled-eggs-final-pan"
                    position="final_cta"
                    productSlug="best-scrambled-eggs"
                    merchant="internal"
                  >
                    <Link href="/reviews/cuisinart-8-inch-nonstick-pan" className="text-blue-700 underline">
                      nonstick pan
                    </Link>
                  </CTAVisibilityTracker>
                  , stir whites around intact yolks, and experience the difference.
                </p>
              )
            }
            return <p key={index}>{paragraph}</p>
          })}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Content */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Content</h3>
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
