import Image from 'next/image';
import Link from 'next/link';

export default function HomePageV3() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION - Dual Impact */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white">
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Message */}
            <div className="space-y-6 pl-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Rigorously Tested,
                <br />
                Professionally Vetted,
                <br />
                <span className="text-orange-400">Chef Approved</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                24 years in professional kitchens—from Mellow Mushroom to Purple Café to your home kitchen.
                No BS reviews. No affiliate pressure. Just the tools that actually work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#get-guide"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Get My Free Guide
                </a>
                <Link
                  href="/reviews"
                  className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 font-semibold px-8 py-4 rounded-xl transition-all text-center"
                >
                  Browse Reviews
                </Link>
              </div>
            </div>

            {/* Right: Scott in Chef's Coat */}
            <div className="relative max-w-md mx-auto flex items-center py-12">
              <div className="relative overflow-hidden rounded-2xl bg-slate-700">
                <Image
                  src="/images/scott-chef-coat-cropped.jpg"
                  alt="Scott Bradley - Professional Chef with 24 Years Experience"
                  width={300}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white px-6 py-3 rounded-xl">
                <p className="font-bold text-lg">24 Years</p>
                <p className="text-sm">Professional Kitchens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS IN ACTION - The Money Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              These Tools Create This Food
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real equipment, real cooking, real results. No stock photos, no staged shots—just what happens
              when you use the right tools.
            </p>
          </div>

          {/* Grid of Beautiful Food Shots */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Steak Sear */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cast-iron-steak-sear.jpg"
                  alt="Perfect steak sear in cast iron"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Perfect Cast Iron Sear
                </h3>
                <p className="text-slate-600 mb-4">
                  Restaurant-quality crust at home. The right pan makes all the difference.
                </p>
                <Link
                  href="/reviews/lodge-cast-iron-skillet"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2"
                >
                  See the pan →
                </Link>
              </div>
            </div>

            {/* Bacon Burger */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cast-iron-bacon-burger.jpg"
                  alt="Bacon cheeseburger cooked in cast iron"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  The Perfect Smash Burger
                </h3>
                <p className="text-slate-600 mb-4">
                  Cast iron heat retention creates that crispy, caramelized edge every time.
                </p>
                <Link
                  href="/reviews/lodge-cast-iron-skillet"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2"
                >
                  See the pan →
                </Link>
              </div>
            </div>

            {/* Heirloom Tomatoes */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/epicurean-heirloom-tomatoes.jpg"
                  alt="Heirloom tomatoes sliced on Epicurean cutting board"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Knife-Friendly, Dishwasher-Safe
                </h3>
                <p className="text-slate-600 mb-4">
                  After 20 years with wood boards, I switched. This changed everything.
                </p>
                <Link
                  href="/reviews/epicurean-cutting-board"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2"
                >
                  See the board →
                </Link>
              </div>
            </div>

            {/* Pot Roast */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/le-creuset-pot-roast-plated.jpg"
                  alt="Pot roast dinner plated"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Sunday Pot Roast Perfection
                </h3>
                <p className="text-slate-600 mb-4">
                  Dutch oven cooking: low, slow, and foolproof. This is comfort food done right.
                </p>
                <Link
                  href="/reviews/le-creuset-dutch-oven"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2"
                >
                  See the Dutch oven →
                </Link>
              </div>
            </div>

            {/* Eggs in Pan */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cuisinart-eggs-cooking.jpg"
                  alt="Farm fresh eggs cooking in Cuisinart pan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Breakfast Gold Standard
                </h3>
                <p className="text-slate-600 mb-4">
                  Even heat, no hot spots. Perfect eggs every single morning for 5+ years.
                </p>
                <Link
                  href="/reviews/cuisinart-multiclad-pro-skillet"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2"
                >
                  See the skillet →
                </Link>
              </div>
            </div>

            {/* Sheet Pan Ribs */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/nordic-ware-ribs.jpg"
                  alt="BBQ ribs on Nordic Ware half sheet pan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Sheet Pan Everything
                </h3>
                <p className="text-slate-600 mb-4">
                  From ribs to roasted vegetables, this pan handles it all. Restaurant-grade durability.
                </p>
                <Link
                  href="/reviews/nordic-ware-half-sheet-pan"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2"
                >
                  See the pan →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET SECTION - The Conversion Point */}
      <section id="get-guide" className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                The 11 Tools I Use Most
              </h2>
              <p className="text-xl text-slate-600 mb-2">
                From Professional Kitchens to My Apartment Kitchen
              </p>
              <p className="text-lg text-slate-500">
                My daily workhorse tools, tested in professional kitchens and proven at home.
              </p>
            </div>

            {/* Preview Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🔪</div>
                <h3 className="font-semibold text-slate-900 mb-1">5 Essential Knives</h3>
                <p className="text-sm text-slate-600">The ones I actually use daily</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">💰</div>
                <h3 className="font-semibold text-slate-900 mb-1">Total: ~$320</h3>
                <p className="text-sm text-slate-600">Complete professional toolkit</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="font-semibold text-slate-900 mb-1">99% Coverage</h3>
                <p className="text-sm text-slate-600">Handles everything I cook</p>
              </div>
            </div>

            {/* Email Form */}
            <div className="max-w-xl mx-auto">
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  Send Me The Free Guide
                </button>
                <p className="text-xs text-center text-slate-500">
                  No spam. Unsubscribe anytime. I respect your inbox.
                </p>
              </form>
            </div>

            {/* Trust Signal */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-slate-600">
                <strong>Join home cooks</strong> who&apos;ve upgraded their kitchens with professional-quality tools
                that actually work—without breaking the bank.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY SECTION - Why Trust Scott */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Listen to Me?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Because I&apos;ve actually worked the line—not just tested products for affiliate commissions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Credentials */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-xl">
                    24
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">
                    Years in Professional Kitchens
                  </h3>
                  <p className="text-slate-600">
                    From Mellow Mushroom (Kitchen Manager, 7 years) to Purple Café (6 years),
                    Il Pizzaiolo, Feierabend, and Paragary&apos;s. I know what holds up under restaurant abuse.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-xl">
                    🎓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">
                    Formal Culinary Training
                  </h3>
                  <p className="text-slate-600">
                    A.A.S. in Culinary Arts from Seattle Central College (2005-2007).
                    Learned the foundations, then spent two decades refining them.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-xl">
                    ⚖️
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">
                    No BS, Just Honest Reviews
                  </h3>
                  <p className="text-slate-600">
                    I only recommend what I&apos;ve actually used—often for years. Every product has pros AND cons.
                    Perfect reviews are fake reviews.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2"
                >
                  Read my full story →
                </Link>
              </div>
            </div>

            {/* Right: Action Shots Collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/oxo-bench-scraper-garlic.jpg"
                    alt="Mincing garlic with OXO bench scraper"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/le-creuset-pot-roast-dutch-oven.jpg"
                    alt="Pot roast in Le Creuset Dutch oven"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/mandolin-onions.jpg"
                    alt="Slicing onions with Benriner mandolin"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/ninja-air-fryer-fries.jpg"
                    alt="Fries in Ninja air fryer"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY CTA - Tools That Started It All */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Tools That Started It All
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            These are the essentials I packed for my first day at culinary school in 2005.
            Twenty years later, I still reach for them first.
          </p>
          <Link
            href="/tools-that-started-it-all"
            className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            See the Essential Toolkit
          </Link>
        </div>
      </section>

      {/* RECENT REVIEWS - Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Latest Reviews
            </h2>
            <p className="text-xl text-slate-600">
              Honest assessments from real professional experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Review Card Template - Repeat 3x */}
            <Link href="/reviews/vitamix-5200" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                {/* Product image would go here */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  Product Image
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm text-slate-500">Tier 1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Vitamix 5200 Professional Blender
                </h3>
                <p className="text-slate-600 mb-4">
                  5+ years of daily use at Purple Café. Loud as hell, but unstoppable.
                </p>
                <span className="text-orange-700 font-semibold">Read full review →</span>
              </div>
            </Link>

            {/* Repeat for other reviews */}
            <Link href="/reviews/lodge-cast-iron" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  Product Image
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm text-slate-500">Tier 1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Lodge Cast Iron Skillet
                </h3>
                <p className="text-slate-600 mb-4">
                  The pan that taught me to cook. 20 years later, still my go-to.
                </p>
                <span className="text-orange-700 font-semibold">Read full review →</span>
              </div>
            </Link>

            <Link href="/reviews/victorinox-fibrox" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  Product Image
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm text-slate-500">Tier 1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Victorinox Fibrox Pro Chef&apos;s Knife
                </h3>
                <p className="text-slate-600 mb-4">
                  The knife every professional kitchen uses. There&apos;s a reason.
                </p>
                <span className="text-orange-700 font-semibold">Read full review →</span>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-block border-2 border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all"
            >
              See All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Don't Let Them Leave Empty-Handed */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop Guessing. Start Cooking Like a Chef.
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get my free guide to the 11 tools that handle 99% of home cooking—tested through
            24 years of professional kitchen abuse.
          </p>
          <a
            href="#get-guide"
            className="inline-block bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Get The Free Guide
          </a>
        </div>
      </section>
    </main>
  );
}
