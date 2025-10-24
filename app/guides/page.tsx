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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <FAQSchema faqs={guidesFAQs} />

      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Kitchen Equipment Buying Guides
        </h1>
        <p className="text-lg text-slate-500 mb-6 leading-relaxed">
          Expert guidance from a certified chef with 24 years in professional kitchens. Every recommendation
          here has survived real restaurant use—not laboratory testing, not sponsored reviews, just equipment
          that works when you need it to.
        </p>

        <div className="bg-slate-50 border-l-4 border-orange-600 p-5 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-3 text-slate-900">
            How to Use These Guides
          </h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            These aren&rsquo;t affiliate-stuffed product roundups. Each guide focuses on equipment I&rsquo;ve actually used in
            high-volume commercial kitchens or tested extensively at home. You&rsquo;ll find:
          </p>
          <ul className="text-slate-600 leading-relaxed ml-5 mb-3">
            <li><strong>Specific recommendations</strong> with links to detailed reviews</li>
            <li><strong>Professional insights</strong> on what separates quality from marketing</li>
            <li><strong>Common mistakes</strong> that waste money and frustration</li>
            <li><strong>Maintenance tips</strong> that extend equipment lifespan</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            I update these guides quarterly based on new testing, price changes, and availability updates. If a product
            stops meeting standards or a better option appears, the guide changes.
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-200 p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-orange-900">
            My Testing Process
          </h2>
          <p className="text-orange-800 leading-relaxed text-sm">
            Nothing gets recommended without a minimum 6-month testing period in working kitchens. That means
            200+ cover nights, commercial dishwashers, and kitchen staff who don&rsquo;t baby equipment. If it survives
            that—and still performs well—it earns a spot in these guides. No exceptions, no shortcuts, no sponsored
            placements.
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        {guides.map((guide, index) => (
          <CTAVisibilityTracker
            key={index}
            ctaId={`guides-landing-card-${index + 1}`}
            position="mid_article"
            productSlug={guide.href.replace('/guides/', '').replace('/reviews/', '')}
            merchant="internal"
          >
            <a href={guide.href} className="no-underline">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200 transition-shadow duration-200 hover:shadow-lg">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">{guide.title}</h3>
                <p className="text-slate-500 mb-4">{guide.description}</p>
                <span className="text-orange-600 font-semibold">Read Guide →</span>
              </div>
            </a>
          </CTAVisibilityTracker>
        ))}
      </div>
    </div>
  );
}