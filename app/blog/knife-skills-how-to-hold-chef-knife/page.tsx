// ============================================================================
// KNIFE SKILLS: HOW TO HOLD A CHEF KNIFE - Educational Blog Page (Data-Driven)
// Migrated from inline (583 lines) to data-driven architecture
// ============================================================================

import Link from 'next/link'
import { educationalData } from './knife-grip-data'
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
import { Hand, Target, AlertTriangle, CheckCircle2 } from 'lucide-react'

// ISR: Regenerate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata = generateBlogMetadata('knife-skills-how-to-hold-chef-knife')

export default function KnifeSkillsPage() {
  const blogMeta = getBlogMetadata('knife-skills-how-to-hold-chef-knife')

  // Generate schemas from data
  const articleSchema = generateArticleSchema({
    headline: blogMeta.title,
    description: blogMeta.description,
    datePublished: blogMeta.publishedDate,
    dateModified: blogMeta.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'knife-skills-how-to-hold-chef-knife',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/knife-skills-how-to-hold-chef-knife' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Type assertions for complex sections
  const introSection = educationalData.sections[0] as { id: string; title: string; content: string[] }
  const problemSection = educationalData.sections[1] as { id: string; title: string; content: string[] }

  const gripsSection = educationalData.sections[2] as {
    id: string
    title: string
    icon: string
    grips: {
      id: string
      name: string
      intro: string
      howTo: { title: string; steps: string[] }
      keyDetail?: string
      criticalRule?: string
      whyItWorks?: { title: string; content: string[] }
      proTip?: string
      proTipType?: string
      usedFor?: string
      warning?: string
    }[]
  }

  const rockingSection = educationalData.sections[3] as {
    id: string
    title: string
    icon: string
    intro: string
    howTo: { title: string; steps: string[] }
    keyDetail: string
    whyItWorks: { title: string; content: string[] }
    restaurantReality: { title: string; content: string }
  }

  const practiceSection = educationalData.sections[4] as {
    id: string
    title: string
    intro: string
    steps: { title: string; content: string }[]
    mindset: { title: string; content: string }
    practiceFoods: { food: string; why: string }[]
    practiceTip: string
  }

  const mistakesSection = educationalData.sections[5] as {
    id: string
    title: string
    mistakes: { number: number; title: string; problem: string; fix: string; link?: { href: string; text: string } }[]
  }

  const equipmentSection = educationalData.sections[6] as {
    id: string
    title: string
    items: { name: string; link?: string; linkText?: string; description: string }[]
  }

  const bottomLineSection = educationalData.sections[7] as {
    id: string
    title: string
    icon: string
    content: string[]
    keyLessons: { lesson: string; detail: string }[]
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

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          {introSection.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
            />
          ))}

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {educationalData.tableOfContents.map((item, index) => (
                <li key={index}>
                  • <a href={`#${item.id}`} className="text-blue-700 underline">{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Problem Section */}
          <h2 id={problemSection.id}>{problemSection.title}</h2>
          {problemSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Grips Section */}
          <h2 id={gripsSection.id} className="flex items-center gap-2">
            <Hand className="w-6 h-6 text-orange-700" />
            {gripsSection.title}
          </h2>

          {gripsSection.grips.map((grip) => (
            <div key={grip.id}>
              <h3>{grip.name}</h3>
              <p>{grip.intro}</p>

              <h4>{grip.howTo.title}</h4>
              <ol>
                {grip.howTo.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </ol>

              {grip.keyDetail && (
                <p><strong>Key detail:</strong> <span dangerouslySetInnerHTML={{ __html: grip.keyDetail.replace(/\*(.*?)\*/g, '<em>$1</em>') }} /></p>
              )}

              {grip.criticalRule && (
                <p><strong>Critical rule:</strong> <span dangerouslySetInnerHTML={{ __html: grip.criticalRule.replace(/\*(.*?)\*/g, '<em>$1</em>') }} /></p>
              )}

              {grip.whyItWorks && (
                <>
                  <h4>{grip.whyItWorks.title}</h4>
                  {grip.whyItWorks.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  ))}
                </>
              )}

              {grip.usedFor && (
                <p><strong>Used for:</strong> {grip.usedFor}</p>
              )}

              {grip.proTip && (
                <div className={`${grip.proTipType === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6 my-6`}>
                  <p className={`${grip.proTipType === 'warning' ? 'text-yellow-800' : 'text-blue-800'} mb-0`}>
                    <strong>Pro Tip:</strong> {grip.proTip}
                  </p>
                </div>
              )}

              {grip.warning && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
                  <p className="text-red-800 mb-0">
                    <strong>Warning:</strong> {grip.warning}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Rocking Motion Section */}
          <h2 id={rockingSection.id} className="flex items-center gap-2">
            <Target className="w-6 h-6 text-orange-700" />
            {rockingSection.title}
          </h2>

          <p dangerouslySetInnerHTML={{ __html: rockingSection.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          <h3>{rockingSection.howTo.title}</h3>
          <ol>
            {rockingSection.howTo.steps.map((step, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            ))}
          </ol>

          <p><strong>Key detail:</strong> <span dangerouslySetInnerHTML={{ __html: rockingSection.keyDetail.replace(/\*(.*?)\*/g, '<em>$1</em>') }} /></p>

          <h3>{rockingSection.whyItWorks.title}</h3>
          {rockingSection.whyItWorks.content.map((paragraph, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}

          {/* Restaurant Reality */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {rockingSection.restaurantReality.title}
            </p>
            <p
              className="mb-0"
              dangerouslySetInnerHTML={{ __html: rockingSection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
            />
          </div>

          <BlogNewsletterCTA
            slug="knife-skills-how-to-hold-chef-knife"
            description="Get my free &quot;11 Essential Tools I Use Most&quot; PDF, the exact equipment I rely on after 24 years in professional kitchens, including the knives I trust most and my daily 10-minute knife skills practice plan. No fluff, just the tools and techniques that actually matter."
          />

          {/* Practice Section */}
          <h2 id={practiceSection.id}>{practiceSection.title}</h2>
          <p>{practiceSection.intro}</p>

          {practiceSection.steps.map((step, index) => (
            <div key={index}>
              <h3>{step.title}</h3>
              <p>{step.content}</p>
            </div>
          ))}

          <h3>{practiceSection.mindset.title}</h3>
          <p>{practiceSection.mindset.content}</p>

          <h3>Best Foods for Practice</h3>
          <ul>
            {practiceSection.practiceFoods.map((item, index) => (
              <li key={index}><strong>{item.food}</strong> – {item.why}</li>
            ))}
          </ul>

          <p><strong>Pro tip:</strong> {practiceSection.practiceTip}</p>

          {/* Mistakes Section */}
          <h2 id={mistakesSection.id}>{mistakesSection.title}</h2>

          {mistakesSection.mistakes.map((mistake) => (
            <div key={mistake.number}>
              <h3>Mistake #{mistake.number}: {mistake.title}</h3>
              <p>
                <strong>Problem:</strong> {mistake.problem}<br />
                <strong>Fix:</strong> {mistake.fix}
                {mistake.link && (
                  <>
                    {' '}See my <Link href={mistake.link.href} className="text-orange-700 hover:text-orange-800">{mistake.link.text}</Link> for sharpening tips.
                  </>
                )}
              </p>
            </div>
          ))}

          {/* Equipment Section */}
          <h2 id={equipmentSection.id}>{equipmentSection.title}</h2>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <p className="font-bold text-slate-800 mb-4 text-lg">Tools for Practicing Knife Grip</p>
            <ul className="space-y-3 mb-0">
              {equipmentSection.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}:</strong>{' '}
                  {item.link ? (
                    <>
                      <Link href={item.link} className="text-orange-700 hover:text-orange-800">{item.linkText}</Link>
                      {': '}{item.description}
                    </>
                  ) : (
                    item.description
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Line Section */}
          <h2 className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-orange-700" />
            {bottomLineSection.title}
          </h2>

          {bottomLineSection.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p><strong>The key lessons:</strong></p>
          <ul>
            {bottomLineSection.keyLessons.map((item, index) => (
              <li key={index}><strong>{item.lesson}</strong> – {item.detail}</li>
            ))}
          </ul>

          {bottomLineSection.closing.map((paragraph, index) => (
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
