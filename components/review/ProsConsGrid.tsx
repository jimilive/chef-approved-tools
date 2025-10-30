interface ProsConsGridProps {
  title: string
  prosTitle?: string
  consTitle?: string
  pros: string[]
  cons: string[]
}

export default function ProsConsGrid({
  title,
  prosTitle = "What I Love After 5+ Years",
  consTitle = "Limitations & Long-Term Concerns",
  pros,
  cons
}: ProsConsGridProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-green-50 border border-green-300 rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 mt-0 text-green-800">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {prosTitle}
          </h3>
          <ul className="list-none p-0 m-0">
            {pros.map((pro, index) => (
              <li
                key={index}
                className="py-2 pl-6 relative text-sm leading-relaxed text-green-900 before:content-['•'] before:absolute before:left-0 before:text-green-600 before:font-bold before:text-xl"
              >
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 mt-0 text-red-800">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {consTitle}
          </h3>
          <ul className="list-none p-0 m-0">
            {cons.map((con, index) => (
              <li
                key={index}
                className="py-2 pl-6 relative text-sm leading-relaxed text-red-900 before:content-['•'] before:absolute before:left-0 before:text-red-500 before:font-bold before:text-xl"
              >
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
