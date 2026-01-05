// ============================================================================
// WHAT IS MIREPOIX - Blog Page (Data-Driven)
// Migrated from inline (417 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { mirepoixData } from './mirepoix-data'
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
export const metadata = generateBlogMetadata('what-is-mirepoix')

export default function WhatIsMirepoixPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: mirepoixData.metadata.title,
    description: mirepoixData.metadata.description,
    datePublished: mirepoixData.metadata.publishedDate,
    dateModified: mirepoixData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'what-is-mirepoix',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: mirepoixData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/what-is-mirepoix' }
  ])

  const faqSchema = generateFAQSchema(mirepoixData.faq.questions)

  // Type assertions for sections
  const definitionSection = mirepoixData.sections[0] as {
    id: string
    title: string
    content: string[]
    ratio: {
      title: string
      parts: { ingredient: string; amount: string; percentage: string }[]
      byWeight: string
    }
    history: { title: string; content: string }
  }

  const whyUseSection = mirepoixData.sections[1] as {
    id: string
    title: string
    subsections: { title: string; content: string[] }[]
  }

  const variablesSection = mirepoixData.sections[2] as {
    id: string
    title: string
    diceSize: {
      title: string
      intro: string
      sizes: { name: string; use: string }[]
    }
    cookingMethod: {
      title: string
      intro: string
      methods: { name: string; description: string }[]
    }
    fatChoice: {
      title: string
      intro: string
      fats: { name: string; description: string }[]
    }
  }

  const variationsSection = mirepoixData.sections[3] as {
    id: string
    title: string
    intro: string
    variations: { name: string; description: string }[]
  }

  const techniqueSection = mirepoixData.sections[4] as {
    id: string
    title: string
    professionalMethod: {
      title: string
      intro: string
      steps: { step: number; instruction: string; detail: string }[]
    }
    toolNote: { title: string; content: string[] }
  }

  const mistakesSection = mirepoixData.sections[5] as {
    id: string
    title: string
    mistakes: { name: string; problem: string; whyItMatters?: string; fix: string }[]
  }

  const conclusionSection = mirepoixData.sections[6] as {
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

      <BlogLayout breadcrumbTitle={mirepoixData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={mirepoixData.hero.title}
          introduction={mirepoixData.hero.introduction}
          publishedDate={mirepoixData.metadata.publishedDate}
          lastUpdated={mirepoixData.metadata.lastUpdated}
          readTime={mirepoixData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {mirepoixData.tableOfContents.map((item, index) => (
                <li key={index}>
                  <a href={`#${item.id}`} className="text-blue-700 underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Definition */}
          <h2 id={definitionSection.id}>{definitionSection.title}</h2>
          {definitionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="bg-orange-50 border-l-4 border-orange-700 p-6 my-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{definitionSection.ratio.title}</h3>
            <ul className="space-y-2">
              {definitionSection.ratio.parts.map((part, index) => (
                <li key={index}><strong>{part.amount} {part.ingredient}</strong> ({part.percentage})</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-700"><strong>By weight:</strong> {definitionSection.ratio.byWeight}</p>
          </div>

          <h3>{definitionSection.history.title}</h3>
          <p>{definitionSection.history.content}</p>

          {/* Why Professional Kitchens Use Mirepoix */}
          <h2 id={whyUseSection.id}>{whyUseSection.title}</h2>
          {whyUseSection.subsections.map((subsection, index) => (
            <div key={index}>
              <h3>{subsection.title}</h3>
              {subsection.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          ))}

          {/* The Three Variables */}
          <h2 id={variablesSection.id}>{variablesSection.title}</h2>

          <h3>{variablesSection.diceSize.title}</h3>
          <p>{variablesSection.diceSize.intro}</p>
          {variablesSection.diceSize.sizes.map((size, index) => (
            <p key={index}><strong>{size.name}:</strong> {size.use}</p>
          ))}

          <h3>{variablesSection.cookingMethod.title}</h3>
          <p>{variablesSection.cookingMethod.intro}</p>
          {variablesSection.cookingMethod.methods.map((method, index) => (
            <p key={index}><strong>{method.name}:</strong> {method.description}</p>
          ))}

          <BlogNewsletterCTA slug={mirepoixData.newsletterCTA.slug} />

          <h3>{variablesSection.fatChoice.title}</h3>
          <p>{variablesSection.fatChoice.intro}</p>
          {variablesSection.fatChoice.fats.map((fat, index) => (
            <p key={index}><strong>{fat.name}:</strong> {fat.description}</p>
          ))}

          {/* Global Variations */}
          <h2 id={variationsSection.id}>{variationsSection.title}</h2>
          <p>{variationsSection.intro}</p>
          {variationsSection.variations.map((variation, index) => (
            <div key={index}>
              <h3>{variation.name}</h3>
              <p>{variation.description}</p>
            </div>
          ))}

          {/* How to Prep Efficiently */}
          <h2 id={techniqueSection.id}>{techniqueSection.title}</h2>

          <h3>{techniqueSection.professionalMethod.title}</h3>
          <p>{techniqueSection.professionalMethod.intro}</p>
          {techniqueSection.professionalMethod.steps.map((step) => (
            <p key={step.step}><strong>Step {step.step}: {step.instruction}</strong> {step.detail}</p>
          ))}

          <h3>{techniqueSection.toolNote.title}</h3>
          {techniqueSection.toolNote.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Common Mistakes */}
          <h2 id={mistakesSection.id}>{mistakesSection.title}</h2>
          {mistakesSection.mistakes.map((mistake, index) => (
            <div key={index}>
              <h3>{mistake.name}</h3>
              <p><strong>The problem:</strong> {mistake.problem}</p>
              {mistake.whyItMatters && <p><strong>Why it matters:</strong> {mistake.whyItMatters}</p>}
              <p><strong>The fix:</strong> {mistake.fix}</p>
            </div>
          ))}

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={mirepoixData.faq.questions} />

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mirepoixData.relatedArticles.map((article, index) => (
              <CTAVisibilityTracker
                key={index}
                ctaId={`mirepoix-related-${index}`}
                position="final_cta"
                productSlug="what-is-mirepoix"
                merchant="internal"
              >
                <Link href={article.href} className="text-orange-700 hover:text-orange-800 font-semibold">
                  &#8594; {article.title}
                </Link>
              </CTAVisibilityTracker>
            ))}
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
