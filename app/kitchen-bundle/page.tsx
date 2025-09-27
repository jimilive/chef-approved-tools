import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Professional Kitchen Equipment Bundle: 7 Restaurant-Tested Tools for Home | Chef Approved Tools',
  description: 'Get the exact 7 pieces of equipment a 18+ year restaurant professional uses at home. Tested in commercial kitchens, perfect for serious home cooks. Free guide from Scott Bradley.',
  keywords: 'professional kitchen equipment, commercial grade home tools, restaurant tested kitchen gear, chef approved equipment bundle'
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
            Professional Kitchen Equipment Bundle:
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              7 Restaurant-Tested Essentials
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            After 18+ years testing equipment in commercial kitchens, these 7 pieces
            earned their place in my home kitchen through proven performance and reliability.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🔪</div>
              <h3 className="font-bold mb-2">Commercial Proven</h3>
              <p className="text-sm text-white/80">18+ years of restaurant testing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Value Focused</h3>
              <p className="text-sm text-white/80">Professional performance, smart pricing</p>
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
                The 7 Essential Pieces Inside Your Guide
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WÜSTHOF Classic IKON Knife Set</h3>
                    <p className="text-gray-600">German engineering that equipped our entire professional kitchen</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Lodge Cast Iron Skillet Bundle</h3>
                    <p className="text-gray-600">The 3-piece set that will last forever with proper care</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Le Creuset 7.25-Qt Dutch Oven</h3>
                    <p className="text-gray-600">The generational investment that transforms your cooking</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">KitchenAid Commercial Mixer</h3>
                    <p className="text-gray-600">NSF-certified power that survived 18 months of restaurant use</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Vitamix 5200 Blender</h3>
                    <p className="text-gray-600">5+ years powering our commercial smoothie program</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Robot Coupe R2 Dice Processor</h3>
                    <p className="text-gray-600">Commercial-grade food prep that revolutionized our efficiency</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold">7</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">John Boos Platinum Cutting Board</h3>
                    <p className="text-gray-600">The 24x18 workhorse I&apos;ll pass down to my children</p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 mt-8">
                  <h4 className="font-bold mb-3">Plus You&apos;ll Get:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Real-world testing results from 18+ years in kitchens</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Why each piece earned its spot through performance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Professional techniques and maintenance secrets</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Budget vs premium recommendations for each category</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Exact purchase links and best pricing sources</span>
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
                    Get Your Free Professional Equipment Bundle Guide
                  </h3>
                  <p className="text-gray-600">
                    18+ years of restaurant testing distilled into one comprehensive guide.
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
                    <span className="text-sm font-medium text-green-800">Trusted by 2,500+ serious home cooks</span>
                  </div>
                  <p className="text-xs text-green-700">
                    &quot;Scott&apos;s restaurant experience shows - these aren&apos;t just reviews, they&apos;re equipment decisions based on real professional use.&quot;
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
              <h3 className="font-bold mb-2">Kitchen Manager</h3>
              <p className="text-sm text-gray-600">Purple Cafe, Mellow Mushroom - High-volume operations</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="font-bold mb-2">Equipment Tester</h3>
              <p className="text-gray-600">18+ years testing gear in demanding commercial environments</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}