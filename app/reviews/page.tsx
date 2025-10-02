import Link from 'next/link'
import { Star, TrendingUp, Award } from 'lucide-react'

export const metadata = {
  title: 'Professional Equipment Reviews by Restaurant Manager | Chef Approved Tools',
  description: 'Honest reviews of kitchen equipment tested in real restaurant operations. Professional insights from 21+ years of restaurant experience.',
  keywords: ['kitchen equipment reviews', 'professional chef reviews', 'restaurant equipment', 'commercial kitchen tools']
}

const myDailyTools = [
  {
    slug: 'victorinox-fibrox-10-inch-chefs-knife',
    title: "Victorinox Fibrox Pro 10\" Chef's Knife",
    category: 'Knives',
    price: 50,
    image: '/logo.png',
    excerpt: "The longer blade for larger cuts and bigger hands - 40 years of professional use.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'victorinox-fibrox-8-inch-chefs-knife',
    title: "Victorinox Fibrox Pro 8\" Chef's Knife",
    category: 'Knives',
    price: 45,
    image: '/logo.png',
    excerpt: "Perfect all-purpose chef's knife - the workhorse of every professional kitchen.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'victorinox-4-inch-paring-knife',
    title: "Victorinox 4\" Paring Knife",
    category: 'Knives',
    price: 12,
    image: '/logo.png',
    excerpt: "Precision paring knife for detailed work - the exact knife I've used for decades.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'victorinox-granton-edge-boning-knife',
    title: "Victorinox 6\" Granton Edge Boning Knife",
    category: 'Knives',
    price: 35,
    image: '/logo.png',
    excerpt: "Professional boning knife for breaking down proteins with precision.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'victorinox-offset-bread-knife',
    title: "Victorinox 9\" Offset Bread Knife",
    category: 'Knives',
    price: 50,
    image: '/logo.png',
    excerpt: "Offset serrated knife for bread and tomatoes - superior knuckle clearance.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'oxo-good-grips-swivel-peeler',
    title: 'OXO Good Grips Swivel Peeler',
    category: 'Tools',
    price: 10,
    image: '/logo.png',
    excerpt: "The peeler that actually lasts - sharp blade, comfortable grip, dishwasher-safe.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'oxo-good-grips-bench-scraper',
    title: 'OXO Good Grips Bench Scraper',
    category: 'Tools',
    price: 13,
    image: '/logo.png',
    excerpt: "Most underrated kitchen tool - transfers ingredients, portions dough, cleans boards.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'winco-heavy-duty-tongs',
    title: 'Winco Heavy Duty Tongs',
    category: 'Tools',
    price: 8,
    image: '/logo.png',
    excerpt: "Restaurant-grade tongs at budget price - the exact ones used in professional kitchens.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'benriner-large-mandoline',
    title: 'Benriner Large Mandoline',
    category: 'Tools',
    price: 40,
    image: '/logo.png',
    excerpt: "Professional consistency for perfect slices - every gratin cooked evenly.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'gold-textiles-bar-mops',
    title: 'Gold Textiles Restaurant Bar Mops',
    category: 'Tools',
    price: 25,
    image: '/logo.png',
    excerpt: "The towels restaurants actually use - absorbent, durable, dishwasher-safe.",
    badge: 'Daily Use',
    testDuration: '40 years'
  },
  {
    slug: 'epicurean-kitchen-cutting-board',
    title: 'Epicurean Kitchen Cutting Board',
    category: 'Tools',
    price: 35,
    image: '/logo.png',
    excerpt: "Dishwasher-safe board better than wood - truly sanitary and won't warp.",
    badge: 'Daily Use',
    testDuration: '40 years'
  }
]

const featuredReviews = [
  {
    slug: 'wusthof-classic-ikon-15-piece',
    title: 'Wüsthof Classic Ikon 16-Piece Set',
    category: 'Knives',
    price: 1749,
    image: '/logo.png',
    excerpt: 'Professional German knife set that maintains its edge through daily restaurant service.',
    badge: 'Staff Favorite',
    testDuration: '2+ years'
  },
  {
    slug: 'robot-coupe-r2-dice',
    title: 'Robot Coupe R2 Dice Food Processor',
    category: 'Appliances',
    price: 1299,
    image: '/logo.png',
    excerpt: 'Professional food processor that handles high-volume prep work with precision.',
    badge: 'Pro Choice',
    testDuration: '2+ years'
  },
  {
    slug: 'kitchenaid-ksm8990wh',
    title: 'KitchenAid Commercial Series KSM8990WH',
    category: 'Appliances',
    price: 949,
    image: '/logo.png',
    excerpt: 'The mixer that survived 18 months of professional kitchen testing at Purple Cafe. NSF certified commercial-grade performance.',
    badge: 'Restaurant Tested',
    testDuration: '18 months'
  },
  {
    slug: 'vitamix-5200',
    title: 'Vitamix 5200 Professional-Grade Blender',
    category: 'Appliances',
    price: 449,
    image: '/logo.png',
    excerpt: 'Commercial-grade blender that survived 5+ years of restaurant service without failure.',
    badge: 'Workhorse',
    testDuration: '5+ years'
  },
  {
    slug: 'le-creuset-signature-7-25-qt-dutch-oven',
    title: 'Le Creuset Signature 7.25 Qt Dutch Oven',
    category: 'Cookware',
    price: 379,
    image: '/logo.png',
    excerpt: 'Premium enameled cast iron that delivers consistent braising and roasting results.',
    badge: 'Premium Pick',
    testDuration: '3+ years'
  },
  {
    slug: 'john-boos-platinum-commercial-cutting-board',
    title: 'John Boos Platinum Commercial Cutting Board',
    category: 'Tools',
    price: 159,
    image: '/logo.png',
    excerpt: 'NSF-certified cutting board that withstands daily commercial kitchen abuse.',
    badge: 'Commercial Grade',
    testDuration: '3+ years'
  },
  {
    slug: 'lodge-seasoned-cast-iron-3-skillet-bundle',
    title: 'Lodge Cast Iron 3-Skillet Bundle',
    category: 'Cookware',
    price: 89,
    image: '/logo.png',
    excerpt: 'Indestructible cast iron set that equipped our entire line. American-made durability.',
    badge: 'Best Value',
    testDuration: '5+ years'
  }
]

const categories = [
  { name: 'Knives', icon: '🔪', href: '/knives' },
  { name: 'Cookware', href: '/cookware', icon: '🍳' },
  { name: 'Appliances', href: '/appliances', icon: '⚡' },
  { name: 'Tools & Gadgets', href: '/guides', icon: '🥄' },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Equipment Reviews by a Real Kitchen Manager
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Honest reviews from 40 years of restaurant experience. Every tool tested through real professional kitchen operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">18</div>
              <div className="text-sm text-slate-300">Products Reviewed</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">40</div>
              <div className="text-sm text-slate-300">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">$80K+</div>
              <div className="text-sm text-slate-300">Monthly Operations</div>
            </div>
          </div>
        </div>
      </section>

      {/* My Daily Toolkit - 11 Tools */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
              <span className="text-orange-800 font-semibold text-sm">THE 11 TOOLS I USE MOST</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              My Daily Toolkit After 40 Years of Professional Cooking
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              These are the exact 11 tools I use every day in my home kitchen. No fluff, no fancy equipment.
              Just proven tools that work. Total investment: about $320.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {myDailyTools.map((review) => (
              <article
                key={review.slug}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    {review.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-slate-700 text-white px-2 py-1 rounded text-xs font-bold z-10">
                    {review.testDuration}
                  </div>

                  {/* Image placeholder */}
                  <div className="aspect-w-16 aspect-h-12 bg-gray-100 p-8">
                    <div className="flex items-center justify-center h-40">
                      <div className="text-5xl opacity-50">
                        {review.category === 'Knives' ? '🔪' : '🥄'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {review.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-slate-900 line-clamp-2">
                    {review.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {review.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                      ${review.price}
                    </span>
                    <Link
                      href={`/reviews/${review.slug}`}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Read Review
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-700 mb-4 text-lg font-semibold">
              Want the complete list with links and care instructions?
            </p>
            <Link
              href="/#lead-magnet"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get My Free Kitchen Toolkit Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-orange-300 rounded-xl p-6 text-center transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-orange-700">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600">Reviews available</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Featured Professional Reviews
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Equipment that survived the chaos of professional kitchen operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <article
                key={review.slug}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    {review.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                    {review.testDuration}
                  </div>

                  {/* Image placeholder */}
                  <div className="aspect-w-16 aspect-h-12 bg-gray-100 p-8">
                    <div className="flex items-center justify-center h-48">
                      <div className="text-6xl opacity-50">
                        {review.category === 'Knives' ? '🔪' :
                         review.category === 'Cookware' ? '🍳' : '⚡'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {review.category}
                    </span>
                    {/* Rating removed - professional evaluation only */}
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-slate-900 line-clamp-2">
                    {review.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {review.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                      ${review.price}
                    </span>
                    <Link
                      href={`/reviews/${review.slug}`}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Read Review
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Looking for something specific? Browse by category.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/knives"
                className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                View Knives →
              </Link>
              <Link
                href="/cookware"
                className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                View Cookware →
              </Link>
              <Link
                href="/appliances"
                className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                View Appliances →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            How I Test Equipment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Real Kitchen Testing</h3>
              <p className="text-sm text-slate-600">
                Minimum 6 months in actual restaurant operations, not lab conditions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Professional Standards</h3>
              <p className="text-sm text-slate-600">
                Tested by certified culinary professionals with extensive restaurant experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Honest Reviews</h3>
              <p className="text-sm text-slate-600">
                We tell you the real pros and cons, not just marketing highlights
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}