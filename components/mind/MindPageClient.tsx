'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import {
  Aperture,
  Archive,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  DraftingCompass,
  Eye,
  Filter,
  GitBranch,
  Mail,
  Repeat2,
  Route,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Workflow,
} from 'lucide-react'

import MindLatticeNoSSR from './MindLatticeNoSSR'

const operatorModules = [
  {
    label: 'Attention Scheduler',
    title: 'Decides what gets compute',
    description:
      'The first bottleneck is not model speed. It is where attention goes, what gets ignored, and what earns a full pass.',
    icon: Aperture,
  },
  {
    label: 'Memory Layer',
    title: 'Keeps context reusable',
    description:
      'Working notes, prompts, examples, decisions, and mistakes become reusable context instead of scattered residue.',
    icon: Archive,
  },
  {
    label: 'Model Updater',
    title: 'Changes beliefs after evidence',
    description:
      'A useful operator updates the map after reality pushes back. Every build, failed test, and awkward result teaches the next move.',
    icon: GitBranch,
  },
  {
    label: 'Taste Filter',
    title: 'Cuts what looks correct but feels empty',
    description:
      'Taste is the quality gate that removes generic output, weak hierarchy, unsupported claims, and pretty noise.',
    icon: Filter,
  },
  {
    label: 'Execution Loop',
    title: 'Turns insight into shipped artifacts',
    description:
      'Capture, compose, build, verify, publish, review. The loop matters because thinking that never ships decays.',
    icon: Repeat2,
  },
]

const storyBeats = [
  {
    id: 'input',
    title: 'Input',
    kicker: 'Noise arrives first',
    text: 'Messages, model releases, half-ideas, client needs, experiments, songs, code, and research all compete for attention.',
    image: '/images/mind/signal-noise-field.png',
    alt: 'A dark signal field with a clear emerald route through scattered graphite fragments.',
  },
  {
    id: 'pattern',
    title: 'Pattern',
    kicker: 'Attention makes a cut',
    text: 'The useful move is not consuming more. It is finding the few signals that deserve context, memory, and follow-through.',
    image: '/images/mind/attention-aperture.png',
    alt: 'A precision aperture aligning scattered glass fragments into a clear route.',
  },
  {
    id: 'system',
    title: 'System',
    kicker: 'Models become structure',
    text: 'Once a pattern repeats, it becomes a protocol, a template, a prompt, a page, an agent skill, or a repo.',
    image: '/images/mind/mental-model-architecture.png',
    alt: 'A black-glass architecture model routing input fragments into a resolved system object.',
  },
  {
    id: 'output',
    title: 'Output',
    kicker: 'Review closes the loop',
    text: 'Shipping is not the end. It gives the mind new evidence: what worked, what felt cheap, what needs another pass.',
    image: '/images/mind/feedback-loop-engine.png',
    alt: 'A compact feedback loop engine on a black workbench with emerald routing and cyan context lines.',
  },
]

const visualFrames = [
  {
    title: 'Cognitive workbench',
    role: 'Hero system',
    image: '/images/mind/mind-hero-cognitive-workbench.png',
    alt: 'A dark cognitive workbench with memory plates, attention lens, and signal routes.',
  },
  {
    title: 'Attention aperture',
    role: 'Focus filter',
    image: '/images/mind/attention-aperture.png',
    alt: 'A cinematic attention aperture aligning signal fragments.',
  },
  {
    title: 'Memory plates',
    role: 'Reusable context',
    image: '/images/mind/memory-vault-plates.png',
    alt: 'Layered glass memory plates with emerald and cyan context routing.',
  },
  {
    title: 'Model architecture',
    role: 'Mental model',
    image: '/images/mind/mental-model-architecture.png',
    alt: 'Graphite architecture model resolving fragments into a system.',
  },
  {
    title: 'Taste calibration',
    role: 'Quality filter',
    image: '/images/mind/taste-calibration-table.png',
    alt: 'A dark calibration table with materials, references, and one selected route.',
  },
  {
    title: 'Signal route',
    role: 'Noise filter',
    image: '/images/mind/signal-noise-field.png',
    alt: 'A dark signal field with a clear emerald route through scattered fragments.',
  },
  {
    title: 'Diagnostic mirror',
    role: 'AI reflection',
    image: '/images/mind/ai-as-mirror.png',
    alt: 'A black-glass diagnostic surface reflecting an abstract system topology.',
  },
  {
    title: 'Feedback engine',
    role: 'Review loop',
    image: '/images/mind/feedback-loop-engine.png',
    alt: 'A compact feedback loop engine with emerald routing and cyan context lines.',
  },
  {
    title: 'Deep work studio',
    role: 'Craft environment',
    image: '/images/mind/deep-work-studio.png',
    alt: 'A quiet dark studio desk with a notebook, screen glow, and signal line.',
    wide: true,
  },
  {
    title: 'System map',
    role: 'Social summary',
    image: '/images/mind/mind-og-system-map.png',
    alt: 'An abstract system map summarizing the mind operating system metaphor.',
    wide: true,
  },
]

const protocols = [
  'Write the problem in plain language before choosing a tool.',
  'Save prompts, outputs, and decisions where future work can reuse them.',
  'Let one strong visual or mechanism carry a page before adding motion.',
  'Run a critic pass before publishing anything meant to build trust.',
  'Review shipped work after reality has touched it, then update the system.',
]

const notThis = [
  'Not therapy or a clinical model.',
  'Not productivity theater.',
  'Not a replacement for judgment.',
  'Not a mystical claim about intelligence.',
  'Not a prompt trick dressed up as philosophy.',
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300/70">
      {children}
    </p>
  )
}

function MindImage({
  src,
  alt,
  priority = false,
  className = '',
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden border border-white/[0.08] bg-white/[0.02] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/34 via-transparent to-transparent" />
    </div>
  )
}

function StaticLatticeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="relative h-[72%] w-[86%]">
        <div className="absolute left-[6%] top-[18%] h-14 w-20 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05]" />
        <div className="absolute left-[6%] top-[44%] h-14 w-20 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05]" />
        <div className="absolute left-[6%] top-[70%] h-14 w-20 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05]" />
        <div className="absolute left-[42%] top-[42%] h-20 w-20 rounded-2xl border border-emerald-300/35 bg-emerald-300/[0.08] shadow-[0_0_48px_rgba(16,185,129,0.12)]" />
        <div className="absolute right-[6%] top-[34%] h-28 w-28 rounded-2xl border border-white/15 bg-white/[0.04]" />
        <div className="absolute left-[18%] right-[22%] top-[50%] h-px bg-gradient-to-r from-cyan-300/40 via-emerald-300/70 to-cyan-300/30" />
        <div className="absolute left-[18%] top-[24%] h-px w-[31%] rotate-[17deg] bg-cyan-300/30" />
        <div className="absolute left-[18%] top-[75%] h-px w-[31%] -rotate-[17deg] bg-cyan-300/30" />
      </div>
    </div>
  )
}

export default function MindPageClient() {
  const reducedMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      <section className="relative min-h-[92svh] overflow-hidden border-b border-white/[0.06]">
        <Image
          src="/images/mind/mind-hero-cognitive-workbench.png"
          alt="A dark cognitive workbench with memory plates, attention lens, and emerald-cyan signal routes."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/78 to-[#0a0a0b]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/42" />

        <div className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="max-w-3xl">
            <Eyebrow>FrankX Mind OS</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              The Mind Is the First Operating System
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Before agents, prompts, and workflows, there is the operator:
              attention, memory, taste, discipline, and feedback loops. This is
              how I keep mine useful while building with AI.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/newsletter"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition hover:-translate-y-0.5 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <Mail className="h-4 w-4" />
                Get the AI Architect dispatch
              </Link>
              <Link
                href="/research/series/architecture-of-intelligence"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/28 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <BookOpen className="h-4 w-4" />
                Read the Architecture of Intelligence
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {['Attention', 'Memory', 'Taste'].map((item) => (
                <div key={item} className="bg-[#0a0a0b]/70 px-4 py-3 backdrop-blur">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/42">{item}</p>
                  <p className="mt-1 text-sm text-white/74">operator layer</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden lg:min-h-[590px]" aria-label="Mind lattice operating diagram">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/35 via-black/10 to-transparent" />
            {reducedMotion ? <StaticLatticeFallback /> : <MindLatticeNoSSR reducedMotion={Boolean(reducedMotion)} />}
            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {['Input', 'Context', 'Review', 'Ship'].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/[0.08] bg-black/35 px-3 py-2 backdrop-blur"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200/62">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <Eyebrow>Operator Stack</Eyebrow>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A practical map for the person running the system.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
                AI tools amplify the operator. They do not remove the need for
                attention, memory, taste, or review. The stack below is the
                human layer I design around.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {operatorModules.map((module) => {
                const Icon = module.icon
                return (
                  <article
                    key={module.label}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/42">
                        {module.label}
                      </p>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-white">{module.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/58">{module.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <Eyebrow>From Noise To Output</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The useful mind turns fragments into artifacts.
            </h2>
          </div>
          <div className="mt-12 grid gap-6">
            {storyBeats.map((beat, index) => (
              <article
                key={beat.id}
                className="grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] lg:grid-cols-[0.82fr_1.18fr]"
              >
                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-200/56">
                    {String(index + 1).padStart(2, '0')} / {beat.kicker}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{beat.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/62">{beat.text}</p>
                </div>
                <MindImage src={beat.image} alt={beat.alt} className="min-h-[280px] lg:min-h-[390px]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <Eyebrow>Visual System</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ten images, one operating metaphor.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62">
              Each frame carries one role: focus, memory, architecture, taste,
              reflection, feedback, or studio context. The images are not
              decorative mood. They explain the page.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {visualFrames.map((frame) => (
              <article
                key={frame.title}
                className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] ${frame.wide ? 'xl:col-span-2' : ''}`}
              >
                <MindImage src={frame.image} alt={frame.alt} className="aspect-[4/3]" />
                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200/54">
                    {frame.role}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{frame.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
          <MindImage
            src="/images/mind/ai-as-mirror.png"
            alt="A black-glass diagnostic surface reflecting an abstract system topology."
            className="min-h-[520px] rounded-[2rem]"
          />
          <div className="flex flex-col justify-center">
            <Eyebrow>AI As Mirror</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The model reflects the operator more than people admit.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/62">
              Weak prompts usually reveal weak thinking. Strong systems reveal
              clean constraints, useful memory, and a disciplined review loop.
              AI is most valuable when it makes the work easier to inspect.
            </p>
            <div className="mt-8 grid gap-3">
              {protocols.map((protocol) => (
                <div key={protocol} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                  <p className="text-sm leading-6 text-white/66">{protocol}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <Eyebrow>Boundaries</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What this is not.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
                The page uses operating-system language as a builder metaphor.
                It is not a medical model, a self-help promise, or a claim that
                tools can replace judgment.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {notThis.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-cyan-200/76" />
                  <p className="text-sm leading-6 text-white/66">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-8 sm:p-10 lg:p-12">
            <Eyebrow>Next Paths</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Build the operator layer, then give the agents better work.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
              Start with the weekly dispatch if you want the practical notes.
              Read the architecture series if you want the deeper map of
              intelligence, agents, and systems.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/newsletter"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#06100d] transition hover:-translate-y-0.5 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <Send className="h-4 w-4" />
                Get the dispatch
              </Link>
              <Link
                href="/os"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <Workflow className="h-4 w-4" />
                Explore FrankX OS
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              { icon: DraftingCompass, label: 'AI Architecture', href: '/ai-architecture' },
              { icon: SlidersHorizontal, label: 'ACOS', href: '/acos' },
              { icon: Eye, label: 'Research', href: '/research' },
              { icon: Route, label: 'Start Here', href: '/start-here' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={false}
                  className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition hover:border-white/18 hover:bg-white/[0.06]"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-white">{item.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/42 transition group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
