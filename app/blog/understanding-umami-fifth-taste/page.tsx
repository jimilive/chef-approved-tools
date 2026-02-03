// ============================================================================
// UNDERSTANDING UMAMI - Blog Page (Data-Driven)
// Migrated from inline (362 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { umamiData } from './umami-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import { FlaskConical, Droplets, Leaf, AlertTriangle } from 'lucide-react'
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
export const metadata = generateBlogMetadata('understanding-umami-fifth-taste')

export default function UnderstandingUmamiPage() {
  const blogMeta = getBlogMetadata('understanding-umami-fifth-taste')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'understanding-umami-fifth-taste',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: umamiData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/understanding-umami-fifth-taste' }
  ])

  const faqSchema = generateFAQSchema(umamiData.faq.questions)

  // Type assertions for complex sections
  const introSection = umamiData.sections[0] as {
    id: string
    content: string[]
  }

  const scienceSection = umamiData.sections[1] as {
    id: string
    title: string
    hasIcon: boolean
    iconType: string
    content: string[]
    compounds: {
      title: string
      intro: string
      types: { name: string; description: string; sources: string }[]
      synergy: string
      combinations: { combo: string; compounds: string; examples: string }[]
      conclusion: string
    }
    restaurantReality: {
      title: string
      content: string
    }
  }

  const sourcesSection = umamiData.sections[2] as {
    id: string
    title: string
    hasIcon: boolean
    iconType: string
    intro: string
    categories: {
      name: string
      items: { name: string; note: string }[]
    }[]
  }

  const howToSection = umamiData.sections[3] as {
    id: string
    title: string
    intro: string
    techniques: {
      number: number
      title: string
      content: string
      examples?: string[]
      proTip?: string
      tips?: string[]
      methods?: { method: string; effect: string }[]
    }[]
  }

  const msgSection = umamiData.sections[4] as {
    id: string
    title: string
    hasIcon: boolean
    iconType: string
    intro: string
    content: string[]
    myth: {
      title: string
      content: string[]
    }
    usage: {
      title: string
      content: string
      howTo: string
    }
  }

  const umamiBombsSection = umamiData.sections[5] as {
    id: string
    title: string
    hasIcon: boolean
    iconType: string
    intro: string
    bombs: { name: string; usage: string }[]
    proTip: string
  }

  const conclusionSection = umamiData.sections[6] as {
    id: string
    title: string
    content: string[]
    keyLessons: string[]
    closing: string
  }

  // Helper to render markdown-like bold text
  const renderBoldText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    )
  }

  // Helper to render italic text
  const renderFormattedText = (text: string) => {
    // First handle bold
    let parts = text.split(/\*\*(.*?)\*\*/g)
    const result: React.ReactNode[] = []

    parts.forEach((part, index) => {
      if (index % 2 === 1) {
        result.push(<strong key={`bold-${index}`}>{part}</strong>)
      } else {
        // Handle italics within non-bold parts
        const italicParts = part.split(/\*(.*?)\*/g)
        italicParts.forEach((italicPart, italicIndex) => {
          if (italicIndex % 2 === 1) {
            result.push(<em key={`italic-${index}-${italicIndex}`}>{italicPart}</em>)
          } else {
            result.push(italicPart)
          }
        })
      }
    })

    return result
  }

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={umamiData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={umamiData.hero.title}
          introduction={umamiData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p key={index}>{renderFormattedText(paragraph)}</p>
          ))}

          {/* Science Section */}
          <h2 className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-orange-700" />
            {scienceSection.title}
          </h2>
          {scienceSection.content.map((paragraph, index) => (
            <p key={index}>{renderFormattedText(paragraph)}</p>
          ))}

          <h3>{scienceSection.compounds.title}</h3>
          <p>{scienceSection.compounds.intro}</p>
          <ol>
            {scienceSection.compounds.types.map((type, index) => (
              <li key={index}>
                <strong>{type.name}</strong> ({type.description}) – {type.sources}
              </li>
            ))}
          </ol>
          <p>{renderFormattedText(scienceSection.compounds.synergy)}</p>
          <p>This is why certain food combinations taste so good:</p>
          <ul>
            {scienceSection.compounds.combinations.map((combo, index) => (
              <li key={index}>
                <strong>{combo.combo}</strong> ({combo.compounds}) = {combo.examples}
              </li>
            ))}
          </ul>
          <p>{renderFormattedText(scienceSection.compounds.conclusion)}</p>

          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {scienceSection.restaurantReality.title}
            </p>
            <p className="mb-0">{renderFormattedText(scienceSection.restaurantReality.content)}</p>
          </div>

          {/* Sources Section */}
          <h2 className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-orange-700" />
            {sourcesSection.title}
          </h2>
          <p>{sourcesSection.intro}</p>

          {sourcesSection.categories.map((category, index) => (
            <div key={index}>
              <h3>{category.name}</h3>
              <ul>
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <strong>{item.name}</strong> – {item.note}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter CTA */}
          <BlogNewsletterCTA slug={umamiData.newsletterCTA.slug} />

          {/* How to Use Section */}
          <h2>{howToSection.title}</h2>
          <p>{howToSection.intro}</p>

          {howToSection.techniques.map((technique) => (
            <div key={technique.number}>
              <h3>{technique.number}. {technique.title}</h3>
              <p>{renderFormattedText(technique.content)}</p>

              {technique.examples && (
                <>
                  <p><strong>Examples:</strong></p>
                  <ul>
                    {technique.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </>
              )}

              {technique.proTip && (
                <p><strong>Pro tip:</strong> {technique.proTip}</p>
              )}

              {technique.tips && (
                <>
                  <p><strong>To make vegetarian food taste richer:</strong></p>
                  <ul>
                    {technique.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </>
              )}

              {technique.methods && (
                <ul>
                  {technique.methods.map((method, index) => (
                    <li key={index}>
                      <strong>{method.method}</strong> – {method.effect}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* MSG Section */}
          <h2 className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-orange-700" />
            {msgSection.title}
          </h2>
          <p>{renderFormattedText(msgSection.intro)}</p>
          {msgSection.content.map((paragraph, index) => (
            <p key={index}>{renderFormattedText(paragraph)}</p>
          ))}

          <h3>{msgSection.myth.title}</h3>
          {msgSection.myth.content.map((paragraph, index) => (
            <p key={index}>{renderFormattedText(paragraph)}</p>
          ))}

          <h3>{msgSection.usage.title}</h3>
          <p>{msgSection.usage.content}</p>
          <p>{renderFormattedText(msgSection.usage.howTo)}</p>

          {/* Umami Bombs Section */}
          <h2 className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-orange-700" />
            {umamiBombsSection.title}
          </h2>
          <p>{umamiBombsSection.intro}</p>
          <ol>
            {umamiBombsSection.bombs.map((bomb, index) => (
              <li key={index}>
                <strong>{bomb.name}</strong> – {bomb.usage}
              </li>
            ))}
          </ol>
          <p><strong>Pro tip:</strong> {umamiBombsSection.proTip}</p>

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          {conclusionSection.content.map((paragraph, index) => (
            <p key={index}>{renderFormattedText(paragraph)}</p>
          ))}
          <p><strong>The key lessons:</strong></p>
          <ul>
            {conclusionSection.keyLessons.map((lesson, index) => (
              <li key={index}>{renderFormattedText(lesson)}</li>
            ))}
          </ul>
          <p>{conclusionSection.closing}</p>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={umamiData.faq.questions} />

        {/* Related Articles */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {umamiData.relatedArticles.map((article, index) => (
              <Link key={index} href={article.href} className="text-orange-700 hover:text-orange-800 font-semibold">
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
