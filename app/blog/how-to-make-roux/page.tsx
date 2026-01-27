// ============================================================================
// HOW TO MAKE A PERFECT ROUX: THE FOUNDATION OF GREAT SAUCES - Blog Page (Data-Driven)
// Migrated from inline (369 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { rouxData } from './roux-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
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
export const metadata = generateBlogMetadata('how-to-make-roux')

export default function RouxPage() {
  const blogMeta = getBlogMetadata('how-to-make-roux')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'how-to-make-roux',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: rouxData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/how-to-make-roux' }
  ])

  const faqSchema = generateFAQSchema(rouxData.faq.questions)

  // Type assertions for complex sections
  const introSection = rouxData.sections[0] as {
    id: string
    title: string
    content: string[]
  }

  const whatIsSection = rouxData.sections[1] as {
    id: string
    title: string
    definition: string
    science: string
    benefits: { label: string; detail: string }[]
    ratio: string
    restaurantReality: { title: string; content: string }
  }

  const typesSection = rouxData.sections[2] as {
    id: string
    title: string
    intro: string
    types: {
      name: string
      cookingTime: string
      colorClass: string
      details: { label: string; value: string }[]
    }[]
  }

  const howToSection = rouxData.sections[3] as {
    id: string
    title: string
    equipment: string[]
    ingredients: string[]
    steps: {
      title: string
      content: string
      bullets?: string[]
    }[]
    summary: string
    proTip: {
      title: string
      intro: string
      ratio: string
      details: string
    }
  }

  const mistakesSection = rouxData.sections[4] as {
    id: string
    title: string
    hasIcon: boolean
    mistakes: {
      name: string
      cause: string
      fix: string | { prevention: string; recovery: string }
    }[]
  }

  const checklistSection = rouxData.sections[5] as {
    id: string
    title: string
    hasCheckIcon: boolean
    sections: {
      title: string
      items: string[]
    }[]
  }

  const conclusionSection = rouxData.sections[6] as {
    id: string
    title: string
    content: string[]
    requirements: string[]
    closing: string[]
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToSchema
        name={rouxData.howToSchema.name}
        description={rouxData.howToSchema.description}
        datePublished={rouxData.howToSchema.datePublished}
        totalTime={rouxData.howToSchema.totalTime}
        tools={rouxData.howToSchema.tools}
        steps={rouxData.howToSchema.steps}
      />

      <BlogLayout breadcrumbTitle={rouxData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={rouxData.hero.title}
          introduction={rouxData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* What is a Roux */}
          <h2>{whatIsSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: whatIsSection.definition.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <p dangerouslySetInnerHTML={{ __html: whatIsSection.science.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <ul>
            {whatIsSection.benefits.map((benefit, index) => (
              <li key={index}><strong>{benefit.label}</strong> ({benefit.detail})</li>
            ))}
          </ul>
          <p dangerouslySetInnerHTML={{ __html: whatIsSection.ratio.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              {whatIsSection.restaurantReality.title}
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: whatIsSection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          {/* Three Types of Roux */}
          <h2>{typesSection.title}</h2>
          <p>{typesSection.intro}</p>

          {typesSection.types.map((type, index) => (
            <div key={index}>
              <h3 className="flex items-center gap-2">
                <span className={`inline-block w-3 h-3 ${type.colorClass} rounded-full`}></span>
                {index + 1}. {type.name} ({type.cookingTime})
              </h3>
              <ul>
                {type.details.map((detail, i) => (
                  <li key={i}><strong>{detail.label}:</strong> {detail.value}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* How to Make White Roux */}
          <h2>{howToSection.title}</h2>
          <p><strong>Equipment:</strong></p>
          <ul>
            {howToSection.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {howToSection.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {howToSection.steps.map((step, index) => (
            <div key={index}>
              <h3>{step.title}</h3>
              <p>{step.content}</p>
              {step.bullets && (
                <ul>
                  {step.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <p dangerouslySetInnerHTML={{ __html: howToSection.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {/* Pro Tip Callout */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h4 className="text-lg font-bold text-slate-900 mt-0">{howToSection.proTip.title}</h4>
            <p className="mb-2">{howToSection.proTip.intro}</p>
            <p className="font-bold mb-2">{howToSection.proTip.ratio}</p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: howToSection.proTip.details.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          <BlogNewsletterCTA slug="how-to-make-roux" />

          {/* Common Mistakes */}
          <h2 className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-700" />
            {mistakesSection.title}
          </h2>

          {mistakesSection.mistakes.map((mistake, index) => (
            <div key={index}>
              <h3>Mistake #{index + 1}: {mistake.name}</h3>
              <p><strong>The cause:</strong> {mistake.cause}</p>
              {typeof mistake.fix === 'string' ? (
                <p dangerouslySetInnerHTML={{ __html: `<strong>The fix:</strong> ${mistake.fix.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}` }} />
              ) : (
                <>
                  <p><strong>The fix:</strong></p>
                  <ul>
                    <li><strong>Prevention:</strong> {mistake.fix.prevention}</li>
                    <li><strong>Recovery:</strong> {mistake.fix.recovery}</li>
                  </ul>
                </>
              )}
            </div>
          ))}

          {/* Perfect Roux Checklist */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-6 my-8 rounded-r-lg">
            <h4 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {checklistSection.title}
            </h4>
            {checklistSection.sections.map((section, index) => (
              <div key={index}>
                <p className="font-semibold mb-2">{section.title}</p>
                <ul className={`space-y-1 ${index < checklistSection.sections.length - 1 ? 'mb-4' : ''}`}>
                  {section.items.map((item, i) => (
                    <li key={i}>☐ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
          <ul>
            {conclusionSection.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {conclusionSection.closing.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={rouxData.faq.questions} />

        {/* Related Reading */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rouxData.relatedArticles.map((article, index) => (
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
