import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imprint — FrankX',
  description: 'Legal information and company details for Arcanea Labs BV, trading as FrankX.',
}

export default function ImprintPage() {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Imprint</h1>
      <p className="text-zinc-500 text-sm mb-8">Legal disclosure pursuant to Dutch law</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-zinc-200">Company Information</h2>
          <table className="w-full text-sm mt-3">
            <tbody className="divide-y divide-zinc-800">
              <Row label="Legal name" value="Arcanea Labs BV" />
              <Row label="Trading as" value="FrankX / frankx.ai" />
              <Row label="Registered office" value="Amsterdam, Netherlands" />
              <Row label="KvK number" value="[PENDING — update after registration]" pending />
              <Row label="BTW-id" value="[PENDING — update after registration]" pending />
              <Row label="Director (DGA)" value="Frank Riemer" />
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-200">Contact</h2>
          <table className="w-full text-sm mt-3">
            <tbody className="divide-y divide-zinc-800">
              <Row label="Email" value="hello@frankx.ai" />
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

function Row({ label, value, pending }: { label: string; value: string; pending?: boolean }) {
  return (
    <tr>
      <td className="py-2 pr-4 text-zinc-500 w-40">{label}</td>
      <td className={`py-2 ${pending ? 'text-amber-500/70 italic' : 'text-zinc-300'}`}>{value}</td>
    </tr>
  )
}
