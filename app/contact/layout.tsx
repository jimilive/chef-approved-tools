import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Professional Chef | Kitchen Equipment Questions',
  description: 'Have questions about professional kitchen equipment? Contact Scott Bradley, former Mellow Mushroom Kitchen Manager with 24 years experience. Expert advice on chef knives, cookware, and appliances.',
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
