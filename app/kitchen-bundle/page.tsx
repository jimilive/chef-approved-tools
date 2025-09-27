import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'The Professional&apos;s Home Kitchen: 7 Tools I Actually Use Daily | Chef Approved Tools',
  description: 'Get the exact 7 tools a 15+ year restaurant professional uses at home. Skip the mistakes, get the gear that actually works. Free guide from Scott Bradley.',
  keywords: 'professional kitchen tools, chef recommended tools, home kitchen essentials, restaurant quality tools for home'
}

export default function KitchenBundlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-3 inline-block mb-8">
            <span className="text-orange-200 font-semibold">
              👨‍🍳 15+ YEARS RESTAURANT EXPERIENCE
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The Professional&apos;s Home Kitchen:
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              7 Tools I Actually Use Daily
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            After testing hundreds of tools in restaurants from Athens to Seattle,
            these are the ONLY ones that earned a spot in my home kitchen.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🔪</div>
              <h3 className="font-bold mb-2">Restaurant Tested</h3>
              <p className="text-sm text-white/80">Used daily in $80K/month operations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Budget Friendly</h3>
              <p className="text-sm text-white/80">Professional quality without the price</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-bold mb-2">Actually Used</h3>
              <p className="text-sm text-white/80">Not sponsored - my real daily tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Side - Tool Preview */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-slate-900">
                What&apos;s Inside Your Free Guide
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Victorinox Fibrox Professional Knives</h3>
                    <p className="text-gray-600">The 10&quot;, 8&quot;, and boning knives that survived 200+ services without fail</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Forschner Offset Bread Knife</h3>
                    <p className="text-gray-600">The secret weapon most home cooks don&apos;t know about</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">OXO Professional Tools</h3>
                    <p className="text-gray-600">The peeler and bench scraper that make prep work effortless</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Beriner Professional Mandoline</h3>
                    <p className="text-gray-600">Restaurant-quality consistency for your home kitchen</p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 mt-8">
                  <h4 className="font-bold mb-3">Plus You'll Get:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Exact models and where to buy them</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Why each tool earned its spot in my kitchen</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Professional tips for using each tool</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Care and maintenance secrets</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">
                    Get Your Free Professional Kitchen Guide
                  </h3>
                  <p className="text-gray-600">
                    Download immediately - no spam, just the tools that actually work.
                  </p>
                </div>

                {/* Email Octopus Form */}
                <div id="email-form">
                  <Script
                    src="https://eomail5.com/form/627419fc-9b5d-11f0-bb1e-4f3d8509b619.js"
                    data-form="627419fc-9b5d-11f0-bb1e-4f3d8509b619"
                    strategy="afterInteractive"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    🔒 Your email is safe. No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-8 text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                    <span className="text-sm font-medium text-green-800">Trusted by 1,000+ home chefs</span>
                  </div>
                  <p className="text-xs text-green-700">
                    &quot;Finally, honest recommendations from someone who actually knows professional kitchens!&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">
            Why Trust My Recommendations?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-bold mb-2">Culinary Training</h3>
              <p className="text-sm text-gray-600">Seattle Central College A.A.S. Culinary Arts</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="font-bold mb-2">Restaurant Manager</h3>
              <p className="text-sm text-gray-600">Mellow Mushroom - $80K+/month operations</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="font-bold mb-2">Line Cook Expert</h3>
              <p className="text-sm text-gray-600">Purple Cafe, Feierabend - 15+ years experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}