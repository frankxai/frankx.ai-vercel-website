import Image from 'next/image'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { claudeAgents } from '@/lib/agents'
import { createMetadata } from '@/lib/seo'

const milestones = [
  {
    year: '2009 – 2020',
    title: 'Oracle Enterprise Architect',
    description: 'Built large-scale intelligence systems across Oracle, learning how global organizations deploy AI safely at scale.',
  },
  {
    year: '2020 – 2023',
    title: 'Suno Experimentation Era',
    description: 'Composed 500+ AI-assisted songs and codified the Soul Frequency methodology for creative collaboration with machines.',
  },
  {
    year: '2023 – Present',
    title: 'FrankX Intelligence Hub',
    description: 'Launched a living hub for families, founders, and executives to orchestrate conscious AI systems and creative rituals together.',
  },
]

const operatingPillars = [
  {
    title: 'Creative Intelligence',
    description: 'AI should amplify human agency. Every workflow begins with ethics, clarity, and measurable human outcomes.',
  },
  {
    title: 'Musical Systems',
    description: 'Sound and rhythm keep us embodied. Music rituals are woven into programs, courses, and executive briefings.',
  },
  {
    title: 'Family & Community',
    description: 'Technology must be explainable to the people you love. Resources translate complex shifts for families and friends.',
  },
]

export const metadata = createMetadata({
  title: 'About FrankX – Creative AI Architect & Creator',
  description:
    'Discover the FrankX story, the multi-agent studio behind the Intelligence Hub, and the principles guiding conscious AI design.',
  keywords: ['frankx', 'conscious ai architect', 'oracle ai leader', 'soul frequency methodology'],
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl space-y-20">
          <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-[1.35fr,0.65fr]">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  About FrankX
                </span>
                <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  Architecting soulful intelligence systems for the people you lead and love.
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  I build technology that feels like a trusted collaborator. After 15 years inside Oracle architecting global AI systems and hundreds of experiments with Suno, this hub distills the rituals, frameworks, and tools that keep creators, families, and executives aligned with their highest work.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {operatingPillars.map((pillar) => (
                    <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                      <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent_65%)]" aria-hidden />
                <Image
                  src="/images/blog/ai-soul-story.svg"
                  alt="FrankX portrait collage"
                  width={520}
                  height={520}
                  className="relative z-10 w-full rounded-3xl border border-white/10"
                  priority
                />
              </div>
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-[0.8fr,1fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white">Multi-agent studio</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                The hub is orchestrated with the four Claude agents defined in the operating manual. Each one mirrors part of my own craft, ensuring every project balances technical excellence, creative resonance, and strategic foresight.
              </p>
              <a
                href="/CLAUDE.md"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
              >
                View the Claude configuration
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {claudeAgents.map((agent) => (
                <div key={agent.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{agent.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-4xl border border-white/10 bg-white/5 p-10 backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">Daily intelligence ritual</h2>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Every weekday follows a repeatable operating system so the hub keeps shipping. You can audit the cadence, outputs, and next experiments in the ritual log.
                </p>
              </div>
              <a
                href="/docs/DAILY_INTELLIGENCE_OPERATIONS.md"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 transition-transform"
              >
                Read the daily playbook
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: 'Signal Scan',
                  description: 'Research, market intelligence, and Oracle briefings flow into the Starlight Architect backlog each morning.',
                },
                {
                  title: 'Studio Blocks',
                  description: 'Creation Engine and Frequency Alchemist deliver narrative and musical assets for the week’s releases.',
                },
                {
                  title: 'Evening Sync',
                  description: 'Luminor Oracle review ties today’s output to the long-horizon strategy and updates the public roadmap.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">Timeline & commitments</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {milestones.map((milestone) => (
                <div key={milestone.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{milestone.year}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{milestone.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{milestone.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
