'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  Loader2,
  Rocket,
  Server,
  Shield,
  Zap,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

interface GHPullRequest {
  number: number
  title: string
  state: string
  draft: boolean
  html_url: string
  user: { login: string; avatar_url: string }
  head: { ref: string }
  base: { ref: string }
  labels: { name: string; color: string }[]
  created_at: string
  updated_at: string
  repo: string
}

interface GHIssue {
  number: number
  title: string
  state: string
  html_url: string
  labels: { name: string; color: string }[]
  assignees: { login: string }[]
  created_at: string
  repo: string
}

interface VercelDeploy {
  id: string
  state: string
  target: string | null
  url: string
  created: number
  meta: { githubCommitMessage?: string; githubCommitRef?: string }
  inspectorUrl: string
}

interface OpsClientProps {
  prs: GHPullRequest[]
  issues: GHIssue[]
  deploys: VercelDeploy[]
}

function timeAgo(date: string | number): string {
  const now = Date.now()
  const then = typeof date === 'number' ? date : new Date(date).getTime()
  const mins = Math.floor((now - then) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function agentFromLabels(labels: { name: string }[]): string | null {
  for (const l of labels) {
    if (l.name.startsWith('ao/builder:')) return l.name.replace('ao/builder:', '')
    if (l.name.startsWith('ao/reviewer:')) return l.name.replace('ao/reviewer:', '')
  }
  return null
}

function DeployStateIcon({ state }: { state: string }) {
  switch (state) {
    case 'READY':
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    case 'BUILDING':
      return <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
    case 'ERROR':
      return <AlertCircle className="w-4 h-4 text-rose-400" />
    default:
      return <Clock className="w-4 h-4 text-zinc-500" />
  }
}

const CORPORATE_PILLARS = [
  {
    id: 'sis',
    name: 'Starlight Intelligence Systems',
    role: 'Sovereign Substrate & SIP Protocol',
    detail: '6 semantic memory vaults, SQLite FTS5 hybrid index, and Maker != Checker governance.',
    accent: 'text-emerald-300 border-emerald-500/25 bg-emerald-500/[0.06]',
  },
  {
    id: 'frankx',
    name: 'FrankX Flagship & Demand Engine',
    role: 'Self-Serve Product Ladder ($1 → $297)',
    detail: 'reality.md Starter Pack ($1), Suno Power Pack ($7), ACOS Kits, and AI Architect authority.',
    accent: 'text-cyan-300 border-cyan-500/25 bg-cyan-500/[0.06]',
  },
  {
    id: 'arcanea',
    name: 'Arcanea Creative Universe',
    role: 'Mythos, Ten Gates & World Engine',
    detail: 'Canon-locked narrative worlds, Luminor companions, and interactive creator experiences.',
    accent: 'text-violet-300 border-violet-500/25 bg-violet-500/[0.06]',
  },
  {
    id: 'acos',
    name: 'Agentic Creator OS (ACOS)',
    role: '151 Named Agents & 89 Skill Rules',
    detail: 'Cross-harness skill projections, loop contracts, and deterministic verification gates.',
    accent: 'text-amber-300 border-amber-500/25 bg-amber-500/[0.06]',
  },
  {
    id: 'gencreator',
    name: 'GenCreator & Vibe OS Media',
    role: 'Audio, Visual & Content Factory',
    detail: '845+ Suno v4/v4.5 studio sessions, Visual Intelligence System, and autonomous publishing.',
    accent: 'text-rose-300 border-rose-500/25 bg-rose-500/[0.06]',
  },
] as const

const FEDERATION_ORGS = [
  { org: 'frankxai', scope: 'Flagship Web, SIS Core & Estate Repos', status: 'Active · Primary' },
  { org: 'Starlight-Intelligence', scope: 'Command Center & Protocol Specs', status: 'Active · Substrate' },
  { org: 'Arcanea-Labs', scope: 'Creative Universe & Lore Engine', status: 'Active · World' },
  { org: 'Agentic-Creator-OS', scope: 'Skills Library & Harness Adapters', status: 'Active · Tooling' },
  { org: 'GenCreator-OS', scope: 'Multi-Modal Creator Pipelines', status: 'Active · Media' },
  { org: 'Vibe-OS-Audio', scope: 'Suno v4/v4.5 Prompt Architectures', status: 'Active · Audio' },
  { org: 'Starlight-Ventures', scope: 'Vertical Domain Sub-Stacks', status: 'Active · Ventures' },
  { org: 'Starlight-Research', scope: 'Memory Palace & Eval Benchmarks', status: 'Active · Research' },
  { org: 'FrankX-Enterprise', scope: 'AI Architecture Blueprints', status: 'Active · Blueprints' },
  { org: 'Starlight-Foundry', scope: 'Signed Claws & Loop Verifiers', status: 'Active · Security' },
] as const

const HARNESS_ROUTING = [
  {
    harness: 'Claude Code (Opus 4.7 / Sonnet 4.6)',
    lane: 'Strategic Synthesis & Primary Maker',
    branchPrefix: 'agent/claude/*',
    role: 'Maker',
    status: 'Online · 8h Queen Cadence',
  },
  {
    harness: 'OpenAI Codex Cloud',
    lane: 'Repo Implementation & Test Harnesses',
    branchPrefix: 'codex/*',
    role: 'Maker',
    status: 'Online · Sandbox Verified',
  },
  {
    harness: 'Grok 4.5 CLI',
    lane: 'Adversarial Diff & Contract Audit',
    branchPrefix: 'agent/grok/*',
    role: 'Independent Checker',
    status: 'Online · Maker != Checker',
  },
  {
    harness: 'Google Jules + Antigravity',
    lane: 'Full-Stack Wave Execution & Fleet Sync',
    branchPrefix: 'agent/antigravity/*',
    role: 'Maker / Fleet Sync',
    status: 'Online · Active Worktree',
  },
] as const

export function OpsClient({ prs, issues, deploys }: OpsClientProps) {
  const [filter, setFilter] = useState<'all' | 'sis' | 'prod' | 'arcanea' | 'ops'>('all')

  const filteredPRs = prs.filter((pr) => {
    if (filter === 'all') return true
    if (filter === 'prod') return pr.repo === 'frankx.ai-vercel-website'
    if (filter === 'sis') {
      return (
        pr.repo === 'Starlight-Intelligence-System' ||
        pr.repo === 'starlight-command-center' ||
        pr.repo === 'starlight-estate'
      )
    }
    if (filter === 'arcanea') return pr.repo === 'arcanea-ai-app' || pr.repo === 'arcanea'
    if (filter === 'ops') {
      return (
        pr.repo === 'agentic-ops' ||
        pr.repo === 'agentic-ops-hub' ||
        pr.repo === 'claude-skills-library'
      )
    }
    return true
  })

  const agentPRs = filteredPRs.filter((pr) => agentFromLabels(pr.labels))
  const humanPRs = filteredPRs.filter((pr) => !agentFromLabels(pr.labels))
  const prodDeploys = deploys.filter((d) => d.target === 'production')

  return (
    <>
      {/* Header */}
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  Named Vercel Surface · frankx.ai/ops
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Agent OS — Queen 8h Swarm & Mission Control
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Live federation telemetry across 8 core repositories, 10 GitHub organizations, and 4 autonomous coding harnesses.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Activity className="w-4 h-4 text-emerald-400" />
                {prs.length} PRs
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Zap className="w-4 h-4 text-amber-400" />
                {issues.length} queued
              </span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'all', label: 'All 8 Flagship Repos' },
                { id: 'prod', label: 'frankx.ai Web' },
                { id: 'sis', label: 'Starlight / SIS' },
                { id: 'arcanea', label: 'Arcanea' },
                { id: 'ops', label: 'Agentic Ops & Skills' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === tab.id
                    ? 'bg-white/[0.10] text-white border border-white/[0.15]'
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">
        {/* Queen 8h Swarm & 10-Org Federation */}
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                Queen 8h Swarm & 10-Org Federation
              </p>
              <h2 className="text-xl font-semibold text-white mt-1">
                5 Corporate Pillars · Multi-Harness Routing · Self-Serve Micro-SKUs
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono">
                Maker != Checker Enforced
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 font-mono">
                FinOps Guard Active
              </span>
            </div>
          </div>

          {/* 5 Corporate Pillars */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              5 Corporate Pillars
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {CORPORATE_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className={`rounded-xl border p-3.5 flex flex-col justify-between ${pillar.accent}`}
                >
                  <div>
                    <p className="text-xs font-semibold text-white">{pillar.name}</p>
                    <p className="text-[11px] font-mono mt-1 opacity-90">{pillar.role}</p>
                  </div>
                  <p className="text-[11px] text-zinc-300/90 mt-2.5 leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Harness Routing Matrix */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Multi-Harness Routing Status (Google Jules + Codex Cloud + Grok 4.5 + Claude)
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {HARNESS_ROUTING.map((item) => (
                <div
                  key={item.harness}
                  className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white">{item.harness}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1.5">{item.lane}</p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.06] text-[11px] font-mono">
                    <span className="text-violet-300">{item.branchPrefix}</span>
                    <span className="text-emerald-400">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10 GitHub Organizations Grid */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              10-Organization GitHub Federation
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {FEDERATION_ORGS.map((item) => (
                <a
                  key={item.org}
                  href={`https://github.com/${item.org}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.15] p-2.5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                      @{item.org}
                    </span>
                    <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 truncate">{item.scope}</p>
                  <p className="text-[10px] font-mono text-emerald-400/90 mt-1">{item.status}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Direct Downloadable Starter Bundles ($1 & $7) + Cockpits */}
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                  Micro SKU · $1 Starter Bundle
                </span>
                <Link
                  href="/checkout/reality-md-starter-pack"
                  className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
                >
                  Checkout Cockpit ($1) →
                </Link>
              </div>
              <h4 className="text-sm font-semibold text-white mt-1">
                reality.md Starter Pack (v1.0.0)
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Canonical operating context template, AGENTS.md Maker!=Checker contract, and 5-Invariants checklist.
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-[11px] font-mono">
                <a
                  href="/products/reality-md-starter-pack/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-emerald-400/50"
                >
                  README.md
                </a>
                <a
                  href="/products/reality-md-starter-pack/reality.template.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-emerald-400/50"
                >
                  reality.template.md
                </a>
                <a
                  href="/products/reality-md-starter-pack/AGENTS.starter.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-emerald-400/50"
                >
                  AGENTS.starter.md
                </a>
                <a
                  href="/products/reality-md-starter-pack/5-invariants-checklist.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-emerald-400/50"
                >
                  5-invariants-checklist.md
                </a>
                <a
                  href="/products/reality-md-starter-pack/manifest.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-emerald-400/50"
                >
                  manifest.json
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                  Quick Win SKU · $7 Audio Bundle
                </span>
                <Link
                  href="/checkout/suno-power-pack-25"
                  className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
                >
                  Checkout Cockpit ($7) →
                </Link>
              </div>
              <h4 className="text-sm font-semibold text-white mt-1">
                25 Suno v4/v4.5 Power Prompts Pack
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                25 studio-tested prompts across 5 genres with exact arrangement metatags, BPM, keys, and release checklist.
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-[11px] font-mono">
                <a
                  href="/products/suno-power-pack-25/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-cyan-400/50"
                >
                  README.md
                </a>
                <a
                  href="/products/suno-power-pack-25/suno-v4-25-prompts.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-cyan-400/50"
                >
                  suno-v4-25-prompts.md
                </a>
                <a
                  href="/products/suno-power-pack-25/suno-v4-25-prompts.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-cyan-400/50"
                >
                  suno-v4-25-prompts.json
                </a>
                <a
                  href="/products/suno-power-pack-25/commercial-release-checklist.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-black/50 border border-white/10 text-zinc-200 hover:border-cyan-400/50"
                >
                  commercial-release-checklist.md
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop calendar tile */}
        <section>
          <Link
            href="/ops/calendar"
            className="group flex items-center gap-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.06] to-transparent hover:from-cyan-500/[0.10] hover:border-cyan-500/30 p-5 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">
                Workshop Calendar
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Travel windows, confirmed deliveries, open booking slots. Source: docs/workshops/CALENDAR.md
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
          </Link>
        </section>

        {/* Production deploy status */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-cyan-400" />
            Production Deploys
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {prodDeploys.length === 0 && (
              <p className="text-sm text-zinc-500 col-span-full">
                No deploy data — set VERCEL_TOKEN in environment
              </p>
            )}
            {prodDeploys.map((d) => (
              <a
                key={d.id}
                href={d.inspectorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <DeployStateIcon state={d.state} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {d.meta.githubCommitMessage?.split('\n')[0] ?? d.id}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {d.meta.githubCommitRef ?? 'main'} · {timeAgo(d.created)}
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Agent PRs */}
        {agentPRs.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-400" />
              Agent PRs
            </h2>
            <div className="space-y-2">
              {agentPRs.map((pr) => (
                <PRRow key={`${pr.repo}-${pr.number}`} pr={pr} />
              ))}
            </div>
          </section>
        )}

        {/* Human PRs */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-emerald-400" />
            Open PRs
          </h2>
          {humanPRs.length === 0 && filteredPRs.length === 0 ? (
            <GlowCard color="emerald">
              <div className="p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-zinc-300">All clear — no open PRs</p>
              </div>
            </GlowCard>
          ) : (
            <div className="space-y-2">
              {humanPRs.map((pr) => (
                <PRRow key={`${pr.repo}-${pr.number}`} pr={pr} />
              ))}
            </div>
          )}
        </section>

        {/* Agent queue */}
        {issues.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Agent Queue
            </h2>
            <div className="space-y-2">
              {issues.map((issue) => {
                const agent = agentFromLabels(issue.labels)
                return (
                  <a
                    key={`${issue.repo}-${issue.number}`}
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-mono text-amber-300">
                      #{issue.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{issue.title}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {issue.repo} · {agent && <span className="text-violet-300">{agent}</span>}
                        {agent && ' · '}
                        {timeAgo(issue.created_at)}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-zinc-600 text-center">
            Auto-refreshes every 60s via ISR. Data: GitHub API + Vercel API.
            <br />
            <Link href="/" className="text-zinc-500 hover:text-zinc-300">
              frankx.ai
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

function PRRow({ pr }: { pr: GHPullRequest }) {
  const agent = agentFromLabels(pr.labels)
  return (
    <motion.a
      href={pr.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        <GitPullRequest className="w-4 h-4 text-emerald-300" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate">
          {pr.title}
          {pr.draft && (
            <span className="ml-2 text-xs text-zinc-500 font-normal">draft</span>
          )}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">
          {pr.repo}#{pr.number} · {pr.head.ref} → {pr.base.ref}
          {agent && (
            <>
              {' '}
              · <span className="text-violet-300">{agent}</span>
            </>
          )}
          {' '}· {timeAgo(pr.updated_at)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {pr.labels
          .filter((l) => !l.name.startsWith('ao/'))
          .slice(0, 3)
          .map((l) => (
            <span
              key={l.name}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
              style={{
                color: `#${l.color}`,
                borderColor: `#${l.color}33`,
                backgroundColor: `#${l.color}15`,
              }}
            >
              {l.name}
            </span>
          ))}
        <GitBranch className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
    </motion.a>
  )
}
