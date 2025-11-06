import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
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

// Import review data
import { reviewData } from './winco-heavy-duty-tongs-data'

// ISR configuration for better performance
export const revalidate = 3600 // 1 hour cache
export const fetchCache = 'force-cache'

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug(reviewData.productSlug)
  const productData = product || reviewData.legacyProductData

  return {
    title: reviewData.metadata.title,
    description: reviewData.metadata.description,
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/winco-heavy-duty-tongs',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: `https://www.chefapprovedtools.com/reviews/${reviewData.productSlug}`,
      siteName: 'Chef Approved Tools',
      images: [
        {
          url: generateOGImageURL({
            title: productData.name,
            rating: productData.expertRating ?? reviewData.hero.rating,
            testingPeriod: reviewData.metadata.testingPeriod,
            tier: reviewData.metadata.tier as 1 | 2 | 3,
          }),
          width: 1200,
          height: 630,
          alt: `${productData.name} - Professional Review`,
        },
      ],
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

export default async function ProductReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  // Merge Supabase data with legacy data
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    pros: product.pros && product.pros.length > 0 ? product.pros : reviewData.legacyProductData.pros,
    cons: product.cons && product.cons.length > 0 ? product.cons : reviewData.legacyProductData.cons,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  // Get affiliate URLs for both size variants
  const link12inch = product?.affiliateLinks.find(link => link.tag === '12-inch')
  const link9inch = product?.affiliateLinks.find(link => link.tag === '9-inch')

  const affiliateUrl = link12inch?.url || (product ? getPrimaryAffiliateLink(product) : '#')
  const variant9inchUrl = link9inch?.url || 'https://amzn.to/4oilO91'

  // Generate breadcrumbs
  const breadcrumbs = [
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
    category: productData.category,
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
            authorName={reviewData.hero.authorName}
            authorCredentials={reviewData.hero.authorCredentials}
            rating={reviewData.hero.rating}
            tierBadge={reviewData.hero.tierBadge}
            verdict={reviewData.hero.verdict}
            verdictStrong={reviewData.hero.verdictStrong}
            customCTA={
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 mt-0">{reviewData.whereToBuy.title}</h3>
                <p className="text-gray-700 mb-6">{reviewData.whereToBuy.introText}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-lg border-2 border-orange-300">
                    <h4 className="font-bold text-lg mb-2 text-gray-900 mt-0">12&quot; Tongs (Grilling)</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Perfect for grilling and keeping your hands away from heat. The standard professional length.
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-size-12inch`}
                      position="above_fold"
                      productSlug={reviewData.productSlug}
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 active:scale-95 text-center"
                      >
                        Check 12&quot; Price →
                      </a>
                    </CTAVisibilityTracker>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-lg border-2 border-orange-300">
                    <h4 className="font-bold text-lg mb-2 text-gray-900 mt-0">9&quot; Tongs (Sautéing)</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      More maneuverable for sautéing and stovetop cooking. Perfect for everyday kitchen tasks.
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-size-9inch`}
                      position="above_fold"
                      productSlug="winco-9-inch-tongs"
                      merchant="amazon"
                    >
                      <a
                        href={variant9inchUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 active:scale-95 text-center"
                      >
                        Check 9&quot; Price →
                      </a>
                    </CTAVisibilityTracker>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center mt-4">
                  {reviewData.whereToBuy.disclaimer}
                </p>
              </div>
            }
          />

          {/* SECTION 2: TESTING RESULTS */}
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections}
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

          {/* SECTION 7: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 8: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            customCTA={
              <div className="bg-white rounded-xl p-6">
                <CTAVisibilityTracker
                  ctaId={`${reviewData.productSlug}-bottom-line-cta`}
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

                {/* V2: TEXT LINK UNDER BUTTON */}
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

                <p className="text-xs text-slate-500 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases.
                </p>
              </div>
            }
          />

          {/* SECTION 9: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 10: AUTHOR BIO */}
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
