'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowDown,
  Brain,
  Music,
  BookOpen,
  Users,
  GitBranch,
  Sparkles,
  Workflow,
  Mail,
  MessageCircle,
  Download,
  ExternalLink,
  Clock,
  Tag,
  Award
} from 'lucide-react'

import { gradientPresets } from '@/lib/design/gradients'
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
import type { BlogPost } from '@/lib/blog'
import BlogCardCompact from '@/components/blog/BlogCardCompact'

/**
 * V4 HomePage - Personal AI Intelligence Hub
 *
 * Philosophy:
 * - Value first, products subtle
 * - Epic, cinematic, command center aesthetic
 * - Showcase work: articles, music, systems
 * - Community and belonging > transactions
 * - Frank's authentic voice
 */

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

interface V4HomePageProps {
  featuredPosts: BlogPost[]
}

export default function V4HomePage({ featuredPosts }: V4HomePageProps) {
  return (
    <main id="main" className="flex-1 pt-32 text-white">
      <ScrollProgress />

      {/* ========================================
          HERO SECTION - Welcome to the Intelligence Hub
          Epic, cinematic, identity-focused
      ======================================== */}
      <section
        id="hero"
        className="relative overflow-hidden pt-24 pb-32 min-h-[90vh] flex items-center"
        aria-labelledby="hero-heading"
      >
        {/* Epic Background Layers */}
        {/* Hero Image - AI Command Center */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-ai-hub-v4.png"
            alt="FrankX AI Command Center - Futuristic AI workspace"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={95}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>

        <MorphingBackground />
        <div className={clsx('absolute inset-0', gradientPresets.heroBase, 'opacity-50')} />
        <div className={clsx('absolute inset-0 opacity-40 blur-3xl', gradientPresets.heroAurora)} />
        <div className={clsx('absolute inset-0 opacity-30', gradientPresets.heroPulse)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" aria-hidden />

        <ParallaxContainer offset={30}>
          <div className="relative mx-auto max-w-7xl px-6">
            <StaggerContainer staggerDelay={0.2}>
              <div className="text-center space-y-10">
                {/* Badge - AI Intelligence Hub */}
                <StaggerItem>
                  <Pill
                    variant="brand"
                    icon={<Brain className="h-4 w-4" aria-hidden="true" />}
                    className="mx-auto"
                  >
                    AI Intelligence Hub
                  </Pill>
                </StaggerItem>

                {/* Epic Headline */}
                <StaggerItem>
                  <h1
                    id="hero-heading"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] max-w-6xl mx-auto"
                  >
                    <span className="block text-white/90 text-2xl md:text-3xl font-normal mb-4">
                      Ship AI Systems That Actually Work
                    </span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                      Production-Grade Intelligence for Modern Creators
                    </span>
                  </h1>
                </StaggerItem>

                {/* Subheadline - Identity & Scale */}
                <StaggerItem>
                  <p className="text-xl md:text-2xl text-slate-200 mt-8 max-w-4xl mx-auto leading-relaxed">
                    Oracle AI Architect with <span className="text-white font-semibold">300+ deployed systems</span> and <span className="text-white font-semibold">500+ AI-generated tracks</span>.
                    <br className="hidden md:block" />
                    <span className="block mt-4 text-lg md:text-xl text-slate-300">
                      Get the workflows, prompts, and frameworks that power enterprise AI and independent music production—completely free.
                    </span>
                  </p>
                </StaggerItem>

                {/* Epic Stats Bar */}
                <StaggerItem>
                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                      <Music className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-semibold text-white">500+ Songs</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      <Brain className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-semibold text-white">300+ AI Systems</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <BookOpen className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-white">50+ Free Resources</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                      <Users className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-semibold text-white">12k+ Community</span>
                    </div>
                  </div>
                </StaggerItem>

                {/* Value-First CTAs */}
                <StaggerItem>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <MagneticHover intensity={0.4}>
                      <Link
                        href="/resources"
                        onClick={() => trackEvent('v4_hero_cta', { destination: 'resources' })}
                        className="btn-primary group inline-flex items-center justify-center rounded-2xl px-10 py-5 text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]"
                      >
                        Get Free Resources
                        <Download className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </MagneticHover>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center rounded-2xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30"
                    >
                      Read Intelligence Reports
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </ParallaxContainer>
      </section>

      {/* ========================================
          LATEST INTELLIGENCE - Fresh from the Studio
          Articles, music, systems unified feed
      ======================================== */}
      <section
        id="latest-intelligence"
        className="py-24 px-6 bg-slate-950/30"
        aria-labelledby="intelligence-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeading
              id="intelligence-heading"
              eyebrow="Fresh from the studio"
              title="Latest Intelligence Drops"
              description="New articles, music releases, AI frameworks, and system blueprints. Everything shared here is free and open."
            />
          </div>

          {/* Featured articles grid */}
          {featuredPosts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredPosts.slice(0, 3).map((post) => (
                <BlogCardCompact key={post.slug} post={post} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-lg px-4 py-2"
            >
              Explore All Intelligence
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          FREE RESOURCES HUB - Massive Value Showcase
          Cannot be missed
      ======================================== */}
      <section
        id="free-resources"
        className="py-32 px-6 relative overflow-hidden"
        aria-labelledby="resources-heading"
      >
        {/* Premium background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5" aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <Pill variant="brand" icon={<Sparkles className="h-4 w-4" />} className="mx-auto mb-8">
              All Free • Production-Ready
            </Pill>
            <SectionHeading
              id="resources-heading"
              title="Enterprise-Grade Resources"
              description="Production AI systems, music workflows, and automation blueprints. Everything you need to ship with cutting-edge generative tools—completely free."
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* AI Systems & Tools */}
            <Link
              href="/resources#ai-systems"
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/50 hover:from-cyan-500/10 hover:to-transparent hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                <Brain className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                AI Systems & Frameworks
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Production-grade agent architectures and automation blueprints
              </p>
              <div className="text-xs text-cyan-400 font-semibold flex items-center gap-2">
                <Download className="h-4 w-4" />
                15+ resources
              </div>
            </Link>

            {/* Music & Audio */}
            <Link
              href="/resources#music"
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/50 hover:from-purple-500/10 hover:to-transparent hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <Music className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                Music Production
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Suno prompt engineering, session design, release rituals
              </p>
              <div className="text-xs text-purple-400 font-medium flex items-center gap-1">
                <Download className="h-3 w-3" />
                10+ workflows
              </div>
            </Link>

            {/* Creator Systems */}
            <Link
              href="/resources#creator-systems"
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/50 hover:from-emerald-500/10 hover:to-transparent hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Workflow className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Creator Operating Systems
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Rituals, dashboards, automation blueprints
              </p>
              <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Download className="h-3 w-3" />
                8+ templates
              </div>
            </Link>

            {/* Articles & Guides */}
            <Link
              href="/blog"
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/10 hover:to-transparent hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                Intelligence Reports
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Long-form strategic thinking and playbooks
              </p>
              <div className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                22 articles
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-1"
            >
              Browse All Free Resources
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          COMMUNITY & BELONGING
          Newsletter, Inner Circle, Connect
      ======================================== */}
      <section
        id="community"
        className="py-24 px-6 bg-slate-950/50"
        aria-labelledby="community-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Pill variant="brand" icon={<Users className="h-4 w-4" />} className="mx-auto mb-6">
              Join the Movement
            </Pill>
            <SectionHeading
              id="community-heading"
              title="Join the Community"
              description="12,000+ creators, AI architects, and builders shipping with cutting-edge generative tools. Learn, connect, and level up your AI game."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Newsletter */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                <Mail className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Weekly AI Dispatch</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Weekly insights from the studio: AI system architecture, music production techniques, workflow blueprints, and practical tutorials.
              </p>
              <div className="text-sm text-slate-400 mb-6">
                <div>12,000+ readers</div>
                <div>Weekly • Wednesday AM</div>
              </div>
              <Link
                href="https://frankx.ck.page/newsletter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 font-semibold rounded-lg transition-all"
              >
                Subscribe Free
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            {/* Inner Circle */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                <Award className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Premium Community</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Private hub for advanced workshops, early access to systems, and direct collaboration on AI projects.
              </p>
              <div className="text-sm text-slate-400 mb-6">
                <div>Limited access</div>
                <div>Launching Q1 2026</div>
              </div>
              <Link
                href="https://frankx.ck.page/realm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 font-semibold rounded-lg transition-all"
              >
                Join Waitlist
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <MessageCircle className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Follow the Journey</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Daily insights, work-in-progress, and studio updates across platforms.
              </p>
              <div className="space-y-3">
                <Link
                  href="https://linkedin.com/in/frank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-400 text-sm font-bold">in</span>
                  </div>
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href="https://twitter.com/frankxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                    <span className="text-sky-400 text-sm font-bold">𝕏</span>
                  </div>
                  <span>X / Twitter</span>
                </Link>
                <Link
                  href="https://youtube.com/@frankxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-400 text-sm font-bold">▶</span>
                  </div>
                  <span>YouTube</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          CREATOR PATHS - Subtle Product Mention
          Natural extension, not pushy
      ======================================== */}
      <section
        id="creator-paths"
        className="py-24 px-6"
        aria-labelledby="paths-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Pill variant="subtle" className="mx-auto mb-6">
              Want customized support?
            </Pill>
            <SectionHeading
              id="paths-heading"
              title="Work With Frank & The Collective"
              description="If you want custom systems built for your studio, or prefer plug-and-play toolkits, these paths are available. Everything starts with the free resources above."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/products/agentic-creator-os"
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/5 text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                <Workflow className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Custom Creator OS</h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Work directly with Frank and the agent collective to design your operating system
              </p>
              <div className="text-xs text-slate-400 mb-4">
                <div>1:1 Consulting</div>
                <div>Custom engagement</div>
              </div>
              <div className="text-sm text-cyan-400 font-medium flex items-center gap-1">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link
              href="/products/creative-ai-toolkit"
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/5 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Pre-Built Toolkits</h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Plug-and-play templates, prompts, and workflows for creators who want to move fast
              </p>
              <div className="text-xs text-slate-400 mb-4">
                <div>Digital Products</div>
                <div>$49-99 one-time</div>
              </div>
              <div className="text-sm text-emerald-400 font-medium flex items-center gap-1">
                Browse toolkits
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link
              href="/products/vibe-os"
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/5 text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                <Music className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Vibe OS Sessions</h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Premium Suno session packs with stems, prompts, and commercial licensing
              </p>
              <div className="text-xs text-slate-400 mb-4">
                <div>Music Packs</div>
                <div>$29/pack</div>
              </div>
              <div className="text-sm text-purple-400 font-medium flex items-center gap-1">
                Explore sessions
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          <p className="text-center text-sm text-slate-400 mt-12">
            Not sure where to start?{' '}
            <Link href="/assessment" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
              Take the AI Readiness Assessment
            </Link>{' '}
            to find your path.
          </p>
        </div>
      </section>
    </main>
  )
}
