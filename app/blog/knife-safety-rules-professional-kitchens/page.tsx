import Link from 'next/link'
import { educationalData } from './knife-safety-rules-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import { AlertTriangle, Shield, CheckCircle2, Zap, ChefHat } from 'lucide-react'
import {
  BlogLayout, BlogHero, BlogFAQ, BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'
import { getBlogMetadata } from '@/data/metadata'

export const revalidate = 3600

export const metadata = generateBlogMetadata('knife-safety-rules-professional-kitchens')

export default function KnifeSafetyPost() {
  const blogMeta = getBlogMetadata('knife-safety-rules-professional-kitchens')

  const articleSchema = generateArticleSchema({
    headline: blogMeta.title, description: blogMeta.description, datePublished: blogMeta.publishedDate, dateModified: blogMeta.lastUpdated, authorName: 'Scott Bradley', urlPrefix: 'blog', urlSuffix: 'knife-safety-rules-professional-kitchens', images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' }, { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' }, { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/knife-safety-rules-professional-kitchens' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={educationalData.breadcrumb.title}>
        <BlogHero
          title={educationalData.hero.title}
          introduction={educationalData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {educationalData.sections[0].content?.map((p, i) => <p key={i}>{p}</p>)}

          <nav className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {educationalData.tableOfContents.map((item, i) => (
                <li key={i}><a href={`#${item.id}`} className="text-blue-700 underline">{item.title}</a></li>
              ))}
            </ul>
          </nav>

          <h2 id="why">Why Knife Safety Matters More Than You Think</h2>
          {educationalData.sections[1].content?.map((p, i) => <p key={i}>{p}</p>)}

          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <p className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              Restaurant Reality
            </p>
            <p className="mb-0">{educationalData.sections[1].proTip?.content}</p>
          </div>

          <h2 id="rules">The 10 Rules of Professional Knife Safety</h2>
          {educationalData.sections[2].subsections?.map((rule) => {
            const ruleWithExtras = rule as { id: string; title: string; content: string[]; warning?: { title: string; content: string }; tip?: string }
            return (
              <div key={ruleWithExtras.id}>
                <h3>{ruleWithExtras.title}</h3>
                {ruleWithExtras.content.map((p, i) => <p key={i}>{p}</p>)}
                {ruleWithExtras.warning && (
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-6 rounded-r-lg">
                    <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      {ruleWithExtras.warning.title}
                    </p>
                    <p className="mb-0">{ruleWithExtras.warning.content}</p>
                  </div>
                )}
                {ruleWithExtras.tip && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 my-6">
                    <p className="text-slate-700 mb-0"><strong>Pro tip:</strong> {ruleWithExtras.tip}</p>
                  </div>
                )}
              </div>
            )
          })}

          <div className="not-prose bg-orange-50 border border-orange-200 rounded-xl p-6 my-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Want My Knife Maintenance Routine? </h3>
            <p className="text-slate-700 mb-4">
              Join my free email series for the <strong>&quot;Professional Knife Care Checklist&quot;</strong> — how chefs clean, hone, and store blades for decades of use. </p>
            <Link href="/newsletter" className="bg-orange-900 !text-white hover:bg-orange-800 px-6 py-2 rounded-lg font-semibold transition-colors inline-block">
              Get the Free Guide
            </Link>
          </div>

          <h2 id="method">The Professional Method: How Chefs Actually Use and Maintain Knives</h2>
          <p>{educationalData.sections[3].content?.[0]}</p>
          {educationalData.sections[3].subsections?.map((step) => {
            const stepWithTip = step as { id: string; title: string; content: string[]; tip?: string }
            return (
              <div key={stepWithTip.id}>
                <h3>{stepWithTip.title}</h3>
                {stepWithTip.content.map((p, i) => {
                  if (p.includes('**Rubbermaid')) {
                    return (
                      <p key={i}>
                        I&apos;ve used a <Link href="/reviews/rubbermaid-commercial-cooks-scraper" className="text-orange-700 hover:text-orange-800 underline">Rubbermaid Commercial Cook&apos;s Scraper</Link> for 19 years, and it&apos;s perfect for transferring chopped veggies or herbs without damaging your knife. </p>
                    )
                  }
                  return <p key={i}>{p}</p>
                })}
                {stepWithTip.tip && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 my-6">
                    <p className="text-slate-700 mb-0"><strong>Why it matters:</strong> {stepWithTip.tip}</p>
                  </div>
                )}
              </div>
            )
          })}

          <h2 id="claw" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-700" />
            The &quot;Claw&quot; Technique: Your Built-In Shield
          </h2>
          {educationalData.sections[4].content?.map((p, i) => <p key={i}>{p}</p>)}
          {educationalData.sections[4].subsections?.map((sub) => (
            <div key={sub.id}>
              <h3>{sub.title}</h3>
              {sub.content.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          ))}
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              {educationalData.sections[4].proTip?.title}
            </h3>
            <p className="mb-0">{educationalData.sections[4].proTip?.content}</p>
          </div>

          <h2 id="mistakes">Common Mistakes (And How to Avoid Them)</h2>
          {educationalData.sections[5].subsections?.map((m) => (
            <div key={m.id}>
              <h3>{m.title}</h3>
              {m.content.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          ))}

          <h2 id="equipment">Essential Tools That Keep You Safer</h2>
          <p>{educationalData.sections[6].content?.[0]}</p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-slate-800 mb-4">Essential Safety Equipment</h3>
            <ul className="space-y-3">
              <li><strong>Chef Knife:</strong> <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-700 hover:text-orange-800 underline">Victorinox Fibrox 8&quot; Chef&apos;s Knife</Link>, balanced, slip-resistant, professional standard.</li>
              <li><strong>Honing Steel:</strong> A quality ceramic honing rod realigns your edge without removing metal.</li>
              <li><strong>Cutting Board:</strong> <Link href="/reviews/john-boos-platinum-commercial-cutting-board" className="text-orange-700 hover:text-orange-800 underline">John Boos Platinum Commercial Cutting Board</Link> or <Link href="/reviews/epicurean-kitchen-cutting-board" className="text-orange-700 hover:text-orange-800 underline">Epicurean Kitchen Cutting Board</Link>.</li>
              <li><strong>Scraper:</strong> <Link href="/reviews/rubbermaid-commercial-cooks-scraper" className="text-orange-700 hover:text-orange-800 underline">Rubbermaid Commercial Cook&apos;s Scraper</Link>, transfer food safely.</li>
              <li><strong>Knife Storage:</strong> Magnetic strips or knife blocks prevent accidents and protect edges.</li>
            </ul>
          </div>

          <h2 id="troubleshooting">Troubleshooting Cuts and Edge Issues</h2>
          <div className="space-y-4 my-8">
            {educationalData.sections[7].troubleshootingItems?.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 mb-2">{item.problem}</h3>
                <p className="text-slate-700 text-sm mb-0">{item.solution}</p>
              </div>
            ))}
          </div>

          <h2>Putting It All Together</h2>
          {educationalData.sections[8].content?.map((p, i) => <p key={i}>{p}</p>)}
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
              {educationalData.sections[8].proTip?.title}
            </h3>
            <p className="mb-0">{educationalData.sections[8].proTip?.content}</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-orange-800 mb-3">Keep Learning: Related Guides</h3>
            <div className="mb-6">
              <h4 className="font-bold text-orange-800 mb-2">Technique Guides:</h4>
              <ul className="text-orange-800 space-y-1 text-sm">
                {educationalData.techniqueGuides.map((g, i) => (
                  <li key={i}><Link href={g.href} className="text-orange-800 underline">{g.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-orange-800 mb-2">Essential Equipment:</h4>
              <ul className="text-orange-800 space-y-1 text-sm">
                <li><Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-800 underline">Victorinox Fibrox 8&quot; Chef&apos;s Knife Review</Link></li>
                <li><Link href="/reviews/rubbermaid-commercial-cooks-scraper" className="text-orange-800 underline">Rubbermaid Commercial Cook&apos;s Scraper Review</Link></li>
                <li><Link href="/reviews/john-boos-platinum-commercial-cutting-board" className="text-orange-800 underline">John Boos Platinum Cutting Board Review</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <BlogFAQ questions={educationalData.faq.questions} title="Frequently Asked Questions" />

        <section className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationalData.relatedArticles.map((a, i) => (
              <Link key={i} href={a.href} className="block bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2">{a.title}</h4>
                <p className="text-slate-700 text-sm">{a.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
