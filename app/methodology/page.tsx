import { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'


export const metadata: Metadata = {
  title: 'Testing Methodology: Real Restaurant Trials',
  description: 'How we test kitchen equipment: 6-month minimum in working restaurants. No lab tests, no sponsored reviews. Real conditions, honest results.',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/methodology',
  },
}

export default function MethodologyPage() {
  permanentRedirect('/about')
}
