// ============================================================================
// UNDERSTANDING ACIDS IN COOKING: THE SECRET TO BALANCED FLAVOR - Educational Blog Page (Data-Driven)
// Migrated from inline (264 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { ChefHat, Sparkles, Droplet } from 'lucide-react'
import { educationalData } from './acids-cooking-data'
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

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('understanding-acids-cooking')

export default function AcidsInCookingPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'understanding-acids-cooking',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/understanding-acids-cooking' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as {
    id: string
    title: string
    content: string[]
    fatLink: string
  }

  const whatIsSection = educationalData.sections[1] as {
    id: string
    title: string
    definition: string
    categories: { name: string; items: string[] }[]
    restaurantReality: { title: string; content: string }
  }

  const whyEssentialSection = educationalData.sections[2] as {
    id: string
    title: string
    hasIcon: boolean
    reasons: {
      number: number
      title: string
      intro?: string
      analogy?: { component: string; equals: string; description: string; link?: string }[]
      closing?: string
      examples?: string[]
      content?: string
    }[]
  }

  const howChefsUseSection = educationalData.sections[3] as {
    id: string
    title: string
    techniques: {
      number: number
      title: string
      hasIcon?: boolean
      content: string
      examples?: string[]
      classicRatio?: string
    }[]
  }

  const conclusionSection = educationalData.sections[4] as {
    id: string
    title: string
    content: string[]
    fatLink: string
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
          {introSection.content.slice(0, 4).map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
          <p>
            After 24 years in professional kitchens, I can tell you this: <strong>acid is the most underused tool in home cooking</strong>. Home cooks understand salt. They&apos;re learning about{' '}
            <CTAVisibilityTracker
              ctaId="blog-acids-fat-intro-link"
              position="mid_article"
              productSlug="understanding-acids-cooking"
              merchant="internal"
            >
              <Link href={introSection.fatLink} className="text-orange-700 hover:text-orange-800 underline">
                fat
              </Link>
            </CTAVisibilityTracker>
            . But acid? Most people don&apos;t know how or when to use it—and it shows in their food.
          </p>
          <p>{introSection.content[5]}</p>

          {/* What is Acid */}
          <h2>{whatIsSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: whatIsSection.definition.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          {whatIsSection.categories.map((category, index) => (
            <div key={index}>
              <p><strong>{category.name}:</strong></p>
              <ul>
                {category.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Restaurant Reality Callout */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              {whatIsSection.restaurantReality.title}
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: whatIsSection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          {/* Why Acid is Essential */}
          <h2 className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-700" />
            {whyEssentialSection.title}
          </h2>

          {whyEssentialSection.reasons.map((reason) => (
            <div key={reason.number}>
              <h3>{reason.number}. {reason.title}</h3>
              {reason.intro && <p>{reason.intro}</p>}
              {reason.analogy && (
                <ul>
                  {reason.analogy.map((item, index) => (
                    <li key={index}>
                      <strong>
                        {item.link ? (
                          <CTAVisibilityTracker
                            ctaId={`blog-acids-analogy-${item.component.toLowerCase()}-link`}
                            position="mid_article"
                            productSlug="understanding-acids-cooking"
                            merchant="internal"
                          >
                            <Link href={item.link} className="text-orange-700 hover:text-orange-800 underline">
                              {item.component}
                            </Link>
                          </CTAVisibilityTracker>
                        ) : (
                          item.component
                        )}
                        {' '}= {item.equals}
                      </strong>{' '}
                      ({item.description})
                    </li>
                  ))}
                </ul>
              )}
              {reason.examples && (
                <ul>
                  {reason.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              )}
              {reason.closing && <p>{reason.closing}</p>}
              {reason.content && <p>{reason.content}</p>}
            </div>
          ))}

          <BlogNewsletterCTA slug="understanding-acids-cooking" />

          {/* How Chefs Use Acid */}
          <h2>{howChefsUseSection.title}</h2>
          {howChefsUseSection.techniques.map((technique) => (
            <div key={technique.number}>
              {technique.hasIcon ? (
                <h3 className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-orange-700" />
                  {technique.number}. {technique.title}
                </h3>
              ) : (
                <h3>{technique.number}. {technique.title}</h3>
              )}
              <p>{technique.content}</p>
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
              {technique.classicRatio && (
                <p>Classic ratio: {technique.classicRatio}</p>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <h2>{conclusionSection.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: conclusionSection.content[0].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <p>
            Salt enhances.{' '}
            <CTAVisibilityTracker
              ctaId="blog-acids-fat-conclusion-link"
              position="mid_article"
              productSlug="understanding-acids-cooking"
              merchant="internal"
            >
              <Link href={conclusionSection.fatLink} className="text-orange-700 hover:text-orange-800 underline">
                Fat
              </Link>
            </CTAVisibilityTracker>
            {' '}carries. Acid brightens and balances. Together, they create the complete flavor profile that makes restaurant food taste so good.
          </p>
          {conclusionSection.content.slice(2).map((paragraph, index) => (
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
