import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
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
import AuthorBio from '@/components/review/AuthorBio'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'

// Import review data
import { reviewData } from './le-creuset-signature-7-25-qt-dutch-oven-data'
import { dutchOvenComparisonData } from './dutch-oven-comparison-data'

// Use ISR for better performance - revalidate every hour for price changes
export const revalidate = 3600 // 1 hour in seconds

// Enable fetch caching for Supabase requests
export const fetchCache = 'force-cache'

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug(reviewData.productSlug)
  const productData = product || reviewData.legacyProductData

  return {
    title: reviewData.metadata.title,
    description: reviewData.metadata.description,
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/le-creuset-signature-7-25-qt-dutch-oven',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: 'https://www.chefapprovedtools.com/reviews/le-creuset-signature-7-25-qt-dutch-oven',
      siteName: 'Chef Approved Tools',
      images: [
        {
          url: generateOGImageURL({
            title: productData.name,
            rating: productData.expertRating ?? reviewData.hero.rating,
            testingPeriod: reviewData.metadata.testingPeriod,
            tier: reviewData.metadata.tier as 1 | 2 | 3,
          }),
          width: 1200,
          height: 630,
          alt: `${productData.name} - Professional Review`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      images: [generateOGImageURL({
        title: productData.name,
        rating: productData.expertRating ?? reviewData.hero.rating,
        testingPeriod: reviewData.metadata.testingPeriod,
        tier: reviewData.metadata.tier as 1 | 2 | 3,
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

export default async function LeCreusetDutchOvenReviewPage() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

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

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: "Cookware", url: "https://www.chefapprovedtools.com/cookware" },
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

      {/* Product view tracking */}
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={productData.expertRating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
            {' / '}
            {reviewData.breadcrumb.productName}
          </div>

          {/* SECTION 1: HERO - Includes LCP-optimized verdict */}
          <ReviewHero
            title={reviewData.hero.title}
            authorName={reviewData.hero.authorName}
            authorCredentials={reviewData.hero.authorCredentials}
            rating={reviewData.hero.rating}
            tierBadge={reviewData.hero.tierBadge}
            verdict={reviewData.hero.verdict}
            verdictStrong={reviewData.hero.verdictStrong}
            publishedDate="November 10, 2025"
            lastUpdated="November 10, 2025"
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
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.hero.ctaText}
                  </a>
                </CTAVisibilityTracker>

                {/* Text link under button */}
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
            sections={reviewData.testingResults.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
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

          {/* SECTION 5.5: COMPARISON TABLE */}
          <ProductComparisonTable
            title={dutchOvenComparisonData.title}
            subtitle={dutchOvenComparisonData.subtitle}
            products={dutchOvenComparisonData.products}
            comparisonRows={dutchOvenComparisonData.comparisonRows}
            highlightedProduct={dutchOvenComparisonData.highlightedProduct}
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

            <p className="text-slate-600 leading-relaxed mb-6">
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
                  className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                >
                  Check Price on Amazon →
                </a>
              </CTAVisibilityTracker>

              {/* Text link under button */}
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

            <p className="text-sm text-slate-600 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

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
              <div className="bg-white rounded-xl p-6">
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-bottom-line-cta`}
                  position="final_cta"
                  productSlug={reviewData.productSlug}
                  merchant="amazon"
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                  >
                    {reviewData.bottomLine.ctaText}
                  </a>
                </CTAVisibilityTracker>

                {/* Text link under button */}
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
            }
          />

          {/* SECTION 10: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 11: AUTHOR BIO */}
          <AuthorBio />

        </div>
      </div>
    </>
  )
}
