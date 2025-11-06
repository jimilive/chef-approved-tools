import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import {
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'

// Import review data
import { reviewData } from './ninja-bl660-professional-blender-data'

// Use ISR for better performance
export const revalidate = 3600
export const fetchCache = 'force-cache'

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug(reviewData.productSlug)
  const productData = product || reviewData.legacyProductData

  return {
    title: reviewData.metadata.title,
    description: reviewData.metadata.description,
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/ninja-bl660-professional-blender',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: 'https://www.chefapprovedtools.com/reviews/ninja-bl660-professional-blender',
      siteName: 'Chef Approved Tools',
      images: [{
        url: generateOGImageURL({
          title: productData.name,
          rating: productData.expertRating ?? reviewData.hero.rating,
          testingPeriod: reviewData.metadata.testingPeriod,
          tier: reviewData.metadata.tier as 1 | 2 | 3,
        }),
        width: 1200,
        height: 630,
        alt: `${productData.name} - Professional Review`,
      }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      images: [generateOGImageURL({
        title: productData.name,
        rating: productData.expertRating ?? reviewData.hero.rating,
        testingPeriod: reviewData.metadata.testingPeriod,
        tier: reviewData.metadata.tier as 1 | 2 | 3,
      })],
    },
  }
}

export default async function NinjaBL660ReviewPage() {
  const product = await getProductBySlug(reviewData.productSlug)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  const productSchema = generateProductSchema({
    name: productData.name,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
        {/* TIER 3 HERO */}
        <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className={`inline-block ${reviewData.hero.badge.className} border rounded-full px-4 py-2 mb-6`}>
              <span className="font-semibold text-sm">{reviewData.hero.badge.text}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{reviewData.hero.title}</h1>
            <p className="text-xl text-slate-300 mb-6">
              After 90 days of testing—including a quality control issue that appeared within 2 weeks—here&apos;s the unfiltered truth about this budget blender from a chef who&apos;s used commercial Vitamix for 24 years.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★★★★☆</span>
                <span>{reviewData.hero.rating}/5</span>
              </div>
              <div>{reviewData.hero.tierBadge.text}</div>
              <div>~$80-100</div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* TESTING IN PROGRESS */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="font-semibold text-amber-900 mb-2">{reviewData.testingInProgress.title}</p>
                <p className="text-sm text-amber-800 mb-2">{reviewData.testingInProgress.intro}</p>
                <p className="text-sm text-amber-800">
                  <strong>Next Update:</strong> {reviewData.testingInProgress.nextUpdate}<br/>
                  <strong>Tier 2 Upgrade:</strong> {reviewData.testingInProgress.tier2Upgrade}
                </p>
              </div>
            </div>
          </div>

          {/* QUALITY CONTROL WARNING */}
          <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-red-900 mb-2">{reviewData.qualityControlWarning.title}</p>
                <p className="text-sm text-red-800 mb-2">{reviewData.qualityControlWarning.intro}</p>
                <p className="text-sm text-red-800">
                  <strong>{reviewData.qualityControlWarning.update}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* QUICK VERDICT */}
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Scott&rsquo;s Professional Verdict</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{reviewData.hero.verdict}</p>
          </div>

          {/* PROS & CONS */}
          <ProsConsGrid
            title={reviewData.prosConsTitle}
            prosTitle={reviewData.prosTitle}
            consTitle={reviewData.consTitle}
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* BUY SECTION */}
          <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Budget Blending with Caveats</h2>
            <p className="text-lg text-gray-700 mb-6">
              After 90 days of professional testing, the Ninja BL660 delivers adequate performance for smoothies, sauces, and frozen drinks at a budget price. However, quality control concerns (crack within 2 weeks) significantly impact long-term confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAVisibilityTracker ctaId={`${reviewData.productSlug}-above-fold-cta`} position="above_fold" productSlug={reviewData.productSlug} merchant="amazon">
                <a href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                  {reviewData.hero.ctaText}
                </a>
              </CTAVisibilityTracker>
              <p className="text-center text-sm mt-2">
                <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium" target="_blank" rel="noopener noreferrer sponsored">
                  → View {productData.name} on Amazon
                </a>
              </p>
              <Link href="/reviews" className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg transition-all duration-200">
                See All Reviews
              </Link>
            </div>
          </section>

          {/* PROFESSIONAL CONTEXT */}
          <section className="mb-12 bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.professionalContext.title}</h2>
            {reviewData.professionalContext.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4">{p}</p>
            ))}
          </section>

          {/* REAL-WORLD TESTING */}
          <section className="mb-12 bg-slate-50 rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.realWorldTesting.title}</h2>
            {reviewData.realWorldTesting.tests.map((test, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{test.title}</h3>
                {test.sections.map((section, sidx) => (
                  <div key={sidx} className="mb-3">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>{section.subtitle}:</strong> {section.content}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </section>

          {/* TECHNICAL SPECS */}
          <section className="mb-12 bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Technical Specifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="text-left p-3 font-semibold">Specification</th>
                    <th className="text-left p-3 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.technicalSpecs.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'border-b border-gray-200' : 'bg-gray-50 border-b border-gray-200'}>
                      <td className="p-3 font-medium">{item.spec}</td>
                      <td className="p-3">{item.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* WHO SHOULD BUY */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
          />

          {/* FAQ */}
          <FAQSection title={reviewData.faq.title} faqs={reviewData.faq.items} />

          {/* WHERE TO BUY */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">{reviewData.whereToBuy.title}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{reviewData.whereToBuy.introText}</p>
            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
                <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
              </div>
              <CTAVisibilityTracker ctaId={`${reviewData.productSlug}-where-to-buy-cta`} position="mid_article" productSlug={reviewData.productSlug} merchant="amazon">
                <a href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                  className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl">
                  Check Price on Amazon →
                </a>
              </CTAVisibilityTracker>
              <p className="text-center mt-3 text-sm">
                <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium" target="_blank" rel="noopener noreferrer sponsored">
                  → View {productData.name} on Amazon
                </a>
              </p>
              <p className="text-xs text-slate-500 text-center mt-3">As an Amazon Associate, I earn from qualifying purchases.</p>
            </div>
            <p className="text-sm text-slate-600 mt-6 italic">{reviewData.whereToBuy.disclaimer}</p>
          </div>

          {/* EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-slate-700">{p}</p>
            ))}
            customCTA={
              <div className="bg-white rounded-xl p-6">
                <CTAVisibilityTracker ctaId={`${reviewData.productSlug}-bottom-line-cta`} position="final_cta" productSlug={reviewData.productSlug} merchant="amazon">
                  <a href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                    className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl">
                    {reviewData.bottomLine.ctaText}
                  </a>
                </CTAVisibilityTracker>
                <p className="text-center mt-3 text-sm">
                  <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium" target="_blank" rel="noopener noreferrer sponsored">
                    → View {productData.name} on Amazon
                  </a>
                </p>
                <p className="text-xs text-slate-500 text-center mt-3">As an Amazon Associate, I earn from qualifying purchases.</p>
              </div>
            }
          />

          {/* RELATED PRODUCTS */}
          <RelatedProductsGrid title={reviewData.relatedProducts.title} products={reviewData.relatedProducts.products} />

          {/* AUTHOR BIO */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-[40px] flex-shrink-0">
                  👨‍🍳
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 mt-0">About Scott Bradley</h3>
                  <p className="text-base text-slate-600 m-0">Professional Chef • 24 Years in Professional Kitchens</p>
                </div>
              </div>
              <div className="text-slate-600 leading-[1.8]">
                <p className="mb-4">
                  <strong>Scott Bradley brings 24 years of professional kitchen experience to Chef Approved Tools.</strong> As former Kitchen Manager at Mellow Mushroom, he managed operations generating $80K+ monthly revenue while overseeing equipment procurement, staff training, and quality control for a high-volume operation.
                </p>
                <p className="mb-4">
                  His professional background spans multiple restaurant environments including Purple Café, Feierabend, Il Pizzaiolo, and Paragary&apos;s, giving him hands-on experience with equipment across different cuisines, cooking styles, and volume levels. This diverse experience informs every equipment recommendation on this site.
                </p>
                <p className="mb-0">
                  <strong>All reviews are based on actual professional testing</strong>—equipment used daily in restaurant environments or tested extensively in home settings. No free samples, no sponsored content, just honest assessments from someone who&apos;s spent decades relying on kitchen tools to do their job.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="text-xl flex-shrink-0">🎓</div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Culinary Degree</strong>
                    Seattle Central College (2005-2007)
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="text-xl flex-shrink-0">👨‍🍳</div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Professional Experience</strong>
                    24 years in professional kitchens
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="text-xl flex-shrink-0">🏆</div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Professional Roles</strong>
                    Kitchen Manager, Lead Line, Expo, Pizzaiolo
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="text-xl flex-shrink-0">🔧</div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Testing Approach</strong>
                    Tier 1: Professional use | Tier 2: Long-term personal | Tier 3: Expert evaluation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
