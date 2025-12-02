interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": {
        "@id": item.url
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

// Common breadcrumb patterns
export const homeBreadcrumb = { name: "Home", url: "https://www.chefapprovedtools.com" }

export const categoryBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  knives: [
    homeBreadcrumb,
    { name: "Knives & Cutting Tools", url: "https://www.chefapprovedtools.com/knives" }
  ],
  cookware: [
    homeBreadcrumb,
    { name: "Cookware & Bakeware", url: "https://www.chefapprovedtools.com/cookware" }
  ],
  appliances: [
    homeBreadcrumb,
    { name: "Small Appliances", url: "https://www.chefapprovedtools.com/appliances" }
  ],
  'moving-stirring': [
    homeBreadcrumb,
    { name: "Moving & Stirring Tools", url: "https://www.chefapprovedtools.com/moving-stirring" }
  ],
  'prep-tools': [
    homeBreadcrumb,
    { name: "Prep Tools", url: "https://www.chefapprovedtools.com/prep-tools" }
  ],
  'cleaning-maintenance': [
    homeBreadcrumb,
    { name: "Cleaning & Maintenance", url: "https://www.chefapprovedtools.com/cleaning-maintenance" }
  ],
  reviews: [
    homeBreadcrumb,
    { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" }
  ],
  guides: [
    homeBreadcrumb,
    { name: "Buying Guides", url: "https://www.chefapprovedtools.com/guides" }
  ]
}
