'use client'
import React from 'react'
import TestimonialsSection from '@/components/TestimonialsSection'
import TopPicksComparison from '@/components/TopPicksComparison'
import BudgetVsPremiumMagnet from '@/components/BudgetVsPremiumMagnet'
import { SimpleProductSchema } from '@/components/ProductSchema'
import FAQSchema, { kitchenToolsFAQs } from '@/components/FAQSchema'
import { ChefCredentialsSchema } from '@/components/ReviewSchema'
import { trackAffiliateClick } from '@/lib/analytics'

// Sample products with enhanced data
const sampleProducts = [
  {
    id: 'wusthof-classic-8',
    name: 'Wüsthof Classic 8-Inch Chef Knife',
    brand: 'Wüsthof',
    rating: 4.8,
    reviews: 127,
    affiliateUrl: 'https://amazon.com/dp/B00005MEII?tag=chefapproved-20',
    badge: 'Manager\'s Pick',
    tested: '2+ years daily use'
  },
  {
    id: 'all-clad-tri-ply',
    name: 'All-Clad D3 Tri-Ply Stainless Steel 10-Piece Set',
    brand: 'All-Clad',
    rating: 4.9,
    reviews: 89,
    affiliateUrl: 'https://amazon.com/dp/B004T6MSIS?tag=chefapproved-20',
    badge: 'Best Value',
    tested: '18 months tested'
  },
  {
    id: 'vitamix-5200',
    name: 'Vitamix 5200 Professional-Grade Blender',
    brand: 'Vitamix',
    rating: 4.7,
    reviews: 234,
    affiliateUrl: 'https://amazon.com/dp/B008H4SLV6?tag=chefapproved-20',
    badge: 'Restaurant Tested',
    tested: '5+ years proven'
  },
  {
    id: 'kitchenaid-ksm8990',
    name: 'KitchenAid KSM8990WH Commercial Series',
    brand: 'KitchenAid',
    rating: 4.9,
    reviews: 156,
    affiliateUrl: 'https://amazon.com/dp/B00XPRRHFW?tag=chefapproved-20',
    badge: 'NSF Certified',
    tested: 'Survived $80K/mo operations'
  },
  {
    id: 'lodge-cast-iron',
    name: 'Lodge 12-Inch Cast Iron Skillet',
    brand: 'Lodge',
    rating: 4.6,
    reviews: 412,
    affiliateUrl: 'https://amazon.com/dp/B00006JSUA?tag=chefapproved-20',
    badge: 'Budget Pick',
    tested: '10+ years reliable'
  },
  {
    id: 'victorinox-fibrox',
    name: 'Victorinox Fibrox Pro 8-Inch Chef Knife',
    brand: 'Victorinox',
    rating: 4.7,
    reviews: 203,
    affiliateUrl: 'https://amazon.com/dp/B008M5U1C2?tag=chefapproved-20',
    badge: 'Staff Favorite',
    tested: 'Line cook tested'
  }
]

// Enhanced Product Card Component with Conversion Optimization
function EnhancedProductCard({ product, category }: { product: any, category: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
      {product.badge && (
        <div className="absolute top-4 left-4 bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          {product.badge}
        </div>
      )}

      {/* Add urgency/scarcity */}
      <div className="absolute bottom-4 left-4 bg-red-100 text-red-800 px-2 py-1 rounded text-xs z-10">
        🔥 Popular Choice
      </div>

      <div className="aspect-w-16 aspect-h-12 bg-gray-100 p-8">
        <div className="flex items-center justify-center h-48">
          <div className="text-6xl opacity-50">
            {category === 'knives' ? '🔪' : category === 'cookware' ? '🍳' : '⚡'}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 text-slate-900 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && '☆'}
          </div>
          <span className="text-sm text-gray-600">({product.reviews} chef reviews)</span>
        </div>

        <p className="text-xs text-green-600 font-semibold mb-3">{product.tested}</p>


        {/* Enhanced CTA section */}
        <div className="space-y-2 mt-4">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAffiliateClick(product.name, category, 0, product.brand)}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-center block"
          >
            🛒 Check Latest Price on Amazon
          </a>

          {/* Add comparison hook */}
          <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            📊 See Why I Chose This Over 12 Others
          </button>
        </div>

        {/* Trust signals */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              ✓ <span>Free Prime Shipping</span>
            </span>
            <span className="flex items-center gap-1">
              ✓ <span>30-Day Returns</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* SEO Structured Data */}
      <FAQSchema faqs={kitchenToolsFAQs} />
      <ChefCredentialsSchema />
      {/* Hero Section with Real Credentials */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Trust Badge */}
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-block mb-6 sm:mb-8">
            <span className="text-orange-200 font-semibold text-sm sm:text-base">
              👨‍🍳 KITCHEN MANAGER TESTED & APPROVED
            </span>
          </div>
          
          {/* Main Headline with Real Experience */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            The Only Kitchen Tools I Trust After
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              Managing $80K+/Month Operations
            </span>
          </h1>
          
          {/* Credibility-focused Description */}
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Former Kitchen Manager at Mellow Mushroom with Seattle Central culinary training. 
            15+ years testing equipment in real restaurants from Athens to Seattle.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 max-w-md sm:max-w-none mx-auto">
            <a 
              href="/reviews" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-base sm:text-lg"
            >
              See My Top Picks →
            </a>
            <a 
              href="#credentials" 
              className="border-2 border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 text-base sm:text-lg"
            >
              Verify My Experience
            </a>
          </div>
          
          {/* Real, Specific Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 border-t border-slate-600">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">15+ Years</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wide font-medium">Professional Kitchens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">$80K+/mo</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wide font-medium">Operations Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">500+</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wide font-medium">Tools Tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section id="credentials" className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center text-slate-900">
            Why Professional Chefs Trust My Reviews
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-bold mb-2">Culinary Degree</h3>
              <p className="text-sm text-gray-600">Seattle Central College A.A.S. Culinary Arts</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="font-bold mb-2">Kitchen Manager</h3>
              <p className="text-sm text-gray-600">Mellow Mushroom, 12 employees, $80K+/month</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="font-bold mb-2">Line Cook Expert</h3>
              <p className="text-sm text-gray-600">Purple Cafe, Feierabend, 15+ years experience</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="font-bold mb-2">E-commerce Pro</h3>
              <p className="text-sm text-gray-600">$2M brand launch at YDesign Group</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Picks Comparison - Above the fold */}
      <TopPicksComparison />

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-slate-900">
              Equipment That Survived Scott&apos;s Busiest Services
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Each tool tested minimum 6 months in my professional kitchens. 
              These are the ones I&apos;d buy with my own money.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sampleProducts.map((product, index) => {
              const category = index === 0 || index === 5 ? 'knives' : index === 1 || index === 4 ? 'cookware' : 'appliances'
              return (
                <div key={product.id}>
                  {/* Add structured data for each product */}
                  <SimpleProductSchema
                    name={product.name}
                    brand={product.brand}
                    rating={product.rating}
                    reviewCount={product.reviews}
                    category={category}
                    affiliateUrl={product.affiliateUrl}
                  />
                  <EnhancedProductCard
                    product={product}
                    category={category}
                  />
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/reviews"
              className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              View All Professional Reviews →
            </a>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
            My Professional Kitchen Journey
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-sm font-bold text-orange-700">1992-1994</span>
              </div>
              <div className="flex-grow border-l-2 border-orange-200 pl-6 pb-8">
                <h3 className="font-bold text-lg mb-1">Kitchen Manager - Mellow Mushroom</h3>
                <p className="text-gray-600">Athens, GA • Managed $80K+/month operations, 12 employees, full P&L</p>
                <p className="text-sm text-gray-500 mt-2">Created food waste tracking system, trained all kitchen staff</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-sm font-bold text-orange-700">2007-2012</span>
              </div>
              <div className="flex-grow border-l-2 border-orange-200 pl-6 pb-8">
                <h3 className="font-bold text-lg mb-1">Pizzaiolo - Purple Cafe & Wine Bar</h3>
                <p className="text-gray-600">Seattle, WA • Developed recipes, trained staff, 200+ pizzas nightly</p>
                <p className="text-sm text-gray-500 mt-2">Created dough recipe, developed daily specials</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-sm font-bold text-orange-700">2006-2010</span>
              </div>
              <div className="flex-grow border-l-2 border-orange-200 pl-6 pb-8">
                <h3 className="font-bold text-lg mb-1">Shift Lead - Feierabend</h3>
                <p className="text-gray-600">Seattle, WA • Led line operations, 60-seat German pub</p>
                <p className="text-sm text-gray-500 mt-2">Expedite, sauté, grill, pantry stations</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-sm font-bold text-orange-700">2015-2018</span>
              </div>
              <div className="flex-grow border-l-2 border-orange-200 pl-6 pb-8">
                <h3 className="font-bold text-lg mb-1">Content Lead - YDesign Group</h3>
                <p className="text-gray-600">Sacramento, CA • Launched $2M e-commerce brand, managed 7-person team</p>
                <p className="text-sm text-gray-500 mt-2">Product content strategy, vendor relationships, QA processes</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-sm font-bold text-orange-700">2020-Now</span>
              </div>
              <div className="flex-grow border-l-2 border-orange-200 pl-6">
                <h3 className="font-bold text-lg mb-1">Equipment Testing & Reviews</h3>
                <p className="text-gray-600">Combining decades of experience to help home chefs buy smart</p>
                <p className="text-sm text-gray-500 mt-2">500+ products tested, 47 recommended</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories with Context */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-slate-900">
              Equipment Categories I&apos;ve Mastered
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From high-volume pizza stations to German pub kitchens, I&apos;ve tested it all
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <a href="/knives" className="group bg-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-3xl">🔪</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Professional Knives</h3>
              <p className="text-slate-600 text-sm mb-3">German vs Japanese, what actually lasts</p>
              <p className="text-xs text-orange-700 font-semibold">23 knives reviewed</p>
            </a>
            
            <a href="/cookware" className="group bg-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-3xl">🍳</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Commercial Cookware</h3>
              <p className="text-slate-600 text-sm mb-3">Restaurant-grade pans for home use</p>
              <p className="text-xs text-orange-700 font-semibold">18 sets tested</p>
            </a>
            
            <a href="/appliances" className="group bg-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Power Equipment</h3>
              <p className="text-slate-600 text-sm mb-3">Mixers, blenders that survive abuse</p>
              <p className="text-xs text-orange-700 font-semibold">31 appliances reviewed</p>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Lead Magnet - Budget vs Premium Guide */}
      <section id="budget-vs-premium-signup" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BudgetVsPremiumMagnet variant="inline" />
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Kitchen Manager (Mellow Mushroom)
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> 15+ Years Pro Kitchens
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Seattle Central Culinary
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> U of Montana Business
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> $2M E-commerce Launch
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}