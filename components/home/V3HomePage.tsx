'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Grid3x3,
  Music,
  Zap,
  Check,
  Star,
  Users,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'

import { heroStats, heroCta } from '@/lib/hub'
import { gradientPresets, glassCardClasses } from '@/lib/design/gradients'
import {
  ParallaxContainer,
  StaggerContainer,
  StaggerItem,
  MagneticHover,
  MorphingBackground,
  RevealAnimation,
  GlowPulse,
  ScrollProgress
} from '@/components/ui/AdvancedAnimations'
import { Surface, SectionHeading, Pill, StatBlock } from '@/components/ui/primitives'
import { trackEvent } from '@/lib/analytics'

/**
 * V3 HomePage - The Ultimate Homepage
 *
 * Combines:
 * - V1's visionary soul & beautiful animations
 * - V2's clarity & concrete value props
 * - NEW: AI Architects, Music Makers, Generative Creators positioning
 */

// Animation variants (lightweight, respects reduced motion)
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function V3HomePage() {
  const { primary, secondary, tertiary } = heroCta

  return (
    <main id="main" className="flex-1 pt-32 text-white">
      <ScrollProgress />

      {/* ========================================
          HERO SECTION
          V1's animations + V2's clarity + V3's positioning
      ======================================== */}
      <section
        id="hero"
        className="relative overflow-hidden pt-24 pb-32"
        aria-labelledby="hero-heading"
      >
        {/* V1's Beautiful Gradient Layers */}
        <MorphingBackground />
        <div className={clsx('absolute inset-0', gradientPresets.heroBase)} />
        <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
        <div className={clsx('absolute inset-0 opacity-40', gradientPresets.heroPulse)} />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-60" aria-hidden />

        <ParallaxContainer offset={30}>
          <div className="relative mx-auto max-w-7xl px-6">
            <StaggerContainer staggerDelay={0.2}>
              <div className="text-center space-y-10">
                {/* Trust Badge - V3 New */}
                <StaggerItem>
                  <Pill
                    variant="brand"
                    icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
                    className="mx-auto"
                  >
                    Built by Oracle AI Architect | 500+ Suno Sessions
                  </Pill>
                </StaggerItem>

                {/* Headline - V3 New Positioning */}
                <StaggerItem>
                  <h1
                    id="hero-heading"
                    className="text-heading-1 font-bold leading-tight text-balance max-w-6xl mx-auto"
                  >
                    <span className="bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent">
                      Intelligence Systems for
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-600 bg-clip-text text-transparent">
                      AI Architects, Music Makers, and Generative Creators
                    </span>
                  </h1>
                </StaggerItem>

                {/* Subheadline - V3 Specific Value Props */}
                <StaggerItem>
                  <p className="text-body text-neutral-300 max-w-4xl mx-auto leading-relaxed">
                    Oracle-grade AI systems, Suno music workflows, and consciousness-first creator operating systems.
                    Build, ship, and scale with field-tested frameworks from an enterprise architect.
                  </p>
                </StaggerItem>

                {/* CTAs - V3 Assessment-First */}
                <StaggerItem>
                  <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
                    <MagneticHover intensity={0.4}>
                      <GlowPulse color="cyan">
                        <Link
                          href="/assessment"
                          onClick={() => trackEvent('v3_hero_primary_cta', { destination: '/assessment' })}
                          className="btn-primary inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1"
                        >
                          Discover Your Creator Path
                          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </Link>
                      </GlowPulse>
                    </MagneticHover>
                    <MagneticHover intensity={0.3}>
                      <Link
                        href="/products/vibe-os"
                        onClick={() => trackEvent('v3_hero_secondary_cta', { destination: '/products/vibe-os' })}
                        className="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1"
                      >
                        Explore Vibe OS
                        <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </Link>
                    </MagneticHover>
                  </div>
                </StaggerItem>

                {/* Hero Image - V2 Addition */}
                <StaggerItem>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-12 relative max-w-5xl mx-auto"
                  >
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image
                        src="/hero-homepage.png"
                        alt="FrankX.ai intelligence dashboard showing AI workflows, Suno sessions, and creator systems"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                    </div>
                  </motion.div>
                </StaggerItem>
              </div>
            </StaggerContainer>

            {/* Stats Section - V1's Beautiful Layout */}
            <StaggerContainer staggerDelay={0.15}>
              <div className="mt-24">
                <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
                  {heroStats.map((stat) => (
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

      {/* ========================================
          3 PERSONA CARDS - V3 New Positioning
      ======================================== */}
      <section className="py-24 px-6" aria-labelledby="personas-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeading
              id="personas-heading"
              eyebrow="Choose Your Path"
              title="Built for Your Creator Archetype"
              description="Whether you architect systems, create music, or ship content—we have the tools you need."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI ARCHITECTS */}
            <RevealAnimation direction="up" delay={0.1}>
              <Link
                href="/products/agentic-creator-os"
                onClick={() => trackEvent('v3_persona_select', { persona: 'ai-architect' })}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 h-full flex flex-col"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <Grid3x3 className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Architects</h3>
                <p className="text-lg font-medium text-cyan-400 mb-4">
                  Build Conscious AI Systems
                </p>
                <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                  Enterprise-grade architectures for Oracle teams and conscious creators. Design systems that serve both professional excellence and human consciousness evolution.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Enterprise</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Systems</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Oracle</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                  Explore Agentic Creator OS
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </Link>
            </RevealAnimation>

            {/* MUSIC MAKERS */}
            <RevealAnimation direction="up" delay={0.2}>
              <Link
                href="/products/vibe-os"
                onClick={() => trackEvent('v3_persona_select', { persona: 'music-maker' })}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 h-full flex flex-col"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                  <Music className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Music Makers</h3>
                <p className="text-lg font-medium text-purple-400 mb-4">
                  Create with Suno + AI
                </p>
                <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                  500+ field-tested Suno workflows, release planning systems, and vibrational music creation frameworks. Go from idea to release in hours, not weeks.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Suno</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Music</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Frequency</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
                  Enter Vibe OS
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </Link>
            </RevealAnimation>

            {/* GENERATIVE CREATORS */}
            <RevealAnimation direction="up" delay={0.3}>
              <Link
                href="/products/creative-ai-toolkit"
                onClick={() => trackEvent('v3_persona_select', { persona: 'generative-creator' })}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 h-full flex flex-col"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <Sparkles className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Generative Creators</h3>
                <p className="text-lg font-medium text-amber-400 mb-4">
                  Ship Content Weekly
                </p>
                <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                  AI-powered content systems, course creation frameworks, and digital product workflows. Launch consistently with templates that transform and profit ethically.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Content</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Courses</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Products</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all">
                  Get Creative AI Toolkit
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* ========================================
          SOCIAL PROOF SECTION
      ======================================== */}
      <section className="py-24 px-6 bg-slate-950/50" aria-labelledby="social-proof-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeading
              id="social-proof-heading"
              eyebrow="Trusted Results"
              title="Trusted by Oracle Architects & Conscious Creators"
              description="Real systems, real results, real transformation."
            />
          </div>

          {/* Stats Grid - Real metrics only */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 mb-4">
                <Music className="h-6 w-6 text-purple-400" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-slate-400">Suno Sessions Created by Frank</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 mb-4">
                <Award className="h-6 w-6 text-cyan-400" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Oracle</div>
              <div className="text-sm text-slate-400">AI Architect Background</div>
            </div>
          </div>

          {/* Testimonials section removed - will be added when real user feedback is collected */}
          <div className="text-center">
            <p className="text-slate-300 text-lg">
              Join our growing community of early adopters building with AI consciousness and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          HOW IT WORKS
      ======================================== */}
      <section id="how-it-works" className="py-24 px-6" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeading
              id="how-it-works-heading"
              eyebrow="Your Journey"
              title="From Assessment to Shipping"
              description="Three simple steps to transform your creative practice."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                icon: Zap,
                title: 'Take Assessment',
                description: 'Discover your creator archetype and get personalized system recommendations in 2 minutes.',
                color: 'cyan'
              },
              {
                step: '2',
                icon: Grid3x3,
                title: 'Choose Your System',
                description: 'Select Vibe OS for music, Creative AI Toolkit for content, or Agentic Creator OS for custom architecture.',
                color: 'purple'
              },
              {
                step: '3',
                icon: TrendingUp,
                title: 'Ship & Scale',
                description: 'Launch with proven templates, workflows, and support. Start creating consistently today.',
                color: 'amber'
              }
            ].map((item) => {
              const iconColorClasses = {
                cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
                purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: parseInt(item.step) * 0.1 }}
                  className="text-center"
                >
                  <div className={clsx(
                    "mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all",
                    iconColorClasses[item.color as keyof typeof iconColorClasses]
                  )}>
                    <item.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="mb-4 text-sm font-bold text-white/50 uppercase tracking-wider">
                    Step {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-16">
            <MagneticHover intensity={0.3}>
              <Link
                href="/assessment"
                onClick={() => trackEvent('v3_how_it_works_cta', { destination: '/assessment' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Start Your Assessment
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </MagneticHover>
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURED PRODUCTS
      ======================================== */}
      <section className="py-24 px-6 bg-slate-950/50" aria-labelledby="products-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeading
              id="products-heading"
              eyebrow="Intelligence Systems"
              title="Choose Your Creator Operating System"
              description="Field-tested frameworks from an Oracle AI architect and conscious creator."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Vibe OS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm flex flex-col"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Music className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Vibe OS</h3>
              <div className="text-3xl font-bold text-purple-400 mb-4">$97</div>
              <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                Complete Suno music creation system with 500+ field-tested workflows, release planning templates, and vibrational frequency frameworks.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '500+ Suno session templates',
                  'Release planning workflows',
                  'Music as consciousness tech',
                  'Commercial licensing guides',
                  'Platform distribution playbooks'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products/vibe-os"
                onClick={() => trackEvent('v3_product_cta', { product: 'vibe-os' })}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-500 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Enter Vibe OS
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Creative AI Toolkit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border border-amber-500/30 bg-white/5 p-8 backdrop-blur-sm flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400">
                  <Star className="h-3 w-3" aria-hidden="true" />
                  Popular
                </span>
              </div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Creative AI Toolkit</h3>
              <div className="text-3xl font-bold text-amber-400 mb-4">$47</div>
              <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                AI-powered content systems for generative creators. Launch courses, newsletters, and digital products with proven templates and workflows.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Content creation templates',
                  'Course launch frameworks',
                  'Digital product blueprints',
                  'Email & social sequences',
                  'Community building rituals'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products/creative-ai-toolkit"
                onClick={() => trackEvent('v3_product_cta', { product: 'creative-ai-toolkit' })}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Get the Toolkit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Agentic Creator OS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm flex flex-col"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Grid3x3 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Agentic Creator OS</h3>
              <div className="text-3xl font-bold text-cyan-400 mb-4">Custom</div>
              <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                Oracle-grade AI system architecture for conscious creators. Custom-designed operating systems with enterprise standards and soul-centered design.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Custom system architecture',
                  'Enterprise AI integration',
                  'Consciousness-first design',
                  'Oracle career alignment',
                  'Ongoing support & evolution'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products/agentic-creator-os"
                onClick={() => trackEvent('v3_product_cta', { product: 'agentic-creator-os' })}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Book Strategy Call
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
      ======================================== */}
      <section className="py-32 px-6 relative overflow-hidden" aria-labelledby="final-cta-heading">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-purple-950/20 to-slate-950" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]" aria-hidden />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Pill
              variant="brand"
              icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
              className="mx-auto mb-8"
            >
              Join Early Adopters
            </Pill>

            <h2 id="final-cta-heading" className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Build Intelligence Systems?
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Start with our free assessment to discover your creator archetype and get personalized recommendations.
              Transform from tech-overwhelmed to AI-empowered today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticHover intensity={0.4}>
                <GlowPulse color="cyan">
                  <Link
                    href="/assessment"
                    onClick={() => trackEvent('v3_final_cta_primary', { destination: '/assessment' })}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    Start Assessment
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </GlowPulse>
              </MagneticHover>

              <Link
                href="/products/agentic-creator-os"
                onClick={() => trackEvent('v3_final_cta_secondary', { destination: '/products/agentic-creator-os' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Book Consulting Call
              </Link>
            </div>

            <p className="text-sm text-slate-400 mt-8 flex items-center justify-center gap-6 flex-wrap">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                2-minute assessment
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                20% off with assessment
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
