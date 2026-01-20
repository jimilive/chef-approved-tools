// ============================================================================
// COOKING BY FEEL - Educational Blog Page (Data-Driven)
// Pattern B: Educational Content
// ============================================================================

import Link from 'next/link'
import { educationalData } from './cooking-feel-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
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
export const metadata = generateBlogMetadata('cooking-by-feel')

// Type definitions for sections
type SimpleSection = {
  id: string
  title: string
  content: string[]
}

type Subsection = {
  title: string
  content: string[]
  isList?: boolean
}

type SectionWithSubsections = {
  id: string
  title: string
  content: string[]
  subsections: Subsection[]
}

type Section = SimpleSection | SectionWithSubsections

function hasSubsections(section: Section): section is SectionWithSubsections {
  return 'subsections' in section && Array.isArray(section.subsections)
}

export default async function CookingByFeelPage() {
  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'cooking-by-feel',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/cooking-by-feel' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  return (
    <>
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToSchema
        name={educationalData.howToSchema.name}
        description={educationalData.howToSchema.description}
        datePublished={educationalData.metadata.publishedDate}
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

        {/* Table of Contents */}
        <nav className="bg-slate-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">In This Guide</h2>
          <ul className="space-y-2">
            {educationalData.tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-orange-700 hover:text-orange-800 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {educationalData.sections.map((section: Section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>

              {/* Main content paragraphs */}
              {section.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {/* Subsections if they exist */}
              {hasSubsections(section) && section.subsections.map((subsection, subIndex) => (
                <div key={subIndex} className="mt-6">
                  <h3>{subsection.title}</h3>
                  {subsection.isList ? (
                    <ul>
                      {subsection.content.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    subsection.content.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>

        {/* FAQ */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Articles */}
        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationalData.relatedLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block bg-white rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold text-slate-900">{link.title}</h4>
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
