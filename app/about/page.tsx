import FAQSchema from '@/components/FAQSchema'

const aboutFAQs = [
  {
    question: "What's your professional culinary background?",
    answer: "I hold an A.A.S. in Culinary Arts from Seattle Central College and a B.S. in Business Administration from University of Montana. I've worked as a certified Pizzaiolo at Purple Café & Wine Bar and managed restaurant operations at Mellow Mushroom with $80K+ monthly revenue, giving me real-world experience with professional kitchen equipment."
  },
  {
    question: "How did you transition from restaurant work to equipment reviews?",
    answer: "After 5+ years in restaurant operations, I moved into e-commerce, working as Internet Production Lead at The Sharper Image and later managing a $2M brand launch. This combination of culinary expertise and e-commerce experience helps me understand both what works in kitchens and what information helps people make purchasing decisions."
  },
  {
    question: "Why should I trust your equipment recommendations?",
    answer: "Every tool gets minimum 6 months of testing in real kitchen environments before I recommend it. No shortcuts, no sponsored quick reviews - just honest evaluation from someone who's used professional equipment to feed hundreds of customers daily."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FAQSchema faqs={aboutFAQs} />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            About Scott Bradley
          </h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Professional Background
            </h2>

            <p className="text-slate-600 mb-6">
              Former Kitchen Manager at Mellow Mushroom with 15+ years of professional kitchen experience.
              Seattle Central College culinary graduate who&apos;s tested thousands of pieces of equipment in
              high-volume restaurant operations.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Why This Matters for Equipment Reviews
            </h3>

            <p className="text-slate-600 mb-6">
              This unique combination of formal culinary training, hands-on restaurant experience, and e-commerce success
              means I understand both what works in real kitchens AND what information helps people make purchasing decisions.
              Every recommendation is backed by months of testing in demanding environments.
            </p>

            <div className="bg-orange-600 text-white p-8 rounded-xl text-center mt-12">
              <h3 className="text-xl font-bold mb-4">
                My Testing Promise
              </h3>
              <p className="text-lg">
                Every tool gets minimum 6 months of testing in real kitchen environments before I recommend it.
                No shortcuts, no sponsored quick reviews - just honest evaluation from someone who&rsquo;s used professional
                equipment to feed hundreds of customers daily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}