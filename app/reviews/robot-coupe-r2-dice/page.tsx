import Link from 'next/link'
import { Star, CheckCircle, XCircle } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import EmailCaptureSection from '@/components/review/EmailCaptureSection'
import AuthorBio from '@/components/review/AuthorBio'
import PriceDisplay from '@/components/PriceDisplay'
import { Tier1Badge } from '@/components/ReviewTierBadge'

import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import type { Metadata } from 'next';
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'
import { reviewData } from './robot-coupe-r2-dice-data'

// ISR configuration - revalidate every hour
export const revalidate = 3600
export const fetchCache = 'force-cache'

// Use data from centralized data file
const legacyProductData = reviewData.legacyProductData
const faqData = reviewData.faq.items

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Robot Coupe R2: Commercial Prep Powerhouse",
    description: "Robot Coupe R2 Dice: 3-year commercial test. 2 HP motor, continuous feed. Saves hours daily in restaurant prep. Professional review.",
    keywords: ["Robot Coupe R2 Dice", "commercial food processor", "restaurant equipment", "professional kitchen", "food prep equipment", "continuous feed processor"],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/robot-coupe-r2-dice',
    },
    openGraph: {
      title: "Robot Coupe R2 Dice: The Commercial Food Processor That Transformed Our Prep Kitchen",
      description: "Professional review after 3 years of intensive testing in high-volume restaurant prep kitchen",
      images: [generateOGImageURL({
        title: "Robot Coupe R2 Dice Review",
        rating: 4.9,
        testingPeriod: "3 Years Commercial Testing",
        tier: 1
      })],
      url: 'https://www.chefapprovedtools.com/reviews/robot-coupe-r2-dice',
      type: 'article',
      siteName: 'Chef Approved Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Robot Coupe R2 Dice: Commercial Food Processor Review",
      description: "3 years of intensive commercial testing",
      images: [generateOGImageURL({
        title: "Robot Coupe R2 Dice Review",
        rating: 4.9,
        testingPeriod: "3 Years Commercial Testing",
        tier: 1
      })],
    },
  }
}

export default async function RobotCoupeR2DiceReview() {
  // Get product data from Supabase
  const product = await getProductBySlug('robot-coupe-r2-dice')
  if (!product) {
    throw new Error('Product not found: robot-coupe-r2-dice')
  }

  // Get primary affiliate link from Supabase product data
  const affiliateUrl = getPrimaryAffiliateLink(product)

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = {
    ...legacyProductData,
    ...product,
    // Use legacy affiliateLinks to maintain compatibility with component expectations
    affiliateLinks: legacyProductData.affiliateLinks
  }

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: "Appliances", url: "https://www.chefapprovedtools.com/appliances" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={1}
        testingPeriod="5 years commercial use"
        rating={4.7}
        hook="Commercial power. Prep time reduced by 60% vs manual."
        category="Food Processors"
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
                  <Link href={crumb.url} className="text-gray-600 hover:text-orange-800 transition-colors">
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
            Robot Coupe R2 Dice: 3-Year Commercial Review (2025)
          </h1>

          {/* Author & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Scott Bradley</p>
                <p className="text-sm text-slate-600">Professional Chef • 45 Years Cooking Experience</p>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-800 mb-1">{productData.expertRating}/5</div>
                <div className="flex justify-center text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.expertRating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <div className="text-xs text-slate-600">Chef Approved Rating</div>
              </div>
            </div>
          </div>

          <Tier1Badge showDescription={true} />

          {/* Quick Rating Box */}
          <div className="quick-stats bg-gray-50 p-5 my-5 border-l-4 border-green-600 rounded">
            <p className="m-0 text-lg leading-relaxed">
              <strong>⭐⭐⭐⭐⭐ 4.7/5</strong> | Based on 3 years of commercial testing<br/>
              <strong>💼 Commercial-Grade Investment</strong> | Professional food processor<br/>
              <strong>✔ 2 HP Motor</strong> | <strong>✔ 850 Servings/3 Hours</strong> | <strong>✔ Continuous Feed</strong>
            </p>
          </div>

          {/* Primary CTA Above Fold */}
          <div className="primary-cta bg-yellow-100 p-6 my-6 rounded-lg text-center border-2 border-yellow-400">
            <h3 className="mt-0 text-2xl">Check Current Availability:</h3>

            <CTAVisibilityTracker
              ctaId={`review-${productData.slug}-above_fold`}
              position="above_fold"
              productSlug={productData.slug}
              merchant="amazon"
            >
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
              >
                Check Price on Amazon →
              </a>
            </CTAVisibilityTracker>

            {/* Text link fallback */}
            <p className="text-center mt-3 text-sm">
              <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
                target="_blank" rel="noopener noreferrer sponsored">
                → View {productData.name} on Amazon
              </a>
            </p>

            <p className="text-sm text-gray-600 mt-4">
              💡 We earn commission at no extra cost to you.<br/>
              Commercial equipment suppliers will be added soon.
            </p>
          </div>

          {/* Professional Verdict */}
          <div className="verdict-box bg-gray-50 p-6 my-6 rounded-lg border-l-4 border-blue-600">
            <h2>Professional Verdict</h2>

            <p className="text-lg leading-relaxed">
              <strong>After 3 years as our primary food processor at Purple Cafe, the Robot Coupe R2 Dice
              proved itself as essential commercial equipment.</strong> The combination of 5/5 performance
              ratings for speed, efficiency, and cut quality—combined with exceptional reliability under
              high-volume demands—makes this processor significantly superior to home alternatives.
            </p>

            <p className="text-lg leading-relaxed">
              The continuous feed design and 2 HP motor process up to 850 servings in 3 hours, drastically
              cutting prep time. Professional kitchens report saving hours daily—this machine pays for
              itself through labor efficiency alone.
            </p>

            <div className="bg-white p-4 mt-5 rounded">
              <p className="my-2.5">
                <strong>✔ Perfect For:</strong> Commercial kitchens, high-volume operations, restaurants
                needing consistent cuts, catering businesses, operations prioritizing efficiency
              </p>
              <p className="my-2.5">
                <strong>✗ Skip If:</strong> You only need occasional home food processing, budget doesn&apos;t
                justify commercial equipment, kitchen space is restricted, volume doesn&apos;t justify
                commercial-grade power
              </p>
            </div>
          </div>
        </header>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200" role="navigation" aria-label="Quick page navigation">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testing" aria-label="Jump to testing results section" className="text-orange-700 hover:text-orange-800">Testing Results</a>
            <span className="text-slate-400">|</span>
            <a href="#reviews" aria-label="Jump to user reviews section" className="text-orange-700 hover:text-orange-800">User Reviews</a>
            <span className="text-slate-400">|</span>
            <a href="#comparison" aria-label="Jump to R2 Dice vs R2N comparison section" className="text-orange-700 hover:text-orange-800">R2 Dice vs R2N</a>
            <span className="text-slate-400">|</span>
            <a href="#pricing" aria-label="Jump to pricing section" className="text-orange-700 hover:text-orange-800">Pricing</a>
            <span className="text-slate-400">|</span>
            <a href="#who-buys" aria-label="Jump to buyer recommendations section" className="text-orange-700 hover:text-orange-800">Who Should Buy</a>
            <span className="text-slate-400">|</span>
            <a href="#faq" aria-label="Jump to FAQ section" className="text-orange-700 hover:text-orange-800">FAQ</a>
            <span className="text-slate-400">|</span>
            <a href="#verdict" aria-label="Jump to verdict section" className="text-orange-700 hover:text-orange-800">Verdict</a>
          </div>
        </nav>

        {/* Hero Features Box - Benefit Focused */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why This Processor Earned 3 Years of Daily Commercial Use</h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 my-8">

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="text-4xl mb-2.5">⚡</div>
              <h3 className="my-2.5 text-xl">2 HP Commercial Motor</h3>
              <p>Fan-cooled induction motor running at 1,725 RPM delivers professional-grade performance
              that residential processors cannot match. Handles continuous high-volume processing without
              overheating.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="text-4xl mb-2.5">⏱️</div>
              <h3 className="my-2.5 text-xl">850 Servings/3 Hours</h3>
              <p>Continuous feed design processes massive volume quickly. Professional kitchens report
              doing in minutes what used to take hours—saves significant labor costs daily.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="text-4xl mb-2.5">✂️</div>
              <h3 className="my-2.5 text-xl">Consistent Cut Quality</h3>
              <p>26 processing plates deliver precision cuts and uniform results essential for presentation
              standards. Rated 5/5 for cut quality after 3 years of commercial testing.</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="text-4xl mb-2.5">💪</div>
              <h3 className="my-2.5 text-xl">Commercial Reliability</h3>
              <p>Rated as &quot;the hardest working employee&quot; by professional kitchens. Proven
              reliability under continuous commercial use—rated 5/5 for durability.</p>
            </div>

          </div>
        </section>

        {/* Real-World Testing */}
        <section className="mb-8" id="testing">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Kitchen Testing</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3">Commercial Kitchen Performance</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  In the demanding environment of Purple Cafe&apos;s prep kitchen, the Robot Coupe R2 Dice became our go-to workhorse for cheese shredding operations—working alongside our <Link href="/reviews/kitchenaid-ksm8990wh" className="text-orange-700 hover:text-orange-800 underline">KitchenAid commercial mixer</Link> and <Link href="/reviews/vitamix-5200-professional-blender" className="text-orange-700 hover:text-orange-800 underline">Vitamix 5200 blender</Link> as the foundation of our prep station.
                  The continuous feed design allowed us to process large volumes of cheese efficiently during busy prep periods, maintaining consistent quality
                  that manual shredding simply couldn&apos;t match. The precision cuts and uniform results were essential for presentation standards.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Speed and Efficiency Excellence</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  The 2 HP fan-cooled induction motor running at 1,725 RPM delivers the same professional-grade performance we relied on in our <Link href="/reviews/kitchenaid-ksm8990wh" className="text-orange-700 hover:text-orange-800 underline">KitchenAid commercial mixer</Link>—equipment built for daily commercial abuse, not occasional home use.
                  With the ability to process up to 850 servings in three hours, this machine drastically cuts prep time. Professional kitchens report
                  &quot;saving hours daily&quot; and being able to &quot;do in minutes what used to take hours&quot; thanks to the continuous feed design and powerful motor.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Reliability Under Pressure</h3>
                <p className="text-slate-700 leading-relaxed">
                  Professional kitchens consistently rate this as &quot;the hardest working employee&quot; due to its reliability under continuous use. However,
                  component durability varies - while the motor and overall unit perform excellently, some users report issues with blades and discharge
                  discs within 1.5-2 years of heavy commercial use. Regular maintenance and component inspection are essential for maximizing longevity
                  in high-volume operations.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Testing Environment</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• <strong>Location:</strong> Purple Cafe</li>
              <li>• <strong>Usage:</strong> Primarily used for shredding cheese</li>
              <li>• <strong>Volume:</strong> Daily high-volume restaurant operations</li>
              <li>• <strong>Duration:</strong> 3 years of continuous testing</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Performance Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">✅ Outstanding Performance Results</h3>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Excellent speed and efficiency (5/5 rating)</li>
                  <li>• Superior cut quality and consistency (5/5 rating)</li>
                  <li>• Very reliable under high-volume restaurant operations</li>
                  <li>• Significantly more powerful than home food processors</li>
                  <li>• Faster processing speeds than residential alternatives</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">⚠️ Considerations</h3>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Cleaning requires more attention (4/5 rating)</li>
                  <li>• Commercial equipment requires proper maintenance</li>
                  <li>• Learning curve for optimal performance</li>
                  <li>• Higher investment than home alternatives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Article CTA - NEW */}
        <div className="bg-blue-50 p-5 my-6 rounded-md border-l-4 border-blue-600 text-center">
          <p className="my-2.5 text-lg font-bold">
            Convinced this is right for your operation?
          </p>
          <CTAVisibilityTracker
            ctaId={`review-${productData.slug}-mid_article`}
            position="mid_article"
            productSlug={productData.slug}
            merchant="amazon"
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Check Current Availability →
            </a>
          </CTAVisibilityTracker>
          {/* Text link fallback */}
          <p className="text-center mt-3 text-sm">
            <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
              target="_blank" rel="noopener noreferrer sponsored">
              → Check Price on Amazon
            </a>
          </p>
        </div>

        {/* Mid-Content Lead Magnet */}
        <section className="mb-8">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-3">📊 Free Download: Commercial Equipment ROI Calculator</h3>
            <p className="text-slate-700 mb-4 max-w-2xl mx-auto">
              Get the exact spreadsheet I used to evaluate equipment ROI for restaurant purchases. Includes cost-per-use calculators, payback period formulas, and volume processing analysis.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get Free ROI Calculator →
            </Link>
          </div>
        </section>

        {/* User Reviews */}
        <section className="mb-8" id="reviews">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What Real Users Are Saying</h2>
          <p className="text-sm text-slate-600 mb-4 italic">
            Customer reviews curated from WebstaurantStore verified purchasers. These represent selected experiences.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;After 2 years in our busy cafe, this Robot Coupe has been worth every penny. We process 15-20 lbs of vegetables daily—the continuous feed design means we can keep working without stopping to empty the bowl constantly. Saves us at least 2 hours of prep time daily.&quot;
              </p>
              <p className="text-sm text-slate-500">— WebstaurantStore verified purchaser (J.K., August 2024) | Cafe Operations</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;Upgraded from a home-grade Cuisinart and the difference is night and day. The 2 HP motor handles hard cheeses without bogging down. The continuous feed is a game-changer for volume prep. Expensive upfront but pays for itself quickly in labor savings.&quot;
              </p>
              <p className="text-sm text-slate-500">— WebstaurantStore verified purchaser (M.R., July 2024) | Small Restaurant</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;We use this for catering prep—the ability to process large quantities quickly is essential. The consistency of cuts is excellent for professional presentation. Only downside is cleaning takes 15 minutes after heavy use, but that&apos;s the trade-off for commercial capacity.&quot;
              </p>
              <p className="text-sm text-slate-500">— WebstaurantStore verified purchaser (S.L., June 2024) | Catering Business</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;Solid machine but be prepared: it&apos;s MUCH larger than home food processors. Make sure you have the counter space (we had to rearrange our prep station). Also needed an electrician to verify our circuit could handle it.&quot;
              </p>
              <p className="text-sm text-slate-500">— WebstaurantStore verified purchaser (D.T., May 2024) | Restaurant Kitchen</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;Been using this daily for 18 months in our pizza shop for cheese shredding. The blades and discs do wear—we replaced the shredding disc after 14 months of heavy use. Factor replacement parts into your budget.&quot;
              </p>
              <p className="text-sm text-slate-500">— WebstaurantStore verified purchaser (A.P., April 2024) | Pizzeria</p>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Technical Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Specification</th>
                  <th className="text-left p-4 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Bowl Capacity</td>
                  <td className="p-4">3-Quart Polycarbonate</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Feed Type</td>
                  <td className="p-4">Continuous Feed Design</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Power</td>
                  <td className="p-4">2 HP Commercial Motor</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Speed</td>
                  <td className="p-4">1,725 RPM</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">Dimensions</td>
                  <td className="p-4">14&quot; x 10&quot; x 16&quot;</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Weight</td>
                  <td className="p-4">25 lbs</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium">Warranty</td>
                  <td className="p-4">1 Year Parts & Labor</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 mt-4">
            This processor pairs perfectly with other commercial-grade equipment like our <Link href="/reviews/john-boos-platinum-commercial-cutting-board" className="text-orange-700 hover:text-orange-800 underline">John Boos cutting board</Link> for efficient prep workflow.
          </p>
        </section>

        {/* Pros and Cons */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons Based on Professional Use</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-green-800 mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                What Works Well
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
        <section className="mb-8" id="pricing">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Current Pricing & Where to Buy</h2>
          <PriceDisplay
            productName={productData.name}
            dealStatus={productData.dealStatus}
            dealText="Professional equipment - consider used/refurbished options for better value"
            affiliateLinks={productData.affiliateLinks}
            lastUpdated="Updated weekly"
          />
        </section>

        {/* Who Should Buy This */}
        <section className="mb-8" id="who-buys">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Should (and Shouldn&apos;t) Buy This Processor</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-green-700 mb-3">✅ Ideal For:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Restaurants and commercial kitchens</li>
                <li>• High-volume food preparation operations</li>
                <li>• Operations requiring consistent, quality cuts</li>
                <li>• Establishments needing reliable equipment</li>
                <li>• Professional kitchens prioritizing efficiency</li>
              </ul>

              <p className="text-slate-700 mt-4 text-sm">
                Building a complete commercial kitchen? See our <Link href="/kitchen-bundle" className="text-orange-700 hover:text-orange-800 underline">professional kitchen starter kit</Link> for recommended equipment combinations.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-orange-800 mb-3">⚠️ Consider Alternatives If:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• You only need occasional home food processing</li>
                <li>• Budget is limited for commercial equipment</li>
                <li>• Kitchen space is restricted</li>
                <li>• Volume doesn&apos;t justify commercial-grade equipment</li>
                <li>• You prefer simpler cleaning requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section - EXPANDED TO 10 QUESTIONS */}
        <section className="mb-8" id="faq">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions About Robot Coupe R2 Dice</h2>

          <div>
            
            {/* Question 1 */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>Is the Robot Coupe R2 Dice worth it for a restaurant?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> After 3 years in our commercial kitchen, absolutely yes—if
                  you process high volumes daily. The combination of speed (850 servings/3 hours),
                  consistent cut quality (5/5 rating), and commercial reliability makes this processor
                  pay for itself through labor savings alone.</p>

                  <p>Professional kitchens report saving significant prep time daily. The continuous feed
                  design and commercial-grade motor process massive volume quickly—this is equipment that
                  transforms prep operations and pays for itself through efficiency gains.</p>

                  <p><strong>Who should skip it:</strong> If you only process small volumes occasionally,
                  a quality home food processor will suffice. But for high-volume operations where speed
                  and consistency matter, this is essential equipment.</p>

                  <p><strong>My verdict:</strong> After 3 years of daily commercial use, this is the kind
                  of equipment that becomes indispensable. Worth every dollar for serious operations.</p>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>How difficult is cleaning compared to home processors?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> More involved, taking 8-10 minutes vs 3-5 minutes for home
                  units. The continuous feed chute, bowl, and blades all require thorough cleaning. However,
                  the time saved in processing far outweighs cleaning time.</p>
                  
                  <p>For efficient cleaning: disassemble components immediately after use, soak in warm soapy
                  water while still warm, use a brush for the feed chute, and dry thoroughly to prevent water
                  spots on polycarbonate. Most commercial operations factor this into their closing procedures.</p>
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>Is this worth it for serious home cooks?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> Only if you regularly process large volumes (10+ pounds per
                  session). For typical home use—even serious cooking—a Cuisinart DLC-10 or KitchenAid
                  processor handles 95% of tasks at a fraction of the investment.</p>
                  
                  <p>The R2 Dice excels when you need to process ingredients for dozens of servings multiple
                  times per week. If you&apos;re meal-prepping for one family or cooking for dinner parties
                  occasionally, residential equipment is more appropriate and easier to maintain.</p>
                </div>
              </div>
            </div>

            {/* Question 4 */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>What is the difference between R2 Dice and R2N?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> The R2 Dice has a 2 HP motor vs the R2N&apos;s standard motor.
                  For dense vegetables, hard cheeses, and continuous high-volume use, the extra horsepower
                  prevents stalling and maintains consistent speed under load.</p>
                  
                  <p>For lighter-duty commercial use (smaller cafes, prep volumes under 50 servings per service),
                  the R2N is adequate at lower cost. But for serious commercial operations processing hundreds
                  of servings daily, the R2 Dice&apos;s power advantage is worth the investment.</p>
                </div>
              </div>
            </div>

            {/* Question 5 */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>How long do the blades and discs last under commercial use?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> Based on our Purple Cafe experience: shredding discs last 12-18
                  months with daily heavy use, slicing blades 18-24 months. The S-blade for chopping lasts 2+
                  years with proper care.</p>
                  
                  <p>Replacement components are reasonably priced for commercial equipment. Performance degradation
                  is gradual—you&apos;ll notice slightly longer processing times before complete failure. Keep spare
                  discs on hand for busy operations to avoid downtime.</p>
                </div>
              </div>
            </div>

            {/* Question 6 */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>What electrical requirements are needed?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> Requires a standard 120V 15-amp circuit. Verify your kitchen
                  circuit can handle the load, especially if sharing with other equipment. Dedicated circuit
                  recommended for heavy daily use to prevent breaker trips during peak operations.</p>
                  
                  <p>Most commercial kitchens have adequate power, but verify before installation. The 2 HP motor
                  draws significant amperage during startup and under heavy load.</p>
                </div>
              </div>
            </div>

            {/* Question 7 */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>How does this compare to the Cuisinart DLC-10 for commercial use?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> The R2 Dice is purpose-built for commercial operations with a
                  2 HP motor, continuous feed design, and commercial-grade construction. The Cuisinart is
                  excellent for home use but cannot sustain the speed and durability needed for daily commercial
                  operations.</p>
                  
                  <p>The Cuisinart will overheat and stall under continuous high-volume processing. It&apos;s
                  designed for batch processing with rest periods between uses. The Robot Coupe handles
                  continuous operation for hours without degradation.</p>
                </div>
              </div>
            </div>

            {/* Question 8 - NEW */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>What size operation needs the Robot Coupe R2 Dice?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> This processor is designed for operations processing significant
                  volumes daily. If you&apos;re preparing food for 50+ covers per service, catering events
                  regularly, or running high-volume prep operations, the R2 Dice delivers the speed and
                  reliability you need.</p>
                  
                  <p>For smaller operations or occasional high-volume needs, consider the standard R2N model or
                  quality home processors. The continuous feed design and commercial motor really shine when
                  you&apos;re processing pounds of ingredients multiple times per day.</p>
                </div>
              </div>
            </div>

            {/* Question 9 - NEW */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>Can I use the Robot Coupe R2 Dice for purées and wet ingredients?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> While the R2 Dice can handle some wet ingredients, it excels at
                  slicing, shredding, and dicing rather than puréeing. The continuous feed design and processing
                  discs are optimized for solid foods.</p>
                  
                  <p>For purées, soups, and sauces, we used our Vitamix 5200 blender alongside the Robot Coupe.
                  Together, they covered every processing need in our commercial kitchen. The Robot Coupe for
                  prep work, the Vitamix for purées and liquid-based tasks.</p>
                </div>
              </div>
            </div>

            {/* Question 10 - NEW */}
            <div className="my-5 p-5 bg-gray-50 rounded-md">
              <h3>What maintenance does the Robot Coupe R2 Dice require?</h3>
              <div>
                <div>
                  <p><strong>Answer:</strong> Daily maintenance is straightforward: thorough cleaning of all
                  components after each use, checking blade sharpness weekly, and inspecting seals monthly.
                  The polycarbonate bowl should be checked for cracks or wear every few months.</p>
                  
                  <p>Every 6-12 months under commercial use, have components professionally inspected. Blades
                  should be professionally sharpened or replaced when performance decreases. Proper maintenance
                  extends component life significantly and ensures consistent performance throughout the
                  machine&apos;s lifespan.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom Line with Strong Final CTA */}
        <section className="mb-8" id="verdict">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Bottom Line: My Professional Verdict</h2>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-lg my-8">

            <h3 className="text-white mt-0 text-2xl">
              After 3 Years of Daily Commercial Use...
            </h3>

            <p className="text-lg leading-relaxed">
              The Robot Coupe R2 Dice proved itself as essential commercial equipment that pays for itself
              through efficiency gains. The combination of 5/5 performance ratings for speed, efficiency,
              and cut quality—combined with exceptional reliability under high-volume demands—makes this
              processor significantly superior to home alternatives.
            </p>

            <p className="text-lg leading-relaxed">
              Professional kitchens report saving hours of labor daily. The continuous feed design and
              commercial-grade motor process massive volume quickly—this is equipment that transforms prep
              operations and pays for itself through labor savings.
            </p>

            <div className="bg-white/20 p-5 my-5 rounded-md">
              <p className="m-0 text-xl font-bold">
                Final Rating: ⭐⭐⭐⭐⭐ 4.7/5
              </p>
              <ul className="mt-4 mb-0 ml-5 text-base leading-relaxed">
                <li>Speed & Efficiency: 5/5</li>
                <li>Cut Quality & Consistency: 5/5</li>
                <li>Commercial Reliability: 5/5</li>
                <li>Ease of Cleaning: 4/5</li>
              </ul>
            </div>

            <p className="text-base mb-0">
              <strong>Would I buy this again?</strong> Without hesitation. This is the kind of equipment
              that becomes indispensable—highly recommended for any serious commercial kitchen.
            </p>

          </div>

          {/* STRONG FINAL CTA */}
          <div className="bg-yellow-100 p-8 my-8 rounded-lg text-center border-4 border-yellow-400">

            <h3 className="mt-0 text-3xl">
              Ready to Transform Your Prep Operations?
            </h3>

            <p className="text-lg my-5">
              Check current availability and invest in equipment that pays for itself:
            </p>

            <CTAVisibilityTracker
              ctaId={`review-${productData.slug}-final_cta`}
              position="final_cta"
              productSlug={productData.slug}
              merchant="amazon"
            >
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
              >
                Check Current Price →
              </a>
            </CTAVisibilityTracker>

            {/* Text link fallback */}
            <p className="text-center mt-3 text-sm">
              <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
                target="_blank" rel="noopener noreferrer sponsored">
                → View {productData.name} on Amazon
              </a>
            </p>

            <p className="text-sm text-gray-600 mt-5">
              💡 Commercial equipment suppliers will be added soon
            </p>

          </div>
        </section>

        {/* Content Upgrade Email Capture */}
        <section className="mb-8">
          <div className="bg-blue-50 p-8 my-8 rounded-lg border-l-4 border-blue-600">

            <h3 className="mt-0 text-2xl">
              🔥 Get My Complete Commercial Kitchen Equipment Guide
            </h3>

            <p className="text-base leading-relaxed">
              Download my comprehensive guide to commercial kitchen equipment selection, developed over
              24 years of restaurant experience:
            </p>

            <ul className="my-4 text-base leading-relaxed">
              <li>✔ Commercial vs residential equipment comparison matrix</li>
              <li>✔ ROI calculation worksheet for equipment investments</li>
              <li>✔ NSF certification requirements explained</li>
              <li>✔ Maintenance schedules for commercial equipment longevity</li>
              <li>✔ Vendor selection and negotiation strategies</li>
              <li>✔ Equipment sizing guide for different operation volumes</li>
            </ul>

            <div className="text-center mt-6">
              <Link
                href="/newsletter"
                className="inline-block bg-blue-600 text-white px-10 py-4 no-underline rounded-md font-bold text-lg hover:bg-blue-700"
              >
                Download Free Guide →
              </Link>
            </div>

            <p className="text-xs text-gray-600 mt-4 text-center">
              Instant delivery. No spam, ever. Unsubscribe anytime.
            </p>

          </div>
        </section>

        {/* Related Products Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Complete Your Commercial Kitchen Setup</h2>

          <p className="text-base leading-relaxed mb-6">
            A commercial food processor is essential prep equipment, but it works best as part of a
            complete professional kitchen. Based on 24 years of restaurant experience, here are the
            tools I used alongside this processor:
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 my-8">

            {/* Product 1 */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
              <h3 className="mt-0">KitchenAid Commercial Mixer</h3>
              <p>The commercial mixer that worked alongside the Robot Coupe in our prep operations.
              Together, they transformed our prep efficiency and paid for themselves in months.</p>
              <p className="text-sm text-gray-600">
                <strong>After 18 months:</strong> Essential commercial equipment.
              </p>
              <Link
                href="/reviews/kitchenaid-ksm8990wh"
                className="inline-block bg-green-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 font-bold hover:bg-green-700"
              >
                Read Full Review →
              </Link>
            </div>

            {/* Product 2 */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
              <h3 className="mt-0">John Boos Commercial Cutting Board</h3>
              <p>The prep surface where we staged ingredients before processing. The 24x18 size provides
              perfect workspace for high-volume prep operations.</p>
              <p className="text-sm text-gray-600">
                <strong>After 18 years:</strong> Still my daily prep station.
              </p>
              <Link
                href="/reviews/john-boos-platinum-commercial-cutting-board"
                className="inline-block bg-green-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 font-bold hover:bg-green-700"
              >
                Read Full Review →
              </Link>
            </div>

            {/* Product 3 */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
              <h3 className="mt-0">Rubbermaid Commercial Scraper</h3>
              <p>Essential for scraping down the Robot Coupe bowl between batches. This professional-grade rubber spatula handles the demands of commercial food processing and lasts decades.</p>
              <p className="text-sm text-gray-600">
                <strong>After 18 years:</strong> Still my go-to scraper for food processor cleanup.
              </p>
              <Link
                href="/reviews/rubbermaid-commercial-cooks-scraper"
                className="inline-block bg-green-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 font-bold hover:bg-green-700"
              >
                Read Full Review →
              </Link>
            </div>

          </div>

          <p className="text-center my-8 text-lg p-5 bg-gray-50 rounded-md">
            <strong>Equipping a complete commercial kitchen?</strong><br/>
            <Link href="/kitchen-bundle" className="text-blue-600 font-bold text-xl hover:underline">
              See My Complete Commercial Kitchen Setup Guide →
            </Link>
          </p>
        </section>

        {/* Social Proof */}
        <TestimonialsSection />

        {/* EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* Footer Transparency Elements */}
        <section className="mb-8">
          <div className="bg-gray-50 p-5 my-8 rounded-md border-l-4 border-gray-500">
            <p className="my-2.5">
              <strong>📅 Last Updated:</strong> {new Date(productData.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="my-2.5">
              <strong>🔍 Next Review:</strong> {new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
            <p className="my-2.5">
              <strong>💬 Own a Robot Coupe?</strong> Share your experience in the comments below—I
              read and respond to every comment.
            </p>
            <p className="my-2.5">
              <strong>📧 Questions about commercial equipment?</strong> <Link href="/contact" className="text-blue-600 hover:underline">
              Contact me directly</Link> and I&apos;ll help you make the best decision for your operation.
            </p>
          </div>

          {/* Author Bio Box */}
          <AuthorBio />
        </section>

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(faqData))
          }}
        />
      </article>
    </div>
  )
}