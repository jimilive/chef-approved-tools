'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock } from 'lucide-react'

interface RecentProduct {
  slug: string
  name: string
  tier: 1 | 2
  testingPeriod: string
  rating: number
  hook: string
  category: string
  viewedAt: number
}

const STORAGE_KEY = 'chef-approved-recently-viewed'
const MAX_RECENT_ITEMS = 6

// Tier Badge Components
const Tier1Badge = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    color: '#000',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(255,215,0,0.3)',
    marginBottom: '12px'
  }}>
    <span style={{ fontSize: '18px' }}>🛡️</span>
    <span>TIER 1: Professional Kitchen Tested</span>
  </div>
);

const Tier2Badge: React.FC<{ testingPeriod: string }> = ({ testingPeriod }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(74,144,226,0.3)',
    marginBottom: '12px'
  }}>
    <span style={{ fontSize: '18px' }}>🏠</span>
    <span>TIER 2: Home Tested ({testingPeriod})</span>
  </div>
);

/**
 * Recently Viewed Products Component
 * Increases conversions by showing products the user has already shown interest in
 * Uses localStorage for client-side tracking (no backend needed)
 */
export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as RecentProduct[]
        // Sort by most recent first
        const sorted = parsed.sort((a, b) => b.viewedAt - a.viewedAt)
        setRecentProducts(sorted.slice(0, MAX_RECENT_ITEMS))
      } catch (error) {
        console.error('Failed to parse recently viewed:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Don't render on server (causes hydration mismatch)
  if (!isLoaded || recentProducts.length === 0) {
    return null
  }

  return (
    <section style={{ marginTop: '80px', marginBottom: '40px' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '30px'
        }}>
        <Clock style={{ width: '24px', height: '24px', color: '#ff6b35' }} />
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          margin: 0,
          color: '#1a1a1a'
        }}>
          Recently Viewed Products
        </h2>
      </div>

      <p style={{
        fontSize: '16px',
        color: '#666',
        marginBottom: '30px',
        lineHeight: '1.6'
      }}>
        Pick up where you left off. These are the products you've been researching.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {recentProducts.map((product) => (
          <div
            key={product.slug}
            style={{
              background: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Tier Badge */}
            {product.tier === 1 ? (
              <Tier1Badge />
            ) : (
              <Tier2Badge testingPeriod={product.testingPeriod} />
            )}

            {/* Category Tag */}
            <div style={{
              fontSize: '12px',
              color: '#666',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              {product.category}
            </div>

            {/* Product Name */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: '0 0 12px 0',
              lineHeight: '1.4',
              color: '#1a1a1a'
            }}>
              {product.name}
            </h3>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <div style={{ color: '#FFD700', fontSize: '18px' }}>
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '½'}
                {'☆'.repeat(5 - Math.ceil(product.rating))}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                {product.rating}/5
              </span>
            </div>

            {/* Testing Period */}
            <div style={{
              background: '#f8f9fa',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#555',
              marginBottom: '12px',
              fontStyle: 'italic'
            }}>
              📊 Tested: {product.testingPeriod}
            </div>

            {/* Hook */}
            <p style={{
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#555',
              margin: '0 0 20px 0',
              flex: 1
            }}>
              {product.hook}
            </p>

            {/* CTA Button */}
            <Link
              href={`/reviews/${product.slug}`}
              style={{
                display: 'block',
                background: '#28a745',
                color: 'white',
                padding: '12px 24px',
                textAlign: 'center',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'background 0.2s'
              }}
            >
              Read Full Review →
            </Link>
          </div>
        ))}
      </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY)
              setRecentProducts([])
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              textDecoration: 'underline',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 16px'
            }}
          >
            Clear viewing history
          </button>
        </div>
      </div>
    </section>
  )
}

/**
 * Hook to track product views
 * Call this from your product/review pages
 */
export function useTrackProductView(product: {
  slug: string
  name: string
  tier: 1 | 2
  testingPeriod: string
  rating: number
  hook: string
  category: string
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const existing = stored ? JSON.parse(stored) : []

      // Remove existing entry for this product (to update timestamp)
      const filtered = existing.filter(
        (item: RecentProduct) => item.slug !== product.slug
      )

      // Add to front of array
      const updated = [
        {
          ...product,
          viewedAt: Date.now()
        },
        ...filtered
      ].slice(0, MAX_RECENT_ITEMS) // Keep only most recent

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to track product view:', error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug])
}