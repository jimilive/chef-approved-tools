// ============================================================================
// MEAT COOKING TEMPERATURES & THERMOMETERS - Blog Page (Data-Driven)
// Migrated from inline (630 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { thermometerData } from './thermometer-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
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
export const metadata = generateBlogMetadata('meat-cooking-temperatures-thermometers')

export default function MeatCookingTemperaturesThermometers() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: thermometerData.metadata.title,
    description: thermometerData.metadata.description,
    datePublished: thermometerData.metadata.publishedDate,
    dateModified: thermometerData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'meat-cooking-temperatures-thermometers',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: thermometerData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/meat-cooking-temperatures-thermometers' }
  ])

  const faqSchema = generateFAQSchema(thermometerData.faq.questions)

  // Type assertions for complex sections
  const introSection = thermometerData.sections[0] as {
    id: string
    content: string[]
    seasoningLink: string
  }

  const whySection = thermometerData.sections[1] as {
    id: string
    title: string
    intro: string
    reasons: { number: number; title: string; content: string; points?: string[] }[]
    callout: { title: string; content: string }
  }

  const typesSection = thermometerData.sections[2] as {
    id: string
    title: string
    thermometerTypes: { name: string; description: string; advantages: string[]; bestFor: string | null }[]
    recommendation: string
  }

  const temperaturesSection = thermometerData.sections[3] as {
    id: string
    title: string
    intro: string
    temperatureTable: { protein: string; doneness: string; temp: string; notes: string; critical: boolean; wingsLink?: string }[]
    tableNotes: string[]
  }

  const howToSection = thermometerData.sections[4] as {
    id: string
    title: string
    intro: string
    steps: { title: string; content: string }[]
    knifeLink: string
    boardLink: string
  }

  const carryoverSection = thermometerData.sections[5] as {
    id: string
    title: string
    intro: string
    guidelines: { cut: string; rise: string }[]
    example: string
    dutchOvenLink: string
    castIronLink: string
  }

  const protocolsSection = thermometerData.sections[6] as {
    id: string
    title: string
    intro: string
    protocols: { title: string; content: string }[]
    callout: { title: string; content: string }
    glovesLink: string
  }

  const conclusionSection = thermometerData.sections[7] as {
    id: string
    title: string
    content: string[]
    bundleLink: string
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={thermometerData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={thermometerData.hero.title}
          introduction={thermometerData.hero.introduction}
          publishedDate={thermometerData.metadata.publishedDate}
          lastUpdated={thermometerData.metadata.lastUpdated}
          readTime={thermometerData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          <p>{introSection.content[0]}</p>
          <p>
            Whether grilling steaks or roasting chicken, combine thermometer precision with proper
            <CTAVisibilityTracker
              ctaId="blog-meat-temps-salt-link-1"
              position="above_fold"
              productSlug="meat-cooking-temperatures-thermometers"
              merchant="internal"
            >
              <Link href={introSection.seasoningLink} className="text-blue-700 underline"> seasoning techniques</Link>
            </CTAVisibilityTracker> for
            restaurant-quality results at home.
          </p>

          {/* Why Professional Chefs Use Thermometers */}
          <h2>{whySection.title}</h2>
          <p>{whySection.intro}</p>

          {whySection.reasons.map((reason) => (
            <div key={reason.number}>
              <h3>{reason.number}. {reason.title}</h3>
              <p>{reason.content}</p>
              {reason.points && (
                <ul>
                  {reason.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>{whySection.callout.title}:</strong> {whySection.callout.content}
            </p>
          </div>

          {/* Types of Thermometers */}
          <h2>{typesSection.title}</h2>
          {typesSection.thermometerTypes.map((type) => (
            <div key={type.name}>
              <h3>{type.name}</h3>
              <p>{type.description}</p>
              {type.advantages.length > 0 && (
                <>
                  <p><strong>Advantages:</strong></p>
                  <ul>
                    {type.advantages.map((adv, index) => (
                      <li key={index}>{adv}</li>
                    ))}
                  </ul>
                </>
              )}
              {type.bestFor && <p><strong>Best for:</strong> {type.bestFor}</p>}
            </div>
          ))}

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>Professional Recommendation:</strong> {typesSection.recommendation}
            </p>
          </div>

          {/* Temperature Table */}
          <h2>{temperaturesSection.title}</h2>
          <p>{temperaturesSection.intro}</p>

          <div className="overflow-x-auto my-6">
            <table>
              <thead>
                <tr>
                  <th>Protein</th>
                  <th>Doneness</th>
                  <th>Target Temp</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {temperaturesSection.temperatureTable.map((row, index) => (
                  <tr key={index} className={row.critical ? 'bg-yellow-50' : ''}>
                    <td><strong>{row.protein}</strong></td>
                    <td>{row.doneness}</td>
                    <td>{row.temp}</td>
                    <td>
                      {row.critical && <strong>CRITICAL: </strong>}
                      {row.wingsLink ? (
                        <>
                          Breast and thigh (
                          <Link href={row.wingsLink} className="text-orange-700 hover:text-orange-800 underline">
                            wings need extra time
                          </Link>
                          )
                        </>
                      ) : (
                        row.notes.replace('CRITICAL: ', '')
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <p className="font-bold mb-2">Professional Kitchen Notes:</p>
            <ul className="mb-0">
              {temperaturesSection.tableNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>

          {/* How to Use */}
          <h2>{howToSection.title}</h2>
          <p>{howToSection.intro}</p>
          <ol>
            {howToSection.steps.map((step, index) => (
              <li key={index}>
                <strong>{step.title}:</strong> {step.content}
              </li>
            ))}
          </ol>

          <p>
            Use thermometers alongside{' '}
            <CTAVisibilityTracker
              ctaId="blog-meat-temps-knife-link-1"
              position="mid_article"
              productSlug="meat-cooking-temperatures-thermometers"
              merchant="internal"
            >
              <Link href={howToSection.knifeLink} className="text-blue-700 underline">quality knives</Link>
            </CTAVisibilityTracker>{' '}
            for complete cooking control. Prep your proteins on a{' '}
            <CTAVisibilityTracker
              ctaId="blog-meat-temps-board-link-1"
              position="mid_article"
              productSlug="meat-cooking-temperatures-thermometers"
              merchant="internal"
            >
              <Link href={howToSection.boardLink} className="text-blue-700 underline">professional cutting board</Link>
            </CTAVisibilityTracker>{' '}
            before cooking.
          </p>

          {/* Carryover Cooking */}
          <h2>{carryoverSection.title}</h2>
          <p>{carryoverSection.intro}</p>
          <p><strong>Carryover Guidelines:</strong></p>
          <ul>
            {carryoverSection.guidelines.map((guideline, index) => (
              <li key={index}><strong>{guideline.cut}:</strong> {guideline.rise}</li>
            ))}
          </ul>
          <p><strong>Example:</strong> {carryoverSection.example}</p>

          <p>
            Whether using{' '}
            <CTAVisibilityTracker
              ctaId="blog-meat-temps-dutch-oven-link-1"
              position="mid_article"
              productSlug="meat-cooking-temperatures-thermometers"
              merchant="internal"
            >
              <Link href={carryoverSection.dutchOvenLink} className="text-blue-700 underline">Dutch ovens</Link>
            </CTAVisibilityTracker>{' '}
            or
            <CTAVisibilityTracker
              ctaId="blog-meat-temps-cast-iron-link-1"
              position="mid_article"
              productSlug="meat-cooking-temperatures-thermometers"
              merchant="internal"
            >
              <Link href={carryoverSection.castIronLink} className="text-blue-700 underline"> cast iron skillets</Link>
            </CTAVisibilityTracker>,
            thermometers ensure perfect results every time by accounting for carryover.
          </p>

          {/* Professional Protocols */}
          <h2>{protocolsSection.title}</h2>
          <p>{protocolsSection.intro}</p>
          <ul>
            {protocolsSection.protocols.map((protocol, index) => (
              <li key={index}><strong>{protocol.title}:</strong> {protocol.content}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>{protocolsSection.callout.title}:</strong> {protocolsSection.callout.content}
            </p>
          </div>

          <p>
            Combine thermometer precision with proper{' '}
            <CTAVisibilityTracker
              ctaId="blog-meat-temps-gloves-link-1"
              position="mid_article"
              productSlug="meat-cooking-temperatures-thermometers"
              merchant="internal"
            >
              <Link href={protocolsSection.glovesLink} className="text-blue-700 underline">kitchen safety protocols</Link>
            </CTAVisibilityTracker>{' '}
            for complete professional standards at home.
          </p>

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p>
            Part of our{' '}
            <CTAVisibilityTracker
              ctaId="blog-meat-temps-bundle-link-1"
              position="final_cta"
              productSlug="meat-cooking-temperatures-thermometers"
              merchant="internal"
            >
              <Link href={conclusionSection.bundleLink} className="text-blue-700 underline">complete professional kitchen kit</Link>
            </CTAVisibilityTracker>—because
            precision tools create consistent results.
          </p>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={thermometerData.faq.questions} />

        {/* Related Articles */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thermometerData.relatedArticles.map((article, index) => (
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
