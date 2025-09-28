interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const faqSchema = {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

// Common FAQ data for kitchen tools
export const kitchenToolsFAQs: FAQItem[] = [
  {
    question: "How does Scott Bradley test kitchen equipment?",
    answer: "Scott Bradley tests all kitchen equipment in real restaurant environments for a minimum of 6 months. As a former Kitchen Manager at Mellow Mushroom with 21+ years of professional experience, he evaluates tools based on durability, performance under high-volume conditions, and value for money."
  },
  {
    question: "Are Chef Approved Tools reviews sponsored or biased?",
    answer: "No, all reviews are completely unbiased. Scott purchases equipment with his own funds or tests them in professional kitchens where he works. While the site contains affiliate links, these never influence the honest assessment of any product. Negative aspects are always disclosed regardless of commission potential."
  },
  {
    question: "What makes Scott Bradley qualified to review kitchen equipment?",
    answer: "Scott Bradley has 21+ years of professional kitchen experience, including managing kitchen operations at Mellow Mushroom with $80K+/month revenue. He holds a culinary degree from Seattle Central College and has worked in various restaurant environments from fine dining to high-volume operations."
  },
  {
    question: "Why should I trust these kitchen tool recommendations?",
    answer: "These recommendations come from real-world testing in professional kitchens, not just home use. Scott has managed kitchen teams, handled high-volume service, and understands what equipment truly performs under pressure. Each recommendation is based on extensive testing and professional experience."
  },
  {
    question: "How often are product prices and availability updated?",
    answer: "Product prices are updated regularly, though they can change frequently on Amazon. We recommend checking the current price by clicking through to Amazon for the most up-to-date pricing and availability information."
  },
  {
    question: "Do you earn commissions from product recommendations?",
    answer: "Yes, Chef Approved Tools participates in the Amazon Associates program and earns commissions from qualifying purchases. However, this never affects our honest reviews or recommendations. We only recommend products we would personally use or have used professionally."
  }
]