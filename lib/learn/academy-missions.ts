/**
 * Explicit guide-slug -> AI Architect Academy & Starlight Intelligence Academy mission mappings.
 *
 * Mirrors the explicit, greppable philosophy of `lib/learn/related-portals.ts`:
 * every guide in `content/guides/*.mdx` declares its primary and secondary ICP tracks,
 * paired open-source CLI lab(s) in `frankxai/ai-architect-academy`, target interactive
 * mission route(s) on `starlightintelligence.academy`, a concrete shippable artifact
 * with a non-compensable red-gate check, Circle peer-critique tie-in, and verified
 * read-only `/api/mcp` agent entrypoint metadata.
 */

export type IcpTrackId =
  | 'enterprise-architect'
  | 'production-builder'
  | 'technical-creator'
  | 'workflow-operator'

export interface IcpTrackDefinition {
  id: IcpTrackId
  label: string
  roleSummary: string
  cadenceWeeks: string
  defaultSiaUrl: string
}

export interface PairedCliLab {
  id: string
  title: string
  repoPath: string
  githubUrl: string
  runCommand: string
  focus: string
}

export interface SiaMissionTarget {
  id: string
  title: string
  siaPath: string
  url: string
  school: 'S-01' | 'H-01' | 'U-01' | 'Atlas'
  surfaceStatus: string
}

export interface ArtifactRedGate {
  deliverable: string
  verificationCommand: string
  redGateCondition: string
}

export interface CircleCritiqueTieIn {
  spaceName: string
  protocolLabel: string
  promptFocus: string
}

export interface McpAgentEntrypoint {
  endpointPath: '/api/mcp'
  serverCardPath: '/api/mcp/server-card'
  transport: 'streamable-http'
  method: 'POST'
  readOnly: true
  toolName: 'frankx_search_site' | 'frankx_get_article' | 'frankx_list_products'
  searchQuery: string
  cliInstallCommand: string
  jsonRpcSample: string
}

export interface AcademyMissionBridgeSpec {
  guideSlug: string
  curriculumWeek: string
  primaryIcp: IcpTrackId
  secondaryIcp: IcpTrackId
  cliLabs: readonly [PairedCliLab, ...PairedCliLab[]]
  siaMissions: readonly [SiaMissionTarget, ...SiaMissionTarget[]]
  artifact: ArtifactRedGate
  circleCritique: CircleCritiqueTieIn
  mcpEntrypoint: McpAgentEntrypoint
  isFallback?: boolean
}

const AAA_REPO_BASE = 'https://github.com/frankxai/ai-architect-academy/tree/main'
const SIA_SITE_BASE = 'https://starlightintelligence.academy'
const MCP_PUBLIC_URL = 'https://www.frankx.ai/api/mcp'

export const ICP_TRACKS: Record<IcpTrackId, IcpTrackDefinition> = {
  'enterprise-architect': {
    id: 'enterprise-architect',
    label: 'Enterprise architect',
    roleSummary: 'Designs trust boundaries, model gateways, evaluation gates, and operational runbooks.',
    cadenceWeeks: 'Weeks 01-04 & 11-12',
    defaultSiaUrl: `${SIA_SITE_BASE}/academy/systems`,
  },
  'production-builder': {
    id: 'production-builder',
    label: 'Production builder',
    roleSummary: 'Ships hybrid retrieval, typed MCP servers, deterministic agent loops, and test suites.',
    cadenceWeeks: 'Weeks 02-08',
    defaultSiaUrl: `${SIA_SITE_BASE}/academy/studio`,
  },
  'technical-creator': {
    id: 'technical-creator',
    label: 'Technical creator',
    roleSummary: 'Produces governed visual, voice, music, and programmatic video systems with clear rights.',
    cadenceWeeks: 'Weeks 05 & 09-10',
    defaultSiaUrl: `${SIA_SITE_BASE}/academy/create`,
  },
  'workflow-operator': {
    id: 'workflow-operator',
    label: 'Workflow operator',
    roleSummary: 'Triages team processes into automate, assist-only, or do-not-automate contracts.',
    cadenceWeeks: 'Weeks 01, 05, 07 & 11',
    defaultSiaUrl: `${SIA_SITE_BASE}/academy/founder-operations`,
  },
}

/**
 * Verified against `app/api/mcp/route.ts`, `app/api/mcp/server-card/route.ts`,
 * and `lib/mcp/frankx-server.ts`: stateless POST Streamable HTTP (`GET /api/mcp`
 * returns 405 by design), server card at `GET /api/mcp/server-card`, and three
 * read-only tools (`frankx_search_site`, `frankx_get_article`, `frankx_list_products`).
 */
export const FRANKX_MCP_ENTRYPOINT_META = {
  endpointPath: '/api/mcp' as const,
  serverCardPath: '/api/mcp/server-card' as const,
  aiCatalogPath: '/.well-known/ai-catalog.json' as const,
  transport: 'streamable-http' as const,
  method: 'POST' as const,
  readOnly: true as const,
  availableTools: [
    'frankx_search_site',
    'frankx_get_article',
    'frankx_list_products',
  ] as const,
  cliInstallCommand: `claude mcp add --transport http frankx ${MCP_PUBLIC_URL}`,
}

function buildMcpEntrypoint(
  searchQuery: string,
  toolName: McpAgentEntrypoint['toolName'] = 'frankx_search_site'
): McpAgentEntrypoint {
  const args =
    toolName === 'frankx_list_products'
      ? { limit: 10 }
      : toolName === 'frankx_get_article'
        ? { slug: searchQuery, maxChars: 20000 }
        : { query: searchQuery, limit: 5 }

  return {
    endpointPath: '/api/mcp',
    serverCardPath: '/api/mcp/server-card',
    transport: 'streamable-http',
    method: 'POST',
    readOnly: true,
    toolName,
    searchQuery,
    cliInstallCommand: FRANKX_MCP_ENTRYPOINT_META.cliInstallCommand,
    jsonRpcSample: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args,
      },
    }),
  }
}

const LABS = {
  ragPipeline: {
    id: 'lab-01-rag-pipeline',
    title: 'Lab 01: Production RAG pipeline repair',
    repoPath: 'labs/01-rag-pipeline',
    githubUrl: `${AAA_REPO_BASE}/labs/01-rag-pipeline`,
    runCommand: 'pytest labs/01-rag-pipeline/tests/ -v',
    focus: 'Fix chunk truncation, overlap loss, and hybrid lexical-dense retrieval.',
  },
  multiAgent: {
    id: 'lab-02-multi-agent-system',
    title: 'Lab 02: Deterministic multi-agent coordinator',
    repoPath: 'labs/02-multi-agent-system',
    githubUrl: `${AAA_REPO_BASE}/labs/02-multi-agent-system`,
    runCommand: 'pytest labs/02-multi-agent-system/tests/ -v',
    focus: 'Bound step counts, separate maker from checker, and enforce typed handoffs.',
  },
  mcpServer: {
    id: 'lab-03-mcp-server',
    title: 'Lab 03: Scoped MCP server & tool schemas',
    repoPath: 'labs/03-mcp-server',
    githubUrl: `${AAA_REPO_BASE}/labs/03-mcp-server`,
    runCommand: 'cd labs/03-mcp-server && npm test',
    focus: 'Validate tool inputs with strict schemas, remove inline secrets, and log calls.',
  },
  trustFirewall: {
    id: 'lab-04-trust-boundary-firewall',
    title: 'Lab 04: Trust-boundary & injection firewall',
    repoPath: 'labs/04-trust-boundary-firewall',
    githubUrl: `${AAA_REPO_BASE}/labs/04-trust-boundary-firewall`,
    runCommand: 'python -m unittest discover -s labs/04-trust-boundary-firewall/tests -v',
    focus: 'Quarantine untrusted payloads, allowlist capabilities, and block unguarded writes.',
  },
  evalGate: {
    id: 'lab-05-eval-admission-gate',
    title: 'Lab 05: Non-compensable eval admission gate',
    repoPath: 'labs/05-eval-admission-gate',
    githubUrl: `${AAA_REPO_BASE}/labs/05-eval-admission-gate`,
    runCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
    focus: 'Gate releases on golden trajectories, calibration drift checks, and pass/block receipts.',
  },
  claudeWorkflows: {
    id: 'workflow-claude-code',
    title: 'Claude Code workflow & hook harness',
    repoPath: '06-agent-workflows/claude-code',
    githubUrl: `${AAA_REPO_BASE}/06-agent-workflows/claude-code`,
    runCommand: 'git status && npx tsc --noEmit',
    focus: 'Configure CLAUDE.md contracts, branch isolation, and pre-tool verification hooks.',
  },
  skillPack: {
    id: 'claude-architect-skills',
    title: 'Production SKILL.md & template kit',
    repoPath: 'claude-ai-architect/skills',
    githubUrl: `${AAA_REPO_BASE}/claude-ai-architect/skills`,
    runCommand: 'ls claude-ai-architect/skills',
    focus: 'Package versioned instructions, deterministic scripts, and trigger boundaries.',
  },
  creatorEvals: {
    id: 'project-creator-evals',
    title: 'Creator studio & multimodal eval pack',
    repoPath: '05-projects/creator-evals',
    githubUrl: `${AAA_REPO_BASE}/05-projects/creator-evals`,
    runCommand: 'ls 05-projects/creator-evals',
    focus: 'Audit visual, voice, sonic, and copy outputs against brand taste and rights rules.',
  },
  creatorAutomation: {
    id: 'pattern-creator-studio',
    title: 'Creator studio automation pattern',
    repoPath: '01-design-patterns/creator-studio-automation.md',
    githubUrl: `${AAA_REPO_BASE}/01-design-patterns/creator-studio-automation.md`,
    runCommand: 'cat 01-design-patterns/creator-studio-automation.md',
    focus: 'Stage shot lists, audio stems, and visual plates behind explicit credit caps.',
  },
  governanceChecklist: {
    id: 'governance-human-review',
    title: 'Governance & human-review gate pack',
    repoPath: '08-governance',
    githubUrl: `${AAA_REPO_BASE}/08-governance`,
    runCommand: 'ls 08-governance',
    focus: 'Enforce procurement due diligence, privacy boundaries, and incident rollback drills.',
  },
  vercelSdkToolchain: {
    id: 'toolchain-vercel-ai-sdk',
    title: 'Vercel AI SDK & gateway reference',
    repoPath: '06-toolchains/vercel-ai-sdk.md',
    githubUrl: `${AAA_REPO_BASE}/06-toolchains/vercel-ai-sdk.md`,
    runCommand: 'cat 06-toolchains/vercel-ai-sdk.md',
    focus: 'Wire typed streaming tool calls, provider failover, and runtime boundaries.',
  },
  firstAgentProject: {
    id: 'project-first-agent',
    title: 'First bounded agent build brief',
    repoPath: '05-projects/first-agent.md',
    githubUrl: `${AAA_REPO_BASE}/05-projects/first-agent.md`,
    runCommand: 'cat 05-projects/first-agent.md',
    focus: 'Ship one narrow agent loop in an afternoon with a hard step ceiling and test check.',
  },
  startHereAssessment: {
    id: 'path-self-assessment',
    title: 'Architect readiness self-assessment',
    repoPath: '02-learning-paths/self-assessment.md',
    githubUrl: `${AAA_REPO_BASE}/02-learning-paths/self-assessment.md`,
    runCommand: 'cat 02-learning-paths/self-assessment.md',
    focus: 'Benchmark retrieval, orchestration, security, and evaluation gaps before building.',
  },
} as const satisfies Record<string, PairedCliLab>

const SIA = {
  atlas: {
    id: 'sia-curriculum-atlas',
    title: '12-week curriculum atlas',
    siaPath: '/academy/curriculum-atlas',
    url: `${SIA_SITE_BASE}/academy/curriculum-atlas`,
    school: 'Atlas',
    surfaceStatus: 'Interactive local-first atlas',
  },
  studio: {
    id: 'sia-mission-studio',
    title: 'Agentic mission studio',
    siaPath: '/academy/studio',
    url: `${SIA_SITE_BASE}/academy/studio`,
    school: 'S-01',
    surfaceStatus: 'Local-first browser workbench',
  },
  systems: {
    id: 'sia-school-systems',
    title: 'School of Agentic Systems',
    siaPath: '/academy/systems',
    url: `${SIA_SITE_BASE}/academy/systems`,
    school: 'S-01',
    surfaceStatus: 'Architecture curriculum & packets',
  },
  evaluation: {
    id: 'sia-evaluation-lab',
    title: 'Evaluation & acceptance lab',
    siaPath: '/academy/evaluation',
    url: `${SIA_SITE_BASE}/academy/evaluation`,
    school: 'S-01',
    surfaceStatus: 'Browser evaluation simulation',
  },
  departments: {
    id: 'sia-department-lab',
    title: 'AI department & CPVO lab',
    siaPath: '/academy/departments',
    url: `${SIA_SITE_BASE}/academy/departments`,
    school: 'S-01',
    surfaceStatus: 'Department builder simulation',
  },
  founderOps: {
    id: 'sia-founder-operations',
    title: 'Founder & operator triage lab',
    siaPath: '/academy/founder-operations',
    url: `${SIA_SITE_BASE}/academy/founder-operations`,
    school: 'S-01',
    surfaceStatus: 'Workflow triage workbench',
  },
  create: {
    id: 'sia-multimodal-create',
    title: 'Multimodal creation studio',
    siaPath: '/academy/create',
    url: `${SIA_SITE_BASE}/academy/create`,
    school: 'U-01',
    surfaceStatus: '12-module studio track',
  },
  leaders: {
    id: 'sia-human-leaders',
    title: 'School of Human Intelligence & Leadership',
    siaPath: '/academy/leaders',
    url: `${SIA_SITE_BASE}/academy/leaders`,
    school: 'H-01',
    surfaceStatus: 'Judgment & governance track',
  },
  knowledge: {
    id: 'sia-knowledge-memory',
    title: 'Knowledge & retrieval workbench',
    siaPath: '/academy/knowledge',
    url: `${SIA_SITE_BASE}/academy/knowledge`,
    school: 'S-01',
    surfaceStatus: 'Memory & citation studio',
  },
  install: {
    id: 'sia-harness-install',
    title: 'Agent harness setup & verification',
    siaPath: '/academy/install',
    url: `${SIA_SITE_BASE}/academy/install`,
    school: 'S-01',
    surfaceStatus: 'Local environment setup',
  },
  passport: {
    id: 'sia-capability-passport',
    title: 'Capability receipt & learning passport',
    siaPath: '/academy/passport',
    url: `${SIA_SITE_BASE}/academy/passport`,
    school: 'Atlas',
    surfaceStatus: 'Local receipt inspector',
  },
} as const satisfies Record<string, SiaMissionTarget>

const CIRCLE = {
  critiqueArena: {
    spaceName: 'Architecture Critique Arena',
    protocolLabel: 'Weekly 20-minute async rubric review',
    promptFocus: 'Partner restates your kill criterion, trust boundary, and rollback command cold.',
  },
  redGateClinic: {
    spaceName: 'Weekly Red-Gate Lab Clinic',
    protocolLabel: 'Failure-first trace & pytest review',
    promptFocus: 'Share the failing test trace first, then document the minimal code diff that cleared it.',
  },
  traceExchange: {
    spaceName: 'Worked-Run Trace Exchange',
    protocolLabel: 'Day-7 changed-context transfer audit',
    promptFocus: 'Verify your ADR still holds when latency spikes or data residency rules tighten.',
  },
  studioShowcase: {
    spaceName: 'GenCreator Studio Showcase',
    protocolLabel: 'Rights, taste & caption parity check',
    promptFocus: 'Peer inspects source provenance, code-rendered text overlays, and WebVTT sync.',
  },
  orientation: {
    spaceName: 'Start Here & Workflow Triage',
    protocolLabel: '48-hour arrival & Monday unaided brief',
    promptFocus: 'Post your 15-minute unaided workflow diagnosis before enabling Socratic agent hints.',
  },
} as const satisfies Record<string, CircleCritiqueTieIn>

/**
 * Explicit catalog covering every `.mdx` file in `content/guides/`.
 */
export const GUIDE_ACADEMY_MISSIONS: Record<string, AcademyMissionBridgeSpec> = {
  'agent-card-a2a-spec': {
    guideSlug: 'agent-card-a2a-spec',
    curriculumWeek: 'Week 04 & Week 06',
    primaryIcp: 'production-builder',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.mcpServer, LABS.multiAgent],
    siaMissions: [SIA.systems, SIA.atlas],
    artifact: {
      deliverable: 'Signed agent-card.json manifest with explicit capability scopes and auth scheme',
      verificationCommand: 'cd labs/03-mcp-server && npm test',
      redGateCondition: 'Blocks any agent card advertising wildcard write permissions or unauthenticated mutations.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('agent card a2a portability'),
  },

  'agent-collective-operating-system': {
    guideSlug: 'agent-collective-operating-system',
    curriculumWeek: 'Week 05 & Week 06',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.claudeWorkflows, LABS.multiAgent],
    siaMissions: [SIA.founderOps, SIA.studio],
    artifact: {
      deliverable: 'Role-bounded multi-agent operating config with independent maker and verifier lanes',
      verificationCommand: 'pytest labs/02-multi-agent-system/tests/ -v',
      redGateCondition: 'Halts if the same agent session authors and approves its own release artifact.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('agent collective operating system acos'),
  },

  'agentic-engineering-mastery-2026': {
    guideSlug: 'agentic-engineering-mastery-2026',
    curriculumWeek: 'Weeks 01-12 Spine',
    primaryIcp: 'enterprise-architect',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.trustFirewall, LABS.evalGate],
    siaMissions: [SIA.atlas, SIA.systems],
    artifact: {
      deliverable: 'Four-layer architecture bundle (Prompts, MCP, Skills, FSM Agent) with golden evals',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Fails closed when any safety or schema regression drops below golden threshold.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('agentic engineering hierarchy mcp skills'),
  },

  'agentic-obsidian-second-brain': {
    guideSlug: 'agentic-obsidian-second-brain',
    curriculumWeek: 'Week 02 & Week 05',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.ragPipeline, LABS.mcpServer],
    siaMissions: [SIA.knowledge, SIA.studio],
    artifact: {
      deliverable: 'Local markdown vault index with hybrid retrieval and PII-scrubbed MCP read tools',
      verificationCommand: 'pytest labs/01-rag-pipeline/tests/ -v',
      redGateCondition: 'Rejects indexing pipelines that drop chunk boundaries or expose private notes to public tools.',
    },
    circleCritique: CIRCLE.traceExchange,
    mcpEntrypoint: buildMcpEntrypoint('obsidian second brain mcp skills'),
  },

  'ai-agent-ready-website-checklist': {
    guideSlug: 'ai-agent-ready-website-checklist',
    curriculumWeek: 'Week 04 & Week 10',
    primaryIcp: 'production-builder',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.mcpServer, LABS.trustFirewall],
    siaMissions: [SIA.systems, SIA.evaluation],
    artifact: {
      deliverable: 'Verified llms.txt, server-card JSON, and stateless read-only /api/mcp endpoint',
      verificationCommand: 'cd labs/03-mcp-server && npm test',
      redGateCondition: 'Blocks deployment if agent discovery routes leak private URLs or hold open unrated streams.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('ai agent ready website mcp server card'),
  },

  'ai-architect-academy-visual-curriculum-2026': {
    guideSlug: 'ai-architect-academy-visual-curriculum-2026',
    curriculumWeek: 'Weeks 01-12 Master Map',
    primaryIcp: 'enterprise-architect',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.trustFirewall, LABS.evalGate],
    siaMissions: [SIA.atlas, SIA.passport],
    artifact: {
      deliverable: 'Complete 9-stage architecture dossier (00-frame.md to 07-runbook.md) and dry-run receipt',
      verificationCommand: 'python -m unittest discover -s labs/04-trust-boundary-firewall/tests -v',
      redGateCondition: 'Withholds capability receipt on self-attested review, unverified restore step, or failed red gate.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('ai architect academy curriculum labs'),
  },

  'ai-operating-systems-workshop': {
    guideSlug: 'ai-operating-systems-workshop',
    curriculumWeek: 'Week 01 & Week 11',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.claudeWorkflows, LABS.governanceChecklist],
    siaMissions: [SIA.founderOps, SIA.departments],
    artifact: {
      deliverable: 'AGENT_SYSTEM_CONSTITUTION.md naming workflow owner, budget cap, and kill criterion',
      verificationCommand: 'pytest labs/02-multi-agent-system/tests/ -v',
      redGateCondition: 'Blocks any workflow lacking a named human owner or numeric shut-off threshold.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('ai operating system workshop curriculum'),
  },

  'ai-writing-system': {
    guideSlug: 'ai-writing-system',
    curriculumWeek: 'Week 05 & Week 09',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.creatorEvals, LABS.skillPack],
    siaMissions: [SIA.create, SIA.evaluation],
    artifact: {
      deliverable: 'Voice-locked editorial SKILL.md paired with a deterministic anti-slop refusal linter',
      verificationCommand: 'node scripts/audit-ai-slop.mjs --strict',
      redGateCondition: 'Fails build on unbacked claims, synthetic praise, or banned filler phrasing.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('ai writing system editorial voice'),
  },

  'anatomy-of-a-production-skill': {
    guideSlug: 'anatomy-of-a-production-skill',
    curriculumWeek: 'Week 05',
    primaryIcp: 'production-builder',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.skillPack, LABS.evalGate],
    siaMissions: [SIA.studio, SIA.evaluation],
    artifact: {
      deliverable: 'Portable SKILL.md directory package with helper script and golden trajectory test',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Rejects skills containing raw positional shell expansion bugs or inline credentials.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('anatomy of a production skill eval'),
  },

  'canva-mcp-for-founders': {
    guideSlug: 'canva-mcp-for-founders',
    curriculumWeek: 'Week 04 & Week 09',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.mcpServer, LABS.governanceChecklist],
    siaMissions: [SIA.founderOps, SIA.create],
    artifact: {
      deliverable: 'Stage-only creative MCP workflow keeping external brand publishing behind human approval',
      verificationCommand: 'cd labs/03-mcp-server && npm test',
      redGateCondition: 'Blocks direct live social or client asset overwrite without explicit human sign-off.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('canva mcp founders creative workflow'),
  },

  'claude-anthropic-guide': {
    guideSlug: 'claude-anthropic-guide',
    curriculumWeek: 'Week 01 & Week 05',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.startHereAssessment, LABS.ragPipeline],
    siaMissions: [SIA.studio, SIA.founderOps],
    artifact: {
      deliverable: 'Structured XML project instructions with explicit citation rules and refusal boundaries',
      verificationCommand: 'pytest labs/01-rag-pipeline/tests/ -v',
      redGateCondition: 'Fails any answer synthesis that cites facts absent from the retrieved source context.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('claude anthropic guide structured workflows'),
  },

  'claude-code-getting-started': {
    guideSlug: 'claude-code-getting-started',
    curriculumWeek: 'Week 01 & Week 04',
    primaryIcp: 'production-builder',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.claudeWorkflows, LABS.ragPipeline],
    siaMissions: [SIA.install, SIA.studio],
    artifact: {
      deliverable: 'Repo-scoped CLAUDE.md with isolated git branch rules and pre-commit test verification',
      verificationCommand: 'pytest labs/01-rag-pipeline/tests/ -v',
      redGateCondition: 'Blocks direct commits to main or unverified file mutations outside the assigned scope.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('claude code getting started claude.md'),
  },

  'claude-code-plugins-vs-skills': {
    guideSlug: 'claude-code-plugins-vs-skills',
    curriculumWeek: 'Week 05',
    primaryIcp: 'production-builder',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.skillPack, LABS.mcpServer],
    siaMissions: [SIA.systems, SIA.atlas],
    artifact: {
      deliverable: 'Cross-harness capability decision matrix separating repo skills from MCP server plugins',
      verificationCommand: 'cd labs/03-mcp-server && npm test',
      redGateCondition: 'Rejects bundling stateful credentials inside portable markdown skill projections.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('claude code plugins vs skills'),
  },

  'claude-code-templates-starter-kit': {
    guideSlug: 'claude-code-templates-starter-kit',
    curriculumWeek: 'Week 01 & Week 05',
    primaryIcp: 'production-builder',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.claudeWorkflows, LABS.trustFirewall],
    siaMissions: [SIA.install, SIA.systems],
    artifact: {
      deliverable: 'Hardened settings.json, secret-guard hook, and scoped subagent starter configuration',
      verificationCommand: 'python -m unittest discover -s labs/04-trust-boundary-firewall/tests -v',
      redGateCondition: 'Halts execution when hooks allow secret patterns or unrestricted shell writes.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('claude code templates starter kit hooks'),
  },

  'community-platform-for-creators': {
    guideSlug: 'community-platform-for-creators',
    curriculumWeek: 'Week 11 & Week 12',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.governanceChecklist, LABS.trustFirewall],
    siaMissions: [SIA.founderOps, SIA.departments],
    artifact: {
      deliverable: '90-day hosted pilot scorecard, export exit plan, and draft-only Circle MCP policy',
      verificationCommand: 'python -m unittest discover -s labs/04-trust-boundary-firewall/tests -v',
      redGateCondition: 'Blocks automated member messaging or live space mutation without human approval receipt.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('community platform circle mcp creators'),
  },

  'elevenlabs-voice-guide': {
    guideSlug: 'elevenlabs-voice-guide',
    curriculumWeek: 'Week 09',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.creatorAutomation, LABS.creatorEvals],
    siaMissions: [SIA.create, SIA.evaluation],
    artifact: {
      deliverable: 'Consent-verified voice briefing pipeline with latency budget and loudness normalization',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Blocks unconsented voice cloning, undisclosed synthetic narration, or missing transcripts.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('elevenlabs voice guide latency cloning'),
  },

  'first-agent-primer': {
    guideSlug: 'first-agent-primer',
    curriculumWeek: 'Week 01 & Week 04',
    primaryIcp: 'production-builder',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.firstAgentProject, LABS.multiAgent],
    siaMissions: [SIA.studio, SIA.systems],
    artifact: {
      deliverable: 'Single-purpose bounded agent with step limit, cost ceiling, and offline smoke test',
      verificationCommand: 'pytest labs/02-multi-agent-system/tests/ -v',
      redGateCondition: 'Halts any loop lacking max_steps termination or deterministic tool input validation.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('first agent primer build deploy'),
  },

  'founder-ai-stack-2026': {
    guideSlug: 'founder-ai-stack-2026',
    curriculumWeek: 'Week 01 & Week 11',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.governanceChecklist, LABS.evalGate],
    siaMissions: [SIA.founderOps, SIA.departments],
    artifact: {
      deliverable: 'AI_DEPARTMENT_PACKET.json assigning model plane owner, fallback gateway, and spend cap',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Rejects department packets with unowned planes, undated token prices, or uncapped spend.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('founder ai stack 2026 architecture'),
  },

  'frankx-skill-creation-methodology': {
    guideSlug: 'frankx-skill-creation-methodology',
    curriculumWeek: 'Week 05',
    primaryIcp: 'production-builder',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.skillPack, LABS.evalGate],
    siaMissions: [SIA.studio, SIA.atlas],
    artifact: {
      deliverable: 'Evaluated skill specification with failure-mode test cases and provenance hash',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Fails admission if skill instructions lack observable acceptance criteria or regress on evals.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('skill creation methodology evaluated workflows'),
  },

  'higgsfield-ai-video-guide': {
    guideSlug: 'higgsfield-ai-video-guide',
    curriculumWeek: 'Week 10',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.creatorAutomation, LABS.creatorEvals],
    siaMissions: [SIA.create, SIA.atlas],
    artifact: {
      deliverable: 'Approved pre-generation shot plan with credit ceiling, 3-shot stop rule, and .vtt captions',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Blocks paid video generation without an approved shot packet, credit cap, and caption file.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('higgsfield ai video shot list workflow'),
  },

  'higgsfield-camera-movement-prompts': {
    guideSlug: 'higgsfield-camera-movement-prompts',
    curriculumWeek: 'Week 10',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.creatorAutomation, LABS.creatorEvals],
    siaMissions: [SIA.create, SIA.studio],
    artifact: {
      deliverable: 'Deterministic camera blocking manifest (pan, dolly, orbit, locked) with continuity anchors',
      verificationCommand: 'ls 05-projects/creator-evals',
      redGateCondition: 'Rejects unmotivated multi-axis camera motion that breaks character or frame readability.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('higgsfield camera movement pan dolly orbit'),
  },

  'higgsfield-credits-pricing-guide': {
    guideSlug: 'higgsfield-credits-pricing-guide',
    curriculumWeek: 'Week 10 & Week 11',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.governanceChecklist, LABS.creatorAutomation],
    siaMissions: [SIA.departments, SIA.create],
    artifact: {
      deliverable: 'Cost-per-usable-shot ledger with dated vendor pricing source and hard campaign stop cap',
      verificationCommand: 'python -m unittest discover -s labs/04-trust-boundary-firewall/tests -v',
      redGateCondition: 'Halts batch rendering when usable-shot yield drops below budget threshold.',
    },
    circleCritique: CIRCLE.traceExchange,
    mcpEntrypoint: buildMcpEntrypoint('higgsfield credits pricing cost per shot'),
  },

  'higgsfield-music-video-workflow': {
    guideSlug: 'higgsfield-music-video-workflow',
    curriculumWeek: 'Week 09 & Week 10',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.creatorAutomation, LABS.creatorEvals],
    siaMissions: [SIA.create, SIA.studio],
    artifact: {
      deliverable: 'Beat-synced storyboard packet locking owned audio stems to timed visual cuts',
      verificationCommand: 'ls 05-projects/creator-evals',
      redGateCondition: 'Blocks publication if audio rights are unverified or visual cuts drift off stem markers.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('higgsfield music video beat workflow'),
  },

  'higgsfield-soul-id-character-consistency': {
    guideSlug: 'higgsfield-soul-id-character-consistency',
    curriculumWeek: 'Week 09 & Week 10',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.governanceChecklist, LABS.creatorEvals],
    siaMissions: [SIA.create, SIA.evaluation],
    artifact: {
      deliverable: 'Character continuity reference pack with likeness consent log and lighting lock',
      verificationCommand: 'ls 08-governance',
      redGateCondition: 'Rejects any likeness dataset lacking documented subject consent or provenance record.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('higgsfield soul id character consistency'),
  },

  'higgsfield-ugc-product-video-workflow': {
    guideSlug: 'higgsfield-ugc-product-video-workflow',
    curriculumWeek: 'Week 10',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.creatorEvals, LABS.governanceChecklist],
    siaMissions: [SIA.create, SIA.founderOps],
    artifact: {
      deliverable: 'Evidence-backed product demonstration script, real UI screen capture, and caption track',
      verificationCommand: 'node scripts/audit-marketing-claims.mjs --strict',
      redGateCondition: 'Blocks synthetic testimonials, fabricated ROI claims, or unverified product behavior.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('higgsfield ugc product video proof'),
  },

  'ifs-ai-agent-architecture': {
    guideSlug: 'ifs-ai-agent-architecture',
    curriculumWeek: 'Week 07',
    primaryIcp: 'enterprise-architect',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.multiAgent, LABS.trustFirewall],
    siaMissions: [SIA.systems, SIA.leaders],
    artifact: {
      deliverable: 'Self-led orchestrator spec with Protector veto gates and append-only quarantine log',
      verificationCommand: 'pytest labs/02-multi-agent-system/tests/ -v',
      redGateCondition: 'Halts if worker agents bypass safety vetoes or silently discard failed run context.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('ifs ai agent architecture pattern'),
  },

  'image-generation-mastery': {
    guideSlug: 'image-generation-mastery',
    curriculumWeek: 'Week 09',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.creatorEvals, LABS.creatorAutomation],
    siaMissions: [SIA.create, SIA.studio],
    artifact: {
      deliverable: 'design.md visual contract pairing clean hero plates with code-rendered SVG/CSS typography',
      verificationCommand: 'ls 05-projects/creator-evals',
      redGateCondition: 'Rejects raster images containing garbled baked-in metrics, charts, or UI labels.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('image generation mastery composition'),
  },

  'inner-hr-ai': {
    guideSlug: 'inner-hr-ai',
    curriculumWeek: 'Week 07 & Week 11',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.governanceChecklist, LABS.multiAgent],
    siaMissions: [SIA.leaders, SIA.departments],
    artifact: {
      deliverable: 'Team reflection and role-clarity protocol separating observation from clinical diagnosis',
      verificationCommand: 'ls 08-governance',
      redGateCondition: 'Blocks clinical labeling, automated HR scoring, or unconsented employee profiling.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('inner hr ai team alignment'),
  },

  'internal-family-systems-personal-development': {
    guideSlug: 'internal-family-systems-personal-development',
    curriculumWeek: 'Week 07',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.startHereAssessment, LABS.governanceChecklist],
    siaMissions: [SIA.leaders, SIA.passport],
    artifact: {
      deliverable: 'Personal augmentation pact defining where AI assists reflection and where human agency leads',
      verificationCommand: 'cat 08-governance/human-review-checklist.md',
      redGateCondition: 'Refuses diagnostic claims, therapy substitution, or unguarded emotional offloading.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('internal family systems reflection'),
  },

  'mcp-servers-claude-code-business': {
    guideSlug: 'mcp-servers-claude-code-business',
    curriculumWeek: 'Week 04',
    primaryIcp: 'production-builder',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.mcpServer, LABS.trustFirewall],
    siaMissions: [SIA.systems, SIA.founderOps],
    artifact: {
      deliverable: 'Three-tool MCP server with Zod input schemas, draft-only CRM staging, and audit logs',
      verificationCommand: 'cd labs/03-mcp-server && npm test',
      redGateCondition: 'Blocks outbound customer emails, live billing mutations, or hardcoded API keys.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('mcp servers claude code business'),
  },

  'midjourney-guide': {
    guideSlug: 'midjourney-guide',
    curriculumWeek: 'Week 09',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.creatorEvals, LABS.creatorAutomation],
    siaMissions: [SIA.create, SIA.studio],
    artifact: {
      deliverable: 'Style-consistent visual direction sheet with lighting, lens, palette, and negative rules',
      verificationCommand: 'ls 05-projects/creator-evals',
      redGateCondition: 'Rejects stock cliches, unpinned aspect ratios, or off-palette neon noise.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('midjourney guide creators visual direction'),
  },

  'mini-me-storyboard': {
    guideSlug: 'mini-me-storyboard',
    curriculumWeek: 'Week 09 & Week 10',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.creatorEvals, LABS.creatorAutomation],
    siaMissions: [SIA.create, SIA.studio],
    artifact: {
      deliverable: 'Multi-scene character storyboard packet with locked reference angles and narrative arc',
      verificationCommand: 'ls 05-projects/creator-evals',
      redGateCondition: 'Blocks sequence export when character identity drifts across consecutive keyframes.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('mini me storyboard character world'),
  },

  'modern-guide': {
    guideSlug: 'modern-guide',
    curriculumWeek: 'Week 01',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.startHereAssessment, LABS.firstAgentProject],
    siaMissions: [SIA.founderOps, SIA.atlas],
    artifact: {
      deliverable: 'Personal 90-day capability map triaging high-leverage workflows vs protected human craft',
      verificationCommand: 'cat 02-learning-paths/self-assessment.md',
      redGateCondition: 'Halts broad tool adoption when no concrete weekly job or verification habit is named.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('modern practical guide intelligence workflows'),
  },

  'openai-chatgpt-guide': {
    guideSlug: 'openai-chatgpt-guide',
    curriculumWeek: 'Week 01 & Week 08',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.evalGate, LABS.firstAgentProject],
    siaMissions: [SIA.studio, SIA.evaluation],
    artifact: {
      deliverable: 'Structured-output workflow paired with a 20-case golden evaluation dataset',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Fails release when model version upgrades break JSON schema or golden accuracy.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('openai chatgpt guide creators structured'),
  },

  'perplexity-ai-guide': {
    guideSlug: 'perplexity-ai-guide',
    curriculumWeek: 'Week 02 & Week 03',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.ragPipeline, LABS.trustFirewall],
    siaMissions: [SIA.knowledge, SIA.evaluation],
    artifact: {
      deliverable: 'Primary-source research dossier verifying every claim against dated URLs and quotes',
      verificationCommand: 'pytest labs/01-rag-pipeline/tests/ -v',
      redGateCondition: 'Rejects secondary-blog citation loops, undated statistics, or unverified quotes.',
    },
    circleCritique: CIRCLE.traceExchange,
    mcpEntrypoint: buildMcpEntrypoint('perplexity research citation verification'),
  },

  'reference-to-campaign': {
    guideSlug: 'reference-to-campaign',
    curriculumWeek: 'Week 09 & Week 10',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.creatorAutomation, LABS.creatorEvals],
    siaMissions: [SIA.create, SIA.founderOps],
    artifact: {
      deliverable: 'Cohesive campaign asset pack translating one reference board into web, social, and video specs',
      verificationCommand: 'node scripts/audit-marketing-claims.mjs --strict',
      redGateCondition: 'Blocks launch assets with mismatched typography tokens or unsupported marketing claims.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('reference to campaign image workflow'),
  },

  'skills-library-playbook': {
    guideSlug: 'skills-library-playbook',
    curriculumWeek: 'Week 05',
    primaryIcp: 'production-builder',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.skillPack, LABS.claudeWorkflows],
    siaMissions: [SIA.systems, SIA.studio],
    artifact: {
      deliverable: 'Indexed skill registry with activation rules, content hashes, and zero phantom entries',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Blocks registry merge when any skill rule points to a missing file or lacks an owner.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('skills library playbook registry'),
  },

  'suno-prompt-playbook': {
    guideSlug: 'suno-prompt-playbook',
    curriculumWeek: 'Week 09',
    primaryIcp: 'technical-creator',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.creatorAutomation, LABS.creatorEvals],
    siaMissions: [SIA.create, SIA.studio],
    artifact: {
      deliverable: 'Three-stem sonic pack (bed, motif, transition) mastered to -18 LUFS with provenance log',
      verificationCommand: 'ls 05-projects/creator-evals',
      redGateCondition: 'Rejects vocal beds under technical narration or audio tracks without rights documentation.',
    },
    circleCritique: CIRCLE.studioShowcase,
    mcpEntrypoint: buildMcpEntrypoint('suno prompt playbook music production'),
  },

  'top-50-ai-prompts': {
    guideSlug: 'top-50-ai-prompts',
    curriculumWeek: 'Week 01 & Week 05',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'technical-creator',
    cliLabs: [LABS.skillPack, LABS.evalGate],
    siaMissions: [SIA.studio, SIA.evaluation],
    artifact: {
      deliverable: 'Three recurring ad-hoc prompts graduated into versioned, testable SKILL.md packages',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Fails any prompt template containing unfilled bracket slots or untestable prose output.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('top 50 ai prompts structured skills'),
  },

  vercel: {
    guideSlug: 'vercel',
    curriculumWeek: 'Week 04 & Week 11',
    primaryIcp: 'production-builder',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.vercelSdkToolchain, LABS.mcpServer],
    siaMissions: [SIA.systems, SIA.departments],
    artifact: {
      deliverable: 'Preview-gated Next.js deployment checklist with rollback target and maxDuration bounds',
      verificationCommand: 'cd labs/03-mcp-server && npm test',
      redGateCondition: 'Blocks production promotion when preview checks, link integrity, or rate limits fail.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('vercel for builders deployment stack'),
  },

  'vercel-agent-runtime-decisions': {
    guideSlug: 'vercel-agent-runtime-decisions',
    curriculumWeek: 'Week 06 & Week 11',
    primaryIcp: 'enterprise-architect',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.trustFirewall, LABS.vercelSdkToolchain],
    siaMissions: [SIA.systems, SIA.departments],
    artifact: {
      deliverable: 'Runtime ADR separating HTTP request paths, beta pull Daemons, Sandbox Drives, and Connect scopes',
      verificationCommand: 'python -m unittest discover -s labs/04-trust-boundary-firewall/tests -v',
      redGateCondition: 'Halts putting public-beta SDKs on critical money paths or treating Sandbox Drives as a database.',
    },
    circleCritique: CIRCLE.critiqueArena,
    mcpEntrypoint: buildMcpEntrypoint('vercel agent runtimes python daemons drives'),
  },

  'vercel-ai-sdk': {
    guideSlug: 'vercel-ai-sdk',
    curriculumWeek: 'Week 04 & Week 08',
    primaryIcp: 'production-builder',
    secondaryIcp: 'enterprise-architect',
    cliLabs: [LABS.vercelSdkToolchain, LABS.evalGate],
    siaMissions: [SIA.systems, SIA.evaluation],
    artifact: {
      deliverable: 'Typed streamText + Zod tool-call route backed by AI Gateway failover and trajectory tests',
      verificationCommand: 'python -m unittest discover -s labs/05-eval-admission-gate/tests -v',
      redGateCondition: 'Fails if provider failover drops tool schemas or streams unvalidated tool arguments.',
    },
    circleCritique: CIRCLE.redGateClinic,
    mcpEntrypoint: buildMcpEntrypoint('vercel ai sdk builders tool schemas'),
  },

  'vercel-ship-2026-recap': {
    guideSlug: 'vercel-ship-2026-recap',
    curriculumWeek: 'Week 01 & Week 11',
    primaryIcp: 'enterprise-architect',
    secondaryIcp: 'workflow-operator',
    cliLabs: [LABS.governanceChecklist, LABS.vercelSdkToolchain],
    siaMissions: [SIA.leaders, SIA.departments],
    artifact: {
      deliverable: 'Dated adopt, wait, or skip architecture memo anchored to primary changelog evidence',
      verificationCommand: 'cat 08-governance/model-risk.md',
      redGateCondition: 'Rejects treating keynote announcements or beta flags as generally available SLA commitments.',
    },
    circleCritique: CIRCLE.traceExchange,
    mcpEntrypoint: buildMcpEntrypoint('vercel ship 2026 recap runtime decisions'),
  },

  'wispr-flow': {
    guideSlug: 'wispr-flow',
    curriculumWeek: 'Week 01 & Week 05',
    primaryIcp: 'workflow-operator',
    secondaryIcp: 'production-builder',
    cliLabs: [LABS.claudeWorkflows, LABS.firstAgentProject],
    siaMissions: [SIA.founderOps, SIA.studio],
    artifact: {
      deliverable: 'Voice-dictated architecture brief converted into a structured ADR and reviewed git branch',
      verificationCommand: 'git status && npx tsc --noEmit',
      redGateCondition: 'Blocks shipping raw dictated transcripts as specs without explicit constraints and tests.',
    },
    circleCritique: CIRCLE.orientation,
    mcpEntrypoint: buildMcpEntrypoint('wispr flow voice typing builders'),
  },
}

export const MAPPED_GUIDE_SLUGS: readonly string[] = Object.freeze(
  Object.keys(GUIDE_ACADEMY_MISSIONS).sort()
)

function cloneBridge(spec: AcademyMissionBridgeSpec): AcademyMissionBridgeSpec {
  return {
    ...spec,
    cliLabs: [
      { ...spec.cliLabs[0] },
      ...spec.cliLabs.slice(1).map((lab) => ({ ...lab })),
    ],
    siaMissions: [
      { ...spec.siaMissions[0] },
      ...spec.siaMissions.slice(1).map((mission) => ({ ...mission })),
    ],
    artifact: { ...spec.artifact },
    circleCritique: { ...spec.circleCritique },
    mcpEntrypoint: { ...spec.mcpEntrypoint },
  }
}

/**
 * Deterministic lookup for any guide slug. Returns a defensive copy of the
 * explicit mapping, or a safe default bridge (`isFallback: true`) if a new
 * guide is added before updating `GUIDE_ACADEMY_MISSIONS`.
 */
export function academyBridgeForGuide(slug: string): AcademyMissionBridgeSpec {
  const normalized = slug.trim()
  const found = GUIDE_ACADEMY_MISSIONS[normalized]
  if (found) {
    return cloneBridge(found)
  }

  const fallbackQuery = normalized.replace(/-/g, ' ').trim() || 'ai architecture'
  return {
    guideSlug: normalized,
    curriculumWeek: 'Week 01 Entry',
    primaryIcp: 'production-builder',
    secondaryIcp: 'workflow-operator',
    cliLabs: [{ ...LABS.ragPipeline }, { ...LABS.mcpServer }],
    siaMissions: [{ ...SIA.atlas }, { ...SIA.studio }],
    artifact: {
      deliverable: 'Scoped workflow contract (00-frame.md) with offline test verification',
      verificationCommand: 'pytest labs/01-rag-pipeline/tests/ -v',
      redGateCondition: 'Blocks unowned workflows, unguarded external actions, or self-attested reviews.',
    },
    circleCritique: { ...CIRCLE.orientation },
    mcpEntrypoint: buildMcpEntrypoint(fallbackQuery),
    isFallback: true,
  }
}

/**
 * Returns all explicitly mapped guide specs where `track` is either the
 * primary or secondary ICP lens.
 */
export function guidesForIcpTrack(track: IcpTrackId): AcademyMissionBridgeSpec[] {
  return MAPPED_GUIDE_SLUGS.map((slug) => GUIDE_ACADEMY_MISSIONS[slug]).filter(
    (spec) => spec.primaryIcp === track || spec.secondaryIcp === track
  ).map(cloneBridge)
}
