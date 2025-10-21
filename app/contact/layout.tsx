import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Chef Scott Bradley | Get Advice',
  description: 'Questions about kitchen equipment? Chef Scott Bradley answers. 24 years restaurant experience. Get expert advice on knives, cookware, professional tools.',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
