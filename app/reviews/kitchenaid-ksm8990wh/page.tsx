import Link from 'next/link'
import type { Metadata } from 'next'
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
import TestimonialsSection from '@/components/TestimonialsSection'

// Import review data
import { reviewData } from './kitchenaid-ksm8990wh-data'

// CACHE-BUSTING: Prevent Next.js from serving stale HTML
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('kitchenaid-ksm8990wh')
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
function processInlineLinks(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/g)

  return parts.map((part, index) => {
    if (part.startsWith('<LINK>') && part.endsWith('</LINK>')) {
      const linkText = part.slice(6, -7)
      return (
        <a
          key={index}
          href="#primary-cta"
          className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700"
        >
          {linkText}
        </a>
      )
    }
    return part
  })
}

export default async function KitchenAidCommercialReviewPage() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }
  const productData = product

  // ===== STRATEGIC AFFILIATE LINK SELECTION =====
  // Priority: Supabase primary link > Strategic primary > Fallback
  const primaryLink = product ? getPrimaryAffiliateLink(product) : reviewData.strategicLinks.primary.url
  const compareLink = reviewData.strategicLinks.secondary.url
  const trustLink = reviewData.strategicLinks.tertiary.url

  // Get Amazon affiliate link from database
  const amazonLink = product?.affiliateLinks.find(link => link.merchant === 'amazon')?.url || ''

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: "Appliances", url: "https://www.chefapprovedtools.com/appliances" },
    { name: reviewData.breadcrumb.productName, url: `https://www.chefapprovedtools.com/reviews/${reviewData.productSlug}` }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={reviewData.productSlug}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
        hook={reviewData.tracking.hook}
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
        {/* SECTION 1: HERO */}
        <div className="mb-8">
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
            ctaUrl={primaryLink}
            ctaText={reviewData.hero.ctaText}
            customCTA={(
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                {/* DUAL CTA Buttons - Amazon + KitchenAid */}
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  {/* Amazon CTA */}
                  <CTAVisibilityTracker
                    ctaId={`${reviewData.productSlug}-hero-amazon`}
                    position="above_fold"
                    productSlug={reviewData.productSlug}
                    merchant="amazon"
                  >
                    <a
                      href={amazonLink}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                    >
                      Check Price on Amazon
                    </a>
                  </CTAVisibilityTracker>

                  {/* KitchenAid Direct CTA */}
                  <CTAVisibilityTracker
                    ctaId={`${reviewData.productSlug}-hero-kitchenaid`}
                    position="above_fold"
                    productSlug={reviewData.productSlug}
                    merchant="kitchenaid"
                  >
                    <a
                      href={primaryLink}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                    >
                      {reviewData.hero.ctaText}
                    </a>
                  </CTAVisibilityTracker>
                </div>

                {/* SECONDARY CTA - Compare Link (Evergreen Link EPC: $193.89!) */}
                <p className="text-center text-sm mb-3">
                  <a
                    href={compareLink}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    → Compare All KitchenAid Stand Mixers
                  </a>
                </p>

                <p className="text-xs text-slate-600 text-center">
                  As an Amazon and KitchenAid affiliate, I earn from qualifying purchases. Price and availability may change.
                </p>
              </div>
            )}
          />
        </div>

        {/* SECTION 2: TESTING RESULTS */}
        <div className="mb-8" id="primary-cta">
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '')}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />
        </div>

        {/* SECTION 3: PERFORMANCE ANALYSIS */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections.map(section => ({
            ...section,
            content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '')}</>
          }))}
        />

        {/* COMMERCIAL VS RESIDENTIAL COMPARISON */}
        <section className="mb-8 bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            Commercial vs. Residential: Why the Upgrade Matters
          </h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">KitchenAid Commercial</th>
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
                  <td className="p-4 text-green-700">Stainless, dishwasher safe</td>
                  <td className="p-4 text-gray-600">Cast aluminum, hand wash</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium">Warranty</td>
                  <td className="p-4 text-green-700">2 years commercial</td>
                  <td className="p-4 text-gray-600">1 year residential</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium">NSF Certified</td>
                  <td className="p-4 text-green-700">✅ Yes</td>
                  <td className="p-4 text-red-600">❌ No</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium">Price Range</td>
                  <td className="p-4 text-orange-800">Premium tier</td>
                  <td className="p-4 text-gray-600">Consumer tier</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* COMPETITOR COMPARISON */}
        <section className="mb-8 bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            How It Stacks Up Against True Commercial Competitors
          </h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-4 font-semibold">Mixer</th>
                  <th className="text-left p-4 font-semibold">Price</th>
                  <th className="text-left p-4 font-semibold">Motor</th>
                  <th className="text-left p-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-orange-50">
                  <td className="p-4 font-semibold">KitchenAid Commercial</td>
                  <td className="p-4">Premium prosumer</td>
                  <td className="p-4">1.3 HP</td>
                  <td className="p-4">Small bakeries, serious home use, catering</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">Hobart N50</td>
                  <td className="p-4">High-end commercial</td>
                  <td className="p-4">0.2 HP (gear-driven)</td>
                  <td className="p-4">High-volume commercial (5+ hours daily)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4">Globe SP8</td>
                  <td className="p-4">Mid-range commercial</td>
                  <td className="p-4">0.33 HP</td>
                  <td className="p-4">Mid-volume commercial</td>
                </tr>
                <tr>
                  <td className="p-4">Avantco MX20</td>
                  <td className="p-4">Entry commercial</td>
                  <td className="p-4">1 HP</td>
                  <td className="p-4">Budget commercial (quality concerns)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-slate-800 mb-0">
              <strong>Value Analysis:</strong> This KitchenAid Commercial mixer delivers 85-90% of the Hobart&apos;s capability at 32% of the cost. For operations mixing under 4 hours daily, the price-to-performance ratio is unmatched.
            </p>
          </div>
        </section>

        {/* ELECTRICAL REQUIREMENTS */}
        <section className="mb-8 bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            Critical Electrical Requirements Explained
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
            <p className="text-slate-700 mb-4">
              The 500W power draw can cause issues on shared kitchen circuits:
            </p>
            <div className="mb-4">
              <p className="font-semibold text-slate-900 mb-2">When you need a dedicated circuit:</p>
              <ul className="space-y-1 text-slate-700 ml-5">
                <li>Shared circuits in older kitchens (pre-2000 construction)</li>
                <li>If coffee maker (1000W) + mixer (500W) = 1500W exceeds 15-amp circuit capacity (1800W max)</li>
                <li>Commercial kitchens with multiple high-draw appliances</li>
              </ul>
            </div>
            <p className="text-slate-700 mb-0">
              <strong>Cost factor:</strong> Electrician installation of dedicated 20-amp circuit requires professional installation. Factor this into your total investment.
            </p>
          </div>
        </section>

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

        {/* SECTION 6: EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* SECTION 7: FAQ */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

        {/* SECTION 8: WHERE TO BUY - STRATEGIC MULTI-LINK SECTION */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            {reviewData.whereToBuy.title}
          </h2>

          <p className="text-slate-600 leading-relaxed mb-6">
            {reviewData.whereToBuy.introText}
          </p>

          {/* PRIMARY OPTION: KitchenAid Direct */}
          <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">KitchenAid Direct</h3>
              <p className="text-sm text-slate-900 mb-4">Factory direct, full warranty, NSF certified</p>
            </div>

            <CTAVisibilityTracker
              ctaId={`${reviewData.productSlug}-where-to-buy-primary`}
              position="mid_article"
              productSlug={reviewData.productSlug}
              merchant="kitchenaid"
            >
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
              >
                Check Price on KitchenAid.com →
              </a>
            </CTAVisibilityTracker>

            {/* SECONDARY: Compare Models Link (Evergreen Link - HIGHEST EPC!) */}
            <p className="text-center mt-3 text-sm">
              <a
                href={compareLink}
                className="text-orange-700 hover:text-orange-800 underline font-medium"
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                → Compare All Stand Mixer Models
              </a>
            </p>

            {/* TERTIARY: Trust Signal Link */}
            <p className="text-center mt-2 text-sm">
              <a
                href={trustLink}
                className="text-orange-700 hover:text-orange-800 underline font-medium"
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                → Free Delivery + 60 Day Returns
              </a>
            </p>

            <p className="text-xs text-slate-700 text-center mt-3">
              As a KitchenAid affiliate, I earn from qualifying purchases.
            </p>
          </div>

          <p className="text-sm text-slate-600 mt-6 italic">
            {reviewData.whereToBuy.disclaimer}
          </p>
        </div>

        {/* SECTION 9: BOTTOM LINE */}
        <BottomLineSection
          title={reviewData.bottomLine.title}
          paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed">
              {processInlineLinks(paragraph)}
            </p>
          ))}
          customCTA={(
            <div className="bg-white rounded-xl p-6">
              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-bottom-line-cta`}
                position="final_cta"
                productSlug={reviewData.productSlug}
                merchant="kitchenaid"
              >
                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                >
                  {reviewData.bottomLine.ctaText}
                </a>
              </CTAVisibilityTracker>

              {/* Secondary compare link */}
              <p className="text-center mt-3 text-sm">
                <a
                  href={compareLink}
                  className="text-orange-700 hover:text-orange-800 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  → Compare All KitchenAid Models
                </a>
              </p>

              <p className="text-xs text-slate-700 text-center mt-3">
                As a KitchenAid affiliate, I earn from qualifying purchases.
              </p>
            </div>
          )}
        />

        {/* SECTION 10: RELATED PRODUCTS */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* SECTION 11: AUTHOR BIO */}
        <AuthorBio />

        {/* SECTION 12: TESTIMONIALS */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(reviewData.faqData))
          }}
        />
      </article>
    </div>
  )
}
