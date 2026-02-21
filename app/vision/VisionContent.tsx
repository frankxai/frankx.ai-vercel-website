'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Zap,
  Music,
  BookOpen,
  Code2,
  Users,
  Globe,
  Target,
  Rocket,
  Sparkles,
  Building2,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import EcosystemVisionBoard from '@/components/vision/EcosystemVisionBoard'

/* ─── Animation Presets ─── */
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
}

/* ─── Data ─── */
const visionPillars = [
  {
    icon: Code2,
    title: 'AI Architecture',
    description:
      'Enterprise-grade AI systems that actually work. Oracle Cloud, agentic orchestration, multi-agent workflows — built for production, not demos.',
    color: 'from-emerald-400 to-cyan-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
    metrics: ['22 ACOS Skills', '8 Specialist Agents', 'Production Systems'],
  },
  {
    icon: Music,
    title: 'Creative Production',
    description:
      'AI music, generative art, book publishing — proving that one person with the right tools can out-create entire studios.',
    color: 'from-violet-400 to-pink-400',
    borderColor: 'border-violet-500/20',
    bgColor: 'bg-violet-500/5',
    metrics: ['12,000+ AI Songs', '7 Books Written', 'Visual Art System'],
  },
  {
    icon: Zap,
    title: 'Products & Tools',
    description:
      'Templates, agents, workflows, and systems that create real value for real builders. Not theory — deployed infrastructure.',
    color: 'from-amber-400 to-orange-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
    metrics: ['Template Shop Live', 'Deploy Pipelines', 'Investor Intelligence'],
  },
  {
    icon: BookOpen,
    title: 'Knowledge Sharing',
    description:
      'Blog posts, books, and courses that teach without preaching. Practical insights from someone who builds every day.',
    color: 'from-cyan-400 to-blue-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    metrics: ['80+ Articles', 'The Great Transition', 'Golden Age Book'],
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'A network of builders who hold each other to a higher standard. No hype, no guru culture — just people who ship.',
    color: 'from-pink-400 to-rose-400',
    borderColor: 'border-pink-500/20',
    bgColor: 'bg-pink-500/5',
    metrics: ['Inner Circle', 'Builder Network', 'Open Source Tools'],
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description:
      'Making enterprise-level AI accessible to independent builders. Democratizing the tools that used to cost millions.',
    color: 'from-blue-400 to-indigo-400',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
    metrics: ['frankx.ai Live', 'Open Frameworks', 'Builder-First'],
  },
]

const timeline = [
  {
    period: '2025',
    label: 'Foundation',
    items: [
      'frankx.ai launched and live',
      'First 80+ blog articles published',
      'AI music catalog started (12,000+ tracks)',
      'ACOS v1 — first autonomous coding system',
      'Arcanea mythology and creative universe born',
    ],
    status: 'complete' as const,
  },
  {
    period: '2026 Q1',
    label: 'Acceleration',
    items: [
      'Books published: Great Transition, Golden Age, Soulbook',
      'Template shop with affiliate revenue',
      'Investor Intelligence vertical launched',
      'ACOS v10 — autonomous intelligence with safety',
      'Starlight Intelligence System v4.0',
    ],
    status: 'active' as const,
  },
  {
    period: '2026 Q2-Q3',
    label: 'Scale',
    items: [
      'First courses live with real enrollment',
      'Community platform for builders',
      'First $10k/month from products',
      'Speaking engagements and visibility',
      'AI music distribution deal',
    ],
    status: 'upcoming' as const,
  },
  {
    period: '2027',
    label: 'Compound',
    items: [
      '10,000+ builders using FrankX tools',
      'Enterprise consulting practice',
      'The ecosystem becomes self-sustaining',
      'Book deals and wider reach',
      'Proving the solo builder thesis at scale',
    ],
    status: 'future' as const,
  },
]

const statusColors = {
  complete: 'bg-emerald-500',
  active: 'bg-amber-500 animate-pulse',
  upcoming: 'bg-cyan-500/60',
  future: 'bg-white/20',
}

const ecosystemNodes = [
  { label: 'Blog', href: '/blog', group: 'content' },
  { label: 'Music', href: '/music', group: 'creative' },
  { label: 'Books', href: '/books', group: 'content' },
  { label: 'Products', href: '/products', group: 'products' },
  { label: 'Shop', href: '/shop', group: 'products' },
  { label: 'ACOS', href: '/products/agentic-creator-os', group: 'systems' },
  { label: 'Vibe OS', href: '/vibe', group: 'systems' },
  { label: 'Courses', href: '/courses', group: 'content' },
  { label: 'Soulbook', href: '/soulbook', group: 'creative' },
  { label: 'Arcanea', href: '/arcanea', group: 'creative' },
  { label: 'Research', href: '/research', group: 'systems' },
  { label: 'Design Lab', href: '/design-lab', group: 'creative' },
  { label: 'Investor Intel', href: '/investor', group: 'products' },
  { label: 'Templates', href: '/shop/templates', group: 'products' },
  { label: 'Inner Circle', href: '/inner-circle', group: 'community' },
  { label: 'Vault', href: '/vault', group: 'creative' },
]

const groupColors: Record<string, string> = {
  content: 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10',
  creative: 'border-violet-500/40 text-violet-300 hover:bg-violet-500/10',
  products: 'border-amber-500/40 text-amber-300 hover:bg-amber-500/10',
  systems: 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10',
  community: 'border-pink-500/40 text-pink-300 hover:bg-pink-500/10',
}

/* ─── Background ─── */
function VisionBackground() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute -left-80 top-0 h-[800px] w-[800px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.2, 0.28, 0.2] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        className="absolute -right-60 top-1/4 h-[600px] w-[600px] rounded-full opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1.05, 1, 1.05], opacity: [0.15, 0.22, 0.15] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 16, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full opacity-12"
        style={{
          background:
            'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.12, 0.18, 0.12] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 18, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </div>
  )
}

/* ─── Main Component ─── */
export default function VisionContent() {
  return (
    <div className="relative min-h-screen text-white">
      <VisionBackground />

      {/* ═══════════════════════════════════════════════
          HERO — The North Star
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
        {/* Shinkami — meta-consciousness, the vision apex */}
        <div className="pointer-events-none absolute right-6 top-28 hidden w-52 opacity-12 lg:block xl:w-64">
          <Image src="/images/team/shinkami.png" alt="" width={256} height={256} className="object-contain" aria-hidden="true" />
        </div>
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
              <Target className="h-4 w-4" />
              The Vision
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white/80 bg-clip-text text-transparent">
              Build what used to
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              require an army.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            One person. Enterprise-grade AI architecture. 12,000+ songs. 7 books.
            Production systems. An entire creative ecosystem — built not to be
            impressive, but to prove what&apos;s now possible for anyone willing
            to build.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <Link
              href="/start"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10"
            >
              Start Here
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/30 hover:bg-white/5"
            >
              About Frank
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ HERO IMAGE ═══════════════ */}
      <motion.div
        className="relative mx-auto max-w-6xl px-6"
        {...fadeUp}
      >
        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <Image
            src="/images/vision/hero-builder-empire.png"
            alt="A builder standing on a glass platform overlooking an interconnected digital cityscape — one person, infinite leverage"
            width={1376}
            height={768}
            className="w-full"
            priority
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          PERSONAL VISION — Who I'm Becoming
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div {...fadeUp}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70">
              Personal Vision
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Who I&apos;m building toward
            </h2>
          </motion.div>

          <motion.div
            className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm md:p-12"
            {...fadeUp}
          >
            <blockquote className="text-lg leading-relaxed text-white/75 md:text-xl md:leading-relaxed">
              <p>
                I&apos;m building the most comprehensive AI architecture practice
                that bridges enterprise systems and creative production. Not to
                be famous. Not to be a guru. To prove that{' '}
                <span className="font-semibold text-white">
                  one person with the right tools, taste, and work ethic can build
                  what used to require an army.
                </span>
              </p>
              <p className="mt-6">
                Every song I produce, every system I ship, every article I write
                — it all serves the same thesis: we&apos;re in a window of
                leverage that has never existed before and won&apos;t last
                forever. The people who build now will own the next decade.
              </p>
              <p className="mt-6">
                This isn&apos;t about hustle culture. It&apos;s about{' '}
                <span className="font-semibold text-emerald-300">
                  craftsmanship at the intersection of technology and creativity.
                </span>{' '}
                Enterprise architecture thinking applied to one-person
                operations. Production-grade systems that serve real people.
              </p>
            </blockquote>

            <div className="mt-10 flex items-center gap-4 border-t border-white/[0.06] pt-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <div>
                <p className="font-semibold text-white">Frank Riemer</p>
                <p className="text-sm text-white/50">
                  AI Architect &middot; Creator &middot; Builder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          THE THESIS — The Great Transition
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div className="text-center" {...fadeUp}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/70">
              The Builder&apos;s Thesis
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              The Great Transition
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/55">
              We&apos;re living through the greatest leverage shift in human
              history.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Building2,
                stat: '$0 → $14k MRR',
                title: 'The Old Barriers Are Gone',
                body: 'Tools that cost millions five years ago now cost $20/month. The capital requirement for building a real business has collapsed to nearly zero.',
                color: 'text-emerald-400',
              },
              {
                icon: Lightbulb,
                stat: '29.8M Solo Businesses',
                title: 'Individuals Are Winning',
                body: "One-person companies are generating real revenue. Not freelancing — building products that compound. The leverage available to a single focused builder is unprecedented.",
                color: 'text-cyan-400',
              },
              {
                icon: Rocket,
                stat: 'Infinite Leverage',
                title: 'The Window Is Now',
                body: "The people building today will own the infrastructure of tomorrow. This isn't hype — it's structural. The gap between what one person can build now versus five years ago is 100x.",
                color: 'text-violet-400',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-colors hover:border-white/[0.1] hover:bg-white/[0.035]"
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <card.icon className={`h-6 w-6 ${card.color}`} />
                <p className={`mt-4 text-2xl font-bold ${card.color}`}>
                  {card.stat}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-10 text-center" {...fadeUp}>
            <Link
              href="/blog/the-great-transition"
              className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Read the full thesis
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ COMMUNITY IMAGE ═══════════════ */}
      <motion.div
        className="relative mx-auto max-w-6xl px-6 py-4"
        {...fadeUp}
      >
        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <Image
            src="/images/vision/community-builders.png"
            alt="Holographic builders connected by light streams on a glass platform — a collaborative network of creators"
            width={1376}
            height={768}
            className="w-full"
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          COMMUNITY VISION — Builders Who Ship
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div {...fadeUp}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70">
              Community Vision
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              A network of builders,{' '}
              <span className="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
                not followers
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm md:p-12"
            {...fadeUp}
          >
            <p className="text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed">
              Every builder in this community has the same advantage:{' '}
              <span className="font-semibold text-white">
                they see what&apos;s happening before others do.
              </span>{' '}
              They&apos;re not waiting for permission. They&apos;re shipping
              products, creating music, writing books, and building businesses —
              while most people are still debating whether AI will take their
              jobs.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed">
              This isn&apos;t a community that sells dreams. It&apos;s a
              community that{' '}
              <span className="font-semibold text-violet-300">
                ships reality.
              </span>{' '}
              No guru culture. No empty promises. Just people who build, share
              what works, and hold each other to a higher standard.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: 'Principle', value: 'Ship > Talk' },
                { label: 'Standard', value: 'Craft > Speed' },
                { label: 'Culture', value: 'Results > Hype' },
                { label: 'Method', value: 'Build > Debate' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center"
                >
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/90">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GOLDEN AGE IMAGE ═══════════════ */}
      <motion.div
        className="relative mx-auto max-w-6xl px-6 py-4"
        {...fadeUp}
      >
        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <Image
            src="/images/vision/golden-age-horizon.png"
            alt="Crystal towers growing from the earth toward a golden horizon — technology and nature merging in the Golden Age"
            width={1376}
            height={768}
            className="w-full"
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          WORLD VISION — The Golden Age
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/8 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div {...fadeUp}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/70">
              World Vision
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              The Golden Age of Intelligence
            </h2>
            <div className="mx-auto mt-10 max-w-3xl">
              <p className="text-lg leading-relaxed text-white/65 md:text-xl md:leading-relaxed">
                We&apos;re not predicting the future — we&apos;re building it.
                The tools exist. The barriers are gone. The only question left is
                who decides to build and who decides to wait.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-white/65 md:text-xl md:leading-relaxed">
                This is the era where{' '}
                <span className="font-semibold text-amber-300">
                  individual creators become more powerful than mid-size
                  companies.
                </span>{' '}
                Where a single person with taste, drive, and AI leverage can
                build products that serve millions. Where the old gatekeepers
                lose their grip and the builders inherit the economy.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-white/65 md:text-xl md:leading-relaxed">
                FrankX exists to prove this thesis — not with theory, but with
                results. Every product shipped, every song released, every
                article published is evidence that the future belongs to
                builders.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VISION PILLARS — What We're Building
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div className="text-center" {...fadeUp}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
              Vision Pillars
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Six pillars of execution
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/50">
              Every pillar compounds. Architecture informs products. Products
              generate content. Content builds community. Community drives
              impact.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visionPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className={`group rounded-2xl border ${pillar.borderColor} ${pillar.bgColor} p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]`}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.color} text-white`}
                >
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {pillar.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {pillar.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ECOSYSTEM IMAGE ═══════════════ */}
      <motion.div
        className="relative mx-auto max-w-6xl px-6 py-4"
        {...fadeUp}
      >
        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <Image
            src="/images/vision/ecosystem-constellation.png"
            alt="A constellation of interconnected glowing nodes in deep space — emerald, violet, amber, cyan representing the FrankX ecosystem"
            width={1376}
            height={768}
            className="w-full"
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          ECOSYSTEM MAP — How It All Connects
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/8 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div className="text-center" {...fadeUp}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/70">
              The Ecosystem
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Everything connects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/50">
              Not a collection of random projects — a deliberate ecosystem where
              each piece amplifies the others.
            </p>
          </motion.div>

          <motion.div
            className="mt-14 flex flex-wrap justify-center gap-3"
            {...fadeUp}
          >
            {ecosystemNodes.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <Link
                  href={node.href}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${groupColors[node.group]}`}
                >
                  {node.label}
                  <ArrowUpRight className="h-3 w-3 opacity-50" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Legend */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-white/40"
            {...fadeUp}
          >
            {[
              { color: 'bg-cyan-400', label: 'Content' },
              { color: 'bg-violet-400', label: 'Creative' },
              { color: 'bg-amber-400', label: 'Products' },
              { color: 'bg-emerald-400', label: 'Systems' },
              { color: 'bg-pink-400', label: 'Community' },
            ].map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${item.color}`} />
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ECOSYSTEM VISION BOARD — The Ecosystem in Pictures
          ═══════════════════════════════════════════════ */}
      <EcosystemVisionBoard />

      {/* ═══════════════════════════════════════════════
          TIMELINE — The Path Forward
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div {...fadeUp}>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
              Timeline
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              The path forward
            </h2>
          </motion.div>

          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-transparent md:left-[23px]" />

            <div className="space-y-12">
              {timeline.map((phase, i) => (
                <motion.div
                  key={phase.period}
                  className="relative pl-12 md:pl-16"
                  {...stagger}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {/* Status dot */}
                  <div
                    className={`absolute left-2.5 top-1.5 h-4 w-4 rounded-full border-2 border-[#030712] ${statusColors[phase.status]} md:left-3`}
                  />

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg font-bold text-white md:text-xl">
                        {phase.period}
                      </span>
                      <span className="text-sm font-medium text-white/40">
                        {phase.label}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-white/55"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NORTH STAR QUOTE
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/8 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div {...fadeUp}>
            <Sparkles className="mx-auto h-8 w-8 text-emerald-400/60" />
            <blockquote className="mt-8 text-2xl font-light leading-relaxed text-white/80 md:text-4xl md:leading-snug">
              &ldquo;The future doesn&apos;t belong to the biggest companies or the
              loudest voices. It belongs to the{' '}
              <span className="font-semibold text-white">
                builders who ship.
              </span>
              &rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-white/40">
              — The thesis behind everything we build
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Join the Movement
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Ready to build?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/55">
              Join builders who are already shipping products, creating with AI,
              and owning what they build. No fluff. Just results.
            </p>
            <div className="mx-auto mt-10 max-w-md">
              <EmailSignup
                buttonText="Join the Builders"
                placeholder="your@email.com"
              />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                Explore the ecosystem
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                Read the blog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                Browse products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
