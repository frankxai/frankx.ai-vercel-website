import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — FrankX',
  description: 'Terms and conditions for using FrankX products and services.',
}

const TERMS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service',
  description: 'Terms and conditions for using FrankX products and services.',
  url: 'https://frankx.ai/legal/terms',
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

export default function TermsPage() {
  return (
    <article className="max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TERMS_JSONLD) }}
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-3">Terms of Service</h1>
      <p className="text-zinc-500 text-sm mb-12">Effective: [DATE] &bull; Last updated: June 2026</p>

      <Section title="1. Introduction">
        <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website frankx.ai and all products and services offered by Arcanea Labs BV (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), registered in Amsterdam, Netherlands.</p>
        <p>By accessing our website or purchasing our products, you agree to these Terms. If you do not agree, please do not use our services.</p>
      </Section>

      <Section title="2. Products and Services">
        <p>We offer digital products and services including but not limited to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Digital downloads (PDFs, templates, prompt packs)</li>
          <li>Online courses and educational content</li>
          <li>Software tools and SaaS subscriptions</li>
          <li>Consulting and coaching services</li>
          <li>Music and creative works</li>
        </ul>
      </Section>

      <Section title="3. Pricing and Payment">
        <p>All prices are displayed in EUR and include VAT where applicable for EU consumers (B2C). For business customers (B2B) with a valid VAT number, reverse charge may apply.</p>
        <p>Payment is processed securely through our payment providers (Stripe, Paddle, or Gumroad). We do not store your payment card details.</p>
      </Section>

      <Section title="4. Digital Product Delivery">
        <p>Digital products are delivered immediately upon successful payment via download link and/or email. You will receive an order confirmation email with access instructions.</p>
      </Section>

      <Section title="5. Right of Withdrawal (EU Consumers)">
        <p>Under the EU Consumer Rights Directive (2011/83/EU), you have a 14-day right of withdrawal for online purchases.</p>
        <p><strong className="text-white font-semibold">Exception for digital content:</strong> By purchasing digital products with immediate delivery, you explicitly consent to the immediate provision of digital content and acknowledge that you thereby waive your 14-day right of withdrawal. This consent is requested during the checkout process.</p>
        <p>For products where the withdrawal right applies, you may exercise it by contacting us at <a href="mailto:frank@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-4 transition-colors">frank@frankx.ai</a> within 14 days of purchase.</p>
      </Section>

      <Section title="6. License Grant">
        <p>Upon purchase, we grant you a personal, non-exclusive, non-transferable license to use the digital product for your own purposes.</p>
        <p><strong className="text-white font-semibold">You may:</strong></p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Use the product for personal and professional projects</li>
          <li>Store copies on your personal devices</li>
          <li>Use templates and prompts in your own work</li>
        </ul>
        <p><strong className="text-white font-semibold">You may not:</strong></p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Redistribute, resell, or share the product with others</li>
          <li>Claim authorship of the product</li>
          <li>Use the product to create a competing product</li>
          <li>Remove any copyright or attribution notices</li>
        </ul>
        <p>Commercial use licenses are available for select products — see individual product pages for details.</p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>All content on frankx.ai, including text, images, code, designs, music, and digital products, is the intellectual property of Arcanea Labs BV or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p>
        <p>The trademarks FrankX, Arcanea, and GenCreator are owned by Arcanea Labs BV.</p>
      </Section>

      <Section title="8. User Conduct">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Use our services for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the proper functioning of our website</li>
          <li>Scrape, copy, or reproduce our content without permission</li>
        </ul>
      </Section>

      <Section title="9. Limitation of Liability">
        <p>To the maximum extent permitted by Dutch law:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Our digital products are provided &ldquo;as is&rdquo; without warranty of any kind</li>
          <li>We are not liable for any indirect, incidental, or consequential damages</li>
          <li>Our total liability is limited to the amount you paid for the specific product</li>
        </ul>
        <p>This does not affect your statutory rights as a consumer under Dutch and EU law.</p>
      </Section>

      <Section title="10. Governing Law">
        <p>These Terms are governed by the laws of the Netherlands. Any disputes arising from these Terms shall be submitted to the competent court in Amsterdam, Netherlands.</p>
        <p>For EU consumers: You may also use the Online Dispute Resolution platform at{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-4 transition-colors">
            ec.europa.eu/consumers/odr
          </a>
        </p>
      </Section>

      <Section title="11. Changes to These Terms">
        <p>We reserve the right to modify these Terms at any time. Changes take effect upon posting to this page. Continued use of our services after changes constitutes acceptance of the updated Terms.</p>
      </Section>

      <Section title="12. Contact">
        <p>For questions about these Terms, contact us at{' '}
          <a href="mailto:frank@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-4 transition-colors">frank@frankx.ai</a>
        </p>
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
