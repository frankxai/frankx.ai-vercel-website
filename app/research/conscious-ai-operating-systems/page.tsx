import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Conscious AI Operating Systems — Research | FrankX',
  description:
    'Research into sovereign AI architectures that integrate biometrics, persistent memory, and ethical guardrails across all interactions.',
  alternates: {
    canonical: 'https://frankx.ai/research/conscious-ai-operating-systems',
  },
  openGraph: {
    title: 'Conscious AI Operating Systems — Research',
    description:
      'Research into sovereign AI architectures that integrate biometrics, persistent memory, and ethical guardrails.',
    type: 'article',
    url: 'https://frankx.ai/research/conscious-ai-operating-systems',
  },
}

const researchQuestions = [
  'How do you maintain AI personality consistency across millions of interactions?',
  'What biometric signals most reliably indicate cognitive state?',
  'Can multi-generational knowledge be encoded without losing context?',
  'What sovereignty architecture allows cloud-native deployment with full data portability?',
  'How do ethical guardrails scale without becoming restrictive?',
]

const architecturePatterns = [
  {
    name: 'Guardian Protocol',
    description:
      'Personality persistence combined with ethical boundaries. The system maintains a stable identity core while enforcing configurable moral guardrails that prevent drift across sessions, users, and deployment contexts.',
  },
  {
    name: 'Living Memory',
    description:
      'Ambient capture flowing into a sovereign vector store. Continuous ingestion of interactions, observations, and user context — indexed for semantic retrieval — while maintaining full data ownership and portability.',
  },
  {
    name: 'Vital Intelligence',
    description:
      'Wearable API data transformed into cognitive state assessments that drive adaptive assistance. Heart rate variability, sleep quality, and activity patterns inform how the system communicates, what it prioritizes, and when it intervenes.',
  },
  {
    name: 'Agent Constellation',
    description:
      'Specialized sub-agents operating with shared context through a unified memory layer. Each agent owns a domain (health, creativity, planning) while contributing to and drawing from a collective knowledge graph.',
  },
  {
    name: 'Collective Wisdom',
    description:
      'Oral history and lived experience encoded into structured knowledge graphs. Family stories, cultural practices, and generational insights are preserved in queryable, inheritable formats that resist context collapse.',
  },
]

const relatedWork = [
  {
    href: '/blog/trinity-ai-conscious-operating-system',
    label: 'Trinity AI: The Conscious OS',
  },
  { href: '/products/trinity-ai', label: 'Trinity AI Product' },
  { href: '/work/trinity-ai', label: 'Full Architecture & Alliance' },
  {
    href: '/blog/conscious-ai-framework',
    label: 'Conscious AI Framework',
  },
  {
    href: '/blog/ai-agent-memory-persistent-systems',
    label: 'AI Agent Memory & Persistent Systems',
  },
  { href: '/ai-architect', label: 'AI Architect Methodology' },
]

export default function ConsciousAIOperatingSystemsPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link
          href="/research"
          className="mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Research Hub
        </Link>

        {/* Header */}
        <header className="mb-16">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#D4AF37' }}
          >
            Research Domain
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Conscious AI Operating Systems
          </h1>
          <p className="text-sm text-zinc-500">April 2026</p>
        </header>

        {/* Abstract */}
        <section className="mb-16">
          <h2
            className="mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#D4AF37' }}
          >
            Abstract
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The current AI landscape treats users as session-based. No
              persistent identity, no body awareness, no ethical continuity.
              Every conversation starts from zero. Every assistant forgets. The
              result is powerful tools that never become trusted partners.
            </p>
            <p>
              This research explores a new category: conscious AI operating
              systems that maintain persistent identity, integrate biometric
              data, and enforce ethical guardrails across all interactions. These
              systems don&apos;t just respond — they remember, adapt, and hold
              themselves accountable to the values their users define.
            </p>
            <p>
              The architecture draws from enterprise AI Center of Excellence
              frameworks, adapted for sovereign personal deployment. The goal is
              an AI that knows you, grows with you, and remains yours — across
              devices, across years, across generations.
            </p>
          </div>
        </section>

        {/* Key Research Questions */}
        <section className="mb-16">
          <h2
            className="mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#D4AF37' }}
          >
            Key Research Questions
          </h2>
          <ul className="space-y-3">
            {researchQuestions.map((question) => (
              <li
                key={question}
                className="flex items-start gap-3 text-zinc-300"
              >
                <span
                  className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: '#D4AF37' }}
                />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture Patterns */}
        <section className="mb-16">
          <h2
            className="mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#D4AF37' }}
          >
            Architecture Patterns
          </h2>
          <div className="space-y-8">
            {architecturePatterns.map((pattern) => (
              <div key={pattern.name}>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {pattern.name}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {pattern.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Work */}
        <section className="mb-16">
          <h2
            className="mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#D4AF37' }}
          >
            Related Work
          </h2>
          <ul className="space-y-3">
            {relatedWork.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Status */}
        <footer className="border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-500">
            Active Research · Arcanea BV × Trinity AI · 2026
          </p>
        </footer>
      </div>
    </main>
  )
}
