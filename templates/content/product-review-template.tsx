import Link from 'next/link'
import { Star, CheckCircle, XCircle, TrendingUp, Shield, Clock, DollarSign } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import PriceDisplay from '@/components/PriceDisplay'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'

// TEMPLATE INSTRUCTIONS:
// 1. Update productData with your product info
// 2. Customize testing period and environment
// 3. Add 5-7 unique images (convert to WebP)
// 4. Update affiliate links with your tracking IDs
// 5. Adjust SEO metadata for target keywords
// 6. Add internal links to related products/guides

const productData = {
  name: "[PRODUCT NAME]", // e.g., "Wusthof Classic 8-Inch Chef's Knife"
  slug: "[URL-SLUG]", // e.g., "wusthof-classic-8-inch-chef-knife"
  brand: "[BRAND]",
  model: "[MODEL-NUMBER]",
  dealStatus: "normal" as const, // "normal" | "deal" | "limited"
  rating: 4.5, // Your expert rating out of 5
  reviewCount: 1, // Number of reviews you've done
  category: "[CATEGORY]", // e.g., "Chef Knives", "Dutch Ovens", "Stand Mixers"
  pros: [
    "[PRO 1 - Be specific]",
    "[PRO 2 - Mention durability or performance]",
    "[PRO 3 - Note value or warranty]",
    "[PRO 4 - Add use case benefit]",
    "[PRO 5 - Include maintenance ease]"
  ],
  cons: [
    "[CON 1 - Be honest about limitations]",
    "[CON 2 - Mention price if relevant]",
    "[CON 3 - Note any use case restrictions]"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "[AMAZON-AFFILIATE-LINK]" // Include your tag: ?tag=chefapprovedt-20
    }
  ],
  inStock: true,
  expertRating: 4.5,
  expertOpinion: "[2-3 SENTENCE SUMMARY OF YOUR EXPERIENCE WITH THE PRODUCT]",
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
  title: `${productData.name} Review 2025: Professional Chef's Honest Opinion | Chef Approved Tools`,
  description: `Professional chef reviews ${productData.name}. Tested in real kitchen for [X] weeks. Pros, cons, and whether it's worth your money.`,
  keywords: [
    `${productData.brand} ${productData.category.toLowerCase()}`,
    `${productData.name} review`,
    `best ${productData.category.toLowerCase()}`,
    `professional ${productData.category.toLowerCase()}`,
    `${productData.brand} review`
  ],
  openGraph: {
    title: `${productData.name}: ${productData.expertRating}/5 After [X] Months of Professional Use`,
    description: productData.expertOpinion,
    images: ['/logo.png'] // TODO: Add actual product image
  }
}

export default function ProductReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={1} // Update: 1 for professional testing, 2 for expert analysis
        testingPeriod="[TESTING-PERIOD]" // e.g., "6 months", "2 years"
        rating={productData.rating}
        hook="[SHORT-HOOK-SENTENCE]" // e.g., "Professional-grade performance at home-cook price"
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
                <p className="text-sm text-slate-600">Professional Chef • 45 Years Experience</p>
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
                <div className="text-xs text-slate-600">Chef Approved Rating</div>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
            <p className="text-slate-800 font-medium leading-relaxed">
              {productData.expertOpinion}
            </p>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* TODO: Add product image with CTA */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            {/* Add your product image here */}
            <div className="text-center mb-4">
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

        {/* Key Features Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why [PRODUCT] Stands Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <TrendingUp className="w-8 h-8 text-orange-700 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[FEATURE 1]</h3>
              <p className="text-sm text-slate-600">[Benefit description]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[FEATURE 2]</h3>
              <p className="text-sm text-slate-600">[Benefit description]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Clock className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[FEATURE 3]</h3>
              <p className="text-sm text-slate-600">[Benefit description]</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">[FEATURE 4]</h3>
              <p className="text-sm text-slate-600">[Benefit description]</p>
            </div>
          </div>
        </section>

        {/* Real-World Testing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">[X] Months of Professional Kitchen Testing</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Testing Environment</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• <strong>Location:</strong> [Your kitchen/restaurant name]</li>
              <li>• <strong>Usage:</strong> [How you used it daily]</li>
              <li>• <strong>Duration:</strong> [Testing period]</li>
              <li>• <strong>Comparison:</strong> [What you compared it against]</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Performance Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Exceeded Expectations</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• [Specific performance win 1]</li>
                  <li>• [Specific performance win 2]</li>
                  <li>• [Specific performance win 3]</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Considerations</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• [Honest limitation 1]</li>
                  <li>• [Honest limitation 2]</li>
                  <li>• [Honest limitation 3]</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-green-800 mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                What I Love
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
                Limitations to Consider
              </h3>
              <ul className="space-y-2">
                {productData.cons.map((con, index) => (
                  <li key={index} className="text-red-700 text-sm">• {con}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing and Where to Buy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Current Pricing & Where to Buy</h2>
          <PriceDisplay
            productName={productData.name}
            dealStatus={productData.dealStatus}
            dealText="[ADD DEAL TEXT OR VALUE PROPOSITION]"
            affiliateLinks={productData.affiliateLinks}
            lastUpdated="Updated weekly"
          />
        </section>

        {/* Who Should Buy This */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should (and Shouldn&apos;t) Buy This</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-green-700 mb-3">✅ Perfect For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Ideal customer 1]</li>
                <li>• [Ideal customer 2]</li>
                <li>• [Ideal customer 3]</li>
                <li>• [Ideal customer 4]</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-orange-700 mb-3">⚠️ Consider Alternatives If:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• [Wrong customer 1]</li>
                <li>• [Wrong customer 2]</li>
                <li>• [Wrong customer 3]</li>
                <li>• [Wrong customer 4]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              [SUMMARIZE YOUR OVERALL VERDICT IN 2-3 SENTENCES]
            </p>
            <p className="mb-4">
              [EXPLAIN THE VALUE PROPOSITION]
            </p>
            <p className="text-orange-400 font-semibold">
              [FINAL RECOMMENDATION - WHO SHOULD BUY]
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get More Professional Kitchen Insights</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Join 5,000+ chefs and home cooks getting my weekly equipment reviews and kitchen tips.
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
            __html: JSON.stringify(generateProductSchema(productData))
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
