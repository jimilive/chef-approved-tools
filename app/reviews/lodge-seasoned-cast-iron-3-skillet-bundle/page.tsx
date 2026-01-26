import Link from 'next/link'
import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import AmazonCTA from '@/components/AmazonCTA'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import ReviewLayout from '@/components/review/ReviewLayout'
import {
  ReviewHero,
  TestingResultsGrid,
  TestingStory,
  PerformanceAnalysis,
  RealWorldUseCases,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  EmailCaptureSection,
  BottomLineSection,
  RelatedProductsGrid
} from '@/components/review'

// Import review data
import { reviewData } from './lodge-seasoned-cast-iron-3-skillet-bundle-data'
import { getCastIronComparison } from './get-cast-iron-comparison'

const PRODUCT_SLUG = 'lodge-seasoned-cast-iron-3-skillet-bundle'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('lodge-seasoned-cast-iron-3-skillet-bundle')
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
          url: getProductOgImage(PRODUCT_SLUG),
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
      images: [getProductOgImage(PRODUCT_SLUG)],
    },
  }
}

// Helper function to process inline product links
function processInlineLinks(text: string, affiliateUrl: string, productName: string): (string | JSX.Element)[] {
  const parts = text.split(/(<LINK>.*?<\/LINK>)/g)
  return parts.map((part, index) => {
    if (part.startsWith('<LINK>') && part.endsWith('</LINK>')) {
      const linkText = part.slice(6, -7)
      return (
        <a
          key={index}
          href={affiliateUrl}
          className="text-orange-700 hover:text-orange-800 font-medium no-underline hover:underline"
          target="_blank"
          rel="nofollow noopener noreferrer sponsored"
        >
          {linkText}
        </a>
      )
    }
    return part
  })
}

export default async function LodgeCastIronReviewPage() {
  // Get product data from Supabase
  const product = await getProductBySlug(reviewData.productSlug)

  // Get git dates for this review
  const gitDates = getReviewGitDates('lodge-seasoned-cast-iron-3-skillet-bundle')

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product?.category || '')

  if (!product) {
    throw new Error(`Product not found in Supabase: ${reviewData.productSlug}`)
  }

  // Get comparison data with live affiliate links from database
  const castIronComparison = await getCastIronComparison()

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

  // Get primary affiliate link
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  return (
    <ReviewLayout
      product={product}
      slug={PRODUCT_SLUG}
      affiliateUrl={affiliateUrl}
      gitDates={gitDates}
      categoryBreadcrumb={categoryBreadcrumb}
      faqData={reviewData.faqData}
      tier={reviewData.metadata.tier as 1 | 2 | 3}
      testingPeriod={reviewData.tracking.testingPeriod}
      hook={reviewData.tracking.hook}
      backLinkHref="/cookware-and-bakeware"
      backLinkText="Browse all Cookware & Bakeware"
    >
      {/* SECTION 1: HERO */}
          <ReviewHero
            title={reviewData.hero.title}
            authorName={reviewData.hero.authorName}
            authorCredentials={reviewData.hero.authorCredentials}
            rating={productData.expertRating ?? reviewData.hero.rating}
            tierBadge={getTierBadge('lodge-seasoned-cast-iron-3-skillet-bundle')}
            verdict={reviewData.hero.verdict}
            verdictStrong={reviewData.hero.verdictStrong}
            publishedDate={gitDates.firstPublished}
            lastUpdated={gitDates.lastUpdated}
            heroImage={getProductHeroImage(PRODUCT_SLUG)}
            productName={product.name}
            ctaUrl={affiliateUrl}
            valueHighlights="💰 Outstanding Value Investment | ✔ Pre-Seasoned | ✔ Made in USA | ✔ 3 Versatile Sizes"
          />

          {/* CUSTOM SECTION: SKILLET SPECIFICATIONS */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              3-Skillet Bundle Specifications
            </h2>
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Skillet Size</th>
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Weight</th>
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Cooking Surface</th>
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Capacity</th>
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Best For</th>
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Value Note</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.skilletSpecs.map((skillet, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border border-slate-300 p-3 font-medium text-slate-900">{skillet.size}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.weight}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.cookingSurface}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.capacity}</td>
                      <td className="border border-slate-300 p-3 text-slate-700">{skillet.bestFor}</td>
                      <td className="border border-slate-300 p-3 text-green-700 font-semibold">{skillet.valueNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-700 mt-4 italic">
              All three sizes used equally in testing. The 12-inch is most versatile if buying only one.
            </p>
          </div>

          {/* SECTION 5: TESTING RESULTS */}
          <TestingResultsGrid
            title={reviewData.testingResults.title}
            sections={reviewData.testingResults.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
            testingEnvironment={reviewData.testingResults.testingEnvironment}
            outstandingPerformance={reviewData.testingResults.outstandingPerformance}
            minorConsiderations={reviewData.testingResults.minorConsiderations}
          />

          {/* SECTION 6: TESTING STORY (E-E-A-T) */}
          <TestingStory
            title="My 7-Year Home Testing Journey"
            paragraphs={[
              "When I first bought this Lodge 3-skillet set in 2017, I was curious how it would hold up to daily home cooking. Seven years later, I have my answer: these skillets have become the most-used cookware in my kitchen.",
              "The first year was a learning curve. I made every cast iron mistake: leaving water in the pan, using too much soap, not preheating properly. But unlike cheaper alternatives that would have rusted or warped, these Lodge skillets forgave my errors. The seasoning rebuilt, the surface stayed flat, and the performance actually improved with use.",
              "Now, after cooking thousands of meals, these skillets have developed the kind of natural non-stick surface that takes years to build. My 12-inch is my go-to for everything from Sunday morning pancakes to weeknight stir-fries. The 10-inch lives on the stovetop for quick sautés. And the 8-inch is perfect for single-serving frittatas and melting butter."
            ]}
          />

          {/* CTA #2 - SOFT TEXT LINK */}
          <div className="text-center my-8">
            <AmazonCTA
              productSlug={productData.slug}
              affiliateUrl={affiliateUrl}
              position="mid_article"
              variant="textLink"
            />
          </div>

          {/* SECTION 3: PERFORMANCE ANALYSIS */}
          <PerformanceAnalysis
            title={reviewData.performanceAnalysis.title}
            sections={reviewData.performanceAnalysis.sections.map(section => ({
              ...section,
              content: <>{processInlineLinks(typeof section.content === 'string' ? section.content : '', affiliateUrl, productData.name)}</>
            }))}
          />

          {/* CUSTOM SECTION: COOKING PERFORMANCE TABLE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Cooking Technique Performance Analysis
            </h2>
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Cooking Technique</th>
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Performance Rating</th>
                    <th className="border border-slate-600 p-3 text-left text-white font-semibold">Testing Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.cookingTests.map((test, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border border-slate-300 p-3 font-medium text-slate-900">{test.technique}</td>
                      <td className="border border-slate-300 p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-700">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < test.performance ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                          <span className="text-sm text-slate-700">({test.performance}/5)</span>
                        </div>
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">{test.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-700 mt-4 italic">
              All performance ratings based on 7 years of weekly home testing.
            </p>
          </div>

          {/* CUSTOM SECTION: SEASONING GUIDE */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
              Professional Seasoning & Maintenance Guide
            </h2>
            <p className="text-slate-700 mb-6">
              Proper seasoning maintenance is crucial for cast iron performance. Here&apos;s the professional approach developed over years of restaurant use:
            </p>
            <div className="space-y-4">
              {reviewData.seasoningGuide.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-800">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.step}</h3>
                    <p className="text-sm text-slate-700">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-700 mt-6">
              <strong>Maintenance Reality After 7 Years:</strong> If you use cast iron regularly, the cooking
              process maintains seasoning naturally. You don&apos;t need constant oven-seasoning. Regular cooking
              with fats builds seasoning over time. The critical rule: <strong>Never leave water or acidic products
              in or on the skillet.</strong> This is the #1 cause of seasoning damage and rust.
            </p>
          </div>

          {/* SECTION 9: REAL-WORLD USE CASES (E-E-A-T) */}
          <RealWorldUseCases
            title="How I Actually Use These Skillets"
            subtitle="After 7 years and thousands of meals, here are the scenarios where this set truly shines."
            useCases={[
              {
                title: "Weekend Breakfast Service",
                description: "Sunday mornings, I run all three skillets simultaneously. The 12-inch handles bacon in batches, the 10-inch cooks eggs, and the 8-inch melts butter for pancakes on the griddle. This is where the bundle really proves its value. You're essentially running a breakfast line.",
                bullets: [
                  "All three pans heat evenly and hold temperature",
                  "The 12-inch fits 4-5 strips of bacon per batch comfortably",
                  "Pre-heating for 5 minutes gives perfect cooking temperature"
                ]
              },
              {
                title: "High-Heat Searing",
                description: "For steaks, pork chops, or getting a hard sear on vegetables, nothing in my kitchen matches the 12-inch Lodge. I preheat it for 10 minutes on medium-high, then crank to high for the sear. The thermal mass holds temperature even when cold meat hits the surface.",
                bullets: [
                  "Achieves 500°F+ surface temperature safely",
                  "Restaurant-quality crust on proteins",
                  "Works identically on gas, electric, or induction"
                ]
              },
              {
                title: "Stovetop-to-Oven Cooking",
                description: "The 10-inch has become my frittata pan. Start eggs on the stovetop, finish under the broiler, no pan transfer needed. Same goes for cornbread and roasted vegetables. The smooth transition eliminates the need for multiple pans.",
                bullets: [
                  "Handles 500°F oven without issues",
                  "Broiler-safe for finishing dishes",
                  "Perfect for one-pan recipes"
                ]
              },
              {
                title: "Baking and Desserts",
                description: "The 8-inch is surprisingly versatile for single-serving desserts. Skillet brownies, individual cobblers, and the famous skillet cookie all work beautifully. The even heat distribution eliminates the burned-bottom, raw-center problem of thinner pans.",
                bullets: [
                  "Even browning on baked goods",
                  "Retains heat for tableside serving",
                  "Perfect portion size for 2-3 people"
                ]
              }
            ]}
          />

          {/* SECTION 10: COMPARISON TABLE */}
          <ProductComparisonTable
            title={castIronComparison.title}
            subtitle={castIronComparison.subtitle}
            products={castIronComparison.products}
            comparisonRows={castIronComparison.comparisonRows}
            highlightedProduct={castIronComparison.highlightedProduct}
            trustMessage={castIronComparison.trustMessage}
          />

          {/* CTA #3 - POST-COMPARISON (CRITICAL CONVERSION POINT) */}
          <AmazonCTA
            productSlug={reviewData.productSlug}
            affiliateUrl={affiliateUrl}
            position="comparison_table"
            boxHeading="Ready to invest in cookware that lasts a lifetime?"
          />

          {/* SECTION 4: PROS & CONS */}
          <ProsConsGrid
            title={reviewData.prosConsTitle}
            prosTitle={reviewData.prosTitle}
            consTitle={reviewData.consTitle}
            pros={productData.pros}
            cons={productData.cons}
          />

          {/* SECTION 13: WHO SHOULD BUY */}
          <WhoShouldBuyGrid
            title={reviewData.whoShouldBuy.title}
            perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
            considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
            perfectFor={reviewData.whoShouldBuy.perfectFor}
            considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
          />

          {/* CTA #4 - AFTER WHO SHOULD BUY (Decision Point) */}
          <AmazonCTA
            productSlug={reviewData.productSlug}
            affiliateUrl={affiliateUrl}
            position="who_should_buy"
            boxHeading="Sound like the right fit for your kitchen?"
          />

          {/* SECTION 15: FAQ */}
          <FAQSection
            title={reviewData.faq.title}
            faqs={reviewData.faq.items}
          />

          {/* SECTION 16: EMAIL CAPTURE */}
          <EmailCaptureSection />

          {/* SECTION 17: BOTTOM LINE + CTA #5 */}
          <BottomLineSection
            title={reviewData.bottomLine.title}
            paragraphs={reviewData.bottomLine.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed">
                {processInlineLinks(paragraph, affiliateUrl, productData.name)}
              </p>
            ))}
            customCTA={
              <div className="text-center">
                <AmazonCTA
                  productSlug={reviewData.productSlug}
                  affiliateUrl={affiliateUrl}
                  position="final_cta"
                />
              </div>
            }
          />

          <div className="text-center my-8">
            <Link
              href="/cookware-and-bakeware"
              className="text-orange-700 hover:text-orange-800 font-medium"
            >
              Explore more Cookware & Bakeware →
            </Link>
          </div>

          {/* RELATED GUIDES */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Cast Iron Care Resources</h3>
            <p className="text-slate-700 mb-4">
              Get the most out of your Lodge skillets with our complete care guide:
            </p>
            <Link
              href="/blog/cast-iron-seasoning-care"
              className="text-orange-700 hover:text-orange-800 font-semibold"
            >
              → How to Season and Clean Cast Iron Skillets
            </Link>
          </div>

          {/* SECTION 18: RELATED PRODUCTS */}
          <RelatedProductsGrid
            title={reviewData.relatedProducts.title}
            products={reviewData.relatedProducts.products}
          />

    </ReviewLayout>
  )
}
