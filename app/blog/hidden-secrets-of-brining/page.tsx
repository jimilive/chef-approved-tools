// ============================================================================
// HOW TO BRINE CHICKEN & OTHER PROTEINS - Blog Page (Data-Driven)
// Optimized: January 28, 2026
// Changes: Quick Answer box, Diamond Crystal link, updated H2s
// ============================================================================

import Link from 'next/link'
import { briningData } from './brining-data'
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
import { getBlogMetadata } from '@/data/metadata'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('hidden-secrets-of-brining')

export default function BriningSecretsPage() {
  const blogMeta = getBlogMetadata('hidden-secrets-of-brining')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'hidden-secrets-of-brining',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: briningData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/hidden-secrets-of-brining' }
  ])

  const faqSchema = generateFAQSchema(briningData.faq.questions)

  // Type assertions for sections
  const introSection = briningData.sections[0] as { id: string; content: string[] }
  const scienceSection = briningData.sections[1] as {
    id: string
    title: string
    intro: string
    subsections: { title: string; content: string | string[]; intro?: string; points?: { label: string; description: string }[] }[]
  }
  const ratiosSection = briningData.sections[2] as {
    id: string
    title: string
    formula: { title: string; items: { label: string; value: string }[]; critical: string }
    saltNote: { text: string; linkText: string; linkHref: string }
    methods: { name: string; description: string }[]
  }
  const proteinsSection = briningData.sections[3] as {
    id: string
    title: string
    bestCandidates: { title: string; categories: { name: string; description: string }[] }
    poorCandidates: { title: string; categories: { name: string; description: string }[] }
    warning: string
  }
  const timingSection = briningData.sections[4] as {
    id: string
    title: string
    timingGroups: { category: string; items: { protein: string; wet: string; dry?: string; note?: string }[] }[]
    criticalWarning: string
  }
  const wetDrySection = briningData.sections[5] as {
    id: string
    title: string
    methods: { name: string; description: string; bestFor: string; advantages: string[]; disadvantages: string[] }[]
  }
  const mistakesSection = briningData.sections[6] as {
    id: string
    title: string
    mistakes: { name: string; mistake: string; consequence: string; correct: string }[]
  }
  const conclusionSection = briningData.sections[7] as {
    id: string
    title: string
    content: string[]
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={briningData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={briningData.hero.title}
          introduction={briningData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {briningData.tableOfContents.map((item) => (
                <li key={item.id}>
                  • <a href={`#${item.id}`} className="text-blue-700 underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEW: Quick Answer Box for Featured Snippet */}
          <div id="quick-answer" className="bg-green-50 border-2 border-green-600 rounded-xl p-6 my-8">
            <h2 className="text-xl font-bold text-green-800 mb-4">{briningData.quickAnswer.title}</h2>

            {/* Ratio */}
            <div className="mb-4">
              <p className="font-semibold text-green-900">{briningData.quickAnswer.ratio.label}:</p>
              <p className="text-green-800 text-lg">{briningData.quickAnswer.ratio.value}</p>
            </div>

            {/* Timing Chart */}
            <div className="mb-4">
              <p className="font-semibold text-green-900 mb-2">Timing (Wet Brine):</p>
              <ul className="space-y-1 text-green-800">
                {briningData.quickAnswer.timing.map((item, index) => (
                  <li key={index}>
                    <strong>{item.protein}:</strong> {item.time}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="mb-4">
              <p className="font-semibold text-green-900 mb-2">Basic Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-green-800">
                {briningData.quickAnswer.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Pro Tip */}
            <div className="bg-green-100 rounded-lg p-4 mt-4">
              <p className="text-green-900 mb-0">
                <strong>Pro Tip:</strong> {briningData.quickAnswer.proTip}
              </p>
            </div>
          </div>

          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Science Section */}
          <h2 id={scienceSection.id}>{scienceSection.title}</h2>
          <p>{scienceSection.intro}</p>

          {scienceSection.subsections.map((subsection, index) => (
            <div key={index}>
              <h3>{subsection.title}</h3>
              {Array.isArray(subsection.content) ? (
                subsection.content.map((para, pIndex) => (
                  <p key={pIndex}>{para}</p>
                ))
              ) : (
                <p>{subsection.content}</p>
              )}
              {subsection.intro && <p>{subsection.intro}</p>}
              {subsection.points && (
                <ul>
                  {subsection.points.map((point, pIndex) => (
                    <li key={pIndex}><strong>{point.label}:</strong> {point.description}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Ratios Section */}
          <h2 id={ratiosSection.id}>{ratiosSection.title}</h2>

          <div className="bg-orange-50 border-l-4 border-orange-700 p-6 my-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{ratiosSection.formula.title}</h3>
            <ul className="space-y-2">
              {ratiosSection.formula.items.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.value}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-700">
              <strong>Critical:</strong> {ratiosSection.formula.critical}
            </p>
          </div>

          {/* Diamond Crystal Link - Internal Link for SEO */}
          <p>
            {ratiosSection.saltNote.text}{' '}
            <Link href={ratiosSection.saltNote.linkHref} className="text-orange-700 hover:text-orange-800 font-semibold">
              {ratiosSection.saltNote.linkText} →
            </Link>
          </p>

          <h3>Gradient vs. Equilibrium Brining</h3>
          {ratiosSection.methods.map((method, index) => (
            <p key={index}><strong>{method.name}</strong> {method.description}</p>
          ))}

          {/* Proteins Section */}
          <h2 id={proteinsSection.id}>{proteinsSection.title}</h2>

          <h3>{proteinsSection.bestCandidates.title}</h3>
          {proteinsSection.bestCandidates.categories.map((cat, index) => (
            <p key={index}><strong>{cat.name}:</strong> {cat.description}</p>
          ))}

          <h3>{proteinsSection.poorCandidates.title}</h3>
          {proteinsSection.poorCandidates.categories.map((cat, index) => (
            <p key={index}><strong>{cat.name}:</strong> {cat.description}</p>
          ))}

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <p className="text-yellow-800 mb-0">
              <strong>Important:</strong> {proteinsSection.warning}
            </p>
          </div>

          {/* Timing Section */}
          <h2 id={timingSection.id}>{timingSection.title}</h2>

          {timingSection.timingGroups.map((group, index) => (
            <div key={index}>
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item, iIndex) => (
                  <li key={iIndex}>
                    <strong>{item.protein}:</strong> Wet brine {item.wet}
                    {item.dry && <> | Dry brine {item.dry}</>}
                    {item.note && <> | {item.note}</>}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
            <p className="text-red-800 mb-0">
              <strong>Critical timing warning:</strong> {timingSection.criticalWarning}
            </p>
          </div>

          {/* Wet vs Dry Section */}
          <h2 id={wetDrySection.id}>{wetDrySection.title}</h2>

          {wetDrySection.methods.map((method, index) => (
            <div key={index}>
              <h3>{method.name}</h3>
              <p>{method.description}</p>
              <p><strong>Best for:</strong> {method.bestFor}</p>
              <p><strong>Advantages:</strong> {method.advantages.join('. ')}.</p>
              <p><strong>Disadvantages:</strong> {method.disadvantages.join('. ')}.</p>
            </div>
          ))}

          <BlogNewsletterCTA slug={briningData.newsletterCTA.slug} />

          {/* Mistakes Section */}
          <h2 id={mistakesSection.id}>{mistakesSection.title}</h2>

          {mistakesSection.mistakes.map((mistake, index) => (
            <div key={index}>
              <h3>{mistake.name}</h3>
              <p><strong>Mistake:</strong> {mistake.mistake}</p>
              <p><strong>Consequence:</strong> {mistake.consequence}</p>
              <p><strong>Correct:</strong> {mistake.correct}</p>
            </div>
          ))}

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={briningData.faq.questions} />

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {briningData.relatedArticles.map((article, index) => (
              <CTAVisibilityTracker
                key={index}
                ctaId={`brining-related-${index}`}
                position="final_cta"
                productSlug="hidden-secrets-of-brining"
                merchant="internal"
              >
                <Link href={article.href} className="text-orange-700 hover:text-orange-800 font-semibold">
                  → {article.title}
                </Link>
              </CTAVisibilityTracker>
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
