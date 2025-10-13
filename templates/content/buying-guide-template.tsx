import Link from 'next/link'
import { CheckCircle, AlertTriangle, Lightbulb, Target, TrendingUp } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'

// TEMPLATE INSTRUCTIONS:
// 1. Focus on educational content - build authority
// 2. Include 5-7 product recommendations with affiliate links
// 3. Add FAQ section targeting "people also ask" keywords
// 4. Use comparison tables and visual aids
// 5. Link to relevant product reviews
// 6. Target informational keywords like "how to choose", "best [X] for [Y]"

const guideData = {
  title: "[GUIDE TITLE]", // e.g., "How to Choose a Chef's Knife: Complete Buyer's Guide"
  slug: "[guide-slug]",
  category: "[CATEGORY]",
  introduction: "[1-2 SENTENCE HOOK ABOUT WHY THIS GUIDE MATTERS]",
  topPicks: [
    {
      name: "[PRODUCT 1]",
      slug: "[product-slug]",
      price: 0,
      bestFor: "[Use case]",
      affiliateLink: "[LINK]",
      whyPicked: "[2-3 sentences]"
    },
    {
      name: "[PRODUCT 2]",
      slug: "[product-slug]",
      price: 0,
      bestFor: "[Use case]",
      affiliateLink: "[LINK]",
      whyPicked: "[2-3 sentences]"
    },
    // Add 3-5 more products
  ],
  faqs: [
    {
      question: "[FAQ 1 - target PAA keyword]",
      answer: "[Detailed answer with your expertise]"
    },
    {
      question: "[FAQ 2]",
      answer: "[Detailed answer]"
    },
    // Add 5-8 FAQs
  ]
}

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Guides", url: "https://www.chefapprovedtools.com/guides" },
  { name: guideData.category, url: `https://www.chefapprovedtools.com/guides/${guideData.category.toLowerCase().replace(/\s+/g, '-')}` },
  { name: guideData.title, url: `https://www.chefapprovedtools.com/guides/${guideData.slug}` }
]

export const metadata = {
  title: `${guideData.title} | Professional Chef's Guide (2025) | Chef Approved Tools`,
  description: `Learn how to choose the perfect ${guideData.category.toLowerCase()} from a professional chef with 23 years experience. Everything you need to know before buying.`,
  keywords: [
    `how to choose ${guideData.category.toLowerCase()}`,
    `${guideData.category.toLowerCase()} buying guide`,
    `best ${guideData.category.toLowerCase()}`,
    `${guideData.category.toLowerCase()} guide`,
    `professional ${guideData.category.toLowerCase()} advice`
  ],
  openGraph: {
    title: guideData.title,
    description: guideData.introduction,
    images: ['/logo.png']
  }
}

export default function BuyingGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center">
                {index > 0 && <span className="mr-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-gray-600 hover:text-orange-700 transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {guideData.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xl">👨‍🍳</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Scott Bradley</p>
              <p className="text-sm text-slate-600">Professional Chef • 40 Years Experience Since Age 15</p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <p className="text-slate-800 font-medium leading-relaxed">
              {guideData.introduction}
            </p>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Table of Contents */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">In This Guide:</h2>
            <ul className="space-y-2 text-slate-700">
              <li>• <a href="#key-factors" className="text-orange-600 hover:text-orange-700">Key Factors to Consider</a></li>
              <li>• <a href="#types" className="text-orange-600 hover:text-orange-700">Types and Styles Explained</a></li>
              <li>• <a href="#mistakes" className="text-orange-600 hover:text-orange-700">Common Buying Mistakes</a></li>
              <li>• <a href="#recommendations" className="text-orange-600 hover:text-orange-700">My Top Recommendations</a></li>
              <li>• <a href="#maintenance" className="text-orange-600 hover:text-orange-700">Care and Maintenance</a></li>
              <li>• <a href="#faq" className="text-orange-600 hover:text-orange-700">Frequently Asked Questions</a></li>
            </ul>
          </div>
        </section>

        {/* Key Factors Section */}
        <section id="key-factors" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Factors to Consider</h2>

          <div className="space-y-6">
            {/* Factor 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-orange-700">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">[FACTOR 1 TITLE]</h3>
                  <p className="text-slate-700 mb-3">
                    [DETAILED EXPLANATION OF THIS FACTOR - 3-4 sentences explaining why it matters and what to look for]
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-900"><strong>Pro Tip:</strong> [Your insider advice]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Factor 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-orange-700">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">[FACTOR 2 TITLE]</h3>
                  <p className="text-slate-700 mb-3">
                    [DETAILED EXPLANATION]
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-900"><strong>Pro Tip:</strong> [Your insider advice]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add 3-5 more factors */}
          </div>
        </section>

        {/* Types/Styles Section */}
        <section id="types" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Types and Styles Explained</h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Best For</th>
                  <th className="text-left p-4 font-semibold">Price Range</th>
                  <th className="text-left p-4 font-semibold">Pros</th>
                  <th className="text-left p-4 font-semibold">Cons</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">[TYPE 1]</td>
                  <td className="p-4 text-slate-700">[Use case]</td>
                  <td className="p-4 text-slate-700">$XX-XX</td>
                  <td className="p-4 text-green-700 text-sm">[Main pro]</td>
                  <td className="p-4 text-red-700 text-sm">[Main con]</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">[TYPE 2]</td>
                  <td className="p-4 text-slate-700">[Use case]</td>
                  <td className="p-4 text-slate-700">$XX-XX</td>
                  <td className="p-4 text-green-700 text-sm">[Main pro]</td>
                  <td className="p-4 text-red-700 text-sm">[Main con]</td>
                </tr>
                {/* Add 3-5 more types */}
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Buying Mistakes to Avoid</h2>

          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Mistake #1: [MISTAKE TITLE]</h3>
                  <p className="text-red-800 text-sm mb-2">[Why this is a mistake]</p>
                  <p className="text-red-700 text-sm"><strong>Instead:</strong> [What to do instead]</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Mistake #2: [MISTAKE TITLE]</h3>
                  <p className="text-red-800 text-sm mb-2">[Why this is a mistake]</p>
                  <p className="text-red-700 text-sm"><strong>Instead:</strong> [What to do instead]</p>
                </div>
              </div>
            </div>

            {/* Add 3-5 more mistakes */}
          </div>
        </section>

        {/* Top Recommendations Section */}
        <section id="recommendations" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Top Recommendations</h2>

          <div className="space-y-6">
            {guideData.topPicks.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-orange-600 font-semibold">{product.bestFor}</p>
                      </div>
                      <div className="text-2xl font-bold text-orange-700 mt-2 md:mt-0">
                        ${product.price}
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4">{product.whyPicked}</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={product.affiliateLink}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center px-6 py-3 rounded-lg transition-colors"
                        rel="nofollow sponsored"
                        target="_blank"
                      >
                        Check Price on Amazon →
                      </Link>
                      <Link
                        href={`/reviews/${product.slug}`}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-slate-700 font-medium text-center px-6 py-3 rounded-lg transition-colors"
                      >
                        Read Full Review
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maintenance Tips Section */}
        <section id="maintenance" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Care and Maintenance Tips</h2>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-700">Do's</h3>
                </div>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• [DO item 1]</li>
                  <li>• [DO item 2]</li>
                  <li>• [DO item 3]</li>
                  <li>• [DO item 4]</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-700">Don'ts</h3>
                </div>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• [DON'T item 1]</li>
                  <li>• [DON'T item 2]</li>
                  <li>• [DON'T item 3]</li>
                  <li>• [DON'T item 4]</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Pro Maintenance Tip</h3>
                  <p className="text-slate-700 text-sm">[Share a professional maintenance tip that most people don't know]</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {guideData.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Final Thoughts</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              [SUMMARIZE THE KEY TAKEAWAYS FROM YOUR GUIDE IN 2-3 SENTENCES]
            </p>
            <p className="mb-4">
              [ADD YOUR PERSONAL RECOMMENDATION]
            </p>
            <p className="text-orange-400 font-semibold">
              [END WITH AN ACTIONABLE NEXT STEP]
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Want My Complete Equipment Guide?</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Get my comprehensive 50-page guide covering everything you need to know about buying professional-quality kitchen equipment.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-white text-orange-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Download Free Guide →
            </Link>
          </div>
        </section>

        {/* Social Proof */}
        <TestimonialsSection />

        {/* Structured Data for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": guideData.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
          }}
        />
      </article>
    </div>
  )
}
