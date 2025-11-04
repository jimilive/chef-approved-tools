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
import { reviewData, specifications, comparisonTable } from './black-decker-toaster-oven-data'

// Use ISR for better performance
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
      canonical: 'https://www.chefapprovedtools.com/reviews/black-decker-toaster-oven',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: 'https://www.chefapprovedtools.com/reviews/black-decker-toaster-oven',
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

export default async function BlackDeckerToasterOvenReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  // Merge Supabase data with legacy data (Supabase takes priority, but preserve legacy pros/cons if Supabase is empty)
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

  // Helper function to convert <LINK> tags to affiliate links
  const processInlineLinks = (content: string) => {
    const parts = content.split(/(<LINK>|<\/LINK>)/)
    const elements: (string | JSX.Element)[] = []
    let inLink = false
    let linkCounter = 0

    parts.forEach((part, index) => {
      if (part === '<LINK>') {
        inLink = true
      } else if (part === '</LINK>') {
        inLink = false
      } else if (part && inLink) {
        linkCounter++
        elements.push(
          <a
            key={`inline-link-${linkCounter}`}
            href={affiliateUrl}
            className="text-orange-700 hover:text-orange-800 font-medium no-underline"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            {part}
          </a>
        )
      } else if (part) {
        elements.push(part)
      }
    })

    return elements
  }

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  // Generate schemas
  const productSchema = generateProductSchema({
    // Required
    name: productData.name,
    slug: productData.slug,

    // Highly recommended
    description: productData.expertOpinion,
    brand: productData.brand,
    rating: productData.expertRating,
    reviewCount: 1,

    // Good for SEO
    model: productData.model,
    category: productData.category,
    dateAdded: productData.dateAdded,
    lastUpdated: productData.lastUpdated,
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
                <CTAVisibilityTracker
                  ctaId="hero-cta"
                  position="above_fold"
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
                  As an Amazon Associate, I earn from qualifying purchases. Price and availability may change.
                </p>
              </div>
            }
          />

          {/* SECTION 2: TESTING RESULTS */}
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '')}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '')}</>
            }))}
          />

          {/* SECTION 4: COMPARISON TABLE (Inline) */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {comparisonTable.title}
            </h2>

            <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="text-white text-left px-4 py-4 font-semibold text-[15px]">Feature</th>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <th key={idx} className="text-white text-left px-4 py-4 font-semibold text-[15px]">
                        {competitor.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Price Range</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className={`px-4 py-4 text-[15px] ${idx === 0 ? 'text-orange-700 font-semibold' : 'text-slate-600'}`}>
                        {competitor.priceRange}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Capacity</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className="px-4 py-4 text-slate-600 text-[15px]">
                        {competitor.capacity}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Power</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className="px-4 py-4 text-slate-600 text-[15px]">
                        {competitor.power}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Controls</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className="px-4 py-4 text-slate-600 text-[15px]">
                        {competitor.controls}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Expected Lifespan</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className={`px-4 py-4 text-[15px] ${idx === 0 ? 'text-green-700 font-semibold' : 'text-slate-600'}`}>
                        {competitor.expectedLifespan}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Warranty</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className="px-4 py-4 text-slate-600 text-[15px]">
                        {competitor.warranty}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Best For</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className="px-4 py-4 text-slate-600 text-[15px]">
                        {competitor.bestFor}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">Value Rating</td>
                    {comparisonTable.competitors.map((competitor, idx) => (
                      <td key={idx} className={`px-4 py-4 text-[15px] ${idx === 0 ? 'text-green-700 font-semibold' : 'text-slate-600'}`}>
                        {competitor.valueRating}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 leading-relaxed mb-0">
              <strong>Bottom line:</strong> {comparisonTable.bottomLine}
            </p>
          </div>

          {/* SECTION 5: SPECIFICATIONS (Inline) */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]" id="specs">
              {specifications.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">{specifications.technical.title}</h3>
                <dl className="space-y-2 text-sm">
                  {Object.entries(specifications.technical.specs).map(([key, value], idx, arr) => (
                    <div key={key} className={`flex justify-between ${idx < arr.length - 1 ? 'border-b border-gray-100 pb-2' : ''}`}>
                      <dt className="text-slate-600">{key}:</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">{specifications.physical.title}</h3>
                <dl className="space-y-2 text-sm">
                  {Object.entries(specifications.physical.dimensions).map(([key, value], idx, arr) => (
                    <div key={key} className={`flex justify-between ${idx < arr.length - 1 ? 'border-b border-gray-100 pb-2' : ''}`}>
                      <dt className="text-slate-600">{key}:</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
              <p className="text-slate-800 text-sm mb-0">
                <strong>💡 Space Requirements:</strong> {specifications.spaceRequirements}
              </p>
            </div>
          </div>

          {/* SECTION 6: PROS & CONS */}
          <ProsConsGrid
            title={reviewData.prosConsTitle}
            prosTitle={reviewData.prosTitle}
            consTitle={reviewData.consTitle}
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* SECTION 7: WHO SHOULD BUY */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
          />

          {/* SECTION 8: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 9: WHERE TO BUY */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.whereToBuy.title}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {reviewData.whereToBuy.introText}
            </p>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
                    <p className="text-sm text-slate-600 m-0">Prime shipping, verified reviews, easy returns</p>
                  </div>
                  <CTAVisibilityTracker ctaId="where-to-buy-amazon" position="mid_article">
                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition-all hover:scale-105 whitespace-nowrap w-full text-center"
                    >
                      Check Price on Amazon →
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
                  <p className="text-xs text-slate-500 italic text-center m-0">*As an Amazon Associate, I earn from qualifying purchases</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 10: EMAIL CAPTURE */}
          <EmailCaptureSection
            title={reviewData.emailCapture.title}
            subtitle={reviewData.emailCapture.subtitle}
            inputPlaceholder={reviewData.emailCapture.inputPlaceholder}
            buttonText={reviewData.emailCapture.buttonText}
            finePrint={reviewData.emailCapture.finePrint}
          />

          {/* SECTION 11: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map((para, idx) => (
              <span key={`bottom-para-${idx}`}>{processInlineLinks(para)}</span>
            ))}
            customCTA={
              <div className="bg-white rounded-xl p-6">
                <CTAVisibilityTracker
                  ctaId="bottom-line-cta"
                  position="final_cta"
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

          {/* SECTION 12: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 13: AUTHOR BIO */}
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
