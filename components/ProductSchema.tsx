import { Product } from '@/types/product'

interface ProductSchemaProps {
  product: Product
  category?: string
  reviewUrl?: string
}

export default function ProductSchema({ product, category, reviewUrl }: ProductSchemaProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": `Professional review of ${product.name} by certified chef Scott Bradley. Tested in real restaurant environments for durability and performance.`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "category": category || "Kitchen Equipment",
    "image": [
      product.images.primary,
      ...(product.images.gallery || [])
    ],
    "sku": product.id,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.reviews.rating,
      "reviewCount": product.reviews.count,
      "bestRating": 5,
      "worstRating": 1
    },
    ...(product.affiliateLinks[0]?.url && {
      "offers": {
        "@type": "Offer",
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "url": product.affiliateLinks[0].url,
        "seller": {
          "@type": "Organization",
          "name": "Amazon"
        }
      }
    }),
    "review": product.reviews.count > 0 ? {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Scott Bradley",
        "jobTitle": "Professional Chef & Kitchen Manager",
        "description": "23+ years restaurant experience, former Kitchen Manager at Mellow Mushroom"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.reviews.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "datePublished": product.lastUpdated,
      "reviewBody": `Professional review based on ${product.pros.length > 0 ? product.pros.join(', ') : 'extensive testing'} in commercial kitchen environments.`,
      "url": reviewUrl
    } : undefined
  }

  // Enhanced product schema with additional properties
  const enhancedSchema = {
    ...productSchema,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Professional Tested",
        "value": "Yes - Restaurant Environment"
      },
      {
        "@type": "PropertyValue",
        "name": "Chef Approved",
        "value": "Certified by 23+ year restaurant professional"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Professional Chefs, Home Cooks, Restaurant Owners"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.brand
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedSchema) }}
    />
  )
}

// Simple version for basic product cards
interface SimpleProductSchemaProps {
  name: string
  brand: string
  rating: number
  reviewCount: number
  category?: string
  image?: string
  affiliateUrl?: string
}

export function SimpleProductSchema({
  name,
  brand,
  rating,
  reviewCount,
  category = "Kitchen Equipment",
  image,
  affiliateUrl
}: SimpleProductSchemaProps) {
  const simpleSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": `Professional chef review of ${name}. Tested in real restaurant kitchens.`,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "category": category,
    ...(image && { "image": image }),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    ...(affiliateUrl && {
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "url": affiliateUrl,
        "seller": {
          "@type": "Organization",
          "name": "Amazon"
        }
      }
    }),
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Scott Bradley",
        "jobTitle": "Professional Chef & Kitchen Manager"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": rating,
        "bestRating": 5,
        "worstRating": 1
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(simpleSchema) }}
    />
  )
}