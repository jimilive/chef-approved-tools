'use client'

import { useEffect, useState } from 'react'

interface DataLayerEvent {
  event?: string
  [key: string]: any
}

export default function TestDataLayer() {
  const [dataLayerContents, setDataLayerContents] = useState<DataLayerEvent[]>([])
  const [isGTMLoaded, setIsGTMLoaded] = useState(false)
  const [isGALoaded, setIsGALoaded] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark component as mounted
    setMounted(true)

    // Check if dataLayer exists
    if (typeof window !== 'undefined') {
      const checkDataLayer = () => {
        const dl = (window as any).dataLayer || []
        // Convert to plain array using Array.from or slice
        setDataLayerContents(Array.from(dl))

        // Check if GTM is loaded
        if ((window as any).google_tag_manager) {
          setIsGTMLoaded(true)
        }

        // Check if GA is loaded
        if ((window as any).gtag) {
          setIsGALoaded(true)
        }
      }

      // Initial check
      checkDataLayer()

      // Set up interval to refresh dataLayer contents
      const interval = setInterval(checkDataLayer, 1000)

      return () => clearInterval(interval)
    }
  }, [])

  const pushTestEvent = () => {
    console.log('pushTestEvent called')
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      const testEvent = {
        event: 'test_event',
        test_category: 'dataLayer_test',
        test_action: 'manual_push',
        test_timestamp: new Date().toISOString()
      }

      ;(window as any).dataLayer.push(testEvent)
      console.log('Event pushed:', testEvent)
      console.log('DataLayer length:', (window as any).dataLayer.length)
      setTestResults(prev => [...prev, `✅ Pushed test event at ${new Date().toLocaleTimeString()}`])
    } else {
      console.log('dataLayer not found!')
      setTestResults(prev => [...prev, `❌ dataLayer not found at ${new Date().toLocaleTimeString()}`])
    }
  }

  const trackPageView = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'page_view', {
        page_title: 'DataLayer Test Page',
        page_location: window.location.href,
        page_path: window.location.pathname
      })
      setTestResults(prev => [...prev, `✅ Tracked page_view via gtag() at ${new Date().toLocaleTimeString()}`])
    } else {
      setTestResults(prev => [...prev, `❌ gtag() not available at ${new Date().toLocaleTimeString()}`])
    }
  }

  const trackCustomEvent = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: 'button_click',
        button_name: 'Test Custom Event',
        button_location: 'test_page'
      })
      setTestResults(prev => [...prev, `✅ Tracked custom event at ${new Date().toLocaleTimeString()}`])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">DataLayer Test Page</h1>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">DataLayer Status</h2>
            <div className="text-3xl mb-2">
              {!mounted ? '⏳' : (window as any).dataLayer ? '✅' : '❌'}
            </div>
            <p className="text-sm text-slate-600">
              {!mounted ? 'Loading...' : (window as any).dataLayer
                ? 'DataLayer is initialized'
                : 'DataLayer not found'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">GTM Status</h2>
            <div className="text-3xl mb-2">{isGTMLoaded ? '✅' : '⏳'}</div>
            <p className="text-sm text-slate-600">
              {isGTMLoaded ? 'GTM Loaded (GTM-PX8GPHKF)' : 'GTM Loading...'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">GA4 Status</h2>
            <div className="text-3xl mb-2">{isGALoaded ? '✅' : '⏳'}</div>
            <p className="text-sm text-slate-600">
              {isGALoaded ? 'GA4 gtag() available' : 'GA4 Loading...'}
            </p>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Test Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={pushTestEvent}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Push Test Event to DataLayer
            </button>
            <button
              onClick={trackPageView}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Track Page View (gtag)
            </button>
            <button
              onClick={trackCustomEvent}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Track Custom Event
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono p-2 bg-slate-100 rounded">
                  {result}
                </div>
              ))}
            </div>
            <button
              onClick={() => setTestResults([])}
              className="mt-4 text-sm text-slate-600 hover:text-slate-900"
            >
              Clear Results
            </button>
          </div>
        )}

        {/* DataLayer Contents */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">DataLayer Contents</h2>
            <span className="text-sm text-slate-600">
              {dataLayerContents.length} events
            </span>
          </div>
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
            <pre className="text-xs">
              {JSON.stringify(dataLayerContents, null, 2)}
            </pre>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            <p className="mb-2"><strong>How to use this page:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open browser DevTools (F12) and go to Console tab</li>
              <li>Type <code className="bg-slate-100 px-1 rounded">window.dataLayer</code> to inspect</li>
              <li>Use the test buttons above to push events</li>
              <li>Watch the dataLayer contents update in real-time</li>
              <li>In DevTools, you can also check Network tab for GTM requests</li>
            </ol>
          </div>
        </div>

        {/* Console Commands */}
        <div className="bg-slate-100 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Console Test Commands</h2>
          <p className="text-sm text-slate-600 mb-4">
            Open DevTools Console and run these commands:
          </p>
          <div className="space-y-2 text-sm font-mono">
            <div className="bg-white p-3 rounded">
              <div className="text-slate-500 mb-1">{'//'} Check if dataLayer exists</div>
              <div>window.dataLayer</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-slate-500 mb-1">{'//'} Check GTM container</div>
              <div>window.google_tag_manager</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-slate-500 mb-1">{'//'} Check gtag function</div>
              <div>window.gtag</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-slate-500 mb-1">{'//'} Push a custom event</div>
              <div>window.dataLayer.push({'{'}event: &apos;my_test&apos;, value: 123{'}'})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
