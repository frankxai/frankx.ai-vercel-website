/**
 * Curated head-to-head comparisons. Each becomes a programmatic SEO page at
 * /llm-hub/compare/[slug]. Comparison queries ("X vs Y") are high-volume,
 * high-intent, and poorly served by quality content — this is the wedge.
 *
 * slug convention: `${a}-vs-${b}` using registry model ids.
 *
 * June 2026 refresh: marquee current matchups added (Opus 4.8 / GPT-5.5 /
 * Grok 4.3 / DeepSeek V4 / Qwen3.7-Max / Kimi K2.6 / gpt-oss / Gemma 4).
 * Earlier-generation pages are kept (URLs preserved) with a currency note.
 * Verified-vs-vendor-claimed distinctions are called out where it matters.
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
  // ─────────────────────────────────────────────────────────────────────────
  // Fable 5 launch matchups (June 2026)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'claude-fable-5-vs-claude-opus-4-8',
    models: ['claude-fable-5', 'claude-opus-4-8'],
    title: 'Claude Fable 5 vs Claude Opus 4.8',
    description:
      'Claude Fable 5 vs Opus 4.8: launch benchmarks, pricing, and four first-party eval rounds with published receipts. Which Claude flagship to route where in 2026.',
    verdict:
      'Fable 5 takes agentic coding, constraint precision, and hard reasoning — at double the price. Opus 4.8 keeps situational judgment, code-craft quality, and the better $/token for human-read prose. Route by task shape, not by leaderboard.',
    analysis: [
      'This is the rare comparison with first-party data behind it: we ran four head-to-head eval rounds inside Claude Code within 24 hours of the Fable 5 launch, with published JSON receipts. The split is consistent — Fable 5 was the most constraint-compliant model in every round (7/7 on a script-verified constraint stack Opus failed) and the only one to solve a hard no-tools reasoning task Opus got confidently wrong. Opus 4.8 flagged a governance-gated edit Fable executed silently, pushed back on a contradictory spec, and won the real-world component build on accessibility craft.',
      'On vendor numbers, Fable 5 is the new agentic ceiling: 95.0% SWE-Bench Verified and ~80% SWE-Bench Pro at launch (vendor-claimed) against Opus 4.8’s well-corroborated 88.6% / 69.2%. Anthropic positions the gap as widening with task length — which matches the agentic shape of the launch card.',
      'Pricing is the routing fork: Fable 5 at $10/$50 per million tokens is exactly double Opus 4.8’s unchanged $5/$25 (and equal to Opus fast mode). The 2× pays for itself in agentic pipelines where constraint precision and task length bind; it does not pay for itself in judgment-heavy review or prose — our blind style verdicts flipped between rounds.',
    ],
    pickFirst: [
      'Agentic pipelines feeding schemas, tools, and other agents',
      'Long-horizon, multi-file coding (the SWE-Bench Pro lead is this shape)',
      'Strict output contracts where a leaked preamble is a failed tool call',
    ],
    pickSecond: [
      'Ambiguous or possibly-wrong specs — it pushes back instead of executing',
      'Code review and accessibility-critical component work',
      'Human-read prose and deep single-shot analysis at half the price',
    ],
    keywords: [
      'claude fable 5 vs opus 4.8',
      'fable 5 vs opus',
      'claude fable 5 comparison',
      'fable 5 benchmarks vs opus',
      'should i upgrade to fable 5',
      'best claude model 2026',
    ],
  },
  {
    slug: 'claude-fable-5-vs-gpt-5-5',
    models: ['claude-fable-5', 'gpt-5-5'],
    title: 'Claude Fable 5 vs GPT-5.5',
    description:
      'Claude Fable 5 vs GPT-5.5 (Spud): SWE-Bench Pro 80% vs 58.6%, pricing, computer use, and which flagship to pick for agentic coding in 2026.',
    verdict:
      'Fable 5 leads agentic coding by a generation-sized margin on launch numbers; GPT-5.5 keeps computer-use, terminal autonomy, and native voice. Different ceilings for different jobs.',
    analysis: [
      'The launch-window headline is the SWE-Bench Pro gap: Fable 5 at ~80% versus GPT-5.5’s 58.6% — a 21-point lead on a contamination-resistant agentic-coding benchmark (vendor-claimed until independently reproduced). Fable 5 also posts 95.0% SWE-Bench Verified and leads both FrontierCode subsets. GPT-5.5’s strengths sit on a different axis: 84.9% GDPval, 78.7% OSWorld computer use, 98% Tau2 Telecom, and native voice.',
      'Pricing favors GPT-5.5 on paper — $5/$30 against Fable 5’s $10/$50 — but GPT-5.5’s figure already reflects its April doubling, and output-heavy agentic work narrows the real-world gap via token efficiency. For pure coding-agent workloads the benchmark delta dominates the price delta; for computer-use automation the reverse.',
      'Honest caveat: we have four first-party eval rounds for Fable 5 vs Opus 4.8 (receipts published), but no first-party Fable-vs-GPT rounds yet — this comparison rests on launch-window vendor figures from both labs. We mark claims accordingly and will receipt a cross-lab round.',
    ],
    pickFirst: [
      'Agentic coding is the core workload (SWE-Bench Pro / Verified lead)',
      'You operate inside Claude Code or the Anthropic agent stack',
      'Long-horizon tasks where the lead reportedly widens',
    ],
    pickSecond: [
      'Computer-use / OSWorld-style autonomous desktop automation',
      'Customer-workflow agents (Tau2 Telecom 98%) and native voice',
      'Output-heavy workloads where $5/$30 plus token efficiency wins',
    ],
    keywords: [
      'claude fable 5 vs gpt-5.5',
      'fable 5 vs gpt 5.5',
      'fable 5 vs spud',
      'best ai model for coding 2026',
      'swe bench pro fable 5',
      'anthropic vs openai 2026',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Current marquee matchups (June 2026)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'claude-opus-4-8-vs-gpt-5-5',
    models: ['claude-opus-4-8', 'gpt-5-5'],
    title: 'Claude Opus 4.8 vs GPT-5.5',
    description:
      'Claude Opus 4.8 vs GPT-5.5: benchmarks, pricing, and which frontier model to use for reasoning, agentic coding, and computer use in 2026.',
    verdict:
      'Opus 4.8 leads aggregate intelligence and SWE-Bench Pro; GPT-5.5 wins computer-use, terminal-agent loops, and native voice. The split is real enough to run both.',
    analysis: [
      'These are the two flagship picks of mid-2026. Claude Opus 4.8 tops the aggregate intelligence index — GDPval-AA 1890 and SWE-Bench Pro 69.2% lead the field — with a 1M-token context and unchanged $5/$25 pricing. GPT-5.5 ("Spud") answers with the strongest published computer-use and knowledge-work scores: 84.9% GDPval, 78.7% OSWorld, 98% Tau2 Telecom, and a narrow terminal-agent edge.',
      'Cost is a genuine differentiator. Opus 4.8 held its price; GPT-5.5 doubled output to $30/1M, offset only on output-heavy workloads by a ~40% token-efficiency gain. For most builders, Opus 4.8 is the cheaper path to top-tier reasoning, while GPT-5.5 earns its premium where computer-use autonomy or native voice is the bottleneck.',
      'Honest caveat: GPT-5.5’s SWE-bench Verified and ARC-AGI-2 figures vary across sources and are treated cautiously; Opus 4.8’s GPQA/USAMO numbers lean on Anthropic’s own evals. The coding and GDPval deltas are the well-corroborated ones.',
    ],
    pickFirst: [
      'Hardest reasoning and codebase-scale work (SWE-Bench Pro lead)',
      'You want top-tier capability at unchanged $5/$25',
      '1M context with the strongest long-horizon agentic depth',
    ],
    pickSecond: [
      'Computer-use / OSWorld automation is the bottleneck',
      'Terminal-agent and Codex-style autonomous loops',
      'Native voice is core to the product',
    ],
    keywords: [
      'claude opus 4.8 vs gpt-5.5',
      'opus 4.8 vs gpt 5.5 benchmarks',
      'best frontier model 2026',
      'claude vs gpt 2026',
    ],
  },
  {
    slug: 'deepseek-v4-vs-claude-opus-4-8',
    models: ['deepseek-v4', 'claude-opus-4-8'],
    title: 'DeepSeek V4 vs Claude Opus 4.8',
    description:
      'DeepSeek V4 vs Claude Opus 4.8: open-weight MIT frontier vs the closed intelligence leader. Cost, self-host, and capability compared for 2026.',
    verdict:
      'Opus 4.8 is the stronger model outright; DeepSeek V4 is the open-weight value play — frontier-class coding at roughly a third of the price, and you can own the weights.',
    analysis: [
      'This is the open-vs-closed decision at the top of the market. DeepSeek V4 (MIT, open weights) posts 80.6% SWE-bench Verified and an Artificial Analysis Intelligence Index around 52 — genuinely frontier-adjacent — at roughly $1.74/$3.48 per 1M via API, or $0 marginal cost self-hosted. Claude Opus 4.8 leads the aggregate index (GDPval-AA 1890, SWE-Bench Pro 69.2%) and brings a 1M context plus deep agentic tooling.',
      'The gap is real but narrower than the price gap. Independent US-government testing (NIST/CAISI) put the DeepSeek line a few months behind the closed frontier — so for the hardest reasoning and longest-horizon agents, Opus 4.8 still wins. For high-volume coding, data control, or sovereignty, DeepSeek V4 delivers most of the capability at a fraction of the cost.',
      'Rule of thumb: route the expensive-failure, top-of-funnel reasoning to Opus 4.8 and run the high-volume, verifiable, or data-sensitive work on self-hosted DeepSeek V4.',
    ],
    pickFirst: [
      'You want open weights / self-hosting under MIT',
      'High-volume coding at a fraction of frontier cost',
      'Data sovereignty or air-gapped deployment',
    ],
    pickSecond: [
      'You need the absolute top of the intelligence index',
      '1M-context synthesis and long-horizon agentic depth',
      'Managed reliability over owning the stack',
    ],
    keywords: [
      'deepseek v4 vs claude opus 4.8',
      'open weight vs closed frontier 2026',
      'deepseek v4 benchmarks',
      'best open source llm vs claude',
    ],
  },
  {
    slug: 'grok-4-3-vs-gpt-5-5',
    models: ['grok-4-3', 'gpt-5-5'],
    title: 'Grok 4.3 vs GPT-5.5',
    description:
      'Grok 4.3 vs GPT-5.5: the budget-frontier vs premium-flagship tradeoff. Intelligence, price, and speed compared for 2026 builders.',
    verdict:
      'GPT-5.5 is clearly the stronger model; Grok 4.3 delivers a large share of the capability at roughly a fifth of the price — the budget-frontier default.',
    analysis: [
      'Grok 4.3 is xAI’s value play: an Artificial Analysis Intelligence Index of 53 and GDPval-AA around 1500 at $1.25/$2.50 per 1M — the cheapest frontier-class price, with fast output and a 2M-token window. GPT-5.5 sits higher on intelligence (84.9% GDPval, 78.7% OSWorld) but costs $5/$30 and is tuned for the hardest agentic and computer-use work.',
      'The decision is almost entirely about where the task sits on the value curve. For high-volume, cost-sensitive workloads where "good enough frontier" wins, Grok 4.3 is hard to beat on price-per-intelligence. For the steps where capability is the bottleneck — autonomous computer use, the hardest coding — GPT-5.5 earns its premium.',
      'A common pattern: Grok 4.3 as the cost-anchored default runtime, GPT-5.5 reserved for the critical path.',
    ],
    pickFirst: [
      'Cheapest frontier-class intelligence ($1.25/$2.50)',
      'High-volume workloads where cost compounds',
      '2M context and fast output matter',
    ],
    pickSecond: [
      'You need the stronger model on hard agentic tasks',
      'Computer-use / OSWorld automation',
      'Native voice and broad multimodal',
    ],
    keywords: [
      'grok 4.3 vs gpt-5.5',
      'cheapest frontier model 2026',
      'grok 4.3 pricing vs openai',
      'budget llm vs gpt',
    ],
  },
  {
    slug: 'qwen3-7-max-vs-deepseek-v4',
    models: ['qwen3-7-max', 'deepseek-v4'],
    title: 'Qwen3.7-Max vs DeepSeek V4',
    description:
      'Qwen3.7-Max vs DeepSeek V4: the open-frontier showdown — closed top-5 intelligence vs MIT open weights. Cost, capability, and control for 2026.',
    verdict:
      'Qwen3.7-Max has the higher raw intelligence but is closed and API-only; DeepSeek V4 is open-weight MIT, cheaper, and self-hostable. Capability vs control.',
    analysis: [
      'Both are the leading Chinese-lab flagships, but they sit on opposite sides of the open-weight line. Qwen3.7-Max posts a top-5 Artificial Analysis Intelligence Index of 56.6 and a documented 35-hour autonomous run — but it is closed-weight, API-only ($2.50/$7.50), with an undisclosed architecture. DeepSeek V4 trails slightly on aggregate (~52) yet ships under MIT as open weights you can self-host, at lower cost.',
      'If your priority is the highest capability-per-dollar via an API and you can live with a closed model, Qwen3.7-Max leads. If you need to own the weights, audit the model, or deploy in a sovereign/air-gapped setting, DeepSeek V4 is the only one of the two that qualifies.',
      'Caveat: several of Qwen3.7-Max’s headline figures (the 35-hour run, some coding evals) are vendor-claimed and pending independent reproduction; it is also a verbose reasoner, so effective cost-per-task runs above the rate card.',
    ],
    pickFirst: [
      'Highest open-frontier intelligence via API',
      'Long autonomous tool-loops (35-hour demo)',
      'Anthropic Messages-compatible harness (Claude Code)',
    ],
    pickSecond: [
      'You need open weights you can self-host (MIT)',
      'Lower cost and auditable architecture',
      'Sovereign / air-gapped deployment',
    ],
    keywords: [
      'qwen3.7-max vs deepseek v4',
      'best chinese ai model 2026',
      'qwen vs deepseek open weights',
      'open frontier model comparison',
    ],
  },
  {
    slug: 'kimi-k2-6-vs-deepseek-v4',
    models: ['kimi-k2-6', 'deepseek-v4'],
    title: 'Kimi K2.6 vs DeepSeek V4',
    description:
      'Kimi K2.6 vs DeepSeek V4: the top open-weights matchup of 2026. Intelligence index, coding, license, and self-host compared.',
    verdict:
      'Kimi K2.6 edges the open-weights intelligence lead; DeepSeek V4 counters with MIT licensing, strong coding, and a deeper ecosystem. Both are self-hostable giants.',
    analysis: [
      'This is the fight for "best model you can actually download." Kimi K2.6 (Moonshot, ~1T-parameter MoE) holds the highest open-weights Artificial Analysis Intelligence Index at 54; DeepSeek V4 sits just behind at ~52 but pairs frontier-class coding (80.6% SWE-bench Verified) with a clean MIT license and broad tooling support.',
      'For a pure intelligence ceiling among open weights, Kimi K2.6 is the pick. For coding-heavy pipelines, license clarity, and ecosystem maturity, DeepSeek V4 is the safer foundation. Both are large MoE models that need a multi-GPU server to self-host — neither is a single-consumer-GPU option.',
      'Caveat: some of Kimi K2.6’s coding evals are vendor-reported; the Intelligence Index placement is the independently measured signal.',
    ],
    pickFirst: [
      'Highest open-weights intelligence (AA 54)',
      'General reasoning and agentic breadth',
      'You want the top downloadable model',
    ],
    pickSecond: [
      'Coding-heavy pipelines (SWE-bench lead)',
      'MIT license clarity and ecosystem maturity',
      'You want a proven self-host coding foundation',
    ],
    keywords: [
      'kimi k2.6 vs deepseek v4',
      'best open weights model 2026',
      'kimi vs deepseek',
      'top open source llm',
    ],
  },
  {
    slug: 'gpt-oss-vs-gemma-4',
    models: ['gpt-oss', 'gemma-4'],
    title: 'gpt-oss vs Gemma 4',
    description:
      'gpt-oss vs Gemma 4: the best self-host model for one GPU. Reasoning-per-VRAM, multimodality, license, and hardware compared for 2026.',
    verdict:
      'Gemma 4 wins for multimodal work on a single consumer GPU; gpt-oss wins on reasoning-per-gigabyte and scales to 120b on one 80GB card. Both are Apache 2.0.',
    analysis: [
      'These are the two best "runs on my hardware" open models. Gemma 4’s 31B dense flagship fits in roughly 18GB at Q4 — one consumer GPU — adds native vision (and audio on the smaller tiers), and posts a 1452 LMArena Elo. gpt-oss ships 20b (~16GB) and 120b (one 80GB GPU) MoE variants tuned for the best reasoning-per-VRAM with adjustable reasoning effort.',
      'Pick by constraint. If you want multimodality and the strongest single-consumer-GPU quality, Gemma 4 is the default. If you want maximum reasoning that still fits on one card — or the headroom to scale to 120b on an 80GB GPU — gpt-oss is the sharper tool. Both carry clean Apache 2.0 licenses, so neither adds legal friction.',
      'For an edge deployment, also weigh Gemma 4’s E2B/E4B tiers and Phi-4 — they go smaller than either flagship here.',
    ],
    pickFirst: [
      'Reasoning-per-VRAM on one GPU; scales to 120b on 80GB',
      'Adjustable reasoning effort',
      'Pure text/reasoning self-host',
    ],
    pickSecond: [
      'Native multimodal (vision/audio) on one consumer GPU',
      'Strongest single-card general quality (LMArena 1452)',
      'Google-ecosystem tooling + small E2B/E4B tiers',
    ],
    keywords: [
      'gpt-oss vs gemma 4',
      'best self-host llm 2026',
      'best local model one gpu',
      'open weight model comparison',
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // Earlier-generation pages — kept for URL/SEO continuity, with a currency note.
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'gemini-3-5-flash-vs-claude-opus-4-6',
    models: ['gemini-3-5-flash', 'claude-opus-4-6'],
    title: 'Gemini 3.5 Flash vs Claude Opus 4.6',
    description:
      'Gemini 3.5 Flash vs Claude Opus 4.6: benchmarks, pricing, and which to use for agentic coding, reasoning, and long-context work in 2026.',
    verdict:
      'Different tiers, different jobs. Flash wins cost-sensitive agentic coding (76.2% Terminal-Bench 2.1); Opus 4.6 wins high-stakes reasoning. Note: Opus 4.6 is now superseded by Opus 4.8 — see Opus 4.8 vs GPT-5.5 for the current flagship matchup.',
    analysis: [
      'These are the two ends of a sensible routing strategy. Gemini 3.5 Flash, announced at Google I/O ’26, posts frontier agentic-coding numbers (76.2% Terminal-Bench 2.1, 83.6% MCP Atlas) at less than half the cost of comparable flagships. Claude Opus 4.6 led abstract reasoning (68.8% ARC-AGI-2), computer-use (72.7% OSWorld), and offered a 1M-token beta context with Agent Teams.',
      'For a production agentic system, the cost delta is large enough to be architectural: route routine and high-volume steps to Flash, reserve the top Claude tier for the critical reasoning path. Running both is usually correct.',
      'Currency note: Opus 4.6 has since been superseded by Opus 4.8 (May 2026), which now tops the intelligence index. The Flash routing logic here still holds against the current Opus tier.',
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
      'claude opus vs gemini',
    ],
  },
  {
    slug: 'claude-opus-4-6-vs-gpt-5-2-pro',
    models: ['claude-opus-4-6', 'gpt-5-2-pro'],
    title: 'Claude Opus 4.6 vs GPT-5.2 Pro',
    description:
      'Claude Opus 4.6 vs GPT-5.2 Pro: reasoning, multimodal, voice, and pricing compared. Both are now superseded — see the current flagship matchup.',
    verdict:
      'Opus 4.6 for reasoning and long-context depth; GPT-5.2 Pro for native voice and the broadest multimodal footprint. Note: both are superseded — Opus 4.8 and GPT-5.5 are the current flagships; see Opus 4.8 vs GPT-5.5.',
    analysis: [
      'Claude Opus 4.6 led the reasoning benchmarks that matter for hard agentic work — 68.8% ARC-AGI-2 (vs 54.2%), 72.7% OSWorld, 90.2% BigLaw Bench — plus a 1M-token beta context and the Compaction API for effectively unbounded sessions.',
      'GPT-5.2 Pro answered with breadth: native audio modality, strong general multimodal performance, the first 90% ARC-AGI-1, and the widest enterprise integration ecosystem. For voice-native products there was no close runner-up.',
      'Currency note: this matchup is preserved for reference. Opus 4.6 has been superseded by Opus 4.8 (May 2026) and GPT-5.2 Pro by GPT-5.5 (April 2026). For a current decision, see Claude Opus 4.8 vs GPT-5.5.',
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
      'Flash for cost-efficient agentic coding at scale; GPT-5.2 Pro for voice-native and broad multimodal apps. Note: GPT-5.2 Pro is superseded by GPT-5.5 — see Grok 4.3 vs GPT-5.5 or Opus 4.8 vs GPT-5.5 for current matchups.',
    analysis: [
      'Gemini 3.5 Flash is built for the agent runtime: 76.2% Terminal-Bench 2.1, 83.6% MCP Atlas, 1M context, at sub-flagship pricing. If your bottleneck is running many agent steps affordably, Flash is hard to beat.',
      'GPT-5.2 Pro was the generalist with native voice and the deepest integration ecosystem — the better default for consumer-facing multimodal and voice products, less optimal as a high-volume coding-agent runtime on cost grounds.',
      'Currency note: GPT-5.2 Pro has since been superseded by GPT-5.5 (April 2026), which extends the lead on computer-use and knowledge work. The Flash-as-runtime logic still applies against the current OpenAI flagship.',
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
    slug: 'claude-sonnet-4-5-vs-gemini-3-5-flash',
    models: ['claude-sonnet-4-5', 'gemini-3-5-flash'],
    title: 'Claude Sonnet 4.5 vs Gemini 3.5 Flash',
    description:
      'Claude Sonnet 4.5 vs Gemini 3.5 Flash: the mid-tier workhorse comparison for production coding and content agents.',
    verdict:
      'Gemini 3.5 Flash edges ahead on agentic-coding benchmarks and cost; Claude Sonnet 4.5 remains a proven production workhorse. Note: Sonnet 4.6 (Feb 2026) is the current Anthropic mid-tier.',
    analysis: [
      'This is the mid-tier decision most teams actually face. Gemini 3.5 Flash posts stronger published agentic-coding numbers at lower cost and ships with 1M context. Claude Sonnet 4.5 is the battle-tested workhorse with excellent Claude Code / Agent SDK integration and predictable behavior.',
      'If you are already on Claude Code and value the tooling, the Sonnet tier is a safe, strong default. If you are cost-optimizing a high-volume agent runtime from scratch, Flash is the sharper pick.',
      'Currency note: Sonnet 4.6 (February 2026) is now the current Anthropic mid-tier — a 1M-context upgrade that approaches Opus 4.6 at ~40% lower cost — and is the version to actually deploy in this slot.',
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
