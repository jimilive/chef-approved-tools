import Link from 'next/link'
import { CheckCircle, AlertTriangle, Lightbulb, Search, TrendingUp } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'

// TIER 3: RESEARCHED RECOMMENDATION / CURATED GUIDE
// Use this template when you:
// ✅ Haven't personally tested most products long-term
// ✅ Are compiling research from multiple sources
// ✅ Creating "best of" lists or buying guides
// ✅ Providing value through curation and organization
// ✅ May have experience with SOME products (mark those clearly)

const guideData = {
  title: "[GUIDE TITLE]", // e.g., "Best Chef Knives Under $50: Research-Based Guide"
  slug: "[guide-slug]",
  category: "[CATEGORY]",

  // TIER 3 SPECIFIC DATA
  reviewTier: "researched-recommendation",
  methodology: "Analyzed [X] products, [Y]+ customer reviews, [Z] expert sources, and professional specifications",

  researchSources: {
    productsAnalyzed: 15,
    customerReviewsAnalyzed: 10000,
    expertSourcesConsulted: 12,
    testingOrganizations: ["Cook's Illustrated", "America's Test Kitchen", "Serious Eats"] // Cite reputable sources
  },

  introduction: "[2-3 SENTENCES explaining what this guide covers and how it helps. Example: 'Finding a quality chef knife under $50 can be overwhelming with hundreds of options. I've spent 20+ hours analyzing customer reviews, expert testing, and product specifications to identify the knives that deliver professional-level performance at budget prices.']",

  topPicks: [
    {
      rank: 1,
      name: "[PRODUCT 1]",
      slug: "[product-slug]",
      brand: "[BRAND]",
      price: 45,
      bestFor: "[Specific use case - e.g., 'Best overall value']",
      customerRating: 4.7,
      customerReviews: 5234,
      personalExperience: true, // SET TO TRUE if you've actually used this one
      affiliateLink: "[AMAZON-LINK]",

      whyPicked: "[2-3 sentences explaining WHY this made the list. Cite specific data. Example: 'With 5,234 verified reviews (4.7★) and consistent praise from professional chefs, the Victorinox Fibrox Pro delivers exceptional value. Cook's Illustrated rated it their top budget pick for 3 years running, and I personally used this knife daily for 2 years—it's the real deal.']",

      keyStrengths: [
        "[Strength from research]",
        "[Feature customers consistently praise]",
        "[Value proposition]"
      ],

      considerations: [
        "[Honest limitation from reviews]",
        "[Trade-off at this price point]"
      ]
    },
    // Add 4-9 more products
  ],

  faqs: [
    {
      question: "[FAQ - target People Also Ask keyword]",
      answer: "[Comprehensive answer with your professional context where relevant]"
    },
    // Add 5-10 FAQs
  ]
}

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Guides", url: "https://www.chefapprovedtools.com/guides" },
  { name: guideData.category, url: `https://www.chefapprovedtools.com/guides/${guideData.category.toLowerCase().replace(/\s+/g, '-')}` },
  { name: guideData.title, url: `https://www.chefapprovedtools.com/guides/${guideData.slug}` }
]

export const metadata = {
  title: `${guideData.title} | Research-Based Guide 2025 | Chef Approved Tools`,
  description: `${guideData.introduction}`,
  keywords: [
    `best ${guideData.category.toLowerCase()}`,
    `${guideData.category.toLowerCase()} buying guide`,
    `top ${guideData.category.toLowerCase()}`,
    `${guideData.category.toLowerCase()} recommendations`
  ],
  openGraph: {
    title: guideData.title,
    description: guideData.introduction,
    images: ['/logo.png']
  }
}

export default function Tier3GuidePage() {
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
                  <Link href={crumb.url} className="hover:text-orange-700 transition-colors">
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
          {/* TIER 3 BADGE */}
          <div className="inline-flex items-center bg-gray-50 border-2 border-gray-400 rounded-lg px-4 py-2 mb-4">
            <Search className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-semibold">
              Researched Recommendation
            </span>
          </div>

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

          {/* TIER 3 METHODOLOGY DISCLOSURE */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Research Methodology
            </h3>
            <p className="text-blue-800 mb-3">
              <strong>This is a research-based guide.</strong> I haven't personally tested all products for 6+ months,
              but recommendations are based on extensive research and professional knowledge:
            </p>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Analyzed {guideData.researchSources.productsAnalyzed}+ products in this category</li>
              <li>• Reviewed {guideData.researchSources.customerReviewsAnalyzed.toLocaleString()}+ verified customer reviews</li>
              <li>• Consulted {guideData.researchSources.expertSourcesConsulted} expert sources including {guideData.researchSources.testingOrganizations.join(', ')}</li>
              <li>• Applied 40 years of professional kitchen experience to evaluate features and value</li>
              <li>• Products marked with ✓ indicate items I've personally used extensively</li>
            </ul>
          </div>

          {/* Introduction */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-slate-800 leading-relaxed">
              {guideData.introduction}
            </p>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Table of Contents */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ul className="space-y-2 text-slate-700">
                <li>• <a href="#quick-picks" className="text-orange-600 hover:text-orange-700">Top Picks at a Glance</a></li>
                <li>• <a href="#detailed-reviews" className="text-orange-600 hover:text-orange-700">Detailed Reviews</a></li>
                <li>• <a href="#how-to-choose" className="text-orange-600 hover:text-orange-700">How to Choose</a></li>
              </ul>
              <ul className="space-y-2 text-slate-700">
                <li>• <a href="#comparison" className="text-orange-600 hover:text-orange-700">Comparison Table</a></li>
                <li>• <a href="#faq" className="text-orange-600 hover:text-orange-700">FAQs</a></li>
                <li>• <a href="#methodology" className="text-orange-600 hover:text-orange-700">How We Tested</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Picks Summary */}
        <section id="quick-picks" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Picks at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guideData.topPicks.slice(0, 3).map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="inline-block bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  #{product.rank}
                </div>
                {product.personalExperience && (
                  <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
                    ✓ Personally Used
                  </div>
                )}
                <h3 className="font-bold text-slate-900 mb-1">{product.name}</h3>
                <p className="text-sm text-orange-600 font-semibold mb-2">{product.bestFor}</p>
                <div className="text-2xl font-bold text-slate-900 mb-3">${product.price}</div>
                <Link
                  href={product.affiliateLink}
                  className="inline-block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                  rel="nofollow sponsored"
                  target="_blank"
                >
                  View on Amazon →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Reviews */}
        <section id="detailed-reviews" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Reviews & Recommendations</h2>

          <div className="space-y-6">
            {guideData.topPicks.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      #{product.rank}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    {/* Header with badges */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-orange-600 font-semibold mb-2">{product.bestFor}</p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.personalExperience && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                              ✓ I've Used This
                            </span>
                          )}
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {product.customerReviews.toLocaleString()} Reviews
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            ★ {product.customerRating}/5
                          </span>
                        </div>
                      </div>

                      <div className="text-3xl font-bold text-orange-700 mt-2 md:mt-0">
                        ${product.price}
                      </div>
                    </div>

                    {/* Why Picked */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Why This Made the List:</h4>
                      <p className="text-slate-700 text-sm">{product.whyPicked}</p>
                    </div>

                    {/* Key Strengths & Considerations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2 text-sm">✅ Key Strengths:</h4>
                        <ul className="text-sm text-slate-700 space-y-1">
                          {product.keyStrengths.map((strength, i) => (
                            <li key={i}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2 text-sm">⚠️ Considerations:</h4>
                        <ul className="text-sm text-slate-700 space-y-1">
                          {product.considerations.map((consideration, i) => (
                            <li key={i}>• {consideration}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={product.affiliateLink}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center px-6 py-3 rounded-lg transition-colors"
                        rel="nofollow sponsored"
                        target="_blank"
                      >
                        Check Price on Amazon →
                      </Link>
                      {product.personalExperience && product.slug && (
                        <Link
                          href={`/reviews/${product.slug}`}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-slate-700 font-medium text-center px-6 py-3 rounded-lg transition-colors"
                        >
                          Read My Full Review
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200 text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-3 font-semibold">Product</th>
                  <th className="text-center p-3 font-semibold">Price</th>
                  <th className="text-center p-3 font-semibold">Rating</th>
                  <th className="text-left p-3 font-semibold">Best For</th>
                  <th className="text-center p-3 font-semibold">Experience</th>
                </tr>
              </thead>
              <tbody>
                {guideData.topPicks.map((product, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="p-3 font-medium text-slate-900">{product.name}</td>
                    <td className="p-3 text-center text-orange-700 font-semibold">${product.price}</td>
                    <td className="p-3 text-center">{product.customerRating}★ ({product.customerReviews.toLocaleString()})</td>
                    <td className="p-3 text-slate-700">{product.bestFor}</td>
                    <td className="p-3 text-center">
                      {product.personalExperience ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-400">Research</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Choose Section */}
        <section id="how-to-choose" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Choose the Right [Product]</h2>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Factor #1: [Key Decision Factor]</h3>
              <p className="text-slate-700 mb-3">
                [Explain what to consider, drawing on your professional expertise where relevant]
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-900"><strong>My take:</strong> [Your professional perspective]</p>
              </div>
            </div>

            {/* Add 3-5 more factors */}
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

        {/* Methodology Section */}
        <section id="methodology" className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Researched & Tested</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">1. Product Selection</h3>
                <p className="text-slate-700 text-sm">
                  We started with {guideData.researchSources.productsAnalyzed}+ products in this category based on Amazon
                  best-sellers, expert recommendations, and professional kitchen standards.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2. Customer Review Analysis</h3>
                <p className="text-slate-700 text-sm">
                  Analyzed {guideData.researchSources.customerReviewsAnalyzed.toLocaleString()}+ verified customer reviews,
                  focusing on patterns in 4-star and 3-star reviews for balanced perspectives.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">3. Expert Source Consultation</h3>
                <p className="text-slate-700 text-sm">
                  Consulted testing from {guideData.researchSources.testingOrganizations.join(', ')}, and
                  {guideData.researchSources.expertSourcesConsulted}+ expert sources.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">4. Professional Evaluation</h3>
                <p className="text-slate-700 text-sm">
                  Applied 40 years of professional kitchen experience to evaluate specifications, features, and value
                  propositions. Products I've personally used long-term are clearly marked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Final Recommendations</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              [Summarize your top recommendation based on research]
            </p>
            <p className="mb-4">
              [Provide guidance on which product for which user]
            </p>
            <p className="text-orange-400 font-semibold">
              [Your professional take: what you'd buy if you were shopping today]
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get More Equipment Guides</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Join thousands getting professional kitchen equipment research and buying guides.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-white text-orange-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get Free Buying Guides →
            </Link>
          </div>
        </section>

        {/* Social Proof */}
        <TestimonialsSection />

        {/* Structured Data - TIER 3: ItemList (not Review) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": guideData.topPicks.map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": product.customerRating.toString(),
                    "reviewCount": product.customerReviews.toString()
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": product.price.toString(),
                    "priceCurrency": "USD"
                  }
                }
              }))
            })
          }}
        />

        {/* FAQ Schema */}
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
