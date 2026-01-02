'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { searchReviews, searchBlogs, SearchResult } from '@/lib/search'

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''

  const [inputValue, setInputValue] = useState(query)
  const [reviews, setReviews] = useState<SearchResult[]>([])
  const [blogs, setBlogs] = useState<SearchResult[]>([])

  // Update input when URL changes
  useEffect(() => {
    setInputValue(query)
  }, [query])

  // Perform search when query changes
  useEffect(() => {
    if (query.length >= 2) {
      setReviews(searchReviews(query, 50))
      setBlogs(searchBlogs(query, 50))
    } else {
      setReviews([])
      setBlogs([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(inputValue)}`)
    }
  }

  const totalResults = reviews.length + blogs.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-4">Search</h1>
          <form onSubmit={handleSearch} className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search reviews and blog posts..."
              className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg pl-12 pr-4 py-3 border-2 border-transparent focus:border-orange-500 focus:ring-0 focus:outline-none text-lg"
              autoFocus
            />
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {query.length >= 2 ? (
          <>
            {/* Results Summary */}
            <p className="text-gray-600 mb-6">
              {totalResults === 0 ? (
                <>No results found for "<span className="font-medium">{query}</span>"</>
              ) : (
                <>Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "<span className="font-medium">{query}</span>"</>
              )}
            </p>

            {/* Reviews Section */}
            {reviews.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {reviews.length}
                  </span>
                  Product Reviews
                </h2>
                <div className="space-y-4">
                  {reviews.map((result) => (
                    <Link
                      key={result.url}
                      href={result.url}
                      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-orange-300 transition-all"
                    >
                      <h3 className="font-semibold text-slate-900 hover:text-orange-700 mb-1">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{result.excerpt}</p>
                      <span className="text-orange-700 text-sm font-medium mt-2 inline-block">
                        Read Review →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Blog Posts Section */}
            {blogs.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {blogs.length}
                  </span>
                  Blog Posts
                </h2>
                <div className="space-y-4">
                  {blogs.map((result) => (
                    <Link
                      key={result.url}
                      href={result.url}
                      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all"
                    >
                      <h3 className="font-semibold text-slate-900 hover:text-blue-700 mb-1">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{result.excerpt}</p>
                      <span className="text-blue-700 text-sm font-medium mt-2 inline-block">
                        Read Article →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {totalResults === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try different keywords or check your spelling
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Popular searches:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['blender', 'knife', 'cast iron', 'dutch oven', 'stand mixer', 'food processor'].map((term) => (
                      <button
                        key={term}
                        onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty State - No Query */
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search our site</h3>
            <p className="text-gray-600 mb-6">
              Find product reviews, cooking guides, and kitchen tips
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['blender', 'knife', 'cast iron', 'dutch oven', 'stand mixer', 'food processor'].map((term) => (
                  <button
                    key={term}
                    onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <Link href="/" className="text-orange-700 hover:text-orange-800 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading search...</div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}
