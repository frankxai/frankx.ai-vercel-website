import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | FrankX.AI',
  description: 'Privacy policy for FrankX.AI - how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-white/60 mb-8">Last updated: July 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-white/70 leading-relaxed">
              FrankX.AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed
              to protecting your personal data. This privacy policy explains how we collect, use, and safeguard
              your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-white/70 leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              <li>Email address (when you subscribe to our newsletter or make a purchase)</li>
              <li>Aggregate page-view data (page path, referrer category, browser, device, and approximate region)</li>
              <li>Performance data (such as Core Web Vitals)</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Website Measurement</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We use Vercel Web Analytics for aggregate traffic measurement and Vercel Speed Insights for
              performance measurement. Vercel Web Analytics does not use cookies and does not create a profile
              that follows you across websites or days.
            </p>
            <p className="text-white/70 leading-relaxed">
              Before a Web Analytics page view is sent, this site removes query strings and URL fragments.
              It also suppresses Web Analytics events when your browser sends a Do Not Track signal. We do not
              load optional marketing analytics on the current site because there is no visitor consent control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              <li>To provide and improve our services</li>
              <li>To send newsletters and updates (with your consent)</li>
              <li>To process transactions</li>
              <li>To analyze website usage and optimize user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-white/70 leading-relaxed">
              We use Vercel for hosting and the aggregate measurement described above, Resend for newsletter
              subscriptions and delivery, and payment processors when you choose to make a purchase. These
              services process only the information needed for their role and maintain their own privacy terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-white/70 leading-relaxed">
              You have the right to access, correct, or delete your personal data.
              Contact us at frank@frankx.ai for any privacy-related requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-white/70 leading-relaxed">
              For questions about this privacy policy, email us at{' '}
              <a href="mailto:frank@frankx.ai" className="text-emerald-400 hover:text-emerald-300">
                frank@frankx.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
