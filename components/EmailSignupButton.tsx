// components/EmailSignupButton.tsx
'use client';

import { trackEmailSignup } from '@/lib/tracking';

interface EmailSignupButtonProps {
  location: 'content_upgrade' | 'newsletter' | 'footer' | 'exit_intent';
  upgradeType?: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function EmailSignupButton({
  location,
  upgradeType,
  href,
  children,
  className = ''
}: EmailSignupButtonProps) {

  const handleClick = () => {
    trackEmailSignup(location, upgradeType);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all ${className}`}
    >
      {children}
    </a>
  );
}
