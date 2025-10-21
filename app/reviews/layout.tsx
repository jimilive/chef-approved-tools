import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Product Reviews | Chef-Tested Kitchen Gear',
  description: 'Complete kitchen equipment review library. All products tested in restaurant kitchens or my apartment. Knives, cookware, appliances. Filter by testing tier.',
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
