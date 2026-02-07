'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Sparkles } from 'lucide-react'

import {
  agentProtocols,
  heroCta,
  heroHighlights,
  heroStats,
  heroSubtext,
  heroSupportLink,
  homeSpotlights,
  keywordClusters,
  projectMilestones,
  quickActions,
  resourceCollections,
  segmentProfiles,
  testimonials,
  testimonialIcon,
  updateEntries
} from '@/lib/hub'
import { atlasActions, atlasMetrics, atlasVolumes } from '@/lib/intelligence-atlas'
import { gradientPresets, glassCardClasses } from '@/lib/design/gradients'
import {
  ParallaxContainer,
  ParallaxLayer,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  MagneticHover,
  MorphingBackground,
  RevealAnimation,
  TypewriterText,
  GlowPulse,
  ScrollProgress
} from '@/components/ui/AdvancedAnimations'
import { Surface, SectionHeading, Pill, StatBlock } from '@/components/ui/primitives'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { CursorSpotlight } from '@/components/ui/CursorSpotlight'
import PremiumCard from '@/components/ui/PremiumCard'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

const statusStyles: Record<'shipping' | 'in-progress' | 'incubating', string> = {
  shipping: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200',
  'in-progress': 'border-amber-400/50 bg-amber-500/10 text-amber-200',
  incubating: 'border-sky-400/50 bg-sky-500/10 text-sky-200'
}

const TestimonialIcon = testimonialIcon

export default function HomePage() {
  const upcomingAtlasVolumes = atlasVolumes.filter((volume) => volume.number !== 1).slice(0, 3)
  const { primary, secondary, tertiary } = heroCta

  return (
    <main id="main" className="flex-1 pt-32 text-white">
      <ScrollProgress />
      <CursorSpotlight />
      {/* Hero Section */}
      <section id="hub" className="relative overflow-hidden pt-24 pb-32">
        {/* Multi-layer parallax background */}
        <ParallaxLayer offset={-80} blur={3} className="absolute inset-0">
          <MorphingBackground />
        </ParallaxLayer>
        <ParallaxLayer offset={-40} blur={1} className="absolute inset-0">
          <div className={clsx('absolute inset-0', gradientPresets.heroBase)} />
          <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
        </ParallaxLayer>
        <div className={clsx('absolute inset-0 opacity-40', gradientPresets.heroPulse)} />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-60" aria-hidden />
        <ParallaxContainer offset={30}>
          <div className="relative mx-auto max-w-7xl px-6">
            <StaggerContainer staggerDelay={0.2}>
              <div className="text-center space-y-12">
                <StaggerItem>
                  <Pill
                    variant="brand"
                    icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
                    className="mx-auto"
                  >
                    Golden Age Of Intelligence
                  </Pill>
                </StaggerItem>
                <StaggerItem>
                  <div className="max-w-6xl mx-auto">
                    <SplitTextReveal
                      text="Transform Ideas Into"
                      className="text-5xl font-bold leading-tight text-balance md:text-7xl xl:text-8xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                      delay={0.2}
                    />
                    <SplitTextReveal
                      text="Exponential Results"
                      className="text-5xl font-bold leading-tight text-balance md:text-7xl xl:text-8xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                      delay={0.6}
                    />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-slate-200 max-w-4xl mx-auto leading-relaxed">
                    Architect the intelligence era with a unified roadmap, field-tested frameworks, and operating rituals that keep every agent and teammate aligned.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
                    <MagneticHover intensity={0.4}>
                      <GlowPulse color="cyan">
                        <Link
                          href={primary.href}
                          className="btn-primary inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1"
                        >
                          {primary.label}
                          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </Link>
                      </GlowPulse>
                    </MagneticHover>
                    <MagneticHover intensity={0.3}>
                      <Link
                        href={secondary.href}
                        className="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1"
                      >
                        {secondary.label}
                        <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </Link>
                    </MagneticHover>
                    <Link
                      href={tertiary.href}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/15 hover:-translate-y-1"
                    >
                      {tertiary.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center justify-center gap-8 pt-8 text-sm text-white/60">
                    <span>Trusted by creators and collaborators</span>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span>500+ Vibe OS users</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span>300+ Creator systems</span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>

            {/* Stats Section */}
            <StaggerContainer staggerDelay={0.15}>
              <div className="mt-24">
                <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
                  {heroStats.map((stat, index) => (
                    <FloatingElement
                      key={stat.label}
                      duration={6 + index * 0.5}
                      offset={8 + index * 2}
                    >
                      <StatBlock
                        value={stat.value}
                        label={stat.label}
                        description={stat.detail}
                        align="center"
                        className="h-full"
                      />
                    </FloatingElement>
                  ))}
                </div>
              </div>
            </StaggerContainer>
          </div>
        </ParallaxContainer>
      </section>

      {/* Quick Actions Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer staggerDelay={0.15}>
            <StaggerItem>
                  <aside className={clsx(glassCardClasses, 'relative overflow-hidden rounded-4xl p-8 text-white/80 shadow-glass')}>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-60" aria-hidden />
                    <div className="relative space-y-8">
                      <div>
                        <h2 className="text-2xl font-semibold text-white">Start with clarity</h2>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">
                          Every visit surfaces the newest rituals, roadmaps, and intelligence drops curated for the way you lead.
                        </p>
                      </div>
                      <div className="grid gap-3">
                        {quickActions.map((action) => (
                          <MagneticHover key={action.title} intensity={0.2}>
                            <Link
                              href={action.href}
                              className="group flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 transition hover:border-white/30 hover:bg-white/10"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80">
                                <action.icon className="h-4 w-4" aria-hidden="true" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1 text-sm font-semibold text-white">
                                  {action.title}
                                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                                </div>
                                <p className="mt-1 text-xs text-white/70">{action.description}</p>
                              </div>
                            </Link>
                          </MagneticHover>
                        ))}
                      </div>
                      <div className="space-y-4 border-t border-white/10 pt-6">
                        {heroHighlights.map((highlight) => (
                          <RevealAnimation key={highlight.title} direction="left">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80">
                                <highlight.icon className="h-5 w-5" aria-hidden="true" />
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-white">{highlight.title}</h3>
                                <p className="mt-1 text-xs leading-relaxed text-white/70">{highlight.description}</p>
                              </div>
                            </div>
                          </RevealAnimation>
                        ))}
                      </div>
                    </div>
                  </aside>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Strategic Spotlights */}
      <section className="bg-midnight-950 py-24 px-6">
        <div className="mx-auto max-w-7xl space-y-12">
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Operate with clarity"
              title="Start with the latest FrankX playbooks"
              description="Each spotlight connects the Intelligence Atlas, roadmap hub, and resource stack so you can move from insight to action without losing momentum."
              className="max-w-3xl"
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {homeSpotlights.map((spotlight, index) => (
              <motion.div key={spotlight.title} {...fadeUp} transition={{ delay: index * 0.1 }}>
                <PremiumCard tilt={true} className="h-full group">
                  <Surface as="article" tone="glass" padding="md" className="h-full backdrop-blur-sm">
                    <span className="eyebrow-text text-slate-400">{spotlight.eyebrow}</span>
                    <h3 className="mt-3 text-xl font-semibold text-white">{spotlight.title}</h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">{spotlight.description}</p>
                    <Link
                      href={spotlight.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
                    >
                      {spotlight.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Surface>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Atlas Spotlight */}
      <section id="intelligence-atlas" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/70">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Intelligence Atlas 2025
            </span>
            <h2 className="mt-4 text-4xl font-semibold text-balance">
              Track the 100,000-word roadmap guiding FrankX creators, executives, and families.
            </h2>
            <p className="mt-4 text-white/70">
              Volume I ships today with adoption metrics, governance rituals, and builder-ready frameworks. Nine companion volumes follow monthly, converting field research into playbooks you can deploy.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <motion.article
              className="rounded-4xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-10 backdrop-blur"
              {...fadeUp}
              transition={{ duration: 0.35 }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Volume I ??? Architecting the Agentic Era
              </div>
              <h3 className="mt-4 text-3xl font-semibold text-white">
                Go inside the flagship report fueling the atlas.
              </h3>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                Use the executive summary, adoption heat map, agent readiness assessments, and governance toolkits to align your team. Then keep pace with the roadmap by subscribing to atlas alerts and contribution calls.
              </p>
              <div className="mt-8 space-y-4">
                {atlasActions.map((action) => {
                  const isExternal = action.href.startsWith('http') || action.href.startsWith('mailto:')

                  const actionContent = (
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{action.title}</p>
                        <p className="mt-1 text-xs text-white/70 leading-relaxed">{action.description}</p>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50 whitespace-nowrap">
                        {action.label}
                      </span>
                    </div>
                  )

                  if (isExternal) {
                    return (
                      <a
                        key={action.href}
                        href={action.href}
                        className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/25 hover:bg-white/10"
                      >
                        {actionContent}
                      </a>
                    )
                  }

                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/25 hover:bg-white/10"
                    >
                      {actionContent}
                    </Link>
                  )
                })}
              </div>
            </motion.article>

            <motion.div className="grid gap-8" {...fadeUp} transition={{ duration: 0.4 }}>
              <div className="grid gap-6 sm:grid-cols-3">
                {atlasMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/75 backdrop-blur"
                  >
                    <div className="text-3xl font-semibold text-white">{metric.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.35em] text-white/60">{metric.label}</div>
                    <p className="mt-3 text-xs leading-relaxed">{metric.detail}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">Upcoming volumes</h4>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    2025 cadence
                  </span>
                </div>
                <div className="mt-4 space-y-4">
                  {upcomingAtlasVolumes.map((volume) => (
                    <div key={volume.number} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white">{volume.title}</p>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
                          {volume.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-white/70 leading-relaxed">{volume.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.35em] text-white/60">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{volume.release}</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{volume.wordCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Segment Profiles */}
      <section id="segments" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Designed for every circle
            </span>
            <h2 className="mt-4 text-4xl font-semibold text-balance">Your people, your work, your agents.</h2>
            <p className="mt-4 text-white/70">
              Whether you are briefing executives, hosting a family workshop, or shipping a new release, these
              pathways show you where to begin and how to integrate each experience.
            </p>
          </motion.div>
          <div className="mt-14 grid lg:grid-cols-2 gap-8">
            {segmentProfiles.map((profile) => (
              <motion.article
                key={profile.id}
                className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
                {...fadeUp}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <profile.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{profile.title}</h3>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">{profile.description}</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-white/70 leading-relaxed">{profile.transformation}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {profile.needs.map((need) => (
                    <li key={need} className="flex items-start gap-2 text-white/80">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-300" aria-hidden="true" />
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {profile.ctas.map((cta) => (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                    >
                      {cta.label}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                  {profile.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-white/20 px-3 py-1">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Updates */}
      <section id="updates" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-white text-balance">Latest intelligence drops</h2>
            <p className="mt-4 text-white/70">
              Stay ahead with the newest essays, resources, and program milestones. Each update is
              designed to be actionable for you and the teams you lead.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {updateEntries.map((entry) => (
              <motion.article
                key={entry.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                {...fadeUp}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                  {entry.type}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  <Link href={entry.href} className="hover:text-primary-600 dark:hover:text-sky-300 transition">
                    {entry.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{entry.summary}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-white/60">
                  <span>
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Link href={entry.href} className="inline-flex items-center gap-1 font-semibold">
                    Read
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-balance">Resource universes for every mission</h2>
            <p className="mt-4 text-white/70">
              Choose the path that matches your current momentum. Every item links directly into the
              operating system we build together.
            </p>
          </motion.div>
          <div className="mt-14 grid lg:grid-cols-3 gap-8">
            {resourceCollections.map((collection) => (
              <motion.article
                key={collection.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur flex flex-col"
                {...fadeUp}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold">{collection.title}</h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">{collection.description}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-white/70">Ideal for</p>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">{collection.focus}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {collection.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/15 transition"
                      >
                        <div>
                          <p className="font-semibold text-white">{item.label}</p>
                          <p className="text-xs text-white/70">{item.type}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Keyword Clusters */}
      <section id="search" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-white text-balance">
              Built around the searches you and your agents run
            </h2>
            <p className="mt-4 text-white/70">
              These keyword constellations guide the site architecture, ensuring every query leads to
              depth, clarity, and an action you can take next.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {keywordClusters.map((cluster) => (
              <motion.article
                key={cluster.cluster}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                {...fadeUp}
              >
                <h3 className="text-xl font-semibold text-white">{cluster.cluster}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{cluster.intent}</p>
                <div className="mt-4 text-xs text-primary-700 dark:text-sky-300 font-semibold uppercase tracking-widest">
                  Primary Keyword
                </div>
                <p className="text-sm text-white mt-1">{cluster.primaryKeyword}</p>
                <div className="mt-4 text-xs uppercase tracking-widest text-white/60">
                  Supporting Signals
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cluster.supportingKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-primary-50 text-primary-700 dark:bg-sky-500/10 dark:text-sky-200 px-3 py-1 text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link
                  href={cluster.link}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-sky-300 hover:underline"
                >
                  Explore cornerstone content
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-balance">Ship logs & manuscripts in motion</h2>
            <p className="mt-4 text-white/70">
              Track the releases, books, and platform upgrades as they move from incubation to launch.
              Every milestone includes a doorway into the work.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {projectMilestones.map((milestone) => (
              <motion.article
                key={milestone.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                {...fadeUp}
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${statusStyles[milestone.status]}`}
                >
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  {milestone.status.replace('-', ' ')}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{milestone.title}</h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">{milestone.description}</p>
                <p className="mt-3 text-xs text-white/60 uppercase tracking-widest">Focus</p>
                <p className="text-sm text-white/75">{milestone.focus}</p>
                {milestone.eta && (
                  <p className="mt-4 text-xs text-white/60">{milestone.eta}</p>
                )}
                {milestone.cta && (
                  <Link
                    href={milestone.cta.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                  >
                    {milestone.cta.label}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Protocols */}
      <section id="agents" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-white text-balance">
              Protocols that your AI agents can plug into today
            </h2>
            <p className="mt-4 text-white/70">
              Each protocol includes structures, prompts, and guardrails so human teams and automated
              agents stay in sync.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {agentProtocols.map((protocol) => (
              <motion.article
                key={protocol.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                {...fadeUp}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 dark:bg-sky-500/20 dark:text-sky-200 flex items-center justify-center">
                    <protocol.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{protocol.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-white/60 mt-1">
                      {protocol.focus}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/70 leading-relaxed">{protocol.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {protocol.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-white/75">
                      <Check className="w-4 h-4 mt-0.5 text-primary-600 dark:text-sky-300" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={protocol.link.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-sky-300 hover:underline"
                >
                  {protocol.link.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-midnight-950 py-24 px-6">
        <div className="max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-balance">Trusted across communities and boardrooms</h2>
            <p className="mt-4 text-white/70">
              Stories from the leaders, families, and creators who now run intelligence systems that feel
              deeply human.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                {...fadeUp}
              >
                <TestimonialIcon className="w-8 h-8 text-sky-300" aria-hidden="true" />
                <p className="mt-4 text-sm text-white/80 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/70">{testimonial.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24 px-6 text-white">
        <div className={clsx('absolute inset-0 opacity-90', gradientPresets.heroBase)} />
        <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
        <div className={clsx('absolute inset-0 opacity-45', gradientPresets.heroPulse)} />
        <div className="relative mx-auto max-w-4xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold text-balance md:text-5xl">Ready to architect your conscious intelligence era?</h2>
          <p className="text-lg leading-relaxed text-white/85">
            Bring your inner circle, leadership teams, and AI agents into a single operating rhythm. We choreograph the rituals, automations, and creative outputs that keep everyone aligned with calm precision.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/soul-frequency-assessment"
              className={clsx(
                'inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(12,27,68,0.35)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70',
                gradientPresets.buttonAurora
              )}
            >
              Begin with the assessment
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="mailto:hello@frankx.ai?subject=Creative%20AI%20Collaboration"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 text-sm font-semibold text-white/85 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30"
            >
              Request a strategy session
              <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}



