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
import AuthorBio from '@/components/review/AuthorBio'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// Import review data
import { reviewData } from './henckels-sharpening-steel-data'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('henckels-sharpening-steel')
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

export default async function HenckelsSharpeningSteelReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }

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
            rel="noopener noreferrer sponsored"
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

  // Merge Supabase data with legacy data (Supabase takes priority, but preserve legacy pros/cons if Supabase is empty)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  // Get primary affiliate link (for legacy inline links)
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  // Get all affiliate links for multi-vendor CTAs
  const affiliateLinks = product ? getAllAffiliateLinks(product) : []

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
    model: productData.model,
    category: productData.category,
    dateAdded: productData.dateAdded,
    lastUpdated: productData.lastUpdated,
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
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-700 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
            {' / '}
            {reviewData.breadcrumb.productName}
          </div>

          <Link
            href="/cleaning-and-maintenance"
            className="text-orange-700 hover:text-orange-800 text-sm flex items-center gap-1 mb-4"
          >
            ← Browse all Cleaning & Maintenance
          </Link>

          {/* SECTION 1: HERO */}
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
            ctaUrl={affiliateUrl}
            ctaText={reviewData.hero.ctaText}
            customCTA={(
              <div>
                <MultiVendorCTA
                  affiliateLinks={affiliateLinks}
                  productName={productData.name}
                  ctaId="hero-cta"
                  position="above_fold"
                  productSlug={productData.slug}
                />
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
            <CTAVisibilityTracker
              ctaId={`${productData.slug}-mid-content`}
              position="mid_article"
              productSlug={productData.slug}
              merchant="amazon"
            >
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-orange-700 hover:text-orange-800 font-medium underline"
              >
                → See current Amazon price and reviews
              </a>
            </CTAVisibilityTracker>
          </div>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: processInlineLinks(section.content)
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

          {/* SECTION 6: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 7: WHERE TO BUY - Inline Section */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.whereToBuy.title}
            </h2>

            <p className="text-slate-700 leading-relaxed mb-6">
              {reviewData.whereToBuy.introText}
            </p>

            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
              <div className="flex flex-col gap-4">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Available From</h3>
                  <p className="text-sm text-slate-700">Choose your preferred retailer</p>
                </div>
                <MultiVendorCTA
                  affiliateLinks={affiliateLinks}
                  productName={productData.name}
                  ctaId="where-to-buy-cta"
                  position="where_to_buy"
                  productSlug={productData.slug}
                />
                <p className="text-xs text-slate-700 text-center italic mt-2">
                  As an Amazon Associate, I earn from qualifying purchases. This comes at no extra cost to you.
                </p>
              </div>
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
            paragraphs={reviewData.bottomLine.paragraphs.map(p => processInlineLinks(p))}
            ctaUrl={affiliateUrl}
            ctaText={reviewData.bottomLine.ctaText}
            customCTA={(
              <div className="flex justify-center">
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

          <div className="text-center my-8">
            <Link
              href="/cleaning-and-maintenance"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Cleaning & Maintenance →
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
