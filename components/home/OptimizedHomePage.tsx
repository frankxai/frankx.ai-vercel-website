'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'

import {
  heroCta,
  heroHighlights,
  heroStats,
  quickActions,
} from '@/lib/hub'
import { gradientPresets, glassCardClasses } from '@/lib/design/gradients'
import {
  ParallaxContainer,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  MagneticHover,
  MorphingBackground,
  RevealAnimation,
  GlowPulse,
  ScrollProgress
} from '@/components/ui/AdvancedAnimations'
import { Surface, SectionHeading, Pill, StatBlock } from '@/components/ui/primitives'

const StrategicSpotlights = dynamic(() => import('@/components/home/sections/StrategicSpotlights'))
const IntelligenceAtlasSpotlight = dynamic(() => import('@/components/home/sections/IntelligenceAtlasSpotlight'))
const SegmentProfiles = dynamic(() => import('@/components/home/sections/SegmentProfiles'))
const Updates = dynamic(() => import('@/components/home/sections/Updates'))
const Resources = dynamic(() => import('@/components/home/sections/Resources'))
const KeywordClusters = dynamic(() => import('@/components/home/sections/KeywordClusters'))
const Projects = dynamic(() => import('@/components/home/sections/Projects'))
const AgentProtocols = dynamic(() => import('@/components/home/sections/AgentProtocols'))
const Testimonials = dynamic(() => import('@/components/home/sections/Testimonials'))
const FinalCTA = dynamic(() => import('@/components/home/sections/FinalCTA'))

export default function OptimizedHomePage() {
  const { primary, secondary, tertiary } = heroCta

  return (
    <main id="main" className="flex-1 pt-32 text-white">
      <ScrollProgress />
      {/* Hero Section */}
      <section id="hub" className="relative overflow-hidden pt-24 pb-32">
        <MorphingBackground />
        <div className={clsx('absolute inset-0', gradientPresets.heroBase)} />
        <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
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
                  <h1 className="text-5xl font-bold leading-tight text-balance md:text-7xl xl:text-8xl max-w-6xl mx-auto">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      Transform Ideas Into
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Exponential Results
                    </span>
                  </h1>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
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
                    <span>Trusted by creators and enterprises</span>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span>500+ Vibe OS users</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span>200+ Enterprise systems</span>
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
                      <StatBlock
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        description={stat.detail}
                        align="center"
                        className="h-full"
                      />
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
                            <Link
                              key={action.title}
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

      <StrategicSpotlights />
      <IntelligenceAtlasSpotlight />
      <SegmentProfiles />
      <Updates />
      <Resources />
      <KeywordClusters />
      <Projects />
      <AgentProtocols />
      <Testimonials />
      <FinalCTA />

    </main>
  )
}