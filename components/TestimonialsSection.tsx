import { Star } from 'lucide-react'

interface Testimonial {
  id: string
  content: string
  author: string
  role: string
  location: string
  rating: number
  verified: boolean
}

const testimonials: Testimonial[] = []

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
            Professional Kitchen Experience
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Equipment reviews based on real commercial kitchen testing and 18+ years of restaurant experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                {testimonial.verified && (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    Verified
                  </span>
                )}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-slate-700 mb-4 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="font-semibold text-slate-900">{testimonial.author}</div>
                <div className="text-sm text-slate-600">{testimonial.role}</div>
                <div className="text-xs text-slate-500">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Background */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">18+ Years Restaurant Experience</h3>
            <p className="text-slate-700">
              Reviews based on real-world testing in professional kitchen environments.
              All recommendations backed by hands-on experience, not marketing claims.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-slate-600 mb-4">
            Get professional equipment insights from 18+ years of restaurant experience
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get Free Equipment Guide
          </a>
        </div>
      </div>
    </section>
  )
}