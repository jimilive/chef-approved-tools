import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Tier3Badge } from '@/components/ReviewTierBadge'
import FTCDisclosure from '@/components/FTCDisclosure'
import AffiliateButton from '@/components/AffiliateButton'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import { getProductBySlug } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/ninja-air-fryer-af101',
    },
    title: 'Ninja Air Fryer AF101 Review: 90-Day Wing & Frozen Food Test',
    description: 'Professional chef tests the Ninja AF101 4qt air fryer for 90 days. Fresh wings, frozen foods, real results. Honest pros and cons from 24 years in kitchens.',
    openGraph: {
      title: 'Ninja Air Fryer AF101 Review: 90-Day Professional Test',
      description: 'After 90 days testing wings, frozen foods, and everything in between.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/ninja-air-fryer-af101',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Ninja Air Fryer AF101 Review",
        rating: 4.4,
        testingPeriod: "90 Days Testing",
        tier: 3
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ninja Air Fryer AF101 Review',
      description: 'Professional chef tests wings and frozen foods for 90 days.',
      images: [generateOGImageURL({
        title: "Ninja Air Fryer AF101 Review",
        rating: 4.4,
        testingPeriod: "90 Days Testing",
        tier: 3
      })],
    },
  }
}

const faqData = [
  {
    question: "Do air fryers really work or are they just hype?",
    answer: "After 90 days of testing with 24 years of professional kitchen experience, air fryers are legitimate cooking tools—not gimmicks. The Ninja AF101 delivers approximately 85% of deep-fryer results using rapid air circulation. Wings come out crispy-skinned with juicy meat inside. However, they are compact convection ovens, not magic—you need proper technique and temperature control."
  },
  {
    question: "How many chicken wings fit in the Ninja AF101?",
    answer: "Approximately 5 full chicken wings in a single layer without overcrowding. For best results, wings should not touch or overlap. If you are cooking for more than 2-3 people, expect to cook in multiple batches. The 4-quart capacity is sized for small households, not families or gatherings."
  },
  {
    question: "Can I use metal utensils in the Ninja air fryer?",
    answer: "No—use only wood, silicone, or plastic utensils. I learned this the hard way by scratching the non-stick coating with a metal spatula. The scratches are permanent and will reduce the lifespan of the basket. Treat the non-stick surface gently to maximize longevity."
  },
  {
    question: "How does the Ninja AF101 compare to deep frying?",
    answer: "The AF101 delivers approximately 85% of deep-fryer results. Wings have crispy skin and juicy meat, but they lack the deep golden-brown color and slight greasiness of true deep-fried wings. The texture is excellent, but the visual appearance and exact flavor profile are slightly different. For home use without oil management and cleanup, this is an excellent trade-off."
  },
  {
    question: "Is the Ninja AF101 loud?",
    answer: "The fan is audible but not loud. It is quieter than commercial fryers and louder than complete silence. The noise level is comparable to a household convection oven—you will hear it running, but it would not disrupt a conversation in the next room. For apartment living or open-concept homes, the noise is acceptable."
  },
  {
    question: "Why should I follow package instructions instead of the quick reference guide?",
    answer: "The included quick reference guide is generic and often inaccurate for specific products. Frozen food manufacturers test their products extensively and provide timing based on their specific formulations. Following package instructions and adjusting based on your preference produces better results than following the guide blindly. After 2-3 test runs per food type, you will dial in perfect timing."
  }
];

export default async function NinjaAirFryerAF101Review() {
  // Get product data from centralized Supabase database - SINGLE SOURCE OF TRUTH
  const product = await getProductBySlug('ninja-air-fryer-af101')
  if (!product) {
    throw new Error('Product not found: ninja-air-fryer-af101')
  }

  const affiliateLink = product.affiliateLinks?.[0]?.url || 'https://amzn.to/4oADQTJ'

  const productData = {
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    category: product.category,
    rating: product.expertRating || 4.4,
    reviewCount: 1,
    pros: product.pros,
    cons: product.cons,
    affiliateLinks: product.affiliateLinks,
    expertRating: product.expertRating,
    expertOpinion: product.expertOpinion,
    dateAdded: product.dateAdded,
    lastUpdated: product.lastUpdated
  };

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={3}
        testingPeriod="90 days"
        rating={4.4}
        hook="85% of deep-fryer results with zero oil mess"
        category="Appliances"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">90 DAYS WING & FROZEN FOOD TESTING</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ninja Air Fryer AF101 Review
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            After 90 days of testing wings, frozen foods, and everything in between—the honest truth from a chef who has used commercial fryers for 24 years
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★☆</span>
              <span>4.4/5</span>
            </div>
            <div>Tier 3: Expert Evaluation</div>
            <div>~$70-90</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Testing In Progress Badge */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="font-semibold text-amber-900 mb-2">Testing In Progress</p>
              <p className="text-sm text-amber-800 mb-2">
                I purchased the Ninja AF101 in October 2025 specifically to review it for this site. I am currently at 90 days of
                testing with fresh wings (multiple batches), plus every type of frozen food I could find at the grocery store.
              </p>
              <p className="text-sm text-amber-800">
                <strong>Next Update:</strong> April 2026 (6-month mark with non-stick durability assessment)<br/>
                <strong>Tier 2 Upgrade:</strong> October 2026 (12-month mark with long-term performance data)
              </p>
            </div>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Scott&rsquo;s Professional Verdict</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {productData.expertOpinion}
          </p>
        </div>

        {/* Pros & Cons */}
        <section className="mb-12">
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

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready for Crispy Wings Without the Oil?</h2>

          <p className="text-lg text-gray-700 mb-6">
            After 90 days of professional testing, the Ninja AF101 delivers 85% of deep-fryer results with zero oil mess.
            Perfect for small households who want fried food results without the hassle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <CTAVisibilityTracker
              ctaId={`review-${productData.slug}-above_fold`}
              position="above_fold"
              productSlug={productData.slug}
              merchant="amazon"
            >
              <AffiliateButton
                href={affiliateLink}
                merchant="amazon"
                product={productData.slug}
                position="above_fold"
                variant="primary"
              >
                Check Amazon Price →
              </AffiliateButton>
            </CTAVisibilityTracker>

            <Link
              href="/reviews"
              className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              See All Reviews
            </Link>
          </div>
        </section>

        {/* Professional Context */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Professional Context: Why I Can Evaluate This</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Over 24 years in professional kitchens, I have used everything from commercial deep fryers at Mellow Mushroom (churning out
              hundreds of wings and fries per night) to $15,000 commercial convection ovens at Purple Café and Feierabend. I understand
              airflow patterns, heating element placement, and what separates good convection from great convection. I know what properly
              fried chicken wings should taste like—crispy skin with juicy meat inside, proper Maillard reaction browning, no greasiness.
            </p>

            <p>
              Air fryers are essentially compact, high-powered convection ovens. The marketing calls them revolutionary, but the
              technology is just rapid air circulation around food—something commercial convection ovens have done since the 1970s. The
              question is: can a $70-90 consumer appliance replicate commercial convection performance? After 90 days of testing, I have
              the answer.
            </p>
          </div>
        </section>

        {/* Real-World Testing */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Real-World Testing: 90 Days with Wings & Frozen Foods</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>Fresh Whole Wings Test (The Signature Dish)</h3>
            <p>
              <strong>Setup:</strong> Fresh whole chicken wings, 400°F, 20 minutes total (flipped halfway).
            </p>

            <p>
              <strong>Results:</strong> Wings came out with crispy skin and juicy meat—approximately 85% as good as deep-fried.
              The skin crisped properly, the fat rendered correctly, and the meat stayed moist. However, they lack the deep golden-brown
              color of true deep-fried wings. The texture is excellent, but the visual appearance is slightly lighter.
            </p>

            <h3 className="mt-8">Frozen Foods Test (Fries, Tots, Tenders)</h3>
            <p>
              <strong>Results:</strong> Frozen foods are where the AF101 truly shines. French fries, tater tots, chicken tenders,
              and breaded cutlets all came out crispy and evenly cooked. The crisper plate design prevents soggy bottoms, and the
              even airflow ensures consistent results. Follow package instructions and adjust based on your preference—the quick
              reference guide is often inaccurate.
            </p>

            <h3 className="mt-8">The Non-Stick Coating Reality</h3>
            <p>
              <strong>Warning:</strong> I scratched the non-stick coating with a metal spatula during testing. The scratches are
              permanent and will reduce basket lifespan. Use only wood, silicone, or plastic utensils. This is the AF101 biggest
              weakness—the coating is not durable enough for daily use without careful handling.
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who This Is For</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Buy the Ninja AF101 if you:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Cook for 2-3 people regularly</strong> — The 4-quart capacity is perfect for small households</li>
              <li>• <strong>Want fried food without oil management and cleanup</strong> — Zero oil means no hot oil handling, disposal, or splatter cleanup</li>
              <li>• <strong>Make frozen foods frequently</strong> — Fries, tots, tenders, and cutlets all come out crispy and evenly cooked</li>
              <li>• <strong>Have limited counter space</strong> — Compact footprint (8.5&quot; x 10.25&quot; x 11&quot;) fits under most cabinets</li>
              <li>• <strong>Want simple controls without complexity</strong> — Temperature dial and timer are straightforward</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip the Ninja AF101 if you:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Cook for families of 4+ people regularly</strong> — The 4-quart capacity means cooking in batches</li>
              <li>• <strong>Need true deep-fryer results</strong> — Air frying is 85% as good, not 100%</li>
              <li>• <strong>Want a window to check food without opening</strong> — No interior light or viewing window</li>
              <li>• <strong>Expect the non-stick coating to handle metal utensils</strong> — It will not, and scratches are permanent</li>
            </ul>
          </div>
        </section>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* FAQ Section */}
        <section className="mb-12" id="faq">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className={index !== faqData.length - 1 ? "border-b border-gray-200 pb-6" : ""}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
            Final Recommendation
          </h2>

          <p className="text-lg text-slate-700 mb-6 text-center max-w-2xl mx-auto">
            After 90 days of testing, the Ninja AF101 delivers 85% of deep-fryer results with zero oil mess. For small households
            who want fried food without the hassle, this is a genuine convenience tool—not a novelty.
          </p>

          <div className="flex justify-center mb-4">
            <CTAVisibilityTracker
              ctaId={`review-${productData.slug}-final_cta`}
              position="final_cta"
              productSlug={productData.slug}
              merchant="amazon"
            >
              <AffiliateButton
                href={affiliateLink}
                merchant="amazon"
                product={productData.slug}
                position="final_cta"
                variant="primary"
              >
                Check Amazon Price →
              </AffiliateButton>
            </CTAVisibilityTracker>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Free shipping with Amazon Prime | Easy returns
          </p>
        </section>

      </article>

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
          __html: JSON.stringify(generateFAQSchema(faqData))
        }}
      />

    </div>
  )
}
