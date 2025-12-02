import type { Metadata } from 'next'
import { getCategoryConfig } from '@/lib/category-config'

const config = getCategoryConfig('cleaning-maintenance')

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/cleaning-maintenance'
  },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    url: 'https://www.chefapprovedtools.com/cleaning-maintenance',
    siteName: 'Chef Approved Tools',
    type: 'website'
  }
}

export default function CleaningMaintenanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
