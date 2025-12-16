import Link from 'next/link'
import type { Metadata } from 'next'
import TestimonialsSection from '@/components/TestimonialsSection'
import FTCDisclosure from '@/components/FTCDisclosure'
import {
  ReviewHero,
  ProsConsGrid,
  WhoShouldBuyGrid,
  FAQSection,
  BottomLineSection,
  RelatedProductsGrid,
} from '@/components/review'
import SizeSelector from '@/components/SizeSelector'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'
import EmailCaptureBox from '@/components/review/EmailCaptureBox'
import EmailCaptureSection from '@/components/review/EmailCaptureSection'
import ReviewLayout from '@/components/review/ReviewLayout'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { getProductOgImage, getProductHeroImage } from '@/lib/images'
import { getReviewMetadata } from '@/data/metadata'
import { getReviewGitDates } from '@/lib/git-dates'
import { getTierBadge } from '@/lib/editorial-metadata'
import { getCategoryBreadcrumb } from '@/lib/category-helpers'
import { reviewData } from './rubbermaid-commercial-cooks-scraper-data'
import { getScraperComparison } from './scraper-comparison-data'

const PRODUCT_SLUG = 'rubbermaid-commercial-cooks-scraper'

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export async function generateMetadata(): Promise<Metadata> {
  const centralMeta = getReviewMetadata('rubbermaid-commercial-cooks-scraper')
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

export default async function RubbermaidScraperReview() {
  // Get product data from Supabase
  const product = await getProductBySlug(PRODUCT_SLUG)

  if (!product) {
    throw new Error(`Product not found in Supabase: ${PRODUCT_SLUG}`)
  }

  // Get comparison data with live affiliate links from database
  const comparisonData = await getScraperComparison()

  // Get git dates for this review
  const gitDates = getReviewGitDates(PRODUCT_SLUG)

  // Get tier badge from centralized config
  const tierBadge = getTierBadge(PRODUCT_SLUG)

  // Get category breadcrumb
  const categoryBreadcrumb = getCategoryBreadcrumb(product.category)

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = product ? {
    ...reviewData.legacyProductData,
    ...product,
    affiliateLinks: product.affiliateLinks.length > 0 ? product.affiliateLinks : reviewData.legacyProductData.affiliateLinks
  } : reviewData.legacyProductData

  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'
  const affiliate9_5Url = productData.affiliateLinks[1]?.url || '#'

  // Size options for SizeSelector
  const sizeOptions = [
    {
      id: '9-5-inch',
      label: '9.5-inch (Home Kitchens)',
      description: 'Perfect for everyday home cooking - Recommended',
      affiliateUrl: affiliate9_5Url,
      ctaId: 'cta-9-5-inch'
    },
    {
      id: '13-5-inch',
      label: '13.5-inch (Professional)',
      description: 'Best for professional kitchens and large batches',
      affiliateUrl: affiliateUrl,
      ctaId: 'cta-13-5-inch'
    }
  ]

  return (
    <ReviewLayout
      product={product}
      slug={PRODUCT_SLUG}
      affiliateUrl={affiliateUrl}
      gitDates={gitDates}
      categoryBreadcrumb={categoryBreadcrumb}
      faqData={reviewData.faq.items}
      tier={reviewData.metadata.tier as 1 | 2 | 3}
      testingPeriod={reviewData.tracking.testingPeriod}
      hook={reviewData.tracking.hook}
      backLinkHref="/moving-and-stirring-tools"
      backLinkText="Browse all Moving & Stirring Tools"
    >
      {/* SECTION 1: HERO */}
      <ReviewHero
        title={reviewData.header.title}
        authorName={reviewData.header.author}
        authorCredentials="24 Years in Professional Kitchens"
            rating={productData.expertRating ?? reviewData.header.expertRating}
            tierBadge={tierBadge}
            verdict={reviewData.professionalSummary.text + " " + reviewData.professionalSummary.detail}
            verdictStrong="buy-it-for-life equipment"
            publishedDate={gitDates.firstPublished}
            lastUpdated={gitDates.lastUpdated}
            heroImage={getProductHeroImage(PRODUCT_SLUG)}
            customCTA={
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6 min-h-[280px]">
                <SizeSelector
                  title="Choose Your Size:"
                  options={sizeOptions.map((option) => ({
                    id: option.id,
                    label: option.label,
                    description: option.description,
                    affiliateUrl: option.affiliateUrl,
                    ctaId: `hero-${option.ctaId}`
                  }))}
                  defaultSize="9-5-inch"
                  ctaText="Check Price on Amazon →"
                  ctaPosition="above_fold"
                  showDisclosure={true}
                  productSlug={PRODUCT_SLUG}
                />
              </div>
            }
          />

        {/* SECTION 2: FTC Disclosure */}
        <FTCDisclosure />

        {/* SECTION 3: Content starts */}

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testing" className="text-orange-700 hover:text-orange-800">Testing Results</a>
            <span className="text-slate-600">|</span>
            <a href="#comparison" className="text-orange-700 hover:text-orange-800">vs Alternatives</a>
            <span className="text-slate-600">|</span>
            <a href="#verdict" className="text-orange-700 hover:text-orange-800">Final Verdict</a>
            <span className="text-slate-600">|</span>
            <a href="#faq" className="text-orange-700 hover:text-orange-800">FAQ</a>
          </div>
        </nav>

        {/* Bottom Line Up Front */}
        <section className="mb-8">
          <div className="bg-slate-50 p-6 border-l-4 border-blue-500 rounded-r-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.bottomLine.title}</h2>
            <p className="text-lg text-slate-800 mb-4">
              <strong>{reviewData.bottomLine.headline}</strong>
            </p>
            <p className="text-slate-700 mb-4">
              {reviewData.bottomLine.body}
            </p>
            <div className="bg-white p-4 rounded-lg mt-4">
              <p className="mb-2"><strong>✓ Perfect For:</strong> {reviewData.bottomLine.perfectFor}</p>
              <p><strong>✗ Consider Alternatives If:</strong> {reviewData.bottomLine.considerAlternatives}</p>
            </div>
          </div>
        </section>

        {/* Hero Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{reviewData.heroFeatures.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewData.heroFeatures.features.map((feature, index) => (
              <div key={index} className="bg-slate-50 p-5 rounded-lg">
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testing Results */}
        <section className="mb-8" id="testing">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.testingResults.title}</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.testingResults.professionalUse.title}</h3>
              {reviewData.testingResults.professionalUse.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.testingResults.homeUse.title}</h3>
              {reviewData.testingResults.homeUse.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">{reviewData.testingResults.performanceMetrics.title}</h3>
              <ul className="space-y-2 text-slate-700">
                {reviewData.testingResults.performanceMetrics.metrics.map((metric, index) => (
                  <li key={index}>• <strong>{metric.label}:</strong> {metric.value}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mid-Article CTA */}
        <div className="bg-white border-2 border-orange-200 rounded-xl p-6 my-8 min-h-[280px]">
          <SizeSelector
            title="Choose Your Size:"
            options={sizeOptions.map((option) => ({
              id: option.id,
              label: option.label,
              description: option.description,
              affiliateUrl: option.affiliateUrl,
              ctaId: `mid-article-${option.ctaId}`
            }))}
            defaultSize="9-5-inch"
            ctaText="Check Price on Amazon →"
            ctaPosition="mid_article"
            showDisclosure={true}
            productSlug={PRODUCT_SLUG}
          />
        </div>

        {/* User Reviews */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.userReviews.title}</h2>
          <p className="text-sm text-slate-700 mb-4 italic">
            {reviewData.userReviews.subtitle}
          </p>

          <div className="space-y-4">
            {reviewData.userReviews.reviews.map((review, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-slate-700 mb-2">
                  &quot;{review.quote}&quot;
                </p>
                <p className="text-sm text-slate-700">— {review.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparisons - Narrative */}
        <section className="mb-8" id="comparison">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.comparisons.title}</h2>

          <div className="space-y-6">
            {reviewData.comparisons.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{section.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">{section.rubbermaidAdvantages.title}</h3>
                    <ul className="text-sm space-y-1 text-slate-700">
                      {section.rubbermaidAdvantages.points.map((point, pointIndex) => (
                        <li key={pointIndex}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-2 ${section.competitorProblems ? 'text-red-700' : 'text-orange-700'}`}>
                      {section.competitorProblems ? section.competitorProblems.title : section.competitorAdvantages?.title}
                    </h3>
                    <ul className="text-sm space-y-1 text-slate-700">
                      {(section.competitorProblems ? section.competitorProblems.points : section.competitorAdvantages?.points || []).map((point, pointIndex) => (
                        <li key={pointIndex}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-slate-700 text-sm">
                  <strong>Verdict:</strong> {section.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="my-12">
          <ProductComparisonTable
            title={comparisonData.title}
            subtitle={comparisonData.subtitle}
            products={comparisonData.products}
            comparisonRows={comparisonData.comparisonRows}
            highlightedProduct={comparisonData.highlightedProduct}
          />

          {/* POST-COMPARISON CTA */}
          <div className="bg-white border-2 border-orange-200 rounded-xl p-6 mt-6 min-h-[280px]">
            <SizeSelector
              title="Choose Your Size:"
              options={sizeOptions.map((option) => ({
                id: option.id,
                label: option.label,
                description: option.description,
                affiliateUrl: option.affiliateUrl,
                ctaId: `comparison-${option.ctaId}`
              }))}
              defaultSize="9-5-inch"
              ctaText="Check Price on Amazon →"
              ctaPosition="mid_article"
              showDisclosure={true}
              productSlug={PRODUCT_SLUG}
            />
          </div>
        </section>

        {/* Pros and Cons */}
        <ProsConsGrid
          title="Pros & Cons After 18 Years"
          pros={productData.pros}
          cons={productData.cons}
        />

        {/* Who Should Buy */}
        <WhoShouldBuyGrid
          title={reviewData.whoShouldBuy.title}
          perfectFor={reviewData.whoShouldBuy.perfectFor}
          considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
        />

        {/* CTA - AFTER WHO SHOULD BUY */}
        <div className="bg-white border-2 border-orange-200 rounded-xl p-6 my-8 min-h-[280px]">
          <SizeSelector
            title="Sound like the right fit? Choose your size:"
            options={sizeOptions.map((option) => ({
              id: option.id,
              label: option.label,
              description: option.description,
              affiliateUrl: option.affiliateUrl,
              ctaId: `who-should-buy-${option.ctaId}`
            }))}
            defaultSize="9-5-inch"
            ctaText="Check Price on Amazon →"
            ctaPosition="mid_article"
            showDisclosure={true}
            productSlug={PRODUCT_SLUG}
          />
        </div>

        {/* FAQ */}
        <FAQSection
          title={reviewData.faq.title}
          faqs={reviewData.faq.items}
        />

        {/* Email Capture Section */}
        <section className="mb-8">
          <EmailCaptureBox
            title="🔥 Get My 11 Essential Tools for a Professional Kitchen"
            description="Download my free guide: The 11 tools I use most in my home kitchen after 45 years of cooking."
            benefits={[
              '✓ My exact 11 daily workhorse tools',
              '✓ Where to invest vs where to save',
              '✓ Professional insights from 24 years of restaurant experience',
              '✓ Equipment care and maintenance tips'
            ]}
            ctaHref="/newsletter"
          />
        </section>

        {/* Final Verdict */}
        <section className="mb-8" id="verdict">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{reviewData.finalVerdict.title}</h2>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-lg my-8">
            <h3 className="text-white mt-0 text-2xl">
              {reviewData.finalVerdict.headline}
            </h3>
            <p className="text-lg leading-relaxed">
              {reviewData.finalVerdict.text}
            </p>
            <div className="bg-white/20 p-5 my-5 rounded-md">
              <p className="m-0 text-xl font-bold">
                Final Rating: ⭐⭐⭐⭐⭐ {reviewData.finalVerdict.ratings.overall}/5
              </p>
              <ul className="mt-4 mb-0 ml-5 text-base leading-relaxed">
                {reviewData.finalVerdict.ratings.breakdown.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-base mb-0">
              <strong>Would I buy this again?</strong> {reviewData.finalVerdict.ratings.wouldBuyAgain}
            </p>
          </div>

          {/* FINAL CTA */}
          <div className="bg-white border-2 border-orange-200 rounded-xl p-6 mt-6 min-h-[280px]">
            <SizeSelector
              title="Ready to buy? Choose your size:"
              options={sizeOptions.map((option) => ({
                id: option.id,
                label: option.label,
                description: option.description,
                affiliateUrl: option.affiliateUrl,
                ctaId: `final-cta-${option.ctaId}`
              }))}
              defaultSize="9-5-inch"
              ctaText="Check Price on Amazon →"
              ctaPosition="final_cta"
              showDisclosure={true}
              productSlug={PRODUCT_SLUG}
            />
          </div>
        </section>

        {/* Alternative Recommendations Section */}
        <section className="mb-8">
          <div className="bg-gray-50 p-6 my-6 rounded-lg">
            <h3>{reviewData.alternatives.title}</h3>

            {reviewData.alternatives.sections.map((section, index) => (
              <div key={index} className="my-5">
                <h3>{section.title}</h3>
                {section.options.map((option, optionIndex) => (
                  <p key={optionIndex} className="mb-2.5">
                    → <strong>{option.name}</strong> ({option.price}) - {option.description}
                  </p>
                ))}
              </div>
            ))}

            <div className="my-5">
              <h3>If You&apos;re Building a Complete Professional Kitchen:</h3>
              <p className="mb-2.5">
                → See our <Link href="/kitchen-bundle" className="text-orange-700 hover:text-orange-800 underline">Complete Kitchen Starter Kit</Link> for recommended equipment combinations at different budget levels.
              </p>
            </div>

            <p className="mt-5 p-4 bg-yellow-100 rounded">
              <strong>Still unsure?</strong> <Link href="/contact" className="text-orange-700 hover:text-orange-800 underline">Contact me</Link> with your specific needs—I&apos;ll provide a personalized recommendation based on your cooking style and budget.
            </p>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProductsGrid
          title={reviewData.relatedProducts.title}
          products={reviewData.relatedProducts.products}
        />

        {/* Social Proof */}
        <TestimonialsSection />

        {/* EMAIL CAPTURE */}
        <EmailCaptureSection />

        {/* Bottom Line Section with Click Tracking */}
        <BottomLineSection
          title={reviewData.bottomLineSection.title}
          paragraphs={reviewData.bottomLineSection.paragraphs}
          productSlug={productData.slug}
          customCTA={
            <div className="bg-white rounded-xl p-6 min-h-[280px]">
              <SizeSelector
                title="Choose Your Size:"
                options={sizeOptions.map((option) => ({
                  id: option.id,
                  label: option.label,
                  description: option.description,
                  affiliateUrl: option.affiliateUrl,
                  ctaId: `bottom-line-${option.ctaId}`
                }))}
                defaultSize="9-5-inch"
                ctaText={reviewData.bottomLineSection.ctaText}
                ctaPosition="final_cta"
                showDisclosure={true}
                productSlug={PRODUCT_SLUG}
              />
            </div>
          }
        />

        <div className="text-center my-8">
          <Link
            href="/moving-and-stirring-tools"
            className="text-orange-700 hover:text-orange-800 font-medium"
          >
            Explore more Moving & Stirring Tools →
          </Link>
        </div>

        {/* Footer Transparency Elements */}
        <section className="mb-8">
          <div className="bg-gray-50 p-5 my-8 rounded-md border-l-4 border-gray-500">
            <p className="my-2.5">
              <strong>📅 Last Updated:</strong> {new Date(reviewData.footerInfo.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="my-2.5">
              <strong>🔍 Next Review:</strong> {reviewData.footerInfo.nextReview}
            </p>
            <p className="my-2.5">
              <strong>💬 Own a Rubbermaid Commercial scraper?</strong> Share your experience in the comments
              below—I read and respond to every comment.
            </p>
            <p className="my-2.5">
              <strong>🔧 Questions about kitchen tools?</strong> <Link href="/contact" className="text-blue-600">
              Contact me directly</Link> and I&apos;ll help you choose the right equipment for your needs.
            </p>
          </div>
        </section>

        {/* AuthorBio, ProductViewTracker, and StickyMobileCTA handled by ReviewLayout */}
    </ReviewLayout>
  )
}
