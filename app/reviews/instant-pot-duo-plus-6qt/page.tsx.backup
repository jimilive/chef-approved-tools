import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Tier3Badge } from '@/components/ReviewTierBadge'
import FTCDisclosure from '@/components/FTCDisclosure'
import AffiliateButton from '@/components/AffiliateButton'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/instant-pot-duo-plus-6qt',
    },
    title: 'Instant Pot Duo Plus 6 Qt Review: 90-Day Professional Test',
    description: 'Professional chef\'s honest review of the Instant Pot Duo Plus 6qt after 90 days of daily testing. Real results with pot roast, rice, beans, and more.',
    openGraph: {
      title: 'Instant Pot Duo Plus 6 Qt Review: 90-Day Professional Test',
      description: 'After 90 days testing the Instant Pot Duo Plus with 24 years of professional kitchen experience.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/instant-pot-duo-plus-6qt',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Instant Pot Duo Plus 6 Qt Review",
        rating: 4.5,
        testingPeriod: "90 Days Testing",
        tier: 3
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Instant Pot Duo Plus 6 Qt Review',
      description: 'Professional chef\'s honest 90-day test of the Instant Pot Duo Plus 6 quart pressure cooker.',
      images: [generateOGImageURL({
        title: "Instant Pot Duo Plus 6 Qt Review",
        rating: 4.5,
        testingPeriod: "90 Days Testing",
        tier: 3
      })],
    },
  }
}

const faqData = [
  {
    question: "Is the Instant Pot Duo Plus worth the money?",
    answer: "After 90 days of daily use, yes—if you cook for 4+ people, meal prep regularly, or frequently make beans, rice, and braised meats. The combination of hands-off convenience, consistent results, and 9-in-1 functionality justifies the ~$100 investment. However, if you cook for 1-2 people or primarily make quick stovetop meals, you may not use it enough to justify the counter space."
  },
  {
    question: "How does the Instant Pot compare to commercial pressure cookers?",
    answer: "After using commercial pressure equipment for 24 years in professional kitchens, the Instant Pot delivers approximately 70% of professional performance at 5% of the cost. The natural release function produces genuinely restaurant-quality results for braised meats. However, commercial equipment has more powerful heating elements, faster pressure buildup, and more precise pressure regulation."
  },
  {
    question: "Why does it take so long if pressure cooking is supposed to be fast?",
    answer: "This is the most common misconception. 'Pressure cooking' refers to the active cooking time under pressure, not total time. For a pot roast: 10-15 minutes to come to pressure, 75 minutes cooking time, 20 minutes natural release = 105-110 minutes total. That's still half the time of traditional braising (4-5 hours), but it's not quick cooking—it's convenient hands-off cooking."
  },
  {
    question: "Can I use the Instant Pot to brown meat properly?",
    answer: "The sauté function works fine for aromatics and ground meat, but it lacks the heat output for proper Maillard reaction browning on large roasts. My recommendation: brown large cuts in a cast iron skillet on the stovetop (takes 3-4 minutes with proper heat), then transfer to the Instant Pot for pressure cooking."
  },
  {
    question: "Is the 6-quart size big enough?",
    answer: "The 6-quart capacity is perfect for 4-6 people or meal prep for 2-3 people. I can fit a 2.5-pound roast, 4 cups of dried beans, or enough rice for 8-10 servings. However, pressure cookers shouldn't be filled more than 2/3 full for liquids or 1/2 full for grains, so the effective capacity is 4 quarts for most dishes."
  },
  {
    question: "Is the Instant Pot safe? I'm worried about pressure cooker explosions.",
    answer: "The Instant Pot has 10 proven safety mechanisms and is UL certified. Modern electric pressure cookers are dramatically safer than old stovetop models from the 1970s-80s. The lid won't open while under pressure, the pressure release valve is automated, and there are multiple backup systems. In 90 days of daily use, I've had zero safety concerns."
  }
];

export default async function InstantPotDuoPlusReview() {
  // Get product data from centralized Supabase database - SINGLE SOURCE OF TRUTH
  const product = await getProductBySlug('instant-pot-duo-plus-6qt')
  if (!product) {
    throw new Error('Product not found: instant-pot-duo-plus-6qt')
  }

  const affiliateLink = getPrimaryAffiliateLink(product)

  const productData = {
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    category: product.category,
    rating: product.expertRating || 4.5,
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
        rating={4.5}
        hook="70% of commercial pressure cooking performance at 5% of the cost"
        category="Appliances"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">90 DAYS PROFESSIONAL TESTING</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Instant Pot Duo Plus 6 Qt Review
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            After 90 days of daily use and 24 years in professional kitchens, here&rsquo;s what you need to know before you buy
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★½</span>
              <span>4.5/5</span>
            </div>
            <div>Tier 3: Expert Evaluation</div>
            <div>~$100</div>
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
                I purchased the Instant Pot Duo Plus in October 2025 specifically to review it for this site.
                I&rsquo;m currently at 90 days of daily testing across multiple cooking methods.
              </p>
              <p className="text-sm text-amber-800">
                <strong>Next Update:</strong> April 2026 (6-month mark)<br/>
                <strong>Tier 2 Upgrade:</strong> October 2026 (12-month mark with long-term durability data)
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Simplify Your Cooking?</h2>

          <p className="text-lg text-gray-700 mb-6">
            After 90 days of professional testing, the Instant Pot Duo Plus delivers restaurant-quality results with
            true hands-off convenience. Perfect for families, meal preppers, and busy home cooks.
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
              Over 24 years in professional kitchens, I&rsquo;ve used commercial pressure cookers at Mellow Mushroom for stock reduction
              and rapid bean cooking, worked with steam-jacketed kettles at Purple Café for large-batch soups and sauces, and operated
              combi ovens that utilize pressure-steam principles for precise cooking. I understand pressure cooking at a fundamental
              level—what proper pressure regulation feels like, how different release methods affect texture, and what separates
              consistent results from inconsistent ones.
            </p>

            <p>
              Commercial pressure equipment costs $2,000-$8,000 and delivers precise, repeatable results under heavy daily volume.
              The Instant Pot Duo Plus costs around $100 and promises to bring pressure cooking convenience to home kitchens. After
              90 days of daily testing, I can evaluate whether this consumer appliance applies proper commercial principles or if
              it&rsquo;s just marketing hype.
            </p>
          </div>
        </section>

        {/* Real-World Testing */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Real-World Testing: 90 Days of Daily Use</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>Pot Roast Test (The Signature Dish)</h3>
            <p>
              <strong>Setup:</strong> 2.5-pound chuck roast, standard mirepoix, beef stock, pressure cook 75 minutes,
              natural release 20 minutes.
            </p>

            <p>
              <strong>Results:</strong> The meat was fall-apart tender, rivaling anything I&rsquo;ve made in commercial kitchens.
              The natural release is key here—it prevents the meat from seizing up and becoming tough. However, the sauté
              function couldn&rsquo;t properly brown the roast. I ended up removing the mirepoix before pressure cooking because
              it turned to mush during the extended browning attempt.
            </p>

            <h3 className="mt-8">Rice Test (The Daily Driver)</h3>
            <p>
              <strong>Setup:</strong> 2 cups white rice, 2 cups water, rice setting, natural release 10 minutes.
            </p>

            <p>
              <strong>Results:</strong> Perfect fluffy rice every single time. This is where the Instant Pot shines for
              everyday use. No monitoring required, no risk of burning. The rice comes out separate, properly cooked, with
              consistent texture from top to bottom.
            </p>

            <h3 className="mt-8">Beans & Legumes Test</h3>
            <p>
              <strong>Results:</strong> Dried beans in 30-40 minutes without pre-soaking, and they&rsquo;re creamy inside without
              being mushy. The Instant Pot eliminates the planning requirement—dried beans to table in under an hour is
              genuinely convenient.
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who This Is For</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Buy the Instant Pot Duo Plus if you:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Meal prep for 4-6 people or cook large batches regularly</strong> — The 6-quart capacity is perfect for families or weekly meal preparation</li>
              <li>• <strong>Want hands-off cooking that doesn&rsquo;t require monitoring</strong> — Set it and walk away</li>
              <li>• <strong>Cook beans, rice, braised meats, or stews regularly</strong> — These are where pressure cooking delivers maximum time savings</li>
              <li>• <strong>Don&rsquo;t mind the time investment</strong> — Total time is 1.5-2 hours for most dishes (not quick cooking—convenient cooking)</li>
              <li>• <strong>Have counter space or storage space</strong> — It&rsquo;s 13&quot; x 12&quot; x 12.5&quot; and weighs 13 pounds</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip the Instant Pot Duo Plus if you:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Cook primarily for 1-2 people</strong> — The 6-quart capacity is too large. Look at the 3-quart Duo Mini instead</li>
              <li>• <strong>Need truly fast weeknight dinners</strong> — Most meals take 1.5-2 hours minimum with pressurization and release</li>
              <li>• <strong>Expect commercial-level searing and browning</strong> — Brown meats separately in a cast iron skillet</li>
              <li>• <strong>Cook a lot of pasta, quick sautés, or high-heat stir-fries</strong> — Stick with your stovetop for these</li>
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
            After 90 days of daily testing, the Instant Pot Duo Plus delivers 70% of commercial pressure cooking
            performance at 5% of the cost. For families and meal preppers, this is a legitimate game-changer.
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
