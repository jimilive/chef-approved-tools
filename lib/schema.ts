// Structured data schemas for SEO
// Updated: 2025-10-14 - Schema refactor to fix Google Rich Results issues

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

// UPDATED: Primary Product schema with proper nesting for review pages
// Product contains: review, aggregateRating (Google's recommended structure)
// NO OFFERS - We're an affiliate site, not a merchant
export function generateProductSchema(product: any) {
  // Validate required fields
  if (!product || !product.name || !product.slug) {
    console.error('generateProductSchema: Missing required product fields', product);
    return null;
  }

  const expertRating = product.expertRating || product.rating || 4.5;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.chefapprovedtools.com/reviews/${product.slug}#product`,
    name: product.name,
    image: Array.isArray(product.images?.primary)
      ? product.images.primary
      : [product.images?.primary || "https://www.chefapprovedtools.com/logo.png"],
    description: product.expertOpinion || product.description || `Professional review of ${product.name}`,
    brand: {
      "@type": "Brand",
      name: product.brand || "Unknown Brand"
    },
    sku: product.sku || product.slug,
    mpn: product.model || product.sku || product.slug,
    category: product.category,
    // Nested aggregateRating (part of Product)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: expertRating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: product.reviewCount || 1,
      reviewCount: product.reviewCount || 1
    },
    // Nested review (part of Product)
    review: {
      "@type": "Review",
      "@id": `https://www.chefapprovedtools.com/reviews/${product.slug}#review`,
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
        description: "Professional chef with 40 years of cooking experience and 24 years in restaurant management. A.A.S. Culinary Arts from Seattle Central College.",
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
      }
    }
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

// FAQ Schema - Converts FAQ data to JSON-LD (replaces microdata)
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

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

// Article Schema - For guides and editorial content
// Can optionally include nested ItemList for comparison/buying guides
export function generateArticleSchema(article: any) {
  if (!article || !article.title || !article.slug) {
    console.error('generateArticleSchema: Missing required article fields', article);
    return null;
  }

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://www.chefapprovedtools.com/guides/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    image: article.image || "https://www.chefapprovedtools.com/logo.png",
    datePublished: article.datePublished,
    dateModified: article.lastUpdated || article.datePublished,
    author: {
      "@type": "Person",
      "@id": "https://www.chefapprovedtools.com/about#scott-bradley",
      name: article.author || "Scott Bradley",
      sameAs: "https://www.chefapprovedtools.com/about"
    },
    publisher: {
      "@id": "https://www.chefapprovedtools.com/#organization"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.chefapprovedtools.com/guides/${article.slug}`
    }
  };

  // Optional fields
  if (article.wordCount) {
    schema.wordCount = article.wordCount;
  }
  if (article.tags && article.tags.length > 0) {
    schema.keywords = article.tags.join(", ");
  }
  if (article.category) {
    schema.articleSection = article.category;
  }

  return schema;
}

// NEW: HowTo Schema - For step-by-step instructional content
export function generateHowToSchema(howto: any) {
  if (!howto || !howto.name || !howto.steps || howto.steps.length === 0) {
    console.error('generateHowToSchema: Missing required fields (name, steps)', howto);
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howto.name,
    description: howto.description,
    image: howto.image ? [howto.image] : undefined,
    totalTime: howto.totalTime, // ISO 8601 duration (e.g., "PT30M" for 30 minutes)
    estimatedCost: howto.estimatedCost,
    yield: howto.yield,
    author: {
      "@type": "Person",
      "@id": "https://www.chefapprovedtools.com/about#scott-bradley",
      name: "Scott Bradley",
      sameAs: "https://www.chefapprovedtools.com/about"
    },
    datePublished: howto.datePublished,
    dateModified: howto.lastUpdated || howto.datePublished,
    publisher: {
      "@id": "https://www.chefapprovedtools.com/#organization"
    },
    step: howto.steps.map((step: any, index: number) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name || `Step ${index + 1}`,
      text: step.text,
      image: step.image,
      url: step.url
    })),
    // Optional: Tools and supplies
    tool: howto.tools ? howto.tools.map((tool: string) => ({
      "@type": "HowToTool",
      name: tool
    })) : undefined,
    supply: howto.supplies ? howto.supplies.map((supply: string) => ({
      "@type": "HowToSupply",
      name: supply
    })) : undefined
  }
}

// ItemList Schema - For product comparisons and lists
export function generateItemListSchema(products: any[], listName: string) {
  if (!products || products.length === 0) {
    return null;
  }

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
        aggregateRating: product.reviews?.rating > 0 ? {
          "@type": "AggregateRating",
          ratingValue: product.reviews.rating,
          reviewCount: product.reviews.count
        } : undefined,
        offers: product.affiliateUrl ? {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: product.affiliateUrl,
          seller: {
            "@type": "Organization",
            name: "Amazon"
          }
        } : undefined
      }
    }))
  }
}
