import { Metadata } from 'next'
import FAQSchema from '@/components/FAQSchema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

export const metadata: Metadata = {
  title: 'Kitchen Equipment Guides | Chef\'s Picks',
  description: 'Expert guidance from a culinary professional to help you make informed equipment decisions.',
  alternates: {
    canonical: '/guides',
  },
}

const guidesFAQs = [
  {
    question: "Are your buying guides updated regularly?",
    answer: "Yes, we update our buying guides quarterly based on new equipment testing, price changes, and availability updates. Each guide shows the last update date, and we notify subscribers when major recommendations change."
  },
  {
    question: "Do you recommend budget alternatives in your guides?",
    answer: "Absolutely. Each guide includes recommendations across different price points, including budget-friendly options that still meet our quality standards. We believe great cooking shouldn't require expensive equipment, just the right equipment for your needs."
  },
  {
    question: "How do you choose which equipment to include in guides?",
    answer: "We only include equipment that has completed our full 6-month testing process in professional kitchens. Every recommendation has been used by real kitchen staff under high-volume conditions, ensuring our guides reflect real-world performance."
  }
]

export default function GuidesPage() {
  const guides = [
    { title: "Best Chef Knives 2025", description: "Complete buying guide for professional knives", href: "/guides/best-chef-knives" },
    { title: "OXO Good Grips Swivel Peeler", description: "The peeler that actually lasts - 24 years of professional cooking", href: "/reviews/oxo-good-grips-swivel-peeler" },
    { title: "OXO Good Grips Bench Scraper", description: "Most underrated kitchen tool - transfers, portions, cleans", href: "/reviews/oxo-good-grips-bench-scraper" },
    { title: "Winco Heavy Duty Tongs", description: "Restaurant-grade tongs at budget price - the ones pros use", href: "/reviews/winco-heavy-duty-tongs" },
    { title: "Benriner Large Mandoline", description: "Professional consistency for perfect slices every time", href: "/reviews/benriner-large-mandoline" },
    { title: "ZUPERIA Bar Mops", description: "Industry standard bar mops - 100% ring spun cotton, restaurant grade", href: "/reviews/zuperia-bar-mops" },
    { title: "Epicurean Kitchen Cutting Board", description: "Dishwasher-safe board better than wood - truly sanitary", href: "/reviews/epicurean-kitchen-cutting-board" },
    { title: "Cookware Materials Guide", description: "Stainless steel vs cast iron vs non-stick", href: "/guides/cookware-materials" },
    { title: "Kitchen Appliance Essentials", description: "Must-have appliances for serious cooking", href: "/guides/kitchen-appliances" },
    { title: "Knife Care & Maintenance", description: "Keep your blades sharp and safe", href: "/guides/knife-care" }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
      <FAQSchema faqs={guidesFAQs} />

      <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
          Kitchen Equipment Buying Guides
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '24px', lineHeight: '1.7' }}>
          Expert guidance from a certified chef with 24 years in professional kitchens. Every recommendation
          here has survived real restaurant use—not laboratory testing, not sponsored reviews, just equipment
          that works when you need it to.
        </p>

        <div style={{ backgroundColor: '#f8fafc', borderLeft: '4px solid #ea580c', padding: '20px', borderRadius: '8px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px', color: '#1e293b' }}>
            How to Use These Guides
          </h2>
          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '12px' }}>
            These aren&rsquo;t affiliate-stuffed product roundups. Each guide focuses on equipment I&rsquo;ve actually used in
            high-volume commercial kitchens or tested extensively at home. You&rsquo;ll find:
          </p>
          <ul style={{ color: '#475569', lineHeight: '1.6', marginLeft: '20px', marginBottom: '12px' }}>
            <li><strong>Specific recommendations</strong> with links to detailed reviews</li>
            <li><strong>Professional insights</strong> on what separates quality from marketing</li>
            <li><strong>Common mistakes</strong> that waste money and frustration</li>
            <li><strong>Maintenance tips</strong> that extend equipment lifespan</li>
          </ul>
          <p style={{ color: '#475569', lineHeight: '1.6' }}>
            I update these guides quarterly based on new testing, price changes, and availability updates. If a product
            stops meeting standards or a better option appears, the guide changes.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#9a3412' }}>
            My Testing Process
          </h2>
          <p style={{ color: '#7c2d12', lineHeight: '1.6', fontSize: '0.95rem' }}>
            Nothing gets recommended without a minimum 6-month testing period in working kitchens. That means
            200+ cover nights, commercial dishwashers, and kitchen staff who don&rsquo;t baby equipment. If it survives
            that—and still performs well—it earns a spot in these guides. No exceptions, no shortcuts, no sponsored
            placements.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        {guides.map((guide, index) => (
          <CTAVisibilityTracker
            key={index}
            ctaId={`guides-landing-card-${index + 1}`}
            position="mid_article"
            productSlug={guide.href.replace('/guides/', '').replace('/reviews/', '')}
            merchant="internal"
          >
            <a href={guide.href} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', color: '#1e293b' }}>{guide.title}</h3>
                <p style={{ color: '#64748b', marginBottom: '16px' }}>{guide.description}</p>
                <span style={{ color: '#ea580c', fontWeight: '600' }}>Read Guide →</span>
              </div>
            </a>
          </CTAVisibilityTracker>
        ))}
      </div>
    </div>
  );
}