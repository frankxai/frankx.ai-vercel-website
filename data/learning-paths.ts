// Curated Learning Paths - Best Free Content from Top Creators
// This positions FrankX.AI as the trusted curator for AI learning
import { youtubeChannels } from '@/data/youtube-index'

export interface VideoResource {
  id: string
  youtubeId: string
  title: string
  creator: string
  creatorChannel: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  description: string
  tags: string[]
}

export interface EcosystemTool {
  name: string
  category: string
  description: string
  href: string
  status?: 'GA' | 'Preview' | 'New' | 'Updated'
}

export interface PortalAnnouncement {
  date: string
  title: string
  summary: string
  source: string
  tag: 'Launch' | 'Update' | 'Deprecation' | 'Research'
}

export interface ExpertCreator {
  name: string
  role: string
  channelUrl: string
  why: string
  isOfficial?: boolean
}

export interface PortalFAQ {
  question: string
  answer: string
}

export interface LearningPath {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  color: 'emerald' | 'cyan' | 'amber' | 'violet' | 'sky'
  videos: VideoResource[]
  relatedGuides: string[]
  outcomes: string[]
  // Optional richer portal sections — render conditionally when populated.
  heroEyebrow?: string
  longIntro?: string
  ctaTitle?: string
  ctaBody?: string
  ecosystem?: EcosystemTool[]
  announcements?: PortalAnnouncement[]
  experts?: ExpertCreator[]
  faqs?: PortalFAQ[]
}

export const learningPaths: LearningPath[] = [
  {
    id: 'claude-mastery',
    title: 'Claude & Anthropic Mastery',
    slug: 'claude-mastery',
    description: 'Master Claude AI from basics to advanced prompt engineering and API integration.',
    icon: 'brain',
    difficulty: 'beginner',
    estimatedHours: 8,
    color: 'amber',
    outcomes: [
      'Craft effective prompts for any use case',
      'Understand Claude\'s capabilities and limitations',
      'Build applications with the Claude API',
      'Use Claude for coding, writing, and analysis',
    ],
    relatedGuides: ['/guides/claude-anthropic-guide'],
    videos: [
      {
        id: 'claude-intro',
        youtubeId: 'SUysp3sJHbA',
        title: 'Claude Code Tutorial #1 - Introduction & Setup',
        creator: 'Net Ninja',
        creatorChannel: youtubeChannels.netNinja.url,
        duration: 'See YouTube',
        level: 'beginner',
        description: 'Beginner walkthrough for setting up and starting with Claude Code.',
        tags: ['claude', 'tutorial', 'beginner'],
      },
      {
        id: 'claude-prompts',
        youtubeId: 'T9aRN5JkmL8',
        title: 'AI prompt engineering: A deep dive',
        creator: 'Anthropic',
        creatorChannel: youtubeChannels.anthropic.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: 'Prompt engineering concepts and practical techniques from Anthropic.',
        tags: ['prompts', 'claude', 'techniques'],
      },
      {
        id: 'claude-api',
        youtubeId: '6eBSHbLKuN0',
        title: 'Mastering Claude Code in 30 minutes',
        creator: 'Anthropic',
        creatorChannel: youtubeChannels.anthropic.url,
        duration: 'See YouTube',
        level: 'advanced',
        description: 'Official deep dive into Claude Code workflows and practical usage.',
        tags: ['claude-code', 'workflow', 'advanced'],
      },
    ],
  },
  {
    id: 'openai-devday-agent-stack',
    title: 'OpenAI DevDay Agent Stack',
    slug: 'openai-devday-agent-stack',
    description:
      'Watch the best official OpenAI DevDay sessions and turn them into a practical agent, Codex, Apps SDK, and ChatGPT workflow.',
    icon: 'zap',
    difficulty: 'intermediate',
    estimatedHours: 16,
    color: 'emerald',
    heroEyebrow: 'Updated July 3, 2026 · DevDay 2025 plus current 2026 platform notes',
    longIntro:
      'OpenAI DevDay 2025 set the direction for builders: code faster with Codex, ship agents through code, build apps inside ChatGPT, and evaluate production workflows. The important 2026 update is that Agent Builder and Evals are now legacy paths: OpenAI recommends Agents SDK for code-first workflows and ChatGPT Workspace Agents for natural-language team workflows. Use this path as the current FrankX map through the official talks, docs, and migration choices.',
    ctaTitle: 'Turn DevDay into a build plan',
    ctaBody:
      'Use the free OpenAI Agent Builder Workbook to pick one workflow, choose the right surface, define guardrails, and ship your first useful agent artifact.',
    outcomes: [
      'Understand the current OpenAI builder stack after DevDay 2025',
      'Choose between Codex, Agents SDK, Apps SDK, Workspace Agents, and ChatGPT agent mode',
      'Avoid legacy Agent Builder and Evals traps before the November 30, 2026 shutdown',
      'Design a practical agent workflow with context, tools, approvals, and eval loops',
      'Connect the workflow to FrankX guides, workbook exercises, and the GenCreator community path',
    ],
    relatedGuides: [
      '/guides/openai-devday-agent-stack-2026',
      '/resources/openai-agent-builder-workbook',
      '/learn/codex-mastery',
      '/learn/chatgpt-mastery',
      '/gencreator',
      '/community',
    ],
    videos: [
      {
        id: 'openai-devday-2025-keynote',
        youtubeId: 'hS1YqcewH0c',
        title: 'OpenAI DevDay 2025: Opening Keynote with Sam Altman',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'The official DevDay overview: ChatGPT apps, AgentKit, Codex GA, GPT-5 Pro in the API, Sora 2, realtime, and image model updates.',
        tags: ['devday', 'keynote', 'openai'],
      },
      {
        id: 'openai-devday-2025-state-of-the-union',
        youtubeId: 'r1R3RDPvPeg',
        title: 'Developer State Of The Union',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Official developer roadmap session covering Codex, gpt-oss, API direction, and how OpenAI expects builders to experiment and scale.',
        tags: ['developer-platform', 'codex', 'api'],
      },
      {
        id: 'openai-devday-2025-shipping-with-codex',
        youtubeId: 'Gr41tYOzE20',
        title: 'Shipping with Codex',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'How OpenAI engineers use Codex across local work, cloud delegation, refactors, and merged code review loops.',
        tags: ['codex', 'engineering', 'shipping'],
      },
      {
        id: 'openai-devday-2025-context-engineering',
        youtubeId: '3KAI__5dUn0',
        title: 'Context Engineering & Coding Agents with Cursor',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Cursor shares context engineering patterns for agent harnesses, autonomous coding, and parallel agent work.',
        tags: ['context-engineering', 'coding-agents', 'cursor'],
      },
      {
        id: 'openai-devday-2025-orchestrating-agents',
        youtubeId: 'KplSDxYv9xU',
        title: 'Orchestrating Agents at Scale',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'The DevDay session on production-grade agent design, orchestration, connectors, and enterprise deployment patterns.',
        tags: ['agents', 'orchestration', 'scale'],
      },
      {
        id: 'openai-devday-2025-openai-on-openai',
        youtubeId: 'nKuXMDCtyQI',
        title: 'OpenAI on OpenAI: Applying AI to Our Own Workflows',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'OpenAI shares how it spots and scales high-leverage internal use cases across sales, support, finance, and data workflows.',
        tags: ['workflows', 'internal-ai', 'enterprise'],
      },
      {
        id: 'openai-devday-2025-evals-in-action',
        youtubeId: 'YEaKXjHENyQ',
        title: 'Evals in Action: From Frontier Research to Production Applications',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'Useful for evaluation principles, with a 2026 caveat: the hosted Evals product is legacy, so port the habit into code-first traces and tests.',
        tags: ['evals', 'reliability', 'legacy-context'],
      },
      {
        id: 'openai-devday-2025-model-behavior',
        youtubeId: 'ER9Hqly28Qw',
        title: 'Model Behavior: The Science of AI Style',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Behind the scenes of ChatGPT tone, style, and interaction design. Important for builders designing user-facing agents.',
        tags: ['chatgpt', 'model-behavior', 'ux'],
      },
      {
        id: 'openai-devday-2025-creative-production',
        youtubeId: '70ush8Vknx8',
        title: 'Sora, ImageGen, and Codex: The Next Wave of Creative Production',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Creative production workflow session for film, media, brand campaigns, and developer-built creative tooling.',
        tags: ['sora', 'imagegen', 'creative-production'],
      },
      {
        id: 'openai-devday-2025-open-models',
        youtubeId: '1HL2YHRj270',
        title: 'Building with Open Models',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'Official DevDay session on gpt-oss and using open models alongside frontier models for flexible production systems.',
        tags: ['gpt-oss', 'open-models', 'architecture'],
      },
    ],
    ecosystem: [
      {
        name: 'Codex',
        category: 'Developer agent',
        description:
          'General-availability coding agent for terminal, IDE, cloud, Slack, SDK, and team review workflows.',
        href: 'https://developers.openai.com/codex',
        status: 'GA',
      },
      {
        name: 'Agents SDK',
        category: 'Code-first agents',
        description:
          'Best fit when your application owns orchestration, tool execution, approvals, state, and observability.',
        href: 'https://developers.openai.com/api/docs/guides/agents',
        status: 'Updated',
      },
      {
        name: 'Apps SDK',
        category: 'ChatGPT apps',
        description:
          'Preview framework for building conversational apps with interactive interfaces inside ChatGPT.',
        href: 'https://developers.openai.com/apps-sdk',
        status: 'Preview',
      },
      {
        name: 'Workspace Agents',
        category: 'Team agents',
        description:
          'Trigger published ChatGPT workspace agents from your own systems and share repeatable work with teams.',
        href: 'https://developers.openai.com/workspace-agents',
        status: 'New',
      },
      {
        name: 'ChatGPT agent mode',
        category: 'Operator workflow',
        description:
          'ChatGPT surface for complex online tasks, files, connectors, browser work, code interpreter, and scheduled runs.',
        href: 'https://help.openai.com/en/articles/11752874-chatgpt-workspace-agents',
        status: 'Updated',
      },
      {
        name: 'Agent Builder and hosted Evals',
        category: 'Legacy path',
        description:
          'OpenAI is winding these down. Use migration guidance before basing a new production workflow on them.',
        href: 'https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder',
        status: 'Updated',
      },
    ],
    announcements: [
      {
        date: '2025-10-06',
        title: 'OpenAI DevDay 2025',
        summary:
          'DevDay introduced Apps in ChatGPT, AgentKit, Sora 2 in the API, Codex GA updates, GPT-5 Pro in the API, realtime mini, and image model updates.',
        source: 'https://openai.com/devday/',
        tag: 'Launch',
      },
      {
        date: '2025-10-06',
        title: 'Codex is generally available',
        summary:
          'Codex added Slack integration, Codex SDK, admin controls, and broader team workflows for local, IDE, cloud, and review loops.',
        source: 'https://openai.com/index/codex-now-generally-available/',
        tag: 'Launch',
      },
      {
        date: '2026-06-03',
        title: 'Agent Builder and Evals winding down',
        summary:
          'OpenAI says Agent Builder and Evals will no longer be available from November 30, 2026; use Agents SDK or Workspace Agents instead.',
        source: 'https://openai.com/index/introducing-agentkit/',
        tag: 'Deprecation',
      },
      {
        date: '2026-07-03',
        title: 'DevDay 2026 applications are open',
        summary:
          'OpenAI lists DevDay 2026 for September 29 in San Francisco. This path will be refreshed after that event.',
        source: 'https://openai.com/devday/',
        tag: 'Update',
      },
    ],
    experts: [
      {
        name: youtubeChannels.openai.name,
        role: 'Official channel',
        channelUrl: youtubeChannels.openai.url,
        why: 'Primary source for DevDay keynotes, launch sessions, and product roadmap videos.',
        isOfficial: true,
      },
      {
        name: 'OpenAI Developers',
        role: 'Official documentation',
        channelUrl: 'https://developers.openai.com/',
        why: 'Use this for current docs, deprecations, migration guidance, and production checklists.',
        isOfficial: true,
      },
      {
        name: 'FrankX',
        role: 'Builder translation layer',
        channelUrl: 'https://frankx.ai/guides/openai-devday-agent-stack-2026',
        why: 'Converts official announcements into a practical workbook for creators, operators, and AI architects.',
      },
    ],
    faqs: [
      {
        question: 'What is the current OpenAI agent stack after DevDay 2025?',
        answer:
          'Use Codex for software work, Agents SDK for code-first product agents, Apps SDK for apps inside ChatGPT, Workspace Agents for repeatable team workflows, and ChatGPT agent mode for operator-style tasks.',
      },
      {
        question: 'Should I start a new workflow in Agent Builder?',
        answer:
          'No for production work. OpenAI announced on June 3, 2026 that Agent Builder and Evals are winding down and will be unavailable after November 30, 2026. Use Agents SDK or Workspace Agents instead.',
      },
      {
        question: 'What is the best first DevDay video for developers?',
        answer:
          'Watch Developer State Of The Union first for the platform map, then Shipping with Codex if you build software, or Orchestrating Agents at Scale if you design production agent systems.',
      },
      {
        question: 'Where does the FrankX workbook fit?',
        answer:
          'The workbook turns the official sessions into a concrete workflow: pick a use case, choose the surface, define tools and permissions, write the agent contract, add evaluation checks, and decide what belongs in the GenCreator community build queue.',
      },
    ],
  },
  {
    id: 'codex-mastery',
    title: 'Codex & OpenAI Agent Mastery',
    slug: 'codex-mastery',
    description:
      'Master OpenAI Codex for agentic software work: setup, local CLI workflows, AGENTS.md, code review, and production-ready iteration.',
    icon: 'zap',
    difficulty: 'intermediate',
    estimatedHours: 10,
    color: 'emerald',
    outcomes: [
      'Install and run Codex locally from the terminal',
      'Scope coding tasks so agents can change, test, and review safely',
      'Use AGENTS.md to encode reusable repo instructions',
      'Delegate debugging, refactors, reviews, and maintenance workflows',
      'Connect Codex habits to real production verification loops',
    ],
    relatedGuides: [
      '/guides/claude-code-getting-started',
      '/blog/ultimate-guide-ai-coding-agents-2026',
      '/learn/openai-devday-agent-stack',
      '/resources/openai-agent-builder-workbook',
    ],
    videos: [
      {
        id: 'codex-cli-openai',
        youtubeId: 'FUq9qRwrDrI',
        title: 'OpenAI Codex CLI',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Official OpenAI overview of Codex CLI: a local coding agent for turning natural language into working code.',
        tags: ['codex', 'cli', 'openai'],
      },
      {
        id: 'codex-devday-shipping',
        youtubeId: 'Gr41tYOzE20',
        title: 'Shipping with Codex',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'DevDay session on how OpenAI engineers use Codex across local work, cloud delegation, refactors, and code review.',
        tags: ['codex', 'devday', 'engineering'],
      },
      {
        id: 'codex-context-engineering-cursor',
        youtubeId: '3KAI__5dUn0',
        title: 'Context Engineering & Coding Agents with Cursor',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Official DevDay context engineering session for agent harnesses, parallel coding agents, and durable task context.',
        tags: ['context', 'agents', 'cursor'],
      },
      {
        id: 'codex-devday-state-of-union',
        youtubeId: 'r1R3RDPvPeg',
        title: 'Developer State Of The Union',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'Official developer roadmap session covering Codex, gpt-oss, API direction, and scaling OpenAI-powered applications.',
        tags: ['roadmap', 'platform', 'advanced'],
      },
      {
        id: 'codex-essentials-agentic-dev',
        youtubeId: 'u-Jl7bzab8A',
        title: 'Codex Essentials - AI Assisted Agentic Development Course',
        creator: youtubeChannels.examPro.name,
        creatorChannel: youtubeChannels.examPro.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'Long-form course on applying Codex to real-world agentic development and developer productivity.',
        tags: ['agentic-dev', 'course', 'advanced'],
      },
    ],
  },
  {
    id: 'chatgpt-mastery',
    title: 'ChatGPT & OpenAI Mastery',
    slug: 'chatgpt-mastery',
    description:
      'Master ChatGPT for everyday work, prompting, data analysis, custom workflows, and practical OpenAI fluency.',
    icon: 'brain',
    difficulty: 'beginner',
    estimatedHours: 10,
    color: 'cyan',
    outcomes: [
      'Write clear prompts that include goal, context, constraints, and output format',
      'Use ChatGPT for writing, brainstorming, summarizing, learning, and decision support',
      'Turn repeat tasks into reusable prompts, Projects, GPTs, or workspace agents',
      'Analyze files and data with a healthy verification habit',
      'Know when to switch from ChatGPT to Codex, Apps SDK, or the OpenAI API',
    ],
    relatedGuides: [
      '/guides/openai-chatgpt-guide',
      '/guides/openai-devday-agent-stack-2026',
      '/guides/top-50-ai-prompts',
      '/learn/openai-devday-agent-stack',
      '/resources/openai-agent-builder-workbook',
    ],
    videos: [
      {
        id: 'chatgpt-devday-keynote',
        youtubeId: 'hS1YqcewH0c',
        title: 'OpenAI DevDay 2025: Opening Keynote with Sam Altman',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Official overview of apps in ChatGPT, developer distribution, Codex, media APIs, and the broader OpenAI platform direction.',
        tags: ['chatgpt', 'apps-sdk', 'devday'],
      },
      {
        id: 'chatgpt-model-behavior',
        youtubeId: 'ER9Hqly28Qw',
        title: 'Model Behavior: The Science of AI Style',
        creator: youtubeChannels.openai.name,
        creatorChannel: youtubeChannels.openai.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Official DevDay session on how ChatGPT tone, style, and behavior emerge and what builders should understand about user-facing AI.',
        tags: ['model-behavior', 'style', 'chatgpt'],
      },
      {
        id: 'chatgpt-prompt-engineering-devs',
        youtubeId: 'kifXwGtKubs',
        title: 'ChatGPT Prompt Engineering for Developers',
        creator: youtubeChannels.deepLearningAI.name,
        creatorChannel: youtubeChannels.deepLearningAI.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Andrew Ng and Isa Fulford teach prompt structure, iteration, and reliable LLM interaction patterns.',
        tags: ['prompts', 'developers', 'openai'],
      },
      {
        id: 'chatgpt-prompt-engineering-freecodecamp',
        youtubeId: '_ZvnD73m40o',
        title: 'Prompt Engineering Tutorial - Master ChatGPT and LLM Responses',
        creator: youtubeChannels.freeCodeCamp.name,
        creatorChannel: youtubeChannels.freeCodeCamp.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Full prompt engineering course covering patterns that transfer across ChatGPT and other frontier models.',
        tags: ['prompting', 'llms', 'course'],
      },
      {
        id: 'chatgpt-data-analyst',
        youtubeId: 'VCbY1qZVwvo',
        title: 'Is Excel Dead? Meet the ChatGPT Data Analyst',
        creator: youtubeChannels.kevinStratvert.name,
        creatorChannel: youtubeChannels.kevinStratvert.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'Practical data analysis workflow showing how ChatGPT can help inspect, reason about, and explain spreadsheets.',
        tags: ['data-analysis', 'excel', 'workflow'],
      },
    ],
  },
  {
    id: 'gemini-mastery',
    title: 'Gemini & Google AI Mastery',
    slug: 'gemini-mastery',
    description:
      "Master Google's full AI stack — Gemini 3.5 Flash, Gemini 3.1 Pro, Antigravity 2.0, NotebookLM, Veo 3.1, and Nano Banana Pro — from your first prompt to production agents.",
    icon: 'sparkles',
    difficulty: 'beginner',
    estimatedHours: 12,
    color: 'sky',
    heroEyebrow: 'Updated May 23, 2026 · Reflects Google I/O 2026',
    longIntro:
      "Google shipped its biggest developer release in years at I/O 2026 (May 19): Antigravity 2.0 as a standalone agentic platform, Gemini 3.5 Flash going GA as the new default, Gemini Omni unifying multimodal generation, and NotebookLM gaining cinematic Video Overviews. This portal pulls the official launches and the sharpest expert walkthroughs into one immersive path — so you can move from your first AI Studio prompt to shipping production agents without sifting the noise.\n\nThink of it as a map: Gemini 3.1 Pro and 3.5 Flash are the brains, Antigravity is where agents live, NotebookLM is the research and briefing surface, and Veo 3.1 + Nano Banana Pro handle the media. Each tool is linked below with its official Google page; each video below is curated for signal, not view count.\n\nStart with Foundations (videos 1–4) for the model layer, then branch into the track that fits — Builder (Antigravity, CLI), Researcher (NotebookLM), or Creator (Veo, Nano Banana). The Ecosystem grid, I/O 2026 timeline, and FAQ give you the lay of the land in one screen.",
    ctaTitle: 'Ready to ship with Gemini?',
    ctaBody:
      'Pair this portal with our hands-on guides and architecture playbooks. Build an agent, ship a multimodal app, or deep-dive how Gemini compares to Claude.',
    outcomes: [
      'Pick the right Gemini model — 3.5 Flash, 3.1 Pro, Deep Think — for each task',
      'Build production agents with Antigravity 2.0 (Desktop, CLI, and SDK)',
      'Turn any source set into briefings, audio, and cinematic video with NotebookLM',
      'Generate 2K/4K images with Nano Banana 2 (Flash) and Nano Banana Pro',
      'Produce film-grade video with Veo 3.1 and Gemini Omni',
      'Ship multimodal apps via Google AI Studio and Vertex AI',
      'Optimize cost vs. quality across the full Google AI stack',
    ],
    relatedGuides: [
      '/partnerships/google',
      '/connect',
      '/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
      '/blog/ai-video-generation-2026-sora-runway-kling-veo',
      '/blog/best-ai-tools-for-creators-2026',
      '/blog/vibe-os-platform-introduction',
      '/learn/claude-mastery',
    ],
    videos: [
      {
        id: 'gemini-3-launch',
        youtubeId: '98DcoXwGX6I',
        title: 'A new era of intelligence with Gemini 3',
        creator: youtubeChannels.googleDeepMind.name,
        creatorChannel: youtubeChannels.googleDeepMind.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          "Google DeepMind's official launch film for Gemini 3 — the foundation behind every model variant in this portal.",
        tags: ['gemini', 'launch', 'foundations'],
      },
      {
        id: 'gemini-omni-intro',
        youtubeId: '5T0yRNmNRi4',
        title: 'Introducing Gemini Omni',
        creator: youtubeChannels.googleDeepMind.name,
        creatorChannel: youtubeChannels.googleDeepMind.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Logan Kilpatrick walks through Gemini Omni — the new "anything from any input" model unveiled at I/O 2026.',
        tags: ['gemini-omni', 'multimodal', 'video'],
      },
      {
        id: 'gemini-3-pros-tutorial',
        youtubeId: 'vEzbJ6gIqeA',
        title: 'How Pros Use Gemini 3.0 with Google DeepMind\'s Logan Kilpatrick',
        creator: youtubeChannels.theNeuron.name,
        creatorChannel: youtubeChannels.theNeuron.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Deep-dive on practical Gemini 3 Pro workflows — vibe coding in AI Studio, agentic patterns, and where 3.1 Pro shines.',
        tags: ['gemini-3-pro', 'workflow', 'ai-studio'],
      },
      {
        id: 'gemini-deep-think',
        youtubeId: 'OTRvoxPSQ_8',
        title: 'Gemini 3.1 Pro, Deep Think, New AlphaFold... Buckle Up!',
        creator: 'AI Explained',
        creatorChannel: youtubeChannels.aiExplained.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Benchmark-driven analysis of Gemini 3.1 Pro\'s Deep Think mode and what HIGH thinking level actually unlocks.',
        tags: ['deep-think', 'reasoning', 'benchmarks'],
      },
      {
        id: 'antigravity-2-walkthrough',
        youtubeId: 'Qmn8qET0o00',
        title: "Google's NEW Antigravity 2.0 Is Here — Full Walkthrough for Beginners",
        creator: 'Indie Builder',
        creatorChannel: 'https://www.youtube.com/results?search_query=Antigravity+2.0+walkthrough',
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'End-to-end walkthrough of Antigravity 2.0: install, set up the agent harness, and ship your first website.',
        tags: ['antigravity', 'agents', 'builder'],
      },
      {
        id: 'antigravity-cli',
        youtubeId: 'am0lg5-ofvQ',
        title: 'Google Antigravity CLI Full Walkthrough',
        creator: 'Indie Builder',
        creatorChannel: 'https://www.youtube.com/results?search_query=Antigravity+CLI+walkthrough',
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          "Terminal-first tour of the Antigravity CLI — the successor to Gemini CLI, sharing the same agent harness as the desktop app.",
        tags: ['antigravity-cli', 'terminal', 'agents'],
      },
      {
        id: 'notebooklm-2026',
        youtubeId: '_uXnyhrqmsU',
        title: 'NotebookLM Changed Completely: Here\'s What Matters (in 2026)',
        creator: youtubeChannels.jeffSu.name,
        creatorChannel: youtubeChannels.jeffSu.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          "Jeff Su's 2026 NotebookLM tour — the new Studio panel, Reports, Interactive Audio Overviews, and Video Overviews.",
        tags: ['notebooklm', 'research', 'workflow'],
      },
      {
        id: 'nano-banana-pro',
        youtubeId: 'JDErfeSMfcM',
        title: '15 Ways to Use Nano Banana Pro: Google\'s Best AI Image Model',
        creator: 'Creator Tutorial',
        creatorChannel: 'https://www.youtube.com/results?search_query=Nano+Banana+Pro+tutorial',
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Fifteen production-grade workflows for Nano Banana Pro (Gemini 3 Pro Image): 2K text rendering, character consistency, and scene composition.',
        tags: ['nano-banana', 'image-gen', 'creator'],
      },
    ],
    ecosystem: [
      {
        name: 'Gemini 3.1 Pro',
        category: 'Reasoning',
        description:
          "Google's flagship reasoning model. Set thinking level HIGH for Deep Think mode on complex code, research, and multi-step planning.",
        href: 'https://deepmind.google/models/gemini/pro/',
        status: 'Updated',
      },
      {
        name: 'Gemini 3.5 Flash',
        category: 'Speed',
        description:
          'GA since I/O 2026. Default model across Antigravity. Outperforms 3.1 Pro on coding and agentic benchmarks at ~4× the speed.',
        href: 'https://deepmind.google/models/gemini/',
        status: 'New',
      },
      {
        name: 'Gemini Omni',
        category: 'Multimodal',
        description:
          'New "anything from any input" model — starts with video. Rolling out to AI Plus, Pro, and Ultra subscribers via the Gemini app and Google Flow.',
        href: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/',
        status: 'New',
      },
      {
        name: 'Antigravity 2.0',
        category: 'Agents',
        description:
          'Standalone agent-first desktop app + CLI + SDK. Replaces Gemini CLI (sunset June 18, 2026). Default model: Gemini 3.5 Flash.',
        href: 'https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/',
        status: 'New',
      },
      {
        name: 'NotebookLM',
        category: 'Research',
        description:
          'Audio Overviews with Interactive Mode (raise hand to interrupt the hosts). Cinematic Video Overviews in 10 visual styles. Multi-output Studio panel.',
        href: 'https://notebooklm.google/',
        status: 'Updated',
      },
      {
        name: 'Veo 3.1 + Veo 3.1 Lite',
        category: 'Video',
        description:
          'Text-to-video up to 60 seconds at 4K with native audio. Lite ships at under 50% the cost of Fast. Available via VideoFX, Vertex AI, and Gemini API.',
        href: 'https://deepmind.google/models/veo/',
        status: 'Updated',
      },
      {
        name: 'Nano Banana Pro / Nano Banana 2',
        category: 'Image',
        description:
          'Pro = Gemini 3 Pro Image (deliberate thinking pass, 2K native, up to 4K). 2 = Gemini 3.1 Flash Image (Flash speed). 5-subject character consistency, image search grounding.',
        href: 'https://deepmind.google/models/gemini-image/pro/',
        status: 'New',
      },
      {
        name: 'Google AI Studio',
        category: 'Builder Surface',
        description:
          'Fastest way to try Gemini and ship apps. New native Android app launched at I/O 2026 alongside the Gemini API "Get code" flow.',
        href: 'https://aistudio.google.com/',
        status: 'Updated',
      },
    ],
    announcements: [
      {
        date: '2026-05-19',
        title: 'Antigravity 2.0 launches as a standalone agentic platform',
        summary:
          'Standalone desktop app, CLI, SDK, Managed Agents in Gemini API, and enterprise support. The Antigravity CLI replaces Gemini CLI.',
        source:
          'https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/',
        tag: 'Launch',
      },
      {
        date: '2026-05-19',
        title: 'Gemini 3.5 Flash hits General Availability',
        summary:
          'Default model across Antigravity. Outperforms Gemini 3.1 Pro on coding and agentic benchmarks while running about 4× faster.',
        source:
          'https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/',
        tag: 'Launch',
      },
      {
        date: '2026-05-19',
        title: 'Gemini Omni & Gemini Omni Flash launch',
        summary:
          'New "anything from any input" model starting with video. Rolling out to AI Plus, Pro, and Ultra subscribers via the Gemini app and Google Flow.',
        source:
          'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/',
        tag: 'Launch',
      },
      {
        date: '2026-05-19',
        title: 'Gemini for Science and new Science Skills in Antigravity',
        summary:
          'Co-Scientist, AlphaEvolve, Empirical Research Assistance, and NotebookLM are now bundled for researchers. Register at labs.google/science.',
        source:
          'https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/',
        tag: 'Research',
      },
      {
        date: '2026-06-01',
        title: 'Gemini 3.5 Pro arrives next month (preview)',
        summary:
          "Sundar Pichai's I/O keynote confirmed Gemini 3.5 Pro is being used internally and will roll out publicly in June 2026.",
        source: 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/',
        tag: 'Update',
      },
      {
        date: '2026-06-18',
        title: 'Gemini CLI sunset — migrate to Antigravity CLI',
        summary:
          'Gemini CLI and Gemini Code Assist IDE extensions stop serving requests for AI Pro, Ultra, and Code Assist for individuals. Antigravity CLI is the successor.',
        source:
          'https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/',
        tag: 'Deprecation',
      },
    ],
    experts: [
      {
        name: 'Google DeepMind',
        role: 'Official channel — model launches and research',
        channelUrl: youtubeChannels.googleDeepMind.url,
        why: 'First-party launch films and research deep-dives. Highest signal source for model behavior.',
        isOfficial: true,
      },
      {
        name: 'Google for Developers',
        role: 'Official channel — Gemini API, AI Studio, Antigravity',
        channelUrl: youtubeChannels.googleDevelopers.url,
        why: 'Developer keynotes, API walkthroughs, and Antigravity tutorials direct from the product teams.',
        isOfficial: true,
      },
      {
        name: 'Logan Kilpatrick',
        role: 'Google DeepMind — leads Gemini API & AI Studio',
        channelUrl: 'https://x.com/OfficialLoganK',
        why: 'Best signal on roadmap timing and developer experience. Hosts the Gemini Omni launch video in this portal.',
      },
      {
        name: 'Jeff Su',
        role: 'Productivity creator',
        channelUrl: youtubeChannels.jeffSu.url,
        why: 'Sharpest NotebookLM workflow content in 2026 — covers Studio, Reports, and Video Overviews better than anyone.',
      },
      {
        name: 'Matt Wolfe (Future Tools)',
        role: 'AI tool review',
        channelUrl: youtubeChannels.mattWolfe.url,
        why: 'Holistic AI tool reviews that span the full Google stack — useful for spotting workflows you missed.',
      },
      {
        name: 'AI Explained',
        role: 'Independent analysis',
        channelUrl: youtubeChannels.aiExplained.url,
        why: 'Benchmark-driven comparisons of Gemini vs. frontier models. Trust this for honest capability calibration.',
      },
    ],
    faqs: [
      {
        question: 'What is the latest Gemini model in May 2026?',
        answer:
          'Gemini 3.5 Flash is GA since Google I/O 2026 (May 19) and is now the default across Antigravity. Gemini 3.1 Pro remains the flagship for reasoning, and Gemini 3.5 Pro is rolling out publicly in June 2026.',
      },
      {
        question: 'Is Gemini CLI still supported?',
        answer:
          'No — Gemini CLI and Gemini Code Assist IDE extensions stop serving requests on June 18, 2026 for AI Pro, Ultra, and Code Assist for individuals. The successor is the Antigravity CLI, which shares the same agent harness as the Antigravity 2.0 desktop app.',
      },
      {
        question: 'What is Antigravity 2.0?',
        answer:
          "Google's standalone agent-first development platform, announced May 19, 2026. Three surfaces: a desktop app, a CLI, and an SDK. The default model is Gemini 3.5 Flash, and the same agent harness runs across all three so improvements ship everywhere at once.",
      },
      {
        question: 'What is Nano Banana 2 vs Nano Banana Pro?',
        answer:
          'Nano Banana 2 is the Gemini 3.1 Flash Image model — fast, sub-second generations. Nano Banana Pro is the Gemini 3 Pro Image model — a deliberate "thinking" pass that produces the highest quality output (2K native, up to 4K, character consistency for up to 5 subjects, image search grounding).',
      },
      {
        question: 'How do I use Deep Think mode in Gemini 3.1 Pro?',
        answer:
          'Set the thinking_level parameter to HIGH in the Gemini API (or pick "Deep Think" in the Gemini app). Deep Think is a reasoning mode within 3.1 Pro, not a separate model — use it for research-grade problems where accuracy trumps latency.',
      },
      {
        question: "What can NotebookLM do that ChatGPT can't?",
        answer:
          'NotebookLM grounds every answer in the sources you uploaded — no hallucinated citations. The 2026 release adds Interactive Audio Overviews (raise your hand to interrupt the AI hosts), cinematic Video Overviews in 10 visual styles, and a Studio panel that stores multiple outputs of the same type per notebook.',
      },
      {
        question: "What's the difference between Veo 3.1 and Gemini Omni?",
        answer:
          'Veo 3.1 is the dedicated text-to-video model — up to 60 seconds at 4K with native audio. Gemini Omni is the broader "anything from any input" successor that handles video alongside multimodal editing across formats. For pure video generation, Veo 3.1 (and the cheaper Veo 3.1 Lite) are still the sharpest tools.',
      },
      {
        question: 'Which Gemini model should I use for coding agents?',
        answer:
          'Default to Gemini 3.5 Flash (the new Antigravity default) for speed and cost. Switch to Gemini 3.1 Pro with thinking level HIGH when you need architectural reasoning over large codebases or multi-step plans that benefit from Deep Think.',
      },
      {
        question: 'How does Gemini compare to Claude for development?',
        answer:
          'Gemini wins on multimodal, 1M+ token context, and native agent infrastructure (Antigravity). Claude leads on long-form refactoring and writing. See our [Frontier Model Landscape 2026](/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek) for the head-to-head with code samples.',
      },
      {
        question: "Where do I start if I'm new to Google AI?",
        answer:
          'Watch video 1 (Gemini 3 launch) and video 5 (Antigravity 2.0 walkthrough) in this portal. Then create a free key at aistudio.google.com, try a multimodal prompt, and follow the Builder track from there.',
      },
    ],
  },
  // Additional learning paths coming soon:
  // - Suno AI Music Production
  // - ChatGPT for Productivity
  // - Midjourney Visual Art
]

export const featuredCreators = [
  {
    name: youtubeChannels.anthropic.name,
    channel: youtubeChannels.anthropic.url,
    specialty: 'Claude tutorials',
    subscribers: 'Public channel',
  },
  {
    name: youtubeChannels.netNinja.name,
    channel: youtubeChannels.netNinja.url,
    specialty: 'Developer tutorials',
    subscribers: 'Public channel',
  },
  {
    name: youtubeChannels.kevinStratvert.name,
    channel: youtubeChannels.kevinStratvert.url,
    specialty: 'AI productivity tutorials',
    subscribers: 'Public channel',
  },
  {
    name: youtubeChannels.lexFridman.name,
    channel: youtubeChannels.lexFridman.url,
    specialty: 'AI long-form interviews',
    subscribers: 'Public channel',
  },
]
