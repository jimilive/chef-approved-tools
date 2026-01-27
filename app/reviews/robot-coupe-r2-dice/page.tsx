import Link from 'next/link'
import type { Metadata } from 'next'
import TestimonialsSection from '@/components/TestimonialsSection'
import FTCDisclosure from '@/components/FTCDisclosure'
import {
  ReviewHero,
  TestingResultsGrid,
  PerformanceAnalysis,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  BottomLineSection,
  RelatedProductsGrid,
} from '@/components/review'
import EmailCaptureSection from '@/components/review/EmailCaptureSection'
import AmazonCTA from '@/components/AmazonCTA'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import ReviewLayout from '@/components/review/ReviewLayout'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
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
          url: getProductOgImage(PRODUCT_SLUG),
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
      images: [getProductOgImage(PRODUCT_SLUG)],
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

  return (
    <ReviewLayout
      product={product}
      slug={PRODUCT_SLUG}
      affiliateUrl={affiliateUrl}
      gitDates={gitDates}
      categoryBreadcrumb={categoryBreadcrumb}
      faqData={reviewData.faq.items}
      tier={reviewData.metadata.tier as 1 | 2 | 3}
      testingPeriod="5 years commercial use"
      hook="Commercial power. Prep time reduced by 60% vs manual."
      backLinkHref="/appliances"
      backLinkText="Browse all Small Appliances"
    >
      {/* SECTION 1: HERO */}
      <ReviewHero
        title={reviewData.header.title}
        authorName={reviewData.header.author}
        authorCredentials="24 Years in Professional Kitchens"
            rating={productData.expertRating ?? reviewData.header.expertRating}
            tierBadge={tierBadge}
            verdict={reviewData.professionalVerdict.paragraphs[0]}
            verdictStrong="essential commercial equipment"
            publishedDate={gitDates.firstPublished}
            lastUpdated={gitDates.lastUpdated}
            heroImage={getProductHeroImage(PRODUCT_SLUG)}
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
            <span className="text-slate-700">|</span>
            <a href="#reviews" aria-label="Jump to user reviews section" className="text-orange-700 hover:text-orange-800">User Reviews</a>
            <span className="text-slate-700">|</span>
            <a href="#comparison" aria-label="Jump to R2 Dice vs R2N comparison section" className="text-orange-700 hover:text-orange-800">R2 Dice vs R2N</a>
            <span className="text-slate-700">|</span>
            <a href="#pricing" aria-label="Jump to pricing section" className="text-orange-700 hover:text-orange-800">Pricing</a>
            <span className="text-slate-700">|</span>
            <a href="#who-buys" aria-label="Jump to buyer recommendations section" className="text-orange-700 hover:text-orange-800">Who Should Buy</a>
            <span className="text-slate-700">|</span>
            <a href="#faq" aria-label="Jump to FAQ section" className="text-orange-700 hover:text-orange-800">FAQ</a>
            <span className="text-slate-700">|</span>
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
              doing in minutes what used to take hours, saving significant labor costs daily.</p>
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
              reliability under continuous commercial use, rated 5/5 for durability.</p>
            </div>

          </div>
        </section>

        {/* Real-World Testing */}
        <div id="testing">
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />
        </div>

        {/* PERFORMANCE ANALYSIS */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections}
        />

        {/* Mid-Article CTA */}
        <div className="text-center my-8">
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="mid_article"
            variant="textLink"
          />
        </div>

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
              and cut quality, combined with exceptional reliability under high-volume demands, makes this
              processor significantly superior to home alternatives.
            </p>

            <p className="text-lg leading-relaxed">
              Professional kitchens report saving hours of labor daily. The continuous feed design and
              commercial-grade motor process massive volume quickly. This is equipment that transforms prep
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
              that becomes indispensable and highly recommended for any serious commercial kitchen.
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
          <div className="bg-orange-50 p-8 my-8 rounded-lg border-l-4 border-orange-600">

            <h3 className="mt-0 text-2xl">
              🔥 Get My Complete Commercial Kitchen Equipment Guide
            </h3>

            <p className="text-base leading-relaxed">
              Download my complete guide to commercial kitchen equipment selection, developed over
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

            <p className="text-xs text-gray-700 mt-4 text-center">
              Instant delivery. No spam, ever. Unsubscribe anytime.
            </p>

          </div>
        </section>

        <div className="text-center my-8">
          <Link
            href="/appliances"
            className="text-orange-700 hover:text-orange-800 font-medium"
          >
            Explore more Small Appliances →
          </Link>
        </div>

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

        {/* AuthorBio, ProductViewTracker, and StickyMobileCTA handled by ReviewLayout */}
    </ReviewLayout>
  )
}