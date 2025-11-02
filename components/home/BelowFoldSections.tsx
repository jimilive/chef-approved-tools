import Image from 'next/image'
import Link from 'next/link'

export function WhyListenSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Listen to Me?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Because I&apos;ve actually worked the line—not just tested products for affiliate commissions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Credentials */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                24 Years in Professional Kitchens
              </h3>
              <p className="text-slate-600 leading-relaxed">
                From Mellow Mushroom (Kitchen Manager, 7 years) to Purple Café (6 years),
                Il Pizzaiolo, Feierabend, and Paragary&apos;s. I know what holds up under restaurant abuse.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                🎓 Formal Culinary Training
              </h3>
              <p className="text-slate-600 leading-relaxed">
                A.A.S. in Culinary Arts from Seattle Central College (2005-2007). Learned the foundations,
                then spent two decades refining them.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                ⚖️ Honest Reviews, Transparent System
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                I only recommend what I&apos;ve actually used—often for years. Every product has pros AND cons.
                Perfect reviews are fake reviews.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                <p className="text-slate-700">
                  <strong>My Three-Tier System:</strong> Every review uses my transparent three-tier system—from
                  professional kitchen use (Tier 1) to long-term personal testing (Tier 2) to expert evaluation
                  (Tier 3). You always know my level of hands-on experience.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
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
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/le-creuset-pot-roast-dutch-oven.jpg"
                  alt="Pot roast in Le Creuset Dutch oven"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
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
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/ninja-air-fryer-fries.jpg"
                  alt="Fries in Ninja air fryer"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ShopByCategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Professional equipment recommendations for home cooks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Knives Category */}
          <Link
            href="/knives"
            className="group bg-white hover:bg-blue-50 rounded-xl p-8 transition-all hover:shadow-xl border-2 border-transparent hover:border-blue-200"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <span className="text-4xl">🔪</span>
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">
              Professional Knives
            </h3>
            <p className="text-slate-600 text-center leading-relaxed">
              German steel, Japanese precision, commercial durability
            </p>
          </Link>

          {/* Cookware Category */}
          <Link
            href="/cookware"
            className="group bg-white hover:bg-green-50 rounded-xl p-8 transition-all hover:shadow-xl border-2 border-transparent hover:border-green-200"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
              <span className="text-4xl">🍳</span>
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">
              Restaurant Cookware
            </h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Cast iron, stainless steel, what actually lasts
            </p>
          </Link>

          {/* Appliances Category */}
          <Link
            href="/appliances"
            className="group bg-white hover:bg-purple-50 rounded-xl p-8 transition-all hover:shadow-xl border-2 border-transparent hover:border-purple-200"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
              <span className="text-4xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">
              Commercial Appliances
            </h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Mixers, blenders, processors built for abuse
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function SecondaryCTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          The Tools That Started It All
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          These are the essentials I packed for my first day at culinary school in 2005.
          Twenty years later, I still reach for them first.
        </p>
        <Link
          href="/the-tools-that-started-it-all"
          className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          See the Essential Toolkit
        </Link>
      </div>
    </section>
  )
}

export function TopProfessionalPicksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Top Professional Picks
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Equipment that survived restaurant abuse and earned a place in my home kitchen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Vitamix 5200 */}
          <Link
            href="/reviews/vitamix-5200-professional-blender"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="relative h-64 bg-white overflow-hidden">
              <Image
                src="/images/products/vitamix-5200-professional-blender/vitamix-5200-professional-blender-1.jpg"
                alt="Vitamix 5200 Professional Blender"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain"
              />
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  Tier 1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                Vitamix 5200 Professional Blender
              </h3>
              <p className="text-slate-600 mb-4">
                Commercial power. Exceptional control. 5+ years daily use.
              </p>
              <span className="text-orange-700 font-semibold inline-flex items-center gap-2">
                Read full review →
              </span>
            </div>
          </Link>

          {/* Lodge Cast Iron */}
          <Link
            href="/reviews/lodge-seasoned-cast-iron-3-skillet-bundle"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="relative h-64 bg-white overflow-hidden">
              <Image
                src="/images/products/lodge-seasoned-cast-iron-3-skillet-bundle/lodge-seasoned-cast-iron-3-skillet-bundle-1.jpg"
                alt="Lodge Seasoned Cast Iron 3 Skillet Bundle"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain"
              />
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  Tier 1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                Lodge Cast Iron Skillet
              </h3>
              <p className="text-slate-600 mb-4">
                Sear like a chef. Eat like a king. Lasts forever.
              </p>
              <span className="text-orange-700 font-semibold inline-flex items-center gap-2">
                Read full review →
              </span>
            </div>
          </Link>

          {/* Victorinox Fibrox 8-inch */}
          <Link
            href="/reviews/victorinox-fibrox-8-inch-chefs-knife"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="relative h-64 bg-white overflow-hidden">
              <Image
                src="/images/products/victorinox-fibrox-8-inch-chefs-knife/victorinox-fibrox-8-inch-chefs-knife-1.jpg"
                alt="Victorinox Fibrox Pro 8-inch Chef's Knife"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain"
              />
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  Tier 1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                Victorinox Fibrox Pro Chef&apos;s Knife
              </h3>
              <p className="text-slate-600 mb-4">
                20 years. Daily use. Dishwasher friendly.
              </p>
              <span className="text-orange-700 font-semibold inline-flex items-center gap-2">
                Read full review →
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-block border-2 border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
          >
            See All Reviews
          </Link>
        </div>
      </div>
    </section>
  )
}

export function FinalCTASection() {
  return (
    <section className="py-16 bg-orange-800 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stop Guessing. Start Cooking Like a Chef.
        </h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed font-bold">
          Get my free guide to the 11 tools that handle 99% of home cooking—tested through
          24 years of professional kitchen abuse.
        </p>
        <a
          href="#get-guide"
          className="inline-block bg-white text-orange-800 hover:bg-orange-50 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          Get The Free Guide
        </a>
      </div>
    </section>
  )
}

export function TrustBarSection() {
  return (
    <section className="bg-slate-900 text-white py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Kitchen Manager, Mellow Mushroom (3 years)
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Line Cook, Purple Café (6 years)
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Line Cook, Feierabend
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Seattle Central Culinary
          </span>
        </div>
      </div>
    </section>
  )
}
