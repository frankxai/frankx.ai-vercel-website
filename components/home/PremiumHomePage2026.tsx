'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import {
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Disc3,
  ExternalLink,
  Layers3,
  Mail,
  Music2,
  Orbit,
  PlayCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Volume2,
  Workflow,
  Zap,
} from 'lucide-react'

interface LatestPost {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
  date: string
  image?: string
}

interface FAQItem {
  question: string
  answer: string
}

export interface FeaturedTrackData {
  id: string
  title: string
  sunoId: string
  audioUrl: string
  genre: string[]
  plays: number
  duration: string
}

interface LibraryBookData {
  slug: string
  title: string
  author: string
  coverImage: string
  quoteCount: number
  chapterCount: number
}

interface PremiumHomePage2026Props {
  latestPosts?: LatestPost[]
  faqs?: FAQItem[]
  featuredTrack: FeaturedTrackData
  libraryBooks?: LibraryBookData[]
}

const CommandCoreScene = dynamic(() => import('@/components/home/CommandCoreScene'), {
  ssr: false,
  loading: () => <CommandCoreFallback />,
})

const proofSignals = [
  {
    label: 'AI architecture',
    value: 'Former Oracle AI architect',
    icon: ShieldCheck,
  },
  {
    label: 'Suno production',
    value: '12,000+ tracks shipped',
    icon: Disc3,
  },
  {
    label: 'Creator OS',
    value: '75+ skills, 38 agents',
    icon: Workflow,
  },
]

const operatingLayers = [
  {
    title: 'Agent command',
    body: 'Claude Code, Codex, skills, and repo harnesses arranged as a repeatable production surface.',
    icon: TerminalSquare,
    accent: 'text-emerald-300',
  },
  {
    title: 'Music and signal',
    body: 'Suno workflows, prompt systems, listening notes, and release mechanics treated as one creative loop.',
    icon: Radio,
    accent: 'text-cyan-300',
  },
  {
    title: 'Revenue routes',
    body: 'Creator offers, launch assets, partner surfaces, and automation rails connected to measurable outcomes.',
    icon: Layers3,
    accent: 'text-amber-300',
  },
  {
    title: 'Proof library',
    body: 'Field notes, books, tutorials, and architecture guides that turn experiments into reusable assets.',
    icon: BookOpen,
    accent: 'text-rose-300',
  },
]

const signalSteps = [
  {
    step: '01',
    title: 'Catch the signal',
    body: 'A raw idea, client pattern, track texture, or repo bottleneck becomes a named object instead of a loose note.',
    icon: Orbit,
  },
  {
    step: '02',
    title: 'Route the agent stack',
    body: 'Specialized agents, skills, and checks get selected for the work instead of one generic prompt doing everything.',
    icon: Boxes,
  },
  {
    step: '03',
    title: 'Produce the artifact',
    body: 'The system ships something concrete: a page, guide, song, workflow, product surface, or operating brief.',
    icon: Zap,
  },
  {
    step: '04',
    title: 'Publish the loop',
    body: 'The output becomes a page, offer, email, repository asset, or learning object with a route back into the system.',
    icon: CheckCircle2,
  },
]

const designOptions = [
  {
    href: '/design-lab/frankx-homepage-command-room',
    title: 'Command Room',
    label: 'Production direction',
    body: 'Executive-grade homepage with the 3D command core, Suno mission soundtrack, and GSAP signal stack.',
  },
  {
    href: '/design-lab/frankx-homepage-signal-cortex',
    title: 'Signal Cortex',
    label: 'Research direction',
    body: 'More neural, more diagnostic, with scroll states arranged like a living intelligence map.',
  },
  {
    href: '/design-lab/frankx-homepage-sonic-os',
    title: 'Sonic OS',
    label: 'Music-first direction',
    body: 'Vibe OS leads the story, with waveform choreography and creator workflow proof underneath.',
  },
]

function CommandCoreFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-300/30" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-300/30" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-cyan-300/30 bg-cyan-300/5" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-emerald-300/40 bg-emerald-300/10" />
    </div>
  )
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.78, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function HeroSection({ featuredTrack }: { featuredTrack: FeaturedTrackData }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-18 lg:pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.55),rgba(10,10,11,1)_82%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-[8px] border border-emerald-300/25 bg-emerald-300/8 px-3 py-2 text-sm text-emerald-100">
            <Volume2 className="h-4 w-4" aria-hidden />
            Vibe O S restored as the mission soundtrack
          </div>

          <h1 className="font-display text-5xl font-bold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            FrankX
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/78 sm:text-2xl sm:leading-9">
            AI systems, music, and revenue loops for builders who want a sharper way
            to ship with agents.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/58 sm:text-lg">
            Design the agent layer, score the music system, and turn useful
            experiments into products, guides, and operating loops.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/start"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Start here
            </Link>
            <Link
              href="#mission-soundtrack"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/45 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <PlayCircle className="h-4 w-4" aria-hidden />
              Hear {featuredTrack.title}
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {proofSignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4"
              >
                <signal.icon className="mb-4 h-5 w-5 text-cyan-200" aria-hidden />
                <p className="text-sm text-white/45">{signal.label}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-white/88">{signal.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[680px]">
          <div className="absolute inset-x-0 top-0 h-[360px] sm:h-[480px] lg:h-[540px]">
            <CommandCoreScene reducedMotion={Boolean(shouldReduceMotion)} />
            <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-emerald-300/45 to-transparent" />
            <div className="absolute left-0 top-10 rounded-[8px] border border-white/10 bg-black/45 px-3 py-2 text-xs text-white/70 backdrop-blur-md">
              agent route
            </div>
            <div className="absolute right-0 top-28 rounded-[8px] border border-white/10 bg-black/45 px-3 py-2 text-xs text-white/70 backdrop-blur-md">
              sound layer
            </div>
            <div className="absolute bottom-24 left-10 rounded-[8px] border border-white/10 bg-black/45 px-3 py-2 text-xs text-white/70 backdrop-blur-md">
              revenue loop
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0" id="mission-soundtrack">
            <SoundtrackPanel featuredTrack={featuredTrack} compact />
          </div>
        </div>
      </div>
    </section>
  )
}

function SoundtrackPanel({
  featuredTrack,
  compact = false,
}: {
  featuredTrack: FeaturedTrackData
  compact?: boolean
}) {
  return (
    <div className="rounded-[8px] border border-cyan-300/18 bg-[#071012]/92 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Music2 className="h-4 w-4 shrink-0 text-cyan-200" aria-hidden />
            <span className="truncate">{featuredTrack.title}</span>
          </div>
          <p className="mt-1 text-xs text-white/48">
            {featuredTrack.genre.join(' / ')} / {featuredTrack.duration}
          </p>
        </div>
        <a
          href={featuredTrack.audioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-[8px] border border-white/12 px-3 text-xs font-medium text-white/78 transition hover:border-emerald-300/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          MP3
        </a>
      </div>
      <iframe
        title={`${featuredTrack.title} on Suno`}
        src={`https://suno.com/embed/${featuredTrack.sunoId}`}
        className={`w-full rounded-[8px] border-0 bg-black ${compact ? 'h-[238px] sm:h-[296px]' : 'h-[314px] sm:h-[352px]'}`}
        loading="lazy"
        allow="encrypted-media; clipboard-write; picture-in-picture"
      />
    </div>
  )
}

function OperatingLayersSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-emerald-200">Operating architecture</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Four layers, one production surface.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/62">
            FrankX connects the practical layers that usually live apart: agents,
            sound, proof, and commerce routes working together.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {operatingLayers.map((layer, index) => (
            <Reveal key={layer.title} delay={index * 0.06}>
              <div className="h-full rounded-[8px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]">
                <layer.icon className={`h-6 w-6 ${layer.accent}`} aria-hidden />
                <h3 className="mt-8 text-xl font-semibold text-white">{layer.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/58">{layer.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function SignalStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) return

    let context: { revert: () => void } | undefined
    let isMounted = true

    async function initScrollMotion() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      if (!isMounted || !sectionRef.current) return

      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-signal-card]')
        gsap.fromTo(
          cards,
          { opacity: 0.36, y: 52, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              end: 'bottom 42%',
              scrub: 0.65,
            },
          }
        )

        gsap.fromTo(
          '[data-signal-line]',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 68%',
              end: 'bottom 48%',
              scrub: 0.6,
            },
          }
        )
      }, sectionRef)
    }

    void initScrollMotion()

    return () => {
      isMounted = false
      context?.revert()
    }
  }, [shouldReduceMotion])

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,185,129,0.08),transparent_28%,rgba(67,191,227,0.07)_68%,transparent)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-cyan-200">Signal stack</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Signal becomes ship-ready work.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/62">
            One clear sequence maps the production logic: raw signal, agent route,
            artifact, and publishing loop.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-6 right-6 top-10 hidden h-px bg-white/10 lg:block">
            <div data-signal-line className="h-px w-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300" />
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {signalSteps.map((item) => (
              <div
                key={item.step}
                data-signal-card
                className="relative rounded-[8px] border border-white/10 bg-black/45 p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-white/12 bg-white/8">
                  <item.icon className="h-5 w-5 text-white" aria-hidden />
                </div>
                <p className="mt-10 font-mono text-xs text-emerald-200">{item.step}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/58">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SonicLayerSection({ featuredTrack }: { featuredTrack: FeaturedTrackData }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold text-amber-200">Sonic layer</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Music belongs in the system, not as an afterthought.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/62">
            Vibe O S becomes the active soundtrack for the FrankX command layer:
            a live Suno artifact, a direct audio fallback, and a clear route from
            prompt texture to production system.
          </p>
          <div className="mt-8 space-y-4">
            {[
              'Sound enters by choice, never by surprise.',
              'The embed sits beside the command surface, so music and systems read as one identity.',
              'The direct MP3 fallback keeps the artifact reachable if the third-party embed is unavailable.',
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-white/64">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SoundtrackPanel featuredTrack={featuredTrack} />
        </Reveal>
      </div>
    </section>
  )
}

function FounderProofSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]">
            <Image
              src="/images/portraits/frank-presenting-oracle-2025.jpg"
              alt="Frank Riemer presenting at Oracle"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-sm font-semibold text-emerald-200">Human proof</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Keep the authority. Upgrade the surface around it.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/62">
            Frank stays visible as the operator behind the system: AI architecture,
            creator tooling, and music experiments with a human proof point in the frame.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['AI systems', 'Creator tooling', 'Music experiments'].map((item) => (
              <div key={item} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm font-medium text-white/80">
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DesignLabSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-cyan-200">Design lab</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Three homepage directions are live.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/62">
            Command Room ships as the production direction. Signal Cortex and Sonic OS
            remain in the lab for deeper visual expansion.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {designOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="group rounded-[8px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/[0.055] focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <p className="text-sm font-semibold text-white/48">{option.label}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-white">{option.title}</h3>
                <ArrowRight className="h-5 w-5 text-white/52 transition group-hover:translate-x-1 group-hover:text-cyan-200" aria-hidden />
              </div>
              <p className="mt-5 text-sm leading-6 text-white/58">{option.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentSection({
  latestPosts,
  libraryBooks,
}: {
  latestPosts: LatestPost[]
  libraryBooks: LibraryBookData[]
}) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">Latest field notes</h2>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                Blog
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-7 space-y-4">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-[8px] border border-white/8 bg-black/24 p-4 transition hover:border-white/16 hover:bg-white/[0.045]"
                >
                  <p className="text-xs text-emerald-200">{post.category} / {post.readingTime}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-white">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">Library signal</h2>
              <Link href="/library" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                Library
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-7 space-y-4">
              {libraryBooks.slice(0, 4).map((book) => (
                <Link
                  key={book.slug}
                  href={`/library/${book.slug}`}
                  className="grid grid-cols-[56px_1fr] gap-4 rounded-[8px] border border-white/8 bg-black/24 p-3 transition hover:border-white/16 hover:bg-white/[0.045]"
                >
                  <div className="relative h-20 overflow-hidden rounded-[8px] bg-white/5">
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={`${book.title} cover`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <BookOpen className="h-5 w-5 text-white/42" aria-hidden />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white">{book.title}</h3>
                    <p className="mt-1 text-xs text-white/48">{book.author}</p>
                    <p className="mt-3 text-xs text-emerald-200">
                      {book.quoteCount} quotes / {book.chapterCount} chapters
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs.length) return null

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-emerald-200">Answers</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            What FrankX is built for.
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-white/10 rounded-[8px] border border-white/10 bg-white/[0.035]">
          {faqs.slice(0, 4).map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                {faq.question}
                <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition group-open:rotate-90 group-open:text-cyan-200" aria-hidden />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/58">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(67,191,227,0.08),rgba(245,158,11,0.08))] p-8 sm:p-10">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-white/62">Next route</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
                Build the command layer.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/68">
                Start with the public operating system, then follow the field notes as
                the music, agent, and revenue loops keep compounding into products.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/products/agentic-creator-os"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <BrainCircuit className="h-4 w-4" aria-hidden />
                Explore ACOS
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-white/18 bg-black/22 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/34 hover:bg-black/34 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Join newsletter
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function PremiumHomePage2026({
  latestPosts = [],
  faqs = [],
  featuredTrack,
  libraryBooks = [],
}: PremiumHomePage2026Props) {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0b]" data-visual-qa="premium-homepage-2026">
      <HeroSection featuredTrack={featuredTrack} />
      <OperatingLayersSection />
      <SignalStackSection />
      <SonicLayerSection featuredTrack={featuredTrack} />
      <FounderProofSection />
      <DesignLabSection />
      <ContentSection latestPosts={latestPosts} libraryBooks={libraryBooks} />
      <FAQSection faqs={faqs} />
      <FinalCTA />
    </div>
  )
}
