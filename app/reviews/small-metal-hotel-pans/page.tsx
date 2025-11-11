import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import AffiliateButton from '@/components/AffiliateButton'
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

// Import review data
import { reviewData } from './small-metal-hotel-pans-data'

// ISR configuration for better performance
export const revalidate = 3600 // 1 hour cache
export const fetchCache = 'force-cache'

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug(reviewData.productSlug)
  const productData = product || reviewData.legacyProductData

  return {
    title: reviewData.metadata.title,
    description: reviewData.metadata.description,
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/small-metal-hotel-pans',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: `https://www.chefapprovedtools.com/reviews/${reviewData.productSlug}`,
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

export default async function ProductReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

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

  // Get primary affiliate link - use product if available, otherwise fall back to recommended size option
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : reviewData.sizeOptions.options.find(o => o.recommended)?.affiliateUrl || reviewData.sizeOptions.options[0].affiliateUrl

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: reviewData.breadcrumb.productName, url: `https://www.chefapprovedtools.com/reviews/${reviewData.productSlug}` }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={reviewData.productSlug}
        name={reviewData.breadcrumb.productName}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 py-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/reviews" className="text-gray-600 hover:text-orange-600 transition-colors">
              Reviews
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{reviewData.breadcrumb.productName}</li>
        </ol>
      </nav>

      {/* Hero Section with Custom Size Selector */}
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
            <h3 className="text-xl font-bold mb-4 text-gray-900 mt-0">{reviewData.sizeOptions.title}</h3>
            <p className="text-gray-700 mb-6">{reviewData.sizeOptions.subtitle}</p>

            {/* Size Options */}
            <div className="space-y-4">
              {reviewData.sizeOptions.options.map((option) => (
                <div
                  key={option.id}
                  className={`border-2 rounded-xl p-5 ${
                    option.recommended
                      ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-red-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {option.recommended && (
                    <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      ⭐ RECOMMENDED
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {option.size} — {option.depth}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{option.dimensions}</p>
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Capacity:</strong> {option.capacity}
                      </p>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Best For:</strong> {option.bestFor}
                      </p>
                      <p className="text-xs text-gray-600">{option.includes}</p>
                    </div>

                    <div className="sm:w-48 flex-shrink-0">
                      <CTAVisibilityTracker
                        ctaId={`review-${reviewData.productSlug}-size-${option.id}`}
                        position="above_fold"
                        productSlug={reviewData.productSlug}
                        merchant="amazon"
                      >
                        <AffiliateButton
                          href={option.affiliateUrl}
                          merchant="amazon"
                          product={`${reviewData.productSlug}-${option.id}`}
                          position="above_fold"
                          variant={option.recommended ? 'primary' : 'secondary'}
                        >
                          Check Price →
                        </AffiliateButton>
                      </CTAVisibilityTracker>
                      <div className="text-center mt-2">
                        <a
                          href={option.affiliateUrl}
                          className="text-xs text-gray-600 hover:text-orange-600 underline transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Check Price on Amazon
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lid Options */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-base mb-3 text-gray-900">Lids (Sold Separately)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose solid lids for covering or slotted lids to keep serving utensils in pan during buffet service
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {reviewData.sizeOptions.lidOptions.map((lid) => (
                  <div
                    key={lid.id}
                    className="border border-gray-300 rounded-lg p-4 bg-white"
                  >
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{lid.size}</h4>
                    <p className="text-xs text-gray-600 mb-3">{lid.description}</p>
                    <p className="text-xs text-gray-500 mb-3">{lid.includes}</p>

                    <CTAVisibilityTracker
                      ctaId={`review-${reviewData.productSlug}-lid-${lid.id}`}
                      position="above_fold"
                      productSlug={reviewData.productSlug}
                      merchant="amazon"
                    >
                      <AffiliateButton
                        href={lid.affiliateUrl}
                        merchant="amazon"
                        product={`${reviewData.productSlug}-${lid.id}`}
                        position="above_fold"
                        variant="secondary"
                      >
                        Check Price →
                      </AffiliateButton>
                    </CTAVisibilityTracker>
                    <div className="text-center mt-2">
                      <a
                        href={lid.affiliateUrl}
                        className="text-xs text-gray-600 hover:text-orange-600 underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Check Price on Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Testing Results */}
        <TestingResultsGrid
          title={reviewData.testingResults.title}
          sections={reviewData.testingResults.sections}
          testingEnvironment={reviewData.testingResults.testingEnvironment}
          outstandingPerformance={reviewData.testingResults.outstandingPerformance}
          minorConsiderations={reviewData.testingResults.minorConsiderations}
        />

        {/* Performance Analysis */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections}
        />

        {/* Pros & Cons */}
        <ProsConsGrid
          title={reviewData.prosConsTitle}
          prosTitle={reviewData.prosTitle}
          consTitle={reviewData.consTitle}
          pros={reviewData.legacyProductData.pros}
          cons={reviewData.legacyProductData.cons}
        />

        {/* Who Should Buy */}
        <WhoShouldBuyGrid
          title={reviewData.whoShouldBuy.title}
          perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
          considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
          perfectFor={reviewData.whoShouldBuy.perfectFor}
          considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
        />

        {/* FAQ */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

        {/* Email Capture */}
        <EmailCaptureSection />

        {/* Bottom Line */}
        <BottomLineSection
          title={reviewData.bottomLine.title}
          paragraphs={reviewData.bottomLine.paragraphs}
          customCTA={
            <div className="bg-white rounded-xl p-6">
              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-bottom-line-cta`}
                position="final_cta"
                productSlug={reviewData.productSlug}
                merchant="amazon"
              >
                <AffiliateButton
                  href={reviewData.sizeOptions.options.find(o => o.recommended)?.affiliateUrl || reviewData.sizeOptions.options[0].affiliateUrl}
                  merchant="amazon"
                  product={reviewData.productSlug}
                  position="final_cta"
                  variant="primary"
                >
                  {reviewData.bottomLine.ctaText}
                </AffiliateButton>
              </CTAVisibilityTracker>

              <p className="text-center mt-3 text-sm">
                <a
                  href={reviewData.sizeOptions.options.find(o => o.recommended)?.affiliateUrl || reviewData.sizeOptions.options[0].affiliateUrl}
                  className="text-orange-700 hover:text-orange-800 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  → View {reviewData.breadcrumb.productName} on Amazon
                </a>
              </p>

              <p className="text-xs text-slate-700 text-center mt-3">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
            </div>
          }
        />

        {/* Related Products */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* AUTHOR BIO */}
        <AuthorBio />

      </article>

      {/* Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(productData))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(reviewData.faqData))
        }}
      />

    </div>
  )
}
