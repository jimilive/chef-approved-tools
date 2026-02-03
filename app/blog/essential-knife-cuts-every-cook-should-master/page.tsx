// ============================================================================
// ESSENTIAL KNIFE CUTS - Educational Blog Page (Data-Driven)
// Migrated from inline (794 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { educationalData } from './knife-cuts-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  BlogLayout, BlogHero, BlogFAQ, BlogEmailCapture
} from '@/components/blog'
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA'
import AuthorBio from '@/components/review/AuthorBio'
import { getBlogMetadata } from '@/data/metadata'
import { AlertTriangle, Ruler, CheckCircle2 } from 'lucide-react'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('essential-knife-cuts-every-cook-should-master')

export default function EssentialKnifeCutsPage() {
  const blogMeta = getBlogMetadata('essential-knife-cuts-every-cook-should-master')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title, description: blogMeta.description, datePublished: blogMeta.publishedDate, dateModified: blogMeta.lastUpdated, authorName: 'Scott Bradley', urlPrefix: 'blog', urlSuffix: 'essential-knife-cuts-every-cook-should-master', images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' }, { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' }, { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/essential-knife-cuts-every-cook-should-master' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as { id: string; title: string; content: string[] }

  const whySection = educationalData.sections[1] as {
    id: string
    title: string
    subsections: { id: string; title: string; problem?: string; solution?: string; content?: string }[]
    warning: { title: string; content: string }
  }

  const problemSection = educationalData.sections[2] as { id: string; title: string; content: string[] }

  const methodSection = educationalData.sections[3] as {
    id: string
    title: string
    intro: string
    cuts: {
      id: string
      title: string
      usedFor: string
      how: string
      proTip?: { type: string; content: string; link?: { href: string; text: string } }
    }[]
  }

  const classicalSection = educationalData.sections[4] as {
    id: string
    title: string
    icon: string
    intro: string
    classicalCuts: { name: string; size: string; bestFor: string; note?: string }[]
  }

  const julienneTutorial = educationalData.sections[5] as {
    id: string
    title: string
    intro: string
    steps: { title: string; points: string[] }[]
    timeInvestment: string
  }

  const brunoiseTutorial = educationalData.sections[6] as {
    id: string
    title: string
    intro: string
    steps: { title: string; points: string[] }[]
    timeInvestment: string
  }

  const precisionSection = educationalData.sections[7] as {
    id: string
    title: string
    precisionMatters: { item: string; reason: string }[]
    precisionDoesntMatter: { item: string; reason: string }[]
    rule: string
  }

  const mistakesSection = educationalData.sections[8] as {
    id: string
    title: string
    mistakes: { number: number; title: string; problem: string; fix: string }[]
  }

  const equipmentSection = educationalData.sections[9] as {
    id: string
    title: string
    intro: string
    items: { name: string; description: string; link?: string; linkText?: string }[]
  }

  const practiceSection = educationalData.sections[10] as {
    id: string
    title: string
    exercises: { title: string; goal: string; method: string[] }[]
  }

  const troubleshootingSection = educationalData.sections[11] as {
    id: string
    title: string
    issues: { problem: string; solution: string }[]
  }

  const bottomLineSection = educationalData.sections[12] as {
    id: string
    title: string
    icon: string
    intro: string
    mainPoint: string
    content: string[]
    keyLessons: { lesson: string; reason: string }[]
    closing: string
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
        tools={educationalData.howToSchema.tools}
        steps={educationalData.howToSchema.steps}
      />

      <BlogLayout breadcrumbTitle={educationalData.breadcrumb.title}>
        {/* Hero */}
        <BlogHero
          title={educationalData.hero.title}
          introduction={educationalData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
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
                  <a href={`#${item.id}`} className="text-blue-700 underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Section */}
          <h2 id={whySection.id}>{whySection.title}</h2>

          {whySection.subsections.map((sub) => (
            <div key={sub.id}>
              <h3>{sub.title}</h3>
              {sub.problem && (
                <p><strong>The problem:</strong> {sub.problem}</p>
              )}
              {sub.solution && (
                <p><strong>The solution:</strong> {sub.solution}</p>
              )}
              {sub.content && (
                <p>{sub.content}</p>
              )}
            </div>
          ))}

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {whySection.warning.title}
            </p>
            <p className="mb-0">
              {whySection.warning.content}
            </p>
          </div>

          {/* Problem Section */}
          <h2 id={problemSection.id}>{problemSection.title}</h2>
          {problemSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Method Section - 5 Essential Cuts */}
          <h2 id={methodSection.id}>{methodSection.title}</h2>
          <p>{methodSection.intro}</p>

          {methodSection.cuts.map((cut) => (
            <div key={cut.id}>
              <h3>{cut.title}</h3>
              <p><strong>Used for:</strong> {cut.usedFor}.</p>
              <p><strong>How:</strong> {cut.how}</p>

              {cut.proTip && (
                <div className={`${cut.proTip.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'} rounded-xl p-6 my-6`}>
                  <p className={`${cut.proTip.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'} mb-0`}>
                    <strong>Pro Tip:</strong> {cut.proTip.content}
                    {cut.proTip.link && (
                      <>
                        {' '}See my{' '}
                        <CTAVisibilityTracker
                          ctaId={`blog-knife-cuts-${cut.id}-link`}
                          position="mid_article"
                          productSlug="essential-knife-cuts-every-cook-should-master"
                          merchant="internal"
                        >
                          <Link href={cut.proTip.link.href} className={`${cut.proTip.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'} underline`}>
                            {cut.proTip.link.text}
                          </Link>
                        </CTAVisibilityTracker>
                        {' '}for edge maintenance. </>
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}

          <BlogNewsletterCTA slug="essential-knife-cuts-every-cook-should-master" />

          {/* Classical Cuts Section */}
          <h2 id={classicalSection.id} className="flex items-center gap-2">
            <Ruler className="w-6 h-6 text-orange-700" />
            {classicalSection.title}
          </h2>
          <p>{classicalSection.intro}</p>

          {classicalSection.classicalCuts.map((cut) => (
            <div key={cut.name}>
              <h3>{cut.name} ({cut.size})</h3>
              <p><strong>Best for:</strong> {cut.bestFor}</p>
              {cut.note && (
                <p><strong>Technical note:</strong> {cut.note}</p>
              )}
            </div>
          ))}

          {/* Julienne Tutorial */}
          <h2>{julienneTutorial.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: julienneTutorial.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {julienneTutorial.steps.map((step) => (
            <div key={step.title}>
              <h3>{step.title}</h3>
              <ul>
                {step.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
          <p><strong>Time investment:</strong> {julienneTutorial.timeInvestment}</p>

          {/* Brunoise Tutorial */}
          <h2>{brunoiseTutorial.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: brunoiseTutorial.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {brunoiseTutorial.steps.map((step) => (
            <div key={step.title}>
              <h3>{step.title}</h3>
              <ul>
                {step.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
          <p><strong>Time investment:</strong> {brunoiseTutorial.timeInvestment}</p>

          {/* Precision Section */}
          <h2 id={precisionSection.id}>{precisionSection.title}</h2>

          <h3>Precision MATTERS for:</h3>
          <ul>
            {precisionSection.precisionMatters.map((item, index) => (
              <li key={index}><strong>{item.item}:</strong> {item.reason}</li>
            ))}
          </ul>

          <h3>Precision DOESN&apos;T matter for:</h3>
          <ul>
            {precisionSection.precisionDoesntMatter.map((item, index) => (
              <li key={index}><strong>{item.item}:</strong> {item.reason}</li>
            ))}
          </ul>

          <p><strong>The rule:</strong> {precisionSection.rule}</p>

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
          <p>{equipmentSection.intro}</p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <p className="font-bold text-slate-800 mb-4 text-lg">Essential Knife Skills Equipment</p>
            <ul className="space-y-3">
              {equipmentSection.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}:</strong>{' '}
                  {item.link ? (
                    <>
                      <CTAVisibilityTracker
                        ctaId={`blog-knife-cuts-equipment-${index}`}
                        position="mid_article"
                        productSlug="essential-knife-cuts-every-cook-should-master"
                        merchant="internal"
                      >
                        <Link href={item.link} className="text-orange-700 hover:text-orange-800 underline">
                          {item.linkText}
                        </Link>
                      </CTAVisibilityTracker>
                      {' — '}{item.description}
                    </>
                  ) : (
                    item.description
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Section */}
          <h2 id={practiceSection.id}>{practiceSection.title}</h2>

          {practiceSection.exercises.map((exercise) => (
            <div key={exercise.title}>
              <h3>{exercise.title}</h3>
              <p><strong>Goal:</strong> {exercise.goal}</p>
              <p><strong>Method:</strong></p>
              <ul>
                {exercise.method.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          ))}

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

          {/* Bottom Line Section */}
          <h2 className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-orange-700" />
            {bottomLineSection.title}
          </h2>

          <p>{bottomLineSection.intro}</p>

          <p dangerouslySetInnerHTML={{ __html: bottomLineSection.mainPoint.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {bottomLineSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p><strong>The key lessons:</strong></p>
          <ul>
            {bottomLineSection.keyLessons.map((item, index) => (
              <li key={index}><strong>{item.lesson}</strong> – {item.reason}</li>
            ))}
          </ul>

          <p>{bottomLineSection.closing}</p>

          {/* Related Guides */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-orange-800 mb-3">Keep Learning: Related Guides</h3>

            <div className="mb-6">
              <p className="font-bold text-orange-800 mb-2">Technique Guides:</p>
              <ul className="text-orange-700 space-y-1 text-sm">
                {educationalData.relatedGuides.technique.map((guide, index) => (
                  <li key={index}>
                    <CTAVisibilityTracker
                      ctaId={`blog-knife-cuts-technique-${index}`}
                      position="final_cta"
                      productSlug="essential-knife-cuts-every-cook-should-master"
                      merchant="internal"
                    >
                      <Link href={guide.href} className="text-orange-700 underline">
                        {guide.title}
                      </Link>
                    </CTAVisibilityTracker>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <p className="font-bold text-orange-800 mb-2">Essential Equipment:</p>
              <ul className="text-orange-700 space-y-1 text-sm">
                {educationalData.relatedGuides.equipment.map((guide, index) => (
                  <li key={index}>
                    <CTAVisibilityTracker
                      ctaId={`blog-knife-cuts-equipment-final-${index}`}
                      position="final_cta"
                      productSlug="essential-knife-cuts-every-cook-should-master"
                      merchant="internal"
                    >
                      <Link href={guide.href} className="text-orange-700 underline">
                        {guide.title}
                      </Link>
                    </CTAVisibilityTracker>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ - Single Source of Truth */}
        <BlogFAQ questions={educationalData.faq.questions} />

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
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
