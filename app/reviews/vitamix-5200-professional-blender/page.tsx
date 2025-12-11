import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink, getAllAffiliateLinks } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { getOGImageURL, getStaticHeroImageURL } from '@/lib/og-image'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { getReviewMetadata } from '@/data/metadata'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import MultiVendorCTA from '@/components/review/MultiVendorCTA'
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
import ReviewLayout from '@/components/review/ReviewLayout'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// Import review data
import { reviewData } from './vitamix-5200-professional-blender-data'
import { getBlenderComparison } from './get-blender-comparison'

const PRODUCT_SLUG = 'vitamix-5200-professional-blender'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('vitamix-5200-professional-blender')
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
          rel="noopener noreferrer sponsored"
        >
          {linkText}
        </a>
      )
    }
    return part
  })
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
  const blenderComparisonData = await getBlenderComparison()

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

  // ===== AFFILIATE LINK FROM DATABASE =====
  const primaryLink = product ? getPrimaryAffiliateLink(product) : '#'
  const salePageLink = reviewData.strategicLinks.secondary.url

  // Get all affiliate links for multi-vendor CTAs
  const affiliateLinks = product ? getAllAffiliateLinks(product) : []
  const shopAllLink = reviewData.strategicLinks.tertiary.url
  const vitamixDirectLink = reviewData.strategicLinks.vitamixDirect.url

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

      {/* ========================================
          NEW: ReviewLayout wraps everything
          ======================================== */}
      <ReviewLayout
        breadcrumbCategory="Appliances"
        breadcrumbTitle={reviewData.breadcrumb.productName}
      >

        <Link
          href="/appliances"
          className="text-orange-700 hover:text-orange-800 text-sm flex items-center gap-1 mb-4"
        >
          ← Browse all Small Appliances
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
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-sm mb-6">
                {reviewData.quickStats.specifications.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>{spec.icon}</span>
                    <span className="text-slate-700"><strong>{spec.label}:</strong> {spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Multi-Vendor CTA Buttons */}
              <MultiVendorCTA
                affiliateLinks={affiliateLinks}
                productName={productData.name}
                ctaId="hero-cta"
                position="above_fold"
                productSlug={productData.slug}
              />

              <p className="text-xs text-slate-700 text-center mt-4">
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
            content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', primaryLink, productData.name)}</>
          }))}
          testingEnvironment={reviewData.testingResults.testingEnvironment}
          outstandingPerformance={reviewData.testingResults.outstandingPerformance}
          minorConsiderations={reviewData.testingResults.minorConsiderations}
        />

        {/* MID-CONTENT CTA */}
        <div className="text-center my-8">
          <AmazonCTA
            productSlug={productData.slug}
            affiliateUrl={primaryLink}
            position="mid_article"
          />
        </div>

        {/* SECTION 3: PERFORMANCE ANALYSIS */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections.map(section => ({
            ...section,
            content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', primaryLink, productData.name)}</>
          }))}
        />

        {/* SECTION 4: BLENDER COMPARISON TABLE */}
        <ProductComparisonTable
          title={blenderComparisonData.title}
          subtitle={blenderComparisonData.subtitle}
          products={blenderComparisonData.products}
          comparisonRows={blenderComparisonData.comparisonRows}
          highlightedProduct={blenderComparisonData.highlightedProduct}
        />

        {/* POST-COMPARISON CTA */}
        <AmazonCTA
          productSlug={productData.slug}
          affiliateUrl={primaryLink}
          position="comparison_table"
        />

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
          affiliateUrl={primaryLink}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Available From</h3>
              <p className="text-sm text-slate-900">Choose your preferred retailer</p>
            </div>

            <MultiVendorCTA
              affiliateLinks={affiliateLinks}
              productName={productData.name}
              ctaId="where-to-buy-cta"
              position="mid_article"
              productSlug={productData.slug}
            />

            <p className="text-xs text-slate-700 text-center mt-4">
              As a Vitamix affiliate, I earn from qualifying purchases.
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
          paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed">
              {processInlineLinks(paragraph, primaryLink, productData.name)}
            </p>
          ))}
          customCTA={
            <div className="bg-white rounded-xl p-6 flex justify-center">
              <MultiVendorCTA
                affiliateLinks={affiliateLinks}
                productName={productData.name}
                ctaId="bottom-line-cta"
                position="final_cta"
                productSlug={productData.slug}
              />
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

        {/* SECTION 11: RELATED PRODUCTS */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* SECTION 12: AUTHOR BIO */}
        <AuthorBio />

      </ReviewLayout>
      {/* ========================================
          END: ReviewLayout
          ======================================== */}

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
        affiliateUrl={primaryLink}
        merchant="other"
        productSlug={productData.slug}
      />
    </>
  )
}
