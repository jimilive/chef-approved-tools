import Link from 'next/link'
import { Star, CheckCircle, XCircle, TrendingUp, Shield, Info, Award } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import PriceDisplay from '@/components/PriceDisplay'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'

// TIER 2: RESEARCH-BASED EXPERT REVIEW
// Use this template when you:
// ✅ Haven't personally owned for 6+ months
// ✅ BUT have professional expertise with this product category
// ✅ Have researched extensively (customer reviews, specs, expert sources)
// ✅ May have brief hands-on experience
// ✅ Can provide professional context and analysis

const productData = {
  name: "[PRODUCT NAME]",
  slug: "[url-slug]",
  brand: "[BRAND]",
  model: "[MODEL-NUMBER]",

  // TIER 2 SPECIFIC DATA
  reviewTier: "expert-analysis",
  hasDirectLongTermExperience: false,
  relatedExperience: "40 years using [similar products/this category] professionally in restaurant kitchens",

  researchSources: {
    customerReviews: 5234, // Number of customer reviews analyzed
    expertReviews: 8, // Number of expert sources consulted
    handsOnTime: "30 minutes at Williams Sonoma demo", // Any brief hands-on experience
    similarProductsOwned: "[Products in same category you've used long-term]"
  },

  priceRange: {
    min: 0,
    max: 0,
    currency: "USD"
  },
  dealStatus: "normal" as const,

  // Aggregate rating from customer reviews
  customerRating: 4.7,
  customerReviewCount: 5234,

  // Your expert assessment
  expertRating: 4.5,
  category: "[CATEGORY]",

  pros: [
    "[PRO based on specs + customer feedback + your expertise]",
    "[PRO that customers consistently report]",
    "[PRO you can assess from professional knowledge]",
    "[PRO compared to similar products you HAVE used]",
    "[PRO based on technical specifications]"
  ],
  cons: [
    "[CON that appears in customer reviews consistently]",
    "[CON you can identify from specs + experience with similar products]",
    "[CON based on professional assessment]"
  ],

  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "[AMAZON-AFFILIATE-LINK]"
    }
  ],

  inStock: true,
  expertOpinion: "[2-3 SENTENCES providing professional context. Example: 'While I haven't used this specific Wusthof model long-term, I've worked with Wusthof knives professionally for two decades. Based on my experience with German steel, full-tang construction, and extensive analysis of 5,000+ customer reviews, I can provide an informed professional perspective on what makes this knife exceptional—and where it may fall short.']",
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
  title: `${productData.name} Review: Professional Chef's Expert Analysis | Chef Approved Tools`,
  description: `Professional chef analyzes ${productData.name}. Expert perspective based on ${productData.researchSources.customerReviews}+ reviews and 40 years of professional experience.`,
  keywords: [
    `${productData.brand} ${productData.category.toLowerCase()} review`,
    `${productData.name} professional review`,
    `is ${productData.brand} worth it`,
    `${productData.category.toLowerCase()} expert review`,
    `professional ${productData.category.toLowerCase()} analysis`
  ],
  openGraph: {
    title: `${productData.name}: Professional Chef's Expert Analysis`,
    description: productData.expertOpinion,
    images: ['/logo.png']
  }
}

export default function Tier2ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={2}
        testingPeriod="[RESEARCH-TIMEFRAME]" // e.g., "3 weeks of research", "extensive analysis"
        rating={productData.expertRating}
        hook="[SHORT-HOOK-SENTENCE]" // e.g., "Professional-grade features backed by 5,000+ customer reviews"
        category={productData.category}
      />

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
        {/* Header Section */}
        <header className="mb-8">
          {/* TIER 2 BADGE */}
          <div className="inline-flex items-center bg-blue-50 border-2 border-blue-500 rounded-lg px-4 py-2 mb-4">
            <Info className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold">
              Expert Analysis - Professional Perspective
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {productData.name}: [PROFESSIONAL PERSPECTIVE HEADLINE]
          </h1>

          {/* Author & Ratings */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Scott Bradley</p>
                <p className="text-sm text-slate-600">Professional Chef • 40 Years Experience Since Age 15</p>
              </div>
            </div>

            {/* Dual Rating Display */}
            <div className="flex gap-4">
              {/* Customer Rating */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-700 mb-1">{productData.customerRating}/5</div>
                  <div className="flex justify-center text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(productData.customerRating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <div className="text-xs text-slate-600">{productData.customerReviewCount.toLocaleString()} Reviews</div>
                </div>
              </div>

              {/* Expert Rating */}
              <div className="bg-orange-50 rounded-xl p-4 shadow-sm border border-orange-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-700 mb-1">{productData.expertRating}/5</div>
                  <div className="flex justify-center text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(productData.expertRating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <div className="text-xs text-slate-600">Expert Analysis</div>
                </div>
              </div>
            </div>
          </div>

          {/* TIER 2 TRANSPARENCY DISCLOSURE */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-orange-900 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              About This Review - Full Transparency
            </h3>
            <p className="text-orange-800 mb-3">
              <strong>Personal Experience:</strong> While I haven't personally owned this specific product for 6+ months,
              I'm drawing on {productData.relatedExperience}.
            </p>
            <p className="text-orange-800 mb-3">
              <strong>Research Conducted:</strong> I've analyzed {productData.researchSources.customerReviews.toLocaleString()}+
              customer reviews, {productData.researchSources.expertReviews} expert sources, and product specifications.
              {productData.researchSources.handsOnTime && (
                <span> I also had {productData.researchSources.handsOnTime}.</span>
              )}
            </p>
            <p className="text-orange-800">
              <strong>My Advantage:</strong> I can evaluate this product's features, design, and value through a professional
              lens that most reviewers lack. I know what matters in real kitchen work and can spot both quality and potential issues
              that others might miss.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-slate-800 font-medium leading-relaxed">
              {productData.expertOpinion}
            </p>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Product Image & CTA */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">[ADD PRODUCT IMAGE]</p>
              <Link
                href={productData.affiliateLinks[0].url}
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                rel="nofollow sponsored"
                target="_blank"
              >
                Check Current Price on Amazon →
              </Link>
            </div>
          </div>
        </section>

        {/* Key Features - Professional Assessment */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Professional Assessment: What Matters Most</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <TrendingUp className="w-8 h-8 text-orange-700 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[KEY FEATURE 1]</h3>
              <p className="text-sm text-slate-600">[Professional context on why this matters]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[BUILD QUALITY]</h3>
              <p className="text-sm text-slate-600">[Expert assessment of construction]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Award className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[PERFORMANCE]</h3>
              <p className="text-sm text-slate-600">[Based on specs + similar products]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <CheckCircle className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[VALUE]</h3>
              <p className="text-sm text-slate-600">[Professional value assessment]</p>
            </div>
          </div>
        </section>

        {/* Professional Analysis Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Analysis</h2>

          <div className="space-y-6">
            {/* Context from Your Experience */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">My Professional Context</h3>
              <p className="text-slate-700 mb-4">
                [Explain your experience with this category: e.g., "I've used German chef knives professionally
                for 25+ years, from Wusthof to Henckels to custom makers. I've worked with dozens of 8-inch
                chef knives in high-volume restaurants where knife performance directly impacts speed and safety."]
              </p>
              <p className="text-slate-700">
                [Mention specific similar products you've owned: e.g., "I personally own the Wusthof Classic Ikon
                and have used the Wusthof Gourmet line extensively, so I can compare this Classic model to those I
                know intimately."]
              </p>
            </div>

            {/* What Customers Report */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                What {productData.customerReviewCount.toLocaleString()}+ Customers Report
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">✅ Consistent Praise ({Math.round(productData.customerRating * 100 / 5)}% Positive)</h4>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• "[Most common positive feedback from reviews]"</li>
                    <li>• "[Specific feature customers love]"</li>
                    <li>• "[Performance aspect frequently mentioned]"</li>
                    <li>• "[Value perception from buyers]"</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">⚠️ Common Complaints</h4>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• "[Most frequent complaint]"</li>
                    <li>• "[Issue that appears repeatedly]"</li>
                    <li>• "[Expectation vs reality mismatch]"</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-slate-600 italic">
                  Data synthesized from {productData.researchSources.customerReviews.toLocaleString()} verified
                  customer reviews on Amazon, focusing on patterns from 4-star and 3-star reviews (most balanced perspectives).
                </p>
              </div>
            </div>

            {/* Your Expert Take */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">My Expert Take: What This Really Means</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">On the Positive Feedback:</h4>
                  <p className="text-slate-700">
                    [Provide professional context for what customers love. E.g., "Customers consistently praise
                    the balance, and from my experience, German knives at this price point typically nail the
                    balance because of full-tang construction. This isn't marketing fluff—it's fundamental design
                    that I can verify from the specs."]
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">On the Complaints:</h4>
                  <p className="text-slate-700">
                    [Provide context for complaints. E.g., "The complaint about edge retention is interesting.
                    X50CrMoV15 steel (what this uses) is softer than VG-10, so that's expected. But the trade-off
                    is easier sharpening—most home cooks will prefer this."]
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">What Customers Are Missing:</h4>
                  <p className="text-slate-700">
                    [Share professional insights customers might not have. E.g., "What reviews don't mention is
                    that the bolster design affects how you can sharpen this over years. Eventually, you'll need
                    to grind down the bolster or lose usable blade length—a $50 service most home cooks don't
                    anticipate."]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison to Similar Products (That You HAVE Used) */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Likely Compares to Alternatives</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> This comparison is based on my hands-on experience with {productData.researchSources.similarProductsOwned},
              published specs, and customer feedback analysis. I'm extrapolating from products I know well.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">{productData.name}</th>
                  <th className="text-left p-4 font-semibold">[Alternative You've Used] ✓</th>
                  <th className="text-left p-4 font-semibold">[Alternative You've Used] ✓</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">[Feature]</td>
                  <td className="p-4 text-slate-700">[Assessment from research]</td>
                  <td className="p-4 text-slate-700">[Your actual experience] ✓</td>
                  <td className="p-4 text-slate-700">[Your actual experience] ✓</td>
                </tr>
                {/* Add more rows */}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            ✓ = Products I've personally used long-term. Others assessed from specs, reviews, and professional knowledge.
          </p>
        </section>

        {/* Pros and Cons */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons: Expert Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-green-800 mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                Strengths
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
                Limitations
              </h3>
              <ul className="space-y-2">
                {productData.cons.map((con, index) => (
                  <li key={index} className="text-red-700 text-sm">• {con}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Current Pricing & Value Assessment</h2>
          <PriceDisplay
            productName={productData.name}
            priceRange={productData.priceRange}
            dealStatus={productData.dealStatus}
            dealText="Based on professional assessment and customer feedback analysis"
            affiliateLinks={productData.affiliateLinks}
            lastUpdated="Updated weekly"
          />
        </section>

        {/* Who Should Buy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should (and Shouldn&apos;t) Buy This</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-green-700 mb-3">✅ Likely Perfect For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Based on specs + customer feedback + your expertise]</li>
                <li>• [Use case that matches its strengths]</li>
                <li>• [User profile from customer review patterns]</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-orange-700 mb-3">⚠️ Probably Not Ideal For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Based on limitations identified]</li>
                <li>• [Use case where alternatives would be better]</li>
                <li>• [User type based on complaint patterns]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line: My Professional Recommendation</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              [Your professional verdict based on all analysis]
            </p>
            <p className="mb-4">
              [Who you'd recommend it to and why]
            </p>
            <p className="text-orange-400 font-semibold">
              [Would you buy this if you were in the market? Why or why not?]
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get More Professional Analysis</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Join thousands getting professional kitchen equipment analysis and reviews.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-white text-orange-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get Expert Insights →
            </Link>
          </div>
        </section>

        {/* Social Proof */}
        <TestimonialsSection />

        {/* Structured Data - TIER 2: Aggregate Rating + Expert Analysis */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": productData.name,
              "brand": {
                "@type": "Brand",
                "name": productData.brand
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": productData.customerRating.toString(),
                "reviewCount": productData.customerReviewCount.toString()
              },
              "review": {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Scott Bradley",
                  "jobTitle": "Professional Chef"
                },
                "reviewBody": productData.expertOpinion,
                "datePublished": productData.dateAdded
              },
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": productData.priceRange.min,
                "highPrice": productData.priceRange.max,
                "priceCurrency": productData.priceRange.currency
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
