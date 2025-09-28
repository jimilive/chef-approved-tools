import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Cooking Techniques Blog | Chef Approved Tools',
  description: 'Learn professional cooking techniques from 21+ years of restaurant kitchen experience. Master the methods that separate restaurant-quality cooking from home cooking.',
  keywords: ['professional cooking techniques', 'restaurant cooking methods', 'chef techniques', 'kitchen manager tips', 'restaurant quality cooking', 'professional chef blog']
}

const blogPosts = [
  {
    slug: 'how-to-sear-steaks-like-restaurant-chef',
    title: 'How to Sear Steaks Like a Restaurant Chef',
    excerpt: 'Learn the professional techniques I used nightly at Mellow Mushroom to achieve perfect restaurant-quality steak sears every time.',
    publishDate: '2024-09-27',
    readTime: '8 min read',
    category: 'Cooking Techniques',
    featured: true
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
            21+ years of commercial kitchen experience, explained for home cooks.
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

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 hover:text-orange-700 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  Read Full Article
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
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
          <Link
            href="/newsletter"
            className="bg-white text-orange-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Subscribe for Free Tips
          </Link>
        </div>
      </section>
    </div>
  )
}