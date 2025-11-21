import { Metadata } from 'next'
import FAQSchema from '@/components/FAQSchema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Kitchen Equipment Buying Guides From A Professional Chef',
  description: 'Expert guidance from a professional chef with 24 years restaurant experience. Make informed equipment decisions with real testing data and recommendations.',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/guides',
  },
}

const guidesFAQs = [
  {
    question: "Are your buying guides updated regularly?",
    answer: "Yes, we update our buying guides quarterly based on new equipment testing, price changes, and availability updates. Each guide shows the last update date, and we notify subscribers when major recommendations change."
  },
  {
    question: "Do you recommend budget alternatives in your guides?",
    answer: "Absolutely. Each guide includes recommendations across different price points, including lower-cost options that still meet our quality standards. We believe great cooking shouldn't require expensive equipment, just the right equipment for your needs."
  },
  {
    question: "How do you choose which equipment to include in guides?",
    answer: "We only include equipment that has completed our full 6-month testing process in professional kitchens. Every recommendation has been used by real kitchen staff under high-volume conditions, ensuring our guides reflect real-world performance."
  }
]

export default function GuidesPage() {
  const guides = [
    { title: "Best Cookware: What Survives 24 Years Restaurant Use", description: "Stainless steel handles tomato sauce, cast iron lasts decades, nonstick fails fast", href: "/guides/best-cookware" },
    { title: "Best Chef Knives 2025", description: "Complete buying guide for professional knives", href: "/guides/best-chef-knives" },
    { title: "Cookware Materials Guide", description: "Stainless steel vs cast iron vs non-stick", href: "/guides/cookware-materials" },
    { title: "Kitchen Appliance Essentials", description: "Must-have appliances for serious cooking", href: "/guides/kitchen-appliances" },
    { title: "Knife Care & Maintenance", description: "Keep your blades sharp and safe", href: "/guides/knife-care" },
    { title: "Affordable Appliances: Budget Options That Actually Last", description: "Which budget blenders survive 2 years, which mixers match premium performance", href: "/guides/affordable-kitchen-appliances" }
  ];

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Guides', url: 'https://www.chefapprovedtools.com/guides' }
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kitchen Equipment Buying Guides",
    "description": "Expert buying guides from a professional chef with 24 years restaurant experience",
    "numberOfItems": guides.length,
    "itemListElement": guides.map((guide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.chefapprovedtools.com${guide.href}`,
      "name": guide.title,
      "description": guide.description
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <FAQSchema faqs={guidesFAQs} />

      {/* Additional Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

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