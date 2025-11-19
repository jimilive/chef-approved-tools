import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
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
import AuthorBio from '@/components/review/AuthorBio'
import {
  metadata as pageMetadata,
  heroData,
  testingResults,
  performanceAnalysis,
  prosData,
  consData,
  whoShouldBuyData,
  faqData,
  emailCapture,
  bottomLine,
  relatedProductSlugs
} from './data'

export const metadata: Metadata = pageMetadata

// ISR: Revalidate every hour
export const revalidate = 3600
export const fetchCache = 'force-cache'

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function AllCladD5SautePanReview() {
  // Fetch product data
  const product = await getProductBySlug('all-clad-d5-saute-pan')
  if (!product) {
    throw new Error('Product not found: all-clad-d5-saute-pan')
  }

  const productData = product
  const affiliateUrl = getPrimaryAffiliateLink(product)

  // Fetch related products
  const relatedProductsPromises = relatedProductSlugs.map((slug: string) => getProductBySlug(slug))
  const relatedProductsData = await Promise.all(relatedProductsPromises)

  const relatedProducts = relatedProductsData
    .filter((p: any): p is NonNullable<typeof p> => p !== null)
    .map((p: any) => ({
      emoji: '🔪', // Default emoji, customize per product if needed
      name: p.name,
      description: `Professional-tested ${p.category} recommendation`,
      href: `/reviews/${p.slug}`
    }))

  const publishedDate = product.dateAdded || '2025-01-18'
  const updatedDate = product.lastUpdated || '2025-01-18'

  // Generate schemas
  const productSchema = generateProductSchema({
    name: productData.name,
    slug: productData.slug,
    description: 'All-Clad D5 Sauté Pan reviewed after 19 years of verified use',
    brand: productData.brand,
    rating: heroData.rating,
    reviewCount: 1,
    category: productData.category,
    dateAdded: publishedDate,
    lastUpdated: updatedDate
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Reviews', url: '/reviews' },
    { name: 'All-Clad D5 Sauté Pan', url: '/reviews/all-clad-d5-saute-pan' }
  ])

  const faqSchema = generateFAQSchema(faqData)

  return (
    <>
      {/* Schema markup */}
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

      {/* Product View Tracking */}
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={3}
        testingPeriod="19 years verified user testing"
        rating={heroData.rating}
        hook="19 years of verified real-world use proves premium cookware value"
        category={productData.category}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* Breadcrumbs */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-orange-700">Home</a>
            {' / '}
            <a href="/reviews" className="hover:text-orange-700">Reviews</a>
            {' / '}
            All-Clad D5 Sauté Pan
          </div>

      {/* Hero Section */}
      <ReviewHero
        title={heroData.title}
        authorName={heroData.authorName}
        authorCredentials={heroData.authorCredentials}
        rating={heroData.rating}
        tierBadge={heroData.tierBadge}
        verdict={heroData.verdict}
        verdictStrong={heroData.verdictStrong}
        customCTA={
          <CTAVisibilityTracker
            ctaId="hero-cta"
            position="above_fold"
            productSlug={product.slug}
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Check Price on Amazon →
            </a>
          </CTAVisibilityTracker>
        }
      />

      {/* Quick Stats */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-slate-700">Construction:</span>
            <span className="text-slate-600 ml-2">5-ply stainless (steel-aluminum-aluminum-aluminum-steel)</span>
          </div>
          <div>
            <span className="font-semibold text-slate-700">Made in:</span>
            <span className="text-slate-600 ml-2">USA (Canonsburg, PA)</span>
          </div>
          <div>
            <span className="font-semibold text-slate-700">Warranty:</span>
            <span className="text-slate-600 ml-2">Limited lifetime</span>
          </div>
          <div>
            <span className="font-semibold text-slate-700">Typical lifespan:</span>
            <span className="text-slate-600 ml-2">15-25+ years (based on verified data)</span>
          </div>
          <div>
            <span className="font-semibold text-slate-700">Tested duration:</span>
            <span className="text-slate-600 ml-2">19 years continuous use</span>
          </div>
          <div>
            <span className="font-semibold text-slate-700">Professional use:</span>
            <span className="text-slate-600 ml-2">Yes (restaurant-grade construction)</span>
          </div>
        </div>
      </div>

      {/* The Backstory */}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">The Honest Backstory</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-slate-700 leading-relaxed mb-4">
            In 2006, a fellow professional cook was getting married. After 24 years working in professional kitchens,
            the decision was made to gift three All-Clad D5 pans—the quality standard seen in restaurant kitchens where
            budget was not the primary concern.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The goal was to provide cookware built to last, not built to replace in 2-3 years like cheaper alternatives.
            Professional-grade equipment that would survive serious use.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Nineteen years later, the question was asked: how did those pans hold up?
          </p>
          <p className="text-slate-700 leading-relaxed">
            The response became this review.
          </p>
        </div>
      </section>

      {/* Dave's 19-Year Testimonial */}
      <section className="my-12 bg-amber-50 border-l-4 border-amber-600 p-8 rounded-r-lg">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">A 19-Year Love Affair with All-Clad D5</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-slate-700 leading-relaxed mb-4 italic">
            The following testimonial is from the verified user who has owned this All-Clad D5 sauté pan
            since 2006—exactly as written, with no edits:
          </p>

          <div className="border-t border-amber-200 pt-6 mt-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              I don't write reviews often, but after nearly two decades with my All-Clad D5 sauté pan,
              I feel compelled to share what long-term ownership actually looks like.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              This pan was a wedding gift from a great friend of mine in the cooking industry nineteen years ago,
              and it has become a workhorse in my kitchen. This isn't a piece of cookware that sits pretty in the
              cabinet—I've put it through its paces using it sautéing and caramelizing onions and garlic, braising
              chicken and rabbit, simmering sauces, and browning roasts, and it continues to perform beautifully.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              The heat distribution is exceptional. Whether I'm getting a proper sear on a roast or gently simmering
              a sauce, the five-ply construction delivers even, consistent heat across the entire cooking surface.
              No hot spots, no surprises—just reliable performance every single time. The browning, in particular,
              is superb. I've even used it in the oven at high heat, broiling steaks, chicken, and fish.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              The pan's versatility has made it indispensable. I've braised short ribs, sautéed vegetables, reduced
              sauces, and everything in between. The high sides are perfect for preventing splatters while still
              allowing enough evaporation when needed. It transitions seamlessly from stovetop to oven, which has
              been invaluable for those dishes that start on the burner and finish under heat.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              After nineteen years of regular use, the pan shows its age gracefully. The cooking surface remains
              smooth and functional and without discoloration. It still cleans up well with a little help from an
              SOS pad when needed. The handle is as sturdy as day one—no loosening, no wobbling.
            </p>

            <p className="text-slate-700 leading-relaxed">
              With over nineteen years of frequent use, it's proven to be the best and longest lasting of any gift
              I've ever gotten. This is cookware that rewards you for decades, not seasons.
            </p>
          </div>
        </div>
      </section>

      {/* Testing Results */}
      <TestingResultsGrid
        title={testingResults.title}
        sections={testingResults.sections}
        testingEnvironment={testingResults.testingEnvironment}
        outstandingPerformance={testingResults.outstandingPerformance}
        minorConsiderations={testingResults.minorConsiderations}
      />

      {/* Performance Analysis */}
      <PerformanceAnalysis
        title={performanceAnalysis.title}
        sections={performanceAnalysis.sections}
      />

      {/* Pros & Cons */}
      <ProsConsGrid
        title="Honest Pros & Cons"
        pros={prosData.map(p => `**${p.title}:** ${p.description}`)}
        cons={consData.map(c => `**${c.title}:** ${c.description}`)}
      />

      {/* Who Should Buy */}
      <WhoShouldBuyGrid
        title={whoShouldBuyData.title}
        perfectForTitle={whoShouldBuyData.perfectForTitle}
        considerAlternativesTitle={whoShouldBuyData.considerAlternativesTitle}
        perfectFor={whoShouldBuyData.perfectFor}
        considerAlternatives={whoShouldBuyData.considerAlternatives}
      />

      {/* FAQ */}
      <FAQSection
        title="Frequently Asked Questions"
        faqs={faqData}
      />

      {/* Email Capture */}
      <EmailCaptureSection
        title={emailCapture.title}
        subtitle={emailCapture.subtitle}
        finePrint={emailCapture.finePrint}
      />

      {/* Bottom Line */}
      <BottomLineSection
        title={bottomLine.title}
        paragraphs={bottomLine.paragraphs}
        customCTA={
          <CTAVisibilityTracker
            ctaId="bottom-line-cta"
            position="final_cta"
            productSlug={product.slug}
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Check Price on Amazon →
            </a>
          </CTAVisibilityTracker>
        }
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProductsGrid
          title="Related Professional Recommendations"
          products={relatedProducts}
        />
      )}

          {/* Author Bio */}
          <AuthorBio />

        </div>
      </div>
    </>
  )
}
