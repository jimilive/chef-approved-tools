import { Metadata } from 'next'
'use client'
import Script from "next/script";
import Link from "next/link";
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';


export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/cookware',
  },
}

export default function CookwarePage() {
  const products = [
    {
      id: "lodge-seasoned-cast-iron-3-skillet-bundle",
      name: "Lodge Seasoned Cast Iron 3 Skillet Bundle",
      brand: "Lodge",
      affiliateUrl: "#",
      slug: "lodge-seasoned-cast-iron-3-skillet-bundle",
      description: "Professional 3-piece cast iron set tested in commercial kitchens",
      score: 9.6
    },
    {
      id: "le-creuset-signature-7-25-qt-dutch-oven",
      name: "Le Creuset Signature 7.25 Qt Dutch Oven",
      brand: "Le Creuset",
      affiliateUrl: "#",
      slug: "le-creuset-signature-7-25-qt-dutch-oven",
      description: "Premium enameled cast iron for braising and roasting",
      score: 9.6
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BreadcrumbSchema items={categoryBreadcrumbs.cookware} />
      <Script id="cookware-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      {/* Header Section */}
      <h1 className="text-4xl font-bold mb-2">
        Professional Cookware
      </h1>
      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
        Pots, pans, and cookware that deliver restaurant-quality results in your home kitchen. Whether you&apos;re looking for a durable cast iron skillet, a versatile Dutch oven, or a high-performance stainless steel frying pan, our expert reviews will help you choose the right tool for the job. Our top recommendations are in our comprehensive Best Cookware Guide.
      </p>

      {/* Featured Guide Hero Section */}
      <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl overflow-hidden shadow-lg border border-orange-100">
        <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          <div>
            <div className="inline-block bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              FEATURED GUIDE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Guide to the Best Cookware of 2025
            </h2>
            <p className="text-slate-700 text-lg mb-6 leading-relaxed">
              After hundreds of hours of testing in professional kitchens, we&apos;ve identified the top-performing pans for every budget. From cast iron to stainless steel, discover which cookware delivers the best value and performance.
            </p>
            <Link
              href="/guides/best-cookware"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              See Our Top Picks →
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-slate-700 font-medium">Expert testing & analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-slate-700 font-medium">Every budget covered</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-slate-700 font-medium">Restaurant-quality results</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="text-slate-700 font-medium">Buying & care guides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Category Navigation */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Browse by Category</h3>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">By Material</h4>
          <div className="flex flex-wrap gap-3">
            <Link href="/cookware?filter=cast-iron" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Cast Iron
            </Link>
            <Link href="/cookware?filter=stainless-steel" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Stainless Steel
            </Link>
            <Link href="/cookware?filter=non-stick" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Non-Stick
            </Link>
            <Link href="/cookware?filter=enameled" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Enameled Cast Iron
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">By Type</h4>
          <div className="flex flex-wrap gap-3">
            <Link href="/cookware?type=skillets" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Skillets & Frying Pans
            </Link>
            <Link href="/cookware?type=dutch-ovens" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Dutch Ovens
            </Link>
            <Link href="/cookware?type=saucepans" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Saucepans
            </Link>
            <Link href="/cookware?type=cookware-sets" className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors font-medium text-slate-700">
              Cookware Sets
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-md p-6 border border-slate-200 relative transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-slate-900 leading-tight flex-1">{p.name}</h3>
              <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded ml-2 whitespace-nowrap">
                CHEF TESTED
              </div>
            </div>
            <p className="text-slate-600 mb-3 text-sm">by {p.brand}</p>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-base">★★★★★</span>
                <span className="text-slate-600 text-sm font-medium">Our Score: {p.score}/10</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-slate-700 text-sm leading-relaxed">
                {p.description}{' '}
                <Link href={`/reviews/${p.slug}`} className="text-orange-600 hover:text-orange-800 font-medium">
                  Read full review →
                </Link>
              </p>
            </div>

            <div className="flex gap-2">
              <a href={p.affiliateUrl}
                 target="_blank"
                 rel="sponsored nofollow noopener"
                 className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-semibold text-sm flex-1 text-center shadow-md hover:shadow-lg transition-all duration-200">
                🛒 Check Price on Amazon
              </a>
              <Link href={`/reviews/${p.slug}`}
                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg font-semibold text-sm text-center transition-colors duration-200">
                Review
              </Link>
            </div>

            <p className="text-xs text-slate-400 mt-2 text-center">
              <span className="text-orange-600 font-medium">Affiliate link</span> • Prices may change
            </p>
          </div>
        ))}
      </div>

      {/* Cookware Buying Guide Section */}
      <section className="mt-12 p-8 bg-slate-50 rounded-xl border border-slate-200">
        <h2 className="text-3xl font-bold mb-2 text-slate-900">Cookware Buying Guide</h2>
        <p className="text-slate-600 mb-4 text-lg">Materials comparison, sizing recommendations, and care instructions.</p>
        <Link href="/guides/best-cookware" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
          Read the Full Guide
        </Link>
      </section>
    </div>
  );
}
