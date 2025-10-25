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
      canonical: 'https://www.chefapprovedtools.com/reviews/japanese-wooden-spoon-set',
    },
    title: 'Japanese Wooden Spoon Set: 3-Year Dishwasher Test',
    description: 'After 3 years and 100+ dishwasher cycles, these Japanese wooden spoons became my go-to cooking tools. Honest review of durability, performance, and value at $10-12 for 6 spoons.',
    openGraph: {
      title: 'Japanese Wooden Spoon Set: 3-Year Dishwasher Test',
      description: 'Professional chef tests wooden spoons through 3 years of daily use and dishwasher cycles.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/japanese-wooden-spoon-set',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Japanese Wooden Spoon Set Review",
        rating: 4.6,
        testingPeriod: "3 Years + 100 Dishwasher Cycles",
        tier: 3
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Japanese Wooden Spoon Set: 3-Year Test',
      description: 'After 3 years of daily cooking and dishwasher abuse, these wooden spoons still perform like new.',
      images: [generateOGImageURL({
        title: "Japanese Wooden Spoon Set Review",
        rating: 4.6,
        testingPeriod: "3 Years + 100 Dishwasher Cycles",
        tier: 3
      })],
    },
  }
}

const faqData = [
  {
    question: "Are these wooden spoons really dishwasher safe?",
    answer: "Yes, genuinely dishwasher safe based on 3 years of testing. I've run these through my home dishwasher over 100 times—hot water cycles, heated dry, placed wherever they fit among dishes—with zero degradation. No splitting, warping, or roughness has developed. This is exceptional for wooden utensils; most wooden spoons I've owned previously cracked or warped within months of dishwasher use."
  },
  {
    question: "Will the 9-inch length work for my cooking needs?",
    answer: "The 9-inch length excels for everyday cooking in 10-12 inch skillets, 2-4 quart saucepans, and similar standard home cookware. This covers approximately 90% of typical stovetop cooking tasks. The limitation appears with large stockpots (8+ quarts) or deep Dutch ovens where the spoons fall completely into the pot when released."
  },
  {
    question: "Do these spoons scratch non-stick or cast iron cookware?",
    answer: "No scratching on either surface after 3 years of regular use. The natural wood is soft enough to give against pan surfaces rather than gouging them. On non-stick pans, I've used these for aggressive stirring without damaging coating. On cast iron, they allow firm stirring without compromising seasoning layers."
  },
  {
    question: "Why six identical spoons instead of varied sizes?",
    answer: "The six-piece identical set means consistent performance—you always know exactly what you're grabbing. The downside is zero size variety. For cooks who value consistency and want multiple spoons ready for multi-pot cooking sessions, identical pieces are beneficial. Having six working spoons available means I rarely run short mid-cooking."
  },
  {
    question: "How long will these spoons last?",
    answer: "Based on current condition after 3 years of daily use and 100+ dishwasher cycles, I'd estimate 5-10 year lifespan minimum with normal home use. They show virtually no wear—no splitting, warping, or surface degradation. At $10-12 per six-piece set, even a 5-year lifespan makes them exceptionally cost-effective."
  },
  {
    question: "Why have you purchased five sets of these spoons?",
    answer: "Two sets for my own kitchen (12 total spoons) and three sets as gifts for family and friends who cook regularly. After the first set proved its value, I wanted backups. The three gift sets went to people I knew would appreciate practical, dishwasher-safe cooking tools. When I give kitchen tools as gifts, I only recommend items I genuinely use and trust."
  }
];

export default async function JapaneseWoodenSpoonSetReview() {
  // Get product data from centralized Supabase database - SINGLE SOURCE OF TRUTH
  const product = await getProductBySlug('japanese-wooden-spoon-set')
  if (!product) {
    throw new Error('Product not found: japanese-wooden-spoon-set')
  }

  const affiliateLink = product.affiliateLinks?.[0]?.url || 'https://amzn.to/4htP0HE'

  const productData = {
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    category: product.category,
    rating: product.expertRating || 4.6,
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
        testingPeriod="3 years + 100 dishwasher cycles"
        rating={4.6}
        hook="Genuinely dishwasher safe wooden spoons at exceptional value"
        category="Hand Tools"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">3 YEARS + 100 DISHWASHER CYCLES TESTED</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Japanese Wooden Spoon Set Review
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            Genuinely dishwasher-safe wooden spoons that survived 3 years of daily use
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★½</span>
              <span>4.6/5</span>
            </div>
            <div>Exceptional Value</div>
            <div>$10-12 for 6 spoons</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">The Bottom Line</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            After 3 years and over 100 dishwasher cycles, these wooden spoons still look and perform like new.
            The combination of genuine dishwasher durability, non-stick safe performance, and exceptional value ($10-12 for six spoons)
            makes them indispensable. I've purchased five sets—two for myself, three as gifts.
          </p>
        </div>

        {/* Why I Chose This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why These Replaced My Other Wooden Spoons</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              After 45 years of cooking, I thought I understood wooden spoons. Hand-wash only, oil occasionally,
              replace every few years when they crack. Then these Japanese spoons challenged everything I knew.
            </p>

            <p>
              What started as a $10 Amazon purchase became so fundamental to my cooking that I now own two sets
              (12 spoons total) and have given three more sets as gifts. The reason? They're genuinely dishwasher safe.
              Not "technically dishwasher safe but hand-wash recommended"—actually dishwasher safe through 100+ cycles
              over 3 years with zero degradation.
            </p>

            <p>
              The 9-inch length provides excellent control for skillets and medium pans—covering about 90% of my stovetop cooking.
              Yes, they fall into large stockpots, but for everyday cooking in standard pans, this size is ideal. The ellipse shape
              moves food efficiently without scratching non-stick or cast iron surfaces.
            </p>
          </div>
        </section>

        {/* Real Restaurant Use */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">3 Years of Real-World Testing</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>The Dishwasher Durability Test Nobody Expected</h3>
            <p>
              I bought these with zero expectation they'd survive the dishwasher. Every wooden utensil I'd owned previously
              eventually cracked, warped, or developed rough surfaces. Traditional advice says hand-wash wooden spoons,
              oil them occasionally, treat them gently.
            </p>

            <p>
              I ignored that advice completely. For three years, these have gone into the dishwasher after nearly every use.
              Hot water cycles, heated dry, placed wherever they fit. The result? They look virtually identical to the day
              I received them. No splitting, no warping, no roughness. Whatever finish these spoons have makes them genuinely
              dishwasher-safe in practice, not just marketing.
            </p>

            <h3>What I Use Them For Daily</h3>
            <ul className="space-y-2 mt-4">
              <li>Sautéing vegetables without scratching stainless steel pans</li>
              <li>Scrambling eggs in non-stick without damaging the coating</li>
              <li>Stirring sauces—no metallic taste transfer in acidic ingredients</li>
              <li>Everyday stirring in cast iron without compromising seasoning</li>
              <li>Rice, pasta, grains, soups—routine tasks that don't scratch cookware</li>
            </ul>

            <h3>Where the 9-Inch Size Becomes a Limitation</h3>
            <p>
              The compact length works brilliantly for 10-12 inch skillets and 2-4 quart saucepans. However, with large
              stockpots (8+ quarts) or deep Dutch ovens, the spoons fall completely into the pot when released. For these
              scenarios, I keep longer wooden spoons (13-14 inches) as backup. But 90% of my cooking happens in pans where
              the 9-inch size excels.
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
                <li>✓ Genuinely dishwasher safe (100+ cycles tested)</li>
                <li>✓ Perfect 9-inch size for everyday cooking</li>
                <li>✓ Won't scratch non-stick or cast iron</li>
                <li>✓ No metallic taste transfer</li>
                <li>✓ Six identical spoons for consistency</li>
                <li>✓ Exceptional value at $10-12</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">Limitations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Too short for large stockpots</li>
                <li>✗ Smaller surface moves less volume</li>
                <li>✗ No hanging holes for pegboard storage</li>
                <li>✗ May show staining from turmeric/tomatoes</li>
                <li>✗ No size variety in the set</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who Should Buy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who This Is For</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Perfect If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Cook daily and want utensils that survive repeated dishwasher cycles</li>
              <li>• Use non-stick cookware and need scratch-safe utensils</li>
              <li>• Cook with cast iron and want to preserve seasoning</li>
              <li>• Prepare acidic sauces and don't want metallic taste transfer</li>
              <li>• Want consistent performance over size variety</li>
              <li>• Need gift-worthy tools at accessible prices</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Regularly cook in large stockpots or Dutch ovens</li>
              <li>• Need pegboard or hook storage with hanging holes</li>
              <li>• Prefer size variety within a single set</li>
              <li>• Need high-volume serving tools</li>
            </ul>
          </div>
        </section>

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Try These Spoons?</h2>

          <p className="text-lg text-gray-700 mb-6">
            At $10-12 for six spoons, these represent exceptional value. I've purchased five sets because they
            consistently outperform wooden spoons costing three times as much. The dishwasher durability alone makes
            them worth trying.
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
            After 3 years of daily cooking and over 100 dishwasher cycles, these wooden spoons have earned permanent
            status in my kitchen. The fact that I've purchased five sets speaks to their reliability and my confidence
            recommending them to other home cooks.
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
