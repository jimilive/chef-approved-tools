import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { getOGImageURL } from '@/lib/og-image'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import AmazonCTA from '@/components/AmazonCTA'
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
import { reviewData } from './cuisinart-8-inch-nonstick-pan-data'

const PRODUCT_SLUG = 'cuisinart-8-inch-nonstick-pan'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('cuisinart-8-inch-nonstick-pan')
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

export default async function Cuisinart8InchNonstickPanReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product?.category || '')

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
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

  // Generate schemas with correct fields
  const productSchema = generateProductSchema({
    // REQUIRED
    name: productData.name,
    slug: productData.slug,
    // HIGHLY RECOMMENDED
    description: productData.expertOpinion,
    brand: productData.brand,
    rating: productData.expertRating,
    reviewCount: 1,
    // GOOD FOR SEO
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
            href="/cookware-and-bakeware"
            className="text-orange-700 hover:text-orange-800 text-sm flex items-center gap-1 mb-4"
          >
            ← Browse all Cookware & Bakeware
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
            heroImage={getProductHeroImage(PRODUCT_SLUG)}
            ctaUrl={affiliateUrl}
            ctaText={reviewData.hero.ctaText}
            customCTA={(
              <div>
                <CTAVisibilityTracker ctaId="hero-cta" position="above_fold">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    {reviewData.hero.ctaText}
                  </a>
                </CTAVisibilityTracker>
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                  >
                    → View {productData.name} on Amazon
                  </a>
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
            <CTAVisibilityTracker
              ctaId={`${productData.slug}-mid-content`}
              position="mid_article"
              productSlug={productData.slug}
              merchant="amazon"
            >
              <a
                href={affiliateUrl}
                target="_blank"
                rel="nofollow noopener noreferrer sponsored"
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

          {/* CTA #4 - AFTER WHO SHOULD BUY (Decision Point) */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Ready for a reliable nonstick pan?"
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

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
                    <p className="text-sm text-slate-700 m-0">Prime shipping, verified reviews, easy returns</p>
                  </div>
                  <CTAVisibilityTracker ctaId="where-to-buy-amazon" position="mid_article">
                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                      className="inline-block bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-3 rounded-lg text-base transition-all hover:scale-105 whitespace-nowrap w-full text-center"
                    >
                      Check Price on Amazon →
                    </a>
                  </CTAVisibilityTracker>
                  <p className="text-center mt-3 text-sm">
                    <a
                      href={affiliateUrl}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                    >
                      → View {productData.name} on Amazon
                    </a>
                  </p>
                  <p className="text-xs text-slate-700 italic text-center m-0">*As an Amazon Associate, I earn from qualifying purchases</p>
                </div>
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
              <div className="text-center">
                <CTAVisibilityTracker ctaId="bottom-line-cta" position="final_cta">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    {reviewData.bottomLine.ctaText}
                  </a>
                </CTAVisibilityTracker>
                <p className="text-center mt-3 text-sm">
                  <a
                    href={affiliateUrl}
                    className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                  >
                    → View {productData.name} on Amazon
                  </a>
                </p>
              </div>
            )}
          />

          <div className="text-center my-8">
            <Link
              href="/cookware-and-bakeware"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Cookware & Bakeware →
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
