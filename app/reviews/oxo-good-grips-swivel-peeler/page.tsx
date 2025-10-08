import { Metadata } from 'next'
import FTCDisclosure from '@/components/FTCDisclosure'

export const metadata: Metadata = {
  title: 'OXO Good Grips Swivel Peeler Review | 21+ Years Professional Use',
  description: 'Professional chef review of the OXO Good Grips swivel peeler after 21+ years of professional cooking. The best peeler for comfort, performance, and durability.',
}

export default function OXOGoodGripsSwivelPeelerReview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">PROFESSIONAL KITCHEN TESTED</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            OXO Good Grips Swivel Peeler Review
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            The peeler that just works - tested through 21+ years of professional cooking
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>5/5</span>
            </div>
            <div>Professional Grade</div>
            <div>$10</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">The Bottom Line</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            I&apos;ve tried every peeler out there. This is the one. It just works, day after day, year after year.
            Comfortable grip, sharp blade, swivels to follow contours. At $10, stop overthinking it and buy one.
          </p>
        </div>

        {/* Why I Chose This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why This Is in My Daily Toolkit</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              After 40 years of cooking, I&apos;ve used dozens of different peelers. Cheap ones that
              broke, expensive ones that were awkward to hold, Y-peelers, straight peelers, ceramic blades, you name it.
            </p>

            <p>
              This OXO swivel peeler is the one I come back to every time. The comfortable grip doesn&apos;t slip when
              wet. The sharp blade glides through potato skins without digging in. The swivel action follows the
              contours of vegetables and fruits effortlessly.
            </p>

            <p>
              In professional kitchens, we peel pounds of vegetables per shift. This peeler handles the volume without
              causing hand fatigue. It&apos;s dishwasher-safe, durable, and at $10, I can keep a couple on hand without
              thinking twice.
            </p>
          </div>
        </section>

        {/* What Makes It Work */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What Makes This Tool Work</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Good Grips Handle</h3>
              <p className="text-gray-700">
                The oversized, soft, non-slip handle is what sets OXO apart. Comfortable for extended use. Stays secure
                even when wet or greasy. Designed for people with arthritis, but everyone benefits from the ergonomic
                design.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Swivel Blade Action</h3>
              <p className="text-gray-700">
                The blade swivels to follow the natural contours of vegetables and fruits. Reduces waste by conforming
                to shapes. Sharp stainless steel blade glides through skins without excessive pressure. Built-in potato
                eye remover on the side.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Durable Construction</h3>
              <p className="text-gray-700">
                Built to last with quality materials. Dishwasher-safe for easy cleanup. The blade stays sharp through
                regular use and can be replaced when needed (though they last for years). No rust, no handle
                deterioration.
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
              I&apos;ve used this peeler to:
            </p>

            <ul className="space-y-2 mt-4">
              <li>Peel 50+ pounds of potatoes per shift</li>
              <li>Prep carrots, parsnips, and root vegetables</li>
              <li>Peel apples and pears for desserts</li>
              <li>Create vegetable ribbons for garnishes</li>
              <li>Shave hard cheeses like Parmesan</li>
            </ul>

            <p className="mt-6">
              The comfortable grip matters when you&apos;re peeling for hours. Cheaper peelers cause hand cramping and
              blisters. This one doesn&apos;t. That&apos;s why every prep cook I know owns one.
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
                <li>✓ Comfortable grip prevents hand fatigue</li>
                <li>✓ Sharp blade peels effortlessly</li>
                <li>✓ Swivel action follows contours</li>
                <li>✓ Dishwasher-safe</li>
                <li>✓ Incredibly affordable at $10</li>
                <li>✓ Built-in potato eye remover</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">Limitations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Blade eventually dulls (after years of use)</li>
                <li>✗ Larger handle may feel bulky to some</li>
                <li>✗ Not ideal for very thick-skinned items</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who Should Buy This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who This Tool Is For</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Perfect If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Regularly peel vegetables and fruits</li>
              <li>• Want a comfortable, ergonomic tool</li>
              <li>• Value reliability and durability</li>
              <li>• Have arthritis or hand issues</li>
              <li>• Need a professional-quality peeler at budget price</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Never peel vegetables (but seriously, who doesn&apos;t?)</li>
              <li>• Prefer Y-style peelers over swivel peelers</li>
              <li>• Want a compact, minimalist tool</li>
            </ul>
          </div>
        </section>

        {/* Care & Maintenance */}
        <section className="mb-12 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Make It Last Years</h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold text-lg mb-2">Daily Care:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Hand wash or put in dishwasher</li>
                <li>• Dry thoroughly if hand washing</li>
                <li>• Store in utensil drawer or crock</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Maintenance:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Check blade sharpness periodically</li>
                <li>• Replace when blade dulls (OXO sells replacement blades)</li>
                <li>• Clean any buildup around swivel mechanism</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">What to Avoid:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Don&apos;t use on very hard items (use a knife instead)</li>
                <li>• Avoid leaving in standing water</li>
                <li>• Don&apos;t try to sharpen the blade yourself</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Add This to Your Kitchen?</h2>

          <p className="text-lg text-gray-700 mb-6">
            This is one of the 11 tools I use most in my home kitchen after 21+ years of professional cooking.
            At $10, this is the easiest recommendation I can make. Buy one, thank me later.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://amzn.to/4mZNiyT"
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
