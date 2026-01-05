// ============================================================================
// WHAT IS VELVETING - Blog Page (Data-Driven)
// Migrated from inline (509 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { velvetingData } from './velveting-data'
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
export const metadata = generateBlogMetadata('what-is-velveting')

export default function WhatIsVelvetingPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: velvetingData.metadata.title,
    description: velvetingData.metadata.description,
    datePublished: velvetingData.metadata.publishedDate,
    dateModified: velvetingData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'what-is-velveting',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: velvetingData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/what-is-velveting' }
  ])

  const faqSchema = generateFAQSchema(velvetingData.faq.questions)

  // Type assertions for sections
  const whatIsSection = velvetingData.sections[0] as {
    id: string
    title: string
    content: string[]
    importantNote: string
  }

  const scienceSection = velvetingData.sections[1] as {
    id: string
    title: string
    subsections: { title: string; content: string[] }[]
  }

  const formulaSection = velvetingData.sections[2] as {
    id: string
    title: string
    marinade: {
      intro: string
      ingredients: { amount: string; item: string; note: string | null }[]
      beefAddition: string
      simplifiedRatio: string
    }
    optionalTenderizers: { title: string; content: string }
  }

  const methodsSection = velvetingData.sections[3] as {
    id: string
    title: string
    oilMethod: {
      title: string
      method: string
      tempTest: string
      advantages: string[]
      disadvantages: string[]
    }
    waterMethod: {
      title: string
      method: string
      temperature: string
      advantages: string[]
      disadvantages: string[]
    }
    recommendation: string
  }

  const stepByStepSection = velvetingData.sections[4] as {
    id: string
    title: string
    steps: {
      number: number
      title: string
      time: string
      content: string[]
      proTip?: string
    }[]
  }

  const proteinsSection = velvetingData.sections[5] as {
    id: string
    title: string
    proteins: { name: string; description: string; note?: string }[]
    whatNotToVelvet: { name: string; reason: string }[]
    generalRule: string
  }

  const mistakesSection = velvetingData.sections[6] as {
    id: string
    title: string
    mistakes: { name: string; problem: string; testing?: string; fix: string }[]
  }

  const homeStovesSection = velvetingData.sections[7] as {
    id: string
    title: string
    heatGap: {
      title: string
      comparison: { type: string; btu: string }[]
      difference: string
    }
    solutions: { title: string; content: string }[]
    bottomLine: string
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={velvetingData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={velvetingData.hero.title}
          introduction={velvetingData.hero.introduction}
          publishedDate={velvetingData.metadata.publishedDate}
          lastUpdated={velvetingData.metadata.lastUpdated}
          readTime={velvetingData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {velvetingData.tableOfContents.map((item, index) => (
                <li key={index}>
                  <a href={`#${item.id}`} className="text-blue-700 underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* What Velveting Actually Is */}
          <h2 id={whatIsSection.id}>{whatIsSection.title}</h2>
          {whatIsSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p><strong>Important note:</strong> {whatIsSection.importantNote}</p>

          {/* The Science Behind Velveting */}
          <h2 id={scienceSection.id}>{scienceSection.title}</h2>
          {scienceSection.subsections.map((subsection, index) => (
            <div key={index}>
              <h3>{subsection.title}</h3>
              {subsection.content.map((paragraph, pIndex) => (
                <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          ))}

          {/* The Basic Velveting Formula */}
          <h2 id={formulaSection.id}>{formulaSection.title}</h2>
          <div className="bg-orange-50 border-l-4 border-orange-700 p-6 my-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Standard Velveting Marinade</h3>
            <p className="mb-3"><strong>{formulaSection.marinade.intro}</strong></p>
            <ul className="space-y-2">
              {formulaSection.marinade.ingredients.map((ing, index) => (
                <li key={index}>
                  <strong>{ing.amount} {ing.item}</strong>{ing.note && ` - ${ing.note}`}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-700"><strong>For beef only, add:</strong> {formulaSection.marinade.beefAddition.replace('For beef only, add: ', '')}</p>
            <p className="mt-2 text-sm text-slate-700"><strong>Simplified ratio:</strong> {formulaSection.marinade.simplifiedRatio.replace('Liquid to cornstarch ratio of 2:1. ', '')}</p>
          </div>

          <h3>{formulaSection.optionalTenderizers.title}</h3>
          <p>{formulaSection.optionalTenderizers.content}</p>

          {/* Oil Velveting vs. Water Velveting */}
          <h2 id={methodsSection.id}>{methodsSection.title}</h2>

          <h3>{methodsSection.oilMethod.title}</h3>
          <p><strong>Method:</strong> {methodsSection.oilMethod.method}</p>
          <p><strong>Temperature test:</strong> {methodsSection.oilMethod.tempTest}</p>
          <p><strong>Advantages:</strong></p>
          <ul>
            {methodsSection.oilMethod.advantages.map((adv, index) => (
              <li key={index}>{adv}</li>
            ))}
          </ul>
          <p><strong>Disadvantages:</strong></p>
          <ul>
            {methodsSection.oilMethod.disadvantages.map((dis, index) => (
              <li key={index}>{dis}</li>
            ))}
          </ul>

          <h3>{methodsSection.waterMethod.title}</h3>
          <p><strong>Method:</strong> {methodsSection.waterMethod.method}</p>
          <p><strong>Temperature:</strong> {methodsSection.waterMethod.temperature}</p>
          <p><strong>Advantages:</strong></p>
          <ul>
            {methodsSection.waterMethod.advantages.map((adv, index) => (
              <li key={index}>{adv}</li>
            ))}
          </ul>
          <p><strong>Disadvantages:</strong></p>
          <ul>
            {methodsSection.waterMethod.disadvantages.map((dis, index) => (
              <li key={index}>{dis}</li>
            ))}
          </ul>

          <h3>Which Method to Choose</h3>
          <p>{methodsSection.recommendation}</p>

          <BlogNewsletterCTA slug={velvetingData.newsletterCTA.slug} />

          {/* Step-by-Step Process */}
          <h2 id={stepByStepSection.id}>{stepByStepSection.title}</h2>
          {stepByStepSection.steps.map((step) => (
            <div key={step.number}>
              <h3>Step {step.number}: {step.title} ({step.time})</h3>
              {step.content.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
              {step.proTip && (
                <p><strong>Pro tip:</strong> {step.proTip}</p>
              )}
            </div>
          ))}

          {/* Which Proteins Benefit */}
          <h2 id={proteinsSection.id}>{proteinsSection.title}</h2>
          {proteinsSection.proteins.map((protein, index) => (
            <div key={index}>
              <h3>{protein.name}</h3>
              <p>{protein.description}</p>
              {protein.note && <p>{protein.note}</p>}
            </div>
          ))}

          <h3>What NOT to Velvet</h3>
          {proteinsSection.whatNotToVelvet.map((item, index) => (
            <p key={index}><strong>{item.name}:</strong> {item.reason}</p>
          ))}
          <p><strong>General rule:</strong> {proteinsSection.generalRule}</p>

          {/* Common Mistakes */}
          <h2 id={mistakesSection.id}>{mistakesSection.title}</h2>
          {mistakesSection.mistakes.map((mistake, index) => (
            <div key={index}>
              <h3>{mistake.name}</h3>
              <p><strong>The problem:</strong> {mistake.problem}</p>
              {mistake.testing && <p><strong>Testing shows:</strong> {mistake.testing}</p>}
              <p><strong>The fix:</strong> {mistake.fix}</p>
            </div>
          ))}

          {/* How Velveting Compensates for Low-BTU Stoves */}
          <h2 id={homeStovesSection.id}>{homeStovesSection.title}</h2>

          <h3>{homeStovesSection.heatGap.title}</h3>
          {homeStovesSection.heatGap.comparison.map((comp, index) => (
            <p key={index}><strong>{comp.type}:</strong> {comp.btu}</p>
          ))}
          <p><strong>Heat difference:</strong> {homeStovesSection.heatGap.difference}</p>

          <h3>How Velveting Solves the Home Stove Problem</h3>
          {homeStovesSection.solutions.map((solution, index) => (
            <p key={index}><strong>{index + 1}. {solution.title}:</strong> {solution.content}</p>
          ))}

          <h3>Bottom Line</h3>
          <p>{homeStovesSection.bottomLine}</p>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={velvetingData.faq.questions} />

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {velvetingData.relatedArticles.map((article, index) => (
              <CTAVisibilityTracker
                key={index}
                ctaId={`velveting-related-${index}`}
                position="final_cta"
                productSlug="what-is-velveting"
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
