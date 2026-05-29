import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Database,
  GraduationCap,
  LineChart,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from 'lucide-react'

const SITE_URL = 'https://frankx.ai'

export const metadata: Metadata = {
  title: 'AI Center of Excellence',
  description:
    'A practical AI Center of Excellence framework for individuals, teams, and enterprise operators. Strategy, governance, talent, technology, data, and ethics in one operating model.',
  alternates: {
    canonical: `${SITE_URL}/ai-coe`,
  },
  openGraph: {
    title: 'AI Center of Excellence | FrankX',
    description:
      'Build an AI CoE with the same six-pillar operating model used in enterprise programs, adapted for personal and team execution.',
    url: `${SITE_URL}/ai-coe`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/images/architectures/ai-coe.png`,
        width: 1200,
        height: 630,
        alt: 'AI Center of Excellence architecture diagram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Center of Excellence | FrankX',
    description:
      'A six-pillar operating model for building serious AI capability at personal, team, and enterprise scale.',
    images: [`${SITE_URL}/images/architectures/ai-coe.png`],
  },
}

const pillars = [
  {
    name: 'Strategy',
    icon: LineChart,
    description:
      'Define the work AI should handle, the work humans keep, and the outcomes worth measuring.',
  },
  {
    name: 'Governance',
    icon: ShieldCheck,
    description:
      'Set rules for review, disclosure, privacy, source quality, and final human accountability.',
  },
  {
    name: 'Talent',
    icon: GraduationCap,
    description:
      'Build fluency through prompts, playbooks, role-specific workflows, and repeated practice.',
  },
  {
    name: 'Technology',
    icon: Network,
    description:
      'Choose the tool stack deliberately: models, agents, automations, interfaces, and observability.',
  },
  {
    name: 'Data',
    icon: Database,
    description:
      'Turn documents, notes, research, and outputs into reusable context with clear ownership.',
  },
  {
    name: 'Ethics',
    icon: Scale,
    description:
      'Make values operational through checks, limits, review moments, and escalation paths.',
  },
]

const modes = [
  {
    eyebrow: 'Personal AI CoE',
    title: 'A one-person operating model',
    description:
      'Use the six pillars to coordinate your tools, prompts, knowledge base, calendar, creative systems, and weekly review. This is the framework behind ACOS.',
    href: '/acos',
    cta: 'See ACOS',
  },
  {
    eyebrow: 'Team AI CoE',
    title: 'A capability layer for teams',
    description:
      'Use the same structure for shared standards, reusable workflows, adoption planning, tool decisions, and governance across a small team or business unit.',
    href: '/workshops',
    cta: 'Book the workshop',
  },
]

const resourceLinks = [
  {
    title: 'Take the maturity assessment',
    description: 'Seven dimensions. Two minutes. A clear starting point.',
    href: '/assess/ai-coe',
    icon: CheckCircle2,
  },
  {
    title: 'Read the core article',
    description: 'Why the enterprise AI CoE pattern works at personal scale.',
    href: '/blog/why-everyone-needs-personal-ai-coe',
    icon: BookOpen,
  },
  {
    title: 'Browse architecture blueprints',
    description: 'Production AI patterns, RAG, gateways, agents, and governance.',
    href: '/ai-architecture',
    icon: Waypoints,
  },
  {
    title: 'Use the prompt library',
    description: 'Blueprint, assessment, weekly review, and domain-specific CoE prompts.',
    href: '/prompt-library',
    icon: Sparkles,
  },
  {
    title: 'See the lab in action',
    description: 'Eight builds shipped on the agentic dev stack — Antigravity, Claude Code, Codex, Gemini.',
    href: '/agentic-builder-lab',
    icon: Sparkles,
  },
  {
    title: 'Hire Frank for a sprint',
    description: 'One-day workshop or 5–10 day implementation sprint for your CoE team.',
    href: '/build',
    icon: ArrowRight,
  },
]

const operatingLoop = [
  'Pick one domain where AI already saves time.',
  'Write the rules for what AI may draft, decide, and never touch.',
  'Build a reusable prompt or agent for the repeatable work.',
  'Store the useful outputs where future sessions can retrieve them.',
  'Review the system weekly and improve one bottleneck.',
]

const faqItems = [
  {
    question: 'What is an AI Center of Excellence?',
    answer:
      'An AI Center of Excellence is an operating model for adopting AI with clear strategy, governance, talent, technology, data, and ethics practices. It coordinates tools, people, workflows, and standards.',
  },
  {
    question: 'Can one person build an AI CoE?',
    answer:
      'Yes. The personal version uses the same six pillars at smaller scale. Replace departments with life or work domains, and replace executive steering meetings with a weekly operating review.',
  },
  {
    question: 'How does this relate to ACOS?',
    answer:
      'ACOS is one implementation of a personal AI CoE for creators and builders. The AI CoE is the framework. ACOS is the runtime, with agents, skills, memory, and workflows.',
  },
  {
    question: 'Where should a team start?',
    answer:
      'Start with one high-value workflow, a short governance rule set, a shared prompt library, and a review cadence. Expand only after the first workflow has measurable quality or time gains.',
  },
]

function JsonLd() {
  const techArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'AI Center of Excellence',
    description: metadata.description,
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: SITE_URL,
      jobTitle: 'AI Architect',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: SITE_URL,
    },
    datePublished: '2026-05-07',
    dateModified: '2026-05-07',
    mainEntityOfPage: `${SITE_URL}/ai-coe`,
    about: pillars.map((pillar) => pillar.name).join(', '),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'AI CoE', item: `${SITE_URL}/ai-coe` },
      ],
    },
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-300/70">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-zinc-400">{description}</p>
    </div>
  )
}

export default function AICoEPage() {
  return (
    <>
      <JsonLd />
      <main className="min-h-screen bg-[#0a0a0b] text-zinc-300">
        <section className="border-b border-white/[0.06] pt-28 sm:pt-32">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-200">
                <Brain className="h-3.5 w-3.5" />
                AI Center of Excellence
              </div>
              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build the system layer for serious AI work.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                The same six-pillar operating model behind enterprise AI adoption,
                adapted for individuals, teams, and creator systems that need repeatable
                quality.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/assess/ai-coe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-100"
                >
                  Assess your maturity
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog/why-everyone-needs-personal-ai-coe"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
                >
                  Read the framework
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/architectures/ai-coe.png"
                  alt="AI Center of Excellence architecture diagram"
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 via-transparent to-transparent" />
              </div>
              <div className="border-t border-white/[0.06] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/60">
                  Six pillars
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Strategy, governance, talent, technology, data, and ethics. The
                  architecture is stable. The scale changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.06] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Operating model"
              title="The six pillars every AI system needs"
              description="A CoE is not a content calendar or a folder of prompts. It is the structure that decides what gets built, how quality is checked, where context lives, and how the system improves."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.name}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{pillar.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{pillar.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.06] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Translation"
              title="One framework, two useful scales"
              description="The enterprise version coordinates departments. The personal version coordinates domains, tools, memory, and repeated work. Both need standards before they need more software."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {modes.map((mode) => (
                <div
                  key={mode.eyebrow}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-6"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/70">
                    {mode.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                    {mode.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{mode.description}</p>
                  <Link
                    href={mode.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                  >
                    {mode.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.06] py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Cadence"
              title="The weekly loop keeps it alive"
              description="Most AI systems decay because no one owns the review rhythm. The smallest useful CoE is a weekly operating loop that sharpens one workflow at a time."
            />
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
              <ol className="space-y-3">
                {operatingLoop.map((item, index) => (
                  <li key={item} className="flex gap-4 rounded-lg bg-white/[0.025] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/[0.1] text-xs font-semibold text-cyan-200">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-6 text-zinc-300">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.06] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Resources"
              title="Start from the part you need now"
              description="Assessment, architecture, prompts, and workshops already exist across FrankX. This page is the front door."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {resourceLinks.map((resource) => {
                const Icon = resource.icon
                return (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="group rounded-lg border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-emerald-300/25 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{resource.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-zinc-400">
                          {resource.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200">
                          Open resource
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="Questions"
                title="AI CoE, without the theater"
                description="A good CoE is not a committee name. It is a set of decisions, habits, and shared assets that make better AI work repeatable."
              />
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5"
                  >
                    <h3 className="text-base font-semibold text-white">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
