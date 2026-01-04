// ============================================================================
// BLANCHING VEGETABLES - Blog Page (Data-Driven)
// Migrated from inline to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { blanchingData } from './blanching-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { Timer, Droplets, Sparkles } from 'lucide-react'
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('blanching-vegetables-why-restaurants-do-it')

export default function BlanchingVegetablesPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blanchingData.metadata.title,
    description: blanchingData.metadata.description,
    datePublished: blanchingData.metadata.publishedDate,
    dateModified: blanchingData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'blanching-vegetables-why-restaurants-do-it',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: blanchingData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/blanching-vegetables-why-restaurants-do-it' }
  ])

  const faqSchema = generateFAQSchema(blanchingData.faq.questions)

  // Type assertions
  const introSection = blanchingData.sections[0] as { id: string; content: string[] }
  const problemSection = blanchingData.sections[1] as {
    id: string; title: string; hasIcon: boolean; iconType: string; content: string[]
    accomplishes: { label: string; description: string }[]
  }
  const methodSection = blanchingData.sections[2] as {
    id: string; title: string; hasIcon: boolean; iconType: string
    steps: { number: number; title: string; content: string[]; hasIcon?: boolean; iconType?: string; hasTimingTable?: boolean }[]
    proTip: string
  }
  const timingSection = blanchingData.sections[3] as {
    id: string
    timingTable: { headers: string[]; rows: { vegetable: string; time: string; notes: string; isAlt?: boolean }[] }
    testNote: string
  }
  const mistakesSection = blanchingData.sections[4] as {
    id: string; title: string
    mistakes: { number: number; title: string; content: string[] }[]
  }
  const equipmentSection = blanchingData.sections[5] as {
    id: string; title: string
    equipment: { name: string; description: string }[]
  }
  const troubleshootingSection = blanchingData.sections[6] as {
    id: string; title: string
    issues: { problem: string; solution: string }[]
  }
  const whenNotSection = blanchingData.sections[7] as {
    id: string; title: string; intro: string
    skipFor: { label: string; reason: string }[]
  }
  const conclusionSection = blanchingData.sections[8] as {
    id: string; title: string; content: string[]
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToSchema
        name={blanchingData.howToSchema.name}
        description={blanchingData.howToSchema.description}
        datePublished={blanchingData.howToSchema.datePublished}
        totalTime={blanchingData.howToSchema.totalTime}
        tools={blanchingData.howToSchema.tools}
        steps={blanchingData.howToSchema.steps}
      />

      <BlogLayout breadcrumbTitle={blanchingData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={blanchingData.hero.title}
          introduction={blanchingData.hero.introduction}
          publishedDate={blanchingData.metadata.publishedDate}
          lastUpdated={blanchingData.metadata.lastUpdated}
          readTime={blanchingData.metadata.readTime}
        />

        <div className="prose prose-lg max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Problem Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-orange-700" />
            {problemSection.title}
          </h2>

          {problemSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <p className="font-semibold text-slate-900 mb-3">What Blanching Accomplishes:</p>
            <ul className="space-y-2 mb-0">
              {problemSection.accomplishes.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.description}</li>
              ))}
            </ul>
          </div>

          {/* Method Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Timer className="w-8 h-8 text-orange-700" />
            {methodSection.title}
          </h2>

          {methodSection.steps.map((step) => (
            <div key={step.number}>
              <h3 className={`text-2xl font-semibold text-slate-900 mt-8 mb-4 ${step.hasIcon ? 'flex items-center gap-3' : ''}`}>
                {step.hasIcon && step.iconType === 'droplets' && <Droplets className="w-6 h-6 text-orange-700" />}
                {step.number}. {step.title}
              </h3>
              {step.content.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}

              {/* Timing Table */}
              {step.hasTimingTable && (
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full border-collapse border border-slate-300">
                    <thead>
                      <tr className="bg-slate-100">
                        {timingSection.timingTable.headers.map((header, index) => (
                          <th key={index} className="border border-slate-300 px-4 py-2 text-left font-semibold">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timingSection.timingTable.rows.map((row, index) => (
                        <tr key={index} className={row.isAlt ? 'bg-slate-50' : ''}>
                          <td className="border border-slate-300 px-4 py-2">{row.vegetable}</td>
                          <td className="border border-slate-300 px-4 py-2">{row.time}</td>
                          <td className="border border-slate-300 px-4 py-2">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          <p dangerouslySetInnerHTML={{ __html: timingSection.testNote.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-8">
            <p className="font-semibold text-slate-900 mb-2">Pro Tip:</p>
            <p className="mb-0">{methodSection.proTip}</p>
          </div>

          <p>
            <CTAVisibilityTracker
              ctaId="blanching-vegetables-roasting-guide-1"
              position="mid_article"
              productSlug="blanching-vegetables-why-restaurants-do-it"
              merchant="internal"
            >
              <Link href={blanchingData.relatedLinks[0].href} className="text-blue-700 underline">
                {blanchingData.relatedLinks[0].text}
              </Link>
            </CTAVisibilityTracker> after blanching for restaurant-quality results with crisp edges and tender centers.
          </p>

          <div className="not-prose bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Free Temperature & Timing Guide</h3>
            <p className="text-slate-700 mb-3">
              Join 10,000+ cooks learning pro techniques for better texture and flavor.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Download:</strong> &quot;Vegetable Blanching & Shocking Cheat Sheet&quot;
            </p>
            <CTAVisibilityTracker
              ctaId="blanching-vegetables-newsletter-cta"
              position="mid_article"
              productSlug="blanching-vegetables-why-restaurants-do-it"
              merchant="internal"
            >
              <Link
                href="/newsletter"
                className="inline-block bg-orange-900 !text-white px-6 py-3 rounded font-semibold hover:bg-orange-800 transition-colors"
              >
                Get the Guide →
              </Link>
            </CTAVisibilityTracker>
          </div>

          {/* Mistakes Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{mistakesSection.title}</h2>

          {mistakesSection.mistakes.map((mistake) => (
            <div key={mistake.number}>
              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                Mistake #{mistake.number}: {mistake.title}
              </h3>
              {mistake.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ))}

          {/* Equipment Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{equipmentSection.title}</h2>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <ul className="space-y-3 mb-0">
              {equipmentSection.equipment.map((item, index) => (
                <li key={index}><strong>{item.name}:</strong> {item.description}</li>
              ))}
            </ul>
          </div>

          {/* Troubleshooting Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{troubleshootingSection.title}</h2>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <div className="space-y-4">
              {troubleshootingSection.issues.map((issue, index) => (
                <div key={index}>
                  <p className="font-semibold text-slate-900 mb-2">{issue.problem}</p>
                  <p className="text-slate-700 mb-0">{issue.solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* When NOT to Blanch */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{whenNotSection.title}</h2>
          <p>{whenNotSection.intro}</p>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8">
            <ul className="space-y-2 mb-0">
              {whenNotSection.skipFor.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.reason}</li>
              ))}
            </ul>
          </div>

          <p>
            <CTAVisibilityTracker
              ctaId="blanching-vegetables-meal-prep-1"
              position="mid_article"
              productSlug="blanching-vegetables-why-restaurants-do-it"
              merchant="internal"
            >
              <Link href={blanchingData.relatedLinks[1].href} className="text-blue-700 underline">
                {blanchingData.relatedLinks[1].text}
              </Link>
            </CTAVisibilityTracker> to handle blanching efficiently for the week ahead.
          </p>

          {/* Conclusion */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 p-6 my-12 rounded-r-lg">
            <p className="text-slate-900 mb-0">
              <strong>About the Author:</strong> Scott Bradley spent 24 years in professional kitchens, including 6 years at Purple Café in Seattle. He specializes in teaching home cooks the professional techniques that create consistent, restaurant-quality results.
            </p>
          </div>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={blanchingData.faq.questions} />

        {/* Email Capture */}
        <BlogEmailCapture />

        {/* Author Bio */}
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
