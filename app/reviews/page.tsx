'use client';

import React from 'react';
import Link from 'next/link';

// Tier Badge Components
const Tier1Badge = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    color: '#000',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(255,215,0,0.3)',
    marginBottom: '12px'
  }}>
    <span style={{ fontSize: '18px' }}>🛡️</span>
    <span>TIER 1: Professional Kitchen Tested</span>
  </div>
);

const Tier2Badge: React.FC<{ testingPeriod: string }> = ({ testingPeriod }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(74,144,226,0.3)',
    marginBottom: '12px'
  }}>
    <span style={{ fontSize: '18px' }}>🏠</span>
    <span>TIER 2: Home Tested ({testingPeriod})</span>
  </div>
);

// Types
interface Review {
  id: number;
  tier: 1 | 2;
  testingPeriod?: string;
  name: string;
  slug: string;
  rating: number;
  hook: string;
  revenueScore: number;
  category: string;
}

// ALL 25 ACTUAL REVIEWS
const allReviews: Review[] = [
  // TIER 1 - Professional Kitchen Tested (16 reviews)
  {
    id: 1,
    tier: 1,
    name: 'KitchenAid KSM8990WH Commercial Mixer',
    slug: 'kitchenaid-ksm8990wh',
    rating: 4.8,
    testingPeriod: '18 months at Purple Café',
    hook: 'Survived 200+ covers nightly. Genuine commercial-grade performance.',
    revenueScore: 95,
    category: 'Commercial Equipment'
  },
  {
    id: 2,
    tier: 1,
    name: 'Vitamix 5200 Blender',
    slug: 'vitamix-5200',
    rating: 4.9,
    testingPeriod: '6 years in restaurant operations',
    hook: 'Restaurant workhorse. 10-year warranty justified by performance.',
    revenueScore: 92,
    category: 'Blenders'
  },
  {
    id: 3,
    tier: 1,
    name: 'Robot Coupe R2 Dice Food Processor',
    slug: 'robot-coupe-r2-dice',
    rating: 4.7,
    testingPeriod: '5 years commercial use',
    hook: 'Commercial power. Prep time reduced by 60% vs manual.',
    revenueScore: 88,
    category: 'Food Processors'
  },
  {
    id: 4,
    tier: 1,
    name: 'Victorinox Fibrox 8" Chef Knife',
    slug: 'victorinox-fibrox-8-inch-chefs-knife',
    rating: 4.8,
    testingPeriod: '15 years professional use',
    hook: 'Professional quality at accessible price. My daily knife.',
    revenueScore: 85,
    category: 'Knives'
  },
  {
    id: 5,
    tier: 1,
    name: 'Wusthof Classic Ikon 16 Piece Set',
    slug: 'wusthof-classic-ikon-16-piece',
    rating: 4.7,
    testingPeriod: 'Years at Purple Café',
    hook: 'Premium German steel. Professional performance.',
    revenueScore: 83,
    category: 'Knife Sets'
  },
  {
    id: 6,
    tier: 1,
    name: 'Victorinox Fibrox 10" Chef Knife',
    slug: 'victorinox-fibrox-10-inch-chefs-knife',
    rating: 4.7,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Longer blade for high-volume prep. Restaurant standard.',
    revenueScore: 80,
    category: 'Knives'
  },
  {
    id: 7,
    tier: 1,
    name: 'Diamond Crystal Kosher Salt',
    slug: 'diamond-crystal-kosher-salt',
    rating: 4.9,
    testingPeriod: '24 years (6 Purple Café + 18 home)',
    hook: 'Professional chef standard. Clean flavor, perfect texture.',
    revenueScore: 75,
    category: 'Ingredients'
  },
  {
    id: 8,
    tier: 1,
    name: 'Norton IM200 Tri-Stone Sharpener',
    slug: 'norton-im200-tri-stone-sharpener',
    rating: 4.6,
    testingPeriod: 'Years of professional use',
    hook: 'Professional sharpening system. Restaurant-grade edge.',
    revenueScore: 72,
    category: 'Knife Care'
  },
  {
    id: 9,
    tier: 1,
    name: 'Bodum Chambord French Press',
    slug: 'bodum-chambord-french-press',
    rating: 4.5,
    testingPeriod: 'Years at Purple Café',
    hook: 'Restaurant coffee standard. Simple, reliable design.',
    revenueScore: 68,
    category: 'Coffee'
  },
  {
    id: 10,
    tier: 1,
    name: 'Victorinox Offset Bread Knife',
    slug: 'victorinox-offset-bread-knife',
    rating: 4.6,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Offset design for clean slicing. Professional ergonomics.',
    revenueScore: 65,
    category: 'Knives'
  },
  {
    id: 11,
    tier: 1,
    name: 'Benriner Large Mandoline',
    slug: 'benriner-large-mandoline',
    rating: 4.5,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Japanese precision. Professional prep speed.',
    revenueScore: 62,
    category: 'Prep Tools'
  },
  {
    id: 12,
    tier: 1,
    name: 'OXO Good Grips Bench Scraper',
    slug: 'oxo-good-grips-bench-scraper',
    rating: 4.7,
    testingPeriod: 'Daily professional use',
    hook: 'Most-used tool. Dough handling essential.',
    revenueScore: 60,
    category: 'Baking Tools'
  },
  {
    id: 13,
    tier: 1,
    name: 'OXO Good Grips Swivel Peeler',
    slug: 'oxo-good-grips-swivel-peeler',
    rating: 4.6,
    testingPeriod: 'Years of professional prep',
    hook: 'Sharp blade. Comfortable grip. Prep station standard.',
    revenueScore: 58,
    category: 'Prep Tools'
  },
  {
    id: 14,
    tier: 1,
    name: 'Victorinox 4" Paring Knife',
    slug: 'victorinox-4-inch-paring-knife',
    rating: 4.6,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Precision work. Professional quality at budget price.',
    revenueScore: 56,
    category: 'Knives'
  },
  {
    id: 15,
    tier: 1,
    name: 'Victorinox Granton Edge Boning Knife',
    slug: 'victorinox-granton-edge-boning-knife',
    rating: 4.5,
    testingPeriod: 'Professional butchering tested',
    hook: 'Granton edge reduces drag. Professional precision.',
    revenueScore: 54,
    category: 'Knives'
  },
  {
    id: 16,
    tier: 1,
    name: 'ZUPERIA Bar Mops',
    slug: 'zuperia-bar-mops',
    rating: 4.8,
    testingPeriod: 'Years at Purple Café',
    hook: 'Industry standard. 100% ring spun cotton. Restaurant grade.',
    revenueScore: 50,
    category: 'Kitchen Textiles'
  },

  // TIER 2 - Home Tested (11 reviews)
  {
    id: 17,
    tier: 2,
    testingPeriod: '10 Years',
    name: 'Le Creuset 7.25-Qt Dutch Oven',
    slug: 'le-creuset-signature-7-25-qt-dutch-oven',
    rating: 4.9,
    hook: 'Buy-it-for-life cookware. Zero staining after a decade.',
    revenueScore: 90,
    category: 'Cookware'
  },
  {
    id: 18,
    tier: 2,
    testingPeriod: '18 Years',
    name: 'John Boos Platinum Cutting Board',
    slug: 'john-boos-platinum-commercial-cutting-board',
    rating: 4.8,
    hook: 'Commercial-grade maple. Used managing $80K+ operations.',
    revenueScore: 87,
    category: 'Cutting Boards'
  },
  {
    id: 19,
    tier: 2,
    testingPeriod: '12 Years',
    name: 'Lodge Cast Iron 3-Skillet Bundle',
    slug: 'lodge-seasoned-cast-iron-3-skillet-bundle',
    rating: 4.7,
    hook: 'Generational cookware at 1/5 Le Creuset price.',
    revenueScore: 78,
    category: 'Cookware'
  },
  {
    id: 20,
    tier: 2,
    testingPeriod: '8 Years',
    name: 'KitchenAid KP26M1XLC Professional 600',
    slug: 'kitchenaid-kp26m1xlc-professional-600',
    rating: 4.6,
    hook: 'Home baker favorite. Powerful 575-watt motor.',
    revenueScore: 76,
    category: 'Mixers'
  },
  {
    id: 21,
    tier: 2,
    testingPeriod: '9 Years',
    name: 'Nordic Ware Half Sheet Pan',
    slug: 'nordic-ware-half-sheet-pan',
    rating: 4.7,
    hook: 'Never warped. Even browning for 9 years straight.',
    revenueScore: 70,
    category: 'Bakeware'
  },
  {
    id: 22,
    tier: 2,
    testingPeriod: '7 Years',
    name: 'Cuisinart DLC-10C Classic Food Processor',
    slug: 'cuisinart-dlc-10c-classic-food-processor',
    rating: 4.5,
    hook: 'Home kitchen workhorse. Reliable performance.',
    revenueScore: 68,
    category: 'Food Processors'
  },
  {
    id: 23,
    tier: 2,
    testingPeriod: '5 Years',
    name: 'Black+Decker Toaster Oven',
    slug: 'black-decker-toaster-oven',
    rating: 4.4,
    hook: 'Budget-friendly. Reliable everyday performance.',
    revenueScore: 55,
    category: 'Small Appliances'
  },
  {
    id: 24,
    tier: 2,
    testingPeriod: '6 Years',
    name: 'Epicurean Kitchen Cutting Board',
    slug: 'epicurean-kitchen-cutting-board',
    rating: 4.5,
    hook: 'Composite material. Dishwasher-safe convenience.',
    revenueScore: 52,
    category: 'Cutting Boards'
  },
  {
    id: 25,
    tier: 2,
    testingPeriod: '8 Years',
    name: 'Winco Heavy Duty Tongs',
    slug: 'winco-heavy-duty-tongs',
    rating: 4.6,
    hook: 'Locking mechanism works. Durable stainless steel.',
    revenueScore: 48,
    category: 'Utensils'
  },
  {
    id: 26,
    tier: 2,
    testingPeriod: '6 Months',
    name: 'Cuisinart High Impact 8" Nonstick Pan',
    slug: 'cuisinart-8-inch-nonstick-pan',
    rating: 4.7,
    hook: 'Perfect for eggs. Even heat distribution. Ideal for single servings.',
    revenueScore: 74,
    category: 'Cookware'
  },
  {
    id: 27,
    tier: 2,
    testingPeriod: '5 Years',
    name: 'Method All-Purpose Cleaner',
    slug: 'method-all-purpose-cleaner',
    rating: 4.8,
    hook: 'The unicorn of cleaners. Powerful AND non-toxic. Cuts grease effortlessly.',
    revenueScore: 66,
    category: 'Cleaning'
  }
];

// Sort by revenue score
const sortedReviews = [...allReviews].sort((a, b) => b.revenueScore - a.revenueScore);

// Get featured (top 6 Tier 1 by revenue)
const featuredReviews = sortedReviews.filter(r => r.tier === 1).slice(0, 6);

// Review Card Component
const ReviewCard: React.FC<{ review: Review; featured?: boolean }> = ({ review, featured = false }) => {
  return (
    <div 
      className="review-card"
      style={{
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      
      {/* Tier Badge */}
      {review.tier === 1 ? (
        <Tier1Badge />
      ) : (
        <Tier2Badge testingPeriod={review.testingPeriod || ''} />
      )}
      
      {/* Category Tag */}
      <div style={{
        fontSize: '12px',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '8px',
        fontWeight: '600'
      }}>
        {review.category}
      </div>
      
      {/* Product Name */}
      <h3 style={{
        fontSize: featured ? '22px' : '18px',
        fontWeight: '700',
        margin: '0 0 12px 0',
        lineHeight: '1.4',
        color: '#1a1a1a'
      }}>
        {review.name}
      </h3>
      
      {/* Rating */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <div style={{ color: '#FFD700', fontSize: '18px' }}>
          {'★'.repeat(Math.floor(review.rating))}
          {review.rating % 1 !== 0 && '½'}
          {'☆'.repeat(5 - Math.ceil(review.rating))}
        </div>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: 'bold',
          color: '#333'
        }}>
          {review.rating}/5
        </span>
      </div>
      
      {/* Testing Period */}
      <div style={{
        background: '#f8f9fa',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#555',
        marginBottom: '12px',
        fontStyle: 'italic'
      }}>
        📊 Tested: {review.testingPeriod}
      </div>
      
      {/* Hook */}
      <p style={{
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#555',
        margin: '0 0 20px 0',
        flex: 1
      }}>
        {review.hook}
      </p>
      
      {/* CTA Button */}
      <Link
        href={`/reviews/${review.slug}`}
        style={{
          display: 'block',
          background: '#28a745',
          color: 'white',
          padding: '12px 24px',
          textAlign: 'center',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '15px',
          transition: 'background 0.2s'
        }}
      >
        Read Full Review →
      </Link>
    </div>
  );
};

// Main Component
export default function ReviewsHub() {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'tier1' | 'tier2'>('all');
  
  // Filter reviews based on active filter
  const filteredReviews = activeFilter === 'all' 
    ? sortedReviews 
    : sortedReviews.filter(r => 
        activeFilter === 'tier1' ? r.tier === 1 : r.tier === 2
      );
  
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          margin: '0 0 16px 0',
          color: '#1a1a1a'
        }}>
          Professional Kitchen Equipment Reviews
        </h1>
        <p style={{
          fontSize: '20px',
          lineHeight: '1.6',
          color: '#555',
          margin: 0
        }}>
          40 years of cooking experience. 21+ years restaurant management. 
          Real testing in professional kitchens where equipment failure means lost revenue.
        </p>
      </div>
      
      {/* Featured Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: 0,
            color: '#1a1a1a'
          }}>
            🔥 Featured: Professional Kitchen Tested
          </h2>
        </div>
        
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          These 6 products survived the most demanding commercial environments. 
          Equipment failure in a restaurant means lost revenue—these tools never failed.
        </p>
        
        {/* Featured Grid - 2 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '30px'
        }}>
          {featuredReviews.map(review => (
            <ReviewCard key={review.id} review={review} featured={true} />
          ))}
        </div>
      </section>
      
      {/* All Reviews Section */}
      <section>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: 0,
            color: '#1a1a1a'
          }}>
            All Reviews ({filteredReviews.length})
          </h2>
          
          {/* Filter Pills */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => setActiveFilter('all')}
              style={{
                padding: '8px 16px',
                background: activeFilter === 'all' ? '#0066cc' : '#f0f0f0',
                color: activeFilter === 'all' ? 'white' : '#333',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              All Reviews
            </button>
            <button 
              onClick={() => setActiveFilter('tier1')}
              style={{
                padding: '8px 16px',
                background: activeFilter === 'tier1' ? '#0066cc' : '#f0f0f0',
                color: activeFilter === 'tier1' ? 'white' : '#333',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Professional Tested (16)
            </button>
            <button
              onClick={() => setActiveFilter('tier2')}
              style={{
                padding: '8px 16px',
                background: activeFilter === 'tier2' ? '#0066cc' : '#f0f0f0',
                color: activeFilter === 'tier2' ? 'white' : '#333',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Home Tested (11)
            </button>
          </div>
        </div>
        
        {/* All Reviews Grid - 3 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {filteredReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
      
      {/* Call to Action Footer */}
      <div style={{
        marginTop: '80px',
        padding: '40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h3 style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 16px 0'
        }}>
          Can&apos;t Find What You&apos;re Looking For?
        </h3>
        <p style={{
          fontSize: '18px',
          margin: '0 0 24px 0',
          lineHeight: '1.6'
        }}>
          Get personalized equipment recommendations based on your specific needs and budget.
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-block',
            background: 'white',
            color: '#667eea',
            padding: '14px 32px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Contact Scott →
        </Link>
      </div>
      
    </div>
  );
}