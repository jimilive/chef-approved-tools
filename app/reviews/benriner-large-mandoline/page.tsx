import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import SizeSelector from '@/components/SizeSelector'
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
import { getReviewMetadata } from '@/data/metadata'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'

// Import custom sections
import SafetySection from '@/components/review/custom/SafetySection'
import CompatibilityGuide from '@/components/review/custom/CompatibilityGuide'

// Import review data
import { reviewData } from './benriner-large-mandoline-data'
import { getMandolineComparison } from './mandoline-comparison-data'

const PRODUCT_SLUG = 'benriner-large-mandoline'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('benriner-large-mandoline')
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }

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

export default async function BenrinerLargeMandolineReview() {
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
  const mandolineComparisonData = await getMandolineComparison()

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

  // Get affiliate links for both size variants from the SAME product
  // Note: Using type assertion since database has additional fields not in TS type
  const links = product?.affiliateLinks as any[]
  const linkLarge = links?.find((link: any) => link.is_primary === true)
  const linkOriginal = links?.find((link: any) => link.is_primary === false)

  const affiliateUrl = linkLarge?.url || (product ? getPrimaryAffiliateLink(product) : '#')
  const affiliateUrlMedium = linkOriginal?.url || ''

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
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6 min-h-[280px]">
                <SizeSelector
                  title="Choose Your Size:"
                  options={[
                    {
                      id: 'large',
                      label: 'Large',
                      description: 'Professional size, handles big vegetables. Includes hand guard.',
                      affiliateUrl: affiliateUrl,
                      ctaId: 'hero-cta-large'
                    },
                    {
                      id: 'medium',
                      label: 'Original',
                      description: 'Compact size with 3 julienne blade inserts. Includes hand guard.',
                      affiliateUrl: affiliateUrlMedium,
                      ctaId: 'hero-cta-medium'
                    }
                  ]}
                  defaultSize="large"
                  ctaText={reviewData.hero.ctaText || 'Check Price on Amazon →'}
                  ctaPosition="above_fold"
                  showDisclosure={true}
                  productSlug={PRODUCT_SLUG}
                />
                {/* V2: TEXT LINKS UNDER SIZE SELECTOR */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-sm">
                    <a
                      href={affiliateUrl}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                    >
                      → View Large {productData.name} on Amazon
                    </a>
                  </p>
                  <p className="text-sm">
                    <a
                      href={affiliateUrlMedium}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                    >
                      → View Original Benriner on Amazon
                    </a>
                  </p>
                </div>
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
            sections={reviewData.performanceAnalysis.sections}
          />

          {/* CUSTOM SECTION: SAFETY - Critical for mandoline */}
          <SafetySection
            title="Safety: Respect the Blade"
            warnings={reviewData.safety.warnings}
            guidelines={reviewData.safety.guidelines}
          />

          {/* CUSTOM SECTION: COMPATIBILITY GUIDE - Vegetable guide */}
          <CompatibilityGuide
            title="What Works Best: Vegetable Compatibility Guide"
            categories={reviewData.compatibility.categories}
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
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              How Does the Benriner Compare?
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              After 24 years in professional kitchens, I&apos;ve tested dozens of mandolines.
              Here&apos;s how the Benriner Super Benriner stacks up against the top competitors.
            </p>
            <ProductComparisonTable
              title={mandolineComparisonData.title}
              subtitle={mandolineComparisonData.subtitle}
              products={mandolineComparisonData.products}
              comparisonRows={mandolineComparisonData.comparisonRows}
              highlightedProduct={mandolineComparisonData.highlightedProduct}
            />

            {/* POST-COMPARISON CTA */}
            <AmazonCTA
              productSlug={productData.slug}
              affiliateUrl={affiliateUrl}
              position="comparison_table"
            />
          </section>

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

          {/* Size considerations box */}
          {reviewData.whoShouldBuy.sizing && (
            <div className="bg-white rounded-2xl px-6 pt-0 pb-12 md:px-12 shadow-sm mb-6 -mt-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-base font-semibold text-amber-900 mb-3 mt-0">💡 {reviewData.whoShouldBuy.sizing.title}</h3>
                {reviewData.whoShouldBuy.sizing.options.map((option, index) => (
                  <p key={index} className={`text-sm text-amber-900 ${index < reviewData.whoShouldBuy.sizing.options.length - 1 ? 'mb-2' : 'mb-0'}`}>
                    <strong>{option.name}:</strong> {option.note}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* CTA #4 - AFTER WHO SHOULD BUY (Decision Point) */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Sound like the right fit for your kitchen?"
          />

          {/* SECTION 7: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 9: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 10: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            customCTA={
              <div className="bg-white rounded-xl p-6 min-h-[280px]">
                <SizeSelector
                  title="Choose Your Size:"
                  options={[
                    {
                      id: 'large',
                      label: 'Large',
                      description: 'Professional size, handles big vegetables. Includes hand guard.',
                      affiliateUrl: affiliateUrl,
                      ctaId: 'bottom-line-large'
                    },
                    {
                      id: 'medium',
                      label: 'Original',
                      description: 'Compact size with 3 julienne blade inserts. Includes hand guard.',
                      affiliateUrl: affiliateUrlMedium,
                      ctaId: 'bottom-line-medium'
                    }
                  ]}
                  defaultSize="large"
                  ctaText={reviewData.bottomLine.ctaText || 'Check Price on Amazon →'}
                  ctaPosition="final_cta"
                  showDisclosure={true}
                  productSlug={PRODUCT_SLUG}
                />
                {/* V2: TEXT LINKS UNDER SIZE SELECTOR */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-sm">
                    <a
                      href={affiliateUrl}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                    >
                      → View Large {productData.name} on Amazon
                    </a>
                  </p>
                  <p className="text-sm">
                    <a
                      href={affiliateUrlMedium}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                    >
                      → View Original Benriner on Amazon
                    </a>
                  </p>
                </div>
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

          {/* SECTION 11: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />


    </ReviewLayout>
  )
}
