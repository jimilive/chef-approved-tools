import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { getOGImageURL, getStaticHeroImageURL } from '@/lib/og-image'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import AmazonCTA from '@/components/AmazonCTA'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
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
import { reviewData } from './method-all-purpose-cleaner-data'
import { getCleanerComparison } from './cleaner-comparison-data'

const PRODUCT_SLUG = 'method-all-purpose-cleaner'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('method-all-purpose-cleaner')
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

export default async function MethodAllPurposeCleanerReviewPage() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const comparisonData = await getCleanerComparison()

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product.category)

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

  // Generate breadcrumbs with category
  const breadcrumbs = categoryBreadcrumb
    ? [
        { name: "Home", url: "https://www.chefapprovedtools.com" },
        { name: categoryBreadcrumb.label, url: `https://www.chefapprovedtools.com${categoryBreadcrumb.href}` },
        { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
      ]
    : [
        { name: "Home", url: "https://www.chefapprovedtools.com" },
        { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
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
                {/* Quick Stats */}
                <div className="bg-gray-50 p-5 mb-5 border-l-4 border-green-600 rounded">
                  <p className="m-0 text-base leading-relaxed">
                    <strong>{reviewData.quickStats.rating}</strong><br/>
                    {reviewData.quickStats.context}
                  </p>
                  <ul className="my-3 pl-5 text-sm">
                    {reviewData.quickStats.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <AmazonCTA
                  productSlug={PRODUCT_SLUG}
                  affiliateUrl={affiliateUrl}
                  position="above_fold"
                />
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

          {/* MID-CONTENT CTA */}
          <div className="text-center my-8">
            <AmazonCTA
              productSlug={PRODUCT_SLUG}
              affiliateUrl={affiliateUrl}
              position="mid_article"
            />
          </div>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
          />

          {/* CUSTOM SECTION: ECO-FRIENDLY FEATURES */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.ecoFriendly.title}
            </h2>

            <p className="text-slate-700 mb-6">
              {reviewData.ecoFriendly.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewData.ecoFriendly.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl">🌱</div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-base">{feature.title}</h3>
                    <p className="text-sm text-slate-700 m-0">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-slate-700 mt-6">
              For anyone conscious about both performance and environmental impact, this is a rare combination
              of effective cleaning and safety. You get the power of professional-grade cleaning without worrying
              about lingering chemical residues or fumes.
            </p>
          </div>

          {/* CUSTOM SECTION: COMPARISON NARRATIVE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.comparison.title}
            </h2>

            {reviewData.comparison.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* COMPARISON TABLE */}
          <section className="my-12">
            <ProductComparisonTable
              title={comparisonData.title}
              subtitle={comparisonData.subtitle}
              products={comparisonData.products}
              comparisonRows={comparisonData.comparisonRows}
              highlightedProduct={comparisonData.highlightedProduct}
            />

            {/* POST-COMPARISON CTA */}
            <AmazonCTA
              productSlug={PRODUCT_SLUG}
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

          {/* CTA - AFTER WHO SHOULD BUY */}
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

          {/* SECTION 7: EMAIL CAPTURE */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl px-6 pt-10 pb-10 md:px-12 shadow-sm mb-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 leading-[1.3]">
              {reviewData.emailCapture.title}
            </h2>
            <p className="text-lg text-white mb-6">
              {reviewData.emailCapture.subtitle}
            </p>
            <ul className="text-left max-w-[500px] mx-auto mb-6 text-base leading-loose">
              {reviewData.emailCapture.benefits.map((benefit, i) => (
                <li key={i} className="mb-1">✓ {benefit}</li>
              ))}
            </ul>
            <a
              href="/newsletter"
              className="inline-block bg-white text-purple-700 py-4 px-10 no-underline rounded-md font-bold text-lg mt-2 hover:bg-gray-100 transition-colors"
            >
              {reviewData.emailCapture.buttonText} →
            </a>
          </div>

          {/* SECTION 8: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed">
                {processInlineLinks(paragraph, affiliateUrl, productData.name)}
              </p>
            ))}
            customCTA={
              <div className="text-center">
                <AmazonCTA
                  productSlug={PRODUCT_SLUG}
                  affiliateUrl={affiliateUrl}
                  position="final_cta"
                />
              </div>
            }
          />

          <div className="text-center my-8">
            <Link
              href="/cleaning-and-maintenance"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Cleaning & Maintenance →
            </Link>
          </div>

          {/* SECTION 9: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 10: AUTHOR BIO */}
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
