import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Chef Approved Tools',
  description: 'Terms of Service for Chef Approved Tools - Legal terms and conditions for using our website and services.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsOfServicePage() {
  const lastUpdated = "December 2024"

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing and using Chef Approved Tools (&quot;the website&quot;, &quot;our service&quot;), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Chef Approved Tools provides professional kitchen equipment reviews, buying guides, and recommendations based on real restaurant experience. We may also provide affiliate links to recommended products.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Affiliate Disclosure and Amazon Associates</h2>
            <p className="mb-4">
              Chef Approved Tools is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>We may earn commissions from qualifying purchases made through our affiliate links</li>
              <li>Affiliate commissions do not affect the price you pay</li>
              <li>All recommendations are based on genuine professional experience and testing</li>
              <li>We only recommend products we would personally use or have used professionally</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Conduct</h2>
            <p className="mb-4">
              You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the site in any way that violates applicable laws or regulations</li>
              <li>Transmit or send unsolicited or unauthorized advertising or promotional material</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Engage in any conduct that restricts or inhibits anyone&apos;s use of the website</li>
              <li>Use automated systems to access the website without permission</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Content and Intellectual Property</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Our Content</h3>
            <p className="mb-4">
              All content on this website, including but not limited to text, reviews, images, graphics, logos, and software, is the property of Chef Approved Tools or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">User-Generated Content</h3>
            <p className="mb-4">
              If you submit comments, reviews, or other content to our website, you grant us a non-exclusive, royalty-free, perpetual license to use, reproduce, and distribute such content.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Product Information and Reviews</h2>
            <p className="mb-4">
              Our product reviews and recommendations are based on professional kitchen experience and testing. However:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Product information may change without notice</li>
              <li>Prices and availability are subject to change</li>
              <li>We strive for accuracy but cannot guarantee all information is current</li>
              <li>Individual experiences with products may vary</li>
              <li>All product purchases are made directly with retailers, not with us</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Third-Party Links</h2>
            <p className="mb-4">
              Our website contains links to third-party websites and services. We do not control and are not responsible for the content, privacy policies, or practices of third-party sites. You acknowledge and agree that we shall not be liable for any damage or loss caused by your use of third-party content or services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Disclaimers</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800">
                <strong>IMPORTANT:</strong> The following disclaimers limit our liability. Please read carefully.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">General Disclaimer</h3>
            <p className="mb-4">
              The information on this website is provided on an &quot;as is&quot; basis. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the website or information contained therein.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Professional Advice</h3>
            <p className="mb-4">
              Our content is for informational purposes only and should not be considered professional advice. Always consult with qualified professionals for specific situations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall Chef Approved Tools, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Indemnification</h2>
            <p className="mb-4">
              You agree to defend, indemnify, and hold harmless Chef Approved Tools from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the website or violation of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Privacy Policy</h2>
            <p className="mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be interpreted and governed by the laws of the United States and the state where Chef Approved Tools is based, without regard to conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Dispute Resolution</h2>
            <p className="mb-4">
              Any disputes arising from these Terms or your use of the website will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">16. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">17. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> legal@chefapprovedtools.com</p>
              <p><strong>Website:</strong> https://chefapprovedtools.com/contact</p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800">
                <strong>Note:</strong> These terms are designed to provide comprehensive legal protection. For specific legal advice, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}