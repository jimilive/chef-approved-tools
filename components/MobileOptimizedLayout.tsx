'use client'
import { useEffect } from 'react'

interface MobileOptimizedLayoutProps {
  children: React.ReactNode
}

export default function MobileOptimizedLayout({ children }: MobileOptimizedLayoutProps) {
  useEffect(() => {
    // Add mobile-specific CSS optimizations
    const style = document.createElement('style')
    style.textContent = `
      /* Smooth scrolling on mobile */
      html {
        scroll-behavior: smooth;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Optimize tap targets for mobile */
      button, [role="button"], input[type="submit"], input[type="button"] {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }

      /* Better button interactions on mobile */
      @media (max-width: 768px) {
        button:active, [role="button"]:active {
          transform: scale(0.98);
          transition: transform 0.1s ease;
        }

        /* Prevent zoom on inputs */
        input[type="email"], input[type="text"], input[type="search"], input[type="tel"], input[type="url"], input[type="password"], textarea, select {
          font-size: 16px !important;
        }

        /* Better mobile form styling */
        input, textarea, select {
          border-radius: 8px;
          min-height: 44px;
        }

        /* Optimize mobile scrolling */
        .mobile-scroll {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
      }

      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      /* Mobile-first focus styles */
      @media (max-width: 768px) {
        *:focus {
          outline: 2px solid #ea580c;
          outline-offset: 2px;
          border-radius: 4px;
        }
      }
    `

    document.head.appendChild(style)

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  return <>{children}</>
}