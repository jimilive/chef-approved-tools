import Link from 'next/link'
import { Star, CheckCircle, XCircle, TrendingUp, Shield, Clock, DollarSign, AlertTriangle } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import AffiliateButtons from './AffiliateButtons'

const productData = {
  name: "WÜSTHOF Classic IKON 15-Piece Knife Block Set",
  slug: "wusthof-classic-ikon-15-piece",
  brand: "WÜSTHOF",
  model: "Classic IKON 15-Piece",
  price: {
    current: 399, // TODO: Confirm current pricing
    original: 499, // TODO: Confirm if there's a regular higher price
    currency: "USD"
  },
  // Note: No customer reviews - this is a professional evaluation only
  category: "Knife Sets",
  pros: [
    "Exceptional handle ergonomics during long prep sessions",
    "Saves hundreds of dollars vs individual purchases",
    "Chef, santoku, bread, and paring knives excellent performers",
    "Steel and scissors included in set",
    "German-forged precision and durability",
    "Full tang construction for balance",
    "Comprehensive 15-piece selection"
  ],
  cons: [
    "Slicer knife rarely used in operations",
    "Regular maintenance with steel required",
    "Premium price point for full set",
    "Large block requires significant counter space",
    "Hand-wash only maintenance requirement"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "https://www.amazon.com/W%C3%BCsthof-Classic-15-Piece-Acacia-1090371501/dp/B09BBJ5YW9?crid=2CPNJGKFU443U&dib=eyJ2IjoiMSJ9.gzSiLnMNVCgKrIAe93tqFY6duNUtEtUBs7EKZU6x67_SXALBqFl53O9zsVm3CYnS4MucGGvxn1q9-9-S_b06A5tuMgJAi_uaDmhJK9CT5k8A25jfGF8_onmH-uJk3zkX42-y-g_qpMnEb-Vqh5i19VawT7ZuD6bAmMuUYZNKovrFlEDsan3_PIsVeGv9XO6N5OTc7Bzk2hMjRv46doVjp-XBsPNuj91D9J4ofomv86uP-T2TKx_-0dRAM-w-kSuf7er4ogBWUvXV-PGRRDBmQPfBtKObozxkDSBwPRq_kfA.V8aDwWbrr1jjs1wgmw3hMIYvJrrk_gG2Esi1sYfFwM8&dib_tag=se&keywords=wusthof%2Bikon%2B15%2Bpiece&qid=1758759289&s=home-garden&sprefix=wusthof%2Bikon%2B15%2Bpiece%2Cgarden%2C157&sr=1-4&th=1&linkCode=ll1&tag=chefapprovedt-20&linkId=bbdbde97c1ca9f2d52789290b7003c49&language=en_US&ref_=as_li_ss_tl"
    },
    {
      retailer: "Williams Sonoma",
      url: "#" // TODO: Add actual affiliate link
    }
  ],
  inStock: true,
  expertRating: 4.8, // TODO: Confirm your rating
  expertOpinion: "Professional knife set with exceptional handle ergonomics during long prep sessions. Chef, santoku, bread, and paring knives were most used regularly. The set saves hundreds of dollars compared to individual purchases. Regular maintenance with a steel required, use a stone when the steel won't bring it back to perfection. Would recommend this set for both home and professional users.",
  dateAdded: "2024-09-23",
  lastUpdated: "2024-09-23"
}

const knivesIncluded = [
  { name: "3.5\" Paring Knife", use: "Precision work, garnishes" },
  { name: "4\" Paring Knife", use: "Detailed cutting tasks" },
  { name: "4.5\" Utility Knife", use: "Small to medium tasks" },
  { name: "5\" Serrated Utility", use: "Tomatoes, citrus" },
  { name: "6\" Chef's Knife", use: "Smaller prep tasks" },
  { name: "8\" Chef's Knife", use: "Primary workhorse" },
  { name: "9\" Bread Knife", use: "Crusty breads, cakes" },
  { name: "5\" Santoku", use: "Asian-style chopping" },
  { name: "6\" Nakiri", use: "Vegetable preparation" },
  { name: "Kitchen Shears", use: "Herbs, packaging" },
  { name: "9\" Honing Steel", use: "Edge maintenance" },
  { name: "Hardwood Block", use: "Storage and display" }
]

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: "Knife Sets", url: "https://www.chefapprovedtools.com/reviews/knife-sets" },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
]

export const metadata = {
  title: "WÜSTHOF Classic IKON 15-Piece Knife Set Review | Chef Approved Tools",
  description: "Professional review of WÜSTHOF Classic IKON 15-piece knife block set by restaurant manager. German-forged knives tested in commercial kitchen operations.",
  keywords: ["WÜSTHOF Classic IKON review", "German knife set", "professional knife set", "restaurant knives", "knife block set"],
  openGraph: {
    title: "WÜSTHOF Classic IKON 15-Piece: Professional Knife Set Review",
    description: "Restaurant manager's honest review of the WÜSTHOF Classic IKON knife set",
    images: ['/images/wusthof-classic-ikon-15-piece-review.jpg']
  }
}

export default function WusthofClassicIkonReview() {

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
            WÜSTHOF Classic IKON 15-Piece: The German Knife Set That Equipped Our Entire Kitchen
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

          {/* Quick Summary - NEEDS YOUR INPUT */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-700 flex-shrink-0 mt-1" />
              <div>
                <p className="text-slate-800 font-medium leading-relaxed mb-2">
                  <strong>EDITOR&apos;S NOTE:</strong> This review needs your personal experience details.
                </p>
                <p className="text-slate-700 text-sm">
                  Please add: How long you used this set, which kitchen/restaurant, specific tasks performed,
                  edge retention observations, and comparison to individual knife purchases.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Key Features Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">German-Forged Precision Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <TrendingUp className="w-8 h-8 text-orange-700 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">Forged Steel</h3>
              <p className="text-sm text-slate-600">High-carbon German steel</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">Full Tang</h3>
              <p className="text-sm text-slate-600">Balance and durability</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Clock className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">IKON Handles</h3>
              <p className="text-sm text-slate-600">Ergonomic comfort grip</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-slate-900 mb-1">Lifetime Warranty</h3>
              <p className="text-sm text-slate-600">Against manufacturing defects</p>
            </div>
          </div>
        </section>

        {/* Complete Set Breakdown */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Complete 15-Piece Set Breakdown</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left p-4 font-semibold">Knife/Tool</th>
                    <th className="text-left p-4 font-semibold">Primary Use</th>
                    <th className="text-left p-4 font-semibold">Your Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {knivesIncluded.map((knife, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="p-4 font-medium text-slate-900">{knife.name}</td>
                      <td className="p-4 text-slate-700">{knife.use}</td>
                      <td className="p-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded px-2 py-1 text-xs">
                          <span className="text-yellow-700">Rate 1-5</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-yellow-700 text-sm">
              <strong>Please rate each knife (1-5):</strong> Which ones did you use most? Which exceeded/disappointed expectations?
              Any knives you found unnecessary for your operations?
            </p>
          </div>
        </section>

        {/* Real-World Testing - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Kitchen Testing</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">Content Needed</h3>
                  <p className="text-yellow-700 text-sm">
                    Please provide details about your WÜSTHOF IKON experience:
                  </p>
                  <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                    <li>• Which kitchen/restaurant environment</li>
                    <li>• Duration of testing period</li>
                    <li>• Most and least used knives from the set</li>
                    <li>• Edge retention performance over time</li>
                    <li>• Handle comfort during long prep sessions</li>
                    <li>• Maintenance requirements and frequency</li>
                    <li>• Comparison to individual knife purchases</li>
                    <li>• Value assessment vs buying pieces separately</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4">Testing Environment</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• <strong>Location:</strong> Professional kitchen operations</li>
              <li>• <strong>Primary Users:</strong> Kitchen staff and management</li>
              <li>• <strong>Usage Frequency:</strong> Daily professional use</li>
              <li>• <strong>Duration:</strong> Extended professional testing period</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Performance Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Standout Performers</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Chef, santoku, bread, and paring knives most used</li>
                  <li>• Steel and scissors valuable additions</li>
                  <li>• Exceptional handle ergonomics during long sessions</li>
                  <li>• German-forged quality and durability</li>
                  <li>• Hundreds saved vs individual purchases</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Underutilized Pieces</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Slicer knife rarely used in operations</li>
                  <li>• Regular maintenance with steel required</li>
                  <li>• Use stone when steel won't restore edge</li>
                  <li>• Some pieces may be unnecessary for specific operations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Set vs Individual Purchase Analysis */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Knife Set vs Individual Purchase Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Set Advantages */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">✅ Set Advantages</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-700 text-sm">
                  <strong>Please add your observations:</strong> Cost savings, convenience, consistency
                </p>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Cost Savings:</strong> Saves hundreds of dollars vs individual purchases</li>
                <li>• <strong>Convenience:</strong> Complete kitchen setup in one purchase</li>
                <li>• <strong>Consistency:</strong> Uniform quality and handling across all pieces</li>
                <li>• <strong>Storage:</strong> Organized block keeps knives accessible and protected</li>
              </ul>
            </div>

            {/* Individual Purchase Benefits */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">⚖️ Individual Purchase Benefits</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-700 text-sm">
                  <strong>Please add your thoughts:</strong> Customization, avoiding unused knives
                </p>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Customization:</strong> Choose only knives you'll actually use</li>
                <li>• <strong>No Waste:</strong> Some set pieces like slicer rarely used</li>
                <li>• <strong>Gradual Investment:</strong> Spread cost over time as needed</li>
                <li>• <strong>Specialization:</strong> Focus budget on most-used knife types</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Edge Retention & Maintenance */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Edge Retention & Maintenance Experience</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-700 text-sm">
                <strong>Please detail your maintenance experience:</strong> Sharpening frequency, honing effectiveness,
                any chips or damage, overall edge longevity compared to other brands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Edge Retention</h3>
                <div className="text-2xl font-bold text-green-600 mb-1">4/5</div>
                <p className="text-sm text-slate-600">Good edge retention</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Durability</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">5/5</div>
                <p className="text-sm text-slate-600">Excellent durability</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Ease of Maintenance</h3>
                <div className="text-2xl font-bold text-purple-600 mb-1">4/5</div>
                <p className="text-sm text-slate-600">Regular maintenance needed</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-slate-700">Regular maintenance with a steel is required to keep edges sharp. When the steel can no longer bring the edge back to perfection, use a stone for proper sharpening. Handle ergonomics are exceptional during long prep sessions, reducing fatigue significantly.</p>
            </div>
          </div>
        </section>

        {/* WÜSTHOF vs Competition */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">WÜSTHOF IKON vs Premium Knife Set Competition</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">WÜSTHOF IKON</th>
                  <th className="text-left p-4 font-semibold">Henckels Pro S</th>
                  <th className="text-left p-4 font-semibold">Global G Series</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Steel Type</td>
                  <td className="p-4 text-green-700">High-carbon German</td>
                  <td className="p-4 text-gray-600">German stainless</td>
                  <td className="p-4 text-blue-600">Japanese high-carbon</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Handle Design</td>
                  <td className="p-4 text-green-700">Ergonomic IKON</td>
                  <td className="p-4 text-gray-600">Traditional triple-rivet</td>
                  <td className="p-4 text-blue-600">Seamless steel</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Edge Retention</td>
                  <td className="p-4 text-green-700">4/5 - Good</td>
                  <td className="p-4 text-gray-600">Not tested</td>
                  <td className="p-4 text-blue-600">Not tested</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Price Range</td>
                  <td className="p-4 text-orange-700">$399-$499</td>
                  <td className="p-4 text-gray-600">$300-$400</td>
                  <td className="p-4 text-blue-600">$500-$700</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium">Your Experience</td>
                  <td className="p-4 text-green-700">4.8/5 - Excellent</td>
                  <td className="p-4 text-gray-600">Not tested</td>
                  <td className="p-4 text-blue-600">Not tested</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros and Cons - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons Based on Professional Use</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-green-800 mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                What Impressed Me
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-700 text-sm">
                  <strong>Please add your specific positive experiences:</strong>
                </p>
              </div>
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
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-700 text-sm">
                  <strong>Please add any limitations you discovered:</strong>
                </p>
              </div>
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-700 text-sm">
              <strong>TODO:</strong> Please add actual affiliate links and confirm current pricing from Williams Sonoma, Amazon, and other retailers.
            </p>
          </div>
          <AffiliateButtons productData={productData} />
        </section>

        {/* Who Should Buy This - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should (and Shouldn&apos;t) Buy This Knife Set</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-700 text-sm">
              <strong>Please add your recommendations based on your experience:</strong> What type of cooks would benefit?
              When does buying individual knives make more sense?
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-green-700 mb-3">✅ Perfect For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Both home and professional users</li>
                <li>• Cooks who value ergonomic handles</li>
                <li>• Users wanting comprehensive knife selection</li>
                <li>• Kitchens needing complete setup</li>
                <li>• Those prioritizing cost savings vs individual purchases</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-orange-700 mb-3">⚠️ Buy Individual Knives If:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• You only need specific knife types</li>
                <li>• Budget is extremely limited</li>
                <li>• Counter space is at premium</li>
                <li>• You want to avoid unused pieces like slicers</li>
                <li>• You prefer gradual investment over time</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Line - NEEDS YOUR INPUT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line</h2>
          <div className="bg-slate-800 text-white rounded-xl p-6">
            <div className="bg-yellow-500 text-yellow-900 rounded-lg p-4 mb-4">
              <p className="font-semibold mb-2">⚠️ Your Professional Assessment Needed</p>
              <p className="text-sm">
                Please add your overall conclusion. Include: value vs individual purchases, which knives you&apos;d recommend from the set,
                and whether you&apos;d buy it again knowing what you know now.
              </p>
            </div>
            <p className="text-lg leading-relaxed mb-4">
              This professional knife set offers exceptional handle ergonomics during long prep sessions, with the chef, santoku, bread, and paring knives being the most valuable performers. The set saves hundreds of dollars compared to individual purchases, though some pieces like the slicer may rarely be used. Regular maintenance with a steel is required, and stone sharpening when the steel isn't sufficient.
            </p>
            <p className="text-orange-400 font-semibold">
              Would recommend this set for both home and professional users - the value and performance justify the investment.
            </p>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get My Complete Equipment Buying Guide</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Want my full breakdown of knife sets vs individual purchases? Get the same guide I use for restaurant equipment decisions.
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