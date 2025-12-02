import type { Metadata } from 'next'
import { getCategoryConfig } from '@/lib/category-config'

const config = getCategoryConfig('prep-tools')

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/prep-tools'
  },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    url: 'https://www.chefapprovedtools.com/prep-tools',
    siteName: 'Chef Approved Tools',
    type: 'website'
  }
}

export default function PrepToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
