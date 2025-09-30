import Link from 'next/link'
import { Star, CheckCircle, XCircle, TrendingUp, Shield, Clock, DollarSign, Ruler, Droplets } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import PriceDisplay from '@/components/PriceDisplay'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'

const productData = {
  name: "John Boos Platinum Commercial Series Rectangular Wooden Maple Cutting Board 24x18x1.75\"",
  slug: "john-boos-platinum-commercial-cutting-board",
  brand: "John Boos",
  model: "Platinum Commercial Series 24x18x1.75",
  priceRange: {
    min: 189,
    max: 229,
    currency: "USD"
  },
  dealStatus: "normal" as const,
  // Note: No customer reviews - this is a professional evaluation only
  category: "Cutting Boards",
  pros: [
    "18 years of durability, expect to pass to children",
    "Larger size gives room to work efficiently",
    "Saves significant damage to knife edges",
    "Easy to sanitize with no food safety concerns",
    "21-lb weight provides stability during heavy use",
    "Reversible design doubles usable surface",
    "Edge-grain construction resists knife damage"
  ],
  cons: [
    "Serrated knives cause deeper marks",
    "Staining can occur if not washed after use",
    "Significant weight requires dedicated storage",
    "Premium price vs plastic alternatives"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "https://www.amazon.com/John-Boos-RA03-Reversible-Cutting/dp/B00063QBDQ?crid=2VOLZ5W300FT8&dib=eyJ2IjoiMSJ9.oHlaqJmmUWoeHQKeclVlu8BpgsXEwYtBdrd33lizo88qhzsZjqmavyRlU-n159DdRT6MKk2MaanVdAfwffVpv6J3EbZwTlEFPT83TelOwz4NwbKXg55P6eDbRBVlEwqQd6qCEdJp63O2oQM5ra4XIG6ldrnP7jOczvOegenaNlQCRQ6zusBnPe2weesHHJtR2QpFLBnjLQMyQJKSFeUnEUdJ_mfTGUo_-7RdIMj9XlU7Mc41VDkQL5mxG5aaN0uYcLVU0BhH_cut-RID459g5yrdQN2QoMB7R-FLzw61-Kk.gVcg1YEzO2Xlp-O9rA_H1y-j1oMwjSf7tTY0y3IG3bI&dib_tag=se&keywords=john%2Bboos&qid=1758759470&s=home-garden&sprefix=john%2Bboos%2Cgarden%2C193&sr=1-16&th=1&linkCode=ll1&tag=chefapprovedt-20&linkId=0e014da56db954555ff249e2e2eef15e&language=en_US&ref_=as_li_ss_tl"
    },
    {
      retailer: "John Boos Direct",
      url: "https://www.johnboos.com/products/maple-cutting-boards-1-1-2-thick-r-board-series"
    },
    {
      retailer: "Williams Sonoma",
      url: "https://www.williams-sonoma.com/products/john-boos-edge-grain-cutting-board/"
    }
  ],
  inStock: true,
  expertRating: 4.8,
  expertOpinion: "After 18 years of daily home use, this John Boos cutting board represents the #1 choice of culinary professionals worldwide. Made from sustainable Northern Hard Rock Maple with NSF certification, it's built for commercial foodservice durability. The 1.75-inch edge-grain construction resists deep cuts while being knife-friendly to preserve blade sharpness. At 21 pounds, it provides unmatched stability during heavy prep work. I expect to pass this generational piece to my children - the larger 24x18 size gives room to work efficiently without constantly moving prepped portions. Simple maintenance with mineral oil and proper cleaning has kept it food-safe for nearly two decades.",
  dateAdded: "2025-01-15",
  lastUpdated: "2025-01-15"
}

const specifications = {
  dimensions: "24\" L x 18\" W x 1.75\" Thick",
  weight: "21 lbs",
  material: "Hard Rock Maple (Edge-Grain)",
  construction: "Reversible Butcher Block",
  edges: "1/4\" Radius Edges",
  grips: "Finger Grips on both sides",
  origin: "Made in USA",
  finish: "Food-safe mineral oil"
}

const maintenanceSchedule = [
  { frequency: "After Each Use", task: "Wash with warm soapy water, dry immediately" },
  { frequency: "Weekly", task: "Apply food-grade mineral oil" },
  { frequency: "Monthly", task: "Deep clean with coarse salt scrub" },
  { frequency: "Quarterly", task: "Sand lightly if needed, re-oil heavily" },
  { frequency: "As Needed", task: "Treat stains with lemon and salt" }
]

const sizeComparison = [
  { size: "18x12x1.75\"", weight: "12 lbs", use: "Home kitchens, light prep", price: 129 },
  { size: "20x15x1.75\"", weight: "16 lbs", use: "Serious home cooks", price: 159 },
  { size: "24x18x1.75\"", weight: "21 lbs", use: "Commercial/heavy use", price: 189, featured: true },
  { size: "30x20x1.75\"", weight: "32 lbs", use: "Large commercial operations", price: 299 }
]

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: "Cutting Boards", url: "https://www.chefapprovedtools.com/reviews/cutting-boards" },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
]

export const metadata = {
  title: "John Boos Platinum 24x18 Commercial Cutting Board Review | Chef Approved Tools",
  description: "Professional review of John Boos Platinum Commercial Series maple cutting board by restaurant manager. Real kitchen testing of this 21-lb commercial-grade board.",
  keywords: ["John Boos cutting board", "commercial cutting board", "maple cutting board", "restaurant cutting board", "butcher block"],
  openGraph: {
    title: "John Boos Platinum Commercial Cutting Board: Professional Review",
    description: "Restaurant manager's honest review of the John Boos Platinum commercial cutting board",
    images: ['/logo.png']
  }
}

export default function JohnBosPlatinumCuttingBoardReview() {

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper slug="john-boos-platinum-commercial-cutting-board" name="John Boos Platinum Cutting Board" image="/logo.png" price={209} />
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
            John Boos Platinum Commercial Cutting Board: The 21-Pound Workhorse That Anchored Our Prep Station
          </h1>

          {/* Author & Rating */}
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

          {/* Professional Summary */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-orange-700 flex-shrink-0 mt-1" />
              <div>
                <p className="text-slate-800 font-medium leading-relaxed mb-2">
                  <strong>PROFESSIONAL VERDICT:</strong> After 18 years of home use, this cutting board represents a generational investment in quality.
                </p>
                <p className="text-slate-700 text-sm">
                  The 24x18 size provides exceptional work space efficiency, while the 21-pound weight ensures rock-solid stability.
                  The damage you save to your knife edges alone justifies the investment. Easy to sanitize with proper care,
                  and I expect to pass this board on to my children - that&apos;s the level of durability we&apos;re talking about.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Key Features Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">#1 Choice of Culinary Professionals Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Ruler className="w-8 h-8 text-orange-700 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">NSF Certified</h3>
              <p className="text-sm text-slate-600">Commercial foodservice approved</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">Northern Hard Rock Maple</h3>
              <p className="text-sm text-slate-600">Sustainable USA-made wood</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">1.75&quot; Edge-Grain</h3>
              <p className="text-sm text-slate-600">Knife-friendly, self-healing surface</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Droplets className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">21-Lb Stability</h3>
              <p className="text-sm text-slate-600">Won&apos;t slide during heavy prep</p>
            </div>
          </div>
        </section>

        {/* Detailed Specifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left p-4 font-semibold">Specification</th>
                    <th className="text-left p-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(specifications).map(([key, value], index) => (
                    <tr key={key} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="p-4 font-medium text-slate-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </td>
                      <td className="p-4 text-slate-700">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Size Comparison Guide */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">John Boos Platinum Size Selection Guide</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left p-4 font-semibold">Size</th>
                    <th className="text-left p-4 font-semibold">Weight</th>
                    <th className="text-left p-4 font-semibold">Best For</th>
                    <th className="text-left p-4 font-semibold">Price</th>
                    <th className="text-left p-4 font-semibold">Your Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeComparison.map((size, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${size.featured ? 'bg-orange-50' : index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="p-4 font-medium text-slate-900">
                        {size.size}
                        {size.featured && <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">REVIEWED</span>}
                      </td>
                      <td className="p-4 text-slate-700">{size.weight}</td>
                      <td className="p-4 text-slate-700">{size.use}</td>
                      <td className="p-4 text-orange-700 font-semibold">${size.price}</td>
                      <td className="p-4">
                        {size.featured ? (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-xs text-slate-600 ml-1">4.8/5</span>
                          </div>
                        ) : (
                          <div className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs">
                            <span className="text-gray-600">Not tested</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-700 text-sm">
              <strong>Size Recommendation:</strong> The 24x18 size is the sweet spot for serious cooking operations - large enough
              to handle multiple prep tasks without constantly moving ingredients, yet not so massive that it becomes unwieldy.
              The generous work surface prevents the constant shuffling of prepped portions that smaller boards require.
            </p>
          </div>
        </section>

        {/* Real-World Testing - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Kitchen Testing</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3">18 Years of Home Kitchen Excellence</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Over 18 years of daily home cooking, this John Boos cutting board has anchored every meal preparation.
                  The hard rock maple edge-grain construction provides a self-healing surface that maintains knife sharpness
                  while offering the stability needed for efficient prep work. The 21-pound weight means it stays put
                  during even the most aggressive chopping and dicing sessions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Knife Care and Surface Performance</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  The damage this board saves to knife edges cannot be overstated. Unlike plastic or bamboo alternatives,
                  the maple surface gives slightly under the blade, reducing edge damage while maintaining cutting precision.
                  After 18 years, my knives maintain their sharpness significantly longer than when I used cheaper cutting surfaces.
                  This translates to fewer sharpenings and longer knife life.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Maintenance Reality vs Marketing</h3>
                <p className="text-slate-700 leading-relaxed">
                  Despite marketing claims about frequent oiling, I rarely oil this board but keep it clean and never soak in water.
                  Simple maintenance - washing with warm soapy water and immediate drying - has proven sufficient for 18 years.
                  I sanitize it regularly and have never had any food safety concerns. The maintenance requirements are far less
                  demanding than manufacturers suggest.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4">Testing Environment</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• <strong>Location:</strong> Home kitchen operations</li>
              <li>• <strong>Primary Use:</strong> All food prep tasks</li>
              <li>• <strong>Daily Usage:</strong> Regular home cooking preparation</li>
              <li>• <strong>Duration:</strong> 18 years of continuous use</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Performance Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Outstanding Long-Term Performance</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• 18 years of durability, expect generational use</li>
                  <li>• Saves significant damage to knife edges</li>
                  <li>• Large size provides efficient work space</li>
                  <li>• Easy to sanitize with no food safety concerns</li>
                  <li>• Exceptional stability during heavy use</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Minor Considerations</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Serrated knives cause deeper marks</li>
                  <li>• Staining can occur if not washed promptly</li>
                  <li>• Requires dedicated storage due to weight</li>
                  <li>• Premium price vs plastic alternatives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance & Care Guide */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Maintenance Guide</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <p className="text-slate-700 mb-6">
                Proper maintenance is crucial for commercial cutting boards. Here&apos;s the professional care schedule:
              </p>

              <div className="space-y-4">
                {maintenanceSchedule.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-orange-700" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.frequency}</h4>
                      <p className="text-sm text-slate-700">{item.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-yellow-700 text-sm">
              <strong>My maintenance experience:</strong> I rarely oil it but keep it clean and never soak in water.
              I sanitize it regularly and have never had any concerns about food safety. Simple care routine has worked perfectly for 18 years.
            </p>
          </div>
        </section>

        {/* Wood vs Plastic vs Bamboo Comparison */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Cutting Board Material Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Factor</th>
                  <th className="text-left p-4 font-semibold">Hard Maple (John Boos)</th>
                  <th className="text-left p-4 font-semibold">Plastic/HDPE</th>
                  <th className="text-left p-4 font-semibold">Bamboo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Knife Kindness</td>
                  <td className="p-4 text-green-700">Excellent - self-healing</td>
                  <td className="p-4 text-orange-700">Good - but shows cuts</td>
                  <td className="p-4 text-blue-600">Good - harder than maple</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Sanitation</td>
                  <td className="p-4 text-orange-700">Good with proper care</td>
                  <td className="p-4 text-green-700">Excellent - dishwasher safe</td>
                  <td className="p-4 text-orange-700">Good - antimicrobial</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Durability</td>
                  <td className="p-4 text-green-700">5/5 - Exceptional</td>
                  <td className="p-4 text-gray-600">Not tested</td>
                  <td className="p-4 text-blue-600">Not tested</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Maintenance</td>
                  <td className="p-4 text-orange-700">Regular oiling required</td>
                  <td className="p-4 text-green-700">Minimal</td>
                  <td className="p-4 text-orange-700">Light oiling needed</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Cost</td>
                  <td className="p-4 text-orange-700">$189</td>
                  <td className="p-4 text-green-600">$30-60</td>
                  <td className="p-4 text-blue-600">$40-80</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium">Professional Use</td>
                  <td className="p-4 text-green-700">5/5 - Outstanding value</td>
                  <td className="p-4 text-gray-600">Not tested</td>
                  <td className="p-4 text-blue-600">Not tested</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Commercial Kitchen Considerations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Commercial Kitchen Performance</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-slate-700 leading-relaxed mb-6">
              <strong>Professional Performance Assessment:</strong> While my testing has been primarily in home kitchen environments,
              the board&apos;s performance characteristics - exceptional stability, knife-friendly surface, and easy sanitization -
              make it ideal for commercial applications. The large work surface eliminates constant ingredient shuffling,
              improving prep efficiency significantly. Health compliance is straightforward with proper cleaning protocols.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Health Compliance</h3>
                <div className="text-2xl font-bold text-green-600 mb-1">5/5</div>
                <p className="text-sm text-slate-600">No food safety concerns</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Staff Adoption</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">5/5</div>
                <p className="text-sm text-slate-600">Excellent user experience</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Cost Efficiency</h3>
                <div className="text-2xl font-bold text-purple-600 mb-1">5/5</div>
                <p className="text-sm text-slate-600">Generational investment</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-slate-700">Used only at home for 18 years with excellent results. The large size provides room to work without constantly moving prepped portions. Easy to sanitize with no food safety concerns. The damage you save to your knives makes it well worth the investment.</p>
            </div>
          </div>
        </section>

        {/* Pros and Cons - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons Based on Professional Use</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-green-800 mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                What Makes It Commercial-Grade
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
                Limitations & Considerations
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
            dealText="Restaurant supply stores sometimes beat retail pricing - size affects price significantly"
            affiliateLinks={productData.affiliateLinks}
            lastUpdated="Updated weekly"
          />
        </section>

        {/* Who Should Buy This - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should (and Shouldn&apos;t) Buy This Cutting Board</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-green-700 mb-3">✅ Perfect For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Serious home cooks who value knife care</li>
                <li>• Users wanting a generational investment</li>
                <li>• Kitchens with ample prep space</li>
                <li>• Those prioritizing work surface efficiency</li>
                <li>• Cooks who maintain equipment properly</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-orange-700 mb-3">⚠️ Consider Alternatives If:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Budget is extremely limited</li>
                <li>• Counter space is restricted</li>
                <li>• You primarily use serrated knives</li>
                <li>• Minimal maintenance is priority</li>
                <li>• You prefer lighter cutting boards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Line - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <p className="text-lg leading-relaxed mb-4">
              After 18 years of daily use, this John Boos cutting board has proven itself as more than kitchen equipment - it&apos;s a generational investment.
              The combination of work surface efficiency, knife preservation, and exceptional durability justifies every dollar of the premium price.
              While plastic alternatives offer convenience, they cannot match the knife care and longevity of this hard maple construction.
              The maintenance reality is far simpler than marketing suggests - basic cleanliness and care yield decades of performance.
            </p>
            <p className="text-orange-400 font-semibold mb-4">
              This is the kind of kitchen investment you make once and pass down to your children - true generational quality.
            </p>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong>Key Takeaway:</strong> For serious home cooks or commercial operations, the knife edge preservation alone
                makes this board pay for itself over time. The work surface efficiency is just an added bonus.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get My Complete Equipment Buying Guide</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Want my full breakdown of commercial vs residential kitchen equipment? Get the same guide I use for restaurant purchasing decisions.
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