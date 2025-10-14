import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/reviews',
  },
}

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
