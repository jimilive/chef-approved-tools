// ============================================================================
// HOW TO SEAR STEAKS LIKE A RESTAURANT CHEF - Educational Blog Page (Data-Driven)
// Migrated from inline (494 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ThermometerSun, Timer, Flame } from 'lucide-react'
import { educationalData } from './steak-searing-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
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
export const metadata = generateBlogMetadata('how-to-sear-steaks-like-restaurant-chef')

export default function SteakSearingPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'how-to-sear-steaks-like-restaurant-chef',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/how-to-sear-steaks-like-restaurant-chef' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    restaurantReality: { title: string; content: string }
  }

  const whyFailSection = educationalData.sections[1] as {
    id: string
    title: string
    intro: string
    mistakes: { issue: string; explanation: string }[]
    closing: string
  }

  const professionalMethodSection = educationalData.sections[2] as {
    id: string
    title: string
    steps: {
      id: string
      title: string
      intro: string
      equipment?: string[]
      lodgeLink?: string
      proTip?: string
      prepCards?: { title: string; color: string; content: string }[]
      seasoningNote?: string
      heatLevels?: string[]
      steps?: { step: number; instruction: string; detail: string }[]
      timingGuide?: {
        title: string
        note: string
        doneness: { level: string; time: string }[]
        disclaimer: string
      }
      butterTechnique?: {
        title: string
        intro: string
        benefits: string[]
        proTip: string
      }
      restingBasics?: string[]
      sauceTechnique?: {
        title: string
        steps: { step: number; instruction: string; detail: string }[]
        tip: string
      }
      closing?: string
    }[]
  }

  const problemsSection = educationalData.sections[3] as {
    id: string
    title: string
    problems: { problem: string; solution: string }[]
  }

  const equipmentSection = educationalData.sections[4] as {
    id: string
    title: string
    intro: string
    recommendations: { name: string; link?: string; linkText?: string; description: string }[]
    closing: string
  }

  const finalSection = educationalData.sections[5] as {
    id: string
    title: string
    content: string[]
  }

  // Extract specific method steps for easier rendering
  const equipmentStep = professionalMethodSection.steps[0]
  const prepStep = professionalMethodSection.steps[1]
  const heatStep = professionalMethodSection.steps[2]
  const searStep = professionalMethodSection.steps[3]
  const restStep = professionalMethodSection.steps[4]
  const sauceStep = professionalMethodSection.steps[5]

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToSchema
        name={educationalData.howToSchema.name}
        description={educationalData.howToSchema.description}
        datePublished={educationalData.howToSchema.datePublished}
        totalTime={educationalData.howToSchema.totalTime}
        tools={educationalData.howToSchema.tools}
        steps={educationalData.howToSchema.steps}
      />

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
          {/* Restaurant Reality Callout */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              {introSection.restaurantReality.title}
            </h2>
            <p className="text-orange-800 mb-0">
              {introSection.restaurantReality.content}
            </p>
          </div>

          {/* Why Home Cooks Fail */}
          <h2>{whyFailSection.title}</h2>
          <p>{whyFailSection.intro}</p>
          <ul>
            {whyFailSection.mistakes.map((mistake, index) => (
              <li key={index}>
                <strong>{mistake.issue}</strong> - {mistake.explanation}
              </li>
            ))}
          </ul>
          <p>{whyFailSection.closing}</p>

          {/* Professional Searing Method */}
          <h2>{professionalMethodSection.title}</h2>

          {/* Step 1: Equipment */}
          <h3>{equipmentStep.title}</h3>
          <p>{equipmentStep.intro}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-blue-800 mb-3">Essential Equipment for Perfect Sears</h4>
            <ul className="text-blue-700 space-y-2 mb-4">
              {equipmentStep.equipment?.map((item, index) => (
                <li key={index}><strong>{item.split(' - ')[0]}</strong> - {item.split(' - ')[1]}</li>
              ))}
            </ul>
            <p className="text-sm text-blue-600">
              <strong>Pro tip:</strong> I use the same{' '}
              <CTAVisibilityTracker
                ctaId="blog-how-to-sear-steaks-like-restaurant-chef-review-link-1"
                position="mid_article"
                productSlug="how-to-sear-steaks-like-restaurant-chef"
                merchant="internal"
              >
                <Link href={equipmentStep.lodgeLink || ''} className="text-blue-700 underline">
                  Lodge cast iron skillets
                </Link>
              </CTAVisibilityTracker>
              {' '}at home that we relied on in the restaurant. They distribute heat evenly and develop amazing fond.
            </p>
          </div>

          {/* Step 2: Preparation */}
          <h3>{prepStep.title}</h3>
          <p>{prepStep.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {prepStep.prepCards?.map((card, index) => (
              <div key={index} className={`bg-${card.color}-50 border border-${card.color}-200 rounded-lg p-4`}>
                <h4 className={`font-bold text-${card.color}-800 mb-2`}>{card.title}</h4>
                <p className={`text-${card.color}-700 text-sm`}>{card.content}</p>
              </div>
            ))}
          </div>
          <p dangerouslySetInnerHTML={{ __html: prepStep.seasoningNote?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} />

          {/* Step 3: Heat Management */}
          <h3>{heatStep.title}</h3>
          <p>{heatStep.intro}</p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <ThermometerSun className="w-5 h-5" />
              Professional Heat Levels
            </h4>
            <ul className="text-red-700 space-y-2">
              {heatStep.heatLevels?.map((level, index) => (
                <li key={index}><strong>{level.split(' - ')[0]}</strong> - {level.split(' - ')[1] || ''}</li>
              ))}
            </ul>
          </div>

          {/* Step 4: The Sear */}
          <h3>{searStep.title}</h3>
          <p>{searStep.intro}</p>
          <ol>
            {searStep.steps?.map((step) => (
              <li key={step.step}>
                <strong>{step.instruction}</strong> - {step.detail}
              </li>
            ))}
          </ol>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              {searStep.timingGuide?.title}
            </h4>
            <p className="text-slate-700 mb-3">{searStep.timingGuide?.note}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                {searStep.timingGuide?.doneness.slice(0, 2).map((d, index) => (
                  <p key={index}><strong>{d.level}:</strong> {d.time}</p>
                ))}
              </div>
              <div>
                {searStep.timingGuide?.doneness.slice(2).map((d, index) => (
                  <p key={index}><strong>{d.level}:</strong> {d.time}</p>
                ))}
              </div>
            </div>
            <p className="text-slate-700 text-xs mt-3">{searStep.timingGuide?.disclaimer}</p>
          </div>

          {/* Step 5: The Rest */}
          <h3>{restStep.title}</h3>
          <p>{restStep.intro}</p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-yellow-800 mb-3">{restStep.butterTechnique?.title}</h4>
            <p className="text-yellow-700 mb-3">{restStep.butterTechnique?.intro}</p>
            <ul className="text-yellow-700 space-y-1 text-sm">
              {restStep.butterTechnique?.benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
            <p className="text-yellow-700 text-xs mt-3">
              <strong>Pro tip:</strong> {restStep.butterTechnique?.proTip}
            </p>
          </div>

          <p><strong>Standard resting basics:</strong></p>
          <ul>
            {restStep.restingBasics?.map((item, index) => (
              <li key={index}><strong>{item.split(' - ')[0]}</strong>{item.includes(' - ') ? ` - ${item.split(' - ')[1]}` : ''}</li>
            ))}
          </ul>

          {/* Step 6: Pan Sauce */}
          <h3>{sauceStep.title}</h3>
          <p>{sauceStep.intro}</p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-green-800 mb-3">{sauceStep.sauceTechnique?.title}</h4>
            <ol className="text-green-700 space-y-2 text-sm">
              {sauceStep.sauceTechnique?.steps.map((step) => (
                <li key={step.step}>
                  <strong>{step.step}. {step.instruction}</strong> - {step.detail}
                </li>
              ))}
            </ol>
            <p className="text-green-700 text-xs mt-3">
              <strong>Restaurant tip:</strong> {sauceStep.sauceTechnique?.tip}
            </p>
          </div>

          <p>{sauceStep.closing}</p>

          {/* Common Problems */}
          <h2>{problemsSection.title}</h2>
          <div className="space-y-4 my-8">
            {problemsSection.problems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 mb-2">Problem: {item.problem}</h3>
                <p className="text-slate-700 text-sm">
                  <strong>Solution:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>

          {/* Equipment Recommendations */}
          <h2>{equipmentSection.title}</h2>
          <p>{equipmentSection.intro}</p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-slate-800 mb-4">Tested Equipment Recommendations</h3>
            <ul className="space-y-3">
              {equipmentSection.recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.name}:</strong>{' '}
                  {rec.link ? (
                    <>
                      <Link href={rec.link} className="text-orange-700 hover:text-orange-800 underline">
                        {rec.linkText}
                      </Link>
                      {' - '}
                    </>
                  ) : null}
                  {rec.description}
                </li>
              ))}
            </ul>
            <p className="text-slate-700 text-sm mt-4">{equipmentSection.closing}</p>
          </div>

          {/* Final Thoughts */}
          <h2>{finalSection.title}</h2>
          {finalSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <BlogNewsletterCTA slug="how-to-sear-steaks-like-restaurant-chef" />
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Articles */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Related Equipment Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationalData.relatedArticles.map((article, index) => (
              <Link key={index} href={article.href} className="block bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2">{article.title}</h4>
                <p className="text-slate-700 text-sm">{article.description}</p>
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
