import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileSearch,
  Github,
  Handshake,
  Library,
  Network,
  NotebookText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { featuredWorkspaceCase } from '@/data/featured-workspace-case'
import { sitePositioning } from '@/data/site-positioning'
import { socialLinks } from '@/lib/social-links'

type LatestPost = {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
}

type FrankXProductionHomeProps = {
  latestPosts?: LatestPost[]
}

const currentWorkIcons = {
  Research: FileSearch,
  'Book intelligence': Library,
  Architecture: Network,
  'Applied work': Handshake,
  'Field guides': BookOpen,
  'Working notes': NotebookText,
} as const

const openProof = [
  {
    label: 'Agent system',
    title: 'Agentic Creator OS',
    description: 'The agent, skill, command, and quality-gate layer behind much of the work.',
    href: `${socialLinks.github}/agentic-creator-os`,
  },
  {
    label: 'Agent catalog',
    title: '99 specialist roles',
    description: 'The public catalog shows what each role does, what is shipped, and what remains in progress.',
    href: '/agents',
  },
  {
    label: 'Design contract',
    title: 'Taste and interface language',
    description: 'The visual principles, design tokens, references, and interface patterns used across FrankX.',
    href: '/design',
  },
] as const

export default function FrankXProductionHome({
  latestPosts = [],
}: FrankXProductionHomeProps) {
  return (
    <main className="relative overflow-hidden bg-[#0a0a0b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_68%_12%,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_18%_0%,rgba(6,182,212,0.06),transparent_28%)]"
        aria-hidden="true"
      />

      <section className="relative mx-auto grid min-h-[88svh] min-w-0 max-w-7xl items-center gap-10 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="min-w-0 max-w-3xl">
          <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300/80 sm:mb-6 sm:text-[11px] sm:tracking-[0.24em]">
            {sitePositioning.eyebrow}
          </p>
          <h1 className="max-w-full font-display text-[2.6rem] font-bold leading-[0.98] tracking-[-0.045em] text-white sm:max-w-4xl sm:text-6xl lg:text-7xl">
            I turn questions into systems
            <span className="block text-white/55">and show the work.</span>
          </h1>

          <div className="mt-6 grid grid-cols-[64px_1fr] items-center gap-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.045] p-3.5 lg:hidden">
            <Image
              src="/images/portraits/frank-presenting-oracle-2025.jpg"
              alt="Frank Riemer presenting an AI architecture session"
              width={64}
              height={64}
              priority
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Frank directs the work.</p>
              <p className="mt-1 text-xs leading-5 text-white/62">
                Sources → specialist agents → human decision → public result.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:hidden">
            My public workspace for research, book intelligence, architectures, guides, and
            partnership systems. Agents deepen the work; I decide what becomes public.
          </p>
          <p className="mt-8 hidden max-w-2xl text-lg leading-8 text-white/72 sm:block sm:text-xl">
            {sitePositioning.introduction}
          </p>

          <div className="mt-7 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href={sitePositioning.primaryAction.href}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              {sitePositioning.primaryAction.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href={sitePositioning.secondaryAction.href}
              className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              {sitePositioning.secondaryAction.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 hidden max-w-2xl flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs leading-5 text-white/58 lg:flex">
            <span>Frank sets the direction</span>
            <span>Agents run specialist passes</span>
            <span>Sources stay visible</span>
            <span>Human review before publication</span>
          </div>
          <p className="mt-3 max-w-xl text-[11px] leading-5 text-white/50">
            Independent project by former Oracle AI architect Frank Riemer. Not affiliated with,
            endorsed by, or sponsored by Oracle.
          </p>
        </div>

        <div className="relative mx-auto hidden w-full min-w-0 max-w-[520px] lg:block lg:justify-self-end">
          <div className="absolute -inset-10 bg-emerald-400/10 blur-[100px]" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1111] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/5] min-h-[460px] sm:min-h-[560px]">
              <Image
                src="/images/portraits/frank-presenting-oracle-2025.jpg"
                alt="Frank Riemer presenting an AI architecture session"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#07100d] via-[#07100d]/28 to-transparent"
                aria-hidden="true"
              />
            </div>
            <div
              data-home-proof-overlay
              className="absolute inset-x-0 bottom-0 min-w-0 max-w-full p-5 min-[360px]:p-6 sm:p-8"
            >
              <p className="max-w-full font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">
                One question moving through the workspace
              </p>
              <ol className="mt-4 grid max-w-full grid-cols-2 gap-x-4 gap-y-3 text-xs leading-5 text-white/74 sm:max-w-sm">
                <li><span className="text-emerald-200">01</span> Source material</li>
                <li><span className="text-emerald-200">02</span> Specialist passes</li>
                <li><span className="text-emerald-200">03</span> Frank decides</li>
                <li><span className="text-emerald-200">04</span> Public result</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-y border-white/[0.07] bg-[#0c0e0e] py-20 lg:py-24"
        aria-labelledby="workspace-case-title"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
              {featuredWorkspaceCase.label}
            </p>
            <h2
              id="workspace-case-title"
              className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"
            >
              One question,
              <span className="block text-white/55">from sources to publication.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65">
              {featuredWorkspaceCase.description}
            </p>
            <Link
              href={featuredWorkspaceCase.href}
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/[0.06] px-6 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {featuredWorkspaceCase.outputLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <div className="border-y border-white/[0.09]">
              <div className="grid gap-4 py-5 sm:grid-cols-[140px_1fr]">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                  Source set
                </p>
                <p className="text-sm leading-6 text-white/68">
                  DeepMind delegation research, WORKBank, Ulloa et al., a QJE field study,
                  and NIST’s active work on agent identity and authorization.
                </p>
              </div>
              {featuredWorkspaceCase.passes.map((pass) => (
                <div
                  key={pass.role}
                  className="grid gap-3 border-t border-white/[0.08] py-5 sm:grid-cols-[140px_1fr]"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/75">
                    {pass.role}
                  </p>
                  <p className="text-sm leading-6 text-white/68">{pass.decision}</p>
                </div>
              ))}
              <div className="grid gap-3 border-t border-white/[0.08] py-5 sm:grid-cols-[140px_1fr]">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/80">
                  Frank’s decision
                </p>
                <p className="text-sm leading-6 text-white/78">
                  {featuredWorkspaceCase.frankDecision}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-white/50">
              {featuredWorkspaceCase.provenanceNote}
            </p>
          </div>
        </div>
      </section>

      <section
        id="current-work"
        className="scroll-mt-20 border-y border-white/[0.07] bg-white/[0.018] py-24 lg:py-32"
        aria-labelledby="current-work-title"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/70">
                Current work
              </p>
              <h2 id="current-work-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Start with the current work.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                The site is broad because the workspace is broad. These are the clearest entrances:
                each one leads to work you can read, question, or use.
              </p>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {sitePositioning.currentWork.map((artifact) => {
                const Icon = currentWorkIcons[artifact.type]
                return (
                  <article
                    key={artifact.title}
                    className="group grid gap-5 py-7 sm:grid-cols-[44px_1fr_auto] sm:items-start"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/[0.055] text-emerald-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                        {artifact.type}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{artifact.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                        {artifact.description}
                      </p>
                    </div>
                    <Link
                      href={artifact.href}
                      className="inline-flex min-h-10 items-center gap-2 self-center text-sm font-medium text-emerald-300 transition hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    >
                      {artifact.action}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 py-24 lg:py-32" aria-labelledby="workflow-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
                How the workspace runs
              </p>
              <h2 id="workflow-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Agents extend the work. They do not own the judgment.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                Most work passes through several agent roles. The division of responsibility
                stays explicit so speed does not erase authorship, evidence, or accountability.
              </p>
              <Link
                href="/workspace"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                See the full method
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative border-l border-white/[0.12] pl-7 sm:pl-10">
              {sitePositioning.workflow.map((step, index) => (
                <article
                  key={step.number}
                  className={index === sitePositioning.workflow.length - 1 ? 'pb-0' : 'pb-14'}
                >
                  <span
                    className="absolute -left-[5px] mt-2 h-[9px] w-[9px] rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.5)]"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[11px] text-cyan-300/75">{step.number}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-white/65">{step.detail}</p>
                </article>
              ))}

              <div className="mt-14 rounded-2xl border border-white/[0.1] bg-white/[0.025] p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-white">The publication boundary</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      A generated draft is not a published FrankX position. Claims, citations,
                      language, privacy, rights, and the real consequence of the page stay subject
                      to human review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0c0e0e] py-24" aria-labelledby="proof-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/58">
                Open by design
              </p>
              <h2 id="proof-title" className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                You do not have to take the process on faith.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/65">
                The agent catalog, open system, and design rules expose the machinery behind the
                public work—including what has not shipped yet.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {openProof.map((proof) => {
                const isExternal = proof.href.startsWith('http')
                return (
                  <Link
                    key={proof.title}
                    href={proof.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group flex min-h-[250px] flex-col rounded-[1.5rem] border border-white/[0.1] bg-white/[0.025] p-6 transition hover:border-white/20 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                      {proof.label}
                    </p>
                    <h3 className="mt-8 text-xl font-semibold">{proof.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/65">{proof.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
                      Open
                      {isExternal
                        ? <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="py-24 lg:py-32" aria-labelledby="notes-title">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/70">
                  Field notes
                </p>
                <h2 id="notes-title" className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  What I am learning in the work.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex min-h-10 items-center gap-2 text-sm text-white/72 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Browse all essays
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="divide-y divide-white/[0.08]">
              {latestPosts.slice(0, 3).map((post) => (
                <article
                  key={post.slug}
                  className="grid gap-4 py-7 sm:grid-cols-[0.28fr_1fr_auto] sm:items-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                    {post.category} / {post.readingTime}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/65">
                      {post.description}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 transition hover:border-emerald-300/30 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/[0.07] py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Sparkles className="mx-auto h-6 w-6 text-emerald-300" aria-hidden="true" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Start with the work.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
            Read the research. Study an architecture. Open a book map. When a question or
            partnership deserves a focused system, bring the real material.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/start"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Choose a starting point
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/connect"
              className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Tell me what you’re working on
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
