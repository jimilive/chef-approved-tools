import FAQSchema from '@/components/FAQSchema'

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
    { title: "OXO Good Grips Swivel Peeler", description: "The peeler that actually lasts - 40 years of restaurant use", href: "/reviews/oxo-good-grips-swivel-peeler" },
    { title: "OXO Good Grips Bench Scraper", description: "Most underrated kitchen tool - transfers, portions, cleans", href: "/reviews/oxo-good-grips-bench-scraper" },
    { title: "Winco Heavy Duty Tongs", description: "Restaurant-grade tongs at budget price - the ones pros use", href: "/reviews/winco-heavy-duty-tongs" },
    { title: "Benriner Large Mandoline", description: "Professional consistency for perfect slices every time", href: "/reviews/benriner-large-mandoline" },
    { title: "Gold Textiles Bar Mops", description: "The towels restaurants actually use - absorbent and durable", href: "/reviews/gold-textiles-bar-mops" },
    { title: "Epicurean Kitchen Cutting Board", description: "Dishwasher-safe board better than wood - truly sanitary", href: "/reviews/epicurean-kitchen-cutting-board" },
    { title: "Cookware Materials Guide", description: "Stainless steel vs cast iron vs non-stick", href: "/guides/cookware-materials" },
    { title: "Kitchen Appliance Essentials", description: "Must-have appliances for serious cooking", href: "/guides/kitchen-appliances" },
    { title: "Knife Care & Maintenance", description: "Keep your blades sharp and safe", href: "/guides/knife-care" }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
      <FAQSchema faqs={guidesFAQs} />
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
        Kitchen Equipment Buying Guides
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
        Expert guidance from a certified chef to help you make informed equipment decisions.
      </p>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        {guides.map((guide, index) => (
          <a key={index} href={guide.href} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', color: '#1e293b' }}>{guide.title}</h3>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>{guide.description}</p>
              <span style={{ color: '#ea580c', fontWeight: '600' }}>Read Guide →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}