import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Admin Dashboard',
  description: 'Admin area for managing product affiliate links and metadata.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
}

export default function AdminProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
