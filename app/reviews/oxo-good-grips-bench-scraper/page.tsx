import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
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
import FTCDisclosure from '@/components/FTCDisclosure'
import { getReviewMetadata } from '@/data/metadata'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// Import review data
import { reviewData } from './oxo-good-grips-bench-scraper-data'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('oxo-good-grips-bench-scraper')
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
      images: [{
        url: centralMeta.imageUrl || generateOGImageURL({
          title: productData.name,
          rating: productData.expertRating ?? reviewData.hero.rating,
          testingPeriod: centralMeta.testingPeriod,
          tier: centralMeta.tier,
        }),
        width: 1200,
        height: 630,
        alt: centralMeta.imageAlt || `${productData.name} - Professional Review`,
      }],
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

export default async function OXOGoodGripsBenchScraperReview() {
  const product = await getProductBySlug(reviewData.productSlug)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    affiliateLinks: product.affiliateLinks.length > 0 ? product.affiliateLinks : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  const breadcrumbs = [
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Reviews', url: 'https://www.chefapprovedtools.com/reviews' },
    { name: reviewData.breadcrumb.productName, url: `https://www.chefapprovedtools.com/reviews/${reviewData.productSlug}` }
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
        slug={reviewData.productSlug}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category || 'Baking Tools'}
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

          {/* SECTION 1: HERO */}
          <ReviewHero
            title={reviewData.hero.title}
            authorName="Scott Bradley"
            authorCredentials="45 Years Cooking Experience"
            rating={reviewData.hero.rating}
            tierBadge={{
              text: "Tier 2: Home Testing | 20 Years",
              icon: "🏡"
            }}
            verdict={reviewData.quickVerdict.content}
            verdictStrong="essential tool"
            publishedDate="November 10, 2025"
            lastUpdated="November 10, 2025"
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

            <div className="mb-8">
              <Image
                src="/images/products/oxo-good-grips-bench-scraper/oxo-good-grips-bench-scraper-2.webp"
                alt="OXO Good Grips Brand Quality"
                width={1000}
                height={1500}
                quality={75}
                className="rounded-lg w-full h-auto max-w-2xl mx-auto"
              />
            </div>

            <div className="space-y-6">
              {reviewData.whatMakesItWork.features.map((feature, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Testing */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.professionalTesting.title}</h2>

            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="font-semibold mb-6">{reviewData.professionalTesting.intro}</p>

              <div className="space-y-6">
                {reviewData.professionalTesting.sections.map((section, index) => (
                  <div key={index} className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{section.task}</h3>
                    <p className="text-slate-700">{section.description}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 font-semibold">{reviewData.professionalTesting.durability}</p>
              <p className="mt-4">{reviewData.professionalTesting.conclusion}</p>
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
                rel="noopener noreferrer sponsored"
                className="text-orange-700 hover:text-orange-800 font-medium underline"
              >
                → See current Amazon price and reviews
              </a>
            </CTAVisibilityTracker>
          </div>

          {/* PROS & CONS - Using standardized component */}
          <ProsConsGrid
            title={reviewData.prosConsData.title}
            prosTitle={reviewData.prosConsData.prosTitle}
            consTitle={reviewData.prosConsData.consTitle}
            pros={reviewData.prosConsData.pros}
            cons={reviewData.prosConsData.cons}
          />

          {/* WHO SHOULD BUY - Using standardized component */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.skipIfTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.skipIf}
          />

          {/* Related Tools */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Essential Partner: The Right Cutting Board</h2>
            <p className="text-slate-700 mb-4">
              A bench scraper is only as good as the cutting board you use it with. I use mine most with my John Boos
              maple board - the smooth wood surface makes scraping effortless, and the bench scraper keeps it clean
              between tasks.
            </p>
            <Link
              href="/reviews/john-boos-platinum-commercial-cutting-board"
              className="inline-flex items-center text-orange-700 hover:text-orange-800 font-semibold"
            >
              → See My John Boos Platinum Cutting Board Review
            </Link>
          </section>

          {/* Care & Maintenance */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.careAndMaintenance.title}</h2>

            <div className="space-y-4 text-slate-700">
              {reviewData.careAndMaintenance.sections.map((section, index) => (
                <div key={index} className="bg-slate-50 p-5 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{section.subtitle}</h3>
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
            <p className="text-sm text-slate-600 mb-4 italic">{reviewData.testimonials.subtitle}</p>

            <div className="space-y-4">
              {reviewData.testimonials.reviews.map((review, index) => (
                <div key={index} className="bg-slate-50 p-5 rounded-lg">
                  <p className="text-slate-700 mb-2">&quot;{review.quote}&quot;</p>
                  <p className="text-sm text-slate-500">— Amazon verified purchaser ({review.author})</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cost Analysis */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="cost-analysis">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.costAnalysis.title}</h2>

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-6">
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.costAnalysis.realWorldValue.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.costAnalysis.realWorldValue.items.map((item, index) => (
                  <li key={index}>• <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg mb-6">
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.costAnalysis.comparison.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.costAnalysis.comparison.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            <p className="text-slate-700">{reviewData.costAnalysis.conclusion}</p>
          </section>

          {/* Specifications */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="performance">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.specs.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Product Specifications</h3>
                <dl className="space-y-2 text-sm">
                  {reviewData.specs.details.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                      <dt className="text-slate-600">{spec.label}</dt>
                      <dd className="font-semibold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-3">20 Years of Testing</h3>
                <p className="text-slate-700 text-sm mb-3">
                  This exact OXO bench scraper has been tested for 20 years, including 6 years of daily professional use at Purple Café in Seattle.
                </p>
                <p className="text-slate-700 text-sm">
                  {reviewData.specs.note}
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6" id="comparison">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{reviewData.comparison.title}</h2>

            <div className="overflow-x-auto my-5">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    {reviewData.comparison.headers.map((header, index) => (
                      <th key={index} className="p-3 text-left border-b-2 border-gray-300">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reviewData.comparison.rows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? '' : 'bg-slate-50'}>
                      <td className="p-3 border-b border-gray-200">{row.feature}</td>
                      <td className={`p-3 border-b border-gray-200 ${row.oxoBold ? 'font-bold text-green-700' : ''}`}>{row.oxo}</td>
                      <td className="p-3 border-b border-gray-200">{row.dexterRussell}</td>
                      <td className="p-3 border-b border-gray-200">{row.generic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-slate-700 mt-6">
              <strong>My take:</strong> {reviewData.comparison.conclusion}
            </p>
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
        productSlug={reviewData.productSlug}
      />
    </>
  )
}
