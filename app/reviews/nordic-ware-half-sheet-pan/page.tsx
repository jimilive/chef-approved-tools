import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import { getReviewMetadata } from '@/data/metadata'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  ReviewHero,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  BottomLineSection,
  EmailCaptureSection,
  RelatedProductsGrid
} from '@/components/review'
import AuthorBio from '@/components/review/AuthorBio'
import { StickyMobileCTAWrapper } from '@/components/StickyMobileCTA'

// Import review data
import { reviewData } from './nordic-ware-half-sheet-pan-data'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Helper to process inline links
function processInlineLinks(text: string): React.ReactNode {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/)
  return parts.map((part, index) => {
    const linkMatch = part.match(/<LINK>(.*?)<\/LINK>/)
    if (linkMatch) {
      const linkText = linkMatch[1]
      const linkMap: Record<string, string> = {
        'Victorinox chef knife': '/reviews/victorinox-fibrox-8-inch-chefs-knife',
        'John Boos cutting board': '/reviews/john-boos-platinum-commercial-cutting-board',
        'KitchenAid commercial mixer': '/reviews/kitchenaid-ksm8990wh',
        'Diamond Crystal kosher salt': '/reviews/diamond-crystal-kosher-salt',
        'Le Creuset Dutch ovens': '/reviews/le-creuset-signature-7-25-qt-dutch-oven',
        'professional kitchen starter kit': '/kitchen-bundle'
      }
      const href = linkMap[linkText]
      if (href) {
        return (
          <Link key={index} href={href} className="text-orange-700 hover:text-orange-800 underline">
            {linkText}
          </Link>
        )
      }
    }
    return <span key={index}>{part}</span>
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('nordic-ware-half-sheet-pan')
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

export default async function NordicWareHalfSheetPanReview() {
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
    { name: 'Cookware', url: 'https://www.chefapprovedtools.com/cookware' },
    { name: reviewData.breadcrumb.productName, url: `https://www.chefapprovedtools.com/reviews/${reviewData.productSlug}` }
  ]

  return (
    <>
    <div className="max-w-3xl mx-auto px-5 py-10">
      <ProductViewTrackerWrapper
        slug={reviewData.productSlug}
        name={productData.name}
        tier={reviewData.metadata.tier as 1 | 2 | 3}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category || 'Bakeware'}
      />

      <article>
        {/* Breadcrumb */}
        <nav className="mb-5 text-sm">
          <Link href="/" className="text-blue-600 no-underline">Home</Link>
          {' > '}
          <Link href="/reviews" className="text-blue-600 no-underline">Reviews</Link>
          {' > '}
          <Link href="/cookware" className="text-blue-600 no-underline">Cookware</Link>
          {' > '}
          <span className="text-gray-700">{reviewData.breadcrumb.productName}</span>
        </nav>

        {/* Hero Section */}
        <ReviewHero
          title={reviewData.hero.title}
          authorName={reviewData.hero.authorName}
          authorCredentials={reviewData.hero.authorCredentials}
          rating={reviewData.hero.rating}
          tierBadge={{
            icon: "⏱️",
            text: reviewData.hero.tierBadge.text
          }}
          verdict={reviewData.hero.verdict}
          verdictStrong={reviewData.hero.verdictStrong}
            publishedDate="November 10, 2025"
            lastUpdated="November 10, 2025"
        />

        {/* Quick Stats */}
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 my-8">
          <p className="m-0 text-lg leading-relaxed whitespace-pre-line">
            {reviewData.hero.quickStats}
          </p>
        </div>

        {/* Above Fold CTA */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 my-8">
          <h2 className="mt-0 text-2xl font-bold text-slate-900 mb-4">Current Best Price:</h2>

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

          <p className="text-sm text-slate-700 mt-4 mb-0">
            💡 Price updated daily. We earn commission at no extra cost to you.
          </p>
        </div>

        {/* Professional Verdict */}
        <section className="bg-gray-50 p-6 my-6 rounded-lg border-l-4 border-blue-600">
          <h2 className="text-3xl font-bold mb-5 text-gray-900">
            {reviewData.professionalVerdict.title}
          </h2>

          {reviewData.professionalVerdict.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="bg-white p-4 mt-5 rounded">
            <p className="my-2">
              <strong>✓ Perfect For:</strong> {reviewData.professionalVerdict.perfectFor}
            </p>
            <p className="my-2">
              <strong>✗ Skip If:</strong> {reviewData.professionalVerdict.skipIf}
            </p>
          </div>
        </section>

        {/* Hero Features */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.heroFeatures.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewData.heroFeatures.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg border-2 border-slate-200 p-6 hover:border-orange-300 transition-colors">
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-700 leading-relaxed text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Testing Story */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.testingStory.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            {reviewData.testingStory.paragraphs.map((paragraph, index) => (
              <p key={index}>{processInlineLinks(paragraph)}</p>
            ))}
          </div>
        </section>

        {/* What Makes It Superior */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.superior.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{processInlineLinks(reviewData.superior.intro)}</p>

            {reviewData.superior.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{section.title}</h3>

                {section.intro && <p>{section.intro}</p>}

                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}

                {section.bullets && (
                  <ul className="pl-5 leading-relaxed">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {section.outro && <p>{section.outro}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Understanding Patina */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.patina.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{reviewData.patina.intro}</p>

            {reviewData.patina.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{section.subtitle}</h3>

                {section.content && <p>{section.content}</p>}

                {section.bullets && (
                  <ul className="pl-5 leading-relaxed">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}><strong>{bullet.split(':')[0]}:</strong> {bullet.split(':')[1]}</li>
                    ))}
                  </ul>
                )}

                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Versatility */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.versatility.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{processInlineLinks(reviewData.versatility.intro)}</p>

            {reviewData.versatility.uses.map((use, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{use.title}</h3>
                {use.description && <p>{use.description}</p>}
                {use.bullets && (
                  <ul className="pl-5 leading-relaxed">
                    {use.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Care and Maintenance */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.careAndMaintenance.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{processInlineLinks(reviewData.careAndMaintenance.intro)}</p>

            {reviewData.careAndMaintenance.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{section.title}</h3>

                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}

                {section.content && <p>{section.content}</p>}

                {section.routine && (
                  <>
                    <p><strong>{section.routine.title}</strong></p>
                    <ol className="pl-5 leading-relaxed">
                      {section.routine.steps.map((step, sIndex) => (
                        <li key={sIndex}>{step}</li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why Multiple Pans Matter */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.multiplePans.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{reviewData.multiplePans.intro}</p>

            <ul className="pl-5 leading-relaxed">
              {reviewData.multiplePans.reasons.map((reason, index) => (
                <li key={index}><strong>{reason.split(':')[0]}:</strong> {reason.split(':')[1]}</li>
              ))}
            </ul>

            <p>{reviewData.multiplePans.conclusion}</p>
            <p>{processInlineLinks(reviewData.multiplePans.outro)}</p>
          </div>
        </section>

        {/* Pros & Cons */}
        <ProsConsGrid
          title="Pros & Cons"
          prosTitle="What Works"
          consTitle="Limitations"
          pros={reviewData.legacyProductData.pros}
          cons={reviewData.legacyProductData.cons}
        />

        {/* FAQ Section */}
        <FAQSection faqs={reviewData.faq.items} title={reviewData.faq.title} />

        {/* Where to Buy */}
        <section className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-8 my-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Where to Buy</h2>

          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            The Nordic Ware Natural Aluminum Commercial Baker&apos;s Half Sheet is available through Amazon with Prime shipping, verified customer reviews, and easy returns. This is the pan professional bakers choose for commercial kitchens.
          </p>

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

          <p className="text-sm text-slate-700 mt-6 mb-0 italic">
            As an Amazon Associate, I earn from qualifying purchases. Amazon Prime members get free 2-day shipping.
          </p>
        </section>

        {/* Email Capture */}
        <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl px-6 py-8 my-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              🔥 Get My 11 Essential Tools for a Professional Kitchen
            </h2>
            <p className="text-lg mb-6 text-orange-50">
              Download my free guide: The 11 tools I use most in my home kitchen after 45 years of cooking.
            </p>

            <ul className="space-y-2 mb-6 text-orange-50">
              <li>✓ My exact 11 daily workhorse tools</li>
              <li>✓ Where to invest vs where to save</li>
              <li>✓ Professional insights from 24 years of restaurant experience</li>
              <li>✓ Equipment care and maintenance tips</li>
            </ul>

            <a
              href="/newsletter"
              className="inline-block bg-white text-orange-700 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Download Free Guide →
            </a>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.bottomLine.title}
          </h2>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-lg my-8">
            <h3 className="text-white mt-0 text-2xl">
              {reviewData.bottomLine.subtitle}
            </h3>

            {reviewData.bottomLine.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="bg-white/20 p-5 my-5 rounded">
              <p className="m-0 text-xl font-bold">
                {reviewData.bottomLine.finalRating.overall}
              </p>
              <ul className="mt-4 mb-0 ml-5 text-base leading-relaxed">
                {reviewData.bottomLine.finalRating.breakdown.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="text-base mb-0">
              <strong>{reviewData.bottomLine.finalRating.wouldBuyAgain}</strong>
            </p>
          </div>

          {/* STRONG FINAL CTA */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
            <h3 className="mt-0 text-3xl font-bold text-slate-900 mb-4">
              {reviewData.bottomLine.ctaTitle}
            </h3>

            <p className="text-lg my-5 text-slate-700">
              {reviewData.bottomLine.ctaSubtitle}
            </p>

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

            <p className="text-sm text-slate-700 mt-4 mb-0">
              {reviewData.bottomLine.ctaTip}
            </p>
          </div>
        </section>

        {/* EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* Bottom Line Section with Click Tracking */}
        <BottomLineSection
          title={reviewData.bottomLineSection.title}
          paragraphs={reviewData.bottomLineSection.paragraphs}
          ctaText={reviewData.bottomLineSection.ctaText}
          ctaUrl={affiliateUrl}
          productSlug={reviewData.productSlug}
        />

        {/* Related Products */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

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
      </article>
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
