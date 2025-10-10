import { Metadata } from 'next'
import Image from 'next/image'
import FTCDisclosure from '@/components/FTCDisclosure'

export const metadata: Metadata = {
  title: 'Gold Textiles Restaurant Bar Mops Review | 21+ Years Professional Use',
  description: 'Professional chef review of Gold Textiles restaurant bar mops after 21+ years of professional cooking. The towels that restaurants actually use.',
}

export default function GoldTextilesBarMopsReview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">PROFESSIONAL KITCHEN TESTED</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gold Textiles Restaurant Bar Mops Review
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            The towels restaurants actually use - tested through 21+ years of professional cooking
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>5/5</span>
            </div>
            <div>Professional Grade</div>
            <div>$25 (pack of 12)</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Product Images */}
        <div className="mb-8">
          <Image
            src="/images/products/gold-textiles-bar-mops/gold-textiles-bar-mops-1.jpg"
            alt="Gold Textiles Restaurant Bar Mops"
            width={1000}
            height={1500}
            className="rounded-lg w-full h-auto max-w-2xl mx-auto"
            priority
          />
        </div>

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">The Bottom Line</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Forget fancy kitchen towels. These are what every professional kitchen uses. They last forever, actually dry things,
            and are absorbent enough for serious work. At about $2 per towel, they&apos;re the real deal.
          </p>
        </div>

        {/* Why I Chose This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why This Is in My Daily Toolkit</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              After 40 years of cooking, I&apos;ve learned to ignore fancy kitchen towels. You know the
              ones - pretty colors, cute patterns, expensive price tags. They look nice hanging in a showroom kitchen,
              but they don&apos;t work in a real kitchen.
            </p>

            <p>
              Bar mops are what professional kitchens use. They&apos;re thick, absorbent, durable cotton towels that
              can handle serious abuse. Spill a quart of stock? Bar mop. Need to grab a hot pan? Bar mop. Wipe down
              a cutting board? Bar mop. They do everything.
            </p>

            <p>
              These Gold Textiles bar mops are the exact same towels used in restaurant kitchens across the country.
              They survive hundreds of commercial laundry cycles. They actually absorb liquid instead of just pushing
              it around. And at about $2 each, I can have a dozen on hand without thinking twice.
            </p>
          </div>
        </section>

        {/* What Makes It Work */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What Makes These Towels Work</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">100% Cotton Terry Cloth</h3>
              <p className="text-gray-700">
                Thick, absorbent cotton that actually soaks up liquid instead of spreading it around. The terry cloth
                weave holds a lot of water and dries quickly. No synthetic fibers that melt or smell when exposed to heat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Commercial-Grade Durability</h3>
              <p className="text-gray-700">
                Built to withstand commercial laundry cycles - high heat, strong detergents, hundreds of washes. The
                hemmed edges don&apos;t fray. The fabric doesn&apos;t thin out or fall apart. These towels get softer
                and more absorbent with use.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Perfect Size and Weight</h3>
              <p className="text-gray-700">
                16x19 inches - large enough for serious tasks, not so large they&apos;re unwieldy. Heavy enough to be
                absorbent, light enough to dry quickly. The right thickness for grabbing hot pans with a fold or two.
              </p>
            </div>
          </div>
        </section>

        {/* Real Restaurant Use */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Real Restaurant Experience</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="font-semibold">
              From managing kitchen operations at Mellow Mushroom to working the line at fine dining restaurants,
              I&apos;ve used these towels to:
            </p>

            <ul className="space-y-2 mt-4">
              <li>Wipe down cutting boards and work surfaces hundreds of times per shift</li>
              <li>Grab hot pans and sheet trays (folded for heat protection)</li>
              <li>Clean up spills instantly during service</li>
              <li>Dry hands constantly throughout the day</li>
              <li>Polish plates and glassware for presentation</li>
            </ul>

            <p className="mt-6">
              In a professional kitchen, you go through dozens of towels per shift. They get stained with sauce, covered
              in grease, soaked with water. You throw them in the commercial laundry, and they come back ready to work
              again. That&apos;s why every kitchen uses these.
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
                <li>✓ Extremely absorbent - actually dries things</li>
                <li>✓ Commercial-grade durability</li>
                <li>✓ Survives hundreds of hot washes</li>
                <li>✓ Affordable at ~$2 per towel</li>
                <li>✓ Perfect size and weight for kitchen work</li>
                <li>✓ Gets better with age and washing</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">Limitations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Plain white - shows stains (but that&apos;s fine)</li>
                <li>✗ Not decorative (purely functional)</li>
                <li>✗ Need to buy in bulk (12-pack minimum)</li>
                <li>✗ Can lint when brand new (washes out)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who Should Buy This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who These Towels Are For</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Perfect If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Cook regularly and need functional towels</li>
              <li>• Want the same quality used in professional kitchens</li>
              <li>• Value absorbency and durability over appearance</li>
              <li>• Need multiple towels for different tasks</li>
              <li>• Are tired of fancy towels that don&apos;t work</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Want decorative kitchen towels for display</li>
              <li>• Prefer colored or patterned towels</li>
              <li>• Rarely cook and only need one or two towels</li>
              <li>• Don&apos;t have space to store a dozen towels</li>
            </ul>
          </div>
        </section>

        {/* Care & Maintenance */}
        <section className="mb-12 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Care for Them</h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold text-lg mb-2">Washing:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Machine wash hot with regular detergent</li>
                <li>• Bleach safe for removing stains (they&apos;re white anyway)</li>
                <li>• Tumble dry on high heat</li>
                <li>• No fabric softener needed (reduces absorbency)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Usage Tips:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Wash before first use to remove lint</li>
                <li>• Keep a stack of clean ones ready</li>
                <li>• Throw dirty ones in hamper, don&apos;t reuse</li>
                <li>• Replace when they develop holes (takes years)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Pro Tips:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Buy enough to rotate through the week</li>
                <li>• Don&apos;t worry about stains - they&apos;re work towels</li>
                <li>• Fold into quarters for grabbing hot pans</li>
                <li>• Keep one over your shoulder when cooking (pro move)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Add These to Your Kitchen?</h2>

          <p className="text-lg text-gray-700 mb-6">
            These are one of the 11 tools I use most in my home kitchen after 21+ years of professional cooking.
            Stop buying fancy towels that don&apos;t work. Get the ones restaurants actually use.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://amzn.to/3VYHsY9"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Check Current Price on Amazon →
            </a>

            <a
              href="/reviews"
              className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              See All Reviews
            </a>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            💡 Also available at restaurant supply stores and commercial linen suppliers
          </p>
        </section>

        {/* FTC Disclosure */}
        <FTCDisclosure />
      </article>
    </div>
  )
}
