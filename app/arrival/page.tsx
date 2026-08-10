import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Flag,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'

import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Arrival — 7-Day Sprint | Golden Age | FrankX',
  description:
    'Arrival is the Golden Age practice door: a seven-day sprint for creator-operators and founders. One aim, one Gate, one when-then, one dated Keystone experiment — without motivation theater or magical thinking.',
  path: '/arrival',
  keywords: [
    'Arrival practice',
    'Golden Age',
    '7-day sprint',
    'Keystone experiment',
    'implementation intentions',
    'WOOP',
    'creator operators',
    'FrankX',
    'Reality Architect',
  ],
  image: '/images/golden-age/hero-golden-age.png',
})

const loop = [
  { label: 'Aim', detail: 'One present-tense sentence. Specific. Difficult enough to matter.' },
  { label: 'Obstacle', detail: 'Name the real block. Classify the Gate — aim, skill, energy, environment, or system.' },
  { label: 'Plan', detail: 'when-then intentions tied to triggers in your actual day.' },
  { label: 'Keystone', detail: 'A 14-day experiment contract: prediction, evidence, acceptance test, reset rule.' },
  { label: 'Evidence', detail: 'Score facts against the contract. Keep, revise, or abandon — not “felt aligned.”' },
]

const days = [
  { day: '1', title: 'Write the aim', body: 'One sentence. Present tense. No twelve-domain sprawl.' },
  { day: '2', title: 'Name the Gate', body: 'Classify the obstacle so the next move is prescribed, not vague.' },
  { day: '3', title: 'when-then', body: 'Pre-decide the response to the moment you usually flake.' },
  { day: '4', title: 'Rehearse the steps', body: 'Process first — the doing, not the trophy.' },
  { day: '5', title: 'Shrink until done', body: 'Make the first action unmissable. Ship something today.' },
  { day: '6', title: 'Evidence log', body: 'A simple table: date, action, fact observed.' },
  { day: '7', title: 'Keystone contract', body: 'WOOP + experiment fields. Calendar the Day-14 review.' },
]

const gateClasses = [
  { name: 'Unclear aim', move: 'Rewrite one sentence until a stranger could score it.' },
  { name: 'Skill gap', move: 'Schedule a deliberate practice or learn brief.' },
  { name: 'Energy constraint', move: 'Use Peak State defaults — sleep, movement, stress hygiene.' },
  { name: 'Environment', move: 'Change a default or remove friction. Willpower last.' },
  { name: 'Missing system', move: 'Hand off to Reality Architect. Build the first gap only.' },
]

const forWhom = {
  yes: [
    'Creator-operators and solo founders who already use AI tools',
    'People stalling on one meaningful aim this month',
    'Builders who want dated proof, not vision-board comfort',
  ],
  no: [
    'Anyone seeking medical, therapeutic, or guaranteed life outcomes',
    'Metaphysical “thought creates reality” claims',
    'Passive spectators who will not take a witnessed action',
  ],
}

const faqs = [
  {
    question: 'What is Arrival?',
    answer:
      'Arrival is the practice door of the Golden Age on FrankX: a short, beautiful method for turning one stalled aim into a dated Keystone experiment. It is not a personality test, not medical advice, and not a promise that thought alone rearranges external reality.',
  },
  {
    question: 'How is this different from manifestation content?',
    answer:
      'Arrival requires mental contrasting (obstacle), implementation intentions (when-then), process rehearsal, and an evidence contract. Feeling can support state; shipping the Keystone is the product.',
  },
  {
    question: 'Do I need multi-agent systems on day one?',
    answer:
      'No. Start with the 7-Day Sprint. If your Gate class is “missing system,” Reality Architect helps you build the first missing layer. Golden Age Studio (multi-agent craft) comes after activation — not before.',
  },
  {
    question: 'Is this religious or spiritual?',
    answer:
      'No default spiritual pack. Optional private meaning-making is yours. Public Arrival stays mechanism-led and brand-safe.',
  },
  {
    question: 'How does this relate to the Golden Age books?',
    answer:
      'The Golden Age is the era thesis and bookshelf. Arrival is how you enter it with one real act. Read and practice reinforce each other; neither replaces the other.',
  },
]

const siteUrl = siteConfig.url

const collectionSchema = {
  '@id': `${siteUrl}/arrival#collection`,
  name: 'Arrival — 7-Day Sprint',
  description:
    'Golden Age practice door: seven-day sprint from stalled aim to dated Keystone experiment for creator-operators and founders.',
  url: `${siteUrl}/arrival`,
  isPartOf: {
    '@type': 'CreativeWork',
    name: 'The Golden Age',
    url: `${siteUrl}/golden-age`,
  },
  publisher: {
    '@type': 'Person',
    '@id': `${siteUrl}/#frank-riemer`,
    name: 'Frank Riemer',
  },
}

export default function ArrivalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 70% -10%, rgba(240,198,116,0.16), transparent 55%), radial-gradient(ellipse 60% 40% at 10% 20%, rgba(91,140,255,0.12), transparent 50%), radial-gradient(ellipse 50% 30% at 50% 100%, rgba(52,211,153,0.06), transparent 40%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/70 via-[#0a0a0b]/90 to-[#0a0a0b]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-amber-200/70">
              Golden Age · Arrival
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              The age is open.
              <span className="block bg-gradient-to-r from-white via-amber-50 to-amber-200/90 bg-clip-text text-transparent">
                Arrival is how you enter it.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
              A seven-day practice for creator-operators and founders who stall on one meaningful aim.
              Leave with a written aim, a named Gate, a when-then plan, and a Keystone experiment
              dated within fourteen days — without motivation theater or magical thinking.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#sprint"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-7 py-4 text-sm font-semibold text-[#0a0a0b] shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
              >
                Begin the 7-Day Arrival Sprint
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/golden-age"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                Read the Golden Age
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/40">
              Human judgment. Machine leverage. Work worth inheriting. — Part of the Golden Age
              movement on FrankX. Not medical advice. No guaranteed outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/70">For</p>
            <h2 className="text-2xl font-bold tracking-tight">Who this is for</h2>
            <ul className="mt-5 space-y-3">
              {forWhom.yes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/65">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-white/40">Not for</p>
            <h2 className="text-2xl font-bold tracking-tight">Clear exclusions</h2>
            <ul className="mt-5 space-y-3">
              {forWhom.no.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/50">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Loop */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-amber-200/60">The loop</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Aim → Obstacle → Plan → Keystone → Evidence
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Feeling can steady the hand. The product is a witnessed experiment you can score.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {loop.map((step, i) => (
              <div
                key={step.label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber-200/70">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily 5 min */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/60">
              Daily default
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Action Prime · ~5 minutes</h2>
            <p className="mt-5 text-base leading-relaxed text-white/50">
              The full dawn ritual is optional depth. The public default is small and sharp:
              name the target, name the obstacle, write the when-then, rehearse the first physical
              step, calendar-block it.
            </p>
          </div>
          <ol className="space-y-3">
            {[
              'Target behavior for today',
              'Likely obstacle (concrete)',
              'when [trigger], I will [first move]',
              'Rehearse the first 30–60 seconds of doing',
              'Block it — or start within five minutes',
            ].map((line, idx) => (
              <li
                key={line}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10 font-mono text-xs font-bold text-amber-200">
                  {idx + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-white/70">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sprint */}
      <section id="sprint" className="scroll-mt-24 border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-amber-200/60">
                Free activation
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">7-Day Arrival Sprint</h2>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                ~5 minutes a day. ~25 minutes on Day 7. One aim only. Day 14 scores the experiment.
              </p>
            </div>
            <a
              href="/downloads/arrival-7-day-sprint.md"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/15"
            >
              <NotebookPen className="h-4 w-4" />
              Download sprint guide
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {days.map((d) => (
              <div key={d.day} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-amber-200/60">
                  Day {d.day}
                </div>
                <h3 className="text-base font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{d.body}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-transparent p-5">
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-amber-200/80">
                Day 14
              </div>
              <h3 className="text-base font-semibold text-white">Evidence review</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Pass/fail the acceptance test. One correction. Keep, revise, or abandon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gate classifier */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-violet-300/60">
              Honesty layer
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Gate classifier</h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Every stall is one class. Each class has one next move. No vague “build from the vibe.”
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {gateClasses.map((g) => (
              <div key={g.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Compass className="mb-4 h-5 w-5 text-violet-300" />
                <h3 className="text-lg font-semibold">{g.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{g.move}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/60">
              Why it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Mechanism, not magic</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Target,
                title: 'Specific aims',
                body: 'Clear, difficult goals outperform vague intention when ability and feedback exist.',
              },
              {
                icon: Flag,
                title: 'Mental contrasting',
                body: 'Hold the arrival, then the obstacle (WOOP). Fantasy alone often lowers effort.',
              },
              {
                icon: Sparkles,
                title: 'when-then plans',
                body: 'Implementation intentions pre-link triggers to action and raise follow-through.',
              },
              {
                icon: CheckCircle2,
                title: 'Process rehearsal',
                body: 'Rehearse the steps of doing. Outcome trophies without steps underperform.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                  <Icon className="mb-4 h-5 w-5 text-emerald-300" />
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{item.body}</p>
                </div>
              )
            })}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/40">
            Reading note: claims are educational summaries of well-known research lines (goal-setting,
            WOOP / mental contrasting, implementation intentions, process vs outcome simulation).
            They are not guarantees of your results. Prefer primary sources before high-stakes decisions.
          </p>
        </div>
      </section>

      {/* Constellation */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-amber-200/60">
              Golden Age family
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One sky. Clear doors.</h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Abundant products around the Golden Age — sequenced so nothing competes with your first
              Keystone.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Arrival',
                status: 'Now · free',
                href: '#sprint',
                body: '7-Day Sprint. The practice door.',
              },
              {
                title: 'Golden Age',
                status: 'Books & era',
                href: '/golden-age',
                body: 'Manifesto bookshelf and creator-era thesis.',
              },
              {
                title: 'Peak State',
                status: 'Body substrate',
                href: '/peak-performance',
                body: 'Sleep, movement, stress hygiene for clear work.',
              },
              {
                title: 'Reality Architect',
                status: 'Systems handoff',
                href: 'https://realityarchitect.ai/assess',
                body: 'When the Gate is a missing system — first gap only.',
                external: true,
              },
              {
                title: 'Build',
                status: 'Agent craft',
                href: '/build',
                body: 'Six primitives stack when you want production agents.',
              },
              {
                title: 'Field · Studio · Circle',
                status: 'After activation',
                href: '/newsletter',
                body: 'Guided depth and multi-agent craft open after Sprint proof — not before.',
              },
            ].map((card) => {
              const className =
                'group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-amber-400/25 hover:bg-white/[0.05]'
              const inner = (
                <>
                  <div className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-amber-200/55">
                    {card.status}
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-amber-50">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{card.body}</p>
                  <div className="mt-4 text-xs font-medium text-white/35 transition group-hover:text-amber-200/80">
                    Open →
                  </div>
                </>
              )
              if (card.external) {
                return (
                  <a key={card.title} href={card.href} target="_blank" rel="noreferrer" className={className}>
                    {inner}
                  </a>
                )
              }
              if (card.href.startsWith('#')) {
                return (
                  <a key={card.title} href={card.href} className={className}>
                    {inner}
                  </a>
                )
              }
              return (
                <Link key={card.title} href={card.href} className={className}>
                  {inner}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Boundary */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
              <ShieldCheck className="mb-5 h-6 w-6 text-emerald-300" />
              <h2 className="text-2xl font-bold tracking-tight">The boundary</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Arrival does not diagnose, treat, or replace professional care. It does not guarantee
                wealth, love, health, or status. Multi-agent systems amplify judgment — they do not
                replace it. You author the aim; you own the evidence.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
              <Sparkles className="mb-5 h-6 w-6 text-amber-200" />
              <h2 className="text-2xl font-bold tracking-tight">Long view</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                From a hundred-year horizon: practices that increase human authorship, transferable
                skill, and witnessed work compound civilization. Spectacle without proof decays trust.
                Arrival ends in an act you can pass forward.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sprint"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-7 py-4 text-sm font-semibold text-[#0a0a0b] transition hover:bg-amber-300"
            >
              Begin the 7-Day Arrival Sprint
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Golden Age notes
            </Link>
          </div>
        </div>
      </section>

      <JsonLd type="CollectionPage" data={collectionSchema} id="arrival-collection" />
      <FAQPageJsonLd faqs={faqs} id="arrival-faq" />
    </main>
  )
}
