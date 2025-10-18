import Image from 'next/image'
import { Clock, Shield, TrendingUp, Award, Users, DollarSign } from 'lucide-react'
import { Metadata } from 'next'
import FAQSchema from '@/components/FAQSchema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Scott Bradley & Testing Methodology',
  description: 'Professional chef Scott Bradley, 40 years experience. Rigorous 6-month testing in restaurant kitchens. No lab tests—real-world conditions. Expert methodology.',
  keywords: 'Scott Bradley chef, professional chef background, kitchen equipment testing, restaurant equipment review process, chef equipment methodology, culinary expertise',
  alternates: {
    canonical: '/about',
  },
}

const combinedFAQs = [
  {
    question: "What's your professional culinary background?",
    answer: "I hold an A.A.S. in Culinary Arts from Seattle Culinary Academy and a B.S. in Business Administration from University of Montana. I've worked as a certified Pizzaiolo at Purple Café & Wine Bar and managed restaurant operations at Mellow Mushroom with $80K+ monthly revenue, giving me real-world experience with professional kitchen equipment."
  },
  {
    question: "How did you transition from restaurant work to equipment reviews?",
    answer: "After 5+ years in restaurant operations, I moved into e-commerce, working as Internet Production Lead at The Sharper Image and later managing a $2M brand launch. This combination of culinary expertise and e-commerce experience helps me understand both what works in kitchens and what information helps people make purchasing decisions."
  },
  {
    question: "How long do you test each piece of equipment?",
    answer: "Every piece of equipment undergoes a minimum of 6 months of testing in real restaurant kitchens. This includes 4 distinct phases: initial assessment (1 week), break-in period (3 weeks), professional kitchen testing (4+ months), and comparative analysis (1 month). Some equipment has been tested for over 5 years in our partner restaurants."
  },
  {
    question: "Do manufacturers pay you for reviews or send free products?",
    answer: "No, we maintain complete editorial independence. We purchase all equipment with our own funds or test items already in use in professional kitchens where we work. We never accept free products for review or allow manufacturers to influence our ratings or recommendations."
  },
  {
    question: "What makes restaurant kitchen testing different from home testing?",
    answer: "Restaurant kitchens subject equipment to extreme conditions: 200+ covers per night, multiple staff members with varying skill levels, constant use during peak hours, and high-stress environments. This reveals durability issues, safety concerns, and performance problems that light home use would never uncover."
  },
  {
    question: "How do you score equipment objectively?",
    answer: "We use a weighted scoring system across 5 categories: Performance (30%), Durability (25%), Usability (20%), Value (15%), and Versatility (10%). Each category has specific metrics we track over months of use in real professional kitchen environments."
  },
  {
    question: "Do you update reviews if equipment performance changes over time?",
    answer: "Yes, we continuously monitor equipment performance and update reviews based on long-term reliability data. If we discover issues after publication or if manufacturers make significant changes to products, we revise our recommendations accordingly."
  },
  {
    question: "Why should I trust your recommendations over other review sites?",
    answer: "Most review sites test equipment for days or weeks in ideal conditions. We test for months in real commercial kitchens under high-volume stress. Our recommendations are based on how equipment actually performs when your livelihood depends on it, not just initial impressions."
  }
]

const testingPhases = [
  {
    phase: "Initial Assessment",
    duration: "Week 1",
    icon: Shield,
    tasks: [
      "Unboxing and build quality inspection",
      "Safety feature verification",
      "Initial setup and calibration",
      "Documentation of specifications vs claims"
    ]
  },
  {
    phase: "Break-In Period",
    duration: "Weeks 2-4",
    icon: TrendingUp,
    tasks: [
      "Daily use in controlled conditions",
      "Performance consistency tracking",
      "Initial durability assessment",
      "User experience documentation"
    ]
  },
  {
    phase: "Professional Kitchen Testing",
    duration: "Months 2-6",
    icon: Users,
    tasks: [
      "High-volume restaurant environment testing",
      "Professional kitchen manager evaluation",
      "Peak service performance evaluation",
      "Long-term durability monitoring"
    ]
  },
  {
    phase: "Comparative Analysis",
    duration: "Month 7",
    icon: Award,
    tasks: [
      "Side-by-side competitor comparison",
      "Value-for-money assessment",
      "Final performance scoring",
      "Purchase recommendation formulation"
    ]
  }
]

const evaluationCriteria = [
  {
    category: "Performance",
    weight: "30%",
    description: "How well does it perform its primary function under real kitchen conditions?",
    metrics: [
      "Consistency of results",
      "Speed and efficiency",
      "Precision and accuracy",
      "Peak performance capability"
    ]
  },
  {
    category: "Durability",
    weight: "25%",
    description: "Will it survive the demands of professional kitchen use?",
    metrics: [
      "Material quality and construction",
      "Wear patterns after 6+ months",
      "Maintenance requirements",
      "Component failure rates"
    ]
  },
  {
    category: "Usability",
    weight: "20%",
    description: "How easy and safe is it for kitchen staff to use effectively?",
    metrics: [
      "Learning curve for new users",
      "Ergonomics and comfort",
      "Safety features effectiveness",
      "Cleaning and maintenance ease"
    ]
  },
  {
    category: "Value",
    weight: "15%",
    description: "Does the price justify the performance and longevity?",
    metrics: [
      "Cost per year of expected use",
      "Performance vs price comparison",
      "Total cost of ownership",
      "Return on investment"
    ]
  },
  {
    category: "Versatility",
    weight: "10%",
    description: "How many different tasks can it handle well?",
    metrics: [
      "Range of applications",
      "Adaptability to different uses",
      "Multi-functionality effectiveness",
      "Space efficiency"
    ]
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={combinedFAQs} />

      {/* Section 1: Personal Introduction - The "Who" */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image
                src="/images/team/head-shot-1.jpg"
                alt="Scott Bradley - Professional Chef"
                fill
                className="object-cover rounded-full shadow-xl border-4 border-orange-500"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              About Scott Bradley
            </h1>
            <p className="text-xl text-slate-600">Professional Chef with 40 Years Cooking Experience (23+ Years Professional)</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Professional Background
            </h2>

            <p className="text-slate-700 mb-6 text-lg leading-relaxed">
              Former Kitchen Manager at Mellow Mushroom with 23+ years of restaurant experience.
              Seattle Culinary Academy graduate who&apos;s tested equipment in
              high-volume restaurant operations serving hundreds of customers daily.
            </p>

            <p className="text-slate-700 mb-6 text-lg leading-relaxed">
              I hold an A.A.S. in Culinary Arts from Seattle Culinary Academy and a B.S. in Business
              Administration from University of Montana. My career has taken me from certified Pizzaiolo
              at Purple Café & Wine Bar to managing restaurant operations with $80K+ monthly revenue at
              Mellow Mushroom, where equipment reliability wasn&apos;t just important—it was critical to
              our success during peak service hours.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-10">
              Why This Matters for Equipment Reviews
            </h3>

            <p className="text-slate-700 mb-6 text-lg leading-relaxed">
              This unique combination of formal culinary training, hands-on restaurant experience, and e-commerce
              success means I understand both what works in real kitchens AND what information helps people make
              purchasing decisions. After transitioning from restaurant operations to e-commerce—working as Internet
              Production Lead at The Sharper Image and managing a $2M brand launch—I bring a rare dual perspective
              to equipment testing.
            </p>

            <p className="text-slate-700 mb-8 text-lg leading-relaxed">
              Every recommendation is backed by months of testing in demanding environments. I&apos;ve seen brand new,
              expensive equipment fail during a Saturday night dinner rush. That&apos;s a lesson you don&apos;t learn in
              a lab or from a quick unboxing video. For me, testing isn&apos;t just about finding the best features—it&apos;s
              about finding what won&apos;t let you down when the pressure is on.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: The Bridge - Personal Promise */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-6">
              My Testing Promise
            </h2>
            <p className="text-xl leading-relaxed mb-6">
              Every tool gets minimum 6 months of testing in real kitchen environments before I recommend it.
              No shortcuts, no sponsored quick reviews—just honest evaluation from someone who&apos;s used professional
              equipment to feed hundreds of customers daily.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-lg italic">
                &quot;I&apos;ve seen brand new, expensive equipment fail during a Saturday night dinner rush.
                That&apos;s a lesson you don&apos;t learn in a lab. For me, testing isn&apos;t just about finding
                the best features; it&apos;s about finding what won&apos;t let you down when the pressure is on.&quot;
              </p>
              <p className="text-sm mt-3 font-semibold">— Scott Bradley</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Rigorous Process - The "How" */}
      {/* Stats Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-orange-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Uncompromising 6-Month Testing Process
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            No lab tests. No sponsored quick reviews. Just 6+ months of real restaurant kitchen testing
            with actual kitchen staff under high-volume conditions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">6+ Months</div>
              <div className="text-sm text-white/80">Minimum testing period</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">Pro Kitchen</div>
              <div className="text-sm text-white/80">Real restaurant testing</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">5 Reviews</div>
              <div className="text-sm text-white/80">Growing collection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Our 4-Phase Testing Process
            </h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Every piece of equipment goes through the same rigorous process, from initial unboxing
              to final recommendation after months of professional kitchen use.
            </p>
          </div>

          <div className="space-y-8">
            {testingPhases.map((phase, index) => {
              const IconComponent = phase.icon
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-orange-800" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="text-xl font-bold text-slate-900">
                          Phase {index + 1}: {phase.phase}
                        </h4>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2 text-slate-700">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Three-Tier Review System */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Our Three-Tier Review System
            </h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Every review displays one of three tier badges showing exactly what kind of testing
              and experience backs each recommendation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Tier 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-400">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
                <h4 className="text-xl font-bold text-amber-900">Tier 1</h4>
              </div>
              <h5 className="font-bold text-slate-900 mb-3">Professional Kitchen Tested</h5>
              <p className="text-sm text-slate-700 mb-3">
                18+ months of testing in demanding restaurant environments serving 200+ covers nightly.
                These products have survived the ultimate stress test.
              </p>
              <p className="text-xs text-slate-600 italic">
                The gold standard: proven where failure means lost revenue.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-400">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <h4 className="text-xl font-bold text-blue-900">Tier 2</h4>
              </div>
              <h5 className="font-bold text-slate-900 mb-3">Currently Testing</h5>
              <p className="text-sm text-slate-700 mb-3">
                Active home testing for 30-90+ days with real-time updates. Reviews evolve as I
                discover strengths and weaknesses.
              </p>
              <p className="text-xs text-slate-600 italic">
                Transparent insights during the testing period with professional perspective.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border-2 border-slate-400">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-slate-600" />
                <h4 className="text-xl font-bold text-slate-900">Tier 3</h4>
              </div>
              <h5 className="font-bold text-slate-900 mb-3">Professional Recommendation</h5>
              <p className="text-sm text-slate-700 mb-3">
                Informed opinions based on 40 years of cooking experience and understanding what
                makes equipment work in real kitchens.
              </p>
              <p className="text-xs text-slate-600 italic">
                Experience-based guidance with clear disclosure about testing status.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
            <p className="text-slate-700 mb-4">
              This tier system exists for one reason: <strong>radical transparency</strong>. You deserve
              to know exactly what experience backs each recommendation.
            </p>
            <CTAVisibilityTracker
              ctaId="about-tier-system-link"
              position="mid_article"
            >
              <Link
                href="/review-tiers"
                className="inline-block text-orange-600 hover:text-orange-800 font-semibold underline"
              >
                Learn more about our tier system →
              </Link>
            </CTAVisibilityTracker>
          </div>
        </div>
      </section>

      {/* Evaluation Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Our Scoring System
            </h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Each piece of equipment is scored across 5 key categories, weighted by importance
              for professional kitchen environments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {evaluationCriteria.map((criteria, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-slate-900">{criteria.category}</h4>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {criteria.weight}
                  </span>
                </div>
                <p className="text-slate-700 mb-4">{criteria.description}</p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-slate-800 text-sm">Key Metrics:</h5>
                  <ul className="space-y-1">
                    {criteria.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1 h-1 bg-slate-400 rounded-full flex-shrink-0" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Kitchen Testing */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Why Real Kitchen Testing Matters
            </h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Lab tests can&apos;t replicate the chaos of a busy service. Here&apos;s why we test in actual restaurants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <TrendingUp className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-bold mb-3">High-Volume Stress Testing</h4>
              <p className="text-sm text-white/80">
                Equipment faces 200+ covers per night, multiple staff members, and constant use
                during peak service hours.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-bold mb-3">Professional Kitchen Experience</h4>
              <p className="text-sm text-white/80">
                23+ years of restaurant experience provides comprehensive evaluation
                of usability, durability, and real-world performance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Shield className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-bold mb-3">Safety Under Pressure</h4>
              <p className="text-sm text-white/80">
                We see how equipment behaves when staff are rushed, stressed, and working
                in fast-paced environments.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Clock className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-bold mb-3">Long-Term Reliability</h4>
              <p className="text-sm text-white/80">
                6+ months reveals wear patterns, maintenance needs, and reliability issues
                that short-term testing misses.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <DollarSign className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-bold mb-3">True Cost Analysis</h4>
              <p className="text-sm text-white/80">
                We track maintenance, replacement parts, and productivity impact to
                calculate real total cost of ownership.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Award className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-bold mb-3">Unbiased Results</h4>
              <p className="text-sm text-white/80">
                No manufacturer influence - we buy equipment ourselves or test in kitchens
                where we work as professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Full Transparency Promise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-slate-900 mb-3">What We DON&apos;T Do</h4>
              <ul className="text-left space-y-2 text-slate-700">
                <li>❌ Accept free products for review</li>
                <li>❌ Allow manufacturers to influence ratings</li>
                <li>❌ Publish reviews after just weeks of testing</li>
                <li>❌ Hide negative aspects of recommended products</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-slate-900 mb-3">What We DO</h4>
              <ul className="text-left space-y-2 text-slate-700">
                <li>✅ Purchase equipment with our own funds</li>
                <li>✅ Test for minimum 6 months in real kitchens</li>
                <li>✅ Report both strengths and weaknesses</li>
                <li>✅ Update reviews based on long-term performance</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 mb-3">Our Commitment</h4>
            <p className="text-slate-700">
              Every recommendation is one I&apos;d make to my own kitchen staff. Every &quot;avoid&quot;
              recommendation is based on real problems we encountered, not minor nitpicks.
              Your success in the kitchen depends on reliable equipment, and that&apos;s what we help you find.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
