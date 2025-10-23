import React from 'react';
import Link from 'next/link';

interface EmailCaptureBoxProps {
  title: string;
  description: string;
  benefits: string[];
  ctaText?: string;
  ctaHref?: string;
  disclaimer?: string;
}

export default function EmailCaptureBox({
  title,
  description,
  benefits,
  ctaText = "Download Free Guide →",
  ctaHref = "/newsletter",
  disclaimer = "Instant delivery. No spam, ever. Unsubscribe anytime."
}: EmailCaptureBoxProps) {
  return (
    <div className="bg-blue-50 p-8 my-8 rounded-lg border-l-4 border-blue-600">
      <h3 className="mt-0 text-2xl">
        {title}
      </h3>

      <p className="text-base leading-relaxed">
        {description}
      </p>

      <ul className="my-4 text-base leading-relaxed">
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>

      <div className="text-center mt-6">
        <Link
          href={ctaHref}
          className="inline-block bg-blue-600 text-white px-10 py-4 no-underline rounded-md font-bold text-lg hover:bg-blue-700 transition-colors"
        >
          {ctaText}
        </Link>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        {disclaimer}
      </p>
    </div>
  );
}
