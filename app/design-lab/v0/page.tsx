import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'v0 study archive',
  description:
    'Legacy design-lab route for FrankX v0 studies. The current proving ground and public authority surface lives at /v0.',
}

const rules = [
  'v0 MCP explores interface direction. It does not own route truth, architecture, or release authority.',
  'The public proving ground is /v0, where studies sit beside owned product evidence and maturity labels.',
  'Only repository-owned code, evidence, and release gates can promote a study into a starter or product candidate.',
] as const

const scopes = [
  {
    title: 'What this route is now',
    body: 'A legacy archive entry point for the older design-lab showcase. It stays live so links do not break, but the operating center moved into Product Foundry.',
  },
  {
    title: 'Where to go for current truth',
    body: 'Use /v0 for the public study catalog and Creator Launch OS evidence, and use the v0 MCP operating standard for the repo rules that govern export, rewrite, and promotion.',
  },
  {
    title: 'What graduates',
    body: 'Only explicit open templates and repository-owned route work. Preview hosts, v0 chats, and raw exports remain reference material until the repo says more.',
  },
] as const

export default function DesignLabV0Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:px-8 lg:pt-28">
        <nav className="mb-10">
          <Link
            href="/design-lab"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/70"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Design lab
          </Link>
        </nav>

        <div className="max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.12em] text-emerald-300/70">Legacy archive route</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">
            The study archive moved into Product Foundry.
          </h1>
          <p className="mt-6 text-base leading-7 text-white/58 sm:text-lg">
            This route used to host a direct v0 showcase. The current FrankX stance is cleaner:
            v0 MCP generates interface directions, while frankx.ai keeps the owned brief, the code,
            the evidence, and the release decision.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/v0"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Open Product Foundry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/design-lab"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/72 transition-colors hover:border-white/30 hover:text-white"
          >
            Browse design lab
          </Link>
          <a
            href="https://v0.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-5 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-400/[0.12]"
          >
            Open v0
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <section className="mt-16 grid gap-4 rounded-[2rem] border border-white/10 bg-[#101113] p-6 sm:p-8">
          {rules.map((rule, index) => (
            <div key={rule} className="flex gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
              <span className="font-mono text-[11px] text-emerald-300/65">{String(index + 1).padStart(2, '0')}</span>
              <p className="text-sm leading-6 text-white/64">{rule}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {scopes.map((scope) => (
            <article key={scope.title} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-white">{scope.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/50">{scope.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
