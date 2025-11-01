'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch('https://chefapprovedtools.activehosted.com/proc.php', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION - Dual Impact */}
      {/*
        ⚠️ CRITICAL SPACING - DO NOT MODIFY WITHOUT CAREFUL TESTING ⚠️
        This section's spacing was carefully balanced to align the red "24 Years" badge
        with the three food images below while maintaining proper spacing throughout.

        Key classes and their purpose:
        - Grid: px-32 = 128px side padding to center content
        - Grid: NO gap-* class (removed to bring text and image closer)
        - Text column: -mr-12 = pulls text 48px right toward image
        - Image column: mr-5 = 20px right margin to position image/badge unit
        - Image column: justify-end = keeps image right-aligned (DO NOT REMOVE)
        - Badge: -right-6 = extends badge 24px outside image container

        If you modify spacing, verify the red badge aligns with right edge of food images below!
      */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white">
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 items-center max-w-7xl mx-auto px-32">
            {/* Left: Message */}
            <div className="space-y-6 -mr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Rigorously Tested,
                <br />
                Professionally Vetted,
                <br />
                <span className="text-orange-400">Chef Approved</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                24 years in professional kitchens—from Mellow Mushroom to Purple Café to your home kitchen.
                Honest reviews. No affiliate pressure. Just the tools that actually work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#get-guide"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Get My Free Guide
                </a>
                <Link
                  href="/reviews"
                  className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 font-semibold px-8 py-4 rounded-xl transition-all text-center"
                >
                  Browse Reviews
                </Link>
              </div>
            </div>

            {/* Right: Scott in Chef's Coat */}
            <div className="relative flex items-center py-12 justify-end mr-5">
              <div className="relative rounded-2xl">
                <Image
                  src="/images/scott-chef-coat-cropped.jpg"
                  alt="Scott Bradley - Professional Chef with 24 Years Experience"
                  width={300}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>
              <div className="absolute bottom-4 -right-6 bg-orange-600 text-white px-6 py-3 rounded-xl shadow-xl">
                <p className="font-bold text-lg">24 Years</p>
                <p className="text-sm">Professional Kitchens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS IN ACTION - The Money Section - 3 COLUMN LAYOUT */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              These Tools Create This Food
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real equipment, real cooking, real results. No stock photos, no staged shots—just what happens
              when you use the right tools.
            </p>
          </div>

          {/* Grid of Beautiful Food Shots - 3 COLUMN LAYOUT */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
            {/* Steak Sear */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cast-iron-steak-sear.jpg"
                  alt="Perfect steak sear in cast iron"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Perfect Cast Iron Sear
                </h3>
                <p className="text-slate-600 mb-4">
                  Restaurant-quality crust at home. The right pan makes all the difference.
                </p>
                <Link
                  href="/reviews/lodge-cast-iron-skillet"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the Lodge cast iron skillet →
                </Link>
              </div>
            </div>

            {/* Bacon Burger */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cast-iron-bacon-burger.jpg"
                  alt="Bacon cheeseburger cooked in cast iron"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  The Perfect Smash Burger
                </h3>
                <p className="text-slate-600 mb-4">
                  Cast iron heat retention creates that crispy, caramelized edge every time.
                </p>
                <Link
                  href="/reviews/lodge-cast-iron-skillet"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the Lodge cast iron skillet →
                </Link>
              </div>
            </div>

            {/* Heirloom Tomatoes */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/epicurean-heirloom-tomatoes.jpg"
                  alt="Heirloom tomatoes sliced on Epicurean cutting board"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Knife-Friendly, Dishwasher-Safe
                </h3>
                <p className="text-slate-600 mb-4">
                  After 20 years with wood boards, I switched. This changed everything.
                </p>
                <Link
                  href="/reviews/epicurean-kitchen-cutting-board"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the board →
                </Link>
              </div>
            </div>

            {/* Pot Roast */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/le-creuset-pot-roast-plated.jpg"
                  alt="Pot roast dinner plated"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Sunday Pot Roast Perfection
                </h3>
                <p className="text-slate-600 mb-4">
                  Dutch oven cooking: low, slow, and foolproof. This is comfort food done right.
                </p>
                <Link
                  href="/reviews/instant-pot-duo-plus-6qt"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the Instant Pot →
                </Link>
              </div>
            </div>

            {/* Perfect Eggs - SUBSTITUTED cuisinart-eggs-cooking.jpg */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/cuisinart-eggs-cooking.jpg"
                  alt="Perfect eggs cooking"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Eggs That Don&apos;t Stick
                </h3>
                <p className="text-slate-600 mb-4">
                  The secret to restaurant breakfast? The right skillet, properly heated.
                </p>
                <Link
                  href="/reviews/cuisinart-8-inch-nonstick-pan"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the skillet →
                </Link>
              </div>
            </div>

            {/* BBQ Ribs - SUBSTITUTED nordic-ware-ribs.jpg */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/nordic-ware-ribs.jpg"
                  alt="BBQ ribs on sheet pan"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Fall-Off-The-Bone Ribs
                </h3>
                <p className="text-slate-600 mb-4">
                  Perfect ribs every time. The right equipment makes all the difference.
                </p>
                <Link
                  href="/reviews/nordic-ware-half-sheet-pan"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  See the pan →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE SECTION - V1 Design (IMPROVED) */}
      <section id="get-guide" className="py-16 bg-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl">

          {/* Curiosity Badge - IMPROVED COPY */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 rounded-full inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Professional Kitchen Essentials</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            The 11 Tools I Use Most in My Home Kitchen
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-slate-300 text-center mb-8">
            My daily workhorse tools from 24 years in professional kitchens
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-slate-300">24 Years Professional</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">11 Tools. That&apos;s It.</span>
            </span>
          </div>

          {/* Benefit Preview Box */}
          <div className="bg-slate-800 border-2 border-orange-600 rounded-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-white">
                What You&apos;ll Get (FREE Guide):
              </h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">5 Victorinox knives:</span>
                  <span className="text-slate-300"> Chef&apos;s (8&quot; & 10&quot;), paring, boning, and bread knife</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Essential prep tools:</span>
                  <span className="text-slate-300"> Peeler, bench scraper, tongs, and mandoline</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Restaurant towels:</span>
                  <span className="text-slate-300"> The exact bar mops I&apos;ve used for decades</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Professional cutting board:</span>
                  <span className="text-slate-300"> Epicurean board built to last</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Why I chose each one:</span>
                  <span className="text-slate-300"> Real stories from 24 years of professional cooking</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Email Form */}
          {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            id="lead-magnet-form"
            className="space-y-4"
          >
            {/* Hidden ActiveCampaign Fields */}
            <input type="hidden" name="u" value="1" />
            <input type="hidden" name="f" value="1" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />
            <input type="hidden" name="or" value="c091b86ba39b7f8fdc1702809f7e19ff" />

            {/* First Name Field */}
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="w-full px-6 py-4 rounded-xl text-slate-900 text-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full px-6 py-4 rounded-xl text-slate-900 text-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={async () => {
                const formElement = document.getElementById('lead-magnet-form') as HTMLFormElement;
                if (!formElement) return;

                const formData = new FormData(formElement);
                setIsSubmitting(true);

                try {
                  await fetch('https://chefapprovedtools.activehosted.com/proc.php', {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors',
                  });
                  setIsSubmitted(true);
                } catch (error) {
                  console.error('Form submission error:', error);
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Get My Free Professional Kitchen Guide →
                </>
              )}
            </button>
          </form>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Check Your Email!</h3>
              <p className="text-slate-300 text-lg mb-4">
                Your free guide is on its way. Check your inbox (and spam folder) for the download link.
              </p>
              <p className="text-slate-400 text-sm">
                Welcome to the Chef Approved Tools family!
              </p>
            </div>
          )}

          {/* Trust Indicators Below Form */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm mb-4">
              No spam, unsubscribe anytime
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your email is safe
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Equipment insights & reviews
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Instant download
              </span>
            </div>
          </div>

          </div>
        </div>
      </section>

      {/* WHY LISTEN TO ME - Credibility + Action Shots */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Listen to Me?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Because I&apos;ve actually worked the line—not just tested products for affiliate commissions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Credentials */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  24 Years in Professional Kitchens
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  From Mellow Mushroom (Kitchen Manager, 7 years) to Purple Café (6 years),
                  Il Pizzaiolo, Feierabend, and Paragary&apos;s. I know what holds up under restaurant abuse.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  🎓 Formal Culinary Training
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A.A.S. in Culinary Arts from Seattle Central College (2005-2007). Learned the foundations,
                  then spent two decades refining them.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  ⚖️ Honest Reviews, Transparent System
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  I only recommend what I&apos;ve actually used—often for years. Every product has pros AND cons.
                  Perfect reviews are fake reviews.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                  <p className="text-slate-700">
                    <strong>My Three-Tier System:</strong> Every review uses my transparent three-tier system—from
                    professional kitchen use (Tier 1) to long-term personal testing (Tier 2) to expert evaluation
                    (Tier 3). You always know my level of hands-on experience.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  Read my full story →
                </Link>
              </div>
            </div>

            {/* Right: Action Shots Collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/oxo-bench-scraper-garlic.jpg"
                    alt="Mincing garlic with OXO bench scraper"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/le-creuset-pot-roast-dutch-oven.jpg"
                    alt="Pot roast in Le Creuset Dutch oven"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/mandolin-onions.jpg"
                    alt="Slicing onions with Benriner mandolin"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/ninja-air-fryer-fries.jpg"
                    alt="Fries in Ninja air fryer"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY - Added from V2 per Summary */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional equipment recommendations for home cooks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Knives Category */}
            <Link
              href="/knives"
              className="group bg-white hover:bg-blue-50 rounded-xl p-8 transition-all hover:shadow-xl border-2 border-transparent hover:border-blue-200"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <span className="text-4xl">🔪</span>
              </div>
              <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">
                Professional Knives
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                German steel, Japanese precision, commercial durability
              </p>
            </Link>

            {/* Cookware Category */}
            <Link
              href="/cookware"
              className="group bg-white hover:bg-green-50 rounded-xl p-8 transition-all hover:shadow-xl border-2 border-transparent hover:border-green-200"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <span className="text-4xl">🍳</span>
              </div>
              <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">
                Restaurant Cookware
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Cast iron, stainless steel, what actually lasts
              </p>
            </Link>

            {/* Appliances Category */}
            <Link
              href="/appliances"
              className="group bg-white hover:bg-purple-50 rounded-xl p-8 transition-all hover:shadow-xl border-2 border-transparent hover:border-purple-200"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">
                Commercial Appliances
              </h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Mixers, blenders, processors built for abuse
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* SECONDARY CTA - Tools That Started It All */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-700 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Tools That Started It All
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            These are the essentials I packed for my first day at culinary school in 2005.
            Twenty years later, I still reach for them first.
          </p>
          <Link
            href="/the-tools-that-started-it-all"
            className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            See the Essential Toolkit
          </Link>
        </div>
      </section>

      {/* TOP PROFESSIONAL PICKS - Renamed from "Latest Reviews" per Summary */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Top Professional Picks
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Equipment that survived restaurant abuse and earned a place in my home kitchen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Vitamix 5200 */}
            <Link
              href="/reviews/vitamix-5200-professional-blender"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="relative h-64 bg-white overflow-hidden">
                <Image
                  src="/images/products/vitamix-5200-professional-blender/vitamix-5200-professional-blender-1.jpg"
                  alt="Vitamix 5200 Professional Blender"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-yellow-500 text-lg">★★★★★</span>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Tier 1
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Vitamix 5200 Professional Blender
                </h3>
                <p className="text-slate-600 mb-4">
                  Commercial power. Exceptional control. 5+ years daily use.
                </p>
                <span className="text-orange-700 font-semibold inline-flex items-center gap-2">
                  Read full review →
                </span>
              </div>
            </Link>

            {/* Lodge Cast Iron */}
            <Link
              href="/reviews/lodge-seasoned-cast-iron-3-skillet-bundle"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="relative h-64 bg-white overflow-hidden">
                <Image
                  src="/images/products/lodge-seasoned-cast-iron-3-skillet-bundle/lodge-seasoned-cast-iron-3-skillet-bundle-1.jpg"
                  alt="Lodge Seasoned Cast Iron 3 Skillet Bundle"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-yellow-500 text-lg">★★★★★</span>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Tier 1
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Lodge Cast Iron Skillet
                </h3>
                <p className="text-slate-600 mb-4">
                  Sear like a chef. Eat like a king. Lasts forever.
                </p>
                <span className="text-orange-700 font-semibold inline-flex items-center gap-2">
                  Read full review →
                </span>
              </div>
            </Link>

            {/* Victorinox Fibrox 8-inch */}
            <Link
              href="/reviews/victorinox-fibrox-8-inch-chefs-knife"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="relative h-64 bg-white overflow-hidden">
                <Image
                  src="/images/products/victorinox-fibrox-8-inch-chefs-knife/victorinox-fibrox-8-inch-chefs-knife-1.jpg"
                  alt="Victorinox Fibrox Pro 8-inch Chef's Knife"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-yellow-500 text-lg">★★★★★</span>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Tier 1
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Victorinox Fibrox Pro Chef&apos;s Knife
                </h3>
                <p className="text-slate-600 mb-4">
                  20 years. Daily use. Dishwasher friendly.
                </p>
                <span className="text-orange-700 font-semibold inline-flex items-center gap-2">
                  Read full review →
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-block border-2 border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              See All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Don't Let Them Leave Empty-Handed */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop Guessing. Start Cooking Like a Chef.
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
            Get my free guide to the 11 tools that handle 99% of home cooking—tested through
            24 years of professional kitchen abuse.
          </p>
          <a
            href="#get-guide"
            className="inline-block bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Get The Free Guide
          </a>
        </div>
      </section>

      {/* TRUST BAR - Added per Summary */}
      <section className="bg-slate-900 text-white py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Kitchen Manager, Mellow Mushroom (3 years)
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Line Cook, Purple Café (6 years)
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Line Cook, Feieabend
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Seattle Central Culinary
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
