import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Kitchen Appliances 2024 - Commercial-Grade Equipment Guide',
  description: 'Professional kitchen appliances that survive restaurant use. Mixers, blenders, and processors tested in high-volume operations.',
  alternates: {
    canonical: '/guides/kitchen-appliances',
  },
}

export default function KitchenAppliancesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Best Kitchen Appliances 2024: Commercial-Grade Equipment
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Professional-grade appliances that can handle restaurant workloads
            and deliver consistent results for serious home cooks.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Essential Kitchen Appliances</h2>

          <div className="space-y-8">
            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. KitchenAid Commercial Series Mixer</h3>
              <p className="text-slate-600 mb-4">
                NSF-certified commercial mixer that survived $80K/month operations.
                Built to last with a 5-year warranty and incredible power.
              </p>
              <div className="text-slate-500">
                Full review coming soon
              </div>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Vitamix 5200 Professional Blender</h3>
              <p className="text-slate-600 mb-4">
                The blender that changed everything. 5+ years of daily smoothies,
                soups, and sauces. Still runs like new.
              </p>
              <Link
                href="/reviews/vitamix-5200"
                className="text-orange-600 hover:text-orange-800 font-semibold"
              >
                Read full review →
              </Link>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Robot Coupe R2 Dice Food Processor</h3>
              <p className="text-slate-600 mb-4">
                French-made commercial food processor. Precision cuts and
                reliable performance in the most demanding kitchens.
              </p>
              <Link
                href="/reviews/robot-coupe-r2-dice"
                className="text-orange-600 hover:text-orange-800 font-semibold"
              >
                Read full review →
              </Link>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Choosing Professional Appliances</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <ul className="space-y-3 text-slate-600">
              <li>• <strong>Motor power:</strong> Look for at least 2+ HP for blenders and mixers</li>
              <li>• <strong>Duty cycle:</strong> Commercial appliances run continuously without overheating</li>
              <li>• <strong>Warranty:</strong> Professional equipment should have 3-5 year warranties</li>
              <li>• <strong>NSF certification:</strong> Meets commercial food service standards</li>
              <li>• <strong>Serviceability:</strong> Parts availability and repair network</li>
            </ul>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/guides"
            className="text-orange-600 hover:text-orange-800 font-semibold"
          >
            ← Back to All Guides
          </Link>
        </nav>
      </div>
    </main>
  )
}