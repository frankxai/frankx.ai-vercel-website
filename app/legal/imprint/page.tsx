import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imprint — FrankX',
  description: 'Legal information and business details for Frank Riemer (eenmanszaak), publisher of frankx.ai.',
}

export default function ImprintPage() {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Imprint</h1>
      <p className="text-zinc-500 text-sm mb-8">Legal disclosure pursuant to Dutch law</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-zinc-200">Business Information</h2>
          <table className="w-full text-sm mt-3">
            <tbody className="divide-y divide-zinc-800">
              <Row label="Legal name" value="Frank Riemer" />
              <Row label="Legal form" value="Eenmanszaak (sole proprietorship)" />
              <Row label="Business address" value="Amsterdam, Netherlands" />
              <Row label="KvK number" value="42186809" />
              <Row label="BTW-id" value="NL005565287B89" />
              <Row label="Owner" value="Frank Riemer" />
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-200">Contact</h2>
          <table className="w-full text-sm mt-3">
            <tbody className="divide-y divide-zinc-800">
              <Row label="Email" value="frank@frankx.ai" />
              <Row label="Website" value="https://frankx.ai" />
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-200">Dispute Resolution</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The European Commission provides a platform for online dispute resolution (ODR):{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mt-2">
            We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board, but we are willing to engage in good faith to resolve any disputes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-200">Liability for Content</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The content of this website has been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages under Dutch law. We are not obligated to monitor transmitted or stored third-party information.
          </p>
        </div>
      </section>

      <p className="text-zinc-600 text-xs mt-12">Last updated: March 2026</p>
    </article>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="py-2 pr-4 text-zinc-500 w-40">{label}</td>
      <td className="py-2 text-zinc-300">{value}</td>
    </tr>
  )
}
