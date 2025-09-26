import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Chef Knives 2024 - Professional Kitchen Manager Reviews',
  description: 'Discover the best chef knives tested in professional kitchens. From German steel to Japanese precision, find your perfect knife.',
}

export default function BestChefKnivesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Best Chef Knives 2024: Professional Kitchen Manager&apos;s Guide
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            After 15+ years managing professional kitchens and testing hundreds of knives,
            here are the chef knives that actually last in high-volume operations.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Chef Knife Recommendations</h2>

          <div className="space-y-8">
            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Wüsthof Classic 8-Inch Chef Knife</h3>
              <p className="text-slate-600 mb-4">
                The workhorse of professional kitchens. German steel that holds an edge through
                hundreds of prep hours. Used this daily for 2+ years at Mellow Mushroom.
              </p>
              <Link
                href="/reviews/wusthof-classic-ikon-15-piece"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Read full review →
              </Link>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Victorinox Fibrox Pro 8-Inch</h3>
              <p className="text-slate-600 mb-4">
                The best value knife for line cooks. Swiss precision at a fraction of the cost.
                Survived countless shifts at Purple Cafe.
              </p>
              <div className="text-slate-500">
                Full review coming soon
              </div>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What Makes a Great Chef Knife</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <ul className="space-y-3 text-slate-600">
              <li>• <strong>Steel quality:</strong> German vs Japanese steel characteristics</li>
              <li>• <strong>Edge retention:</strong> How long it stays sharp in daily use</li>
              <li>• <strong>Handle comfort:</strong> Ergonomics for long prep sessions</li>
              <li>• <strong>Balance:</strong> Weight distribution for control</li>
              <li>• <strong>Maintenance:</strong> How easy it is to sharpen and care for</li>
            </ul>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/guides"
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            ← Back to All Guides
          </Link>
        </nav>
      </div>
    </main>
  )
}