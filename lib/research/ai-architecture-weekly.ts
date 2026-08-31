export const REVIEW_WINDOW = {
  issue: '01',
  start: '2026-08-24',
  end: '2026-08-31',
  label: '24–31 August 2026',
  checkedAt: '2026-08-31T02:00:00Z',
} as const

export type SourceKind =
  | 'official-release'
  | 'official-docs'
  | 'official-changelog'
  | 'official-roadmap'
  | 'official-repository'

export type SourceEntry = {
  id: string
  organization: string
  title: string
  published: string
  url: string
  kind: SourceKind
  scope: 'in-window' | 'boundary-context'
  note: string
}

export const sourceLedger: SourceEntry[] = [
  {
    id: 'openai-weekly',
    organization: 'OpenAI',
    title: 'ChatGPT and Codex: August 24–28 weekly update',
    published: '2026-08-28',
    url: 'https://developers.openai.com/codex/whats-new',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'WebMCP site tools and app-event triggers for Gmail, Slack, and GitHub.',
  },
  {
    id: 'openai-responses',
    organization: 'OpenAI',
    title: 'Migrate to the Responses API',
    published: '2026-08-26',
    url: 'https://developers.openai.com/api/docs/guides/migrate-to-responses',
    kind: 'official-docs',
    scope: 'in-window',
    note: 'Records the Assistants API sunset and names Responses as the forward agent API.',
  },
  {
    id: 'openai-workflows',
    organization: 'OpenAI',
    title: 'Automating repetitive work at OpenAI with Codex',
    published: '2026-08-25',
    url: 'https://developers.openai.com/blog/automating-repetitive-work-at-openai-with-codex',
    kind: 'official-release',
    scope: 'in-window',
    note: 'Shows Runme and WebMCP turning recurring engineering work into reviewable workflows.',
  },
  {
    id: 'openai-codex-changelog',
    organization: 'OpenAI',
    title: 'ChatGPT and Codex changelog',
    published: '2026-08-31',
    url: 'https://developers.openai.com/codex/changelog',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'GPT-5.4 and 5.4 mini retire from ChatGPT-authenticated Codex sessions on August 31.',
  },
  {
    id: 'openai-models',
    organization: 'OpenAI',
    title: 'OpenAI API model catalog',
    published: '2026-08-31',
    url: 'https://developers.openai.com/api/docs/models',
    kind: 'official-docs',
    scope: 'boundary-context',
    note: 'Current provider descriptions for the GPT-5.6 Sol, Terra, and Luna tiers.',
  },
  {
    id: 'google-gemini-changelog',
    organization: 'Google',
    title: 'Gemini API release notes',
    published: '2026-08-27',
    url: 'https://ai.google.dev/gemini-api/docs/changelog',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Gemini 3.5 Transcribe and Transcribe Live became GA; Gemini Omni 1.1 Flash became GA.',
  },
  {
    id: 'anthropic-mhs',
    organization: 'Anthropic',
    title: 'Previewing the Model Hardware Standard',
    published: '2026-08-27',
    url: 'https://www.anthropic.com/news/model-hardware-standard-research-preview',
    kind: 'official-release',
    scope: 'in-window',
    note: 'A model-agnostic hardware driver layer that can be reached through MCP.',
  },
  {
    id: 'anthropic-opus-5',
    organization: 'Anthropic',
    title: 'Introducing Claude Opus 5',
    published: '2026-07-24',
    url: 'https://www.anthropic.com/news/claude-opus-5',
    kind: 'official-release',
    scope: 'boundary-context',
    note: 'Current Opus-tier provider positioning for long-running agents and coding.',
  },
  {
    id: 'anthropic-sonnet-5',
    organization: 'Anthropic',
    title: 'Introducing Claude Sonnet 5',
    published: '2026-06-30',
    url: 'https://www.anthropic.com/news/claude-sonnet-5',
    kind: 'official-release',
    scope: 'boundary-context',
    note: 'Current Sonnet-tier provider positioning and agentic cost/performance framing.',
  },
  {
    id: 'xai-foundry',
    organization: 'xAI',
    title: 'Grok 4.6 on Microsoft Foundry',
    published: '2026-08-26',
    url: 'https://x.ai/news/grok-4-6-microsoft-foundry',
    kind: 'official-release',
    scope: 'in-window',
    note: 'Grok 4.6 became available through Foundry with enterprise evaluation and governance controls.',
  },
  {
    id: 'xai-bot-plans',
    organization: 'xAI',
    title: 'Grok Bot is now included with more plans',
    published: '2026-08-26',
    url: 'https://x.ai/news/grok-bot-more-plans',
    kind: 'official-release',
    scope: 'in-window',
    note: 'Expanded access to always-on agents with cloud computers and app access.',
  },
  {
    id: 'xai-grok-46',
    organization: 'xAI',
    title: 'Introducing Grok 4.6',
    published: '2026-08-12',
    url: 'https://x.ai/news/grok-4-6',
    kind: 'official-release',
    scope: 'boundary-context',
    note: 'Provider framing for long-running agents, interactive work, and configurable reasoning.',
  },
  {
    id: 'mistral-humain',
    organization: 'Mistral AI',
    title: 'Mistral x HUMAIN',
    published: '2026-08-24',
    url: 'https://mistral.ai/news/mistral-x-humain/',
    kind: 'official-release',
    scope: 'in-window',
    note: 'A regional infrastructure and model-development partnership with Arabic, voice, and security focus.',
  },
  {
    id: 'mistral-medium-35',
    organization: 'Mistral AI',
    title: 'Remote agents in Vibe, powered by Mistral Medium 3.5',
    published: '2026-05-22',
    url: 'https://mistral.ai/news/vibe-remote-agents-mistral-medium-3-5/',
    kind: 'official-release',
    scope: 'boundary-context',
    note: 'Open-weight long-horizon coding model and remote-agent runtime with visible actions and approvals.',
  },
  {
    id: 'deepseek-v4-vision',
    organization: 'DeepSeek',
    title: 'DeepSeek V4 Flash Vision Experimental release',
    published: '2026-08-21',
    url: 'https://api-docs.deepseek.com/news/news260821/',
    kind: 'official-release',
    scope: 'boundary-context',
    note: 'The nearest boundary release: multimodal agent input plus reusable Files API references.',
  },
  {
    id: 'deepseek-v4-pro',
    organization: 'DeepSeek',
    title: 'DeepSeek V4 Pro GA',
    published: '2026-08-13',
    url: 'https://api-docs.deepseek.com/news/news260813/',
    kind: 'official-release',
    scope: 'boundary-context',
    note: 'Current open-model comparison context with reasoning effort and Responses API support.',
  },
  {
    id: 'github-weekly',
    organization: 'GitHub',
    title: 'GitHub Copilot weekly releases — August 24',
    published: '2026-08-28',
    url: 'https://github.blog/changelog/2026-08-28-github-copilot-weekly-releases-august-24/',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Shared agent sessions, CLI permission defaults, resumability, and cross-client session continuity.',
  },
  {
    id: 'github-customize',
    organization: 'GitHub',
    title: 'Copilot app Customize tab is generally available',
    published: '2026-08-25',
    url: 'https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available/',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'MCP servers, plugins, skills, and canvases become one discoverable customization surface.',
  },
  {
    id: 'github-model-policy',
    organization: 'GitHub',
    title: 'Global model policy generally available',
    published: '2026-08-26',
    url: 'https://github.blog/changelog/2026-08-26-global-model-policy-generally-available/',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Enterprise defaults now govern newly available models while preserving explicit per-model choices.',
  },
  {
    id: 'github-plugin-policy',
    organization: 'GitHub',
    title: 'Enterprise plugin marketplaces support autoUpdate',
    published: '2026-08-26',
    url: 'https://github.blog/changelog/2026-08-26-enterprise-managed-settings-now-support-autoupdate-for-plugin-marketplaces/',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Managed plugin distribution can update automatically inside an allowlisted marketplace policy.',
  },
  {
    id: 'github-review',
    organization: 'GitHub',
    title: 'Copilot code review: resolution reasons and expanded capabilities',
    published: '2026-08-27',
    url: 'https://github.blog/changelog/2026-08-27-copilot-code-review-resolution-reasons-and-expanded-capabilities/',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Full agentic reviews now cover bot-authored and very large pull requests.',
  },
  {
    id: 'vercel-cursor-harness',
    organization: 'Vercel',
    title: 'Cursor is now available in the AI SDK harness layer',
    published: '2026-08-27',
    url: 'https://vercel.com/changelog/cursor-ai-sdk-harness-adapter',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Cursor joins Codex, Claude Code, Cline, Grok Build, OpenCode, Pi, and others behind HarnessAgent.',
  },
  {
    id: 'vercel-connect',
    organization: 'Vercel',
    title: 'Vercel Connect: secure access to external services for agents',
    published: '2026-08-25',
    url: 'https://vercel.com/changelog/vercel-connect-secure-access-to-external-services-for-your-agents',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Generally available scoped, short-lived connector credentials and app-event triggers.',
  },
  {
    id: 'vercel-managed-agents',
    organization: 'Vercel',
    title: 'Run Claude Managed Agents with Chat SDK',
    published: '2026-08-28',
    url: 'https://vercel.com/changelog/claude-managed-agents-with-chat-sdk',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'A provider-managed agent loop can now back persistent, traced chat sessions through Chat SDK.',
  },
  {
    id: 'vercel-eve',
    organization: 'Vercel',
    title: 'Build and deploy eve agents from the Vercel dashboard',
    published: '2026-08-28',
    url: 'https://vercel.com/changelog/build-and-deploy-eve-agents-from-the-vercel-dashboard',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Dashboard scaffolding now creates a private repo, project, channel, model, and MCP connections.',
  },
  {
    id: 'vercel-hy4',
    organization: 'Vercel',
    title: 'Hy4 Preview now available on AI Gateway',
    published: '2026-08-28',
    url: 'https://vercel.com/changelog/hy4-preview-now-available-on-ai-gateway',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Tencent Hy4 Preview reached a normalized gateway with routing, spend, and trace controls.',
  },
  {
    id: 'vercel-qwen-38',
    organization: 'Vercel',
    title: 'Qwen 3.8 Flash now available on AI Gateway',
    published: '2026-08-26',
    url: 'https://vercel.com/changelog/qwen-3-8-flash-now-available-on-ai-gateway',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Alibaba Qwen 3.8 Flash reached AI Gateway with text/image input and a one-million-token context window.',
  },
  {
    id: 'vercel-glm-53',
    organization: 'Vercel',
    title: 'GLM 5.3 Flash now available on AI Gateway',
    published: '2026-08-26',
    url: 'https://vercel.com/changelog/glm-5-3-flash-now-available-on-ai-gateway',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Z.ai GLM 5.3 Flash reached AI Gateway with multimodal coding, function calling, and structured output.',
  },
  {
    id: 'vercel-minimax',
    organization: 'Vercel',
    title: 'MiniMax M3 and M2.7 are free on AI Gateway',
    published: '2026-08-25',
    url: 'https://vercel.com/changelog/minimax-m3-and-m2-7-are-free-on-ai-gateway',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'A time-limited gateway route changed model access and fallback behavior; it was not a model launch.',
  },
  {
    id: 'vercel-ling-fin',
    organization: 'Vercel',
    title: 'Ling 3.0 Flash Fin now available on AI Gateway',
    published: '2026-08-27',
    url: 'https://vercel.com/changelog/ling-3-0-flash-fin-now-available-on-ai-gateway-for-free',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'A finance-focused model reached the gateway with reasoning and function-calling support.',
  },
  {
    id: 'vercel-muse-image',
    organization: 'Vercel',
    title: 'Muse Image now available on AI Gateway',
    published: '2026-08-26',
    url: 'https://vercel.com/changelog/muse-image-now-available-on-ai-gateway',
    kind: 'official-changelog',
    scope: 'in-window',
    note: 'Meta Muse Image reached the gateway as a combined generation and editing model.',
  },
  {
    id: 'aws-terra-luna',
    organization: 'AWS',
    title: 'OpenAI GPT-5.6 Terra and Luna on Amazon Bedrock in GovCloud',
    published: '2026-08-24',
    url: 'https://aws.amazon.com/about-aws/whats-new/2026/08/openai-gpt-terra-luna-govcloud/',
    kind: 'official-release',
    scope: 'in-window',
    note: 'The models reached GovCloud through a Responses-compatible endpoint and one-million-token context.',
  },
  {
    id: 'mcp-roadmap',
    organization: 'Model Context Protocol',
    title: 'MCP roadmap',
    published: '2026-08-22',
    url: 'https://modelcontextprotocol.io/development/roadmap',
    kind: 'official-roadmap',
    scope: 'boundary-context',
    note: 'Prioritizes long-running messaging, HTTP transport, agent identity, security, and SDK ergonomics.',
  },
]

export type WeeklyChange = {
  date: string
  organization: string
  title: string
  classification:
    | 'model-release'
    | 'model-availability'
    | 'agent-runtime'
    | 'governance'
    | 'connector'
    | 'protocol'
    | 'infrastructure'
  logo?: string
  signal: string
  architectureMove: string
  sourceIds: string[]
}

export const weeklyChanges: WeeklyChange[] = [
  {
    date: '2026-08-24',
    organization: 'AWS + OpenAI',
    title: 'Terra and Luna reached Bedrock GovCloud',
    classification: 'model-availability',
    logo: '/images/logos/openai.svg',
    signal: 'Frontier access is spreading across governed cloud boundaries.',
    architectureMove:
      'Keep the model route portable; make residency and endpoint policy explicit.',
    sourceIds: ['aws-terra-luna'],
  },
  {
    date: '2026-08-24',
    organization: 'Mistral AI',
    title: 'Mistral and HUMAIN linked model work to regional infrastructure',
    classification: 'infrastructure',
    logo: '/images/logos/mistral.svg',
    signal:
      'Sovereignty is becoming a full-stack property, not a hosting checkbox.',
    architectureMove:
      'Record region, operator, weights, and retention policy alongside the model ID.',
    sourceIds: ['mistral-humain'],
  },
  {
    date: '2026-08-25',
    organization: 'OpenAI',
    title: 'Codex workflows became reusable and reviewable',
    classification: 'agent-runtime',
    logo: '/images/logos/openai.svg',
    signal:
      'Runbooks and site tools are moving inside the agent operating surface.',
    architectureMove:
      'Version procedures as code and preserve an inspectable execution record.',
    sourceIds: ['openai-workflows'],
  },
  {
    date: '2026-08-25',
    organization: 'GitHub',
    title: 'MCP, plugins, skills, and canvases gained one discovery surface',
    classification: 'connector',
    logo: '/images/logos/github.svg',
    signal: 'Agent capability packaging is converging around portable units.',
    architectureMove:
      'Separate capability discovery from capability authorization.',
    sourceIds: ['github-customize'],
  },
  {
    date: '2026-08-25',
    organization: 'Vercel',
    title: 'Vercel Connect became generally available',
    classification: 'connector',
    logo: '/images/logos/vercel.svg',
    signal:
      'Long-lived provider secrets are giving way to scoped runtime credentials.',
    architectureMove:
      'Mint short-lived tokens per connector, subject, and task.',
    sourceIds: ['vercel-connect'],
  },
  {
    date: '2026-08-26',
    organization: 'OpenAI',
    title: 'The Assistants API was sunset',
    classification: 'protocol',
    logo: '/images/logos/openai.svg',
    signal: 'Responses is now the durable OpenAI integration boundary.',
    architectureMove:
      'Remove Assistants-era coupling before adding more tools or state.',
    sourceIds: ['openai-responses'],
  },
  {
    date: '2026-08-26',
    organization: 'Google',
    title: 'Gemini 3.5 Transcribe and Transcribe Live became GA',
    classification: 'model-release',
    logo: '/images/logos/google.svg',
    signal:
      'Speech ingestion now has dedicated batch and live production endpoints.',
    architectureMove:
      'Treat transcription as a typed input service, not a hidden side effect of the chat model.',
    sourceIds: ['google-gemini-changelog'],
  },
  {
    date: '2026-08-26',
    organization: 'GitHub',
    title: 'Global model policy became generally available',
    classification: 'governance',
    logo: '/images/logos/github.svg',
    signal: 'Model choice now inherits organization policy by default.',
    architectureMove:
      'Store model eligibility separately from task routing preferences.',
    sourceIds: ['github-model-policy'],
  },
  {
    date: '2026-08-26',
    organization: 'xAI',
    title: 'Grok 4.6 reached Microsoft Foundry',
    classification: 'model-availability',
    logo: '/images/logos/xai.svg',
    signal:
      'Enterprise model catalogs are becoming the evaluation and deployment plane.',
    architectureMove:
      'Run workload-specific tests behind the same policy and telemetry contract.',
    sourceIds: ['xai-foundry'],
  },
  {
    date: '2026-08-27',
    organization: 'Vercel',
    title: 'Cursor joined the AI SDK harness layer',
    classification: 'agent-runtime',
    logo: '/images/logos/vercel.svg',
    signal:
      'The harness is becoming a replaceable runtime in the same way the model became replaceable.',
    architectureMove:
      'Code to a harness adapter; keep canonical work state outside the harness.',
    sourceIds: ['vercel-cursor-harness'],
  },
  {
    date: '2026-08-27',
    organization: 'Anthropic',
    title: 'The Model Hardware Standard entered research preview',
    classification: 'protocol',
    logo: '/images/logos/anthropic-mark.svg',
    signal:
      'Agent protocols are extending from software tools into physical devices.',
    architectureMove:
      'Put physical actions behind explicit device capabilities, safety checks, and approvals.',
    sourceIds: ['anthropic-mhs'],
  },
  {
    date: '2026-08-27',
    organization: 'Google',
    title: 'Gemini Omni 1.1 Flash became generally available',
    classification: 'model-release',
    logo: '/images/logos/google.svg',
    signal:
      'Conversational video generation gained extension, interpolation, and resolution controls.',
    architectureMove:
      'Run media generation as an asynchronous, receipted job with immutable inputs.',
    sourceIds: ['google-gemini-changelog'],
  },
  {
    date: '2026-08-27',
    organization: 'GitHub',
    title:
      'Agentic review expanded to bot-authored and very large pull requests',
    classification: 'governance',
    logo: '/images/logos/github.svg',
    signal:
      'Machine-authored work is being reviewed by a separate agentic control.',
    architectureMove:
      'Preserve reviewer independence and record why findings were resolved.',
    sourceIds: ['github-review'],
  },
  {
    date: '2026-08-28',
    organization: 'Vercel + Anthropic',
    title: 'Claude Managed Agents connected to Chat SDK',
    classification: 'agent-runtime',
    logo: '/images/logos/anthropic-mark.svg',
    signal:
      'The loop, tools, session state, and sandbox can now be provider-managed.',
    architectureMove:
      'Use managed loops where speed matters; keep export, trace, and replacement paths.',
    sourceIds: ['vercel-managed-agents'],
  },
  {
    date: '2026-08-28',
    organization: 'Vercel',
    title: 'eve agents became deployable from the dashboard',
    classification: 'agent-runtime',
    logo: '/images/logos/vercel.svg',
    signal:
      'Agent scaffolding now spans repo, deployment, channel, model, and MCP connections.',
    architectureMove:
      'Treat generated scaffolds as reviewed codebases, not opaque hosted agents.',
    sourceIds: ['vercel-eve'],
  },
  {
    date: '2026-08-28',
    organization: 'Tencent + Vercel',
    title: 'Hy4 Preview reached AI Gateway',
    classification: 'model-availability',
    logo: '/images/logos/vercel.svg',
    signal:
      'Open model availability is widening behind normalized routing and spend controls.',
    architectureMove:
      'Classify this as gateway availability, not an independently verified model win.',
    sourceIds: ['vercel-hy4'],
  },
  {
    date: '2026-08-31',
    organization: 'OpenAI',
    title: 'GPT-5.4 tiers retired from ChatGPT-authenticated Codex',
    classification: 'governance',
    logo: '/images/logos/openai.svg',
    signal:
      'Agent defaults can change even when API endpoints remain available.',
    architectureMove:
      'Pin model policy by environment and test every planned migration.',
    sourceIds: ['openai-codex-changelog'],
  },
]

export type ModelRoute = {
  family: string
  provider: string
  logo: string
  defaultRole: string
  whyItStaysOnTheBoard: string
  routingCaution: string
  freshness: string
  sourceIds: string[]
}

export const modelRoutes: ModelRoute[] = [
  {
    family: 'GPT-5.6 Sol / Terra / Luna',
    provider: 'OpenAI',
    logo: '/images/logos/openai.svg',
    defaultRole:
      'Architecture judgment, bounded coding, and high-volume subagent work by tier.',
    whyItStaysOnTheBoard:
      'One family spans flagship, balanced, and volume routes; Codex and Responses share the operating surface.',
    routingCaution:
      'Do not assume a Codex workspace default equals API availability or a pinned production route.',
    freshness: 'Codex migration effective 31 Aug',
    sourceIds: ['openai-models', 'openai-codex-changelog', 'aws-terra-luna'],
  },
  {
    family: 'Claude Opus 5 / Sonnet 5',
    provider: 'Anthropic',
    logo: '/images/logos/anthropic-mark.svg',
    defaultRole:
      'Deep brownfield engineering, sustained tool use, and careful implementation review.',
    whyItStaysOnTheBoard:
      'The provider positions both tiers around coding and agents, with different capability and cost envelopes.',
    routingCaution:
      'Keep the harness and conversation state exportable if using a managed loop.',
    freshness: 'No new frontier LLM in this window',
    sourceIds: [
      'anthropic-opus-5',
      'anthropic-sonnet-5',
      'vercel-managed-agents',
    ],
  },
  {
    family: 'Gemini 3.7 Flash + specialist endpoints',
    provider: 'Google',
    logo: '/images/logos/google.svg',
    defaultRole:
      'Fast coding/agent tasks plus native speech, video, and multimodal services.',
    whyItStaysOnTheBoard:
      'Google is separating high-throughput reasoning from dedicated production media endpoints.',
    routingCaution:
      'Route speech and video as typed services; do not bury them inside one general-model abstraction.',
    freshness: 'Two GA endpoint families this week',
    sourceIds: ['google-gemini-changelog'],
  },
  {
    family: 'Grok 4.6',
    provider: 'xAI',
    logo: '/images/logos/xai.svg',
    defaultRole:
      'Long-running interactive, visual, and parallel build experiments.',
    whyItStaysOnTheBoard:
      'It is now available in governed enterprise catalogs and xAI is shipping an always-on agent product around it.',
    routingCaution:
      'Evaluate with the same repository tasks and approval boundaries used for the primary coding route.',
    freshness: 'Foundry availability this week',
    sourceIds: ['xai-grok-46', 'xai-foundry', 'xai-bot-plans'],
  },
  {
    family: 'DeepSeek V4 Pro / Flash Vision',
    provider: 'DeepSeek',
    logo: '/images/logos/deepseek.svg',
    defaultRole:
      'Open-model cost, private deployment, multimodal agent, and fallback experiments.',
    whyItStaysOnTheBoard:
      'Open weights, reasoning effort, Responses compatibility, and a recent multimodal endpoint make it operationally relevant.',
    routingCaution:
      'The latest relevant release is just outside the seven-day window; keep license, host, and data-path evidence attached.',
    freshness: 'Boundary context: 21 Aug',
    sourceIds: ['deepseek-v4-pro', 'deepseek-v4-vision'],
  },
  {
    family: 'Mistral Medium 3.5',
    provider: 'Mistral AI',
    logo: '/images/logos/mistral.svg',
    defaultRole:
      'Sovereign or self-hosted long-horizon coding and enterprise workflow work.',
    whyItStaysOnTheBoard:
      'The model and Vibe runtime combine open weights, remote agents, visible actions, and approvals.',
    routingCaution:
      'Do not conflate regional hosting, open weights, and operational sovereignty; record each property separately.',
    freshness: 'Infrastructure signal this week',
    sourceIds: ['mistral-medium-35', 'mistral-humain'],
  },
  {
    family: 'Hy4 Preview',
    provider: 'Tencent',
    logo: '/images/logos/vercel.svg',
    defaultRole:
      'Watchlist route for long-context coding and document workloads behind a gateway.',
    whyItStaysOnTheBoard:
      'The one-million-token preview is reachable through normalized gateway routing, traces, and budgets.',
    routingCaution:
      'Availability is verified; task quality is not independently measured here.',
    freshness: 'Gateway availability: 28 Aug',
    sourceIds: ['vercel-hy4'],
  },
  {
    family: 'Qwen 3.8 Flash',
    provider: 'Alibaba',
    logo: '/images/logos/qwen.svg',
    defaultRole:
      'Multimodal coding, tool use, and high-context multi-step agent experiments.',
    whyItStaysOnTheBoard:
      'The gateway route accepts text and images and exposes a one-million-token context window.',
    routingCaution:
      'Gateway availability and provider recommendations are verified; local task quality is not yet measured here.',
    freshness: 'Gateway availability: 26 Aug',
    sourceIds: ['vercel-qwen-38'],
  },
  {
    family: 'GLM 5.3 Flash',
    provider: 'Z.ai',
    logo: '/images/logos/vercel.svg',
    defaultRole:
      'Multimodal coding with structured output and function-calling requirements.',
    whyItStaysOnTheBoard:
      'It joins the normalized gateway with a one-million-token context window and coding-oriented interface.',
    routingCaution:
      'Treat it as a watchlist route until the same repository evals used for primary models have run.',
    freshness: 'Gateway availability: 26 Aug',
    sourceIds: ['vercel-glm-53'],
  },
]

export const modelAvailabilityWatch = [
  {
    model: 'MiniMax M3 / M2.7',
    event: 'Time-limited free gateway routes',
    classification: 'Access change, not a model release',
    logo: '/images/logos/minimax.svg',
    sourceIds: ['vercel-minimax'],
  },
  {
    model: 'Ling 3.0 Flash Fin',
    event: 'Finance model reached AI Gateway',
    classification: 'Gateway availability',
    logo: '/images/logos/vercel.svg',
    sourceIds: ['vercel-ling-fin'],
  },
  {
    model: 'Meta Muse Image',
    event: 'Generation and editing model reached AI Gateway',
    classification: 'Image-model availability',
    logo: '/images/logos/meta.svg',
    sourceIds: ['vercel-muse-image'],
  },
] as const

export const repoActivity = [
  {
    repo: 'frankx.ai-vercel-website',
    commits: 48,
    href: 'https://github.com/frankxai/frankx.ai-vercel-website',
  },
  {
    repo: 'arcanea-ai-app',
    commits: 20,
    href: 'https://github.com/frankxai/arcanea-ai-app',
  },
  {
    repo: 'Starlight-Intelligence-System',
    commits: 12,
    href: 'https://github.com/frankxai/Starlight-Intelligence-System',
  },
  {
    repo: 'starlight-intelligence-web',
    commits: 5,
    href: 'https://github.com/frankxai/starlight-intelligence-web',
  },
  {
    repo: 'agentic-creator-os',
    commits: 4,
    href: 'https://github.com/frankxai/agentic-creator-os',
  },
  {
    repo: 'ai-architect',
    commits: 4,
    href: 'https://github.com/frankxai/ai-architect',
  },
  {
    repo: 'gencreator.ai',
    commits: 3,
    href: 'https://github.com/frankxai/gencreator.ai',
  },
  {
    repo: 'ai-architect-academy',
    commits: 2,
    href: 'https://github.com/frankxai/ai-architect-academy',
  },
  {
    repo: 'arcanea-marketplace',
    commits: 1,
    href: 'https://github.com/frankxai/arcanea-marketplace',
  },
  {
    repo: 'production-agent-patterns',
    commits: 1,
    href: 'https://github.com/frankxai/production-agent-patterns',
  },
] as const

export const repoSignals = [
  {
    title: 'Graph Engineering became the organizing layer',
    detail:
      'The field guide, seven-plane architecture, and provenance-enforced model data moved graph contracts above ad-hoc loops.',
    receipts: [
      {
        label: 'Graph Engineering Field Guide',
        href: 'https://github.com/frankxai/frankx.ai-vercel-website/commit/ad550bfd',
      },
      {
        label: 'Seven-plane architecture',
        href: 'https://github.com/frankxai/frankx.ai-vercel-website/commit/e40304d',
      },
      {
        label: 'Provenance-enforced ingest',
        href: 'https://github.com/frankxai/frankx.ai-vercel-website/commit/d493ce8',
      },
    ],
  },
  {
    title: 'Truth and security gates became fail-closed',
    detail:
      'Fabricated claims were removed, exposed credentials were remediated, and cross-harness work was forced through explicit checks.',
    receipts: [
      {
        label: 'Remove fabricated claims',
        href: 'https://github.com/frankxai/frankx.ai-vercel-website/commit/0a02baf',
      },
      {
        label: 'Credential remediation',
        href: 'https://github.com/frankxai/frankx.ai-vercel-website/commit/150d7da',
      },
      {
        label: 'Cross-harness conductor',
        href: 'https://github.com/frankxai/ai-architect/commit/54bf761',
      },
    ],
  },
  {
    title: 'The shared infrastructure spine became explicit',
    detail:
      'Starlight work moved toward a joint operator system, plugin discovery, GitOps cost control, and a guarded World Context Gateway.',
    receipts: [
      {
        label: 'Joint infrastructure operator',
        href: 'https://github.com/frankxai/frankx.ai-vercel-website/commit/a6cc6ec',
      },
      {
        label: 'Agent discovery',
        href: 'https://github.com/frankxai/Starlight-Intelligence-System/commit/516d71c',
      },
      {
        label: 'World Context Gateway',
        href: 'https://github.com/frankxai/arcanea-ai-app/commit/68d6f42',
      },
    ],
  },
  {
    title: 'Evidence became a pipeline, not a copy-editing step',
    detail:
      'Model data, research content, and factory outputs gained source, license, evaluation, and receipt requirements.',
    receipts: [
      {
        label: 'Model arena receipts',
        href: 'https://github.com/frankxai/frankx.ai-vercel-website/commit/3edf857',
      },
      {
        label: 'Evidence-bound content intelligence',
        href: 'https://github.com/frankxai/agentic-creator-os/commit/7659a70',
      },
      {
        label: 'Canonical intelligence consumption',
        href: 'https://github.com/frankxai/agentic-creator-os/commit/5cd8e5a',
      },
    ],
  },
] as const

export const architectureLayers = [
  {
    index: '01',
    name: 'Owned graph contract',
    default: 'Supabase / PostgreSQL',
    logo: '/images/logos/supabase.svg',
    responsibility:
      'Canonical nodes, edges, runs, ownership, policy references, evidence, and status.',
    rule: 'No agent harness owns business truth.',
  },
  {
    index: '02',
    name: 'Bounded harness adapters',
    default: 'Codex, Claude Code, Cursor, Grok Build',
    logo: '/images/logos/openai.svg',
    responsibility:
      'Planning, coding, review, browsing, and tool use inside a replaceable runtime adapter.',
    rule: 'Pass a bounded work package in; return a typed result and trace out.',
  },
  {
    index: '03',
    name: 'Durable execution',
    default: 'Temporal or Vercel Workflow by workload',
    logo: '/images/logos/temporal.svg',
    responsibility:
      'Retries, timers, human waits, resumability, idempotency, and long-running jobs.',
    rule: 'Choose one durability owner for a workflow.',
  },
  {
    index: '04',
    name: 'Connector and MCP boundary',
    default: 'Vercel Connect + scoped MCP servers',
    logo: '/images/logos/vercel.svg',
    responsibility:
      'Identity, short-lived credentials, capability discovery, approvals, and data minimization.',
    rule: 'Discovery never implies authorization.',
  },
  {
    index: '05',
    name: 'Model role router',
    default: 'Policy-first model registry',
    logo: '/images/logos/anthropic-mark.svg',
    responsibility:
      'Task fit, cost ceiling, residency, data retention, fallback, and evaluation history.',
    rule: 'Select by workload evidence, not one global ranking.',
  },
  {
    index: '06',
    name: 'Evidence and observability',
    default: 'GitHub checks + traces + immutable receipts',
    logo: '/images/logos/github.svg',
    responsibility:
      'Inputs, tool calls, diffs, tests, sources, reviewer decisions, deployment, and rollback.',
    rule: 'A claim without a retrievable receipt remains a hypothesis.',
  },
] as const

export const frameworkComparisons = [
  {
    tool: 'Vercel AI SDK HarnessAgent',
    logo: '/images/logos/vercel.svg',
    useWhen:
      'The application must switch coding-agent harnesses behind one interface.',
    doNotUseAs: 'Canonical workflow state or the only audit record.',
    decision: 'Adopt at the adapter boundary; keep the contract owned.',
  },
  {
    tool: 'OpenAI Agents SDK / Responses',
    logo: '/images/logos/openai.svg',
    useWhen:
      'The flow benefits from OpenAI-hosted tools, native items, compaction, and tracing.',
    doNotUseAs:
      'A vendor-neutral graph database or cross-provider policy registry.',
    decision: 'Use for OpenAI-native nodes, not the whole operating system.',
  },
  {
    tool: 'LangGraph',
    logo: '/images/logos/langchain.svg',
    useWhen:
      'The application is fundamentally a state graph with explicit transitions and checkpoints.',
    doNotUseAs: 'An automatic companion to every agent or to Temporal.',
    decision: 'Adopt selectively for state-graph products.',
  },
  {
    tool: 'Temporal',
    logo: '/images/logos/temporal.svg',
    useWhen:
      'Work must survive process loss, wait for humans, retry safely, or run for days.',
    doNotUseAs: 'A semantic graph, model router, or UI state store.',
    decision: 'Default durability spine for consequential long-running work.',
  },
  {
    tool: 'Vercel Workflow',
    logo: '/images/logos/vercel.svg',
    useWhen:
      'A Next.js or serverless job needs durable steps, webhooks, and deployment proximity.',
    doNotUseAs: 'The cross-company system of record.',
    decision: 'Use for web-native jobs and media pipelines.',
  },
] as const

export const connectorMatrix = [
  {
    connector: 'GitHub',
    logo: '/images/logos/github.svg',
    reads: 'Repos, issues, pull requests, reviews, checks',
    writes: 'Branches, commits, comments, draft pull requests',
    defaultControl: 'GitHub App scope + branch protection + draft-first review',
    approval: 'Human approval before merge or release',
  },
  {
    connector: 'Vercel',
    logo: '/images/logos/vercel.svg',
    reads: 'Projects, deployments, build logs, observability',
    writes: 'Preview deployment through Git integration',
    defaultControl: 'Git commit provenance + project allowlist',
    approval: 'Human approval before production promotion',
  },
  {
    connector: 'Supabase / PostgreSQL',
    logo: '/images/logos/supabase.svg',
    reads: 'Graph state, evidence, runs, policies',
    writes: 'Typed state transitions and receipt references',
    defaultControl: 'RLS, transactions, tenant keys, append-only evidence',
    approval: 'Policy check for destructive or cross-tenant writes',
  },
  {
    connector: 'Slack, Gmail, and app events',
    logo: '/images/logos/google.svg',
    reads: 'Approved threads, messages, email, event payloads',
    writes: 'Drafts, summaries, triage actions',
    defaultControl: 'Read-minimized event trigger + scoped short-lived token',
    approval: 'Approval before send, delete, or external disclosure',
  },
  {
    connector: 'Drive and Notion',
    logo: '/images/logos/notion.svg',
    reads: 'Authorized documents and knowledge collections',
    writes: 'Draft pages, comments, structured updates',
    defaultControl: 'Source visibility check + document-level provenance',
    approval: 'Approval before changing shared source material',
  },
  {
    connector: 'Browser / WebMCP',
    logo: '/images/logos/openai.svg',
    reads: 'Current page state and explicitly exposed site tools',
    writes: 'Site actions available to the authenticated user',
    defaultControl:
      'Prompt-injection isolation + allowlisted actions + screenshot/trace',
    approval: 'Approval for consequential account or financial actions',
  },
] as const

export const internalDecisions = [
  'Graph Engineering sits above loop engineering: the graph defines ownership and state; the loop executes a bounded node.',
  'Starlight Graph OS should use relational graph contracts first. Add a dedicated graph database only when measured traversal needs justify it.',
  'Nominal agent swarms are deferred until schema, ownership, policy, and evaluation boundaries exist.',
  'Model and harness routing are separate decisions. A strong model inside the wrong harness is still the wrong system.',
  'LangGraph and Temporal solve different problems; adding both by reflex creates two competing state owners.',
] as const

export const reviewStats = {
  verifiedChanges: weeklyChanges.length,
  officialSources: sourceLedger.length,
  trackedOrganizations: new Set(
    sourceLedger.map((source) => source.organization),
  ).size,
  sampledCommits: repoActivity.reduce((sum, item) => sum + item.commits, 0),
  sampledRepositories: repoActivity.length,
} as const

export function getSource(sourceId: string) {
  return sourceLedger.find((source) => source.id === sourceId)
}

export function getSources(sourceIds: string[]) {
  return sourceIds.flatMap((sourceId) => {
    const source = getSource(sourceId)
    return source ? [source] : []
  })
}
