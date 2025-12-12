import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { getOGImageURL, getStaticHeroImageURL } from '@/lib/og-image'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { getReviewMetadata } from '@/data/metadata'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
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
import AuthorBio from '@/components/review/AuthorBio'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// Import review data
import { reviewData } from './wusthof-classic-ikon-16-piece-data'
import { getKnifeSetComparison } from './knife-set-comparison-data'

const PRODUCT_SLUG = 'wusthof-classic-ikon-16-piece'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// ISR configuration for better performance
// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('wusthof-classic-ikon-16-piece')
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
          url: centralMeta.imageUrl || getOGImageURL({
            productSlug: PRODUCT_SLUG,
            title: productData.name,
            rating: productData.expertRating ?? reviewData.hero.rating,
            testingPeriod: centralMeta.testingPeriod,
            tier: centralMeta.tier,
          }),
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
      images: [centralMeta.imageUrl || getOGImageURL({
        productSlug: PRODUCT_SLUG,
        title: productData.name,
        rating: productData.expertRating ?? reviewData.hero.rating,
        testingPeriod: centralMeta.testingPeriod,
        tier: centralMeta.tier,
      })],
    },
  }
}

export default async function ProductReview() {
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
  const knifeSetComparisonData = await getKnifeSetComparison()

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

  // Generate breadcrumbs with category
  const breadcrumbs = categoryBreadcrumb
    ? [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: categoryBreadcrumb.label, url: `https://www.chefapprovedtools.com${categoryBreadcrumb.href}` },
        { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${PRODUCT_SLUG}` }
      ]
    : [
        { name: 'Home', url: 'https://www.chefapprovedtools.com' },
        { name: 'Reviews', url: 'https://www.chefapprovedtools.com/reviews' },
        { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${PRODUCT_SLUG}` }
      ]

  // Generate schemas
  const productSchema = generateProductSchema({
    name: productData.name,
    slug: productData.slug,
    description: productData.expertOpinion,
    brand: productData.brand,
    rating: productData.expertRating,
    reviewCount: 1,
    category: productData.category,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const faqSchema = generateFAQSchema(reviewData.faqData)

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-700 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            {categoryBreadcrumb ? (
              <>
                <Link href={categoryBreadcrumb.href} className="hover:text-orange-700">{categoryBreadcrumb.label}</Link>
                {' / '}
              </>
            ) : (
              <>
                <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
                {' / '}
              </>
            )}
            {productData.name}
          </div>

          <Link
            href="/knives-and-cutting-tools"
            className="text-orange-700 hover:text-orange-800 text-sm flex items-center gap-1 mb-4"
          >
            ← Browse all Knives & Cutting Tools
          </Link>

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
            heroImage={getStaticHeroImageURL(PRODUCT_SLUG) || (product.images as any)?.hero}
            productName={product.name}
            customCTA={
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-hero-cta`}
                  position="above_fold"
                  productSlug={reviewData.productSlug}
                  merchant="amazon"
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.hero.ctaText}
                  </a>
                </CTAVisibilityTracker>
                {/* V2: TEXT LINK UNDER BUTTON */}
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
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
            sections={reviewData.testingResults.sections}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* MID-CONTENT CTA */}
          <div className="text-center my-8">
            <AmazonCTA
              productSlug={productData.slug}
              affiliateUrl={affiliateUrl}
              position="mid_article"
            />
          </div>

          {/* SECTION 2.5: WHAT'S INCLUDED */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-8 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              What&apos;s Included in the Set
            </h2>

            <p className="text-slate-700 leading-relaxed mb-6">
              The Wüsthof Classic Ikon 16-Piece set includes everything you need for a complete kitchen knife collection.
              All knife blades are forged in Solingen, Germany, and each piece features the signature contoured POM handles
              with the half-bolster design that allows full-length sharpening.
            </p>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">1.</span>
                <span className="text-slate-700">3&quot; Straight Paring Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">2.</span>
                <span className="text-slate-700">3.5&quot; Paring Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">3.</span>
                <span className="text-slate-700">4.5&quot; Utility Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">4.</span>
                <span className="text-slate-700">5&quot; Serrated Utility Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">5.</span>
                <span className="text-slate-700">6&quot; Utility Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">6.</span>
                <span className="text-slate-700">7&quot; Hollow Edge Santoku Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">7.</span>
                <span className="text-slate-700">8&quot; Bread Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">8.</span>
                <span className="text-slate-700">8&quot; Chef&apos;s Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">9.</span>
                <span className="text-slate-700">9&quot; Hollow Edge Carving Knife</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">10-13.</span>
                <span className="text-slate-700">Four 4.5&quot; Steak Knives (fully forged)</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">14.</span>
                <span className="text-slate-700">9&quot; Honing Steel (brushed stainless handle)</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">15.</span>
                <span className="text-slate-700">Kitchen Shears (come-apart, stainless steel)</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-700 font-bold mr-3 flex-shrink-0">16.</span>
                <span className="text-slate-700">15-Slot Walnut Knife Block</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong className="text-slate-900">Note:</strong> All knife blades are made in Solingen, Germany.
                The honing steel, kitchen shears, and knife block are manufactured in China to Wüsthof&apos;s specifications.
              </p>
            </div>
          </section>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map((section, idx) => {
              // Add inline product links to 2-3 sections
              if (idx === 0 || idx === 1) {
                const content = typeof section.content === 'string' ? section.content : '';
                const parts = content.split('this WÜSTHOF set');
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
                          rel="noopener noreferrer sponsored"
                        >
                          this WÜSTHOF set
                        </a>
                        {parts.slice(1).join('this WÜSTHOF set')}
                      </>
                    )
                  };
                }
              }
              return section;
            })}
          />

          {/* SECTION 3.5: COMPARISON TABLE */}
          <section className="my-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              How Does the Wüsthof Classic Ikon Compare?
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              After 24 years in professional kitchens, I&apos;ve tested dozens of knife sets.
              Here&apos;s how the Wüsthof Classic Ikon 16-Piece stacks up against the top competitors.
            </p>
            <ProductComparisonTable
              title={knifeSetComparisonData.title}
              subtitle={knifeSetComparisonData.subtitle}
              products={knifeSetComparisonData.products}
              comparisonRows={knifeSetComparisonData.comparisonRows}
              highlightedProduct={knifeSetComparisonData.highlightedProduct}
            />

            {/* POST-COMPARISON CTA */}
            <AmazonCTA
              productSlug={productData.slug}
              affiliateUrl={affiliateUrl}
              position="comparison_table"
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
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Sound like the right fit for your kitchen?"
          />

          {/* SECTION 6: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 7: WHERE TO BUY */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.whereToBuy.title}
            </h2>

            <p className="text-slate-700 leading-relaxed mb-6">
              {reviewData.whereToBuy.introText}
            </p>

            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
                <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
              </div>

              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-where-to-buy-cta`}
                position="mid_article"
                productSlug={reviewData.productSlug}
                merchant="amazon"
              >
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                >
                  Check Price on Amazon →
                </a>
              </CTAVisibilityTracker>

              {/* V2: TEXT LINK UNDER BUTTON */}
              <p className="text-center mt-3 text-sm">
                <a
                  href={affiliateUrl}
                  className="text-orange-700 hover:text-orange-800 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  → View {productData.name} on Amazon
                </a>
              </p>

              <p className="text-xs text-slate-700 text-center mt-3">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
            </div>

            <p className="text-sm text-slate-700 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 8: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 9: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            customCTA={
              <div className="text-center">
                <AmazonCTA
                  productSlug={reviewData.productSlug}
                  affiliateUrl={affiliateUrl}
                  position="final_cta"
                />
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

          {/* SECTION 10: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 11: AUTHOR BIO */}
          <AuthorBio />

        </div>
      </div>

      {/* Product view tracking - at bottom to avoid blocking first paint */}
      <ProductViewTrackerWrapper
        slug={PRODUCT_SLUG}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={productData.expertRating ?? reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />

      {/* STICKY MOBILE CTA */}
      <StickyMobileCTAWrapper
        productName={productData.name}
        affiliateUrl={affiliateUrl}
        merchant="amazon"
        productSlug={productData.slug}
      />
    </>
  )
}
