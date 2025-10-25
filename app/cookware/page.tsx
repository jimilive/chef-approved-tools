import Script from "next/script";
import Link from "next/link";
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';
import ProductImpressionTracker from '@/components/ProductImpressionTracker';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { getProductsByCategory, getPrimaryAffiliateLink } from '@/lib/product-helpers';
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Best Cookware 2025 | Chef Pots & Pans Guide',
  description: 'Professional cookware reviews: Pans, pots, Dutch ovens tested in restaurant kitchens or in my apartment . What works, what lasts. Chef-approved.',
  keywords: ['best cookware', 'cast iron', 'stainless steel pans', 'non-stick cookware', 'professional cookware'],
  openGraph: {
    title: 'Best Cookware 2025 | Chef-Tested Pots & Pans',
    description: 'Restaurant-tested cookware reviews from a professional chef.',
    type: 'website',
  }
}

export default async function CookwarePage() {
  // Fetch products from Supabase
  const supabaseProducts = await getProductsByCategory('Cookware')

  // Map to format expected by the page
  const products = supabaseProducts.map(p => ({
    id: p.slug,
    name: p.name,
    brand: p.brand,
    affiliateUrl: getPrimaryAffiliateLink(p),
    slug: p.slug,
    description: p.description || p.expertOpinion || 'Professional chef-tested cookware',
    score: p.expertRating || 9.0
  }))

  const LEGACY_products = [
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
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: {
          "@type": "Brand",
          name: p.brand
        },
        image: "https://www.chefapprovedtools.com/logo.png",
        url: `https://www.chefapprovedtools.com/reviews/${p.slug}`
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BreadcrumbSchema items={categoryBreadcrumbs.cookware} />
      <Script id="cookware-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      <h1 className="text-4xl font-bold mb-2">
        Best Cookware: Professional Reviews (2025)
      </h1>
      <p className="text-lg text-slate-600 mb-4 leading-relaxed">
        <strong>Professional cookware tested in real restaurant kitchens.</strong> After years testing pots and pans in commercial settings, I&apos;ve identified which cookware delivers genuine professional-grade performance.
      </p>
      <p className="text-base text-slate-500 mb-8">
        Every cookware review on this page represents equipment that survived extended commercial use. These are the best pots and pans for serious home cooks who demand professional results.
      </p>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))] mb-12">
        {products.map((p, index) => (
          <ProductImpressionTracker
            key={p.id}
            productName={p.name}
            productSlug={p.slug}
            category="Cookware"
            brand={p.brand}
            position={index + 1}
            listName="category_cookware"
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 relative transition-all duration-200 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
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

              <div className="mb-4 flex-1">
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
        <h2 className="text-3xl font-bold mb-2">Cookware Buying Guide</h2>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Choosing the right cookware requires understanding materials, heat conductivity, and durability. Whether you&apos;re looking for affordable cast iron or premium stainless steel, our buying guide explains what matters most for long-term performance.
        </p>
        <p className="text-slate-500 mb-4">
          Learn how to evaluate cookware based on heat distribution, oven compatibility, maintenance requirements, and actual performance under demanding kitchen conditions.
        </p>
        <CTAVisibilityTracker
          ctaId="category-cookware-buying-guide"
          position="final_cta"
          productSlug="cookware-category"
          merchant="internal"
        >
          <a href="/guides/best-cookware" className="bg-orange-600 text-white px-4 py-2 rounded-lg no-underline inline-block font-semibold hover:bg-orange-700">
            Read the Full Cookware Guide
          </a>
        </CTAVisibilityTracker>
      </section>
    </div>
  );
}