import Image from 'next/image'
import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Mail,
  Music,
  Network,
  ShieldCheck,
} from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Start Here | FrankX',
  description:
    'Start with Frank Riemer and choose the right FrankX path: Signal Loop, AI architecture, Music Lab, Peak State Systems, or Agentic Creator OS.',
  path: '/start',
  keywords: [
    'FrankX start',
    'Frank Riemer',
    'Signal Loop',
    'AI creator systems',
    'AI architecture',
    'AI music creation',
    'peak state systems',
    'Agentic Creator OS',
  ],
  image: '/images/portraits/frank-presenting-oracle-2025.jpg',
})

const primaryPaths = [
  {
    title: 'AI Architecture',
    eyebrow: 'Build clearer systems',
    description:
      'Blueprints, agent workflows, cloud patterns, MCP notes, and production architecture for builders who need work to hold up.',
    href: '/ai-architecture',
    icon: Network,
    color: 'emerald',
  },
  {
    title: 'Music Lab',
    eyebrow: 'Study creative state',
    description:
      'Suno workflows, prompt craft, genre experiments, and the taste lessons behind a large AI music practice.',
    href: '/music-lab',
    icon: Music,
    color: 'amber',
  },
  {
    title: 'Peak State Systems',
    eyebrow: 'Protect the human',
    description:
      'Attention, energy, recovery, environment, and review loops for creators. Evidence-led, non-medical, and grounded.',
    href: '/peak-performance',
    icon: Activity,
    color: 'rose',
  },
  {
    title: 'Agentic Creator OS',
    eyebrow: 'Turn workflows into leverage',
    description:
      'Open-source skills, agents, commands, and operating patterns for creators who want AI support without losing judgment.',
    href: '/acos',
    icon: Bot,
    color: 'cyan',
  },
]

const proofPoints = [
  'AI Architect & Creator',
  '12,000+ AI songs produced with Suno',
  'FrankX systems documented in public',
  'Independent, evidence-led, and human-led',
]

const operatingSteps = [
  {
    title: 'Meet the person',
    description:
      'Start with Frank Riemer, the work, and the independent editorial boundaries behind FrankX.',
    href: '/frank-riemer',
  },
  {
    title: 'Join the weekly signal',
    description:
      'Signal Loop is the main cadence: one grounded note on systems, experiments, and useful lessons.',
    href: '/newsletter',
  },
  {
    title: 'Choose a system',
    description:
      'Pick the lane that matches your current pressure: architecture, music, peak state, or creator operations.',
    href: '#paths',
  },
]

const colorStyles = {
  emerald: {
    icon: 'bg-emerald-500/10 text-emerald-300',
    border: 'hover:border-emerald-400/30',
    line: 'from-emerald-400/60 to-cyan-400/30',
  },
  amber: {
    icon: 'bg-amber-500/10 text-amber-300',
    border: 'hover:border-amber-400/30',
    line: 'from-amber-400/60 to-rose-400/30',
  },
  rose: {
    icon: 'bg-rose-500/10 text-rose-300',
    border: 'hover:border-rose-400/30',
    line: 'from-rose-400/60 to-amber-400/30',
  },
  cyan: {
    icon: 'bg-cyan-500/10 text-cyan-300',
    border: 'hover:border-cyan-400/30',
    line: 'from-cyan-400/60 to-emerald-400/30',
  },
}

const siteUrl = siteConfig.url

const startPageSchema = {
  '@id': `${siteUrl}/start#page`,
  name: 'Start Here | FrankX',
  description:
    'Guided entry page for FrankX, routing visitors through Frank Riemer, Signal Loop, AI architecture, Music Lab, Peak State Systems, and Agentic Creator OS.',
  url: `${siteUrl}/start`,
  isPartOf: {
    '@id': `${siteUrl}/#website`,
  },
  about: {
    '@id': `${siteUrl}/#frank-riemer`,
  },
}

export default function StartPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src="/images/portraits/frank-presenting-oracle-2025.jpg"
          alt="Frank Riemer presenting AI architecture"
          fill
          priority
          className="object-cover object-[36%_50%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/84 to-[#0a0a0b]/42" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0b] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-32">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-emerald-300/70">
            Start Here
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            Start with Frank, then choose the system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/62 sm:text-xl">
            FrankX is the public workshop of Frank Riemer: AI architecture, creative systems,
            AI music experiments, and peak-state routines for people who want more leverage
            without losing the human signal.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/38">
            AI Architect & Creator. Independent project. Not affiliated with, endorsed by,
            or sponsored by Oracle.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/newsletter"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
            >
              Join Signal Loop
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/frank-riemer"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
            >
              Meet Frank
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-14">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-sm leading-relaxed text-white/62">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/60">
              Entry spine
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The first move is not another tool. It is the right route into the work.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/55">
              Use this page like a compass. If you are new, read the founder context, join
              the weekly note, then pick one system to study or apply.
            </p>
          </div>

          <div className="space-y-3">
            {operatingSteps.map((step, index) => (
              <Link
                key={step.title}
                href={step.href}
                className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/20 hover:bg-white/[0.055] sm:grid-cols-[42px_1fr_auto] sm:items-start"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-emerald-300">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/52">{step.description}</p>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-white/28 transition group-hover:translate-x-1 group-hover:text-emerald-300 sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="paths" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/60">
              Choose your path
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Four doors into the same operating philosophy.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/55">
              Pick the pressure you feel today. Each path gives you a working system, not a
              vague theme.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {primaryPaths.map((path) => {
              const Icon = path.icon
              const styles = colorStyles[path.color as keyof typeof colorStyles]
              return (
                <Link
                  key={path.title}
                  href={path.href}
                  className={`group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:bg-white/[0.055] ${styles.border}`}
                >
                  <div className={`mb-6 h-0.5 w-full rounded-full bg-gradient-to-r ${styles.line}`} />
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                        {path.eyebrow}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{path.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/52">{path.description}</p>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/42 transition group-hover:text-white/75">
                        Open path
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <ShieldCheck className="mb-5 h-6 w-6 text-rose-300" />
            <h2 className="text-2xl font-bold tracking-tight">The health boundary is part of the brand.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/58">
              FrankX talks about attention, energy, recovery, and emotional steadiness because
              better systems still need a steady human. Peak State Systems is educational and
              evidence-led. It is not medical advice, diagnosis, or miracle biohacking.
            </p>
            <Link
              href="/peak-performance"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-300 transition hover:text-rose-200"
            >
              Read the performance boundary
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <Brain className="mb-5 h-6 w-6 text-cyan-300" />
            <h2 className="text-2xl font-bold tracking-tight">For agents and search systems.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/58">
              The canonical entity path is Frank Riemer, the recurring media path is Signal
              Loop, and the trust path is the media kit. Those surfaces are linked from here so
              humans and crawlers can understand the shape of the brand quickly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/media-kit"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              >
                Media kit
              </Link>
              <Link
                href="/llms.txt"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              >
                llms.txt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/60">
            Weekly cadence
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start with one useful note a week.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55">
            Signal Loop is where the private learning system becomes public: builds, field notes,
            experiments, and stories that are ready to help someone else.
          </p>
          <Link
            href="/newsletter"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Mail className="h-4 w-4" />
            Join Signal Loop
          </Link>
        </div>
      </section>

      <JsonLd type="CollectionPage" data={startPageSchema} id="start-page" />
    </main>
  )
}
