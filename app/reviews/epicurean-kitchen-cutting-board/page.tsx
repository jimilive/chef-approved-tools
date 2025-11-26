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
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// Import review data
import { reviewData } from './epicurean-kitchen-cutting-board-data'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('epicurean-kitchen-cutting-board')
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

export default async function EpicureanKitchenCuttingBoardReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }

  // Helper function to process inline affiliate links
  const processInlineLinks = (content: string) => {
    const parts = content.split(/(<LINK>|<\/LINK>)/)
    const elements: (string | JSX.Element)[] = []
    let isInsideLink = false
    let linkContent = ''
    let linkIndex = 0

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '<LINK>') {
        isInsideLink = true
        linkContent = ''
      } else if (parts[i] === '</LINK>') {
        isInsideLink = false
        const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'
        elements.push(
          <a
            key={`inline-link-${linkIndex++}`}
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-orange-700 hover:text-orange-800 underline font-medium"
          >
            {linkContent}
          </a>
        )
        linkContent = ''
      } else if (isInsideLink) {
        linkContent += parts[i]
      } else if (parts[i]) {
        elements.push(parts[i])
      }
    }

    return elements
  }

  // Merge Supabase data with legacy data
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
    model: productData.model,
    category: productData.category,
    dateAdded: productData.dateAdded,
    lastUpdated: productData.lastUpdated,
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

      {/* Product view tracking */}
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={productData.expertRating}
        hook={reviewData.tracking.hook}
        category={productData.category}
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
            ctaUrl={affiliateUrl}
            ctaText={reviewData.hero.ctaText}
            customCTA={(
              <div>
                <CTAVisibilityTracker ctaId="hero-cta" position="above_fold">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    {reviewData.hero.ctaText}
                  </a>
                </CTAVisibilityTracker>
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
              </div>
            )}
          />

          {/* SECTION 2: TESTING RESULTS */}
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: processInlineLinks(section.content)
            }))}
          />

          {/* SECTION 4: PROS & CONS */}
          <ProsConsGrid
            title="Honest Assessment After 10 Years"
            prosTitle="What Works Exceptionally Well"
            consTitle="Limitations to Consider"
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

          {/* INLINE SECTION: SPECIFICATIONS */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Complete Specifications & Dimensions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">Technical Specifications</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Model Number:</dt>
                    <dd className="font-semibold">KS11130101</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Material:</dt>
                    <dd className="font-semibold">Richlite (wood fiber composite)</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">NSF Certified:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Heat Resistance:</dt>
                    <dd className="font-semibold">Up to 350°F</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Dishwasher Safe:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Non-Porous:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Made in USA:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">Physical Dimensions</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Length:</dt>
                    <dd className="font-semibold">14.5 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Width:</dt>
                    <dd className="font-semibold">11.25 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Thickness:</dt>
                    <dd className="font-semibold">0.25 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Weight:</dt>
                    <dd className="font-semibold">1.5 lbs</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-600">Available Sizes:</dt>
                    <dd className="font-semibold">Multiple sizes available</dd>
                  </div>
                </dl>

                <p className="text-xs text-slate-600 mt-4 italic">
                  This review covers the standard 14.5 × 11.25 inch size, ideal for most home kitchens.
                </p>
              </div>
            </div>
          </div>

          {/* INLINE SECTION: COMPARISON TABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Comparison vs. Competitors
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border-b-2 border-gray-300">Feature</th>
                    <th className="p-3 text-left border-b-2 border-gray-300">Epicurean</th>
                    <th className="p-3 text-left border-b-2 border-gray-300">John Boos Maple</th>
                    <th className="p-3 text-left border-b-2 border-gray-300">Bamboo Board</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b border-gray-200">Dishwasher Safe</td>
                    <td className="p-3 border-b border-gray-200 font-bold">✓ Yes</td>
                    <td className="p-3 border-b border-gray-200">✗ Hand wash only</td>
                    <td className="p-3 border-b border-gray-200">✗ Hand wash only</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200">Material</td>
                    <td className="p-3 border-b border-gray-200">Wood fiber composite</td>
                    <td className="p-3 border-b border-gray-200">Solid maple</td>
                    <td className="p-3 border-b border-gray-200">Bamboo</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border-b border-gray-200">Warping Risk</td>
                    <td className="p-3 border-b border-gray-200 font-bold">None (dimensionally stable)</td>
                    <td className="p-3 border-b border-gray-200">Low (with proper care)</td>
                    <td className="p-3 border-b border-gray-200">High (prone to warping)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200">Maintenance</td>
                    <td className="p-3 border-b border-gray-200 font-bold">None</td>
                    <td className="p-3 border-b border-gray-200">Monthly oiling required</td>
                    <td className="p-3 border-b border-gray-200">Monthly oiling required</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border-b border-gray-200">Porosity</td>
                    <td className="p-3 border-b border-gray-200 font-bold">Non-porous</td>
                    <td className="p-3 border-b border-gray-200">Porous (can harbor bacteria)</td>
                    <td className="p-3 border-b border-gray-200">Porous</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200">NSF Certified</td>
                    <td className="p-3 border-b border-gray-200 font-bold">✓ Yes</td>
                    <td className="p-3 border-b border-gray-200">✓ Yes</td>
                    <td className="p-3 border-b border-gray-200">✗ No</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border-b border-gray-200">Best For</td>
                    <td className="p-3 border-b border-gray-200 font-bold">Easy sanitation, zero maintenance</td>
                    <td className="p-3 border-b border-gray-200">Traditional aesthetics, heavy use</td>
                    <td className="p-3 border-b border-gray-200">Budget-conscious buyers</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-700 mt-6">
              <strong>My take:</strong> For practical daily use, Epicurean boards are superior. Dishwasher-safe sanitation and zero maintenance trump the traditional appeal of wood. <Link href="/reviews/john-boos-platinum-commercial-cutting-board" className="text-orange-700 hover:text-orange-800 font-semibold">John Boos boards</Link> are excellent but require dedication to maintenance. Bamboo boards warp too easily.
            </p>
          </div>

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
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
                  <p className="text-sm text-slate-600 mb-4">Prime shipping, verified reviews, multiple sizes available</p>
                </div>
                <CTAVisibilityTracker
                  ctaId="where-to-buy-cta"
                  position="where_to_buy"
                  productSlug={productData.slug}
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="block w-full text-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                  >
                    Check Price on Amazon →
                  </a>
                </CTAVisibilityTracker>
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
                <p className="text-xs text-slate-500 text-center italic">
                  As an Amazon Associate, I earn from qualifying purchases. This comes at no extra cost to you.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 8: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 9: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map(p => processInlineLinks(p))}
            ctaUrl={affiliateUrl}
            ctaText={reviewData.bottomLine.ctaText}
            customCTA={(
              <div className="text-center">
                <CTAVisibilityTracker ctaId="bottom-line-cta" position="final_cta">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    {reviewData.bottomLine.ctaText}
                  </a>
                </CTAVisibilityTracker>
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
