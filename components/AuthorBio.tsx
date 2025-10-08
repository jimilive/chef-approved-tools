import Image from 'next/image'
import Link from 'next/link'

interface AuthorBioProps {
  variant?: 'full' | 'compact' | 'inline'
  showImage?: boolean
}

export default function AuthorBio({ variant = 'full', showImage = true }: AuthorBioProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        {showImage && (
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src="/images/team/head-shot-1.jpg"
              alt="Scott Bradley"
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}
        <div>
          <h4 className="font-bold text-slate-900">Scott Bradley</h4>
          <p className="text-sm text-gray-600">Professional Chef, 40 Years Experience</p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-start gap-3">
        {showImage && (
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/images/team/head-shot-1.jpg"
              alt="Scott Bradley"
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold text-slate-900">
            Written by <Link href="/about" className="text-orange-600 hover:text-orange-700">Scott Bradley</Link>
          </div>
          <p className="text-sm text-gray-600">
            Former Kitchen Manager at Mellow Mushroom with 21+ years of professional cooking experience.
            Every tool tested in real restaurant environments.
          </p>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-6 sm:p-8 border-2 border-orange-200">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {showImage && (
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
            <Image
              src="/images/team/head-shot-1.jpg"
              alt="Scott Bradley - Professional Chef"
              fill
              className="object-cover rounded-full shadow-lg border-4 border-orange-400"
            />
          </div>
        )}

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">About the Author</h3>
          <h4 className="text-xl font-semibold text-orange-700 mb-3">Scott Bradley</h4>

          <p className="text-slate-700 mb-4 leading-relaxed">
            Professional chef with 21+ years of professional cooking, from starting at Wendy&apos;s at age 15
            to managing kitchen operations at Mellow Mushroom. Formally trained at Seattle Central College
            Culinary Arts program with over 21 years in professional kitchens.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="font-bold text-orange-600">40 Years</div>
              <div className="text-gray-600">Cooking Experience</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="font-bold text-orange-600">21+ Years</div>
              <div className="text-gray-600">Professional Kitchens</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="font-bold text-orange-600">6+ Months</div>
              <div className="text-gray-600">Testing Per Product</div>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-4">
            Every recommendation is backed by real restaurant testing—no shortcuts,
            no sponsored quick reviews. Just honest evaluation from someone who&apos;s used
            professional equipment to feed hundreds of customers daily.
          </p>

          <Link
            href="/about"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Read Full Bio →
          </Link>
        </div>
      </div>
    </div>
  )
}
