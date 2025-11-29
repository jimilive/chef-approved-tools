// Enhanced type definitions with better structure and validation

/**
 * ProductImages - Used for conditional image display across components
 * All fields are optional - components render without images if not provided
 */
export interface ProductImages {
  hero?: string | null;
  thumbnail?: string | null;
  gallery?: string[];
  action?: string[];
  pinterest?: string | null;
}

export interface ProductSpecification {
  [key: string]: string | number;
}

export interface PriceInfo {
  current: number;
  original?: number;
  currency: string;
  lastUpdated: string;
  disclaimer?: string;
}

export interface Vendor {
  name: string;
  url: string;
  price?: number;
  originalPrice?: number;
  merchant: 'amazon' | 'walmart' | 'target' | 'williams-sonoma' | 'sur-la-table' | 'other';
  tag?: string;
  inStock?: boolean;
  lastChecked: string;
  commissionRate?: number; // For tracking which affiliates pay better
}

export interface AffiliateLink {
  url: string;
  merchant: string;
  label: string;
  is_primary: boolean;
  tag?: string;
  lastChecked?: string;
}

export interface Review {
  rating: number;
  count: number;
  verified: boolean;
  source: string;
  lastUpdated: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model?: string;
  category: string;
  subcategory?: string;
  
  // Pricing with compliance (optional)
  price?: PriceInfo;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  inStock: boolean;
  availability?: string;
  
  // Affiliate data
  affiliateLinks: AffiliateLink[];
  vendors?: Vendor[]; // Multi-vendor support for price comparison
  primaryAffiliate: 'amazon' | 'walmart' | 'target';
  
  // Reviews and ratings
  reviews: Review;
  expertRating?: number;
  pros: string[];
  cons: string[];
  
  // Content
  description: string;
  expertOpinion: string;
  usageScenarios: string[];
  alternatives?: string[];
  
  // Media
  images: {
    primary: string;
    gallery?: string[];
    alt: string;
  };
  videos?: string[];
  
  // SEO and metadata
  tags: string[];
  specifications: ProductSpecification;
  featured: boolean;
  bestFor?: string[];
  
  // Tracking
  dateAdded: string;
  lastUpdated: string;
  updateFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface ProductCollection {
  knives: Product[];
  cookware: Product[];
  appliances: Product[];
  tools: Product[];
  baking: Product[];
  storage: Product[];
}

export interface ComparisonData {
  products: Product[];
  comparisonPoints: string[];
  winner?: string;
  bestValue?: string;
  bestBudget?: string;
}

export interface BuyingGuide {
  id: string;
  slug: string;
  title: string;
  category: string;
  introduction: string;
  sections: {
    title: string;
    content: string;
    products?: Product[];
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  lastUpdated: string;
  author: string;
}

export interface SearchFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  brands?: string[];
  rating?: number;
  tags?: string[];
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
}

export interface AffiliateDisclosure {
  short: string;
  full: string;
  inline: string;
}