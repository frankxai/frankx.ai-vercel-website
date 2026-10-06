import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { createMetadata, siteConfig } from '@/lib/seo'
import { ldJson } from '@/lib/seo/jsonld'
import { agenticRoles, agenticStages, getAgenticRole } from '@/lib/agentic-roles'
import { StageBadge } from '@/components/agentic-creator/StageBadge'

export const dynamicParams = false

export function generateStaticParams() {
  return agenticRoles.map((role) => ({ role: role.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role: slug } = await params
  const role = getAgenticRole(slug)
  if (!role) return {}
  return createMetadata({
    title: `${role.name}: ${role.headline}`,
    description: role.subline,
    path: `/agentic-creator/${role.slug}`,
    // Legal read of investor copy pending; remove when cleared.
    noindex: role.slug === 'investor',
  })
}

const eyebrow = 'text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300'
const h2 = 'font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-tight text-white sm:text-3xl'

export default async function AgenticRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role: slug } = await params
  const role = getAgenticRole(slug)
  if (!role) notFound()

  const index = agenticRoles.findIndex((r) => r.slug === role.slug)
  const prev = agenticRoles[(index + agenticRoles.length - 1) % agenticRoles.length]
  const next = agenticRoles[(index + 1) % agenticRoles.length]
  const url = `${siteConfig.url}/agentic-creator/${role.slug}`
  const stage = agenticStages[role.stage]

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: `${role.name}: ${role.headline}`,
        description: role.subline,
        isPartOf: { '@id': `${siteConfig.url}/agentic-creator#page` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Agentic Creator', item: `${siteConfig.url}/agentic-creator` },
          { '@type': 'ListItem', position: 3, name: role.name, item: url },
        ],
      },
    ],
  }

  return (
    <main className="bg-[#0a0a0b] text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(structuredData) }} />

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        <nav aria-label="Breadcrumb">
          <Link
            href="/agentic-creator#roles"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All nine roles
          </Link>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className={eyebrow}>{role.name}</p>
            <StageBadge stage={role.stage} />
          </div>
          <h1 className="mt-5 font-[family-name:var(--font-poppins)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {role.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">{role.subline}</p>
          <p className="mt-4 text-slate-400">For: {role.who}</p>
        </header>

        <section aria-labelledby="first-win" className="mt-14 rounded-[2rem] border border-emerald-400/30 bg-emerald-400/[0.06] p-6 sm:p-9">
          <h2 id="first-win" className={eyebrow}>First win</h2>
          <p className="mt-4 font-[family-name:var(--font-poppins)] text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {role.firstWin}
          </p>
          <dl className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-slate-400">Proof</dt>
              <dd className="mt-1 text-slate-100">{role.proof}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-400">Compounds as</dt>
              <dd className="mt-1 text-slate-100">{role.compounds}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-slate-300">
            Every first win ends in a receipt.{' '}
            <Link href="/agentic-creator#receipt" className="underline underline-offset-4 hover:text-white">
              See the receipt format
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="stage" className="mt-12">
          <h2 id="stage" className={h2}>Where this role stands</h2>
          <div className="mt-5 rounded-[1.75rem] border border-white/10 p-6 sm:p-7">
            <StageBadge stage={role.stage} />
            <p className="mt-4 text-slate-300">{stage.note}</p>
            {role.stage === 'waitlist' && 'href' in stage ? (
              <a
                href={stage.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] motion-reduce:transition-none"
              >
                Join the waitlist
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </section>

        <section aria-labelledby="exists" className="mt-12">
          <h2 id="exists" className={h2}>What already exists</h2>
          <p className="mt-4 text-lg text-slate-200">{role.exists}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Repositories and tools behind this role">
            {role.crew.map((c) => (
              <li key={c} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-slate-300">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-300">{role.boundary}</p>
        </section>

        <section aria-labelledby="scene" className="mt-12">
          <h2 id="scene" className={h2}>{role.scene.title}</h2>
          <figure className="mt-5 border-l-2 border-white/20 pl-5 sm:pl-7">
            <figcaption className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Illustration</figcaption>
            <p className="max-w-2xl text-lg leading-[1.75] text-slate-200">{role.scene.body}</p>
          </figure>
        </section>

        <nav aria-label="Other roles" className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          <Link
            href={`/agentic-creator/${prev.slug}`}
            className="rounded-2xl border border-white/10 p-5 transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 motion-reduce:transition-none"
          >
            <span className="text-xs text-slate-400">Previous role</span>
            <span className="mt-1 block font-semibold text-white">{prev.name}</span>
          </Link>
          <Link
            href={`/agentic-creator/${next.slug}`}
            className="rounded-2xl border border-white/10 p-5 text-left transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:text-right motion-reduce:transition-none"
          >
            <span className="text-xs text-slate-400">Next role</span>
            <span className="mt-1 block font-semibold text-white">{next.name}</span>
          </Link>
        </nav>
      </div>
    </main>
  )
}
