import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

export const metadata: Metadata = {
  title: 'Pro Cooking Techniques | Restaurant Methods',
  description: 'Professional cooking techniques from 24 years restaurant experience. Master methods that separate restaurant-quality from home cooking. Chef secrets revealed.',
  keywords: ['professional cooking techniques', 'restaurant cooking methods', 'chef techniques', 'kitchen manager tips', 'restaurant quality cooking', 'professional chef blog'],
  alternates: {
    canonical: '/blog',
  },
}

const blogPosts = [
  {
    slug: 'making-stock-professional-chef-method',
    title: 'Making Stock: Professional Chef Method – How to Build Flavor',
    excerpt: 'Professional chef Scott Bradley explains the real restaurant method for making stock. Build deep flavor with bones, vegetables, and proper simmering technique.',
    publishDate: '2025-10-22',
    readTime: '10 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'kitchen-starter-kit-first-5-tools',
    title: 'Kitchen Starter Kit: First 5 Tools to Buy',
    excerpt: 'Chef Scott Bradley reveals the five essential kitchen tools every home cook needs first. No fluff, no gimmicks—just the gear professionals actually use daily.',
    publishDate: '2025-10-22',
    readTime: '9 min read',
    category: 'Buying Guides',
    featured: false
  },
  {
    slug: 'best-scrambled-eggs',
    title: 'Perfect Scrambled Eggs: No Bowl, No Whisk Method',
    excerpt: 'Revolutionary scrambled egg technique from 45 years of cooking. No bowl, no whisk, no milk. Just eggs, butter, and a fork—directly in the pan. The creamiest eggs you\'ll ever make.',
    publishDate: '2025-01-11',
    readTime: '7 min read',
    category: 'Cooking Techniques',
    featured: true
  },
  {
    slug: 'knife-storage-protecting-blades-for-decades',
    title: 'Knife Storage: Protecting Your Blades for Decades',
    excerpt: 'Learn how to store knives like a professional chef. Prevent dull edges, rust, and damage with proven storage techniques and chef-approved tools.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'knife-block-vs-magnetic-strip-vs-drawer-storage',
    title: 'Knife Block vs Magnetic Strip vs Drawer: What\'s Best for You?',
    excerpt: 'Professional chef explains the pros and cons of knife blocks, magnetic strips, and drawer storage. Learn how to protect your knives, save counter space, and avoid dulling your edges.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'dutch-oven-size-guide-which-quart-size',
    title: 'Dutch Oven Size Guide: Which Quart Size Do You Need?',
    excerpt: 'A professional chef\'s guide to choosing the right Dutch oven size for soups, bread, braises, and everyday cooking. Learn what size fits your kitchen best.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'carbon-footprint-kitchen-equipment-buy-once-cry-once',
    title: 'Carbon Footprint of Kitchen Equipment: Buy Once, Cry Once',
    excerpt: 'Professional chef explains how quality kitchen equipment reduces waste and carbon footprint — why durability is the real sustainability in the kitchen.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'reducing-sauces-restaurant-technique',
    title: 'Reducing Sauces: The Technique Restaurants Use Daily',
    excerpt: 'Professional chef explains the art of reducing sauces — how to concentrate flavor, control consistency, and create restaurant-quality reductions at home.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'deglazing-secret-to-restaurant-quality-flavor',
    title: 'Deglazing: The Secret to Restaurant-Quality Flavor',
    excerpt: 'Learn how to deglaze like a professional chef — the science of fond, proper technique, and how to build flavor into every pan sauce.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'braising-101-tough-cuts-made-tender',
    title: 'Braising 101: Tough Cuts Made Tender',
    excerpt: 'Professional chef explains the art and science of braising — transforming tough cuts into tender, flavorful perfection through low, slow heat and control.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'caramelizing-onions-why-it-takes-45-minutes',
    title: 'Caramelizing Onions: Why It Takes 45 Minutes (Not 10)',
    excerpt: 'Professional chef explains the real process of caramelizing onions — why patience, temperature, and technique matter more than shortcuts.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'meal-prep-station-setup-restaurant-efficiency',
    title: 'Meal Prep Station Setup: Restaurant Efficiency at Home',
    excerpt: 'Professional chef explains how to create a restaurant-style meal prep station at home — mise en place, flow, and efficiency techniques that make cooking effortless.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'sheet-pan-cooking-restaurant-techniques',
    title: 'Sheet Pan Cooking: 5 Restaurant Techniques for Home',
    excerpt: 'Professional chef reveals 5 restaurant sheet pan techniques that transform home cooking. Learn high-heat roasting, batch prep, and finishing methods from 24 years in commercial kitchens.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'stainless-steel-why-food-sticks',
    title: 'Stainless Steel Cooking: Why Food Sticks (And How to Stop It)',
    excerpt: 'Professional chef explains why food sticks to stainless steel and how to prevent it. Learn proper preheating, oil temperature, and the science behind perfect nonstick performance.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'roasting-vegetables-restaurant-guide',
    title: 'Roasting Vegetables: Restaurant Temperature & Timing Guide',
    excerpt: 'Professional chef explains how to roast vegetables perfectly — the right temperature, spacing, oil, and timing for crisp, caramelized results.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'food-processor-vs-blender',
    title: 'Food Processor vs Blender: Which Do You Actually Need?',
    excerpt: 'Professional chef explains the difference between blenders and food processors, when to use each, and which models perform best in real kitchens.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'stand-mixer-buying-guide',
    title: 'Stand Mixer Buying Guide: KitchenAid vs Alternatives',
    excerpt: 'Professional chef compares KitchenAid mixers vs top alternatives. Learn what to look for in power, capacity, attachments, and reliability before you buy.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'kitchen-thermometer-guide',
    title: 'Kitchen Thermometer Guide: Instant Read (and Why Every Chef Trusts One)',
    excerpt: 'Professional chef explains how to use an instant-read thermometer correctly for perfect doneness, safety, and consistency in every dish.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'cookware-materials-explained',
    title: 'Cookware Materials Explained: What Chefs Actually Use',
    excerpt: 'Professional chef explains the pros and cons of stainless steel, cast iron, nonstick, carbon steel, and copper cookware — and which belong in your kitchen.',
    publishDate: '2025-10-21',
    readTime: '10 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'cutting-board-materials-guide',
    title: 'Which Cutting Board To Use? Advantages of Various Materials',
    excerpt: 'Chef Scott Bradley explains the pros and cons of wood, plastic, rubber, and bamboo cutting boards — and which are best for your knives and kitchen.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'professional-knife-grip-techniques',
    title: 'Professional Chef Knife Grip Techniques',
    excerpt: 'Learn how chefs actually hold knives. Chef Scott Bradley explains the pinch grip, claw method, and cutting stance for safety and control.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'how-to-clean-burnt-stainless-steel-pans',
    title: 'How to Clean Burnt Stainless Steel Pans',
    excerpt: 'Professional chef explains how to clean burnt stainless steel cookware using safe, effective methods — no harsh scrubbing or damage.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'how-to-preheat-a-pan',
    title: 'How to Preheat a Pan: Temperature Matters More Than You Think',
    excerpt: 'Professional chef explains the science of preheating stainless steel and cast iron pans — how to prevent sticking and achieve perfect sear every time.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'knife-mistakes-home-cooks-make',
    title: '5 Knife Mistakes Home Cooks Make (And How to Fix Them)',
    excerpt: 'Professional chef reveals the 5 knife mistakes that wreck edges and slow prep. Learn the correct cutting techniques and maintenance habits that keep your knives sharp, safe, and performing like professional equipment.',
    publishDate: '2025-10-21',
    readTime: '7 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'cast-iron-mistakes-ruin-pan',
    title: 'Cast Iron Mistakes That Ruin Your Pan (And How to Fix Them)',
    excerpt: 'Professional chef explains the common cast iron mistakes that strip seasoning, cause rust, and ruin pans. Learn how to clean, season, and maintain cast iron the right way with professional techniques.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'how-to-season-cast-iron-like-restaurant-chef',
    title: 'How to Season Cast Iron Like a Restaurant Chef',
    excerpt: 'Learn the professional method for seasoning cast iron. Thin layers, proper oils, and heat discipline build a smooth, durable nonstick surface that lasts for years.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'how-to-choose-first-chef-knife',
    title: 'How to Choose Your First Chef Knife (Like a Professional Chef)',
    excerpt: 'Professional chef explains how to choose your first chef knife. Learn about balance, steel types, blade length, and why comfort matters more than price when selecting kitchen knives.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'kitchen-tools-wasting-money',
    title: '10 Kitchen Tools You\'re Wasting Money On (And What to Buy Instead)',
    excerpt: 'Professional chef reveals which kitchen tools are a waste of money and shares the essential tools that actually matter. Learn what pros use in real kitchens.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'essential-knife-cuts-every-cook-should-master',
    title: 'The 5 Essential Knife Cuts Every Home Cook Should Master',
    excerpt: 'Learn the five professional knife cuts—dice, julienne, chiffonade, mince, and bias—with technique tips from a chef with 24 years of restaurant experience. Precision and practice for home cooks.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'knife-safety-rules-professional-kitchens',
    title: 'Knife Safety: 10 Rules From 24 Years in Professional Kitchens',
    excerpt: 'Professional chef shares 10 essential knife safety rules from 24 years in restaurants. Learn grip, stance, focus, and habits to prevent injuries and build confidence with sharp knives.',
    publishDate: '2025-10-21',
    readTime: '8 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'kitchen-gloves-guide',
    title: 'Essential Guide to Kitchen Gloves: Professional Safety Protocols',
    excerpt: 'Learn professional kitchen glove safety from 24 years restaurant experience. Single-use, cut-resistant, and proper layering techniques that prevent contamination and injuries.',
    publishDate: '2025-01-11',
    readTime: '10 min read',
    category: 'Kitchen Safety',
    featured: false
  },
  {
    slug: 'meat-cooking-temperatures-thermometers',
    title: 'Meat Cooking Temperatures Guide: Why Chefs Use Thermometers',
    excerpt: 'Professional chef explains meat thermometers and proper cooking temps. Food safety + perfect doneness every time. Comprehensive temperature charts and professional protocols.',
    publishDate: '2025-01-11',
    readTime: '12 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'how-to-sear-steaks-like-restaurant-chef',
    title: 'How to Sear Steaks Like a Restaurant Chef',
    excerpt: 'Learn the professional techniques I used nightly at Mellow Mushroom to achieve perfect restaurant-quality steak sears every time.',
    publishDate: '2024-09-27',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: false
  },
  {
    slug: 'why-professional-chefs-use-kosher-salt',
    title: 'Why Professional Chefs Use Kosher Salt',
    excerpt: 'Discover why Diamond Crystal Kosher Salt is the professional chef standard. Learn about texture, flavor control, and why it matters in professional kitchens.',
    publishDate: '2024-09-15',
    readTime: '6 min read',
    category: 'Ingredients',
    featured: false
  },
  {
    slug: 'how-to-steel-a-knife',
    title: 'How to Steel a Knife (The Right Way to Hone Like a Chef)',
    excerpt: 'Professional guide to honing knives with a steel. Learn the difference between honing and sharpening, proper technique, and why chefs do it before every service.',
    publishDate: '2024-09-10',
    readTime: '8 min read',
    category: 'Knife Care',
    featured: false
  },
  {
    slug: 'how-to-make-perfect-french-press-coffee',
    title: 'How to Make Perfect French Press Coffee',
    excerpt: 'Master the French press method with professional techniques. Water temperature, timing, and grind size—everything you need for perfect coffee every time.',
    publishDate: '2024-09-05',
    readTime: '7 min read',
    category: 'Coffee',
    featured: false
  },
  {
    slug: 'how-to-sharpen-with-tri-stone',
    title: 'How to Sharpen Knives with a Tri-Stone Sharpener',
    excerpt: 'Professional knife sharpening guide using the Norton tri-stone system. Learn proper angles, technique, and maintenance for restaurant-sharp knives.',
    publishDate: '2024-09-01',
    readTime: '10 min read',
    category: 'Knife Care',
    featured: false
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-orange-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Cooking Techniques
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Learn the restaurant techniques that create professional-quality results at home.
            24 years of commercial kitchen experience, explained for home cooks.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center gap-2 text-orange-400">
              <User className="w-5 h-5" />
              <span className="text-sm">Scott Bradley - Former Kitchen Manager at Mellow Mushroom</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                {post.featured && (
                  <div className="inline-block bg-orange-700 text-white text-xs px-3 py-1 rounded-full mb-4">
                    Featured Post
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 hover:text-orange-800 transition-colors">
                  <CTAVisibilityTracker ctaId={`blog-landing-post-title-${index + 1}`}

                    merchant="internal"


                   position="mid_article">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CTAVisibilityTracker>
                </h2>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <CTAVisibilityTracker ctaId={`blog-landing-post-link-${index + 1}`}

                  merchant="internal"


                 position="mid_article">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-800 font-semibold transition-colors"
                  >
                    Read Full Article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CTAVisibilityTracker>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Want More Professional Cooking Tips?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Get exclusive restaurant techniques and equipment insights delivered to your inbox.
            Learn the methods that create consistent, professional results.
          </p>
          <CTAVisibilityTracker ctaId="blog-landing-newsletter-cta"

            merchant="internal"


           position="mid_article">
            <Link
              href="/newsletter"
              className="bg-white text-orange-800 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Subscribe for Free Tips
            </Link>
          </CTAVisibilityTracker>
        </div>
      </section>
    </div>
  )
}