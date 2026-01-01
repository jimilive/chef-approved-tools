import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { getReviewMetadata } from '@/data/metadata'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import TrackedAffiliateLink from '@/components/TrackedAffiliateLink'
import ReviewLayout from '@/components/review/ReviewLayout'
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
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'

// Import review data
import { reviewData } from './le-creuset-signature-7-25-qt-dutch-oven-data'
import { getDutchOvenComparison } from './get-dutch-oven-comparison'

const PRODUCT_SLUG = 'le-creuset-signature-7-25-qt-dutch-oven'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('le-creuset-signature-7-25-qt-dutch-oven')
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

// Helper function to process inline product links
function processInlineLinks(text: string, affiliateUrl: string, productName: string): (string | JSX.Element)[] {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/g)
  return parts.map((part, index) => {
    if (part.startsWith('<LINK>') && part.endsWith('</LINK>')) {
      const linkText = part.slice(6, -7)
      return (
        <a
          key={index}
          href={affiliateUrl}
          className="text-orange-700 hover:text-orange-800 font-medium no-underline hover:underline"
          target="_blank"
          rel="nofollow noopener noreferrer sponsored"
        >
          {linkText}
        </a>
      )
    }
    return part
  })
}

export default async function LeCreusetDutchOvenReviewPage() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product?.category || '')

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const dutchOvenComparisonData = await getDutchOvenComparison()

  // Merge Supabase data with legacy data (Supabase takes priority)
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
      backLinkHref="/cookware-and-bakeware"
      backLinkText="Browse all Cookware & Bakeware"
    >
      {/* SECTION 1: HERO - Includes LCP-optimized verdict */}
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
            productName={product.name}
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

                {/* CTA Button */}
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-hero-cta`}
                  position="above_fold"
                  productSlug={reviewData.productSlug}
                  merchant="amazon"
                >
                  <TrackedAffiliateLink
                    href={affiliateUrl}
                    merchant="amazon"
                    productSlug={reviewData.productSlug}
                    position="above_fold"
                    className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.hero.ctaText}
                  </TrackedAffiliateLink>
                </CTAVisibilityTracker>

                {/* Text link under button */}
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

          {/* SECTION 2: TESTING RESULTS */}
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* SECTION 6: TESTING STORY (E-E-A-T) - Conditional */}
          {(reviewData as any).testingStory && (
            <TestingStory
              title={(reviewData as any).testingStory.title}
              paragraphs={(reviewData as any).testingStory.paragraphs}
            />
          )}

          {/* CTA #2 - MID-CONTENT SOFT LINK */}
          <div className="text-center my-8">
            <AmazonCTA
              productSlug={productData.slug}
              affiliateUrl={affiliateUrl}
              position="mid_article"
              variant="textLink"
            />
          </div>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
          />

          {/* SECTION 9: REAL-WORLD USE CASES (E-E-A-T) - Conditional */}
          {(reviewData as any).realWorldUseCases && (
            <RealWorldUseCases
              title={(reviewData as any).realWorldUseCases.title}
              subtitle={(reviewData as any).realWorldUseCases.subtitle}
              useCases={(reviewData as any).realWorldUseCases.useCases}
            />
          )}

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
            boxHeading="Sound like the right fit for your kitchen?"
          />

          {/* SECTION 10: COMPARISON TABLE */}
          <ProductComparisonTable
            title={dutchOvenComparisonData.title}
            subtitle={dutchOvenComparisonData.subtitle}
            products={dutchOvenComparisonData.products}
            comparisonRows={dutchOvenComparisonData.comparisonRows}
            highlightedProduct={dutchOvenComparisonData.highlightedProduct}
          />

          {/* POST-COMPARISON CTA */}
          <AmazonCTA
            productSlug={productData.slug}
            affiliateUrl={affiliateUrl}
            position="comparison_table"
          />

          {/* SECTION 6: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 8: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 9: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed">
                {processInlineLinks(paragraph, affiliateUrl, productData.name)}
              </p>
            ))}
            customCTA={
              <div className="text-center">
                <AmazonCTA
                  productSlug={PRODUCT_SLUG}
                  affiliateUrl={affiliateUrl}
                  position="final_cta"
                />
              </div>
            }
          />

          <div className="text-center my-8">
            <Link
              href="/cookware-and-bakeware"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Cookware & Bakeware →
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
