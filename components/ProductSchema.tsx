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
    "offers": {
      "@type": "Offer",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": product.affiliateLinks[0]?.url,
      "priceCurrency": product.price?.currency || "USD",
      "price": product.price?.current?.toString() || "0",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "Amazon"
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 5,
            "unitCode": "DAY"
          }
        }
      }
    },
    "review": product.reviews.count > 0 ? {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Scott Bradley",
        "jobTitle": "Professional Chef & Kitchen Manager",
        "description": "21+ years restaurant experience, former Kitchen Manager at Mellow Mushroom"
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
        "value": "Certified by 21+ year restaurant professional"
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
  price?: number
  affiliateUrl?: string
}

export function SimpleProductSchema({
  name,
  brand,
  rating,
  reviewCount,
  category = "Kitchen Equipment",
  image,
  price,
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
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      ...(affiliateUrl && { "url": affiliateUrl }),
      "priceCurrency": "USD",
      "price": price?.toString() || "299",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "Amazon"
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 5,
            "unitCode": "DAY"
          }
        }
      }
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