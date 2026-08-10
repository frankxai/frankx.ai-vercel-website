import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, NotebookPen, ShieldCheck, Sparkles } from 'lucide-react'

import {
  ActionPrimeStrip,
  ArrivalLoopDiagram,
  FamilyLadder,
  ForNotFor,
  GateClassifierVisual,
  KeystoneContractCard,
  KeystoneSplit,
} from '@/components/arrival/ArrivalVisualSystem'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Arrival — 7-Day Sprint | Golden Age Systems | FrankX',
  description:
    'Arrival is the Golden Age Systems practice door: a composed seven-day sprint for creator-operators. Aim, Gate, when-then, Keystone experiment — mechanism diagrams, not photo dumps.',
  path: '/arrival',
  keywords: [
    'Arrival practice',
    'Golden Age Systems',
    '7-day sprint',
    'Keystone experiment',
    'implementation intentions',
    'WOOP',
    'creator operators',
    'FrankX',
  ],
  image: '/images/arrival/hero-agy-dawn.png',
})

const days = [
  { day: '1', title: 'Write the aim', body: 'One sentence. Present tense. No twelve-domain sprawl.' },
  { day: '2', title: 'Name the Gate', body: 'Classify so the next move is prescribed, not vague.' },
  { day: '3', title: 'when-then', body: 'Pre-decide the response to the moment you usually flake.' },
  { day: '4', title: 'Rehearse the steps', body: 'Process first — the doing, not the trophy.' },
  { day: '5', title: 'Shrink until done', body: 'Make the first action unmissable. Ship something today.' },
  { day: '6', title: 'Evidence log', body: 'Date · action · fact observed.' },
  { day: '7', title: 'Keystone contract', body: 'WOOP + experiment fields. Calendar Day-14 review.' },
]

const gateClasses = [
  { name: 'Unclear aim', move: 'Rewrite one sentence until a stranger could score it.' },
  { name: 'Skill gap', move: 'Schedule deliberate practice or a learn brief.' },
  { name: 'Energy constraint', move: 'Peak State defaults — sleep, movement, stress hygiene.' },
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

const family = [
  {
    title: 'Arrival',
    status: 'Now · free',
    href: '#sprint',
    body: '7-Day Sprint. The practice door — diagrams + contract.',
  },
  {
    title: 'The Golden Age',
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
    body: 'Six primitives when you want production agents.',
  },
  {
    title: 'Fieldbook · Studio · Signal',
    status: 'After activation',
    href: '/newsletter',
    body: 'Depth, one-system builds, weekly evidence — after Sprint proof.',
  },
]

const faqs = [
  {
    question: 'What is Arrival?',
    answer:
      'Arrival is the practice door of Golden Age Systems on FrankX: a composed method that turns one stalled aim into a dated Keystone experiment. It is not a personality test, not medical advice, and not a promise that thought alone rearranges external reality.',
  },
  {
    question: 'Is this just motivational images?',
    answer:
      'No. Atmosphere stills set mood. The product is the mechanism design: loop diagram, Action Prime, Gate classifier, Sprint cadence, and Keystone experiment contract — with exact type you can act on.',
  },
  {
    question: 'How is this different from manifestation content?',
    answer:
      'Arrival requires mental contrasting, implementation intentions, process rehearsal, and an evidence contract. Feeling can support state; shipping the Keystone is the product.',
  },
  {
    question: 'Do I need multi-agent systems on day one?',
    answer:
      'No. Start with the Sprint. If your Gate class is missing system, Reality Architect helps build the first missing layer. Studio comes after activation.',
  },
  {
    question: 'Is this religious or spiritual?',
    answer:
      'No default spiritual pack. Optional private meaning-making is yours. Public Arrival stays mechanism-led.',
  },
]

const siteUrl = siteConfig.url
const collectionSchema = {
  '@id': `${siteUrl}/arrival#collection`,
  name: 'Arrival — 7-Day Sprint',
  description:
    'Golden Age Systems practice door: composed seven-day sprint from stalled aim to dated Keystone experiment.',
  url: `${siteUrl}/arrival`,
  isPartOf: {
    '@type': 'CreativeWork',
    name: 'Golden Age Systems',
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
      {/* HERO — atmosphere + exact type */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/arrival/hero-agy-dawn.png"
            alt=""
            fill
            priority
            className="object-cover object-[center_40%] opacity-[0.5]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/50 via-[#0a0a0b]/82 to-[#0a0a0b]" />
          <div
            className="absolute inset-0 opacity-35"
            style={{
              background:
                'radial-gradient(ellipse 70% 45% at 70% 18%, rgba(240,198,116,0.14), transparent 55%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.28em] text-amber-200/70">
              Golden Age Systems · Arrival
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              One meaningful aim.
              <span className="mt-1 block bg-gradient-to-r from-white via-amber-50 to-amber-200/90 bg-clip-text text-transparent">
                Seven days. One real beginning.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
              A composed practice system — not a photo mood board. Leave with a written aim, a named
              Gate, a when-then plan, and a Keystone experiment you can score.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#sprint"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-7 py-4 text-sm font-semibold text-[#0a0a0b] shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
              >
                Begin the Arrival Sprint
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <Link
                href="#system"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                See the system
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/40">
              A life worth arriving in, built one honest act at a time. Atmosphere sets the tone;
              diagrams and contracts do the work.
            </p>
          </div>

          {/* System strip preview */}
          <div id="system" className="mt-14 scroll-mt-24">
            <ArrivalLoopDiagram />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <ForNotFor yes={forWhom.yes} no={forWhom.no} />
        </div>
      </section>

      {/* ACTION PRIME */}
      <section className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-cyan-300/60">
              Daily default · ~5 min
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Action Prime</h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              The public daily design is small and sharp. Long dawn rituals are optional depth — not
              the product core.
            </p>
          </div>
          <ActionPrimeStrip />
        </div>
      </section>

      {/* SPRINT */}
      <section id="sprint" className="scroll-mt-24 border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-amber-200/60">
                Free activation
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                7-Day Arrival Sprint
              </h2>
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
              <div
                key={d.day}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
              >
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

      {/* GATES — composed visual + list */}
      <section className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-violet-300/60">
              Honesty layer
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Gate classifier
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Design, not decoration: every stall is one class with one prescribed next move.
            </p>
          </div>
          <GateClassifierVisual items={gateClasses} />
        </div>
      </section>

      {/* KEYSTONE — contract + industrial still */}
      <section className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-amber-200/60">
              Proof object
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Keystone contract
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              The still is a metaphor. The contract is the product — prediction, evidence, deadline,
              accept/reset.
            </p>
          </div>
          <KeystoneSplit>
            <KeystoneContractCard />
          </KeystoneSplit>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-emerald-300/60">
              Why it works
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Mechanism, not magic
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Specific aims', 'Clear, difficult goals outperform vague intention when feedback exists.'],
              ['Mental contrasting', 'Hold the arrival, then the obstacle (WOOP). Fantasy alone often lowers effort.'],
              ['when-then plans', 'Implementation intentions pre-link triggers to action.'],
              ['Process rehearsal', 'Rehearse the steps of doing — not only the trophy.'],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <h3 className="text-base font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/40">
            Educational summaries of known research lines — not guarantees of your results.
          </p>
        </div>
      </section>

      {/* FAMILY */}
      <section className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-amber-200/60">
              Golden Age Systems
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              One sky. Clear doors.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              The Golden Age is the era thesis. Golden Age Systems is the product family — sequenced
              so nothing competes with your first Keystone.
            </p>
          </div>
          <FamilyLadder cards={family} />
        </div>
      </section>

      {/* BOUNDARY */}
      <section className="border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7">
              <ShieldCheck className="mb-5 h-6 w-6 text-emerald-300" />
              <h2 className="font-display text-2xl font-bold tracking-tight">The boundary</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Arrival does not diagnose, treat, or replace professional care. It does not guarantee
                outcomes. Multi-agent systems amplify judgment — they do not replace it.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7">
              <Sparkles className="mb-5 h-6 w-6 text-amber-200" />
              <h2 className="font-display text-2xl font-bold tracking-tight">Design principle</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Atmosphere is layer two. The product is mechanism graphics, practice UI, and a scored
                contract — exact type you can run on Monday morning.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sprint"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-7 py-4 text-sm font-semibold text-[#0a0a0b] transition hover:bg-amber-300"
            >
              Begin the Arrival Sprint
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <Link
              href="/golden-age"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              The Golden Age
            </Link>
          </div>
        </div>
      </section>

      <JsonLd type="CollectionPage" data={collectionSchema} id="arrival-collection" />
      <FAQPageJsonLd faqs={faqs} id="arrival-faq" />
    </main>
  )
}
