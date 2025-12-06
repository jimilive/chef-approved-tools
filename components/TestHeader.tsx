import Link from 'next/link'

export default function TestHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top row - Site name */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <h1 className="text-sm font-semibold text-gray-900">
            ChefApprovedTools
          </h1>
          <p className="text-xs text-gray-700">
            Professional Equipment Reviews
          </p>
        </div>
      </div>

      {/* Bottom row - Navigation */}
      <nav className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-between text-xs">
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/cutting-tools"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Cutting Tools
            </Link>
          </li>
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/cookware"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Cookware/Bakeware
            </Link>
          </li>
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/appliances"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Smaller Appliances
            </Link>
          </li>
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/moving-stirring"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Moving/Stirring Tools
            </Link>
          </li>
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/measuring"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Measuring Tools
            </Link>
          </li>
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/prep-service"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Prep/Service Tools
            </Link>
          </li>
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/maintenance"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Maintenance Tools
            </Link>
          </li>
          <li className="border-r border-gray-300 flex-1 text-center">
            <Link
              href="/blog"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Blog/Guides
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link
              href="/about"
              className="block py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            >
              Info/About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
