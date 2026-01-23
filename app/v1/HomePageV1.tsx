'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import {
  ArrowRight,
  Play,
  Sparkles,
  Music2,
  BookOpen,
  Code2,
  ChevronRight,
  Brain,
  Rocket,
  Star,
  Zap,
  Globe as GlobeIcon,
  Wand2,
  Users,
} from 'lucide-react'

// Premium Components
import { Globe } from '@/components/ui/globe'
import { Particles } from '@/components/ui/particles'
import { Meteors } from '@/components/ui/meteors'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { BorderBeamCard } from '@/components/ui/BorderBeam'
import Floating3DAsset from '@/components/ui/Floating3DAsset'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

// ============================================================================
// ANIMATION CONFIG
// ============================================================================

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// ============================================================================
// HERO SECTION - Globe + Particles + Floating Assets
// ============================================================================

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Particles Background - Always Visible */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        staticity={30}
        color="#10b981"
      />

      {/* Meteors Effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Meteors number={20} />
      </div>

      {/* Floating 3D Assets - Higher Opacity */}
      <Floating3DAsset
        src="/images/3d/sparkles_3d.png"
        position="custom"
        positionClassName="top-[5%] left-[5%]"
        size="lg"
        opacity={80}
        animation="float"
        delay={0}
      />
      <Floating3DAsset
        src="/images/3d/star_3d.png"
        position="custom"
        positionClassName="top-[10%] right-[8%]"
        size="xl"
        opacity={90}
        animation="float-rotate"
        delay={0.5}
      />
      <Floating3DAsset
        src="/images/3d/brain_3d.png"
        position="custom"
        positionClassName="bottom-[25%] left-[5%]"
        size="xl"
        opacity={85}
        animation="float"
        delay={1}
      />
      <Floating3DAsset
        src="/images/3d/rocket_3d.png"
        position="custom"
        positionClassName="bottom-[15%] right-[5%]"
        size="2xl"
        opacity={95}
        animation="float-rotate"
        delay={1.5}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 pt-32"
        style={{ opacity, y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <AnimatedShinyText className="px-4 py-2 rounded-full border border-tech-primary/30 bg-tech-glow text-sm">
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI Architect & Music Creator
              </AnimatedShinyText>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]">
              <span className="text-white">Build Your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary via-tech-secondary to-soul-primary">
                Creative Empire
              </span>
            </h1>

            {/* Typing Animation Subheadline */}
            <div className="h-[60px] mb-8">
              <TypingAnimation
                className="text-xl sm:text-2xl text-white/70"
                duration={50}
              >
                AI systems. 10K+ songs. Soul-aligned creation.
              </TypingAnimation>
            </div>

            {/* Description */}
            <p className="text-lg text-white/50 max-w-lg mb-10 leading-relaxed">
              Oracle AI Architect by day, music creator by night. Everything I build
              goes here—open, documented, yours to explore.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <ShimmerButton className="shadow-glow-tech">
                <span className="flex items-center gap-2 text-white font-semibold">
                  Explore My Work
                  <ArrowRight className="w-4 h-4" />
                </span>
              </ShimmerButton>

              <Link
                href="/music-lab"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white/70 hover:text-white border border-white/10 hover:border-tech-primary/40 hover:bg-white/5 transition-all"
              >
                <Play className="w-4 h-4" />
                Listen to Music
              </Link>
            </div>
          </motion.div>

          {/* Right: Interactive Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[400px] lg:h-[500px]"
          >
            <Globe className="w-full h-full" />

            {/* Globe Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-tech-primary/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-tech-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// BENTO GRID SECTION - The Work
// ============================================================================

const bentoItems = [
  {
    title: 'Music Lab',
    subtitle: '10K+ AI Songs',
    description: 'Daily exploration with Suno AI. Ambient, electronic, cinematic—every genre, every mood.',
    href: '/music-lab',
    icon: Music2,
    asset: '/images/3d/music_3d.png',
    variant: 'tech' as const,
    span: 'md:col-span-2 md:row-span-2',
    featured: true,
  },
  {
    title: 'AI Systems',
    subtitle: 'Oracle Architecture',
    description: 'Enterprise-grade agent teams and automation.',
    href: '/about',
    icon: Brain,
    asset: '/images/3d/brain_3d.png',
    variant: 'soul' as const,
  },
  {
    title: 'Prompt Library',
    subtitle: '50+ Prompts',
    description: 'Battle-tested prompts for every AI tool.',
    href: '/prompt-library',
    icon: Wand2,
    asset: '/images/3d/magic_wand_3d.png',
    variant: 'tech' as const,
  },
  {
    title: 'Learning Paths',
    subtitle: 'Free Courses',
    description: 'Curated resources from Oracle, Google, MIT.',
    href: '/students',
    icon: BookOpen,
    asset: '/images/3d/lightbulb_3d.png',
    variant: 'soul' as const,
  },
  {
    title: 'Creation Chronicles',
    subtitle: 'Building in Public',
    description: 'Watch the messy process unfold. Workflows, decisions, iterations.',
    href: '/creation-chronicles',
    icon: Code2,
    asset: '/images/3d/rocket_3d.png',
    variant: 'tech' as const,
    span: 'md:col-span-2',
  },
]

function BentoGridSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-void">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-tech-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-soul-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tech-primary/30 bg-tech-glow mb-6">
            <Zap className="w-4 h-4 text-tech-primary" />
            <span className="text-xs font-mono text-tech-primary uppercase tracking-wider">The Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Four Areas of Exploration
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Music. Systems. Tools. Process. All documented, all open.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {bentoItems.map((bento, index) => (
            <motion.div
              key={bento.title}
              variants={item}
              className={bento.span || ''}
            >
              <Link href={bento.href} className="block h-full">
                <BorderBeamCard
                  variant={bento.variant}
                  beamDuration={12 + index * 2}
                  className={`h-full group ${bento.featured ? 'min-h-[400px]' : 'min-h-[200px]'}`}
                >
                  <div className="relative h-full p-6 flex flex-col">
                    {/* Floating 3D Asset */}
                    <Floating3DAsset
                      src={bento.asset}
                      position="top-right"
                      size={bento.featured ? '2xl' : 'xl'}
                      opacity={bento.featured ? 100 : 80}
                      animation="float"
                    />

                    {/* Content */}
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl ${
                          bento.variant === 'tech' ? 'bg-tech-glow' : 'bg-soul-glow'
                        }`}>
                          <bento.icon className={`w-5 h-5 ${
                            bento.variant === 'tech' ? 'text-tech-primary' : 'text-soul-primary'
                          }`} />
                        </div>
                        <span className={`text-xs font-mono px-2 py-1 rounded-full ${
                          bento.variant === 'tech'
                            ? 'bg-tech-glow text-tech-primary'
                            : 'bg-soul-glow text-soul-primary'
                        }`}>
                          {bento.subtitle}
                        </span>
                      </div>

                      <h3 className={`font-bold text-white mb-2 group-hover:text-white transition-colors ${
                        bento.featured ? 'text-2xl md:text-3xl' : 'text-xl'
                      }`}>
                        {bento.title}
                      </h3>

                      <p className={`text-white/50 leading-relaxed group-hover:text-white/70 transition-colors ${
                        bento.featured ? 'text-base md:text-lg' : 'text-sm'
                      }`}>
                        {bento.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-tech-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </BorderBeamCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS SECTION - Glassmorphic Cards
// ============================================================================

const stats = [
  { icon: Music2, value: '10K+', label: 'Songs Created', color: 'tech' },
  { icon: Users, value: '50+', label: 'AI Prompts', color: 'soul' },
  { icon: GlobeIcon, value: 'Oracle', label: 'AI Architect', color: 'tech' },
  { icon: Star, value: '4.9', label: 'Creator Rating', color: 'soul' },
]

function StatsSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-space">
      {/* Quote */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-white/60 leading-relaxed">
          "I create to understand. I share to teach. I explore because the universe is too interesting not to."
        </blockquote>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <GlassmorphicCard
              variant="premium"
              gradient="aurora"
              border="subtle"
              hover
              className="h-full"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <stat.icon className={`w-8 h-8 mb-4 ${
                  stat.color === 'tech' ? 'text-tech-primary' : 'text-soul-primary'
                }`} />
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                  stat.color === 'tech' ? 'text-tech-primary' : 'text-soul-primary'
                }`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ============================================================================
// QUICK START SECTION
// ============================================================================

const quickPaths = [
  {
    title: 'Create AI Music',
    description: 'Generate your first song with Suno in 5 minutes',
    href: '/music-lab',
    time: '5 min',
    color: 'tech',
    asset: '/images/3d/music_3d.png',
  },
  {
    title: 'Browse Prompts',
    description: '50+ prompts for writing, coding, and creation',
    href: '/prompt-library',
    time: 'Browse',
    color: 'soul',
    asset: '/images/3d/magic_wand_3d.png',
  },
  {
    title: 'Free AI Courses',
    description: 'Curated paths from Oracle, Google, MIT',
    href: '/students',
    time: 'Free',
    color: 'tech',
    asset: '/images/3d/lightbulb_3d.png',
  },
]

function QuickStartSection() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-void border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tech-primary/30 bg-tech-glow mb-6">
            <Rocket className="w-4 h-4 text-tech-primary" />
            <span className="text-xs font-mono text-tech-primary uppercase tracking-wider">Quick Start</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Start creating in minutes
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {quickPaths.map((path, index) => (
            <motion.div key={path.title} variants={item}>
              <Link href={path.href} className="block h-full">
                <BorderBeamCard
                  variant={path.color === 'tech' ? 'tech' : 'soul'}
                  beamDuration={15 + index * 3}
                  className="h-full group"
                >
                  <div className="relative p-6">
                    {/* 3D Asset */}
                    <Floating3DAsset
                      src={path.asset}
                      position="top-right"
                      size="lg"
                      opacity={90}
                      animation="float"
                    />

                    {/* Badge */}
                    <span className={`inline-block text-xs font-mono px-3 py-1 rounded-full mb-4 ${
                      path.color === 'tech'
                        ? 'bg-tech-glow text-tech-primary'
                        : 'bg-soul-glow text-soul-primary'
                    }`}>
                      {path.time}
                    </span>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-tech-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-sm text-white/50">{path.description}</p>

                    {/* Arrow */}
                    <div className="flex justify-end mt-4">
                      <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-tech-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </BorderBeamCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTASection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden bg-void">
      {/* Background Assets */}
      <Floating3DAsset
        src="/images/3d/gem_3d.png"
        position="custom"
        positionClassName="top-[10%] left-[10%]"
        size="xl"
        opacity={60}
        animation="float-rotate"
      />
      <Floating3DAsset
        src="/images/3d/crystal_ball_3d.png"
        position="custom"
        positionClassName="bottom-[15%] right-[10%]"
        size="2xl"
        opacity={70}
        animation="float"
      />

      {/* Particles */}
      <Particles
        className="absolute inset-0"
        quantity={50}
        color="#f59e0b"
        staticity={50}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Start where you are.
        </h2>
        <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
          Learning AI, creating music, or building systems—there's something here for you.
          All of it is open.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ShimmerButton className="shadow-glow-tech">
            <span className="flex items-center gap-2 text-white font-semibold px-4">
              Pick Your Path
              <ArrowRight className="w-4 h-4" />
            </span>
          </ShimmerButton>

          <Link
            href="/resources"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white/60 hover:text-white border border-white/10 hover:border-soul-primary/40 hover:bg-white/5 transition-all"
          >
            Browse Resources
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HomePageV1() {
  return (
    <main className="min-h-screen bg-void text-white overflow-x-hidden">
      {/* Scroll Progress */}
      <ScrollProgress />

      <HeroSection />
      <BentoGridSection />
      <StatsSection />
      <QuickStartSection />
      <FinalCTASection />
    </main>
  )
}

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-tech-primary via-tech-secondary to-soul-primary origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
