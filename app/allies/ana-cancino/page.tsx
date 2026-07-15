import Link from 'next/link'
import { ArrowRight, CheckCircle2, ExternalLink, LockKeyhole, ShieldCheck, Users } from 'lucide-react'

import { AnaPluginInstall } from '@/components/ana/AnaPluginInstall'
import { AnaTeamWorkflow } from '@/components/ana/AnaTeamWorkflow'
import { anaLinks } from '@/data/ana-collaboration'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Ana Cecilia Cancino | Team Workflow',
  description: 'Ana Cecilia Cancino’s unlisted collaboration hub: the shared client workflow, ownership boundaries, and Codex plugin installation.',
  path: '/allies/ana-cancino',
  noindex: true,
})

const responsibilities = [
  {
    title: 'Ana’s team owns the work',
    items: ['Capture source facts and open decisions', 'Maintain client cadence and approved records', 'Verify every draft before review'],
  },
  {
    title: 'Codex supports preparation',
    items: ['Structure approved source material', 'Show missing facts, owners, and approvals', 'Check document completeness and arithmetic'],
  },
  {
    title: 'People retain decisions',
    items: ['Approve scope, requirements, and hiring judgments', 'Approve pricing, invoices, and final wording', 'Authorize the exact recipient and send channel'],
  },
] as const

export default function AnaAllyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ana-obsidian text-ana-cream">
      <section className="relative isolate px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-36 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-ana-aurora" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-ana-gold">Ana × FrankX · working hub</p>
            <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              Ana built the method. This makes the full client path easier to run together.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
              One shared view from first call to handoff: who owns each stage, where Codex can prepare, and which decisions always stay human.
            </p>
            <p className="mt-4 max-w-2xl border-l border-ana-gold/35 pl-4 text-sm leading-6 text-ana-cream/70">
              El equipo dirige el trabajo. Codex apoya la preparación. Ana y el cliente mantienen las decisiones.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#workflow" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white">
                Explore the workflow <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#install" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ana-cream/80 transition hover:border-white/30">
                Install the Codex plugin
              </a>
            </div>
          </div>

          <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-8">
            <ShieldCheck className="h-7 w-7 text-ana-gold" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight">A shared method with a clear privacy line.</h2>
            <div className="mt-7 space-y-5 border-y border-white/10 py-6">
              {[
                ['This page', 'Workflow, responsibilities, install steps, and public-safe guidance.'],
                ['Private systems', 'Client records, candidate evidence, commercial facts, and working templates.'],
                ['Human review', 'Hiring, pricing, external communication, and final approval.'],
              ].map(([title, detail], index) => (
                <div key={title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-xs text-ana-gold">0{index + 1}</span>
                  <div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-ana-cream/55">{detail}</p></div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-ana-cream/45">
              <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              This page is excluded from search indexing, but noindex is not a password. Sensitive material never belongs here.
            </p>
          </aside>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl"><AnaTeamWorkflow /></div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium text-ana-gold">Responsibility before automation</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Faster preparation. Visible accountability.</h2>
          <div className="mt-10 grid border-y border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-white/10">
            {responsibilities.map((group, index) => (
              <article key={group.title} className={`py-8 lg:px-8 lg:py-10 ${index > 0 ? 'border-t border-white/10 lg:border-t-0' : ''}`}>
                <Users className="h-5 w-5 text-ana-gold" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold">{group.title}</h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-ana-cream/60"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-200/80" aria-hidden="true" />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12"><div className="mx-auto max-w-7xl"><AnaPluginInstall /></div></section>

      <footer className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-ana-cream/45">This is Ana’s dedicated operating hub. Its content is not approval to publish Ana-specific work in a blog, newsletter, social post, or another public destination.</p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link href={anaLinks.friendPage}>Collaboration hub</Link>
            <a href={anaLinks.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">Ana’s website <ExternalLink className="h-3.5 w-3.5" /></a>
            <a href={anaLinks.kitStart} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">Start guide <ExternalLink className="h-3.5 w-3.5" /></a>
            <Link href={anaLinks.codexPluginsGuide}>Codex Plugins guide</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
