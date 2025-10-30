import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateOGImageURL } from '@/lib/og-image'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

// Force dynamic rendering since we fetch from Supabase
export const dynamic = 'force-dynamic'

const legacyProductData = {
  name: "Benriner large mandoline",
  slug: "benriner-large-mandoline",
  brand: "Brand Name",
  category: "Kitchen Equipment",
  affiliateLinks: [],
  expertRating: 4.5,
  expertOpinion: "Professional-grade quality.",
  pros: [],
  cons: [],
  dateAdded: "2025-10-13",
  lastUpdated: "2025-10-13",
  images: {
    primary: "https://www.chefapprovedtools.com/og-image.jpg"
  }
};

const faqData = [
  {
    question: "Is the Benriner mandoline worth it?",
    answer: "After years of professional use, absolutely yes. The Japanese precision engineering delivers consistent results that justify the investment. Cuts prep time significantly and produces restaurant-quality uniform slices. For serious home cooks or professionals, this is the standard."
  },
  {
    question: "How dangerous is a mandoline slicer?",
    answer: "Extremely sharp blade requires serious respect. Always use the hand guard, never slice without it. Professional kitchens require cut-resistant gloves when using mandolines. The blade is sharp enough to slice through fingernails effortlessly—this is not an exaggeration. With proper safety protocols, it's safe. Without them, it's one of the most dangerous tools in the kitchen."
  },
  {
    question: "What's the difference between Benriner and cheap mandolines?",
    answer: "The blade quality is night and day. Benriner uses high-carbon Japanese stainless steel that stays sharp significantly longer. Cheap mandolines dull quickly and produce inconsistent results. Additionally, the adjustment mechanism on Benriner is precise and repeatable. Budget mandolines often have loose, imprecise adjustments that defeat the purpose of uniform slicing."
  },
  {
    question: "What vegetables work best on a mandoline?",
    answer: "Excellent for: cucumbers, potatoes, radishes, carrots, zucchini, apples, onions, cabbage. Basically any firm vegetable or fruit that you want uniformly sliced. Avoid: very soft items like tomatoes (unless extremely ripe), leafy greens, or anything too irregular in shape. Soft items get crushed rather than cleanly sliced."
  },
  {
    question: "Can you julienne with a Benriner?",
    answer: "Yes, the Benriner includes julienne blades for fine and medium cuts. Perfect for garnishes, salads, or stir-fry prep. The julienne quality matches the slicing precision—consistent, professional results."
  },
  {
    question: "How do you clean a Benriner mandoline safely?",
    answer: "Rinse immediately after use to prevent food from drying on blade. Use a brush or sponge—never your bare hand directly on blade. Dishwasher safe, but hand washing preserves blade edge longer. Always clean with extreme caution. The blade is sharp enough to cut through sponges effortlessly. Many professionals keep a dedicated brush just for mandoline cleaning."
  },
  {
    question: "How long does the blade stay sharp?",
    answer: "With proper care, the blade stays professionally sharp for years. In our restaurant environment with daily use, we found minimal dulling over time. The Japanese stainless steel holds an edge far better than budget alternatives. When it does eventually dull, replacement blades are available and reasonably priced."
  },
  {
    question: "Is the hand guard effective?",
    answer: "The included hand guard is well-designed and effective when used properly. It has spikes that grip the food securely and keeps your fingers safely away from the blade. That said, many professional cooks prefer cut-resistant gloves as additional protection. The hand guard is good, but the blade is so sharp that extra precaution is never wasted."
  }
];

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug('benriner-large-mandoline')
  const productData = product || legacyProductData

  return {
    title: 'Benriner Mandoline: Pro Safety & Precision | Chef Approved Tools',
    description: 'Professional chef tests Benriner mandoline after years of restaurant use. Complete review: precision slicing, safety features, durability analysis.',
    openGraph: {
      title: 'Benriner Mandoline: Professional Review',
      description: 'Professional chef tests Benriner mandoline after years of restaurant use',
      url: `https://www.chefapprovedtools.com/reviews/${productData.slug}`,
      siteName: 'Chef Approved Tools',
      images: [
        {
          url: generateOGImageURL({
            title: productData.name,
            rating: productData.expertRating ?? 4.5,
            testingPeriod: 'Years of Professional Testing',
            tier: 1,
          }),
          width: 1200,
          height: 630,
          alt: `${productData.name} - Professional Review`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Benriner Mandoline: Professional Review',
      description: 'Professional chef tests Benriner mandoline after years of restaurant use',
      images: [generateOGImageURL({
        title: productData.name,
        rating: productData.expertRating ?? 4.5,
        testingPeriod: 'Years of Professional Testing',
        tier: 1,
      })],
    },
  }
}

export default async function BenrinerLargeMandolineReview() {
  // Get product data from Supabase
  const product = await getProductBySlug('benriner-large-mandoline')

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = product ? {
    ...legacyProductData,
    ...product,
    affiliateLinks: product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : legacyProductData.affiliateLinks
  } : legacyProductData

  // Get primary affiliate link
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  // Generate schemas
  const productSchema = generateProductSchema({
    name: productData.name,
    description: productData.expertOpinion,
    brand: productData.brand,
    sku: productData.sku,
    gtin13: productData.gtin13,
    rating: productData.expertRating,
    reviewCount: 1,
    inStock: productData.inStock,
    url: `https://www.chefapprovedtools.com/reviews/${productData.slug}`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const faqSchema = generateFAQSchema(faqData)

  return (
    <>
      {/* Schema.org markup */}
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

      {/* Product view tracking */}
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={1}
        testingPeriod="Years of professional kitchen testing"
        rating={productData.expertRating}
        hook="Japanese precision engineering delivers professional prep speed and accuracy"
        category={productData.category}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            {' / '}
            <Link href="/reviews" className="hover:text-orange-700">Reviews</Link>
            {' / '}
            Benriner Large Mandoline
          </div>

        {/* SECTION 1: TOP SECTION */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          {/* FTC Disclosure */}
          <div className="bg-amber-100 border-l-[3px] border-amber-500 px-4 py-3 text-[13px] text-amber-900 mb-8 rounded">
            <strong>Disclosure:</strong> This page contains affiliate links. As an Amazon Associate, I earn from qualifying purchases at no additional cost to you. All recommendations are based on my 24 years of professional kitchen experience.
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-5">
            Benriner Large Mandoline Review: Professional Kitchen Test
          </h1>

          {/* Meta Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-5 border-b border-gray-200 mb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-2xl">
                👨‍🍳
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-base">Scott Bradley</div>
                <div className="text-sm text-slate-600">Professional Chef • 24 Years in Professional Kitchens</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
              <div className="text-xl font-bold text-orange-700">4.5</div>
              <div className="text-amber-500 text-base">★★★★☆</div>
            </div>
          </div>

          {/* Tier Badge */}
          <div className="inline-flex items-center gap-1.5 text-[13px] text-amber-900 bg-amber-100 px-3 py-1 rounded-md font-medium mb-5">
            <span>🏆</span>
            <span>Tier 1: Professional Kitchen Use</span>
            <Link href="#" className="text-orange-700 font-semibold hover:underline">What&apos;s this?</Link>
          </div>

          {/* Verdict Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-6">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">Professional Verdict</div>
            <p className="text-slate-900 text-base leading-[1.7] m-0">
              <strong>After years of professional use at Purple Cafe, the Benriner mandoline proved itself as genuine professional equipment.</strong> Japanese precision engineering delivers consistent slicing that transformed our prep efficiency. Ultra-sharp blade handles everything from paper-thin cucumber to julienned carrots with remarkable accuracy.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl px-10 py-5 text-center max-w-[500px] mx-auto flex flex-col justify-center items-center">
            <CTAVisibilityTracker ctaId="primary-hero-cta" position="above_fold">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-orange-700 font-semibold px-12 py-4 rounded-lg text-base transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg mb-2.5"
              >
                View on Amazon →
              </a>
            </CTAVisibilityTracker>
            <p className="text-white/90 text-[15px] m-0">Check current pricing and availability</p>
          </div>
        </div>

        {/* SECTION 2: TESTING RESULTS */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
            Years of Professional Kitchen Testing
          </h2>

          <p className="text-base leading-relaxed text-slate-900 mb-6">
            When I started using the Benriner mandoline at Purple Café, I was skeptical. We&apos;d tried various slicers over the years, and most ended up in the back of the storage room after a few months. But this Japanese-made mandoline changed my perspective on what consistent slicing equipment could deliver.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-8">
            I tested this alongside our <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-700 hover:text-orange-800 transition-colors">Victorinox chef knives</Link> and <Link href="/reviews/john-boos-platinum-commercial-cutting-board" className="text-orange-700 hover:text-orange-800 transition-colors">John Boos cutting boards</Link> at Purple Café. After years of daily professional use, it earned its permanent place in our prep station.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border border-green-200 bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Outstanding Performance
              </h3>
              <ul className="space-y-3 text-sm text-green-900">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Paper-thin slicing:</strong> Cucumbers so thin they&apos;re nearly transparent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Clean cuts:</strong> No crushing or tearing, even on delicate vegetables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Consistent results:</strong> Identical slices every single time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Speed improvement:</strong> 70% faster than knife work for uniform slicing</span>
                </li>
              </ul>
            </div>

            <div className="border border-amber-200 bg-amber-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Important Considerations
              </h3>
              <ul className="space-y-3 text-sm text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">!</span>
                  <span><strong>Extremely sharp:</strong> Most dangerous tool in kitchen - requires constant attention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">!</span>
                  <span><strong>Safety equipment mandatory:</strong> Hand guard must be used every single time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">!</span>
                  <span><strong>Plastic body:</strong> Not all-metal construction (though proven durable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">!</span>
                  <span><strong>Learning curve:</strong> Takes practice to master proper technique</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 3: PERFORMANCE ANALYSIS */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
            Performance Analysis: What Sets Benriner Apart
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">Blade Quality: The Japanese Difference</h3>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            The blade is the heart of any mandoline, and Benriner&apos;s high-carbon Japanese stainless steel is exceptional. This isn&apos;t marketing hyperbole—the difference is immediately obvious when you make your first slice.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            <strong>Sharpness Test:</strong> I can slice cucumbers so thin they&apos;re nearly transparent. The blade glides through root vegetables like potatoes and carrots without crushing or tearing. Even after years of professional use, the edge remains sharp enough for clean, precise cuts.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-6">
            Compared to budget mandolines I&apos;ve tested, the Benriner stays sharp significantly longer. Cheap mandolines dull quickly and start producing inconsistent results within months. The Benriner maintains professional performance for years.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">Precision and Consistency</h3>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            The adjustment mechanism is where Benriner separates itself from competitors. The thickness dial offers precise, repeatable settings from paper-thin to about 5mm. Each click provides consistent results—critical when you&apos;re slicing for even cooking or uniform presentation.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            In a professional kitchen serving hundreds of customers daily, consistency isn&apos;t optional. When we needed uniform potato slices for gratins or precisely thin radishes for garnish, the Benriner delivered identical results every single time.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-6">
            The julienne blades (included) are equally impressive. Fine and medium julienne options produce restaurant-quality matchstick cuts perfect for salads, garnishes, or stir-fry prep. The cuts are clean and consistent—exactly what you need for professional presentation.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">Durability and Construction</h3>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            The construction is sturdy but not heavy. The body is made from BPA-free plastic that&apos;s proven durable through years of professional use. While it&apos;s not all-metal construction, the design prioritizes functionality over aesthetics.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            The feet provide stable grip on countertops, though I sometimes secure it with a damp towel underneath for maximum stability during high-speed slicing. Pairs perfectly with our <Link href="/reviews/oxo-good-grips-bench-scraper" className="text-orange-700 hover:text-orange-800 transition-colors">OXO bench scraper</Link> for gathering sliced vegetables.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-6">
            After years of daily use in a commercial kitchen, our Benriner shows minimal wear. The adjustment mechanism remains tight and precise, and the blade still delivers professional results. When the blade eventually dulls, replacement blades are available at reasonable prices.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">Professional Kitchen Performance</h3>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            Over years of professional use, I&apos;ve put this mandoline through scenarios that would destroy budget alternatives:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="text-base leading-relaxed text-slate-900">
              <strong className="text-slate-900">High-Volume Prep:</strong> Slicing 50+ pounds of vegetables daily during peak season. The Benriner maintained consistent performance without dulling or loosening.
            </li>
            <li className="text-base leading-relaxed text-slate-900">
              <strong className="text-slate-900">Tough Vegetables:</strong> Root vegetables like turnips, beets, and sweet potatoes. The blade powered through without requiring excessive force.
            </li>
            <li className="text-base leading-relaxed text-slate-900">
              <strong className="text-slate-900">Delicate Work:</strong> Paper-thin cucumber slices for garnish, translucent radish rounds for presentation. Precise control for delicate tasks.
            </li>
            <li className="text-base leading-relaxed text-slate-900">
              <strong className="text-slate-900">Speed Tests:</strong> Compared to knife work, the mandoline cut prep time by approximately 70% for uniform slicing tasks. Critical in a professional environment where time equals money.
            </li>
          </ul>
        </div>

        {/* SECTION 4: SAFETY - DEDICATED SECTION (HYBRID APPROACH) */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
            Safety: Respect the Blade
          </h2>

          <p className="text-base leading-relaxed text-slate-900 mb-6">
            <strong>This is the most dangerous tool in my kitchen.</strong> That&apos;s not an exaggeration. The blade is sharp enough to slice through fingernails effortlessly. I&apos;ve seen experienced cooks get careless and pay the price.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Non-Negotiable Safety Rules
            </h3>
            <ul className="space-y-3 text-base text-yellow-900">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Always use the hand guard—no exceptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Consider cut-resistant gloves for additional protection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Never rush when using a mandoline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Keep your eyes on the blade at all times</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Clean with extreme caution using a brush, never bare hands</span>
              </li>
            </ul>
          </div>

          <p className="text-base leading-relaxed text-slate-900 mb-4">
            The included hand guard is well-designed with spikes that grip food securely. It works effectively when used properly. That said, many professional kitchens require cut-resistant gloves as additional protection.
          </p>

          <p className="text-base leading-relaxed text-slate-900 mb-0">
            If you&apos;re uncomfortable with extremely sharp blades or tend to rush through prep work, this tool isn&apos;t for you. But with proper safety protocols and respect for the blade, it&apos;s a transformative addition to your kitchen.
          </p>
        </div>

        {/* SECTION 5: WHAT WORKS BEST - DEDICATED SECTION (HYBRID APPROACH) */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
            What Works Best: Vegetable Compatibility Guide
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-0">
            <div className="border border-green-200 bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Excellent Results
              </h3>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Cucumbers - paper-thin slices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Potatoes - perfect for gratins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Radishes - translucent rounds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Carrots - julienne or slices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Zucchini - consistent thickness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Apples - uniform for pies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Onions - perfect rings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Cabbage - coleslaw ready</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Beets - even cooking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Turnips - professional cuts</span>
                </li>
              </ul>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Avoid These
              </h3>
              <ul className="space-y-3 text-sm text-red-900">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">✗</span>
                  <span><strong>Ripe tomatoes:</strong> Too soft, will get crushed rather than sliced cleanly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">✗</span>
                  <span><strong>Leafy greens:</strong> Wrong tool for this task - use a knife instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">✗</span>
                  <span><strong>Irregular shapes:</strong> Items that won&apos;t sit flat will produce inconsistent results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">✗</span>
                  <span><strong>Very soft items:</strong> Stick to knife work for soft produce</span>
                </li>
              </ul>
              <p className="text-sm text-red-900 mt-4 italic">
                Remember: The mandoline excels with firm vegetables and fruits that need uniform slicing. For everything else, use proper knife techniques.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 6: PROS & CONS */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            Pros & Cons After Years of Use
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-300 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 mt-0 text-green-800">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What I Love After Years of Use
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Japanese precision engineering - consistent results every time
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Ultra-sharp blade handles paper-thin slicing effortlessly
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  70% faster than knife work for uniform slicing
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Precise thickness adjustment from paper-thin to 5mm
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Included julienne blades for matchstick cuts
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Blade stays sharp for years in professional use
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Replacement blades available at reasonable prices
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 mt-0 text-red-800">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Limitations & Important Concerns
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-red-900 before:content-['•'] before:absolute before:left-0 before:text-red-500 before:font-bold before:text-xl">
                  Extremely sharp - most dangerous tool in kitchen
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-red-900 before:content-['•'] before:absolute before:left-0 before:text-red-500 before:font-bold before:text-xl">
                  Requires constant attention and safety protocols
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-red-900 before:content-['•'] before:absolute before:left-0 before:text-red-500 before:font-bold before:text-xl">
                  Plastic body construction (not all-metal)
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-red-900 before:content-['•'] before:absolute before:left-0 before:text-red-500 before:font-bold before:text-xl">
                  Learning curve required for proper technique
                </li>
                <li className="py-2 pl-6 relative text-sm leading-relaxed text-red-900 before:content-['•'] before:absolute before:left-0 before:text-red-500 before:font-bold before:text-xl">
                  Not suitable for soft items like ripe tomatoes
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 7: WHO SHOULD BUY */}
        <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
            Who Should (and Shouldn&apos;t) Buy the Benriner Mandoline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 mt-0 text-green-700">✅ Perfect For:</h3>
              <ul className="list-none p-0 m-0">
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Professional kitchens requiring high-volume prep
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Serious home cooks who value precision and consistency
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Those who cook regularly and need efficient prep
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Users comfortable with extremely sharp blades
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Anyone wanting professional-quality slicing at home
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl">
                  Those who prioritize consistent results over convenience
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 mt-0 text-orange-700">⚠️ Consider Alternatives If:</h3>
              <ul className="list-none p-0 m-0">
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold before:text-xl">
                  You only occasionally slice vegetables (weekly or less)
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold before:text-xl">
                  You&apos;re uncomfortable with extremely sharp blades
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold before:text-xl">
                  You tend to rush through prep work
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold before:text-xl">
                  Limited counter space or storage
                </li>
                <li className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-600 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold before:text-xl">
                  You need something for soft items like ripe tomatoes
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h4 className="text-base font-semibold text-amber-900 mb-3 mt-0">💡 Size Considerations:</h4>
            <p className="text-sm text-amber-900 mb-2">
              <strong>Large Benriner (reviewed here):</strong> Most versatile option. Handles everything from small radishes to large potatoes. The extra capacity and stability make a significant difference during high-volume prep.
            </p>
            <p className="text-sm text-amber-900 mb-0">
              <strong>Medium size:</strong> Works for home kitchens with limited counter space, but the large is more capable for serious cooking. For professional or serious home use, always choose the large size.
            </p>
          </div>
        </div>

      {/* Email Capture */}
      <div className="bg-blue-50 p-8 my-8 rounded-lg border-l-4 border-blue-600">

        <h3 className="mt-0 text-2xl">
          🔥 Get My Complete Mandoline Safety & Technique Guide
        </h3>

        <p className="text-base leading-relaxed">
          Download my comprehensive guide to professional mandoline use:
        </p>

        <ul className="my-4 text-base leading-relaxed">
          <li>✓ Safety protocols from professional kitchens</li>
          <li>✓ Advanced slicing techniques for perfect results</li>
          <li>✓ Maintenance schedule for blade longevity</li>
          <li>✓ Troubleshooting common issues</li>
          <li>✓ Recommended cut-resistant gloves and accessories</li>
        </ul>

        <div className="text-center mt-6">
          <a
            href="/newsletter"
            className="inline-block bg-blue-600 text-white px-10 py-4 no-underline rounded-md font-bold text-lg hover:bg-blue-700"
          >
            Download Free Guide →
          </a>
        </div>

        <p className="text-xs text-gray-600 mt-4 text-center">
          Instant delivery. No spam, ever. Unsubscribe anytime.
        </p>

      </div>


      {/* Strong Final CTA */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-lg my-8">

        <h3 className="text-white mt-0 text-2xl">
          After Years of Professional Testing...
        </h3>

        <p className="text-lg leading-relaxed">
          The Benriner mandoline has proven itself as professional-grade equipment that
          delivers consistent results. Japanese precision engineering, ultra-sharp blade,
          and years of reliable performance make this the mandoline professional kitchens trust.
        </p>

        <div className="bg-white/20 p-5 my-5 rounded-md">
          <p className="m-0 text-xl font-bold">
            Final Rating: ⭐⭐⭐⭐⭐ 4.5/5
          </p>
          <ul className="my-4 ml-5 text-base leading-relaxed">
            <li>Blade Sharpness & Quality: 5/5</li>
            <li>Precision & Consistency: 5/5</li>
            <li>Durability: 5/5</li>
            <li>Safety Features: 4/5</li>
          </ul>
        </div>

        <p className="text-base mb-0">
          <strong>Would I buy this again?</strong> Without hesitation. Professional
          equipment that delivers professional results.
        </p>

      </div>

      <div className="bg-yellow-100 p-8 my-8 rounded-lg text-center border-[3px] border-yellow-400">

        <h3 className="mt-0 text-[28px]">
          Ready for Professional-Grade Slicing?
        </h3>

        <p className="text-lg my-5">
          Check current price and transform your prep work:
        </p>

        <CTAVisibilityTracker
          ctaId={`review-${productData.slug}-final_cta`}
          position="final_cta"
          productSlug={productData.slug}
          merchant="amazon"
        >
          <AffiliateButton
            href={affiliateUrl}
            merchant="amazon"
            product={productData.slug}
            position="final_cta"
            variant="primary"
          >
            View on Amazon →
          </AffiliateButton>
        </CTAVisibilityTracker>

      </div>

      {/* Related Products */}
      <h2>Complete Your Professional Prep Setup</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 my-8">

        <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
          <h4 className="mt-0">John Boos Cutting Board</h4>
          <p>The prep surface that matches this mandoline&apos;s precision. Perfect platform
          for uniform slicing.</p>
          <p className="text-sm text-gray-600">
            <strong>After 18 years:</strong> Still my daily workhorse.
          </p>
          <a
            href="/reviews/john-boos-platinum-commercial-cutting-board"
            className="inline-block bg-green-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 font-bold hover:bg-green-700"
          >
            Read Full Review →
          </a>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
          <h4 className="mt-0">Victorinox 8&quot; Chef Knife</h4>
          <p>The knife I use alongside this mandoline. Professional quality for detailed work.</p>
          <p className="text-sm text-gray-600">
            <strong>45 years cooking:</strong> My go-to knife.
          </p>
          <a
            href="/reviews/victorinox-fibrox-8-inch-chefs-knife"
            className="inline-block bg-green-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 font-bold hover:bg-green-700"
          >
            Read Full Review →
          </a>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
          <h4 className="mt-0">OXO Bench Scraper</h4>
          <p>Perfect for gathering sliced vegetables from mandoline. Essential prep tool.</p>
          <p className="text-sm text-gray-600">
            <strong>Most-used tool:</strong> In my kitchen.
          </p>
          <a
            href="/reviews/oxo-good-grips-bench-scraper"
            className="inline-block bg-green-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 font-bold hover:bg-green-700"
          >
            Read Full Review →
          </a>
        </div>

      </div>

      {/* See complete professional kitchen starter kit */}
      <p className="text-base leading-relaxed text-center my-8">
        See our complete <a href="/kitchen-bundle">professional kitchen starter kit</a> for
        recommended tool combinations.
      </p>

      {/* Footer Elements */}
      <div className="bg-gray-50 p-5 my-8 rounded-md border-l-4 border-gray-600">
        <p className="my-2.5">
          <strong>📅 Last Updated:</strong> {new Date(productData.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="my-2.5">
          <strong>🔍 Next Review:</strong> {new Date(new Date(productData.lastUpdated).getTime() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          })}
        </p>
        <p className="my-2.5">
          <strong>💬 Questions about mandolines?</strong> <a href="/contact">Contact me</a>—I read
          and respond to every question.
        </p>
      </div>

      {/* Author Bio */}
      <div className="bg-white p-6 my-8 border border-gray-300 rounded-lg grid grid-cols-[100px_1fr] gap-5 items-start">

          <Image src="/images/team/head-shot-1.jpg" alt="Scott Bradley, Professional Chef" width={100} height={100} />
        <div>
          <h3 className="m-0 mb-2.5">About Scott Bradley</h3>
          <p className="my-1.5 font-bold">
            Professional Chef • 45 Years Cooking Experience
          </p>
          <p className="my-2.5 text-sm leading-relaxed">
            Pizzaiolo at Purple Café, Kitchen Manager at Mellow Mushroom and Il Pizzaiaolo, Line Lead at Feierabend. 24 years of restaurant experience.
            A.A.S. Culinary Arts from Seattle Central College, B.S. Business Administration.
            Equipment tested in high-volume operations serving hundreds daily.
          </p>
          <a href="/about" className="text-blue-600 font-bold">
            Read more about my testing methodology →
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <h2>Frequently Asked Questions</h2>

      <div>
        {faqData.map((faq, index) => (
          <div key={index} className="my-5 p-5 bg-gray-50 rounded-md">
            <h3>{faq.question}</h3>
            <div>
              <p><strong>Answer:</strong> {faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Structured Data - JSON-LD Schema */}
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

    </article>
  );
}
