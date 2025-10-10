// components/InternalLink.tsx
'use client';

import Link from 'next/link';
import { trackInternalClick } from '@/lib/tracking';
import { usePathname } from 'next/navigation';

interface InternalLinkProps {
  href: string;
  linkType: 'related_product' | 'bundle' | 'guide' | 'category' | 'blog';
  children: React.ReactNode;
  className?: string;
}

export default function InternalLink({
  href,
  linkType,
  children,
  className = ''
}: InternalLinkProps) {

  const pathname = usePathname();

  const handleClick = () => {
    // Extract slugs from paths for cleaner tracking
    const sourcePage = pathname.split('/').pop() || 'home';
    const destinationPage = href.split('/').pop() || 'unknown';

    trackInternalClick(sourcePage, destinationPage, linkType);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
