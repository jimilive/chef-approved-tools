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
      canonical: 'https://www.chefapprovedtools.com/reviews/large-metal-hotel-pans',
    },
    title: 'Large Metal Hotel Pans Review: Commercial Hot Holding for Catering & Events',
    description: '24 years professional kitchen experience: Large metal hotel pans for catering businesses, commercial kitchens, and large-scale event hosting.',
    openGraph: {
      title: 'Large Metal Hotel Pans Review: Commercial Hot Holding',
      description: 'Professional chef review of large metal hotel pans for catering and commercial operations.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/large-metal-hotel-pans',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Large Metal Hotel Pans Review",
        rating: 5,
        testingPeriod: "24 Years Pro Use",
        tier: 1
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Large Metal Hotel Pans Review',
      description: 'Professional chef review of large metal hotel pans for catering and commercial hot holding.',
      images: [generateOGImageURL({
        title: "Large Metal Hotel Pans Review",
        rating: 5,
        testingPeriod: "24 Years Pro Use",
        tier: 1
      })],
    },
  }
}

const faqData = [
  {
    question: "Are these necessary for home cooking?",
    answer: "No, for typical home cooking (2-8 people). Large metal pans are designed for commercial operations and large-scale events. Use smaller 1/6 pans for family dinners and gatherings under 20 people."
  },
  {
    question: "Can I use them in home ovens?",
    answer: "Yes, if they fit. Full pans (12\" x 20\") may be too large for standard home ovens. 1/3 pans (7\" x 12\") fit most home ovens and work great for batch cooking."
  },
  {
    question: "How do notched lids work?",
    answer: "Notched lids have a cutout that fits serving utensils. The spoon/ladle stays IN the pan, and the lid covers the rest to maintain heat. Essential for buffet service."
  },
  {
    question: "Will they rust?",
    answer: "No—18/8 stainless steel is highly corrosion-resistant. Proper cleaning (dishwasher or hand-wash) prevents rust."
  },
  {
    question: "Can I rent these instead of buying?",
    answer: "Yes—many catering supply companies rent large pans and chafing dishes. For one-time events, renting makes sense. For regular use (churches, caterers), buying is more cost-effective."
  },
  {
    question: "How long do they keep food hot?",
    answer: "In chafing dishes with Sterno, 3-4 hours easily. Food must start at 140°F+ and stay above this temperature for safety. Notched lids help maintain heat."
  }
];

export default async function LargeMetalHotelPansReview() {
  const product = await getProductBySlug('large-metal-hotel-pans')
  if (!product) {
    throw new Error('Product not found: large-metal-hotel-pans')
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
        hook="Commercial workhorses for catering and large-scale hot food service"
        category="Storage"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">24 YEARS PROFESSIONAL KITCHEN EXPERIENCE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Large Metal Hotel Pans Review: Commercial Hot Holding for Catering & Events
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            After 24 years in professional kitchens, here&rsquo;s the truth about large metal pans for commercial hot food service
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
            <div>~$400-600</div>
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
              <strong>Best For:</strong> Catering businesses, commercial kitchens, church/community event kitchens, large-scale event hosting (weddings, reunions, fundraisers)
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Skip If:</strong> You&rsquo;re a typical home cook—use smaller 1/6 metal pans instead
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
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who Actually Needs Large Metal Hotel Pans?</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">✅ You SHOULD Buy These If:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>You run a catering business</strong> — Large metal pans are non-negotiable for transporting hot food to events and professional buffet service</li>
              <li>• <strong>You manage a church/community kitchen</strong> — Feeding 50+ people regularly requires commercial-scale hot holding equipment</li>
              <li>• <strong>You host major events at home</strong> — If you&rsquo;re planning a wedding reception, family reunion, or fundraiser for 50-100+ people</li>
              <li>• <strong>You operate a commercial kitchen</strong> — Restaurants, cafeterias, hospitals, schools all rely on large metal pans for steam table service</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-red-600">
            <h3 className="text-xl font-bold mb-3 text-gray-900">❌ You Should SKIP These If:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>You&rsquo;re a typical home cook</strong> — If you cook for 2-6 people regularly, large metal pans will dominate your kitchen</li>
              <li>• <strong>You only host small gatherings (under 20 people)</strong> — For family BBQs or holiday dinners, smaller 1/6 pans are more practical</li>
              <li>• <strong>You don&rsquo;t need hot holding</strong> — If you only need cold storage, plastic pans are more cost-effective</li>
              <li>• <strong>You have limited storage space</strong> — Even empty, large metal pans take up significant kitchen cabinet space</li>
            </ul>
          </div>
        </section>

        {/* Buy Section (Commercial) */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">For Catering & Commercial Operations</h2>

          <p className="text-lg text-gray-700 mb-6">
            After 24 years in professional kitchens, large metal hotel pans are essential for catering businesses
            and commercial hot food service. They&rsquo;re professional tools for professional-scale operations.
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
                Get Large Metal Pans (Commercial) →
              </AffiliateButton>
            </CTAVisibilityTracker>

            <Link
              href="/reviews/small-metal-hotel-pans"
              className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Better for Home? See Small Metal Pans →
            </Link>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">My Professional Experience with Large Metal Pans</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>At Mellow Mushroom (Kitchen Manager)</h3>
            <p>
              As Kitchen Manager, large metal hotel pans were essential for daily operations:
            </p>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">Steam Table Service:</p>
              <ul className="mb-4">
                <li>Full pans: pasta dishes (enough for 100+ servings)</li>
                <li>1/3 pans: pizza toppings for lunch buffet (pepperoni, sausage, vegetables)</li>
                <li>1/3 pans: salad bar components (grilled chicken, bacon bits, croutons)</li>
              </ul>

              <p className="font-semibold mb-2">Hot Holding During Rush:</p>
              <p>
                Friday and Saturday night service meant keeping food at 140°F+ for 4-6 hours. Full pans in steam tables
                maintained safe temperatures. Notched lids allowed servers to dish quickly without removing entire lid.
                Stainless steel withstood constant use without degradation.
              </p>
            </div>

            <h3 className="mt-8">Catering Experience</h3>
            <p>When catering off-site events (weddings, corporate lunches, fundraisers):</p>

            <div className="bg-white p-6 rounded-lg border border-gray-200 my-6">
              <p className="font-semibold mb-2">Transport:</p>
              <ul className="mb-4">
                <li>Full pans with lids transport hot food safely from kitchen to venue</li>
                <li>Stack securely in catering vans</li>
                <li>Lids seal tightly to prevent spills during transport</li>
              </ul>

              <p className="font-semibold mb-2">On-Site Setup:</p>
              <ul className="mb-4">
                <li>Metal pans drop directly into chafing dishes with water baths</li>
                <li>Sterno cans underneath maintain serving temperature for hours</li>
                <li>Notched lids essential for buffet service (guests serve themselves)</li>
              </ul>

              <p className="font-semibold mb-2">Post-Event:</p>
              <ul>
                <li>Metal pans survive the abuse of packing up quickly</li>
                <li>Dishwasher safe for easy cleanup back at the kitchen</li>
              </ul>
            </div>

            <p>
              <strong>Bottom Line:</strong> Every catering operation uses large metal hotel pans because nothing else
              combines capacity, heat retention, durability, and professional appearance.
            </p>
          </div>
        </section>

        {/* Why Notched Lids Are Essential */}
        <section className="mb-12 bg-amber-50 p-8 rounded-xl border-2 border-amber-400">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Notched Lids Are Essential for Buffets</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg font-semibold text-amber-900">
              Notched lids are the difference between professional and amateur buffet service.
            </p>

            <h3 className="mt-6">The Problem with Standard Lids</h3>
            <p>When serving buffet-style:</p>
            <ul>
              <li>Remove lid completely → food loses heat rapidly (unsafe after 2 hours)</li>
              <li>Keep lid on → guests can&rsquo;t access food easily</li>
              <li>Rest serving spoon outside pan → creates mess, utensil gets cold</li>
            </ul>

            <h3 className="mt-6">How Notched Lids Solve This</h3>
            <p>
              <strong>Notched lids have a cutout</strong> precisely sized for serving utensils:
            </p>
            <ul>
              <li>Ladle or serving spoon stays IN the pan</li>
              <li>Lid covers 90% of the pan to maintain heat</li>
              <li>Guests serve themselves easily without removing lid</li>
            </ul>

            <p className="mt-4">
              <strong>This is standard practice in professional catering.</strong> Notched lids maintain food at safe
              serving temperatures (140°F+) for hours.
            </p>

            <div className="bg-white p-6 rounded-lg border border-amber-200 my-6">
              <p className="font-semibold mb-2">When to Use Notched vs. Standard Lids:</p>
              <ul>
                <li><strong>Notched Lids:</strong> Any time you&rsquo;re serving buffet-style (chafing dishes, steam tables)</li>
                <li><strong>Standard Lids:</strong> Transport, storage, oven cooking (where you&rsquo;re not serving directly from the pan)</li>
              </ul>
            </div>

            <p className="font-semibold text-lg mt-6">
              Recommendation: If you&rsquo;re buying metal pans for catering or events, invest in notched lids.
              They&rsquo;re essential for proper buffet service.
            </p>
          </div>
        </section>

        {/* Link to Hotel Pan System Guide */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Learn More About the Hotel Pan System</h3>
          <p className="text-lg text-gray-700 mb-4">
            Want to understand the complete hotel pan system and which sizes work best for your operation?
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
            Large metal hotel pans are essential for catering businesses, commercial kitchens, and large-scale event hosting—but
            unnecessary for typical home cooking. Know your use case before investing.
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
                Get Large Metal Pans (Commercial) →
              </AffiliateButton>
            </CTAVisibilityTracker>

            <Link
              href="/reviews/small-metal-hotel-pans"
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
