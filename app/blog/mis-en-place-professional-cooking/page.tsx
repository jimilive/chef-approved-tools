// ============================================================================
// MIS EN PLACE: THE FOUNDATION OF PROFESSIONAL COOKING - Educational Blog Page (Data-Driven)
// Migrated from inline (296 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, Clock, CheckCircle2 } from 'lucide-react'
import { educationalData } from './mise-en-place-data'
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
export const metadata = generateBlogMetadata('mis-en-place-professional-cooking')

export default function MiseEnPlacePage() {
  const blogMeta = getBlogMetadata('mis-en-place-professional-cooking')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'mis-en-place-professional-cooking',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/mis-en-place-professional-cooking' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
  }

  const whatIsMiseSection = educationalData.sections[1] as {
    id: string
    title: string
    definition: string
    components: { label: string; detail: string }[]
    context: string
    restaurantReality: { title: string; content: string }
  }

  const benefitsSection = educationalData.sections[2] as {
    id: string
    title: string
    benefits: {
      number: number
      title: string
      hasIcon?: boolean
      content: string[]
      examples?: string[]
      closing?: string
    }[]
    proTip: { title: string; content: string }
  }

  const elementsSection = educationalData.sections[3] as {
    id: string
    title: string
    categories: { name: string; items: string[] }[]
    checklist: {
      title: string
      subtitle: string
      items: string[]
      closing: string
    }
  }

  const conclusionSection = educationalData.sections[4] as {
    id: string
    title: string
    content: string[]
    benefits: string[]
    validation: string
    callToAction: string[]
    practiceLink: {
      title: string
      content: string
      linkText: string
      href: string
      suffix: string
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
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* What is Mise en Place Section */}
          <h2>{whatIsMiseSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: whatIsMiseSection.definition.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <ul>
            {whatIsMiseSection.components.map((component, index) => (
              <li key={index}><strong>{component.label}</strong> - {component.detail}</li>
            ))}
          </ul>
          <p dangerouslySetInnerHTML={{ __html: whatIsMiseSection.context.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              {whatIsMiseSection.restaurantReality.title}
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: whatIsMiseSection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          {/* Benefits Section */}
          <h2>{benefitsSection.title}</h2>
          {benefitsSection.benefits.map((benefit) => (
            <div key={benefit.number}>
              {benefit.hasIcon ? (
                <h3 className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-700" />
                  {benefit.number}. {benefit.title}
                </h3>
              ) : (
                <h3>{benefit.number}. {benefit.title}</h3>
              )}
              {benefit.content.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
              {benefit.examples && (
                <ul>
                  {benefit.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              )}
              {benefit.closing && <p>{benefit.closing}</p>}
            </div>
          ))}

          {/* Pro Tip: Trash Bowl */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <p className="text-lg font-bold text-slate-900 mt-0">{benefitsSection.proTip.title}</p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: benefitsSection.proTip.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          {/* Elements Section */}
          <h2>{elementsSection.title}</h2>
          {elementsSection.categories.map((category, index) => (
            <div key={index}>
              <p><strong>{category.name}:</strong></p>
              <ul>
                {category.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <BlogNewsletterCTA slug="mis-en-place-professional-cooking" />

          {/* Checklist Callout */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-6 my-8 rounded-r-lg">
            <p className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {elementsSection.checklist.title}
            </p>
            <p className="font-semibold mb-2">{elementsSection.checklist.subtitle}</p>
            <ul className="space-y-1 mb-4">
              {elementsSection.checklist.items.map((item, index) => (
                <li key={index}>☐ {item}</li>
              ))}
            </ul>
            <p className="mb-0"><strong>{elementsSection.checklist.closing}</strong></p>
          </div>

          {/* Conclusion Section */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          <p>Master mise en place and you&apos;ll:</p>
          <ul>
            {conclusionSection.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <p>{conclusionSection.validation}</p>

          {conclusionSection.callToAction.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </div>

        {/* Practice CTA */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
          <h3 className="text-xl font-bold text-slate-900 mt-0 mb-3">{conclusionSection.practiceLink.title}</h3>
          <p className="mb-0">
            {conclusionSection.practiceLink.content}{' '}
            <Link href={conclusionSection.practiceLink.href} className="text-orange-700 hover:text-orange-800 font-semibold underline">
              {conclusionSection.practiceLink.linkText}
            </Link>{' '}
            {conclusionSection.practiceLink.suffix}
          </p>
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
