import Script from "next/script";
import Link from "next/link";
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';
import ProductImpressionTracker from '@/components/ProductImpressionTracker';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Best Kitchen Appliances 2025 | Chef-Tested Reviews',
  description: 'Professional chef reviews of blenders, mixers, food processors, and essential kitchen appliances tested in commercial restaurant settings.',
  keywords: ['kitchen appliances', 'blender reviews', 'mixer reviews', 'food processor reviews', 'professional kitchen equipment'],
  openGraph: {
    title: 'Best Kitchen Appliances 2025 | Chef-Tested Reviews',
    description: 'Professional chef reviews of blenders, mixers, and essential kitchen appliances.',
    type: 'website',
  }
}

export default function AppliancesPage() {
  const products = [
    {
      id: "vitamix-5200",
      name: "Vitamix 5200 Professional-Grade Blender",
      brand: "Vitamix",
      affiliateUrl: "#",
      slug: "vitamix-5200",
      description: "Commercial-grade blender that survived 5+ years of restaurant service"
    },
    {
      id: "kitchenaid-ksm8990wh",
      name: "KitchenAid Commercial Series KSM8990WH",
      brand: "KitchenAid",
      affiliateUrl: "#",
      slug: "kitchenaid-ksm8990wh",
      description: "NSF-certified commercial mixer tested through 18 months at Purple Cafe"
    },
    {
      id: "robot-coupe-r2-dice",
      name: "Robot Coupe R2 Dice Food Processor",
      brand: "Robot Coupe",
      affiliateUrl: "#",
      slug: "robot-coupe-r2-dice",
      description: "Professional food processor for high-volume prep work"
    }
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
      }
    }))
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
      <BreadcrumbSchema items={categoryBreadcrumbs.appliances} />
      <Script id="appliances-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
        Best Kitchen Appliances: Chef-Tested Reviews (2025)
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#475569', marginBottom: '16px', lineHeight: '1.6' }}>
        <strong>Professional kitchen appliances tested in real restaurant conditions.</strong> After years testing kitchen appliances in commercial settings, I&apos;ve identified which mixers, blenders, and food processors deliver genuine professional-grade performance.
      </p>
      <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '32px' }}>
        Every kitchen appliance review on this page represents equipment that survived extended commercial use. These are the best kitchen appliances for serious home cooks who demand professional results.
      </p>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '48px' }}>
        {products.map((p, index) => (
          <ProductImpressionTracker
            key={p.id}
            productName={p.name}
            productSlug={p.slug}
            category="Appliances"
            brand={p.brand}
            position={index + 1}
            listName="category_appliances"
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 relative transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', lineHeight: '1.3', flex: '1' }}>{p.name}</h3>
                <div style={{ backgroundColor: '#fef3c7', color: '#92400e', fontSize: '0.75rem', fontWeight: '600', padding: '4px 8px', borderRadius: '4px', marginLeft: '8px' }}>
                  CHEF TESTED
                </div>
              </div>
              <p style={{ color: '#64748b', marginBottom: '12px', fontSize: '0.9rem' }}>by {p.brand}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#fbbf24', fontSize: '1rem' }}>★★★★★</span>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>9.5/10</span>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.5' }}>
                  {p.description}{' '}
                  <Link href={`/reviews/${p.slug}`} style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '500' }}>
                    Read full review →
                  </Link>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={p.affiliateUrl}
                   target="_blank"
                   rel="sponsored nofollow noopener"
                   style={{
                     background: 'linear-gradient(45deg, #ff9900, #ffad33)',
                     color: 'white',
                     padding: '12px 18px',
                     borderRadius: '8px',
                     textDecoration: 'none',
                     display: 'inline-block',
                     fontWeight: '600',
                     fontSize: '0.875rem',
                     flex: '1',
                     textAlign: 'center',
                     boxShadow: '0 2px 4px rgba(255, 153, 0, 0.2)'
                   }}>
                  🛒 Check Price
                </a>
                <Link href={`/reviews/${p.slug}`}
                      style={{
                        border: '2px solid #ea580c',
                        color: '#ea580c',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        backgroundColor: 'transparent',
                        textAlign: 'center'
                      }}>
                  Review
                </Link>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '8px', textAlign: 'center' }}>
                <span style={{ color: '#ea580c' }}>Affiliate link</span> • Prices may change
              </p>
            </div>
          </ProductImpressionTracker>
        ))}
      </div>

      <section style={{ marginTop: '48px', padding: '32px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '8px' }}>Kitchen Appliances Buying Guide</h2>
        <p style={{ color: '#475569', marginBottom: '12px', lineHeight: '1.6' }}>
          Choosing the right kitchen appliances requires understanding power requirements, counter space planning, and feature comparisons. Whether you&apos;re looking for affordable kitchen appliances or premium commercial-grade equipment, our buying guide explains what matters most for long-term reliability.
        </p>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>
          Learn how to evaluate kitchen appliances based on motor power, build quality, warranty coverage, and actual performance under demanding conditions.
        </p>
        <CTAVisibilityTracker
          ctaId="category-appliances-buying-guide"
          position="final_cta"
          productSlug="appliances-category"
          merchant="internal"
        >
          <a href="/guides/kitchen-appliances" style={{ backgroundColor: '#ea580c', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>
            Read the Full Kitchen Appliances Guide
          </a>
        </CTAVisibilityTracker>
      </section>
    </div>
  );
}
