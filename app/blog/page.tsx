import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

export const metadata: Metadata = {
  title: 'Pro Cooking Techniques | Restaurant Methods',
  description: 'Professional cooking techniques from 23+ years restaurant experience. Master methods that separate restaurant-quality from home cooking. Chef secrets revealed.',
  keywords: ['professional cooking techniques', 'restaurant cooking methods', 'chef techniques', 'kitchen manager tips', 'restaurant quality cooking', 'professional chef blog'],
  alternates: {
    canonical: '/blog',
  },
}

const blogPosts = [
  {
    slug: 'best-scrambled-eggs',
    title: 'Perfect Scrambled Eggs: No Bowl, No Whisk Method',
    excerpt: 'Revolutionary scrambled egg technique from 40 years of cooking. No bowl, no whisk, no milk. Just eggs, butter, and a fork—directly in the pan. The creamiest eggs you\'ll ever make.',
    publishDate: '2025-01-11',
    readTime: '7 min read',
    category: 'Cooking Techniques',
    featured: true
  },
  {
    slug: 'kitchen-gloves-guide',
    title: 'Essential Guide to Kitchen Gloves: Professional Safety Protocols',
    excerpt: 'Learn professional kitchen glove safety from 23+ years restaurant experience. Single-use, cut-resistant, and proper layering techniques that prevent contamination and injuries.',
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
            23+ years of commercial kitchen experience, explained for home cooks.
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
                  <div className="inline-block bg-orange-600 text-white text-xs px-3 py-1 rounded-full mb-4">
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