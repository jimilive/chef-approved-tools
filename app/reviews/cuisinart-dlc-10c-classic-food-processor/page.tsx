import Link from 'next/link'
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
import { reviewData } from './cuisinart-dlc-10c-data'

const PRODUCT_SLUG = 'cuisinart-dlc-10c-classic-food-processor'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('cuisinart-dlc-10c-classic-food-processor')
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

export default async function CuisinartDLC10CReview() {
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

  // Merge Supabase data with legacy data (Supabase takes priority, but preserve legacy pros/cons if Supabase is empty)
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

  // Helper function to convert <LINK> tags to affiliate links
  const processInlineLinks = (content: string) => {
    const parts = content.split(/(<LINK>|<\/LINK>)/)
    const elements: (string | JSX.Element)[] = []
    let inLink = false
    let linkCounter = 0

    parts.forEach((part, index) => {
      if (part === '<LINK>') {
        inLink = true
      } else if (part === '</LINK>') {
        inLink = false
      } else if (part && inLink) {
        linkCounter++
        elements.push(
          <a
            key={`inline-link-${linkCounter}`}
            href={affiliateUrl}
            className="text-orange-700 hover:text-orange-800 font-medium no-underline"
            target="_blank"
            rel="nofollow noopener noreferrer sponsored"
          >
            {part}
          </a>
        )
      } else if (part) {
        elements.push(part)
      }
    })

    return elements
  }

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
      backLinkHref="/appliances"
      backLinkText="Browse all Small Appliances"
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
                <CTAVisibilityTracker
                  ctaId="hero-cta"
                  position="above_fold"
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.hero.ctaText}
                  </a>
                </CTAVisibilityTracker>
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                  >
                    → View {productData.name} on Amazon
                  </a>
                </p>
                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases. Price and availability may change.
                </p>
              </div>
            }
          />

          {/* MODEL DISCONTINUED NOTICE - Inline Section */}
          {reviewData.modelDiscontinuedNotice.show && (
            <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
              <div className="bg-amber-50 border-l-4 border-orange-500 rounded-md p-5">
                <p className="mb-4 text-base leading-relaxed font-bold text-amber-900">
                  ⚠️ Model Update
                </p>
                <p className="mb-4 text-base leading-relaxed text-amber-900">
                  {reviewData.modelDiscontinuedNotice.message}
                </p>
                <CTAVisibilityTracker
                  ctaId="model-notice-cta"
                  position="model_notice"
                  productSlug={productData.slug}
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-base"
                  >
                    View Current Model on Amazon →
                  </a>
                </CTAVisibilityTracker>
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                  >
                    → View {productData.name} on Amazon
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* SECTION 2: TESTING RESULTS */}
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

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '')}</>
            }))}
          />

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

          {/* CTA #4 - AFTER WHO SHOULD BUY (Decision Point) */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Ready to level up your food prep?"
          />

          {/* SECTION 6: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 7: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 9: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map((para, idx) => (
              <span key={`bottom-para-${idx}`}>{processInlineLinks(para)}</span>
            ))}
            customCTA={
              <div className="bg-white rounded-xl p-6">
                <CTAVisibilityTracker
                  ctaId="bottom-line-cta"
                  position="final_cta"
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.bottomLine.ctaText}
                  </a>
                </CTAVisibilityTracker>
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                  >
                    → View {productData.name} on Amazon
                  </a>
                </p>
                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases.
                </p>
              </div>
            }
          />

          <div className="text-center my-8">
            <Link
              href="/appliances"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Small Appliances →
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
