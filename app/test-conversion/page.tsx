'use client'

import { useState } from 'react'
import {
  ABTestWrapper,
  UrgencyBanner,
  SocialProof,
  StickyCTA,
  CountdownTimer,
  ConversionTracker
} from '@/components/ConversionOptimizer'

export default function ConversionTestPage() {
  const [showBanner, setShowBanner] = useState(true)

  // Test countdown (24 hours from now)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Urgency Banner Test */}
      {showBanner && (
        <UrgencyBanner
          message="🔥 24-Hour Flash Sale: Professional Chef Tools Up to 40% Off!"
          type="limited-time"
        />
      )}

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Conversion Optimization Test Page
        </h1>

        <div className="grid gap-8">
          {/* A/B Test Example */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">A/B Testing</h2>

            <ABTestWrapper variant="A" testId="headline-test">
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-900">Version A: Professional Grade Tools</h3>
                <p className="text-blue-800">Restaurant-quality equipment for serious home cooks</p>
              </div>
            </ABTestWrapper>

            <ABTestWrapper variant="B" testId="headline-test">
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                <h3 className="font-bold text-green-900">Version B: Chef-Approved Excellence</h3>
                <p className="text-green-800">Tools trusted by professional chefs worldwide</p>
              </div>
            </ABTestWrapper>

            <p className="text-sm text-gray-600 mt-2">
              Refresh the page multiple times to see different versions
            </p>
          </section>

          {/* Social Proof Test */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Social Proof</h2>
            <SocialProof count={0} action="ordered kitchen tools" timeframe="this month" />
            <SocialProof count={0} action="signed up for our newsletter" timeframe="today" variant="floating" />
          </section>

          {/* Countdown Timer Test */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Countdown Timer</h2>
            <div className="text-center">
              <p className="text-lg mb-4">Flash Sale Ends In:</p>
              <CountdownTimer endDate={tomorrow} />
            </div>
          </section>

          {/* Conversion Tracking Test */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Conversion Tracking</h2>

            <ConversionTracker action="button_click" category="test">
              <button className="bg-orange-700 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                Track This Click (Check Browser Console)
              </button>
            </ConversionTracker>
          </section>

          {/* Exit Intent Instructions */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Exit Intent Modal Test</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h3 className="font-bold text-yellow-900 mb-2">How to Test:</h3>
              <ol className="list-decimal list-inside text-yellow-800 space-y-1">
                <li>Stay on this page for 30 seconds</li>
                <li>Move your mouse cursor to the very top of the browser</li>
                <li>Move the cursor outside the browser window (like you&apos;re leaving)</li>
                <li>The exit intent modal should appear</li>
                <li>Check localStorage for &apos;exit-intent-shown&apos; after it triggers</li>
              </ol>
            </div>
          </section>
        </div>

        {/* Sticky CTA Test */}
        <StickyCTA
          text="🎯 Ready to upgrade your kitchen? Get our free buying guide!"
          href="/newsletter"
          variant="newsletter"
        />
      </div>

      {/* Analytics Testing Instructions */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-gray-800 text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">🔍 Analytics Testing</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-green-400 mb-2">Browser Console Events:</h3>
              <ul className="text-sm space-y-1">
                <li>• gtag events for A/B test assignments</li>
                <li>• Exit intent triggers</li>
                <li>• Conversion tracking clicks</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-400 mb-2">LocalStorage Keys:</h3>
              <ul className="text-sm space-y-1">
                <li>• ab-test-headline-test</li>
                <li>• exit-intent-shown</li>
                <li>• newsletter-signup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}