// ============================================================================
// DEGLAZING & PAN SAUCES - Educational Blog Page (Data-Driven)
// Migrated from inline (758 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { educationalData } from './deglazing-data'
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
import { AlertTriangle, Lightbulb, Droplets, Beaker, Wine, Sparkles } from 'lucide-react'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('deglazing-pan-sauces')

export default function DeglazingPanSaucesPage() {
  const blogMeta = getBlogMetadata('deglazing-pan-sauces')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'deglazing-pan-sauces',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/deglazing-pan-sauces' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
    restaurantReality: { title: string; content: string }
    closingContent: string[]
  }

  const fondSection = educationalData.sections[1] as {
    id: string
    title: string
    icon: string
    definition: string
    content: string[]
    whySpecial: string[]
    deglazingAccomplishes: { label: string; description: string }[]
    appearance: string
    commonMistake: string
    subsections: {
      id: string
      title: string
      icon: string
      content: string[]
      process: string[]
      holyTrinity: { element: string; description: string }[]
      whyItWorks: string
    }[]
    warning: { title: string; content: string }
  }

  const techniqueSection = educationalData.sections[2] as {
    id: string
    title: string
    icon: string
    steps: {
      id: string
      title: string
      points?: string[]
      commonError?: string
      why?: string
      content?: string
      options?: string[]
      amount?: string
      technique?: string[]
      safety?: string
      howToTell?: string
      finishWithFat?: string[]
      season?: string
      textureCheck?: string
    }[]
    proTip: { title: string; content: string }
  }

  const liquidsSection = educationalData.sections[3] as {
    id: string
    title: string
    icon: string
    intro: string
    liquidTable: {
      headers: string[]
      rows: { cells: string[]; isAlt?: boolean }[]
    }
  }

  const formulaSection = educationalData.sections[4] as {
    id: string
    title: string
    formula: string[]
    note: string
  }

  const recipesSection = educationalData.sections[5] as {
    id: string
    title: string
    recipes: {
      id: string
      title: string
      context: string
      steps: string[]
      time: string
      flavor: string
    }[]
  }

  const mistakesSection = educationalData.sections[6] as {
    id: string
    title: string
    mistakesTable: {
      headers: string[]
      rows: { cells: string[]; isAlt?: boolean }[]
    }
  }

  const equipmentSection = educationalData.sections[7] as {
    id: string
    title: string
    equipmentList: { name: string; description: string; link?: string }[]
    note: string
  }

  const bottomLineSection = educationalData.sections[8] as {
    id: string
    title: string
    content: string[]
    basicFormula: string[]
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

        {/* Introduction Section */}
        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {introSection.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}

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

          {introSection.closingContent.map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Fond Section */}
          <h2 id={fondSection.id} className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-orange-700" />
            {fondSection.title}
          </h2>

          <p dangerouslySetInnerHTML={{ __html: fondSection.definition.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {fondSection.content.map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}

          <p><strong>Why it&apos;s special</strong>:</p>
          <ul>
            {fondSection.whySpecial.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <p className="font-semibold text-slate-900 mb-3">What Deglazing Accomplishes:</p>
            <ul className="space-y-2 mb-0">
              {fondSection.deglazingAccomplishes.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.description}</li>
              ))}
            </ul>
          </div>

          <p><strong>What it looks like</strong>: {fondSection.appearance}</p>
          <p><strong>Common mistake</strong>: {fondSection.commonMistake}</p>

          {/* Science Subsection */}
          {fondSection.subsections.map((subsection) => (
            <div key={subsection.id} id={subsection.id}>
              <h3 className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-orange-700" />
                {subsection.title}
              </h3>

              {subsection.content.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <p>When protein hits hot metal:</p>
              <ol>
                {subsection.process.map((step, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </ol>

              <p>Heat, acid, and motion are the holy trinity here:</p>
              <ul>
                {subsection.holyTrinity.map((item, index) => (
                  <li key={index}><strong>{item.element}</strong> {item.description}</li>
                ))}
              </ul>

              <p><strong>Why deglazing works</strong>: {subsection.whyItWorks}</p>
            </div>
          ))}

          {/* Warning Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {fondSection.warning.title}
            </p>
            <p className="mb-0 text-amber-900">
              {fondSection.warning.content}
            </p>
          </div>

          {/* Technique Section */}
          <h2 id={techniqueSection.id} className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-700" />
            {techniqueSection.title}
          </h2>

          {techniqueSection.steps.map((step) => (
            <div key={step.id} id={step.id}>
              <h3>{step.title}</h3>

              {step.points && (
                <ul>
                  {step.points.map((point, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  ))}
                </ul>
              )}

              {step.commonError && (
                <p><strong>Common error</strong>: {step.commonError}</p>
              )}

              {step.why && (
                <p><strong>Why</strong>: {step.why}</p>
              )}

              {step.content && (
                <p className="text-slate-700 leading-relaxed">{step.content}</p>
              )}

              {step.options && (
                <>
                  <p><strong>Options</strong> (in order of common use):</p>
                  <ul>
                    {step.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </>
              )}

              {step.amount && (
                <p><strong>Amount</strong>: {step.amount}</p>
              )}

              {step.technique && (
                <>
                  <p><strong>Technique</strong>:</p>
                  <ol>
                    {step.technique.map((item, index) => (
                      <li
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: item
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/Rubbermaid Commercial Cook's Scraper/, '<a href="/reviews/rubbermaid-commercial-cooks-scraper" class="text-orange-700 hover:text-orange-800">Rubbermaid Commercial Cook\'s Scraper</a>')
                        }}
                      />
                    ))}
                  </ol>
                </>
              )}

              {step.safety && (
                <p><strong>Safety</strong>: {step.safety}</p>
              )}

              {step.howToTell && (
                <p><strong>How to tell</strong>: {step.howToTell}</p>
              )}

              {step.finishWithFat && (
                <>
                  <p><strong>Finish with fat</strong>:</p>
                  <ul>
                    {step.finishWithFat.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {step.season && (
                <p><strong>Season</strong>: {step.season}</p>
              )}

              {step.textureCheck && (
                <p><strong>Texture check</strong>: {step.textureCheck}</p>
              )}
            </div>
          ))}

          {/* Pro Tip */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-600" />
              {techniqueSection.proTip.title}
            </p>
            <p className="mb-0 text-emerald-900">
              {techniqueSection.proTip.content}
            </p>
          </div>

          {/* Liquids Section */}
          <h2 id={liquidsSection.id} className="flex items-center gap-2">
            <Wine className="w-6 h-6 text-orange-700" />
            {liquidsSection.title}
          </h2>

          <p>{liquidsSection.intro}</p>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  {liquidsSection.liquidTable.headers.map((header, index) => (
                    <th key={index} className="border border-slate-300 px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {liquidsSection.liquidTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={row.isAlt ? 'bg-slate-50' : ''}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-slate-300 px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formula Section */}
          <h2 id={formulaSection.id}>{formulaSection.title}</h2>

          <div className="bg-slate-100 p-6 rounded-lg my-6 font-mono text-sm">
            <p className="mb-2"><strong>BASE FORMULA</strong> (scales up or down):</p>
            {formulaSection.formula.map((line, index) => (
              <p key={index} className={index === formulaSection.formula.length - 1 ? 'mb-0' : 'mb-1'}>
                {line}
              </p>
            ))}
          </div>

          <p>{formulaSection.note}</p>

          {/* Recipes Section */}
          <h2 id={recipesSection.id}>{recipesSection.title}</h2>

          {recipesSection.recipes.map((recipe) => (
            <div key={recipe.id} id={recipe.id}>
              <h3>{recipe.title}</h3>
              <p><strong>{recipe.context}</strong></p>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </ol>
              <p><strong>Time</strong>: {recipe.time}<br />
              <strong>Flavor</strong>: {recipe.flavor}</p>
            </div>
          ))}

          <BlogNewsletterCTA slug="deglazing-pan-sauces" />

          {/* Mistakes Section */}
          <h2 id={mistakesSection.id}>{mistakesSection.title}</h2>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  {mistakesSection.mistakesTable.headers.map((header, index) => (
                    <th key={index} className="border border-slate-300 px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mistakesSection.mistakesTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={row.isAlt ? 'bg-slate-50' : ''}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-slate-300 px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Equipment Section */}
          <h2 id={equipmentSection.id}>{equipmentSection.title}</h2>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <ul className="space-y-3 mb-0">
              {equipmentSection.equipmentList.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}:</strong>{' '}
                  {item.link ? (
                    <>
                      {item.description.split(item.name === 'Pan' ? 'Cuisinart Stainless Steel Sauté Pan' : "Rubbermaid Commercial Cook's Scraper")[0]}
                      <Link href={item.link} className="text-orange-700 hover:text-orange-800">
                        {item.name === 'Pan' ? 'Cuisinart Stainless Steel Sauté Pan' : "Rubbermaid Commercial Cook's Scraper"}
                      </Link>
                      {item.description.split(item.name === 'Pan' ? 'Cuisinart Stainless Steel Sauté Pan' : "Rubbermaid Commercial Cook's Scraper")[1]}
                    </>
                  ) : (
                    item.description
                  )}
                </li>
              ))}
            </ul>
          </div>

          <p>{equipmentSection.note}</p>

          {/* Bottom Line Section */}
          <h2 id={bottomLineSection.id}>{bottomLineSection.title}</h2>

          {bottomLineSection.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}

          <p>The basic formula is dead simple:</p>
          <ol>
            {bottomLineSection.basicFormula.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {bottomLineSection.closing.map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
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
