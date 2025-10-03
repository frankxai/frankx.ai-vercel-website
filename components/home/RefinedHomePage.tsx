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
  heroSegments,
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
import { trackEvent } from '@/lib/analytics'

// V1.5: Streamlined to 6 essential sections for better flow
const StrategicSpotlights = dynamic(() => import('@/components/home/sections/StrategicSpotlights'))
const IntelligenceAtlasSpotlight = dynamic(() => import('@/components/home/sections/IntelligenceAtlasSpotlight'))
const SegmentProfiles = dynamic(() => import('@/components/home/sections/SegmentProfiles'))
const Updates = dynamic(() => import('@/components/home/sections/Updates'))
const Resources = dynamic(() => import('@/components/home/sections/Resources'))
const FinalCTA = dynamic(() => import('@/components/home/sections/FinalCTA'))

export default function RefinedHomePage() {
  const { primary, secondary, tertiary } = heroCta

  return (
    <main id="main" className="flex-1 pt-32 text-white">
      <ScrollProgress />

      {/* Hero Section - Golden Age Welcome */}
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
                  <h1 className="text-heading-1 font-bold leading-tight text-balance max-w-6xl mx-auto">
                    <span className="bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent">
                      Build Incredible Things
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-600 bg-clip-text text-transparent">
                      With AI Intelligence
                    </span>
                  </h1>
                </StaggerItem>

                <StaggerItem>
                  <p className="text-body text-neutral-300 max-w-4xl mx-auto leading-relaxed">
                    AI products, blueprints, and resources for creators ready to explore and build in the Golden Age of Intelligence.
                    From music creation to intelligent automation—tools that empower, not replace.
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
                    <MagneticHover intensity={0.4}>
                      <GlowPulse color="cyan">
                        <Link
                          href={primary.href}
                          onClick={() => trackEvent('home_primary_cta_click', { destination: primary.href })}
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
                        onClick={() => trackEvent('home_secondary_cta_click', { destination: secondary.href })}
                        className="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1"
                      >
                        {secondary.label}
                        <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </Link>
                    </MagneticHover>
                  </div>
                </StaggerItem>

                {/* Audience Segments - Compact */}
                <StaggerItem>
                  <div className="mt-8 grid w-full gap-3 sm:grid-cols-3 max-w-5xl mx-auto">
                    {heroSegments.map((segment) => (
                      <Link
                        key={segment.id}
                        href={segment.href}
                        onClick={() => trackEvent('home_persona_select', { segment: segment.id })}
                        className="group rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-left transition hover:border-white/30 hover:bg-white/10 hover:scale-105"
                      >
                        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                          {segment.label}
                        </div>
                        <p className="mt-2 text-sm text-white/70 leading-relaxed group-hover:text-white/85">
                          {segment.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </ParallaxContainer>
      </section>

      {/* Strategic Spotlights - Products/Offerings */}
      <StrategicSpotlights />

      {/* Intelligence Atlas - Learning Hub */}
      <IntelligenceAtlasSpotlight />

      {/* Updates - Latest Content */}
      <Updates />

      {/* Resources - Tools & Templates */}
      <Resources />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  )
}
