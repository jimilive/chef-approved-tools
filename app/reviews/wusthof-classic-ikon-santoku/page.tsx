/**
 * Wüsthof Classic Ikon Santoku Review
 *
 * CREATED: December 16, 2025
 * - Uses ReviewLayout component for consistent structure
 * - Follows victorinox-fibrox-8-inch-chefs-knife as template
 *
 * Structure follows REVIEW_PAGE_MASTER_SPEC_V3.md
 */

import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { getReviewMetadata } from '@/data/metadata'

// Layout
import ReviewLayout from '@/components/review/ReviewLayout'

// Components
import AmazonCTA from '@/components/AmazonCTA'
import {
  ReviewHero,
  TestingResultsGrid,
  TestingStory,
  PerformanceAnalysis,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'

// Data
import { reviewData } from './wusthof-classic-ikon-santoku-data'
import { getSantokuComparison } from './get-santoku-comparison'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'

const PRODUCT_SLUG = 'wusthof-classic-ikon-santoku'

// ISR: Regenerate page every hour
export const revalidate = 3600

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata(PRODUCT_SLUG)
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

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
          alt: centralMeta.imageAlt || `${product.name} - Professional Review`,
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

export default async function WusthofClassicIkonSantokuReview() {
  // ==================== DATA FETCHING ====================
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  const gitDates = getReviewGitDates(PRODUCT_SLUG)
  const tierBadge = getTierBadge(PRODUCT_SLUG)
  const categoryBreadcrumb = getCategoryBreadcrumb(product?.category || '')

  // Merge Supabase data with legacy fallbacks
  const productData = {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros?.length ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons?.length ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks?.length
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  }

  const affiliateUrl = getPrimaryAffiliateLink(product)

  // Get comparison table data
  const comparisonData = await getSantokuComparison()

  // ==================== RENDER ====================
  return (
    <ReviewLayout
      product={productData}
      slug={PRODUCT_SLUG}
      affiliateUrl={affiliateUrl}
      gitDates={gitDates}
      categoryBreadcrumb={categoryBreadcrumb}
      faqData={reviewData.faqData}
      tier={reviewData.metadata.tier as 1 | 2 | 3}
      testingPeriod={reviewData.tracking.testingPeriod}
      hook={reviewData.tracking.hook}
      backLinkHref="/knives-and-cutting-tools"
      backLinkText="Browse all Knives & Cutting Tools"
    >
      {/* ========== SECTION 1: HERO + CTA #1 ========== */}
      <ReviewHero
        title={reviewData.hero.title}
        authorName={reviewData.hero.authorName}
        authorCredentials={reviewData.hero.authorCredentials}
        rating={productData.expertRating ?? reviewData.hero.rating}
        tierBadge={tierBadge || reviewData.hero.tierBadge}
        verdict={reviewData.hero.verdict}
        verdictStrong={reviewData.hero.verdictStrong}
        heroImage={getProductHeroImage(PRODUCT_SLUG)}
        productName={productData.name}
        ctaUrl={affiliateUrl}
      />

      {/* ========== SECTION 2: TESTING RESULTS ========== */}
      <TestingResultsGrid
        title={reviewData.testingResults.title}
        sections={reviewData.testingResults.sections}
        testingEnvironment={reviewData.testingResults.testingEnvironment}
        outstandingPerformance={reviewData.testingResults.outstandingPerformance}
        minorConsiderations={reviewData.testingResults.minorConsiderations}
      />

      {/* ========== SECTION 3: TESTING STORY (E-E-A-T) ========== */}
      {reviewData.testingStory && (
        <TestingStory
          title={reviewData.testingStory.title}
          paragraphs={reviewData.testingStory.paragraphs}
        />
      )}

      {/* ========== CTA #2: AFTER TESTING STORY ========== */}
      <div className="text-center my-8">
        <AmazonCTA
          productSlug={PRODUCT_SLUG}
          affiliateUrl={affiliateUrl}
          position="mid_article"
          variant="textLink"
        />
      </div>

      {/* ========== SECTION 4: PERFORMANCE ANALYSIS ========== */}
      <PerformanceAnalysis
        title={reviewData.performanceAnalysis.title}
        sections={reviewData.performanceAnalysis.sections}
      />

      {/* ========== SECTION 5: PROS & CONS ========== */}
      <ProsConsGrid
        title={reviewData.prosConsTitle}
        prosTitle={reviewData.prosTitle}
        consTitle={reviewData.consTitle}
        pros={productData.pros}
        cons={productData.cons}
      />

      {/* ========== COMPARISON TABLE ========== */}
      <ProductComparisonTable
        title={comparisonData.title}
        subtitle={comparisonData.subtitle}
        products={comparisonData.products}
        comparisonRows={comparisonData.comparisonRows}
        highlightedProduct={comparisonData.highlightedProduct}
        trustMessage={comparisonData.trustMessage}
      />

      {/* ========== SECTION 6: WHO SHOULD BUY ========== */}
      <WhoShouldBuyGrid
        title={reviewData.whoShouldBuy.title}
        perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
        considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
        perfectFor={reviewData.whoShouldBuy.perfectFor}
        considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
      />

      {/* CTA #3: AFTER WHO SHOULD BUY */}
      <AmazonCTA
        productSlug={PRODUCT_SLUG}
        affiliateUrl={affiliateUrl}
        position="who_should_buy"
        boxHeading="Ready to upgrade your vegetable prep?"
      />

      {/* ========== SECTION 7: FAQ ========== */}
      <FAQSection
        title={reviewData.faq.title}
        faqs={reviewData.faq.items}
      />

      {/* ========== SECTION 8: EMAIL CAPTURE ========== */}
      <EmailCaptureSection />

      {/* ========== SECTION 9: BOTTOM LINE + CTA #4 ========== */}
      <BottomLineSection
        title={reviewData.bottomLine.title}
        paragraphs={reviewData.bottomLine.paragraphs}
        customCTA={(
          <div className="text-center">
            <AmazonCTA
              productSlug={PRODUCT_SLUG}
              affiliateUrl={affiliateUrl}
              position="final_cta"
            />
          </div>
        )}
      />

      {/* ========== SECTION 10: RELATED PRODUCTS ========== */}
      <RelatedProductsGrid
        title={reviewData.relatedProducts.title}
        products={reviewData.relatedProducts.products}
      />

      {/* NOTE: AuthorBio, ProductViewTracker, and StickyMobileCTA
          are handled by ReviewLayout automatically */}
    </ReviewLayout>
  )
}
