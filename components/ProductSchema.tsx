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
    "review": product.reviews.count > 0 ? {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Scott Bradley",
        "jobTitle": "Professional Chef & Kitchen Manager",
        "description": "24 years restaurant experience including high-volume kitchen management"
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
        "value": "Certified by 24 year restaurant professional"
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
  // Ensure absolute URL for image (Google requires it)
  const absoluteImage = image
    ? (image.startsWith('http') ? image : `https://www.chefapprovedtools.com${image}`)
    : "https://www.chefapprovedtools.com/logo.png";

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
    "image": absoluteImage,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
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