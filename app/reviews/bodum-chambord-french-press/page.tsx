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
  PerformanceAnalysis,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'

// Import review data
import { reviewData } from './bodum-chambord-french-press-data'

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
      canonical: 'https://www.chefapprovedtools.com/reviews/bodum-chambord-french-press',
    },
    openGraph: {
      title: reviewData.metadata.ogTitle,
      description: reviewData.metadata.ogDescription,
      url: 'https://www.chefapprovedtools.com/reviews/bodum-chambord-french-press',
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

export default async function BodumChambordFrenchPressReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  // Helper function to process inline affiliate links
  const processInlineLinks = (content: string) => {
    const parts = content.split(/(<LINK>|<\/LINK>)/)
    const elements: (string | JSX.Element)[] = []
    let isInsideLink = false
    let linkContent = ''
    let linkIndex = 0

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '<LINK>') {
        isInsideLink = true
        linkContent = ''
      } else if (parts[i] === '</LINK>') {
        isInsideLink = false
        elements.push(
          <a
            key={`inline-link-${linkIndex++}`}
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-orange-700 hover:text-orange-800 underline font-medium"
          >
            {linkContent}
          </a>
        )
        linkContent = ''
      } else if (isInsideLink) {
        linkContent += parts[i]
      } else if (parts[i]) {
        elements.push(parts[i])
      }
    }

    return elements
  }

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

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  // Generate schemas with correct fields
  const productSchema = generateProductSchema({
    // REQUIRED
    name: productData.name,
    slug: productData.slug,
    // HIGHLY RECOMMENDED
    description: productData.expertOpinion,
    brand: productData.brand,
    rating: productData.expertRating,
    reviewCount: 1,
    // GOOD FOR SEO
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
            ctaUrl={affiliateUrl}
            ctaText={reviewData.hero.ctaText}
            customCTA={(
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
            )}
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
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: processInlineLinks(section.content)
            }))}
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

          {/* SECTION 7: WHERE TO BUY */}
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
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition-all hover:scale-105 whitespace-nowrap w-full text-center"
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
                  <p className="text-xs text-slate-500 italic text-center m-0">*As an Amazon Associate, I earn from qualifying purchases</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-6 italic">
              {reviewData.whereToBuy.disclaimer}
            </p>
          </div>

          {/* SECTION 8: EMAIL CAPTURE */}
          <EmailCaptureSection
            title={reviewData.emailCapture.title}
            subtitle={reviewData.emailCapture.subtitle}
            inputPlaceholder={reviewData.emailCapture.inputPlaceholder}
            buttonText={reviewData.emailCapture.buttonText}
            finePrint={reviewData.emailCapture.finePrint}
          />

          {/* SECTION 9: BOTTOM LINE */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map(p => processInlineLinks(p))}
            ctaUrl={affiliateUrl}
            ctaText={reviewData.bottomLine.ctaText}
            customCTA={(
              <div className="text-center">
                <CTAVisibilityTracker ctaId="bottom-line-cta" position="final_cta">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    {reviewData.bottomLine.ctaText}
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
            )}
          />

          {/* SECTION 10: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

          {/* SECTION 11: AUTHOR BIO */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 pb-6 border-b border-gray-200">
                <Image 
                  src="/images/team/head-shot-1.jpg" 
                  alt="Scott Bradley, Professional Chef" 
                  width={100} 
                  height={100}
                  className="rounded-full"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 mt-0">About Scott Bradley</h3>
                  <p className="text-base text-slate-600 m-0">Professional Chef • 24 Years in Professional Kitchens</p>
                </div>
              </div>

              <div className="text-slate-600 leading-[1.8]">
                <p className="mb-4">
                  <strong>Scott Bradley brings 24 years of professional kitchen experience to Chef Approved Tools.</strong> His background includes roles at Purple Café (Pizzaiolo), Mellow Mushroom (Kitchen Manager), Il Pizzaiolo (Kitchen Manager), and Feierabend (Line Lead), giving him hands-on experience with equipment across different cuisines and volume levels.
                </p>

                <p className="mb-4">
                  Scott holds an A.A.S. in Culinary Arts from Seattle Central College and a B.S. in Business Administration from the University of Montana. This Bodum French Press has been his daily brewing method for 18 years—first alongside professional use at Purple Café, then continuing at home after leaving the restaurant.
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
                    Kitchen Manager, Pizzaiolo, Line Lead
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
