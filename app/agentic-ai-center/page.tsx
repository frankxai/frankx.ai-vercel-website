import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Compass,
  GitBranch,
  Layers3,
  Network,
  Route,
  ShieldCheck,
  Workflow,
} from 'lucide-react'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = {
  title: 'Agentic AI Center',
  description:
    'A practical hub for understanding, designing, and shipping agentic AI systems: agents, workflows, orchestration, memory, tools, governance, and production patterns.',
  alternates: {
    canonical: `${SITE_URL}/agentic-ai-center`,
  },
  openGraph: {
    title: 'Agentic AI Center | FrankX',
    description:
      'The FrankX hub for agentic AI: fundamentals, architecture, orchestration patterns, operating models, and implementation resources.',
    url: `${SITE_URL}/agentic-ai-center`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/images/blog/production-agentic-ai-systems-hero-v2.png`,
        width: 1200,
        height: 630,
        alt: 'Agentic AI systems architecture visual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic AI Center | FrankX',
    description:
      'A structured field guide to agentic AI systems, from first concepts to production architecture.',
    images: [`${SITE_URL}/images/blog/production-agentic-ai-systems-hero-v2.png`],
  },
}

const foundations = [
  {
    title: 'Agents',
    description:
      'Systems that can interpret a goal, plan the work, call tools, inspect results, and keep moving under constraints.',
    icon: Bot,
  },
  {
    title: 'Tools',
    description:
      'The controlled actions an agent can take: search, retrieval, code execution, browser work, database operations, and APIs.',
    icon: Code2,
  },
  {
    title: 'Memory',
    description:
      'The working context, project history, user preferences, and long-lived knowledge that make an agent useful beyond one prompt.',
    icon: BrainCircuit,
  },
  {
    title: 'Orchestration',
    description:
      'The routing layer that decides which agent acts, when work escalates, and how outputs are checked before they matter.',
    icon: Network,
  },
]

const maturityLevels = [
  {
    level: '01',
    title: 'Assisted Work',
    description: 'A human drives the workflow. AI drafts, summarizes, explains, and suggests next steps.',
  },
  {
    level: '02',
    title: 'Tool-Using Agent',
    description: 'The agent can read, write, search, run commands, and complete bounded tasks with review.',
  },
  {
    level: '03',
    title: 'Workflow Agent',
    description: 'The system owns a repeatable business or creator workflow with logs, checkpoints, and handoffs.',
  },
  {
    level: '04',
    title: 'Agent Team',
    description: 'Multiple roles collaborate: planner, researcher, builder, reviewer, operator, and evaluator.',
  },
  {
    level: '05',
    title: 'Operating System',
    description: 'Agents sit inside a durable system with memory, governance, observability, deployment, and improvement loops.',
  },
]

const buildPath = [
  {
    title: 'Start with the job',
    description:
      'Choose one workflow where the desired output, review criteria, and failure cost are clear.',
    href: '/blog/production-agentic-ai-systems',
    label: 'Decision framework',
  },
  {
    title: 'Map the architecture',
    description:
      'Separate planning, retrieval, tools, memory, evaluation, permissions, and human review.',
    href: '/ai-architecture',
    label: 'Architecture hub',
  },
  {
    title: 'Pick the operating model',
    description:
      'Decide who owns prompts, data, approvals, release quality, incident handling, and continuous improvement.',
    href: '/ai-architect/ai-coe-hub',
    label: 'AI CoE model',
  },
  {
    title: 'Ship a constrained version',
    description:
      'Build the smallest useful agent, add logs, test real edge cases, and expand only after the workflow proves itself.',
    href: '/products/agentic-creator-os/docs',
    label: 'ACOS docs',
  },
]

const resourceTracks = [
  {
    title: 'Understand Agentic AI',
    description: 'Definitions, mental models, and the difference between chat, automation, and real agent behavior.',
    href: '/blog/what-is-agentic-ai',
    icon: Compass,
  },
  {
    title: 'Roadmap the Field',
    description: 'Where agentic systems are going across tools, protocols, orchestration, and enterprise adoption.',
    href: '/blog/agentic-ai-roadmap-2026',
    icon: Route,
  },
  {
    title: 'Design Production Systems',
    description: 'When to use agents, when not to, and how to reason about maturity before implementation.',
    href: '/blog/production-agentic-ai-systems',
    icon: Layers3,
  },
  {
    title: 'Study Orchestration',
    description: 'Patterns for routing work across multiple agents, tools, evaluators, and review steps.',
    href: '/blog/multi-agent-orchestration-patterns-2026',
    icon: GitBranch,
  },
  {
    title: 'Build with ACOS',
    description: 'The Agentic Creator OS as a practical reference system for agent teams, skills, and workflows.',
    href: '/products/agentic-creator-os',
    icon: Workflow,
  },
  {
    title: 'Use Architecture Blueprints',
    description: 'Move from idea to implementation with diagrams, templates, and production patterns.',
    href: '/ai-architecture/blueprints',
    icon: ClipboardCheck,
  },
]

const guardrails = [
  'Give agents narrow tools before broad autonomy.',
  'Log plans, tool calls, outputs, and review decisions.',
  'Keep humans accountable for high-impact actions.',
  'Use evaluation before scale, not after failure.',
  'Treat memory as product infrastructure, not a chat feature.',
  'Design rollback, permissions, and escalation from the start.',
]

const faqs = [
  {
    question: 'What is agentic AI?',
    answer:
      'Agentic AI refers to AI systems that can pursue a goal through multiple steps: planning, using tools, reading context, checking results, and adapting their next action.',
  },
  {
    question: 'How is this different from AI architecture?',
    answer:
      'The Agentic AI Center explains the field and organizes the learning path. AI Architecture is the deeper implementation layer for blueprints, prototypes, tools, and production designs.',
  },
  {
    question: 'When should a team use an agent instead of a normal workflow?',
    answer:
      'Use an agent when the work requires context, branching decisions, tool use, and repeated judgment. If the process is fixed and deterministic, traditional automation is usually simpler.',
  },
  {
    question: 'What is the safest way to start?',
    answer:
      'Start with a bounded workflow, limited permissions, visible logs, human review, and a clear definition of done. Expand autonomy only after the system is observable and reliable.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Agentic AI Center',
    description: metadata.description,
    url: `${SITE_URL}/agentic-ai-center`,
    image: `${SITE_URL}/images/blog/production-agentic-ai-systems-hero-v2.png`,
    author: {
      '@type': 'Person',
      name: 'Frank',
      jobTitle: 'AI Architect',
      url: SITE_URL,
    },
    about: ['Agentic AI', 'AI agents', 'Multi-agent systems', 'AI architecture', 'AI governance'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Agentic AI Center',
        item: `${SITE_URL}/agentic-ai-center`,
      },
    ],
  },
]

export default function AgenticAiCenterPage() {
  return (
    <main id="main" className="min-h-screen bg-[#06080f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/blog/production-agentic-ai-systems-hero-v2.png"
            alt="Abstract visualization of an agentic AI system with connected workflow layers"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#06080f]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(67,191,227,0.22),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(16,185,129,0.16),transparent_32%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-6 py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Agentic AI Center
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Understand agents. Design systems. Ship real workflows.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This is the FrankX hub for agentic AI: how agents work, where they fail,
              how to design them, and how to move from experiments to production-grade
              operating systems.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/blog/what-is-agentic-ai"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Start with the field guide
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ai-architecture"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Go to architecture
              </Link>
            </div>
          </div>

          <div className="border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur rounded-lg">
            <div className="grid gap-3">
              {foundations.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex gap-4 border border-white/10 bg-white/[0.03] p-4 rounded-lg">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
              Maturity Model
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Agentic AI is not one capability. It is a progression.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Most failures come from skipping levels: giving broad autonomy before the workflow,
              tools, memory, and review model are ready.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {maturityLevels.map((item) => (
              <article key={item.level} className="border border-white/10 bg-white/[0.03] p-5 rounded-lg">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                  {item.level}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80">
              Build Path
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Use agents where judgment, context, and action meet.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              The center is organized around a practical path: choose a workflow, design
              the system, set the operating model, then ship a constrained version.
            </p>
          </div>

          <div className="grid gap-4">
            {buildPath.map((step, index) => (
              <article key={step.title} className="grid gap-4 border border-white/10 bg-slate-950/70 p-5 rounded-lg sm:grid-cols-[72px_1fr_auto] sm:items-center">
                <div className="text-3xl font-semibold text-white/20">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p>
                </div>
                <Link
                  href={step.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  {step.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/80">
                Resource Map
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                The FrankX agentic AI learning path
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Browse all resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resourceTracks.map((track) => {
              const Icon = track.icon
              return (
                <Link
                  key={track.title}
                  href={track.href}
                  className="group border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/40 hover:bg-white/[0.055] rounded-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{track.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{track.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                    Open
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Guardrails
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Autonomy needs constraints.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Agentic systems are only useful when the actions, permissions, memory, and
              review moments are explicit. The goal is not more autonomy. The goal is
              accountable execution.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {guardrails.map((item) => (
              <div key={item} className="flex gap-3 border border-white/10 bg-slate-950/70 p-4 rounded-lg">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Agentic AI, without the hype.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="border border-white/10 bg-white/[0.03] p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
