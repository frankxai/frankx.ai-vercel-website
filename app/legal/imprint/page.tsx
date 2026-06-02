import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imprint — FrankX',
  description: 'Legal information and company details for Arcanea Labs BV, trading as FrankX.',
}

const IMPRINT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Imprint',
  description: 'Legal information and company details for Arcanea Labs BV, trading as FrankX.',
  url: 'https://frankx.ai/legal/imprint',
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
    address: { '@type': 'PostalAddress', addressLocality: 'Amsterdam', addressCountry: 'NL' },
  },
  dateModified: '2026-06-02',
}

export default function ImprintPage() {
  return (
    <article className="max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(IMPRINT_JSONLD) }}
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-3">Imprint</h1>
      <p className="text-zinc-500 text-sm mb-12">Legal disclosure pursuant to Dutch law</p>

      <section className="space-y-14">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">Company Information</h2>
          <div className="overflow-x-auto mt-4 rounded-lg border border-white/10 bg-white/[0.02]">
            <table className="w-full text-[15px] md:text-[16px]">
              <tbody className="divide-y divide-white/10">
                <Row label="Legal name" value="Arcanea Labs BV" />
                <Row label="Trading as" value="FrankX / frankx.ai" />
                <Row label="Registered office" value="Amsterdam, Netherlands" />
                <Row label="KvK number" value="[PENDING — update after registration]" pending />
                <Row label="BTW-id" value="[PENDING — update after registration]" pending />
                <Row label="Director (DGA)" value="Frank Riemer" />
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">Contact</h2>
          <div className="overflow-x-auto mt-4 rounded-lg border border-white/10 bg-white/[0.02]">
            <table className="w-full text-[15px] md:text-[16px]">
              <tbody className="divide-y divide-white/10">
                <Row label="Email" value="frank@frankx.ai" />
                <Row label="Website" value="https://frankx.ai" />
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">Dispute Resolution</h2>
          <p className="text-[16px] md:text-[17px] leading-[1.7] text-white/75">
            The European Commission provides a platform for online dispute resolution (ODR):{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-4 transition-colors"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.7] text-white/75 mt-4">
            We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board, but we are willing to engage in good faith to resolve any disputes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">Liability for Content</h2>
          <p className="text-[16px] md:text-[17px] leading-[1.7] text-white/75">
            The content of this website has been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages under Dutch law. We are not obligated to monitor transmitted or stored third-party information.
          </p>
        </div>
      </section>

      <p className="text-white/50 text-sm mt-16 pt-8 border-t border-white/10">Last updated: June 2026</p>
    </article>
  )
}

function Row({ label, value, pending }: { label: string; value: string; pending?: boolean }) {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-4 text-white/60 font-medium w-48 whitespace-nowrap">{label}</td>
      <td className={`py-3 px-4 ${pending ? 'text-amber-400/80 italic' : 'text-white/85'}`}>{value}</td>
    </tr>
  )
}
