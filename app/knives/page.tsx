import Link from 'next/link';
import Script from "next/script";
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';
import ProductCard from '@/components/ProductCard';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { getProductsByCategory } from '@/lib/product-helpers';
import { getEditorialMetadataWithDefaults } from '@/lib/editorial-metadata';
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Chef Knives Hub: All Reviews, Guides, Tips',
  description: 'Professional chef reviews of kitchen knives tested over years in restaurant kitchens. Chef knives, paring knives, bread knives, and specialty blades.',
  keywords: ['chef knives', 'best kitchen knives', 'professional knives', 'knife reviews', 'Victorinox', 'Wüsthof'],
  openGraph: {
    title: 'Chef Knives: All Reviews & Guides',
    description: 'Chef knives tested in professional kitchens for 20 years.',
    type: 'website',
  }
}

export default async function KnivesPage() {
  // Fetch products from Supabase
  const supabaseProducts = await getProductsByCategory('Knives')

  // Map to format expected by ProductCard with editorial metadata
  const products = supabaseProducts.map((p, index) => {
    const editorial = getEditorialMetadataWithDefaults(p.slug)
    return {
      id: p.slug,
      name: p.name,
      slug: p.slug,
      category: 'Knives',
      tier: editorial.tier,
      testingPeriod: editorial.testingPeriod,
      rating: p.expertRating || 4.5,
      hook: editorial.hook,
      position: index + 1,
      listName: 'category_knives'
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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What's the best chef knife for home cooks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Victorinox Fibrox Pro 8\" Chef's Knife is the best all-around choice for home cooks. It offers professional-grade performance at an affordable price, with excellent edge retention and comfortable grip. I've used this exact knife for 20 years of cooking."
        }
      },
      {
        "@type": "Question",
        name: "Are expensive chef knives worth it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not always. Professional chefs often prefer mid-range knives like Victorinox ($40-60) over premium brands ($200+) because they perform just as well for daily tasks and are easier to maintain. Save expensive knives for specialized tasks or if you're a serious enthusiast."
        }
      },
      {
        "@type": "Question",
        name: "What size chef knife should I buy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most home cooks do best with an 8-inch chef's knife. It's versatile enough for most tasks without being unwieldy. Choose 10-inch if you have larger hands or frequently cut large vegetables. Smaller than 8 inches limits functionality."
        }
      },
      {
        "@type": "Question",
        name: "How often should I sharpen my chef knife?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hone your knife with a steel before each use to maintain the edge. Fully sharpen every 3-6 months for home use, or monthly for heavy professional use. Quality matters more than frequency - one proper sharpening beats multiple poor attempts."
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BreadcrumbSchema items={categoryBreadcrumbs.knives} />
      <Script id="knives-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>
      <Script id="knives-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <h1 className="text-4xl font-bold mb-2">
        Best Chef Knives: Professional Reviews (2025)
      </h1>
      <p className="text-lg text-slate-600 mb-4 leading-relaxed">
        <strong>Professional chef knives tested in real restaurant kitchens.</strong> After years testing knives in commercial settings, I&apos;ve identified which chef knives, paring knives, and specialty blades deliver genuine professional-grade performance.
      </p>
      <p className="text-base text-slate-500 mb-8">
        Every knife review on this page represents equipment that survived extended commercial use. These are the best knives for serious home cooks who demand professional results.
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
            ctaPrefix="knives-category"
          />
        ))}
      </div>

      {/* Buying Guide Section - Commented out until guide is ready */}
      {/* <section className="mt-12 p-8 bg-slate-50 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">Chef Knife Buying Guide</h2>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Choosing the right chef knife requires understanding steel types, handle ergonomics, and blade geometry. Whether you&apos;re looking for an affordable starter knife or a premium Japanese blade, our buying guide explains what matters most for long-term performance.
        </p>
        <p className="text-slate-500 mb-4">
          Learn how to evaluate chef knives based on edge retention, balance, sharpening requirements, and actual performance under demanding kitchen conditions.
        </p>
        <CTAVisibilityTracker
          ctaId="category-knives-buying-guide"
          position="final_cta"
          productSlug="knives-category"
          merchant="internal"
        >
          <a href="/guides/best-chef-knives" className="bg-orange-600 text-white px-4 py-2 rounded-lg no-underline inline-block font-semibold hover:bg-orange-700">
            Read the Full Chef Knife Guide
          </a>
        </CTAVisibilityTracker>
      </section> */}
    </div>
  );
}
