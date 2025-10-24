import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'Knives', href: '/knives' },
      { name: 'Cookware', href: '/cookware' },
      { name: 'Appliances', href: '/appliances' }
    ],
    resources: [
      { name: 'Buying Guides', href: '/guides' },
      { name: 'Reviews', href: '/reviews' },
      { name: 'About & Testing', href: '/about' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Affiliate Disclosure', href: '/disclosure' },
      { name: 'Cookie Policy', href: '/cookie-policy' }
    ]
  }
  
  return (
    <footer className="bg-slate-800 text-slate-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">

          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 no-underline mb-4">
              <span className="text-2xl">👨‍🍳</span>
              <span className="text-xl font-bold text-white">
                Chef<span className="text-orange-600">Approved</span>Tools
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Professional kitchen equipment reviews by certified chefs with real restaurant experience.
            </p>
            <p className="text-sm text-slate-400">
              Made with ❤️ by professional chefs
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Shop</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 no-underline hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 no-underline hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 no-underline hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 px-5 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} Chef Approved Tools. All rights reserved. |
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}