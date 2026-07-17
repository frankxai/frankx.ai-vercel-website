import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Mail, Music, Network, Sparkles } from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'Frank Riemer | AI Architect and Creator Behind FrankX',
  description:
    'Meet Frank Riemer, the AI architect and creator behind FrankX: agentic systems, AI music experiments, creator workflows, and evidence-led performance notes.',
  path: '/frank-riemer',
  keywords: [
    'Frank Riemer',
    'FrankX',
    'AI architect',
    'AI creator systems',
    'agentic workflows',
    'AI music creator',
    'Suno AI',
    'personal AI operating system',
  ],
  image: '/images/portraits/frank-presenting-oracle-2025.jpg',
})

const proofPoints = [
  'AI architect working at enterprise scale',
  '12,000+ AI songs produced and studied',
  '630+ AI skills and workflow patterns shipped',
  'FrankX systems documented in public',
]

const pillars = [
  {
    title: 'Architecture',
    description:
      'Agentic workflows, cloud systems, MCP patterns, and practical AI operating systems for builders who need work to actually ship.',
    icon: Network,
    href: '/ai-architecture',
  },
  {
    title: 'Creative Output',
    description:
      'Music, writing, visual systems, courses, and media experiments used to learn what AI changes about taste and production.',
    icon: Music,
    href: '/music-lab',
  },
  {
    title: 'Human State',
    description:
      'Attention, recovery, environment, and review loops that make clearer work more repeatable without pretending discipline is the whole story.',
    icon: Sparkles,
    href: '/peak-performance',
  },
]

const siteUrl = siteConfig.url

const personSchema = {
  name: 'Frank Riemer',
  url: `${siteUrl}/frank-riemer`,
  image: `${siteUrl}/images/portraits/frank-presenting-oracle-2025.jpg`,
  jobTitle: 'AI Architect and Creator',
  brand: {
    '@type': 'Brand',
    name: 'FrankX',
    url: siteUrl,
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'Oracle',
  },
  sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.suno, socialLinks.twitter],
  knowsAbout: [
    'AI architecture',
    'agentic workflows',
    'AI music creation',
    'personal AI operating systems',
    'creator systems',
    'attention and recovery systems',
  ],
}

export default function FrankRiemerPage() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/78 to-[#0a0a0b]/30" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0b] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-32">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-emerald-300/70">
            Frank Riemer / FrankX
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            AI systems for sharper human work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            I build and document practical AI systems for clear thinking, creative output,
            trustworthy execution, and a more grounded way of working with machines.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/newsletter"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
            >
              Join the Signal Loop
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/start"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
            >
              Explore the systems
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-sm leading-relaxed text-white/60">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/60">
              Why FrankX exists
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Not louder AI. Better judgment with better systems.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              FrankX is built from a simple belief: AI is most valuable when it helps a human
              notice more clearly, decide more honestly, and ship work that can be inspected.
              The brand is warm because trust matters. It is rigorous because useful work has to hold up.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Link
                  key={pillar.title}
                  href={pillar.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/20 hover:bg-white/[0.055]"
                >
                  <Icon className="mb-5 h-6 w-6 text-emerald-300" />
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{pillar.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition group-hover:text-emerald-300">
                    Continue
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-amber-300/60">
              Editorial voice
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Warm, direct, and allergic to fake certainty.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-white/60">
            <p>
              The FrankX voice is human before it is clever: clear promises, honest caveats,
              useful stories, and enough warmth that serious work still feels personal.
            </p>
            <p>
              Signal Loop is the home base for that voice. It is where systems, experiments,
              and private lessons become public notes when they are ready to help someone else.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              Read the weekly letter
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd type="Person" data={personSchema} id="frank-riemer-person" />
    </main>
  )
}
