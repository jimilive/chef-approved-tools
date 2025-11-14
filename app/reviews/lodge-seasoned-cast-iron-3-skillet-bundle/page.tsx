import Link from 'next/link'
import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import { getReviewMetadata } from '@/data/metadata'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  ReviewHero,
  TestingResultsGrid,
  PerformanceAnalysis,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'
import AuthorBio from '@/components/review/AuthorBio'

// Import review data
import { reviewData } from './lodge-seasoned-cast-iron-3-skillet-bundle-data'

// Use ISR for better performance - revalidate every hour for price changes
export const revalidate = 3600 // 1 hour in seconds

// Enable fetch caching for Supabase requests
export const fetchCache = 'force-cache'

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('lodge-seasoned-cast-iron-3-skillet-bundle')
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
            rating: productData.expertRating ?? reviewData.hero.rating,
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
        rating: productData.expertRating ?? reviewData.hero.rating,
        testingPeriod: centralMeta.testingPeriod,
        tier: centralMeta.tier,
      })],
    },
  }
}

// Helper function to process inline product links
function processInlineLinks(text: string, affiliateUrl: string, productName: string): (string | JSX.Element)[] {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/g)
  return parts.map((part, index) => {
    if (part.startsWith('<LINK>') && part.endsWith('</LINK>')) {
      const linkText = part.slice(6, -7)
      return (
        <a
          key={index}
          href={affiliateUrl}
          className="text-orange-700 hover:text-orange-800 font-medium no-underline hover:underline"
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          {linkText}
        </a>
      )
    }
    return part
  })
}

export default async function LodgeCastIronReviewPage() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  // Get primary affiliate link
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: "Cookware", url: "https://www.chefapprovedtools.com/cookware" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  // Generate schemas
  const productSchema = generateProductSchema({
    name: productData.name,
    slug: productData.slug,
    description: productData.expertOpinion,
    brand: productData.brand,
    rating: productData.expertRating,
    reviewCount: 1,
    url: `https://www.chefapprovedtools.com/reviews/${productData.slug}`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const faqSchema = generateFAQSchema(reviewData.faqData)

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
            {' / '}
            {reviewData.breadcrumb.productName}
          </div>

          {/* SECTION 1: HERO */}
          <ReviewHero
            title={reviewData.hero.title}
            authorName={reviewData.hero.authorName}
            authorCredentials={reviewData.hero.authorCredentials}
            rating={reviewData.hero.rating}
            tierBadge={reviewData.hero.tierBadge}
            verdict={reviewData.hero.verdict}
            verdictStrong={reviewData.hero.verdictStrong}
            publishedDate="November 10, 2025"
            lastUpdated="November 10, 2025"
            customCTA={
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                {/* Quick Stats */}
                <div className="bg-gray-50 p-5 mb-5 border-l-4 border-green-600 rounded">
                  <p className="m-0 text-base leading-relaxed">
                    <strong>{reviewData.quickStats.rating}</strong> | {reviewData.quickStats.context}<br/>
                    {reviewData.quickStats.highlights.map((highlight, i) => (
                      <span key={i}>
                        <strong>{highlight}</strong>
                        {i < reviewData.quickStats.highlights.length - 1 ? ' | ' : ''}
                      </span>
                    ))}
                  </p>
                </div>

                {/* CTA Button */}
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-hero-cta`}
                  position="above_fold"
                  productSlug={reviewData.productSlug}
                  merchant="amazon"
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.hero.ctaText}
                  </a>
                </CTAVisibilityTracker>

                {/* Text link under button */}
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    → View {productData.name} on Amazon
                  </a>
                </p>

                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases. Price and availability may change.
                </p>
              </div>
            }
          />

          {/* CUSTOM SECTION: SKILLET SPECIFICATIONS */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              3-Skillet Bundle Specifications
            </h2>
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Skillet Size</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Weight</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Cooking Surface</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Capacity</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Best For</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Value Note</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.skilletSpecs.map((skillet, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border border-slate-300 p-3 font-medium text-slate-900">{skillet.size}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.weight}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.cookingSurface}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.capacity}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.bestFor}</td>
                      <td className="border border-slate-300 p-3 text-green-700 font-semibold">{skillet.valueNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4 italic">
              All three sizes used equally in testing. The 12-inch is most versatile if buying only one.
            </p>
          </div>

          {/* SECTION 2: TESTING RESULTS */}
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
          />

          {/* CUSTOM SECTION: COOKING PERFORMANCE TABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Cooking Technique Performance Analysis
            </h2>
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Cooking Technique</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Performance Rating</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Testing Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.cookingTests.map((test, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border border-slate-300 p-3 font-medium text-slate-900">{test.technique}</td>
                      <td className="border border-slate-300 p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-700">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < test.performance ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600">({test.performance}/5)</span>
                        </div>
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">{test.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4 italic">
              All performance ratings based on 7 years of weekly home testing.
            </p>
          </div>

          {/* CUSTOM SECTION: SEASONING GUIDE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Professional Seasoning & Maintenance Guide
            </h2>
            <p className="text-slate-700 mb-6">
              Proper seasoning maintenance is crucial for cast iron performance. Here&apos;s the professional approach developed over years of restaurant use:
            </p>
            <div className="space-y-4">
              {reviewData.seasoningGuide.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-800">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.step}</h3>
                    <p className="text-sm text-slate-700">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-700 mt-6">
              <strong>Maintenance Reality After 7 Years:</strong> If you use cast iron regularly, the cooking
              process maintains seasoning naturally. You don&apos;t need constant oven-seasoning. Regular cooking
              with fats builds seasoning over time. The critical rule: <strong>Never leave water or acidic products
              in or on the skillet.</strong> This is the #1 cause of seasoning damage and rust.
            </p>
          </div>

          {/* CUSTOM SECTION: COMPARISON TABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Lodge vs Cast Iron Competition
            </h2>
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Feature</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Lodge 3-Skillet Set</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Victoria Cast Iron</th>
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Le Creuset Cast Iron</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-slate-300 p-3 font-medium">Value Proposition</td>
                    <td className="border border-slate-300 p-3 text-green-700">Outstanding value for 3-piece set</td>
                    <td className="border border-slate-300 p-3 text-blue-600">Premium pricing for similar set</td>
                    <td className="border border-slate-300 p-3 text-orange-800">Luxury investment pricing</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium">Pre-Seasoning</td>
                    <td className="border border-slate-300 p-3 text-green-700">Vegetable oil seasoning</td>
                    <td className="border border-slate-300 p-3 text-blue-600">Flaxseed oil seasoning</td>
                    <td className="border border-slate-300 p-3 text-orange-800">Enameled (no seasoning)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-slate-300 p-3 font-medium">Made In</td>
                    <td className="border border-slate-300 p-3 text-green-700">Tennessee, USA</td>
                    <td className="border border-slate-300 p-3 text-blue-600">Colombia</td>
                    <td className="border border-slate-300 p-3 text-orange-800">France</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium">Performance</td>
                    <td className="border border-slate-300 p-3 text-green-700">5/5 heat retention</td>
                    <td className="border border-slate-300 p-3 text-gray-600">Comparable performance</td>
                    <td className="border border-slate-300 p-3 text-orange-800">Excellent for braising</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-slate-300 p-3 font-medium">Best For</td>
                    <td className="border border-slate-300 p-3 text-green-700">High-heat searing, everyday use</td>
                    <td className="border border-slate-300 p-3 text-gray-600">Budget-conscious buyers</td>
                    <td className="border border-slate-300 p-3 text-orange-800">Low-acid cooking, presentation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4 italic">
              All comparisons based on professional kitchen testing and long-term durability assessment.
            </p>
          </div>

          {/* SECTION 4: PROS & CONS */}
          <ProsConsGrid
            title={reviewData.prosConsTitle}
            prosTitle={reviewData.prosTitle}
            consTitle={reviewData.consTitle}
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* SECTION 5: WHO SHOULD BUY */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
          />

          {/* SECTION 6: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 7: WHERE TO BUY */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.whereToBuy.title}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {reviewData.whereToBuy.introText}
            </p>

            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
                <p className="text-sm text-slate-800 mb-4">Prime shipping, verified reviews, easy returns</p>
              </div>

              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-where-to-buy-cta`}
                position="mid_article"
                productSlug={reviewData.productSlug}
                merchant="amazon"
              >
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                >
                  Check Price on Amazon →
                </a>
              </CTAVisibilityTracker>

              {/* Text link under button */}
              <p className="text-center mt-3 text-sm">
                <a
                  href={affiliateUrl}
                  className="text-orange-700 hover:text-orange-800 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  → View {productData.name} on Amazon
                </a>
              </p>

              <p className="text-xs text-slate-700 text-center mt-3">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
            </div>

            <p className="text-sm text-slate-600 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 8: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 9: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed">
                {processInlineLinks(paragraph, affiliateUrl, productData.name)}
              </p>
            ))}
            customCTA={
              <div className="bg-white rounded-xl p-6">
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-bottom-line-cta`}
                  position="final_cta"
                  productSlug={reviewData.productSlug}
                  merchant="amazon"
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.bottomLine.ctaText}
                  </a>
                </CTAVisibilityTracker>

                {/* Text link under button */}
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    → View {productData.name} on Amazon
                  </a>
                </p>

                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases.
                </p>
              </div>
            }
          />

          {/* SECTION 10: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 11: AUTHOR BIO */}
          <AuthorBio />

        </div>
      </div>

      {/* Product view tracking - moved to bottom to avoid blocking first paint */}
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={productData.expertRating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />
    </>
  )
}
