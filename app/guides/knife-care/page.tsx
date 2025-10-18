import Link from 'next/link'
import { Metadata } from 'next'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

export const metadata: Metadata = {
  title: 'Knife Care Guide: Maintain Pro Kitchen Knives',
  description: 'Learn proper knife care techniques from a professional kitchen manager. Sharpening, storage, and maintenance tips.',
  alternates: {
    canonical: '/guides/knife-care',
  },
}

export default function KnifeCareGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Professional Knife Care Guide
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            23+ years of professional kitchen experience condensed into
            the essential knife care techniques that actually matter.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Daily Knife Maintenance</h2>

          <div className="space-y-8">
            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Proper Cleaning</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Hand wash immediately after use with warm soapy water</li>
                <li>• Never put knives in the dishwasher - heat damages handles and dulls blades</li>
                <li>• Dry immediately with a clean towel to prevent rust</li>
                <li>• Clean the entire blade, not just the cutting edge</li>
              </ul>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Safe Storage</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Magnetic knife strips are best for professional kitchens</li>
                <li>• Knife blocks can harbor bacteria - keep them clean</li>
                <li>• Edge guards for drawer storage protect blades and fingers</li>
                <li>• Never toss knives loose in drawers</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Sharpening Your Knives</h2>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Honing vs Sharpening</h4>
                <p>Honing (with a steel) realigns the edge between sharpenings.
                True sharpening removes metal to create a new edge.</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">When to Sharpen</h4>
                <p>Home cooks: every 2-3 months with regular use.
                Professional kitchens: weekly or when the knife struggles through paper.</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Sharpening Options</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Whetstones: Best results, requires skill</li>
                  <li>Professional service: $3-5 per knife, convenient</li>
                  <li>Pull-through sharpeners: Quick but removes more metal</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What NOT to Do</h2>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <ul className="space-y-2 text-red-700">
              <li>• Never cut on glass, stone, or metal surfaces</li>
              <li>• Don&apos;t use knives as screwdrivers or can openers</li>
              <li>• Avoid cutting frozen foods - it chips the blade</li>
              <li>• Don&apos;t leave knives soaking in water</li>
              <li>• Never catch a falling knife - let it drop</li>
            </ul>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <CTAVisibilityTracker
            ctaId="guide-knife-care-back-to-guides"
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