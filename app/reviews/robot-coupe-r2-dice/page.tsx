import Link from 'next/link'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import {
  ReviewHero,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  BottomLineSection,
  RelatedProductsGrid,
} from '@/components/review'
import EmailCaptureSection from '@/components/review/EmailCaptureSection'
import AuthorBio from '@/components/review/AuthorBio'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'
import AmazonCTA from '@/components/AmazonCTA'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'

import type { Metadata } from 'next'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { reviewData } from './robot-coupe-r2-dice-data'
import { getFoodProcessorComparison } from './food-processor-comparison-data'

const PRODUCT_SLUG = 'robot-coupe-r2-dice'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('robot-coupe-r2-dice')
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }
  const productData = product

  return {
    title: centralMeta.title,
    description: centralMeta.description,
    alternates: {
      canonical: centralMeta.canonical,
    },
    openGraph: {
      title: centralMeta.ogTitle || centralMeta.title,
      description: centralMeta.ogDescription || centralMeta.description,
      url: centralMeta.canonical,
      siteName: 'Chef Approved Tools',
      images: [
        {
          url: centralMeta.imageUrl || generateOGImageURL({
            title: productData.name,
            rating: productData.expertRating ?? 4.9,
            testingPeriod: centralMeta.testingPeriod,
            tier: centralMeta.tier,
          }),
          width: 1200,
          height: 630,
          alt: centralMeta.imageAlt || `${productData.name} - Professional Review`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: centralMeta.ogTitle || centralMeta.title,
      description: centralMeta.ogDescription || centralMeta.description,
      images: [centralMeta.imageUrl || generateOGImageURL({
        title: productData.name,
        rating: productData.expertRating ?? 4.9,
        testingPeriod: centralMeta.testingPeriod,
        tier: centralMeta.tier,
      })],
    },
  }
}

export default async function RobotCoupeR2DiceReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const comparisonData = await getFoodProcessorComparison()

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product.category)

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  }

  // Get primary affiliate link
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  // Generate breadcrumbs with category
  const breadcrumbs = categoryBreadcrumb
    ? [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: categoryBreadcrumb.label, url: `https://www.chefapprovedtools.com${categoryBreadcrumb.href}` },
        { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
      ]
    : [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: 'Reviews', url: 'https://www.chefapprovedtools.com/reviews' },
        { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
      ]

  return (
    <>
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={1}
        testingPeriod="5 years commercial use"
        rating={4.7}
        hook="Commercial power. Prep time reduced by 60% vs manual."
        category="Food Processors"
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            {categoryBreadcrumb ? (
              <>
                <Link href={categoryBreadcrumb.href} className="hover:text-orange-700">{categoryBreadcrumb.label}</Link>
                {' / '}
              </>
            ) : (
              <>
                <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
                {' / '}
              </>
            )}
            {productData.name}
          </div>

          {/* SECTION 1: HERO */}
          <ReviewHero
            title={reviewData.header.title}
            authorName={reviewData.header.author}
            authorCredentials="45 Years Cooking Experience"
            rating={productData.expertRating ?? reviewData.header.expertRating}
            tierBadge={tierBadge}
            verdict={reviewData.professionalVerdict.paragraphs[0]}
            verdictStrong="essential commercial equipment"
            publishedDate={gitDates.firstPublished}
            lastUpdated={gitDates.lastUpdated}
            customCTA={
              <AmazonCTA
                productSlug={PRODUCT_SLUG}
                affiliateUrl={affiliateUrl}
                position="above_fold"
              />
            }
          />

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200" role="navigation" aria-label="Quick page navigation">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testing" aria-label="Jump to testing results section" className="text-orange-700 hover:text-orange-800">Testing Results</a>
            <span className="text-slate-600">|</span>
            <a href="#reviews" aria-label="Jump to user reviews section" className="text-orange-700 hover:text-orange-800">User Reviews</a>
            <span className="text-slate-600">|</span>
            <a href="#comparison" aria-label="Jump to R2 Dice vs R2N comparison section" className="text-orange-700 hover:text-orange-800">R2 Dice vs R2N</a>
            <span className="text-slate-600">|</span>
            <a href="#pricing" aria-label="Jump to pricing section" className="text-orange-700 hover:text-orange-800">Pricing</a>
            <span className="text-slate-600">|</span>
            <a href="#who-buys" aria-label="Jump to buyer recommendations section" className="text-orange-700 hover:text-orange-800">Who Should Buy</a>
            <span className="text-slate-600">|</span>
            <a href="#faq" aria-label="Jump to FAQ section" className="text-orange-700 hover:text-orange-800">FAQ</a>
            <span className="text-slate-600">|</span>
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

        {/* Mid-Article CTA */}
        <div className="text-center my-8">
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="mid_article"
          />
        </div>

        {/* User Reviews */}
        <section className="mb-8" id="reviews">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What Real Users Are Saying</h2>
          <p className="text-sm text-slate-700 mb-4 italic">
            Customer reviews curated from WebstaurantStore verified purchasers. These represent selected experiences.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;After 2 years in our busy cafe, this Robot Coupe has been worth every penny. We process 15-20 lbs of vegetables daily—the continuous feed design means we can keep working without stopping to empty the bowl constantly. Saves us at least 2 hours of prep time daily.&quot;
              </p>
              <p className="text-sm text-slate-600">— WebstaurantStore verified purchaser (J.K., August 2024) | Cafe Operations</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;Upgraded from a home-grade Cuisinart and the difference is night and day. The 2 HP motor handles hard cheeses without bogging down. The continuous feed transforms volume prep. Expensive upfront but pays for itself quickly in labor savings.&quot;
              </p>
              <p className="text-sm text-slate-600">— WebstaurantStore verified purchaser (M.R., July 2024) | Small Restaurant</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;We use this for catering prep—the ability to process large quantities quickly is essential. The consistency of cuts is excellent for professional presentation. Only downside is cleaning takes 15 minutes after heavy use, but that&apos;s the trade-off for commercial capacity.&quot;
              </p>
              <p className="text-sm text-slate-600">— WebstaurantStore verified purchaser (S.L., June 2024) | Catering Business</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;Solid machine but be prepared: it&apos;s MUCH larger than home food processors. Make sure you have the counter space (we had to rearrange our prep station). Also needed an electrician to verify our circuit could handle it.&quot;
              </p>
              <p className="text-sm text-slate-600">— WebstaurantStore verified purchaser (D.T., May 2024) | Restaurant Kitchen</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;Been using this daily for 18 months in our pizza shop for cheese shredding. The blades and discs do wear—we replaced the shredding disc after 14 months of heavy use. Factor replacement parts into your budget.&quot;
              </p>
              <p className="text-sm text-slate-600">— WebstaurantStore verified purchaser (A.P., April 2024) | Pizzeria</p>
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
        <ProsConsGrid
          title="Pros & Cons Based on Professional Use"
          pros={productData.pros}
          cons={productData.cons}
        />

        {/* COMPARISON TABLE */}
        <section className="my-12">
          <ProductComparisonTable
            title={comparisonData.title}
            subtitle={comparisonData.subtitle}
            products={comparisonData.products}
            comparisonRows={comparisonData.comparisonRows}
            highlightedProduct={comparisonData.highlightedProduct}
          />

          {/* POST-COMPARISON CTA */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="comparison_table"
          />
        </section>

        {/* Who Should Buy This */}
        <WhoShouldBuyGrid
          title="Who Should (and Shouldn't) Buy This Processor"
          perfectFor={reviewData.whoShouldBuy.idealFor}
          considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
        />

        {/* CTA - AFTER WHO SHOULD BUY */}
        <AmazonCTA
          productSlug={PRODUCT_SLUG}
          affiliateUrl={affiliateUrl}
          position="who_should_buy"
          boxHeading="Sound like the right fit for your kitchen?"
        />

        {/* FAQ Section */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

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

          {/* FINAL CTA */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="final_cta"
          />
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
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* Social Proof */}
        <TestimonialsSection />

        {/* EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* Bottom Line Section with Click Tracking */}
        <BottomLineSection
          title={reviewData.bottomLine.title}
          paragraphs={reviewData.bottomLine.paragraphs}
          ctaText={reviewData.bottomLine.ctaText}
          ctaUrl={affiliateUrl}
          productSlug={productData.slug}
        />

        {/* Author Bio Box */}
        <AuthorBio />

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
            __html: JSON.stringify(generateFAQSchema(reviewData.faq.items))
          }}
        />
        </div>
      </div>

      {/* STICKY MOBILE CTA */}
      <StickyMobileCTAWrapper
        productName={productData.name}
        affiliateUrl={affiliateUrl}
        merchant="amazon"
        productSlug={productData.slug}
      />
    </>
  )
}