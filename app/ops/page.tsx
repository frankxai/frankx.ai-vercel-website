import { Suspense } from 'react'
import type { Metadata } from 'next'
import { OpsClient } from './OpsClient'

export const metadata: Metadata = {
  title: 'Ops — Agent Mission Control | FrankX',
  description:
    'Real-time mission control for autonomous coding agents across FrankX and Arcanea repos.',
  robots: { index: false, follow: false },
}

// GitHub + Vercel data fetched server-side (no client API keys needed)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPOS = ['frankxai/FrankX', 'frankxai/frankx.ai-vercel-website', 'frankxai/arcanea']

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

async function fetchGitHub(path: string) {
  if (!GITHUB_TOKEN) return null
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  return res.json()
}

async function getPRs(): Promise<GHPullRequest[]> {
  const all: GHPullRequest[] = []
  for (const repo of REPOS) {
    const prs = await fetchGitHub(`repos/${repo}/pulls?state=open&per_page=10&sort=updated`)
    if (prs) {
      for (const pr of prs) {
        all.push({ ...pr, repo: repo.split('/')[1] })
      }
    }
  }
  return all.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

async function getAgentIssues(): Promise<GHIssue[]> {
  const all: GHIssue[] = []
  for (const repo of REPOS) {
    const issues = await fetchGitHub(
      `repos/${repo}/issues?state=open&labels=ao/builder:claude-code,ao/builder:gemini-cli,ao/builder:codex-cli&per_page=20`
    )
    if (issues) {
      for (const issue of issues) {
        if (!issue.pull_request) {
          all.push({ ...issue, repo: repo.split('/')[1] })
        }
      }
    }
  }
  return all
}

async function getRecentDeploys(): Promise<VercelDeploy[]> {
  const token = process.env.VERCEL_TOKEN
  if (!token) return []
  const res = await fetch(
    'https://api.vercel.com/v6/deployments?projectId=prj_NHVIKZtglNidOE1FJiq6eYx5QjIL&teamId=starlight-intelligence&limit=5',
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    }
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.deployments ?? []
}

export default async function OpsPage() {
  const [prs, issues, deploys] = await Promise.all([
    getPRs(),
    getAgentIssues(),
    getRecentDeploys(),
  ])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Suspense fallback={<OpsLoading />}>
        <OpsClient prs={prs} issues={issues} deploys={deploys} />
      </Suspense>
    </div>
  )
}

function OpsLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
      <div className="text-zinc-500 text-sm">Loading mission control...</div>
    </div>
  )
}
