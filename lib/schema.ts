// Structured data schemas for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.chefapprovedtools.com/#organization",
  name: "Chef Approved Tools",
  url: "https://www.chefapprovedtools.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.chefapprovedtools.com/logo.png",
    width: 600,
    height: 60
  },
  description: "Professional kitchen equipment reviews by certified culinary professionals with restaurant management experience",
  sameAs: [
    "https://www.facebook.com/chefapprovedtools",
    "https://www.instagram.com/chefapprovedtools",
    "https://www.youtube.com/@chefapprovedtools",
    "https://www.pinterest.com/chefapprovedtools"
  ],
  founder: {
    "@type": "Person",
    name: "Professional Chef",
    jobTitle: "Executive Chef & Restaurant Manager",
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Seattle Central College",
        department: "Culinary Arts Program"
      },
      {
        "@type": "EducationalOrganization",
        name: "University of Montana",
        department: "Business Administration"
      }
    ],
    knowsAbout: [
      "Professional Cooking",
      "Restaurant Management",
      "Kitchen Equipment",
      "Culinary Techniques",
      "Food Safety"
    ]
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@chefapprovedtools.com"
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "US"
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.chefapprovedtools.com/#website",
  url: "https://www.chefapprovedtools.com",
  name: "Chef Approved Tools",
  description: "Expert reviews of professional kitchen equipment for serious home cooks",
  publisher: {
    "@id": "https://www.chefapprovedtools.com/#organization"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.chefapprovedtools.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  inLanguage: "en-US"
}

export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.chefapprovedtools.com/products/${product.slug}#product`,
    name: product.name,
    image: product.images.primary,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand
    },
    sku: product.id,
    mpn: product.model || product.id,
    category: product.category,
    ...(product.affiliateLinks?.[0]?.url && {
      offers: {
        "@type": "Offer",
        url: product.affiliateLinks[0].url,
        itemCondition: "https://schema.org/NewCondition",
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Amazon.com"
        }
      }
    }),
    aggregateRating: product.reviews.rating > 0 ? {
      "@type": "AggregateRating",
      ratingValue: product.reviews.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: product.reviews.count,
      reviewCount: product.reviews.count
    } : undefined,
    review: {
      "@type": "Review",
      "@id": `https://www.chefapprovedtools.com/reviews/${product.slug}#review`,
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.expertRating || product.reviews.rating,
        bestRating: 5,
        worstRating: 1
      },
      author: {
        "@type": "Person",
        name: "Scott Bradley",
        jobTitle: "Kitchen Manager",
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Seattle Central College",
            department: "Culinary Arts Program"
          }
        ],
        worksFor: {
          "@type": "Organization",
          name: "Chef Approved Tools"
        },
        sameAs: "https://www.chefapprovedtools.com/about"
      },
      reviewBody: product.expertOpinion,
      datePublished: product.dateAdded,
      dateModified: product.lastUpdated,
      publisher: {
        "@id": "https://www.chefapprovedtools.com/#organization"
      }
    }
  }
}

// Enhanced product review schema for better rich snippets
export function generateProductReviewSchema(product: any) {
  // Validate required fields
  if (!product || !product.name || !product.slug) {
    console.error('generateProductReviewSchema: Missing required product fields', product);
    return null;
  }

  const expertRating = product.expertRating || product.rating || 4.5;

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `https://www.chefapprovedtools.com/reviews/${product.slug}#professional-review`,
    itemReviewed: {
      "@type": "Product",
      name: product.name,
      image: product.images?.primary || "https://www.chefapprovedtools.com/logo.png",
      description: product.expertOpinion || product.description || `Professional review of ${product.name}`,
      brand: {
        "@type": "Brand",
        name: product.brand || "Unknown Brand"
      },
      sku: product.sku || product.slug,
      gtin13: product.gtin13,
      ...(product.affiliateLinks?.[0]?.url && {
        offers: {
          "@type": "Offer",
          availability: product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: product.affiliateLinks[0].url,
          seller: {
            "@type": "Organization",
            "name": "Amazon"
          }
        }
      }),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: expertRating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: product.reviewCount || 1,
        reviewCount: product.reviewCount || 1
      }
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: expertRating,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      "@type": "Person",
      "@id": "https://www.chefapprovedtools.com/about#scott-bradley",
      name: "Scott Bradley",
      url: "https://www.chefapprovedtools.com/about",
      image: "https://www.chefapprovedtools.com/images/team/head-shot-1.jpg",
      jobTitle: "Kitchen Manager & Culinary Professional",
      description: "Professional chef with 40 years of cooking experience and 23+ years in restaurant management. A.A.S. Culinary Arts from Seattle Central College.",
      sameAs: [
        "https://www.chefapprovedtools.com/about"
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Seattle Central College"
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "educationalLevel": "Associate",
          "about": "Culinary Arts"
        }
      ],
      "knowsAbout": [
        "Professional Cooking",
        "Restaurant Operations",
        "Kitchen Equipment",
        "Food Safety"
      ]
    },
    reviewBody: product.expertOpinion || product.description || `Professional review of ${product.name}`,
    name: `Professional Review: ${product.name}`,
    headline: `Kitchen Manager's Review: ${product.name}`,
    datePublished: product.dateAdded || new Date().toISOString().split('T')[0],
    dateModified: product.lastUpdated || product.dateAdded || new Date().toISOString().split('T')[0],
    publisher: {
      "@id": "https://www.chefapprovedtools.com/#organization"
    },
    positiveNotes: product.pros || [],
    negativeNotes: product.cons || []
  }
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: {
        "@id": item.url
      }
    }))
  }
}

export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }
}

export function generateArticleSchema(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://www.chefapprovedtools.com/guides/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.lastUpdated,
    author: {
      "@type": "Person",
      name: article.author || "Chef Professional",
      sameAs: "https://www.chefapprovedtools.com/about"
    },
    publisher: {
      "@id": "https://www.chefapprovedtools.com/#organization"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.chefapprovedtools.com/guides/${article.slug}`
    },
    wordCount: article.wordCount,
    keywords: article.tags.join(", "),
    articleSection: article.category
  }
}

export function generateItemListSchema(products: any[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.images?.primary,
        url: `https://www.chefapprovedtools.com/reviews/${product.slug}`,
        ...(product.affiliateLinks?.[0]?.url && {
          offers: {
            "@type": "Offer",
            url: product.affiliateLinks[0].url,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            seller: {
              "@type": "Organization",
              "name": "Amazon"
            }
          }
        }),
        aggregateRating: product.reviews.rating > 0 ? {
          "@type": "AggregateRating",
          ratingValue: product.reviews.rating,
          reviewCount: product.reviews.count
        } : undefined
      }
    }))
  }
}