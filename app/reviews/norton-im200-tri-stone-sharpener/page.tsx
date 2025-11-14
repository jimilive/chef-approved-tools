import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  ReviewHero,
  ProsConsGrid,
  FAQSection,
  EmailCaptureSection,
  RelatedProductsGrid
} from '@/components/review'
import AuthorBio from '@/components/review/AuthorBio'
import { getReviewMetadata } from '@/data/metadata'

// Import review data
import { reviewData } from './norton-im200-tri-stone-sharpener-data'

// Use ISR for better performance
export const revalidate = 3600
export const fetchCache = 'force-cache'

// Helper to process inline links
function processInlineLinks(text: string): React.ReactNode {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/)
  return parts.map((part, index) => {
    const linkMatch = part.match(/<LINK>(.*?)<\/LINK>/)
    if (linkMatch) {
      const linkText = linkMatch[1]
      const linkMap: Record<string, string> = {
        'Victorinox chef knives': '/reviews/victorinox-fibrox-8-inch-chefs-knife',
        'KitchenAid commercial mixer': '/reviews/kitchenaid-ksm8990wh',
        'Robot Coupe food processor': '/reviews/robot-coupe-r2-dice',
        'premium John Boos cutting board': '/reviews/john-boos-platinum-commercial-cutting-board',
        'Victorinox chef knife': '/reviews/victorinox-fibrox-10-inch-chefs-knife',
        'Le Creuset Dutch oven': '/reviews/le-creuset-signature-7-25-qt-dutch-oven',
        'professional kitchen starter kit': '/kitchen-bundle',
        'proper knife care and maintenance': '/guides/knife-care'
      }
      const href = linkMap[linkText]
      if (href) {
        return (
          <Link key={index} href={href} className="text-blue-600 no-underline">
            {linkText}
          </Link>
        )
      }
    }
    return <span key={index}>{part}</span>
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('norton-im200-tri-stone-sharpener')
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

export default async function NortonTriStoneSharpenerReview() {
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
    { name: 'Knives', url: 'https://www.chefapprovedtools.com/knives' },
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
        category={reviewData.breadcrumb.category}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
            {' / '}
            <Link href="/knives" className="hover:text-orange-700">Knives</Link>
            {' / '}
            {reviewData.breadcrumb.productName}
          </div>

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
            customCTA={
              <div>
                <CTAVisibilityTracker ctaId="hero-cta" position="above_fold">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    {reviewData.hero.ctaText}
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
                <p className="text-slate-600 leading-relaxed text-base">{feature.description}</p>
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

        {/* Three-Stone Progressive System */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.threeStoneSystem.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{reviewData.threeStoneSystem.intro}</p>

            {reviewData.threeStoneSystem.stages.map((stage, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{stage.title}</h3>
                <p><strong>Purpose:</strong> {stage.purpose}</p>
                <p>{stage.description}</p>
                {stage.whenToUse && (
                  <p><strong>When to use:</strong> {stage.whenToUse}</p>
                )}
                {stage.whenToSkip && (
                  <p><strong>When to skip:</strong> {stage.whenToSkip}</p>
                )}
                {stage.note && <p>{stage.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Technique */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.professionalTechnique.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{processInlineLinks(reviewData.professionalTechnique.intro)}</p>

            {reviewData.professionalTechnique.techniques.map((technique, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{technique.title}</h3>

                {technique.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}

                {technique.intro && <p>{technique.intro}</p>}

                {technique.reasons && (
                  <ul className="pl-5 leading-relaxed">
                    {technique.reasons.map((reason, rIndex) => (
                      <li key={rIndex}>{reason}</li>
                    ))}
                  </ul>
                )}

                {technique.outro && <p>{technique.outro}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Why Manual Stones Beat Electric */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.manualVsElectric.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{reviewData.manualVsElectric.intro}</p>

            {reviewData.manualVsElectric.reasons.map((reason, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{reason.title}</h3>

                {reason.description && <p>{reason.description}</p>}

                {reason.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex}>{processInlineLinks(paragraph)}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Maintenance and Care */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.maintenanceAndCare.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            <p>{processInlineLinks(reviewData.maintenanceAndCare.intro)}</p>

            {reviewData.maintenanceAndCare.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{section.title}</h3>

                {section.items && (
                  <ul className="pl-5 leading-relaxed">
                    {section.items.map((item, iIndex) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.intro && <p>{section.intro}</p>}

                {section.steps && (
                  <ol className="pl-5 leading-relaxed">
                    {section.steps.map((step, sIndex) => (
                      <li key={sIndex}>{step}</li>
                    ))}
                  </ol>
                )}

                {section.note && <p>{section.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* What This Means for Home Cooks */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {reviewData.homeCookReality.title}
          </h2>

          <div className="text-lg leading-relaxed mb-8">
            {reviewData.homeCookReality.paragraphs.map((paragraph, index) => (
              <p key={index}>{processInlineLinks(paragraph)}</p>
            ))}
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

        {/* Where to Buy */}
        <section className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm my-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            Where to Buy
          </h2>

          <p className="text-slate-600 leading-relaxed mb-6">
            The Norton IM200 Tri-Stone Sharpener is available on Amazon with Prime shipping. This professional-grade sharpening system delivers consistent results for maintaining your kitchen knives.
          </p>

          <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
              <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
            </div>

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
                Check Price on Amazon →
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

            <p className="text-xs text-slate-700 text-center mt-3">
              As an Amazon Associate, I earn from qualifying purchases.
            </p>
          </div>

          <p className="text-sm text-slate-600 mt-6 italic">
            Price and availability subject to change. Always verify current specifications before purchasing.
          </p>
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
          <div className="bg-yellow-100 p-8 my-8 rounded-lg text-center border-3 border-yellow-400">
            <h3 className="mt-0 text-3xl font-bold text-slate-900">
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
                className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
          </div>
        </section>

        {/* Footer & Last Updated */}
        <div className="bg-gray-50 p-5 my-8 rounded border-l-4 border-gray-500">
          <p className="my-2">
            <strong>📅 Last Updated:</strong> {new Date(productData.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="my-2">
            <strong>🔍 Next Review:</strong> {new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long'
            })}
          </p>
          <p className="my-2">
            <strong>💬 Questions about knife sharpening?</strong> Leave a comment below—I read and respond
            to every question.
          </p>
        </div>

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
