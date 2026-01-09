import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink, getAllAffiliateLinks } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { getReviewMetadata } from '@/data/metadata'
import AmazonCTA from '@/components/AmazonCTA'
import MultiVendorCTA from '@/components/MultiVendorCTA'
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
  RelatedProductsGrid,
  RelatedArticlesGrid
} from '@/components/review'
import ReviewLayout from '@/components/review/ReviewLayout'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import AuthorBio from '@/components/review/AuthorBio'

// Import review data
import { reviewData } from './lamson-fish-spatula-data'
import { getFishSpatulaComparison } from './get-fish-spatula-comparison'

const PRODUCT_SLUG = 'lamson-fish-spatula'

// ISR: Regenerate page every hour
export const revalidate = 3600

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('lamson-fish-spatula')
  const product = await getProductBySlug(reviewData.productSlug)

  const productData = product || reviewData.legacyProductData

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

export default async function LamsonFishSpatulaReview() {
  // Get product data from Supabase (may not exist yet)
  const product = await getProductBySlug(PRODUCT_SLUG)

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product?.category || 'Kitchen Tools')

  // Merge Supabase data with legacy data (use legacy if no Supabase entry yet)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  // Affiliate links for both variants
  const rightHandedLink = reviewData.affiliateLinks.rightHanded.url
  const leftHandedLink = reviewData.affiliateLinks.leftHanded.url

  // Get all affiliate links for multi-vendor CTAs (right + left handed)
  const affiliateLinks = product ? getAllAffiliateLinks(product) : [
    { url: rightHandedLink, label: 'Right-Handed', vendor: 'amazon', is_primary: true },
    { url: leftHandedLink, label: 'Left-Handed', vendor: 'amazon', is_primary: false }
  ]

  // Get comparison data for competitor table
  const fishSpatulaComparisonData = getFishSpatulaComparison()

  return (
    <ReviewLayout
      product={product || productData}
      slug={PRODUCT_SLUG}
      affiliateUrl={rightHandedLink}
      gitDates={gitDates}
      categoryBreadcrumb={categoryBreadcrumb}
      faqData={reviewData.faqData}
      tier={reviewData.metadata.tier as 1 | 2 | 3}
      testingPeriod={reviewData.tracking.testingPeriod}
      hook={reviewData.tracking.hook}
      backLinkHref="/moving-and-stirring-tools"
      backLinkText="Browse all Moving & Stirring Tools"
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
        productName={productData.name}
        customCTA={
          <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm mb-6">
              {reviewData.quickStats.specifications.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span>{spec.icon}</span>
                  <span className="text-slate-700"><strong>{spec.label}:</strong> {spec.value}</span>
                </div>
              ))}
            </div>

            {/* Multi-Variant CTA Buttons (Right + Left Handed) */}
            <MultiVendorCTA
              affiliateLinks={affiliateLinks}
              productName={productData.name}
              ctaId="hero-cta"
              position="above_fold"
              productSlug={productData.slug}
            />

            <p className="text-xs text-slate-700 text-center mt-4">
              As an Amazon Associate, I earn from qualifying purchases.
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
          productSlug={productData.slug}
          affiliateUrl={rightHandedLink}
          position="mid_article"
          variant="textLink"
        />
      </div>

      {/* SECTION 3: PERFORMANCE ANALYSIS - Stainless vs Silicone */}
      <PerformanceAnalysis
        title={reviewData.performanceAnalysis.title}
        sections={reviewData.performanceAnalysis.sections}
      />

      {/* SECTION 4: LEFT-HANDED FISH SPATULA (KD 1 KEYWORD!) */}
      <section className="bg-blue-50 rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">{reviewData.leftHandedSection.title}</h2>
        {reviewData.leftHandedSection.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-lg leading-relaxed text-slate-700 mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}

        {/* Left-Handed CTA */}
        <div className="mt-6 text-center">
          <CTAVisibilityTracker
            ctaId="lamson-fish-spatula-left-handed"
            position="mid_article"
            productSlug="lamson-fish-spatula-left-handed"
            merchant="amazon"
          >
            <a
              href={leftHandedLink}
              target="_blank"
              rel="nofollow noopener noreferrer sponsored"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Check Left-Handed Price on Amazon →
            </a>
          </CTAVisibilityTracker>
        </div>
      </section>

      {/* SECTION 5: COMPARISON TABLE */}
      <ProductComparisonTable
        title={fishSpatulaComparisonData.title}
        subtitle={fishSpatulaComparisonData.subtitle}
        products={fishSpatulaComparisonData.products}
        comparisonRows={fishSpatulaComparisonData.comparisonRows}
        highlightedProduct={fishSpatulaComparisonData.highlightedProduct}
      />

      {/* POST-COMPARISON CTA */}
      <AmazonCTA
        productSlug={productData.slug}
        affiliateUrl={rightHandedLink}
        position="comparison_table"
      />

      {/* SECTION 6: PROS & CONS */}
      <ProsConsGrid
        title={reviewData.prosConsTitle}
        prosTitle={reviewData.prosTitle}
        consTitle={reviewData.consTitle}
        pros={productData.pros}
        cons={productData.cons}
      />

      {/* SECTION 7: WHO SHOULD BUY */}
      <WhoShouldBuyGrid
        title={reviewData.whoShouldBuy.title}
        perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
        considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
        perfectFor={reviewData.whoShouldBuy.perfectFor}
        considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
      />

      {/* CTA #4 - AFTER WHO SHOULD BUY */}
      <AmazonCTA
        productSlug={PRODUCT_SLUG}
        affiliateUrl={rightHandedLink}
        position="who_should_buy"
        boxHeading="Ready to upgrade your fish spatula?"
      />

      {/* SECTION 8: FAQ */}
      <FAQSection
        title={reviewData.faq.title}
        faqs={reviewData.faq.items}
      />

      {/* SECTION 9: EMAIL CAPTURE */}
      <EmailCaptureSection />

      {/* SECTION 10: BOTTOM LINE */}
      <BottomLineSection
        title={reviewData.bottomLine.title}
        paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
        customCTA={
          <div className="bg-white rounded-xl p-6 flex justify-center">
            <MultiVendorCTA
              affiliateLinks={affiliateLinks}
              productName={productData.name}
              ctaId="bottom-line-cta"
              position="final_cta"
              productSlug={productData.slug}
            />
          </div>
        }
      />

      <div className="text-center my-8">
        <Link
          href="/moving-and-stirring-tools"
          className="text-orange-700 hover:text-orange-800 font-medium"
        >
          Explore more Moving & Stirring Tools →
        </Link>
      </div>

      {/* SECTION 11: RELATED PRODUCTS */}
      <RelatedProductsGrid
        title={reviewData.relatedProducts.title}
        products={reviewData.relatedProducts.products}
      />

      {/* SECTION 12: RELATED ARTICLES */}
      <RelatedArticlesGrid
        title={reviewData.relatedArticles.title}
        articles={reviewData.relatedArticles.articles}
      />

      {/* SECTION 13: AUTHOR BIO */}
      <AuthorBio />
    </ReviewLayout>
  )
}
