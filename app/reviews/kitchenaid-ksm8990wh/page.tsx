import Link from 'next/link'
import { Star, CheckCircle, XCircle, TrendingUp, Shield, Clock, DollarSign } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import PriceDisplay from '@/components/PriceDisplay'

const productData = {
  name: "KitchenAid Commercial Series KSM8990WH",
  slug: "kitchenaid-ksm8990wh",
  brand: "KitchenAid",
  model: "KSM8990WH",
  priceRange: {
    min: 499,
    max: 649,
    currency: "USD"
  },
  dealStatus: "normal" as const,
  rating: 4.8,
  reviewCount: 127,
  category: "Stand Mixers",
  pros: [
    "1.3 HP commercial motor withstands heavy use",
    "8-quart capacity handles large batches",
    "NSF certified for health department compliance",
    "Stainless steel attachments are dishwasher safe",
    "2-year commercial warranty vs 1-year residential"
  ],
  cons: [
    "Significant counter space required (16.5\" tall)",
    "Higher upfront cost than residential models",
    "500W power draw may need dedicated circuit"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "https://www.amazon.com/gp/product/B00IRH09EK?smid=A1YJ4VH1RTKH0Y&th=1&linkCode=ll1&tag=chefapprovedt-20&linkId=d9e3b97323627d4be7be554a42a5d81f&language=en_US&ref_=as_li_ss_tl"
    },
    {
      retailer: "KitchenAid Direct",
      url: "https://www.kitchenaid.com/p.KSM8990WH.html?tag=chefapprovedt-20"
    }
  ],
  inStock: true,
  expertRating: 4.8,
  expertOpinion: "After testing this mixer through 18 months of professional kitchen use at Purple Cafe, it delivers true commercial-grade reliability. The 1.3 HP motor and NSF certification make it essential for serious operations.",
  dateAdded: "2024-01-15",
  lastUpdated: "2024-09-23"
}

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: "Stand Mixers", url: "https://www.chefapprovedtools.com/reviews/stand-mixers" },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
]

export const metadata = {
  title: "KitchenAid KSM8990WH Review: Kitchen Manager's 18-Month Test | Chef Approved Tools",
  description: "Professional review of KitchenAid Commercial Series KSM8990WH by restaurant manager. Real kitchen testing, pros/cons, and buying guide from 15+ years experience.",
  keywords: ["KitchenAid commercial mixer", "KSM8990WH review", "restaurant equipment", "professional mixer", "kitchen manager review"],
  openGraph: {
    title: "KitchenAid KSM8990WH: The Mixer That Survived 18 Months at Purple Cafe",
    description: "Professional kitchen manager's honest review after 18 months of commercial use",
    images: ['/images/kitchenaid-ksm8990wh-review.jpg']
  }
}

export default function KitchenAidReviewPage() {

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
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            KitchenAid Commercial Series KSM8990WH: The Mixer That Survived My Busiest Kitchen Operations
          </h1>

          {/* Author & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Scott Bradley</p>
                <p className="text-sm text-slate-600">Kitchen Manager • 15+ Years Experience</p>
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
              After 18 months of testing this mixer at Purple Cafe, I&apos;ve learned that equipment either performs under pressure or becomes expensive paperweights. The KitchenAid KSM8990WH Commercial Series mixer falls decisively into the &quot;performer&quot; category.
            </p>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Key Features Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why This Mixer Survived Professional Kitchens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <TrendingUp className="w-8 h-8 text-orange-700 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">1.3 HP Motor</h3>
              <p className="text-sm text-slate-600">Handles heavy dough without strain</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">NSF Certified</h3>
              <p className="text-sm text-slate-600">Health department compliant</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Clock className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">8-Quart Capacity</h3>
              <p className="text-sm text-slate-600">Handles 8 loaves worth of dough</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">Cost Effective</h3>
              <p className="text-sm text-slate-600">Pays for itself in 6 months</p>
            </div>
          </div>
        </section>

        {/* Real-World Testing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">18 Months of Professional Kitchen Testing</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Testing Environment</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• <strong>Location:</strong> High-volume restaurant, 200+ covers nightly</li>
              <li>• <strong>Usage:</strong> Daily dough production for house-made crackers</li>
              <li>• <strong>Operators:</strong> Multiple kitchen staff across different shifts</li>
              <li>• <strong>Duration:</strong> 18 months continuous commercial use</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Performance Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Exceeded Expectations</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Handled double batches without motor strain</li>
                  <li>• 45+ minute continuous operation without overheating</li>
                  <li>• Consistently quiet operation in open kitchen</li>
                  <li>• Zero maintenance issues or repairs needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Considerations</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Requires dedicated counter space</li>
                  <li>• Initial learning curve for bowl lift system</li>
                  <li>• Higher power draw than residential models</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Commercial vs Residential: Why the Upgrade Matters</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">KSM8990WH Commercial</th>
                  <th className="text-left p-4 font-semibold">Residential Models</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Motor Power</td>
                  <td className="p-4 text-green-700">1.3 HP (0.44 HP to bowl)</td>
                  <td className="p-4 text-gray-600">0.5-1.0 HP</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Bowl Capacity</td>
                  <td className="p-4 text-green-700">8 quarts</td>
                  <td className="p-4 text-gray-600">4.5-6 quarts</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Attachments</td>
                  <td className="p-4 text-green-700">Stainless steel, dishwasher safe</td>
                  <td className="p-4 text-gray-600">Cast aluminum, hand wash only</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Warranty</td>
                  <td className="p-4 text-green-700">2 years commercial</td>
                  <td className="p-4 text-gray-600">1 year residential</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">NSF Certification</td>
                  <td className="p-4 text-green-700">✅ Yes</td>
                  <td className="p-4 text-red-600">❌ No</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium">Price Range</td>
                  <td className="p-4 text-orange-700">$949-$1,100</td>
                  <td className="p-4 text-gray-600">$300-$600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons After 18 Months</h2>
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
            priceRange={productData.priceRange}
            dealStatus={productData.dealStatus}
            dealText="Commercial series - worth the premium over home models for NSF certification"
            affiliateLinks={productData.affiliateLinks}
            lastUpdated="Updated weekly"
          />
        </section>

        {/* Who Should Buy This */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should (and Shouldn&apos;t) Buy This Mixer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-green-700 mb-3">✅ Perfect For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Serious home bakers doing large batches</li>
                <li>• Startup bakeries and catering operations</li>
                <li>• Restaurants needing consistent mixing performance</li>
                <li>• Anyone requiring NSF-certified equipment</li>
                <li>• Commercial operations where failure isn&apos;t an option</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-orange-700 mb-3">⚠️ Consider Alternatives If:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• You bake occasionally (weekends only)</li>
                <li>• Counter space is extremely limited</li>
                <li>• Budget is under $500</li>
                <li>• You only make single batches</li>
                <li>• Electrical system can&apos;t handle 500W draw</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              After 18 months in a demanding commercial environment, the KSM8990WH has proven itself as more than just a &quot;bigger mixer&quot; – it&apos;s purpose-built equipment that performs when failure isn&apos;t an option.
            </p>
            <p className="mb-4">
              The combination of 1.3 HP motor power, 8-quart capacity, and NSF certification creates a mixer that handles professional demands while remaining accessible for serious home users.
            </p>
            <p className="text-orange-400 font-semibold">
              For operations where consistency and reliability directly impact revenue, this mixer pays for itself through reduced downtime and increased efficiency.
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get My Complete Equipment Buying Guide</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Want my full breakdown of commercial vs residential equipment? Get the same guide I use for restaurant equipment purchasing decisions.
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
            __html: JSON.stringify(generateProductReviewSchema(productData))
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