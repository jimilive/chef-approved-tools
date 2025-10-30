import Link from 'next/link'
import { ReactNode } from 'react'

interface ComparisonRow {
  feature: string
  mainProduct: string | ReactNode
  mainProductStyle?: 'default' | 'success' | 'warning' | 'info'
  competitor1: string | ReactNode
  competitor1Style?: 'default' | 'success' | 'warning' | 'info'
  competitor2: string | ReactNode
  competitor2Style?: 'default' | 'success' | 'warning' | 'info'
}

interface ComparisonTableProps {
  title: string
  introText?: ReactNode
  mainProductName: string
  competitor1Name: string
  competitor2Name: string
  rows: ComparisonRow[]
}

export default function ComparisonTable({
  title,
  introText,
  mainProductName,
  competitor1Name,
  competitor2Name,
  rows
}: ComparisonTableProps) {
  const getTextColor = (style?: string) => {
    switch (style) {
      case 'success':
        return 'text-green-700 font-semibold'
      case 'warning':
        return 'text-orange-700 font-semibold'
      case 'info':
        return 'text-sky-700 font-semibold'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      {introText && (
        <div className="text-slate-600 mb-6 leading-relaxed">
          {introText}
        </div>
      )}

      <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-slate-800">
              <th className="text-white text-left px-4 py-4 font-semibold text-[15px]">Feature</th>
              <th className="text-white text-left px-4 py-4 font-semibold text-[15px]">{mainProductName}</th>
              <th className="text-white text-left px-4 py-4 font-semibold text-[15px]">{competitor1Name}</th>
              <th className="text-white text-left px-4 py-4 font-semibold text-[15px]">{competitor2Name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'border-b border-gray-200' : 'bg-gray-50 border-b border-gray-200'}
              >
                <td className="px-4 py-4 font-semibold text-slate-900 text-[15px]">{row.feature}</td>
                <td className={`px-4 py-4 text-[15px] ${getTextColor(row.mainProductStyle)}`}>
                  {row.mainProduct}
                </td>
                <td className={`px-4 py-4 text-[15px] ${getTextColor(row.competitor1Style)}`}>
                  {row.competitor1}
                </td>
                <td className={`px-4 py-4 text-[15px] ${getTextColor(row.competitor2Style)}`}>
                  {row.competitor2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
