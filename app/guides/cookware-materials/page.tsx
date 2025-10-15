import Link from 'next/link'
import { Metadata } from 'next'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

export const metadata: Metadata = {
  title: 'Cookware Materials Guide - Professional Kitchen Manager Insights',
  description: 'Complete guide to cookware materials from 23+ years of restaurant experience. Stainless steel, cast iron, carbon steel, and more.',
  alternates: {
    canonical: '/guides/cookware-materials',
  },
}

export default function CookwareMaterialsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Cookware Materials Guide: What Really Works
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            The truth about cookware materials from someone who&apos;s used them all
            in high-volume commercial kitchens for 23+ years.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Material Breakdown</h2>

          <div className="space-y-8">
            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Stainless Steel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Durable and long-lasting</li>
                    <li>• Non-reactive to acids</li>
                    <li>• Dishwasher safe</li>
                    <li>• Works on all cooktops</li>
                    <li>• Great for searing and browning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Can have hot spots without tri-ply</li>
                    <li>• Food can stick if not preheated properly</li>
                    <li>• More expensive for quality pieces</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-600">
                <strong>Best for:</strong> Searing, sauces, browning, everyday cooking.
                The workhorse of professional kitchens.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cast Iron</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Excellent heat retention</li>
                    <li>• Naturally non-stick when seasoned</li>
                    <li>• Oven to stovetop versatility</li>
                    <li>• Improves with age</li>
                    <li>• Inexpensive</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Requires seasoning maintenance</li>
                    <li>• Heavy</li>
                    <li>• Can rust if not dried properly</li>
                    <li>• Reacts with acidic foods</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-600">
                <strong>Best for:</strong> Searing, frying, baking, high-heat cooking.
                Perfect for building flavor layers.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Enameled Cast Iron</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• No seasoning required</li>
                    <li>• Great for acidic foods</li>
                    <li>• Beautiful presentation</li>
                    <li>• Even heat distribution</li>
                    <li>• Easy to clean</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Expensive</li>
                    <li>• Enamel can chip</li>
                    <li>• Heavy</li>
                    <li>• Not ideal for high-heat searing</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-600">
                <strong>Best for:</strong> Braising, stewing, baking bread, slow cooking.
                The Dutch oven champion.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Carbon Steel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Lighter than cast iron</li>
                    <li>• Heats up quickly</li>
                    <li>• Develops natural non-stick surface</li>
                    <li>• Great heat retention</li>
                    <li>• Professional choice for woks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Requires seasoning like cast iron</li>
                    <li>• Can rust without proper care</li>
                    <li>• Limited availability</li>
                    <li>• Learning curve for maintenance</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-600">
                <strong>Best for:</strong> High-heat stir-frying, searing, professional techniques.
                The secret weapon of restaurant chefs.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Material Recommendations by Cooking Style</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Beginner Cook</h4>
                <p>Start with stainless steel tri-ply and one cast iron skillet. Easy maintenance, versatile.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Serious Home Chef</h4>
                <p>Add enameled cast iron Dutch oven, carbon steel wok, and specialized pieces as needed.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Professional/Commercial</h4>
                <p>Heavy-duty stainless steel, commercial-grade carbon steel, and cast iron that can handle abuse.</p>
              </div>
            </div>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <CTAVisibilityTracker
            ctaId="guide-cookware-materials-back-to-guides"
            position="final_cta"
            productSlug="guides"
            merchant="internal"
          >
            <Link
              href="/guides"
              className="text-orange-600 hover:text-orange-800 font-semibold"
            >
              ← Back to All Guides
            </Link>
          </CTAVisibilityTracker>
        </nav>
      </div>
    </main>
  )
}