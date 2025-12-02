import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getReviewMetadata } from '@/data/metadata'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  ReviewHero,
  TestingResultsGrid,
  TestingStory,
  PerformanceAnalysis,
  RealWorldUseCases,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'
import AuthorBio from '@/components/review/AuthorBio'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import ReviewLayout from '@/components/review/ReviewLayout'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// Import review data
import { reviewData } from './epicurean-kitchen-cutting-board-data'
import { getCuttingBoardComparison } from './get-cutting-board-comparison'

const PRODUCT_SLUG = 'epicurean-kitchen-cutting-board'

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
  const product = await getProductBySlug(PRODUCT_SLUG)

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const cuttingBoardComparisonData = await getCuttingBoardComparison()

  // Epicurean size options with affiliate links
  const sizeOptions = [
    { size: '8" × 6"', link: 'https://amzn.to/48LkYMw', label: 'Small' },
    { size: '11.5" × 9"', link: 'https://amzn.to/3KwvCxw', label: 'Medium' },
    { size: '14.5" × 11.25"', link: 'https://amzn.to/4ouAe5h', label: 'Large (Reviewed)' },
    { size: '17.5" × 13"', link: 'https://amzn.to/3Mi0sKK', label: 'XL' },
  ]

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

      {/* ========================================
          NEW: ReviewLayout wraps everything
          ======================================== */}
      <ReviewLayout
        breadcrumbCategory="Kitchen Tools"
        breadcrumbTitle={reviewData.breadcrumb.productName}
      >

        {/* SECTION 1: HERO */}
        <ReviewHero
          title={reviewData.hero.title}
          authorName={reviewData.hero.authorName}
          authorCredentials={reviewData.hero.authorCredentials}
          rating={productData.expertRating ?? reviewData.hero.rating}
          tierBadge={tierBadge}
          verdict={reviewData.hero.verdict}
          verdictStrong={reviewData.hero.verdictStrong}
          publishedDate={gitDates.firstPublished}
          lastUpdated={gitDates.lastUpdated}
          heroImage={(product.images as any)?.hero}
          productName={product.name}
          ctaUrl={affiliateUrl}
          ctaText={reviewData.hero.ctaText}
          customCTA={(
            <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
              {/* Size Selection */}
              <h3 className="text-sm font-semibold text-slate-700 mb-3 text-center">Choose Your Size:</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {sizeOptions.map((option, index) => (
                  <CTAVisibilityTracker
                    key={index}
                    ctaId={`hero-size-${option.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    position="above_fold"
                    productSlug={PRODUCT_SLUG}
                    merchant="amazon"
                  >
                    <a
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={`block text-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        option.label.includes('Reviewed')
                          ? 'border-orange-500 bg-orange-50 hover:bg-orange-100'
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-slate-900">{option.size}</span>
                      <span className={`block text-xs ${option.label.includes('Reviewed') ? 'text-orange-700 font-medium' : 'text-slate-500'}`}>
                        {option.label}
                      </span>
                    </a>
                  </CTAVisibilityTracker>
                ))}
              </div>

              {/* Main CTA */}
              <CTAVisibilityTracker ctaId="hero-cta" position="above_fold" productSlug={PRODUCT_SLUG} merchant="amazon">
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105"
                >
                  {reviewData.hero.ctaText}
                </a>
              </CTAVisibilityTracker>

              <p className="text-xs text-slate-600 text-center mt-4">
                As an Amazon Associate, I earn from qualifying purchases.
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

        {/* SECTION 2.5: TESTING STORY (E-E-A-T) - Conditional */}
        {(reviewData as any).testingStory && (
          <TestingStory
            title={(reviewData as any).testingStory.title}
            paragraphs={(reviewData as any).testingStory.paragraphs}
          />
        )}

        {/* MID-CONTENT CTA */}
        <div className="text-center my-8">
          <CTAVisibilityTracker
            ctaId={`${PRODUCT_SLUG}-mid-content`}
            position="mid_article"
            productSlug={PRODUCT_SLUG}
            merchant="amazon"
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-orange-700 hover:text-orange-800 font-medium underline"
            >
              → See current Amazon price and reviews
            </a>
          </CTAVisibilityTracker>
        </div>

        {/* SECTION 3: PERFORMANCE ANALYSIS */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections.map(section => ({
            ...section,
            content: processInlineLinks(section.content)
          }))}
        />

        {/* SECTION 3.5: REAL-WORLD USE CASES (E-E-A-T) - Conditional */}
        {(reviewData as any).realWorldUseCases && (
          <RealWorldUseCases
            title={(reviewData as any).realWorldUseCases.title}
            subtitle={(reviewData as any).realWorldUseCases.subtitle}
            useCases={(reviewData as any).realWorldUseCases.useCases}
          />
        )}

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

        {/* CTA #4 - AFTER WHO SHOULD BUY (Decision Point) */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center my-8">
          <p className="text-lg font-medium text-slate-900 mb-4">
            Sound like the right fit for your kitchen?
          </p>
          <CTAVisibilityTracker
            ctaId={`${PRODUCT_SLUG}-post-who-should-buy`}
            position="who_should_buy"
            productSlug={PRODUCT_SLUG}
            merchant="amazon"
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-lg shadow-lg hover:shadow-xl"
            >
              Check Price on Amazon →
            </a>
          </CTAVisibilityTracker>
        </div>

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

        {/* SECTION: COMPARISON TABLE */}
        <ProductComparisonTable
          title={cuttingBoardComparisonData.title}
          subtitle={cuttingBoardComparisonData.subtitle}
          products={cuttingBoardComparisonData.products}
          comparisonRows={cuttingBoardComparisonData.comparisonRows}
          highlightedProduct={cuttingBoardComparisonData.highlightedProduct}
        />

        {/* POST-COMPARISON CTA */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center my-8">
          <p className="text-lg font-medium text-slate-900 mb-4">
            Ready to upgrade your cutting board?
          </p>
          <CTAVisibilityTracker
            ctaId={`${PRODUCT_SLUG}-post-comparison`}
            position="comparison_table"
            productSlug={PRODUCT_SLUG}
            merchant="amazon"
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-lg"
            >
              Check Price on Amazon →
            </a>
          </CTAVisibilityTracker>
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
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Available Sizes on Amazon</h3>
              <p className="text-sm text-slate-600">Prime shipping available on all sizes</p>
            </div>

            {/* Size Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {sizeOptions.map((option, index) => (
                <CTAVisibilityTracker
                  key={index}
                  ctaId={`where-to-buy-size-${option.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  position="where_to_buy"
                  productSlug={PRODUCT_SLUG}
                  merchant="amazon"
                >
                  <a
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`block text-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      option.label.includes('Reviewed')
                        ? 'border-orange-500 bg-white hover:bg-orange-100'
                        : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-slate-900">{option.size}</span>
                    <span className={`block text-xs ${option.label.includes('Reviewed') ? 'text-orange-700 font-medium' : 'text-slate-500'}`}>
                      {option.label}
                    </span>
                  </a>
                </CTAVisibilityTracker>
              ))}
            </div>

            <p className="text-xs text-slate-600 text-center mt-4">
              As an Amazon Associate, I earn from qualifying purchases.
            </p>
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

      </ReviewLayout>
      {/* ========================================
          END: ReviewLayout
          ======================================== */}

      {/* Product view tracking - at bottom to avoid blocking first paint */}
      <ProductViewTrackerWrapper
        slug={PRODUCT_SLUG}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={productData.expertRating ?? reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />

      {/* STICKY MOBILE CTA */}
      <StickyMobileCTAWrapper
        productName={productData.name}
        affiliateUrl={affiliateUrl}
        merchant="amazon"
        productSlug={PRODUCT_SLUG}
      />
    </>
  )
}
