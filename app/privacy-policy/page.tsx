import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | How Chef Approved Tools Protects Your Data',
  description: 'Privacy policy for Chef Approved Tools. How we collect, use, and protect your personal information in compliance with GDPR and CCPA regulations.',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 2024"

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Chef Approved Tools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website chefapprovedtools.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
            <p className="mb-4">
              We may collect personal information you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Email address (when subscribing to newsletters)</li>
              <li>Name (if provided in contact forms)</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
            <p className="mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address and general location</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use collected information for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing and improving our website content</li>
              <li>Sending newsletters and updates (with consent)</li>
              <li>Analyzing website usage and performance</li>
              <li>Personalizing your experience</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who assist in website operations (Google Analytics, email services)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners only with explicit consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience. You can control cookie preferences through our cookie consent banner or your browser settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand website usage (Google Analytics)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights (GDPR/CCPA)</h2>
            <p className="mb-4">
              Depending on your location, you have rights regarding your personal information:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">EU Residents (GDPR)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification (correction)</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">California Residents (CCPA)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale of personal information</li>
              <li>Right to non-discrimination for exercising rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Third-Party Services</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites or integrate with third-party services:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Amazon Associates:</strong> Affiliate links to Amazon products</li>
              <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
              <li><strong>Email Service Providers:</strong> For newsletter delivery</li>
            </ul>
            <p className="mb-4">
              These services have their own privacy policies, and we encourage you to review them.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Data Retention</h2>
            <p className="mb-4">
              We retain personal information only as long as necessary for the purposes outlined in this policy or as required by law. Newsletter subscriptions are kept until you unsubscribe.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Children&apos;s Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated &quot;Last updated&quot; date. For significant changes, we may provide additional notice.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> privacy@chefapprovedtools.com</p>
              <p><strong>Website:</strong> https://chefapprovedtools.com/contact</p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800">
                <strong>Note:</strong> This privacy policy is designed to comply with GDPR, CCPA, and other privacy regulations. For specific legal advice, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}