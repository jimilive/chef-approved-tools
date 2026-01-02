'use client'
import { useCallback } from 'react'
import { searchReviews, searchBlogs, SearchResult } from '@/lib/search'

export type { SearchResult }

export interface SearchResults {
  reviews: SearchResult[]
  blogs: SearchResult[]
}

export function useSearch() {
  const search = useCallback((query: string, limitPerType: number = 6): SearchResults => {
    if (!query || query.length < 2) {
      return { reviews: [], blogs: [] }
    }

    return {
      reviews: searchReviews(query, limitPerType),
      blogs: searchBlogs(query, limitPerType)
    }
  }, [])

  return { search }
}
