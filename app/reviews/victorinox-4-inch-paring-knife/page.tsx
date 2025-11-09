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
  TestingResultsGrid,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'
import AuthorBio from '@/components/review/AuthorBio'

// Import review data
import { reviewData } from './victorinox-4-inch-paring-knife-data'

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
      canonical: 'https://www.chefapprovedtools.com/reviews/victorinox-4-inch-paring-knife',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: 'https://www.chefapprovedtools.com/reviews/victorinox-4-inch-paring-knife',
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
  const link4inch = product?.affiliateLinks.find(link => link.tag === '4-inch')
  const link325inch = product?.affiliateLinks.find(link => link.tag === '3.25-inch')

  // Use tagged links if available, otherwise use primary for 4" and fallback for 3.25"
  const affiliateUrl4inch = link4inch?.url || (product ? getPrimaryAffiliateLink(product) : '#')
  const affiliateUrl325inch = link325inch?.url || 'https://amzn.to/4qN4b31'

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: "Knives", url: "https://www.chefapprovedtools.com/knives" },
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
                {/* Product Image */}
                <div className="mb-6">
                  <Image
                    src="/images/products/victorinox-4-inch-paring-knife/victorinox-4-inch-paring-knife-1.webp"
                    alt="Victorinox 4-inch Paring Knife"
                    width={800}
                    height={600}
                    className="rounded-lg w-full h-auto"
                    priority
                  />
                </div>

                {/* Size Selection */}
                <h3 className="text-xl font-bold mb-3 text-slate-900">{reviewData.sizeVariants.title}</h3>
                <p className="text-sm text-slate-600 mb-4">
                  {reviewData.sizeVariants.note}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* 4-inch variant */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-300">
                    <h3 className="font-bold text-base mb-2 text-gray-900">
                      {reviewData.sizeVariants.options[0].label}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      {reviewData.sizeVariants.options[0].description}
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-hero-4inch`}
                      position="above_fold"
                      productSlug={reviewData.productSlug}
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl4inch}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check 4&quot; Price →
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl4inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        → View 4&quot; {productData.name} on Amazon
                      </a>
                    </p>
                  </div>

                  {/* 3.25-inch variant */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-300">
                    <h3 className="font-bold text-base mb-2 text-gray-900">
                      {reviewData.sizeVariants.options[1].label}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      {reviewData.sizeVariants.options[1].description}
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-hero-325inch`}
                      position="above_fold"
                      productSlug="victorinox-3.25-inch-paring-knife"
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl325inch}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check 3.25&quot; Price →
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl325inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        → View 3.25&quot; version on Amazon
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases. Price and availability may change.
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
          {/* V2: Add inline product name links */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.performanceAnalysis.title}
            </h2>

            {reviewData.performanceAnalysis.sections.map((section, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-[1.4]">
                  {section.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {/* V2: Add inline product link in first section */}
                  {index === 0 ? (
                    <>
                      The{' '}
                      <a
                        href={affiliateUrl4inch}
                        className="text-orange-700 hover:text-orange-800 font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        {productData.name}
                      </a>
                      {' '}gives you complete control for detailed tasks. Sharp tip gets into tight spaces for deveining shrimp, removing tomato cores, or hulling strawberries. Comfortable to hold for extended precision work.
                    </>
                  ) : index === 3 ? (
                    <>
                      From managing kitchen operations at Mellow Mushroom to working the line at fine dining restaurants, I&apos;ve used{' '}
                      <a
                        href={affiliateUrl4inch}
                        className="text-orange-700 hover:text-orange-800 font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        this knife
                      </a>
                      {' '}to devein hundreds of shrimp per shift, peel and trim vegetables for garnishes, remove silver skin from tenderloins, hull strawberries for dessert prep, and trim fat and connective tissue from proteins. These knives take abuse in a professional kitchen. At this price, I don&apos;t worry about replacing them when needed. But honestly, with basic care, they last for years.
                    </>
                  ) : (
                    section.content
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* V2: COMPARISON TABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              {reviewData.comparisonTable.title}
            </h2>

            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-slate-300 p-3 text-left text-white font-semibold">Feature</th>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <th
                        key={index}
                        className={`border border-slate-300 p-3 text-left text-white font-semibold ${
                          competitor.highlight ? 'bg-orange-600' : ''
                        }`}
                      >
                        {competitor.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Price Range</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.priceRange}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Blade Material</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.bladeMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Handle Material</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.handleMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Country of Origin</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.origin}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Out-of-Box Sharpness</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.sharpness}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Edge Retention</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.edgeRetention}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Ergonomics</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.ergonomics}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Professional Use Rating</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.professionalRating}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-semibold bg-gray-50">Warranty</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 ${
                          competitor.highlight ? 'bg-orange-50' : ''
                        }`}
                      >
                        {competitor.warranty}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-slate-300 p-3 font-semibold">Best For</td>
                    {reviewData.comparisonTable.competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={`border border-slate-300 p-3 font-semibold ${
                          competitor.highlight ? 'bg-green-200' : ''
                        }`}
                      >
                        {competitor.bestFor}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-600 mt-4 italic">
              <strong>My Verdict:</strong> {reviewData.comparisonTable.verdict}
            </p>
          </div>

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

            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50 mb-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">
                  4&quot; Blade - Most Versatile
                </h3>
                <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
              </div>

              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-where-to-buy-4inch`}
                position="mid_article"
                productSlug={reviewData.productSlug}
                merchant="amazon"
              >
                <a
                  href={affiliateUrl4inch}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                >
                  Check 4&quot; Price on Amazon →
                </a>
              </CTAVisibilityTracker>

              {/* V2: TEXT LINK UNDER BUTTON */}
              <p className="text-center mt-3 text-sm">
                <a
                  href={affiliateUrl4inch}
                  className="text-orange-700 hover:text-orange-800 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  → View 4&quot; {productData.name} on Amazon
                </a>
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-orange-50">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">
                  3.25&quot; Blade - Extra Control
                </h3>
                <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
              </div>

              <CTAVisibilityTracker
                ctaId={`${reviewData.productSlug}-where-to-buy-325inch`}
                position="mid_article"
                productSlug="victorinox-3.25-inch-paring-knife"
                merchant="amazon"
              >
                <a
                  href={affiliateUrl325inch}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-lg shadow-lg hover:shadow-xl"
                >
                  Check 3.25&quot; Price on Amazon →
                </a>
              </CTAVisibilityTracker>

              {/* V2: TEXT LINK UNDER BUTTON */}
              <p className="text-center mt-3 text-sm">
                <a
                  href={affiliateUrl325inch}
                  className="text-orange-700 hover:text-orange-800 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  → View 3.25&quot; version on Amazon
                </a>
              </p>
            </div>

            <p className="text-sm text-slate-600 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 9: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 10: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs}
            customCTA={
              <div className="bg-white rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* 4-inch CTA */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-2 text-center">
                      4&quot; Blade (Most Versatile)
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-bottom-line-4inch`}
                      position="final_cta"
                      productSlug={reviewData.productSlug}
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl4inch}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check 4&quot; Price →
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl4inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        → Check Price on Amazon
                      </a>
                    </p>
                  </div>

                  {/* 3.25-inch CTA */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-2 text-center">
                      3.25&quot; Blade (Extra Control)
                    </p>
                    <CTAVisibilityTracker
                      ctaId={`${reviewData.productSlug}-bottom-line-325inch`}
                      position="final_cta"
                      productSlug="victorinox-3.25-inch-paring-knife"
                      merchant="amazon"
                    >
                      <a
                        href={affiliateUrl325inch}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 text-center text-base shadow-lg hover:shadow-xl"
                      >
                        Check 3.25&quot; Price →
                      </a>
                    </CTAVisibilityTracker>
                    {/* V2: TEXT LINK UNDER BUTTON */}
                    <p className="text-center mt-2 text-sm">
                      <a
                        href={affiliateUrl325inch}
                        className="text-orange-700 hover:text-orange-800 underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        → Check Price on Amazon
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 text-center mt-3">
                  As an Amazon Associate, I earn from qualifying purchases.
                </p>
              </div>
            }
          />

          {/* SECTION 11: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 12: AUTHOR BIO */}
          <AuthorBio />

        </div>
      </div>
    </>
  )
}
