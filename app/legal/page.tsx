import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legal | FrankX.AI',
  description: 'Legal information for FrankX.AI - policies, disclaimers, and compliance information.',
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Legal Information</h1>

        <div className="space-y-8">
          {/* Quick Links */}
          <section className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/privacy"
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
            >
              <h3 className="text-lg font-semibold mb-2">Privacy Policy</h3>
              <p className="text-white/60 text-sm">How we collect, use, and protect your data.</p>
            </Link>
            <Link
              href="/terms"
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
            >
              <h3 className="text-lg font-semibold mb-2">Terms of Service</h3>
              <p className="text-white/60 text-sm">Rules and guidelines for using our services.</p>
            </Link>
          </section>

          {/* Business Information */}
          <section className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-2xl font-semibold mb-4">Business Information</h2>
            <div className="space-y-3 text-white/70">
              <p><strong className="text-white">Business Name:</strong> FrankX.AI</p>
              <p><strong className="text-white">Contact:</strong>{' '}
                <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300">
                  hello@frankx.ai
                </a>
              </p>
              <p><strong className="text-white">Website:</strong>{' '}
                <a href="https://frankx.ai" className="text-emerald-400 hover:text-emerald-300">
                  https://frankx.ai
                </a>
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
            <div className="space-y-4 text-white/70">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Educational Content</h3>
                <p className="text-sm leading-relaxed">
                  Content on this site is for educational and informational purposes only.
                  Results may vary and are not guaranteed.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">AI-Generated Content</h3>
                <p className="text-sm leading-relaxed">
                  Some content on this site may be created or enhanced using AI tools.
                  All AI-generated content is reviewed and curated.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Affiliate Disclosure</h3>
                <p className="text-sm leading-relaxed">
                  Some links on this site may be affiliate links. We may earn a commission
                  if you make a purchase through these links at no extra cost to you.
                </p>
              </div>
            </div>
          </section>

          {/* Copyright */}
          <section className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-2xl font-semibold mb-4">Copyright</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              &copy; {new Date().getFullYear()} FrankX.AI. All rights reserved.
              Unauthorized reproduction, distribution, or modification of any content
              on this website is strictly prohibited without written consent.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
