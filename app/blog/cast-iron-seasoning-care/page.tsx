import Link from 'next/link'
import { educationalData } from './cast-iron-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import HowToSchema from '@/components/HowToSchema'
import { ChefHat, Flame, Droplets, FlaskConical, AlertTriangle } from 'lucide-react'
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture
} from '@/components/blog'
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA'
import AuthorBio from '@/components/review/AuthorBio'

export const revalidate = 3600

export const metadata = generateBlogMetadata('cast-iron-seasoning-care')

export default function CastIronCarePage() {
  const articleSchema = generateArticleSchema({
    headline: educationalData.metadata.title,
    description: educationalData.metadata.description,
    datePublished: educationalData.metadata.publishedDate,
    dateModified: educationalData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'cast-iron-seasoning-care',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: educationalData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/cast-iron-seasoning-care' }
  ])

  const faqSchema = generateFAQSchema(educationalData.faq.questions)

  // Get sections for easier access
  const getSection = (id: string) => educationalData.sections.find(s => s.id === id)
  const introSection = getSection('intro')
  const chemistrySection = getSection('chemistry') as typeof educationalData.sections[0] & { subsections?: Array<{ id: string; title: string; content: string[]; bulletPoints?: string[]; keyPoint?: string; additionalContent?: string[]; oilCriteria?: string[]; bestOils?: string[]; avoidOils?: string[] }>; restaurantReality?: { title: string; content: string } }
  const seasoningSection = getSection('seasoning') as typeof educationalData.sections[0] & { methods?: Array<{ id: string; title: string; intro: string; steps?: Array<{ title: string; intro?: string; steps?: string[]; content?: string[]; additionalContent?: string[]; proTip?: string; criticalDetail?: string; warning?: string }>; additionalContent?: string }> }
  const cleaningSection = getSection('cleaning') as typeof educationalData.sections[0] & { dishwasherIncident?: { title: string; content: string }; subsections?: Array<{ id: string; title: string; steps?: string[]; content?: string[]; additionalContent?: string; proTip?: string; avoid?: string[]; intro?: string; causes?: string[]; fix?: string }> }
  const rustySection = getSection('rusty') as typeof educationalData.sections[0] & { restorationMethods?: Array<{ id: string; title: string; steps?: string[]; intro?: string; note?: string; cause?: string; fix?: string; explanation?: string }> }
  const reseasonSection = getSection('reseason') as typeof educationalData.sections[0] & { whenNeeded?: { title: string; signs: string[] }; ovenMethod?: { title: string; intro: string; steps: string[] }; stovetopMethod?: { title: string; intro: string; steps: string[]; note?: string } }
  const restoreSection = getSection('restore') as typeof educationalData.sections[0] & { assessment?: { title: string; points: string[] }; deepCleaning?: { title: string; intro: string; methods: Array<{ name: string; steps?: string[]; warning?: string; description?: string }> } }
  const afterCookingSection = getSection('after-cooking') as typeof educationalData.sections[0] & { immediateSteps?: { title: string; steps: string[] }; deglazeMethod?: { title: string; intro: string; steps: string[]; warning?: string }; whatNotToDo?: { title: string; avoid: string[] } }
  const bestOilsSection = getSection('best-oils') as typeof educationalData.sections[0] & { scienceIntro?: { title: string; content: string }; comparisonTable?: { title: string; headers: string[]; rows: Array<{ oil: string; bestUse: string; why: string; rating: number }> }; oilsToAvoid?: { title: string; oils: Array<{ name: string; reason: string }> }; professionalRecommendation?: { title: string; content: string } }
  const mistakesSection = getSection('mistakes') as typeof educationalData.sections[0] & { intro?: string; mistakes?: Array<{ id: string; title: string; problem: string; why?: string; fix: string }> }
  const equipmentSection = getSection('equipment') as typeof educationalData.sections[0] & { intro?: string; equipmentList?: Array<{ name: string; description: string; link?: string }> }
  const troubleSection = getSection('troubleshooting') as typeof educationalData.sections[0] & { troubleshootingItems?: Array<{ problem: string; solution: string }> }
  const bottomSection = getSection('bottom-line') as typeof educationalData.sections[0] & { keyLessons?: string[]; closing?: string[] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToSchema {...educationalData.howToSchema} />

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
          {introSection?.content?.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
          ))}

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Complete Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              {educationalData.tableOfContents.map((item, i) => (
                <li key={i}>• <a href={`#${item.id}`} className="text-blue-700 underline">{item.title}</a></li>
              ))}
            </ul>
          </div>

          {/* Chemistry Section */}
          <h2 id="chemistry" className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-orange-700" />
            {chemistrySection?.title}
          </h2>
          {chemistrySection?.content?.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}

          {chemistrySection?.subsections?.map((sub) => (
            <div key={sub.id}>
              <h3>{sub.title}</h3>
              {sub.content.map((p, i) => <p key={i}>{p}</p>)}
              {sub.bulletPoints && (
                <ul>
                  {sub.bulletPoints.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              )}
              {sub.keyPoint && (
                <p dangerouslySetInnerHTML={{ __html: `<strong>Key point:</strong> ${sub.keyPoint.replace(/\*(.*?)\*/g, '<em>$1</em>')}` }} />
              )}
              {sub.additionalContent?.map((p, i) => <p key={i}>{p}</p>)}
              {sub.oilCriteria && (
                <ul>
                  {sub.oilCriteria.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ul>
              )}
              {sub.bestOils && (
                <>
                  <p><strong>Best oils for seasoning:</strong></p>
                  <ul>
                    {sub.bestOils.map((oil, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: oil.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </>
              )}
              {sub.avoidOils && (
                <>
                  <p><strong>Avoid:</strong></p>
                  <ul>
                    {sub.avoidOils.map((oil, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: oil.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}

          {chemistrySection?.restaurantReality && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
              <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                {chemistrySection.restaurantReality.title}
              </p>
              <p className="mb-0" dangerouslySetInnerHTML={{ __html: chemistrySection.restaurantReality.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          )}

          {/* Seasoning Section */}
          <h2 id="seasoning" className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-700" />
            {seasoningSection?.title}
          </h2>
          {seasoningSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {seasoningSection?.methods?.map((method) => (
            <div key={method.id}>
              <h3>{method.title}</h3>
              <p>{method.intro}</p>

              {method.id === 'oven-method' && method.steps?.map((step, stepIdx) => {
                const ovenStep = step as { title: string; intro?: string; steps?: string[]; content?: string[]; additionalContent?: string[]; proTip?: string; criticalDetail?: string; warning?: string }
                return (
                  <div key={stepIdx}>
                    <h4>{ovenStep.title}</h4>
                    {ovenStep.intro && <p>{ovenStep.intro}</p>}
                    {ovenStep.steps && (
                      <ol>
                        {ovenStep.steps.map((s: string, i: number) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ol>
                    )}
                    {ovenStep.content?.map((p: string, i: number) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                    {ovenStep.additionalContent?.map((p: string, i: number) => <p key={i}>{p}</p>)}
                    {ovenStep.criticalDetail && (
                      <p dangerouslySetInnerHTML={{ __html: `<strong>Critical detail:</strong> ${ovenStep.criticalDetail}` }} />
                    )}
                    {ovenStep.warning && <p>{ovenStep.warning}</p>}
                    {ovenStep.proTip && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
                        <p className="text-yellow-800 mb-0"><strong>Pro tip:</strong> {ovenStep.proTip}</p>
                      </div>
                    )}
                  </div>
                )
              })}

              {method.id === 'stovetop-method' && (
                <>
                  <ol>
                    {(method.steps as string[])?.map((step: string, i: number) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ol>
                  {method.additionalContent && <p>{method.additionalContent}</p>}
                </>
              )}
            </div>
          ))}

          <BlogNewsletterCTA slug="cast-iron-seasoning-care" description="Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens, including my favorite cast iron pieces and daily maintenance routine. No fluff, just the tools that actually matter." />

          {/* Cleaning Section */}
          <h2 id="cleaning" className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-orange-700" />
            {cleaningSection?.title}
          </h2>
          {cleaningSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {cleaningSection?.dishwasherIncident && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
              <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                {cleaningSection.dishwasherIncident.title}
              </p>
              <p className="mb-0">{cleaningSection.dishwasherIncident.content}</p>
            </div>
          )}

          {cleaningSection?.subsections?.map((sub) => (
            <div key={sub.id}>
              <h3>{sub.title}</h3>
              {sub.intro && <p>{sub.intro}</p>}
              {sub.steps && (
                <ol>
                  {sub.steps.map((step, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ol>
              )}
              {sub.content?.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
              {sub.additionalContent && <p>{sub.additionalContent}</p>}
              {sub.proTip && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
                  <p className="text-yellow-800 mb-0">
                    <strong>Pro tip:</strong> {sub.proTip} The <Link href="/reviews/rubbermaid-commercial-cooks-scraper" className="text-orange-700 hover:text-orange-800 underline">Rubbermaid Commercial Cook&apos;s Scraper</Link> is heat-resistant, flexible, and perfect for cleaning without damaging seasoning.
                  </p>
                </div>
              )}
              {sub.avoid && (
                <>
                  <p><strong>What to avoid:</strong></p>
                  <ul>
                    {sub.avoid.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </>
              )}
              {sub.causes && (
                <ol>
                  {sub.causes.map((cause, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: cause.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ol>
              )}
              {sub.fix && <p dangerouslySetInnerHTML={{ __html: sub.fix.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />}
            </div>
          ))}

          {/* Rusty Cast Iron Section */}
          <h2 id="rusty">{rustySection?.title}</h2>
          {rustySection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {rustySection?.restorationMethods?.map((method) => (
            <div key={method.id}>
              <h3>{method.title}</h3>
              {method.intro && <p>{method.intro}</p>}
              {method.steps && (
                <ol>
                  {method.steps.map((step, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ol>
              )}
              {method.note && <p>{method.note}</p>}
              {method.cause && <p dangerouslySetInnerHTML={{ __html: method.cause.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />}
              {method.fix && <p dangerouslySetInnerHTML={{ __html: `<strong>Fix:</strong> ${method.fix}` }} />}
              {method.explanation && <p>{method.explanation}</p>}
            </div>
          ))}

          {/* Reseason Section */}
          <h2 id="reseason">{reseasonSection?.title}</h2>
          {reseasonSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {reseasonSection?.whenNeeded && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-6 rounded-r-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-3">{reseasonSection.whenNeeded.title}</h3>
              <ul className="space-y-2">
                {reseasonSection.whenNeeded.signs.map((sign, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reseasonSection?.ovenMethod && (
            <>
              <h3>{reseasonSection.ovenMethod.title}</h3>
              <p>{reseasonSection.ovenMethod.intro}</p>
              <ol>
                {reseasonSection.ovenMethod.steps.map((step, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ol>
            </>
          )}

          {reseasonSection?.stovetopMethod && (
            <>
              <h3>{reseasonSection.stovetopMethod.title}</h3>
              <p>{reseasonSection.stovetopMethod.intro}</p>
              <ol>
                {reseasonSection.stovetopMethod.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              {reseasonSection.stovetopMethod.note && (
                <p className="text-slate-600 italic">{reseasonSection.stovetopMethod.note}</p>
              )}
            </>
          )}

          {/* Restore Section */}
          <h2 id="restore">{restoreSection?.title}</h2>
          {restoreSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {restoreSection?.assessment && (
            <>
              <h3>{restoreSection.assessment.title}</h3>
              <ul>
                {restoreSection.assessment.points.map((point, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ul>
            </>
          )}

          {restoreSection?.deepCleaning && (
            <>
              <h3>{restoreSection.deepCleaning.title}</h3>
              <p>{restoreSection.deepCleaning.intro}</p>
              {restoreSection.deepCleaning.methods.map((method, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-lg my-4">
                  <h4 className="font-bold text-slate-900 mb-2">{method.name}</h4>
                  {method.steps && (
                    <ol className="text-sm">
                      {method.steps.map((step, j) => (
                        <li key={j}>{step}</li>
                      ))}
                    </ol>
                  )}
                  {method.description && <p className="text-sm">{method.description}</p>}
                  {method.warning && (
                    <p className="text-amber-700 text-sm mt-2"><strong>Warning:</strong> {method.warning}</p>
                  )}
                </div>
              ))}
            </>
          )}

          {/* After Cooking Section */}
          <h2 id="after-cooking">{afterCookingSection?.title}</h2>
          {afterCookingSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {afterCookingSection?.immediateSteps && (
            <>
              <h3>{afterCookingSection.immediateSteps.title}</h3>
              <ol>
                {afterCookingSection.immediateSteps.steps.map((step, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ol>
            </>
          )}

          {afterCookingSection?.deglazeMethod && (
            <>
              <h3>{afterCookingSection.deglazeMethod.title}</h3>
              <p>{afterCookingSection.deglazeMethod.intro}</p>
              <ol>
                {afterCookingSection.deglazeMethod.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              {afterCookingSection.deglazeMethod.warning && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4 rounded-r-lg">
                  <p className="text-red-800 mb-0" dangerouslySetInnerHTML={{ __html: afterCookingSection.deglazeMethod.warning.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              )}
            </>
          )}

          {afterCookingSection?.whatNotToDo && (
            <>
              <h3>{afterCookingSection.whatNotToDo.title}</h3>
              <ul>
                {afterCookingSection.whatNotToDo.avoid.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ul>
            </>
          )}

          {/* Best Oils Section */}
          <h2 id="best-oils">{bestOilsSection?.title}</h2>
          {bestOilsSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {bestOilsSection?.scienceIntro && (
            <>
              <h3>{bestOilsSection.scienceIntro.title}</h3>
              <p>{bestOilsSection.scienceIntro.content}</p>
            </>
          )}

          {bestOilsSection?.comparisonTable && (
            <>
              <h3>{bestOilsSection.comparisonTable.title}</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Oil</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Best Use</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Why It Works</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bestOilsSection.comparisonTable.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{row.oil}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.bestUse}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.why}</td>
                        <td className="border border-gray-300 px-4 py-2">{'⭐'.repeat(row.rating)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-600 italic">
                For detailed smoke point information, see our <Link href="/blog/guide-cooking-oils-smoke-points" className="text-orange-700 hover:text-orange-800 underline">Guide to Cooking Oils & Smoke Points</Link>.
              </p>
            </>
          )}

          {bestOilsSection?.oilsToAvoid && (
            <>
              <h3>{bestOilsSection.oilsToAvoid.title}</h3>
              <ul>
                {bestOilsSection.oilsToAvoid.oils.map((oil, i) => (
                  <li key={i}><strong>{oil.name}:</strong> {oil.reason}</li>
                ))}
              </ul>
            </>
          )}

          {bestOilsSection?.professionalRecommendation && (
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-6 rounded-r-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-3">{bestOilsSection.professionalRecommendation.title}</h3>
              <p className="mb-0" dangerouslySetInnerHTML={{ __html: bestOilsSection.professionalRecommendation.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          )}

          {/* Mistakes Section */}
          <h2 id="mistakes">{mistakesSection?.title}</h2>
          {mistakesSection?.intro && <p>{mistakesSection.intro}</p>}

          {mistakesSection?.mistakes?.map((mistake) => (
            <div key={mistake.id}>
              <h3>{mistake.title}</h3>
              <p><strong>Problem:</strong> {mistake.problem}</p>
              {mistake.why && <p><strong>Why it happens:</strong> {mistake.why}</p>}
              <p><strong>Fix:</strong> {mistake.fix}</p>
            </div>
          ))}

          {/* Equipment Section */}
          <h2 id="equipment">{equipmentSection?.title}</h2>
          {equipmentSection?.intro && <p>{equipmentSection.intro}</p>}

          {equipmentSection?.equipmentList && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
              <p className="font-bold text-slate-800 mb-4 text-lg">Essential Cast Iron Equipment</p>
              <ul className="space-y-3">
                {equipmentSection.equipmentList.map((item, i) => (
                  <li key={i}>
                    <strong>{item.name}:</strong>{' '}
                    {item.link ? (
                      <>The <Link href={item.link} className="text-orange-700 hover:text-orange-800 underline">{item.name}</Link> {item.description}</>
                    ) : (
                      item.description
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Troubleshooting Section */}
          <h2 id="troubleshooting">{troubleSection?.title}</h2>
          {troubleSection?.troubleshootingItems && (
            <div className="space-y-4 my-8">
              {troubleSection.troubleshootingItems.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-2">{item.problem}</p>
                  <p className="text-slate-700 text-sm mb-0">{item.solution}</p>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Line Section */}
          <h2>{bottomSection?.title}</h2>
          {bottomSection?.content?.map((p, i) => <p key={i}>{p}</p>)}

          {bottomSection?.keyLessons && (
            <>
              <p><strong>The key lessons:</strong></p>
              <ul>
                {bottomSection.keyLessons.map((lesson, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: lesson.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ul>
            </>
          )}

          {bottomSection?.closing?.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <BlogFAQ questions={educationalData.faq.questions} title="Frequently Asked Questions" />

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationalData.relatedArticles.map((article, i) => (
              <Link key={i} href={article.href} className="text-orange-700 hover:text-orange-800 font-semibold">
                → {article.title}
              </Link>
            ))}
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
