import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/cookware',
  },
}

export default function CookwareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
