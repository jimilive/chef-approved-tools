// ============================================================================
// WHY RESTING IS THE KEY TO COOKING MEAT - Blog Page (Data-Driven)
// Migrated from inline (421 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, Clock, ThermometerSun, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { restingMeatData } from './resting-meat-data'
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
export const metadata = generateBlogMetadata('why-resting-meat-key-cooking')

export default function RestingMeatPage() {
  const blogMeta = getBlogMetadata('why-resting-meat-key-cooking')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'why-resting-meat-key-cooking',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: restingMeatData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/why-resting-meat-key-cooking' }
  ])

  const faqSchema = generateFAQSchema(restingMeatData.faq.questions)

  // Type assertions for complex sections
  const introSection = restingMeatData.sections[0] as {
    id: string
    title: string
    content: string[]
    restaurantReality: { title: string; content: string }
  }

  const whatHappensSection = restingMeatData.sections[1] as {
    id: string
    title: string
    content: string[]
  }

  const carryOverSection = restingMeatData.sections[2] as {
    id: string
    title: string
    hasIcon: boolean
    intro: string
    content: string[]
    practiceIntro: string
    practicePoints: string[]
    closing: string
    thermometerLink: { text: string; href: string; intro: string }
    proTip: { title: string; content: string }
  }

  const restTimesSection = restingMeatData.sections[3] as {
    id: string
    title: string
    hasIcon: boolean
    intro: string
    tableIntro: string
    table: { cut: string; size: string; time: string; technique: string }[]
    closing: string[]
  }

  const toolsSection = restingMeatData.sections[4] as {
    id: string
    title: string
    intro: string
    tools: {
      name: string
      description: string
      linkText?: string
      linkHref?: string
      closing?: string
    }[]
    chefWarning: { title: string; content: string }
  }

  const everyProteinSection = restingMeatData.sections[5] as {
    id: string
    title: string
    intro: string
    proteins: { name: string; description: string }[]
    closing: string
  }

  const mistakesSection = restingMeatData.sections[6] as {
    id: string
    title: string
    hasIcon: boolean
    intro: string
    mistakes: { number: number; name: string; description: string }[]
    successTip: { title: string; content: string }
  }

  const conclusionSection = restingMeatData.sections[7] as {
    id: string
    title: string
    content: string[]
    maillardLink: { text: string; href: string; intro: string; closing: string }
    closing: string[]
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={restingMeatData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={restingMeatData.hero.title}
          introduction={restingMeatData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Restaurant Reality Callout */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              {introSection.restaurantReality.title}
            </h2>
            <p className="mb-0">{introSection.restaurantReality.content}</p>
          </div>

          {/* What Happens Inside the Meat */}
          <h2>{whatHappensSection.title}</h2>
          {whatHappensSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Carry-Over Cooking */}
          <h2 className="flex items-center gap-2">
            <ThermometerSun className="w-6 h-6 text-orange-700" />
            {carryOverSection.title}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: carryOverSection.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          {carryOverSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
          ))}
          <p>{carryOverSection.practiceIntro}</p>
          <ul>
            {carryOverSection.practicePoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p>{carryOverSection.closing}</p>
          <p>
            {carryOverSection.thermometerLink.intro}{' '}
            <Link href={carryOverSection.thermometerLink.href} className="text-orange-700 hover:text-orange-800 underline">
              {carryOverSection.thermometerLink.text}
            </Link>
            —it changed how I cooked at home after decades in restaurants.
          </p>

          {/* Pro Tip Callout */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-purple-600" />
              {carryOverSection.proTip.title}
            </h3>
            <p className="mb-0">{carryOverSection.proTip.content}</p>
          </div>

          {/* Rest Times */}
          <h2 className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-700" />
            {restTimesSection.title}
          </h2>
          <p>{restTimesSection.intro}</p>
          <p>{restTimesSection.tableIntro}</p>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left font-bold">Cut Type</th>
                  <th className="border border-slate-300 px-4 py-2 text-left font-bold">Rest Time</th>
                  <th className="border border-slate-300 px-4 py-2 text-left font-bold">Technique</th>
                </tr>
              </thead>
              <tbody>
                {restTimesSection.table.map((row, index) => (
                  <tr key={index} className={index % 2 === 1 ? 'bg-slate-50' : ''}>
                    <td className="border border-slate-300 px-4 py-2"><strong>{row.cut}</strong> ({row.size})</td>
                    <td className="border border-slate-300 px-4 py-2">{row.time}</td>
                    <td className="border border-slate-300 px-4 py-2">{row.technique}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {restTimesSection.closing.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Tools */}
          <h2>{toolsSection.title}</h2>
          <p>{toolsSection.intro}</p>

          {toolsSection.tools.map((tool, index) => (
            <p key={index}>
              <strong>{tool.name}:</strong> {tool.description}
              {tool.linkText && tool.linkHref && (
                <>
                  {' '}
                  <Link href={tool.linkHref} className="text-orange-700 hover:text-orange-800 underline">
                    {tool.linkText}
                  </Link>
                </>
              )}
              {tool.closing && ` ${tool.closing}`}
            </p>
          ))}

          {/* Chef Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {toolsSection.chefWarning.title}
            </p>
            <p className="mb-0">{toolsSection.chefWarning.content}</p>
          </div>

          {/* Every Protein */}
          <h2>{everyProteinSection.title}</h2>
          <p>{everyProteinSection.intro}</p>
          {everyProteinSection.proteins.map((protein, index) => (
            <p key={index}><strong>{protein.name}:</strong> {protein.description}</p>
          ))}
          <p>{everyProteinSection.closing}</p>

          <BlogNewsletterCTA
            slug={restingMeatData.newsletterCTA.slug}
            description={restingMeatData.newsletterCTA.description}
          />

          {/* Common Mistakes */}
          <h2 className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-700" />
            {mistakesSection.title}
          </h2>
          <p>{mistakesSection.intro}</p>
          {mistakesSection.mistakes.map((mistake) => (
            <p key={mistake.number}>
              <strong>{mistake.number}. {mistake.name}:</strong> {mistake.description}
            </p>
          ))}

          {/* Success Tip */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {mistakesSection.successTip.title}
            </h3>
            <p className="mb-0">{mistakesSection.successTip.content}</p>
          </div>

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p>
            {conclusionSection.maillardLink.intro}{' '}
            <Link href={conclusionSection.maillardLink.href} className="text-orange-700 hover:text-orange-800 underline">
              {conclusionSection.maillardLink.text}
            </Link>
            {' '}{conclusionSection.maillardLink.closing}
          </p>
          {conclusionSection.closing.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={restingMeatData.faq.questions} />

        {/* Related Reading */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restingMeatData.relatedArticles.map((article, index) => (
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
