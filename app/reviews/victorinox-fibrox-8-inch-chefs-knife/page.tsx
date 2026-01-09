/**
 * Victorinox Fibrox 8-Inch Chef's Knife Review
 *
 * UPDATED: December 15, 2025
 * - Now uses ReviewLayout component for consistent structure
 * - Removed deprecated "Where to Buy" section
 * - Added CTA #2 after Testing Results
 * - Added visible dates
 *
 * Structure follows REVIEW_PAGE_MASTER_SPEC_V3.md
 */

import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getOGImageURL } from '@/lib/og-image'
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
  PerformanceAnalysis,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid,
  RelatedArticlesGrid
} from '@/components/review'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'

// Data
import { reviewData } from './victorinox-fibrox-8-inch-chefs-knife-data'
import { getChefKnifeComparison } from './chef-knife-comparison-data'

const PRODUCT_SLUG = 'victorinox-fibrox-8-inch-chefs-knife'

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

export default async function ProductReview() {
  // ==================== DATA FETCHING ====================
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  const gitDates = getReviewGitDates(PRODUCT_SLUG)
  const tierBadge = getTierBadge(PRODUCT_SLUG)
  const categoryBreadcrumb = getCategoryBreadcrumb(product?.category || '')
  const chefKnifeComparisonData = await getChefKnifeComparison()

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
      backLinkHref="/knives"
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

      {/* ========== CTA #2: AFTER TESTING RESULTS ========== */}
      <div className="text-center my-8">
        <AmazonCTA
          productSlug={PRODUCT_SLUG}
          affiliateUrl={affiliateUrl}
          position="mid_article"
          variant="textLink"
        />
      </div>

      {/* ========== SECTION 3: PERFORMANCE ANALYSIS ========== */}
      <PerformanceAnalysis
        title={reviewData.performanceAnalysis.title}
        sections={reviewData.performanceAnalysis.sections.map((section, index) => ({
          ...section,
          content: index === 0 ? (
            <>
              The lightweight fibrox handle and thin, flexible blade create exceptional balance. Unlike heavy German knives, the{' '}
              <a
                href={affiliateUrl}
                className="text-orange-700 hover:text-orange-800 font-medium"
                target="_blank"
                rel="nofollow noopener noreferrer sponsored"
              >
                Victorinox
              </a>
              {' '}delivers nimble control for detailed work. No hand fatigue during extended prep sessions—critical for professional use where you&apos;re prepping 200+ covers daily.
            </>
          ) : index === 3 ? (
            <>
              After 45 years of cooking and countless knives tested, the{' '}
              <a
                href={affiliateUrl}
                className="text-orange-700 hover:text-orange-800 font-medium"
                target="_blank"
                rel="nofollow noopener noreferrer sponsored"
              >
                Victorinox 8-inch chef&apos;s knife
              </a>
              {' '}remains my primary blade. From managing kitchen operations at Mellow Mushroom to working the line at fine dining restaurants, I&apos;ve used this knife to prep 200+ covers worth of mise en place daily, slice 5 lbs of mushrooms in under 10 minutes, dice pounds of onions and vegetables per shift, and portion proteins during service. The knife has never let me down. No chipping, no handle issues, no rust. Just consistent performance day after day.
            </>
          ) : index === 4 ? (
            <>
              Here&apos;s the truth about expensive knives: Beyond basic quality standards, you&apos;re paying for aesthetics, brand prestige, and premium materials that don&apos;t improve cutting performance. The{' '}
              <a
                href={affiliateUrl}
                className="text-orange-700 hover:text-orange-800 font-medium"
                target="_blank"
                rel="nofollow noopener noreferrer sponsored"
              >
                Victorinox
              </a>
              {' '}delivers what matters—sharpness, balance, durability—at a fraction of premium pricing. In 24 years in professional kitchens, I&apos;ve seen expensive premium knives and Victorinox knives side-by-side. The expensive knives look prettier on the magnetic strip. The Victorinox knives get used daily because they work better for actual cooking.
            </>
          ) : section.content
        }))}
      />

      {/* ========== SECTION 4: COMPARISON TABLE ========== */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">
          How Does the Victorinox Compare?
        </h2>
        <p className="text-lg text-slate-700 mb-8">
          After 24 years in professional kitchens, I&apos;ve tested dozens of chef&apos;s knives.
          Here&apos;s how the Victorinox Fibrox stacks up against the top competitors.
        </p>
        <ProductComparisonTable
          title={chefKnifeComparisonData.title}
          subtitle={chefKnifeComparisonData.subtitle}
          products={chefKnifeComparisonData.products}
          comparisonRows={chefKnifeComparisonData.comparisonRows}
          highlightedProduct={chefKnifeComparisonData.highlightedProduct}
        />

        {/* CTA #3: AFTER COMPARISON TABLE (CRITICAL) */}
        <AmazonCTA
          productSlug={PRODUCT_SLUG}
          affiliateUrl={affiliateUrl}
          position="comparison_table"
        />
      </section>

      {/* ========== SECTION 5: PROS & CONS ========== */}
      <ProsConsGrid
        title={reviewData.prosConsTitle}
        prosTitle={reviewData.prosTitle}
        consTitle={reviewData.consTitle}
        pros={productData.pros}
        cons={productData.cons}
      />

      {/* ========== SECTION 6: WHO SHOULD BUY ========== */}
      <WhoShouldBuyGrid
        title={reviewData.whoShouldBuy.title}
        perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
        considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
        perfectFor={reviewData.whoShouldBuy.perfectFor}
        considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
      />

      {/* CTA #4: AFTER WHO SHOULD BUY */}
      <AmazonCTA
        productSlug={PRODUCT_SLUG}
        affiliateUrl={affiliateUrl}
        position="who_should_buy"
        boxHeading="Sound like the right fit for your kitchen?"
      />

      {/* ========== SECTION 7: FAQ ========== */}
      <FAQSection
        title={reviewData.faq.title}
        faqs={reviewData.faq.items}
      />

      {/* ========== SECTION 8: EMAIL CAPTURE ========== */}
      <EmailCaptureSection />

      {/* ========== SECTION 9: BOTTOM LINE + CTA #5 ========== */}
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

      {/* ========== SECTION 11: RELATED ARTICLES ========== */}
      <RelatedArticlesGrid
        title={reviewData.relatedArticles.title}
        articles={reviewData.relatedArticles.articles}
      />

      {/* NOTE: AuthorBio, ProductViewTracker, and StickyMobileCTA
          are handled by ReviewLayout automatically */}
    </ReviewLayout>
  )
}
