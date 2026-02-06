'use client'

import { useState } from 'react'
import { generateFAQSchema } from '@/lib/schema'

const faqData = [
  {
    question: "How do you test and review kitchen tools?",
    answer: "Every product is tested for a minimum of 6 months in both professional restaurant settings and home kitchens. We evaluate durability, performance under heavy use, ease of maintenance, and value for money. Products are purchased with our own funds to maintain independence, and we update reviews quarterly based on long-term performance."
  },
  {
    question: "Do you earn money from product recommendations?",
    answer: "Yes, we participate in affiliate programs including Amazon Associates. When you purchase through our links (marked with *), we earn a small commission at no extra cost to you. This helps fund our independent testing and allows us to maintain this site. We never let commission rates influence our recommendations - we've turned down higher-paying partnerships to recommend products we truly believe in."
  },
  {
    question: "How often are prices and availability updated?",
    answer: "We update prices and availability weekly using automated tools and manual checks. Each product shows a 'last updated' timestamp. However, prices on merchant sites can change at any time, so we always recommend checking the current price when you click through. We also track price history to alert you to good deals."
  },
  {
    question: "What makes your reviews different from other sites?",
    answer: "Our reviews come from actual restaurant experience. With 24 years in professional kitchens managing operations doing $80K+ monthly revenue, I know what equipment can handle professional abuse. Products were tested in real-world conditions, not just controlled environments. Plus, reviews are updated based on long-term performance, not just first impressions."
  },
  {
    question: "Can I trust that these are honest reviews?",
    answer: "Absolutely. We purchase all products ourselves, never accept free products for reviews, and clearly disclose our affiliate relationships. Our reputation depends on honest recommendations. We also highlight both pros AND cons for every product, and suggest alternatives at different price points."
  },
  {
    question: "Do you only recommend expensive professional equipment?",
    answer: "Not at all! While we do review professional-grade equipment, we understand most home cooks have different needs and budgets. We always include budget options that perform well (like the Victorinox Fibrox knife that many professional kitchens use). We believe in recommending the best tool for YOUR specific needs and budget."
  },
  {
    question: "How do I know if a product is right for me?",
    answer: "Each review includes a 'Best For' section explaining who would benefit most from that product. We also provide alternatives at different price points and for different use cases. Our buying guides go deeper into helping you choose based on your cooking style, frequency, and budget."
  },
  {
    question: "What if a product goes on sale after I buy it?",
    answer: "While we can't control merchant pricing, we do track price history and highlight significant sales. Consider signing up for our newsletter where we share the best deals we find each week. Many retailers also offer price matching within a certain timeframe - check their policies."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  // Generate schema for SEO
  const faqSchema = generateFAQSchema(faqData)
  
  return (
    <section className="w-full">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Everything you need to know about our reviews, testing process, and recommendations
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded-xl"
              onClick={() => toggleQuestion(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-2">
                  <svg
                    aria-hidden="true"
                    className={`w-6 h-6 text-gray-700 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </button>
            
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-6 pb-6 text-gray-700 leading-relaxed"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-700 mb-4">
          Still have questions?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium"
        >
          Contact our team
          <svg aria-hidden="true" className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}