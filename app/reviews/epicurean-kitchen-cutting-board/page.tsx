import { Metadata } from 'next'
import FTCDisclosure from '@/components/FTCDisclosure'

export const metadata: Metadata = {
  title: 'Epicurean Kitchen Cutting Board Review | 40 Years Professional Use',
  description: 'Professional chef review of the Epicurean kitchen cutting board after 40 years of restaurant use. Dishwasher-safe and better than wood.',
}

export default function EpicureanKitchenCuttingBoardReview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">PROFESSIONAL KITCHEN TESTED</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Epicurean Kitchen Cutting Board Review
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            Dishwasher-safe boards that are better than wood - tested through 40 years of professional cooking
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>5/5</span>
            </div>
            <div>Professional Grade</div>
            <div>$35</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">The Bottom Line</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            I&apos;ve used wooden boards for decades. These are better. Period. Dishwasher-safe changes everything -
            truly sanitary, knife-friendly, and won&apos;t harbor bacteria like wood. This is the future of cutting boards.
          </p>
        </div>

        {/* Why I Chose This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why This Is in My Daily Toolkit</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              After 40 years of cooking professionally, I thought I knew cutting boards. Wood or bamboo, hand-wash only,
              oil regularly to prevent cracking. That was the gospel. Then I discovered Epicurean boards and everything
              changed.
            </p>

            <p>
              These boards are made from compressed wood fibers - essentially the same material as skateboards. They&apos;re
              knife-friendly like wood, but unlike wood, they&apos;re completely dishwasher-safe and non-porous. No more
              worrying about bacteria hiding in knife scars. No more hand-washing and oiling. Just throw it in the
              dishwasher.
            </p>

            <p>
              I was skeptical at first. But after using these for years, I&apos;m converted. They don&apos;t warp,
              they don&apos;t crack, they don&apos;t absorb odors or stains like wood does. And they&apos;re gentle
              enough on knife edges that my Victorinox knives stay sharp.
            </p>
          </div>
        </section>

        {/* What Makes It Work */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What Makes This Board Work</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Richlite Construction</h3>
              <p className="text-gray-700">
                Made from compressed wood fiber and resin - heat-resistant up to 350°F, completely non-porous, and
                won&apos;t harbor bacteria. The surface is gentle on knife edges while being durable enough for daily
                professional use. NSF certified for commercial kitchens.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Dishwasher-Safe</h3>
              <p className="text-gray-700">
                This is the game-changer. Throw it in the dishwasher after cutting raw chicken. No special care, no
                oiling, no warping. It comes out sanitized and ready to use. For a professional kitchen mentality -
                sanitation above all - this matters.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Won&apos;t Warp or Crack</h3>
              <p className="text-gray-700">
                Unlike wood boards that warp when exposed to moisture or heat, Epicurean boards stay flat. No more
                rocking boards on the counter. The material is dimensionally stable - it won&apos;t expand, contract,
                or split over time.
              </p>
            </div>
          </div>
        </section>

        {/* Real Restaurant Use */}
        <section className="mb-12 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Real Restaurant Experience</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="font-semibold">
              After decades in professional kitchens and now at home, I&apos;ve used this board to:
            </p>

            <ul className="space-y-2 mt-4">
              <li>Break down raw proteins without cross-contamination concerns</li>
              <li>Prep vegetables for hundreds of meals</li>
              <li>Work with acidic ingredients that would stain wood</li>
              <li>Place hot pots directly on the surface (heat-resistant)</li>
              <li>Sanitize properly in the dishwasher after every use</li>
            </ul>

            <p className="mt-6">
              In professional kitchens, sanitation is everything. Health inspectors love these boards because they&apos;re
              non-porous and dishwasher-safe. No bacteria hiding in knife grooves. No lingering odors from onions or
              fish. Just clean, sanitary cutting surfaces.
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
                <li>✓ Dishwasher-safe - truly sanitary</li>
                <li>✓ Knife-friendly surface</li>
                <li>✓ Won&apos;t warp, crack, or split</li>
                <li>✓ Non-porous - no bacteria growth</li>
                <li>✓ Heat-resistant up to 350°F</li>
                <li>✓ NSF certified for commercial use</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">Limitations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✗ More expensive than basic wood boards ($35)</li>
                <li>✗ Can show knife marks over time (cosmetic only)</li>
                <li>✗ Harder surface than soft wood (still knife-safe)</li>
                <li>✗ Less traditional aesthetic than wood</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who Should Buy This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who This Board Is For</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Perfect If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Value sanitation and want dishwasher-safe boards</li>
              <li>• Regularly work with raw proteins</li>
              <li>• Want a board that won&apos;t warp or crack</li>
              <li>• Are tired of maintaining wood boards</li>
              <li>• Want professional-grade equipment at home</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Prefer traditional wood aesthetics</li>
              <li>• Want the softest possible surface for knives</li>
              <li>• Are on a tight budget (wood boards are cheaper)</li>
              <li>• Enjoy the ritual of oiling and maintaining wood</li>
            </ul>
          </div>
        </section>

        {/* Care & Maintenance */}
        <section className="mb-12 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Care for It</h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold text-lg mb-2">Daily Care:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Throw in the dishwasher or hand wash with soap</li>
                <li>• Air dry or towel dry - both fine</li>
                <li>• No oiling or special treatment needed</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Long-Term Maintenance:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Literally nothing - it&apos;s that easy</li>
                <li>• Board will develop a patina of knife marks (normal)</li>
                <li>• Can sand surface with fine sandpaper if desired (optional)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">What to Know:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Won&apos;t absorb odors or stains like wood</li>
                <li>• Can handle hot pots up to 350°F</li>
                <li>• Store anywhere - won&apos;t warp</li>
                <li>• Replace when heavily worn (takes many years)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Add This to Your Kitchen?</h2>

          <p className="text-lg text-gray-700 mb-6">
            This is one of the 11 tools I use most in my home kitchen after 40 years of professional cooking.
            If you want a truly sanitary, maintenance-free cutting board, this is it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.amazon.com/Epicurean-Kitchen-Cutting-Board-Natural/dp/B0008221B6?tag=chefapprovedt-20"
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
            💡 Also available at kitchen retailers and restaurant supply stores
          </p>
        </section>

        {/* FTC Disclosure */}
        <FTCDisclosure />
      </article>
    </div>
  )
}
