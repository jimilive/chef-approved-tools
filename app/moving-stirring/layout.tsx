import type { Metadata } from 'next'
import { getCategoryConfig } from '@/lib/category-config'

const config = getCategoryConfig('moving-stirring')

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/moving-stirring'
  },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    url: 'https://www.chefapprovedtools.com/moving-stirring',
    siteName: 'Chef Approved Tools',
    type: 'website'
  }
}

export default function MovingStirringLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
