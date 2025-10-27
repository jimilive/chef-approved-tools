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
      canonical: 'https://www.chefapprovedtools.com/reviews/small-plastic-hotel-pans',
    },
    title: 'Small Plastic Hotel Pans Review: End Tupperware Chaos Forever',
    description: 'After 20 years using plastic hotel pans at home, professional chef review of the NSF-approved containers that eliminate kitchen organization chaos.',
    openGraph: {
      title: 'Small Plastic Hotel Pans Review: End Tupperware Chaos Forever',
      description: 'Professional chef\'s 20-year review of small plastic hotel pans for home organization.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/small-plastic-hotel-pans',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Small Plastic Hotel Pans Review",
        rating: 5,
        testingPeriod: "20 Years Using",
        tier: 1
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Small Plastic Hotel Pans Review',
      description: 'Professional chef\'s 20-year review of small plastic hotel pans for home meal prep.',
      images: [generateOGImageURL({
        title: "Small Plastic Hotel Pans Review",
        rating: 5,
        testingPeriod: "20 Years Using",
        tier: 1
      })],
    },
  }
}

const faqData = [
  {
    question: "How long do plastic hotel pans last?",
    answer: "Decades. I've been using the same pans at home for 20 years. They're virtually indestructible for normal home use."
  },
  {
    question: "Are they microwave safe?",
    answer: "Technically yes, but I don't recommend it. While the plastic can handle microwave heat, it's not ideal for even heating. I transfer food to plates/bowls for reheating."
  },
  {
    question: "Can I put them in the freezer?",
    answer: "Yes—they're freezer safe. I use them for freezing stock, soups, and cooked grains."
  },
  {
    question: "Will they stain from tomato sauce?",
    answer: "Not the opaque white versions. Avoid translucent/clear plastic (which can stain). The solid white plastic resists staining even from tomato sauce, curry, turmeric, and other pigmented foods."
  },
  {
    question: "Do I need 1/6 or 1/9 pans?",
    answer: "Start with 1/6 pans. They're more versatile for home use. Only add 1/9 pans if you have specific small-portion needs (sauces, garnishes, etc.)."
  },
  {
    question: "How do they compare to glass containers?",
    answer: "Hotel pans win for lighter weight, won't shatter if dropped, cheaper, and better stacking. Glass wins for microwave reheating and oven use. For meal prep and storage, I prefer plastic hotel pans."
  }
];

export default async function SmallPlasticHotelPansReview() {
  const product = await getProductBySlug('small-plastic-hotel-pans')
  if (!product) {
    throw new Error('Product not found: small-plastic-hotel-pans')
  }

  // Also fetch related large plastic hotel pans for cross-sell
  const relatedProduct = await getProductBySlug('large-plastic-hotel-pans')

  const affiliateLink = getPrimaryAffiliateLink(product)
  const relatedAffiliateLink = relatedProduct ? getPrimaryAffiliateLink(relatedProduct) : 'https://amzn.to/4qtKjSe'

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
        hook="The single best upgrade for kitchen organization"
        category="Storage"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">20 YEARS DAILY HOME USE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Small Plastic Hotel Pans Review: End Tupperware Chaos Forever
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            After 20 years using plastic hotel pans at home and 24 years in professional kitchens, here&rsquo;s why this is the best kitchen organization upgrade you can make
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>5/5</span>
            </div>
            <div>Tier 1: Long-Term Testing</div>
            <div>~$75-180</div>
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
              <strong>Best For:</strong> Meal preppers, home cooks tired of container chaos, anyone who wants restaurant-level organization
            </p>
            <p className="text-gray-700 mt-2">
              <strong>My Top Pick:</strong> <a href={affiliateLink} className="text-orange-600 hover:underline">6-Inch 1/6 Pan 6-Pack with Lids</a> - the most versatile size for home use
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to End Container Chaos?</h2>

          <p className="text-lg text-gray-700 mb-6">
            After 20 years of daily home use, these small plastic hotel pans are the single best upgrade for kitchen organization.
            No more mismatched lids, no more avalanche containers, no more wasted fridge space.
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

        {/* Why I'm Reviewing This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why I&rsquo;m Reviewing Small Plastic Hotel Pans</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              I spent 24 years in professional kitchens where organization isn&rsquo;t optional—it&rsquo;s survival. Every restaurant
              I&rsquo;ve worked in (Mellow Mushroom, Purple Café, Feierabend, Il Pizzaiolo, Paragary&rsquo;s) uses the hotel pan system
              because <strong>nothing else comes close for functional food storage</strong>.
            </p>

            <p>
              Twenty years ago, I brought this system home. <strong>It changed everything.</strong>
            </p>

            <p className="font-semibold">No more:</p>
            <ul>
              <li>Avalanche of mismatched containers when you open the cabinet</li>
              <li>Searching for lids that actually fit</li>
              <li>Containers that crack after 6 months</li>
              <li>Wasted refrigerator space from poor stacking</li>
              <li>Mystery leftovers in random containers</li>
            </ul>

            <p>
              <strong>Small plastic hotel pans solve all of this.</strong> They&rsquo;re the sweet spot for home use—big enough
              for real meal prep portions but not so large they dominate your fridge like commercial full pans.
            </p>
          </div>
        </section>

        {/* What Are Small Plastic Hotel Pans */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What Are Small Plastic Hotel Pans?</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Small plastic hotel pans are NSF-approved food storage containers in standardized sizes that fit together in a modular system:
            </p>

            <div className="bg-white p-6 rounded-lg border border-gray-200 my-6">
              <h3 className="text-xl font-bold mb-4">1/6 Pans (my primary recommendation):</h3>
              <ul>
                <li>Approximately 6.75&quot; x 6.25&quot; footprint</li>
                <li>Available in 6-inch depth (my go-to) or 4-inch depth</li>
                <li>Holds 2-4 servings depending on contents</li>
                <li>Perfect for meal prep portions</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 my-6">
              <h3 className="text-xl font-bold mb-4">1/9 Pans (use carefully):</h3>
              <ul>
                <li>Approximately 4.25&quot; x 6.75&quot; footprint</li>
                <li>Available in 4-inch depth</li>
                <li>Narrower and deeper = can tip over when full</li>
                <li>Good for small portions (sauces, cheese, garnishes)</li>
              </ul>
            </div>

            <p><strong>All Curta plastic hotel pans are:</strong></p>
            <ul>
              <li>NSF certified (restaurant food safety standards)</li>
              <li>BPA-free polypropylene</li>
              <li>Dishwasher safe (even commercial dishwashers at 180°F+)</li>
              <li>Freezer safe</li>
              <li>Stackable with matching lids</li>
            </ul>
          </div>
        </section>

        {/* Real-World Home Use */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">My Real-World Home Use (20 Years of Daily Testing)</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>Sunday Meal Prep</h3>
            <p>Every Sunday, I batch-cook for the week. Here&rsquo;s how I use plastic hotel pans:</p>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">Proteins (6-inch 1/6 pans):</p>
              <ul className="mb-4">
                <li>Grilled chicken thighs - 2 pans (8-10 thighs per pan)</li>
                <li>Ground beef for tacos/pasta - 1 pan (2 lbs cooked)</li>
                <li>Roasted salmon - 1 pan (4-6 portions)</li>
              </ul>

              <p className="font-semibold mb-2">Grains & Starches (4-inch 1/6 pans):</p>
              <ul className="mb-4">
                <li>Brown rice - 2 pans (each holds ~4 cups cooked)</li>
                <li>Roasted sweet potatoes - 1 pan (cubed, ready to reheat)</li>
                <li>Quinoa - 1 pan</li>
              </ul>

              <p className="font-semibold mb-2">Vegetables (4-inch 1/6 pans):</p>
              <ul>
                <li>Roasted broccoli - 1 pan</li>
                <li>Sautéed peppers & onions - 1 pan</li>
                <li>Mixed green salad base - 1 pan</li>
              </ul>
            </div>

            <p>
              Throughout the week, I grab containers and assemble meals in 5 minutes. Everything stacks perfectly
              in my refrigerator—no wasted space, no toppling containers.
            </p>
          </div>
        </section>

        {/* Size Recommendations */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Size Recommendations: Which Should You Buy?</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>After 20 years of home use, here&rsquo;s my honest guidance:</p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
              <h3 className="text-xl font-bold mb-3">Start Here: 6-Inch 1/6 Pans ⭐</h3>
              <p>
                <a href={affiliateLink} className="text-orange-600 hover:underline font-semibold">
                  Get the 6-Inch 1/6 Pan 6-Pack with Lids
                </a>
              </p>
              <p className="mt-3">This is the most versatile size for home cooks:</p>
              <ul>
                <li>Big enough for real meal prep portions</li>
                <li>Not so large it dominates your fridge</li>
                <li>Perfect depth for proteins, grains, vegetables</li>
                <li>Easy to handle when full</li>
                <li>Fits on most refrigerator shelves</li>
              </ul>
              <p className="font-semibold mt-4">
                Recommendation: Buy at least one 6-pack (6 pans + 6 lids). If you meal prep seriously, buy two 6-packs.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <h3 className="text-xl font-bold mb-3">Add This: 4-Inch 1/6 Pans</h3>
              <p>
                <a href={relatedAffiliateLink} className="text-orange-600 hover:underline font-semibold">
                  Get the 4-Inch 1/6 Pan 6-Pack with Lids
                </a>
              </p>
              <p className="mt-3">The shallower version is great for:</p>
              <ul>
                <li>Shredded cheese storage</li>
                <li>Marinating proteins (more surface area)</li>
                <li>Smaller leftover portions</li>
                <li>Prepped vegetables</li>
                <li>Sauces and dips</li>
              </ul>
              <p className="font-semibold mt-4">
                Recommendation: Buy one 6-pack to complement your 6-inch pans.
              </p>
            </div>
          </div>
        </section>

        {/* Link to Hotel Pan System Guide */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Learn More About the Hotel Pan System</h3>
          <p className="text-lg text-gray-700 mb-4">
            Want to understand the complete hotel pan system used in every professional kitchen? Check out my comprehensive guide.
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
            After 20 years of daily home use, small plastic hotel pans are the best kitchen organization upgrade
            you can make. Trust the system that every professional kitchen uses.
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
