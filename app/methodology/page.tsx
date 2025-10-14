import { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'


export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/methodology',
  },
}

export default function MethodologyPage() {
  permanentRedirect('/about')
}
