'use client'
import Script from "next/script";
import Link from "next/link";
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';

export default function CookwarePage() {
  const products = [
    {
      id: "lodge-seasoned-cast-iron-3-skillet-bundle",
      name: "Lodge Seasoned Cast Iron 3 Skillet Bundle",
      brand: "Lodge",
      affiliateUrl: "#",
      slug: "lodge-seasoned-cast-iron-3-skillet-bundle",
      description: "Professional 3-piece cast iron set tested in commercial kitchens"
    },
    {
      id: "le-creuset-signature-7-25-qt-dutch-oven",
      name: "Le Creuset Signature 7.25 Qt Dutch Oven",
      brand: "Le Creuset",
      affiliateUrl: "#",
      slug: "le-creuset-signature-7-25-qt-dutch-oven",
      description: "Premium enameled cast iron for braising and roasting"
    }
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "Product",
      position: i + 1,
      name: p.name,
      brand: p.brand,
      url: `https://www.chefapprovedtools.com/reviews/${p.slug}`,
      offers: { "@type": "Offer", priceCurrency: "USD", url: p.affiliateUrl }
    }))
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
      <BreadcrumbSchema items={categoryBreadcrumbs.cookware} />
      <Script id="cookware-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
        Professional Cookware
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
        Pots, pans, and cookware that deliver restaurant-quality results in your home kitchen.
      </p>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '48px' }}>
        {products.map(p => (
          <div key={p.id} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '24px', border: '1px solid #e2e8f0', position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-2px)';
                 e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
               }}>
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
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>9.6/10</span>
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
              <span style={{ color: '#ea580c' }}>Paid link</span> • Prices may change
            </p>
          </div>
        ))}
      </div>

      <section style={{ marginTop: '48px', padding: '32px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '8px' }}>Cookware Buying Guide</h2>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>Materials comparison, sizing recommendations, and care instructions.</p>
        <a href="/guides/best-cookware" style={{ backgroundColor: '#ea580c', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>
          Read the Full Guide
        </a>
      </section>
    </div>
  );
}