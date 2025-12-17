/**
 * HowToSchema - JSON-LD structured data for step-by-step instructional content
 *
 * Usage:
 * <HowToSchema
 *   name="How to Make Marinara Sauce"
 *   description="Learn authentic Italian marinara technique."
 *   datePublished="2025-01-20"
 *   totalTime="PT45M"
 *   tools={["12-inch sauté pan", "Sharp knife"]}
 *   steps={[
 *     { name: "Prepare Tomatoes", text: "Hand-crush whole tomatoes." },
 *     { name: "Toast Garlic", text: "Heat oil, add garlic, cook 2-3 min." }
 *   ]}
 * />
 */

interface HowToStep {
  name: string
  text: string
}

interface HowToSchemaProps {
  name: string
  description: string
  datePublished: string
  totalTime?: string  // ISO 8601 duration: "PT45M", "PT1H", "PT1H30M"
  tools?: string[]
  steps: HowToStep[]
}

export default function HowToSchema({
  name,
  description,
  datePublished,
  totalTime,
  tools,
  steps
}: HowToSchemaProps) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "author": {
      "@type": "Person",
      "@id": "https://www.chefapprovedtools.com/about#scott-bradley",
      "name": "Scott Bradley"
    },
    "datePublished": datePublished,
    ...(totalTime && { "totalTime": totalTime }),
    ...(tools && tools.length > 0 && {
      "tool": tools.map(tool => ({
        "@type": "HowToTool",
        "name": tool
      }))
    }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  )
}
