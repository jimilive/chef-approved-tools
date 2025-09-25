'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontSize: '6rem', marginBottom: '24px' }}>⚠️</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
          Oops! Something Went Wrong
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
          Our kitchen encountered an unexpected error. Don&rsquo;t worry, our chefs are on it!
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#ea580c',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              border: '2px solid #ea580c',
              color: '#ea580c',
              backgroundColor: 'transparent',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Go Home
          </button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details style={{ marginTop: '24px', textAlign: 'left', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '600' }}>Error Details (Dev Only)</summary>
            <pre style={{ fontSize: '0.875rem', marginTop: '8px', whiteSpace: 'pre-wrap' }}>
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}