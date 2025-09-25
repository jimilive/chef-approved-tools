import { redirect } from 'next/navigation'

interface ReviewPageProps {
  params: {
    slug: string
  }
}

// Map of slugs to their actual page paths
const slugMap: Record<string, string> = {
  'vitamix-5200': '/reviews/vitamix-5200',
  'robot-coupe-r2-dice': '/reviews/robot-coupe-r2-dice',
  'lodge-seasoned-cast-iron-3-skillet-bundle': '/reviews/lodge-seasoned-cast-iron-3-skillet-bundle',
  'le-creuset-signature-7-25-qt-dutch-oven': '/reviews/le-creuset-signature-7-25-qt-dutch-oven',
  'kitchenaid-ksm8990wh': '/reviews/kitchenaid-ksm8990wh',
  'john-boos-platinum-commercial-cutting-board': '/reviews/john-boos-platinum-commercial-cutting-board',
  'wusthof-classic-ikon-15-piece': '/reviews/wusthof-classic-ikon-15-piece'
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const targetPath = slugMap[params.slug]

  if (targetPath) {
    redirect(targetPath)
  }

  // If slug not found, redirect to reviews page
  redirect('/reviews')
}

export function generateStaticParams() {
  return Object.keys(slugMap).map((slug) => ({
    slug
  }))
}