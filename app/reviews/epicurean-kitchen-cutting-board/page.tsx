import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getReviewMetadata } from '@/data/metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import TrackedAffiliateLink from '@/components/TrackedAffiliateLink'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
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

// Import review data
import { reviewData } from './epicurean-kitchen-cutting-board-data'
import { getCuttingBoardComparison } from './get-cutting-board-comparison'

const PRODUCT_SLUG = 'epicurean-kitchen-cutting-board'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('epicurean-kitchen-cutting-board')
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

export default async function EpicureanKitchenCuttingBoardReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const cuttingBoardComparisonData = await getCuttingBoardComparison()

  // Get affiliate URLs for size variants from the product's affiliateLinks
  const link8x6 = product?.affiliateLinks.find(link => link.tag === '8x6')
  const link11x9 = product?.affiliateLinks.find(link => link.tag === '11x9')
  const link14x11 = product?.affiliateLinks.find(link => link.tag === '14x11')
  const link17x13 = product?.affiliateLinks.find(link => link.tag === '17x13')

  // Use tagged links if available, otherwise use primary
  const affiliateUrl8x6 = link8x6?.url || ''
  const affiliateUrl11x9 = link11x9?.url || ''
  const affiliateUrl14x11 = link14x11?.url || (product ? getPrimaryAffiliateLink(product) : '#')
  const affiliateUrl17x13 = link17x13?.url || ''

  // Epicurean size options with affiliate links from database
  const sizeOptions = [
    { size: '8" × 6"', link: affiliateUrl8x6, label: 'Small', tag: '8x6' },
    { size: '11.5" × 9"', link: affiliateUrl11x9, label: 'Medium', tag: '11x9' },
    { size: '14.5" × 11.25"', link: affiliateUrl14x11, label: 'Large (Reviewed)', tag: '14x11' },
    { size: '17.5" × 13"', link: affiliateUrl17x13, label: 'XL', tag: '17x13' },
  ].filter(option => option.link) // Only show sizes that have affiliate links

  // Helper function to process inline affiliate links
  const processInlineLinks = (content: string) => {
    const parts = content.split(/(<LINK>|<\/LINK>)/)
    const elements: (string | JSX.Element)[] = []
    let isInsideLink = false
    let linkContent = ''
    let linkIndex = 0

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '<LINK>') {
        isInsideLink = true
        linkContent = ''
      } else if (parts[i] === '</LINK>') {
        isInsideLink = false
        const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'
        elements.push(
          <a
            key={`inline-link-${linkIndex++}`}
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener noreferrer sponsored"
            className="text-orange-700 hover:text-orange-800 underline font-medium"
          >
            {linkContent}
          </a>
        )
        linkContent = ''
      } else if (isInsideLink) {
        linkContent += parts[i]
      } else if (parts[i]) {
        elements.push(parts[i])
      }
    }

    return elements
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

  // Get primary affiliate link
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  // Get category breadcrumb from Supabase category
  const categoryBreadcrumb = getCategoryBreadcrumb(productData.category)

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
          productName={product.name}
          ctaUrl={affiliateUrl}
          ctaText={reviewData.hero.ctaText}
          customCTA={(
            <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
              {/* Size Selection */}
              <p className="text-sm font-semibold text-slate-700 mb-3 text-center">Choose Your Size:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {sizeOptions.map((option, index) => (
                  <CTAVisibilityTracker
                    key={index}
                    ctaId={`hero-size-${option.tag}`}
                    position="above_fold"
                    productSlug={PRODUCT_SLUG}
                    merchant="amazon"
                  >
                    <TrackedAffiliateLink
                      href={option.link}
                      merchant="amazon"
                      productSlug={PRODUCT_SLUG}
                      position="above_fold"
                      className={`block text-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        option.label.includes('Reviewed')
                          ? 'border-orange-500 bg-orange-50 hover:bg-orange-100'
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-slate-900">{option.size}</span>
                      <span className={`block text-xs ${option.label.includes('Reviewed') ? 'text-orange-700 font-medium' : 'text-slate-700'}`}>
                        {option.label}
                      </span>
                    </TrackedAffiliateLink>
                  </CTAVisibilityTracker>
                ))}
              </div>

              {/* Main CTA */}
              <CTAVisibilityTracker ctaId="hero-cta" position="above_fold" productSlug={PRODUCT_SLUG} merchant="amazon">
                <TrackedAffiliateLink
                  href={affiliateUrl}
                  merchant="amazon"
                  productSlug={PRODUCT_SLUG}
                  position="above_fold"
                  className="block w-full text-center bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105"
                >
                  {reviewData.hero.ctaText}
                </TrackedAffiliateLink>
              </CTAVisibilityTracker>

              <p className="text-xs text-slate-700 text-center mt-4">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
            </div>
          )}
        />

        {/* SECTION 2: TESTING RESULTS */}
        <TestingResultsGrid
          title={reviewData.testingResults.title}
          sections={reviewData.testingResults.sections}
          testingEnvironment={reviewData.testingResults.testingEnvironment}
          outstandingPerformance={reviewData.testingResults.outstandingPerformance}
          minorConsiderations={reviewData.testingResults.minorConsiderations}
        />

        {/* SECTION 2.5: TESTING STORY (E-E-A-T) - Conditional */}
        {(reviewData as any).testingStory && (
          <TestingStory
            title={(reviewData as any).testingStory.title}
            paragraphs={(reviewData as any).testingStory.paragraphs}
          />
        )}

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
          sections={reviewData.performanceAnalysis.sections.map(section => ({
            ...section,
            content: processInlineLinks(section.content)
          }))}
        />

        {/* SECTION 3.5: REAL-WORLD USE CASES (E-E-A-T) - Conditional */}
        {(reviewData as any).realWorldUseCases && (
          <RealWorldUseCases
            title={(reviewData as any).realWorldUseCases.title}
            subtitle={(reviewData as any).realWorldUseCases.subtitle}
            useCases={(reviewData as any).realWorldUseCases.useCases}
          />
        )}

        {/* SECTION 4: PROS & CONS */}
        <ProsConsGrid
          title="Honest Assessment After 10 Years"
          prosTitle="What Works Exceptionally Well"
          consTitle="Limitations to Consider"
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

        {/* INLINE SECTION: SPECIFICATIONS */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Complete Specifications & Dimensions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">Technical Specifications</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Model Number:</dt>
                    <dd className="font-semibold">KS11130101</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Material:</dt>
                    <dd className="font-semibold">Richlite (wood fiber composite)</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">NSF Certified:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Heat Resistance:</dt>
                    <dd className="font-semibold">Up to 350°F</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Dishwasher Safe:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Non-Porous:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Made in USA:</dt>
                    <dd className="font-semibold">Yes</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">Physical Dimensions</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Length:</dt>
                    <dd className="font-semibold">14.5 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Width:</dt>
                    <dd className="font-semibold">11.25 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Thickness:</dt>
                    <dd className="font-semibold">0.25 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Weight:</dt>
                    <dd className="font-semibold">1.5 lbs</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <dt className="text-slate-700">Available Sizes:</dt>
                    <dd className="font-semibold">Multiple sizes available</dd>
                  </div>
                </dl>

                <p className="text-xs text-slate-700 mt-4 italic">
                  This review covers the standard 14.5 × 11.25 inch size, ideal for most home kitchens.
                </p>
              </div>
            </div>
          </div>

        {/* SECTION: COMPARISON TABLE */}
        <ProductComparisonTable
          title={cuttingBoardComparisonData.title}
          subtitle={cuttingBoardComparisonData.subtitle}
          products={cuttingBoardComparisonData.products}
          comparisonRows={cuttingBoardComparisonData.comparisonRows}
          highlightedProduct={cuttingBoardComparisonData.highlightedProduct}
        />

        {/* POST-COMPARISON CTA */}
        <AmazonCTA
          productSlug={PRODUCT_SLUG}
          affiliateUrl={affiliateUrl}
          position="comparison_table"
          boxHeading="Ready to upgrade your cutting board?"
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
            paragraphs={reviewData.bottomLine.paragraphs.map(p => processInlineLinks(p))}
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

          <div className="text-center my-8">
            <Link
              href="/prep-tools"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Prep Tools →
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
