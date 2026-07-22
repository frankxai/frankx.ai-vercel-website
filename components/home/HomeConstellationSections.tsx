'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const situationPaths = [
  {
    signal: 'Founder · operator · AI lead',
    title: 'I am building a company or an AI system.',
    description:
      'The opportunity is real, but the stack is noisy and the cost of a weak decision is high. Start with architecture, operating models, and systems designed around real work.',
    href: '/build',
    action: 'Enter Build',
    className: 'lg:col-span-7',
  },
  {
    signal: 'Creator · author · musician',
    title: 'I want to create and publish with AI.',
    description:
      'Build a body of work without handing your taste, voice, or judgment to the tools.',
    href: '/gencreator',
    action: 'Enter GenCreators',
    className: 'lg:col-span-5',
  },
  {
    signal: 'Learner · student · team',
    title: 'I need a trustworthy learning path.',
    description:
      'Find a useful starting level, then move through guides, courses, books, and practical exercises.',
    href: '/learn',
    action: 'Enter Learn',
    className: 'lg:col-span-4',
  },
  {
    signal: 'Researcher · partner · decision-maker',
    title: 'I need evidence, not another opinion.',
    description:
      'Follow sources, methods, architecture notes, and research that keeps uncertainty visible.',
    href: '/research',
    action: 'Open Research',
    className: 'lg:col-span-4',
  },
  {
    signal: 'Reader · listener · human in motion',
    title: 'I am exploring ideas, music, and a better way to work.',
    description:
      'Move through the music, books, library, personal systems, and field notes at your own pace.',
    href: '/resources',
    action: 'Enter Explore',
    className: 'lg:col-span-4',
  },
]

const primaryWorlds = [
  {
    index: '01',
    title: 'Music',
    href: '/music',
    description: 'Songs, production notes, listening experiences, and the creative practice behind them.',
  },
  {
    index: '02',
    title: 'GenCreators',
    href: '/gencreator',
    description: 'A human-led framework for building a body of work with generative tools.',
  },
  {
    index: '03',
    title: 'Learn',
    href: '/learn',
    description: 'Guides, courses, books, and pathways that meet you at your current level.',
  },
  {
    index: '04',
    title: 'Build',
    href: '/build',
    description: 'AI architecture, agent systems, prototypes, and operating patterns for serious work.',
  },
  {
    index: '05',
    title: 'Explore',
    href: '/resources',
    description: 'Research, tools, experiments, partnerships, and the wider FrankX estate.',
  },
  {
    index: '06',
    title: 'Blog',
    href: '/blog',
    description: 'Current field notes from the architecture desk, studio, library, and workshop.',
  },
]

const supportingWorlds = [
  { label: 'Research Library', href: '/research' },
  { label: 'Guides', href: '/guides' },
  { label: 'Books', href: '/books' },
  { label: 'Library', href: '/library' },
  { label: 'ACOS', href: '/acos' },
  { label: 'Studio', href: '/studio' },
  { label: 'Foundry', href: '/foundry' },
  { label: 'Music Lab', href: '/music-lab' },
  { label: 'Design Lab', href: '/design-lab' },
  { label: 'Intelligence Atlas', href: '/intelligence-atlas' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Resources', href: '/resources' },
]

const humanSystems = [
  {
    title: 'Identity before output',
    description: 'Use AI to extend your range without letting the machine decide who you should become.',
    href: '/gencreator/soul',
    action: 'Explore GenCreator Soul',
  },
  {
    title: 'Attention before acceleration',
    description: 'Design rhythms, environments, and state changes that make clear work possible.',
    href: '/vibe',
    action: 'Explore Vibe OS',
  },
  {
    title: 'A life that can hold the work',
    description: 'Read the books and field notes on purpose, discipline, creativity, hope, and becoming.',
    href: '/books',
    action: 'Browse the books',
  },
  {
    title: 'Ideas that stay useful',
    description: 'Follow the notes, mental models, and reading connections inside the Library OS.',
    href: '/library',
    action: 'Enter the library',
  },
]

export function StartFromSituation() {
  return (
    <section aria-labelledby="situation-heading" className="border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-3 text-xs font-medium tracking-[0.1em] text-emerald-300/60">
            Start from your situation
          </p>
          <h2 id="situation-heading" className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            You do not need to understand the whole constellation.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
            Your business may be moving faster than its systems. AI may be producing more output
            but less clarity. Or you may simply need a place to learn, make, think, and begin again.
            Start with the pressure that is real today.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-12">
          {situationPaths.map((path, index) => (
            <motion.div
              key={path.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={path.className}
            >
              <Link
                href={path.href}
                className="group flex h-full min-h-56 flex-col justify-between rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-emerald-300/25 hover:bg-white/[0.045] sm:p-8"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                    {path.signal}
                  </p>
                  <h3 className="mt-5 max-w-xl text-2xl font-semibold leading-tight text-white">
                    {path.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
                    {path.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                  {path.action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HubConstellation() {
  return (
    <section aria-labelledby="constellation-heading" className="border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="mb-3 text-xs font-medium tracking-[0.1em] text-cyan-300/60">The FrankX constellation</p>
            <h2 id="constellation-heading" className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              One workshop. Many ways into the work.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/50">
              FrankX is intentionally broad: architecture beside music, research beside personal
              systems, practical tools beside long-form thinking. Each world has a purpose; the
              links between them are part of the work.
            </p>
            <a
              href="https://gencreator.ai"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
            >
              Visit the dedicated GenCreator environment
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <p className="mt-2 max-w-sm text-xs leading-5 text-white/30">
              FrankX explains the framework and its place in Frank&apos;s wider body of work.
              GenCreator.ai is the focused stack, research, learning, community, and member world.
            </p>
          </motion.div>

          <div className="border-t border-white/10">
            {primaryWorlds.map((world, index) => (
              <motion.div
                key={world.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  href={world.href}
                  className="group grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[3rem_10rem_1fr_auto] sm:items-center"
                >
                  <span className="font-mono text-[11px] text-white/25">{world.index}</span>
                  <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-emerald-200">
                    {world.title}
                  </h3>
                  <p className="text-sm leading-6 text-white/40">{world.description}</p>
                  <ArrowRight className="hidden h-4 w-4 text-white/25 transition-all group-hover:translate-x-1 group-hover:text-emerald-300 sm:block" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.12em] text-white/30">
            More working worlds
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {supportingWorlds.map((world) => (
              <Link
                key={world.href}
                href={world.href}
                className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-emerald-200"
              >
                {world.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CurrentKnowledge() {
  return (
    <section aria-labelledby="knowledge-heading" className="border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-[linear-gradient(135deg,rgba(16,185,129,0.09),rgba(255,255,255,0.025)_42%,rgba(6,182,212,0.06))]"
        >
          <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/60">
                <span>Featured guide</span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <time dateTime="2026-07-20">Reviewed 20 July 2026</time>
              </div>
              <h2 id="knowledge-heading" className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
                Build an agentic second brain that remains yours.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
                A local-first Obsidian system for turning notes into better decisions and reusable
                context. The guide separates the durable layer—Markdown, links, and recoverable
                history—from replaceable models, MCP servers, and agent clients.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/guides/agentic-obsidian-second-brain"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-semibold text-[#07110d] transition-colors hover:bg-emerald-300"
                >
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/downloads/agentic-obsidian-second-brain-starter-kit-v1.zip"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Download the free starter kit
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">The durable loop</p>
              <ol className="mt-7 space-y-7">
                {[
                  ['01', 'Capture evidence', 'Keep source material, decisions, and context close to the work.'],
                  ['02', 'Connect what matters', 'Use links and properties to make retrieval reliable.'],
                  ['03', 'Create and review', 'Turn memory into an outcome, then write back what changed.'],
                ].map(([index, title, description]) => (
                  <li key={index} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="font-mono text-[11px] text-emerald-300/45">{index}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-white/40">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-white/10 pt-6 text-sm">
                <Link href="/guides" className="inline-flex items-center gap-2 text-white/50 hover:text-white">
                  Browse all maintained guides <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function HumanSystems() {
  return (
    <section aria-labelledby="human-systems-heading" className="border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mb-3 text-xs font-medium tracking-[0.1em] text-amber-300/60">Human systems</p>
            <h2 id="human-systems-heading" className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              The work behind the work.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/50">
              High standards are hard to sustain when attention is fragmented, identity is tied to
              output, and every tool promises more speed. Personal development belongs inside the
              FrankX body of work because the person operating the system still matters most.
            </p>
            <p className="mt-5 font-serif text-lg italic leading-7 text-white/35">
              Build capability. Protect aliveness. Leave room for the person you are becoming.
            </p>
          </motion.div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {humanSystems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Link href={item.href} className="group block py-6 sm:grid sm:grid-cols-[1fr_auto] sm:gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/40">{item.description}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 self-center text-xs font-medium text-amber-200/65 group-hover:text-amber-200 sm:mt-0">
                    {item.action}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function WorkAndConversation() {
  return (
    <section aria-labelledby="conversation-heading" className="border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14"
        >
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.1em] text-cyan-300/60">Work and conversation</p>
            <h2 id="conversation-heading" className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Bring a real problem, a serious idea, or a useful partnership.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/50">
              FrankX is public by default, but some work benefits from a direct conversation:
              founder systems, enterprise AI architecture, speaking, research, licensing, and
              collaborations where the fit is specific and mutual.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-emerald-100"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Founder and enterprise work', '/ai-architecture'],
              ['Partnerships and collaborations', '/partnerships'],
              ['Speaking and media context', '/media-kit'],
              ['Music, content, and system licensing', '/licensing'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/10 px-5 py-4 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                {label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
