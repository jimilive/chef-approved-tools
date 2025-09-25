import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Chef Approved Tools',
  description: 'Cookie Policy for Chef Approved Tools - How we use cookies and similar technologies on our website.',
}

export default function CookiePolicyPage() {
  const lastUpdated = "December 2024"

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="mb-4">
              Cookies allow websites to remember your preferences, login status, and other information to improve your browsing experience.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              Chef Approved Tools uses cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Improve our website performance and user experience</li>
              <li>Provide personalized content and recommendations</li>
              <li>Track affiliate link clicks and conversions</li>
              <li>Enable social media features and integrations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Strictly Necessary Cookies</h3>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-800">
                These cookies are essential for the website to function properly and cannot be disabled.
              </p>
            </div>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Cookie consent:</strong> Remembers your cookie preferences</li>
              <li><strong>Security:</strong> Protect against cross-site request forgery</li>
              <li><strong>Load balancing:</strong> Distribute traffic across servers</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Analytics Cookies</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-800">
                These cookies help us understand how visitors use our website.
              </p>
            </div>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Google Analytics:</strong> Tracks page views, user sessions, and site usage</li>
              <li><strong>Performance metrics:</strong> Page load times and user interactions</li>
              <li><strong>Traffic sources:</strong> How visitors find our website</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Functional Cookies</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="text-green-800">
                These cookies enhance functionality and personalization.
              </p>
            </div>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Newsletter preferences:</strong> Remember if you&apos;ve subscribed</li>
              <li><strong>Display preferences:</strong> Remember your preferred view settings</li>
              <li><strong>Product comparisons:</strong> Save items for comparison</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Marketing/Tracking Cookies</h3>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
              <p className="text-purple-800">
                These cookies are used to track visitors across websites for marketing purposes.
              </p>
            </div>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Amazon Associates:</strong> Track affiliate link clicks and purchases</li>
              <li><strong>Social media pixels:</strong> Enable social sharing and advertising</li>
              <li><strong>Remarketing:</strong> Show relevant ads on other websites</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Third-Party Cookies</h2>
            <p className="mb-4">
              We use several third-party services that may set cookies on your device:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Google Analytics</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Purpose: Website analytics and performance tracking</li>
              <li>Data collected: Page views, session duration, traffic sources</li>
              <li>Privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Google Privacy Policy</a></li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Amazon Associates</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Purpose: Track affiliate purchases and commissions</li>
              <li>Data collected: Click-through data, purchase information</li>
              <li>Duration: Up to 24 hours for attribution</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Social Media Platforms</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Purpose: Social sharing buttons and embedded content</li>
              <li>Platforms: May include Facebook, Twitter, Pinterest</li>
              <li>Data collected: Social interactions and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Cookie Duration</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Session Cookies</h3>
            <p className="mb-4">
              These cookies are temporary and are deleted when you close your browser. They help maintain your session during your visit.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Persistent Cookies</h3>
            <p className="mb-4">
              These cookies remain on your device until they expire or you delete them. Common durations:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Analytics cookies:</strong> 2 years</li>
              <li><strong>Preference cookies:</strong> 1 year</li>
              <li><strong>Marketing cookies:</strong> 30-90 days</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Managing Your Cookie Preferences</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cookie Consent Banner</h3>
            <p className="mb-4">
              When you first visit our website, you&apos;ll see a cookie consent banner where you can:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Accept all cookies</li>
              <li>Accept only necessary cookies</li>
              <li>Customize your preferences by cookie type</li>
              <li>Learn more about each cookie category</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Browser Settings</h3>
            <p className="mb-4">
              You can also control cookies through your browser settings:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
              <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800">
                <strong>Note:</strong> Disabling certain cookies may affect website functionality and your user experience.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Opt-Out Options</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Google Analytics</h3>
            <p className="mb-4">
              You can opt out of Google Analytics tracking by:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li>Using our cookie consent banner to disable analytics cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Advertising Cookies</h3>
            <p className="mb-4">
              Opt out of interest-based advertising through:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Network Advertising Initiative</a></li>
              <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Digital Advertising Alliance</a></li>
              <li><a href="https://youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">European Interactive Digital Advertising Alliance</a> (EU residents)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Do Not Track</h2>
            <p className="mb-4">
              Some browsers include a &quot;Do Not Track&quot; feature. Currently, there is no industry standard for responding to Do Not Track signals, so we do not respond to these signals at this time.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Mobile Devices and Apps</h2>
            <p className="mb-4">
              On mobile devices, similar technologies to cookies are used:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Local storage:</strong> Stores data locally on your device</li>
              <li><strong>Device identifiers:</strong> Unique identifiers for advertising purposes</li>
              <li><strong>SDK tracking:</strong> Third-party software development kits for analytics</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Children&apos;s Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under 13. We do not knowingly collect cookies or personal information from children under 13.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Changes to This Cookie Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy periodically. When we make changes, we will:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Update the &quot;Last updated&quot; date at the top of this page</li>
              <li>Notify users through our cookie consent banner if changes are significant</li>
              <li>Provide clear information about what has changed</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p><strong>Email:</strong> privacy@chefapprovedtools.com</p>
              <p><strong>Website:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact Form</Link></p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Related Policies</h2>
            <p className="mb-4">
              For more information about how we handle your data, please review:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">Terms of Service</Link></li>
              <li><Link href="/disclosure" className="text-blue-600 hover:text-blue-700 underline">Affiliate Disclosure</Link></li>
            </ul>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p className="text-green-800">
                <strong>Your Control:</strong> Remember, you have control over your cookie preferences. You can change your settings at any time through our cookie banner or your browser settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}