// ============================================================================
// GUIDE TO COOKING OILS & SMOKE POINTS - Educational Blog Page (Data-Driven)
// Migrated from inline (453 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { Flame, Lightbulb } from 'lucide-react'
import { educationalData } from './cooking-oils-data'
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
export const metadata = generateBlogMetadata('guide-cooking-oils-smoke-points')

export default function CookingOilsGuidePage() {
  const blogMeta = getBlogMetadata('guide-cooking-oils-smoke-points')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'guide-cooking-oils-smoke-points',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/guide-cooking-oils-smoke-points' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    restaurantReality: {
      title: string
      content: string[]
    }
    intro: string[]
  }

  const smokePointSection = educationalData.sections[1] as {
    id: string
    title: string
    definition: string
    whyItMatters: string[]
    rule: string
    smokePointTable: {
      title: string
      headers: string[]
      rows: { oil: string; smokePoint: string; bestUse: string }[]
    }
  }

  const essentialOilsSection = educationalData.sections[2] as {
    id: string
    title: string
    oils: {
      name: string
      smokePoint: string
      flavor: string
      bestFor: string[]
      professionalStandard?: string
      proTip?: string
      whyEssential?: string
      fatFlavorLink?: string
      howToUse?: string[]
    }[]
  }

  const cookingMethodsSection = educationalData.sections[3] as {
    id: string
    title: string
    methods: {
      name: string
      goal?: string
      bestOils: string[]
      dontUse?: string
      proTip?: string
      examples?: string
    }[]
    chefTechnique: {
      title: string
      intro: string
      steps: string[]
    }
  }

  const mistakesSection = educationalData.sections[4] as {
    id: string
    title: string
    mistakes: {
      number: number
      title: string
      problem: string
      fix: string
      maillardLink?: string
    }[]
  }

  const takeawaySection = educationalData.sections[5] as {
    id: string
    title: string
    intro: string
    quickReference: { use: string; oils: string }[]
    professionalApproach: string
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
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <h2 className="mt-0 text-amber-900 font-bold">{introSection.restaurantReality.title}</h2>
            {introSection.restaurantReality.content.map((paragraph, index) => (
              <p key={index} className={index === introSection.restaurantReality.content.length - 1 ? 'mb-0' : ''} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/"/g, '&quot;').replace(/'/g, '&apos;') }} />
            ))}
          </div>

          {/* Introduction */}
          {introSection.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Smoke Point Section */}
          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-700" />
            {smokePointSection.title}
          </h2>

          <p dangerouslySetInnerHTML={{ __html: smokePointSection.definition.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          <p><strong>Why it matters:</strong></p>
          <ul>
            {smokePointSection.whyItMatters.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p dangerouslySetInnerHTML={{ __html: smokePointSection.rule.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {/* Smoke Point Table */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              {smokePointSection.smokePointTable.title}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    {smokePointSection.smokePointTable.headers.map((header, index) => (
                      <th key={index} className="px-4 py-3 text-left font-bold text-slate-900">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {smokePointSection.smokePointTable.rows.map((row, index) => (
                    <tr key={index} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-4 py-3"><strong>{row.oil}</strong></td>
                      <td className="px-4 py-3">{row.smokePoint}</td>
                      <td className="px-4 py-3">{row.bestUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Essential Oils Section */}
          <h2>{essentialOilsSection.title}</h2>
          {essentialOilsSection.oils.map((oil, index) => (
            <div key={index}>
              <h3>{index + 1}. {oil.name}</h3>
              <p><strong>Smoke point:</strong> {oil.smokePoint}</p>
              <p><strong>Flavor:</strong> {oil.flavor}</p>
              <p><strong>Best for:</strong></p>
              <ul>
                {oil.bestFor.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {oil.professionalStandard && (
                <p><strong>Professional standard:</strong> {oil.professionalStandard}</p>
              )}
              {oil.proTip && (
                <p><strong>Pro tip:</strong> {oil.proTip}</p>
              )}
              {oil.whyEssential && (
                <p>
                  <strong>Why it&apos;s essential:</strong> Butter adds{' '}
                  <CTAVisibilityTracker
                    ctaId="blog-cooking-oils-fat-flavor-link"
                    position="mid_article"
                    productSlug="guide-cooking-oils-smoke-points"
                    merchant="internal"
                  >
                    <Link href={oil.fatFlavorLink || '/blog/fat-is-flavor'} className="text-orange-700 hover:text-orange-800 underline">
                      flavor
                    </Link>
                  </CTAVisibilityTracker>
                  {' '}that no oil can match. It makes food taste rich and satisfying.
                </p>
              )}
              {oil.howToUse && (
                <>
                  <p><strong>How to use it:</strong></p>
                  <ul>
                    {oil.howToUse.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}

          <BlogNewsletterCTA slug="guide-cooking-oils-smoke-points" />

          {/* Cooking Methods Section */}
          <h2>{cookingMethodsSection.title}</h2>
          {cookingMethodsSection.methods.map((method, index) => (
            <div key={index}>
              <h3>{method.name}</h3>
              {method.goal && <p><strong>Goal:</strong> {method.goal}</p>}
              <p><strong>Best oils:</strong></p>
              <ul>
                {method.bestOils.map((oil, i) => (
                  <li key={i}>{oil}</li>
                ))}
              </ul>
              {method.dontUse && <p><strong>Don&apos;t use:</strong> {method.dontUse}</p>}
              {method.proTip && <p><strong>Pro tip:</strong> {method.proTip}</p>}
              {method.examples && <p><strong>Examples:</strong> {method.examples}</p>}
            </div>
          ))}

          {/* Chef's Technique Callout */}
          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-700" />
              {cookingMethodsSection.chefTechnique.title}
            </p>
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: cookingMethodsSection.chefTechnique.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            <ol className="mb-0">
              {cookingMethodsSection.chefTechnique.steps.map((step, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </ol>
          </div>

          {/* Mistakes Section */}
          <h2>{mistakesSection.title}</h2>
          {mistakesSection.mistakes.map((mistake) => (
            <div key={mistake.number}>
              <h3>Mistake #{mistake.number}: {mistake.title}</h3>
              <p><strong>The problem:</strong> {mistake.problem}</p>
              <p>
                <strong>The fix:</strong> {mistake.fix}
                {mistake.maillardLink && (
                  <>
                    {' '}This prevents sticking and gives better{' '}
                    <CTAVisibilityTracker
                      ctaId="blog-cooking-oils-maillard-link"
                      position="mid_article"
                      productSlug="guide-cooking-oils-smoke-points"
                      merchant="internal"
                    >
                      <Link href={mistake.maillardLink} className="text-orange-700 hover:text-orange-800 underline">
                        browning
                      </Link>
                    </CTAVisibilityTracker>
                    .
                  </>
                )}
              </p>
            </div>
          ))}

          {/* Takeaway Section */}
          <h2>{takeawaySection.title}</h2>
          <p>{takeawaySection.intro}</p>
          <p><strong>Quick reference:</strong></p>
          <ul>
            {takeawaySection.quickReference.map((item, index) => (
              <li key={index}><strong>{item.use}:</strong> {item.oils}</li>
            ))}
          </ul>
          <p><strong>The professional approach:</strong> {takeawaySection.professionalApproach}</p>
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
