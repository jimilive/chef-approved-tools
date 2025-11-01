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

export default async function AppliancesPage() {
  // Fetch products from Supabase
  const supabaseProducts = await getProductsByCategory('Appliances')

  // Map to format expected by ProductCard with editorial metadata
  const products = supabaseProducts.map((p, index) => {
    const editorial = getEditorialMetadataWithDefaults(p.slug)
    return {
      id: p.slug,
      name: p.name,
      slug: p.slug,
      category: 'Appliances',
      tier: editorial.tier,
      testingPeriod: editorial.testingPeriod,
      rating: p.expertRating || 4.5,
      hook: editorial.hook,
      position: index + 1,
      listName: 'category_appliances'
    }
  })

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product) => ({
      "@type": "ListItem",
      "position": product.position,
      "item": {
        "@type": "Product",
        "name": product.name,
        "brand": {
          "@type": "Brand",
          "name": product.name.split(' ')[0] // Extract brand from product name
        },
        "image": "https://www.chefapprovedtools.com/logo.png",
        "url": `https://www.chefapprovedtools.com/reviews/${product.slug}`
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
            ctaPrefix="appliances-category"
          />
        ))}
      </div>

      {/* Buying Guide Section - Commented out until guide is ready */}
      {/* <section className="mt-12 p-8 bg-slate-50 rounded-xl">
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
      </section> */}
    </div>
  );
}
