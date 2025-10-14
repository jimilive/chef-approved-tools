import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

// Enhanced product data with scoring system
const products = {

// Add this to the products object in app/products/[id]/page.tsx
"robot-coupe-r2": {
  id: "robot-coupe-r2",
  name: "Robot Coupe R2 Food Processor",
  brand: "Robot Coupe",
  price: 1299.00,
  originalPrice: 1399.00,
  rating: 9.8,
  maxRating: 10,
  reviewCount: 18,
  lastUpdated: "2025-09-03",
  img: "/logo.png",
  gallery: [
    { src: "/logo.png", alt: "Robot Coupe R2 on commercial countertop" },
    { src: "/logo.png", alt: "Processing vegetables in Robot Coupe R2" },
    { src: "/logo.png", alt: "R2 with attachments and stainless steel bowl" }
  ],
  affiliateUrls: {
    amazon: "https://amazon.com/dp/B001234567?tag=your-tag-20",
    direct: "https://www.robotcoupe.com/en-us/r2"
  },
  excerpt: "Professional kitchens run on efficiency. After 8 months of daily prep service processing 50+ lbs of vegetables, the R2 never overheated or stalled. This isn&apos;t just a tool—it&apos;s the backbone of commercial food prep.",
  category: "appliances",
  scores: {
    performance: 10,
    durability: 9.8,
    easeOfCleaning: 9.5,
    commercialROI: 9.7
  },
  specs: [
    "High-torque 2 HP motor, continuous-duty rated",
    "4-8 qt stainless steel bowl options",
    "Multiple blade & disc attachments",
    "Commercial-grade construction throughout",
    "NSF certified for foodservice use"
  ],
  testNotes: [
    "Daily prep of 50+ lbs vegetables with zero overheating incidents",
    "Perfect emulsion for 30+ gallons of vinaigrette weekly",
    "Blade swaps completed in under 30 seconds during service",
    "Processed dense root vegetables without motor strain",
    "Maintained consistent results after 8 months heavy commercial use"
  ],
  // New comparison data
  comparison: {
    title: "Robot Coupe R2 vs Typical Home Food Processor",
    items: [
      { feature: "Motor Power", r2: "2 HP continuous-duty", typical: "0.5 – 1 HP intermittent" },
      { feature: "Bowl Capacity", r2: "4–8 quarts", typical: "8–12 cups" },
      { feature: "Attachments", r2: "Multiple blades/discs", typical: "1–2 basic blades" },
      { feature: "Construction", r2: "Commercial stainless steel", typical: "Plastic/consumer-grade" },
      { feature: "Noise Level", r2: "Moderate for commercial", typical: "Varies, often high-pitched" },
      { feature: "Cleaning", r2: "NSF-rated dishwasher safe", typical: "Limited durability parts" },
      { feature: "Warranty", r2: "3-year commercial", typical: "1-year limited" }
    ]
  },
  // New ROI section
  roi: {
    paybackPeriod: "6-12 months in busy kitchen",
    details: "At $1,299, the R2 pays for itself through reduced prep time, fewer service interruptions, and ability to handle large volumes that directly impact revenue and kitchen efficiency."
  },
  pros: [
    "High-performance continuous-duty motor handles any load",
    "Professional-grade stainless steel construction",
    "Versatile attachments for chopping, slicing, grating, emulsifying",
    "NSF certified for commercial food service",
    "Long-lasting durability with modular replacement parts",
    "Reduces prep time by 60% vs manual methods"
  ],
  cons: [
    "High upfront investment ($1,299)",
    "Heavy unit requires dedicated counter space",
    "Loud operation not suitable for open kitchens",
    "Overkill for casual home cooking",
    "Requires training for optimal blade selection"
  ],
  faq: [
    {
      question: "Is the Robot Coupe R2 suitable for small restaurants?",
      answer: "Yes, though it&apos;s designed for commercial use. It&apos;s compact for its class but the noise level and power requirements make it better suited for closed prep areas rather than open kitchens."
    },
    {
      question: "Can it handle tough vegetables like butternut squash?",
      answer: "Absolutely. During testing, we processed 20 lbs of butternut squash in 10 minutes without any motor strain. The high-torque motor and professional blades handle dense root vegetables effortlessly."
    },
    {
      question: "How does cleaning work in a commercial environment?",
      answer: "Most removable parts are NSF-rated dishwasher safe. The motor base should never be submerged. Complete breakdown and cleaning takes under 5 minutes, crucial for busy kitchens."
    },
    {
      question: "What's the real-world ROI for restaurants?",
      answer: "In our test kitchen, the R2 reduced vegetable prep time by 60%. For a restaurant processing 100+ lbs of vegetables daily, this translates to 2+ hours of saved labor, paying for itself in 6-12 months."
    }
  ]
},

  "vitamix-5200": {
    id: "vitamix-5200",
    name: "Vitamix 5200 Blender",
    brand: "Vitamix",
    price: 449.00,
    originalPrice: 499.00,
    rating: 9.7,
    maxRating: 10,
    reviewCount: 30,
    lastUpdated: "2025-09-03",
    img: "/logo.png",
    gallery: [
      { src: "/logo.png", alt: "Vitamix 5200 on kitchen counter" },
      { src: "/logo.png", alt: "Vitamix 5200 blending smoothie" },
      { src: "/logo.png", alt: "Vitamix 5200 with accessories" }
    ],
    affiliateUrls: {
      amazon: "https://amazon.com/dp/B008H4SLV6?tag=your-tag-20",
      direct: "https://www.vitamix.com/us/en_us/shop/5200"
    },
    excerpt: "The Vitamix 5200 sets the gold standard for high-performance blending. After 6 months of daily restaurant use, this machine handled everything from frozen fruit smoothies to hot soups without missing a beat.",
    category: "appliances",
    scores: {
      performance: 10,
      durability: 9.8,
      easeOfUse: 9.7,
      valueROI: 9.6
    },
    specs: [
      "64 oz BPA-free container",
      "2+ HP motor (peak horsepower)",
      "Variable speed control (1-10)",
      "Self-cleaning capability",
      "7-year full warranty"
    ],
    testNotes: [
      "Blended 200+ smoothies without motor strain",
      "Hot soup reached 170°F in 6 minutes from frozen vegetables",
      "Nut butter consistency achieved in under 2 minutes",
      "Crushed ice to snow-like texture in 15 seconds",
      "Self-cleaning cycle works perfectly with drop of dish soap"
    ],
    comparison: {
      title: "Vitamix 5200 vs Basic Home Blender",
      items: [
        { feature: "Motor Power", r2: "2+ HP peak power", typical: "0.5 – 1 HP" },
        { feature: "Container Size", r2: "64 oz professional", typical: "32-48 oz" },
        { feature: "Blade Design", r2: "Hardened stainless steel", typical: "Basic stainless steel" },
        { feature: "Speed Control", r2: "Variable 1-10 + pulse", typical: "2-3 preset speeds" },
        { feature: "Build Quality", r2: "Commercial grade", typical: "Consumer grade" },
        { feature: "Warranty", r2: "7-year full warranty", typical: "1-2 year limited" }
      ]
    },
    roi: {
      paybackPeriod: "12-18 months for frequent users",
      details: "At $449, the Vitamix 5200 pays for itself through durability, versatility, and time savings. Professional-grade performance eliminates need for multiple appliances."
    },
    pros: [
      "Professional-grade motor handles any ingredient",
      "Versatile: smoothies, soups, nut butters, sauces, ice cream",
      "Built for decades of daily use",
      "Self-cleaning feature saves time",
      "7-year warranty shows manufacturer confidence"
    ],
    cons: [
      "Higher upfront investment ($449)",
      "Requires dedicated counter space",
      "Noise level noticeable at high speeds",
      "Learning curve for optimal speeds per recipe"
    ],
    faq: [
      {
        question: "Can the Vitamix 5200 crush ice effectively?",
        answer: "Absolutely. During testing, it crushed 2 cups of ice to snow-like consistency in 15 seconds. Perfect for frozen cocktails and smoothie bowls."
      },
      {
        question: "Is it suitable for professional kitchens?",
        answer: "Yes. We tested it in a high-volume café environment for 6 months. It handled 50+ smoothies daily without any performance decline."
      },
      {
        question: "How easy is it to clean?",
        answer: "Very easy. Fill container with warm water and drop of dish soap, run on high for 30-60 seconds, then rinse. Takes less than 2 minutes total."
      },
      {
        question: "Can it make hot soup?",
        answer: "Yes. The friction from the blades heats ingredients. We made tomato soup from fresh tomatoes that reached 170°F in 6 minutes."
      }
    ]
  }
};

export default function ProductPage({ params }: Props) {
  const { id } = params;
  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>Product Not Found</h1>
        <Link href="/appliances" style={{ backgroundColor: '#ea580c', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>
          Back to Appliances
        </Link>
      </div>
    );
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`https://chefapprovedtools.com${product.img}`, ...product.gallery.map(g => `https://chefapprovedtools.com${g.src}`)],
    description: product.excerpt,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: product.maxRating,
      ratingCount: product.reviewCount
    },
    offers: {
      "@type": "Offer",
      url: product.affiliateUrls.amazon,
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const trackClick = (source: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        'custom_parameter_1': product.id,
        'custom_parameter_2': source,
        'value': product.price
      });
    }
  };

  return (
    <article style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
      <Script id={`product-schema-${product.id}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(productSchema)}
      </Script>
      <Script id={`faq-schema-${product.id}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* Header */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>
          {product.name} — Chef-Tested Professional Review
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ea580c' }}>
            Rating: {product.rating}/{product.maxRating}
          </span>
          <span style={{ color: '#64748b' }}>
            Based on {product.reviewCount} professional tests
          </span>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Last updated: {product.lastUpdated}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Main Content */}
        <div>
          {/* Why It Matters */}
          <section style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
              Why the {product.name} Matters
            </h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#374151' }}>
              {product.excerpt}
            </p>
          </section>

          {/* Professional Test Results */}
          <section style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Professional Test Results & In-Kitchen Workflow
            </h2>
            <p style={{ marginBottom: '12px', color: '#374151' }}>Tested under real service conditions:</p>
            <ul style={{ paddingLeft: '20px' }}>
              {product.testNotes.map((note, index) => (
                <li key={index} style={{ marginBottom: '8px', color: '#374151' }}>{note}</li>
              ))}
            </ul>
          </section>

          {/* ROI Analysis (if exists) */}
          {product.roi && (
            <section style={{ backgroundColor: '#fef3c7', padding: '24px', borderRadius: '12px', border: '1px solid #fbbf24', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', color: '#92400e' }}>
                ROI & Operational Value
              </h2>
              <p style={{ color: '#92400e', lineHeight: '1.6' }}>
                <strong>Payback Period:</strong> {product.roi.paybackPeriod}
              </p>
              <p style={{ color: '#92400e', lineHeight: '1.6', marginTop: '8px' }}>
                {product.roi.details}
              </p>
            </section>
          )}

          {/* Comparison Table (if exists) */}
          {product.comparison && (
            <section style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
                {product.comparison.title}
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: 'bold' }}>Feature</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: 'bold', color: '#ea580c' }}>Robot Coupe R2</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: 'bold' }}>Typical Home Processor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.comparison.items.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px', fontWeight: '500' }}>{item.feature}</td>
                        <td style={{ padding: '12px', color: '#ea580c', fontWeight: '500' }}>{item.r2}</td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{item.typical}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Specifications */}
          <section style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Key Specifications
            </h2>
            <ul style={{ paddingLeft: '20px' }}>
              {product.specs.map((spec, index) => (
                <li key={index} style={{ marginBottom: '8px', color: '#374151' }}>{spec}</li>
              ))}
            </ul>
          </section>

          {/* Pros & Cons */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Honest Pros & Cons
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontWeight: 'bold', color: '#059669', marginBottom: '12px', fontSize: '1.125rem' }}>Pros</h3>
                <ul style={{ paddingLeft: '20px' }}>
                  {product.pros.map((pro, index) => (
                    <li key={index} style={{ marginBottom: '6px', color: '#374151' }}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontWeight: 'bold', color: '#dc2626', marginBottom: '12px', fontSize: '1.125rem' }}>Cons</h3>
                <ul style={{ paddingLeft: '20px' }}>
                  {product.cons.map((con, index) => (
                    <li key={index} style={{ marginBottom: '6px', color: '#374151' }}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Frequently Asked Questions
            </h2>
            <div>
              {product.faq.map((item, index) => (
                <details key={index} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '8px' }}>
                  <summary style={{ fontWeight: '600', cursor: 'pointer', color: '#1e293b' }}>
                    {item.question}
                  </summary>
                  <div style={{ marginTop: '12px', color: '#374151', lineHeight: '1.6' }}>
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: '80px', height: 'fit-content' }}>
          {/* Main Product Image */}
          <div style={{ marginBottom: '24px' }}>
            <Image
              src={product.img}
              alt={product.name}
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto', 
                borderRadius: '12px', 
                objectFit: 'cover',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
              }}
            />
          </div>

          {/* Score Breakdown */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '1.125rem' }}>
              Professional Score Breakdown
            </h3>
            <div>
              {Object.entries(product.scores).map(([key, score]) => (
                <div key={key} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span style={{ fontWeight: 'bold' }}>{score}/10</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '6px' }}>
                    <div 
                      style={{ 
                        width: `${score * 10}%`, 
                        backgroundColor: score >= 9.5 ? '#059669' : score >= 8 ? '#ea580c' : '#dc2626', 
                        height: '100%', 
                        borderRadius: '4px' 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Options */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {product.originalPrice && (
                  <span style={{ fontSize: '1rem', color: '#64748b', textDecoration: 'line-through' }}>
                    ${product.originalPrice}
                  </span>
                )}
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#dc2626', backgroundColor: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
                    SAVE ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Price updated {product.lastUpdated} • Prices may change
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href={product.affiliateUrls.amazon} 
                target="_blank" 
                rel="sponsored nofollow noopener"
                onClick={() => trackClick('amazon')}
                style={{ 
                  background: 'linear-gradient(45deg, #ff9900, #ffad33)',
                  color: 'white', 
                  padding: '14px 20px', 
                  borderRadius: '8px', 
                  textDecoration: 'none',
                  fontWeight: '700',
                  textAlign: 'center',
                  display: 'block',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(-1px)';
                  target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                🛒 Check Latest Price on Amazon
                <div style={{ fontSize: '0.75rem', opacity: '0.9', fontWeight: '400', marginTop: '2px' }}>
                  Free shipping with Prime
                </div>
              </a>
              
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: '#64748b', alignItems: 'center', justifyContent: 'center' }}>
                <span>✓ Free returns</span>
                <span>•</span>
                <span>✓ Customer protection</span>
                <span>•</span>
                <span style={{ color: '#ea580c' }}>Affiliate link</span>
              </div>
              
              <a 
                href={product.affiliateUrls.direct} 
                target="_blank" 
                rel="sponsored nofollow noopener"
                onClick={() => trackClick('direct')}
                style={{ 
                  border: '1px solid #d1d5db', 
                  color: '#374151', 
                  padding: '10px 16px', 
                  borderRadius: '6px', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  textAlign: 'center',
                  display: 'block',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.875rem'
                }}
              >
                Compare prices at {product.brand}
              </a>
            </div>
          </div>

          {/* Gallery Preview */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '1.125rem' }}>
              More Photos
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {product.gallery.slice(0, 4).map((img, index) => (
                <div key={index} style={{ position: 'relative', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}