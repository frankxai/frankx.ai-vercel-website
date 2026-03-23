'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Star } from 'lucide-react'
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
  MagneticHover,
  MorphingBackground,
  GlowPulse,
  ScrollProgress,
  RevealAnimation
} from '@/components/ui/AdvancedAnimations'
import { Pill, StatBlock, SectionHeading } from '@/components/ui/primitives'
import { trackEvent } from '@/lib/analytics'

// Keep some sections if they provide value, otherwise comment out or remove
const StrategicSpotlights = dynamic(() => import('@/components/home/sections/StrategicSpotlights'))
const Updates = dynamic(() => import('@/components/home/sections/Updates'))
const Resources = dynamic(() => import('@/components/home/sections/Resources'))
const Testimonials = dynamic(() => import('@/components/home/sections/Testimonials'))
const FinalCTA = dynamic(() => import('@/components/home/sections/FinalCTA'))

export default function OptimizedHomePage() {
  const { primary, secondary, tertiary } = heroCta

  return (
    <main id="main" className="flex-1 pt-20 text-white selection:bg-primary-500/30">
      <ScrollProgress />

      {/* Hero Section */}
      <section id="hub" className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        <MorphingBackground />
        <div className={clsx('absolute inset-0', gradientPresets.heroBase)} />
        <div className={clsx('absolute inset-0 opacity-40 blur-3xl', gradientPresets.heroAurora)} />

        <ParallaxContainer offset={50}>
          <div className="relative mx-auto max-w-7xl px-6 z-10">
            <StaggerContainer staggerDelay={0.15}>
              <div className="text-center space-y-10">

                {/* Main Title */}
                <StaggerItem>
                  <div className="flex flex-col items-center justify-center mb-6">
                    <span className="text-sm md:text-base font-medium tracking-[0.4em] uppercase text-white/40 mb-4 hover:text-white/60 transition-colors cursor-default">
                      FrankX
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white text-center">
                      <span className="block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                        Build AI Systems
                      </span>
                      <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Aligned With Your Goals
                      </span>
                    </h1>
                  </div>
                </StaggerItem>

                {/* Subtitle */}
                <StaggerItem>
                  <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed font-light">
                    Free resources for <span className="text-white font-medium">creators</span> and <span className="text-white font-medium">students</span>.
                    <br className="hidden md:block" />
                    Practical frameworks. Open development. Real community.
                  </p>
                </StaggerItem>

                {/* CTAs */}
                <StaggerItem>
                  <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
                    <MagneticHover intensity={0.5}>
                      <GlowPulse color="cyan">
                        <Link
                          href={primary.href}
                          onClick={() => trackEvent('home_primary_cta_click', { destination: primary.href })}
                          className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-neutral-200 hover:scale-105"
                        >
                          {primary.label}
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </GlowPulse>
                    </MagneticHover>

                    <MagneticHover intensity={0.3}>
                      <Link
                        href={secondary.href}
                        onClick={() => trackEvent('home_secondary_cta_click', { destination: secondary.href })}
                        className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
                      >
                        {secondary.label}
                        <Sparkles className="ml-2 h-5 w-5 text-yellow-400" />
                      </Link>
                    </MagneticHover>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={tertiary.href}
                      className="text-sm text-white/40 hover:text-white transition-colors border-b border-transparent hover:border-white/40 pb-0.5"
                    >
                      {tertiary.label}
                    </Link>
                  </div>
                </StaggerItem>

                {/* Stats */}
                <StaggerItem>
                  <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-xs uppercase tracking-widest text-white/50 mb-2">{stat.label}</div>
                        <div className="text-sm text-white/70">{stat.detail}</div>
                      </div>
                    ))}
                  </div>
                </StaggerItem>

              </div>
            </StaggerContainer>
          </div>
        </ParallaxContainer>
      </section>

      {/* Highlights Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {heroHighlights.map((highlight, i) => (
              <RevealAnimation key={highlight.title} direction="up">
                <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{highlight.title}</h3>
                  <p className="text-white/60 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Start Here"
            description="Pick your path. Everything is free to explore."
            align="center"
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    <action.icon className="w-6 h-6 text-white/80" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{action.title}</h3>
                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Keep selected sections */}
      <StrategicSpotlights />
      <Resources />
      <Testimonials />
      <FinalCTA />

    </main>
  )
}
