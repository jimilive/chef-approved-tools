import Link from 'next/link'

export default function NotFound() {
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
        <div style={{ fontSize: '6rem', marginBottom: '24px' }}>🔍</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
          The kitchen tool you&rsquo;re looking for seems to have gone missing. 
          Let&rsquo;s get you back to finding the perfect equipment.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              backgroundColor: '#ea580c',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/appliances"
            style={{
              border: '2px solid #ea580c',
              color: '#ea580c',
              padding: '10px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}