import Script from 'next/script'

interface Product {
  name: string
  brand: string
  model?: string
  description?: string
  price: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition'
  rating?: {
    ratingValue: number
    ratingCount?: number
    bestRating?: number
    worstRating?: number
  }
  images?: string[]
  sku?: string
  url?: string
  affiliateUrl?: string
}

interface Review {
  author: string
  datePublished: string
  reviewBody: string
  ratingValue: number
  bestRating?: number
  worstRating?: number
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface StructuredDataProps {
  type: 'product' | 'review' | 'recipe' | 'article' | 'breadcrumb'
  product?: Product
  review?: Review
  breadcrumbs?: BreadcrumbItem[]
  article?: {
    headline: string
    author: string
    datePublished: string
    dateModified?: string
    description: string
    image?: string
    url: string
  }
}

export default function StructuredData({ type, product, review, breadcrumbs, article }: StructuredDataProps) {
  const generateProductSchema = () => {
    if (!product) return null

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "model": product.model,
      "description": product.description,
      "image": product.images || [],
      "sku": product.sku,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": product.currency || "USD",
        "availability": `https://schema.org/${product.availability || 'InStock'}`,
        "itemCondition": `https://schema.org/${product.condition || 'NewCondition'}`,
        "url": product.affiliateUrl || product.url,
        "seller": {
          "@type": "Organization",
          "name": "Chef Approved Tools"
        }
      },
      "aggregateRating": product.rating ? {
        "@type": "AggregateRating",
        "ratingValue": product.rating.ratingValue,
        "ratingCount": product.rating.ratingCount || 1,
        "bestRating": product.rating.bestRating || 5,
        "worstRating": product.rating.worstRating || 1
      } : undefined
    }
  }

  const generateReviewSchema = () => {
    if (!review || !product) return null

    return {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Product",
        "name": product.name,
        "brand": product.brand,
        "image": product.images?.[0]
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.ratingValue,
        "bestRating": review.bestRating || 5,
        "worstRating": review.worstRating || 1
      }
    }
  }

  const generateBreadcrumbSchema = () => {
    if (!breadcrumbs) return null

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    }
  }

  const generateArticleSchema = () => {
    if (!article) return null

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.headline,
      "description": article.description,
      "image": article.image,
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Chef Approved Tools",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.chefapprovedtools.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.url
      }
    }
  }

  const generateHowToSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Choose Professional Kitchen Tools",
      "description": "A comprehensive guide to selecting restaurant-quality kitchen equipment for home use",
      "image": "https://www.chefapprovedtools.com/images/kitchen-guide.jpg",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "500"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Chef's knife"
        },
        {
          "@type": "HowToSupply",
          "name": "Cutting board"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Identify your cooking style",
          "text": "Determine what types of cooking you do most often",
          "image": "https://www.chefapprovedtools.com/images/cooking-styles.jpg"
        },
        {
          "@type": "HowToStep",
          "name": "Set your budget",
          "text": "Professional tools require investment, but they last longer",
          "image": "https://www.chefapprovedtools.com/images/budget-planning.jpg"
        }
      ]
    }
  }

  const getSchemaData = () => {
    switch (type) {
      case 'product':
        return generateProductSchema()
      case 'review':
        return generateReviewSchema()
      case 'breadcrumb':
        return generateBreadcrumbSchema()
      case 'article':
        return generateArticleSchema()
      default:
        return null
    }
  }

  const schemaData = getSchemaData()
  if (!schemaData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  )
}

// FAQ Schema Component
export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  )
}

// Organization Schema Component
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Chef Approved Tools",
    "url": "https://www.chefapprovedtools.com",
    "logo": "https://www.chefapprovedtools.com/logo.png",
    "description": "Professional kitchen equipment reviews by certified chefs with restaurant experience",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@chefapprovedtools.com"
    },
    "sameAs": [
      "https://www.facebook.com/chefapprovedtools",
      "https://www.instagram.com/chefapprovedtools",
      "https://www.youtube.com/chefapprovedtools"
    ]
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  )
}