/**
 * Curated head-to-head comparisons. Each becomes a programmatic SEO page at
 * /llm-hub/compare/[slug]. Comparison queries ("X vs Y") are high-volume,
 * high-intent, and poorly served by quality content — this is the wedge.
 *
 * slug convention: `${a}-vs-${b}` using registry model ids.
 */

export interface Comparison {
  slug: string
  /** Registry model ids, [a, b]. */
  models: [string, string]
  /** SEO H1 / title (≤ ~60 chars ideal). */
  title: string
  /** Meta description (≤ 160 chars). */
  description: string
  /** The one-line verdict — who wins, for whom. */
  verdict: string
  /** 2–4 short paragraphs of analysis. */
  analysis: string[]
  /** "Pick A if…" bullets. */
  pickFirst: string[]
  /** "Pick B if…" bullets. */
  pickSecond: string[]
  keywords: string[]
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'gemini-3-5-flash-vs-claude-opus-4-6',
    models: ['gemini-3-5-flash', 'claude-opus-4-6'],
    title: 'Gemini 3.5 Flash vs Claude Opus 4.6',
    description:
      'Gemini 3.5 Flash vs Claude Opus 4.6: benchmarks, pricing, and which to use for agentic coding, reasoning, and long-context work in 2026.',
    verdict:
      'Different tiers, different jobs. Flash wins cost-sensitive agentic coding (76.2% Terminal-Bench 2.1 at a fraction of the cost); Opus 4.6 wins high-stakes reasoning (68.8% ARC-AGI-2) and computer-use.',
    analysis: [
      'These are not direct competitors — they are the two ends of a sensible routing strategy. Gemini 3.5 Flash, announced at Google I/O ’26, posts frontier agentic-coding numbers (76.2% Terminal-Bench 2.1, 83.6% MCP Atlas) at less than half the cost of comparable flagships. Claude Opus 4.6 leads abstract reasoning (68.8% ARC-AGI-2), computer-use (72.7% OSWorld), and offers a 1M-token beta context with Agent Teams for parallel execution.',
      'For a production agentic system, the cost delta is large enough to be architectural: route routine and high-volume steps to Flash, reserve Opus 4.6 for the critical reasoning path. Running both is usually correct.',
      'Caveat: Gemini 3.5 Flash’s headline figures are vendor-published and pending independent reproduction. Opus 4.6’s ARC-AGI-2 lead is corroborated by the ARC Prize Foundation.',
    ],
    pickFirst: [
      'You run high-volume agent loops where cost compounds',
      'Your pipeline is MCP-tool-heavy',
      'You need 1M context cheaply',
    ],
    pickSecond: [
      'Abstract reasoning or computer-use is the bottleneck',
      'You need the strongest long-context synthesis',
      'You want parallel agent orchestration (Agent Teams)',
    ],
    keywords: [
      'gemini 3.5 flash vs claude opus 4.6',
      'gemini vs claude 2026',
      'best agentic coding model',
      'claude opus 4.6 vs gemini',
    ],
  },
  {
    slug: 'claude-opus-4-6-vs-gpt-5-2-pro',
    models: ['claude-opus-4-6', 'gpt-5-2-pro'],
    title: 'Claude Opus 4.6 vs GPT-5.2 Pro',
    description:
      'Claude Opus 4.6 vs GPT-5.2 Pro: reasoning, multimodal, voice, and pricing compared. Which frontier model to pick in 2026.',
    verdict:
      'Opus 4.6 for reasoning and long-context depth; GPT-5.2 Pro for native voice and the broadest multimodal + integration footprint.',
    analysis: [
      'Claude Opus 4.6 leads the reasoning benchmarks that matter for hard agentic work — 68.8% ARC-AGI-2 (vs 54.2%), 72.7% OSWorld, 90.2% BigLaw Bench — plus a 1M-token beta context and the Compaction API for effectively unbounded sessions.',
      'GPT-5.2 Pro answers with breadth: native audio modality (voice in, voice out), strong general multimodal performance, the first 90% ARC-AGI-1, and the widest enterprise integration ecosystem. For voice-native products there is no close runner-up.',
      'Both are premium-tier. The choice usually comes down to modality needs (voice → GPT) versus reasoning depth and long-context synthesis (→ Opus).',
    ],
    pickFirst: [
      'Hard reasoning, computer-use, or legal/technical depth',
      'Long-context research synthesis (1M beta)',
      'Parallel agent orchestration',
    ],
    pickSecond: [
      'Native voice / audio is core to your product',
      'You need the broadest multimodal coverage',
      'You are standardized on the OpenAI ecosystem',
    ],
    keywords: [
      'claude opus 4.6 vs gpt-5.2 pro',
      'claude vs gpt 2026',
      'best reasoning model 2026',
      'gpt-5.2 vs claude',
    ],
  },
  {
    slug: 'gemini-3-5-flash-vs-gpt-5-2-pro',
    models: ['gemini-3-5-flash', 'gpt-5-2-pro'],
    title: 'Gemini 3.5 Flash vs GPT-5.2 Pro',
    description:
      'Gemini 3.5 Flash vs GPT-5.2 Pro: cost, agentic coding, multimodal, and voice compared for 2026 builders.',
    verdict:
      'Flash for cost-efficient agentic coding at scale; GPT-5.2 Pro for voice-native and broad multimodal applications.',
    analysis: [
      'Gemini 3.5 Flash is built for the agent runtime: 76.2% Terminal-Bench 2.1, 83.6% MCP Atlas, 1M context, at sub-flagship pricing. If your bottleneck is running many agent steps affordably, Flash is hard to beat.',
      'GPT-5.2 Pro is the generalist with native voice and the deepest integration ecosystem. It is the better default for consumer-facing multimodal and voice products, less optimal as a high-volume coding-agent runtime on cost grounds.',
      'For many builders the answer is both: Flash as the agent runtime, GPT-5.2 Pro at the voice/multimodal edge.',
    ],
    pickFirst: [
      'Cost-sensitive, high-volume agentic coding',
      'MCP-heavy tool pipelines',
      'Long-context at low cost',
    ],
    pickSecond: [
      'Voice is central to the product',
      'Broadest multimodal coverage needed',
      'Deep OpenAI ecosystem lock-in',
    ],
    keywords: [
      'gemini 3.5 flash vs gpt-5.2 pro',
      'gemini vs gpt 2026',
      'cheapest agentic model',
      'gemini flash pricing vs openai',
    ],
  },
  {
    slug: 'deepseek-v3-2-vs-gemini-3-5-flash',
    models: ['deepseek-v3-2', 'gemini-3-5-flash'],
    title: 'DeepSeek V3.2 vs Gemini 3.5 Flash',
    description:
      'DeepSeek V3.2 vs Gemini 3.5 Flash: the budget frontier showdown — open-weight MIT vs closed sub-flagship pricing.',
    verdict:
      'DeepSeek V3.2 wins on raw cost and open-weight control; Gemini 3.5 Flash wins on agentic-coding benchmarks and managed tooling.',
    analysis: [
      'Both target the cost-sensitive frontier. DeepSeek V3.2 is a 671B/37B MoE under MIT license at roughly $0.27 / $1.10 per 1M tokens — the most cost-effective frontier-class option, and self-hostable.',
      'Gemini 3.5 Flash costs a little more but brings stronger published agentic-coding numbers (76.2% Terminal-Bench 2.1), 1M context, and the managed Google tooling (AI Studio, Antigravity, Agent Platform).',
      'If you want to own the weights and minimize cost, DeepSeek. If you want the strongest managed agentic runtime at low cost, Flash.',
    ],
    pickFirst: [
      'You want open weights / self-hosting',
      'Absolute lowest cost per token',
      'MIT license matters',
    ],
    pickSecond: [
      'You want managed tooling + agent platform',
      'Agentic-coding benchmark performance matters',
      'You need 1M context out of the box',
    ],
    keywords: [
      'deepseek v3.2 vs gemini 3.5 flash',
      'cheapest llm 2026',
      'open weight vs gemini',
      'budget frontier model',
    ],
  },
  {
    slug: 'gemini-omni-vs-sora-2',
    models: ['gemini-omni', 'gpt-5-2-pro'],
    title: 'Gemini Omni vs Sora 2 (video generation)',
    description:
      'Gemini Omni vs Sora 2: AI video generation compared — editing control, integration, and creator workflows in 2026.',
    verdict:
      'Gemini Omni leads on natural-language editing and agentic integration; Sora 2 may still lead pure cinematic generation. Independent head-to-heads pending.',
    analysis: [
      'Gemini Omni (announced at Google I/O ’26) folds native video generation into the standard Gemini API — text/audio/image/video to dynamic video, with natural-language editing (swap subject, change background, regenerate camera angle). Because it lives in the Gemini surface, an agent can author, narrate, and produce a video in one tool-use sequence.',
      'Sora 2 (OpenAI) remains a strong dedicated video model with high cinematic fidelity. The structural difference: Omni is a capability of the flagship model and thus easier to wire into agentic content pipelines; Sora is a specialized product.',
      'Honest caveat: neither has been independently benchmarked head-to-head yet. Treat this as a positioning comparison, not a quality verdict.',
    ],
    pickFirst: [
      'You need natural-language video editing',
      'You want video inside an agentic pipeline',
      'You are in the Google / Gemini ecosystem',
    ],
    pickSecond: [
      'Pure cinematic generation fidelity is the goal',
      'You are in the OpenAI ecosystem',
      'You need Sora-specific creative controls',
    ],
    keywords: [
      'gemini omni vs sora 2',
      'best ai video generator 2026',
      'gemini video generation',
      'ai video editing model',
    ],
  },
  {
    slug: 'claude-sonnet-4-5-vs-gemini-3-5-flash',
    models: ['claude-sonnet-4-5', 'gemini-3-5-flash'],
    title: 'Claude Sonnet 4.5 vs Gemini 3.5 Flash',
    description:
      'Claude Sonnet 4.5 vs Gemini 3.5 Flash: the mid-tier workhorse comparison for production coding and content agents.',
    verdict:
      'Gemini 3.5 Flash edges ahead on agentic-coding benchmarks and cost; Claude Sonnet 4.5 remains a proven, well-integrated production workhorse.',
    analysis: [
      'This is the mid-tier decision most teams actually face. Gemini 3.5 Flash posts stronger published agentic-coding numbers at lower cost and ships with 1M context. Claude Sonnet 4.5 is the battle-tested workhorse with excellent Claude Code / Agent SDK integration and predictable behavior.',
      'If you are already on Claude Code and value the tooling, Sonnet 4.5 is a safe, strong default. If you are cost-optimizing a high-volume agent runtime from scratch, Flash is the sharper pick.',
      'A common pattern: Flash for the agent runtime, Sonnet/Opus for the steps where Claude’s behavior is a known quantity.',
    ],
    pickFirst: [
      'You are standardized on Claude Code / Agent SDK',
      'You value predictable, proven behavior',
      'You want tight Anthropic tooling',
    ],
    pickSecond: [
      'Cost-optimizing a new high-volume runtime',
      'You want stronger published coding benchmarks',
      'You need 1M context at mid-tier price',
    ],
    keywords: [
      'claude sonnet 4.5 vs gemini 3.5 flash',
      'mid tier llm comparison',
      'best production coding model',
      'sonnet vs gemini flash',
    ],
  },
]

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug)
}

/** Comparisons that involve a given model id — for cross-linking on model pages. */
export function comparisonsForModel(modelId: string): Comparison[] {
  return COMPARISONS.filter((c) => c.models.includes(modelId))
}
