'use client'

import { useState } from 'react'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter_page',
          leadMagnet: 'weekly_tips'
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setMessage(data.message)
        setEmail('')
      } else {
        setIsSuccess(false)
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
        Get Weekly Kitchen Tips
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
        Get weekly professional cooking tips and honest equipment recommendations from 15+ years of restaurant experience.
      </p>

      <div style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '12px', marginBottom: '32px' }}>
        {message && (
          <div style={{
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '8px',
            backgroundColor: isSuccess ? '#d1fae5' : '#fee2e2',
            color: isSuccess ? '#065f46' : '#991b1b',
            border: `1px solid ${isSuccess ? '#a7f3d0' : '#fecaca'}`
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
              marginBottom: '16px',
              opacity: isLoading ? 0.6 : 1
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading ? '#9ca3af' : '#ea580c',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Subscribing...' : 'Get Free Kitchen Tips'}
          </button>
        </form>
      </div>

      <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>What You&rsquo;ll Get:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Weekly equipment recommendations from a certified chef
          </li>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Exclusive deals on professional kitchen tools
          </li>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Pro cooking tips from restaurant experience
          </li>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Equipment maintenance guides
          </li>
        </ul>
      </div>
    </div>
  );
}