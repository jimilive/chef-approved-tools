import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink, getAllAffiliateLinks } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { getReviewMetadata } from '@/data/metadata'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import TrackedAffiliateLink from '@/components/TrackedAffiliateLink'
import MultiVendorCTA from '@/components/MultiVendorCTA'
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
  RelatedProductsGrid,
  RelatedArticlesGrid
} from '@/components/review'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import TestimonialsSection from '@/components/TestimonialsSection'

// Import review data
import { reviewData } from './kitchenaid-kp26m1xlc-professional-600-data'
import { getStandMixerComparison } from './stand-mixer-comparison-data'

const PRODUCT_SLUG = 'kitchenaid-kp26m1xlc-professional-600'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('kitchenaid-kp26m1xlc-professional-600')
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
function processInlineLinks(text: string, affiliateUrl: string): (string | JSX.Element)[] {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/g)

  return parts.map((part, index) => {
    if (part.startsWith('<LINK>') && part.endsWith('</LINK>')) {
      const linkText = part.slice(6, -7)
      return (
        <a
          key={index}
          href={affiliateUrl}
          className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700"
        >
          {linkText}
        </a>
      )
    }
    return part
  })
}

export default async function KitchenAidProfessional600ReviewPage() {
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
  const standMixerComparisonData = await getStandMixerComparison()

  const productData = product

  // ===== STRATEGIC AFFILIATE LINK SELECTION =====
  // Priority: Supabase primary link > Strategic primary > Fallback
  const primaryLink = product ? getPrimaryAffiliateLink(product) : reviewData.strategicLinks.primary.url
  const bowlLiftLink = reviewData.strategicLinks.secondary.url
  const compareAllLink = reviewData.strategicLinks.tertiary.url
  const trustLink = reviewData.strategicLinks.trust.url

  // Get all affiliate links for multi-vendor CTAs
  const affiliateLinks = product ? getAllAffiliateLinks(product) : []

  return (
    <ReviewLayout
      product={product}
      slug={PRODUCT_SLUG}
      affiliateUrl={primaryLink}
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
        <div className="mb-8">
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
            ctaUrl={primaryLink}
            ctaText={reviewData.hero.ctaText}
            customCTA={(
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                {/* Multi-Vendor CTA Buttons */}
                <MultiVendorCTA
                  affiliateLinks={affiliateLinks}
                  productName={productData.name}
                  ctaId="hero-cta"
                  position="above_fold"
                  productSlug={productData.slug}
                />

                <p className="text-xs text-slate-700 text-center mt-4">
                  As a KitchenAid affiliate, I earn from qualifying purchases. Price and availability may change.
                </p>
              </div>
            )}
          />
        </div>

        {/* SECTION 2: TESTING RESULTS */}
        <div className="mb-8" id="primary-cta">
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', primaryLink)}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />
        </div>

        {/* SECTION 6: TESTING STORY (E-E-A-T) - Conditional */}
        {(reviewData as any).testingStory && (
          <TestingStory
            title={(reviewData as any).testingStory.title}
            paragraphs={(reviewData as any).testingStory.paragraphs}
          />
        )}

        {/* CTA #2 - MID-CONTENT SOFT LINK */}
        <div className="text-center my-8">
          <CTAVisibilityTracker
            ctaId={`${productData.slug}-mid-content`}
            position="mid_article"
            productSlug={productData.slug}
            merchant="kitchenaid_direct"
          >
            <TrackedAffiliateLink
              href={primaryLink}
              merchant="kitchenaid_direct"
              productSlug={productData.slug}
              position="mid_article"
              className="text-orange-700 hover:text-orange-800 font-medium underline"
            >
              → See current KitchenAid price and availability
            </TrackedAffiliateLink>
          </CTAVisibilityTracker>
        </div>

        {/* SECTION 3: PERFORMANCE ANALYSIS */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections.map(section => ({
            ...section,
            content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', primaryLink)}</>
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

        {/* SECTION 10: COMPARISON TABLE */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            How Does the Professional 600 Compare?
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            After 24 years of professional kitchen experience and 18 years with this Professional 600 at home,
            I know exactly how it compares to commercial performance.
          </p>
          <ProductComparisonTable
            title={standMixerComparisonData.title}
            subtitle={standMixerComparisonData.subtitle}
            products={standMixerComparisonData.products}
            comparisonRows={standMixerComparisonData.comparisonRows}
            highlightedProduct={standMixerComparisonData.highlightedProduct}
          />

          {/* POST-COMPARISON CTA */}
          <AmazonCTA
            productSlug={productData.slug}
            affiliateUrl={primaryLink}
            position="comparison_table"
            text="Check Price on KitchenAid"
          />
        </section>

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
          affiliateUrl={primaryLink}
          position="who_should_buy"
          boxHeading="Sound like the right fit for your kitchen?"
          text="Check Price on KitchenAid"
        />

        {/* SECTION 6: EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* SECTION 7: FAQ */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

        {/* SECTION 9: BOTTOM LINE */}
        <BottomLineSection
          title={reviewData.bottomLine.title}
          paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed">
              {processInlineLinks(paragraph, primaryLink)}
            </p>
          ))}
          customCTA={(
            <div className="bg-white rounded-xl p-6 flex justify-center">
              <MultiVendorCTA
                affiliateLinks={affiliateLinks}
                productName={productData.name}
                ctaId="bottom-line-cta"
                position="final_cta"
                productSlug={productData.slug}
              />
            </div>
          )}
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

        {/* SECTION 11: RELATED ARTICLES */}
        <RelatedArticlesGrid
          title={reviewData.relatedArticles.title}
          articles={reviewData.relatedArticles.articles}
        />

        {/* SECTION 12: TESTIMONIALS */}
        <TestimonialsSection />

    </ReviewLayout>
  )
}
