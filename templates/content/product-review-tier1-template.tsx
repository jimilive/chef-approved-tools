import Link from 'next/link'
import { Star, CheckCircle, XCircle, TrendingUp, Shield, Clock, Award } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'

// TIER 1: PROFESSIONAL TESTING REVIEW
// Use this template ONLY when you have:
// ✅ Personally owned/used the product for 6+ months
// ✅ Professional environment testing
// ✅ Extensive hands-on experience
// ✅ Can provide specific long-term performance data

const productData = {
  name: "[PRODUCT NAME]",
  slug: "[url-slug]",
  brand: "[BRAND]",
  model: "[MODEL-NUMBER]",

  // TIER 1 SPECIFIC DATA
  reviewTier: "professional-testing",
  testingPeriod: "18 months", // BE SPECIFIC
  testingEnvironment: "High-volume restaurant kitchen, 200+ covers nightly",
  purchaseDate: "2023-03-15", // When you got it
  personalOwnership: true,
  testingDetails: {
    frequency: "Daily use, 6 days per week",
    tasks: ["Dough mixing", "Bread production", "Whipped cream", "Cookie batches"],
    volume: "Processed 500+ batches during testing period"
  },

  dealStatus: "normal" as const,
  rating: 4.8, // YOUR rating after long-term use
  reviewCount: 1,
  category: "[CATEGORY]",

  pros: [
    "[SPECIFIC PRO from your experience - e.g., 'Motor never strained even with quadruple batches']",
    "[LONG-TERM PRO - e.g., 'Still operating quietly after 18 months of daily use']",
    "[DURABILITY PRO - e.g., 'Coating shows minimal wear despite commercial dishwasher']",
    "[MAINTENANCE PRO - e.g., 'Required zero maintenance beyond basic cleaning']",
    "[VALUE PRO - e.g., 'Paid for itself within 6 months of reduced labor time']"
  ],
  cons: [
    "[HONEST CON from experience - e.g., 'Handle heated up during 45+ minute operations']",
    "[LIMITATION you discovered - e.g., 'Bowl capacity limiting for our busiest services']",
    "[WEAR PATTERN - e.g., 'Non-stick coating showing wear in high-heat areas']"
  ],

  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "[AMAZON-AFFILIATE-LINK]"
    }
  ],

  inStock: true,
  expertRating: 4.8,
  expertOpinion: "[2-3 SENTENCES about your SPECIFIC experience. Include testing duration and key finding. Example: 'After 18 months of daily use in our high-volume restaurant, this mixer has proven itself as more than reliable—it's become essential. The motor handled our most demanding batches without complaint, and maintenance has been virtually zero.']",
  dateAdded: new Date().toISOString().split('T')[0],
  lastUpdated: new Date().toISOString().split('T')[0]
}

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: productData.category, url: `https://www.chefapprovedtools.com/reviews/${productData.category.toLowerCase().replace(/\s+/g, '-')}` },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
]

export const metadata = {
  title: `${productData.name} Review: ${productData.testingPeriod} of Professional Testing | Chef Approved Tools`,
  description: `Professional chef reviews ${productData.name} after ${productData.testingPeriod} of real kitchen use. Honest pros, cons, and performance data from extensive testing.`,
  keywords: [
    `${productData.brand} ${productData.category.toLowerCase()} review`,
    `${productData.name} professional review`,
    `${productData.brand} long term review`,
    `is ${productData.brand} ${productData.category.toLowerCase()} worth it`,
    `${productData.category.toLowerCase()} professional testing`
  ],
  openGraph: {
    title: `${productData.name}: ${productData.expertRating}/5 After ${productData.testingPeriod}`,
    description: productData.expertOpinion,
    images: ['/logo.png']
  }
}

export default function Tier1ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={1}
        testingPeriod={productData.testingPeriod}
        rating={productData.rating}
        hook="[SHORT-HOOK-SENTENCE]" // e.g., "Still performing flawlessly after 18 months of daily professional use"
        category={productData.category}
      />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex space-x-2 text-sm text-gray-700">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center">
                {index > 0 && <span className="mr-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-gray-700 hover:text-orange-700 transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <header className="mb-8">
          {/* TIER 1 BADGE */}
          <div className="inline-flex items-center bg-green-50 border-2 border-green-500 rounded-lg px-4 py-2 mb-4">
            <Award className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">
              ✓ Professionally Tested - {productData.testingPeriod}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {productData.name}: [COMPELLING HEADLINE ABOUT YOUR TESTING EXPERIENCE]
          </h1>

          {/* Author & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Scott Bradley</p>
                <p className="text-sm text-slate-700">Professional Chef • 45 Years Experience</p>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-700 mb-1">{productData.expertRating}/5</div>
                <div className="flex justify-center text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.expertRating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <div className="text-xs text-slate-700">After {productData.testingPeriod}</div>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
            <p className="text-slate-800 font-medium leading-relaxed">
              {productData.expertOpinion}
            </p>
          </div>

          {/* TIER 1 OWNERSHIP DISCLOSURE */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-semibold text-green-900 mb-2">About This Review</h3>
            <p className="text-sm text-green-800">
              I personally purchased this product [OR: This product was provided by {productData.brand} for testing purposes]
              and have used it for {productData.testingPeriod} in {productData.testingEnvironment}.
              This review reflects my direct, hands-on experience with long-term professional use.
              All opinions are my own based on extensive testing.
            </p>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* TODO: Add YOUR product images here */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-4">[ADD YOUR PRODUCT IMAGES - Show wear/use from testing period]</p>
              <Link
                href={productData.affiliateLinks[0].url}
                className="inline-block bg-orange-600 hover:bg-orange-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                rel="nofollow sponsored"
                target="_blank"
              >
                Check Current Price on Amazon →
              </Link>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What I Learned After {productData.testingPeriod}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <TrendingUp className="w-8 h-8 text-orange-700 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[FEATURE 1 FROM EXPERIENCE]</h3>
              <p className="text-sm text-slate-700">[What you learned about this feature]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[DURABILITY FINDING]</h3>
              <p className="text-sm text-slate-700">[Long-term durability observation]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Clock className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[EFFICIENCY/TIME]</h3>
              <p className="text-sm text-slate-700">[Time savings or efficiency gains]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Award className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[VALUE ASSESSMENT]</h3>
              <p className="text-sm text-slate-700">[ROI or value over testing period]</p>
            </div>
          </div>
        </section>

        {/* TIER 1 EXCLUSIVE: Detailed Testing Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{productData.testingPeriod} of Professional Kitchen Testing</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <h3 className="text-xl font-semibold text-slate-900 mb-4">Testing Environment</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Location:</strong> {productData.testingEnvironment}</li>
                <li>• <strong>Duration:</strong> {productData.testingPeriod} ({productData.purchaseDate} to present)</li>
                <li>• <strong>Frequency:</strong> {productData.testingDetails.frequency}</li>
                <li>• <strong>Volume:</strong> {productData.testingDetails.volume}</li>
                <li>• <strong>Primary Tasks:</strong> {productData.testingDetails.tasks.join(', ')}</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4">Week 1 vs. Month 6 vs. Now</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-2">Week 1: First Impressions</h4>
                <p className="text-slate-700">[What you thought initially - be honest if you had doubts or concerns]</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-2">Month 6: Breaking In Period</h4>
                <p className="text-slate-700">[How performance changed after 6 months - better? worse? any issues emerged?]</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-2">Now ({productData.testingPeriod}): Long-Term Reality</h4>
                <p className="text-slate-700">[Current state - wear patterns, performance changes, maintenance needed]</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Performance Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Exceeded Expectations</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• [SPECIFIC finding from your testing]</li>
                  <li>• [MEASURED result - numbers, times, quantities]</li>
                  <li>• [DURABILITY observation]</li>
                  <li>• [RELIABILITY data]</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Honest Limitations</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• [REAL limitation you discovered]</li>
                  <li>• [WEAR or degradation observed]</li>
                  <li>• [SITUATION where it struggled]</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Specific Use Cases Tested</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">[USE CASE 1]</h4>
                <p className="text-sm text-slate-700 mb-2">[Describe the task in detail]</p>
                <p className="text-sm"><strong>Result:</strong> [Performance rating and specific observations]</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">[USE CASE 2]</h4>
                <p className="text-sm text-slate-700 mb-2">[Describe the task in detail]</p>
                <p className="text-sm"><strong>Result:</strong> [Performance rating and specific observations]</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">[USE CASE 3]</h4>
                <p className="text-sm text-slate-700 mb-2">[Describe the task in detail]</p>
                <p className="text-sm"><strong>Result:</strong> [Performance rating and specific observations]</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Maintenance & Care Log</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-slate-700 mb-3">
                <strong>Cleaning frequency:</strong> [How often you cleaned it]
              </p>
              <p className="text-slate-700 mb-3">
                <strong>Repairs needed:</strong> [Any repairs or part replacements - be honest!]
              </p>
              <p className="text-slate-700 mb-3">
                <strong>Maintenance required:</strong> [Regular maintenance tasks]
              </p>
              <p className="text-slate-700">
                <strong>Total maintenance cost:</strong> $[Amount] over {productData.testingPeriod}
              </p>
            </div>
          </div>
        </section>

        {/* Comparison to Alternatives (that you've ALSO used) */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Compares to Alternatives I've Used</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">{productData.name}</th>
                  <th className="text-left p-4 font-semibold">[Alternative 1 You've Used]</th>
                  <th className="text-left p-4 font-semibold">[Alternative 2 You've Used]</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">[Feature 1]</td>
                  <td className="p-4 text-slate-700">[Your experience]</td>
                  <td className="p-4 text-slate-700">[Your experience]</td>
                  <td className="p-4 text-slate-700">[Your experience]</td>
                </tr>
                {/* Add more comparison rows based on YOUR experience with all products */}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 mt-3">
            * All comparisons based on my personal hands-on experience with each product
          </p>
        </section>

        {/* Pros and Cons (From Real Experience) */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons After {productData.testingPeriod}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-green-800 mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                What Impressed Me
              </h3>
              <ul className="space-y-2">
                {productData.pros.map((pro, index) => (
                  <li key={index} className="text-green-700 text-sm">• {pro}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-red-800 mb-4">
                <XCircle className="w-5 h-5 mr-2" />
                Honest Limitations
              </h3>
              <ul className="space-y-2">
                {productData.cons.map((con, index) => (
                  <li key={index} className="text-red-700 text-sm">• {con}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Things I Wish I Knew Before Buying */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What I Wish I Knew Before Buying</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
            <ul className="space-y-3 text-slate-700">
              <li><strong>1.</strong> [Something you learned that would have influenced your purchase decision or setup]</li>
              <li><strong>2.</strong> [A limitation that wasn't obvious from specs or initial testing]</li>
              <li><strong>3.</strong> [An accessory or companion product that proved essential]</li>
              <li><strong>4.</strong> [A usage tip that took you months to discover]</li>
            </ul>
          </div>
        </section>

        {/* Pricing and Where to Buy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Current Pricing & Where to Buy</h2>
          <PriceDisplay
            productName={productData.name}
            dealStatus={productData.dealStatus}
            dealText={`After ${productData.testingPeriod} of use, I believe this is worth the investment for [specific use case]`}
            affiliateLinks={productData.affiliateLinks}
            lastUpdated="Updated weekly"
          />
        </section>

        {/* Who Should Buy This (Based on Your Experience) */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should (and Shouldn&apos;t) Buy This</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-green-700 mb-3">✅ Perfect For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Based on your experience, who would benefit most]</li>
                <li>• [Specific use case that worked great]</li>
                <li>• [User profile that matches its strengths]</li>
                <li>• [Scenario where you'd recommend it]</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-orange-700 mb-3">⚠️ Not Ideal For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Based on limitations you discovered]</li>
                <li>• [Use case where it struggled]</li>
                <li>• [User type who wouldn't utilize its strengths]</li>
                <li>• [Scenario where an alternative would be better]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Line: Would I Buy It Again? */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line: Would I Buy It Again?</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              <strong>[YES/NO/MAYBE]</strong> - [Explain why based on your {productData.testingPeriod} experience]
            </p>
            <p className="mb-4">
              [Be honest about value vs. cost after long-term use. Would you spend the money again knowing what you know now?]
            </p>
            <p className="text-orange-400 font-semibold">
              [Final recommendation: Who should buy this and in what situation?]
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get More Long-Term Testing Reviews</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Join 5,000+ chefs and home cooks getting my weekly equipment reviews based on real, long-term professional testing.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-white text-orange-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get Professional Testing Updates →
            </Link>
          </div>
        </section>

        {/* Social Proof */}
        <TestimonialsSection />

        {/* Structured Data - TIER 1: Full Personal Review */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "Product",
                "name": productData.name,
                "brand": {
                  "@type": "Brand",
                  "name": productData.brand
                }
              },
              "author": {
                "@type": "Person",
                "name": "Scott Bradley",
                "jobTitle": "Professional Chef",
                "description": "23 years of professional culinary experience"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": productData.expertRating.toString(),
                "bestRating": "5",
                "worstRating": "1"
              },
              "reviewBody": productData.expertOpinion,
              "datePublished": productData.dateAdded,
              "publisher": {
                "@type": "Organization",
                "name": "Chef Approved Tools"
              }
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
