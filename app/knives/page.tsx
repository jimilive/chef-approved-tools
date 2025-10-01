'use client'
import Link from 'next/link';
import Script from "next/script";
import InteractiveProductCard from '@/components/InteractiveProductCard';
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';

export default function KnivesPage() {
  const products = [
    {
      id: "victorinox-fibrox-10-inch-chefs-knife",
      name: "Victorinox Fibrox Pro 10\" Chef's Knife",
      brand: "Victorinox",
      affiliateUrl: "https://www.amazon.com/Victorinox-Inch-Fibrox-Chefs-Knife/dp/B0000CF8YO?tag=chefapprovedt-20",
      slug: "victorinox-fibrox-10-inch-chefs-knife",
      description: "Professional Swiss chef's knife for larger cuts and bigger hands - 40 years of restaurant testing"
    },
    {
      id: "victorinox-fibrox-8-inch-chefs-knife",
      name: "Victorinox Fibrox Pro 8\" Chef's Knife",
      brand: "Victorinox",
      affiliateUrl: "https://www.amazon.com/Victorinox-Swiss-Classic-Chefs-Knife/dp/B0061SWV8Y?tag=chefapprovedt-20",
      slug: "victorinox-fibrox-8-inch-chefs-knife",
      description: "Perfect all-purpose chef's knife tested through decades of professional cooking"
    },
    {
      id: "victorinox-4-inch-paring-knife",
      name: "Victorinox 4\" Paring Knife",
      brand: "Victorinox",
      affiliateUrl: "https://www.amazon.com/Victorinox-Inch-Paring-Knife-Spear/dp/B0019WXPQY?tag=chefapprovedt-20",
      slug: "victorinox-4-inch-paring-knife",
      description: "Precision paring knife for detailed work - the exact knife I've used for 40 years"
    },
    {
      id: "victorinox-granton-edge-boning-knife",
      name: "Victorinox 6\" Granton Edge Boning Knife",
      brand: "Victorinox",
      affiliateUrl: "https://www.amazon.com/Victorinox-Cutlery-6-Inch-Boning-Granton/dp/B0019WZEUE?tag=chefapprovedt-20",
      slug: "victorinox-granton-edge-boning-knife",
      description: "Professional boning knife for breaking down proteins - restaurant tested flexibility"
    },
    {
      id: "victorinox-offset-bread-knife",
      name: "Victorinox 9\" Offset Bread Knife",
      brand: "Victorinox",
      affiliateUrl: "https://www.amazon.com/Victorinox-Swiss-Army-Bread-Knife/dp/B0019WZI0U?tag=chefapprovedt-20",
      slug: "victorinox-offset-bread-knife",
      description: "Offset serrated knife for bread and tomatoes - superior knuckle clearance"
    },
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