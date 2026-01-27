// ============================================================================
// WHAT IS EMULSIFICATION? THE SCIENCE BEHIND CREAMY SAUCES - Educational Blog Page (Data-Driven)
// Migrated from inline (229 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { Droplets, AlertTriangle } from 'lucide-react'
import { educationalData } from './emulsification-data'
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
import { getBlogMetadata } from '@/data/metadata'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('what-is-emulsification')

export default function EmulsificationPage() {
  const blogMeta = getBlogMetadata('what-is-emulsification')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'what-is-emulsification',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/what-is-emulsification' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
  }

  const basicScienceSection = educationalData.sections[1] as {
    id: string
    title: string
    hasIcon: boolean
    content: string[]
    commonEmulsions: { name: string; description: string }[]
    restaurantReality: { title: string; content: string }
  }

  const chemistrySection = educationalData.sections[2] as {
    id: string
    title: string
    intro: string
    processIntro: string
    process: { step: string; description: string }[]
    emulsifiers: { name: string; description: string }[]
  }

  const typesSection = educationalData.sections[3] as {
    id: string
    title: string
    types: {
      name: string
      description: string
      examples: { name: string; detail: string }[]
    }[]
  }

  const conclusionSection = educationalData.sections[4] as {
    id: string
    title: string
    intro: string
    principlesIntro: string
    masterList: string[]
    cheeseSauceLink: string
    closing: string[]
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
            <p key={index}>{paragraph}</p>
          ))}

          {/* Basic Science Section */}
          <h2 className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-orange-700" />
            {basicScienceSection.title}
          </h2>
          {basicScienceSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p><strong>Common emulsions in cooking:</strong></p>
          <ul>
            {basicScienceSection.commonEmulsions.map((emulsion, index) => (
              <li key={index}><strong>{emulsion.name}</strong> – {emulsion.description}</li>
            ))}
          </ul>

          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {basicScienceSection.restaurantReality.title}
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: basicScienceSection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          {/* Chemistry Section */}
          <h2>{chemistrySection.title}</h2>
          <p>{chemistrySection.intro}</p>
          <p>{chemistrySection.processIntro}</p>
          <ol>
            {chemistrySection.process.map((step, index) => (
              <li key={index}><strong>{step.step}</strong> – {step.description}</li>
            ))}
          </ol>

          <p><strong>Common emulsifiers in cooking:</strong></p>
          <ul>
            {chemistrySection.emulsifiers.map((emulsifier, index) => (
              <li key={index}><strong>{emulsifier.name}</strong> – {emulsifier.description}</li>
            ))}
          </ul>

          <BlogNewsletterCTA slug="what-is-emulsification" />

          {/* Types Section */}
          <h2>{typesSection.title}</h2>
          {typesSection.types.map((type, index) => (
            <div key={index}>
              <h3>{index + 1}. {type.name}</h3>
              <p>{type.description}</p>
              <ul>
                {type.examples.map((example, i) => (
                  <li key={i}><strong>{example.name}</strong> - {example.detail}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: conclusionSection.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <p>{conclusionSection.principlesIntro}</p>
          <ul>
            {conclusionSection.masterList.slice(0, 3).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <li>
              <CTAVisibilityTracker
                ctaId="blog-emulsification-cheese-sauce-link"
                position="mid_article"
                productSlug="what-is-emulsification"
                merchant="internal"
              >
                <Link href={conclusionSection.cheeseSauceLink} className="text-orange-700 hover:text-orange-800 underline">
                  Smooth cheese sauces
                </Link>
              </CTAVisibilityTracker>
              {' '}that never break
            </li>
            <li>{conclusionSection.masterList[4]}</li>
          </ul>
          {conclusionSection.closing.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
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
