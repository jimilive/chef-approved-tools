import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateButton from '@/components/AffiliateButton'
import FTCDisclosure from '@/components/FTCDisclosure'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import { getProductBySlug } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/small-metal-hotel-pans',
    },
    title: 'Small Metal Hotel Pans Review: Stainless Steel for Hot Holding & Oven Use',
    description: '24 years professional experience: Small metal hotel pans for BBQs, hot holding, oven roasting, and family gatherings. Essential for home hosting.',
    openGraph: {
      title: 'Small Metal Hotel Pans Review: Stainless Steel for Hot Holding',
      description: 'Professional chef review of small metal hotel pans for hosting, BBQs, and oven use.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/small-metal-hotel-pans',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Small Metal Hotel Pans Review",
        rating: 5,
        testingPeriod: "20 Years Using",
        tier: 1
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Small Metal Hotel Pans Review',
      description: 'Professional chef review of small metal hotel pans for hot holding and oven use.',
      images: [generateOGImageURL({
        title: "Small Metal Hotel Pans Review",
        rating: 5,
        testingPeriod: "20 Years Using",
        tier: 1
      })],
    },
  }
}

const faqData = [
  {
    question: "Are metal hotel pans oven-safe?",
    answer: "Yes—up to 500°F+ easily. Stainless steel handles high oven temperatures without warping or damage. I use them for roasting vegetables, baking proteins, and even brownies."
  },
  {
    question: "Can I use them on the stovetop?",
    answer: "Not recommended. Hotel pans have flat, uninsulated bottoms that don't distribute stovetop heat evenly. Use actual cookware (pots, pans, skillets) for stovetop cooking."
  },
  {
    question: "How do notched lids work?",
    answer: "Notched lids have a cutout that fits standard serving utensils. You keep the spoon/ladle IN the pan, and the lid still covers most of the pan to maintain heat. Essential for buffet and BBQ service."
  },
  {
    question: "Do I need both standard and notched lids?",
    answer: "Buy notched lids if you're using pans for serving hot food. Buy standard lids if you only need pans for oven cooking and storage. I primarily use notched lids because I host gatherings frequently."
  },
  {
    question: "Will they rust?",
    answer: "No—18/8 stainless steel is highly corrosion-resistant. As long as you clean them properly (dishwasher or hand-wash), they won't rust."
  },
  {
    question: "How do they compare to disposable aluminum pans?",
    answer: "Metal hotel pans win for reusability (decades vs. single-use), durability (won't bend or collapse), environmental impact (no waste), and cost over time (one-time purchase). For regular hosting, invest in metal hotel pans."
  }
];

export default async function SmallMetalHotelPansReview() {
  const product = await getProductBySlug('small-metal-hotel-pans')
  if (!product) {
    throw new Error('Product not found: small-metal-hotel-pans')
  }

  const affiliateLink = product.affiliateLinks?.[0]?.url || 'https://amzn.to/3Wny7og'
  const notchedLidsLink = 'https://amzn.to/47IgA0o'

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
        testingPeriod="20 years"
        rating={5}
        hook="Versatile workhorses for hot holding, oven use, and family gatherings"
        category="Storage"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">20 YEARS HOME USE + 24 YEARS PRO EXPERIENCE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Small Metal Hotel Pans Review: Stainless Steel for Hot Holding & Oven Use
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            After 20 years of home use and 24 years in professional kitchens, here&rsquo;s when you need metal over plastic
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>5/5</span>
            </div>
            <div>Tier 1: Long-Term Testing</div>
            <div>~$120-150</div>
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
              <strong>Best For:</strong> Home cooks who host gatherings, BBQ enthusiasts, anyone needing hot food holding, oven-safe versatility
            </p>
            <p className="text-gray-700 mt-2">
              <strong>My Top Pick:</strong> <a href={affiliateLink} className="text-orange-600 hover:underline">6-Inch 1/6 Pan 6-Pack (Metal)</a> + <a href={notchedLidsLink} className="text-orange-600 hover:underline">Notched Lids</a> for serving
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

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Host Like a Pro?</h2>

          <p className="text-lg text-gray-700 mb-6">
            After 20 years of using metal hotel pans for family gatherings, these are essential for anyone who hosts BBQs,
            holiday meals, or needs hot food holding capability.
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
                Get Metal Pans + Lids →
              </AffiliateButton>
            </CTAVisibilityTracker>

            <Link
              href="/reviews/small-plastic-hotel-pans"
              className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Just Need Cold Storage? See Plastic →
            </Link>
          </div>
        </section>

        {/* Why I'm Reviewing This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why I&rsquo;m Reviewing Small Metal Hotel Pans</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              I&rsquo;ve spent 24 years in professional kitchens (Mellow Mushroom, Purple Café, Feierabend, Il Pizzaiolo, Paragary&rsquo;s)
              where metal hotel pans are essential for:
            </p>
            <ul>
              <li>Hot holding food for service (steam tables, warmers)</li>
              <li>Oven cooking (roasting vegetables, baking proteins)</li>
              <li>High-heat applications (broilers, salamanders)</li>
              <li>Extreme durability (50+ uses per week for years)</li>
            </ul>

            <p className="mt-6">At home for 20 years, I&rsquo;ve used metal hotel pans for:</p>
            <ul>
              <li>Family BBQs (hot holding pulled pork, baked beans, mac & cheese)</li>
              <li>Holiday meals (keeping sides hot during Thanksgiving)</li>
              <li>Chafing dish setups (family reunions, potlucks, weddings)</li>
              <li>Oven roasting (vegetables, casseroles, batch cooking)</li>
            </ul>

            <p className="mt-6">
              <strong>Metal pans do things plastic can&rsquo;t:</strong> withstand high heat, hold food hot for hours,
              go from oven to table to cooler without issue.
            </p>
          </div>
        </section>

        {/* Real-World Home Use */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">My Real-World Home Use (20 Years of Experience)</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>Family BBQs (Most Common Use)</h3>
            <p>When I host backyard BBQs for 15-25 family members, metal hotel pans are essential:</p>

            <div className="bg-white p-6 rounded-lg border border-gray-200 my-6">
              <p className="font-semibold mb-2">Setup:</p>
              <ul>
                <li>Chafing dishes with Sterno cans underneath</li>
                <li>Metal hotel pans sit in the chafing dish water baths</li>
                <li>Notched lids let me keep serving spoons in place while maintaining heat</li>
              </ul>

              <p className="font-semibold mt-4 mb-2">What I Serve in 6-Inch 1/6 Pans:</p>
              <ul>
                <li>Pulled pork (stays hot and moist for 3-4 hours)</li>
                <li>Baked beans</li>
                <li>Mac & cheese</li>
                <li>Corn on the cob (cut into pieces)</li>
                <li>Roasted vegetables</li>
              </ul>
            </div>

            <p>
              <strong>Why Metal Matters:</strong> The pans sit directly over heat sources (Sterno, steam tables).
              Plastic would melt instantly. Metal handles the heat and keeps food at safe serving temperatures (140°F+) for hours.
            </p>

            <h3 className="mt-8">Thanksgiving & Holiday Meals</h3>
            <p>During Thanksgiving, metal hotel pans solve the &ldquo;keeping everything hot&rdquo; problem:</p>

            <div className="bg-white p-6 rounded-lg border border-gray-200 my-6">
              <p className="font-semibold mb-2">6-Inch 1/6 Pans Hold:</p>
              <ul>
                <li>Mashed potatoes (made ahead, kept hot in chafing dish)</li>
                <li>Green bean casserole (stays hot from oven to table)</li>
                <li>Stuffing (portions for easy serving)</li>
                <li>Gravy (4-inch 1/9 pan with notched lid for ladle)</li>
              </ul>
            </div>

            <p>
              <strong>The Strategy:</strong> Oven-cook sides in metal pans, transfer directly to chafing dishes or keep in
              a warming drawer. Everything stays hot while the turkey rests and gets carved. No more cold sides by the time
              everyone sits down to eat.
            </p>
          </div>
        </section>

        {/* Metal vs Plastic */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Metal vs. Plastic: When to Use Each</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              I own BOTH metal and plastic hotel pans because they serve different purposes:
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
              <h3 className="text-xl font-bold mb-3">Use Metal Hotel Pans When:</h3>
              <ul>
                <li><strong>Hot Holding Food</strong> — BBQs, family gatherings, potlucks, chafing dishes, steam tables</li>
                <li><strong>Oven Cooking</strong> — Roasting vegetables, proteins, casseroles, baking (up to 500°F+)</li>
                <li><strong>Maximum Durability Needed</strong> — Commercial kitchens, catering operations, outdoor events</li>
                <li><strong>Professional Appearance</strong> — Buffet setups where presentation matters</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <h3 className="text-xl font-bold mb-3">Use Plastic Hotel Pans Instead When:</h3>
              <ul>
                <li><strong>Cold Storage Only</strong> — Meal prep containers, refrigerator/freezer storage, everyday leftovers</li>
                <li><strong>Lighter Weight Needed</strong> — Transporting full pans to events, carrying from kitchen to table</li>
                <li><strong>Budget-Conscious</strong> — Plastic costs 40-50% less than metal</li>
              </ul>
            </div>

            <p>
              <strong>Bottom Line:</strong> I use plastic hotel pans for 90% of my <strong>cold storage</strong> needs
              and metal pans for 100% of my <strong>hot holding and oven use</strong> needs. They complement each other.
            </p>
          </div>
        </section>

        {/* Why Notched Lids Are Essential */}
        <section className="mb-12 bg-amber-50 p-8 rounded-xl border-2 border-amber-400">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Notched Lids Are Essential</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg font-semibold text-amber-900">
              Notched lids changed everything for me.
            </p>

            <h3 className="mt-6">The Problem with Standard Lids</h3>
            <p>When serving hot food from a chafing dish:</p>
            <ul>
              <li>Remove lid completely → food loses heat rapidly</li>
              <li>Keep lid on → can&rsquo;t access food easily</li>
              <li>Rest serving spoon outside pan → creates mess, spoon gets cold</li>
            </ul>

            <h3 className="mt-6">How Notched Lids Solve This</h3>
            <p>
              <strong>Notched lids have a cutout</strong> that lets you:
            </p>
            <ul>
              <li>Keep a ladle or serving spoon IN the pan</li>
              <li>Maintain heat by keeping most of the lid closed</li>
              <li>Allow easy serving without removing the entire lid</li>
            </ul>

            <p>
              <strong>This is how restaurants do buffet service.</strong> The notch is precisely sized for standard serving utensils.
            </p>

            <div className="bg-white p-6 rounded-lg border border-amber-200 my-6">
              <p className="font-semibold mb-2">When I Use Notched Lids:</p>
              <p className="mb-2">Every time I&rsquo;m serving hot food at gatherings:</p>
              <ul>
                <li>BBQ pulled pork (ladle stays in pan)</li>
                <li>Baked beans (serving spoon accessible)</li>
                <li>Mac & cheese (easy portioning)</li>
                <li>Gravy (ladle handle sticks through notch)</li>
              </ul>
            </div>

            <p className="font-semibold text-lg mt-6">
              Recommendation: If you&rsquo;re buying metal pans for hot holding, spend the extra $10-15 for notched lids. They&rsquo;re worth it.
            </p>

            <div className="mt-6">
              <AffiliateButton
                href={notchedLidsLink}
                merchant="amazon"
                product="small-metal-hotel-pans-notched-lids"
                position="mid_content"
                variant="secondary"
              >
                Get Notched Lids on Amazon →
              </AffiliateButton>
            </div>
          </div>
        </section>

        {/* Link to Hotel Pan System Guide */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Learn More About the Hotel Pan System</h3>
          <p className="text-lg text-gray-700 mb-4">
            Want to understand the complete hotel pan system and when to use plastic vs. metal?
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
            After 20 years of home use, small metal hotel pans are essential for anyone who hosts gatherings,
            uses chafing dishes, or needs oven-safe versatility. Trust the tools professional kitchens use for hot food service.
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
                Get Metal Pans + Notched Lids →
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
