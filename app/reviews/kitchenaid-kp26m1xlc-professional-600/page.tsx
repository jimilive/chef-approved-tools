import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink, getAllAffiliateLinks } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import { getReviewMetadata } from '@/data/metadata'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import MultiVendorCTA from '@/components/review/MultiVendorCTA'
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
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import AuthorBio from '@/components/review/AuthorBio'
import TestimonialsSection from '@/components/TestimonialsSection'

// Import review data
import { reviewData } from './kitchenaid-kp26m1xlc-professional-600-data'
import { kitchenaidPro600ComparisonData } from './stand-mixer-comparison-data'

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

// Helper function to process inline product links
function processInlineLinks(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/g)

  return parts.map((part, index) => {
    if (part.startsWith('<LINK>') && part.endsWith('</LINK>')) {
      const linkText = part.slice(6, -7)
      return (
        <a
          key={index}
          href="#primary-cta"
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
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }
  const productData = product

  // ===== STRATEGIC AFFILIATE LINK SELECTION =====
  // Priority: Supabase primary link > Strategic primary > Fallback
  const primaryLink = product ? getPrimaryAffiliateLink(product) : reviewData.strategicLinks.primary.url
  const bowlLiftLink = reviewData.strategicLinks.secondary.url
  const compareAllLink = reviewData.strategicLinks.tertiary.url
  const trustLink = reviewData.strategicLinks.trust.url

  // Get all affiliate links for multi-vendor CTAs
  const affiliateLinks = product ? getAllAffiliateLinks(product) : []

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: "Appliances", url: "https://www.chefapprovedtools.com/appliances" },
    { name: reviewData.breadcrumb.productName, url: `https://www.chefapprovedtools.com/reviews/${reviewData.productSlug}` }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={reviewData.productSlug}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center">
                {index > 0 && <span className="mr-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-gray-600 hover:text-orange-800 transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SECTION 1: HERO */}
        <div className="mb-8">
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

                <p className="text-xs text-slate-600 text-center mt-4">
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
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '')}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />
        </div>

        {/* SECTION 3: PERFORMANCE ANALYSIS */}
        <PerformanceAnalysis
          title={reviewData.performanceAnalysis.title}
          sections={reviewData.performanceAnalysis.sections.map(section => ({
            ...section,
            content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '')}</>
          }))}
        />

        {/* SECTION 3.5: COMPARISON TABLE */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            How Does the Professional 600 Compare?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            After 18 years using this mixer professionally at Purple Café, Mellow Mushroom, and Il Pizzaiolo,
            I&apos;ve tested every major stand mixer in high-volume settings. Here&apos;s how the Professional 600
            stacks up against the modern replacements and alternatives.
          </p>
          <ProductComparisonTable
            products={kitchenaidPro600ComparisonData.products}
            comparisonRows={kitchenaidPro600ComparisonData.comparisonRows}
            highlightedProduct={kitchenaidPro600ComparisonData.highlightedProduct}
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

        {/* SECTION 6: EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* SECTION 7: FAQ */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

        {/* SECTION 8: WHERE TO BUY - STRATEGIC MULTI-LINK SECTION */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            {reviewData.whereToBuy.title}
          </h2>

          <p className="text-slate-600 leading-relaxed mb-6">
            {reviewData.whereToBuy.introText}
          </p>

          <div className="border border-gray-200 rounded-xl p-6 bg-orange-50 mb-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Available From</h3>
              <p className="text-sm text-slate-900 mb-4">Choose your preferred retailer</p>
            </div>

            <MultiVendorCTA
              affiliateLinks={affiliateLinks}
              productName={productData.name}
              ctaId="where-to-buy-cta"
              position="mid_article"
              productSlug={productData.slug}
            />

            <p className="text-xs text-slate-700 text-center mt-4">
              As a KitchenAid affiliate, I earn from qualifying purchases.
            </p>
          </div>

          <p className="text-sm text-slate-600 mt-6 italic">
            {reviewData.whereToBuy.disclaimer}
          </p>
        </div>

        {/* SECTION 9: BOTTOM LINE */}
        <BottomLineSection
          title={reviewData.bottomLine.title}
          paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed">
              {processInlineLinks(paragraph)}
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

        {/* SECTION 10: RELATED PRODUCTS */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* SECTION 11: AUTHOR BIO */}
        <AuthorBio />

        {/* SECTION 12: TESTIMONIALS */}
        <TestimonialsSection />

        {/* Structured Data */}
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
      </article>
    </div>
  )
}
