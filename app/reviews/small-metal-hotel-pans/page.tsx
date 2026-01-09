import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import SizeSelector from '@/components/SizeSelector'
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
  RelatedProductsGrid,
  RelatedArticlesGrid
} from '@/components/review'

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

  // Get primary affiliate link - use product if available, otherwise fall back to recommended size option
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : reviewData.sizeOptions.options.find(o => o.recommended)?.affiliateUrl || reviewData.sizeOptions.options[0].affiliateUrl

  return (
    <ReviewLayout
      product={product}
      slug={PRODUCT_SLUG}
      affiliateUrl={affiliateUrl}
      gitDates={gitDates}
      categoryBreadcrumb={categoryBreadcrumb}
      faqData={reviewData.faqData}
      tier={reviewData.metadata.tier as 1 | 2 | 3}
      testingPeriod={reviewData.tracking.testingPeriod}
      hook={reviewData.tracking.hook}
      backLinkHref="/prep-tools"
      backLinkText="Browse all Prep Tools"
    >
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
        heroImage={getProductHeroImage(PRODUCT_SLUG)}
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

        {/* Related Articles */}
        <RelatedArticlesGrid
          title={reviewData.relatedArticles.title}
          articles={reviewData.relatedArticles.articles}
        />

    </ReviewLayout>
  )
}
