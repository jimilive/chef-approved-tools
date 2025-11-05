'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  category: string
  featured: boolean
}

interface BlogClientProps {
  posts: BlogPost[]
}

// Category configuration with colors - matches blog-utils.ts category detection
const CATEGORIES = [
  { id: 'all', label: 'All Posts', color: 'orange' },
  { id: 'Cooking Techniques', label: 'Cooking Techniques', color: 'blue' },
  { id: 'Knife Care', label: 'Knife Care', color: 'green' },
  { id: 'Ingredients', label: 'Ingredients', color: 'purple' },
  { id: 'Buying Guides', label: 'Buying Guides', color: 'amber' },
  { id: 'Kitchen Safety', label: 'Kitchen Safety', color: 'red' },
  { id: 'Coffee', label: 'Coffee', color: 'yellow' },
]

const getCategoryColor = (category: string) => {
  const cat = CATEGORIES.find(c => c.id === category)
  return cat?.color || 'gray'
}

const getCategoryBgClass = (color: string) => {
  const colors: Record<string, string> = {
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    gray: 'bg-gray-100 text-gray-700',
  }
  return colors[color] || colors.gray
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header Section - Enhanced with Gradient */}
      <section className="bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
              Professional Cooking Techniques
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-6">
              24 years restaurant experience, explained for home cooks
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white">
                SB
              </div>
              <div className="text-left">
                <div className="font-semibold">Scott Bradley</div>
                <div className="text-xs text-orange-200">24 Years in Professional Kitchens • {posts.length} Guides</div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id
              const postCount = category.id === 'all'
                ? posts.length
                : posts.filter(p => p.category === category.id).length

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-orange-700 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-gray-300 hover:border-orange-700 hover:text-orange-700 hover:shadow-sm'
                    }
                  `}
                >
                  {category.label} {postCount > 0 && `(${postCount})`}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - Masonry Layout */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No posts found in this category.</p>
            </div>
          ) : (
            <div className="blog-posts-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => {
                const categoryColor = getCategoryColor(post.category)
                const categoryBgClass = getCategoryBgClass(categoryColor)
                const isFeatured = post.featured

                return (
                  <article
                    key={post.slug}
                    className={`
                      bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full
                      ${isFeatured ? 'ring-2 ring-orange-400 hover:ring-orange-500' : 'hover:scale-[1.02]'}
                    `}
                  >
                    {/* Category Badge with Color Bar */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-1 h-8 rounded-full ${isFeatured ? 'bg-gradient-to-b from-orange-400 to-orange-600' : 'bg-gray-300'}`}></div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${categoryBgClass}`}>
                          {post.category}
                        </span>
                        {isFeatured && (
                          <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs px-2.5 py-1 rounded-md font-medium">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-orange-700 transition-colors leading-snug">
                      <CTAVisibilityTracker
                        ctaId={`blog-hub-post-${index + 1}`}
                        merchant="internal"
                        position="mid_article"
                      >
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CTAVisibilityTracker>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 leading-relaxed mb-4 flex-grow line-clamp-3 text-[15px]">
                      {post.excerpt}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-600" />
                        <span>
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Read Link */}
                    <div className="mt-4">
                      <CTAVisibilityTracker
                        ctaId={`blog-hub-link-${index + 1}`}
                        merchant="internal"
                        position="mid_article"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-orange-700 hover:text-white hover:bg-orange-700 font-semibold text-sm px-4 py-2 rounded-lg border-2 border-orange-700 transition-all group"
                        >
                          Read Article
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </CTAVisibilityTracker>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Want More Professional Cooking Tips?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get exclusive restaurant techniques and equipment insights delivered to your inbox.
            Learn the methods that create consistent, professional results.
          </p>
          <CTAVisibilityTracker
            ctaId="blog-hub-newsletter-cta"
            merchant="internal"
            position="final_cta"
          >
            <Link
              href="/newsletter"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-4 rounded-lg transition-all hover:scale-105 shadow-lg text-lg"
            >
              Subscribe for Free Tips
            </Link>
          </CTAVisibilityTracker>
        </div>
      </section>
    </div>
  )
}
