import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  LockKeyhole,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import { AnaProposalResponse } from '@/components/ana/AnaProposalResponse'
import { anaLinks } from '@/data/ana-collaboration'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Cecilia Proposal | Ana × FrankX',
  description:
    'An approval-first decision room for the Cecilia working name, a possible client guide, team workspace, and Ana-led commercial model.',
  path: '/alliance/cecilia',
  noindex: true,
})

const experienceLayers = [
  {
    status: 'Proposal for Ana',
    title: 'A useful free guide',
    detail:
      'Explain services, help a client prepare for a first conversation, answer process questions, and route people to the right human or resource.',
    boundary:
      'No candidate assessment, client records, therapy, legal advice, or confidential documents.',
    icon: MessageCircleQuestion,
  },
  {
    status: 'Later, if approved',
    title: 'Paid client support',
    detail:
      'A monthly workspace for kickoff preparation, approved templates, progress summaries, meeting prep, and aftercare between human touchpoints.',
    boundary:
      'Every client-facing output is reviewable; humans remain responsible for hiring and commercial decisions.',
    icon: CircleDollarSign,
  },
  {
    status: 'Pilot recommended',
    title: 'The private team workspace',
    detail:
      'A control board, guided HR procedures, research library, template index, approval queue, and shared learning for Ana’s team.',
    boundary:
      'Private sources stay in Drive, the approved ATS, finance systems, and other authorized tools.',
    icon: Users,
  },
] as const

const commercialModels = [
  {
    label: 'Option A',
    title: 'Ana-owned product, shared operating upside',
    detail:
      'Ana keeps the clear majority of net product revenue. Frank receives a smaller agreed share for product build, infrastructure, and ongoing operations.',
    bestWhen: 'Both want a long-term partnership and Frank remains responsible for meaningful operations.',
  },
  {
    label: 'Option B',
    title: 'Fixed build plus maintenance',
    detail:
      'Ana pays an approved setup and maintenance fee, then keeps product revenue. Scope changes are priced separately.',
    bestWhen: 'Ana wants simple economics and direct product ownership without a continuing revenue split.',
  },
  {
    label: 'Option C',
    title: 'Measured pilot before monetization',
    detail:
      'Prototype the experience with made-up example content, then test with a small invited group. No checkout until people use it and the support burden is understood.',
    bestWhen: 'The offer, brand, and client demand still need evidence.',
  },
] as const

const responseDecisions = [
  {
    id: 'explore-cecilia',
    label: 'Explore Cecilia with me',
    description: 'Prepare naming options and a prototype using made-up examples. This does not authorize a public launch or use of Ana’s identity.',
  },
  {
    id: 'ana-led-name',
    label: 'Keep Ana in front',
    description: 'Explore the client guide and team workspace while keeping Ana’s existing identity as the primary brand.',
  },
  {
    id: 'pause-cecilia',
    label: 'Pause this idea',
    description: 'Do not prepare a Cecilia brand or product proposal yet.',
  },
]

const responsePriorities = [
  { id: 'name-and-voice', label: 'Naming, voice, and identity options' },
  { id: 'free-guide', label: 'A free guide using approved information only' },
  { id: 'paid-client', label: 'Paid client-support experience' },
  { id: 'team-workspace', label: 'Private workspace for the team of four' },
  { id: 'commercial-model', label: 'Private commercial term sheet' },
  { id: 'privacy-legal', label: 'Privacy, ownership, and legal review checklist' },
]

export default function CeciliaAlliancePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ana-obsidian text-ana-cream">
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-36 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-ana-aurora-cecilia" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ana-gold/[0.55] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ana-gold/25 bg-ana-gold/[0.09] px-4 py-2 text-xs font-semibold tracking-[0.08em] text-ana-cream">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Working name · Ana decides
            </div>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              A gentler front door for Ana's expertise, if she wants it.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
              Cecilia could become a name Ana's whole team can share and a useful guide clients can visit between human touchpoints. It could also remain only an idea. Ana chooses the name, promise, boundaries, economics, and whether anything is launched.
            </p>
            <p className="mt-4 max-w-2xl border-l border-ana-gold/[0.35] pl-4 text-sm leading-6 text-ana-cream/[0.72]">
              Una propuesta, no una decisión tomada. La marca y la voz siguen siendo de Ana.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#experience" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                See what it could become
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href={anaLinks.teamPlan} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/[0.78] transition hover:border-white/[0.35] hover:text-ana-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold">
                Review the team plan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.12em] text-ana-gold">cecilia.chat</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">The domain is reserved. The product is not live.</h2>
              </div>
              <LockKeyhole className="h-8 w-8 shrink-0 text-ana-gold" aria-hidden="true" />
            </div>
            <dl className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {[
                ['Name', 'Unapproved working name'],
                ['Domain', 'Reserved; no deployment'],
                ['Checkout', 'Not configured'],
                ['Client data', 'Not connected'],
                ['Next safe step', 'Prototype with made-up examples after Ana responds'],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-2 py-3.5 sm:grid-cols-[7rem_1fr]">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/[0.38]">{label}</dt>
                  <dd className="text-sm leading-6 text-ana-cream/[0.68]">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">One name, three possible layers</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Start useful. Earn trust before asking for payment.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">Each layer has a different audience and level of responsibility. The free guide can use approved information only; client and team spaces need clear decisions about identity, access, privacy, and support.</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {experienceLayers.map((layer) => {
              const Icon = layer.icon
              return (
                <article key={layer.title} className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-ana-gold/[0.22] bg-ana-gold/[0.07] px-3 py-1 text-[10px] font-semibold tracking-[0.06em] text-ana-cream">{layer.status}</span>
                    <Icon className="h-5 w-5 text-ana-gold" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{layer.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ana-cream/60">{layer.detail}</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="flex items-start gap-2 text-xs leading-5 text-ana-cream/[0.43]">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-200/75" aria-hidden="true" />
                      {layer.boundary}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Identity decision</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Cecilia can support Ana. It should never replace her without consent.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">A shared name may help the other women on the team feel represented. It may also dilute Ana's existing reputation. The right answer comes from a short naming and voice workshop, not from a domain purchase.</p>
          </div>

          <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/[0.18]">
            {[
              ['Ana Cecilia stays the brand', 'Cecilia becomes a product or companion name under Ana’s established identity.'],
              ['Cecilia becomes the team brand', 'Ana remains founder and visible expert while the team shares one company-facing identity.'],
              ['No new identity yet', 'Pilot the workflow under Ana’s current name and revisit only after the team sees client demand.'],
            ].map(([title, detail], index) => (
              <article key={title} className={`grid gap-3 p-6 sm:grid-cols-[3rem_1fr] sm:p-7 ${index > 0 ? 'border-t border-white/10' : ''}`}>
                <span className="font-mono text-xs text-ana-gold">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ana-cream/[0.55]">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Commercial models to discuss privately</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Ana should keep most of the value created from her method.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">Frank can earn a smaller share when he carries real build and operating responsibility. Exact percentages do not belong on a public review page; they belong in an approved agreement with a precise definition of net revenue.</p>
          </div>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {commercialModels.map((model) => (
              <article key={model.label} className="grid gap-4 py-7 lg:grid-cols-[7rem_0.8fr_1.15fr] lg:gap-8 lg:py-9">
                <p className="font-mono text-xs text-ana-gold">{model.label}</p>
                <div>
                  <h3 className="text-xl font-semibold">{model.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ana-cream/[0.56]">{model.detail}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/[0.09] bg-white/[0.025] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/[0.38]">Best when</p>
                  <p className="mt-2 text-sm leading-6 text-ana-cream/[0.62]">{model.bestWhen}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(221,184,127,0.11),rgba(255,255,255,0.025),rgba(25,87,66,0.11))] lg:grid-cols-[0.84fr_1.16fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Before money moves</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">The agreement comes before the checkout.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">Lemon Squeezy, Polar, or Stripe can wait. The product and partnership need a clear owner, support model, data boundary, stop condition, and legal review first.</p>
          </div>
          <div className="grid border-t border-white/10 bg-black/[0.18] sm:grid-cols-2 lg:border-l lg:border-t-0">
            {[
              'Brand, method, platform, and output ownership',
              'Net revenue, fees, refunds, taxes, and direct AI costs',
              'Support hours, response promises, and maintenance scope',
              'Privacy roles, processors, retention, deletion, and incident path',
              'Merchant of record, invoicing, payout timing, and chargebacks',
              'Pilot success measures, termination, migration, and client continuity',
            ].map((item, index) => (
              <div key={item} className={`flex items-start gap-3 p-5 sm:p-6 ${index > 0 ? 'border-t border-white/10 sm:border-l sm:[&:nth-child(odd)]:border-l-0' : ''}`}>
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-200/80" aria-hidden="true" />
                <p className="text-sm leading-6 text-ana-cream/[0.58]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="respond" className="scroll-mt-24 px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <AnaProposalResponse
            proposalId="cecilia-brand-and-client-guide-v1"
            eyebrow="Cecilia decision room"
            title="Choose the direction before Frank builds it."
            intro="This response tells Frank what to explore. A public name, domain launch, payment setup, client-data connection, revenue agreement, and use of Ana's identity all remain separate approvals."
            decisions={responseDecisions}
            priorities={responsePriorities}
          />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-2xl items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-ana-gold" aria-hidden="true" />
            <p className="text-sm leading-6 text-ana-cream/50">Cecilia does not assess or select candidates, provide therapy or legal advice, make hiring decisions, or store client and candidate data on a public page. Those boundaries are part of the product, not footnotes.</p>
          </div>
          <a href={anaLinks.workWithMe} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-ana-cream underline decoration-ana-gold/[0.35] underline-offset-4 hover:decoration-ana-gold">
            Ana's current work-with-me page
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}
