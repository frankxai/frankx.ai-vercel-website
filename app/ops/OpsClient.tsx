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

export function OpsClient({ prs, issues, deploys }: OpsClientProps) {
  const [filter, setFilter] = useState<'all' | 'frankx' | 'arcanea' | 'prod'>('all')

  const filteredPRs = prs.filter((pr) => {
    if (filter === 'all') return true
    if (filter === 'prod') return pr.repo === 'frankx.ai-vercel-website'
    if (filter === 'frankx') return pr.repo === 'FrankX'
    if (filter === 'arcanea') return pr.repo === 'arcanea'
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  Mission Control
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Agent OS — Ops
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Activity className="w-4 h-4" />
                {prs.length} PRs
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Zap className="w-4 h-4 text-amber-400" />
                {issues.length} queued
              </span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {(['all', 'frankx', 'prod', 'arcanea'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === f
                    ? 'bg-white/[0.10] text-white border border-white/[0.15]'
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                }`}
              >
                {f === 'all' ? 'All repos' : f === 'prod' ? 'Production' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-8">
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
