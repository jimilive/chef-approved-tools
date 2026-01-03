import Link from 'next/link'
import { educationalData } from './knife-storage-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { Shield, Droplet, Wind, AlertTriangle, Grid3x3, Magnet, Box } from 'lucide-react'
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import AuthorBio from '@/components/review/AuthorBio'

export const revalidate = 3600

export const metadata = generateBlogMetadata('knife-storage-protecting-blades-for-decades')

export default function KnifeStorageProtectionPage() {
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'knife-storage-protecting-blades-for-decades',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/knife-storage-protecting-blades-for-decades' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Get sections by id for easier access
  const getSection = (id: string) => educationalData.sections.find(s => s.id === id)
  const introSection = getSection('intro')
  const problemSection = getSection('problem') as typeof educationalData.sections[0] & { warningBox?: { title: string; items: string[] }; additionalContent?: string[] }
  const methodSection = getSection('professional-method') as typeof educationalData.sections[0] & { subsections?: Array<{ id: string; title: string; icon?: string; content: string[]; protocol?: { title: string; steps: string[] }; oilSteps?: { title: string; steps: string[] } }> }
  const storageSection = getSection('storage-methods') as typeof educationalData.sections[0] & { storageMethods?: Array<{ id: string; title: string; icon?: string; description: string[]; pros?: string[]; cons?: string[]; proTip?: string; whenToUse?: string[] }> }
  const travelSection = getSection('travel-protection')
  const materialSection = getSection('material-specific') as typeof educationalData.sections[0] & { steelTable?: { headers: string[]; rows: Array<{ cells: string[]; isAlt?: boolean }> } }
  const comparisonSection = getSection('comparison-table') as typeof educationalData.sections[0] & { comparisonTable?: { headers: string[]; rows: Array<{ cells: string[]; isAlt?: boolean }> } }
  const mistakesSection = getSection('common-mistakes') as typeof educationalData.sections[0] & { mistakes?: Array<{ id: string; title: string; content: string[] }> }
  const equipmentSection = getSection('equipment') as typeof educationalData.sections[0] & { equipmentList?: Array<{ name: string; description: string }> }
  const troubleSection = getSection('troubleshooting') as typeof educationalData.sections[0] & { troubleshootingItems?: Array<{ problem: string; solution: string }> }
  const finalSection = getSection('final-thoughts')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={educationalData.breadcrumb.title}>
        <BlogHero
          title={educationalData.hero.title}
          introduction={educationalData.hero.introduction}
          publishedDate={educationalData.metadata.publishedDate}
          lastUpdated={educationalData.metadata.lastUpdated}
          readTime={educationalData.metadata.readTime}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Intro */}
          {introSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {/* Problem Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-orange-700" />
            {problemSection?.title}
          </h2>
          {problemSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {problemSection?.warningBox && (
            <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8">
              <ul className="space-y-2 mb-0">
                {problemSection.warningBox.items.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ul>
            </div>
          )}

          {problemSection?.additionalContent?.map((p, i) => <p key={i}>{p}</p>)}

          {/* Professional Method Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-orange-700" />
            {methodSection?.title}
          </h2>

          {methodSection?.subsections?.map((sub) => (
            <div key={sub.id}>
              <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4 flex items-center gap-3">
                {sub.icon === 'Droplet' && <Droplet className="w-6 h-6 text-orange-700" />}
                {sub.icon === 'Wind' && <Wind className="w-6 h-6 text-orange-700" />}
                {sub.title}
              </h3>
              {sub.content.map((p, i) => <p key={i}>{p}</p>)}

              {sub.protocol && (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <p className="font-semibold text-slate-900 mb-2">{sub.protocol.title}</p>
                  <ol className="space-y-2 mb-0 list-decimal list-inside">
                    {sub.protocol.steps.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </div>
              )}

              {sub.oilSteps && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
                  <p className="font-semibold text-slate-900 mb-3">{sub.oilSteps.title}</p>
                  <ol className="space-y-2 mb-0 list-decimal list-inside">
                    {sub.oilSteps.steps.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </div>
              )}
            </div>
          ))}

          {/* Storage Methods */}
          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
            4. Choose the Right Storage Method for Your Kitchen
          </h3>
          <p>Every kitchen is different. What works in a professional setting might not work at home. Let&apos;s break down each storage method—pros, cons, and when to use them.</p>

          {storageSection?.storageMethods?.map((method) => (
            <div key={method.id}>
              <h4 className="text-xl font-semibold text-slate-900 mt-6 mb-3 flex items-center gap-3">
                {method.icon === 'Grid3x3' && <Grid3x3 className="w-5 h-5 text-orange-700" />}
                {method.icon === 'Magnet' && <Magnet className="w-5 h-5 text-orange-700" />}
                {method.icon === 'Box' && <Box className="w-5 h-5 text-orange-700" />}
                {method.title}
              </h4>
              {method.description.map((p, i) => <p key={i}>{p}</p>)}

              {method.pros && method.cons && (
                <div className={`${method.id === 'magnetic-strip' ? 'bg-green-50 border-l-4 border-green-600' : method.id === 'drawer-insert' ? 'bg-purple-50 border-l-4 border-purple-600' : 'bg-blue-50 border-l-4 border-blue-600'} p-6 my-8`}>
                  <p className="font-semibold text-slate-900 mb-2">{method.title} Pros:</p>
                  <ul className="space-y-1 mb-3">
                    {method.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                  </ul>
                  <p className="font-semibold text-slate-900 mb-2 mt-4">{method.title} Cons:</p>
                  <ul className="space-y-1 mb-0">
                    {method.cons.map((con, i) => <li key={i}>• {con}</li>)}
                  </ul>
                </div>
              )}

              {method.whenToUse && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
                  <p className="font-semibold text-slate-900 mb-2">When to Use a Knife Roll:</p>
                  <ul className="space-y-2 mb-0">
                    {method.whenToUse.map((use, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: use.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </div>
              )}

              {method.proTip && (
                <p><strong>Pro tip:</strong> {method.proTip}</p>
              )}

              {method.id === 'knife-roll' && (
                <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-8">
                  <p className="font-semibold text-slate-900 mb-2">Pro Tip:</p>
                  <p className="mb-0">{method.proTip}</p>
                </div>
              )}
            </div>
          ))}

          {/* Travel Protection */}
          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">{travelSection?.title}</h3>
          {travelSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {/* Material-Specific */}
          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">{materialSection?.title}</h3>
          {materialSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {materialSection?.steelTable && (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    {materialSection.steelTable.headers.map((h, i) => (
                      <th key={i} className="border border-slate-300 px-4 py-2 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {materialSection.steelTable.rows.map((row, i) => (
                    <tr key={i} className={row.isAlt ? 'bg-slate-50' : ''}>
                      {row.cells.map((cell, j) => (
                        <td key={j} className="border border-slate-300 px-4 py-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="not-prose bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Want my complete kitchen equipment guide?</h3>
            <p className="text-slate-700 mb-3">Join 10,000+ home cooks learning pro techniques and tool recommendations.</p>
            <p className="text-slate-700 mb-4"><strong>Free download:</strong> &quot;11 Essential Kitchen Tools I Use Every Day&quot;</p>
            <CTAVisibilityTracker ctaId="knife-storage-protection-newsletter-cta" position="mid_article" productSlug="knife-storage-protecting-blades-for-decades" merchant="internal">
              <Link href="/newsletter" className="inline-block bg-orange-900 !text-white px-6 py-3 rounded font-semibold hover:bg-orange-800 transition-colors">
                Get the Free Guide →
              </Link>
            </CTAVisibilityTracker>
          </div>

          {/* Comparison Table */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{comparisonSection?.title}</h2>
          {comparisonSection?.comparisonTable && (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    {comparisonSection.comparisonTable.headers.map((h, i) => (
                      <th key={i} className="border border-slate-300 px-4 py-2 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonSection.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className={row.isAlt ? 'bg-slate-50' : ''}>
                      {row.cells.map((cell, j) => (
                        <td key={j} className="border border-slate-300 px-4 py-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Common Mistakes */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{mistakesSection?.title}</h2>
          {mistakesSection?.mistakes?.map((mistake) => (
            <div key={mistake.id}>
              <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">{mistake.title}</h3>
              {mistake.content.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ))}

          {/* Equipment */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{equipmentSection?.title}</h2>
          {equipmentSection?.equipmentList && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
              <ul className="space-y-3 mb-0">
                {equipmentSection.equipmentList.map((item, i) => (
                  <li key={i}><strong>{item.name}:</strong> {item.description}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Troubleshooting */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{troubleSection?.title}</h2>
          {troubleSection?.troubleshootingItems && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
              <div className="space-y-4">
                {troubleSection.troubleshootingItems.map((item, i) => (
                  <div key={i}>
                    <p className="font-semibold text-slate-900 mb-2">{item.problem}</p>
                    <p className="text-slate-700 mb-0">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p>
            <CTAVisibilityTracker ctaId="knife-storage-protection-grip-guide-1" position="mid_article" productSlug="knife-storage-protecting-blades-for-decades" merchant="internal">
              <Link href="/blog/knife-skills-how-to-hold-chef-knife" className="text-blue-700 underline">
                Learn professional knife grip techniques
              </Link>
            </CTAVisibilityTracker> to complement your proper storage and keep your well-maintained knives performing at their best.
          </p>

          {/* Final Thoughts */}
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{finalSection?.title}</h2>
          {finalSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 p-6 my-12 rounded-r-lg">
            <p className="text-slate-900 mb-0">
              <strong>About the Author:</strong> Scott Bradley has 24 years of professional kitchen experience, trained at Seattle Central Culinary, and served as Kitchen Manager at Mellow Mushroom (1992-1994). He specializes in home cooking using the professional techniques that create consistent, restaurant-quality results.
            </p>
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
