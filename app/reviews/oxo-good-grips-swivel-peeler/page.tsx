import { Metadata } from 'next'
import Image from 'next/image'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import FTCDisclosure from '@/components/FTCDisclosure'
import { reviewData } from './oxo-good-grips-swivel-peeler-data'

// ISR configuration - revalidate every hour
export const revalidate = 3600
export const fetchCache = 'force-cache'

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/oxo-good-grips-swivel-peeler',
    },
    title: reviewData.metadata.title,
    description: reviewData.metadata.description,
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/oxo-good-grips-swivel-peeler',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "OXO Good Grips Swivel Peeler Review",
        rating: reviewData.hero.rating,
        testingPeriod: reviewData.metadata.testingPeriod,
        tier: reviewData.metadata.tier
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      images: [generateOGImageURL({
        title: "OXO Good Grips Swivel Peeler Review",
        rating: reviewData.hero.rating,
        testingPeriod: reviewData.metadata.testingPeriod,
        tier: reviewData.metadata.tier
      })],
    },
  }
}

export default async function OXOGoodGripsSwivelPeelerReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    affiliateLinks: product.affiliateLinks.length > 0 ? product.affiliateLinks : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={reviewData.metadata.tier}
        testingPeriod={reviewData.tracking.testingPeriod}
        rating={reviewData.hero.rating}
        hook={reviewData.tracking.hook}
        category={productData.category}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">{reviewData.hero.badge}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {reviewData.hero.title}
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            {reviewData.hero.subtitle}
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>{reviewData.hero.rating}/5</span>
            </div>
            {reviewData.hero.tags.map((tag, index) => (
              <div key={index}>{tag}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Product Images */}
        <div className="mb-8">
          <Image
            src="/images/products/oxo-good-grips-swivel-peeler/oxo-good-grips-swivel-peeler-1.webp"
            alt="OXO Good Grips Swivel Peeler"
            width={1000}
            height={1500}
            className="rounded-lg w-full h-auto max-w-2xl mx-auto"
            priority
          />
        </div>

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">{reviewData.quickVerdict.title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {reviewData.quickVerdict.text}
          </p>
        </div>

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

          <div className="space-y-6">
            {reviewData.whatMakesItWork.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Real Restaurant Use */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.realRestaurantUse.title}</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="font-semibold">
              {reviewData.realRestaurantUse.intro}
            </p>

            <ul className="space-y-2 mt-4">
              {reviewData.realRestaurantUse.uses.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>

            <p className="mt-6">
              {reviewData.realRestaurantUse.conclusion}
            </p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Honest Assessment</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-900">What Works</h3>
              <ul className="space-y-2 text-gray-700">
                {productData.pros.map((pro, index) => (
                  <li key={index}>✓ {pro}</li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">Limitations</h3>
              <ul className="space-y-2 text-gray-700">
                {productData.cons.map((con, index) => (
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
            <h3 className="text-xl font-bold mb-3 text-gray-900">Perfect If You:</h3>
            <ul className="space-y-2 text-gray-700">
              {reviewData.whoShouldBuy.perfectFor.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip If You:</h3>
            <ul className="space-y-2 text-gray-700">
              {reviewData.whoShouldBuy.skipIf.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Care & Maintenance */}
        <section className="mb-12 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.careAndMaintenance.title}</h2>

          <div className="space-y-4 text-gray-700">
            {reviewData.careAndMaintenance.sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-2">{section.title}</h3>
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{reviewData.buySection.title}</h2>

          <p className="text-lg text-gray-700 mb-6">
            {reviewData.buySection.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
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
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {reviewData.buySection.ctaText}
              </a>
            </CTAVisibilityTracker>

            <a
              href="/reviews"
              className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              See All Reviews
            </a>
          </div>

          {/* Text link fallback */}
          <p className="text-center mt-3 text-sm">
            <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
              target="_blank" rel="noopener noreferrer sponsored">
              → View {productData.name} on Amazon
            </a>
          </p>

          <p className="text-sm text-gray-600 mt-4">
            {reviewData.buySection.note}
          </p>
        </section>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testimonials" className="text-orange-600 hover:text-orange-800">User Reviews</a>
            <span className="text-slate-400">|</span>
            <a href="#cost-analysis" className="text-orange-600 hover:text-orange-800">Cost Analysis</a>
            <span className="text-slate-400">|</span>
            <a href="#performance" className="text-orange-600 hover:text-orange-800">Performance</a>
            <span className="text-slate-400">|</span>
            <a href="#comparison" className="text-orange-600 hover:text-orange-800">vs. Competitors</a>
            <span className="text-slate-400">|</span>
            <a href="#specs" className="text-orange-600 hover:text-orange-800">Specifications</a>
            <span className="text-slate-400">|</span>
            <a href="#faq" className="text-orange-600 hover:text-orange-800">FAQ</a>
          </div>
        </nav>

        {/* Testimonials */}
        <section className="mb-12" id="testimonials">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.testimonials.title}</h2>
          <p className="text-sm text-slate-600 mb-4 italic">
            {reviewData.testimonials.subtitle}
          </p>

          <div className="space-y-4">
            {reviewData.testimonials.reviews.map((review, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-slate-700 mb-2">
                  &quot;{review.quote}&quot;
                </p>
                <p className="text-sm text-slate-500">— Amazon verified purchaser ({review.author})</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <p className="text-slate-800 text-center mb-4 font-semibold">
              Ready to experience the OXO difference? See current pricing and availability:
            </p>
            <div className="flex justify-center">
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
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {reviewData.buySection.ctaText}
                </a>
              </CTAVisibilityTracker>
            </div>
            {/* Text link fallback */}
            <p className="text-center mt-3 text-sm">
              <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
                target="_blank" rel="noopener noreferrer sponsored">
                → View {productData.name} on Amazon
              </a>
            </p>
          </div>
        </section>

        {/* Cost Analysis */}
        <section className="mb-12" id="cost-analysis">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.costAnalysis.title}</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-4">
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.costAnalysis.realWorldValue.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.costAnalysis.realWorldValue.items.map((item, index) => (
                  <li key={index}>• <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</li>
                ))}
              </ul>
            </div>

            <p className="text-slate-700 mb-4">
              <strong>Value comparison:</strong> {reviewData.costAnalysis.comparison}
            </p>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-slate-800 font-semibold">
                {reviewData.costAnalysis.bottomLine}
              </p>
            </div>
          </div>
        </section>

        {/* Performance Data */}
        <section className="mb-12" id="performance">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.performanceData.title}</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reviewData.performanceData.categories.map((category, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-slate-900 mb-2">{category.title}</p>
                  <p className="text-slate-700 text-sm">
                    {category.metrics.map((metric, metricIndex) => (
                      <span key={metricIndex}>
                        <strong>{metric.label}:</strong> {metric.value}
                        {metricIndex < category.metrics.length - 1 && <><br/></>}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mt-4">
              <p className="text-slate-800">
                <strong>{reviewData.performanceData.keyInsight}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="mb-12" id="specs">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.specifications.title}</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Technical Specifications</h3>
                <dl className="space-y-2 text-sm">
                  {reviewData.specifications.technical.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                      <dt className="text-slate-600">{spec.label}:</dt>
                      <dd className="font-semibold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Physical Dimensions</h3>
                <dl className="space-y-2 text-sm">
                  {reviewData.specifications.physical.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                      <dt className="text-slate-600">{spec.label}:</dt>
                      <dd className="font-semibold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-12" id="comparison">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {reviewData.comparison.title}
          </h2>

          <div className="overflow-x-auto my-5">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {reviewData.comparison.headers.map((header, index) => (
                    <th key={index} className={`p-3 text-left border-b-2 border-gray-300 ${index === 1 ? 'bg-orange-50' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reviewData.comparison.rows.map((row, index) => (
                  <tr key={index}>
                    <td className="p-3 border-b border-gray-300 font-semibold">{row.feature}</td>
                    <td className="p-3 border-b border-gray-300 bg-orange-50">{row.oxo}</td>
                    <td className="p-3 border-b border-gray-300">{row.kuhnRikon}</td>
                    <td className="p-3 border-b border-gray-300">{row.oxoY}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-6">
            <h3 className="font-bold text-slate-900 mb-3">{reviewData.comparison.guidance.title}</h3>
            <ul className="space-y-3 text-slate-700">
              {reviewData.comparison.guidance.options.map((option, index) => (
                <li key={index}>
                  <strong>{option.title}</strong> {option.description}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12" id="faq">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{reviewData.faq.title}</h2>
          <div className="space-y-4">
            {reviewData.faq.items.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-slate-700">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <p className="text-slate-800 text-center mb-4 font-semibold">
              Ready to upgrade your kitchen prep? Get the OXO Good Grips Swivel Peeler today:
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
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {reviewData.buySection.ctaText}
                </a>
              </CTAVisibilityTracker>
            </div>
            {/* Text link fallback */}
            <p className="text-center mt-3 text-sm">
              <a href={affiliateUrl} className="text-orange-700 hover:text-orange-800 underline font-medium"
                target="_blank" rel="noopener noreferrer sponsored">
                → View {productData.name} on Amazon
              </a>
            </p>
          </div>
        </section>

        {/* Structured Data Schemas */}
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
  )
}
