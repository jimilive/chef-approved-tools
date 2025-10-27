import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tier1Badge } from '@/components/ReviewTierBadge';
import FTCDisclosure from '@/components/FTCDisclosure';
import AffiliateButton from '@/components/AffiliateButton';
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import type { Metadata } from 'next';
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { generateOGImageURL } from '@/lib/og-image'

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
  return {
    title: 'Benriner Mandoline: Pro Safety & Precision',
    description: 'Professional chef tests Benriner mandoline after years of restaurant use. Complete review: precision slicing, safety features, durability analysis.',
    alternates: {
      canonical: 'https://www.chefapprovedtools.com/reviews/benriner-large-mandoline',
    },
    openGraph: {
      title: 'Benriner Mandoline: Professional Review',
      description: 'Professional chef tests Benriner mandoline after years of restaurant use',
      images: [generateOGImageURL({
        title: "Benriner Large Mandoline Review",
        rating: 4.5,
        testingPeriod: "Years of Professional Testing",
        tier: 1
      })],
      url: 'https://www.chefapprovedtools.com/reviews/benriner-large-mandoline',
      type: 'article',
      siteName: 'Chef Approved Tools',
    }
  }
}

export default async function BenrinerLargeMandolineReview() {
  // Get product data from Supabase
  const product = await getProductBySlug('benriner-large-mandoline')
  if (!product) {
    throw new Error('Product not found: benriner-large-mandoline')
  }

  // Get primary affiliate link from Supabase product data
  const affiliateUrl = getPrimaryAffiliateLink(product)

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
    <article className="max-w-3xl mx-auto px-5 py-5">

      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={1}
        testingPeriod="Professional kitchen tested"
        rating={4.5}
        hook="Japanese precision. Professional prep speed."
        category="Prep Tools"
      />
      {/* H1 and Author Byline */}
      <h1>Benriner Large Mandoline Review: Professional Kitchen Test</h1>

      <div className="text-gray-600 text-sm mb-5 pb-5 border-b border-gray-200">
        <p className="my-1.5">
          <strong>By Scott Bradley</strong> | Professional Chef, 45 years cooking Experience
        </p>
        <p className="my-1.5">
          Former Kitchen Manager, Purple Café | 24 Years Restaurant Management
        </p>
        <p className="my-1.5">
          Last Updated: {new Date(productData.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Tier Badge */}
      <Tier1Badge showDescription={true} />

      {/* Quick Rating Box */}
      <div className="bg-gray-50 p-5 my-5 border-l-4 border-green-600 rounded">
        <p className="m-0 text-lg leading-relaxed">
          <strong>⭐⭐⭐⭐⭐ 4.5/5</strong> | Professional kitchen tested<br/>
          <strong>✓ Japanese Precision</strong> | <strong>✓ Ultra-Sharp Blade</strong> | <strong>✓ Adjustable Thickness</strong>
        </p>
      </div>

      {/* Primary CTA Above Fold - BEFORE VERDICT */}
      <div className="bg-yellow-100 p-6 my-6 rounded-lg text-center border-2 border-yellow-400">
        <h3 className="mt-0 text-2xl">Check Current Best Price:</h3>

        <CTAVisibilityTracker
          ctaId={`review-${productData.slug}-above_fold`}
          position="above_fold"
          productSlug={productData.slug}
          merchant="amazon"
        >
          <AffiliateButton
            href={affiliateUrl}
            merchant="amazon"
            product={productData.slug}
            position="above_fold"
            variant="primary"
          >
            View on Amazon →
          </AffiliateButton>
        </CTAVisibilityTracker>

        <p className="text-sm text-gray-600 mt-4">
          💡 Price updated daily. We earn commission at no extra cost to you.
        </p>
      </div>

      {/* Professional Verdict */}
      <div className="bg-gray-50 p-6 my-6 rounded-lg border-l-4 border-blue-600">
        <h2>Professional Verdict</h2>

        <p className="text-lg leading-relaxed">
          <strong>After years of professional use at Purple Café, the Benriner mandoline
          proved itself as genuine professional equipment.</strong> Japanese precision engineering
          delivers consistent slicing that transformed our prep efficiency. Ultra-sharp blade
          handles everything from paper-thin cucumber to julienned carrots.
        </p>

        <p className="text-lg leading-relaxed">
          This is the mandoline professional kitchens trust when precision and speed matter.
        </p>

        <div className="bg-white p-4 mt-5 rounded">
          <p className="my-2.5">
            <strong>✓ Perfect For:</strong> Professional prep work, high-volume slicing,
            precision cuts, garnish preparation
          </p>
          <p className="my-2.5">
            <strong>✗ Skip If:</strong> Occasional home use only, budget under $30,
            uncomfortable with extremely sharp blades
          </p>
        </div>
      </div>

      {/* Hero Features */}
      <h2>Why This Mandoline Dominates Professional Kitchens</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 my-8">

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-4xl mb-2.5">🔪</div>
          <h3 className="my-2.5 text-xl">Japanese Precision</h3>
          <p>Ultra-sharp stainless steel blade. Paper-thin slices every time.
          Professional-grade sharpness that lasts.</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-4xl mb-2.5">⚙️</div>
          <h3 className="my-2.5 text-xl">Adjustable Thickness</h3>
          <p>Precise thickness control. Consistent results. Perfect for garnishes
          to substantial cuts.</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-4xl mb-2.5">⚡</div>
          <h3 className="my-2.5 text-xl">Speed & Efficiency</h3>
          <p>Cuts prep time by 70%. Uniform slices mean even cooking.
          Professional speed for high-volume operations.</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="text-4xl mb-2.5">🛡️</div>
          <h3 className="my-2.5 text-xl">Built to Last</h3>
          <p>Durable construction. Years of professional use. Simple maintenance.
          Restaurant-grade reliability.</p>
        </div>

      </div>

      {/* Main Content */}
      <h2>The Professional Kitchen Reality</h2>

      <p className="text-base leading-relaxed">
        When I started using the Benriner mandoline at Purple Café, I was skeptical.
        We&apos;d tried various slicers over the years, and most ended up in the back
        of the storage room after a few months. But this Japanese-made mandoline changed
        my perspective on what consistent slicing equipment could deliver.
      </p>

      <p className="text-base leading-relaxed">
        I tested this alongside our <a href="/reviews/victorinox-fibrox-8-inch-chefs-knife">Victorinox chef knives</a> and <a href="/reviews/john-boos-platinum-commercial-cutting-board">John Boos cutting boards</a> at Purple Café. After years of daily professional use, it earned its permanent
        place in our prep station.
      </p>

      <h2>Blade Quality: The Japanese Difference</h2>

      <p className="text-base leading-relaxed">
        The blade is the heart of any mandoline, and Benriner&apos;s high-carbon Japanese
        stainless steel is exceptional. This isn&apos;t marketing hyperbole—the difference
        is immediately obvious when you make your first slice.
      </p>

      <p className="text-base leading-relaxed">
        <strong>Sharpness Test:</strong> I can slice cucumbers so thin they&apos;re nearly
        transparent. The blade glides through root vegetables like potatoes and carrots
        without crushing or tearing. Even after years of professional use, the edge
        remains sharp enough for clean, precise cuts.
      </p>

      <p className="text-base leading-relaxed">
        Compared to budget mandolines I&apos;ve tested, the Benriner stays sharp
        significantly longer. Cheap mandolines dull quickly and start producing
        inconsistent results within months. The Benriner maintains professional
        performance for years.
      </p>

      <h2>Precision and Consistency</h2>

      <p className="text-base leading-relaxed">
        The adjustment mechanism is where Benriner separates itself from competitors.
        The thickness dial offers precise, repeatable settings from paper-thin to
        about 5mm. Each click provides consistent results—critical when you&apos;re
        slicing for even cooking or uniform presentation.
      </p>

      <p className="text-base leading-relaxed">
        In a professional kitchen serving hundreds of customers daily, consistency
        isn&apos;t optional. When we needed uniform potato slices for gratins or
        precisely thin radishes for garnish, the Benriner delivered identical results
        every single time.
      </p>

      <p className="text-base leading-relaxed">
        The julienne blades (included) are equally impressive. Fine and medium julienne
        options produce restaurant-quality matchstick cuts perfect for salads, garnishes,
        or stir-fry prep. The cuts are clean and consistent—exactly what you need for
        professional presentation.
      </p>

      <h2>Safety: Respect the Blade</h2>

      <p className="text-base leading-relaxed">
        <strong>This is the most dangerous tool in my kitchen.</strong> That&apos;s not
        an exaggeration. The blade is sharp enough to slice through fingernails effortlessly.
        I&apos;ve seen experienced cooks get careless and pay the price.
      </p>

      <div className="bg-yellow-100 p-5 my-5 border-l-4 border-yellow-400 rounded">
        <p className="my-2.5 text-base">
          <strong>⚠️ Non-Negotiable Safety Rules:</strong>
        </p>
        <ul className="my-2.5 text-base leading-relaxed">
          <li>Always use the hand guard—no exceptions</li>
          <li>Consider cut-resistant gloves for additional protection</li>
          <li>Never rush when using a mandoline</li>
          <li>Keep your eyes on the blade at all times</li>
          <li>Clean with extreme caution using a brush, never bare hands</li>
        </ul>
      </div>

      <p className="text-base leading-relaxed">
        The included hand guard is well-designed with spikes that grip food securely.
        It works effectively when used properly. That said, many professional kitchens
        require cut-resistant gloves as additional protection. Always use with <a href="/blog/kitchen-gloves-guide">cut-resistant gloves</a> for maximum safety.
      </p>

      <p className="text-base leading-relaxed">
        If you&apos;re uncomfortable with extremely sharp blades or tend to rush through
        prep work, this tool isn&apos;t for you. But with proper safety protocols and
        respect for the blade, it&apos;s a transformative addition to your kitchen.
      </p>

      <h2>Professional Performance Testing</h2>

      <p className="text-base leading-relaxed">
        Over years of professional use, I&apos;ve put this mandoline through scenarios
        that would destroy budget alternatives:
      </p>

      <div className="my-5 text-base leading-relaxed">
        <p><strong>High-Volume Prep:</strong> Slicing 50+ pounds of vegetables daily
        during peak season. The Benriner maintained consistent performance without dulling
        or loosening.</p>

        <p><strong>Tough Vegetables:</strong> Root vegetables like turnips, beets, and
        sweet potatoes. The blade powered through without requiring excessive force.</p>

        <p><strong>Delicate Work:</strong> Paper-thin cucumber slices for garnish,
        translucent radish rounds for presentation. Precise control for delicate tasks.</p>

        <p><strong>Speed Tests:</strong> Compared to knife work, the mandoline cut prep
        time by approximately 70% for uniform slicing tasks. Critical in a professional
        environment where time equals money.</p>
      </div>

      <h2>Durability and Construction</h2>

      <p className="text-base leading-relaxed">
        The construction is sturdy but not heavy. The body is made from BPA-free plastic
        that&apos;s proven durable through years of professional use. While it&apos;s
        not all-metal construction, the design prioritizes functionality over aesthetics.
      </p>

      <p className="text-base leading-relaxed">
        The feet provide stable grip on countertops, though I sometimes secure it with
        a damp towel underneath for maximum stability during high-speed slicing. Pairs
        perfectly with our <a href="/reviews/oxo-good-grips-bench-scraper">OXO bench scraper</a> for gathering sliced vegetables.
      </p>

      <p className="text-base leading-relaxed">
        After years of daily use in a commercial kitchen, our Benriner shows minimal
        wear. The adjustment mechanism remains tight and precise, and the blade still
        delivers professional results. When the blade eventually dulls, replacement
        blades are available at reasonable prices.
      </p>

      {/* Mid-Article CTA */}
      <div className="bg-yellow-100 p-6 my-6 rounded-lg text-center border-2 border-yellow-400">
        <h3 className="mt-0 text-[22px]">Ready to Experience Professional Precision?</h3>

        <CTAVisibilityTracker
          ctaId={`review-${productData.slug}-mid_article`}
          position="mid_article"
          productSlug={productData.slug}
          merchant="amazon"
        >
          <AffiliateButton
            href={affiliateUrl}
            merchant="amazon"
            product={productData.slug}
            position="mid_article"
            variant="secondary"
          >
            Check Price on Amazon →
          </AffiliateButton>
        </CTAVisibilityTracker>

        <p className="text-sm text-gray-600 mt-4">
          💡 Price updated daily. We earn commission at no extra cost to you.
        </p>
      </div>

      <h2>Maintenance and Cleaning</h2>

      <p className="text-base leading-relaxed">
        Cleaning requires extreme caution. I rinse immediately after use to prevent
        food from drying on the blade, then use a dedicated brush—never bare hands
        near the blade. The blade is sharp enough to cut through sponges effortlessly.
      </p>

      <p className="text-base leading-relaxed">
        Benriner states it&apos;s dishwasher safe, but hand washing preserves the blade
        edge longer. In a professional environment, we hand washed exclusively. For
        complete knife skills, see our <a href="/reviews/norton-im200-tri-stone-sharpener">knife sharpening guide</a>.
      </p>

      <h2>What Works Best</h2>

      <p className="text-base leading-relaxed">
        <strong>Excellent for:</strong> Cucumbers, potatoes, radishes, carrots, zucchini,
        apples, onions, cabbage, beets, turnips—basically any firm vegetable or fruit
        that needs uniform slicing.
      </p>

      <p className="text-base leading-relaxed">
        <strong>Avoid:</strong> Very soft items like ripe tomatoes (they get crushed),
        leafy greens, or anything too irregular in shape. Soft items need knife work
        rather than mandoline slicing.
      </p>

      <h2>Professional vs. Home Use</h2>

      <p className="text-base leading-relaxed">
        In a professional kitchen, this mandoline is essential equipment. The time
        savings and consistency justify the investment immediately. For serious home
        cooks who value precision and efficiency, it&apos;s equally valuable.
      </p>

      <p className="text-base leading-relaxed">
        If you only occasionally slice vegetables and aren&apos;t comfortable with
        extremely sharp blades, a budget mandoline might suffice. But if you cook
        regularly and want professional results, the Benriner is the standard.
      </p>

      <h2>Size Considerations</h2>

      <p className="text-base leading-relaxed">
        The large Benriner (reviewed here) is the most versatile option. It handles
        everything from small radishes to large potatoes. The medium size works for
        home kitchens with limited counter space, but the large is more capable for
        serious cooking.
      </p>

      <p className="text-base leading-relaxed">
        For professional or serious home use, always choose the large size. The extra
        capacity and stability make a significant difference during high-volume prep.
      </p>

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
