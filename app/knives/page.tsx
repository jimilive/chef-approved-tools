'use client'
import Link from 'next/link';
import Script from "next/script";
import InteractiveProductCard from '@/components/InteractiveProductCard';
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';

export default function KnivesPage() {
  const products = [
    {
      id: "wusthof-classic-ikon-15-piece",
      name: "Wüsthof Classic Ikon 15-Piece Knife Set",
      brand: "Wüsthof",
      affiliateUrl: "#",
      slug: "wusthof-classic-ikon-15-piece",
      description: "Professional German knife set tested in restaurant kitchens"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <BreadcrumbSchema items={categoryBreadcrumbs.knives} />
      <Script id="knives-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      {/* Page Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Professional Chef Knives
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Our top knife picks for home cooks and working chefs. Read each review to find the right balance of edge retention, feel, and value.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {products.map(p => (
          <InteractiveProductCard key={p.id} product={p} category="knife" />
        ))}
      </div>

      {/* Buying Guide CTA */}
      <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Knife Buying Guide
        </h2>
        <p className="text-slate-600 mb-6 text-lg max-w-2xl mx-auto">
          How to choose a chef&rsquo;s knife, why steel matters, and maintenance tips from a certified chef.
        </p>
        <a 
          href="/guides/best-chef-knives" 
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          Read the Full Guide
        </a>
      </section>
    </div>
  );
}