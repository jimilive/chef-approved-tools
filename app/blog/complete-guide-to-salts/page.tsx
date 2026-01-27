// ============================================================================
// COMPLETE GUIDE TO SALTS - Educational Blog Page (Data-Driven)
// Migrated from inline (389 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { Sparkles, Flame, Lightbulb } from 'lucide-react'
import { educationalData } from './salts-guide-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
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
export const metadata = generateBlogMetadata('complete-guide-to-salts')

export default function SaltsGuidePage() {
  const blogMeta = getBlogMetadata('complete-guide-to-salts')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'complete-guide-to-salts',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/complete-guide-to-salts' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    restaurantReality: { title: string; content: string[] }
    intro: string[]
  }

  const whySaltMattersSection = educationalData.sections[1] as {
    id: string
    title: string
    intro: string[]
    whatChanges: { label: string; description: string }[]
    closing: string
    example: string
  }

  const essentialSaltsSection = educationalData.sections[2] as {
    id: string
    title: string
    salts: {
      name: string
      whatItIs: string
      whyProfessionalsUseIt?: string[]
      bestFor?: string[]
      proTip?: { title: string; warning: string; comparison: { brand: string; description: string }[] }
      whyNotUseIt?: string[]
      whySpecial?: string[]
    }[]
  }

  const seasoningStagesSection = educationalData.sections[3] as {
    id: string
    title: string
    intro: string
    stages: {
      stage: number
      title: string
      when: string
      why: string
      how?: string[]
      example?: string
      onionsLink?: string
    }[]
    chefTechnique: { title: string; content: string }
  }

  const mistakesSection = educationalData.sections[4] as {
    id: string
    title: string
    mistakes: { number: number; title: string; problem: string; fix: string }[]
  }

  const takeawaySection = educationalData.sections[5] as {
    id: string
    title: string
    intro: string
    itsAbout: string[]
    quickReference: { salt: string; use: string; link?: string }[]
    closing: string
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
          {/* Restaurant Reality */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <h2 className="mt-0 text-amber-900 font-bold">{introSection.restaurantReality.title}</h2>
            {introSection.restaurantReality.content.map((paragraph, index) => (
              <p
                key={index}
                className={index === introSection.restaurantReality.content.length - 1 ? 'mb-0' : ''}
                dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            ))}
          </div>

          {introSection.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Why Salt Type Matters */}
          <h2>{whySaltMattersSection.title}</h2>
          {whySaltMattersSection.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p><strong>What changes:</strong></p>
          <ul>
            {whySaltMattersSection.whatChanges.map((item, index) => (
              <li key={index}><strong>{item.label}</strong> - {item.description}</li>
            ))}
          </ul>
          <p>{whySaltMattersSection.closing}</p>
          <p dangerouslySetInnerHTML={{ __html: whySaltMattersSection.example.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {/* Essential Salts */}
          <h2 className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-700" />
            {essentialSaltsSection.title}
          </h2>

          {essentialSaltsSection.salts.map((salt, saltIndex) => (
            <div key={saltIndex}>
              <h3>{saltIndex + 1}. {salt.name}</h3>
              <p><strong>What it is:</strong> {salt.whatItIs}</p>

              {salt.whyProfessionalsUseIt && (
                <>
                  <p><strong>Why professionals use it:</strong></p>
                  <ul>
                    {salt.whyProfessionalsUseIt.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </>
              )}

              {salt.bestFor && (
                <>
                  <p><strong>Best for:</strong></p>
                  <ul>
                    {salt.bestFor.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))}
                  </ul>
                </>
              )}

              {salt.proTip && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">
                  <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    {salt.proTip.title}
                  </p>
                  <p className="mb-2" dangerouslySetInnerHTML={{ __html: salt.proTip.warning.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  <ul className="mb-0">
                    {salt.proTip.comparison.map((item, index) => (
                      <li key={index}><strong>{item.brand}:</strong> {item.description}</li>
                    ))}
                  </ul>
                </div>
              )}

              {salt.whyNotUseIt && (
                <>
                  <p><strong>Why I don&apos;t use it:</strong></p>
                  <ul>
                    {salt.whyNotUseIt.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </>
              )}

              {salt.whySpecial && (
                <>
                  <p><strong>Why it&apos;s special:</strong></p>
                  <ul>
                    {salt.whySpecial.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}

          <BlogNewsletterCTA slug="complete-guide-to-salts" />

          {/* Seasoning Stages */}
          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-700" />
            {seasoningStagesSection.title}
          </h2>
          <p>{seasoningStagesSection.intro}</p>

          {seasoningStagesSection.stages.map((stage) => (
            <div key={stage.stage}>
              <h3>Stage {stage.stage}: {stage.title}</h3>
              <p><strong>When:</strong> {stage.when}</p>
              <p><strong>Why:</strong> {stage.why}</p>
              {stage.how && (
                <>
                  <p><strong>How:</strong></p>
                  <ul>
                    {stage.how.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {stage.example && (
                <p>
                  <strong>Example:</strong> When making a soup, salt the{' '}
                  <Link href={stage.onionsLink || '/blog/onions-cooking-guide'} className="text-orange-700 hover:text-orange-800 underline">
                    onions
                  </Link>
                  {' '}as you sauté them, salt the stock when you add it, salt the vegetables as they cook, taste and adjust at the end. This builds depth.
                </p>
              )}
            </div>
          ))}

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-700" />
              {seasoningStagesSection.chefTechnique.title}
            </p>
            <p
              className="mb-0"
              dangerouslySetInnerHTML={{ __html: seasoningStagesSection.chefTechnique.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          </div>

          {/* Common Mistakes */}
          <h2>{mistakesSection.title}</h2>
          {mistakesSection.mistakes.map((mistake) => (
            <div key={mistake.number}>
              <h3>Mistake #{mistake.number}: {mistake.title}</h3>
              <p><strong>The problem:</strong> {mistake.problem}</p>
              <p><strong>The fix:</strong> {mistake.fix}</p>
            </div>
          ))}

          {/* Takeaway */}
          <h2>{takeawaySection.title}</h2>
          <p>{takeawaySection.intro}</p>
          <p><strong>It&apos;s about:</strong></p>
          <ul>
            {takeawaySection.itsAbout.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>Quick reference:</strong></p>
          <ul>
            {takeawaySection.quickReference.map((item, index) => (
              <li key={index}>
                <strong>
                  {item.link ? (
                    <Link href={item.link} className="text-orange-700 hover:text-orange-800 underline">
                      {item.salt}
                    </Link>
                  ) : (
                    item.salt
                  )}
                  :
                </strong>{' '}
                {item.use}
              </li>
            ))}
          </ul>
          <p>{takeawaySection.closing}</p>
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
