import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Privacy Policy - FrankX.AI',
  description: 'Privacy policy and data handling practices for FrankX.AI',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <article className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-slate-400 mb-12">Last updated: January 13, 2025</p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-slate-300 leading-relaxed">
                FrankX.AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Subscribe to our newsletter</li>
                <li>Fill out forms or assessments</li>
                <li>Contact us via email or contact forms</li>
                <li>Download free resources</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                This information may include: name, email address, and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-slate-300 leading-relaxed">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and user experience</li>
                <li>Analyze website usage and trends</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use the following third-party services that may collect information:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li><strong>Vercel Analytics</strong> - Website hosting and analytics</li>
                <li><strong>Resend</strong> - Email delivery service</li>
                <li><strong>ConvertKit</strong> - Newsletter management (if you subscribe)</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                These services have their own privacy policies and data handling practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
              <p className="text-slate-300 leading-relaxed">
                We use cookies and similar tracking technologies to improve your experience. You can control cookie preferences through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-slate-300 leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications at any time</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-slate-300 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions about this Privacy Policy or how we handle your data, please contact us at{' '}
                <a href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                  our contact page
                </a>.
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
