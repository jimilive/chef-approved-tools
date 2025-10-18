import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chef Scott Bradley for equipment recommendations, testing questions, or professional kitchen advice.',
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
