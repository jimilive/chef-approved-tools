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
} from '@/components/review'
import AuthorBio from '@/components/review/AuthorBio'
import EmailCaptureSection from '@/components/review/EmailCaptureSection'
import FTCDisclosure from '@/components/FTCDisclosure'
import { getReviewMetadata } from '@/data/metadata'

// Import review data
import { reviewData } from './oxo-good-grips-bench-scraper-data'

// CACHE-BUSTING: Prevent Next.js from serving stale HTML
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'


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
            customCTA={
              <div>
                <CTAVisibilityTracker ctaId="hero-cta" position="above_fold">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    Check Price on Amazon
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
              </div>
            }
          />

        {/* Why I Chose This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.whyIChoseThis.title}</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            {reviewData.whyIChoseThis.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* What Makes It Work */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.whatMakesItWork.title}</h2>

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
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Testing */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.professionalTesting.title}</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="font-semibold mb-6">{reviewData.professionalTesting.intro}</p>

            <div className="space-y-6">
              {reviewData.professionalTesting.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{section.task}</h3>
                  <p>{section.description}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-semibold">{reviewData.professionalTesting.durability}</p>
            <p className="mt-4">{reviewData.professionalTesting.conclusion}</p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.prosConsData.title}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-900">{reviewData.prosConsData.prosTitle}</h3>
              <ul className="space-y-2 text-gray-700">
                {reviewData.prosConsData.pros.map((pro, index) => (
                  <li key={index}>✓ {pro}</li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">{reviewData.prosConsData.consTitle}</h3>
              <ul className="space-y-2 text-gray-700">
                {reviewData.prosConsData.cons.map((con, index) => (
                  <li key={index}>✗ {con}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who Should Buy This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.whoShouldBuy.title}</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">{reviewData.whoShouldBuy.perfectForTitle}</h3>
            <ul className="space-y-2 text-gray-700">
              {reviewData.whoShouldBuy.perfectFor.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">{reviewData.whoShouldBuy.skipIfTitle}</h3>
            <ul className="space-y-2 text-gray-700">
              {reviewData.whoShouldBuy.skipIf.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-12 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Essential Partner: The Right Cutting Board</h2>
          <p className="text-gray-700 mb-4">
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
        <section className="mb-12 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.careAndMaintenance.title}</h2>

          <div className="space-y-4 text-gray-700">
            {reviewData.careAndMaintenance.sections.map((section, index) => (
              <div key={index}>
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

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Add This to Your Kitchen?</h2>

          <p className="text-lg text-gray-700 mb-6">
            This is one of the 11 tools I use most in my home kitchen after 24 years of professional cooking.
            For the price, it&apos;s the tool you didn&apos;t know you needed until you have it.
          </p>

          <CTAVisibilityTracker
            ctaId={`${reviewData.productSlug}-above-fold-cta`}
            position="above_fold"
            productSlug={reviewData.productSlug}
            merchant="amazon"
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Check Price on Amazon
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

          <p className="text-sm text-gray-600 mt-4">
            💡 Also available at kitchen retailers and bakery supply stores
          </p>
        </section>

        <FTCDisclosure />

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testimonials" className="text-orange-700 hover:text-orange-800">User Reviews</a>
            <span className="text-slate-400">|</span>
            <a href="#cost-analysis" className="text-orange-700 hover:text-orange-800">Cost Analysis</a>
            <span className="text-slate-400">|</span>
            <a href="#performance" className="text-orange-700 hover:text-orange-800">Specifications</a>
            <span className="text-slate-400">|</span>
            <a href="#comparison" className="text-orange-700 hover:text-orange-800">vs. Competitors</a>
            <span className="text-slate-400">|</span>
            <a href="#faq" className="text-orange-700 hover:text-orange-800">FAQ</a>
          </div>
        </nav>

        {/* Testimonials */}
        <section className="mb-12" id="testimonials">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.testimonials.title}</h2>
          <p className="text-sm text-slate-600 mb-4 italic">{reviewData.testimonials.subtitle}</p>

          <div className="space-y-4">
            {reviewData.testimonials.reviews.map((review, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-slate-700 mb-2">&quot;{review.quote}&quot;</p>
                <p className="text-sm text-slate-500">— Amazon verified purchaser ({review.author})</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Analysis */}
        <section className="mb-12" id="cost-analysis">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.costAnalysis.title}</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-6">
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.costAnalysis.realWorldValue.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.costAnalysis.realWorldValue.items.map((item, index) => (
                  <li key={index}>• <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.costAnalysis.comparison.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.costAnalysis.comparison.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            <p className="text-slate-700">{reviewData.costAnalysis.conclusion}</p>
          </div>
        </section>

        {/* Specifications */}
        <section className="mb-12" id="performance">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.specs.title}</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

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
          </div>
        </section>

        {/* Mid-article CTA */}
        <section className="mb-12 bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">Ready to upgrade your kitchen workflow?</p>
          <CTAVisibilityTracker
            ctaId={`${reviewData.productSlug}-mid-article-cta`}
            position="mid_article"
            productSlug={reviewData.productSlug}
            merchant="amazon"
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Check Price on Amazon
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
        </section>

        {/* Additional Product Details - removed duplicate */}

        {/* Comparison Table */}
        <section className="mb-12" id="comparison">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.comparison.title}</h2>

          <div className="overflow-x-auto my-5">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {reviewData.comparison.headers.map((header, index) => (
                    <th key={index} className="p-3 text-left border-b-2 border-gray-300">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reviewData.comparison.rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className="p-3 border-b border-gray-300">{row.feature}</td>
                    <td className={`p-3 border-b border-gray-300 ${row.oxoBold ? 'font-bold text-green-600' : ''}`}>{row.oxo}</td>
                    <td className="p-3 border-b border-gray-300">{row.dexterRussell}</td>
                    <td className="p-3 border-b border-gray-300">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 mt-6">
            <strong>My take:</strong> {reviewData.comparison.conclusion}
          </p>
        </section>

        {/* Final CTA */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Add This Game-Changing Tool to Your Kitchen</h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            After 24 years of professional cooking, this is the tool most home cooks don&apos;t know they need. For the price, it&apos;s one of the best investments you can make in your kitchen efficiency.
          </p>
          <div className="flex justify-center">
            <CTAVisibilityTracker
              ctaId={`${reviewData.productSlug}-final-cta`}
              position="final_cta"
              productSlug={reviewData.productSlug}
              merchant="amazon"
            >
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Check Price on Amazon
              </a>
            </CTAVisibilityTracker>
          </div>

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
        </section>

        {/* FAQ Section */}
        <section className="mb-12" id="faq">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.faq.title}</h2>

          <div className="space-y-4">
            {reviewData.faq.items.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* Author Bio */}
        <AuthorBio />

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

        </div>
      </div>
    </>
  )
}
