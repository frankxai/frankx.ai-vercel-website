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
    ],
    videos: [
      {
        id: 'claude-prompts',
        youtubeId: 'T9aRN5JkmL8',
        title: 'AI prompt engineering: A deep dive',
        creator: 'Anthropic',
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
        creator: 'Anthropic',
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
    ],
    ecosystem: [
      {
        name: 'Claude (Web + Apps)',
        category: 'Surface',
        description:
          'The flagship consumer surface at claude.ai — chat, Projects, Artifacts, file uploads, and the launchpad for trying every model variant.',
        href: 'https://claude.ai/',
        status: 'Updated',
      },
      {
        name: 'Claude API',
        category: 'API',
        description:
          'The developer entry point (formerly the Anthropic API). Streaming, tool use, prompt caching, batches, Files API, vision, and PDF support.',
        href: 'https://docs.claude.com/en/api/overview',
        status: 'Updated',
      },
      {
        name: 'Claude Code',
        category: 'Builder Surface',
        description:
          'The terminal-first coding companion. Now available as a CLI, in VS Code / JetBrains, on the web at claude.ai/code, and on mobile via the Claude apps.',
        href: 'https://docs.claude.com/en/docs/claude-code/overview',
        status: 'Updated',
      },
      {
        name: 'Claude Agent SDK',
        category: 'Agents',
        description:
          'Build autonomous agent loops with the same primitives Claude Code uses — sub-agents, hooks, settings, slash commands, MCP servers.',
        href: 'https://docs.claude.com/en/api/agent-sdk',
        status: 'New',
      },
      {
        name: 'Model Context Protocol (MCP)',
        category: 'Protocol',
        description:
          'Anthropic-led open protocol for connecting Claude to data sources and tools. Reference servers + a fast-growing ecosystem across vendors.',
        href: 'https://modelcontextprotocol.io/',
        status: 'GA',
      },
      {
        name: 'Computer Use',
        category: 'Capability',
        description:
          "Lets Claude see a screen and operate a mouse and keyboard. Good for desktop automation, QA, and form-filling where there's no API.",
        href: 'https://docs.claude.com/en/docs/build-with-claude/computer-use',
        status: 'Updated',
      },
      {
        name: 'Skills',
        category: 'Capability',
        description:
          'Reusable Claude capabilities (e.g. visual-creation, deep-research, security-review) authored as folders of instructions + scripts. Compose into agent workflows.',
        href: 'https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview',
        status: 'New',
      },
      {
        name: 'Claude on Amazon Bedrock',
        category: 'Cloud',
        description:
          'Claude as a fully-managed model in AWS Bedrock — IAM, VPC, CloudWatch, Knowledge Bases, and Bedrock Agents come for free if you already live in AWS.',
        href: 'https://docs.claude.com/en/api/claude-on-amazon-bedrock',
        status: 'GA',
      },
      {
        name: 'Claude on Vertex AI',
        category: 'Cloud',
        description:
          'Claude as a Vertex AI model — pair with BigQuery, GKE, and Google Cloud security boundaries. Useful when the rest of the stack is Google-native.',
        href: 'https://docs.claude.com/en/api/claude-on-vertex-ai',
        status: 'GA',
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
  // 7 additional portals queued for follow-up PRs (tracked in the /learn
  // expansion plan): AWS Bedrock, Azure AI Foundry, Oracle OCI GenAI,
  // OpenAI / ChatGPT, Suno AI Music, Midjourney, and NotebookLM Deep Work.
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
