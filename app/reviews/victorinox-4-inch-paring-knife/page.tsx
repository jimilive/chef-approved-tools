import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import AmazonCTA from '@/components/AmazonCTA'
import ReviewLayout from '@/components/review/ReviewLayout'
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

// Import review data
import { reviewData } from './victorinox-4-inch-paring-knife-data'

const PRODUCT_SLUG = 'victorinox-4-inch-paring-knife'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('victorinox-4-inch-paring-knife')
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

export default async function ProductReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product?.category || '')

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
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

  // Get affiliate URLs for both size variants from the SAME product
  const link4inch = product?.affiliateLinks.find(link => link.tag === '4-inch')
  const link325inch = product?.affiliateLinks.find(link => link.tag === '3.25-inch')

  // Use tagged links if available, otherwise use primary
  const affiliateUrl4inch = link4inch?.url || (product ? getPrimaryAffiliateLink(product) : '#')
  const affiliateUrl325inch = link325inch?.url || ''

  return (
    <ReviewLayout
      product={product}
      slug={PRODUCT_SLUG}
      affiliateUrl={affiliateUrl4inch}
      gitDates={gitDates}
      categoryBreadcrumb={categoryBreadcrumb}
      faqData={reviewData.faqData}
      tier={reviewData.metadata.tier as 1 | 2 | 3}
      testingPeriod={reviewData.tracking.testingPeriod}
      hook={reviewData.tracking.hook}
      backLinkHref="/knives-and-cutting-tools"
      backLinkText="Browse all Knives & Cutting Tools"
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
            heroImage={getProductHeroImage(PRODUCT_SLUG)}
            customCTA={
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                {/* Product Image */}
                <div className="mb-6">
                  <Image
                    src="/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-1.webp"
                    alt="Victorinox 4-inch Paring Knife"
                    width={800}
                    height={600}
                    quality={75}
                    className="rounded-lg w-full h-auto"
                    priority
                  />
                </div>

                {/* Size Selection */}
                <h2 className="text-xl font-bold mb-3 text-slate-900">{reviewData.sizeVariants.title}</h2>
                <p className="text-sm text-slate-700 mb-4">
                  {reviewData.sizeVariants.note}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* 4-inch variant */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-300">
                    <h3 className="font-bold text-base mb-2 text-gray-900">
                      {reviewData.sizeVariants.options[0].label}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      {reviewData.sizeVariants.options[0].description}
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-hero-4inch`}
                      position="above_fold"
                      productSlug={reviewData.productSlug}
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl4inch}
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check Price on Amazon
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl4inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                      >
                        → View 4&quot; {productData.name} on Amazon
                      </a>
                    </p>
                  </div>

                  {/* 3.25-inch variant */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-300">
                    <h3 className="font-bold text-base mb-2 text-gray-900">
                      {reviewData.sizeVariants.options[1].label}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      {reviewData.sizeVariants.options[1].description}
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-hero-325inch`}
                      position="above_fold"
                      productSlug="victorinox-3.25-inch-paring-knife"
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl325inch}
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check Price on Amazon
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl325inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                      >
                        → View 3.25&quot; version on Amazon
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases. Price and availability may change.
                </p>
              </div>
            }
          />

          {/* SECTION 2: TESTING RESULTS */}
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* MID-CONTENT CTA */}
          <div className="text-center my-8">
            <AmazonCTA
              productSlug={PRODUCT_SLUG}
              affiliateUrl={affiliateUrl4inch}
              position="mid_article"
              variant="textLink"
            />
          </div>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map((section, index) => ({
              ...section,
              content: index === 0 ? (
                <>
                  The{' '}
                  <a
                    href={affiliateUrl4inch}
                    className="text-orange-700 hover:text-orange-800 font-medium"
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                  >
                    {productData.name}
                  </a>
                  {' '}gives you complete control for detailed tasks. Sharp tip gets into tight spaces for deveining shrimp, removing tomato cores, or hulling strawberries. Comfortable to hold for extended precision work.
                </>
              ) : index === 3 ? (
                <>
                  From managing kitchen operations at Mellow Mushroom to working the line at fine dining restaurants, I&apos;ve used{' '}
                  <a
                    href={affiliateUrl4inch}
                    className="text-orange-700 hover:text-orange-800 font-medium"
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                  >
                    this knife
                  </a>
                  {' '}to devein hundreds of shrimp per shift, peel and trim vegetables for garnishes, remove silver skin from tenderloins, hull strawberries for dessert prep, and trim fat and connective tissue from proteins. These knives take abuse in a professional kitchen. At this price, I don&apos;t worry about replacing them when needed. But honestly, with basic care, they last for years.
                </>
              ) : section.content
            }))}
          />

          {/* V2: COMPARISON TABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.comparisonTable.title}
            </h2>

            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Feature</th>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <th
                        key={index}
                        className={`border border-slate-600 p-3 text-left text-white font-semibold ${
                          competitor.highlight ? 'bg-orange-900' : ''
                        }`}
                      >
                        {competitor.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Price Range</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.priceRange}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Blade Material</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.bladeMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Handle Material</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.handleMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Country of Origin</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.origin}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Out-of-Box Sharpness</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.sharpness}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Edge Retention</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.edgeRetention}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Ergonomics</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.ergonomics}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Professional Use Rating</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.professionalRating}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Warranty</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.warranty}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-slate-300 p-3 font-semibold">Best For</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 font-semibold ${
                          competitor.highlight ? 'bg-green-200' : ''
                        }`}
                      >
                        {competitor.bestFor}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-700 mt-4 italic">
              <strong>My Verdict:</strong> {reviewData.comparisonTable.verdict}
            </p>
          </div>

          {/* SECTION 5: PROS & CONS */}
          <ProsConsGrid
            title={reviewData.prosConsTitle}
            prosTitle={reviewData.prosTitle}
            consTitle={reviewData.consTitle}
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* SECTION 6: WHO SHOULD BUY */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
          />

          {/* CTA #4 - AFTER WHO SHOULD BUY (Decision Point) */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl4inch}
            position="who_should_buy"
            boxHeading="Found the right paring knife for your kitchen?"
          />

          {/* SECTION 7: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 8: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 9: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            customCTA={
              <div className="bg-white rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* 4-inch CTA */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-2 text-center">
                      4&quot; Blade (Most Versatile)
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-bottom-line-4inch`}
                      position="final_cta"
                      productSlug={reviewData.productSlug}
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl4inch}
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check Price on Amazon
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl4inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                      >
                        → Check Price on Amazon
                      </a>
                    </p>
                  </div>

                  {/* 3.25-inch CTA */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-2 text-center">
                      3.25&quot; Blade (Extra Control)
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-bottom-line-325inch`}
                      position="final_cta"
                      productSlug="victorinox-3.25-inch-paring-knife"
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl325inch}
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check Price on Amazon
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl325inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                      >
                        → Check Price on Amazon
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases.
                </p>
              </div>
            }
          />

          <div className="text-center my-8">
            <Link
              href="/knives-and-cutting-tools"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Knives & Cutting Tools →
            </Link>
          </div>

          {/* SECTION 10: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />


    </ReviewLayout>
  )
}
