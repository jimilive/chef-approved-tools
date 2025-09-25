import Link from 'next/link'
import Image from 'next/image'

export default function CategoryCards() {
  const categories = [
    {
      name: 'Chef Knives',
      href: '/knives',
      icon: '🔪',
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=400',
      count: 24,
      description: 'Professional blades for precision cutting',
      popular: ['Wüsthof Classic', 'Victorinox Fibrox', 'Shun Premier']
    },
    {
      name: 'Cookware',
      href: '/cookware',
      icon: '🍳',
      image: 'https://images.unsplash.com/photo-1604909052743-89c5a74e83d7?q=80&w=400',
      count: 18,
      description: 'Pans and pots that deliver restaurant results',
      popular: ['All-Clad D3', 'Lodge Cast Iron', 'Le Creuset']
    },
    {
      name: 'Appliances',
      href: '/appliances',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1585515656642-6a3da3be92f7?q=80&w=400',
      count: 32,
      description: 'Power tools for efficient cooking',
      popular: ['Vitamix', 'KitchenAid', 'Breville']
    },
    {
      name: 'Kitchen Tools',
      href: '/tools',
      icon: '🥄',
      image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=400',
      count: 45,
      description: 'Essential gadgets and utensils',
      popular: ['OXO Good Grips', 'Microplane', 'Fish Turner']
    },
    {
      name: 'Baking',
      href: '/baking',
      icon: '🧁',
      image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=400',
      count: 28,
      description: 'Professional baking equipment',
      popular: ['Nordic Ware', 'USA Pan', 'Silpat']
    },
    {
      name: 'Storage',
      href: '/storage',
      icon: '📦',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=400',
      count: 21,
      description: 'Keep ingredients fresh longer',
      popular: ['Rubbermaid', 'OXO POP', 'Cambro']
    }
  ]
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Background Image */}
          <div className="aspect-video relative overflow-hidden bg-gray-100">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Category Icon */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl">
              {category.icon}
            </div>
            
            {/* Product Count Badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
              {category.count} products
            </div>
            
            {/* Category Name */}
            <div className="absolute bottom-4 left-4">
              <h3 className="text-2xl font-bold text-white mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-200">
                {category.description}
              </p>
            </div>
          </div>
          
          {/* Bottom Content */}
          <div className="p-4 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Popular brands:</p>
                <p className="text-sm text-gray-700 font-medium">
                  {category.popular.slice(0, 2).join(', ')}
                </p>
              </div>
              <svg 
                className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}