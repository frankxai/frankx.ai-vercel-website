import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | FrankX.AI',
  description: 'Terms of service for FrankX.AI - rules and guidelines for using our services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-white/60 mb-8">Last updated: January 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-white/70 leading-relaxed">
              By accessing and using FrankX.AI, you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
            <p className="text-white/70 leading-relaxed mb-4">You agree to use our services only for lawful purposes and in accordance with these terms. You must not:</p>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              <li>Use the services in any way that violates applicable laws</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the services</li>
              <li>Copy, distribute, or modify content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-white/70 leading-relaxed">
              All content on FrankX.AI, including text, graphics, logos, and software, is the property
              of FrankX.AI or its licensors and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Digital Products</h2>
            <p className="text-white/70 leading-relaxed">
              Purchases of digital products (courses, templates, guides) are non-refundable unless
              otherwise specified. You receive a license to use purchased content for personal or
              business purposes as outlined in the specific product terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-white/70 leading-relaxed">
              Services are provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee
              that services will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-white/70 leading-relaxed">
              FrankX.AI shall not be liable for any indirect, incidental, special, or consequential damages
              arising from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              We may update these terms from time to time. Continued use of our services after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-white/70 leading-relaxed">
              Questions about these terms? Contact us at{' '}
              <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300">
                hello@frankx.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
