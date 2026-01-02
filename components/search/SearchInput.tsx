'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { useSearch, SearchResults } from './useSearch'
import { getSearchCounts } from '@/lib/search'

interface SearchInputProps {
  onClose?: () => void
  autoFocus?: boolean
  fullWidth?: boolean
}

const POPULAR_SEARCHES = ['blender', 'knife', 'cast iron', 'dutch oven', 'stand mixer', 'food processor']

export default function SearchInput({ onClose, autoFocus = false, fullWidth = false }: SearchInputProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults>({ reviews: [], blogs: [] })
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const { search } = useSearch()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto focus when requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Search effect - limit to 3 per section for dropdown
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const r = search(query, 3)
        setResults(r)
        setIsOpen(true)
        // Get total counts for "View all X results" link
        const counts = getSearchCounts(query)
        setTotalCount(counts.total)
      } else {
        setResults({ reviews: [], blogs: [] })
        setIsOpen(false)
        setTotalCount(0)
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [query, search])

  // Handle Esc key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setIsFocused(false)
        setQuery('')
        onClose?.()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
        if (query === '') {
          onClose?.()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, query])

  const handleSelect = (url: string) => {
    setIsOpen(false)
    setIsFocused(false)
    setQuery('')
    onClose?.()
    router.push(url)
  }

  const handleViewAll = () => {
    if (query.length >= 2) {
      setIsOpen(false)
      setIsFocused(false)
      onClose?.()
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.length >= 2) {
      handleViewAll()
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults({ reviews: [], blogs: [] })
    setIsOpen(false)
    setTotalCount(0)
    onClose?.()
  }

  const handleIconClick = () => {
    if (query.length >= 2) {
      handleViewAll()
    } else {
      inputRef.current?.focus()
    }
  }

  const handlePopularSearch = (term: string) => {
    setQuery(term)
    // Will trigger search via useEffect
  }

  const hasResults = results.reviews.length > 0 || results.blogs.length > 0
  const showPopularSuggestions = isFocused && query.length < 2

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? 'w-full' : ''}`}>
      <div className="relative">
        {/* Search icon inside input - clickable */}
        <button
          onClick={handleIconClick}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={query.length >= 2 ? "Search" : "Focus search"}
          type="button"
        >
          <svg
            className="h-4 w-4"
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
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          placeholder="Search..."
          className={`${fullWidth ? 'w-full' : 'w-64'} bg-white text-gray-900 placeholder-gray-400 rounded-lg px-10 py-1.5 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none`}
        />

        {/* X button to clear */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Popular suggestions when focused but empty */}
      {showPopularSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[320px] p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 hover:text-orange-700 rounded-full text-sm text-gray-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search results dropdown */}
      {isOpen && hasResults && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto min-w-[320px]">
          {/* Reviews Section */}
          {results.reviews.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reviews</span>
              </div>
              {results.reviews.map((result) => (
                <button
                  key={result.url}
                  onClick={() => handleSelect(result.url)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-gray-900 line-clamp-1">{result.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{result.excerpt}</div>
                </button>
              ))}
            </div>
          )}

          {/* Blog Posts Section */}
          {results.blogs.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Blog Posts</span>
              </div>
              {results.blogs.map((result) => (
                <button
                  key={result.url}
                  onClick={() => handleSelect(result.url)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-gray-900 line-clamp-1">{result.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{result.excerpt}</div>
                </button>
              ))}
            </div>
          )}

          {/* View All Results Link with count */}
          {totalCount > 0 && (
            <button
              onClick={handleViewAll}
              className="w-full px-4 py-3 text-center text-orange-700 hover:text-orange-800 hover:bg-orange-50 font-medium border-t border-gray-200"
            >
              View all {totalCount} result{totalCount !== 1 ? 's' : ''} for &ldquo;{query}&rdquo; →
            </button>
          )}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && !hasResults && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[320px]">
          <div className="px-4 py-6 text-center text-gray-500">
            No results found for &ldquo;{query}&rdquo;
          </div>
        </div>
      )}
    </div>
  )
}
