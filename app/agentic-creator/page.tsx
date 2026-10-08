import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata, siteConfig } from '@/lib/seo'
import { ldJson } from '@/lib/seo/jsonld'
import { agenticFounder, agenticRoles } from '@/lib/agentic-roles'
import { RoleCard, RoleRow } from '@/components/agentic-creator/RoleCard'

export const metadata: Metadata = createMetadata({
  title: 'Agentic Creator: run AI as a crew',
  description: agenticFounder.metaDescription,
  path: '/agentic-creator',
})

const eyebrow = 'text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300'
const h2 = 'font-[family-name:var(--font-poppins)] text-3xl font-semibold tracking-tight text-white sm:text-4xl'

export default function AgenticCreatorPage() {
  const f = agenticFounder
  const url = `${siteConfig.url}/agentic-creator`

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: 'Agentic Creator',
        description: f.metaDescription,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        mainEntity: { '@id': `${url}#roles` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#roles`,
        name: 'The nine roles',
        numberOfItems: agenticRoles.length,
        itemListElement: agenticRoles.map((role, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: role.name,
          url: `${url}/${role.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Agentic Creator', item: url },
        ],
      },
    ],
  }

  return (
    <main className="bg-[#0a0a0b] text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(structuredData) }} />

      <section className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:pb-32">
        <p className={eyebrow}>Agentic Creator</p>
        <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-poppins)] text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {f.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">{f.subline}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#roles"
            className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] motion-reduce:transition-none"
          >
            See the nine roles
          </a>
          <a
            href="#receipt"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] motion-reduce:transition-none"
          >
            Read the receipt format
          </a>
        </div>
      </section>

      <section aria-labelledby="manifesto" className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:py-32">
          <p className={eyebrow}>Manifesto</p>
          <h2 id="manifesto" className={`${h2} mt-4`}>
            Give the crew a memory.
          </h2>
          <div className="mt-8 max-w-2xl space-y-6 text-lg leading-[1.75] text-slate-300">
            {f.manifesto.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-poppins)] text-xl font-semibold text-white">{f.loop.title}</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">{f.loop.body}</p>
            <ol className="mt-6 flex flex-wrap gap-2" aria-label="The loop">
              {f.loop.steps.map((s, i) => (
                <li key={s} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-slate-100">
                  <span className="mr-2 font-mono text-xs text-slate-400" aria-hidden="true">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="roles" aria-labelledby="roles-heading" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
          <p className={eyebrow}>The map</p>
          <h2 id="roles-heading" className={`${h2} mt-4`}>
            Nine roles, each with a first win.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{f.stageNote}</p>
          <div className="mt-12">
            <RoleCard role={agenticRoles[0]} index={0} />
          </div>
          <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {agenticRoles.slice(1).map((role, i) => (
              <RoleRow key={role.slug} role={role} index={i + 1} />
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="first-win" className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:py-32">
          <p className={eyebrow}>Method</p>
          <h2 id="first-win" className={`${h2} mt-4`}>
            {f.firstWin.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{f.firstWin.intro}</p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {f.firstWin.steps.map((s, i) => (
              <li key={s.title} className="rounded-[1.75rem] border border-white/10 p-6">
                <span className="font-mono text-sm text-emerald-300" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-poppins)] text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-300">{s.body}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-16 font-[family-name:var(--font-poppins)] text-2xl font-semibold text-white">{f.firstWin.rungs.title}</h3>
          <p className="mt-3 max-w-2xl text-slate-300">{f.firstWin.rungs.intro}</p>
          <div tabIndex={0} role="region" aria-label="Rungs table, scrolls sideways on small screens" className="mt-8 overflow-x-auto rounded-2xl border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <caption className="sr-only">What a person has done at each rung and the artifact they keep</caption>
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th scope="col" className="px-4 py-3 font-medium">Rung</th>
                  <th scope="col" className="px-4 py-3 font-medium">What the person has done</th>
                  <th scope="col" className="px-4 py-3 font-medium">Artifact they keep</th>
                </tr>
              </thead>
              <tbody>
                {f.firstWin.rungs.items.map((r) => (
                  <tr key={r.rung} className="border-b border-white/10 align-top last:border-0">
                    <th scope="row" className="px-4 py-4 font-semibold text-white">{r.rung}</th>
                    <td className="px-4 py-4 text-slate-300">{r.did}</td>
                    <td className="px-4 py-4 text-slate-300">{r.keeps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-slate-300">{f.firstWin.rungs.note}</p>
        </div>
      </section>

      <section id="receipt" aria-labelledby="receipt-heading" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:py-32">
          <p className={eyebrow}>Proof</p>
          <h2 id="receipt-heading" className={`${h2} mt-4`}>
            {f.receipt.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{f.receipt.intro}</p>
          <figure className="mt-10">
            <figcaption className="mb-3 font-mono text-sm text-slate-400">{f.receipt.fileName}</figcaption>
            <div tabIndex={0} role="region" aria-label="Receipt fields, scrolls sideways on small screens" className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:p-6">
              <dl className="min-w-[20rem] space-y-2 font-mono text-sm leading-relaxed">
                {f.receipt.fields.map((field) => (
                  <div key={field.key} className="grid grid-cols-[9.5rem_1fr] gap-3">
                    <dt className="text-emerald-300">{field.key}</dt>
                    <dd className="text-slate-300">{`<${field.value}>`}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </figure>
        </div>
      </section>

      <section aria-labelledby="local" className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:py-32">
          <p className={eyebrow}>Ownership</p>
          <h2 id="local" className={`${h2} mt-4`}>
            {f.local.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{f.local.intro}</p>
          <ul className="mt-8 max-w-2xl space-y-4">
            {f.local.items.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-relaxed text-slate-200">
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-slate-400">
            Independent project. <Link href="/about" className="underline underline-offset-4 hover:text-white">About Frank</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
