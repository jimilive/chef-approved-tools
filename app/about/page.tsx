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
    answer: "Every recommendation comes from real kitchen testing, not lab conditions. I've used professional equipment to serve hundreds of customers daily, so I know what fails under pressure and what delivers consistent results. I only recommend equipment I'd use in my own professional kitchen."
  }
]

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <FAQSchema faqs={aboutFAQs} />
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #1e293b 0%, #ea580c 100%)', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '24px' }}>
            My Chef Story
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>
            From culinary school to restaurant management to launching a $2M brand - 
            here&rsquo;s why I know what works in professional kitchens.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '64px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>
            Professional Training + Real Experience
          </h2>
          
          <p style={{ marginBottom: '24px' }}>
            My journey started with formal culinary training - earning my A.A.S. in Culinary Arts from Seattle Central College, 
            followed by a B.S. in Business Administration from University of Montana. But the real education came from working 
            in professional kitchens where equipment failures mean lost revenue and disappointed customers.
          </p>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
            Restaurant Operations Experience
          </h3>
          
          <p style={{ marginBottom: '24px' }}>
            I spent 5+ years managing restaurant operations, including $80K+ monthly revenue at Mellow Mushroom and 
            working as a certified Pizzaiolo at Purple Café & Wine Bar. This wasn&rsquo;t just cooking - it was managing 
            teams, maintaining health inspection scores, and most importantly, understanding which equipment actually 
            performs under pressure.
          </p>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
            E-commerce Success
          </h3>
          
          <p style={{ marginBottom: '24px' }}>
            My transition to e-commerce brought a new perspective. As Internet Production Lead at The Sharper Image, 
            I improved team efficiency by 30% and learned what drives online purchasing decisions. Later, I managed 
            the launch of a $2M online brand at YDesign Group, gaining expertise in product placement and promotional execution.
          </p>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
            Why This Matters for Equipment Reviews
          </h3>
          
          <p style={{ marginBottom: '24px' }}>
            This unique combination of formal culinary training, hands-on restaurant experience, and e-commerce success 
            means I understand both what works in real kitchens AND what information helps people make purchasing decisions. 
            Every recommendation is backed by months of testing in demanding environments.
          </p>

          <div style={{ backgroundColor: '#f97316', color: 'white', padding: '32px', borderRadius: '12px', textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              My Testing Promise
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              Every tool gets minimum 6 months of testing in real kitchen environments before I recommend it. 
              No shortcuts, no sponsored quick reviews - just honest evaluation from someone who&rsquo;s used professional 
              equipment to feed hundreds of customers daily.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}