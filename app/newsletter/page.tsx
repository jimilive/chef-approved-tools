import { Metadata } from 'next'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Equipment Newsletter: Pro Tips & Insights',
  description: 'Get equipment insights and honest product recommendations from 24 years of restaurant experience. Join fellow home chefs getting expert insights.',
  keywords: 'kitchen tools guide, essential kitchen equipment, chef recommendations, professional kitchen tools, kitchen equipment list',
  alternates: {
    canonical: '/newsletter',
  },
}

export default function NewsletterPage() {

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
        The 11 Tools I Use Most in My Home Kitchen
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
        My daily workhorse tools after 45 years of cooking. Get the free guide plus equipment insights from 24 years of restaurant experience.
      </p>

      <NewsletterForm />

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 0' }}>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', textAlign: 'center', lineHeight: '1.6' }}>
          Join 2,000+ home cooks getting weekly insights from 24 years of professional kitchen experience.
          Unsubscribe anytime. No spam, no sponsored content, no BS.
        </p>
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