import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateButton from '@/components/AffiliateButton'
import FTCDisclosure from '@/components/FTCDisclosure'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/large-plastic-hotel-pans',
    },
    title: 'Large Plastic Hotel Pans Review: Commercial-Grade Cold Storage',
    description: '24 years professional kitchen experience: Large plastic hotel pans for catering operations, large-batch meal prep, and commercial cold storage.',
    openGraph: {
      title: 'Large Plastic Hotel Pans Review: Commercial-Grade Cold Storage',
      description: 'Professional chef review of large plastic hotel pans for commercial and catering use.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/large-plastic-hotel-pans',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Large Plastic Hotel Pans Review",
        rating: 5,
        testingPeriod: "24 Years Pro Use",
        tier: 1
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Large Plastic Hotel Pans Review',
      description: 'Professional chef review of large plastic hotel pans for catering and commercial operations.',
      images: [generateOGImageURL({
        title: "Large Plastic Hotel Pans Review",
        rating: 5,
        testingPeriod: "24 Years Pro Use",
        tier: 1
      })],
    },
  }
}

const faqData = [
  {
    question: "Are full pans too big for home use?",
    answer: "Yes, for most home cooks. Full pans (12\" x 20\") are designed for commercial operations. Unless you're cooking for 20+ people regularly, they'll dominate your refrigerator. Use 1/3 or 1/6 pans instead."
  },
  {
    question: "Can I use 1/3 pans for everyday meal prep?",
    answer: "Only if you cook for 8+ people or do serious bulk batch cooking. For typical family meal prep (2-6 people), 1/6 pans are more practical."
  },
  {
    question: "Are these freezer safe?",
    answer: "Yes. I use them for freezing bulk stocks and soups. They handle freezer temperatures without cracking."
  },
  {
    question: "Can I put them in the oven?",
    answer: "No—plastic pans are NOT oven-safe. Use metal hotel pans if you need oven or hot holding capability."
  },
  {
    question: "How do they compare to disposable aluminum pans?",
    answer: "Hotel pans win for durability (decades vs. single use), environmental impact (reusable), food safety (NSF-approved), and cost over time. For catering businesses, invest in hotel pans."
  },
  {
    question: "Will they stain from tomato sauce?",
    answer: "Not the opaque white versions. Avoid translucent plastic (which can stain)."
  }
];

export default async function LargePlasticHotelPansReview() {
  const product = await getProductBySlug('large-plastic-hotel-pans')
  if (!product) {
    throw new Error('Product not found: large-plastic-hotel-pans')
  }

  const affiliateLink = getPrimaryAffiliateLink(product)

  const productData = {
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    category: product.category,
    rating: product.expertRating || 5,
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
        tier={1}
        testingPeriod="24 years professional"
        rating={5}
        hook="Commercial workhorses for catering and large-scale operations"
        category="Storage"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">24 YEARS PROFESSIONAL KITCHEN EXPERIENCE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Large Plastic Hotel Pans Review: Commercial-Grade Cold Storage for Big Batches
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            After 24 years in professional kitchens, here&rsquo;s the truth about large hotel pans for catering, large families, and commercial operations
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>5/5 Commercial Use</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★</span>
              <span>3/5 Home Use</span>
            </div>
            <div>~$200-300</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Scott&rsquo;s Professional Verdict</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {productData.expertOpinion}
          </p>
          <div className="mt-4">
            <p className="text-gray-700">
              <strong>Best For:</strong> Catering businesses, large families (8+ people), church/community kitchens, commercial prep operations
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Skip If:</strong> You&rsquo;re a typical home cook (2-6 people) - these will dominate your refrigerator
            </p>
          </div>
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

        {/* Who This Is For */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who Actually Needs Large Plastic Hotel Pans?</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">✅ You SHOULD Buy These If:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>You run a catering business</strong> — Essential for transporting prepared foods to events and storing bulk ingredients</li>
              <li>• <strong>You manage a church/community kitchen</strong> — Feeding 50+ people regularly requires commercial-scale storage</li>
              <li>• <strong>You cook for large families (8+ people)</strong> — 1/3 pans make sense for batch cooking proteins and organizing family gathering prep</li>
              <li>• <strong>You host major events regularly</strong> — Weddings, family reunions, or fundraisers at home require professional equipment</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-red-600">
            <h3 className="text-xl font-bold mb-3 text-gray-900">❌ You Should SKIP These If:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>You&rsquo;re a typical home cook (2-6 people)</strong> — Large pans will dominate your refrigerator. Use smaller 1/6 pans instead</li>
              <li>• <strong>You have a small refrigerator</strong> — Full pans require serious shelf space</li>
              <li>• <strong>You don&rsquo;t cook in bulk</strong> — If you cook 2-3 meals at a time, large pans are massive overkill</li>
            </ul>
          </div>
        </section>

        {/* Buy Section (Commercial) */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">For Catering & Commercial Operations</h2>

          <p className="text-lg text-gray-700 mb-6">
            After 24 years in professional kitchens, large plastic hotel pans are essential for catering businesses
            and large-scale food operations. They&rsquo;re commercial workhorses, not home tools.
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
                Check Amazon Price (Commercial) →
              </AffiliateButton>
            </CTAVisibilityTracker>

            <Link
              href="/reviews/small-plastic-hotel-pans"
              className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Better for Home Use? See Small Pans →
            </Link>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">My Professional Experience with Large Plastic Pans</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>At Mellow Mushroom (Kitchen Manager)</h3>
            <p>
              As Kitchen Manager, I was responsible for organizing walk-in coolers and prep stations. Large plastic hotel pans
              were essential:
            </p>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">Friday Prep for Weekend Rush:</p>
              <ul>
                <li>Full pans: house-made pizza sauce (enough for 200+ pizzas)</li>
                <li>1/3 pans: sliced pepperoni, diced vegetables, cooked sausage</li>
                <li>1/3 pans: prepped salad ingredients for high-volume service</li>
              </ul>
            </div>

            <p>
              <strong>Cold Storage Organization:</strong> Walk-in coolers have standardized shelving designed for hotel pans.
              Full pans span three rows; 1/3 pans fit one row each. This modular system maximizes every inch of expensive cooler space.
            </p>

            <h3 className="mt-8">Catering Operations</h3>
            <p>When catering off-site events:</p>
            <ul>
              <li>Full pans transport bulk quantities safely</li>
              <li>Lids seal tightly to prevent spills during transport</li>
              <li>Stackable design fits efficiently in catering vans</li>
              <li>NSF-approved food safety for commercial service</li>
            </ul>

            <p>
              <strong>Bottom line:</strong> Every catering operation uses large hotel pans because nothing else combines capacity,
              durability, and food safety standards this effectively.
            </p>
          </div>
        </section>

        {/* Link to Hotel Pan System Guide */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Learn More About the Hotel Pan System</h3>
          <p className="text-lg text-gray-700 mb-4">
            Want to understand the complete hotel pan system and which sizes work best for your needs?
          </p>
          <Link
            href="/blog/hotel-pan-system-restaurant-organization-home"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Read the Complete Hotel Pan System Guide →
          </Link>
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
            Large plastic hotel pans are essential for commercial operations and large-scale cooking—but overkill for most home cooks.
            Know your use case before buying.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
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
                Get Large Pans (Catering/Commercial) →
              </AffiliateButton>
            </CTAVisibilityTracker>

            <Link
              href="/reviews/small-plastic-hotel-pans"
              className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Better for Home? See Small Pans →
            </Link>
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
