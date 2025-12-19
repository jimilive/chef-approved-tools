import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
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
import { getReviewMetadata } from '@/data/metadata'

// Import review data
import { reviewData } from './john-boos-platinum-commercial-cutting-board-data'
import { getJohnBoosComparison } from './get-john-boos-comparison'

const PRODUCT_SLUG = 'john-boos-platinum-commercial-cutting-board'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('john-boos-platinum-commercial-cutting-board')
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

export default async function JohnBoosPlatinumCuttingBoardReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get comparison data with live affiliate links from database
  const johnBoosComparisonData = await getJohnBoosComparison()

  // Get affiliate URLs for size variants from the product's affiliateLinks
  const link24x18 = product?.affiliateLinks.find(link => link.tag === '24x18')
  const link20x15 = product?.affiliateLinks.find(link => link.tag === '20x15')
  const link18x12 = product?.affiliateLinks.find(link => link.tag === '18x12')

  // Use tagged links if available, otherwise use primary
  const affiliateUrl24x18 = link24x18?.url || (product ? getPrimaryAffiliateLink(product) : '#')
  const affiliateUrl20x15 = link20x15?.url || ''
  const affiliateUrl18x12 = link18x12?.url || ''

  // John Boos size options with affiliate links from database
  const sizeOptions = [
    { size: '18" × 12"', link: affiliateUrl18x12, label: 'Small', tag: '18x12' },
    { size: '20" × 15"', link: affiliateUrl20x15, label: 'Medium', tag: '20x15' },
    { size: '24" × 18"', link: affiliateUrl24x18, label: 'Large (Reviewed)', tag: '24x18' },
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
            ctaUrl={affiliateUrl}
            ctaText={reviewData.hero.ctaText}
            customCTA={(
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                {/* Size Selection */}
                {sizeOptions.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-slate-700 mb-3 text-center">Choose Your Size:</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {sizeOptions.map((option, index) => (
                        <CTAVisibilityTracker
                          key={index}
                          ctaId={`hero-size-${option.tag}`}
                          position="above_fold"
                          productSlug={reviewData.productSlug}
                          merchant="amazon"
                        >
                          <a
                            href={option.link}
                            target="_blank"
                            rel="nofollow noopener noreferrer sponsored"
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
                          </a>
                        </CTAVisibilityTracker>
                      ))}
                    </div>
                  </>
                )}

                {/* Main CTA */}
                <CTAVisibilityTracker ctaId="hero-cta" position="above_fold" productSlug={reviewData.productSlug} merchant="amazon">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="block w-full text-center bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105"
                  >
                    {reviewData.hero.ctaText}
                  </a>
                </CTAVisibilityTracker>

                <p className="text-xs text-slate-700 text-center mt-4">
                  As an Amazon Associate, I earn from qualifying purchases.
                </p>
              </div>
            )}
          />

          {/* PRODUCT IMAGE 1 - CLICKABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="nofollow noopener noreferrer sponsored"
              className="block hover:opacity-90 transition-opacity"
            >
              <Image
                src={reviewData.images.main}
                alt="John Boos Platinum Commercial Cutting Board 24x18"
                width={1000}
                height={1500}
                quality={75}
                className="rounded-lg w-full h-auto max-w-2xl mx-auto"
                priority
              />
            </a>
            <p className="text-center text-sm text-slate-700 mt-3 italic">
              Click image to check price on Amazon
            </p>
          </div>

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
              productSlug={reviewData.productSlug}
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

          {/* PRODUCT IMAGE 2 - CLICKABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="nofollow noopener noreferrer sponsored"
              className="block hover:opacity-90 transition-opacity"
            >
              <Image
                src={reviewData.images.detail}
                alt="John Boos cutting board edge grain construction detail"
                width={1000}
                height={1500}
                quality={75}
                className="rounded-lg w-full h-auto max-w-2xl mx-auto"
              />
            </a>
            <p className="text-center text-sm text-slate-700 mt-3 italic">
              Click image to check price on Amazon
            </p>
          </div>

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

          {/* CTA - AFTER WHO SHOULD BUY (Decision Point) */}
          <AmazonCTA
            productSlug={reviewData.productSlug}
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Sound like the right fit for your kitchen?"
          />

          {/* SECTION: COMPARISON TABLE */}
          <ProductComparisonTable
            title={johnBoosComparisonData.title}
            subtitle={johnBoosComparisonData.subtitle}
            products={johnBoosComparisonData.products}
            comparisonRows={johnBoosComparisonData.comparisonRows}
            highlightedProduct={johnBoosComparisonData.highlightedProduct}
          />

          {/* POST-COMPARISON CTA */}
          <AmazonCTA
            productSlug={reviewData.productSlug}
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
                  productSlug={reviewData.productSlug}
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
