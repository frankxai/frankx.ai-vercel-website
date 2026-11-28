import programsFile from '@/data/affiliate/programs.json'
import { resolveProgramDestination, type ProgramDestination } from '@/lib/affiliates/resolve-destination'

export type StackGoal =
  | 'coding-agents'
  | 'voice-audio'
  | 'video-motion'
  | 'creator-publishing'
  | 'ai-architecture'
  | 'research-seo'

export type RecommendedStackTool = {
  id: string
  name: string
  role: string
  summary: string
  url: string
  guideUrl?: string
  relationship: 'sponsored' | 'editorial'
  sponsored: boolean
  rel: 'sponsored noopener' | 'noopener'
  disclosure: string
}

export type ToolCandidate = {
  id: string
  name: string
  role: string
  summary: string
  officialUrl: string
  guidePath?: string
  goals: readonly StackGoal[]
  partnerSlug?: string
  partnerDisclosure?: string
}

const SITE = 'https://frankx.ai'
const EDITORIAL_DISCLOSURE = 'Editorial recommendation — no affiliate relationship.'

const ORACLE_EXCLUDED_IDS = new Set([
  'aws',
  'amazon-web-services',
  'gcp',
  'google-cloud',
  'azure',
  'microsoft-azure',
  'digitalocean',
  'vultr',
  'linode',
  'hetzner',
])

const ORACLE_EXCLUDED_HOSTS = [
  'aws.amazon.com',
  'cloud.google.com',
  'azure.microsoft.com',
  'digitalocean.com',
  'vultr.com',
  'linode.com',
  'hetzner.com',
]

export function isOracleExcludedCandidate(
  candidate: Pick<ToolCandidate, 'id' | 'name' | 'officialUrl' | 'partnerSlug'>,
): boolean {
  const slugName = candidate.name.toLowerCase().trim().replace(/\s+/g, '-')
  if (
    ORACLE_EXCLUDED_IDS.has(candidate.id.toLowerCase()) ||
    ORACLE_EXCLUDED_IDS.has(slugName) ||
    (candidate.partnerSlug ? ORACLE_EXCLUDED_IDS.has(candidate.partnerSlug.toLowerCase()) : false)
  ) {
    return true
  }
  try {
    const host = new URL(candidate.officialUrl).hostname.toLowerCase()
    return ORACLE_EXCLUDED_HOSTS.some((domain) => host === domain || host.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

const CANDIDATES: readonly ToolCandidate[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    role: 'Primary terminal coding agent',
    summary: 'Runs repository-scoped refactors, MCP connections, and subagent checks directly from the terminal.',
    officialUrl: 'https://www.anthropic.com/claude-code',
    guidePath: '/guides/claude-code-getting-started',
    goals: ['coding-agents', 'ai-architecture', 'research-seo'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    role: 'Edge & serverless web deployment',
    summary: 'Deploys Next.js App Router applications, stateless MCP HTTP routes, and preview environments.',
    officialUrl: 'https://vercel.com',
    guidePath: '/guides/vercel-agent-runtime-decisions',
    goals: ['coding-agents', 'ai-architecture', 'creator-publishing'],
  },
  {
    id: 'wispr',
    name: 'Wispr Flow',
    role: 'Voice dictation for agent specs',
    summary: 'Converts spoken engineering notes and prompts into formatted text across terminal and IDE workflows.',
    officialUrl: 'https://wisprflow.ai',
    guidePath: '/guides/wispr-flow',
    goals: ['coding-agents', 'voice-audio', 'creator-publishing'],
    partnerSlug: 'wispr',
    partnerDisclosure:
      'Partner referral link via /go/wispr at no extra cost to you. Commission terms live in the vendor partner dashboard.',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    role: 'Consent-gated voice synthesis & briefings',
    summary: 'Synthesizes multilingual narration and founder audio briefings via HTTP/WebSocket API and MCP.',
    officialUrl: 'https://elevenlabs.io',
    guidePath: '/guides/elevenlabs-voice-guide',
    goals: ['voice-audio', 'video-motion', 'creator-publishing'],
    partnerSlug: 'elevenlabs',
    partnerDisclosure:
      'Affiliate link via /go/elevenlabs (PartnerStack: 22% Starter-Scale or 11% Business for 12 months; Enterprise excluded) at no extra cost.',
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    role: 'Controlled reference-to-video motion passes',
    summary: 'Produces short-form camera motion shots governed by a three-shot budget and face-reference continuity checks.',
    officialUrl: 'https://higgsfield.ai',
    guidePath: '/guides/higgsfield-ai-video-guide',
    goals: ['video-motion'],
    partnerSlug: 'higgsfield',
    partnerDisclosure:
      'Partner referral link via /go/higgsfield at no extra cost to you. Commission terms live in the vendor partner dashboard.',
  },
  {
    id: 'suno',
    name: 'Suno',
    role: 'Original studio audio synthesis',
    summary: 'Generates instrumental underscores, podcast intros, and vocal stems under structured arrangement cues.',
    officialUrl: 'https://suno.com',
    guidePath: '/guides/suno-prompt-playbook',
    goals: ['voice-audio', 'creator-publishing'],
  },
  {
    id: 'nextjs',
    name: 'Next.js App Router',
    role: 'Full-stack React framework',
    summary: 'Combines React Server Components, static generation, and Route Handlers for human and agent surfaces.',
    officialUrl: 'https://nextjs.org',
    guidePath: '/guides/ai-agent-ready-website-checklist',
    goals: ['coding-agents', 'ai-architecture', 'creator-publishing'],
  },
  {
    id: 'cloudflare-workers',
    name: 'Cloudflare Workers',
    role: 'Edge routing & edge state',
    summary: 'Hosts low-latency edge handlers, D1/KV stores, and lightweight request firewalls.',
    officialUrl: 'https://developers.cloudflare.com/workers/',
    guidePath: '/guides/mcp-servers-claude-code-business',
    goals: ['ai-architecture', 'coding-agents'],
  },
  {
    id: 'descript',
    name: 'Descript',
    role: 'Transcript-driven audio and video editing',
    summary: 'Edits talking-head recordings by editing text transcripts and exporting clean chapters.',
    officialUrl: 'https://www.descript.com',
    guidePath: '/resources/builder-stack',
    goals: ['voice-audio', 'video-motion', 'creator-publishing'],
  },
  {
    id: 'gamma',
    name: 'Gamma',
    role: 'Structured technical decks from markdown',
    summary: 'Converts workshop outlines and architecture summaries into shareable browser decks.',
    officialUrl: 'https://gamma.app',
    guidePath: '/resources/builder-stack',
    goals: ['creator-publishing', 'ai-architecture'],
  },
  {
    id: 'figma',
    name: 'Figma',
    role: 'UI systems & token specifications',
    summary: 'Defines component geometry, responsive breakpoints, and design token variables before build.',
    officialUrl: 'https://www.figma.com',
    guidePath: '/resources/builder-stack',
    goals: ['creator-publishing', 'video-motion'],
  },
  {
    id: 'github',
    name: 'GitHub',
    role: 'Version control & automated merge gates',
    summary: 'Hosts branch-isolated agent PRs, required CI suites, and SHA-verified review checks.',
    officialUrl: 'https://github.com',
    guidePath: '/guides/claude-code-templates-starter-kit',
    goals: ['coding-agents', 'ai-architecture', 'research-seo'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    role: 'Citation-backed web research',
    summary: 'Cross-checks documentation updates, release dates, and vendor pricing before publishing claims.',
    officialUrl: 'https://www.perplexity.ai',
    guidePath: '/guides/perplexity-ai-guide',
    goals: ['research-seo', 'creator-publishing'],
  },
]

const programs = (programsFile as { programs: ProgramDestination[] }).programs

export function recommendFrankxStack(
  options: { goal: StackGoal; query?: string; limit?: number; candidates?: readonly ToolCandidate[] },
  now = new Date(),
): {
  goal: StackGoal
  tools: RecommendedStackTool[]
  total: number
  disclosureNote: string
} {
  const { goal, query, limit = 6, candidates = CANDIDATES } = options
  const q = query?.trim().toLowerCase() ?? ''

  const matched = candidates.filter((candidate) => {
    if (isOracleExcludedCandidate(candidate)) return false
    if (!candidate.goals.includes(goal)) return false
    if (!q) return true
    return (
      candidate.name.toLowerCase().includes(q) ||
      candidate.role.toLowerCase().includes(q) ||
      candidate.summary.toLowerCase().includes(q)
    )
  })

  const boundedLimit = Math.max(1, Math.min(12, limit))
  const tools: RecommendedStackTool[] = matched.slice(0, boundedLimit).map((candidate) => {
    let url = candidate.officialUrl
    let sponsored = false
    let disclosure = EDITORIAL_DISCLOSURE

    if (candidate.partnerSlug) {
      const lookupKeys = [candidate.partnerSlug, candidate.name]
        .filter(Boolean)
        .map((key) => key.toLowerCase())
      const program = programs.find((entry) =>
        [entry.tool, ...(entry.aliases ?? [])].some((name) => lookupKeys.includes(name.toLowerCase())),
      )
      // Fail closed: only programs explicitly marked active may produce a sponsored link.
      // Pass the single matched program record so status gating and destination resolution never diverge.
      const isBlockedStatus = program?.status !== 'active'
      if (program && !isBlockedStatus) {
        const resolved = resolveProgramDestination(
          program.tool,
          [program],
          { name: candidate.name, url: candidate.officialUrl },
          now,
        )
        if (resolved?.sponsored && resolved.href) {
          url = resolved.href.startsWith('/') ? `${SITE}${resolved.href}` : resolved.href
          sponsored = true
          disclosure =
            candidate.partnerDisclosure ??
            `Partner link via ${resolved.href} at no extra cost to you.`
        }
      }
    }

    return {
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      summary: candidate.summary,
      url,
      guideUrl: candidate.guidePath ? `${SITE}${candidate.guidePath}` : undefined,
      relationship: sponsored ? 'sponsored' : 'editorial',
      sponsored,
      rel: sponsored ? 'sponsored noopener' : 'noopener',
      disclosure,
    }
  })

  return {
    goal,
    tools,
    total: matched.length,
    disclosureNote:
      'Active verified partner tools use https://frankx.ai/go/<slug> and carry disclosure beside the link. Unverified, held, or editorial tools link directly to official URLs with no affiliate relationship.',
  }
}
