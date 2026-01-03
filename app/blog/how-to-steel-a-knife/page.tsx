// ============================================================================
// HOW TO STEEL A KNIFE - Educational Blog Page (Data-Driven)
// Migrated from inline (450 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { educationalData } from './steel-knife-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
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
export const metadata = generateBlogMetadata('how-to-steel-a-knife')

export default async function HowToSteelAKnifePage() {
  // Fetch products from Supabase
  const products = await Promise.all([
    getProductBySlug(educationalData.products.victorinox8),
    getProductBySlug(educationalData.products.victorinox10),
    getProductBySlug(educationalData.products.henckelsSteel),
  ])

  // Get affiliate URLs from database
  const victorinox8Url = products[0] ? getPrimaryAffiliateLink(products[0]) : ''
  const victorinox10Url = products[1] ? getPrimaryAffiliateLink(products[1]) : ''
  const henckelsUrl = products[2] ? getPrimaryAffiliateLink(products[2]) : ''

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'how-to-steel-a-knife',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/how-to-steel-a-knife' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
    seeAlsoLinks: { href: string; text: string }[]
  }

  const whatSteelingSection = educationalData.sections[1] as {
    id: string
    title: string
    content: string[]
    sharpeningGuideLink: { href: string; text: string }
  }

  const whyHoningSection = educationalData.sections[2] as {
    id: string
    title: string
    benefits: { icon: string; label: string; description: string }[]
    closing: string
    purpleCafeCallout: { title: string; content: string }
  }

  const toolsSection = educationalData.sections[3] as {
    id: string
    title: string
    tools: { name: string; description: string; product?: string; products?: string[] }[]
  }

  const stepByStepSection = educationalData.sections[4] as {
    id: string
    title: string
    steps: { step: number; title: string; content: string }[]
    closing: string
  }

  const comparisonSection = educationalData.sections[5] as {
    id: string
    title: string
    comparisonTable: { headers: string[]; rows: { cells: string[] }[] }
  }

  const mistakesSection = educationalData.sections[6] as {
    id: string
    title: string
    mistakes: string[]
  }

  const proTipsSection = educationalData.sections[7] as {
    id: string
    title: string
    tips: string[]
  }

  const maintenanceSection = educationalData.sections[8] as {
    id: string
    title: string
    schedule: string[]
  }

  const recommendedSection = educationalData.sections[9] as {
    id: string
    title: string
    intro: string
    tools: { icon: string; name: string; product: string }[]
    disclaimer: string
    seeAlsoLinks: { href: string; text: string }[]
  }

  const finalSection = educationalData.sections[10] as {
    id: string
    title: string
    content: string[]
  }

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
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}

          <p className="text-blue-700">
            See also:{' '}
            <CTAVisibilityTracker
              ctaId="blog-how-to-steel-a-knife-review-link-1"
              position="above_fold"
              productSlug="how-to-steel-a-knife"
              merchant="internal"
            >
              <Link href={introSection.seeAlsoLinks[0].href} className="text-blue-700 underline">
                {introSection.seeAlsoLinks[0].text}
              </Link>
            </CTAVisibilityTracker>
            {' '}and our{' '}
            <CTAVisibilityTracker
              ctaId="blog-how-to-steel-a-knife-guide-link-1"
              position="above_fold"
              productSlug="how-to-steel-a-knife"
              merchant="internal"
            >
              <Link href={introSection.seeAlsoLinks[1].href} className="text-blue-700 underline">
                {introSection.seeAlsoLinks[1].text}
              </Link>
            </CTAVisibilityTracker>.
          </p>

          {/* What Steeling Means */}
          <h2>{whatSteelingSection.title}</h2>
          {whatSteelingSection.content.map((paragraph, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}
          <p>
            When you need actual sharpening, check out our guide on{' '}
            <CTAVisibilityTracker
              ctaId="blog-how-to-steel-a-knife-review-link-2"
              position="mid_article"
              productSlug="how-to-steel-a-knife"
              merchant="internal"
            >
              <Link href={whatSteelingSection.sharpeningGuideLink.href} className="text-blue-700 underline">
                {whatSteelingSection.sharpeningGuideLink.text}
              </Link>
            </CTAVisibilityTracker>
            {' '}for professional results.
          </p>

          {/* Why Honing Matters */}
          <h2>{whyHoningSection.title}</h2>
          <ul>
            {whyHoningSection.benefits.map((benefit, index) => (
              <li key={index}>
                {benefit.icon} <strong>{benefit.label}</strong>—{benefit.description}
                {index === 3 && victorinox8Url && victorinox10Url && (
                  <>
                    {' '}like the{' '}
                    <a href={victorinox8Url} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
                      Victorinox Fibrox 8&quot; Chef&apos;s Knife
                    </a>
                    {' '}or the{' '}
                    <a href={victorinox10Url} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
                      Victorinox Fibrox 10&quot; Chef&apos;s Knife
                    </a>.
                  </>
                )}
              </li>
            ))}
          </ul>
          <p>{whyHoningSection.closing}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>{whyHoningSection.purpleCafeCallout.title}:</strong> {whyHoningSection.purpleCafeCallout.content}
            </p>
          </div>

          {/* Tools Section */}
          <h2>{toolsSection.title}</h2>
          <h3>1. A Quality Honing Steel</h3>
          <p>
            The essential tool here is a dependable <strong>honing steel</strong>. The{' '}
            <a href={henckelsUrl} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
              Henckels 10-Inch Sharpening Steel
            </a>
            {' '}is a classic: balanced, grippy, and durable, with just enough abrasion to realign an edge without stripping metal. It&apos;s the same kind I&apos;ve used for decades in professional kitchens.
          </p>

          <h3>2. A Chef&apos;s Knife Worth Caring For</h3>
          <p>
            Your knife should already be sharp. The{' '}
            <a href={victorinox8Url} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
              Victorinox Fibrox 8-Inch Chef&apos;s Knife
            </a>
            {' '}is perfect for home cooks, while the{' '}
            <a href={victorinox10Url} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
              Victorinox Fibrox 10-Inch Chef&apos;s Knife
            </a>
            {' '}offers extra reach and heft for larger jobs. Both respond beautifully to a steel.
          </p>

          {/* Step-by-Step */}
          <h2>{stepByStepSection.title}</h2>
          <ol>
            {stepByStepSection.steps.map((step) => (
              <li key={step.step}>
                <strong>{step.title}.</strong> {step.content}
              </li>
            ))}
          </ol>
          <p>{stepByStepSection.closing}</p>

          {/* Honing vs Sharpening */}
          <h2>{comparisonSection.title}</h2>
          <div className="overflow-x-auto my-6">
            <table>
              <thead>
                <tr>
                  {comparisonSection.comparisonTable.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonSection.comparisonTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Common Mistakes */}
          <h2>{mistakesSection.title}</h2>
          <ul>
            {mistakesSection.mistakes.map((mistake, index) => (
              <li key={index}>{mistake}</li>
            ))}
          </ul>

          {/* Pro Tips */}
          <h2>{proTipsSection.title}</h2>
          <ul>
            {proTipsSection.tips.map((tip, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: tip.replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
            ))}
          </ul>

          {/* Maintenance Schedule */}
          <h2>{maintenanceSection.title}</h2>
          <ul>
            {maintenanceSection.schedule.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Recommended Tools */}
          <h2>{recommendedSection.title}</h2>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 my-6">
            <h3 className="mt-0">{recommendedSection.intro}</h3>
            <ul className="list-none p-0">
              <li className="mb-4">
                🪄 <a href={henckelsUrl} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
                  Henckels 10-Inch Sharpening Steel
                </a>
              </li>
              <li className="mb-4">
                🔪 <a href={victorinox8Url} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
                  Victorinox Fibrox 8&quot; Chef&apos;s Knife
                </a>
              </li>
              <li className="mb-4">
                🍖 <a href={victorinox10Url} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
                  Victorinox Fibrox 10&quot; Chef&apos;s Knife
                </a>
              </li>
            </ul>
            <p className="text-sm text-slate-700 mt-4 text-center mb-0">
              {recommendedSection.disclaimer}
            </p>
          </div>

          <p className="mt-6">
            See also:{' '}
            <CTAVisibilityTracker
              ctaId="blog-how-to-steel-a-knife-guide-link-2"
              position="mid_article"
              productSlug="how-to-steel-a-knife"
              merchant="internal"
            >
              <Link href={recommendedSection.seeAlsoLinks[0].href} className="text-blue-700 underline">
                {recommendedSection.seeAlsoLinks[0].text}
              </Link>
            </CTAVisibilityTracker>
            {' '}and our complete{' '}
            <CTAVisibilityTracker
              ctaId="blog-how-to-steel-a-knife-bundle-link-1"
              position="mid_article"
              productSlug="how-to-steel-a-knife"
              merchant="internal"
            >
              <Link href={recommendedSection.seeAlsoLinks[1].href} className="text-blue-700 underline">
                {recommendedSection.seeAlsoLinks[1].text}
              </Link>
            </CTAVisibilityTracker>
            {' '}for chef-approved essentials.
          </p>

          {/* Final Thoughts */}
          <h2>{finalSection.title}</h2>
          <p>{finalSection.content[0]}</p>
          <p>
            Grab your{' '}
            <a href={henckelsUrl} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
              Henckels Honing Steel
            </a>
            , pick up your favorite{' '}
            <a href={victorinox8Url} rel="nofollow noopener noreferrer sponsored" target="_blank" className="text-blue-700 underline">
              Victorinox Fibrox Knife
            </a>
            , and keep that edge chef-sharp—because the best cooks always respect their tools.
          </p>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Articles */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
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
