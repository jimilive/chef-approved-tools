import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/knives',
  },
}

export default function KnivesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
