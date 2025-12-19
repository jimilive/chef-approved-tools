import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import AmazonCTA from '@/components/AmazonCTA'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
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
import { reviewData } from './victorinox-offset-bread-knife-data'
import { getBreadKnifeComparison } from './bread-knife-comparison-data'

const PRODUCT_SLUG = 'victorinox-offset-bread-knife'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('victorinox-offset-bread-knife')
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

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const comparisonData = await getBreadKnifeComparison()

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product.category)

  // Merge Supabase data with legacy data
  const productData = {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  }

  // Get primary affiliate link
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

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
              <AmazonCTA
                productSlug={PRODUCT_SLUG}
                affiliateUrl={affiliateUrl}
                position="above_fold"
              />
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
              affiliateUrl={affiliateUrl}
              position="mid_article"
              variant="textLink"
            />
          </div>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map((section, idx) => {
              // Add inline product links to 2-3 sections
              if (idx === 0 || idx === 1) {
                const content = typeof section.content === 'string' ? section.content : '';
                const parts = content.split('bread knife');
                if (parts.length > 1) {
                  return {
                    ...section,
                    content: (
                      <>
                        {parts[0]}
                        <a
                          href={affiliateUrl}
                          className="text-orange-700 hover:text-orange-800 font-medium"
                          target="_blank"
                          rel="nofollow noopener noreferrer sponsored"
                        >
                          bread knife
                        </a>
                        {parts.slice(1).join('bread knife')}
                      </>
                    )
                  };
                }
              }
              return section;
            })}
          />

          {/* SECTION 4: PROS & CONS */}
          <ProsConsGrid
            title={reviewData.prosConsTitle}
            prosTitle={reviewData.prosTitle}
            consTitle={reviewData.consTitle}
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* COMPARISON TABLE */}
          <section className="my-12">
            <ProductComparisonTable
              title={comparisonData.title}
              subtitle={comparisonData.subtitle}
              products={comparisonData.products}
              comparisonRows={comparisonData.comparisonRows}
              highlightedProduct={comparisonData.highlightedProduct}
            />

            {/* POST-COMPARISON CTA */}
            <AmazonCTA
              productSlug={PRODUCT_SLUG}
              affiliateUrl={affiliateUrl}
              position="comparison_table"
            />
          </section>

          {/* SECTION 5: WHO SHOULD BUY */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
          />

          {/* CTA - AFTER WHO SHOULD BUY */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Sound like the right fit for your kitchen?"
          />

          {/* SECTION 6: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            ctaText={reviewData.bottomLine.ctaText}
            ctaUrl={affiliateUrl}
            productSlug={PRODUCT_SLUG}
          />

          {/* FINAL CTA */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="final_cta"
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

          {/* AuthorBio, ProductViewTracker, and StickyMobileCTA handled by ReviewLayout */}
    </ReviewLayout>
  )
}
