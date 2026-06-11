import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — FrankX',
  description: 'How Arcanea Labs BV handles your personal data. GDPR-compliant privacy policy.',
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-zinc-500 text-sm mb-8">Effective: [DATE] &bull; Last updated: March 2026</p>

      <Section title="1. Who We Are">
        <p>Arcanea Labs BV (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), trading as FrankX, is the data controller responsible for your personal data.</p>
        <InfoTable rows={[
          ['Company', 'Arcanea Labs BV'],
          ['Address', 'Amsterdam, Netherlands'],
          ['KvK', '[PENDING]'],
          ['Email', 'privacy@frankx.ai'],
          ['DPO', 'Frank Riemer'],
        ]} />
      </Section>

      <Section title="2. What Data We Collect">
        <h3 className="text-base font-medium text-zinc-300 mt-4">Data you provide directly</h3>
        <ul className="text-zinc-400 text-sm space-y-1">
          <li>Email address and name (newsletter signup, purchases)</li>
          <li>Payment information (processed by Stripe/Paddle — we do not store card details)</li>
          <li>Messages you send us via contact forms</li>
        </ul>

        <h3 className="text-base font-medium text-zinc-300 mt-4">Data collected automatically</h3>
        <ul className="text-zinc-400 text-sm space-y-1">
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
        <p className="text-sm text-zinc-500 mt-2">All US-based processors operate under EU Standard Contractual Clauses (SCCs) for international data transfers.</p>
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
        <ul className="text-zinc-400 text-sm space-y-2">
          <li><strong className="text-zinc-300">Access</strong> — Request a copy of the personal data we hold about you</li>
          <li><strong className="text-zinc-300">Rectification</strong> — Ask us to correct inaccurate or incomplete data</li>
          <li><strong className="text-zinc-300">Erasure</strong> — Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;)</li>
          <li><strong className="text-zinc-300">Restriction</strong> — Ask us to restrict processing of your data</li>
          <li><strong className="text-zinc-300">Portability</strong> — Receive your data in a structured, machine-readable format</li>
          <li><strong className="text-zinc-300">Object</strong> — Object to processing based on legitimate interests</li>
          <li><strong className="text-zinc-300">Withdraw consent</strong> — Withdraw consent at any time (e.g., unsubscribe from newsletter)</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, email <a href="mailto:privacy@frankx.ai" className="text-violet-400">privacy@frankx.ai</a>. We will respond within 30 days.</p>
      </Section>

      <Section title="7. Cookies">
        <p>We use minimal cookies:</p>
        <InfoTable rows={[
          ['Cookie', 'Type', 'Purpose', 'Duration'],
          ['Essential', 'Strictly necessary', 'Session management, security', 'Session'],
          ['Analytics', 'Performance', 'Vercel Analytics (privacy-focused)', 'Session'],
        ]} />
        <p className="text-sm text-zinc-500 mt-2">We do not use marketing cookies or third-party tracking cookies. Vercel Analytics is privacy-focused and does not use cookies for tracking individual users.</p>
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

      <p className="text-zinc-600 text-xs mt-12">Last updated: March 2026</p>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-zinc-200 mb-3">{title}</h2>
      <div className="text-zinc-400 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

function InfoTable({ rows }: { rows: string[][] }) {
  if (rows.length === 0) return null
  const isHeader = rows[0].length > 2
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-zinc-800">
          {rows.map((row, i) => (
            <tr key={i} className={i === 0 && isHeader ? 'text-zinc-500' : ''}>
              {row.map((cell, j) => (
                <td key={j} className={`py-1.5 pr-4 ${j === 0 ? 'text-zinc-500 font-medium' : 'text-zinc-400'}`}>
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
