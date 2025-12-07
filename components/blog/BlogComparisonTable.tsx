interface ComparisonFeature {
  feature: string
  [key: string]: any
}

interface BlogComparisonTableProps {
  title: string
  columnA: string
  columnB: string
  features: ComparisonFeature[]
}

/**
 * BlogComparisonTable - Side-by-side feature comparison with color-coded ratings
 *
 * Displays responsive comparison table for two options. Ratings are color-coded:
 * - Green: "Excellent", "Yes", positive indicators
 * - Yellow: "Moderate", "Good", middle-ground ratings
 * - Orange/Red: "Limited", "Poor", "No", negative indicators
 *
 * @example
 * ```tsx
 * import { BlogComparisonTable } from '@/components/blog'
 *
 * <BlogComparisonTable
 *   title="Carbon Steel vs Stainless Steel: At a Glance"
 *   columnA="Carbon Steel"
 *   columnB="Stainless Steel"
 *   features={[
 *     {
 *       feature: "Maximum Sharpness",
 *       columnA: {
 *         rating: "Excellent",
 *         description: "Achieves razor-sharp edges"
 *       },
 *       columnB: {
 *         rating: "Very Good",
 *         description: "Excellent sharpness, slightly less keen"
 *       }
 *     }
 *   ]}
 * />
 * ```
 */
export default function BlogComparisonTable({
  title,
  columnA,
  columnB,
  features
}: BlogComparisonTableProps) {
  // Helper function to determine rating color
  const getRatingColor = (rating: string): string => {
    const ratingLower = rating.toLowerCase()

    // Green for positive ratings
    if (
      ratingLower.includes('excellent') ||
      ratingLower.includes('yes') ||
      ratingLower.includes('instant') ||
      ratingLower.includes('easy') ||
      ratingLower.includes('simple')
    ) {
      return 'text-green-700'
    }

    // Yellow for moderate ratings
    if (
      ratingLower.includes('good') ||
      ratingLower.includes('moderate') ||
      ratingLower.includes('average')
    ) {
      return 'text-yellow-700'
    }

    // Orange for concerning ratings
    if (
      ratingLower.includes('limited') ||
      ratingLower.includes('challenging') ||
      ratingLower.includes('difficult')
    ) {
      return 'text-orange-700'
    }

    // Red for negative ratings
    if (
      ratingLower.includes('poor') ||
      ratingLower.includes('no') ||
      ratingLower.includes('never') ||
      ratingLower.includes('impossible')
    ) {
      return 'text-red-600'
    }

    // Default slate for neutral/custom ratings
    return 'text-slate-900'
  }

  // Get the actual property names from the first feature (excluding 'feature')
  const getColumnKeys = (feature: ComparisonFeature): [string, string] => {
    const keys = Object.keys(feature).filter(k => k !== 'feature')
    return [keys[0], keys[1]]
  }

  const [columnAKey, columnBKey] = features.length > 0 ? getColumnKeys(features[0]) : ['columnA', 'columnB']

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 border-b-2 border-gray-200 font-bold">Feature</th>
              <th className="text-left p-4 border-b-2 border-gray-200 font-bold">{columnA}</th>
              <th className="text-left p-4 border-b-2 border-gray-200 font-bold">{columnB}</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => {
              const colAData = feature[columnAKey]
              const colBData = feature[columnBKey]

              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 font-semibold">{feature.feature}</td>
                  <td className="p-4">
                    <span className={`font-semibold ${getRatingColor(colAData.rating)}`}>
                      {colAData.rating}
                    </span>
                    <p className="text-sm text-slate-700 mt-1">{colAData.description}</p>
                  </td>
                  <td className="p-4">
                    <span className={`font-semibold ${getRatingColor(colBData.rating)}`}>
                      {colBData.rating}
                    </span>
                    <p className="text-sm text-slate-700 mt-1">{colBData.description}</p>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
