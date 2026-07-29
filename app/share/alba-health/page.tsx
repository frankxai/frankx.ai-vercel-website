import type { Metadata } from 'next'
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  DatabaseZap,
  GitFork,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import { GutJourneyDemo } from '@/components/alba/GutJourneyDemo'
import { TrackedLink } from '@/components/analytics/TrackedLink'

const PAGE_URL = 'https://frankx.ai/share/alba-health'
const OPEN_CORE_URL =
  'https://github.com/frankxai/health-intelligence-system/tree/main/verticals/gut-intelligence-system'
const BRIEF_URL = '/downloads/alba-gut-intelligence-partner-brief.docx'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'For Nora & Alba Health | Gut Intelligence System',
  description:
    'An independent open-core contribution: a governed family gut-health journey from approved science input to meals, weekly reflection, and coach handoff.',
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
}

const SYSTEM_LAYERS = [
  {
    number: '01',
    eyebrow: 'Alba-owned',
    title: 'Science and interpretation',
    body: 'Research, microbiome analysis, evidence grading, qualified mappings, and the claims Alba is prepared to stand behind.',
    icon: Sparkles,
  },
  {
    number: '02',
    eyebrow: 'Open core',
    title: 'Family journey compiler',
    body: 'Consent, age, allergy, scope, meal-planning, practicality, evidence receipts, weekly review, and handoff contracts.',
    icon: GitFork,
  },
  {
    number: '03',
    eyebrow: 'Private product',
    title: 'Longitudinal family experience',
    body: 'Profiles, reports, journey state, coach conversations, personal observations, retest comparison, and data rights.',
    icon: LockKeyhole,
  },
] as const

const PACKS = [
  {
    label: 'Parent skill pack',
    items: [
      'Guided family intake',
      'First-week meal planner',
      'Picky-eater adapter',
      'School and travel adapter',
      'Weekly reflection',
    ],
  },
  {
    label: 'Coach skill pack',
    items: [
      'Parent-context brief',
      'Implementation friction review',
      'Evidence and claims receipt',
      'Qualified handoff',
      'Retest question builder',
    ],
  },
  {
    label: 'Agent pack',
    items: [
      'Family Journey Guide',
      'Evidence & Claims Guardian',
      'Safety & Consent Guardian',
      'Coach Handoff Scribe',
      'Outcomes Steward',
    ],
  },
] as const

const VALUE_PATHS = [
  {
    label: 'Use freely',
    title: 'A practical inspiration artifact.',
    body: 'Use the workflow, schemas, prompt patterns, or interaction ideas wherever they help. No commercial conversation is required.',
  },
  {
    label: 'Alba product layer',
    title: 'A branded journey Alba can sell.',
    body: 'Alba can connect its validated science to a calmer, longitudinal meal and coaching experience while keeping the interpretation layer proprietary.',
  },
  {
    label: 'Joint build, if useful',
    title: 'A funded product collaboration.',
    body: 'FrankX can own the open-core runtime, product architecture, agent packs, and experience engineering; Alba can own science, claims, clinical governance, and customer service.',
  },
] as const

export default function AlbaHealthSharePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f0e7] text-[#173c30]">
      <section className="relative isolate border-b border-[#173c30]/10 px-5 pb-16 pt-8 sm:px-8 md:pb-24 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_16%,rgba(110,163,126,0.18),transparent_34%),radial-gradient(circle_at_14%_4%,rgba(255,255,255,0.92),transparent_30%)]"
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#173c30]/10 pb-5">
          <p className="text-sm font-semibold tracking-[-0.02em]">FrankX.AI</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#60766d]">
            Independent contribution · July 2026
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 pb-4 pt-16 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-16 lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#173c30]/10 bg-white/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52675f]">
              <HeartHandshake className="h-3.5 w-3.5 text-[#3d8a62]" aria-hidden="true" />
              For Nora & the Alba team
            </p>
            <h1 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.052em] sm:text-6xl lg:text-7xl">
              Turn the report into a family rhythm.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52675f]">
              Alba already connects a child&apos;s at-home gut test with a personal
              report, action plan, nutrition coach, and year-long in-app advisor.
              I built this as an optional next layer: an open, governed system
              that helps a parent turn approved guidance into meals, preparation,
              reflection, and a sharper human handoff.
            </p>
            <p className="mt-5 max-w-2xl border-l-2 border-[#3d8a62]/45 pl-4 text-sm leading-6 text-[#60766d]">
              This is a gift and a working concept, not a partnership claim. Use
              anything useful. The fictional journey beside this note shows the
              idea end to end.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="#journey"
                eventName="alba_gut_journey_explore_clicked"
                eventProperties={{ source: 'hero' }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#173c30] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#285443] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3d8a62] motion-reduce:transition-none"
              >
                Explore the fictional journey
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={OPEN_CORE_URL}
                eventName="alba_gut_open_core_clicked"
                eventProperties={{ source: 'hero' }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#173c30]/15 bg-white/45 px-6 py-3 text-sm font-semibold text-[#173c30] transition hover:border-[#173c30]/30 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3d8a62] motion-reduce:transition-none"
              >
                Inspect the open core
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>

          <GutJourneyDemo />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3d8a62]">
                The observation
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Alba has the science-to-guidance bridge. The compounding layer is
                daily life.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#52675f]">
              <p>
                Your current child experience already spans the test, the report,
                a tailored action plan, a certified nutrition coach, progress
                tracking, and an in-app advisor. That is much more than a
                one-time result.
              </p>
              <p>
                The next product surface I see is not more interpretation. It is
                the implementation memory between touchpoints: what the family
                could actually cook, what the child accepted, what failed at
                school, what deserves a coach&apos;s attention, and what should
                inform the next plan.
              </p>
              <p className="text-sm leading-6 text-[#71837c]">
                Source grounding:{' '}
                <a
                  href="https://albahealth.com/pages/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#32664e] underline decoration-[#32664e]/25 underline-offset-4 hover:decoration-[#32664e]"
                >
                  Alba&apos;s mission and story
                </a>
                {' · '}
                <a
                  href="https://albahealth.com/products/child-gut-health-test-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#32664e] underline decoration-[#32664e]/25 underline-offset-4 hover:decoration-[#32664e]"
                >
                  current child test and consultation
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#173c30]/10 bg-[#173c30] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9fc9aa]">
              The end-to-end architecture
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Open where trust benefits. Private where science and family data
              demand it.
            </h2>
          </div>

          <div className="mt-14 grid border-y border-white/12 lg:grid-cols-3 lg:divide-x lg:divide-white/12">
            {SYSTEM_LAYERS.map((layer, index) => {
              const Icon = layer.icon
              return (
                <article
                  key={layer.title}
                  className={`py-9 lg:px-9 lg:py-11 ${index > 0 ? 'border-t border-white/12 lg:border-t-0' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#a9d9b5]" aria-hidden="true" />
                    <span className="font-mono text-xs text-white/35">
                      {layer.number}
                    </span>
                  </div>
                  <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a9d9b5]">
                    {layer.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    {layer.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/58">
                    {layer.body}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 grid gap-4 text-sm leading-6 text-white/55 sm:grid-cols-2">
            <p className="flex items-start gap-2.5">
              <DatabaseZap className="mt-1 h-4 w-4 shrink-0 text-[#a9d9b5]" aria-hidden="true" />
              Starlight can provide provenance, versioning, consent-aware memory,
              and evidence receipts beneath the product.
            </p>
            <p className="flex items-start gap-2.5">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#a9d9b5]" aria-hidden="true" />
              Health Intelligence System supplies the public safety contract,
              privacy boundary, handoff discipline, and refusal gates.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3d8a62]">
                Portable capability
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Skills for parents. Agents for governance. Humans for judgment.
              </h2>
              <p className="mt-6 text-base leading-7 text-[#60766d]">
                The packs are intentionally small. Each one owns a bounded job,
                names what it may use, and knows when to stop.
              </p>
            </div>

            <div className="border-y border-[#173c30]/12">
              {PACKS.map((pack, index) => (
                <article
                  key={pack.label}
                  className={`grid gap-5 py-8 sm:grid-cols-[0.5fr_1.5fr] ${index > 0 ? 'border-t border-[#173c30]/12' : ''}`}
                >
                  <h3 className="text-lg font-semibold">{pack.label}</h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {pack.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-6 text-[#60766d]"
                      >
                        <CheckCircle2
                          className="mt-1 h-4 w-4 shrink-0 text-[#3d8a62]"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#173c30]/10 bg-white/48 px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3d8a62]">
              Three honest ways forward
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Contribution first. Product only if it serves the mission.
            </h2>
          </div>

          <div className="mt-12 grid border-t border-[#173c30]/12 lg:grid-cols-3 lg:divide-x lg:divide-[#173c30]/12">
            {VALUE_PATHS.map((path, index) => (
              <article
                key={path.label}
                className={`py-8 lg:px-8 lg:py-10 ${index > 0 ? 'border-t border-[#173c30]/12 lg:border-t-0' : ''}`}
              >
                <p className="font-mono text-xs font-semibold text-[#3d8a62]">
                  0{index + 1} · {path.label}
                </p>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                  {path.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#60766d]">
                  {path.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.4rem] bg-[#dce9dd] p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:p-14">
          <div>
            <BrainCircuit className="h-7 w-7 text-[#32664e]" aria-hidden="true" />
            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The core is public. The deeper brief is yours.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">
              The repository contains the task envelope, schemas, safety cases,
              parent and coach workflows, skill pack, agent roles, fictional
              fixtures, and the open/private adapter boundary. The downloadable
              brief adds the product and partnership perspective end to end.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-stretch">
            <TrackedLink
              href={OPEN_CORE_URL}
              eventName="alba_gut_open_core_clicked"
              eventProperties={{ source: 'closing' }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#173c30] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#285443] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3d8a62] motion-reduce:transition-none"
            >
              Open Gut Intelligence System
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={BRIEF_URL}
              eventName="alba_gut_brief_downloaded"
              eventProperties={{ source: 'closing', format: 'docx' }}
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#173c30]/15 bg-white/55 px-6 py-3 text-sm font-semibold text-[#173c30] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3d8a62] motion-reduce:transition-none"
            >
              Download the full brief
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#173c30]/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl text-xs leading-5 text-[#71837c]">
            Independent concept by FrankX. No affiliation, endorsement, or
            partnership with Alba Health is implied. All family examples are
            fictional. This page collects no personalized health data and does
            not provide medical advice. Qualified professionals retain clinical
            and medical-nutrition authority.
          </p>
          <p className="flex items-start gap-2 text-xs font-semibold text-[#52675f]">
            <Users className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Built to support the mission, not route around it.
          </p>
        </div>
      </footer>
    </main>
  )
}
