import { Metadata } from 'next'
import { getPageMetadata } from '@/data/metadata'

const pageMetadata = getPageMetadata('contact')

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: {
    canonical: pageMetadata.canonical,
  },
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: pageMetadata.canonical,
    siteName: 'Chef Approved Tools',
    images: pageMetadata.imageUrl ? [{
      url: pageMetadata.imageUrl,
      alt: pageMetadata.imageAlt || pageMetadata.title,
    }] : undefined,
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
