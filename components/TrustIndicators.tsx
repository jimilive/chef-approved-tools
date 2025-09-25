export default function TrustIndicators() {
  const indicators = [
    {
      icon: '🎓',
      title: 'Culinary Education',
      description: 'A.A.S. Culinary Arts + B.S. Business from accredited institutions',
      highlight: 'Formally Trained'
    },
    {
      icon: '👨‍🍳',
      title: 'Restaurant Experience',
      description: '5+ years managing $80K+/month operations at premier restaurants',
      highlight: 'Professional Chef'
    },
    {
      icon: '🔬',
      title: '6+ Month Testing',
      description: 'Every product tested extensively in real kitchen environments',
      highlight: 'Long-term Testing'
    },
    {
      icon: '💰',
      title: 'Independent Reviews',
      description: 'We buy all products ourselves - no free samples accepted',
      highlight: 'Unbiased'
    }
  ]
  
  return (
    <section className="bg-white py-12 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{indicator.icon}</div>
              <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
                {indicator.highlight}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {indicator.title}
              </h3>
              <p className="text-xs text-gray-600">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}