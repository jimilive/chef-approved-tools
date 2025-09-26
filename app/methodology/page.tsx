import { Clock, Shield, TrendingUp, Award, Users, DollarSign } from 'lucide-react'
import { Metadata } from 'next'
import FAQSchema from '@/components/FAQSchema'

export const metadata: Metadata = {
  title: 'How We Test Kitchen Equipment - Our Professional Testing Methodology',
  description: 'Learn about our rigorous 6-month testing process in real restaurant kitchens. No lab tests - just real-world professional kitchen conditions.',
  keywords: 'kitchen equipment testing, professional kitchen testing, restaurant equipment review process, chef equipment methodology',
}

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
      "Multiple staff member feedback collection",
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

const methodologyFAQs = [
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
    answer: "We use a weighted scoring system across 5 categories: Performance (30%), Durability (25%), Usability (20%), Value (15%), and Versatility (10%). Each category has specific metrics we track over months of use, with input from multiple kitchen staff members to eliminate personal bias."
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

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={methodologyFAQs} />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-orange-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How We Test Kitchen Equipment
          </h1>
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
              <div className="text-2xl font-bold mb-1">12+ Staff</div>
              <div className="text-sm text-white/80">Multiple user feedback</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">Many Tools</div>
              <div className="text-sm text-white/80">Tested since 2007</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our 4-Phase Testing Process
            </h2>
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
                        <IconComponent className="w-6 h-6 text-orange-700" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-slate-900">
                          Phase {index + 1}: {phase.phase}
                        </h3>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
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

      {/* Evaluation Criteria */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Scoring System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Each piece of equipment is scored across 5 key categories, weighted by importance
              for professional kitchen environments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {evaluationCriteria.map((criteria, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{criteria.category}</h3>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {criteria.weight}
                  </span>
                </div>
                <p className="text-slate-700 mb-4">{criteria.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-800 text-sm">Key Metrics:</h4>
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
            <h2 className="text-3xl font-bold mb-4">
              Why Real Kitchen Testing Matters
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Lab tests can&apos;t replicate the chaos of a busy service. Here&apos;s why we test in actual restaurants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <TrendingUp className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-bold mb-3">High-Volume Stress Testing</h3>
              <p className="text-sm text-white/80">
                Equipment faces 200+ covers per night, multiple staff members, and constant use
                during peak service hours.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-bold mb-3">Multiple User Perspectives</h3>
              <p className="text-sm text-white/80">
                Line cooks, prep cooks, and managers all provide feedback on usability,
                durability, and real-world performance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Shield className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-bold mb-3">Safety Under Pressure</h3>
              <p className="text-sm text-white/80">
                We see how equipment behaves when staff are rushed, stressed, and working
                in fast-paced environments.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Clock className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-bold mb-3">Long-Term Reliability</h3>
              <p className="text-sm text-white/80">
                6+ months reveals wear patterns, maintenance needs, and reliability issues
                that short-term testing misses.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <DollarSign className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-bold mb-3">True Cost Analysis</h3>
              <p className="text-sm text-white/80">
                We track maintenance, replacement parts, and productivity impact to
                calculate real total cost of ownership.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Award className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-bold mb-3">Unbiased Results</h3>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Full Transparency Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-slate-900 mb-3">What We DON&apos;T Do</h3>
              <ul className="text-left space-y-2 text-slate-700">
                <li>❌ Accept free products for review</li>
                <li>❌ Allow manufacturers to influence ratings</li>
                <li>❌ Publish reviews after just weeks of testing</li>
                <li>❌ Hide negative aspects of recommended products</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-slate-900 mb-3">What We DO</h3>
              <ul className="text-left space-y-2 text-slate-700">
                <li>✅ Purchase equipment with our own funds</li>
                <li>✅ Test for minimum 6 months in real kitchens</li>
                <li>✅ Report both strengths and weaknesses</li>
                <li>✅ Update reviews based on long-term performance</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-3">Our Commitment</h3>
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