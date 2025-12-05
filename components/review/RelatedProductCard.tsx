import React from 'react';
import Link from 'next/link';

interface RelatedProductCardProps {
  title: string;
  description: string;
  badge: string;
  href: string;
}

export default function RelatedProductCard({
  title,
  description,
  badge,
  href
}: RelatedProductCardProps) {
  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
      <h3 className="mt-0">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-sm text-gray-700">
        <strong>{badge}</strong>
      </p>
      <Link
        href={href}
        className="inline-block bg-green-600 text-white px-5 py-2 no-underline rounded mt-2 font-bold hover:bg-green-700 transition-colors"
      >
        Read Full Review →
      </Link>
    </div>
  );
}

// Grid wrapper for related products
interface RelatedProductsGridProps {
  children: React.ReactNode;
}

export function RelatedProductsGrid({ children }: RelatedProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
      {children}
    </div>
  );
}
