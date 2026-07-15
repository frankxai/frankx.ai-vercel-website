// Generation Backend Registry — the single source of truth for every image/video
// engine GenCreator OS can call. Read by:
//   - /studio/engines page (the public "pick your engine + how to install it" surface)
//   - the gen router (lib/gen/router.ts) when it ships
//   - the visual-creation gate + visual-intelligence orchestrator
//
// The product is not any single engine — it is this curated menu plus the taste
// lanes (lib/gen/lanes.ts) and the quality gate. Centralize on the registry, never
// on a vendor. Edit an entry here and every surface updates.

export type BackendKind = 'image' | 'video' | 'both'

// How GenCreator reaches the engine. 'library' = a local script wrapper (no server),
// 'mcp' = a Model Context Protocol server, 'api' = a direct HTTP API call.
export type AccessMode = 'mcp' | 'api' | 'library'

// Where the engine sits in the curated stack. One tier can have one default.
export type Tier =
  | 'premium-hero' // top-of-page stills, covers — quality over volume
  | 'cinematic-video' // interactive Sora/Veo/Kling from inside the harness
  | 'batch' // cheap, high-volume B-roll + catalog runs
  | 'alt-image' // a second image opinion / OpenAI lane
  | 'frontier-video' // the raw frontier video models (usually reached via cinematic-video)

// Honest install state. Never claim 'installed' for something not in .mcp.json.
export type BackendStatus =
  | 'installed' // live and callable now
  | 'pending-auth' // registered, awaiting OAuth / key
  | 'available' // built or trivially addable, not yet wired
  | 'recommended' // we suggest adding it; not present yet

export interface CostModel {
  shape: 'subscription' | 'per-call' | 'included-in-key' | 'native-included'
  summary: string // human-readable, e.g. "$39/mo credits" or "~$0.04/image"
  note?: string // gotchas, e.g. MCP always burns credits even in "unlimited"
}

export interface InstallStep {
  label: string
  command?: string // exact shell / claude-mcp command, if any
  detail?: string // what to know — auth, keys, manual steps
}

export interface GenBackend {
  id: string
  name: string
  kind: BackendKind
  tier: Tier
  access: AccessMode
  status: BackendStatus
  /** Is this part of the FrankX default stack (vs. an optional alternative)? */
  inDefaultStack: boolean
  tagline: string
  /** Key models the engine exposes. */
  models: string[]
  /** When to reach for it. */
  bestFor: string[]
  /** When NOT to — routes you to the right alternative. */
  notWhen: string
  auth: string
  cost: CostModel
  install: InstallStep[]
  docsUrl?: string
  /** Cross-link to the alternative this defers to in its notWhen case. */
  defersTo?: string
  /** Agent harnesses where this engine is built-in and callable with no extra API cost. */
  nativeToHarness?: string[]
  /** The consumer subscription that already includes it (so no separate API bill). */
  subscription?: string
  /** When the paid/API path is worth choosing over a free native one. */
  whenWorthPaid?: string
}

export const genBackends: GenBackend[] = [
  {
    id: 'grok-imagine',
    name: 'Grok Imagine',
    kind: 'both',
    tier: 'premium-hero',
    access: 'library',
    status: 'installed',
    inDefaultStack: true,
    tagline: 'Native image + video inside the Grok harness — already in your SuperGrok plan.',
    models: ['Grok Imagine (Aurora)', 'Grok Imagine Video'],
    nativeToHarness: ['grok'],
    subscription: 'SuperGrok ($30/mo) — ~30–100 quality images/day on rolling windows',
    bestFor: [
      'Cinematic + photographic heroes generated from inside a Grok session',
      'High volume on a flat monthly fee (no per-image bill)',
      'Fast iteration when you are already working in Grok',
    ],
    notWhen:
      'Text-heavy/technical diagrams where labels must be legible — Grok Imagine fabricates text. Use Nano Banana Pro (Search-grounded) for those.',
    defersTo: 'nano-banana-antigravity',
    auth: 'Logged-in Grok CLI/app. NB: the CLI may sit on a base-tier token showing "free credits %" — re-login with the main SuperGrok account for full quota.',
    cost: {
      shape: 'native-included',
      summary: 'Included in SuperGrok — no extra API cost',
      note: 'Rolling windows throttle bursts (50 then wait 2–6h). Video costs ~5–10× an image in quota.',
    },
    whenWorthPaid:
      'For programmatic batches beyond the daily quota, the Grok Imagine API (~$0.02/image) supplements it.',
    install: [
      {
        label: 'Already native in the Grok harness',
        detail: 'Generate from a Grok session directly. Capacity guide: ~/.grok/docs/visual-generation-capacity.md.',
      },
    ],
  },
  {
    id: 'nano-banana-antigravity',
    name: 'Nano Banana Pro (Antigravity)',
    kind: 'image',
    tier: 'premium-hero',
    access: 'library',
    status: 'installed',
    inDefaultStack: true,
    tagline: 'Gemini 3 Pro Image built into Antigravity — free, in-editor, and Search-grounded.',
    models: ['Nano Banana Pro (Gemini 3 Pro Image)', 'Nano Banana 2 (Gemini 3.1 Flash Image)'],
    nativeToHarness: ['gemini', 'antigravity'],
    subscription: 'Antigravity free public preview (NB2 free to all); Google AI Pro/Ultra for higher limits',
    bestFor: [
      'Text-heavy + technical heroes, infographics, diagrams — Search grounding keeps labels legible & accurate',
      'Real-time-data visuals (current pricing, dates, charts) via Google Search',
      'No-extra-cost generation from inside Antigravity / a Gemini session',
    ],
    notWhen:
      'You are working in a non-Gemini harness with no key — Claude reaches the same model via the infogenius script path instead.',
    defersTo: 'infogenius',
    auth: 'Logged-in Antigravity / Gemini account (no separate API key inside Antigravity)',
    cost: {
      shape: 'native-included',
      summary: 'Free in the Antigravity preview / included in Google AI subscription',
    },
    whenWorthPaid:
      'Programmatic batches outside Antigravity → the Gemini API (per-image pricing) via the infogenius script.',
    install: [
      {
        label: 'Native in the Antigravity IDE (interactive only)',
        detail:
          'Image gen works in the interactive Antigravity TUI (GENERATE_IMAGE tool fires, status DONE, file saved to brain/<session-id>/). Verified 2026-06-12: headless `agy --print` / `agy -p` hangs indefinitely and produces no file — confirmed across 3 independent stalls. GEMINI_API_KEY is also unset on this machine, which would block any out-of-TUI Imagen call. For no-cost headless terminal image gen, use the Grok Imagine CLI instead: `grok -p "<prompt>" --permission-mode bypassPermissions`.',
      },
    ],
    docsUrl: 'https://blog.google/innovation-and-ai/products/nano-banana-pro/',
  },
  {
    id: 'codex-image',
    name: 'gpt-image-2 (Codex)',
    kind: 'image',
    tier: 'alt-image',
    access: 'library',
    status: 'installed',
    inDefaultStack: true,
    tagline: 'OpenAI image gen built into Codex CLI via the $imagegen skill — on your ChatGPT plan.',
    models: ['gpt-image-2'],
    nativeToHarness: ['codex'],
    subscription: 'ChatGPT (Free/Go/Plus/Pro/Business) — counts toward Codex usage limits',
    bestFor: [
      'Quick visuals while already coding in Codex',
      'Strong text-in-image rendering on a sub you already pay for',
    ],
    notWhen:
      'Large batches — image turns burn the Codex limit ~3–5× faster. Switch to a per-call API for volume.',
    defersTo: 'gpt-image-2',
    auth: 'Codex signed in with a ChatGPT plan. Setting OPENAI_API_KEY switches it to paid API pricing.',
    cost: {
      shape: 'native-included',
      summary: 'Included in the ChatGPT plan (no extra cost); ~3–5× faster limit burn per image turn',
    },
    whenWorthPaid:
      'Batches of >250 images, or to avoid eating Codex coding quota → set OPENAI_API_KEY for gpt-image-2 API pricing.',
    install: [
      {
        label: 'Native in Codex CLI — interactive ($imagegen) or headless exec',
        command: '$imagegen',
        detail:
          'Built in since Apr 2026. Interactive `$imagegen` calls GPT Image 2 on your ChatGPT plan. Headless: `codex exec --dangerously-bypass-approvals-and-sandbox "<prompt>"` also works — verified 2026-06-12 (generated a 2636-byte PNG via Python/Pillow subprocess; no quota touch on that path).',
      },
    ],
    docsUrl: 'https://developers.openai.com/codex/cli/features',
  },
  {
    id: 'infogenius',
    name: 'InfoGenius / Nano Banana',
    kind: 'image',
    tier: 'premium-hero',
    access: 'mcp',
    status: 'available',
    inDefaultStack: true,
    tagline: 'Gemini-3 premium hero stills with Guardian AI routing — the in-house engine.',
    models: ['Gemini 3 Pro Image', 'Nano Banana 2', 'Nano Banana Pro'],
    bestFor: [
      'Hero imagery at the top of a page',
      'Book + album covers that live for years',
      'Research-grounded infographics (the InfoGenius pipeline)',
    ],
    notWhen:
      'Bulk B-roll or 20-attempts-in-10-minutes ad variants — that volume burns time at hero quality.',
    defersTo: 'fal',
    auth: 'Google Generative AI API key (GOOGLE_GENERATIVE_AI_API_KEY)',
    cost: {
      shape: 'per-call',
      summary: 'Gemini API pricing (~pennies per image)',
      note: 'The durable path (scripts/lib/nb-image.mjs) needs no server and finds the key automatically.',
    },
    install: [
      {
        label: 'Option A — durable library (no server, recommended)',
        command: 'node scripts/nb-generate.mjs "<prompt>" --size 2K',
        detail:
          'Already in-repo. Reads GOOGLE_GENERATIVE_AI_API_KEY from Arcanea/.env.local automatically. Most reliable across reinstalls.',
      },
      {
        label: 'Option B — the arcanea-infogenius MCP (when the binary is present)',
        command:
          'claude mcp add infogenius node "<path>/arcanea-infogenius/mcp-server/dist/index.js"',
        detail:
          'arcanea-infogenius-mcp v2.0.0 (Gemini 3 Pro + Guardian routing). Note: the binary is not in the current Arcanea tree — rebuild it there before registering, and pass GOOGLE_GENERATIVE_AI_API_KEY via env expansion, never a key pasted into a committed .mcp.json. The Option A library needs none of this.',
      },
    ],
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    kind: 'video',
    tier: 'cinematic-video',
    access: 'mcp',
    status: 'pending-auth',
    inDefaultStack: true,
    tagline: 'One OAuth endpoint fronting 30+ frontier models — Sora, Veo, Kling, Soul.',
    models: ['Sora 2', 'Veo 3.1', 'Kling 3.0', 'Soul 2.0', 'Seedream 4.0', 'MiniMax Hailuo 02'],
    bestFor: [
      'Interactive cinematic video from inside the harness',
      'Character-consistent B-roll via Soul ID training',
      'Reaching Sora / Veo / Kling without juggling three API keys',
    ],
    notWhen:
      'High-volume programmatic batch — the subscription-credit model gets expensive, and MCP calls burn credits even in "unlimited" mode.',
    defersTo: 'fal',
    auth: 'OAuth through your Higgsfield account (no API key to manage)',
    cost: {
      shape: 'subscription',
      summary: '$15 Starter · $39–49 Plus · $99–129 Ultra · $89/seat Business',
      note: 'MCP generations always consume credits, even when the web UI shows "unlimited".',
    },
    install: [
      {
        label: 'Register the MCP server',
        command: 'claude mcp add --transport http higgsfield https://mcp.higgsfield.ai/mcp',
        detail: 'Already registered at project scope in this repo.',
      },
      {
        label: 'Authenticate',
        command: '/mcp',
        detail:
          'Approve the project-scope server on next launch, then complete the OAuth browser login. Requires a paid Higgsfield plan — MCP calls fail on credits otherwise.',
      },
    ],
    docsUrl: 'https://higgsfield.ai/mcp',
  },
  {
    id: 'fal',
    name: 'fal.ai',
    kind: 'both',
    tier: 'batch',
    access: 'api',
    status: 'recommended',
    inDefaultStack: true,
    tagline: 'Pay-per-use aggregator — the economical lane for batch video and bulk B-roll.',
    models: ['FLUX', 'Kling', 'MiniMax Hailuo', 'Wan', 'Veo (via fal)', 'Seedance'],
    bestFor: [
      'Lyric-video batches across the 12k catalog',
      'Bulk B-roll where per-generation cost matters',
      'Programmatic generation from scripts (one API, many models)',
    ],
    notWhen:
      'A single premium hero still — use InfoGenius. Interactive cinematic exploration — use Higgsfield.',
    defersTo: 'infogenius',
    auth: 'fal.ai API key (FAL_KEY)',
    cost: {
      shape: 'per-call',
      summary: '30–80% cheaper than subscription credits on video; ~$0.025–0.05/image',
    },
    install: [
      {
        label: 'Get a key',
        detail: 'Create FAL_KEY at fal.ai/dashboard/keys and add it to .env.local.',
      },
      {
        label: 'Call via the AI SDK or a thin script wrapper',
        command: 'pnpm add @fal-ai/client',
        detail:
          'Wrap in scripts/lib/fal-image.mjs mirroring nb-image.mjs so the gen router treats it as one more backend.',
      },
    ],
    docsUrl: 'https://fal.ai/pricing',
  },
  {
    id: 'gpt-image-2',
    name: 'GPT Image 2',
    kind: 'image',
    tier: 'alt-image',
    access: 'api',
    status: 'available',
    inDefaultStack: false,
    tagline: 'OpenAI image lane — a second opinion via the key you already have.',
    models: ['gpt-image-2', 'gpt-image-1'],
    bestFor: [
      'A different aesthetic read when InfoGenius output feels off-lane',
      'Strong text-in-image rendering',
      'Teams already standardized on OpenRouter',
    ],
    notWhen:
      'Your default hero work — InfoGenius is the in-house premium tier and stays the default.',
    defersTo: 'infogenius',
    auth: 'OpenRouter key (OPENROUTER_API_KEY — already on this machine)',
    cost: {
      shape: 'per-call',
      summary: 'OpenRouter per-image pricing',
    },
    install: [
      {
        label: 'Route through OpenRouter',
        detail:
          'OPENROUTER_API_KEY + OPENROUTER_BASE_URL are already set (machine-global LLM policy). Add a scripts/lib/gpt-image.mjs wrapper that posts to the images endpoint.',
      },
    ],
  },
  {
    id: 'frontier-video',
    name: 'Sora · Veo · Kling (direct)',
    kind: 'video',
    tier: 'frontier-video',
    access: 'api',
    status: 'available',
    inDefaultStack: false,
    tagline: 'The raw frontier video models, direct — cheapest per call, most plumbing.',
    models: ['Sora 2 (OpenAI)', 'Veo 3.1 (Gemini API)', 'Kling 3.0 (Kling API)'],
    bestFor: [
      'Squeezing per-call cost on one specific model at high volume',
      'A production pipeline already standardized on one provider',
    ],
    notWhen:
      'You want one connector + Soul character consistency — Higgsfield fronts all three for far less setup.',
    defersTo: 'higgsfield',
    auth: 'Per-provider API keys (OpenAI / Google / Kling)',
    cost: {
      shape: 'per-call',
      summary: 'Lowest per-generation, but three separate integrations + no Soul consistency',
    },
    install: [
      {
        label: 'Only if you outgrow Higgsfield on one model',
        detail:
          'Wire the single provider SDK you actually need. Most GenCreator users should reach these through Higgsfield, not directly.',
      },
    ],
  },
]

export function getBackend(id: string): GenBackend | undefined {
  return genBackends.find((b) => b.id === id)
}

export function backendsByTier(tier: Tier): GenBackend[] {
  return genBackends.filter((b) => b.tier === tier)
}

export function defaultStack(): GenBackend[] {
  return genBackends.filter((b) => b.inDefaultStack)
}

/** Engines included in a subscription you already pay for — zero extra API cost. Try these first. */
export function nativeBackends(): GenBackend[] {
  return genBackends.filter((b) => b.cost.shape === 'native-included')
}

/** Engines a given harness can call natively (no extra API bill). */
export function backendsForHarness(harness: string): GenBackend[] {
  return genBackends.filter((b) => b.nativeToHarness?.includes(harness))
}

/** Paid per-call / credit engines — reserve for video or when a native quota is exhausted. */
export function paidBackends(): GenBackend[] {
  return genBackends.filter((b) => b.cost.shape !== 'native-included')
}

export const GEN_VERSION = '0.2.0'
export const GEN_SHIPPED = '2026-06-03'
export const GEN_UPDATED = '2026-06-12'
export const GEN_ROUTE = '/studio/engines'
