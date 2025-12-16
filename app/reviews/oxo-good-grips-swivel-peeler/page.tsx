import { Metadata } from 'next'
import Link from 'next/link'
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
import FTCDisclosure from '@/components/FTCDisclosure'
import AmazonCTA from '@/components/AmazonCTA'
import {
  ReviewHero,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'
import AuthorBio from '@/components/review/AuthorBio'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'
import { reviewData } from './oxo-good-grips-swivel-peeler-data'

const PRODUCT_SLUG = 'oxo-good-grips-swivel-peeler'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('oxo-good-grips-swivel-peeler')
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
      type: 'article',
      images: [getProductOgImage(PRODUCT_SLUG)],
    },
    twitter: {
      card: 'summary_large_image',
      title: centralMeta.ogTitle || centralMeta.title,
      description: centralMeta.ogDescription || centralMeta.description,
      images: [getProductOgImage(PRODUCT_SLUG)],
    },
  }
}

export default async function OXOGoodGripsSwivelPeelerReview() {
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

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    affiliateLinks: product.affiliateLinks.length > 0 ? product.affiliateLinks : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

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

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(productData)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(reviewData.faqData)) }}
      />

      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={reviewData.metadata.tier}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
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
            href="/prep-tools"
            className="text-orange-700 hover:text-orange-800 text-sm flex items-center gap-1 mb-4"
          >
            ← Browse all Prep Tools
          </Link>

          {/* SECTION 1: HERO */}
          <ReviewHero
            title={reviewData.hero.title}
            authorName="Scott Bradley"
            authorCredentials="45 Years Cooking Experience"
            rating={productData.expertRating ?? reviewData.hero.rating}
            tierBadge={tierBadge}
            verdict={reviewData.quickVerdict.text}
            verdictStrong="just works"
            publishedDate={gitDates.firstPublished}
            lastUpdated={gitDates.lastUpdated}
            heroImage={getProductHeroImage(PRODUCT_SLUG)}
            ctaUrl={affiliateUrl}
            ctaText="Check Price on Amazon"
          />

          {/* Why I Chose This */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.whyIChoseThis.title}</h2>
            <div className="prose prose-lg max-w-none text-slate-700">
              {reviewData.whyIChoseThis.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* What Makes It Work */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.whatMakesItWork.title}</h2>
            <div className="space-y-6">
              {reviewData.whatMakesItWork.features.map((feature, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real Restaurant Use */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.realRestaurantUse.title}</h2>
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="font-semibold">{reviewData.realRestaurantUse.intro}</p>
              <ul className="space-y-2 mt-4">
                {reviewData.realRestaurantUse.uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
              <p className="mt-6">{reviewData.realRestaurantUse.conclusion}</p>
            </div>
          </section>

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

          {/* PROS & CONS - Using standardized component */}
          <ProsConsGrid
            title="Honest Assessment"
            prosTitle="What Works"
            consTitle="Limitations"
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* WHO SHOULD BUY - Using standardized component */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle="Perfect If You:"
            considerAlternativesTitle="Skip If You:"
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.skipIf}
          />

          {/* CTA - AFTER WHO SHOULD BUY (Decision Point) */}
          <AmazonCTA
            productSlug={PRODUCT_SLUG}
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Ready to upgrade your peeling game?"
          />

          {/* Care & Maintenance */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.careAndMaintenance.title}</h2>
            <div className="space-y-4 text-slate-700">
              {reviewData.careAndMaintenance.sections.map((section, index) => (
                <div key={index} className="bg-slate-50 p-5 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                  <ul className="space-y-1 ml-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <FTCDisclosure />

          {/* Testimonials */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="testimonials">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.testimonials.title}</h2>
            <p className="text-sm text-slate-700 mb-4 italic">{reviewData.testimonials.subtitle}</p>
            <div className="space-y-4">
              {reviewData.testimonials.reviews.map((review, index) => (
                <div key={index} className="bg-slate-50 p-5 rounded-lg">
                  <p className="text-slate-700 mb-2">&quot;{review.quote}&quot;</p>
                  <p className="text-sm text-slate-700">— Amazon verified purchaser ({review.author})</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cost Analysis */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="cost-analysis">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.costAnalysis.title}</h2>

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-4">
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.costAnalysis.realWorldValue.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.costAnalysis.realWorldValue.items.map((item, index) => (
                  <li key={index}>• <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</li>
                ))}
              </ul>
            </div>

            <p className="text-slate-700 mb-4">
              <strong>Value comparison:</strong> {reviewData.costAnalysis.comparison}
            </p>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-slate-800 font-semibold">{reviewData.costAnalysis.bottomLine}</p>
            </div>
          </section>

          {/* Performance Data */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="performance">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.performanceData.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reviewData.performanceData.categories.map((category, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-semibold text-slate-900 mb-2">{category.title}</p>
                  <p className="text-slate-700 text-sm">
                    {category.metrics.map((metric, metricIndex) => (
                      <span key={metricIndex}>
                        <strong>{metric.label}:</strong> {metric.value}
                        {metricIndex < category.metrics.length - 1 && <><br/></>}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mt-4">
              <p className="text-slate-800">
                <strong>{reviewData.performanceData.keyInsight}</strong>
              </p>
            </div>
          </section>

          {/* Specifications */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="specs">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.specifications.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Technical Specifications</h3>
                <dl className="space-y-2 text-sm">
                  {reviewData.specifications.technical.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                      <dt className="text-slate-700">{spec.label}:</dt>
                      <dd className="font-semibold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Physical Dimensions</h3>
                <dl className="space-y-2 text-sm">
                  {reviewData.specifications.physical.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                      <dt className="text-slate-700">{spec.label}:</dt>
                      <dd className="font-semibold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="comparison">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.comparison.title}</h2>

            <div className="overflow-x-auto my-5">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    {reviewData.comparison.headers.map((header, index) => (
                      <th key={index} className={`p-3 text-left border-b-2 border-gray-300 ${index === 1 ? 'bg-orange-50' : ''}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reviewData.comparison.rows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? '' : 'bg-slate-50'}>
                      <td className="p-3 border-b border-gray-200 font-semibold">{row.feature}</td>
                      <td className="p-3 border-b border-gray-200 bg-orange-50">{row.oxo}</td>
                      <td className="p-3 border-b border-gray-200">{row.kuhnRikon}</td>
                      <td className="p-3 border-b border-gray-200">{row.oxoY}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-6">
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.comparison.guidance.title}</h3>
              <ul className="space-y-3 text-slate-700">
                {reviewData.comparison.guidance.options.map((option, index) => (
                  <li key={index}>
                    <strong>{option.title}</strong> {option.description}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ - Using standardized component */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* BOTTOM LINE - Using standardized component with tracking */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            ctaUrl={affiliateUrl}
            ctaText={reviewData.bottomLine.ctaText}
            productSlug={reviewData.productSlug}
          />

          <div className="text-center my-8">
            <Link
              href="/prep-tools"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Prep Tools →
            </Link>
          </div>

          {/* RELATED PRODUCTS - Using standardized component */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* AUTHOR BIO */}
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
