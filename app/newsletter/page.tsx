import { Metadata } from 'next'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Free Guide: The 11 Tools I Use Most in My Home Kitchen',
  description: 'Get my free kitchen tools guide featuring the 11 essential items from 40 years of professional cooking. Real recommendations, no BS.',
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
        My daily workhorse tools after 40 years of professional cooking. Get the free guide plus equipment insights from 23+ years of restaurant experience.
      </p>

      <NewsletterForm />

      <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '32px', margin: '48px auto', maxWidth: '600px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
          Recent Newsletter Topics
        </h2>
        <div style={{ color: '#64748b', lineHeight: '1.7' }}>
          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
              Why Your Cast Iron Isn&rsquo;t Non-Stick (And How to Fix It)
            </h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}>
              The paper towel seasoning technique that works better than the smoking oven method.
              Plus: the one thing you&rsquo;re doing that strips seasoning faster than soap.
            </p>
            <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>December 2024</span>
          </div>

          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
              The $40 Knife vs. The $200 Knife: What You Actually Get
            </h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}>
              I&rsquo;ve used both for 20+ years. Here&rsquo;s the honest breakdown of what that extra $160 buys
              (spoiler: sometimes nothing, sometimes everything).
            </p>
            <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>November 2024</span>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
              Commercial Dishwasher Secrets for Home Kitchens
            </h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}>
              The pre-rinse technique that makes hand-washing 3x faster, plus which &quot;dishwasher-safe&quot;
              items actually aren&rsquo;t (learned this the hard way).
            </p>
            <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>November 2024</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 0' }}>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', textAlign: 'center', lineHeight: '1.6' }}>
          Join 2,000+ home cooks getting weekly insights from 23 years of professional kitchen experience.
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