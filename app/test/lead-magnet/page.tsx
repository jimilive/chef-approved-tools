'use client'

import { useEffect } from 'react'

export default function LeadMagnetPreview() {
  useEffect(() => {
    // Redirect to clean PDF page
    window.location.href = '/lead-magnet-clean'
  }, [])

  return <div>Redirecting to clean PDF view...</div>
}
