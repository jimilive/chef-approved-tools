import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import SizeSelector from '@/components/SizeSelector'
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

// Import custom sections
import SafetySection from '@/components/review/custom/SafetySection'
import CompatibilityGuide from '@/components/review/custom/CompatibilityGuide'

// Import review data
import { reviewData } from './benriner-large-mandoline-data'

// Use ISR for better performance - revalidate every hour for price changes
export const revalidate = 3600 // 1 hour in seconds

// Enable fetch caching for Supabase requests
export const fetchCache = 'force-cache'

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug(reviewData.productSlug)
  const productData = product || reviewData.legacyProductData

  return {
    title: reviewData.metadata.title,
    description: reviewData.metadata.description,
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/benriner-large-mandoline',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: 'https://www.chefapprovedtools.com/reviews/benriner-large-mandoline',
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

export default async function BenrinerLargeMandolineReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

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

  // Get primary affiliate link (for Large size)
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  // Generate schemas
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

          {/* SECTION 1: HERO - Includes LCP-optimized verdict */}
          <ReviewHero
            title={reviewData.hero.title}
            authorName={reviewData.hero.authorName}
            authorCredentials={reviewData.hero.authorCredentials}
            rating={reviewData.hero.rating}
            tierBadge={reviewData.hero.tierBadge}
            verdict={reviewData.hero.verdict}
            verdictStrong={reviewData.hero.verdictStrong}
            customCTA={
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6 min-h-[280px]">
                <SizeSelector
                  title="Choose Your Size:"
                  options={[
                    {
                      id: 'large',
                      label: 'Large',
                      description: 'Professional size, handles big vegetables. Includes hand guard.',
                      affiliateUrl: affiliateUrl,
                      ctaId: 'hero-cta-large'
                    },
                    {
                      id: 'medium',
                      label: 'Original',
                      description: 'Compact size with 3 julienne blade inserts. Includes hand guard.',
                      affiliateUrl: 'https://amzn.to/4hG8jO6',
                      ctaId: 'hero-cta-medium'
                    }
                  ]}
                  defaultSize="large"
                  ctaText={reviewData.hero.ctaText || 'Check Price on Amazon →'}
                  ctaPosition="above_fold"
                  showDisclosure={true}
                />
                {/* V2: TEXT LINKS UNDER SIZE SELECTOR */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-sm">
                    <a
                      href={affiliateUrl}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      → View Large {productData.name} on Amazon
                    </a>
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://amzn.to/4hG8jO6"
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      → View Original Benriner on Amazon
                    </a>
                  </p>
                </div>
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

          {/* CUSTOM SECTION: SAFETY - Critical for mandoline */}
          <SafetySection
            title="Safety: Respect the Blade"
            warnings={reviewData.safety.warnings}
            guidelines={reviewData.safety.guidelines}
          />

          {/* CUSTOM SECTION: COMPATIBILITY GUIDE - Vegetable guide */}
          <CompatibilityGuide
            title="What Works Best: Vegetable Compatibility Guide"
            categories={reviewData.compatibility.categories}
          />

          {/* SECTION 5: PROS & CONS */}
          <ProsConsGrid
            title={reviewData.prosConsTitle}
            prosTitle={reviewData.prosTitle}
            consTitle={reviewData.consTitle}
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* SECTION 6: WHO SHOULD BUY */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
          />

          {/* Size considerations box */}
          {reviewData.whoShouldBuy.sizing && (
            <div className="bg-white rounded-2xl px-6 pt-0 pb-12 md:px-12 shadow-sm mb-6 -mt-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h4 className="text-base font-semibold text-amber-900 mb-3 mt-0">💡 {reviewData.whoShouldBuy.sizing.title}</h4>
                {reviewData.whoShouldBuy.sizing.options.map((option, index) => (
                  <p key={index} className={`text-sm text-amber-900 ${index < reviewData.whoShouldBuy.sizing.options.length - 1 ? 'mb-2' : 'mb-0'}`}>
                    <strong>{option.name}:</strong> {option.note}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 7: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 8: WHERE TO BUY */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.whereToBuy.title}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {reviewData.whereToBuy.introText}
            </p>

            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50 min-h-[280px]">
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
                  <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
                </div>
                <SizeSelector
                  title="Choose Your Size:"
                  options={[
                    {
                      id: 'large',
                      label: 'Large',
                      description: 'Professional size, handles big vegetables. Includes hand guard.',
                      affiliateUrl: affiliateUrl,
                      ctaId: 'where-to-buy-large'
                    },
                    {
                      id: 'medium',
                      label: 'Original',
                      description: 'Compact size with 3 julienne blade inserts. Includes hand guard.',
                      affiliateUrl: 'https://amzn.to/4hG8jO6',
                      ctaId: 'where-to-buy-medium'
                    }
                  ]}
                  defaultSize="large"
                  ctaText="Check Price on Amazon →"
                  ctaPosition="mid_article"
                  showDisclosure={true}
                />
                {/* V2: TEXT LINKS UNDER SIZE SELECTOR */}
                <div className="text-center space-y-1">
                  <p className="text-sm">
                    <a
                      href={affiliateUrl}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      → View Large {productData.name} on Amazon
                    </a>
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://amzn.to/4hG8jO6"
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      → View Original Benriner on Amazon
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 9: EMAIL CAPTURE */}
          <EmailCaptureSection
            title={reviewData.emailCapture.title}
            subtitle={reviewData.emailCapture.subtitle}
            inputPlaceholder={reviewData.emailCapture.inputPlaceholder}
            buttonText={reviewData.emailCapture.buttonText}
            finePrint={reviewData.emailCapture.finePrint}
          />

          {/* SECTION 10: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            customCTA={
              <div className="bg-white rounded-xl p-6 min-h-[280px]">
                <SizeSelector
                  title="Choose Your Size:"
                  options={[
                    {
                      id: 'large',
                      label: 'Large',
                      description: 'Professional size, handles big vegetables. Includes hand guard.',
                      affiliateUrl: affiliateUrl,
                      ctaId: 'bottom-line-large'
                    },
                    {
                      id: 'medium',
                      label: 'Original',
                      description: 'Compact size with 3 julienne blade inserts. Includes hand guard.',
                      affiliateUrl: 'https://amzn.to/4hG8jO6',
                      ctaId: 'bottom-line-medium'
                    }
                  ]}
                  defaultSize="large"
                  ctaText={reviewData.bottomLine.ctaText || 'Check Price on Amazon →'}
                  ctaPosition="final_cta"
                  showDisclosure={true}
                />
                {/* V2: TEXT LINKS UNDER SIZE SELECTOR */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-sm">
                    <a
                      href={affiliateUrl}
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      → View Large {productData.name} on Amazon
                    </a>
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://amzn.to/4hG8jO6"
                      className="text-orange-700 hover:text-orange-800 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      → View Original Benriner on Amazon
                    </a>
                  </p>
                </div>
              </div>
            }
          />

          {/* SECTION 11: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 12: AUTHOR BIO */}
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
