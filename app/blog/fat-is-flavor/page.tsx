// ============================================================================
// WHY FAT IS FLAVOR (AND HOW TO USE IT LIKE A PRO) - Educational Blog Page (Data-Driven)
// Migrated from inline (216 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, Flame, Sparkles } from 'lucide-react'
import { educationalData } from './fat-flavor-data'
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

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('fat-is-flavor')

export default function FatIsFlavorPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'fat-is-flavor',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/fat-is-flavor' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
  }

  const scienceSection = educationalData.sections[1] as {
    id: string
    title: string
    hasIcon: boolean
    intro: string
    points: {
      number: number
      title: string
      content: string[]
    }[]
    restaurantReality: { title: string; content: string }
  }

  const howChefsUseSection = educationalData.sections[2] as {
    id: string
    title: string
    techniques: {
      number: number
      title: string
      hasIcon?: boolean
      technique?: string
      whatsHappening?: string
      examples?: string[]
      content?: string
      maillardLink?: string
    }[]
  }

  const conclusionSection = educationalData.sections[3] as {
    id: string
    title: string
    intro: string
    benefitsIntro: string
    benefits: string[]
    callToAction: string[]
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
          {introSection.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {/* Science Section */}
          <h2 className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-700" />
            {scienceSection.title}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: scienceSection.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {scienceSection.points.map((point) => (
            <div key={point.number}>
              <h3>{point.number}. {point.title}</h3>
              {point.content.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          ))}

          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              {scienceSection.restaurantReality.title}
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: scienceSection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
          </div>

          {/* How Chefs Use Fat Section */}
          <h2>{howChefsUseSection.title}</h2>
          {howChefsUseSection.techniques.map((technique) => (
            <div key={technique.number}>
              {technique.hasIcon ? (
                <h3 className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-700" />
                  {technique.number}. {technique.title}
                </h3>
              ) : (
                <h3>{technique.number}. {technique.title}</h3>
              )}
              {technique.technique && (
                <p><strong>The technique:</strong> {technique.technique}</p>
              )}
              {technique.whatsHappening && (
                <p><strong>What&apos;s happening:</strong> {technique.whatsHappening}</p>
              )}
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
              {technique.content && technique.maillardLink && (
                <p>
                  Fat conducts heat more efficiently than air and creates better browning through the{' '}
                  <Link href={technique.maillardLink} className="text-orange-700 hover:text-orange-800 underline">
                    Maillard reaction
                  </Link>
                  . This is why sautéing and pan-frying create better flavor than steaming or boiling.
                </p>
              )}
            </div>
          ))}

          <BlogNewsletterCTA slug="fat-is-flavor" />

          {/* Conclusion Section */}
          <h2>{conclusionSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: conclusionSection.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <p>{conclusionSection.benefitsIntro}</p>
          <ul>
            {conclusionSection.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          {conclusionSection.callToAction.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
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
