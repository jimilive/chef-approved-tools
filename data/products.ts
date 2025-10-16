import { Product, ProductCollection } from '@/types/product'

// Sample product data with enhanced structure
export const sampleProducts: ProductCollection = {
  knives: [
    {
      id: 'wusthof-classic-8',
      slug: 'wusthof-classic-8-chef-knife',
      name: "Wüsthof Classic 8-Inch Chef's Knife",
      brand: 'Wüsthof',
      model: '4582/20',
      category: 'knives',
      subcategory: 'chef-knives',
      
      
      inStock: true,
      availability: 'Usually ships within 24 hours',
      
      affiliateLinks: [
        {
          url: 'https://amzn.to/3KtlPYS',
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          lastChecked: new Date().toISOString()
        }
      ],
      vendors: [
        {
          name: 'Amazon',
          url: 'https://amzn.to/3KtlPYS',
          price: 149.95,
          originalPrice: 179.95,
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          inStock: true,
          lastChecked: new Date().toISOString(),
          commissionRate: 4.5
        },
        {
          name: 'Williams Sonoma',
          url: '#', // Replace with actual ShareASale link
          price: 169.95,
          merchant: 'williams-sonoma',
          inStock: true,
          lastChecked: new Date().toISOString(),
          commissionRate: 8.0
        },
        {
          name: 'Sur La Table',
          url: '#', // Replace with actual affiliate link
          price: 159.95,
          merchant: 'sur-la-table',
          inStock: true,
          lastChecked: new Date().toISOString(),
          commissionRate: 6.0
        }
      ],
      primaryAffiliate: 'amazon',
      
      reviews: {
        rating: 4.8,
        count: 3421,
        verified: true,
        source: 'Amazon',
        lastUpdated: new Date().toISOString()
      },
      
      expertRating: 4.9,
      
      pros: [
        'Exceptional edge retention',
        'Perfect 14-degree angle per side',
        'Full tang construction for durability',
        'Comfortable polymer handle',
        'Professional-grade German steel'
      ],
      
      cons: [
        'Premium price point',
        'Requires regular maintenance',
        'Heavier than Japanese alternatives'
      ],
      
      description: 'The gold standard for professional kitchens worldwide. This knife has been my daily driver for 3+ years.',
      
      expertOpinion: 'After using this knife daily in restaurant settings handling 200+ covers per night, I can confidently say it\'s worth every penny. The edge retention is remarkable - I only need to hone it every few days even with heavy use. The weight and balance make it perfect for everything from mincing herbs to breaking down whole chickens.',
      
      usageScenarios: [
        'Daily meal prep',
        'Professional kitchen use',
        'Breaking down proteins',
        'Precision vegetable work'
      ],
      
      alternatives: [
        'victorinox-fibrox-8',
        'miyabi-birchwood-8'
      ],
      
      images: {
        primary: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200',
        gallery: [
          'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200',
          'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1200'
        ],
        alt: 'Wüsthof Classic 8-inch chef knife on cutting board'
      },
      
      tags: ['chef-knife', 'german-steel', 'professional', 'full-tang', 'bestseller'],
      
      specifications: {
        'blade-length': '8 inches',
        'total-length': '13 inches',
        'blade-material': 'High-carbon stainless steel',
        'handle-material': 'Synthetic polymer',
        'hardness': '58 HRC',
        'weight': '8.5 oz',
        'edge-angle': '14 degrees per side',
        'origin': 'Solingen, Germany'
      },
      
      featured: true,
      bestFor: ['Professional chefs', 'Serious home cooks', 'Daily use'],
      
      dateAdded: '2024-01-15T00:00:00Z',
      lastUpdated: new Date().toISOString(),
      updateFrequency: 'weekly'
    },
    {
      id: 'victorinox-fibrox-8',
      slug: 'victorinox-fibrox-pro-8-chef-knife',
      name: 'Victorinox Fibrox Pro 8-Inch Chef\'s Knife',
      brand: 'Victorinox',
      model: '5.2063.20',
      category: 'knives',
      subcategory: 'chef-knives',


      inStock: true,
      availability: 'In stock',

      affiliateLinks: [
        {
          url: 'https://amzn.to/4bIa2lg',
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          lastChecked: new Date().toISOString()
        }
      ],
      vendors: [
        {
          name: 'Amazon',
          url: 'https://amzn.to/4bIa2lg',
          price: 45.99,
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          inStock: true,
          lastChecked: new Date().toISOString(),
          commissionRate: 4.5
        },
        {
          name: 'Williams Sonoma',
          url: '#', // Replace with actual ShareASale link
          price: 49.95,
          merchant: 'williams-sonoma',
          inStock: true,
          lastChecked: new Date().toISOString(),
          commissionRate: 8.0
        },
        {
          name: 'Sur La Table',
          url: '#', // Replace with actual affiliate link
          price: 47.95,
          merchant: 'sur-la-table',
          inStock: true,
          lastChecked: new Date().toISOString(),
          commissionRate: 6.0
        }
      ],
      primaryAffiliate: 'amazon',
      
      reviews: {
        rating: 4.6,
        count: 8923,
        verified: true,
        source: 'Amazon',
        lastUpdated: new Date().toISOString()
      },
      
      expertRating: 4.5,
      
      pros: [
        'Incredible value for money',
        'NSF certified for commercial use',
        'Lightweight and agile',
        'Non-slip Fibrox handle',
        'Dishwasher safe (though not recommended)'
      ],
      
      cons: [
        'Requires more frequent sharpening',
        'Handle less premium feeling',
        'Stamped blade, not forged'
      ],
      
      description: 'The workhorse of professional kitchens. This is what we use for prep work at the restaurant.',
      
      expertOpinion: 'Don\'t let the price fool you - this knife punches way above its weight. We have a dozen of these in our restaurant for prep work, and they take incredible abuse while maintaining performance. Perfect for home cooks who want professional quality without the premium price.',
      
      usageScenarios: [
        'High-volume prep work',
        'Budget-conscious shopping',
        'Culinary school',
        'First professional knife'
      ],
      
      alternatives: [
        'wusthof-classic-8',
        'mercer-culinary-genesis-8'
      ],
      
      images: {
        primary: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1200',
        alt: 'Victorinox Fibrox Pro chef knife'
      },
      
      tags: ['chef-knife', 'budget', 'swiss', 'nsf-certified', 'lightweight'],
      
      specifications: {
        'blade-length': '8 inches',
        'total-length': '12.75 inches',
        'blade-material': 'High-carbon stainless steel',
        'handle-material': 'Thermoplastic elastomer',
        'weight': '4.6 oz',
        'nsf-certified': 'Yes',
        'origin': 'Switzerland'
      },
      
      featured: true,
      bestFor: ['Budget shoppers', 'Culinary students', 'High-volume prep'],
      
      dateAdded: '2024-01-20T00:00:00Z',
      lastUpdated: new Date().toISOString(),
      updateFrequency: 'weekly'
    }
  ],
  
  cookware: [
    {
      id: 'all-clad-d3-12',
      slug: 'all-clad-d3-stainless-12-fry-pan',
      name: 'All-Clad D3 Stainless 12-Inch Fry Pan',
      brand: 'All-Clad',
      model: 'BD55112',
      category: 'cookware',
      subcategory: 'fry-pans',
      
      
      inStock: true,
      availability: 'Usually ships within 2-3 days',
      
      affiliateLinks: [
        {
          url: 'https://amzn.to/4ejb3eZ',
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          lastChecked: new Date().toISOString()
        }
      ],
      primaryAffiliate: 'amazon',
      
      reviews: {
        rating: 4.7,
        count: 2156,
        verified: true,
        source: 'Amazon',
        lastUpdated: new Date().toISOString()
      },
      
      expertRating: 4.8,
      
      pros: [
        'Even heat distribution',
        'Oven safe to 600°F',
        'Lifetime warranty',
        'Compatible with all cooktops',
        'Professional-grade construction'
      ],
      
      cons: [
        'Learning curve for stainless',
        'Premium price point',
        'Requires proper preheating'
      ],
      
      description: 'The pan we use at Purple Café for perfect searing. Built to last a lifetime.',
      
      expertOpinion: 'This is the pan that taught me how to cook properly with stainless steel. Once you master the preheating technique, nothing beats it for developing fond and creating restaurant-quality sauces. The tri-ply construction ensures no hot spots.',
      
      usageScenarios: [
        'Searing proteins',
        'Making pan sauces',
        'Sautéing vegetables',
        'Oven finishing'
      ],
      
      alternatives: [
        'tramontina-tri-ply-12',
        'made-in-stainless-12'
      ],
      
      images: {
        primary: 'https://images.unsplash.com/photo-1604909052743-89c5a74e83d7?q=80&w=1200',
        alt: 'All-Clad D3 stainless steel fry pan'
      },
      
      tags: ['fry-pan', 'stainless-steel', 'tri-ply', 'professional', 'oven-safe'],
      
      specifications: {
        'diameter': '12 inches',
        'material': 'Tri-ply stainless steel',
        'core': 'Aluminum',
        'oven-safe': '600°F',
        'dishwasher-safe': 'Yes',
        'induction-compatible': 'Yes',
        'weight': '3.5 lbs',
        'origin': 'USA'
      },
      
      featured: true,
      bestFor: ['Searing', 'Professional cooking', 'Lifetime investment'],
      
      dateAdded: '2024-02-01T00:00:00Z',
      lastUpdated: new Date().toISOString(),
      updateFrequency: 'weekly'
    }
  ],
  
  appliances: [
    {
      id: 'vitamix-5200',
      slug: 'vitamix-5200-professional-blender',
      name: 'Vitamix 5200 Professional Blender',
      brand: 'Vitamix',
      model: '001372',
      category: 'appliances',
      subcategory: 'blenders',
      
      
      inStock: true,
      availability: 'In stock',
      
      affiliateLinks: [
        {
          url: 'https://amzn.to/4e6GceC',
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          lastChecked: new Date().toISOString()
        }
      ],
      primaryAffiliate: 'amazon',
      
      reviews: {
        rating: 4.9,
        count: 5432,
        verified: true,
        source: 'Amazon',
        lastUpdated: new Date().toISOString()
      },
      
      expertRating: 5.0,
      
      pros: [
        'Restaurant-grade power',
        '7-year warranty',
        'Variable speed control',
        'Self-cleaning function',
        'Makes hot soup from friction'
      ],
      
      cons: [
        'Loud operation',
        'Large footprint',
        'High initial investment'
      ],
      
      description: 'The blender used in our restaurant for everything from smoothies to soups.',
      
      expertOpinion: 'After burning through three consumer blenders in our restaurant, we invested in Vitamix and never looked back. This machine handles 50+ smoothies daily without breaking a sweat. The ability to make everything from nut butters to hot soup makes it indispensable.',
      
      usageScenarios: [
        'Smoothies and shakes',
        'Hot soups',
        'Nut butters',
        'Frozen desserts',
        'Grain milling'
      ],
      
      alternatives: [
        'blendtec-designer-650',
        'vitamix-e310'
      ],
      
      images: {
        primary: 'https://images.unsplash.com/photo-1585515656642-6a3da3be92f7?q=80&w=1200',
        alt: 'Vitamix 5200 professional blender'
      },
      
      tags: ['blender', 'professional', 'high-power', 'vitamix', 'commercial-grade'],
      
      specifications: {
        'motor': '2.0 HP',
        'capacity': '64 oz',
        'speeds': 'Variable 1-10 + Pulse',
        'warranty': '7 years',
        'dimensions': '20.5" x 8.75" x 7.25"',
        'weight': '10.5 lbs',
        'blade': 'Aircraft-grade stainless steel',
        'origin': 'USA'
      },
      
      featured: true,
      bestFor: ['Smoothie enthusiasts', 'Professional use', 'Health-conscious cooks'],
      
      dateAdded: '2024-01-25T00:00:00Z',
      lastUpdated: new Date().toISOString(),
      updateFrequency: 'weekly'
    }
  ],
  
  tools: [],
  baking: [],
  storage: []
}