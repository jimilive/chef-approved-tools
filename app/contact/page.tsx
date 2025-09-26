import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact - Chef Approved Tools',
  description: 'Get in touch with Scott, former kitchen manager and culinary professional behind Chef Approved Tools.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Questions about kitchen equipment? Want to share your own professional experience?
            I&apos;d love to hear from fellow chefs and home cooks.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>

            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Professional Background</h3>
                <p className="text-slate-600 text-sm">
                  Former Kitchen Manager at Mellow Mushroom (Athens, GA)<br />
                  Seattle Central College - A.A.S. Culinary Arts<br />
                  15+ years in professional kitchens
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">What I Review</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Professional kitchen knives</li>
                  <li>• Commercial-grade cookware</li>
                  <li>• Restaurant equipment for home use</li>
                  <li>• Small appliances that actually last</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
                <p className="text-slate-600 text-sm">
                  I typically respond within 2-3 business days. For urgent equipment questions,
                  please mention it in your subject line.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select a topic</option>
                    <option value="equipment-question">Equipment Question</option>
                    <option value="review-request">Review Request</option>
                    <option value="professional-feedback">Professional Feedback</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="What would you like to know about professional kitchen equipment?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-slate-500">
                  By submitting this form, you agree that your message may be used to improve
                  our content and help other professional chefs and home cooks.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Do you accept products for review?
              </h3>
              <p className="text-slate-600 text-sm">
                I only review equipment I purchase myself or have extensive experience with
                in professional kitchens. This ensures honest, unbiased recommendations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Can you recommend equipment for my restaurant?
              </h3>
              <p className="text-slate-600 text-sm">
                While I can&apos;t provide personalized consulting, my reviews focus on commercial-grade
                equipment that performs well in high-volume operations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                How do you test equipment?
              </h3>
              <p className="text-slate-600 text-sm">
                All recommendations are based on real-world use in professional kitchens,
                typically 6+ months of daily service before I&apos;ll recommend anything.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Do you offer knife sharpening services?
              </h3>
              <p className="text-slate-600 text-sm">
                I don&apos;t offer sharpening services, but I can recommend local professionals
                and provide guidance on maintaining your knives properly.
              </p>
            </div>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            ← Back to Home
          </Link>
        </nav>
      </div>
    </main>
  )
}