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
  // ── Video-intelligence enrichment (optional; renders only when present) ──
  // The unique, indexable text that turns an embed list into a citable
  // resource. Populated by scripts/learn/enrich-videos.mjs (transcript →
  // drafted takeaways) then edited into Frank's voice.
  /** 3-5 transcript-grounded key points a viewer takes away. */
  keyTakeaways?: string[]
  /** Frank's AI-Architect commentary — the differentiator no one can copy. */
  architectNote?: string
  /** Public transcript URL, when available, for VideoObject.transcript schema. */
  transcriptUrl?: string
}

export interface EcosystemTool {
  name: string
  category: string
  description: string
  href: string
  status?: 'GA' | 'Preview' | 'New' | 'Updated'
  /** ISO date of last manual link verification. Surfaced as "Last verified" in the UI and checked by scripts/check-learning-paths.mjs. */
  lastVerified?: string
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

/**
 * High-level portal grouping for the /learn listing page. Required so the
 * 9-portal grid groups cleanly by audience intent and the ItemList JSON-LD
 * carries a nested CollectionPage structure.
 *   - model-maker: portals about a specific frontier-lab model family (Claude, Gemini, ChatGPT)
 *   - cloud:       portals about a managed-AI cloud surface (Bedrock, Azure AI Foundry, OCI GenAI)
 *   - consumer:    portals about a consumer/creative product (Suno, Midjourney, NotebookLM)
 */
export type LearningPathCategory = 'model-maker' | 'cloud' | 'consumer'

export interface LearningPath {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  color: 'emerald' | 'cyan' | 'amber' | 'violet' | 'sky'
  category: LearningPathCategory
  videos: VideoResource[]
  relatedGuides: string[]
  outcomes: string[]
  // Optional richer portal sections — render conditionally when populated.
  heroEyebrow?: string
  longIntro?: string
  /**
   * The AI Architect's Distillation — an original, long-form synthesis of what
   * this portal's videos teach, in Frank's voice. The unique, citable content
   * that makes the portal rank and become the paid-curriculum backbone.
   * Markdown paragraphs separated by \n\n.
   */
  distillation?: string
  ctaTitle?: string
  ctaBody?: string
  ecosystem?: EcosystemTool[]
  announcements?: PortalAnnouncement[]
  experts?: ExpertCreator[]
  faqs?: PortalFAQ[]
  /** Default true. Set false to suppress FAQ JSON-LD emission for this portal (escape hatch if Search Console flags duplicate-FAQ issues). */
  emitFaqSchema?: boolean
}

export const learningPaths: LearningPath[] = [
  {
    id: 'claude-mastery',
    title: 'Claude & Anthropic Mastery',
    slug: 'claude-mastery',
    description:
      "Master Anthropic's full Claude stack — Opus 4.8, Sonnet 4.6, Haiku 4.5, Claude Code, the Agent SDK, MCP, Computer Use, and Skills — from first prompt to production agents.",
    icon: 'brain',
    difficulty: 'beginner',
    estimatedHours: 10,
    color: 'amber',
    category: 'model-maker',
    heroEyebrow: 'Updated June 10, 2026 · Reflects Claude 4.X family + MCP general availability',
    longIntro:
      "Anthropic ships fast: Opus 4.8 leads the family for the hardest reasoning, Sonnet 4.6 is the everyday default, and Haiku 4.5 is the cheap-and-fast tier — all sharing the same agent harness, tool-use surface, and Claude Code IDE. This portal pulls Anthropic's official walkthroughs and the sharpest independent walkthroughs into one path so you can move from your first claude.ai conversation to shipping agents on Bedrock or Vertex without sifting noise.\n\nThink of it as a map: the model line (Opus / Sonnet / Haiku) is the brain, the Claude API is the surface, Claude Code is the IDE companion, the Agent SDK is for building autonomous loops, and MCP is the connector protocol that lets all of them reach your data and tools. Computer Use and Skills are the newer abilities on top.\n\nStart with Foundations (videos 1–3) for the prompt and model layer, then branch into the track that fits — Builder (Claude Code, Agent SDK, MCP), Architect (Bedrock / Vertex / production patterns), or Operator (Skills, Computer Use, daily workflows). The Ecosystem grid, announcements timeline, and FAQ give you the lay of the land in one screen.",
    distillation:
      "Here is the honest shape of learning Claude in 2026, from someone who has watched enterprise AI up close: the model is no longer the hard part. Opus, Sonnet, and Haiku are all good enough that your results are decided by everything around the model — how you frame the work, what context you give it, and how much of the loop you let it run. The videos in this portal are worth your time in that order: get the prompt-and-context fundamentals first, then the harness, then the production surface. Skip that order and you will build a fast agent that ships the wrong thing.\n\nThe single mental model that pays off: Claude is a reasoning engine, and the ecosystem is how you feed and fence it. Prompting is how you frame the task. The Claude API is the raw surface. Claude Code is that same engine wired into your repo with an approval model. The Agent SDK is Claude Code's primitives exposed so you can build your own loops. MCP is the wire that lets any of them reach your data and tools. Skills are reusable capabilities you compose on top. Once you see it as one engine with concentric layers — not seven separate products — the learning order picks itself.\n\nThe most useful shift in the last year is captured by the 'don't build agents, build skills' idea: the payoff is not in a bigger autonomous loop, it is in small, sharp, reusable units of capability that a human still directs. That is the difference between a demo and a system you trust in production. When you watch the Claude Code and Agent SDK material, watch for where the human stays in the loop — the approval gates, the CLAUDE.md instructions, the verification step — because that is what separates people who ship with Claude from people who post screenshots of it.\n\nWhere I would spend your first week: run Claude Code on one real, small task in a repo you care about, add a CLAUDE.md, and force yourself to review every change. Then write one MCP server against a data source you actually use. Everything else in this portal — Computer Use, Bedrock/Vertex deployment, the model-selection tradeoffs — is a branch you take once that spine is solid. The goal is not to know Claude; it is to reliably direct it to a working, defensible result. That skill compounds.",
    ctaTitle: 'Ready to ship with Claude?',
    ctaBody:
      'Pair this portal with our written walkthrough and architecture playbooks. Build an agent, ship an MCP-backed app, or compare Claude head-to-head against Gemini.',
    outcomes: [
      'Pick the right Claude model — Opus 4.8, Sonnet 4.6, Haiku 4.5 — for each task and budget',
      'Engineer prompts that survive contact with real-world inputs',
      'Build agents with the Claude Agent SDK + MCP for tool and data access',
      'Use Claude Code in the terminal, IDE, and on the web for end-to-end coding workflows',
      'Ship Claude on Amazon Bedrock or Google Vertex AI with the right IAM/VPC posture',
      'Apply Computer Use and Skills to automate desktop and repeated-task workflows',
      'Cut token spend with prompt caching, batches, and the Files API',
    ],
    relatedGuides: [
      '/guides/claude-anthropic-guide',
      '/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
      '/learn/gemini-mastery',
      '/learn/codex-mastery',
      '/learn/chatgpt-mastery',
    ],
    videos: [
      {
        id: 'claude-prompts',
        youtubeId: 'T9aRN5JkmL8',
        title: 'AI prompt engineering: A deep dive',
        creator: youtubeChannels.anthropic.name,
        creatorChannel: youtubeChannels.anthropic.url,
        duration: 'See YouTube',
        level: 'beginner',
        description: "Anthropic's own deep dive on what makes a Claude prompt work — the single highest-leverage starting point.",
        tags: ['prompts', 'claude', 'foundations'],
      },
      {
        id: 'claude-code-mastering',
        youtubeId: '6eBSHbLKuN0',
        title: 'Mastering Claude Code in 30 minutes',
        creator: youtubeChannels.anthropic.name,
        creatorChannel: youtubeChannels.anthropic.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: 'Official walkthrough of the Claude Code workflow — plan, edit, run, test — straight from the team that built it.',
        tags: ['claude-code', 'workflow', 'builder'],
      },
      {
        id: 'claude-code-intro',
        youtubeId: 'SUysp3sJHbA',
        title: 'Claude Code Tutorial #1 — Introduction & Setup',
        creator: youtubeChannels.netNinja.name,
        creatorChannel: youtubeChannels.netNinja.url,
        duration: 'See YouTube',
        level: 'beginner',
        description: "Net Ninja's clean, no-noise setup walkthrough — install, authenticate, and run your first Claude Code session.",
        tags: ['claude-code', 'setup', 'beginner'],
      },
      {
        id: 'claude-code-conversation',
        youtubeId: 'Yf_1w00qIKc',
        title: 'A Conversation on Claude Code',
        creator: youtubeChannels.anthropic.name,
        creatorChannel: youtubeChannels.anthropic.url,
        duration: 'See YouTube',
        level: 'beginner',
        description: "Boris Cherny and Alex Albert talk about the inception of Claude Code as an internal utility and share power-user developer workflow strategies.",
        tags: ['claude-code', 'discussion', 'beginner'],
      },
      {
        id: 'claude-agent-sdk',
        youtubeId: 'S08x1x2kC1w',
        title: 'Claude Agent SDK [Full Workshop]',
        creator: youtubeChannels.aiEngineer.name,
        creatorChannel: youtubeChannels.aiEngineer.url,
        duration: 'See YouTube',
        level: 'advanced',
        description: "Thariq Shihipar from Anthropic hosts a deep-dive technical workshop on the Agent SDK architecture, Unix-like agent loops, and context engineering.",
        tags: ['agent-sdk', 'agents', 'advanced'],
      },
      {
        id: 'mcp-building-agents',
        youtubeId: 'W0S83pS_Z3A',
        title: 'Building Agents with Model Context Protocol [Full Workshop]',
        creator: youtubeChannels.aiEngineer.name,
        creatorChannel: youtubeChannels.aiEngineer.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: "Anthropic's Mahesh Murag leads a complete workshop on the open MCP standard, showing how to connect Claude to filesystems, databases, and third-party APIs.",
        tags: ['mcp', 'context', 'api'],
      },
      {
        id: 'build-skills-not-agents',
        youtubeId: 'nO3S8L_oK84',
        title: "Don't Build Agents, Build Skills Instead",
        creator: youtubeChannels.aiEngineer.name,
        creatorChannel: youtubeChannels.aiEngineer.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: "Barry Zhang and Mahesh Murag lay out Anthropic's paradigm shift: packaging agent operations into reusable, composable Skills rather than custom models.",
        tags: ['skills', 'architecture', 'strategy'],
      },
      {
        id: 'claude-code-future-engineering',
        youtubeId: 'kYv9x4p15OQ',
        title: 'Claude Code & the Future of Software Engineering',
        creator: youtubeChannels.acquired.name,
        creatorChannel: youtubeChannels.acquired.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: "Claude Code creator Boris Cherny sits down at Acquired Unplugged to discuss the IDE-free developer experience, agent loop metrics, and how AI coding changes the role of the engineer.",
        tags: ['claude-code', 'discussion', 'future'],
      },
      {
        id: 'seq-coding-solved',
        youtubeId: 'sD48wJ-J-XQ',
        title: 'Why Coding Is Solved, and What Comes Next',
        creator: youtubeChannels.sequoia.name,
        creatorChannel: youtubeChannels.sequoia.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: "Sequoia Capital hosts Boris Cherny for a fireside chat on the trajectory of developer productivity and the next frontiers of autonomous code maintenance.",
        tags: ['discussion', 'future', 'developer'],
      },
      {
        id: 'figma-mcp-workflows',
        youtubeId: 'wX-y_c9D6qQ',
        title: 'Figma x Claude Code Live: Roundtrip Workflows with Figma MCP',
        creator: youtubeChannels.figma.name,
        creatorChannel: youtubeChannels.figma.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: "A live demonstration showing how Claude Code interacts with Figma designs via MCP to generate and synchronize frontend components.",
        tags: ['figma', 'mcp', 'design-to-code'],
      },
      {
        id: 'inside-building-claude',
        youtubeId: 'Oy7tzmfbl64',
        title: 'Inside How Anthropic Is Building the Next Claude',
        creator: youtubeChannels.peterYang.name,
        creatorChannel: youtubeChannels.peterYang.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: "Anthropic research PM Alex Albert discusses the model-building pipeline, background memory consolidation ('dreaming'), and training model personalities.",
        tags: ['research', 'product', 'inside'],
      },
      {
        id: 'anthropic-html-ai-specs',
        youtubeId: 'kYJjX79P908',
        title: 'Why this Claude Code Engineer Uses HTML Files as AI Specs',
        creator: youtubeChannels.aiEngineer.name,
        creatorChannel: youtubeChannels.aiEngineer.url,
        duration: 'See YouTube',
        level: 'advanced',
        description: "Thariq Shihipar demonstrates how HTML specs and throwaway user interfaces accelerate the agentic planning and implementation loop.",
        tags: ['specs', 'workflow', 'advanced'],
      },
    ],
    ecosystem: [
      {
        name: 'Claude (Web + Apps)',
        category: 'Surface',
        description:
          'The flagship consumer surface at claude.ai — chat, Projects, Artifacts, file uploads, and the launchpad for trying every model variant.',
        href: 'https://claude.ai/',
        status: 'Updated',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Claude API',
        category: 'API',
        description:
          'The developer entry point (formerly the Anthropic API). Streaming, tool use, prompt caching, batches, Files API, vision, and PDF support.',
        href: 'https://docs.claude.com/en/api/overview',
        status: 'Updated',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Claude Code',
        category: 'Builder Surface',
        description:
          'The terminal-first coding companion. Now available as a CLI, in VS Code / JetBrains, on the web at claude.ai/code, and on mobile via the Claude apps.',
        href: 'https://docs.claude.com/en/docs/claude-code/overview',
        status: 'Updated',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Claude Agent SDK',
        category: 'Agents',
        description:
          'Build autonomous agent loops with the same primitives Claude Code uses — sub-agents, hooks, settings, slash commands, MCP servers.',
        href: 'https://docs.claude.com/en/api/agent-sdk',
        status: 'New',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Model Context Protocol (MCP)',
        category: 'Protocol',
        description:
          'Anthropic-led open protocol for connecting Claude to data sources and tools. Reference servers + a fast-growing ecosystem across vendors.',
        href: 'https://modelcontextprotocol.io/',
        status: 'GA',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Computer Use',
        category: 'Capability',
        description:
          "Lets Claude see a screen and operate a mouse and keyboard. Good for desktop automation, QA, and form-filling where there's no API.",
        href: 'https://docs.claude.com/en/docs/build-with-claude/computer-use',
        status: 'Updated',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Skills',
        category: 'Capability',
        description:
          'Reusable Claude capabilities (e.g. visual-creation, deep-research, security-review) authored as folders of instructions + scripts. Compose into agent workflows.',
        href: 'https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview',
        status: 'New',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Claude on Amazon Bedrock',
        category: 'Cloud',
        description:
          'Claude as a fully-managed model in AWS Bedrock — IAM, VPC, CloudWatch, Knowledge Bases, and Bedrock Agents come for free if you already live in AWS.',
        href: 'https://docs.claude.com/en/api/claude-on-amazon-bedrock',
        status: 'GA',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Claude on Vertex AI',
        category: 'Cloud',
        description:
          'Claude as a Vertex AI model — pair with BigQuery, GKE, and Google Cloud security boundaries. Useful when the rest of the stack is Google-native.',
        href: 'https://docs.claude.com/en/api/claude-on-vertex-ai',
        status: 'GA',
        lastVerified: '2026-07-07',
      },
    ],
    announcements: [
      {
        date: '2026-05-14',
        title: 'Claude Opus 4.8 launches',
        summary:
          "The new family lead — Anthropic's strongest reasoning and code-editing model. Improves long-horizon agent runs, refactor accuracy, and structured-output reliability.",
        source: 'https://www.anthropic.com/news/claude-opus-4-8',
        tag: 'Launch',
      },
      {
        date: '2026-04-22',
        title: 'Claude Sonnet 4.6 becomes the everyday default',
        summary:
          'Sonnet 4.6 ships with sharper tool-use, better instruction-following, and lower latency than Sonnet 4.5. Selected as the default across Claude.ai, Claude Code, and most API integrations.',
        source: 'https://www.anthropic.com/news/claude-sonnet-4-6',
        tag: 'Update',
      },
      {
        date: '2026-03-18',
        title: 'Claude Haiku 4.5 — cheap-and-fast tier',
        summary:
          'Haiku 4.5 hits sub-second first-token latency at a fraction of Sonnet pricing while keeping vision, tool use, and prompt caching. The right pick for high-volume agent loops.',
        source: 'https://www.anthropic.com/news/claude-haiku-4-5',
        tag: 'Update',
      },
      {
        date: '2026-05-06',
        title: 'Claude Code on the web (general availability)',
        summary:
          'Claude Code is now available at claude.ai/code — a managed cloud workspace that mirrors the CLI experience, with GitHub OAuth, hooks, MCP servers, and a long-context container per session.',
        source: 'https://www.anthropic.com/news/claude-code-web',
        tag: 'Launch',
      },
      {
        date: '2026-02-19',
        title: 'MCP reaches general availability',
        summary:
          'Model Context Protocol exits preview. Stable spec, vendor adoption from OpenAI, Google, Microsoft, and JetBrains, and an expanded reference server set covering filesystems, browsers, and dev tools.',
        source: 'https://modelcontextprotocol.io/specification/2025-06-18',
        tag: 'Research',
      },
      {
        date: '2026-01-29',
        title: 'Skills launch as a reusable capability format',
        summary:
          'Skills package instructions + scripts a Claude can load on demand. Ship one as a folder, distribute via the Skills marketplace, or compose them into Agent SDK workflows.',
        source: 'https://www.anthropic.com/news/skills',
        tag: 'Launch',
      },
    ],
    experts: [
      {
        name: 'Anthropic',
        role: 'Official channel — model launches, prompt engineering, Claude Code',
        channelUrl: youtubeChannels.anthropic.url,
        why: "First-party walkthroughs for every release. Highest signal source for what Claude can actually do and how to ask for it.",
        isOfficial: true,
      },
      {
        name: 'Net Ninja',
        role: 'Developer educator — Claude Code series',
        channelUrl: youtubeChannels.netNinja.url,
        why: 'Clean, paced tutorial series on Claude Code setup and workflow. Best entry point for developers new to terminal-first AI tooling.',
      },
      {
        name: 'AI Explained',
        role: 'Independent analysis — model behaviour, benchmarks',
        channelUrl: youtubeChannels.aiExplained.url,
        why: 'Benchmark-driven, low-hype comparisons of Claude vs frontier models. Trust this for honest capability calibration.',
      },
      {
        name: 'Matt Wolfe (Future Tools)',
        role: 'AI tools review — Claude in the broader workflow',
        channelUrl: youtubeChannels.mattWolfe.url,
        why: "Holistic reviews that put Claude in context with the rest of the AI stack — useful for spotting workflows you'd miss in isolation.",
      },
      {
        name: 'Lex Fridman',
        role: 'Long-form interviews — Dario Amodei, research conversations',
        channelUrl: youtubeChannels.lexFridman.url,
        why: 'For the strategic/research view: full conversations with Anthropic leadership on what Claude is for and where the field is heading.',
      },
      {
        name: 'The Neuron',
        role: 'Daily AI newsletter + companion video coverage',
        channelUrl: youtubeChannels.theNeuron.url,
        why: 'Fast daily signal on Claude releases, comparisons, and emerging workflows — good for staying current between official launches.',
      },
    ],
    faqs: [
      {
        question: 'What is the latest Claude model in June 2026?',
        answer:
          'Claude Opus 4.8 is the current family lead (launched May 14, 2026). Claude Sonnet 4.6 is the everyday default across Claude.ai and Claude Code. Claude Haiku 4.5 covers the cheap-and-fast tier for high-volume agent loops.',
      },
      {
        question: 'Which Claude model should I use for coding?',
        answer:
          'Default to Sonnet 4.6 — it ships as the default in Claude Code for a reason. Reach for Opus 4.8 on hard architectural refactors, multi-step plans, or anywhere the cost of being wrong is high. Use Haiku 4.5 for fast inner-loop tasks where latency matters more than the last 5% of quality.',
      },
      {
        question: 'What is the difference between the Anthropic API and the Claude API?',
        answer:
          "They're the same thing — the rename to 'Claude API' shipped with the broader Claude branding cleanup. The base URL and endpoints are unchanged; the [official reference](https://docs.claude.com/en/api/overview) still uses the same models, headers, and SDK packages.",
      },
      {
        question: 'What is the Claude Agent SDK?',
        answer:
          'The same primitives that power Claude Code, exposed as an SDK so you can build your own agents — sub-agents, hooks, slash commands, settings, and MCP servers. Use it when you want autonomous loops or domain-specific workflows that live outside the Claude Code CLI.',
      },
      {
        question: 'What is MCP and why does it matter?',
        answer:
          "Model Context Protocol is an open spec for connecting AI models to data sources and tools. Anthropic seeded it; OpenAI, Google, Microsoft, and JetBrains adopted it. Practically: write one MCP server and any compliant model — Claude, GPT, Gemini — can reach your data through it. Reached [general availability](https://modelcontextprotocol.io/) in February 2026.",
      },
      {
        question: 'Should I run Claude through Bedrock or the direct API?',
        answer:
          "If you already live in AWS (IAM, VPC, CloudWatch, Knowledge Bases), Bedrock saves you a model proxy and gives you procurement / SOC 2 alignment for free. If you don't, the direct API is simpler and gets new models first. Watch the cross-region inference billing if you go Bedrock — it has surprised more than one team.",
      },
      {
        question: 'What is Computer Use and when should I use it?',
        answer:
          "Computer Use lets Claude see a screen and drive a mouse + keyboard. It's the right tool when there's no API — desktop QA, legacy app automation, form-filling, browser flows that defeat headless scrapers. It's slower and more expensive than a direct API call, so use it as the last mile, not the first one.",
      },
      {
        question: "What's a Claude Skill?",
        answer:
          'A Skill is a folder of instructions + optional scripts that Claude can load on demand to do something specific — write a book chapter, run a security review, generate visuals. Ship one as a Git repo, distribute via the Skills marketplace, or compose them inside an Agent SDK workflow.',
      },
      {
        question: 'How does Claude compare to Gemini for development?',
        answer:
          'Claude leads on long-form code refactoring, structured-output reliability, and writing. Gemini wins on multimodal, 1M+ context, and native agent infra (Antigravity). For a side-by-side breakdown with code samples, see [Frontier Model Landscape 2026](/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek) and the [Gemini & Google AI Mastery portal](/learn/gemini-mastery).',
      },
      {
        question: "Where do I start if I'm new to Claude?",
        answer:
          'Watch video 1 (prompt engineering deep dive) and video 2 (Mastering Claude Code in 30 minutes). Then create a free claude.ai account, try a Project on a real task you care about, and graduate to Claude Code when you want it in your IDE or terminal.',
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
    estimatedHours: 9,
    color: 'emerald',
    category: 'model-maker',
    heroEyebrow: 'Updated July 5, 2026 · Runs GPT-5.5 · CLI + Cloud + AGENTS.md',
    longIntro:
      "Codex is OpenAI's coding agent, and in 2026 it's a multi-surface one: a terminal CLI, a cloud task runner, and IDE extensions that all share the same brain. Since OpenAI retired the o-series and folded reasoning into a single line, that brain is GPT-5.5 — the recommended default in Codex, which uses roughly 40% fewer output tokens on coding tasks than GPT-5.4 at a ~258K effective context window.\n\nThe pieces fit together cleanly. The CLI (open source, built in Rust) reads your codebase and runs commands in an OS-level sandbox with an approval model you control via config.toml. Codex Cloud lets you hand a task to a remote environment and apply the resulting diff without leaving the terminal. AGENTS.md is the durable memory — a plain-Markdown file of repo instructions Codex injects into context, and the same file works in Cursor, Amp, and other agents. MCP servers extend what Codex can reach.\n\nStart with the official CLI overview and the AGENTS.md guide (videos 1 and 3), install the CLI, and add an AGENTS.md to a real repo. Then work up to the long-form agentic-development course. Every tool below links to its official OpenAI page.",
    ctaTitle: 'Ready to ship with Codex?',
    ctaBody:
      'Pair this portal with our hands-on guides — set up AGENTS.md, wire Codex into a real repo, and compare it head-to-head with Claude Code.',
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
      '/learn/claude-mastery',
      '/learn/chatgpt-mastery',
      '/learn/gemini-mastery',
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
        id: 'codex-intro-setup',
        youtubeId: 'tIb_TzVNbDM',
        title: 'OpenAI Codex Tutorial #1 - Introduction & Setup',
        creator: 'Codex Tutorial',
        creatorChannel: 'https://www.youtube.com/results?search_query=OpenAI+Codex+Tutorial+Introduction+Setup',
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Step-by-step setup path for getting Codex ready and understanding the core developer workflow.',
        tags: ['setup', 'tutorial', 'beginner'],
      },
      {
        id: 'codex-agents-md',
        youtubeId: 'NlNuoH5PPl4',
        title: 'OpenAI Codex Tutorial #6 - Using the AGENTS.md file',
        creator: 'Codex Tutorial',
        creatorChannel: 'https://www.youtube.com/results?search_query=OpenAI+Codex+Tutorial+AGENTS.md',
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Practical walkthrough for using AGENTS.md to give Codex durable repo guidance and stronger task context.',
        tags: ['agents-md', 'workflow', 'repo'],
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
    ecosystem: [
      {
        name: 'Codex CLI',
        category: 'Builder Surface',
        description:
          'Open-source coding agent, built in Rust, that runs in your terminal. Reads your codebase, runs commands in an OS-level sandbox, and patches files with an approval model you control.',
        href: 'https://developers.openai.com/codex/cli',
        status: 'GA',
        lastVerified: '2026-07-05',
      },
      {
        name: 'Codex Cloud',
        category: 'Agents',
        description:
          'Delegate a task to a remote environment and apply the resulting diff without leaving the terminal. Good for long-running refactors and running work in parallel.',
        href: 'https://openai.com/codex/',
        status: 'Updated',
        lastVerified: '2026-07-05',
      },
      {
        name: 'AGENTS.md',
        category: 'Protocol',
        description:
          'A plain-Markdown file of durable, repo-level instructions. Codex enumerates AGENTS.md files and injects them into context — and the same file works in Cursor, Amp, and other agents.',
        href: 'https://developers.openai.com/codex/guides/agents-md',
        status: 'GA',
        lastVerified: '2026-07-05',
      },
      {
        name: 'GPT-5.5 in Codex',
        category: 'Reasoning',
        description:
          "OpenAI's flagship agentic model (id gpt-5.5) is the recommended Codex default — about 40% fewer output tokens than GPT-5.4 on coding tasks, at a ~258K effective context window.",
        href: 'https://platform.openai.com/docs/models',
        status: 'New',
        lastVerified: '2026-07-05',
      },
      {
        name: 'MCP in Codex',
        category: 'Protocol',
        description:
          'Codex reaches external tools and data through Model Context Protocol servers — the cross-vendor standard also used by Claude and Gemini. Write one server, use it everywhere.',
        href: 'https://modelcontextprotocol.io/',
        status: 'GA',
        lastVerified: '2026-07-05',
      },
      {
        name: 'Codex Changelog',
        category: 'Reference',
        description:
          'The official running log of Codex releases — CLI versions, model updates, sandbox and config.toml changes. The fastest way to see what shipped this week.',
        href: 'https://developers.openai.com/codex/changelog',
        status: 'Updated',
        lastVerified: '2026-07-05',
      },
      {
        name: 'OpenAI Platform',
        category: 'API',
        description:
          'The developer surface behind Codex — models, pricing, the API, and usage dashboards. Where you manage keys and see what a Codex run actually costs.',
        href: 'https://platform.openai.com/',
        status: 'Updated',
        lastVerified: '2026-07-05',
      },
      {
        name: 'Codex on Azure (Microsoft Foundry)',
        category: 'Cloud',
        description:
          'Run Codex against OpenAI models hosted in Microsoft Foundry — useful when procurement, data residency, or an existing Azure footprint rules out the direct API.',
        href: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/codex',
        status: 'GA',
        lastVerified: '2026-07-05',
      },
    ],
    announcements: [
      {
        date: '2026-04-23',
        title: 'GPT-5.5 becomes the recommended model in Codex',
        summary:
          "OpenAI's new flagship (codename 'Spud', id gpt-5.5) lands as the default Codex model — roughly 40% fewer output tokens than GPT-5.4 on coding tasks, at a ~258K effective context window.",
        source: 'https://platform.openai.com/docs/models',
        tag: 'Launch',
      },
      {
        date: '2026-04-23',
        title: 'AGENTS.md as the cross-tool instruction standard',
        summary:
          'Codex enumerates AGENTS.md files and injects them into the conversation, and the model is trained to follow them closely. The same format now works across Cursor, Amp, and other agents.',
        source: 'https://developers.openai.com/codex/guides/agents-md',
        tag: 'Update',
      },
      {
        date: '2026-05-07',
        title: 'gpt-realtime-2 voice models ship',
        summary:
          'The realtime line gains GPT-5-class reasoning and a 128K context window (up from 32K) with parallel tool calls — relevant if you drive Codex or agents through a voice surface.',
        source: 'https://platform.openai.com/docs/models',
        tag: 'Update',
      },
      {
        date: '2026-02-19',
        title: 'MCP reaches general availability',
        summary:
          'Model Context Protocol exits preview with a stable spec and cross-vendor adoption. Codex, Claude, and Gemini can all reach your data through the same MCP servers.',
        source: 'https://modelcontextprotocol.io/',
        tag: 'Research',
      },
      {
        date: '2025-12-11',
        title: 'GPT-5.2 ships with a 400K context class',
        summary:
          'GPT-5.2 landed as the prior work model — 400K context (272K input + 128K output), text and image, no native audio. GPT-5.5 later replaced it as the Codex default.',
        source: 'https://platform.openai.com/docs/models',
        tag: 'Update',
      },
      {
        date: '2025-08-05',
        title: 'gpt-oss — OpenAI’s first open-weight models since GPT-2',
        summary:
          'gpt-oss-120b and gpt-oss-20b released under Apache 2.0 with a 128K context window. Useful when you need a self-hostable model alongside Codex for private or offline work.',
        source: 'https://openai.com/index/introducing-gpt-oss/',
        tag: 'Launch',
      },
    ],
    experts: [
      {
        name: 'OpenAI',
        role: 'Official channel — Codex and model launches',
        channelUrl: youtubeChannels.openai.url,
        why: 'First-party launch videos and demos for Codex and the GPT-5.x line. Highest-signal source for what actually shipped.',
        isOfficial: true,
      },
      {
        name: 'OpenAI Developers (Codex docs)',
        role: 'Official docs — CLI, AGENTS.md, changelog',
        channelUrl: 'https://developers.openai.com/codex',
        why: 'The canonical reference: CLI setup, the sandbox/approval model, AGENTS.md, MCP, and the running changelog.',
        isOfficial: true,
      },
      {
        name: 'AI Engineer',
        role: 'Conference talks — agentic coding in production',
        channelUrl: youtubeChannels.aiEngineer.url,
        why: 'Practitioner talks on agent architecture and production coding-agent patterns. Good for seeing how teams actually run Codex.',
      },
      {
        name: 'ExamPro',
        role: 'Long-form course — agentic development with Codex',
        channelUrl: youtubeChannels.examPro.url,
        why: 'Hosts the full Codex Essentials course in this portal. Best pick if you learn by building end-to-end.',
      },
      {
        name: 'DeepLearning.AI',
        role: 'Structured short courses — LLM app development',
        channelUrl: youtubeChannels.deepLearningAI.url,
        why: 'Rigorous short courses on prompting and building with the OpenAI API — the fundamentals under any Codex workflow.',
      },
      {
        name: 'AI Explained',
        role: 'Independent analysis — benchmarks and capability',
        channelUrl: youtubeChannels.aiExplained.url,
        why: 'Benchmark-driven, low-hype analysis of GPT-5.5 versus frontier models. Trust this for honest capability calibration.',
      },
    ],
    faqs: [
      {
        question: 'What model does Codex use in 2026?',
        answer:
          'GPT-5.5 (id gpt-5.5) is the recommended default in Codex. It uses roughly 40% fewer output tokens than GPT-5.4 on coding tasks, at a ~258K effective context window. The old o-series is gone — reasoning is folded into the single GPT-5.5 line.',
      },
      {
        question: 'Is Codex CLI free and open source?',
        answer:
          'The Codex CLI itself is open source and built in Rust. Usage runs against your OpenAI account, so you pay for the model tokens a run consumes — the [OpenAI Platform](https://platform.openai.com/) dashboard shows the cost.',
      },
      {
        question: 'What is AGENTS.md and why does it matter?',
        answer:
          'AGENTS.md is a plain-Markdown file of durable, repo-level instructions. Codex enumerates these files and injects them into context, and the model is trained to follow them closely. The same format also works in Cursor, Amp, and other agents, so you write your repo’s conventions once.',
      },
      {
        question: 'What is the difference between Codex CLI and Codex Cloud?',
        answer:
          'Codex CLI runs locally in your terminal inside an OS-level sandbox — it reads, edits, and runs code on your machine with an approval model you control. Codex Cloud hands a task to a remote environment and returns a diff you can apply from the CLI, which is better for long-running refactors and parallel work.',
      },
      {
        question: 'Does Codex support MCP?',
        answer:
          'Yes. Codex reaches external tools and data through Model Context Protocol servers — the same cross-vendor standard Claude and Gemini use. Write one MCP server and every compliant agent can use it.',
      },
      {
        question: 'How does Codex compare to Claude Code?',
        answer:
          'Both are terminal-first coding agents with a sandbox and repo-instruction files (AGENTS.md for Codex, CLAUDE.md for Claude Code). Codex runs GPT-5.5; Claude Code runs the Claude line. See the [Claude & Anthropic Mastery portal](/learn/claude-mastery) and our [Cursor vs Claude Code vs Windsurf](/blog/cursor-vs-claude-code-vs-windsurf-2026) breakdown for a head-to-head.',
      },
      {
        question: 'What happened to the o-series (o3, o4-mini)?',
        answer:
          'OpenAI retired the entire o-series, along with GPT-4o and GPT-4.1, in early 2026. Reasoning was unified into the GPT-5.5 line — there is no o5. In Codex you just pick GPT-5.5.',
      },
      {
        question: 'Can I run Codex on Azure?',
        answer:
          'Yes — Codex can run against OpenAI models hosted in [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/codex). That path is useful when procurement, data residency, or an existing Azure footprint rules out the direct API.',
      },
      {
        question: 'How do the sandbox and approvals work?',
        answer:
          'A config.toml file controls the sandbox and approval model. Depending on your settings, Codex asks before running commands or editing files — so you can run it loose on a scratch repo and locked-down on production code.',
      },
      {
        question: 'Where should I start if I’m new to Codex?',
        answer:
          'Watch video 1 (the official CLI overview) and video 3 (using AGENTS.md). Then install the CLI, add an AGENTS.md to a real repo, and give Codex a small, well-scoped task so you can watch the sandbox and approval flow before trusting it with more.',
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
    category: 'model-maker',
    heroEyebrow: 'Updated July 5, 2026 · Runs GPT-5.5 · Everyday AI fluency',
    longIntro:
      "ChatGPT is where most people meet AI, and in 2026 it runs GPT-5.5 — OpenAI's flagship since it replaced the whole o-series in a single unified line. This portal is the practical path: how to prompt it well, turn repeat work into reusable Projects and Custom GPTs, analyze files without trusting them blindly, and know the moment to graduate to Codex or the API.\n\nThe surface is broader than a chat box now. Custom GPTs and the GPT Store let you package instructions and knowledge; Projects keep files and context together for ongoing work; Advanced Voice (powered by the gpt-realtime-2 line) turns it into a real-time spoken collaborator; and ChatGPT Images 2.0 handles visual generation. One thing to know going in: ChatGPT focuses on images, not video.\n\nStart with the beginner get-work-done walkthrough (video 1), then the two prompt-engineering courses (videos 2 and 3) to build the habit that makes everything else work. Each tool below links to its official OpenAI page.",
    ctaTitle: 'Ready to get real work done with ChatGPT?',
    ctaBody:
      'Pair this portal with our written guides — a prompt library, the founder AI stack, and when to reach past ChatGPT for Codex or the API.',
    outcomes: [
      'Write clear prompts that include goal, context, constraints, and output format',
      'Use ChatGPT for writing, brainstorming, summarizing, learning, and decision support',
      'Turn repeat tasks into reusable prompts, Projects, GPTs, or workflow patterns',
      'Analyze files and data with a healthy verification habit',
      'Know when to switch from ChatGPT to Codex or the OpenAI API',
    ],
    relatedGuides: [
      '/guides/openai-chatgpt-guide',
      '/guides/top-50-ai-prompts',
      '/guides/founder-ai-stack-2026',
      '/learn/codex-mastery',
      '/learn/claude-mastery',
      '/learn/gemini-mastery',
    ],
    videos: [
      {
        id: 'chatgpt-kevin-get-work-done',
        youtubeId: 'poM2n8fBcag',
        title: 'ChatGPT Tutorial for Beginners: How to Actually Get Work Done with AI',
        creator: youtubeChannels.kevinStratvert.name,
        creatorChannel: youtubeChannels.kevinStratvert.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Practical beginner workflow for using ChatGPT on real work instead of one-off novelty prompts.',
        tags: ['chatgpt', 'productivity', 'beginner'],
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
    ecosystem: [
      {
        name: 'ChatGPT',
        category: 'Surface',
        description:
          'The flagship consumer app at chatgpt.com — chat, file uploads, memory, and the launchpad for every feature below. Free, Plus ($20/mo), and Pro ($200/mo) tiers.',
        href: 'https://chatgpt.com/',
        status: 'Updated',
        lastVerified: '2026-07-05',
      },
      {
        name: 'GPT-5.5',
        category: 'Reasoning',
        description:
          "OpenAI's flagship model (id gpt-5.5), the default in ChatGPT since April 2026. The o-series is gone — reasoning is unified into this single line, so you no longer pick a separate reasoning model.",
        href: 'https://platform.openai.com/docs/models',
        status: 'New',
        lastVerified: '2026-07-05',
      },
      {
        name: 'Custom GPTs & the GPT Store',
        category: 'Capability',
        description:
          'Package instructions, knowledge files, and actions into a tailored ChatGPT, then keep it private or publish it to the GPT Store. The fastest way to make a repeatable assistant.',
        href: 'https://chatgpt.com/gpts',
        status: 'GA',
        lastVerified: '2026-07-05',
      },
      {
        name: 'ChatGPT Projects',
        category: 'Capability',
        description:
          'Group related chats and files under one workspace with shared context — the right home for an ongoing piece of work instead of a sprawl of one-off conversations.',
        href: 'https://openai.com/chatgpt/',
        status: 'Updated',
        lastVerified: '2026-07-05',
      },
      {
        name: 'Advanced Voice',
        category: 'Capability',
        description:
          'Real-time spoken conversation powered by the gpt-realtime-2 line — GPT-5-class reasoning, a 128K context window, tone detection, and natural interruptions.',
        href: 'https://openai.com/chatgpt/',
        status: 'Updated',
        lastVerified: '2026-07-05',
      },
      {
        name: 'ChatGPT Images 2.0',
        category: 'Image',
        description:
          "OpenAI's image generator (GPT Image 2), built into ChatGPT for text-to-image and edits. Note: ChatGPT focuses on images — it does not generate video.",
        href: 'https://platform.openai.com/docs/models',
        status: 'New',
        lastVerified: '2026-07-05',
      },
      {
        name: 'OpenAI Platform (API)',
        category: 'API',
        description:
          'The developer surface behind ChatGPT — models, the API, pricing, and usage dashboards. Where interactive prompts graduate into production integrations.',
        href: 'https://platform.openai.com/',
        status: 'Updated',
        lastVerified: '2026-07-05',
      },
      {
        name: 'Codex',
        category: 'Builder Surface',
        description:
          'When the task is agentic coding in a real repo rather than a chat, Codex is the tool — the same GPT-5.5 brain in a terminal CLI and cloud runner. See the Codex portal for the deep dive.',
        href: 'https://openai.com/codex/',
        status: 'GA',
        lastVerified: '2026-07-05',
      },
    ],
    announcements: [
      {
        date: '2026-04-23',
        title: 'GPT-5.5 becomes the default in ChatGPT',
        summary:
          "OpenAI's new flagship (codename 'Spud', id gpt-5.5) ships as the ChatGPT default — stronger agentic behaviour and roughly 60% fewer hallucinations than GPT-5.4.",
        source: 'https://platform.openai.com/docs/models',
        tag: 'Launch',
      },
      {
        date: '2026-05-07',
        title: 'gpt-realtime-2 upgrades Advanced Voice',
        summary:
          'The realtime line gains GPT-5-class reasoning and a 128K context window (up from 32K) with parallel tool calls — the engine behind ChatGPT’s Advanced Voice.',
        source: 'https://platform.openai.com/docs/models',
        tag: 'Update',
      },
      {
        date: '2026-03-01',
        title: 'ChatGPT consolidates visual generation into Images 2.0',
        summary:
          'OpenAI folded its visual compute into ChatGPT Images 2.0 (GPT Image 2). ChatGPT focuses on high-quality image generation and editing — it no longer generates video.',
        source: 'https://platform.openai.com/docs/models',
        tag: 'Update',
      },
      {
        date: '2026-02-19',
        title: 'MCP reaches general availability',
        summary:
          'Model Context Protocol exits preview with cross-vendor adoption. The same MCP servers work across ChatGPT, Claude, and Gemini — write your integration once.',
        source: 'https://modelcontextprotocol.io/',
        tag: 'Research',
      },
      {
        date: '2025-12-11',
        title: 'GPT-5.2 ships with a 400K context class',
        summary:
          'GPT-5.2 landed as the prior work model — 400K context (272K input + 128K output), text and image, no native audio. GPT-5.5 has since replaced it as the default.',
        source: 'https://platform.openai.com/docs/models',
        tag: 'Update',
      },
      {
        date: '2025-08-05',
        title: 'gpt-oss — OpenAI’s first open-weight models since GPT-2',
        summary:
          'gpt-oss-120b and gpt-oss-20b released under Apache 2.0 with a 128K context window — a self-hostable option alongside ChatGPT for private or offline work.',
        source: 'https://openai.com/index/introducing-gpt-oss/',
        tag: 'Launch',
      },
    ],
    experts: [
      {
        name: 'OpenAI',
        role: 'Official channel — model and product launches',
        channelUrl: youtubeChannels.openai.url,
        why: 'First-party launches and demos for ChatGPT and the GPT-5.x line. The source of record for what actually shipped.',
        isOfficial: true,
      },
      {
        name: 'Kevin Stratvert',
        role: 'Productivity educator — ChatGPT for real work',
        channelUrl: youtubeChannels.kevinStratvert.url,
        why: 'Clear, approachable walkthroughs for using ChatGPT on everyday work. Hosts the beginner and data-analyst videos in this portal.',
      },
      {
        name: 'DeepLearning.AI',
        role: 'Short courses — prompting and OpenAI development',
        channelUrl: youtubeChannels.deepLearningAI.url,
        why: 'Andrew Ng and team teach prompt structure and reliable LLM patterns — the fundamentals that make every other ChatGPT workflow work.',
      },
      {
        name: 'freeCodeCamp.org',
        role: 'Full-length free courses — prompt engineering',
        channelUrl: youtubeChannels.freeCodeCamp.url,
        why: 'Long-form, no-cost courses covering prompting patterns that transfer across ChatGPT and other frontier models.',
      },
      {
        name: 'AI Explained',
        role: 'Independent analysis — benchmarks and capability',
        channelUrl: youtubeChannels.aiExplained.url,
        why: 'Honest, benchmark-driven analysis of GPT-5.5 versus the field. Trust this over launch-day hype for real capability calibration.',
      },
      {
        name: 'The Neuron',
        role: 'Daily AI newsletter + companion videos',
        channelUrl: youtubeChannels.theNeuron.url,
        why: 'Fast daily signal on OpenAI releases and practical workflows — good for staying current between official launches.',
      },
    ],
    faqs: [
      {
        question: 'What model does ChatGPT use in 2026?',
        answer:
          'ChatGPT runs GPT-5.5 (id gpt-5.5), OpenAI’s flagship since April 23, 2026. The old o-series (o3, o4-mini) and GPT-4o were retired in early 2026 and reasoning was unified into GPT-5.5 — there is no separate reasoning model to pick anymore.',
      },
      {
        question: 'Is ChatGPT free?',
        answer:
          'There is a free tier, plus ChatGPT Plus ($20/month) and ChatGPT Pro ($200/month) for higher limits and the strongest models. For programmatic use you pay per token through the [OpenAI Platform](https://platform.openai.com/) instead.',
      },
      {
        question: 'What are Custom GPTs and the GPT Store?',
        answer:
          'A Custom GPT is a tailored version of ChatGPT with your own instructions, knowledge files, and actions. Build one for a repeat task, keep it private, or publish it to the GPT Store for others to use.',
      },
      {
        question: 'What are ChatGPT Projects?',
        answer:
          'Projects group related chats and files under one workspace with shared context. Use a Project when you have ongoing work — a launch, a book, a research thread — instead of scattering it across one-off conversations.',
      },
      {
        question: 'Can ChatGPT generate video?',
        answer:
          'No. As of 2026 OpenAI consolidated its visual generation into ChatGPT Images 2.0 (GPT Image 2), which produces and edits images. ChatGPT does not generate video — for AI video, see our [AI video generation guide](/blog/ai-video-generation-2026-sora-runway-kling-veo).',
      },
      {
        question: 'When should I switch from ChatGPT to Codex or the API?',
        answer:
          'Use ChatGPT for interactive thinking and everyday work. Reach for [Codex](/learn/codex-mastery) when the task is agentic coding inside a real repo, and the OpenAI API when you need to run something programmatically or in production.',
      },
      {
        question: 'How does ChatGPT compare to Claude and Gemini?',
        answer:
          'ChatGPT is the broadest consumer surface and strongest at general everyday tasks; Claude leads on long-form writing and code refactoring; Gemini wins on multimodal and huge context. See our [ChatGPT vs Claude vs Gemini](/blog/chatgpt-vs-claude-vs-gemini-2026) breakdown and the sibling portals.',
      },
      {
        question: 'What is Advanced Voice?',
        answer:
          'Advanced Voice is ChatGPT’s real-time spoken mode, powered by the gpt-realtime-2 line. It reasons at GPT-5-class quality, holds a 128K context window, detects tone, and handles interruptions — closer to a natural conversation than a walkie-talkie.',
      },
      {
        question: 'How do I write better prompts?',
        answer:
          'Include four things: the goal, the context, the constraints, and the output format you want. Then iterate — treat the first answer as a draft, not a verdict. Videos 2 and 3 in this portal are full courses on exactly this.',
      },
      {
        question: 'Where should I start if I’m new to ChatGPT?',
        answer:
          'Watch video 1 (getting real work done), then open a Project on a task you actually care about and run it end to end. The habit of using it for real work — not novelty prompts — is what makes the difference.',
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
    category: 'model-maker',
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
      '/learn/codex-mastery',
      '/learn/chatgpt-mastery',
      '/learn/antigravity-mastery',
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
        lastVerified: '2026-07-07',
      },
      {
        name: 'Gemini 3.5 Flash',
        category: 'Speed',
        description:
          'GA since I/O 2026. Default model across Antigravity. Outperforms 3.1 Pro on coding and agentic benchmarks at ~4× the speed.',
        href: 'https://deepmind.google/models/gemini/',
        status: 'New',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Gemini Omni',
        category: 'Multimodal',
        description:
          'New "anything from any input" model — starts with video. Rolling out to AI Plus, Pro, and Ultra subscribers via the Gemini app and Google Flow.',
        href: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/',
        status: 'New',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Antigravity 2.0',
        category: 'Agents',
        description:
          'Standalone agent-first desktop app + CLI + SDK. Replaces Gemini CLI (sunset June 18, 2026). Default model: Gemini 3.5 Flash.',
        href: 'https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/',
        status: 'New',
        lastVerified: '2026-07-07',
      },
      {
        name: 'NotebookLM',
        category: 'Research',
        description:
          'Audio Overviews with Interactive Mode (raise hand to interrupt the hosts). Cinematic Video Overviews in 10 visual styles. Multi-output Studio panel.',
        href: 'https://notebooklm.google/',
        status: 'Updated',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Veo 3.1 + Veo 3.1 Lite',
        category: 'Video',
        description:
          'Text-to-video up to 60 seconds at 4K with native audio. Lite ships at under 50% the cost of Fast. Available via VideoFX, Vertex AI, and Gemini API.',
        href: 'https://deepmind.google/models/veo/',
        status: 'Updated',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Nano Banana Pro / Nano Banana 2',
        category: 'Image',
        description:
          'Pro = Gemini 3 Pro Image (deliberate thinking pass, 2K native, up to 4K). 2 = Gemini 3.1 Flash Image (Flash speed). 5-subject character consistency, image search grounding.',
        href: 'https://deepmind.google/models/gemini-image/pro/',
        status: 'New',
        lastVerified: '2026-07-07',
      },
      {
        name: 'Google AI Studio',
        category: 'Builder Surface',
        description:
          'Fastest way to try Gemini and ship apps. New native Android app launched at I/O 2026 alongside the Gemini API "Get code" flow.',
        href: 'https://aistudio.google.com/',
        status: 'Updated',
        lastVerified: '2026-07-07',
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
  {
    id: 'antigravity-mastery',
    title: 'Antigravity Mastery',
    slug: 'antigravity-mastery',
    description:
      "Master Google Antigravity — the standalone agent-first development platform (desktop app, CLI, SDK) that replaced Gemini CLI — from first install to production multi-agent workflows.",
    icon: 'zap',
    difficulty: 'intermediate',
    estimatedHours: 8,
    color: 'sky',
    category: 'model-maker',
    heroEyebrow: 'Updated July 6, 2026 · Antigravity 2.0, four pillars',
    longIntro:
      "Antigravity started as an agentic IDE feature in November 2025 alongside Gemini 3. By I/O 2026 (May 19) it had grown into something bigger: a standalone agent-first platform with four pillars — a desktop Agent Manager for orchestrating multiple agents at once, a CLI for server-side and terminal work, an SDK for custom Python workflows, and the IDE itself. It replaced Gemini CLI outright, and it runs Gemini 3.5 Flash by default while also supporting Claude and OpenAI models.\n\nThe core idea that sets it apart from a typical coding agent: Antigravity solves the trust problem by having agents produce Artifacts — task lists, implementation plans, screenshots, browser recordings — so you can verify what an agent actually did at a glance instead of re-reading a diff and hoping. You operate at the level of tasks and agents, not individual keystrokes.\n\nStart with the official hands-on tour (video 1) to see the Artifact-based workflow, then the developer guide (video 2) for the four-pillar architecture. Videos 3 and 4 are independent full walkthroughs for actually installing it and shipping something. If you're comparing this to Claude Code or Codex, that's the right instinct — see the FAQ below for the honest differences.",
    ctaTitle: 'Ready to build with Antigravity?',
    ctaBody:
      'Pair this portal with the full Gemini & Google AI Mastery portal for the model layer underneath Antigravity, and our agent-tooling comparisons for how it stacks up against Claude Code and Codex.',
    outcomes: [
      'Install Antigravity and choose between the desktop app, CLI, and SDK for a given task',
      'Read and verify agent Artifacts (task lists, plans, screenshots, browser recordings) before trusting a change',
      'Orchestrate multiple agents at once from the desktop Agent Manager',
      'Swap the underlying model (Gemini 3.5 Flash, Claude, OpenAI) for a given workflow',
      'Judge when Antigravity is the right tool versus Claude Code or Codex',
    ],
    relatedGuides: [
      '/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
      '/blog/cursor-vs-claude-code-vs-windsurf-2026',
      '/learn/gemini-mastery',
      '/learn/claude-mastery',
      '/learn/codex-mastery',
    ],
    videos: [
      {
        id: 'antigravity-hands-on-official',
        youtubeId: 'uzFOhkORVfk',
        title: 'Google Antigravity: Hands on with our new agentic development platform',
        creator: youtubeChannels.googleAntigravity.name,
        creatorChannel: youtubeChannels.googleAntigravity.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          "Official hands-on tour of Antigravity's Artifact-based workflow — how agents produce verifiable task lists, plans, and recordings instead of asking you to trust a diff.",
        tags: ['antigravity', 'official', 'artifacts'],
      },
      {
        id: 'antigravity-2-developer-guide',
        youtubeId: 'Dk4MD6TNiWE',
        title: 'Inside Google Antigravity 2.0: The complete developer guide | The Agent Factory',
        creator: youtubeChannels.googleCloudTech.name,
        creatorChannel: youtubeChannels.googleCloudTech.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          "Google Cloud's own deep-dive into Antigravity 2.0's four pillars — Agent Manager, CLI, SDK, and IDE — and how they fit together for real projects.",
        tags: ['antigravity-2', 'developer-guide', 'architecture'],
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
    ],
    ecosystem: [
      {
        name: 'Antigravity Desktop (Agent Manager)',
        category: 'Surface',
        description:
          'The standalone desktop app — orchestrate multiple agents across workspaces from a single Agent Manager, the command center for the whole platform.',
        href: 'https://antigravity.google/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Antigravity CLI',
        category: 'Builder Surface',
        description:
          'Terminal-first surface sharing the same agent harness as the desktop app — the direct successor to Gemini CLI, which it replaced outright.',
        href: 'https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/',
        status: 'GA',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Antigravity SDK',
        category: 'Agents',
        description:
          'Python-based SDK for custom agent workflows — build your own orchestration on top of the same primitives the desktop app and CLI use.',
        href: 'https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Artifacts',
        category: 'Capability',
        description:
          "Agents produce tangible, reviewable deliverables — task lists, implementation plans, screenshots, browser recordings — so you verify logic at a glance instead of re-reading a diff.",
        href: 'https://codelabs.developers.google.com/getting-started-google-antigravity',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Antigravity Skills',
        category: 'Capability',
        description:
          'A lightweight, open format for extending agent capabilities with specialized knowledge and workflows — conceptually parallel to Claude Skills.',
        href: 'https://codelabs.developers.google.com/getting-started-with-antigravity-skills',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Model optionality',
        category: 'Reasoning',
        description:
          'Gemini 3.5 Flash is the default, but Antigravity fully supports Anthropic Claude and OpenAI models too — pick the model per task, not per platform.',
        href: 'https://antigravity.google/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Google Antigravity (official site)',
        category: 'Reference',
        description:
          'The product homepage and download — available at no cost for individuals across macOS, Windows, and Linux.',
        href: 'https://antigravity.google/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
    ],
    announcements: [
      {
        date: '2025-11-18',
        title: 'Antigravity launches in public preview alongside Gemini 3',
        summary:
          'First release — an agentic development platform where agents autonomously plan, execute, and verify tasks across the editor, terminal, and browser. Free for individuals.',
        source: 'https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/',
        tag: 'Launch',
      },
      {
        date: '2026-05-19',
        title: 'Antigravity 2.0 launches as a standalone agentic platform',
        summary:
          'Major relaunch at Google I/O 2026 — four pillars (desktop Agent Manager, CLI, SDK, IDE), Gemini 3.5 Flash as the new default model, full Claude and OpenAI model support.',
        source: 'https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/',
        tag: 'Launch',
      },
      {
        date: '2026-06-18',
        title: 'Gemini CLI sunset — Antigravity CLI is the successor',
        summary:
          'Gemini CLI and Gemini Code Assist IDE extensions stop serving requests for AI Pro, Ultra, and Code Assist for individuals. The Antigravity CLI shares the same agent harness as Antigravity 2.0 desktop.',
        source: 'https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/',
        tag: 'Deprecation',
      },
    ],
    experts: [
      {
        name: 'Google Antigravity',
        role: 'Official channel — platform launches and hands-on demos',
        channelUrl: youtubeChannels.googleAntigravity.url,
        why: 'First-party Artifact-workflow demos and feature walkthroughs, straight from the team that ships the platform.',
        isOfficial: true,
      },
      {
        name: 'Google Cloud Tech',
        role: 'Official channel — developer guides, The Agent Factory series',
        channelUrl: youtubeChannels.googleCloudTech.url,
        why: 'The Agent Factory series goes deep on Antigravity 2.0 architecture — the four-pillar model and how they compose in practice.',
        isOfficial: true,
      },
      {
        name: 'AI Engineer',
        role: 'Conference talks — agentic development patterns',
        channelUrl: youtubeChannels.aiEngineer.url,
        why: 'Practitioner talks on multi-agent orchestration that apply directly to Antigravity\'s Agent Manager model.',
      },
    ],
    faqs: [
      {
        question: 'What is Google Antigravity?',
        answer:
          "Google's standalone agent-first development platform — a desktop Agent Manager, a CLI, an SDK, and an IDE, unified under one agent harness. It replaced Gemini CLI and runs Gemini 3.5 Flash by default, with full support for Claude and OpenAI models too.",
      },
      {
        question: 'Is Gemini CLI still supported?',
        answer:
          'No — Gemini CLI and the Gemini Code Assist IDE extensions stopped serving requests for AI Pro, Ultra, and Code Assist for individuals on June 18, 2026. The Antigravity CLI is the direct successor and shares the same agent harness as the Antigravity 2.0 desktop app.',
      },
      {
        question: 'What are Artifacts in Antigravity?',
        answer:
          "Tangible, reviewable outputs an agent produces alongside its work — task lists, implementation plans, screenshots, browser recordings. Instead of re-reading a diff to trust an agent's logic, you check the Artifact and leave feedback directly on it, similar to commenting on a doc.",
      },
      {
        question: 'Can I use Claude or OpenAI models inside Antigravity?',
        answer:
          "Yes — Antigravity defaults to Gemini 3.5 Flash but fully supports Anthropic Claude and OpenAI models. Pick per task: Gemini for speed and cost, Claude for long-form refactoring, whichever fits.",
      },
      {
        question: 'What are the four pillars of Antigravity 2.0?',
        answer:
          'The standalone desktop Agent Manager (orchestration), the CLI (terminal and server-side work), the SDK (custom Python workflows), and the IDE (the original agentic editor). All four share the same underlying agent harness.',
      },
      {
        question: 'How is Antigravity different from Claude Code or Codex?',
        answer:
          "The core difference is Artifacts — Antigravity's agents produce reviewable task lists, plans, and recordings by design, where Claude Code and Codex hand you a diff and a chat transcript. Antigravity also natively orchestrates multiple agents from one desktop app; Claude Code and Codex are more single-session-first. Model choice is now moot for all three — each supports multiple model providers.",
      },
      {
        question: 'What are Antigravity Skills?',
        answer:
          'A lightweight, open format for packaging specialized knowledge and workflows that an agent loads on demand — conceptually the same idea as Claude Skills, just under a different name on Google\'s platform.',
      },
      {
        question: 'Is Antigravity free?',
        answer:
          'Yes, available at no cost for individuals, across macOS, Windows, and Linux. Enterprise support exists separately for organizations that need it.',
      },
      {
        question: "Where do I start if I'm new to Antigravity?",
        answer:
          'Watch video 1 (the official hands-on tour) to see the Artifact workflow, then video 3 for a full beginner walkthrough of installing it and shipping a first project. Come back for the CLI (video 4) once you want to work from the terminal instead of the desktop app.',
      },
    ],
  },
  {
    id: 'aws-bedrock-mastery',
    title: 'AWS Bedrock Mastery',
    slug: 'aws-bedrock-mastery',
    description:
      "Master Amazon Bedrock — the managed model gateway for AWS: Claude, Nova, Knowledge Bases, AgentCore, and Guardrails — from first API call to production agents.",
    icon: 'zap',
    difficulty: 'intermediate',
    estimatedHours: 10,
    color: 'amber',
    category: 'cloud',
    heroEyebrow: 'Updated July 6, 2026 · AgentCore + Managed Knowledge Base GA',
    longIntro:
      "Bedrock is AWS's managed model gateway — one API surface for Anthropic, Meta, Mistral, Cohere, AI21, Amazon's own Nova family, DeepSeek, and 100+ Marketplace models, plus Knowledge Bases and Agents for orchestration. Pricing is per-token like the model APIs directly, but IAM, VPC, and CloudWatch come for free if you already live in AWS — no separate proxy or vendor relationship to stand up.\n\nTwo capabilities matured to general availability in June 2026 and change what \"production-ready\" means here: AgentCore is a code-first platform for building, deploying, and operating agents with a real runtime, identity, memory, and observability layer — its SDK passed 2 million downloads within 5 months of preview. Managed Knowledge Base now runs the entire RAG pipeline (chunking, embeddings, re-ranking, retrieval) as AWS-operated infrastructure, with native AgentCore integration and MCP compatibility.\n\nStart with the beginner walkthrough (video 1) to get a model responding, then AgentCore (video 2) once you're ready to operationalize an agent, Guardrails (video 3) before anything touches real users, and the Nova model tour (video 4) to see what AWS's own models are for. This is the right portal if your team already runs on AWS and needs SOC 2 / procurement alignment without standing up a separate model vendor.",
    ctaTitle: 'Ready to ship on Bedrock?',
    ctaBody:
      'Pair this portal with our production architecture writeups — the six-plane enterprise pattern and real agent deployment playbooks translate directly from OCI to Bedrock.',
    outcomes: [
      'Call Claude, Nova, and Marketplace models through one Bedrock API',
      'Stand up a Managed Knowledge Base for RAG without operating vector infrastructure',
      'Build and deploy a production agent with AgentCore (runtime, memory, observability)',
      'Apply Guardrails — content filters, denied topics, PII redaction — before shipping to users',
      'Decide when Bedrock is the right call vs. a direct model API',
    ],
    relatedGuides: [
      '/blog/production-agent-patterns-aws-bedrock',
      '/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
      '/learn/claude-mastery',
      '/learn/azure-ai-foundry-mastery',
      '/learn/oracle-oci-genai-mastery',
    ],
    videos: [
      {
        id: 'bedrock-beginners-full-tutorial',
        youtubeId: 'FAgmR9VV0GQ',
        title: 'Amazon Bedrock for Beginners – From First Prompt to AI Agent (Full Tutorial)',
        creator: youtubeChannels.amazonWebServices.name,
        creatorChannel: youtubeChannels.amazonWebServices.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'End-to-end walkthrough from a first Bedrock API call to a working AI agent — the fastest path to your first working call.',
        tags: ['bedrock', 'getting-started', 'beginner'],
      },
      {
        id: 'bedrock-agentcore-tutorial',
        youtubeId: 'cTBGIKAckKE',
        title: 'Amazon Bedrock AgentCore Tutorial | Build, Deploy, Operate AI Agents using AgentCore',
        creator: youtubeChannels.amazonWebServices.name,
        creatorChannel: youtubeChannels.amazonWebServices.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Hands-on AgentCore build: runtime, identity, memory, and observability for a production agent — the GA platform behind 2M+ SDK downloads.',
        tags: ['agentcore', 'agents', 'production'],
      },
      {
        id: 'bedrock-guardrails',
        youtubeId: 'gp6bGpid62E',
        title: 'Amazon Bedrock Guardrails',
        creator: youtubeChannels.amazonWebServices.name,
        creatorChannel: youtubeChannels.amazonWebServices.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'The safety layer for production GenAI on Bedrock — content filters, denied topics, PII redaction, and contextual grounding checks.',
        tags: ['guardrails', 'safety', 'production'],
      },
      {
        id: 'bedrock-nova-models',
        youtubeId: '07w2Kc556u4',
        title: 'AWS Cloud Coach: Exploring Amazon Nova models using Amazon Bedrock',
        creator: youtubeChannels.amazonWebServices.name,
        creatorChannel: youtubeChannels.amazonWebServices.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          "Tour of Amazon's own Nova model family (Premier, Pro, Lite, Micro) — where they fit alongside Claude and the rest of the Bedrock catalog.",
        tags: ['nova', 'models', 'amazon'],
      },
    ],
    ecosystem: [
      {
        name: 'Amazon Bedrock',
        category: 'Surface',
        description:
          'The managed gateway itself — one API for Anthropic, Meta, Mistral, Cohere, AI21, Amazon Nova, DeepSeek, and 100+ Marketplace models.',
        href: 'https://aws.amazon.com/bedrock/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Amazon Nova',
        category: 'Reasoning',
        description:
          "Amazon's own model family: Premier (1M context), Pro and Lite (300K), and Micro (128K, text-only, $0.035/M input) — the in-house option inside Bedrock.",
        href: 'https://aws.amazon.com/bedrock/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Bedrock Knowledge Bases',
        category: 'RAG',
        description:
          'Managed RAG pipeline — ingestion, chunking, embeddings, storage, retrieval. Managed Knowledge Base (GA June 2026) runs the vector infrastructure for you.',
        href: 'https://aws.amazon.com/bedrock/knowledge-bases/',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Bedrock AgentCore',
        category: 'Agents',
        description:
          'Code-first agent platform (GA June 2026): runtime, identity, tools, memory, and observability. Works with CrewAI, LangGraph, LlamaIndex, and Strands Agents.',
        href: 'https://aws.amazon.com/bedrock/agentcore/',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Bedrock Guardrails',
        category: 'Safety',
        description:
          'Policy layer independent of any single model call — content filters, denied topics, word filters, PII detection, and contextual grounding. Standalone API available.',
        href: 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Claude on Amazon Bedrock',
        category: 'Cloud',
        description:
          'Claude as a fully-managed Bedrock model — the same IAM, VPC, and CloudWatch boundaries as every other AWS service, no separate Anthropic account required.',
        href: 'https://docs.claude.com/en/api/claude-on-amazon-bedrock',
        status: 'GA',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Bedrock Marketplace',
        category: 'Models',
        description:
          '100+ specialized models beyond the core catalog — from Hugging Face and independent labs — deployable through the same Bedrock API and billing.',
        href: 'https://aws.amazon.com/bedrock/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'AWS Documentation — Bedrock',
        category: 'Reference',
        description:
          'The official reference for models, pricing, API shapes, and IAM policy examples. Where you look up the exact request/response contract.',
        href: 'https://docs.aws.amazon.com/bedrock/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
    ],
    announcements: [
      {
        date: '2026-06-01',
        title: 'Bedrock AgentCore reaches general availability',
        summary:
          'Code-first agent platform GA — runtime, identity, tools, memory, and observability. The SDK passed 2 million downloads within 5 months of preview.',
        source: 'https://aws.amazon.com/bedrock/agentcore/',
        tag: 'Launch',
      },
      {
        date: '2026-06-01',
        title: 'Managed Knowledge Base reaches general availability',
        summary:
          'AWS now operates the full RAG pipeline — vector storage, embeddings, re-ranking, retrieval — as managed infrastructure, with native AgentCore integration.',
        source: 'https://aws.amazon.com/blogs/aws/introducing-amazon-bedrock-managed-knowledge-base-for-faster-more-accurate-enterprise-ai-applications/',
        tag: 'Launch',
      },
      {
        date: '2026-05-01',
        title: 'AgentCore Knowledge Base integration adds continuous learning',
        summary:
          'Agents built on AgentCore gain broader knowledge access and continuous-learning patterns via direct Knowledge Base integration as a pre-built target type.',
        source: 'https://aws.amazon.com/blogs/machine-learning/new-in-amazon-bedrock-agentcore-build-agents-with-broader-knowledge-and-continuous-learning/',
        tag: 'Update',
      },
      {
        date: '2026-02-19',
        title: 'MCP reaches general availability',
        summary:
          'Model Context Protocol exits preview with cross-vendor adoption. Bedrock Knowledge Bases now carry native MCP compatibility.',
        source: 'https://modelcontextprotocol.io/',
        tag: 'Research',
      },
    ],
    experts: [
      {
        name: 'Amazon Web Services',
        role: 'Official channel — Bedrock launches and tutorials',
        channelUrl: youtubeChannels.amazonWebServices.url,
        why: 'First-party walkthroughs for every Bedrock feature — AgentCore, Guardrails, Knowledge Bases, and the Nova model family.',
        isOfficial: true,
      },
      {
        name: 'AI Engineer',
        role: 'Conference talks — production agent patterns',
        channelUrl: youtubeChannels.aiEngineer.url,
        why: 'Practitioner talks on agent architecture that translate directly to AgentCore and Bedrock production patterns.',
      },
      {
        name: 'freeCodeCamp.org',
        role: 'Long-form courses — Bedrock, RAG, agents, guardrails',
        channelUrl: youtubeChannels.freeCodeCamp.url,
        why: 'Full-length, no-cost courses covering the complete Bedrock stack from tokenization through guardrails.',
      },
    ],
    faqs: [
      {
        question: 'What is Amazon Bedrock?',
        answer:
          "AWS's managed model gateway — one API for Anthropic Claude, Meta Llama, Mistral, Cohere, AI21, Amazon's own Nova family, DeepSeek, and 100+ Marketplace models, plus Knowledge Bases and Agents for orchestration.",
      },
      {
        question: 'Should I use Bedrock or call Claude directly?',
        answer:
          "If you already live in AWS — IAM, VPC, CloudWatch, existing procurement — Bedrock saves you a separate model-vendor relationship and gets you SOC 2 alignment for free. If you don't, the direct API is simpler and gets new Claude models first. Watch cross-region inference billing if you go Bedrock; it has surprised more than one team.",
      },
      {
        question: 'What is Bedrock AgentCore?',
        answer:
          'A code-first agent platform (GA June 2026) providing production-grade runtime, identity, tools, memory, and observability. It works with open frameworks like CrewAI, LangGraph, LlamaIndex, and Strands Agents — not a replacement for them, the infrastructure underneath them.',
      },
      {
        question: 'What is a Managed Knowledge Base?',
        answer:
          'A fully AWS-operated RAG pipeline (GA June 2026) — ingestion, chunking, embeddings, vector storage, retrieval, and re-ranking — so you stop operating vector infrastructure yourself. It integrates natively with AgentCore and supports MCP.',
      },
      {
        question: 'What are Bedrock Guardrails?',
        answer:
          'A policy layer independent of any single model call: content filters (hate, violence, prompt attack), denied-topic definitions in plain language, word filters, PII detection with block-or-mask actions, and contextual grounding checks. A standalone API applies them to any text, even from non-Bedrock sources.',
      },
      {
        question: 'What is Amazon Nova?',
        answer:
          "Amazon's own model family inside Bedrock: Nova Premier (1M context), Nova Pro and Nova Lite (300K context), and Nova Micro (128K, text-only, $0.035 per million input tokens) — the cheapest tier in the catalog.",
      },
      {
        question: 'Is Claude available on Bedrock?',
        answer:
          "Yes — Claude runs as a fully-managed Bedrock model with the same IAM, VPC, and CloudWatch boundaries as any other AWS service. See the [Claude & Anthropic Mastery portal](/learn/claude-mastery) for the model line itself.",
      },
      {
        question: 'How does Bedrock compare to Azure AI Foundry and Oracle OCI GenAI?',
        answer:
          "All three are managed-cloud gateways to third-party models with agent and RAG tooling layered on top. Bedrock leans on IAM/VPC-native AWS integration; [Azure AI Foundry](/learn/azure-ai-foundry-mastery) leans on Microsoft 365 and Fabric connectivity; [Oracle OCI GenAI](/learn/oracle-oci-genai-mastery) leans on Autonomous Database and Select AI. Pick by where your data and compliance boundary already live.",
      },
      {
        question: "Where do I start if I'm new to Bedrock?",
        answer:
          'Watch video 1 (the beginner full tutorial) to get a model responding, then video 3 (Guardrails) before anything touches real users. AgentCore (video 2) comes once you actually need a production agent, not before.',
      },
    ],
  },
  {
    id: 'azure-ai-foundry-mastery',
    title: 'Azure AI Foundry Mastery',
    slug: 'azure-ai-foundry-mastery',
    description:
      'Master Microsoft Foundry (formerly Azure AI Foundry) — 11,000+ models, the Foundry Agent Service, and MCP-connected agents — from your first deployment to production.',
    icon: 'zap',
    difficulty: 'intermediate',
    estimatedHours: 10,
    color: 'sky',
    category: 'cloud',
    heroEyebrow: 'Updated July 6, 2026 · Microsoft Foundry GA + Hosted Agents',
    longIntro:
      "Microsoft renamed Azure AI Foundry to Microsoft Foundry in 2026 and shipped the Foundry Agent Service to general availability in March. The pitch: one catalog of 11,000+ models — OpenAI, Anthropic, Meta, Google, xAI, Hugging Face, and Microsoft's own MAI multimodal family — plus an agent runtime that plugs directly into Microsoft 365 (Work IQ) and Microsoft Fabric (Fabric IQ). If your organization already runs on Microsoft's stack, that connective tissue is the actual product, not the model catalog.\n\nTwo agent types matter here. Prompt Agents are config-only — instructions, model, tools, defined in the portal or via SDK/REST for CI/CD. Hosted Agents (reaching GA in early July 2026) add a managed runtime where every session gets its own sandboxed compute, memory, and filesystem — the difference between a demo and something you'd trust with real data. May 2026 also added Model Context Protocol support, so a Foundry agent can reach the same MCP servers a Claude Code or Codex session uses.\n\nStart with the GA breakdown (video 1) to see what's actually production-ready today, then the from-scratch agent build (video 2). If your models of choice are Claude rather than OpenAI's own line, video 3 shows exactly that path. Video 4 covers the MAI model family Microsoft ships as its in-house alternative.",
    ctaTitle: 'Ready to ship on Microsoft Foundry?',
    ctaBody:
      'Pair this portal with our multi-cloud architecture comparison to see where Foundry fits next to Bedrock and OCI GenAI for your specific compliance and data-residency needs.',
    outcomes: [
      'Pick the right model from the 11,000+ catalog for a given task',
      'Build a Prompt Agent (config-only) and know when you need a Hosted Agent instead',
      'Connect a Foundry agent to an MCP server for external tools and data',
      'Deploy Claude models inside Foundry when that is the better model fit',
      'Decide when Microsoft 365 / Fabric connectivity makes Foundry the right cloud',
    ],
    relatedGuides: [
      '/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
      '/learn/claude-mastery',
      '/learn/aws-bedrock-mastery',
      '/learn/oracle-oci-genai-mastery',
    ],
    videos: [
      {
        id: 'foundry-ga-breakdown',
        youtubeId: 'o1tcdlLf2Eo',
        title: 'Microsoft Foundry is GA Now | What You Can Use in Production (Full Breakdown)',
        creator: youtubeChannels.microsoftReactor.name,
        creatorChannel: youtubeChannels.microsoftReactor.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Honest breakdown of what actually shipped to general availability versus what is still preview — the right first video before building anything.',
        tags: ['foundry', 'ga', 'overview'],
      },
      {
        id: 'foundry-build-agent-scratch',
        youtubeId: 'B4VXrhiZaSg',
        title: 'Build An AI Agent From Scratch Using Microsoft Foundry in 2026',
        creator: youtubeChannels.microsoftReactor.name,
        creatorChannel: youtubeChannels.microsoftReactor.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'End-to-end first agent build in the Foundry portal — the fastest path from zero to a working Prompt Agent.',
        tags: ['agents', 'getting-started', 'foundry-agent-service'],
      },
      {
        id: 'foundry-claude-agents',
        youtubeId: 'zRU-98XldGo',
        title: 'Build AI Agents Using Claude Models in Microsoft Foundry (Step-by-Step)',
        creator: youtubeChannels.microsoftReactor.name,
        creatorChannel: youtubeChannels.microsoftReactor.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          'Deploys Anthropic Claude models inside Foundry Agent Service — for teams whose model of choice is Claude rather than OpenAI.',
        tags: ['claude', 'foundry-agent-service', 'anthropic'],
      },
      {
        id: 'foundry-mai-models',
        youtubeId: 'XI4H8NmPXgA',
        title: 'Microsoft Build 2026: MAI models in Microsoft Foundry across text, image, voice, and speech',
        creator: youtubeChannels.microsoftReactor.name,
        creatorChannel: youtubeChannels.microsoftReactor.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          "Tour of Microsoft's in-house MAI multimodal family — text, image, voice, and speech models shipping directly inside Foundry.",
        tags: ['mai-models', 'microsoft', 'multimodal'],
      },
    ],
    ecosystem: [
      {
        name: 'Microsoft Foundry',
        category: 'Surface',
        description:
          "The renamed, unified platform (formerly Azure AI Foundry) — 11,000+ models across OpenAI, Anthropic, Meta, Google, xAI, Hugging Face, and Microsoft's own MAI family.",
        href: 'https://azure.microsoft.com/en-us/products/ai-foundry',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Foundry Agent Service',
        category: 'Agents',
        description:
          'Managed agent platform, GA since March 2026. Prompt Agents (config-only) for quick starts; Hosted Agents (GA early July 2026) add sandboxed runtime, memory, and filesystem per session.',
        href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/overview',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Foundry Models',
        category: 'Reasoning',
        description:
          'The model catalog itself — over 11,000 foundational, open, reasoning, and multimodal models spanning every major lab plus Microsoft MAI.',
        href: 'https://azure.microsoft.com/en-us/products/ai-foundry/models',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'MCP in Foundry',
        category: 'Protocol',
        description:
          'Connect Foundry agents to Model Context Protocol servers (added May 2026) — the same cross-vendor standard used by Claude, Codex, and Gemini.',
        href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Fabric IQ',
        category: 'Data',
        description:
          "Connects Foundry agents to Microsoft Fabric — the analytics/data-platform integration that's the real differentiator for organizations already on Microsoft's stack.",
        href: 'https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Work IQ',
        category: 'Data',
        description:
          'Connects Foundry agents to Microsoft 365 — email, documents, calendar context available to an agent without a custom integration.',
        href: 'https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Claude on Foundry',
        category: 'Cloud',
        description:
          'Deploy Anthropic Claude models inside Foundry Agent Service when Claude is the better model fit than Microsoft or OpenAI options.',
        href: 'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Microsoft Learn — Foundry',
        category: 'Reference',
        description:
          'The official documentation hub — SDKs, REST API, training paths, and the running "what\'s new" log for every Foundry release.',
        href: 'https://learn.microsoft.com/en-us/azure/foundry/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
    ],
    announcements: [
      {
        date: '2026-03-19',
        title: 'Microsoft Foundry (formerly Azure AI Foundry) reaches general availability',
        summary:
          'The renamed, unified platform and its Foundry Agent Service ship to GA — though several capabilities remain preview-only at launch.',
        source: 'https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry',
        tag: 'Launch',
      },
      {
        date: '2026-06-03',
        title: 'MAI multimodal models launch at Microsoft Build 2026',
        summary:
          "Microsoft's in-house MAI family ships across text, image, voice, and speech — a first-party alternative alongside the 11,000+ third-party catalog.",
        source: 'https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry',
        tag: 'Launch',
      },
      {
        date: '2026-05-01',
        title: 'MCP support and Hosted Agents preview',
        summary:
          'May 2026 updates: Model Context Protocol tool support, Hosted Agents (managed sandboxed runtime), voice agents, Fabric IQ, and Work IQ — several still in preview.',
        source: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol',
        tag: 'Update',
      },
      {
        date: '2026-07-01',
        title: 'Hosted Agents expected to reach general availability',
        summary:
          'Hosted Agents — the managed runtime with per-session sandboxed compute, memory, and filesystem — move from preview to GA in early July 2026.',
        source: 'https://learn.microsoft.com/en-us/azure/foundry/agents/overview',
        tag: 'Update',
      },
    ],
    experts: [
      {
        name: 'Microsoft Reactor',
        role: 'Official community channel — Foundry tutorials and demos',
        channelUrl: youtubeChannels.microsoftReactor.url,
        why: 'Feature-by-feature Foundry coverage direct from Microsoft — GA breakdowns, agent builds, and model deep-dives, all in this portal.',
        isOfficial: true,
      },
      {
        name: 'AI Engineer',
        role: 'Conference talks — agent architecture',
        channelUrl: youtubeChannels.aiEngineer.url,
        why: 'Practitioner talks on production agent patterns that translate directly to Foundry Agent Service design decisions.',
      },
      {
        name: 'freeCodeCamp.org',
        role: 'Long-form courses — cloud AI platforms',
        channelUrl: youtubeChannels.freeCodeCamp.url,
        why: 'Full-length, no-cost courses that regularly cover Azure/Foundry alongside the other major cloud AI platforms.',
      },
    ],
    faqs: [
      {
        question: 'What is Microsoft Foundry?',
        answer:
          'The renamed, unified successor to Azure AI Foundry — a catalog of 11,000+ models (OpenAI, Anthropic, Meta, Google, xAI, Hugging Face, and Microsoft\'s own MAI family) plus the Foundry Agent Service for building and running agents.',
      },
      {
        question: 'What is the Foundry Agent Service?',
        answer:
          'A managed platform for building AI agents, GA since March 2026. Prompt Agents are config-only (instructions, model, tools) for a fast start. Hosted Agents add a managed runtime with per-session sandboxed compute, memory, and filesystem — reaching GA in early July 2026.',
      },
      {
        question: 'Does Foundry support Model Context Protocol (MCP)?',
        answer:
          'Yes, added May 2026. A Foundry agent can connect to MCP server endpoints for external tools and data — the same cross-vendor standard used by Claude, Codex, and Gemini agents.',
      },
      {
        question: 'Can I run Claude models in Microsoft Foundry?',
        answer:
          'Yes — Anthropic Claude models are deployable directly inside Foundry Agent Service, alongside OpenAI, Meta, Google, and Microsoft\'s own MAI models.',
      },
      {
        question: 'What is Fabric IQ and Work IQ?',
        answer:
          'Fabric IQ connects Foundry agents to Microsoft Fabric (your analytics/data platform); Work IQ connects them to Microsoft 365 (email, documents, calendar). Both are the real differentiator for organizations already standardized on Microsoft — an agent gets that context without a custom integration.',
      },
      {
        question: 'What are MAI models?',
        answer:
          "Microsoft's own in-house multimodal model family — text, image, voice, and speech — launched at Microsoft Build 2026 as a first-party alternative inside the broader Foundry catalog.",
      },
      {
        question: 'Prompt Agent vs Hosted Agent — which do I need?',
        answer:
          'Start with a Prompt Agent if your logic is instructions + tools + a model — it is config-only and fastest to ship. Move to a Hosted Agent when you need a dedicated, sandboxed runtime per session with its own compute, memory, and filesystem access — that is a production concern, not a prototyping one.',
      },
      {
        question: 'How does Microsoft Foundry compare to AWS Bedrock and Oracle OCI GenAI?',
        answer:
          'All three are managed gateways to third-party models with agent and RAG tooling on top. Foundry\'s edge is Microsoft 365 / Fabric connectivity via Work IQ and Fabric IQ; [AWS Bedrock](/learn/aws-bedrock-mastery) leans on native IAM/VPC integration; [Oracle OCI GenAI](/learn/oracle-oci-genai-mastery) leans on Autonomous Database and Select AI. Pick by where your organization\'s data already lives.',
      },
      {
        question: "Where do I start if I'm new to Microsoft Foundry?",
        answer:
          'Watch video 1 (the GA breakdown) to see what is actually production-ready today, then video 2 to build your first Prompt Agent end to end. Come back for MCP and Hosted Agents once you have that basic loop working.',
      },
    ],
  },
  {
    id: 'oracle-oci-genai-mastery',
    title: 'Oracle OCI Generative AI Mastery',
    slug: 'oracle-oci-genai-mastery',
    description:
      'Master OCI Generative AI — Cohere Command A, Agent Hub, and Select AI natural-language database queries — from your first model call to production agents on OCI.',
    icon: 'zap',
    difficulty: 'intermediate',
    estimatedHours: 10,
    color: 'violet',
    category: 'cloud',
    heroEyebrow: 'Updated July 6, 2026 · Cohere Command A + Agent Hub',
    longIntro:
      "OCI Generative AI is Oracle's managed model service, and its differentiator isn't the model catalog — it's Select AI, which lets an Autonomous Database answer natural-language questions directly in SQL, and Agent Hub, which combines the generative models with native Oracle and third-party system integration plus out-of-the-box support for open-source agent frameworks. If your data already lives in an Oracle database, that's the actual advantage over a generic model API.\n\nThe current model line runs on Cohere: Command A is a 111-billion-parameter model delivering 150% the throughput of its predecessor on just two GPUs, with a 256K context window and native multi-step tool use — the engine behind most of what Agent Hub does. Command A Vision adds multimodal (text + image) support, and Command A Reasoning is tuned specifically for agentic tool-use workflows. The Cohere Python SDK is now natively integrated, so code written for Cohere directly runs against OCI with minimal changes.\n\nStart with the enterprise overview (video 1) for the full Oracle AI landscape, then Select AI (video 2) if your data lives in an Autonomous Database — it's the standout feature here. Video 3 covers the Agent Framework for building agentic systems, and video 4 is the deepest end-to-end build. This portal draws on real production OCI deployment experience — see the related architecture series below for the enterprise patterns that don't show up in a product tour.",
    ctaTitle: 'Ready to ship on OCI?',
    ctaBody:
      'Go deeper with the full production series — the six-plane enterprise architecture, six agent orchestration patterns, and the operating model that gets an OCI deployment through a 3am incident.',
    outcomes: [
      'Call Cohere Command A, Command A Vision, and Command A Reasoning through OCI Generative AI',
      'Query an Autonomous Database in natural language with Select AI',
      'Build an agent with Agent Hub using an open-source framework (LangGraph, CrewAI) on OCI',
      'Judge when OCI is the right call — specifically, when your data already lives in Oracle',
      'Apply the six-plane enterprise architecture pattern to a real OCI GenAI deployment',
    ],
    relatedGuides: [
      '/blog/production-llm-agents-oci-part-1-architecture',
      '/blog/production-llm-agents-oci-part-2-agent-patterns',
      '/blog/production-llm-agents-oci-part-3-operating-model',
      '/blog/oracle-genai-agents-vs-langgraph-crewai-2026',
      '/learn/aws-bedrock-mastery',
      '/learn/azure-ai-foundry-mastery',
    ],
    videos: [
      {
        id: 'oci-genai-day-one-beyond',
        youtubeId: 'jV4hI2-eHHw',
        title: 'Day One and Beyond: Getting Started with Oracle Enterprise AI',
        creator: youtubeChannels.oracleDevelopers.name,
        creatorChannel: youtubeChannels.oracleDevelopers.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          "Entry point into Oracle's enterprise AI ecosystem — overview of the offerings and real-world use cases for OCI Generative AI deployments.",
        tags: ['oci', 'enterprise-ai', 'overview'],
      },
      {
        id: 'oci-select-ai-getting-started',
        youtubeId: 'rnsnIYYZzr4',
        title: 'Getting Started with Oracle Select AI - generative AI and your database',
        creator: youtubeChannels.oracleDevelopers.name,
        creatorChannel: youtubeChannels.oracleDevelopers.url,
        duration: 'See YouTube',
        level: 'beginner',
        description:
          'Select AI lets an Autonomous Database answer natural-language questions in SQL directly — the standout feature covered in this portal.',
        tags: ['select-ai', 'database', 'natural-language'],
      },
      {
        id: 'oci-agent-framework-build',
        youtubeId: 'eIkj4H-S_FQ',
        title: "Build Agentic AI Solutions with Oracle Cloud Infrastructure's AI Agent Framework",
        creator: youtubeChannels.oracleDevelopers.name,
        creatorChannel: youtubeChannels.oracleDevelopers.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description:
          "Building intelligent, agentic solutions with OCI's AI Agent Framework — the foundation Agent Hub builds on.",
        tags: ['agent-framework', 'agents', 'agentic-ai'],
      },
      {
        id: 'oci-zero-to-hero-agentic',
        youtubeId: 'HEXeBZIL4q4',
        title: 'Day One & Beyond: Build Agentic AI apps, from Zero to Hero, on Oracle Cloud',
        creator: youtubeChannels.oracleDevelopers.name,
        creatorChannel: youtubeChannels.oracleDevelopers.url,
        duration: 'See YouTube',
        level: 'advanced',
        description:
          'The deepest end-to-end build in this portal — a full agentic app on OCI Generative AI with MCP, from a blank project to a working system.',
        tags: ['agentic-ai', 'mcp', 'advanced'],
      },
    ],
    ecosystem: [
      {
        name: 'OCI Generative AI',
        category: 'Surface',
        description:
          "Oracle's managed generative AI service — Cohere Command models today, with Select AI and Agent Hub layered on top for database and agent workflows.",
        href: 'https://www.oracle.com/artificial-intelligence/generative-ai/generative-ai-service/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Cohere Command A',
        category: 'Reasoning',
        description:
          '111-billion-parameter model, 150% the throughput of its predecessor on just 2 GPUs, 256K context window, native multi-step tool use.',
        href: 'https://docs.oracle.com/en-us/iaas/Content/generative-ai/cohere-models.htm',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Cohere Command A Vision / Reasoning',
        category: 'Capability',
        description:
          'Command A Vision adds multimodal text+image support. Command A Reasoning is tuned for advanced agentic tool-use — the pair Agent Hub builds on.',
        href: 'https://blogs.oracle.com/ai-and-datascience/oci-generative-ai-adds-cohere-command-a-models',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'OCI Agent Hub',
        category: 'Agents',
        description:
          'Build, deploy, and manage AI agents with native Oracle and third-party system integration, plus out-of-the-box support for open-source agent frameworks.',
        href: 'https://www.oracle.com/artificial-intelligence/enterprise-ai/',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Select AI',
        category: 'Database',
        description:
          'Query an Autonomous Database in natural language — Select AI converts the prompt to SQL using your chosen LLM provider, including OCI Generative AI itself.',
        href: 'https://www.oracle.com/autonomous-database/select-ai/',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
      {
        name: 'Cohere SDK on OCI',
        category: 'API',
        description:
          'Native integration means code written for the Cohere Python SDK runs against OCI Generative AI with minimal changes — no separate client library to learn.',
        href: 'https://docs.cohere.com/docs/oracle-cloud-infrastructure-oci',
        status: 'New',
        lastVerified: '2026-07-06',
      },
      {
        name: 'OCI Documentation — Generative AI',
        category: 'Reference',
        description:
          'The official reference for models, Select AI examples, Agent Hub setup, and release notes.',
        href: 'https://docs.oracle.com/en-us/iaas/Content/generative-ai/pretrained-models.htm',
        status: 'Updated',
        lastVerified: '2026-07-06',
      },
    ],
    announcements: [
      {
        date: '2026-05-01',
        title: 'Cohere Command A Vision and Command A Reasoning launch on OCI',
        summary:
          'New multimodal (Vision) and agentic-tool-use-tuned (Reasoning) variants join Command A in the OCI Generative AI catalog.',
        source: 'https://blogs.oracle.com/ai-and-datascience/oci-generative-ai-adds-cohere-command-a-models',
        tag: 'Launch',
      },
      {
        date: '2026-04-01',
        title: 'Cohere SDK natively integrated with OCI',
        summary:
          'Code written for the Cohere Python SDK now runs against OCI Generative AI Cohere models directly — no separate client library required.',
        source: 'https://blogs.oracle.com/ai-and-datascience/cohere-sdk-is-now-natively-integrated-with-oci-ai',
        tag: 'Update',
      },
      {
        date: '2026-06-01',
        title: "What's new in Oracle AI — June 2026 roundup",
        summary:
          'Oracle\'s running monthly roundup of Generative AI, Select AI, and Agent Hub updates — the fastest way to see what shipped this month.',
        source: 'https://blogs.oracle.com/ai-and-datascience/whats-new-in-ai-june-2026',
        tag: 'Update',
      },
    ],
    experts: [
      {
        name: 'Oracle Developers',
        role: 'Official channel — OCI Generative AI, Select AI, Agent Hub',
        channelUrl: youtubeChannels.oracleDevelopers.url,
        why: 'First-party technical content on OCI, Select AI, and Agent Hub — conference sessions, tutorials, and how-tos direct from Oracle.',
        isOfficial: true,
      },
      {
        name: 'AI Engineer',
        role: 'Conference talks — production agent patterns',
        channelUrl: youtubeChannels.aiEngineer.url,
        why: 'Practitioner talks on agent architecture that apply directly to Agent Hub and OCI production deployments.',
      },
      {
        name: 'freeCodeCamp.org',
        role: 'Long-form courses — enterprise cloud AI',
        channelUrl: youtubeChannels.freeCodeCamp.url,
        why: 'Full-length, no-cost courses that put OCI Generative AI in context alongside the other major cloud AI platforms.',
      },
    ],
    faqs: [
      {
        question: 'What is OCI Generative AI?',
        answer:
          "Oracle's managed generative AI service, currently running on Cohere's Command model family, with Select AI (natural-language database queries) and Agent Hub (agent building and deployment) layered on top.",
      },
      {
        question: 'What is Select AI?',
        answer:
          'A feature of Oracle Autonomous Database that converts natural-language questions into SQL using your chosen LLM provider — OCI Generative AI, Google Gemini, Azure OpenAI, Anthropic, and more. It is the standout feature for teams whose data already lives in Oracle.',
      },
      {
        question: 'What is Cohere Command A?',
        answer:
          'A 111-billion-parameter model delivering 150% the throughput of its predecessor Command R+ on just two GPUs, with a 256K context window and native multi-step tool use — the model behind most OCI Agent Hub workflows.',
      },
      {
        question: 'What is OCI Agent Hub?',
        answer:
          'A feature for building, deploying, and managing AI agents on OCI — combining Cohere Command models with native Oracle and third-party system integration, plus out-of-the-box support for open-source agent frameworks like LangGraph and CrewAI.',
      },
      {
        question: 'Do I need to learn a new SDK for Cohere models on OCI?',
        answer:
          'No — the Cohere Python SDK is natively integrated with OCI Generative AI, so existing Cohere code runs against OCI with minimal changes.',
      },
      {
        question: "What's the difference between Command A, Command A Vision, and Command A Reasoning?",
        answer:
          'Command A is the base 111B-parameter model with 256K context and native tool use. Command A Vision adds multimodal text+image support. Command A Reasoning is tuned specifically for advanced agentic tool-use workflows — the variant Agent Hub leans on most.',
      },
      {
        question: 'When should I choose OCI over Bedrock or Foundry?',
        answer:
          "When your data already lives in an Oracle Autonomous Database — Select AI's natural-language-to-SQL is unique to this stack. See [AWS Bedrock](/learn/aws-bedrock-mastery) if you're IAM/VPC-native on AWS, or [Microsoft Foundry](/learn/azure-ai-foundry-mastery) if you need Microsoft 365 / Fabric connectivity instead.",
      },
      {
        question: 'Where can I read about real production OCI deployments?',
        answer:
          'See the [six-plane enterprise architecture](/blog/production-llm-agents-oci-part-1-architecture), [agent orchestration patterns](/blog/production-llm-agents-oci-part-2-agent-patterns), and [operating model](/blog/production-llm-agents-oci-part-3-operating-model) series — independent analysis of what it actually takes to run production LLM agents on OCI, not a product tour.',
      },
      {
        question: "Where do I start if I'm new to OCI Generative AI?",
        answer:
          'Watch video 1 (the enterprise overview) for the full landscape, then video 2 (Select AI) if your data lives in an Autonomous Database — it is the fastest path to a distinctly-Oracle win. Come back for Agent Hub once you need agents, not before.',
      },
    ],
  },
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
