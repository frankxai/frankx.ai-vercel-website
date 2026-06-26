import Image from 'next/image'
import Link from 'next/link'
import { Activity, ArrowRight, Brain, CheckCircle2, Moon, NotebookText, ShieldCheck } from 'lucide-react'

import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Peak State Systems | FrankX',
  description:
    'Evidence-led creator performance systems from FrankX: attention, energy, recovery, environment, and review loops without miracle health claims.',
  path: '/peak-performance',
  keywords: [
    'peak state systems',
    'peak mental performance',
    'creator performance system',
    'attention systems',
    'recovery for creators',
    'AI workflow performance',
    'FrankX',
  ],
  image: '/hero-vibe-os.png',
})

const foundations = [
  {
    title: 'Sleep as baseline',
    description:
      'Treat sleep as the first performance input. When recovery is weak, strategy gets noisy and willpower becomes expensive.',
    source: 'CDC sleep guidance',
    href: 'https://www.cdc.gov/sleep/about/index.html',
    icon: Moon,
  },
  {
    title: 'Movement as state change',
    description:
      'Use physical activity to improve mood, energy, and cognitive readiness. Start modest, repeat, and let consistency beat intensity theater.',
    source: 'CDC physical activity guidance',
    href: 'https://www.cdc.gov/physical-activity/php/guidelines-recommendations/index.html',
    icon: Activity,
  },
  {
    title: 'Stress hygiene',
    description:
      'Build simple relief valves: breathing, journaling, time outdoors, pauses from feeds, and honest tracking when overwhelm rises.',
    source: 'CDC and NIMH stress resources',
    href: 'https://www.cdc.gov/mental-health/living-with/index.html',
    icon: Brain,
  },
]

const operatingLoops = [
  'Protect one serious attention block before inbox and feed gravity take over.',
  'Track sleep, movement, light, food, stress, and output without turning the body into a spreadsheet prison.',
  'Use music, environment, and small rituals as state cues, then judge them by the quality of work produced.',
  'Review the week calmly: what helped, what hurt, what should be repeated, and what was just noise.',
]

const faqs = [
  {
    question: 'Is Peak State Systems medical advice?',
    answer:
      'No. Peak State Systems is a creator operating framework for attention, recovery, environment, and work review. It does not diagnose, treat, or replace professional medical care.',
  },
  {
    question: 'What makes this different from biohacking?',
    answer:
      'The system starts with boring high-leverage defaults: sleep, movement, stress hygiene, environment, review loops, and measured output. Novel experiments come later and only if they earn their place.',
  },
  {
    question: 'How does this connect to AI work?',
    answer:
      'AI increases output speed, but it also increases context switching and false certainty. Peak State Systems keeps the human side clear enough to decide what should be built, trusted, and shipped.',
  },
]

const siteUrl = siteConfig.url

const collectionSchema = {
  '@id': `${siteUrl}/peak-performance#collection`,
  name: 'Peak State Systems',
  description:
    'FrankX creator performance systems for attention, energy, recovery, environment, and evidence-led review loops.',
  url: `${siteUrl}/peak-performance`,
  publisher: {
    '@type': 'Person',
    '@id': `${siteUrl}/#frank-riemer`,
    name: 'Frank Riemer',
  },
}

export default function PeakPerformancePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-vibe-os.png"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.18]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/80 via-[#0a0a0b]/92 to-[#0a0a0b]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-rose-300/70">
              Peak State Systems
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Better state. Clearer work.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
              Evidence-led routines for attention, energy, recovery, and emotional steadiness.
              Not miracle biohacking. Not medical advice. Just a calmer operating system for
              creators who want their best work to become repeatable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/newsletter"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-600"
              >
                Get performance notes
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/frank-riemer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                Meet Frank
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300/60">
              Evidence anchors
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start with what survives contact with ordinary life.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {foundations.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/20 hover:bg-white/[0.055]"
                >
                  <Icon className="mb-5 h-6 w-6 text-rose-300" />
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{item.description}</p>
                  <div className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-white/40 transition group-hover:text-rose-200">
                    {item.source}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/60">
              Operating loop
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A state system has to make the work easier to repeat.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/50">
              The goal is not to feel perfect. The goal is to notice the conditions
              that reliably produce clear work, then make those conditions easier to enter.
            </p>
          </div>

          <div className="space-y-3">
            {operatingLoops.map((loop) => (
              <div key={loop} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-relaxed text-white/60">{loop}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
              <ShieldCheck className="mb-5 h-6 w-6 text-emerald-300" />
              <h2 className="text-2xl font-bold tracking-tight">The boundary</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                If something involves symptoms, medication, injury, disordered eating,
                panic, depression, trauma, or chronic sleep issues, the right move is a qualified
                professional. FrankX can help structure notes and questions. It does not replace care.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
              <NotebookText className="mb-5 h-6 w-6 text-cyan-300" />
              <h2 className="text-2xl font-bold tracking-tight">The content lane</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Signal Loop will cover state experiments as field notes: what was tried, what was
                measured, what changed output, and what did not deserve another week of attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <JsonLd type="CollectionPage" data={collectionSchema} id="peak-state-systems-collection" />
      <FAQPageJsonLd faqs={faqs} id="peak-state-systems-faq" />
    </main>
  )
}
