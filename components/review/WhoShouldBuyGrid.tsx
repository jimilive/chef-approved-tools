interface WhoShouldBuyGridProps {
  title: string
  perfectForTitle?: string
  considerAlternativesTitle?: string
  perfectFor: string[]
  considerAlternatives: string[]
}

export default function WhoShouldBuyGrid({
  title,
  perfectForTitle = "✅ Perfect For:",
  considerAlternativesTitle = "⚠️ Consider Alternatives If:",
  perfectFor,
  considerAlternatives
}: WhoShouldBuyGridProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Perfect For */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 mt-0 text-green-800">{perfectForTitle}</h3>
          <ul className="list-none p-0 m-0">
            {perfectFor.map((item, index) => (
              <li
                key={index}
                className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-700 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Consider Alternatives */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 mt-0 text-orange-800">{considerAlternativesTitle}</h3>
          <ul className="list-none p-0 m-0">
            {considerAlternatives.map((item, index) => (
              <li
                key={index}
                className="py-2 pl-6 relative text-[15px] leading-relaxed text-slate-700 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold before:text-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
