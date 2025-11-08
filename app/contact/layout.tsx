import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Chef Approved Tools | Equipment Questions & Feedback',
  description: 'Have a question about kitchen equipment? Want to suggest a review? Chef Scott Bradley reads every message and responds personally.',
  keywords: [
    'contact professional chef',
    'kitchen equipment advice',
    'chef knife recommendations',
    'professional cookware questions',
    'Scott Bradley contact',
    'restaurant equipment expert'
  ],
  openGraph: {
    title: 'Contact Scott Bradley | Professional Chef & Kitchen Equipment Expert',
    description: 'Get expert advice on professional kitchen tools from a chef with 24 years restaurant experience. Questions about knives, cookware, or appliances? Let\'s talk.',
    url: 'https://www.chefapprovedtools.com/contact',
    siteName: 'Chef Approved Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Chef Scott Bradley | Kitchen Equipment Expert',
    description: 'Questions about professional kitchen equipment? 24 years restaurant experience. Honest advice on chef knives, cookware, and appliances.',
    creator: '@chefapprovedtools',
  },
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
