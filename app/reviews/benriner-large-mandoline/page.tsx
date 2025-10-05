import { Metadata } from 'next'
import FTCDisclosure from '@/components/FTCDisclosure'

export const metadata: Metadata = {
  title: 'Benriner Large Mandoline Review | 40 Years Professional Use',
  description: 'Professional chef review of the Benriner large mandoline after 40 years of restaurant use. Professional consistency for uniform slicing.',
}

export default function BenrinerLargeMandolineReview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-200 font-semibold text-sm">PROFESSIONAL KITCHEN TESTED</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Benriner Large Mandoline Review
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            Professional consistency for perfect slices - tested through 40 years of professional cooking
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.8/5</span>
            </div>
            <div>Professional Grade</div>
            <div>$40</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Verdict */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">The Bottom Line</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Perfect potato gratin every time. Consistent slices mean even cooking. The Benriner is the mandoline used
            in professional kitchens worldwide. Just watch your fingers - this thing is sharp!
          </p>
        </div>

        {/* Why I Chose This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why This Is in My Daily Toolkit</h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              After 40 years of cooking professionally, I know that consistent slicing is the difference between amateur
              and professional results. When every potato slice in your gratin is exactly the same thickness, they all
              cook at the same rate. No raw centers, no burnt edges.
            </p>

            <p>
              The Benriner is the mandoline you see in every professional kitchen. It&apos;s sharper and more precise
              than expensive French mandolines, and at $40, it costs a fraction of the price. The Japanese design
              philosophy: simple, sharp, effective.
            </p>

            <p>
              I use this for potato gratins, cucumber salads, vegetable chips, fennel slices - anything that needs
              uniform thickness. The adjustable blade lets you go from paper-thin to thicker cuts. Just respect the
              blade and use the guard. I&apos;ve seen too many chefs with mandoline scars.
            </p>
          </div>
        </section>

        {/* What Makes It Work */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What Makes This Mandoline Work</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Razor-Sharp Japanese Blade</h3>
              <p className="text-gray-700">
                The stainless steel blade is incredibly sharp out of the box. Slices through vegetables with minimal
                pressure, creating clean, uniform cuts. The blade stays sharp through regular use and can be replaced
                when needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Adjustable Thickness Settings</h3>
              <p className="text-gray-700">
                Easy-to-use dial adjusts slice thickness from paper-thin to 5mm. Settings are precise and consistent.
                Perfect for everything from delicate garnishes to hearty vegetable slices. The adjustment mechanism
                holds securely.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Large Cutting Surface</h3>
              <p className="text-gray-700">
                The jumbo size handles large potatoes, cucumbers, and vegetables with ease. Wide surface provides
                stability while slicing. Non-slip feet keep the mandoline secure on the cutting board.
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
              I&apos;ve used this mandoline to:
            </p>

            <ul className="space-y-2 mt-4">
              <li>Slice potatoes for gratins and chips</li>
              <li>Create paper-thin vegetable garnishes</li>
              <li>Prep uniform cucumber slices for salads</li>
              <li>Make vegetable carpaccio presentations</li>
              <li>Slice onions and fennel for even cooking</li>
            </ul>

            <p className="mt-6">
              Consistency is everything in a professional kitchen. When you&apos;re cooking for 200+ covers, every
              component needs to cook at the same rate. The Benriner makes that possible. It&apos;s also incredibly
              fast - you can prep a case of potatoes in minutes.
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
                <li>✓ Razor-sharp blade for clean, uniform slices</li>
                <li>✓ Adjustable thickness settings</li>
                <li>✓ Professional quality at reasonable price ($40)</li>
                <li>✓ Large surface handles big vegetables</li>
                <li>✓ Used in professional kitchens worldwide</li>
                <li>✓ Includes safety guard</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-900">Limitations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Extremely sharp - requires careful use</li>
                <li>✗ Plastic construction feels less premium</li>
                <li>✗ Hand wash only (blade is too sharp for dishwasher)</li>
                <li>✗ Safety guard can be awkward with small items</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who Should Buy This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Who This Mandoline Is For</h2>

          <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600 mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Perfect If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Make gratins, slaws, or dishes requiring uniform slices</li>
              <li>• Want professional-level consistency</li>
              <li>• Value speed and precision in prep work</li>
              <li>• Are comfortable using sharp tools safely</li>
              <li>• Want the same equipment used in professional kitchens</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Skip If You:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Rarely need uniform slices</li>
              <li>• Are uncomfortable with very sharp tools</li>
              <li>• Have limited storage space</li>
              <li>• Only slice occasionally (knife works fine)</li>
            </ul>
          </div>
        </section>

        {/* Care & Maintenance */}
        <section className="mb-12 bg-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Use It Safely</h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold text-lg mb-2">Safety First:</h3>
              <ul className="space-y-1 ml-4">
                <li>• ALWAYS use the safety guard - no exceptions</li>
                <li>• Keep fingers well away from the blade</li>
                <li>• Use on a stable, non-slip surface</li>
                <li>• Pay attention - mandoline injuries are serious</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Daily Care:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Hand wash carefully (never dishwasher)</li>
                <li>• Dry completely before storing</li>
                <li>• Store with blade protected or guard on</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Maintenance:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Check blade sharpness periodically</li>
                <li>• Replace blade when it dulls (replacements available)</li>
                <li>• Clean adjustment mechanism of any debris</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Add This to Your Kitchen?</h2>

          <p className="text-lg text-gray-700 mb-6">
            This is one of the 11 tools I use most in my home kitchen after 40 years of professional cooking.
            If you want professional-level consistency in your cooking, this is the tool.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.amazon.com/Benriner-120-Almond-Jumbo-Slicer/dp/B01CP2PBN6?tag=chefapprovedt-20"
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
            💡 Also available at restaurant supply stores and Japanese kitchen retailers
          </p>
        </section>

        {/* FTC Disclosure */}
        <FTCDisclosure />
      </article>
    </div>
  )
}
