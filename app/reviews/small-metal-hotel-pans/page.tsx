import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { getOGImageURL } from '@/lib/og-image'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import SizeSelector from '@/components/SizeSelector'
import AmazonCTA from '@/components/AmazonCTA'
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
import { reviewData } from './small-metal-hotel-pans-data'

const PRODUCT_SLUG = 'small-metal-hotel-pans'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('small-metal-hotel-pans')
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
          url: centralMeta.imageUrl || getOGImageURL({
            productSlug: PRODUCT_SLUG,
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
      images: [centralMeta.imageUrl || getOGImageURL({
        productSlug: PRODUCT_SLUG,
        title: productData.name,
        rating: productData.expertRating ?? reviewData.hero.rating,
        testingPeriod: centralMeta.testingPeriod,
        tier: centralMeta.tier,
      })],
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

  // Get primary affiliate link - use product if available, otherwise fall back to recommended size option
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : reviewData.sizeOptions.options.find(o => o.recommended)?.affiliateUrl || reviewData.sizeOptions.options[0].affiliateUrl

  const breadcrumbs = categoryBreadcrumb
    ? [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: categoryBreadcrumb.label, url: `https://www.chefapprovedtools.com${categoryBreadcrumb.href}` },
        { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${PRODUCT_SLUG}` }
      ]
    : [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: 'Reviews', url: 'https://www.chefapprovedtools.com/reviews' },
        { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${PRODUCT_SLUG}` }
      ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={reviewData.productSlug}
        name={reviewData.breadcrumb.productName}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 py-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="text-gray-700 hover:text-orange-700 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-700">/</li>
          {categoryBreadcrumb ? (
            <>
              <li>
                <Link href={categoryBreadcrumb.href} className="text-gray-700 hover:text-orange-700 transition-colors">
                  {categoryBreadcrumb.label}
                </Link>
              </li>
              <li className="text-gray-700">/</li>
            </>
          ) : (
            <>
              <li>
                <Link href="/reviews" className="text-gray-700 hover:text-orange-700 transition-colors">
                  Reviews
                </Link>
              </li>
              <li className="text-gray-700">/</li>
            </>
          )}
          <li className="text-gray-900 font-medium">{productData.name}</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mb-4">
        <Link
          href="/prep-tools"
          className="text-orange-700 hover:text-orange-800 text-sm flex items-center gap-1"
        >
          ← Browse all Prep Tools
        </Link>
      </div>

      {/* Hero Section with Size Selector */}
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
        customCTA={
          <div className="bg-white border-2 border-orange-200 rounded-xl p-6 min-h-[280px]">
            <SizeSelector
              title="Choose Your Size:"
              options={reviewData.sizeOptions.options.map((option) => ({
                id: option.id,
                label: `${option.size} — ${option.depth}`,
                description: `${option.dimensions} | ${option.capacity} | ${option.bestFor}`,
                affiliateUrl: option.affiliateUrl,
                ctaId: `hero-cta-${option.id}`
              }))}
              defaultSize={reviewData.sizeOptions.options.find(o => o.recommended)?.id || reviewData.sizeOptions.options[0].id}
              ctaText="Check Price on Amazon →"
              ctaPosition="above_fold"
              showDisclosure={true}
              productSlug={PRODUCT_SLUG}
            />

            {/* Lid Options */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-base mb-3 text-gray-900">Lids (Sold Separately)</h3>
              <p className="text-sm text-gray-700 mb-4">
                Choose solid lids for covering or slotted lids to keep serving utensils in pan during buffet service
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {reviewData.sizeOptions.lidOptions.map((lid) => (
                  <a
                    key={lid.id}
                    href={lid.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="text-sm text-orange-700 hover:text-orange-800 underline"
                  >
                    → {lid.size}
                  </a>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Testing Results */}
        <TestingResultsGrid
          title={reviewData.testingResults.title}
          sections={reviewData.testingResults.sections}
          testingEnvironment={reviewData.testingResults.testingEnvironment}
          outstandingPerformance={reviewData.testingResults.outstandingPerformance}
          minorConsiderations={reviewData.testingResults.minorConsiderations}
        />

        {/* MID-CONTENT CTA */}
        <div className="text-center my-8">
          <CTAVisibilityTracker
            ctaId={`${productData.slug}-mid-content`}
            position="mid_article"
            productSlug={productData.slug}
            merchant="amazon"
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="nofollow noopener noreferrer sponsored"
              className="text-orange-700 hover:text-orange-800 font-medium underline"
            >
              → See current Amazon price and reviews
            </a>
          </CTAVisibilityTracker>
        </div>

        {/* Performance Analysis */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections}
        />

        {/* Pros & Cons */}
        <ProsConsGrid
          title={reviewData.prosConsTitle}
          prosTitle={reviewData.prosTitle}
          consTitle={reviewData.consTitle}
          pros={reviewData.legacyProductData.pros}
          cons={reviewData.legacyProductData.cons}
        />

        {/* Who Should Buy */}
        <WhoShouldBuyGrid
          title={reviewData.whoShouldBuy.title}
          perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
          considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
          perfectFor={reviewData.whoShouldBuy.perfectFor}
          considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
        />

        {/* CTA - AFTER WHO SHOULD BUY (Decision Point) */}
        <AmazonCTA
          productSlug={PRODUCT_SLUG}
          affiliateUrl={affiliateUrl}
          position="who_should_buy"
          boxHeading="Ready to organize your mise en place?"
        />

        {/* FAQ */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

        {/* Where to Buy Section */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            {reviewData.whereToBuy.title}
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            {reviewData.whereToBuy.introText}
          </p>
          <div className="border border-gray-200 rounded-xl p-6 bg-orange-50 min-h-[280px]">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
              <p className="text-sm text-slate-900 mb-4">Prime shipping, NSF-certified quality</p>
            </div>
            <SizeSelector
              title="Choose Your Size:"
              options={reviewData.sizeOptions.options.map((option) => ({
                id: option.id,
                label: `${option.size} — ${option.depth}`,
                description: `${option.dimensions} | ${option.capacity} | ${option.bestFor}`,
                affiliateUrl: option.affiliateUrl,
                ctaId: `where-to-buy-${option.id}`
              }))}
              defaultSize={reviewData.sizeOptions.options.find(o => o.recommended)?.id || reviewData.sizeOptions.options[0].id}
              ctaText="Check Price on Amazon →"
              ctaPosition="mid_article"
              showDisclosure={true}
              productSlug={PRODUCT_SLUG}
            />
          </div>
          <p className="text-sm text-slate-700 mt-6 italic">
            {reviewData.whereToBuy.disclaimer}
          </p>
        </div>

        {/* Email Capture */}
        <EmailCaptureSection />

        {/* Bottom Line */}
        <BottomLineSection
          title={reviewData.bottomLine.title}
          paragraphs={reviewData.bottomLine.paragraphs}
          customCTA={
            <div className="bg-white rounded-xl p-6 min-h-[280px]">
              <SizeSelector
                title="Choose Your Size:"
                options={reviewData.sizeOptions.options.map((option) => ({
                  id: option.id,
                  label: `${option.size} — ${option.depth}`,
                  description: `${option.dimensions} | ${option.capacity} | ${option.bestFor}`,
                  affiliateUrl: option.affiliateUrl,
                  ctaId: `bottom-line-${option.id}`
                }))}
                defaultSize={reviewData.sizeOptions.options.find(o => o.recommended)?.id || reviewData.sizeOptions.options[0].id}
                ctaText={reviewData.bottomLine.ctaText}
                ctaPosition="final_cta"
                showDisclosure={true}
                productSlug={PRODUCT_SLUG}
              />
            </div>
          }
        />

        <div className="text-center my-8">
          <Link
            href="/prep-tools"
            className="text-orange-700 hover:text-orange-800 font-medium"
          >
            Explore more Prep Tools →
          </Link>
        </div>

        {/* Related Products */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* AUTHOR BIO */}
        <AuthorBio />

      </article>

      {/* Structured Data Schemas */}
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

      {/* STICKY MOBILE CTA */}
      <StickyMobileCTAWrapper
        productName={productData.name}
        affiliateUrl={affiliateUrl}
        merchant="amazon"
        productSlug={productData.slug}
      />
    </div>
  )
}
