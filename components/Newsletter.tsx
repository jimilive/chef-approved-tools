'use client';

import React, { useState } from 'react';
import { trackNewsletterSignup } from '@/lib/tracking';

export default function Newsletter() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          source: 'footer-newsletter',
          leadMagnet: 'professional-kitchen-tools'
        })
      });

      trackNewsletterSignup('footer-newsletter');
      setIsSubmitted(true);
      setFirstName('');
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    }
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Get My Professional Kitchen Bundle Guide
          </h2>
          <p className="text-white/90 mb-6">
            The 7 tools I actually use daily from 24 years in professional kitchens.
            Plus equipment insights and authentic gear recommendations.
          </p>

          <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
            <div className="text-left text-sm text-gray-600 mb-4">
              ✓ The exact 7 tools from my daily toolkit<br/>
              ✓ Why each tool earned its spot<br/>
              ✓ Weekly authentic gear recommendations
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                autoCapitalize="words"
                autoCorrect="off"
                autoComplete="given-name"
                className="w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-300 focus:outline-none border border-gray-200"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-300 focus:outline-none border border-gray-200"
                required
              />
              <button
                type="submit"
                className="w-full px-8 py-3 bg-orange-900 text-white font-semibold rounded-md hover:bg-orange-800 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-colors"
              >
                {isSubmitted ? 'Subscribed!' : 'Get My Free Kitchen Bundle'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}