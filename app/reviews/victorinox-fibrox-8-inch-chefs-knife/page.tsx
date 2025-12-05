import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getReviewMetadata } from '@/data/metadata'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  ReviewHero,
  TestingResultsGrid,
  TestingStory,
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
import { reviewData } from './victorinox-fibrox-8-inch-chefs-knife-data'
import { getChefKnifeComparison } from './chef-knife-comparison-data'

const PRODUCT_SLUG = 'victorinox-fibrox-8-inch-chefs-knife'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// ISR configuration for better performance
// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('victorinox-fibrox-8-inch-chefs-knife')
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
          url: centralMeta.imageUrl || generateOGImageURL({
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
      images: [centralMeta.imageUrl || generateOGImageURL({
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

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const chefKnifeComparisonData = await getChefKnifeComparison()

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

  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: "Knives", url: "https://www.chefapprovedtools.com/knives" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  // Generate schemas
  const productSchema = generateProductSchema({
    name: productData.name,
    slug: productData.slug,
    description: productData.expertOpinion,
    brand: productData.brand,
    rating: productData.expertRating,
    reviewCount: 1,
    url: `https://www.chefapprovedtools.com/reviews/${productData.slug}`,
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
        <div className="max-w-5xl mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
            {' / '}
            <Link href="/knives" className="hover:text-orange-700">Knives</Link>
            {' / '}
            {reviewData.breadcrumb.productName}
          </div>

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
            heroImage={(product.images as any)?.hero}
            productName={product.name}
            customCTA={(
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

          {/* MID-CONTENT CTA */}
          <div className="text-center my-8">
            <AmazonCTA
              productSlug={productData.slug}
              affiliateUrl={affiliateUrl}
              position="mid_article"
            />
          </div>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          {/* V2: Add inline product name links */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.performanceAnalysis.title}
            </h2>

            {reviewData.performanceAnalysis.sections.map((section, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-[1.4]">
                  {section.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {/* V2: Add inline product links in strategic sections */}
                  {index === 0 ? (
                    <>
                      The lightweight fibrox handle and thin, flexible blade create exceptional balance. Unlike heavy German knives, the{' '}
                      <a
                        href={affiliateUrl}
                        className="text-orange-700 hover:text-orange-800 font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        Victorinox
                      </a>
                      {' '}delivers nimble control for detailed work. No hand fatigue during extended prep sessions—critical for professional use where you&apos;re prepping 200+ covers daily.
                    </>
                  ) : index === 3 ? (
                    <>
                      After 45 years of cooking and countless knives tested, the{' '}
                      <a
                        href={affiliateUrl}
                        className="text-orange-700 hover:text-orange-800 font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        Victorinox 8-inch chef&apos;s knife
                      </a>
                      {' '}remains my primary blade. From managing kitchen operations at Mellow Mushroom to working the line at fine dining restaurants, I&apos;ve used this knife to prep 200+ covers worth of mise en place daily, slice 5 lbs of mushrooms in under 10 minutes, dice pounds of onions and vegetables per shift, and portion proteins during service. The knife has never let me down. No chipping, no handle issues, no rust. Just consistent performance day after day.
                    </>
                  ) : index === 4 ? (
                    <>
                      Here&apos;s the truth about expensive knives: Beyond basic quality standards, you&apos;re paying for aesthetics, brand prestige, and premium materials that don&apos;t improve cutting performance. The{' '}
                      <a
                        href={affiliateUrl}
                        className="text-orange-700 hover:text-orange-800 font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        Victorinox
                      </a>
                      {' '}delivers what matters—sharpness, balance, durability—at a fraction of premium pricing. In 24 years in professional kitchens, I&apos;ve seen expensive premium knives and Victorinox knives side-by-side. The expensive knives look prettier on the magnetic strip. The Victorinox knives get used daily because they work better for actual cooking.
                    </>
                  ) : (
                    section.content
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* SECTION 4: COMPARISON TABLE */}
          <section className="my-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              How Does the Victorinox Compare?
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              After 24 years in professional kitchens, I&apos;ve tested dozens of chef&apos;s knives.
              Here&apos;s how the Victorinox Fibrox Pro stacks up against the top competitors.
            </p>
            <ProductComparisonTable
              title={chefKnifeComparisonData.title}
              subtitle={chefKnifeComparisonData.subtitle}
              products={chefKnifeComparisonData.products}
              comparisonRows={chefKnifeComparisonData.comparisonRows}
              highlightedProduct={chefKnifeComparisonData.highlightedProduct}
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

          {/* SECTION 8: WHERE TO BUY */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.whereToBuy.title}
            </h2>

            <p className="text-slate-700 leading-relaxed mb-6">
              {reviewData.whereToBuy.introText}
            </p>

            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50 mb-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">
                  Amazon - Prime Shipping Available
                </h3>
                <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
              </div>

              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-where-to-buy`}
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
            </div>

            <p className="text-sm text-slate-700 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 9: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 10: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
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

          {/* SECTION 11: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 12: AUTHOR BIO */}
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
