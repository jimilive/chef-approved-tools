// ============================================================================
// BACON BUT NOT IN THIS DISH - Blog Page (Data-Driven)
// Migrated from inline to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { baconData } from './bacon-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import { Scale, AlertTriangle } from 'lucide-react'
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
export const metadata = generateBlogMetadata('bacon-but-not-in-this-dish')

export default function BaconButNotInThisDishPage() {
  const blogMeta = getBlogMetadata('bacon-but-not-in-this-dish')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'bacon-but-not-in-this-dish',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: baconData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/bacon-but-not-in-this-dish' }
  ])

  const faqSchema = generateFAQSchema(baconData.faq.questions)

  // Type assertions for sections
  const introSection = baconData.sections[0] as { id: string; content: string[] }
  const problemSection = baconData.sections[1] as {
    id: string; title: string; hasIcon: boolean; iconType: string
    reasons: { label: string; description: string }[]
    warning: string
  }
  const sevenDishesSection = baconData.sections[2] as {
    id: string; title: string
    dishes: { number: number; name: string; why: string; alternatives: string[]; realProblem?: string; exception?: string }[]
  }
  const whenBelongsSection = baconData.sections[3] as {
    id: string; title: string; intro: string
    dishes: { name: string; reason: string }[]
  }
  const philosophySection = baconData.sections[4] as {
    id: string; title: string
    principles: { label: string; description: string }[]
  }
  const conclusionSection = baconData.sections[5] as {
    id: string; title: string; content: string[]
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={baconData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={baconData.hero.title}
          introduction={baconData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* The Bacon Problem */}
          <h2 className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-orange-700" />
            {problemSection.title}
          </h2>

          <h3>Why We Overuse Bacon</h3>

          {problemSection.reasons.map((reason, index) => (
            <div key={index}>
              <strong className="font-semibold text-slate-900">{reason.label}</strong>
              <p>{reason.description}</p>
            </div>
          ))}

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Warning
            </p>
            <p className="mb-0">{problemSection.warning}</p>
          </div>

          {/* 7 Dishes Where Bacon Doesn't Belong */}
          <h2>{sevenDishesSection.title}</h2>

          {sevenDishesSection.dishes.map((dish, index) => (
            <div key={dish.number}>
              <h3>{dish.number}. {dish.name}</h3>

              <p>
                <strong className="font-semibold text-slate-900">Why Bacon Doesn&apos;t Work:</strong>{' '}
                {dish.why}
              </p>

              <p><strong>What to Use Instead:</strong></p>
              <ul>
                {dish.alternatives.map((alt, altIndex) => (
                  <li key={altIndex}>{alt}</li>
                ))}
              </ul>

              {dish.realProblem && (
                <p><strong>The Real Problem:</strong> {dish.realProblem}</p>
              )}

              {dish.exception && (
                <p><strong>The Exception:</strong> {dish.exception}</p>
              )}

              {/* Newsletter CTA after dish 3 */}
              {dish.number === 3 && (
                <BlogNewsletterCTA slug={baconData.newsletterCTA.slug} description={baconData.newsletterCTA.description} />
              )}
            </div>
          ))}

          {/* When Bacon DOES Belong */}
          <h2>{whenBelongsSection.title}</h2>
          <p>{whenBelongsSection.intro}</p>

          <ul>
            {whenBelongsSection.dishes.map((dish, index) => (
              <li key={index}><strong>{dish.name}</strong> – {dish.reason}</li>
            ))}
          </ul>

          {/* Philosophy of Restraint */}
          <h2>{philosophySection.title}</h2>

          {philosophySection.principles.map((principle, index) => (
            <p key={index}>
              <strong className="font-semibold text-slate-900">{principle.label}:</strong>{' '}
              {principle.description}
            </p>
          ))}

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {baconData.relatedArticles.map((article, index) => (
              <Link key={index} href={article.href} className="text-orange-700 hover:text-orange-800 font-semibold">
                → {article.title}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={baconData.faq.questions} />

        {/* Email Capture */}
        <BlogEmailCapture />

        {/* Author Bio */}
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
