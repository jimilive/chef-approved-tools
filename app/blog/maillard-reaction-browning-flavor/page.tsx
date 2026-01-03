// ============================================================================
// THE MAILLARD REACTION: WHY BROWNING = FLAVOR - Educational Blog Page (Data-Driven)
// Migrated from inline (269 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, Flame, ThermometerSun, AlertTriangle } from 'lucide-react'
import { educationalData } from './maillard-data'
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
export const metadata = generateBlogMetadata('maillard-reaction-browning-flavor')

export default function MaillardReactionPost() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'maillard-reaction-browning-flavor',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/maillard-reaction-browning-flavor' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
    restaurantReality: { title: string; content: string }
  }

  const whatIsSection = educationalData.sections[1] as {
    id: string
    title: string
    content: string[]
  }

  const whyBrowningSection = educationalData.sections[2] as {
    id: string
    title: string
    content: string[]
    examples: string[]
    steakLink: { text: string; href: string; linkText: string }
    proTip: { title: string; content: string }
  }

  const conditionsSection = educationalData.sections[3] as {
    id: string
    title: string
    hasIcon: boolean
    intro: string
    conditions: {
      number: number
      title: string
      content: string
      hasLink?: boolean
      linkText?: string
      linkHref?: string
      suffix?: string
    }[]
    chefNote: {
      title: string
      content: string
      linkText: string
      linkHref: string
      suffix: string
    }
  }

  const deglazingSection = educationalData.sections[4] as {
    id: string
    title: string
    content: string[]
  }

  const burnZoneSection = educationalData.sections[5] as {
    id: string
    title: string
    hasIcon: boolean
    content: string[]
    successTip: { title: string; content: string }
  }

  const conclusionSection = educationalData.sections[6] as {
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
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
          ))}

          {/* Restaurant Reality Callout */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              {introSection.restaurantReality.title}
            </h2>
            <p className="mb-0">{introSection.restaurantReality.content}</p>
          </div>

          {/* What the Maillard Reaction Actually Is */}
          <h2>{whatIsSection.title}</h2>
          {whatIsSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
          ))}

          {/* Why Browning Equals Flavor */}
          <h2>{whyBrowningSection.title}</h2>
          {whyBrowningSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
          <ul>
            {whyBrowningSection.examples.map((example, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: example.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </ul>
          <p>
            {whyBrowningSection.steakLink.text}{' '}
            <CTAVisibilityTracker
              ctaId="blog-maillard-steak-searing-link"
              position="mid_article"
              productSlug="maillard-reaction-browning-flavor"
              merchant="internal"
            >
              <Link href={whyBrowningSection.steakLink.href} className="text-orange-700 hover:text-orange-800 underline">
                {whyBrowningSection.steakLink.linkText}
              </Link>
            </CTAVisibilityTracker>
            .
          </p>

          {/* Pro Tip: Dry Surface */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-purple-600" />
              {whyBrowningSection.proTip.title}
            </h3>
            <p className="mb-0">{whyBrowningSection.proTip.content}</p>
          </div>

          {/* Key Conditions Section */}
          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-700" />
            {conditionsSection.title}
          </h2>
          <p>{conditionsSection.intro}</p>

          {conditionsSection.conditions.map((condition) => (
            <div key={condition.number}>
              <h3>{condition.number}. {condition.title}</h3>
              {condition.hasLink ? (
                <p>
                  {condition.content}{' '}
                  <CTAVisibilityTracker
                    ctaId={`blog-maillard-condition-${condition.number}-link`}
                    position="mid_article"
                    productSlug="maillard-reaction-browning-flavor"
                    merchant="internal"
                  >
                    <Link href={condition.linkHref!} className="text-orange-700 hover:text-orange-800 underline">
                      {condition.linkText}
                    </Link>
                  </CTAVisibilityTracker>
                  {' '}{condition.suffix}
                </p>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: condition.content.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
              )}
            </div>
          ))}

          <BlogNewsletterCTA slug="maillard-reaction-browning-flavor" />

          {/* Chef's Note Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              {conditionsSection.chefNote.title}
            </p>
            <p className="mb-0">
              <span dangerouslySetInnerHTML={{ __html: conditionsSection.chefNote.content.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
              {' '}
              <CTAVisibilityTracker
                ctaId="blog-maillard-chef-note-link"
                position="mid_article"
                productSlug="maillard-reaction-browning-flavor"
                merchant="internal"
              >
                <Link href={conditionsSection.chefNote.linkHref} className="text-orange-700 hover:text-orange-800 underline">
                  {conditionsSection.chefNote.linkText}
                </Link>
              </CTAVisibilityTracker>
              {conditionsSection.chefNote.suffix}
            </p>
          </div>

          {/* Deglazing Section */}
          <h2>{deglazingSection.title}</h2>
          {deglazingSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
          ))}

          {/* Burn Zone Section */}
          <h2 className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-700" />
            {burnZoneSection.title}
          </h2>
          {burnZoneSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
          ))}

          {/* Success Tip Callout */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0">{burnZoneSection.successTip.title}</h3>
            <p className="mb-0">{burnZoneSection.successTip.content}</p>
          </div>

          {/* FAQ - Single Source of Truth */}
          <BlogFAQ questions={educationalData.faq.questions} />

          {/* Conclusion Section */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
          ))}
        </div>

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
