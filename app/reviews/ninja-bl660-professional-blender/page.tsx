import { Metadata } from 'next'
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
      canonical: 'https://www.chefapprovedtools.com/reviews/ninja-bl660-professional-blender',
    },
    title: 'Ninja BL660 Professional Blender Review: 90-Day Honest Test',
    description: 'Professional chef&rsquo;s brutally honest review of the Ninja BL660 after 90 days. Wing sauce, smoothies, margaritas—plus the quality control issue nobody talks about.',
    openGraph: {
      title: 'Ninja BL660 Professional Blender Review: Honest 90-Day Test',
      description: 'After 90 days testing the Ninja BL660—including a quality control issue—here&rsquo;s what you need to know before buying.',
      type: 'article',
      url: 'https://www.chefapprovedtools.com/reviews/ninja-bl660-professional-blender',
      siteName: 'Chef Approved Tools',
      images: [generateOGImageURL({
        title: "Ninja BL660 Blender Review",
        rating: 3.8,
        testingPeriod: "90 Days Testing",
        tier: 3
      })],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ninja BL660 Professional Blender Review',
      description: 'Professional chef&rsquo;s honest 90-day test of the Ninja BL660 blender with real pros, cons, and a quality control issue.',
      images: [generateOGImageURL({
        title: "Ninja BL660 Blender Review",
        rating: 3.8,
        testingPeriod: "90 Days Testing",
        tier: 3
      })],
    },
  }
}

const faqData = [
  {
    question: "Is the Ninja BL660 as good as a Vitamix?",
    answer: "No. Absolutely not. After using commercial Vitamix blenders for 24 years in professional kitchens, the performance gap is immediately obvious. The Vitamix has a 2.0 HP motor (50% more power), all-metal drive system, hardened blades, variable speed control, and 15-20 year lifespan. The Ninja has a 1.34 HP motor, plastic components, quality control issues, and 2-3 year expected lifespan. For liquid-heavy smoothies and sauces, the Ninja performs adequately. For thick mixtures, daily use, or commercial volume, the Vitamix is transformatively better."
  },
  {
    question: "What about the crack you discovered? Should I not buy this?",
    answer: "The crack appeared within 2 weeks of careful use—no drops, no thermal shock, just standard blending. This is a serious quality control concern that suggests manufacturing inconsistency or design weakness. I will update this review with how Ninja&rsquo;s customer service handles the warranty replacement. If you buy the BL660, inspect the pitcher base carefully when it arrives, test it immediately within the return window, and keep your receipt for warranty claims."
  },
  {
    question: "Can I make nut butter or hummus in the Ninja BL660?",
    answer: "I attempted nut butter once—the motor struggled, bogged down, and couldn&rsquo;t create the vortex needed for thick mixtures. The 1000-watt motor isn&rsquo;t powerful enough for thick, paste-like mixtures. For nut butters, hummus, or thick smoothie bowls, you need either a Vitamix (2.0 HP motor) or a food processor. The Ninja BL660 is designed for liquid-heavy blending—smoothies with adequate liquid, sauces, frozen drinks."
  },
  {
    question: "How loud is the Ninja BL660?",
    answer: "Measured at approximately 85-90 decibels during operation—comparable to most household blenders. You can&rsquo;t have a conversation in the same room while blending. For noise-sensitive households, early morning smoothies will wake people up. This is a standard blender noise level—not silent, not ear-splitting."
  },
  {
    question: "How long will the Ninja BL660 last?",
    answer: "Based on 90 days of use and 24 years of commercial kitchen equipment experience: expect 2-3 years of regular home use (2-4 times per week). Quality control issues, budget-grade construction, and consumer-grade motor design suggest this is not a decade-spanning appliance. The Vitamix costs 1/4 the price but lasts 1/6 as long—so the Vitamix is actually cheaper per year of use if you&rsquo;ll use it regularly."
  },
  {
    question: "Should I buy the Ninja BL660 or save up for a Vitamix?",
    answer: "Buy the Ninja if: You blend 2-3 times per week maximum, primarily make smoothies with adequate liquid, and either can&rsquo;t afford $400 right now or aren&rsquo;t sure you&rsquo;ll use a blender enough to justify premium pricing. Save for Vitamix if: You blend 4+ times per week, make thick mixtures, want genuine commercial-grade performance, or plan to use this blender for 10+ years."
  }
];

export default async function NinjaBL660Review() {
  const product = await getProductBySlug('ninja-bl660-professional-blender')
  if (!product) {
    throw new Error('Product not found: ninja-bl660-professional-blender')
  }

  const affiliateLink = product.affiliateLinks?.[0]?.url || 'https://amzn.to/4qpYTdg'

  const productData = {
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    category: product.category,
    rating: product.expertRating || 3.8,
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
        rating={3.8}
        hook="Adequate budget blending with concerning quality control issues"
        category="Appliances"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">90 DAYS PROFESSIONAL TESTING</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ninja BL660 Professional Blender Review: Brutally Honest 90-Day Test
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            After 90 days of testing—including a quality control issue that appeared within 2 weeks—here&rsquo;s the unfiltered truth about this budget blender from a chef who&rsquo;s used commercial Vitamix for 24 years.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★☆</span>
              <span>3.8/5</span>
            </div>
            <div>Tier 3: Expert Evaluation</div>
            <div>~$80-100</div>
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
                I purchased the Ninja BL660 in October 2025 specifically to review it for this site. I&rsquo;m currently at 90 days of
                testing with smoothies, margaritas, wing sauce, and salsa—plus monitoring a quality control issue that appeared
                within 2 weeks (small crack in pitcher base).
              </p>
              <p className="text-sm text-amber-800">
                <strong>Next Update:</strong> April 2026 (6-month mark with crack progression assessment)<br/>
                <strong>Tier 2 Upgrade:</strong> October 2026 (12-month mark if pitcher survives long-term testing)
              </p>
            </div>
          </div>
        </div>

        {/* Quality Control Warning */}
        <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-red-900 mb-2">Quality Control Issue Discovered</p>
              <p className="text-sm text-red-800 mb-2">
                Within 2 weeks of careful use, a small crack appeared in the pitcher base where the blade assembly seals into the
                container. This is a concerning quality control issue that could lead to leaking or complete pitcher failure. I&rsquo;m
                continuing to test to see if the crack progresses, but this raises serious questions about long-term durability.
              </p>
              <p className="text-sm text-red-800">
                <strong>I will update this review with how Ninja&rsquo;s customer service responds to warranty replacement.</strong> This issue will be a major
                factor in the final Tier 2 review after 12 months of testing.
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Budget Blending with Caveats</h2>

          <p className="text-lg text-gray-700 mb-6">
            After 90 days of professional testing, the Ninja BL660 delivers adequate performance for smoothies, sauces, and frozen drinks at a budget price. However, quality control concerns (crack within 2 weeks) significantly impact long-term confidence.
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
              Over 24 years in professional kitchens, I&rsquo;ve destroyed at least a dozen blenders—Vitamix 5200s running 8+ hours daily at
              Purple Café, Robot Coupe commercial models for high-volume sauce production, Waring heavy-duty units that lasted 2 years
              before motor failure. I know what motor power actually means (not just wattage marketing), how blade design affects blending
              efficiency, which features matter versus marketing gimmicks, and what separates 2-year appliances from 15-year investments.
            </p>

            <p>
              At Purple Café, we used Vitamix 5200 blenders for smoothie operations—30-50 drinks per shift, ice crushing, frozen fruit,
              daily abuse. Those blenders ran for 5+ years with zero maintenance beyond cleaning. At Mellow Mushroom, we used cheaper
              commercial blenders for pizza sauce emulsification and salad dressings—they failed within 18-24 months under restaurant
              volume. I understand the difference between consumer-grade and commercial-grade equipment at a fundamental level.
            </p>

            <p>
              The Ninja BL660 promises &ldquo;professional&rdquo; performance at $80-100, roughly 1/5 the cost of a Vitamix 5200 ($400-500). The
              marketing emphasizes 1000-watt motor power and a tiered blade system. After 90 days of home testing, I can evaluate whether
              this is legitimate value or just budget-grade equipment with professional-sounding marketing.
            </p>
          </div>
        </section>

        {/* Real-World Testing */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Real-World Testing: 90 Days of Smoothies, Sauces & Margaritas</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>Smoothie Test (The Daily Driver)</h3>
            <p>
              <strong>First attempt (learning curve):</strong> Overloaded with frozen fruit, minimal liquid. Motor bogged down, blades
              struggled, had to stop and add more liquid. This taught me the BL660&rsquo;s fundamental limitation—it needs adequate liquid
              to create the vortex.
            </p>

            <p>
              <strong>Successful formula:</strong> 1 cup liquid minimum (milk, juice, water) per 2 cups frozen fruit/ice. With this
              ratio, smoothies blended consistently—frozen strawberries, bananas, ice, spinach (for green smoothies), protein powder.
              Texture was smooth, no large chunks, acceptable consistency. Total blend time: 45-60 seconds on medium-high speed.
            </p>

            <p>
              <strong>Comparison to Vitamix:</strong> The Vitamix would have powered through my overloaded first attempt without complaint.
              The Vitamix creates a tighter vortex and can handle thicker mixtures with the tamper accessory. However, for standard
              smoothies with proper liquid ratio, the BL660 produces comparable results at 1/5 the price.
            </p>

            <h3 className="mt-8">Wing Sauce Test (The Emulsification Challenge)</h3>
            <p>
              This is where the BL660 genuinely impressed me. Buffalo wing sauce is an emulsion—melted butter and hot sauce (which are
              naturally antagonistic and want to separate) blended with vinegar, garlic, and seasonings. Poor emulsification results in
              separated sauce that doesn&rsquo;t coat wings properly.
            </p>

            <p>
              <strong>Setup:</strong> 1 cup melted butter (hot), 1 cup Frank&rsquo;s RedHot, 2 cloves garlic, 1 tablespoon white vinegar,
              cayenne and black pepper to taste. Blended on high for 60 seconds.
            </p>

            <p>
              <strong>Results:</strong> Beautiful, silky-smooth emulsion. The sauce remained cohesive without separating—even after
              sitting for 30 minutes. The tiered blade system pulled butter from the bottom, hot sauce from the sides, creating thorough
              mixing that hand-whisking rarely achieves. When I tossed wings in this sauce, they were evenly coated with no pooling of
              separated butter. This is where the BL660 justifies its existence—tasks requiring emulsification where blade coverage matters
              more than raw motor power.
            </p>

            <h3 className="mt-8">Margarita Test (Frozen Drinks & Ice Crushing)</h3>
            <p>
              <strong>Setup:</strong> Ice (2 cups), frozen strawberries (1 cup), fresh lime juice (1/4 cup), premium margarita mix
              (1 cup)—no alcohol in testing since I quit drinking, but tested the blending performance regardless.
            </p>

            <p>
              <strong>Results:</strong> Ice crushed completely, smooth frozen drink consistency, no large ice chunks. The 1000-watt
              motor handled ice crushing adequately—not as fast as commercial Vitamix units (which demolish ice in 10-15 seconds), but
              acceptable for home use (30-45 seconds). Texture was restaurant-quality frozen margarita—slushie consistency without being watery.
            </p>

            <h3 className="mt-8">The Quality Control Issue (Critical Concern)</h3>
            <p>
              <strong>Timeline:</strong> Crack appeared approximately 2 weeks after purchase (mid-October 2025), after maybe 10-12 uses
              total. No drops, no thermal shock (didn&rsquo;t pour hot liquids), no abuse—just standard smoothie and sauce blending.
            </p>

            <p>
              <strong>Location:</strong> Small crack (approximately 1/4 inch) in the pitcher base where the black plastic blade holder
              seals into the clear plastic pitcher. It appears to be a stress crack from the blade assembly pressure or thermal expansion/
              contraction during use.
            </p>

            <p>
              <strong>Current status:</strong> Crack hasn&rsquo;t progressed significantly in the subsequent 10 weeks, no leaking during use,
              but this is a serious red flag for long-term durability. <strong>I will document how Ninja&rsquo;s customer service handles warranty replacement in future updates.</strong>
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who This Is For (And Who Should Skip It)</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Buy the Ninja BL660 if you:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Make smoothies 2-4 times per week with proper liquid ratios</strong> — If you&rsquo;re adding at least 1 cup liquid per 2 cups frozen fruit/ice, this performs adequately</li>
              <li>• <strong>Need emulsification for sauces, dressings, or dips</strong> — The tiered blade system excels at wing sauce, vinaigrettes, and salsa</li>
              <li>• <strong>Make frozen drinks occasionally</strong> — Margaritas, daiquiris, smoothies with ice—this handles ice crushing acceptably for home use</li>
              <li>• <strong>Understand this is a 2-3 year appliance, not a 15-year investment</strong> — Set your longevity expectations accordingly</li>
              <li>• <strong>Want to test whether you&rsquo;ll actually use a blender before investing in Vitamix</strong> — At $80-100, this is a reasonable trial</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip the Ninja BL660 if you:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Blend daily or use commercial volume</strong> — This is a consumer appliance with consumer durability</li>
              <li>• <strong>Make thick mixtures regularly (nut butters, hummus, thick smoothie bowls)</strong> — The 1000-watt motor isn&rsquo;t powerful enough</li>
              <li>• <strong>Want buy-it-for-life quality</strong> — The quality control issue and budget-grade plastic construction indicate this is not a decade-spanning appliance</li>
              <li>• <strong>Need commercial-grade build quality</strong> — The plastic pitcher feels budget-grade compared to Vitamix&rsquo;s commercial-quality materials</li>
              <li>• <strong>Prioritize safety in households with children</strong> — The extremely sharp blades (I cut myself during first wash) are a genuine safety concern</li>
            </ul>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Technical Specifications</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 font-semibold">Specification</th>
                  <th className="text-left p-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Motor Power</td>
                  <td className="p-3">1000 watts (approximately 1.34 HP)</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="p-3 font-medium">Pitcher Capacity</td>
                  <td className="p-3">72 ounces (9 cups / 2.1 liters)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Blade System</td>
                  <td className="p-3">Total Crushing Technology—tiered blades with multiple cutting surfaces</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="p-3 font-medium">Speed Settings</td>
                  <td className="p-3">3 speeds (Low, Medium, High) plus Pulse</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Pitcher Material</td>
                  <td className="p-3">BPA-free plastic</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="p-3 font-medium">Dimensions</td>
                  <td className="p-3">9.5&quot; x 7.5&quot; x 17&quot; (W x D x H)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Weight</td>
                  <td className="p-3">8.99 pounds</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="p-3 font-medium">Dishwasher Safe</td>
                  <td className="p-3">Yes—pitcher, lid, and blade assembly (not motor base)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Warranty</td>
                  <td className="p-3">1 year limited warranty</td>
                </tr>
              </tbody>
            </table>
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
            After 90 days of testing, the Ninja BL660 delivers adequate performance for smoothies, sauces, and frozen drinks at a budget price. However, quality control concerns significantly impact long-term confidence. I will update this review with Ninja&rsquo;s warranty response.
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
