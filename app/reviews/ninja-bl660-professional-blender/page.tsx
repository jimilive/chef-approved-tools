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
import { reviewData } from './ninja-bl660-professional-blender-data'
import { getBlenderComparison } from './blender-comparison-data'

const PRODUCT_SLUG = 'ninja-bl660-professional-blender'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('ninja-bl660-professional-blender')
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

export default async function NinjaBL660ReviewPage() {
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const comparisonData = await getBlenderComparison()

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product.category)

  const productData = {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  }

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
              <AmazonCTA
                productSlug={PRODUCT_SLUG}
                affiliateUrl={affiliateUrl}
                position="above_fold"
              />
            }
          />

          {/* TESTING IN PROGRESS NOTICE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-6 md:px-12 shadow-sm mb-6">
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="font-semibold text-amber-900 mb-2">{reviewData.testingInProgress.title}</p>
                  <p className="text-sm text-amber-800 mb-2">{reviewData.testingInProgress.intro}</p>
                  <p className="text-sm text-amber-800">
                    <strong>Next Update:</strong> {reviewData.testingInProgress.nextUpdate}<br/>
                    <strong>Tier 2 Upgrade:</strong> {reviewData.testingInProgress.tier2Upgrade}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QUALITY CONTROL WARNING */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-semibold text-red-900 mb-2">{reviewData.qualityControlWarning.title}</p>
                  <p className="text-sm text-red-800 mb-2">{reviewData.qualityControlWarning.intro}</p>
                  <p className="text-sm text-red-800">
                    <strong>{reviewData.qualityControlWarning.update}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

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
            sections={reviewData.performanceAnalysis.sections}
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

          {/* SECTION 3: PROFESSIONAL CONTEXT */}
          <section className="mb-12 bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.professionalContext.title}</h2>
            {reviewData.professionalContext.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4">{p}</p>
            ))}
          </section>

          {/* REAL-WORLD TESTING */}
          <section className="mb-12 bg-slate-50 rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.realWorldTesting.title}</h2>
            {reviewData.realWorldTesting.tests.map((test, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{test.title}</h3>
                {test.sections.map((section, sidx) => (
                  <div key={sidx} className="mb-3">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>{section.subtitle}:</strong> {section.content}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </section>

          {/* TECHNICAL SPECS */}
          <section className="mb-12 bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Technical Specifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="text-left p-3 font-semibold">Specification</th>
                    <th className="text-left p-3 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.technicalSpecs.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'border-b border-gray-200' : 'bg-gray-50 border-b border-gray-200'}>
                      <td className="p-3 font-medium">{item.spec}</td>
                      <td className="p-3">{item.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* WHO SHOULD BUY */}
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

          {/* FAQ */}
          <FAQSection title={reviewData.faq.title} faqs={reviewData.faq.items} />

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
              href="/appliances"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Small Appliances →
            </Link>
          </div>

          {/* RELATED PRODUCTS */}
          <RelatedProductsGrid title={reviewData.relatedProducts.title} products={reviewData.relatedProducts.products} />

          {/* AuthorBio, ProductViewTracker, and StickyMobileCTA handled by ReviewLayout */}
    </ReviewLayout>
  )
}
