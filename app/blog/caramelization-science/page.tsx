// ============================================================================
// CARAMELIZATION SCIENCE: WHY TEMPERATURE MATTERS MOST - Educational Blog Page (Data-Driven)
// Migrated from inline (252 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, Beaker, ThermometerSun } from 'lucide-react'
import { educationalData } from './caramelization-data'
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
export const metadata = generateBlogMetadata('caramelization-science')

export default function CaramelizationPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'caramelization-science',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/caramelization-science' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
    maillardLink: string
  }

  const whatIsSection = educationalData.sections[1] as {
    id: string
    title: string
    hasIcon: boolean
    definition: string
    effects: { label: string; detail: string }[]
    clarification: string
    restaurantReality: { title: string; content: string }
  }

  const chemistrySection = educationalData.sections[2] as {
    id: string
    title: string
    intro: string
    stages: {
      number: number
      title: string
      content: string
      compounds?: { name: string; flavor: string }[]
    }[]
    result: string
    proTip: { title: string; content: string }
  }

  const comparisonSection = educationalData.sections[3] as {
    id: string
    title: string
    intro: string
    caramelization: {
      requires: string
      proteinNeeded: string
      examples: string
      flavorProfile: string
      tempThreshold: string
    }
    maillard: {
      requires: string
      proteinNeeded: string
      examples: string
      flavorProfile: string
      tempThreshold: string
    }
    inPractice: string
  }

  const takeawaySection = educationalData.sections[4] as {
    id: string
    title: string
    intro: string
    points: { emphasis: string; content: string }[]
    experiment: string
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
          publishedDate={educationalData.metadata.publishedDate}
          lastUpdated={educationalData.metadata.lastUpdated}
          readTime={educationalData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          <p dangerouslySetInnerHTML={{ __html: introSection.content[0].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <p>
            It&apos;s one of the most important chemical reactions in cooking, responsible for some of the deepest, most satisfying flavors in food. But it&apos;s also one of the most misunderstood. Home cooks confuse it with the{' '}
            <CTAVisibilityTracker
              ctaId="blog-caramelization-maillard-intro-link"
              position="mid_article"
              productSlug="caramelization-science"
              merchant="internal"
            >
              <Link href={introSection.maillardLink} className="text-orange-700 hover:text-orange-800 underline">
                Maillard reaction
              </Link>
            </CTAVisibilityTracker>
            , rush it, or never get their pans hot enough to make it happen properly.
          </p>
          <p>{introSection.content[2]}</p>

          {/* What is Caramelization */}
          <h2 className="flex items-center gap-2">
            <Beaker className="w-6 h-6 text-orange-700" />
            {whatIsSection.title}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: whatIsSection.definition.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <ul>
            {whatIsSection.effects.map((effect, index) => (
              <li key={index}><strong>{effect.label}</strong> - {effect.detail}</li>
            ))}
          </ul>
          <p dangerouslySetInnerHTML={{ __html: whatIsSection.clarification.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              {whatIsSection.restaurantReality.title}
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: whatIsSection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
          </div>

          {/* Chemistry Section */}
          <h2>{chemistrySection.title}</h2>
          <p>{chemistrySection.intro}</p>
          {chemistrySection.stages.map((stage) => (
            <div key={stage.number}>
              <h3>{stage.number}. {stage.title}</h3>
              <p>{stage.content}</p>
              {stage.compounds && (
                <ul>
                  {stage.compounds.map((compound, index) => (
                    <li key={index}><strong>{compound.name}</strong> - {compound.flavor}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p>{chemistrySection.result}</p>

          {/* Pro Tip Callout */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
            <h4 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-purple-600" />
              {chemistrySection.proTip.title}
            </h4>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: chemistrySection.proTip.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          {/* Comparison Section */}
          <h2>{comparisonSection.title}</h2>
          <p>{comparisonSection.intro}</p>

          <h3>Caramelization</h3>
          <ul>
            <li><strong>Requires:</strong> {comparisonSection.caramelization.requires}</li>
            <li><strong>{comparisonSection.caramelization.proteinNeeded}</strong></li>
            <li><strong>Examples:</strong> {comparisonSection.caramelization.examples}</li>
            <li><strong>Flavor profile:</strong> {comparisonSection.caramelization.flavorProfile}</li>
            <li><strong>Temperature threshold:</strong> {comparisonSection.caramelization.tempThreshold}</li>
          </ul>

          <h3>Maillard Reaction</h3>
          <ul>
            <li><strong>Requires:</strong> {comparisonSection.maillard.requires}</li>
            <li><strong>{comparisonSection.maillard.proteinNeeded}</strong></li>
            <li><strong>Examples:</strong> {comparisonSection.maillard.examples}</li>
            <li><strong>Flavor profile:</strong> {comparisonSection.maillard.flavorProfile}</li>
            <li><strong>Temperature threshold:</strong> {comparisonSection.maillard.tempThreshold}</li>
          </ul>

          <p dangerouslySetInnerHTML={{ __html: comparisonSection.inPractice.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          <BlogNewsletterCTA slug="caramelization-science" />

          {/* Takeaway Section */}
          <h2>{takeawaySection.title}</h2>
          <p>{takeawaySection.intro}</p>
          {takeawaySection.points.map((point, index) => (
            <p key={index}>
              <strong>{point.emphasis}</strong> {point.content}
            </p>
          ))}
          <p>{takeawaySection.experiment}</p>
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
