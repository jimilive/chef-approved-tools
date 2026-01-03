// ============================================================================
// HOW TO MAKE A CHEESE SAUCE (MAC AND CHEESE PERFECTION) - Blog Page (Data-Driven)
// Migrated from inline (263 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { AlertTriangle, ThermometerSun } from 'lucide-react'
import { cheeseSauceData } from './cheese-sauce-data'
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

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('cheese-sauce-mac-and-cheese')

export default function CheeseSaucePage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: cheeseSauceData.metadata.title,
    description: cheeseSauceData.metadata.description,
    datePublished: cheeseSauceData.metadata.publishedDate,
    dateModified: cheeseSauceData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'cheese-sauce-mac-and-cheese',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: cheeseSauceData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/cheese-sauce-mac-and-cheese' }
  ])

  const faqSchema = generateFAQSchema(cheeseSauceData.faq.questions)

  // Type assertions for complex sections
  const introSection = cheeseSauceData.sections[0] as {
    id: string
    title: string
    content: string[]
  }

  const structureSection = cheeseSauceData.sections[1] as {
    id: string
    title: string
    content: string[]
    proTip: { title: string; content: string }
  }

  const stepByStepSection = cheeseSauceData.sections[2] as {
    id: string
    title: string
    steps: {
      number: number
      title: string
      content: string[]
    }[]
    chefWarning: { title: string; content: string }
  }

  const cheeseChoicesSection = cheeseSauceData.sections[3] as {
    id: string
    title: string
    intro: string
    categories: {
      name: string
      description: string
      cheeses: { name: string; note: string | null }[]
    }[]
    houseBlend: string
  }

  const conclusionSection = cheeseSauceData.sections[4] as {
    id: string
    title: string
    intro: string
    principles: { emphasis: string; description: string }[]
    closing: string[]
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToSchema
        name={cheeseSauceData.howToSchema.name}
        description={cheeseSauceData.howToSchema.description}
        datePublished={cheeseSauceData.howToSchema.datePublished}
        totalTime={cheeseSauceData.howToSchema.totalTime}
        tools={cheeseSauceData.howToSchema.tools}
        steps={cheeseSauceData.howToSchema.steps}
      />

      <BlogLayout breadcrumbTitle={cheeseSauceData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={cheeseSauceData.hero.title}
          introduction={cheeseSauceData.hero.introduction}
          publishedDate={cheeseSauceData.metadata.publishedDate}
          lastUpdated={cheeseSauceData.metadata.lastUpdated}
          readTime={cheeseSauceData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Structure Section */}
          <h2>{structureSection.title}</h2>
          {structureSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Pro Tip Callout */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-purple-600" />
              {structureSection.proTip.title}
            </h3>
            <p className="mb-0">{structureSection.proTip.content}</p>
          </div>

          {/* Step-by-Step Section */}
          <h2>{stepByStepSection.title}</h2>
          {stepByStepSection.steps.map((step) => (
            <div key={step.number}>
              <h3>{step.number}. {step.title}</h3>
              {step.content.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          ))}

          {/* Chef Warning Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {stepByStepSection.chefWarning.title}
            </p>
            <p className="mb-0">{stepByStepSection.chefWarning.content}</p>
          </div>

          {/* Cheese Choices Section */}
          <h2>{cheeseChoicesSection.title}</h2>
          <p>{cheeseChoicesSection.intro}</p>

          {cheeseChoicesSection.categories.map((category, index) => (
            <div key={index}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <ul>
                {category.cheeses.map((cheese, i) => (
                  <li key={i}>
                    <strong>{cheese.name}</strong>
                    {cheese.note && ` (${cheese.note})`}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p dangerouslySetInnerHTML={{ __html: cheeseChoicesSection.houseBlend.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          <BlogNewsletterCTA
            slug={cheeseSauceData.newsletterCTA.slug}
            description={cheeseSauceData.newsletterCTA.description}
          />

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          <p>{conclusionSection.intro}</p>
          <ol>
            {conclusionSection.principles.map((principle, index) => (
              <li key={index}><strong>{principle.emphasis}</strong> - {principle.description}</li>
            ))}
          </ol>
          {conclusionSection.closing.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={cheeseSauceData.faq.questions} />

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cheeseSauceData.relatedArticles.map((article, index) => (
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
