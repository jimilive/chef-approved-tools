// ============================================================================
// WHAT IS BRAISING AND WHY IT'S SO PROFOUNDLY AMAZING - Blog Page (Data-Driven)
// Migrated from inline (231 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, Clock, ThermometerSun } from 'lucide-react'
import { braisingData } from './braising-data'
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

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('what-is-braising')

export default function BraisingPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: braisingData.metadata.title,
    description: braisingData.metadata.description,
    datePublished: braisingData.metadata.publishedDate,
    dateModified: braisingData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'what-is-braising',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: braisingData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/what-is-braising' }
  ])

  const faqSchema = generateFAQSchema(braisingData.faq.questions)

  // Type assertions for complex sections
  const introSection = braisingData.sections[0] as {
    id: string
    title: string
    content: string[]
    restaurantReality: { title: string; content: string }
  }

  const whatIsSection = braisingData.sections[1] as {
    id: string
    title: string
    definition: string
    processIntro: string
    process: { step: string; description: string; linkText?: string; linkHref?: string }[]
    closing: string
  }

  const scienceSection = braisingData.sections[2] as {
    id: string
    title: string
    hasIcon: boolean
    intro: string
    collagenSection: {
      title: string
      content: string[]
      whyIntro: string
      whyPoints: { emphasis: string; description: string }[]
      closing: string
    }
    proTip: { title: string; content: string }
  }

  const conclusionSection = braisingData.sections[3] as {
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

      <BlogLayout breadcrumbTitle={braisingData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={braisingData.hero.title}
          introduction={braisingData.hero.introduction}
          publishedDate={braisingData.metadata.publishedDate}
          lastUpdated={braisingData.metadata.lastUpdated}
          readTime={braisingData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Restaurant Reality Callout */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              {introSection.restaurantReality.title}
            </h2>
            <p className="mb-0">{introSection.restaurantReality.content}</p>
          </div>

          {/* What is Braising */}
          <h2>{whatIsSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: whatIsSection.definition.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <p>{whatIsSection.processIntro}</p>
          <ol>
            {whatIsSection.process.map((item, index) => (
              <li key={index}>
                <strong>{item.step}</strong> {item.description}
                {item.linkText && item.linkHref && (
                  <>
                    {' ('}
                    <Link href={item.linkHref} className="text-orange-700 hover:text-orange-800 underline">
                      {item.linkText}
                    </Link>
                    {')'}
                  </>
                )}
              </li>
            ))}
          </ol>
          <p>{whatIsSection.closing}</p>

          {/* Science Section */}
          <h2 className="flex items-center gap-2">
            <ThermometerSun className="w-6 h-6 text-orange-700" />
            {scienceSection.title}
          </h2>
          <p>{scienceSection.intro}</p>

          <h3>{scienceSection.collagenSection.title}</h3>
          {scienceSection.collagenSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
          <p dangerouslySetInnerHTML={{ __html: scienceSection.collagenSection.whyIntro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <ul>
            {scienceSection.collagenSection.whyPoints.map((point, index) => (
              <li key={index}><strong>{point.emphasis}</strong> {point.description}</li>
            ))}
          </ul>
          <p>{scienceSection.collagenSection.closing}</p>

          {/* Pro Tip Callout */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              {scienceSection.proTip.title}
            </h3>
            <p className="mb-0">{scienceSection.proTip.content}</p>
          </div>

          <BlogNewsletterCTA
            slug={braisingData.newsletterCTA.slug}
            description={braisingData.newsletterCTA.description}
          />

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={braisingData.faq.questions} />

        {/* Related Reading */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {braisingData.relatedArticles.map((article, index) => (
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
