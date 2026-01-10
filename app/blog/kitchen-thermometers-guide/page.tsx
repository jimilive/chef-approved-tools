// ============================================================================
// KITCHEN THERMOMETERS GUIDE - Educational Blog Page (Data-Driven)
// Migrated from inline (726 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { educationalData } from './thermometers-data'
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
import { AlertTriangle, Lightbulb } from 'lucide-react'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('kitchen-thermometers-guide')

export default function KitchenThermometersGuidePage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'kitchen-thermometers-guide',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/kitchen-thermometers-guide' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    restaurantReality: { title: string; content: string }
    content: string[]
  }

  const whySection = educationalData.sections[1] as {
    id: string
    title: string
    intro: string[]
    subsections: {
      id: string
      title: string
      points?: { label: string; value: string }[]
      criticalTemps?: string[]
      reality?: string
      proteinTemps?: string[]
      problem?: string
      without?: string
      with?: string
    }[]
    benefits: string[]
    closing: string
    warning: { title: string; content: string }
  }

  const typesSection = educationalData.sections[2] as {
    id: string
    title: string
    instantRead: {
      title: string
      whatItIs: string
      bestFor: string[]
      recommendation: string
      topPicks: { name: string; level: string; description: string }[]
    }
    proTip: { title: string; content: string }
  }

  const tempsSection = educationalData.sections[3] as {
    id: string
    title: string
    poultryTable: { headers: string[]; rows: { cells: string[]; isAlt?: boolean }[] }
    meatTable: { headers: string[]; rows: { cells: string[]; isAlt?: boolean; rowSpan?: number }[] }
    footnote: string
  }

  const methodSection = educationalData.sections[4] as {
    id: string
    title: string
    goldenRules: { rule: string; points: string[] }[]
    steps: { title: string; intro?: string; targets?: string[]; content?: string; proTip?: string }[]
    carryover: { title: string; whatItIs: string; howMuch: string; examples: string[]; whyItMatters: string; fix: string }
    calibration: { title: string; intro: string; steps: string[] }
  }

  const mistakesSection = educationalData.sections[5] as {
    id: string
    title: string
    mistakes: { number: number; title: string; problem: string; fix: string }[]
  }

  const equipmentSection = educationalData.sections[6] as {
    id: string
    title: string
    thermometers: { name: string; description: string }[]
    supportingTools: { name: string; description: string; link?: string }[]
  }

  const troubleshootingSection = educationalData.sections[7] as {
    id: string
    title: string
    issues: { problem: string; solution: string }[]
  }

  const protocolsSection = educationalData.sections[8] as {
    id: string
    title: string
    intro: string
    protocols: { title: string; content: string }[]
    callout: { title: string; content: string }
  }

  const bottomLineSection = educationalData.sections[9] as {
    id: string
    title: string
    intro: string
    mainPoint: string
    content: string[]
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
          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {introSection.restaurantReality.title}
            </p>
            <p className="mb-0">
              {introSection.restaurantReality.content}
            </p>
          </div>

          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {educationalData.tableOfContents.map((item, index) => (
                <li key={index}>
                  • <a href={`#${item.id}`} className="text-blue-700 underline">{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Section */}
          <h2 id={whySection.id}>{whySection.title}</h2>
          {whySection.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {whySection.subsections.map((sub) => (
            <div key={sub.id}>
              <h3>{sub.title}</h3>
              {sub.points && sub.points.map((point, index) => (
                <p key={index}><strong>{point.label}</strong>: {point.value}</p>
              ))}
              {sub.criticalTemps && (
                <>
                  <p><strong>Critical temperatures</strong>:</p>
                  <ul>
                    {sub.criticalTemps.map((temp, index) => (
                      <li key={index}>{temp}</li>
                    ))}
                  </ul>
                </>
              )}
              {sub.reality && (
                <p><strong>The reality</strong>: {sub.reality}</p>
              )}
              {sub.proteinTemps && (
                <>
                  <p><strong>Protein denatures (cooks) at specific temperatures</strong>:</p>
                  <ul>
                    {sub.proteinTemps.map((temp, index) => (
                      <li key={index}>{temp}</li>
                    ))}
                  </ul>
                </>
              )}
              {sub.problem && (
                <p><strong>The problem with overcooking</strong>: {sub.problem}</p>
              )}
              {sub.without && (
                <p><strong>Without thermometer</strong>: {sub.without}</p>
              )}
              {sub.with && (
                <p><strong>With thermometer</strong>: {sub.with}</p>
              )}
            </div>
          ))}

          <p><strong>An instant-read thermometer:</strong></p>
          <ul>
            {whySection.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <p>{whySection.closing}</p>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {whySection.warning.title}
            </p>
            <p className="mb-0 text-amber-900">{whySection.warning.content}</p>
          </div>

          {/* Types Section */}
          <h2 id={typesSection.id}>{typesSection.title}</h2>
          <h3>{typesSection.instantRead.title}</h3>
          <p><strong>What it is</strong>: {typesSection.instantRead.whatItIs}</p>
          <p><strong>Best for</strong>:</p>
          <ul>
            {typesSection.instantRead.bestFor.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>My recommendation</strong>: <span dangerouslySetInnerHTML={{ __html: typesSection.instantRead.recommendation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /></p>
          <p><strong>Top picks</strong>:</p>
          <ul>
            {typesSection.instantRead.topPicks.map((pick, index) => (
              <li key={index}><strong>{pick.name}</strong> ({pick.level}) - {pick.description}</li>
            ))}
          </ul>

          {/* Pro Tip */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-600" />
              {typesSection.proTip.title}
            </p>
            <p className="mb-0 text-emerald-900">{typesSection.proTip.content}</p>
          </div>

          {/* Temps Section */}
          <h2 id={tempsSection.id}>{tempsSection.title}</h2>

          <h3>Poultry</h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  {tempsSection.poultryTable.headers.map((header, index) => (
                    <th key={index} className="border border-slate-300 px-4 py-2 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tempsSection.poultryTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={row.isAlt ? 'bg-slate-50' : ''}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-slate-300 px-4 py-2">
                        {cellIndex === 0 ? <strong>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Beef, Pork, Lamb, and Fish</h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  {tempsSection.meatTable.headers.map((header, index) => (
                    <th key={index} className="border border-slate-300 px-4 py-2 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tempsSection.meatTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={row.isAlt ? 'bg-slate-50' : ''}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-slate-300 px-4 py-2">
                        {cellIndex === 0 && cell ? <strong>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm italic">{tempsSection.footnote}</p>

          <BlogNewsletterCTA slug="kitchen-thermometers-guide" />

          {/* Method Section */}
          <h2 id={methodSection.id}>{methodSection.title}</h2>

          <h3>The Three Golden Rules</h3>
          {methodSection.goldenRules.map((rule, index) => (
            <div key={index}>
              <p><strong>{rule.rule}</strong></p>
              <ul>
                {rule.points.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </div>
          ))}

          <h3>Step-by-Step Professional Method</h3>
          {methodSection.steps.map((step, index) => (
            <div key={index}>
              <h4>{step.title}</h4>
              {step.intro && <p>{step.intro}</p>}
              {step.targets && (
                <ul>
                  {step.targets.map((target, targetIndex) => (
                    <li key={targetIndex}>{target}</li>
                  ))}
                </ul>
              )}
              {step.content && <p>{step.content}</p>}
              {step.proTip && <p><strong>Pro tip:</strong> {step.proTip}</p>}
            </div>
          ))}

          <h3>{methodSection.carryover.title}</h3>
          <p><strong>What it is</strong>: {methodSection.carryover.whatItIs}</p>
          <p><strong>How much</strong>: {methodSection.carryover.howMuch}</p>
          <ul>
            {methodSection.carryover.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
          <p><strong>Why it matters</strong>: {methodSection.carryover.whyItMatters}</p>
          <p><strong>The fix</strong>: <span dangerouslySetInnerHTML={{ __html: methodSection.carryover.fix.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /></p>

          <h4>{methodSection.calibration.title}</h4>
          <p>{methodSection.calibration.intro}</p>
          <ul>
            {methodSection.calibration.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          {/* Mistakes Section */}
          <h2 id={mistakesSection.id}>{mistakesSection.title}</h2>
          {mistakesSection.mistakes.map((mistake) => (
            <div key={mistake.number}>
              <h3>Mistake #{mistake.number}: {mistake.title}</h3>
              <p>{mistake.problem}</p>
              <p><strong>Fix:</strong> {mistake.fix}</p>
            </div>
          ))}

          {/* Equipment Section */}
          <h2 id={equipmentSection.id}>{equipmentSection.title}</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <p className="font-bold text-slate-800 mb-4 text-lg">Instant-Read Thermometers (Chef Approved)</p>
            <div className="space-y-4 mb-6">
              {equipmentSection.thermometers.map((therm, index) => (
                <div key={index}>
                  <strong>{index + 1}. {therm.name}</strong>
                  <br />{therm.description}
                </div>
              ))}
            </div>

            <p className="font-bold text-slate-800 mb-4 text-lg">Supporting Tools</p>
            <ul className="space-y-2">
              {equipmentSection.supportingTools.map((tool, index) => (
                <li key={index}>
                  {tool.link ? (
                    <Link href={tool.link} className="text-orange-700 hover:text-orange-800 underline">
                      {tool.name}
                    </Link>
                  ) : (
                    tool.name
                  )}
                  {' — '}{tool.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Troubleshooting Section */}
          <h2 id={troubleshootingSection.id}>{troubleshootingSection.title}</h2>
          <div className="space-y-4 my-8">
            {troubleshootingSection.issues.map((issue, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <p className="font-bold text-slate-900 mb-2">{issue.problem}</p>
                <p className="text-slate-700 text-sm mb-0">{issue.solution}</p>
              </div>
            ))}
          </div>

          {/* Professional Protocols Section */}
          <h2 id={protocolsSection.id}>{protocolsSection.title}</h2>
          <p>{protocolsSection.intro}</p>
          <div className="space-y-4 my-8">
            {protocolsSection.protocols.map((protocol, index) => (
              <div key={index}>
                <p><strong>{protocol.title}:</strong> {protocol.content}</p>
              </div>
            ))}
          </div>

          {/* Protocol Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {protocolsSection.callout.title}
            </p>
            <p className="mb-0 text-amber-900">{protocolsSection.callout.content}</p>
          </div>

          {/* Bottom Line Section */}
          <h2>{bottomLineSection.title}</h2>
          <p>{bottomLineSection.intro}</p>
          <p dangerouslySetInnerHTML={{ __html: bottomLineSection.mainPoint.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          {bottomLineSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Reading */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
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
