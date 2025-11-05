import Script from "next/script";
import Link from "next/link";
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';
import ProductCard from '@/components/ProductCard';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { getProductsByCategory } from '@/lib/product-helpers';
import { getEditorialMetadataWithDefaults } from '@/lib/editorial-metadata';
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Best Cookware 2025 | Chef Pots & Pans Guide',
  description: 'Professional cookware reviews: Pans, pots, Dutch ovens tested in restaurant kitchens or in my apartment . What works, what lasts. Chef-approved.',
  keywords: ['best cookware', 'cast iron', 'stainless steel pans', 'non-stick cookware', 'professional cookware'],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/cookware',
  },
  openGraph: {
    title: 'Best Cookware 2025 | Chef-Tested Pots & Pans',
    description: 'Restaurant-tested cookware reviews from a professional chef.',
    type: 'website',
  }
}

export default async function CookwarePage() {
  // Fetch products from Supabase
  const supabaseProducts = await getProductsByCategory('Cookware')

  // Map to format expected by ProductCard with editorial metadata
  const products = supabaseProducts.map((p, index) => {
    const editorial = getEditorialMetadataWithDefaults(p.slug)
    return {
      id: p.slug,
      name: p.name,
      slug: p.slug,
      category: 'Cookware',
      tier: editorial.tier,
      testingPeriod: editorial.testingPeriod,
      rating: p.expertRating || 4.5,
      hook: editorial.hook,
      position: index + 1,
      listName: 'category_cookware'
    }
  })

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p) => ({
      "@type": "ListItem",
      position: p.position,
      item: {
        "@type": "Product",
        name: p.name,
        brand: {
          "@type": "Brand",
          name: p.name.split(' ')[0] // Extract brand from product name
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
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            slug={p.slug}
            category={p.category}
            tier={p.tier}
            testingPeriod={p.testingPeriod}
            rating={p.rating}
            hook={p.hook}
            position={p.position}
            listName={p.listName}
            ctaPrefix="cookware-category"
          />
        ))}
      </div>

      {/* Buying Guide Section - Commented out until guide is ready */}
      {/* <section className="mt-12 p-8 bg-slate-50 rounded-xl">
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
      </section> */}
    </div>
  );
}