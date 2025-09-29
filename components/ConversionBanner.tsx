'use client'
import { useState, useEffect } from 'react'
import { X, Gift, Clock } from 'lucide-react'

interface ConversionBannerProps {
  type?: 'free-guide' | 'limited-time' | 'social-proof'
  autoHide?: boolean
  delay?: number
}

export default function ConversionBanner({ 
  type = 'free-guide',
  autoHide = true,
  delay = 5000
}: ConversionBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    // Check if banner was dismissed today
    const dismissed = localStorage.getItem(`banner-${type}-dismissed`)
    const today = new Date().toDateString()
    
    if (dismissed === today) return

    // Show banner after delay
    const timer = setTimeout(() => setIsVisible(true), delay)
    
    return () => clearTimeout(timer)
  }, [type, delay])

  useEffect(() => {
    if (type === 'limited-time' && isVisible) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsVisible(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [type, isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
    if (autoHide) {
      const today = new Date().toDateString()
      localStorage.setItem(`banner-${type}-dismissed`, today)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isVisible) return null

  const bannerConfig = {
    'free-guide': {
      bg: 'bg-gradient-to-r from-orange-500 to-red-600',
      icon: <Gift className="w-5 h-5" />,
      title: 'FREE Chef\'s Kitchen Setup Guide',
      subtitle: 'Get my "10 Essential Tools Every Kitchen Needs" guide + exclusive deals',
      cta: 'Get Free Guide',
      link: '/newsletter'
    },
    'limited-time': {
      bg: 'bg-gradient-to-r from-red-600 to-pink-600',
      icon: <Clock className="w-5 h-5" />,
      title: 'Limited Time: Extra 15% Off',
      subtitle: `Exclusive deals expire in ${formatTime(timeLeft)}`,
      cta: 'Shop Deals',
      link: '/deals'
    },
    'social-proof': {
      bg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      icon: <Gift className="w-5 h-5" />,
      title: 'Join Our Newsletter',
      subtitle: 'Get equipment insights and honest product recommendations',
      cta: 'Join Free',
      link: '/newsletter'
    }
  }

  const config = bannerConfig[type]

  return (
    <div className={`${config.bg} text-white shadow-lg relative z-40 animate-in slide-in-from-top duration-500`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex-shrink-0">
              {config.icon}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm md:text-base">
                {config.title}
              </div>
              <div className="text-xs md:text-sm opacity-90">
                {config.subtitle}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a
              href={config.link}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex-shrink-0"
              onClick={() => handleDismiss()}
            >
              {config.cta}
            </a>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}