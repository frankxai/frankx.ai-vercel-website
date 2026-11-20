export type FrankxSkillCategory = 'engineering' | 'architecture' | 'content' | 'media' | 'quality'

export type FrankxSkillRecord = {
  slug: string
  name: string
  category: FrankxSkillCategory
  summary: string
  installCommand: string
  triggerExample: string
  guideUrl: string
  repoUrl: string
}

const SITE = 'https://frankx.ai'
const SKILLS_REPO = 'https://github.com/frankxai/claude-skills-library'

const SKILLS_CATALOG: readonly FrankxSkillRecord[] = [
  {
    slug: 'mcp-architecture',
    name: 'MCP Architecture',
    category: 'architecture',
    summary:
      'Design stateless read-only Model Context Protocol servers with strict Zod schemas, bounded tool outputs, and host compatibility.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill mcp-architecture',
    triggerExample: 'Audit this MCP tool surface for schema bounds, pagination, and read-only annotations.',
    guideUrl: `${SITE}/guides/mcp-servers-claude-code-business`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'claude-sdk',
    name: 'Claude Agent SDK Patterns',
    category: 'engineering',
    summary:
      'Structure tool loops, structured outputs, subagent handoffs, and budget caps in TypeScript agent runtimes.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill claude-sdk',
    triggerExample: 'Wire a bounded subagent loop using Claude Code templates and tool allowlists.',
    guideUrl: `${SITE}/guides/claude-code-templates-starter-kit`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'langgraph-patterns',
    name: 'Multi-Agent Graph Patterns',
    category: 'architecture',
    summary:
      'Model deterministic state transitions, retry boundaries, and checkpointed human gates for multi-agent workflows.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill langgraph-patterns',
    triggerExample: 'Design a checkpointed graph with separate generation and verification nodes.',
    guideUrl: `${SITE}/guides/agentic-engineering-mastery-2026`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'vercel-ai-sdk',
    name: 'Vercel AI Runtime Decisions',
    category: 'engineering',
    summary:
      'Choose between serverless routes, fluid compute, and workflow queues for streaming agent responses on Next.js.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill vercel-ai-sdk',
    triggerExample: 'Map this Next.js agent endpoint to Edge or Node runtime with rate limiting.',
    guideUrl: `${SITE}/guides/vercel-agent-runtime-decisions`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'anatomy-of-a-production-skill',
    name: 'SKILL.md Authoring',
    category: 'engineering',
    summary:
      'Author compact SKILL.md instruction files with clear activation descriptions, eval fixtures, and zero context bloat.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill anatomy-of-a-production-skill',
    triggerExample: 'Refactor this verbose prompt into a portable SKILL.md directory with a promptfoo check.',
    guideUrl: `${SITE}/guides/anatomy-of-a-production-skill`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'brand-voice',
    name: 'Technical Editorial Voice',
    category: 'content',
    summary:
      'Enforce direct engineering prose free of inflated claims, synthetic contrasts, and unsupported marketing phrases.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill brand-voice',
    triggerExample: 'Review this landing page draft against editorial voice and claim verification rules.',
    guideUrl: `${SITE}/guides/ai-writing-system`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'excellence-book-writing',
    name: 'Long-Form Technical Books',
    category: 'content',
    summary:
      'Structure multi-chapter nonfiction with concrete worked examples, failure modes, and consistent terminology.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill excellence-book-writing',
    triggerExample: 'Outline a technical handbook chapter with one worked example and explicit scope limits.',
    guideUrl: `${SITE}/guides/frankx-skill-creation-methodology`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'suno-ai-mastery',
    name: 'Suno Studio Prompting',
    category: 'media',
    summary:
      'Compose structured arrangement tags, tempo cues, and instrumentation constraints for generative audio sessions.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill suno-ai-mastery',
    triggerExample: 'Draft a Suno arrangement prompt for an instrumental ambient synth piece at 96 BPM.',
    guideUrl: `${SITE}/guides/suno-prompt-playbook`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'voice-briefing-ops',
    name: 'Voice Briefing Workflows',
    category: 'media',
    summary:
      'Configure consent-gated voice synthesis, pronunciation dictionaries, and spoken founder journal pipelines.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill voice-briefing-ops',
    triggerExample: 'Plan a low-latency voice narration workflow with explicit consent checks.',
    guideUrl: `${SITE}/guides/elevenlabs-voice-guide`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'video-storyboard-gate',
    name: 'Three-Shot Video Stop Rule',
    category: 'media',
    summary:
      'Iterate generative video shots with a three-shot budget, fixed camera cues, and reference-frame visual checks.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill video-storyboard-gate',
    triggerExample: 'Create a three-shot reference brief and continuity log before rendering video.',
    guideUrl: `${SITE}/guides/higgsfield-ai-video-guide`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'ai-agent-ready-website',
    name: 'Agent-Readable Web Audit',
    category: 'quality',
    summary:
      'Validate llms.txt manifests, JSON-LD entity graphs, clean markdown exports, and public MCP discovery.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill ai-agent-ready-website',
    triggerExample: 'Audit this site for llms.txt coverage, canonical metadata, and machine-readable routes.',
    guideUrl: `${SITE}/guides/ai-agent-ready-website-checklist`,
    repoUrl: SKILLS_REPO,
  },
  {
    slug: 'claude-plugins-packaging',
    name: 'Plugin vs Skill Packaging',
    category: 'quality',
    summary:
      'Decide when to ship a standalone SKILL.md module versus a versioned plugin bundle with hooks and commands.',
    installCommand: 'npx skills add frankxai/claude-skills-library --skill claude-plugins-packaging',
    triggerExample: 'Package three team skills and one CI hook into an installable marketplace plugin.',
    guideUrl: `${SITE}/guides/claude-code-plugins-vs-skills`,
    repoUrl: SKILLS_REPO,
  },
]

export function listFrankxSkills(options: {
  category?: FrankxSkillCategory
  query?: string
  limit?: number
} = {}): { skills: FrankxSkillRecord[]; total: number } {
  const { category, query, limit = 12 } = options
  const q = query?.trim().toLowerCase() ?? ''

  const filtered = SKILLS_CATALOG.filter((skill) => {
    if (category && skill.category !== category) return false
    if (!q) return true
    return (
      skill.slug.toLowerCase().includes(q) ||
      skill.name.toLowerCase().includes(q) ||
      skill.summary.toLowerCase().includes(q) ||
      skill.category.toLowerCase().includes(q)
    )
  })

  return {
    skills: filtered.slice(0, Math.max(1, Math.min(25, limit))),
    total: filtered.length,
  }
}
