import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import ProductImpressionTracker from '@/components/ProductImpressionTracker'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

export const metadata: Metadata = {
  title: 'The Chef-Approved Kitchen Starter Kit: 10 Essential Tools | Chef Approved',
  description: 'Build a professional-grade kitchen with these 10 essential tools, personally tested and recommended by a 23+ year restaurant veteran. From knives to cookware, this is the ultimate starter kit.',
  keywords: 'chef approved kitchen kit, essential kitchen tools, professional kitchen starter, restaurant tested equipment',
  alternates: {
    canonical: '/kitchen-bundle',
  },
}

// Part 1: Core Essentials (~$150 Foundation)
const coreEssentials = [
  {
    name: "Victorinox Fibrox Pro 8\" Chef's Knife",
    justification: "The workhorse knife that will handle 90% of your daily prep. Professional-grade Swiss engineering at an unbeatable price.",
    reviewSlug: "victorinox-fibrox-8-inch-chefs-knife",
    affiliateUrl: "https://www.amazon.com/dp/B008M5U1C2?tag=chefapprovedt-20",
    image: "/logo.png"
  },
  {
    name: "Victorinox 4\" Paring Knife",
    justification: "For detailed work and precision cuts. The perfect complement to your chef's knife.",
    reviewSlug: "victorinox-4-inch-paring-knife",
    affiliateUrl: "https://www.amazon.com/dp/B0001VQIP6?tag=chefapprovedt-20",
    image: "/logo.png"
  },
  {
    name: "Lodge Cast Iron 3-Skillet Bundle",
    justification: "The indestructible pan set that will outlast you. Perfect searing, oven-safe, and they get better with age.",
    reviewSlug: "lodge-seasoned-cast-iron-3-skillet-bundle",
    affiliateUrl: "https://www.amazon.com/dp/B071FMVSYJ?tag=chefapprovedt-20",
    image: "/logo.png"
  },
  {
    name: "OXO Good Grips Swivel Peeler",
    justification: "The one tool you'll use every single day. Non-slip grip and razor-sharp blade that adapts to any vegetable.",
    reviewSlug: "oxo-good-grips-swivel-peeler",
    affiliateUrl: "https://amzn.to/4mZNiyT",
    image: "/logo.png"
  },
  {
    name: "ZUPERIA Bar Mops (12-Pack)",
    justification: "The exact towels I used in professional kitchens. 100% ring spun cotton. Restaurant-grade absorbency and durability.",
    reviewSlug: "zuperia-bar-mops",
    affiliateUrl: "https://www.amazon.com/dp/B0F79BC6J5?tag=chefapprovedt-20",
    image: "/logo.png"
  }
]

// Part 2: Lifetime Upgrades
const lifetimeUpgrades = [
  {
    name: "Le Creuset Signature 7.25 Qt Dutch Oven",
    justification: "The buy-it-for-life investment piece. Perfect for braising, bread baking, and soups. Will be passed down to your children.",
    reviewSlug: "le-creuset-signature-7-25-qt-dutch-oven",
    affiliateUrl: "https://www.amazon.com/dp/B0076NOFSC?tag=chefapprovedt-20",
    image: "/logo.png"
  },
  {
    name: "John Boos Platinum 24x18\" Cutting Board",
    justification: "The professional workspace I used managing $80K/month operations. Large enough for serious prep, gentle on knives, built to last decades.",
    reviewSlug: "john-boos-platinum-commercial-cutting-board",
    affiliateUrl: "https://amzn.to/47jDzyG",
    image: "/logo.png"
  },
  {
    name: "KitchenAid KSM8990WH Commercial Series Mixer",
    justification: "NSF-certified power that survived 18 months of restaurant use. This is the mixer professional kitchens choose.",
    reviewSlug: "kitchenaid-ksm8990wh",
    affiliateUrl: "https://www.amazon.com/dp/B00IRH09EK?tag=chefapprovedt-20",
    image: "/logo.png"
  },
  {
    name: "Vitamix 5200 Blender",
    justification: "5+ years powering our commercial smoothie program. The industry standard for professional blending.",
    reviewSlug: "vitamix-5200",
    affiliateUrl: "https://amzn.to/48RALd9",
    image: "/logo.png"
  }
]

// Part 3: Specialist Tool
const specialistTool = {
  name: "Benriner Large Mandoline",
  justification: "The industry-standard tool for paper-thin, restaurant-quality slices. What takes 15 minutes with a knife takes 2 minutes with this Japanese precision tool.",
  reviewSlug: "benriner-large-mandoline",
  affiliateUrl: "https://www.amazon.com/dp/B0000Y6JDG?tag=chefapprovedt-20",
  image: "/logo.png"
}

export default function ChefApprovedKitchenKit() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-block">
              <span className="text-orange-200 font-semibold text-sm sm:text-base">
                👨‍🍳 23+ YEARS PROFESSIONAL COOKING EXPERIENCE
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-center">
            The Chef-Approved Kitchen Starter Kit
          </h1>

          {/* E-E-A-T Expert Hook */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl text-slate-200 mb-6 leading-relaxed text-center">
              Every professional kitchen is built on a foundation of a few indestructible, high-performance tools.
              After 23+ years of setting up restaurant kitchens and seeing countless gadgets fail, I&apos;ve distilled
              the list down to the non-negotiable essentials.
            </p>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed text-center font-semibold">
              This is the exact kit I&apos;d recommend to any serious home cook looking to build a kitchen that lasts.
            </p>
          </div>

          {/* Author Credibility */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto mt-8 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-orange-400">
                <Image
                  src="/images/team/head-shot-1.jpg"
                  alt="Scott Bradley - Professional Chef"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm sm:text-base italic leading-relaxed text-slate-200">
                  &ldquo;I&apos;ve equipped kitchens at every level—from fast food to fine dining. Focus your budget on
                  these essentials and skip the gimmicks. This is the foundation that actually matters.&rdquo;
                </p>
                <p className="text-sm text-orange-300 mt-2 font-semibold">
                  — Scott Bradley, Kitchen Manager (Mellow Mushroom), Seattle Central Culinary Graduate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 1: The Core Essentials */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
              Part 1: The Core Essentials
            </h2>
            <p className="text-lg sm:text-xl text-orange-600 font-semibold mb-4">
              The Essential Foundation
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              This is the unbeatable professional foundation. These five items will handle 90% of your daily
              cooking tasks with performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreEssentials.map((product, index) => (
              <ProductImpressionTracker
                key={index}
                productName={product.name}
                productSlug={product.reviewSlug}
                category="Kitchen Bundle"
                brand={product.name.split(' ')[0]}
                position={index + 1}
                listName="bundle_core_essentials"
              >
              <div
                className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  {/* Image */}
                  <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={160}
                      height={160}
                      sizes="(max-width: 768px) 160px, 200px"
                      className="object-contain opacity-50"
                    />
                  </div>

                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3 text-center min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  {/* Justification */}
                  <p className="text-sm text-slate-600 mb-4 text-center leading-relaxed">
                    {product.justification}
                  </p>

                  {/* Dual CTAs */}
                  <div className="space-y-2">
                    <CTAVisibilityTracker
                      ctaId={`bundle-core-${product.reviewSlug}-amazon-${index + 1}`}
                      position="mid_article"
                      productSlug={product.reviewSlug}
                      merchant="amazon"
                    >
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-center block flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Check Price on Amazon
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    </CTAVisibilityTracker>
                    <CTAVisibilityTracker
                      ctaId={`bundle-core-${product.reviewSlug}-review-${index + 1}`}
                      position="mid_article"
                      productSlug={product.reviewSlug}
                      merchant="internal"
                    >
                    <Link
                      href={`/reviews/${product.reviewSlug}`}
                      className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-center block flex items-center justify-center gap-2 text-sm"
                    >
                      📊 Read Full Review
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    </CTAVisibilityTracker>
                  </div>
                </div>
              </div>
              </ProductImpressionTracker>
            ))}
          </div>
        </div>
      </section>

      {/* PART 2: The Lifetime Upgrades */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
              Part 2: Investing in Your Kitchen
            </h2>
            <p className="text-lg sm:text-xl text-orange-600 font-semibold mb-4">
              The Professional&apos;s Upgrade Path
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-slate-700 leading-relaxed">
                While the Core Essentials will handle most of your tasks, there comes a point where investing
                in specific, high-performance tools can truly transform your cooking. These are the &ldquo;buy it once,
                cry once&rdquo; pieces that form the heart of a professional kitchen and will last for generations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lifetimeUpgrades.map((product, index) => (
              <ProductImpressionTracker
                key={index}
                productName={product.name}
                productSlug={product.reviewSlug}
                category="Kitchen Bundle"
                brand={product.name.split(' ')[0]}
                position={index + 1}
                listName="bundle_lifetime_upgrades"
              >
              <div
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-orange-200"
              >
                <div className="p-6 sm:p-8">
                  {/* Image */}
                  <div className="relative w-full h-56 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      sizes="(max-width: 768px) 200px, 250px"
                      className="object-contain opacity-50"
                    />
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                    {product.name}
                  </h3>

                  {/* Justification */}
                  <p className="text-base text-slate-600 mb-6 text-center leading-relaxed">
                    {product.justification}
                  </p>

                  {/* Dual CTAs */}
                  <div className="space-y-3">
                    <CTAVisibilityTracker
                      ctaId={`bundle-lifetime-${product.reviewSlug}-amazon-${index + 1}`}
                      position="mid_article"
                      productSlug={product.reviewSlug}
                      merchant="amazon"
                    >
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-center block flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Check Price on Amazon
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    </CTAVisibilityTracker>
                    <CTAVisibilityTracker
                      ctaId={`bundle-lifetime-${product.reviewSlug}-review-${index + 1}`}
                      position="mid_article"
                      productSlug={product.reviewSlug}
                      merchant="internal"
                    >
                    <Link
                      href={`/reviews/${product.reviewSlug}`}
                      className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-center block flex items-center justify-center gap-2"
                    >
                      📊 Read Full Review
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    </CTAVisibilityTracker>
                  </div>
                </div>
              </div>
              </ProductImpressionTracker>
            ))}
          </div>
        </div>
      </section>

      {/* PART 3: The Specialist Tool */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
              Part 3: The Specialist Tool
            </h2>
            <p className="text-lg sm:text-xl text-orange-600 font-semibold mb-4">
              For Next-Level Technique
            </p>
          </div>

          <ProductImpressionTracker
            productName={specialistTool.name}
            productSlug={specialistTool.reviewSlug}
            category="Kitchen Bundle"
            brand="Benriner"
            position={1}
            listName="bundle_specialist_tool"
          >
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl overflow-hidden border-4 border-orange-400">
            <div className="p-8 sm:p-12">
              {/* Image */}
              <div className="relative w-full h-64 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <Image
                  src={specialistTool.image}
                  alt={specialistTool.name}
                  width={240}
                  height={240}
                  sizes="240px"
                  className="object-contain opacity-50"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
                {specialistTool.name}
              </h3>

              {/* Justification */}
              <p className="text-lg text-slate-200 mb-8 text-center leading-relaxed max-w-2xl mx-auto">
                {specialistTool.justification}
              </p>

              {/* Dual CTAs */}
              <div className="space-y-3 max-w-md mx-auto">
                <CTAVisibilityTracker
                  ctaId="bundle-specialist-benriner-amazon-1"
                  position="mid_article"
                  productSlug={specialistTool.reviewSlug}
                  merchant="amazon"
                >
                <a
                  href={specialistTool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-center block flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Check Price on Amazon
                  <ArrowRight className="w-5 h-5" />
                </a>
                </CTAVisibilityTracker>
                <CTAVisibilityTracker
                  ctaId="bundle-specialist-benriner-review-1"
                  position="mid_article"
                  productSlug={specialistTool.reviewSlug}
                  merchant="internal"
                >
                <Link
                  href={`/reviews/${specialistTool.reviewSlug}`}
                  className="w-full bg-white border-2 border-orange-400 text-slate-900 hover:bg-orange-50 font-semibold py-4 px-6 rounded-lg transition-all duration-200 text-center block flex items-center justify-center gap-2"
                >
                  📊 Read Full Review
                  <ArrowRight className="w-5 h-5" />
                </Link>
                </CTAVisibilityTracker>
              </div>
            </div>
          </div>
          </ProductImpressionTracker>
        </div>
      </section>

      {/* Total Investment Summary */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Your Complete Professional Kitchen
          </h2>
          <div className="mb-6">
            <p className="text-4xl sm:text-5xl font-bold text-orange-300 mb-2">
              Total: ~$1,950
            </p>
            <p className="text-lg text-slate-200">
              Core Essentials ($157) + Lifetime Upgrades ($1,660) + Specialist Tool ($40)
            </p>
          </div>
          <p className="text-lg sm:text-xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Less than 3 months of eating out, but this complete kit will last 20+ years and transform
            how you cook at home.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">💰</div>
              <p className="font-semibold mb-2">Smart Investment</p>
              <p className="text-sm text-slate-300">Professional quality without the restaurant markup</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">⏱️</div>
              <p className="font-semibold mb-2">Built to Last</p>
              <p className="text-sm text-slate-300">Buy once, use for decades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold mb-2">Restaurant Proven</p>
              <p className="text-sm text-slate-300">23+ years of real-world testing</p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xl font-semibold mb-4">Start with Part 1 - Just $157</p>
            <CTAVisibilityTracker
              ctaId="bundle-final-victorinox-knife-cta"
              position="final_cta"
              productSlug={coreEssentials[0].reviewSlug}
              merchant="amazon"
            >
            <a
              href={coreEssentials[0].affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              Get the Victorinox Chef&apos;s Knife First ($45)
            </a>
            </CTAVisibilityTracker>
          </div>
        </div>
      </section>
    </div>
  )
}