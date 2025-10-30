import { ReactNode } from 'react'

interface CompatibilityCategory {
  title: string
  emoji: string
  description?: string
  items: {
    name: string
    rating: 'excellent' | 'good' | 'fair' | 'avoid'
    note?: string
  }[]
}

interface CompatibilityGuideProps {
  title: string
  introText?: ReactNode
  categories: CompatibilityCategory[]
}

export default function CompatibilityGuide({
  title,
  introText,
  categories
}: CompatibilityGuideProps) {
  const getRatingStyle = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'avoid':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return '★★★ Excellent'
      case 'good':
        return '★★ Good'
      case 'fair':
        return '★ Fair'
      case 'avoid':
        return '✗ Avoid'
      default:
        return rating
    }
  }

  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      {introText && (
        <div className="text-slate-600 leading-relaxed mb-6">
          {introText}
        </div>
      )}

      <div className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{category.emoji}</span>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1 mt-0">
                  {category.title}
                </h3>
                {category.description && (
                  <p className="text-sm text-slate-600 m-0">{category.description}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded border whitespace-nowrap ${getRatingStyle(
                        item.rating
                      )}`}
                    >
                      {getRatingLabel(item.rating)}
                    </span>
                  </div>
                  {item.note && (
                    <p className="text-sm text-slate-600 m-0">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
