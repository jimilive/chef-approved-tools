import Link from 'next/link';
import Script from "next/script";
import InteractiveProductCard from '@/components/InteractiveProductCard';
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema';
import ProductImpressionTracker from '@/components/ProductImpressionTracker';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { getProductsByCategory, getPrimaryAffiliateLink } from '@/lib/product-helpers';
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

  // Map to format expected by the page
  const products = supabaseProducts.map(p => ({
    id: p.slug,
    name: p.name,
    brand: p.brand,
    affiliateUrl: getPrimaryAffiliateLink(p),
    slug: p.slug,
    description: p.description || p.expertOpinion || 'Professional chef-tested knife'
  }))

  const LEGACY_products = [
    {
      id: "victorinox-fibrox-10-inch-chefs-knife",
      name: "Victorinox Fibrox Pro 10\" Chef's Knife",
      brand: "Victorinox",
      affiliateUrl: "https://amzn.to/4o6pPwW",
      slug: "victorinox-fibrox-10-inch-chefs-knife",
      description: "Professional Swiss chef's knife for larger cuts and bigger hands - 24 years of professional cooking"
    },
    {
      id: "victorinox-fibrox-8-inch-chefs-knife",
      name: "Victorinox Fibrox Pro 8\" Chef's Knife",
      brand: "Victorinox",
      affiliateUrl: "https://amzn.to/3U4PsT1",
      slug: "victorinox-fibrox-8-inch-chefs-knife",
      description: "Perfect all-purpose chef's knife tested through decades of professional cooking"
    },
    {
      id: "victorinox-4-inch-paring-knife",
      name: "Victorinox 4\" Paring Knife",
      brand: "Victorinox",
      affiliateUrl: "https://amzn.to/4mzvALq",
      slug: "victorinox-4-inch-paring-knife",
      description: "Precision paring knife for detailed work - the exact knife I've used for 20 years"
    },
    {
      id: "victorinox-granton-edge-boning-knife",
      name: "Victorinox 6\" Granton Edge Boning Knife",
      brand: "Victorinox",
      affiliateUrl: "https://amzn.to/4pUDed1",
      slug: "victorinox-granton-edge-boning-knife",
      description: "Professional boning knife for breaking down proteins - restaurant tested flexibility"
    },
    {
      id: "victorinox-offset-bread-knife",
      name: "Victorinox 9\" Offset Bread Knife",
      brand: "Victorinox",
      affiliateUrl: "https://amzn.to/34xYWJx",
      slug: "victorinox-offset-bread-knife",
      description: "Offset serrated knife for bread and tomatoes - superior knuckle clearance"
    },
    {
      id: "wusthof-classic-ikon-16-piece",
      name: "Wüsthof Classic Ikon 16-Piece Knife Set",
      brand: "Wüsthof",
      affiliateUrl: "#",
      slug: "wusthof-classic-ikon-16-piece",
      description: "Professional German knife set tested in restaurant kitchens"
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
        {products.map((p, index) => (
          <ProductImpressionTracker
            key={p.id}
            productName={p.name}
            productSlug={p.slug}
            category="Knives"
            brand={p.brand}
            position={index + 1}
            listName="category_knives"
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
      </section>
    </div>
  );
}
