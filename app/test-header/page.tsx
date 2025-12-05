'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function TestHeaderPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navigation = [
    { name: 'Cutting Tools', href: '/cutting-tools', id: 'cutting-tools' },
    { name: 'Cookware & Bakeware', href: '/cookware-bakeware', id: 'cookware-bakeware' },
    { name: 'Smaller Appliances', href: '/smaller-appliances', id: 'smaller-appliances' },
    { name: 'Moving & Stirring Tools', href: '/moving-stirring-tools', id: 'moving-stirring-tools' },
    { name: 'Measuring Tools', href: '/measuring-tools', id: 'measuring-tools' },
    { name: 'Prep & Service Tools', href: '/prep-service-tools', id: 'prep-service-tools' },
    { name: 'Maintenance Tools', href: '/maintenance-tools', id: 'maintenance-tools' },
    { name: 'Blog & Guides', href: '/blog', id: 'blog-guides' },
    { name: 'Info & About', href: '/about', id: 'info-about', highlight: true },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-800 border-b border-gray-600 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 no-underline hover:opacity-90 transition-opacity mr-8">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Chef Approved Tools"
                  width={48}
                  height={48}
                  sizes="48px"
                  quality={75}
                  className="h-12 w-auto drop-shadow-lg"
                  priority
                />
              </div>
              <div className="flex flex-col text-center">
                <span className="text-2xl font-bold text-white hidden sm:inline leading-tight whitespace-nowrap">
                  Chef<span className="text-orange-400">Approved</span>Tools
                </span>
                <span className="text-sm text-gray-300 hidden sm:inline font-medium whitespace-nowrap">
                  Professional Equipment Reviews
                </span>
                <span className="text-lg font-bold text-white sm:hidden">
                  Chef<span className="text-orange-400">Approved</span>Tools
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="font-medium text-gray-300 hover:text-white px-2 py-2 rounded-md text-sm transition-colors text-center"
                >
                  {item.highlight ? (
                    <span className="text-orange-400">Info & About</span>
                  ) : (
                    item.name
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <>
              {/* Mobile Menu Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Mobile Menu Panel */}
              <div className="md:hidden fixed left-0 right-0 top-16 z-30 bg-slate-900 border-t border-gray-600 shadow-xl transform transition-transform duration-200 ease-in-out">
                <div className="px-4 pt-4 pb-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-150 transform hover:scale-105"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.highlight ? (
                        <span className="text-orange-400">Info & About</span>
                      ) : (
                        item.name
                      )}
                    </Link>
                  ))}

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-gray-600 mt-4">
                    <Link
                      href="/newsletter"
                      className="flex items-center justify-center w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      🎯 Get Free Chef Guide
                    </Link>
                  </div>

                  {/* Quick Links */}
                  <div className="pt-4 border-t border-gray-600 mt-4">
                    <p className="text-gray-400 text-sm font-medium mb-3">Quick Access</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/privacy-policy"
                        className="text-gray-400 hover:text-white text-sm py-2 px-3 rounded hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Privacy
                      </Link>
                      <Link
                        href="/disclosure"
                        className="text-gray-400 hover:text-white text-sm py-2 px-3 rounded hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Disclosure
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test Header Preview
          </h1>
          <p className="text-gray-600 mb-4">
            This page displays the header with updated text:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Site name: ChefApprovedTools (instead of Chef&lt;orange&gt;Approved&lt;/orange&gt;Tools)</li>
            <li>Subtitle: Professional Equipment Reviews (instead of Professional Kitchen Equipment)</li>
            <li>Navigation updated to 9 new categories</li>
          </ul>
        </div>
      </main>
    </>
  )
}
