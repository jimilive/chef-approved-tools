import Link from 'next/link'
import TestimonialsSection from '@/components/TestimonialsSection'
import { BudgetVsPremiumTeaser } from '@/components/BudgetVsPremiumMagnet'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import {
  ReviewHero,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  BottomLineSection,
  RelatedProductsGrid,
} from '@/components/review'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import type { Metadata } from 'next'
import EmailCaptureBox from '@/components/review/EmailCaptureBox'
import EmailCaptureSection from '@/components/review/EmailCaptureSection'
import AuthorBio from '@/components/review/AuthorBio'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'
import { getReviewMetadata } from '@/data/metadata'
import { reviewData } from './rubbermaid-commercial-cooks-scraper-data'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('rubbermaid-commercial-cooks-scraper')
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
            rating: productData.expertRating ?? reviewData.header.expertRating,
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
        rating: productData.expertRating ?? reviewData.header.expertRating,
        testingPeriod: centralMeta.testingPeriod,
        tier: centralMeta.tier,
      })],
    },
  }
}

export default async function RubbermaidScraperReview() {
  // Get product data from Supabase
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
  const affiliate9_5Url = productData.affiliateLinks[1]?.url || '#'

  const breadcrumbs = [
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Reviews', url: 'https://www.chefapprovedtools.com/reviews' },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  return (
    <>
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={reviewData.metadata.tier}
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

          {/* SECTION 1: HERO */}
          <ReviewHero
            title={reviewData.header.title}
            authorName={reviewData.header.author}
            authorCredentials="45 Years Cooking Experience"
            rating={reviewData.header.expertRating}
            tierBadge={{
              text: "Tier 1: Years of Professional Use",
              icon: "⭐"
            }}
            verdict={reviewData.professionalSummary.text + " " + reviewData.professionalSummary.detail}
            verdictStrong="buy-it-for-life equipment"
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

        {/* SECTION 2: FTC Disclosure */}
        <FTCDisclosure />

        {/* SECTION 3: Content starts */}

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testing" className="text-orange-700 hover:text-orange-800">Testing Results</a>
            <span className="text-slate-400">|</span>
            <a href="#comparison" className="text-orange-700 hover:text-orange-800">vs Alternatives</a>
            <span className="text-slate-400">|</span>
            <a href="#verdict" className="text-orange-700 hover:text-orange-800">Final Verdict</a>
            <span className="text-slate-400">|</span>
            <a href="#faq" className="text-orange-700 hover:text-orange-800">FAQ</a>
          </div>
        </nav>

        {/* Bottom Line Up Front */}
        <section className="mb-8">
          <div className="bg-slate-50 p-6 border-l-4 border-blue-500 rounded-r-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.bottomLine.title}</h2>
            <p className="text-lg text-slate-800 mb-4">
              <strong>{reviewData.bottomLine.headline}</strong>
            </p>
            <p className="text-slate-700 mb-4">
              {reviewData.bottomLine.body}
            </p>
            <div className="bg-white p-4 rounded-lg mt-4">
              <p className="mb-2"><strong>✓ Perfect For:</strong> {reviewData.bottomLine.perfectFor}</p>
              <p><strong>✗ Consider Alternatives If:</strong> {reviewData.bottomLine.considerAlternatives}</p>
            </div>
          </div>
        </section>

        {/* Hero Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{reviewData.heroFeatures.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewData.heroFeatures.features.map((feature, index) => (
              <div key={index} className="bg-slate-50 p-5 rounded-lg">
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testing Results */}
        <section className="mb-8" id="testing">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.testingResults.title}</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.testingResults.professionalUse.title}</h3>
              {reviewData.testingResults.professionalUse.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.testingResults.homeUse.title}</h3>
              {reviewData.testingResults.homeUse.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.testingResults.performanceMetrics.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.testingResults.performanceMetrics.metrics.map((metric, index) => (
                  <li key={index}>• <strong>{metric.label}:</strong> {metric.value}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mid-Article CTA */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center my-8">
          <p className="font-semibold text-lg mb-3">Ready for Buy-It-For-Life Quality?</p>
          <div className="space-y-3">
            <div>
              <p className="text-sm mb-2">13.5&quot; (Professional Use):</p>
              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-mid-13`}
                position="mid_article"
                productSlug={reviewData.productSlug}
                merchant="amazon"
              >
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Check 13.5&quot; Price →
                </a>
              </CTAVisibilityTracker>
              {/* Text link fallback */}
              <p className="text-center mt-2 text-sm">
                <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
                  target="_blank" rel="noopener noreferrer sponsored">
                  → View 13.5&quot; on Amazon
                </a>
              </p>
            </div>
            <div>
              <p className="text-sm mb-2">9.5&quot; (Home Kitchens):</p>
              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-mid-9`}
                position="mid_article"
                productSlug={reviewData.productSlug}
                merchant="amazon"
              >
                <a
                  href={affiliate9_5Url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Check 9.5&quot; Price →
                </a>
              </CTAVisibilityTracker>
              {/* Text link fallback */}
              <p className="text-center mt-2 text-sm">
                <a href={affiliate9_5Url} className="text-green-700 hover:text-green-800 underline font-medium"
                  target="_blank" rel="noopener noreferrer sponsored">
                  → View 9.5&quot; on Amazon
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* User Reviews */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.userReviews.title}</h2>
          <p className="text-sm text-slate-600 mb-4 italic">
            {reviewData.userReviews.subtitle}
          </p>

          <div className="space-y-4">
            {reviewData.userReviews.reviews.map((review, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-slate-700 mb-2">
                  &quot;{review.quote}&quot;
                </p>
                <p className="text-sm text-slate-500">— {review.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparisons */}
        <section className="mb-8" id="comparison">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.comparisons.title}</h2>

          <div className="space-y-6">
            {reviewData.comparisons.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{section.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">{section.rubbermaidAdvantages.title}</h3>
                    <ul className="text-sm space-y-1 text-slate-700">
                      {section.rubbermaidAdvantages.points.map((point, pointIndex) => (
                        <li key={pointIndex}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-2 ${section.competitorProblems ? 'text-red-700' : 'text-orange-700'}`}>
                      {section.competitorProblems ? section.competitorProblems.title : section.competitorAdvantages?.title}
                    </h3>
                    <ul className="text-sm space-y-1 text-slate-700">
                      {(section.competitorProblems ? section.competitorProblems.points : section.competitorAdvantages?.points || []).map((point, pointIndex) => (
                        <li key={pointIndex}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-slate-700 text-sm">
                  <strong>Verdict:</strong> {section.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pros and Cons */}
        <ProsConsGrid
          title="Pros & Cons After 18 Years"
          pros={productData.pros}
          cons={productData.cons}
        />

        {/* Who Should Buy */}
        <WhoShouldBuyGrid
          title={reviewData.whoShouldBuy.title}
          perfectFor={reviewData.whoShouldBuy.perfectFor}
          considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
        />

        {/* FAQ */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

        {/* WHERE TO BUY SECTION */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.whereToBuy.title}</h2>
          <p><strong>Updated:</strong> {new Date(reviewData.whereToBuy.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>

          <div className="bg-gray-50 p-6 my-6 rounded-lg">
            <h3 className="mt-0">{reviewData.whereToBuy.subtitle}</h3>

            <div className="bg-white p-5 my-4 rounded-md border-2 border-yellow-600">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="m-0 mb-2.5">🏆 {reviewData.whereToBuy.sizes[0].name}</h3>
                  <p className="mt-1 mb-0 text-gray-600">
                    {reviewData.whereToBuy.sizes[0].features.join(' | ')}
                  </p>
                </div>
                <div>
                  <CTAVisibilityTracker
                    ctaId={`${reviewData.productSlug}-where-to-buy-13`}
                    position="mid_article"
                    productSlug={reviewData.productSlug}
                    merchant="amazon"
                  >
                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
                    >
                      View 13.5&quot; on Amazon →
                    </a>
                  </CTAVisibilityTracker>
                  {/* Text link fallback */}
                  <p className="text-center mt-2 text-sm">
                    <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank" rel="noopener noreferrer sponsored">
                      → Check Price on Amazon
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 my-4 rounded-md border-2 border-green-600">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="m-0 mb-2.5">⭐ {reviewData.whereToBuy.sizes[1].name}</h3>
                  <p className="mt-1 mb-0 text-gray-600">
                    {reviewData.whereToBuy.sizes[1].features.join(' | ')}
                  </p>
                </div>
                <div>
                  <CTAVisibilityTracker
                    ctaId={`${reviewData.productSlug}-where-to-buy-9`}
                    position="mid_article"
                    productSlug={reviewData.productSlug}
                    merchant="amazon"
                  >
                    <a
                      href={affiliate9_5Url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
                    >
                      View 9.5&quot; on Amazon →
                    </a>
                  </CTAVisibilityTracker>
                  {/* Text link fallback */}
                  <p className="text-center mt-2 text-sm">
                    <a href={affiliate9_5Url} className="text-green-700 hover:text-green-800 underline font-medium"
                      target="_blank" rel="noopener noreferrer sponsored">
                      → Check Price on Amazon
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-5 text-center">
              {reviewData.whereToBuy.note}
            </p>
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="mb-8">
          <EmailCaptureBox
            title="🔥 Get My 11 Essential Tools for a Professional Kitchen"
            description="Download my free guide: The 11 tools I use most in my home kitchen after 45 years of cooking."
            benefits={[
              '✓ My exact 11 daily workhorse tools',
              '✓ Where to invest vs where to save',
              '✓ Professional insights from 24 years of restaurant experience',
              '✓ Equipment care and maintenance tips'
            ]}
            ctaHref="/newsletter"
          />
        </section>

        {/* Final Verdict */}
        <section className="mb-8" id="verdict">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.finalVerdict.title}</h2>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-lg my-8">
            <h3 className="text-white mt-0 text-2xl">
              {reviewData.finalVerdict.headline}
            </h3>
            <p className="text-lg leading-relaxed">
              {reviewData.finalVerdict.text}
            </p>
            <div className="bg-white/20 p-5 my-5 rounded-md">
              <p className="m-0 text-xl font-bold">
                Final Rating: ⭐⭐⭐⭐⭐ {reviewData.finalVerdict.ratings.overall}/5
              </p>
              <ul className="mt-4 mb-0 ml-5 text-base leading-relaxed">
                {reviewData.finalVerdict.ratings.breakdown.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-base mb-0">
              <strong>Would I buy this again?</strong> {reviewData.finalVerdict.ratings.wouldBuyAgain}
            </p>
          </div>

          {/* STRONG FINAL CTA */}
          <div className="bg-yellow-100 p-8 my-8 rounded-lg text-center border-3 border-yellow-400">
            <h3 className="mt-0 text-3xl">
              Ready for Commercial-Grade Durability?
            </h3>
            <p className="text-lg my-5">
              This is a buy-it-for-life investment that costs less than dinner out.
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-2.5">13.5&quot; (Professional/Large Batches):</p>
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-final-13`}
                  position="final_cta"
                  productSlug={reviewData.productSlug}
                  merchant="amazon"
                >
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Check 13.5&quot; Price →
                  </a>
                </CTAVisibilityTracker>
                {/* Text link fallback */}
                <p className="text-center mt-2 text-sm">
                  <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
                    target="_blank" rel="noopener noreferrer sponsored">
                    → View 13.5&quot; on Amazon
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm mb-2.5">9.5&quot; (Home Kitchens - Most Popular):</p>
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-final-9`}
                  position="final_cta"
                  productSlug={reviewData.productSlug}
                  merchant="amazon"
                >
                  <a
                    href={affiliate9_5Url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Check 9.5&quot; Price →
                  </a>
                </CTAVisibilityTracker>
                {/* Text link fallback */}
                <p className="text-center mt-2 text-sm">
                  <a href={affiliate9_5Url} className="text-green-700 hover:text-green-800 underline font-medium"
                    target="_blank" rel="noopener noreferrer sponsored">
                    → View 9.5&quot; on Amazon
                  </a>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-5">
              💡 Pricing updated daily.
            </p>
          </div>
        </section>

        {/* Alternative Recommendations Section */}
        <section className="mb-8">
          <div className="bg-gray-50 p-6 my-6 rounded-lg">
            <h3>{reviewData.alternatives.title}</h3>

            {reviewData.alternatives.sections.map((section, index) => (
              <div key={index} className="my-5">
                <h3>{section.title}</h3>
                {section.options.map((option, optionIndex) => (
                  <p key={optionIndex} className="mb-2.5">
                    → <strong>{option.name}</strong> ({option.price}) - {option.description}
                  </p>
                ))}
              </div>
            ))}

            <div className="my-5">
              <h3>If You&apos;re Building a Complete Professional Kitchen:</h3>
              <p className="mb-2.5">
                → See our <Link href="/kitchen-bundle" className="text-orange-700 hover:text-orange-800 underline">Complete Kitchen Starter Kit</Link> for recommended equipment combinations at different budget levels.
              </p>
            </div>

            <p className="mt-5 p-4 bg-yellow-100 rounded">
              <strong>Still unsure?</strong> <Link href="/contact" className="text-orange-700 hover:text-orange-800 underline">Contact me</Link> with your specific needs—I&apos;ll provide a personalized recommendation based on your cooking style and budget.
            </p>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* Lead Magnet Teaser */}
        <BudgetVsPremiumTeaser />

        {/* Social Proof */}
        <TestimonialsSection />

        {/* EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* Bottom Line Section with Click Tracking */}
        <BottomLineSection
          title={reviewData.bottomLineSection.title}
          paragraphs={reviewData.bottomLineSection.paragraphs}
          ctaText={reviewData.bottomLineSection.ctaText}
          ctaUrl={affiliateUrl}
          productSlug={productData.slug}
        />

        {/* Footer Transparency Elements */}
        <section className="mb-8">
          <div className="bg-gray-50 p-5 my-8 rounded-md border-l-4 border-gray-500">
            <p className="my-2.5">
              <strong>📅 Last Updated:</strong> {new Date(reviewData.footerInfo.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="my-2.5">
              <strong>🔍 Next Review:</strong> {reviewData.footerInfo.nextReview}
            </p>
            <p className="my-2.5">
              <strong>💬 Own a Rubbermaid Commercial scraper?</strong> Share your experience in the comments
              below—I read and respond to every comment.
            </p>
            <p className="my-2.5">
              <strong>🔧 Questions about kitchen tools?</strong> <Link href="/contact" className="text-blue-600">
              Contact me directly</Link> and I&apos;ll help you choose the right equipment for your needs.
            </p>
          </div>

          <AuthorBio />
        </section>

        {/* Schema Markup */}
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
            __html: JSON.stringify(generateFAQSchema(reviewData.faq.items))
          }}
        />
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
