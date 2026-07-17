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

export interface ArchitectRecommendation {
  /** The routing call, written as a working AI Architect's recommendation. */
  call: string
  /** Which AI Center of Excellence pillar this decision lives in. */
  coePillar?: string
  /** Per-agent-persona routing: which model each persona class should run. */
  personas?: Array<{ persona: string; pick: string }>
}

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
  /** Optional AI Architect Recommendation box (rendered above the analysis). */
  architect?: ArchitectRecommendation
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
    architect: {
      call: 'Run both, routed by task shape. In an AI Center of Excellence this is not an either/or — Fable 5 becomes the execution layer (agents whose outputs feed schemas, tools, and other agents), Opus 4.8 the judgment layer (review gates, ambiguous specs, human-read prose) at half the price. Our four receipted rounds support exactly this split and nothing stronger.',
      coePillar: 'Technology · model routing',
      personas: [
        { persona: 'Pipeline & coding agents', pick: 'Fable 5' },
        { persona: 'Reviewer / judgment agents', pick: 'Opus 4.8' },
        { persona: 'Research & synthesis agents', pick: 'Opus 4.8 (1M ctx at $5/$25)' },
        { persona: 'Bulk fan-out workers', pick: 'Haiku-tier — neither flagship' },
      ],
    },
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
    architect: {
      call: 'Split by autonomy surface. Coding agents that live in a repo route to Fable 5; agents that drive a desktop, a terminal session, or a customer workflow route to GPT-5.5. If you only fund one lane, fund the one your product actually ships — and receipt your own round before committing, because this comparison currently rests on vendor figures from both labs.',
      coePillar: 'Technology · model routing',
      personas: [
        { persona: 'Pipeline & coding agents', pick: 'Fable 5' },
        { persona: 'Computer-use / desktop agents', pick: 'GPT-5.5' },
        { persona: 'Customer-workflow agents', pick: 'GPT-5.5 (Tau2 98%)' },
        { persona: 'Voice-first agents', pick: 'GPT-5.5 (native voice)' },
      ],
    },
  },
  {
    slug: 'claude-fable-5-vs-gemini-3-5-pro',
    models: ['claude-fable-5', 'gemini-3-5-pro'],
    title: 'Claude Fable 5 vs Gemini 3.5 Pro',
    description:
      'Claude Fable 5 vs Gemini 3.5 Pro: Fable 5 is GA with launch benchmarks; Gemini 3.5 Pro is still Vertex-preview-only with no model card. The honest June 2026 state.',
    verdict:
      'Not yet a fair fight: Fable 5 is generally available with published numbers; Gemini 3.5 Pro remains a limited Vertex preview with no model card, benchmarks, or pricing. Today, Fable 5 wins by forfeit \u2014 revisit at Gemini GA.',
    analysis: [
      'This page exists because the search query exists \u2014 and most answers to it will pretend both models are shipping. They are not. Claude Fable 5 went GA on June 9, 2026 with launch benchmarks (95.0% SWE-Bench Verified, ~80% SWE-Bench Pro, vendor-claimed). Gemini 3.5 Pro was announced at I/O on May 19 but as of mid-June remains a limited Vertex preview: no model card, no benchmarks, no public pricing.',
      'The circulating cross-lab figure puts the GA Gemini generation (3.1 Pro) at 54.2% SWE-Bench Pro \u2014 roughly 26 points behind Fable 5\u2019s launch number. If agentic coding is the workload, the gap today is generational. Google\u2019s GA answer right now is Gemini 3.5 Flash at $1.5/$9: a budget-and-speed pick, not a flagship duel.',
      'What would change this verdict: Gemini 3.5 Pro shipping GA with a model card that closes the agentic-coding gap, or pricing that undercuts hard enough to win the cost-per-outcome math. We will re-run this page when that happens \u2014 it is a living comparison, not a hot take.',
    ],
    pickFirst: [
      'You need a GA flagship with published agentic-coding numbers today',
      'Long-horizon coding agents (SWE-Bench Verified 95%, vendor-claimed)',
      'You operate in Claude Code, where Fable 5 is the default',
    ],
    pickSecond: [
      'You are already deep in Vertex AI and can wait for GA',
      'Your workload is multimodal-first (Gemini\u2019s historical strength)',
      'Budget tier now: Gemini 3.5 Flash at $1.5/$9 covers volume work',
    ],
    keywords: [
      'claude fable 5 vs gemini 3.5 pro',
      'fable 5 vs gemini',
      'gemini 3.5 pro benchmarks',
      'gemini 3.5 pro release date',
      'best ai model 2026',
      'anthropic vs google 2026',
    ],
    architect: {
      call: 'Do not architect against a preview. Route agentic coding to Fable 5 now, keep Gemini 3.5 Flash in the budget lane if you are Vertex-committed, and put a calendar gate on Gemini 3.5 Pro GA \u2014 re-evaluate the week it ships a model card, not before. An AI CoE makes routing decisions on published artifacts, not announcements.',
      coePillar: 'Technology \u00b7 model routing + Strategy \u00b7 vendor timing',
      personas: [
        { persona: 'Pipeline & coding agents', pick: 'Fable 5' },
        { persona: 'Multimodal ingest agents', pick: 'Gemini 3.5 Flash (GA today)' },
        { persona: 'Bulk fan-out workers', pick: 'Gemini 3.5 Flash or Haiku-tier' },
      ],
    },
  },
  {
    slug: 'claude-fable-5-vs-grok-4-3',
    models: ['claude-fable-5', 'grok-4-3'],
    title: 'Claude Fable 5 vs Grok 4.3',
    description:
      'Claude Fable 5 vs Grok 4.3: the agentic ceiling at $10/$50 against intelligence-per-dollar at $1.25/$2.50 \u2014 a 20\u00d7 output-price gap. Which to route where in 2026.',
    verdict:
      'Different products. Fable 5 is the agentic-coding ceiling; Grok 4.3 is the cheapest credible frontier intelligence with the fastest throughput in its class. The 20\u00d7 output-price gap means most stacks should run both \u2014 at different tiers.',
    analysis: [
      'The price gap is the story: Fable 5 at $10/$50 per million tokens against Grok 4.3 at $1.25/$2.50 \u2014 twenty times cheaper on output. Grok 4.3 is not a benchmark leader (AA Intelligence Index 53, about 8 points below Opus 4.8 and further below Fable-class), but it pairs credible frontier intelligence with 181 tokens/sec throughput, the fastest in its class.',
      'Fable 5 justifies its premium exactly where Grok cannot follow: 95.0% SWE-Bench Verified and ~80% SWE-Bench Pro (vendor-claimed) on long-horizon agentic coding. No circulating Grok 4.3 figure is in that conversation. For correctness-critical pipelines \u2014 code that ships, outputs that feed tools \u2014 the cost of an error dwarfs the cost of the tokens.',
      'The honest routing math: if a task is error-tolerant and volume-heavy (drafting, classification, summarization at scale, exploratory generation), Grok 4.3\u2019s intelligence-per-dollar wins outright. If a task is error-expensive and agentic, Fable 5\u2019s premium is cheaper than the rework. Match the model to the task\u2019s cost-of-error, not to the leaderboard.',
    ],
    pickFirst: [
      'Agentic coding where wrong outputs cost more than tokens',
      'Strict output contracts feeding schemas and tools',
      'Long-horizon multi-step tasks (the lead reportedly widens)',
    ],
    pickSecond: [
      'High-volume, error-tolerant generation \u2014 20\u00d7 cheaper output',
      'Latency-sensitive products (fastest throughput in class)',
      'Real-time X/social data integration is part of the workload',
    ],
    keywords: [
      'claude fable 5 vs grok 4.3',
      'fable 5 vs grok',
      'grok 4.3 price comparison',
      'cheapest frontier ai model 2026',
      'anthropic vs xai 2026',
      'intelligence per dollar llm',
    ],
    architect: {
      call: 'Two-tier routing: Fable 5 as the execution ceiling for error-expensive agentic work, Grok 4.3 as the volume floor for error-tolerant generation. The 20\u00d7 price gap funds the whole second tier for free if it diverts even a third of your token volume. This is the Strategy-pillar conversation: cost-of-error budgeting, not model loyalty.',
      coePillar: 'Technology \u00b7 model routing + Strategy \u00b7 cost-of-error budgeting',
      personas: [
        { persona: 'Pipeline & coding agents', pick: 'Fable 5' },
        { persona: 'Bulk fan-out workers', pick: 'Grok 4.3' },
        { persona: 'Real-time / social-signal agents', pick: 'Grok 4.3' },
        { persona: 'Reviewer / judgment agents', pick: 'Opus 4.8 (see the Fable-vs-Opus page)' },
      ],
    },
  },
  {
    slug: 'claude-fable-5-vs-deepseek-v4',
    models: ['claude-fable-5', 'deepseek-v4'],
    title: 'Claude Fable 5 vs DeepSeek V4',
    description:
      'Claude Fable 5 vs DeepSeek V4: the closed agentic ceiling vs the MIT-licensed open-weight price floor. SWE-Bench Verified 95% vs 80.6%, $10/$50 vs $1.74/$3.48.',
    verdict:
      'Fable 5 owns the ceiling; DeepSeek V4 owns the open-weight floor \u2014 80.6% SWE-Bench Verified under MIT at a tenth of the cost. If sovereignty or self-hosting is a requirement, DeepSeek wins by default; if peak agentic capability is, Fable 5 does.',
    analysis: [
      'DeepSeek V4 is the strongest argument that frontier-adjacent is cheap now: 80.6% SWE-Bench Verified (independently corroborated), AA Index 52, MIT license, $1.74/$3.48 hosted or self-host for the cost of your own GPUs. Fable 5\u2019s launch numbers sit a full tier above \u2014 95.0% Verified, ~80% on the harder SWE-Bench Pro (vendor-claimed) \u2014 at roughly 10\u00d7 the hosted price.',
      'The 14-point Verified gap understates the practical difference on long-horizon work: SWE-Bench Pro is the contamination-resistant benchmark, and no circulating DeepSeek V4 Pro figure approaches Fable 5\u2019s ~80%. For repo-scale agentic coding the tiers are real.',
      'But the decision is rarely benchmarks-first. DeepSeek V4 is the only model on this page you can run inside your own perimeter, fine-tune, and never send a customer token off-box. For regulated workloads, data-sovereignty requirements, or genuine cost floors, that property beats 14 points. The CoE question is which constraint binds: capability or control.',
    ],
    pickFirst: [
      'Peak agentic-coding capability is the binding constraint',
      'Hosted convenience with strict output discipline',
      'Long-horizon tasks where the Pro-benchmark tier gap shows',
    ],
    pickSecond: [
      'Data sovereignty / self-hosting is non-negotiable (MIT license)',
      'Cost floor for frontier-adjacent coding (80.6% Verified at ~10\u00d7 less)',
      'Fine-tuning on proprietary code is part of the plan',
    ],
    keywords: [
      'claude fable 5 vs deepseek v4',
      'fable 5 vs deepseek',
      'deepseek v4 swe bench',
      'best open weight coding model 2026',
      'self hosted llm coding 2026',
      'mit license llm',
    ],
    architect: {
      call: 'Decide on the Governance pillar first: if any workload cannot leave your perimeter, DeepSeek V4 is your on-prem lane and the only question is sizing. Everything else routes by capability tier \u2014 Fable 5 for the agentic ceiling, DeepSeek hosted as the budget coding lane. Most mature CoEs end up running both: sovereignty lane + ceiling lane.',
      coePillar: 'Governance \u00b7 data sovereignty + Technology \u00b7 model routing',
      personas: [
        { persona: 'Pipeline & coding agents (cloud)', pick: 'Fable 5' },
        { persona: 'Sovereign / on-prem stacks', pick: 'DeepSeek V4 (MIT)' },
        { persona: 'Budget coding lane', pick: 'DeepSeek V4 hosted' },
        { persona: 'Fine-tuned domain agents', pick: 'DeepSeek V4' },
      ],
    },
  },
  {
    slug: 'claude-fable-5-vs-kimi-k2-6',
    models: ['claude-fable-5', 'kimi-k2-6'],
    title: 'Claude Fable 5 vs Kimi K2.6',
    description:
      'Claude Fable 5 vs Kimi K2.6: the new agentic ceiling vs the best open-weights model on the neutral AA index. SWE-Bench Pro ~80% vs 58.6%, $10/$50 vs $0.60/$2.50.',
    verdict:
      'Kimi K2.6 is the best open-weights model on the neutral index and matches GPT-5.5 on SWE-Bench Pro \u2014 at $0.60/$2.50. Fable 5 still clears it by a full tier on agentic coding. Ceiling vs best-value-open: route accordingly.',
    analysis: [
      'Kimi K2.6 earned its position: AA Intelligence Index 54 (best open weights, ahead of DeepSeek V4), 80.2% SWE-Bench Verified, and 58.6% SWE-Bench Pro \u2014 dead even with GPT-5.5\u2019s Pro figure \u2014 at $0.60/$2.50 per million tokens. That makes it arguably the best value in frontier-adjacent AI right now.',
      'Fable 5\u2019s launch numbers clear it by a tier: ~80% SWE-Bench Pro (vendor-claimed) is 21 points up, the same gap it holds over GPT-5.5. The 262K context window is also a real constraint against Fable 5\u2019s 1M for long-horizon, many-file agent sessions.',
      'The honest framing: Kimi K2.6 at one-twentieth the output price does most of what most teams need from a coding model. Fable 5 exists for the work where most is not enough \u2014 contamination-resistant hard tasks, long horizons, strict output contracts. Pay the 20\u00d7 only where that distinction is real in your pipeline.',
    ],
    pickFirst: [
      'The hardest tier of agentic coding (Pro-benchmark gap is 21 points)',
      '1M-context agent sessions across many files',
      'Strict output contracts in production pipelines',
    ],
    pickSecond: [
      'Best open-weights value: GPT-5.5-level SWE-Bench Pro at $0.60/$2.50',
      'Self-hosting with the strongest neutral-index open model',
      'High-volume coding assistance where ceiling capability is not binding',
    ],
    keywords: [
      'claude fable 5 vs kimi k2.6',
      'fable 5 vs kimi',
      'kimi k2.6 benchmarks',
      'best open weights model 2026',
      'moonshot kimi vs claude',
      'cheapest coding llm 2026',
    ],
    architect: {
      call: 'Kimi K2.6 is the strongest open-weights default for the coding-volume lane \u2014 GPT-5.5-level Pro scores at commodity prices. Reserve Fable 5 for the agent paths where task length or output discipline binds. If your CoE runs a two-lane coding stack, this is the cheapest credible second lane on the market.',
      coePillar: 'Technology \u00b7 model routing + Strategy \u00b7 vendor diversification',
      personas: [
        { persona: 'Pipeline & coding agents (ceiling)', pick: 'Fable 5' },
        { persona: 'Coding-volume lane', pick: 'Kimi K2.6' },
        { persona: 'Sovereign / self-hosted stacks', pick: 'Kimi K2.6 or DeepSeek V4' },
        { persona: 'Long-context repo agents', pick: 'Fable 5 (1M vs 262K)' },
      ],
    },
  },
  {
    slug: 'claude-fable-5-vs-qwen3-7-max',
    models: ['claude-fable-5', 'qwen3-7-max'],
    title: 'Claude Fable 5 vs Qwen3.7-Max',
    description:
      'Claude Fable 5 vs Qwen3.7-Max: the agentic ceiling vs the strongest API-only value play. SWE-Bench Pro ~80% vs 60.6%, $10/$50 vs $2.50/$7.50, both 1M context.',
    verdict:
      'Qwen3.7-Max leads its peer group (Kimi, DeepSeek) on hard agentic coding and matches Fable 5 on context \u2014 at a quarter of the price. Fable 5 keeps a ~19-point SWE-Bench Pro lead. Value leader vs ceiling, both closed.',
    analysis: [
      'Qwen3.7-Max broke the open-weight Qwen association \u2014 it is closed and API-only \u2014 and used the move to lead its peer group: AA Index 56.6 (above Kimi K2.6 and DeepSeek V4), 60.6% SWE-Bench Pro, 80.4% Verified, 1M context at $2.50/$7.50.',
      'Against Fable 5 the shape repeats from every page in this series: a ~19-point SWE-Bench Pro gap (vendor-claimed on the Fable side) for a 4\u00d7 price difference. Qwen3.7-Max\u2019s distinction is that, unlike Kimi or DeepSeek, it concedes nothing on context window \u2014 both run 1M \u2014 so long-horizon sessions are a fair fight on memory, just not on the benchmark tier.',
      'Where Qwen fits: the high-volume agentic mid-tier \u2014 real tool-use workloads that need better-than-open-weights reliability without flagship pricing. Where it does not: the hardest contamination-resistant tier, and any stack with a procurement allergy to API-only Chinese-lab models \u2014 a Governance-pillar question your CoE should answer explicitly rather than by default.',
    ],
    pickFirst: [
      'The hardest agentic-coding tier (~19-point Pro gap)',
      'Strict output contracts and long-horizon execution',
      'Claude Code-native operation',
    ],
    pickSecond: [
      'Strongest value in the agentic mid-tier ($2.50/$7.50, AA 56.6)',
      '1M-context work without flagship pricing',
      'High-volume tool-use agents where the Pro tier gap is not binding',
    ],
    keywords: [
      'claude fable 5 vs qwen3.7 max',
      'fable 5 vs qwen',
      'qwen3.7 max benchmarks',
      'qwen 3.7 max vs claude',
      'best value agentic llm 2026',
      'alibaba qwen vs anthropic',
    ],
    architect: {
      call: 'Qwen3.7-Max is the mid-tier I would pressure-test first for agent fleets: peer-group-leading agentic scores, 1M context, a quarter of flagship cost. Gate it through your Governance pillar first (API-only, Chinese lab \u2014 decide explicitly), then route volume agentic work to it and keep Fable 5 for the ceiling paths.',
      coePillar: 'Technology \u00b7 model routing + Governance \u00b7 vendor risk',
      personas: [
        { persona: 'Pipeline & coding agents (ceiling)', pick: 'Fable 5' },
        { persona: 'Agentic mid-tier / tool-use fleets', pick: 'Qwen3.7-Max' },
        { persona: 'Long-context agents on a budget', pick: 'Qwen3.7-Max (1M at $2.50/$7.50)' },
        { persona: 'Regulated / vendor-risk-sensitive stacks', pick: 'Fable 5 or DeepSeek V4 self-hosted' },
      ],
    },
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
