import Script from "next/script";
import Link from "next/link";
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';
import ProductImpressionTracker from '@/components/ProductImpressionTracker';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Kitchen Appliances 2025 | Pro Chef Reviews',
  description: 'Professional chef reviews of blenders, mixers, food processors, and essential kitchen appliances tested in commercial restaurant settings.',
  keywords: ['kitchen appliances', 'blender reviews', 'mixer reviews', 'food processor reviews', 'professional kitchen equipment'],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/appliances',
  },
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
      description: "Commercial-grade blender that survived 5 years of restaurant service"
    },
    {
      id: "kitchenaid-ksm8990wh",
      name: "KitchenAid Commercial Series",
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BreadcrumbSchema items={categoryBreadcrumbs.appliances} />
      <Script id="appliances-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      <h1 className="text-4xl font-bold mb-2">
        Best Kitchen Appliances: Chef-Tested Reviews (2025)
      </h1>
      <p className="text-lg text-slate-600 mb-4 leading-relaxed">
        <strong>Professional kitchen appliances tested in real restaurant conditions.</strong> After years testing kitchen appliances in commercial settings, I&apos;ve identified which mixers, blenders, and food processors deliver genuine professional-grade performance.
      </p>
      <p className="text-base text-slate-500 mb-8">
        Every kitchen appliance review on this page represents equipment that survived extended commercial use. These are the best kitchen appliances for serious home cooks who demand professional results.
      </p>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))] mb-12">
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
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-900 leading-tight flex-1">{p.name}</h3>
                <div className="bg-amber-100 text-amber-900 text-xs font-semibold px-2 py-1 rounded ml-2">
                  CHEF TESTED
                </div>
              </div>
              <p className="text-slate-500 mb-3 text-sm">by {p.brand}</p>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-base">★★★★★</span>
                  <span className="text-slate-500 text-sm">9.5/10</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {p.description}{' '}
                  <Link href={`/reviews/${p.slug}`} className="text-orange-600 no-underline font-medium">
                    Read full review →
                  </Link>
                </p>
              </div>

              <div className="flex gap-2">
                <a href={p.affiliateUrl}
                   target="_blank"
                   rel="sponsored nofollow noopener"
                   className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-4 py-3 rounded-lg no-underline inline-block font-semibold text-sm flex-1 text-center shadow-md shadow-yellow-500/20">
                  🛒 Check Price
                </a>
                <Link href={`/reviews/${p.slug}`}
                      className="border-2 border-orange-600 text-orange-600 px-4 py-2 rounded-lg no-underline inline-block font-semibold text-sm bg-transparent text-center">
                  Review
                </Link>
              </div>

              <p className="text-xs text-gray-400 mt-2 text-center">
                <span className="text-orange-600">Affiliate link</span> • Prices may change
              </p>
            </div>
          </ProductImpressionTracker>
        ))}
      </div>

      <section className="mt-12 p-8 bg-slate-50 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">Kitchen Appliances Buying Guide</h2>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Choosing the right kitchen appliances requires understanding power requirements, counter space planning, and feature comparisons. Whether you&apos;re looking for affordable kitchen appliances or premium commercial-grade equipment, our buying guide explains what matters most for long-term reliability.
        </p>
        <p className="text-slate-500 mb-4">
          Learn how to evaluate kitchen appliances based on motor power, build quality, warranty coverage, and actual performance under demanding conditions.
        </p>
        <CTAVisibilityTracker
          ctaId="category-appliances-buying-guide"
          position="final_cta"
          productSlug="appliances-category"
          merchant="internal"
        >
          <a href="/guides/kitchen-appliances" className="bg-orange-600 text-white px-4 py-2 rounded-lg no-underline inline-block font-semibold hover:bg-orange-700">
            Read the Full Kitchen Appliances Guide
          </a>
        </CTAVisibilityTracker>
      </section>
    </div>
  );
}
