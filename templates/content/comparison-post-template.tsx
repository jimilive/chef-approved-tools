import Link from 'next/link'
import { Star, CheckCircle, XCircle, TrendingUp, Shield, Award, DollarSign } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'

// TEMPLATE INSTRUCTIONS:
// 1. Update comparisonData with products being compared
// 2. Create detailed comparison table with 8-10 criteria
// 3. Add winner section for each use case
// 4. Include 3-5 images showing products side-by-side
// 5. Update SEO metadata targeting "X vs Y" keywords
// 6. Link to individual product reviews

const comparisonData = {
  title: "[PRODUCT A] vs [PRODUCT B]: Which Should You Buy?",
  slug: "[product-a-vs-product-b]",
  products: [
    {
      name: "[PRODUCT A NAME]",
      slug: "[product-a-slug]",
      brand: "[BRAND A]",
      price: 0, // Update with price
      rating: 4.5,
      bestFor: "[Best use case]",
      affiliateLink: "[AMAZON-LINK-A]",
      pros: [
        "[Pro 1]",
        "[Pro 2]",
        "[Pro 3]"
      ],
      cons: [
        "[Con 1]",
        "[Con 2]"
      ]
    },
    {
      name: "[PRODUCT B NAME]",
      slug: "[product-b-slug]",
      brand: "[BRAND B]",
      price: 0, // Update with price
      rating: 4.3,
      bestFor: "[Best use case]",
      affiliateLink: "[AMAZON-LINK-B]",
      pros: [
        "[Pro 1]",
        "[Pro 2]",
        "[Pro 3]"
      ],
      cons: [
        "[Con 1]",
        "[Con 2]"
      ]
    }
  ],
  category: "[CATEGORY]", // e.g., "Chef Knives", "Dutch Ovens"
  comparisonCriteria: [
    {
      name: "Price",
      productA: "$XX",
      productB: "$XX",
      winner: "A" // "A", "B", or "Tie"
    },
    {
      name: "Build Quality",
      productA: "[Description]",
      productB: "[Description]",
      winner: "Tie"
    },
    // Add 6-8 more criteria
  ],
  quickVerdict: {
    overallWinner: "[PRODUCT NAME]",
    budgetWinner: "[PRODUCT NAME]",
    premiumChoice: "[PRODUCT NAME]"
  }
}

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: comparisonData.category, url: `https://www.chefapprovedtools.com/reviews/${comparisonData.category.toLowerCase().replace(/\s+/g, '-')}` },
  { name: comparisonData.title, url: `https://www.chefapprovedtools.com/reviews/${comparisonData.slug}` }
]

export const metadata = {
  title: `${comparisonData.title} | Professional Chef Compares Both (2025) | Chef Approved Tools`,
  description: `Professional chef compares ${comparisonData.products[0].brand} vs ${comparisonData.products[1].brand}. Real kitchen testing reveals which is worth your money.`,
  keywords: [
    `${comparisonData.products[0].brand} vs ${comparisonData.products[1].brand}`,
    `best ${comparisonData.category.toLowerCase()}`,
    `${comparisonData.category.toLowerCase()} comparison`,
    `${comparisonData.products[0].brand} review`,
    `${comparisonData.products[1].brand} review`
  ],
  openGraph: {
    title: comparisonData.title,
    description: `Professional chef tests both. See which ${comparisonData.category.toLowerCase()} wins.`,
    images: ['/logo.png']
  }
}

export default function ComparisonPage() {
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
            {comparisonData.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xl">👨‍🍳</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Scott Bradley</p>
              <p className="text-sm text-slate-600">24 Years Professional Kitchen Experience</p>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <p className="text-slate-800 font-medium leading-relaxed">
              [WRITE A 2-3 SENTENCE SUMMARY OF YOUR COMPARISON. EXAMPLE: "After testing both the Wusthof Classic and Shun Premier for 6 months in my professional kitchen, I've identified clear winners for different use cases. Here's my honest breakdown of which knife delivers better value."]
            </p>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Quick Verdict */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Verdict</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <Award className="w-6 h-6 text-orange-600 mr-2" />
                <h3 className="font-bold text-slate-900">Overall Winner</h3>
              </div>
              <p className="text-lg font-semibold text-orange-700">{comparisonData.quickVerdict.overallWinner}</p>
              <p className="text-sm text-slate-600 mt-2">[Why it wins overall]</p>
            </div>

            <div className="bg-white border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-slate-900">Best Value</h3>
              </div>
              <p className="text-lg font-semibold text-green-700">{comparisonData.quickVerdict.budgetWinner}</p>
              <p className="text-sm text-slate-600 mt-2">[Why it's best value]</p>
            </div>

            <div className="bg-white border border-purple-200 rounded-xl p-6">
              <div className="flex items-center mb-2">
                <Shield className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="font-bold text-slate-900">Premium Choice</h3>
              </div>
              <p className="text-lg font-semibold text-purple-700">{comparisonData.quickVerdict.premiumChoice}</p>
              <p className="text-sm text-slate-600 mt-2">[Why it's premium]</p>
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison Cards */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Head-to-Head Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisonData.products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{product.brand}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{product.rating}/5</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-orange-700">${product.price}</span>
                </div>

                {/* Best For */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Best For:</p>
                  <p className="text-sm text-blue-700">{product.bestFor}</p>
                </div>

                {/* Pros & Cons */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Pros</h4>
                  <ul className="text-sm text-slate-700 space-y-1 mb-3">
                    {product.pros.map((pro, i) => (
                      <li key={i}>• {pro}</li>
                    ))}
                  </ul>
                  <h4 className="text-sm font-semibold text-red-700 mb-2">❌ Cons</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    {product.cons.map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <Link
                    href={product.affiliateLink}
                    className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center px-6 py-3 rounded-lg transition-colors"
                    rel="nofollow sponsored"
                    target="_blank"
                  >
                    Check Price on Amazon →
                  </Link>
                  <Link
                    href={`/reviews/${product.slug}`}
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-slate-700 font-medium text-center px-6 py-3 rounded-lg transition-colors"
                  >
                    Read Full Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Detailed Comparison: Feature by Feature</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">{comparisonData.products[0].brand}</th>
                  <th className="text-left p-4 font-semibold">{comparisonData.products[1].brand}</th>
                  <th className="text-center p-4 font-semibold">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.comparisonCriteria.map((criteria, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="p-4 font-medium text-slate-900">{criteria.name}</td>
                    <td className="p-4 text-slate-700">{criteria.productA}</td>
                    <td className="p-4 text-slate-700">{criteria.productB}</td>
                    <td className="p-4 text-center">
                      {criteria.winner === 'A' && <span className="text-green-600 font-semibold">✓ {comparisonData.products[0].brand}</span>}
                      {criteria.winner === 'B' && <span className="text-green-600 font-semibold">✓ {comparisonData.products[1].brand}</span>}
                      {criteria.winner === 'Tie' && <span className="text-gray-600">Tie</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Real-World Testing Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Real Kitchen Testing Results</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">My Testing Process</h3>
            <p className="text-slate-700 mb-4">
              [DESCRIBE YOUR TESTING METHODOLOGY: How long you tested, what tasks you performed, what you measured, etc.]
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Key Findings</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-1">[FINDING 1 TITLE]</h4>
                <p className="text-slate-700">[Detailed explanation of what you discovered]</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-1">[FINDING 2 TITLE]</h4>
                <p className="text-slate-700">[Detailed explanation of what you discovered]</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-1">[FINDING 3 TITLE]</h4>
                <p className="text-slate-700">[Detailed explanation of what you discovered]</p>
              </div>
            </div>
          </div>
        </section>

        {/* Which One Should You Buy? */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Which One Should You Buy?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-orange-300">
              <h3 className="font-semibold text-orange-700 mb-3 text-lg">Choose {comparisonData.products[0].name} If:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Ideal scenario 1]</li>
                <li>• [Ideal scenario 2]</li>
                <li>• [Ideal scenario 3]</li>
                <li>• [Ideal scenario 4]</li>
              </ul>
              <Link
                href={comparisonData.products[0].affiliateLink}
                className="block w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center px-6 py-3 rounded-lg transition-colors"
                rel="nofollow sponsored"
                target="_blank"
              >
                Buy {comparisonData.products[0].brand} →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
              <h3 className="font-semibold text-blue-700 mb-3 text-lg">Choose {comparisonData.products[1].name} If:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Ideal scenario 1]</li>
                <li>• [Ideal scenario 2]</li>
                <li>• [Ideal scenario 3]</li>
                <li>• [Ideal scenario 4]</li>
              </ul>
              <Link
                href={comparisonData.products[1].affiliateLink}
                className="block w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center px-6 py-3 rounded-lg transition-colors"
                rel="nofollow sponsored"
                target="_blank"
              >
                Buy {comparisonData.products[1].brand} →
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              [YOUR FINAL VERDICT: Which product wins overall and why]
            </p>
            <p className="mb-4">
              [NUANCED EXPLANATION: When each product makes sense]
            </p>
            <p className="text-orange-400 font-semibold">
              [RECOMMENDATION: Your personal pick and why]
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">More Kitchen Equipment Comparisons</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Get my free guide comparing the top 10 kitchen tools every home cook needs.
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

        {/* Structured Data */}
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
