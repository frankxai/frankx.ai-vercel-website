import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCode,
  FileText,
  GitPullRequest,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Workflow,
} from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import { createMetadata } from '@/lib/seo'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

const SITE_URL = 'https://frankx.ai'
const CANONICAL_PATH = '/build/template-pack'

// Gumroad / Stripe link — wired in v1 follow-up. The CTA gracefully falls
// back to the booking link until the checkout is live.
const TEMPLATE_PACK_CHECKOUT_URL = 'mailto:hello@frankx.ai?subject=Template%20Pack%20—%20early%20access'

export const metadata = createMetadata({
  title: 'Agentic Template Pack — AGENTS.md, prompt packs, eval harness',
  description:
    'The artifacts behind every build in the Agentic Builder Lab. AGENTS.md, repo conventions, prompt packs, PR review checklists, eval harness, content flywheel. Forkable. One year of updates. Commercial license.',
  path: CANONICAL_PATH,
  keywords: [
    'agents md template',
    'agentic templates',
    'claude code template',
    'prompt pack',
    'ai dev template',
    'eval harness',
    'frankx',
  ],
})

const artifacts = [
  {
    icon: FileCode,
    name: 'AGENTS.md',
    body:
      'The first file every agent reads when it joins a repo. Defines roles, scope, escalation paths, banned operations, review gates. Drop-in for Claude Code, Codex, Antigravity, Cursor.',
  },
  {
    icon: Workflow,
    name: 'Repo conventions',
    body:
      'Folder structure, branch strategy, commit message patterns, and the PR review checklist used on every build in the lab.',
  },
  {
    icon: Sparkles,
    name: 'Prompt packs',
    body:
      'Tool-specific reusable prompts: planning, refactor, test repair, content extraction, build-log entry. Markdown, forkable, voice-spec clean.',
  },
  {
    icon: GitPullRequest,
    name: 'PR review checklist',
    body:
      'A reviewable checklist for agent-authored PRs: scope, tests, security, voice, banned operations. Plus a Claude Code skill to run it automatically.',
  },
  {
    icon: TestTube2,
    name: 'Evaluation harness',
    body:
      'A minimal evaluation scaffold to verify agent output against acceptance criteria before merge. Pluggable across LangGraph, Claude Agent SDK, OpenAI Agents.',
  },
] as const

const includes = [
  'AGENTS.md template (Markdown, MIT-style commercial license)',
  'Repo conventions doc and folder scaffold',
  '12 reusable prompts across planning, refactor, content',
  'PR review checklist + Claude Code skill to run it',
  'Minimal eval harness (TypeScript + Python flavors)',
  'Build-log MDX template (the one used on /agentic-builder-lab)',
  'LinkedIn post template (9 hook × close combinations)',
  'One year of updates as new builds add new artifacts',
]

const faqs = [
  {
    q: 'What format is the pack delivered in?',
    a: 'A GitHub repo you can clone, plus a downloadable .zip. Every artifact is plain Markdown or TypeScript — no proprietary format, no lock-in.',
  },
  {
    q: 'License and support?',
    a: 'Commercial license for use across your projects (including client work). One year of updates included — every new artifact added to the pack lands in your version. Email support for setup questions.',
  },
  {
    q: 'What tools does it support?',
    a: 'Claude Code, Codex, Antigravity 2.0, Cursor, Windsurf. AGENTS.md and the prompt packs are tool-agnostic; the Claude Code skill is opt-in.',
  },
  {
    q: 'How is it different from a free GitHub gist?',
    a: 'The pack is the result of shipping 8 production builds with these exact files — every artifact has been used, broken, and refined in real work. The eval harness alone saves a week of scaffolding.',
  },
  {
    q: 'Refund policy?',
    a: '14-day no-questions refund. Email hello@frankx.ai.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Agentic Template Pack',
    description:
      'AGENTS.md, repo conventions, prompt packs, PR review checklists, eval harness, and content flywheel used on every build in the Agentic Builder Lab.',
    url: `${SITE_URL}${CANONICAL_PATH}`,
    brand: { '@type': 'Brand', name: 'FrankX' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Build with Frank', item: `${SITE_URL}/build` },
      { '@type': 'ListItem', position: 3, name: 'Template Pack', item: `${SITE_URL}${CANONICAL_PATH}` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
]

export default function TemplatePackPage() {
  return (
    <main id="main" className="min-h-screen bg-[#06080f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(16,185,129,0.16),transparent_38%),radial-gradient(circle_at_82%_22%,rgba(67,191,227,0.16),transparent_36%)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/build"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" />
            Build with Frank
          </Link>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            The artifacts behind{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              every build in the lab.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
            AGENTS.md. Repo conventions. Prompt packs. PR review checklists. Eval harness. Content
            flywheel. Forkable, documented, voice-spec clean. One year of updates. Commercial
            license.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={TEMPLATE_PACK_CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
            >
              Request early access
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/agentic-builder-lab"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See it in use
            </Link>
          </div>

          <p className="mt-5 text-[11px] text-slate-500">
            Early-access pricing while v1 ships. List price €149 at general availability.
          </p>
        </div>
      </section>

      {/* ── ARTIFACTS ──────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Inside the pack
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Five core artifacts. Each one tested in production.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              These are the exact files Frank uses on every build in the public lab. They have
              shipped real product surfaces — not slideware.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((a) => {
              const Icon = a.icon
              return (
                <GlowCard key={a.name} color="emerald" className="p-6 flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-300/10 text-emerald-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{a.name}</h3>
                  <p className="text-sm leading-6 text-slate-400">{a.body}</p>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80">
                What you actually get
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                A real repo, not a PDF.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-400">
                Clone, fork, ship. Every artifact is plain Markdown or TypeScript. Zero proprietary
                format, zero lock-in.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm text-slate-300">
                  Commercial license · One year of updates · 14-day refund
                </p>
              </div>
            </div>

            <ul className="grid gap-3">
              {includes.map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PREVIEW / PROOF ────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/80">
            Preview
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A peek at AGENTS.md.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            The file every agent reads first. Below is an abbreviated excerpt — the full version
            ships in the pack.
          </p>

          <pre className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a12]/80 p-5 text-[12px] leading-6 text-slate-300">
{`# AGENTS.md

## Roles
- Architect (human): owns the brief, the acceptance criteria, the merge
- Builder agent: writes the code, runs the tests, opens the PR
- Reviewer agent: runs the PR checklist, posts findings as comments
- Verifier (human): final review before merge

## Scope
- Builder may touch: app/, components/, content/, lib/
- Builder may NOT touch: .env, secrets/, infra/, .github/workflows/

## Banned operations
- No force push, no destructive git operations
- No package additions without a one-line rationale in the PR body
- No deletion of files outside the current task scope

## Escalation
If the builder cannot complete the task in 3 turns, open a draft PR
with current state and a question for the human.

## Review gates
1. All tests pass locally
2. PR checklist comment is green
3. No banned operations in the diff
4. Human verifier approves`}
          </pre>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-5xl px-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              What buyers ask before clicking.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((f) => (
              <article key={f.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">{f.q}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Code2 className="mx-auto h-6 w-6 text-emerald-300" />
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop scaffolding. Start shipping.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
            The pack saves the week you would spend writing AGENTS.md, building an eval harness,
            and refining prompts. Skip that week.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={TEMPLATE_PACK_CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
            >
              Request early access
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/build"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Workshop or sprint instead
            </Link>
          </div>
          <p className="mt-6 text-[11px] text-slate-500">
            Or{' '}
            <a
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline-offset-4 hover:underline"
            >
              book a 20-min intro
            </a>{' '}
            and we figure out whether the pack alone is enough.
          </p>
          <p className="mt-3 text-[11px] text-slate-500">
            Not ready yet?{' '}
            <Link
              href="/inner-circle"
              className="text-cyan-300 underline-offset-4 hover:underline"
            >
              Reserve a seat in the Inner Circle
            </Link>{' '}
            for first access when the pack ships.
          </p>
        </div>
      </section>
    </main>
  )
}
