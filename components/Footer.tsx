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
    <footer style={{ backgroundColor: '#1e293b', color: '#e2e8f0' }}>
      {/* Main Footer Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>👨‍🍳</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
                Chef<span style={{ color: '#ea580c' }}>Approved</span>Tools
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.5' }}>
              Professional kitchen equipment reviews by certified chefs with real restaurant experience.
            </p>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              Made with ❤️ by professional chefs
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Shop</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{ fontSize: '0.875rem', color: '#94a3b8', textDecoration: 'none' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Resources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{ fontSize: '0.875rem', color: '#94a3b8', textDecoration: 'none' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Legal</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{ fontSize: '0.875rem', color: '#94a3b8', textDecoration: 'none' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #374151', padding: '24px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            © {currentYear} Chef Approved Tools. All rights reserved. | 
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}