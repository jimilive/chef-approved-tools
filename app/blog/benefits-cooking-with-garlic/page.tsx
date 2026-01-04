// ============================================================================
// BENEFITS OF COOKING WITH GARLIC - Blog Page (Data-Driven)
// Migrated from inline to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { garlicData } from './garlic-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import { Sprout, Flame, AlertTriangle } from 'lucide-react'
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
export const metadata = generateBlogMetadata('benefits-cooking-with-garlic')

export default function GarlicBenefitsPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: garlicData.metadata.title,
    description: garlicData.metadata.description,
    datePublished: garlicData.metadata.publishedDate,
    dateModified: garlicData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'benefits-cooking-with-garlic',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: garlicData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/benefits-cooking-with-garlic' }
  ])

  const faqSchema = generateFAQSchema(garlicData.faq.questions)

  // Type assertions for sections
  const introSection = garlicData.sections[0] as { id: string; content: string[] }
  const healthSection = garlicData.sections[1] as {
    id: string; title: string; hasIcon: boolean; iconType: string; intro: string
    subsections: { title: string; content?: string[]; intro?: string; benefits?: string[]; outro?: string }[]
    restaurantReality: string
  }
  const cookingSection = garlicData.sections[2] as {
    id: string; title: string; hasIcon: boolean; iconType: string; intro: string
    methods: { name: string; result: string; bestFor: string; steps?: string[]; method?: string; criticalRule?: string; proTip?: string }[]
  }
  const conclusionSection = garlicData.sections[3] as {
    id: string; title: string; content: string[]
    keyLessons: { label: string; description: string }[]
    outro: string
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={garlicData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={garlicData.hero.title}
          introduction={garlicData.hero.introduction}
          publishedDate={garlicData.metadata.publishedDate}
          lastUpdated={garlicData.metadata.lastUpdated}
          readTime={garlicData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Health Benefits */}
          <h2 className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-orange-700" />
            {healthSection.title}
          </h2>

          <p>{healthSection.intro}</p>

          {healthSection.subsections.map((subsection, index) => (
            <div key={index}>
              <h3>{subsection.title}</h3>
              {subsection.content?.map((para, pIndex) => (
                <p key={pIndex} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
              {subsection.intro && <p>{subsection.intro}</p>}
              {subsection.benefits && (
                <ul>
                  {subsection.benefits.map((benefit, bIndex) => (
                    <li key={bIndex}>{benefit}</li>
                  ))}
                </ul>
              )}
              {subsection.outro && <p>{subsection.outro}</p>}
            </div>
          ))}

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Restaurant Reality: The Garlic Lesson
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: healthSection.restaurantReality.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          <BlogNewsletterCTA
            slug={garlicData.newsletterCTA.slug}
            description={garlicData.newsletterCTA.description}
          />

          {/* Cooking Techniques */}
          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-700" />
            {cookingSection.title}
          </h2>

          <p>{cookingSection.intro}</p>

          {cookingSection.methods.map((method, index) => (
            <div key={index}>
              <h3>{method.name}</h3>

              <p>
                <strong>Result:</strong> {method.result}<br />
                <strong>Best for:</strong> {method.bestFor}
              </p>

              {method.steps && (
                <>
                  <p><strong>Method:</strong></p>
                  <ol>
                    {method.steps.map((step, sIndex) => (
                      <li key={sIndex}>{step}</li>
                    ))}
                  </ol>
                </>
              )}

              {method.method && (
                <p><strong>Method:</strong> {method.method}</p>
              )}

              {method.criticalRule && (
                <p><strong>Critical rule:</strong> {method.criticalRule}</p>
              )}

              {method.proTip && (
                <p><strong>Pro tip:</strong> {method.proTip}</p>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p><strong>The key lessons:</strong></p>
          <ul>
            {conclusionSection.keyLessons.map((lesson, index) => (
              <li key={index}><strong>{lesson.label}</strong> – {lesson.description}</li>
            ))}
          </ul>

          <p>{conclusionSection.outro}</p>
        </div>

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {garlicData.relatedArticles.map((article, index) => (
              <Link key={index} href={article.href} className="text-orange-700 hover:text-orange-800 font-semibold">
                → {article.title}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={garlicData.faq.questions} />

        {/* Email Capture */}
        <BlogEmailCapture />

        {/* Author Bio */}
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
