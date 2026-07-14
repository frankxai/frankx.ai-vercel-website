import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  FolderKanban,
  LockKeyhole,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { AnaProposalResponse } from '@/components/ana/AnaProposalResponse'
import { AnaTeamWorkflow } from '@/components/ana/AnaTeamWorkflow'
import { anaLinks, anaPilot } from '@/data/ana-collaboration'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Ana Team Operating Plan | FrankX',
  description:
    "A practical proposal for making Ana's HR and recruiting process easier for her four-person team to run, review, and improve.",
  path: '/allies/ana-cancino',
  noindex: true,
})

const statusItems = [
  {
    status: 'Available now',
    title: 'Ana HR Operations v1',
    detail: 'Eight guided procedures from first call through approved handoff, with privacy and money gates built in.',
    tone: 'emerald',
  },
  {
    status: 'Pilot recommended',
    title: 'One copied rehearsal',
    detail: 'Practice with a past case whose private details are removed, or a made-up example, before connecting live work.',
    tone: 'amber',
  },
  {
    status: "Needs Ana's decision",
    title: 'Team roles and sources',
    detail: 'Who owns each stage, which Drive templates are approved, and where private records belong.',
    tone: 'rose',
  },
  {
    status: 'Later',
    title: 'Portal and paid client layer',
    detail: 'Build only after the team proves the workflow and Ana chooses the brand, offer, and commercial model.',
    tone: 'slate',
  },
] as const

const responsibilities = [
  {
    label: 'The team prepares',
    icon: Users,
    items: [
      'Capture source facts and open decisions',
      'Own client cadence, ATS records, and document sources',
      'Verify every draft before it reaches Ana',
    ],
  },
  {
    label: 'AI organizes and checks',
    icon: FolderKanban,
    items: [
      'Turn approved source material into structured drafts',
      'Show missing facts, owners, dates, and approvals',
      'Validate arithmetic and document completeness',
    ],
  },
  {
    label: 'Ana and the client decide',
    icon: ShieldCheck,
    items: [
      'Approve scope, role requirements, and hiring judgments',
      'Approve every price, invoice, and final wording',
      'Authorize the exact recipient and send channel',
    ],
  },
] as const

const responseDecisions = [
  {
    id: 'prepare-pilot',
    label: 'Yes — prepare the pilot',
    description: 'Frank may prepare a planning brief for one copied rehearsal. This is not launch or purchase approval.',
  },
  {
    id: 'changes-first',
    label: 'I want changes first',
    description: 'Use the comments to adjust the sequence, team experience, or scope before a pilot.',
  },
  {
    id: 'not-now',
    label: 'Not now',
    description: 'Keep the materials available, but do not prepare the pilot yet.',
  },
]

const responsePriorities = [
  { id: 'team-workflow', label: 'Configure the team workflow and roles' },
  { id: 'drive-templates', label: 'Connect approved Google Docs templates' },
  { id: 'copied-rehearsal', label: 'Prepare a practice case with no private details' },
  { id: 'private-portal', label: 'Design the private team portal' },
  { id: 'cecilia', label: 'Explore the Cecilia name and client guide' },
  { id: 'commercial', label: 'Map ownership, support, and commercial terms' },
]

function StatusTone({ tone }: { tone: (typeof statusItems)[number]['tone'] }) {
  const classes = {
    emerald: 'border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-100',
    amber: 'border-amber-300/25 bg-amber-300/[0.07] text-amber-100',
    rose: 'border-rose-300/25 bg-rose-300/[0.07] text-rose-100',
    slate: 'border-white/[0.15] bg-white/[0.05] text-white/[0.65]',
  }

  return <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${classes[tone]}`}>{statusItems.find((item) => item.tone === tone)?.status}</span>
}

export default function AnaAllyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ana-obsidian text-ana-cream">
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-28 sm:px-8 md:pb-20 md:pt-36 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-ana-aurora" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ana-gold/[0.55] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ana-gold/25 bg-ana-gold/[0.09] px-4 py-2 text-xs font-semibold tracking-[0.08em] text-ana-cream">
              <Users className="h-4 w-4" aria-hidden="true" />
              Prepared for Ana and her four-person team
            </div>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              Your method, made easy for the team to run.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
              Ana already has the difficult part: a thoughtful HR and recruiting process. This proposal makes the sequence visible, teaches it one stage at a time, and keeps Ana in control of every consequential decision.
            </p>
            <p className="mt-4 max-w-2xl border-l border-ana-gold/[0.35] pl-4 text-sm leading-6 text-ana-cream/[0.72]">
              El equipo prepara. La IA organiza y revisa. Ana y el cliente deciden.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#workflow" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                Explore the workflow
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href={anaLinks.kitDownload} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/[0.78] transition hover:border-white/[0.35] hover:text-ana-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold">
                Start Ana HR Operations
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">The useful first win</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">One client path the whole team can explain.</h2>
              </div>
              <FileCheck2 className="hidden h-10 w-10 text-ana-gold sm:block" aria-hidden="true" />
            </div>
            <ol className="mt-7 space-y-0 border-y border-white/10">
              {[
                ['1', 'Open the approved source'],
                ['2', 'Run one named procedure'],
                ['3', 'Show what is missing'],
                ['4', 'Stop for the right approval'],
                ['5', 'Hand off the reviewed draft'],
              ].map(([number, label]) => (
                <li key={number} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-white/[0.09] py-3 last:border-b-0">
                  <span className="font-mono text-xs text-ana-gold">0{number}</span>
                  <span className="text-sm text-ana-cream/[0.68]">{label}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-ana-cream/[0.42]">
              <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Client and candidate records stay in approved private systems, never in this page or a public repository.
            </p>
          </aside>
        </div>
      </section>

      <section aria-label="Proposal status" className="px-5 pb-16 sm:px-8 md:pb-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/[0.18] md:grid-cols-2 xl:grid-cols-4">
          {statusItems.map((item, index) => (
            <article key={item.title} className={`p-5 sm:p-6 ${index > 0 ? 'border-t border-white/10 md:border-t-0 md:border-l' : ''} ${index === 2 ? 'xl:border-t-0' : ''}`}>
              <StatusTone tone={item.tone} />
              <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ana-cream/[0.52]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <AnaTeamWorkflow />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Clear responsibility</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Automation backstage. Accountability in the room.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">The system is useful because every person can see where preparation ends and a human decision begins.</p>
          </div>

          <div className="mt-10 grid border-y border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-white/10">
            {responsibilities.map((group, index) => {
              const Icon = group.icon
              return (
                <article key={group.label} className={`py-7 lg:px-8 lg:py-9 ${index > 0 ? 'border-t border-white/10 lg:border-t-0' : ''}`}>
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-ana-gold" aria-hidden="true" />
                    <h3 className="text-lg font-semibold">{group.label}</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-ana-cream/[0.58]">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-200/80" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="pilot" className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Pilot recommended</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Thirty days. One bounded learning loop.</h2>
              <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">The first month should prove that the process helps the team and protects quality, not build a giant platform. No live automation is connected until the practice run passes review.</p>
          </div>

          <ol className="border-l border-ana-gold/25 pl-5 sm:pl-8">
            {anaPilot.map((step, index) => (
              <li key={step.window} className="relative pb-9 last:pb-0">
                <span className="absolute -left-[1.63rem] top-1 grid h-5 w-5 place-items-center rounded-full border border-ana-gold/[0.55] bg-ana-obsidian sm:-left-[2.63rem]" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-ana-gold" />
                </span>
                <div className="grid gap-3 sm:grid-cols-[6rem_1fr]">
                  <p className="font-mono text-xs text-ana-gold">{step.window}</p>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ana-cream/[0.58]">{step.detail}</p>
                    {index === 1 ? <p className="mt-3 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/[0.055] px-3 py-1 text-[11px] font-semibold text-emerald-100/75">No client contact · master templates stay untouched</p> : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(221,184,127,0.11),rgba(255,255,255,0.025),rgba(25,87,66,0.11))]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What the future workspace connects</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A calm front door over the tools Ana already uses.</h2>
              <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">Google Drive, Docs, the ATS or tracker, Canva, and finance records remain the source systems. The portal should guide the team; it should not hide where truth lives.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={anaLinks.privateWorkspace} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-5 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white">
                  Preview the team portal
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={anaLinks.kitRepo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/[0.68] transition hover:border-white/[0.35] hover:text-ana-cream">
                  Inspect the maintained kit
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="grid border-t border-white/10 bg-black/[0.18] sm:grid-cols-3 lg:border-l lg:border-t-0">
              {[
                ['Team workspace', 'Daily control, stage guidance, template index, approval queue, and learning library.'],
                ['Private source systems', 'Client records, candidate evidence, master templates, pricing, invoices, and finance truth.'],
                ['Client experience', 'Approved briefs, documents, status, and aftercare — never a public candidate database.'],
              ].map(([title, detail], index) => (
                <article key={title} className={`p-5 sm:p-6 ${index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}>
                  <p className="font-mono text-xs text-ana-gold">0{index + 1}</p>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ana-cream/[0.52]">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="respond" className="scroll-mt-24 px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <AnaProposalResponse
            proposalId="ana-team-operating-pilot-v1"
            eyebrow="Ana's decision room"
            title="Tell Frank what should happen next."
            intro="Choose a direction, select the parts that matter, and add any changes. The response reaches Frank through the existing FrankX intake system; it does not launch a product or authorize external action."
            decisions={responseDecisions}
            priorities={responsePriorities}
          />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-2xl items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-ana-gold" aria-hidden="true" />
            <p className="text-sm leading-6 text-ana-cream/50">Ana approves biography, team roles, templates, identity, pricing, legal terms, client data handling, payments, indexing, and every external send. Silence never counts as approval.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={anaLinks.friendPage} className="text-sm font-semibold text-ana-cream underline decoration-ana-gold/[0.35] underline-offset-4 hover:decoration-ana-gold">Ana's friend profile</Link>
            <Link href={anaLinks.ceciliaRoom} className="text-sm font-semibold text-ana-cream underline decoration-ana-gold/[0.35] underline-offset-4 hover:decoration-ana-gold">Cecilia proposal</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
