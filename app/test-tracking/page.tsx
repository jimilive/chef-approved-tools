import AffiliateButton from '@/components/AffiliateButton'
import EmailSignupButton from '@/components/EmailSignupButton'
import InternalLink from '@/components/InternalLink'

export default function TestTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Affiliate Tracking Test Page</h1>
        <p className="text-lg text-slate-600 mb-8">
          Click the buttons below to test GTM tracking. Open DevTools Console to see tracking events.
        </p>

        {/* Affiliate Button Tests */}
        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Affiliate Button Tests</h2>
          <p className="text-sm text-slate-600 mb-6">
            These buttons track affiliate clicks to dataLayer. Check console for confirmation.
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Primary Variant - Amazon</p>
              <AffiliateButton
                href="https://amazon.com/dp/B00005UP2P"
                merchant="amazon"
                product="kitchenaid-ksm8990wh"
                position="above_fold"
                price={849}
                variant="primary"
              >
                Check Amazon Price - $849 →
              </AffiliateButton>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Secondary Variant - Williams Sonoma</p>
              <AffiliateButton
                href="https://williams-sonoma.com/example"
                merchant="williams_sonoma"
                product="le-creuset-dutch-oven"
                position="mid_article"
                price={380}
                variant="secondary"
              >
                Shop Williams Sonoma →
              </AffiliateButton>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Outline Variant - Sur La Table</p>
              <AffiliateButton
                href="https://surlatable.com/example"
                merchant="sur_la_table"
                product="victorinox-chefs-knife"
                position="final_cta"
                price={45}
                variant="outline"
              >
                Compare at Sur La Table →
              </AffiliateButton>
            </div>
          </div>
        </section>

        {/* Email Signup Tests */}
        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Email Signup Button Tests</h2>
          <p className="text-sm text-slate-600 mb-6">
            These buttons track email signups. Different locations = different tracking.
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Price Alert Signup</p>
              <EmailSignupButton
                href="#price-alert"
                location="price_alert"
                upgradeType="mixer_price_drop"
              >
                Get Price Drop Alert
              </EmailSignupButton>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Content Upgrade</p>
              <EmailSignupButton
                href="#content-upgrade"
                location="content_upgrade"
                upgradeType="dutch_oven_guide"
              >
                Download Free Guide
              </EmailSignupButton>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Newsletter Signup</p>
              <EmailSignupButton
                href="#newsletter"
                location="newsletter"
              >
                Subscribe to Newsletter
              </EmailSignupButton>
            </div>
          </div>
        </section>

        {/* Internal Link Tests */}
        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Internal Link Tests</h2>
          <p className="text-sm text-slate-600 mb-6">
            These links track internal navigation for cross-selling analysis.
          </p>

          <div className="space-y-3">
            <div>
              <InternalLink
                href="/reviews/kitchenaid-ksm8990wh"
                linkType="related_product"
                className="text-orange-600 hover:text-orange-700 font-semibold underline"
              >
                Related Product: KitchenAid Stand Mixer →
              </InternalLink>
            </div>

            <div>
              <InternalLink
                href="/guides/best-stand-mixers"
                linkType="guide"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Guide: Best Stand Mixers 2025 →
              </InternalLink>
            </div>

            <div>
              <InternalLink
                href="/categories/mixers"
                linkType="category"
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Browse All Mixers →
              </InternalLink>
            </div>
          </div>
        </section>

        {/* Testing Instructions */}
        <section className="bg-slate-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">How to Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>Open DevTools Console (F12 or Cmd+Option+I)</li>
            <li>Click any button above</li>
            <li>Watch for console log: <code className="bg-white px-2 py-1 rounded text-sm">Affiliate click tracked:</code></li>
            <li>Type <code className="bg-white px-2 py-1 rounded text-sm">window.dataLayer</code> in console to see all events</li>
            <li>Each click adds a new event object to the dataLayer array</li>
            <li>Visit <a href="/test-datalayer" className="text-orange-600 underline font-semibold">DataLayer Monitor</a> to see real-time updates</li>
          </ol>

          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> All tracking is working locally. When you deploy, configure GTM tags
              to send these events to Google Analytics 4 for conversion tracking and attribution.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
