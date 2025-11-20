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
          label: 'Amazon',
          is_primary: true,
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
      slug: 'victorinox-fibrox-8-inch-chefs-knife',
      name: 'Victorinox Fibrox Pro 8-Inch Chef\'s Knife',
      brand: 'Victorinox',
      model: '5.2063.20',
      category: 'knives',
      subcategory: 'chef-knives',

      inStock: true,
      availability: 'In stock',

      affiliateLinks: [
        {
          url: 'https://amzn.to/4o7BUSV',
          merchant: 'amazon',
          label: 'Amazon',
          is_primary: true,
          tag: 'chefapprovedt-20',
          lastChecked: '2025-10-14T00:00:00Z'
        }
      ],
      vendors: [
        {
          name: 'Amazon',
          url: 'https://amzn.to/4o7BUSV',
          price: 45.99,
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          inStock: true,
          lastChecked: '2025-10-14T00:00:00Z',
          commissionRate: 4.5
        }
      ],
      primaryAffiliate: 'amazon',

      reviews: {
        rating: 4.8,
        count: 8923,
        verified: true,
        source: 'Amazon',
        lastUpdated: '2025-10-14T00:00:00Z'
      },

      expertRating: 5.0,

      pros: [
        'Perfect size for 80% of kitchen tasks',
        'Professional quality at accessible pricing',
        'Exceptionally well-balanced and maneuverable',
        'Holds edge well with regular honing',
        'Comfortable grip for extended use',
        'Used in professional kitchens worldwide'
      ],

      cons: [
        'Not ideal for very large cuts (use 10-inch for that)',
        'Plain appearance (no fancy damascus patterns)',
        'Lightweight feel may not appeal to everyone',
        'Plastic handle lacks luxury aesthetic'
      ],

      description: 'The workhorse knife that handles 80% of kitchen tasks. More maneuverable than the 10-inch model, perfect for most home cooking tasks.',

      expertOpinion: 'After 20 years of daily professional use, the Victorinox 8-inch chef\'s knife remains my workhorse blade. The thin, flexible blade delivers professional control, the fibrox handle prevents hand fatigue, and the edge retention rivals knives costing several times more.',

      usageScenarios: [
        'Daily meal prep',
        'High-volume prep work',
        'Professional kitchen use',
        'Budget-conscious shopping'
      ],

      alternatives: [
        'victorinox-fibrox-10-inch-chefs-knife',
        'wusthof-classic-8'
      ],

      images: {
        primary: 'https://www.chefapprovedtools.com/images/products/victorinox-fibrox-8-inch-chefs-knife/primary.jpg',
        alt: 'Victorinox Fibrox Pro 8-inch chef knife'
      },

      tags: ['chef-knife', 'budget', 'swiss', 'nsf-certified', 'lightweight', 'professional'],

      specifications: {
        'blade-length': '8 inches',
        'total-length': '12.75 inches',
        'blade-material': 'High-carbon stainless steel',
        'handle-material': 'Thermoplastic elastomer (Fibrox)',
        'weight': '4.6 oz',
        'nsf-certified': 'Yes',
        'origin': 'Switzerland'
      },

      featured: true,
      bestFor: ['Home cooks', 'Professional chefs', 'Budget shoppers', 'Culinary students'],

      dateAdded: '2025-10-13T00:00:00Z',
      lastUpdated: '2025-10-14T00:00:00Z',
      updateFrequency: 'weekly'
    },
    {
      id: 'victorinox-fibrox-10',
      slug: 'victorinox-fibrox-10-inch-chefs-knife',
      name: 'Victorinox Fibrox Pro 10-Inch Chef\'s Knife',
      brand: 'Victorinox',
      model: '5.2063.25',
      category: 'knives',
      subcategory: 'chef-knives',

      inStock: true,
      availability: 'In stock',

      affiliateLinks: [
        {
          url: 'https://amzn.to/4o6pPwW',
          merchant: 'amazon',
          label: 'Amazon',
          is_primary: true,
          tag: 'chefapprovedt-20',
          lastChecked: '2025-10-14T00:00:00Z'
        }
      ],
      vendors: [
        {
          name: 'Amazon',
          url: 'https://amzn.to/4o6pPwW',
          price: 48.99,
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          inStock: true,
          lastChecked: '2025-10-14T00:00:00Z',
          commissionRate: 4.5
        }
      ],
      primaryAffiliate: 'amazon',

      reviews: {
        rating: 5.0,
        count: 6234,
        verified: true,
        source: 'Amazon',
        lastUpdated: '2025-10-14T00:00:00Z'
      },

      expertRating: 5.0,

      pros: [
        'Longer blade perfect for larger cuts',
        'Ideal for breaking down proteins',
        'Professional quality at accessible pricing',
        'Same exceptional edge retention as 8-inch',
        'NSF certified for commercial use'
      ],

      cons: [
        'Less maneuverable than 8-inch for detailed work',
        'Requires more counter space',
        'May feel too large for some users'
      ],

      description: 'The longer blade is perfect for larger cuts and if you have bigger hands. I keep both sizes.',

      expertOpinion: 'This is the knife I grab for breaking down proteins and chopping larger vegetables. The extra 2 inches makes a real difference when you\'re working fast.',

      usageScenarios: [
        'Breaking down whole chickens',
        'Large vegetable prep',
        'Bulk meal prep',
        'Professional kitchen use'
      ],

      alternatives: [
        'victorinox-fibrox-8-inch-chefs-knife',
        'wusthof-classic-10'
      ],

      images: {
        primary: 'https://www.chefapprovedtools.com/images/products/victorinox-fibrox-10-inch-chefs-knife/primary.jpg',
        alt: 'Victorinox Fibrox Pro 10-inch chef knife'
      },

      tags: ['chef-knife', 'budget', 'swiss', 'nsf-certified', 'professional', 'large-blade'],

      specifications: {
        'blade-length': '10 inches',
        'total-length': '14.75 inches',
        'blade-material': 'High-carbon stainless steel',
        'handle-material': 'Thermoplastic elastomer (Fibrox)',
        'weight': '5.3 oz',
        'nsf-certified': 'Yes',
        'origin': 'Switzerland'
      },

      featured: true,
      bestFor: ['Professional chefs', 'Bulk prep', 'Large kitchens'],

      dateAdded: '2025-10-13T00:00:00Z',
      lastUpdated: '2025-10-14T00:00:00Z',
      updateFrequency: 'weekly'
    },
    {
      id: 'victorinox-offset-bread',
      slug: 'victorinox-offset-bread-knife',
      name: 'Victorinox Offset Bread Knife',
      brand: 'Victorinox',
      model: '5.2533.21',
      category: 'knives',
      subcategory: 'bread-knives',

      inStock: true,
      availability: 'In stock',

      affiliateLinks: [
        {
          url: 'https://amzn.to/4nAIR4F',
          merchant: 'amazon',
          label: 'Amazon',
          is_primary: true,
          tag: 'chefapprovedt-20',
          lastChecked: '2025-10-14T00:00:00Z'
        }
      ],
      vendors: [
        {
          name: 'Amazon',
          url: 'https://amzn.to/4nAIR4F',
          price: 42.99,
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          inStock: true,
          lastChecked: '2025-10-14T00:00:00Z',
          commissionRate: 4.5
        }
      ],
      primaryAffiliate: 'amazon',

      reviews: {
        rating: 4.7,
        count: 3421,
        verified: true,
        source: 'Amazon',
        lastUpdated: '2025-10-14T00:00:00Z'
      },

      expertRating: 4.9,

      pros: [
        'Offset handle keeps knuckles off cutting board',
        'Serrated edge never needs sharpening',
        'Perfect for bread, tomatoes, and cakes',
        'Comfortable ergonomic design',
        'Professional quality at accessible pricing'
      ],

      cons: [
        'Cannot be sharpened (serrated edge)',
        'Larger than standard bread knives',
        'May be too long for small kitchens'
      ],

      description: 'Offset handle keeps knuckles off the cutting board. Serrated edge never needs sharpening.',

      expertOpinion: 'Bread, tomatoes, cakes - anything with a delicate exterior. The offset design is a game-changer for comfort.',

      usageScenarios: [
        'Slicing bread',
        'Cutting tomatoes',
        'Slicing cakes',
        'Delicate pastries'
      ],

      alternatives: [
        'wusthof-classic-bread-knife'
      ],

      images: {
        primary: 'https://www.chefapprovedtools.com/images/products/victorinox-offset-bread-knife/primary.jpg',
        alt: 'Victorinox offset serrated bread knife'
      },

      tags: ['bread-knife', 'serrated', 'offset-handle', 'swiss', 'professional'],

      specifications: {
        'blade-length': '8 inches',
        'total-length': '13 inches',
        'blade-material': 'High-carbon stainless steel',
        'handle-material': 'Thermoplastic elastomer (Fibrox)',
        'edge-type': 'Serrated',
        'offset': 'Yes',
        'origin': 'Switzerland'
      },

      featured: true,
      bestFor: ['Bread bakers', 'Home cooks', 'Professional kitchens'],

      dateAdded: '2025-10-13T00:00:00Z',
      lastUpdated: '2025-10-14T00:00:00Z',
      updateFrequency: 'weekly'
    },
    {
      id: 'victorinox-granton-boning',
      slug: 'victorinox-granton-edge-boning-knife',
      name: 'Victorinox Granton Edge Boning Knife',
      brand: 'Victorinox',
      model: '5.6613.15',
      category: 'knives',
      subcategory: 'boning-knives',

      inStock: true,
      availability: 'In stock',

      affiliateLinks: [
        {
          url: 'https://amzn.to/4pUDed1',
          merchant: 'amazon',
          label: 'Amazon',
          is_primary: true,
          tag: 'chefapprovedt-20',
          lastChecked: '2025-10-14T00:00:00Z'
        }
      ],
      vendors: [
        {
          name: 'Amazon',
          url: 'https://amzn.to/4pUDed1',
          price: 29.99,
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          inStock: true,
          lastChecked: '2025-10-14T00:00:00Z',
          commissionRate: 4.5
        }
      ],
      primaryAffiliate: 'amazon',

      reviews: {
        rating: 4.7,
        count: 2134,
        verified: true,
        source: 'Amazon',
        lastUpdated: '2025-10-14T00:00:00Z'
      },

      expertRating: 4.7,

      pros: [
        'Firm blade gets close to bones',
        'Granton edge prevents sticking',
        'Great for filleting smaller fish',
        'Comfortable grip for detailed work',
        'Professional quality at budget price'
      ],

      cons: [
        'Too stiff for some filleting tasks',
        'Requires practice to master',
        'Not ideal for very large cuts of meat'
      ],

      description: 'Firm blade gets close to bones. Also great for filleting smaller fish.',

      expertOpinion: 'Breaking down a whole chicken takes 3 minutes with this knife. The granton edge prevents sticking.',

      usageScenarios: [
        'Breaking down whole chickens',
        'Filleting fish',
        'Trimming fat from meat',
        'Detailed butchery work'
      ],

      alternatives: [
        'wusthof-classic-boning-knife'
      ],

      images: {
        primary: 'https://www.chefapprovedtools.com/images/products/victorinox-granton-edge-boning-knife/primary.jpg',
        alt: 'Victorinox Granton edge boning knife'
      },

      tags: ['boning-knife', 'granton-edge', 'swiss', 'professional', 'butchery'],

      specifications: {
        'blade-length': '6 inches',
        'total-length': '11 inches',
        'blade-material': 'High-carbon stainless steel',
        'handle-material': 'Thermoplastic elastomer (Fibrox)',
        'blade-flexibility': 'Firm',
        'granton-edge': 'Yes',
        'origin': 'Switzerland'
      },

      featured: true,
      bestFor: ['Home butchers', 'Hunters', 'Professional kitchens'],

      dateAdded: '2025-10-13T00:00:00Z',
      lastUpdated: '2025-10-14T00:00:00Z',
      updateFrequency: 'weekly'
    },
    {
      id: 'victorinox-paring',
      slug: 'victorinox-paring-knife',
      name: 'Victorinox 4" Paring Knife',
      brand: 'Victorinox',
      model: '5.0703',
      category: 'knives',
      subcategory: 'paring-knives',

      inStock: true,
      availability: 'In stock',

      affiliateLinks: [
        {
          url: 'https://amzn.to/4gVm0Le',
          merchant: 'amazon',
          label: 'Amazon',
          is_primary: true,
          tag: 'chefapprovedt-20',
          lastChecked: '2025-10-14T00:00:00Z'
        }
      ],
      vendors: [
        {
          name: 'Amazon',
          url: 'https://amzn.to/4gVm0Le',
          price: 9.99,
          merchant: 'amazon',
          tag: 'chefapprovedt-20',
          inStock: true,
          lastChecked: '2025-10-14T00:00:00Z',
          commissionRate: 4.5
        }
      ],
      primaryAffiliate: 'amazon',

      reviews: {
        rating: 4.9,
        count: 12453,
        verified: true,
        source: 'Amazon',
        lastUpdated: '2025-10-14T00:00:00Z'
      },

      expertRating: 4.9,

      pros: [
        'Essential for detailed work',
        'Perfect for peeling, trimming, deveining shrimp',
        'Extremely sharp out of box',
        'Accessible pricing',
        'NSF certified'
      ],

      cons: [
        'Small size not suitable for large tasks',
        'Plain handle design',
        'Requires careful storage (blade exposed)'
      ],

      description: 'Essential for detailed work - peeling, trimming, deveining shrimp.',

      expertOpinion: 'You can\'t do precision work with a chef\'s knife. This little guy handles everything from garlic to strawberries.',

      usageScenarios: [
        'Peeling fruit and vegetables',
        'Deveining shrimp',
        'Trimming garnishes',
        'Detailed prep work'
      ],

      alternatives: [
        'wusthof-classic-paring-knife'
      ],

      images: {
        primary: 'https://www.chefapprovedtools.com/images/products/victorinox-paring-knife/primary.jpg',
        alt: 'Victorinox 4-inch paring knife'
      },

      tags: ['paring-knife', 'swiss', 'nsf-certified', 'budget', 'essential'],

      specifications: {
        'blade-length': '4 inches',
        'total-length': '7.75 inches',
        'blade-material': 'High-carbon stainless steel',
        'handle-material': 'Thermoplastic elastomer (Fibrox)',
        'weight': '1.6 oz',
        'nsf-certified': 'Yes',
        'origin': 'Switzerland'
      },

      featured: false,
      bestFor: ['Detail work', 'Home cooks', 'Professional kitchens'],

      dateAdded: '2025-10-13T00:00:00Z',
      lastUpdated: '2025-10-14T00:00:00Z',
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
          label: 'Amazon',
          is_primary: true,
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
          label: 'Amazon',
          is_primary: true,
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