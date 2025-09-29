import { Metadata } from 'next'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Equipment Insights Newsletter | Chef Approved Tools',
  description: 'Get equipment insights and honest product recommendations from 21+ years of restaurant experience. Join fellow home chefs getting expert insights.',
  keywords: 'kitchen tips newsletter, chef tips, cooking newsletter, professional chef advice, kitchen equipment deals'
}

export default function NewsletterPage() {

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
        Get Equipment Insights
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
        Get equipment insights and honest product recommendations from 21+ years of restaurant experience.
      </p>

      <NewsletterForm />

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