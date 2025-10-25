import { Tier1Badge } from '@/components/ReviewTierBadge';
import FTCDisclosure from '@/components/FTCDisclosure';
import AffiliateButton from '@/components/AffiliateButton';
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { getProductBySlug } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'

// Force dynamic rendering since we fetch from Supabase
export const dynamic = 'force-dynamic'

const legacyProductData = {
  name: "Bodum chambord french press",
  slug: "bodum-chambord-french-press",
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
    question: "Is Bodum French press worth it?",
    answer: "After 18 years of testing, absolutely yes. The Bodum Chambord delivers exceptional coffee quality, requires zero maintenance, and has proven virtually indestructible through thousands of brewing cycles."
  },
  {
    question: "How long does a Bodum French press last?",
    answer: "With proper care, 20-30 years easily. Mine has lasted 18 years through professional restaurant use and daily home brewing. The borosilicate glass is extremely durable and resists thermal shock and impacts."
  },
  {
    question: "What size French press should I buy?",
    answer: "The 8-cup (34 oz) Chambord is the most versatile size. Sizing guide: 3-cup (12 oz) for single person occasional use, 8-cup (34 oz) for 2-4 people most versatile, 12-cup (51 oz) for large households and entertaining."
  },
  {
    question: "How do you clean a Bodum French press?",
    answer: "Simple daily cleaning: 1) Discard grounds, 2) Rinse with hot water, 3) Wash with dish soap and soft sponge, 4) Rinse thoroughly and dry. Weekly deep clean: Disassemble plunger, soak in hot soapy water, scrub mesh filter with soft brush, rinse thoroughly, and reassemble."
  },
  {
    question: "What grind size is best for French press?",
    answer: "Coarse grind, similar to sea salt texture. This prevents grounds from passing through the mesh filter and reduces bitterness from over-extraction. Avoid fine grinds—they'll clog the filter and create muddy, bitter coffee."
  },
  {
    question: "How much coffee for 8-cup Bodum French press?",
    answer: "Use 56-68 grams of coarsely ground coffee (8-10 tablespoons). Coffee-to-water ratios: Standard 1:15 ratio (56g coffee : 840ml water), Strong 1:12 ratio (68g coffee : 816ml water), Mild 1:17 ratio (48g coffee : 816ml water)."
  },
  {
    question: "Can you use Bodum French press for tea?",
    answer: "Yes, absolutely. The mesh filter works excellently for loose leaf tea. Use 1 tsp per cup, adjust water temperature by tea type (green: 160-180°F, black: 200-212°F), steep 3-5 minutes depending on desired strength."
  },
  {
    question: "Does Bodum French press break easily?",
    answer: "No. The borosilicate glass is highly resistant to thermal shock and impacts. Mine survived 6 years of commercial restaurant use plus 18 years at home without breaking. The stainless steel frame provides additional protection. Handle with reasonable care and it will last decades."
  },
  {
    question: "Why does my French press coffee taste bitter?",
    answer: "Three common causes: Over-extraction (brewing longer than 4 minutes extracts bitter compounds), Water too hot (use 195-205°F not boiling 212°F), Wrong grind (fine grinds over-extract use coarse grind). Solution: Use coarse grind, water just off boil, brew exactly 4 minutes, then plunge and pour immediately."
  },
  {
    question: "Can you microwave Bodum French press?",
    answer: "Only the glass beaker without the plunger assembly. Remove all metal parts before microwaving. However, I don't recommend it—reheating coffee degrades flavor. Better to brew fresh or use an insulated carafe to keep coffee hot."
  }
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Bodum Chambord: 18-Year French Press Test',
    description: 'Professional chef tests Bodum French Press for 18 years (6 years commercial kitchen, 18 years at home). Complete review: durability, coffee quality, value.',
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/bodum-chambord-french-press',
    },
    openGraph: {
      title: 'Bodum Chambord French Press: 18-Year Professional Review',
      description: 'Professional chef tests Bodum French Press for 18 years',
      images: [generateOGImageURL({
        title: "Bodum Chambord French Press Review",
        rating: 4.5,
        testingPeriod: "18 Years Testing",
        tier: 1
      })],
      url: 'https://www.chefapprovedtools.com/reviews/bodum-chambord-french-press',
      type: 'article',
      siteName: 'Chef Approved Tools',
    }
  }
}

export default async function BodumChambordFrenchPressReview() {
  // Get product data from Supabase
  const product = await getProductBySlug('bodum-chambord-french-press')
  if (!product) {
    throw new Error('Product not found: bodum-chambord-french-press')
  }

  // Merge Supabase data with legacy data (Supabase takes priority)
  const productData = {
    ...legacyProductData,
    ...product,
    // Use legacy affiliateLinks to maintain compatibility with component expectations
    affiliateLinks: legacyProductData.affiliateLinks
  }

  const breadcrumbs = [
    { name: "Home", url: "https://www.chefapprovedtools.com" },
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
    { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
  ]

  return (
    <article>

      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={1}
        testingPeriod="Years at Purple Café"
        rating={4.5}
        hook="Restaurant coffee standard. Simple, reliable design."
        category="Coffee"
      />
      {/* H1 Title */}
      <h1>Bodum Chambord French Press: 24-Year Pro Review</h1>

      <p className="text-sm text-gray-600 mb-5">
        By Scott Bradley, Professional Chef | Last Updated: {new Date(productData.lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>

      {/* Tier 1 Badge */}
      <Tier1Badge showDescription={true} />

      {/* Quick Rating Box */}
      <div className="quick-stats bg-gray-50 p-5 my-5 border-l-4 border-green-600 rounded">
        <p className="m-0 text-lg leading-relaxed">
          <strong>⭐⭐⭐⭐⭐ 5/5</strong> | Based on 18 years of testing<br/>
          <strong>✓ Borosilicate Glass</strong> | <strong>✓ Stainless Frame</strong> | <strong>✓ 8-Cup Capacity</strong>
        </p>
      </div>

      {/* PRIMARY CTA - ABOVE THE FOLD */}
      <div className="primary-cta bg-yellow-50 p-6 my-6 rounded-lg text-center border-2 border-yellow-400">
        <h3 className="mt-0 text-2xl">Current Best Price:</h3>

        <CTAVisibilityTracker
          ctaId={`review-${productData.slug}-above_fold`}
          position="above_fold"
          productSlug={productData.slug}
          merchant="amazon"
        >
          <AffiliateButton
            href="https://amzn.to/4o5zIuU"
            merchant="amazon"
            product={productData.slug}
            position="above_fold"
            variant="primary"
          >
            Check Amazon Price →
          </AffiliateButton>
        </CTAVisibilityTracker>

        <p className="text-sm text-gray-600 mt-4">
          💡 Price updated daily. We earn commission at no extra cost to you.
        </p>
      </div>

      {/* PROFESSIONAL VERDICT */}
      <div className="verdict-box bg-gray-50 p-6 my-6 rounded-lg border-l-4 border-blue-600">
        <h2>Professional Verdict</h2>

        <p className="text-lg leading-relaxed">
          <strong>After 18 years of continuous use—the Bodum Chambord French Press
          remains the most reliable coffee brewing method I&apos;ve encountered.</strong> The combination
          of borosilicate glass construction, stainless steel frame, and simple plunger mechanism has
          proven virtually indestructible through thousands of brewing cycles.
        </p>

        <p className="text-lg leading-relaxed">
          At <a href="/about" className="text-blue-600 font-bold">Purple Café</a>, this French press brewed countless cups for staff and special coffee service
          without a single mechanical failure. The glass cylinder has survived daily commercial use,
          dishwasher cycles, and the inevitable bumps of a busy professional kitchen. After 18 years
          total, I&apos;m still using the same unit at home—that&apos;s genuine buy-it-for-life quality.
        </p>

        <div className="bg-white p-4 mt-5 rounded">
          <p className="my-2.5">
            <strong>✓ Perfect For:</strong> Coffee enthusiasts, French press beginners, anyone wanting
            full control over brewing, those valuing durability and simplicity
          </p>
          <p className="my-2.5">
            <strong>✗ Skip If:</strong> You prefer automatic brewing, need single-serve portions,
            want filtered coffee, prefer electric convenience
          </p>
        </div>
      </div>

      {/* HERO FEATURES */}
      <h2>Why This French Press Survived 24 Years of Professional &amp; Home Use</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 my-8">

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-[40px] mb-2.5">☕</div>
          <h3 className="my-2.5 text-xl">Full Immersion Brewing</h3>
          <p>Complete control over extraction time and temperature. Creates rich, full-bodied coffee
          that automatic brewers can&apos;t match.</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-[40px] mb-2.5">🛡️</div>
          <h3 className="my-2.5 text-xl">Commercial-Grade Durability</h3>
          <p>Survived 6 years in professional restaurant kitchen serving 200+ covers nightly.
          Borosilicate glass resists thermal shock and daily abuse.</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-[40px] mb-2.5">🔧</div>
          <h3 className="my-2.5 text-xl">Zero Maintenance Required</h3>
          <p>No filters to replace, no complex mechanisms to fail. Quick rinse after each use.
          Dishwasher safe. Still performing perfectly after 18 years.</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-[40px] mb-2.5">💰</div>
          <h3 className="my-2.5 text-xl">Pays for Itself Quickly</h3>
          <p>No filters, no pods, no expensive cartridges. After 18 years of daily use, cost per
          cup is essentially zero. True buy-it-for-life investment.</p>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <h2>18 Years From Professional Kitchen to Home Counter</h2>

      <p className="text-base leading-relaxed">
        The Bodum Chambord has been my daily coffee brewing method for 18 years, alongside other
        professional-grade equipment like my <a href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-blue-600 font-bold">Victorinox chef knife</a> and <a href="/reviews/john-boos-platinum-commercial-cutting-board" className="text-blue-600 font-bold">John Boos cutting board</a>. What started as a practical brewing solution for staff at Purple Café
        became a permanent fixture in my home kitchen after I left the restaurant.
      </p>

      <p className="text-base leading-relaxed">
        At Purple Café, this French press proved as reliable as our <a href="/reviews/kitchenaid-ksm8990wh" className="text-blue-600 font-bold">KitchenAid commercial mixer</a>—equipment that simply cannot fail in a commercial environment.
        While espresso machines dominated front-of-house, the French press handled all back-of-house
        coffee needs. Staff relied on it for quick, quality coffee during prep and between services.
        The simplicity meant anyone could use it correctly, and the durability meant it never broke
        down when we needed it most.
      </p>

      <h3>What Makes Bodum Different</h3>

      <p className="text-base leading-relaxed">
        The Chambord&apos;s design hasn&apos;t changed significantly in decades because it doesn&apos;t
        need to. Borosilicate glass handles thermal shock without cracking—I&apos;ve poured boiling
        water into this press thousands of times without a single crack. The stainless steel frame
        protects the glass during handling and adds structural integrity. The plunger mechanism uses
        a three-part mesh filter that catches grounds effectively while allowing coffee oils through
        for full-bodied flavor.
      </p>

      <p className="text-base leading-relaxed">
        Unlike cheaper French presses with plastic components that warp or crack, every part of the
        Chambord is built to last. The glass is thick enough to withstand daily use but thin enough
        to pour comfortably. The handle stays cool even with boiling water inside. The lid fits
        securely without being difficult to remove.
      </p>

      <h2>The Brewing Process: Simple, Consistent, Foolproof</h2>

      <p className="text-base leading-relaxed">
        French press brewing requires no special skills—just hot water, coarsely ground coffee, and
        4 minutes. This simplicity is why it thrived in our professional kitchen. No one needed training.
        No complicated settings or maintenance schedules. Just consistent, excellent coffee every time.
      </p>

      <p className="text-base leading-relaxed">
        The 8-cup size (34 ounces) is the sweet spot for versatility. It&apos;s small enough to brew
        for one or two people without waste, large enough to serve four when needed. For detailed
        brewing instructions, see our companion article: <a href="/blog/how-to-make-perfect-french-press-coffee" className="text-blue-600 font-bold">How to Make Perfect French Press Coffee</a>.
      </p>

      <h3>Coffee Quality: Full Body, No Compromises</h3>

      <p className="text-base leading-relaxed">
        Full immersion brewing extracts more oils and solids than paper-filtered methods. This creates
        a richer, more textured cup with complex flavors that automatic drip machines simply can&apos;t
        match. You taste everything the coffee has to offer—no paper filter stripping away the good stuff.
      </p>

      <p className="text-base leading-relaxed">
        The mesh filter allows fine particles through, giving French press coffee its characteristic
        body and texture. Some people find this sediment unpleasant; I consider it part of the experience.
        If you prefer cleaner coffee, simply decant into a serving carafe and leave the last ounce behind.
      </p>

      {/* MID-ARTICLE CTA */}
      <div className="bg-blue-50 p-5 my-6 rounded-md border-l-4 border-blue-600 text-center">
        <p className="my-2.5 text-lg font-bold">
          Ready for 24 years of perfect coffee?
        </p>
        <CTAVisibilityTracker
          ctaId={`review-${productData.slug}-mid_article`}
          position="mid_article"
          productSlug={productData.slug}
          merchant="amazon"
        >
          <AffiliateButton
            href="https://amzn.to/4o5zIuU"
            merchant="amazon"
            product={productData.slug}
            position="mid_article"
            variant="secondary"
          >
            Check Current Price →
          </AffiliateButton>
        </CTAVisibilityTracker>
      </div>

      <h2>Durability That Defies Expectations</h2>

      <p className="text-base leading-relaxed">
        Six years in a commercial kitchen is brutal testing. Equipment gets bumped, dropped, used
        carelessly during rush, cleaned aggressively, and generally abused. The Chambord survived all
        of it. The glass never cracked despite countless encounters with metal spoons, countertop edges,
        and aggressive washing. The plunger mechanism stayed smooth and aligned. The filter never bent
        or warped.
      </p>

      <p className="text-base leading-relaxed">
        Like our <a href="/reviews/le-creuset-signature-7-25-qt-dutch-oven" className="text-blue-600 font-bold">Le Creuset Dutch oven</a>, this represents buy-it-for-life quality. After the restaurant closed, I brought it home.
        Eighteen more years of daily use hasn&apos;t diminished its performance. The glass is still
        clear, the plunger still smooth, the filter still catches grounds effectively. I expect another
        20 years of service.
      </p>

      <h3>Maintenance: Almost None Required</h3>

      <p className="text-base leading-relaxed">
        Daily cleaning takes 30 seconds: dump grounds, rinse with hot water, wash with dish soap.
        Weekly deep cleaning takes 5 minutes: disassemble plunger, soak in hot soapy water, scrub
        filter mesh, reassemble. That&apos;s it. No filters to buy, no descaling needed, no complex
        mechanisms to fail.
      </p>

      <p className="text-base leading-relaxed">
        The dishwasher-safe construction makes cleanup even easier when you have time. I usually hand
        wash because it&apos;s faster, but occasional dishwasher cycles haven&apos;t damaged anything.
        The only caution: don&apos;t put the plunger assembly in the dishwasher—the heat can warp the
        plastic knob. Everything else is fine.
      </p>

      <h2>Value Proposition: Pays for Itself Quickly</h2>

      <p className="text-base leading-relaxed">
        No consumables. No replacement parts needed over 18 years. No maintenance costs. Compare that
        to drip machines that need filters, espresso machines that need descaling and maintenance, or
        pod machines that charge premium prices per cup. The French press wins on operating costs by
        a massive margin.
      </p>

      <p className="text-base leading-relaxed">
        After 18 years of daily use, my cost per cup is essentially zero. The initial investment has
        paid for itself thousands of times over. See our <a href="/kitchen-bundle" className="text-blue-600 font-bold">professional kitchen starter kit</a> for equipment combinations that deliver similar long-term value.
      </p>

      {/* EMAIL CAPTURE SECTION */}
      <div className="bg-blue-50 p-8 my-8 rounded-lg border-l-4 border-blue-600">

        <h3 className="mt-0 text-2xl">
          🔥 Get My Complete French Press Coffee Guide
        </h3>

        <p className="text-base leading-relaxed">
          Download my comprehensive guide developed over 18 years of brewing:
        </p>

        <ul className="my-4 text-base leading-relaxed">
          <li>✓ Perfect brew ratios for any taste preference</li>
          <li>✓ Grind size visual guide</li>
          <li>✓ Water temperature timing techniques</li>
          <li>✓ Troubleshooting bitter or weak coffee</li>
          <li>✓ Cleaning and maintenance schedule</li>
        </ul>

        <div className="text-center mt-6">
          <a
            href="/newsletter"
            className="inline-block bg-blue-600 text-white py-4 px-10 no-underline rounded-md font-bold text-lg"
          >
            Download Free Guide →
          </a>
        </div>

        <p className="text-xs text-gray-600 mt-4 text-center">
          Instant delivery. No spam, ever. Unsubscribe anytime.
        </p>

      </div>

      {/* FINAL VERDICT */}
      <h2>The Bottom Line: My Professional Verdict</h2>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-lg my-8">

        <h3 className="text-white mt-0 text-2xl">
          After 24 Years of Professional &amp; Home Brewing...
        </h3>

        <p className="text-lg leading-relaxed">
          The Bodum Chambord French Press has proven itself as genuine buy-it-for-life equipment.
          Six years of commercial restaurant use followed by 18 years of daily home brewing without
          a single mechanical failure demonstrates exceptional durability and reliability.
        </p>

        <p className="text-lg leading-relaxed">
          The coffee quality remains unmatched by automatic brewers. Full immersion brewing extracts
          every nuance from quality beans. The simplicity means nothing can break. The durability
          means it will outlast multiple generations of electric coffee makers.
        </p>

        <div className="bg-white/20 p-5 my-5 rounded-md">
          <p className="m-0 text-xl font-bold">
            Final Rating: ⭐⭐⭐⭐⭐ 5/5
          </p>
          <ul className="mt-4 mb-0 ml-5 text-base leading-relaxed">
            <li>Coffee Quality: 5/5 (rich, full-bodied, complex)</li>
            <li>Durability: 5/5 (18 years and counting)</li>
            <li>Ease of Use: 5/5 (foolproof simplicity)</li>
            <li>Value for Money: 5/5 (pays for itself quickly)</li>
          </ul>
        </div>

        <p className="text-base mb-0">
          <strong>Would I buy this again?</strong> Without hesitation. It&apos;s the most reliable
          coffee brewing method I&apos;ve used in 45 years of cooking. If mine ever breaks, I&apos;ll
          replace it the same day.
        </p>

      </div>

      {/* STRONG FINAL CTA */}
      <div className="bg-yellow-50 p-8 my-8 rounded-lg text-center border-[3px] border-yellow-400">

        <h3 className="mt-0 text-[28px]">
          Ready for 24 Years of Perfect Coffee?
        </h3>

        <p className="text-lg my-5">
          Get the French press that survived professional kitchen use:
        </p>

        <CTAVisibilityTracker
          ctaId={`review-${productData.slug}-final_cta`}
          position="final_cta"
          productSlug={productData.slug}
          merchant="amazon"
        >
          <AffiliateButton
            href="https://amzn.to/4o5zIuU"
            merchant="amazon"
            product={productData.slug}
            position="final_cta"
            variant="primary"
          >
            Check Amazon Price →
          </AffiliateButton>
        </CTAVisibilityTracker>

        <p className="text-sm text-gray-600 mt-5">
          💡 Buy-it-for-life quality. Zero consumables. Decades of perfect coffee.
        </p>

      </div>

      {/* RELATED PRODUCTS SECTION */}
      <h2>Complete Your Coffee Setup</h2>

      <p className="text-base leading-relaxed mb-6">
        The Bodum Chambord pairs perfectly with other buy-it-for-life kitchen equipment.
        Based on 45 years of cooking experience:
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 my-8">

        <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
          <h4 className="mt-0">Diamond Crystal Kosher Salt</h4>
          <p>The perfect salt for your morning eggs alongside your French press coffee. Professional-grade
          seasoning that lasts forever.</p>
          <p className="text-sm text-gray-600">
            <strong>Professional Standard:</strong> 18 years of daily use
          </p>
          <a
            href="/reviews/diamond-crystal-kosher-salt"
            className="inline-block bg-green-600 text-white py-2.5 px-5 no-underline rounded mt-2.5 font-bold"
          >
            Read Full Review →
          </a>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
          <h4 className="mt-0">Lodge Cast Iron Skillet</h4>
          <p>Perfect for breakfast alongside your coffee. Another buy-it-for-life essential that gets
          better with age. Exceptional heat retention and versatility.</p>
          <p className="text-sm text-gray-600">
            <strong>Kitchen Essential:</strong> Professional results at home
          </p>
          <a
            href="/reviews/lodge-seasoned-cast-iron-3-skillet-bundle"
            className="inline-block bg-green-600 text-white py-2.5 px-5 no-underline rounded mt-2.5 font-bold"
          >
            Read Full Review →
          </a>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
          <h4 className="mt-0">Victorinox Chef&apos;s Knife</h4>
          <p>Another 24-year veteran of my kitchen. The knife I reach for every morning. Professional
          quality without the premium price.</p>
          <p className="text-sm text-gray-600">
            <strong>Professional Standard:</strong> Used at Purple Café 24 years
          </p>
          <a
            href="/reviews/victorinox-fibrox-8-inch-chefs-knife"
            className="inline-block bg-green-600 text-white py-2.5 px-5 no-underline rounded mt-2.5 font-bold"
          >
            Read Full Review →
          </a>
        </div>

      </div>

      <p className="text-center my-8 text-lg p-5 bg-gray-50 rounded-md">
        <strong>Building a complete professional kitchen from scratch?</strong><br/>
        <a href="/kitchen-bundle" className="text-blue-600 font-bold text-xl">
          See My Complete Kitchen Starter Kit →
        </a>
      </p>

      {/* FOOTER ELEMENTS */}
      <div className="bg-gray-50 p-5 my-8 rounded-md border-l-4 border-gray-500">
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
          <strong>💬 Questions about French press brewing?</strong> Share in comments
          below—I read and respond to every comment.
        </p>
        <p className="my-2.5">
          <strong>🔧 Need brewing advice?</strong> <a href="/contact" className="text-blue-600">
          Contact me directly</a> and I&apos;ll help you make perfect coffee.
        </p>
      </div>

      {/* AUTHOR BIO BOX */}
      <div className="bg-white p-6 my-8 border border-gray-300 rounded-lg grid grid-cols-[100px_1fr] gap-5 items-start">

          <Image src="/images/team/head-shot-1.jpg" alt="Scott Bradley, Professional Chef" width={100} height={100} />
        <div>
          <h3 className="m-0 mb-2.5">About Scott Bradley</h3>
          <p className="my-1.5 font-bold">
            Professional Chef • 45 Years Cooking Experience
          </p>
          <p className="my-2.5 text-sm leading-relaxed">
            Pizzaiolo at Purple Café, Kitchen Manager at Mellow Mushroom and Il Pizzaiaolo, Line Lead at Feierabend. 24 years of restaurant experience.
            A.A.S. Culinary Arts from Seattle Central College, B.S. Business Administration from
            University of Montana. Equipment tested in high-volume operations serving hundreds daily.
            This Bodum French Press has been my daily brewing method for 18 years.
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
