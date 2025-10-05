interface ReviewSchemaProps {
  productName: string
  productBrand: string
  rating: number
  reviewBody: string
  pros?: string[]
  cons?: string[]
  datePublished?: string
  category?: string
}

export default function ReviewSchema({
  productName,
  productBrand,
  rating,
  reviewBody,
  pros = [],
  cons = [],
  datePublished = new Date().toISOString(),
  category = "Kitchen Equipment"
}: ReviewSchemaProps) {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Product",
      "name": productName,
      "brand": {
        "@type": "Brand",
        "name": productBrand
      },
      "category": category
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Person",
      "name": "Scott Bradley",
      "jobTitle": "Professional Chef & Kitchen Manager",
      "description": "40 years of cooking, 21+ years professional kitchens, former Kitchen Manager at Mellow Mushroom",
      "knowsAbout": [
        "Professional Kitchen Equipment",
        "Restaurant Operations",
        "Commercial Cookware",
        "Chef Knives",
        "Kitchen Management"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Associate of Applied Science in Culinary Arts",
          "educationalLevel": "Associate Degree",
          "credentialCategory": "Culinary Education"
        }
      ]
    },
    "datePublished": datePublished,
    "reviewBody": reviewBody,
    "positiveNotes": pros.length > 0 ? {
      "@type": "ItemList",
      "itemListElement": pros.map((pro, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": pro
      }))
    } : undefined,
    "negativeNotes": cons.length > 0 ? {
      "@type": "ItemList",
      "itemListElement": cons.map((con, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": con
      }))
    } : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "Chef Approved Tools",
      "url": "https://www.chefapprovedtools.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.chefapprovedtools.com/logo.png"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
  )
}

// Professional chef credentials schema
export function ChefCredentialsSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Scott Bradley",
    "jobTitle": "Professional Chef & Kitchen Manager",
    "description": "Professional chef with 40 years of cooking, including 21+ years in professional restaurant kitchens. Former Kitchen Manager at Mellow Mushroom, specializing in professional kitchen equipment reviews and long-term durability testing.",
    "url": "https://www.chefapprovedtools.com/about",
    "sameAs": [
      "https://www.chefapprovedtools.com"
    ],
    "knowsAbout": [
      "Professional Kitchen Equipment",
      "Restaurant Operations",
      "Commercial Cookware",
      "Chef Knives",
      "Kitchen Management",
      "Food Service Equipment",
      "Restaurant Quality Tools"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Associate of Applied Science in Culinary Arts",
        "educationalLevel": "Associate Degree",
        "credentialCategory": "Culinary Education",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Seattle Central College"
        }
      }
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Kitchen Manager",
        "description": "Managed kitchen operations for Mellow Mushroom with $80K+/month revenue, overseeing 12 employees and full P&L responsibility",
        "occupationalCategory": "Food Service Management"
      },
      {
        "@type": "Occupation",
        "name": "Professional Chef",
        "description": "40 years of cooking, with 21+ years in professional kitchens spanning fast food to fine dining and high-volume operations",
        "occupationalCategory": "Culinary Arts"
      }
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Chef Approved Tools",
        "url": "https://www.chefapprovedtools.com"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}