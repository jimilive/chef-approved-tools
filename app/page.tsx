import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kitchen Tools That Actually Work | 24 Years Restaurant Tested',
  description: 'Real equipment reviews from a chef who\'s used everything—from Purple Café line cook to Mellow Mushroom Kitchen Manager. No BS, just tools that work.',
  keywords: [
    'chef approved kitchen tools',
    'professional kitchen equipment',
    'restaurant quality tools',
    'Scott Bradley chef reviews',
    'kitchen manager recommendations',
    'tested chef knives',
    'commercial cookware reviews',
    'professional grade appliances'
  ],
  openGraph: {
    title: 'Chef Approved Tools | Professional Reviews & Recommendations',
    description: '24 years of professional kitchen experience. Honest reviews of chef knives, cookware, and appliances tested in real restaurants. No affiliate pressure.',
    url: 'https://www.chefapprovedtools.com',
    siteName: 'Chef Approved Tools',
    images: [
      {
        url: 'https://www.chefapprovedtools.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Scott Bradley - Professional Chef with 24 years experience reviewing kitchen equipment'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Approved Kitchen Tools | 24 Years Restaurant Experience',
    description: 'Professional kitchen equipment reviews by Scott Bradley. Real tools tested in real kitchens. Honest recommendations you can trust.',
    images: ['https://www.chefapprovedtools.com/twitter-image.jpg'],
    creator: '@chefapprovedtools',
  },
  alternates: {
    canonical: 'https://www.chefapprovedtools.com'
  }
}

// Dynamic import below-fold sections for better performance (server-side compatible)
const EmailCaptureSection = dynamic(() => import('@/components/home/EmailCaptureSection'))
const WhyListenSection = dynamic(() => import('@/components/home/BelowFoldSections').then(mod => ({ default: mod.WhyListenSection })))
const ShopByCategorySection = dynamic(() => import('@/components/home/BelowFoldSections').then(mod => ({ default: mod.ShopByCategorySection })))
const SecondaryCTASection = dynamic(() => import('@/components/home/BelowFoldSections').then(mod => ({ default: mod.SecondaryCTASection })))
const TopProfessionalPicksSection = dynamic(() => import('@/components/home/BelowFoldSections').then(mod => ({ default: mod.TopProfessionalPicksSection })))
const FinalCTASection = dynamic(() => import('@/components/home/BelowFoldSections').then(mod => ({ default: mod.FinalCTASection })))
const TrustBarSection = dynamic(() => import('@/components/home/BelowFoldSections').then(mod => ({ default: mod.TrustBarSection })))

// Simple loading fallback
const SectionFallback = () => <div className="py-16" />

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Inline Critical CSS for LCP optimization */}
      <style dangerouslySetInnerHTML={{__html: `
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .hero-heading {
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: 700;
          line-height: 1.2;
        }
      `}} />

      {/* HERO SECTION - Dual Impact */}
      <section className="hero-section relative bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white">
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 items-center max-w-7xl mx-auto px-32">
            {/* Left: Message */}
            <div className="space-y-6 -mr-12">
              <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Rigorously Tested,
                <br />
                Professionally Vetted,
                <br />
                <span className="text-orange-400">Chef Approved</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                24 years in professional kitchens—from Mellow Mushroom to Purple Café to your home kitchen.
                Honest reviews. No affiliate pressure. Just the tools that actually work.
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
            <div className="relative flex items-center py-12 justify-end mr-5">
              <div className="relative rounded-2xl">
                <Image
                  src="/images/scott-chef-coat-cropped.jpg"
                  alt="Scott Bradley - Professional Chef with 24 Years Experience"
                  width={300}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 300px"
                  quality={75}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>
              <div className="absolute bottom-4 -right-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl shadow-xl">
                <p className="font-bold text-lg">24 Years</p>
                <p className="text-sm font-bold">Professional Kitchens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS IN ACTION - The Money Section - 3 COLUMN LAYOUT */}
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

          {/* Grid of Beautiful Food Shots - 3 COLUMN LAYOUT */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
            {/* Steak Sear */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cast-iron-steak-sear.jpg"
                  alt="Perfect steak sear in cast iron"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  priority
                  fetchPriority="high"
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
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the Lodge cast iron skillet →
                </Link>
              </div>
            </div>

            {/* Bacon Burger */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cast-iron-bacon-burger.jpg"
                  alt="Bacon cheeseburger cooked in cast iron"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  priority
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
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the Lodge cast iron skillet →
                </Link>
              </div>
            </div>

            {/* Heirloom Tomatoes */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/epicurean-heirloom-tomatoes.jpg"
                  alt="Heirloom tomatoes sliced on Epicurean cutting board"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  priority
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
                  href="/reviews/epicurean-kitchen-cutting-board"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the board →
                </Link>
              </div>
            </div>

            {/* Pot Roast */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/le-creuset-pot-roast-plated.jpg"
                  alt="Pot roast dinner plated"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
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
                  href="/reviews/instant-pot-duo-plus-6qt"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the Instant Pot →
                </Link>
              </div>
            </div>

            {/* Perfect Eggs */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cuisinart-eggs-cooking.jpg"
                  alt="Perfect eggs cooking"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Eggs That Don&apos;t Stick
                </h3>
                <p className="text-slate-600 mb-4">
                  The secret to restaurant breakfast? The right skillet, properly heated.
                </p>
                <Link
                  href="/reviews/cuisinart-8-inch-nonstick-pan"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the skillet →
                </Link>
              </div>
            </div>

            {/* BBQ Ribs */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/nordic-ware-ribs.jpg"
                  alt="BBQ ribs on sheet pan"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Fall-Off-The-Bone Ribs
                </h3>
                <p className="text-slate-600 mb-4">
                  Perfect ribs every time. The right equipment makes all the difference.
                </p>
                <Link
                  href="/reviews/nordic-ware-half-sheet-pan"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the pan →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAZY LOADED BELOW-FOLD SECTIONS */}
      <Suspense fallback={<SectionFallback />}>
        <EmailCaptureSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyListenSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ShopByCategorySection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <SecondaryCTASection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TopProfessionalPicksSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FinalCTASection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TrustBarSection />
      </Suspense>
    </main>
  )
}
