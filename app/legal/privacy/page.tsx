import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — FrankX',
  description: 'How Arcanea Labs BV handles your personal data. GDPR-compliant privacy policy.',
}

const PRIVACY_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  description: 'How Arcanea Labs BV handles your personal data. GDPR-compliant privacy policy.',
  url: 'https://frankx.ai/legal/privacy',
  inLanguage: 'en',
  isPartOf: {
    '@type': 'WebSite',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Arcanea Labs BV',
    url: 'https://frankx.ai',
  },
  dateModified: '2026-06-02',
}

export default function PrivacyPage() {
  return (
    <article className="max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRIVACY_JSONLD) }}
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-3">Privacy Policy</h1>
      <p className="text-zinc-500 text-sm mb-12">Effective: [DATE] &bull; Last updated: June 2026</p>

      <Section title="1. Who We Are">
        <p>Arcanea Labs BV (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), trading as FrankX, is the data controller responsible for your personal data.</p>
        <InfoTable rows={[
          ['Company', 'Arcanea Labs BV'],
          ['Address', 'Amsterdam, Netherlands'],
          ['KvK', '[PENDING]'],
          ['Email', 'frank@frankx.ai'],
          ['DPO', 'Frank Riemer'],
        ]} />
      </Section>

      <Section title="2. What Data We Collect">
        <h3 className="text-lg font-medium text-white mt-5 mb-2">Data you provide directly</h3>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Email address and name (newsletter signup, purchases)</li>
          <li>Payment information (processed by Stripe/Paddle — we do not store card details)</li>
          <li>Messages you send us via contact forms</li>
        </ul>

        <h3 className="text-lg font-medium text-white mt-6 mb-2">Data collected automatically</h3>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Pages visited and interactions (via Vercel Analytics — privacy-focused, no cookies)</li>
          <li>Device type, browser, and approximate location (country level)</li>
          <li>IP address (anonymized, not stored long-term)</li>
        </ul>
      </Section>

      <Section title="3. Why We Process Your Data">
        <InfoTable rows={[
          ['Purpose', 'Legal Basis (GDPR)'],
          ['Send newsletter', 'Your consent (Art. 6(1)(a))'],
          ['Process purchases', 'Contract performance (Art. 6(1)(b))'],
          ['Send order confirmations', 'Contract performance (Art. 6(1)(b))'],
          ['Website analytics', 'Legitimate interest (Art. 6(1)(f))'],
          ['Respond to inquiries', 'Your consent (Art. 6(1)(a))'],
          ['Legal obligations', 'Legal obligation (Art. 6(1)(c))'],
        ]} />
      </Section>

      <Section title="4. Who We Share Data With">
        <p>We share your data only with trusted service providers who process data on our behalf:</p>
        <InfoTable rows={[
          ['Service', 'Provider', 'Location', 'Purpose'],
          ['Email delivery', 'Resend', 'US (EU SCCs)', 'Sending newsletters and transactional emails'],
          ['Payments', 'Stripe / Paddle', 'US/EU', 'Processing payments securely'],
          ['Hosting', 'Vercel', 'US (EU SCCs)', 'Website hosting and analytics'],
          ['Code hosting', 'GitHub', 'US (EU SCCs)', 'Development infrastructure'],
        ]} />
        <p className="text-[15px] text-white/55 mt-3">All US-based processors operate under EU Standard Contractual Clauses (SCCs) for international data transfers.</p>
      </Section>

      <Section title="5. How Long We Keep Data">
        <InfoTable rows={[
          ['Data Type', 'Retention Period'],
          ['Newsletter subscriptions', 'Until you unsubscribe'],
          ['Purchase records', '7 years (Dutch tax obligation)'],
          ['Analytics data', 'Aggregated, no personal data stored'],
          ['Contact form messages', '1 year after last reply'],
          ['Account data', 'Until you request deletion'],
        ]} />
      </Section>

      <Section title="6. Your Rights (GDPR)">
        <p>Under the General Data Protection Regulation, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-2.5">
          <li><strong className="text-white font-semibold">Access</strong> — Request a copy of the personal data we hold about you</li>
          <li><strong className="text-white font-semibold">Rectification</strong> — Ask us to correct inaccurate or incomplete data</li>
          <li><strong className="text-white font-semibold">Erasure</strong> — Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;)</li>
          <li><strong className="text-white font-semibold">Restriction</strong> — Ask us to restrict processing of your data</li>
          <li><strong className="text-white font-semibold">Portability</strong> — Receive your data in a structured, machine-readable format</li>
          <li><strong className="text-white font-semibold">Object</strong> — Object to processing based on legitimate interests</li>
          <li><strong className="text-white font-semibold">Withdraw consent</strong> — Withdraw consent at any time (e.g., unsubscribe from newsletter)</li>
        </ul>
        <p className="mt-4">To exercise any of these rights, email <a href="mailto:frank@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-4 transition-colors">frank@frankx.ai</a>. We will respond within 30 days.</p>
      </Section>

      <Section title="7. Cookies">
        <p>We use minimal cookies:</p>
        <InfoTable rows={[
          ['Cookie', 'Type', 'Purpose', 'Duration'],
          ['Essential', 'Strictly necessary', 'Session management, security', 'Session'],
          ['Analytics', 'Performance', 'Vercel Analytics (privacy-focused)', 'Session'],
        ]} />
        <p className="text-[15px] text-white/55 mt-3">We do not use marketing cookies or third-party tracking cookies. Vercel Analytics is privacy-focused and does not use cookies for tracking individual users.</p>
      </Section>

      <Section title="8. International Transfers">
        <p>Some of our service providers are located in the United States. We ensure adequate data protection through EU Standard Contractual Clauses (SCCs) with each provider. You can request copies of these agreements by contacting us.</p>
      </Section>

      <Section title="9. Data Security">
        <p>We implement appropriate technical and organizational measures to protect your personal data, including encryption in transit (HTTPS/TLS), access controls, and regular security reviews.</p>
      </Section>

      <Section title="10. Complaints">
        <p>If you believe we have not handled your data correctly, you have the right to lodge a complaint with the Dutch Data Protection Authority:</p>
        <InfoTable rows={[
          ['Authority', 'Autoriteit Persoonsgegevens'],
          ['Website', 'https://autoriteitpersoonsgegevens.nl'],
          ['Phone', '+31 (0)88 1805 250'],
        ]} />
      </Section>

      <Section title="11. Changes to This Policy">
        <p>We may update this privacy policy from time to time. We will notify you of significant changes via email or a notice on our website. The &ldquo;last updated&rdquo; date at the top indicates the most recent revision.</p>
      </Section>

      <p className="text-white/50 text-sm mt-16 pt-8 border-t border-white/10">Last updated: June 2026</p>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">{title}</h2>
      <div className="text-[16px] md:text-[17px] leading-[1.7] text-white/75 space-y-4">{children}</div>
    </section>
  )
}

function InfoTable({ rows }: { rows: string[][] }) {
  if (rows.length === 0) return null
  const isHeader = rows[0].length > 2
  return (
    <div className="overflow-x-auto mt-4 rounded-lg border border-white/10 bg-white/[0.02]">
      <table className="w-full text-[15px] md:text-[16px]">
        <tbody className="divide-y divide-white/10">
          {rows.map((row, i) => (
            <tr key={i} className={i === 0 && isHeader ? 'bg-white/[0.03] text-white/60' : 'hover:bg-white/[0.02] transition-colors'}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 px-4 ${
                    j === 0
                      ? 'text-white/60 font-medium'
                      : 'text-white/80'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
