'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Hash } from 'lucide-react'

interface NavigationItem {
  id: string
  title: string
  level: number
}

interface JumpNavigationProps {
  items: NavigationItem[]
}

export default function JumpNavigation({ items }: JumpNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0.1,
      }
    )

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [items])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsOpen(false)
  }

  if (items.length === 0) return null

  return (
    <div className="sticky top-20 z-30 mb-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          aria-expanded={isOpen}
          aria-controls="jump-navigation-content"
        >
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-orange-700" />
            <span className="font-semibold text-gray-900">Jump to Section</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Navigation List */}
        {isOpen && (
          <div
            id="jump-navigation-content"
            className="border-t border-gray-200 max-h-80 overflow-y-auto"
          >
            <nav className="p-2">
              <ul className="space-y-1">
                {items.map((item) => {
                  const isActive = activeSection === item.id
                  const paddingLeft = item.level === 2 ? 'pl-4' : item.level === 3 ? 'pl-8' : 'pl-2'

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleClick(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 ${paddingLeft} ${
                          isActive
                            ? 'bg-orange-50 text-orange-800 font-medium border-l-2 border-orange-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to extract headings from content
export function extractHeadings(): NavigationItem[] {
  if (typeof window === 'undefined') return []

  const headings = document.querySelectorAll('h1, h2, h3')
  const items: NavigationItem[] = []

  headings.forEach((heading) => {
    if (heading.id && heading.textContent) {
      const level = parseInt(heading.tagName.charAt(1))
      items.push({
        id: heading.id,
        title: heading.textContent.trim(),
        level: level
      })
    }
  })

  return items
}