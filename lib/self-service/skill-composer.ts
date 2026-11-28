export type OperatorRoleId =
  | 'solo-founder'
  | 'fullstack-engineer'
  | 'creative-director'
  | 'content-seo-operator'

export type ComposerHarnessId = 'claude-code' | 'codex' | 'cursor' | 'antigravity' | 'opencode'

export interface SkillModuleSpec {
  id: string
  name: string
  category: 'Verification' | 'Editorial' | 'Security' | 'UX & A11y' | 'Discovery'
  summary: string
  ruleText: string
}

export const ROLE_OPTIONS: Record<
  OperatorRoleId,
  { id: OperatorRoleId; label: string; focus: string; defaultModules: string[] }
> = {
  'solo-founder': {
    id: 'solo-founder',
    label: 'Solo Founder',
    focus: 'Ship real product increments quickly while keeping billing, copy, and security verified.',
    defaultModules: ['maker-checker-gate', 'fail-closed-money', 'anti-slop-editorial', 'mobile-dvh-qa'],
  },
  'fullstack-engineer': {
    id: 'fullstack-engineer',
    label: 'Full-Stack Engineer',
    focus: 'Strict TypeScript contracts, security scanning, and verified green builds before PR ready.',
    defaultModules: ['maker-checker-gate', 'fail-closed-money', 'security-secret-scan', 'mobile-dvh-qa'],
  },
  'creative-director': {
    id: 'creative-director',
    label: 'Design & Brand Lead',
    focus: 'Consistent typographic hierarchy, accessible contrast, reduced motion, and human copy.',
    defaultModules: ['anti-slop-editorial', 'mobile-dvh-qa', 'aeo-ax-audit'],
  },
  'content-seo-operator': {
    id: 'content-seo-operator',
    label: 'Content, SEO & AX Operator',
    focus: 'Structured JSON-LD entities, truthful claims, clean llms.txt, and crawler visibility.',
    defaultModules: ['anti-slop-editorial', 'aeo-ax-audit', 'maker-checker-gate'],
  },
}

export const COMPOSER_HARNESSES: Record<
  ComposerHarnessId,
  { id: ComposerHarnessId; label: string; primaryFile: string }
> = {
  'claude-code': { id: 'claude-code', label: 'Claude Code', primaryFile: 'CLAUDE.md' },
  codex: { id: 'codex', label: 'Codex CLI', primaryFile: 'AGENTS.md' },
  cursor: { id: 'cursor', label: 'Cursor', primaryFile: 'AGENTS.md' },
  antigravity: { id: 'antigravity', label: 'Antigravity', primaryFile: 'AGENTS.md' },
  opencode: { id: 'opencode', label: 'OpenCode', primaryFile: 'AGENTS.md' },
}

export const SKILL_MODULES: SkillModuleSpec[] = [
  {
    id: 'maker-checker-gate',
    name: 'Maker != Checker Review',
    category: 'Verification',
    summary: 'Separates the author branch from an independent read-only verifier checking exact files and test outputs.',
    ruleText: 'Never declare a task done without citing exact commands run after the final edit and an independent review of the full diff.',
  },
  {
    id: 'fail-closed-money',
    name: 'Fail-Closed Money & Human Gates',
    category: 'Security',
    summary: 'Blocks autonomous spend, live price switches, DNS changes, or credential mutations behind human sign-off.',
    ruleText: 'Stage commerce and pricing diffs as drafts only; verify server-catalog SKU resolution and explicit ENABLE_* feature flags.',
  },
  {
    id: 'anti-slop-editorial',
    name: 'Anti-Slop & Truthful Claims',
    category: 'Editorial',
    summary: 'Bans invented user counts, rhetorical contrast clichés, and abstract prestige wording.',
    ruleText: 'Report only verified metrics with measurement context; replace vague hype with concrete actions and visible limitations.',
  },
  {
    id: 'aeo-ax-audit',
    name: 'AEO / GEO / AX Parity',
    category: 'Discovery',
    summary: 'Maintains synchronized llms.txt, Schema.org JSON-LD graphs, and clean AI search crawler directives.',
    ruleText: 'Every public product surface must expose valid Schema.org JSON-LD, accurate llms.txt links with zero 404s, and explicit robots rules.',
  },
  {
    id: 'security-secret-scan',
    name: 'Secret & Timeout Boundary',
    category: 'Security',
    summary: 'Requires Zod bounds on inputs, 8s outbound worker timeouts, and zero hardcoded secrets.',
    ruleText: 'Enforce strict schema max-lengths, `AbortSignal.timeout`, and env-var-only secrets on every API route.',
  },
  {
    id: 'mobile-dvh-qa',
    name: 'Desktop 1440px + Mobile 390px QA',
    category: 'UX & A11y',
    summary: 'Checks contrast, keyboard focus rings, dynamic viewport units, and prefers-reduced-motion.',
    ruleText: 'Verify interactive controls at 1440px and 390px widths, keep WCAG AA contrast, and honor prefers-reduced-motion.',
  },
]

export interface ComposedStackOutput {
  role: { id: OperatorRoleId; label: string; focus: string }
  harness: { id: ComposerHarnessId; label: string; primaryFile: string }
  selectedModules: SkillModuleSpec[]
  files: { path: string; purpose: string; content: string }[]
}

export function composeSkillStack(input: {
  projectName: string
  roleId: OperatorRoleId
  harnessId: ComposerHarnessId
  moduleIds: string[]
  includeMcp: boolean
}): ComposedStackOutput {
  const project = input.projectName.trim() || 'my-workspace'
  const role = ROLE_OPTIONS[input.roleId] ?? ROLE_OPTIONS['solo-founder']
  const harness = COMPOSER_HARNESSES[input.harnessId] ?? COMPOSER_HARNESSES['claude-code']

  const selected = SKILL_MODULES.filter((m) => input.moduleIds.includes(m.id))
  const effectiveModules = selected.length > 0 ? selected : [SKILL_MODULES[0]]

  const agentsMd = `# AGENTS.md — ${project} (${role.label} · ${harness.label})

## Operating Focus
${role.focus}

## Active Guardrails (${effectiveModules.length} selected modules)
${effectiveModules.map((m, idx) => `${idx + 1}. **${m.name} (${m.category}):** ${m.ruleText}`).join('\n')}

## Verification Before Marking Complete
- Run project typecheck, linter, unit tests, and production build sequentially after final edits.
- Never extrapolate unverified numbers or hide skipped tests.
`

  const claudeMd = `# CLAUDE.md — ${project}

Follow \`AGENTS.md\` and \`skills-manifest.json\` in this directory.
Primary instruction surface for **${harness.label}** targeting the **${role.label}** workflow.

### Session Rules
${effectiveModules.map((m) => `- **${m.name}:** ${m.ruleText}`).join('\n')}
`

  const manifestJson = JSON.stringify(
    {
      schema: 'frankx.skill_composer.v1',
      projectName: project,
      role: role.id,
      harness: harness.id,
      moduleCount: effectiveModules.length,
      modules: effectiveModules.map((m) => ({
        id: m.id,
        name: m.name,
        category: m.category,
        rule: m.ruleText,
      })),
      verifiedLocallyOnly: true,
    },
    null,
    2,
  )

  const mcpJson = JSON.stringify(
    {
      mcpServers: {
        gencreator_stateless: {
          type: 'http',
          url: 'https://gencreator.ai/api/mcp',
          note: 'Read-only and draft-only creator tooling.',
        },
        starlight_discovery: {
          type: 'http',
          url: 'https://starlightintelligence.ai/api/mcp',
          note: 'Public skill & mission registry.',
        },
      },
    },
    null,
    2,
  )

  const installSh = `#!/usr/bin/env sh
set -eu
mkdir -p .ai-stack
cp AGENTS.md CLAUDE.md skills-manifest.json .ai-stack/
echo "Installed ${effectiveModules.length} skill contracts into .ai-stack/ for ${harness.label}."
`

  const installPs1 = `$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path ".ai-stack" | Out-Null
Copy-Item AGENTS.md, CLAUDE.md, skills-manifest.json -Destination ".ai-stack" -Force
Write-Output "Installed ${effectiveModules.length} skill contracts into .ai-stack/ for ${harness.label}."
`

  const files: { path: string; purpose: string; content: string }[] = [
    { path: 'AGENTS.md', purpose: 'Cross-harness operating constitution and guardrails.', content: agentsMd },
    { path: 'CLAUDE.md', purpose: 'Claude Code session entry point referencing AGENTS.md.', content: claudeMd },
    { path: 'skills-manifest.json', purpose: 'Machine-readable inventory of exact selected modules.', content: manifestJson },
    { path: 'install.sh', purpose: 'POSIX shell installer copying contracts into .ai-stack/.', content: installSh },
    { path: 'install.ps1', purpose: 'PowerShell installer copying contracts into .ai-stack/.', content: installPs1 },
  ]

  if (input.includeMcp) {
    files.push({
      path: '.mcp.json',
      purpose: 'Stateless read-only HTTP MCP server configuration.',
      content: mcpJson,
    })
  }

  return {
    role: { id: role.id, label: role.label, focus: role.focus },
    harness,
    selectedModules: effectiveModules,
    files,
  }
}
