import Image from 'next/image'

import {
  MorphingBackground,
  StaggerContainer,
  StaggerItem,
  RevealAnimation,
  GlowPulse
} from '@/components/ui/AdvancedAnimations'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { claudeAgents } from '@/lib/agents'
import { createMetadata } from '@/lib/seo'

const milestones = [
  {
    year: 'Projects',
    title: 'Enterprise AI Architecture',
    description: 'Built AI systems for global organizations—focused on practical implementation that matches organizational values.',
  },
  {
    year: 'Innovation',
    title: 'AI Music Creation',
    description: 'Created 500+ songs with Suno AI and developed workflows that let creators make music true to their unique style.',
  },
  {
    year: 'Current',
    title: 'FrankX Hub',
    description: 'Open platform for creators and students building AI systems aligned with their goals—with free resources and transparent development.',
  },
]

const operatingPillars = [
  {
    title: 'Goal-Aligned AI',
    description: 'AI should amplify your unique voice and values. Every workflow starts with your goals, not someone else\'s template.',
  },
  {
    title: 'Open Development',
    description: 'See how everything is built. Every framework, prompt, and system here is transparent and adaptable to your needs.',
  },
  {
    title: 'Practical Over Hype',
    description: 'Tools you can actually use today. No jargon, no gatekeeping—just practical resources that help you ship.',
  },
]

export const metadata = createMetadata({
  title: 'About FrankX – AI Systems Architect & Creator',
  description:
    'Meet Frank and the multi-agent studio behind the Intelligence Hub. Free resources, practical frameworks, and transparent development for creators and students.',
  keywords: ['frankx', 'ai architect', 'ai for creators', 'ai for students', 'personal ai systems'],
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <MorphingBackground />
      <Navigation />
      <main className="relative px-6 pt-28 pb-20 z-10">
        <div className="mx-auto max-w-6xl space-y-20">
          <StaggerContainer>
            <StaggerItem>
              <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-primary-500/10 via-slate-900/80 to-slate-950/80 p-10 backdrop-blur-xl">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl opacity-50" aria-hidden />
                <div className="relative grid gap-10 lg:grid-cols-[1.35fr,0.65fr]">
                  <div className="space-y-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                      About FrankX
                    </span>
                    <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl tracking-tight">
                      Building AI systems that actually work for how you work.
                    </h1>
                    <p className="text-xl text-white/80 leading-relaxed font-light">
                      I build technology that feels like a trusted collaborator. Through enterprise architecture experience and hundreds of AI music experiments, this hub shares the frameworks, prompts, and tools that help creators and students build AI systems aligned with their unique goals.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3 pt-4">
                      {operatingPillars.map((pillar) => (
                        <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">{pillar.title}</h3>
                          <p className="mt-3 text-sm text-white/70 leading-relaxed">{pillar.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_70%)]" aria-hidden />
                    <Image
                      src="/images/blog/ai-soul-story.svg"
                      alt="FrankX portrait collage"
                      width={520}
                      height={520}
                      className="relative z-10 w-full rounded-3xl border border-white/10 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>
              </section>
            </StaggerItem>

            <StaggerItem>
              <section className="grid gap-10 lg:grid-cols-[0.8fr,1fr]">
                <div className="space-y-6">
                  <RevealAnimation direction="right">
                    <h2 className="text-3xl font-bold text-white">Multi-agent studio</h2>
                    <p className="text-base text-white/70 leading-relaxed mt-4">
                      The hub is orchestrated with the four Claude agents defined in the operating manual. Each one mirrors part of my own craft, ensuring every project balances technical excellence, creative resonance, and strategic foresight.
                    </p>
                    <div className="mt-8">
                      <a
                        href="/CLAUDE.md"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                      >
                        View the Claude configuration
                      </a>
                    </div>
                  </RevealAnimation>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {claudeAgents.map((agent, index) => (
                    <RevealAnimation key={agent.id} direction="up" delay={index * 0.1}>
                      <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 transition-colors">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{agent.name}</h3>
                        <p className="mt-3 text-sm text-white/70 leading-relaxed">{agent.role}</p>
                      </div>
                    </RevealAnimation>
                  ))}
                </div>
              </section>
            </StaggerItem>

            <StaggerItem>
              <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white">Daily intelligence ritual</h2>
                    <p className="mt-3 text-base text-white/70 leading-relaxed max-w-2xl">
                      Every weekday follows a repeatable operating system so the hub keeps shipping. You can audit the cadence, outputs, and next experiments in the ritual log.
                    </p>
                  </div>
                  <GlowPulse>
                    <a
                      href="/docs/DAILY_INTELLIGENCE_OPERATIONS.md"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 transition-transform"
                    >
                      Read the daily playbook
                    </a>
                  </GlowPulse>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: 'Signal Scan',
                      description: 'Research, market intelligence, and enterprise briefings flow into the Starlight Architect backlog each morning.',
                    },
                    {
                      title: 'Studio Blocks',
                      description: 'Creation Engine and Frequency Alchemist deliver narrative and musical assets for the week’s releases.',
                    },
                    {
                      title: 'Evening Sync',
                      description: "Strategic review ties today's output to the long-horizon vision and updates the public roadmap.",
                    },
                  ].map((item, i) => (
                    <RevealAnimation key={item.title} delay={i * 0.1}>
                      <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{item.title}</h3>
                        <p className="mt-3 text-sm text-white/70 leading-relaxed">{item.description}</p>
                      </div>
                    </RevealAnimation>
                  ))}
                </div>
              </section>
            </StaggerItem>

            <StaggerItem>
              <section className="space-y-8">
                <h2 className="text-3xl font-bold text-white">Timeline & commitments</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {milestones.map((milestone, i) => (
                    <RevealAnimation key={milestone.title} delay={i * 0.1}>
                      <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur hover:border-white/20 transition-all hover:-translate-y-1">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-400">{milestone.year}</span>
                        <h3 className="mt-4 text-xl font-bold text-white">{milestone.title}</h3>
                        <p className="mt-3 text-sm text-white/70 leading-relaxed">{milestone.description}</p>
                      </div>
                    </RevealAnimation>
                  ))}
                </div>
              </section>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </div>
  )
}
