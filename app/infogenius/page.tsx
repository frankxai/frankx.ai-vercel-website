import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { GlowCard } from '@/components/ui/glow-card'
import InfoGeniusStudioWorkbench from '@/components/infogenius/InfoGeniusStudioWorkbench'

export const metadata: Metadata = {
  title: 'InfoGenius v5.2 — Visual Knowledge OS & Multi-Tenant Studio | FrankX.AI',
  description:
    'Turn any topic, architecture, or Markdown article into web-grounded 2K/4K infographics, 5-slide executive carousels, Veo 3.1 motion loops, and Kore TTS narration via Vercel AI Gateway, Google Gemini, or OpenRouter.',
  openGraph: {
    title: 'InfoGenius v5.2 — Visual Knowledge OS | FrankX.AI',
    description:
      'Web-grounded 2K/4K infographics, 5-slide Markdown carousels, Custom Brand Style Builder, and Claude Code / Cursor MCP Plugin.',
    images: [{ url: '/images/blog/generated/infogenius-glassmorphic-sovereign-multi-tenant-ai-gateway.png' }],
  },
}

const capabilities = [
  {
    icon: '⚡',
    title: 'Web-Grounded Fact Verification',
    body: 'Every visual starts with live Perplexity Sonar or Google Search grounding — extracting 4–5 cited facts before a single pixel is rendered.',
  },
  {
    icon: '🎨',
    title: '10 v5.2 Styles + 18 Brand Presets',
    body: 'From 3D Frosted Glassmorphism and Luxury Editorial to FrankX Da Vinci Blueprints and Custom Brand DNA (.preset.json).',
  },
  {
    icon: '📑',
    title: 'Article → 5-Slide Carousel Pack',
    body: 'Paste any blog post, whitepaper, or GitHub README and decompose it into a 5-slide executive visual pack (Hook, Problem, Architecture, Proof, Action).',
  },
  {
    icon: '📐',
    title: '2K & 4K Multi-Format Output',
    body: '16:9 blog heroes and keynote decks, 1:1 LinkedIn/X carousels, and 9:16 vertical stories with crisp, spelled typography.',
  },
  {
    icon: '🔊',
    title: 'Veo 3.1 Motion + Kore TTS Audio',
    body: 'Turn static infographics into 7-second cinematic motion loops and 24kHz spoken executive briefings in one command.',
  },
  {
    icon: '🔌',
    title: 'Claude Code & Cursor MCP Plugin',
    body: 'Install plugins/infogenius-visual-os to trigger /infogenius inside Claude Code, Cursor, Codex, and Antigravity with Zero-Orphan provenance.',
  },
]

const liveShowcaseOutputs = [
  {
    title: 'Sovereign Multi-Tenant AI Gateway Architecture',
    styleLabel: '3D Glassmorphic (community/glassmorphic)',
    badge: 'Live Vercel AI Gateway · 2K PNG',
    model: 'perplexity/sonar → google/gemini-3-pro-image',
    imageSrc: '/images/blog/generated/infogenius-glassmorphic-sovereign-multi-tenant-ai-gateway.png',
    provenanceHref:
      '/images/blog/generated/infogenius-glassmorphic-sovereign-multi-tenant-ai-gateway.png.vis.provenance.json',
    facts: [
      'Tenant-isolated identity, keys, vector stores, quotas, and audit partitions across shared gateway compute.',
      'Request pipeline: Tenant App → Authenticated Gateway → Policy & DLP Controls → Sovereign Model Endpoint.',
      'EU AI Act Art. 26 deployer-controlled log retention (≥ 6 months) + NIST AI RMF lifecycle governance.',
    ],
    cli: 'node scripts/infogenius.mjs "Sovereign Multi-Tenant AI Gateway Architecture" --style glassmorphic',
  },
  {
    title: 'Agentic Creator OS: 6-Layer Closed-Loop Operating Model',
    styleLabel: 'Luxury Brand Visual (community/premium)',
    badge: 'Live Vercel AI Gateway · 2K PNG',
    model: 'perplexity/sonar → google/gemini-3-pro-image',
    imageSrc: '/images/blog/generated/infogenius-premium-agentic-creator-os-6-layer.png',
    provenanceHref:
      '/images/blog/generated/infogenius-premium-agentic-creator-os-6-layer.png.vis.provenance.json',
    facts: [
      'Apple × DeepMind obsidian editorial layout with warm champagne gold (#d4af37) and platinum hierarchy.',
      'Separates Maker execution lanes from Independent Verifier gates and fail-closed human money approval.',
      'Emits Zero-Orphan provenance receipts and MDX <LiquidGlassZoom /> embeds automatically.',
    ],
    cli: 'node scripts/infogenius.mjs "Agentic Creator OS: 6-Layer Closed-Loop Operating Model" --style premium --audience expert',
  },
  {
    title: 'Transformer Architecture: Powering Modern AI LLMs',
    styleLabel: '3D Isometric Studio (frankx/3d-isometric)',
    badge: 'Google Search Grounded · 2K PNG',
    model: 'googleSearch → gemini-3-pro-image-preview',
    imageSrc: '/images/blog/generated/infogenius-3d-transformer-architecture.png',
    provenanceHref:
      '/images/blog/generated/infogenius-3d-transformer-architecture.png.vis.provenance.json',
    facts: [
      'Self-attention O(n²d) compute complexity (QKᵀV) + Multi-Head Attention (8–64 parallel heads).',
      'Token Embedding with Positional Encoding superposition (RoPE / sinusoidal) into stacked decoder blocks.',
      'Causal masked self-attention → LayerNorm + Residual → Feed-Forward Network (FFN).',
    ],
    cli: 'node scripts/infogenius.mjs "How transformer architecture powers modern AI large language models" --style 3d-isometric --audience expert',
  },
  {
    title: 'Quantum Computing: Mechanisms & 2026 Impact',
    styleLabel: 'Focused Futuristic HUD (community/futuristic)',
    badge: 'Google Search Grounded · 2K PNG',
    model: 'googleSearch → gemini-3-pro-image-preview',
    imageSrc: '/images/blog/generated/infogenius-futuristic-quantum-computing-2026.png',
    provenanceHref:
      '/images/blog/generated/infogenius-futuristic-quantum-computing-2026.png.vis.provenance.json',
    facts: [
      'Classical binary bit (0 or 1) vs. Bloch Sphere qubit superposition & non-local entanglement.',
      'Princeton >1ms qubit coherence breakthrough + 15 millikelvin dilution refrigerator cryogenics.',
      'USD 1.88B (2026) → USD 19.44B (2035) market trajectory + Post-Quantum Cryptography (PQC) adoption.',
    ],
    cli: 'node scripts/infogenius.mjs "How quantum computing works and why it matters in 2026" --style futuristic --audience college',
  },
]

const e2eWorkflows = [
  {
    id: 'Workflow 01',
    title: 'Web Studio Workbench (Managed Credits or BYOK)',
    who: 'Founders, Writers, Educators & Solution Architects',
    steps: [
      'Open frankx.ai/infogenius#studio — your workspace automatically receives 15 Free Starter Credits (3 full 2K infographics).',
      'Enter any topic or paste a full Markdown article, choose a v5.2 style (Glassmorphic, Luxury Brand, Da Vinci, 3D Isometric) and audience density.',
      'Click "Research & Render 2K Infographic" (5 credits via Managed Vercel AI Gateway, or 0 credits with your own BYOK key).',
      'Download the 2K/4K PNG, .vis.provenance.json receipt, spoken Kore TTS audio briefing, and ready-to-paste MDX <LiquidGlassZoom /> snippet.',
    ],
    command: 'https://www.frankx.ai/infogenius#studio',
    outputDeliverable: '2K/4K PNG + .vis.provenance.json + WAV Audio + MDX Embed',
  },
  {
    id: 'Workflow 02',
    title: 'Article / Whitepaper → 5-Slide Executive Carousel Pack',
    who: 'Content Teams, LinkedIn/X Creators & Newsletter Operators',
    steps: [
      'Switch to Tab 2 ("Article / Markdown → 5-Slide Pack") in the Web Studio or pass --from-file to the CLI.',
      'InfoGenius extracts the 5-part narrative arc: Slide 1 (Hook), Slide 2 (Problem), Slide 3 (Core Architecture), Slide 4 (Proof & Metrics), Slide 5 (Action Checklist).',
      'Render individual slides in 1:1 Square (LinkedIn/Carousel) or 16:9 Landscape (Keynote Deck) with unified brand palette.',
      'Export all 5 visuals or copy the generated batch CLI script into your repository.',
    ],
    command: 'node scripts/infogenius.mjs --from-file content/blog/my-article.mdx --style glassmorphic --aspect 1:1',
    outputDeliverable: '5 Cohesive Carousel PNGs + Batch CLI Script + Provenance Pack',
  },
  {
    id: 'Workflow 03',
    title: 'Claude Code, Cursor & Antigravity MCP Plugin',
    who: 'AI Engineers & Agentic Coding Teams',
    steps: [
      'Mount plugins/infogenius-visual-os in Claude Code, Cursor, Codex, or Antigravity.',
      'Invoke /infogenius "<topic>" or let your agent call generate_infographic, animate_infographic, and narrate_infographic over MCP.',
      'Credentials resolve automatically via Vercel AI Gateway (VERCEL_OIDC_TOKEN / AI_GATEWAY_API_KEY), Infisical, Gemini Direct, or OpenRouter.',
      'Assets land directly in public/images/blog/generated/ with Zero-Orphan provenance sidecars.',
    ],
    command: 'node scripts/infogenius.mjs --mcp',
    outputDeliverable: '6 MCP Tools + Autonomous Repo Asset & Provenance Generation',
  },
  {
    id: 'Workflow 04',
    title: 'Custom Brand DNA Lock (infogenius-presets.json)',
    who: 'Agencies, Design Systems & Multi-Brand Estates',
    steps: [
      'Open Tab 3 ("Custom Brand Style Builder") and pick your exact Void Background, Primary Accent, Secondary Highlight, and Typography hex codes.',
      'Define your material physics (e.g., frosted crystal, anodized titanium, parchment engraving) and anti-slop negative rules.',
      'Save to your Multi-Tenant Workspace Vault or export the .preset.json file into data/ai-ops/infogenius-presets.json.',
      'Every future Web Studio, CLI, and MCP generation enforces your exact brand signature.',
    ],
    command: 'node scripts/infogenius.mjs "System Overview" --style custom/sovereign-glass --size 4K',
    outputDeliverable: 'Reusable .preset.json Brand Pack + Locked Multi-Agent Visual Identity',
  },
]

const offerTiers = [
  {
    name: 'Starter Workspace & BYOK',
    sku: 'free-starter',
    price: '$0',
    period: 'Free Forever · 15 Trial Credits Included',
    unitCost: '3 Free 2K Infographics + Unlimited BYOK',
    badge: 'Instant Start · No Card Required',
    highlight: false,
    description:
      'Test-drive Managed Vercel AI Gateway rendering immediately with 15 free workspace credits, or connect your own Gemini / Vercel / OpenRouter key for unlimited self-billed rendering.',
    outputs: [
      '15 Managed Credits included (3 × 2K Grounded Infographics or 5 × Carousel Decompositions)',
      'Unlimited Zero-Key Master Prompt Architect + CLI + MDX Embed Generator',
      'Unlimited Client-Side BYOK mode (Google Gemini, Vercel AI Gateway vck_, OpenRouter sk-or-)',
      'All 10 built-in v5.2 Visual Styles + Custom Brand JSON Exporter',
      'Zero-Orphan .vis.provenance.json receipt download on every render',
    ],
    ctaLabel: 'Launch Free Studio (15 Credits)',
    ctaHref: '#studio',
  },
  {
    name: 'Creator 100-Credit Pack',
    sku: 'infogenius-credits-100',
    price: '$19',
    period: 'One-Time Credit Pack · Never Expires',
    unitCost: '$0.95 per 2K Grounded Infographic',
    badge: '20 × 2K Visuals · Zero Key Setup',
    highlight: false,
    description:
      'For newsletter writers, educators, and technical bloggers who want instant web-grounded 2K/4K visuals in the browser without managing API keys or cloud billing.',
    outputs: [
      '100 Managed Vercel AI Gateway Credits added to your Workspace ID',
      'Renders 20 × 2K Infographics (5 cr), 12 × 4K Print Visuals (8 cr), or 33 × 5-Slide Packs (3 cr)',
      'Live Perplexity Sonar & Google Search fact citations baked into every diagram',
      'Spoken Kore TTS executive audio narration (2 cr) + downloadable WAV',
      'Persistent Workspace Gallery & Custom Brand Style Vault in Upstash Redis',
    ],
    ctaLabel: 'Get 100 Credits ($19)',
    ctaHref: '/waitlist?intent=infogenius-pro&sku=infogenius-credits-100',
  },
  {
    name: 'InfoGenius Pro Visual Knowledge OS',
    sku: 'infogenius-pro',
    price: '$49',
    period: 'One-Time License + 350 Managed Credits',
    unitCost: '$0.70 per 2K Infographic + Full Local CLI & MCP Plugin',
    badge: 'Most Popular · 70 × 2K Visuals + Code Plugin',
    highlight: true,
    description:
      'The complete Web Studio + Local CLI + Claude Code / Cursor / Antigravity MCP Plugin bundle with 350 Managed Credits and all 18 signature brand presets.',
    outputs: [
      '350 Managed Vercel AI Gateway Credits (70 × 2K Infographics or 43 × 4K Print Visuals)',
      'Standalone Claude Code, Cursor & Antigravity Plugin (plugins/infogenius-visual-os/)',
      '6-Tool MCP Server (generate_infographic, animate_infographic, narrate_infographic, research_topic)',
      'All 18 Brand Presets (Glassmorphic, Luxury Brand, Da Vinci, 3D Isometric, GenCreator CoE, Arcanea)',
      'Batch Markdown-to-5-Slide Carousel CLI (scripts/infogenius.mjs --from-file) + Veo 3.1 motion support',
    ],
    ctaLabel: 'Get Pro OS + 350 Credits ($49)',
    ctaHref: '/products/infogenius-pro',
  },
  {
    name: 'Agency & Content Team OS',
    sku: 'infogenius-team-1000',
    price: '$129',
    period: 'Multi-Seat Team Workspace + 1,000 Credits',
    unitCost: '$0.64 per 2K Grounded Infographic',
    badge: '200 × 2K Visuals · Multi-Brand Vault',
    highlight: false,
    description:
      'Built for content studios, developer relations teams, and consulting practices producing high-velocity technical articles, client decks, and social carousels.',
    outputs: [
      '1,000 Managed Vercel AI Gateway Credits (200 × 2K Infographics or 125 × 4K Print Visuals)',
      'Shared Multi-Tenant Team Workspace ID (X-Tenant-Id) across web and CLI agents',
      'Unlimited Custom Brand Style Presets persisted in your team Redis vault',
      'Full Claude Code / Cursor / Antigravity MCP Server + CI/CD provenance verification',
      'Priority onboarding for custom brand pack calibration',
    ],
    ctaLabel: 'Get Agency Team Pack ($129)',
    ctaHref: '/waitlist?intent=infogenius-pro&sku=infogenius-team-1000',
  },
]

const styles = [
  { label: '3D Glassmorphic', tag: 'v5.2 Flagship · Crystal & Teal', color: 'from-teal-500/25 to-emerald-500/15' },
  { label: 'Luxury Brand', tag: 'v5.2 Flagship · Apple × DeepMind', color: 'from-amber-500/25 to-yellow-500/15' },
  { label: 'Da Vinci Technical', tag: 'FrankX Signature · Blueprint', color: 'from-orange-500/20 to-amber-500/15' },
  { label: '3D Isometric', tag: 'FrankX Signature · Modular', color: 'from-emerald-500/20 to-teal-500/20' },
  { label: 'GenCreator CoE', tag: 'Enterprise 6-Pillar Schematic', color: 'from-violet-500/25 to-indigo-500/20' },
  { label: 'Standard', tag: 'Scientific Editorial', color: 'from-blue-500/20 to-cyan-500/20' },
  { label: 'Minimalist', tag: 'Bauhaus Swiss Grid', color: 'from-white/10 to-white/5' },
  { label: 'Photorealistic', tag: '8K Optical Composite', color: 'from-amber-500/20 to-orange-500/20' },
  { label: 'Futuristic', tag: 'Restrained Telemetry HUD', color: 'from-violet-500/20 to-purple-500/20' },
  { label: 'Vintage', tag: '19th Century Lithograph', color: 'from-yellow-700/20 to-amber-800/20' },
]

export default function InfoGeniusPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* ── HERO ── */}
      <section className="relative pt-24 pb-0 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left: Copy */}
            <div className="pb-16 lg:pb-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300 mb-8">
                InfoGenius v5.2 · Visual Knowledge OS · Live on Vercel AI Gateway
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6">
                Research in.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-violet-400 to-amber-300">
                  2K/4K Visuals
                </span>
                <br />
                in 18 seconds.
              </h1>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-xl">
                Drop a topic or paste a Markdown article. InfoGenius grounds the facts via live web
                search, locks your brand palette, and renders a 2K/4K architectural infographic,
                5-slide executive carousel, or spoken audio briefing — in the browser or inside
                Claude Code &amp; Cursor.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#studio"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 shadow-lg shadow-violet-600/25"
                >
                  Open Live Studio (15 Free Credits)
                  <span className="text-base">↓</span>
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 hover:bg-teal-500/20 px-6 py-3.5 text-sm font-semibold text-teal-200 transition-all duration-200"
                >
                  See Live 2K Outputs
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/75 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  Offers, Costs &amp; Unit Economics
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/10">
                {[
                  { n: '15 Free', label: 'Starter Workspace Credits' },
                  { n: '$0.70', label: 'Cost per 2K Visual (Pro)' },
                  { n: '10 + 18', label: 'v5.2 Styles & Brand Presets' },
                  { n: '4 Modes', label: 'Web · Carousel · CLI · MCP' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-white">{s.n}</div>
                    <div className="text-[11px] text-white/45 uppercase tracking-wider mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Character */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

              <div className="relative w-[320px] lg:w-[400px]">
                <Image
                  src="/images/mascot/frank-omega-pixar-blue-v1.png"
                  alt="FRANK-Ω — FrankX AI Superintelligent Droid"
                  width={400}
                  height={400}
                  priority
                  className="relative z-10 w-full object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]"
                />

                <div className="absolute top-8 -left-4 z-20 rounded-2xl border border-violet-500/30 bg-black/70 backdrop-blur-md px-4 py-3">
                  <div className="text-xs text-violet-300 font-mono uppercase tracking-widest">
                    Designation
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">FRANK-Ω v5.2</div>
                </div>

                <div className="absolute top-8 -right-4 z-20 rounded-2xl border border-emerald-500/30 bg-black/70 backdrop-blur-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400">
                      Vercel AI Gateway
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mt-1">Sonar + Gemini 3 Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE STUDIO WORKBENCH ── */}
      <section className="py-16 px-6 border-t border-white/10 bg-gradient-to-b from-violet-950/15 to-transparent">
        <div className="max-w-6xl mx-auto">
          <InfoGeniusStudioWorkbench />
        </div>
      </section>

      {/* ── LIVE 2K PRODUCTION OUTPUTS GALLERY ── */}
      <section id="gallery" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-400">
                Verified Production Outputs
              </span>
              <h2 className="text-4xl font-black text-white mt-3">
                What InfoGenius v5.2 actually outputs.
              </h2>
              <p className="text-white/55 mt-3 max-w-2xl">
                Every visual below was generated end-to-end via{' '}
                <code className="text-teal-300">perplexity/sonar</code> web grounding +{' '}
                <code className="text-teal-300">google/gemini-3-pro-image</code> on Vercel AI
                Gateway, complete with its cryptographic{' '}
                <code className="text-amber-300">.vis.provenance.json</code> sidecar.
              </p>
            </div>
            <a
              href="#studio"
              className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 hover:bg-teal-500/20 px-5 py-2.5 text-xs font-bold text-teal-200 transition-all"
            >
              Generate Your Own Above ↑
            </a>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {liveShowcaseOutputs.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden grid lg:grid-cols-12 gap-0"
              >
                <div className="lg:col-span-7 bg-black/70 border-b lg:border-b-0 lg:border-r border-white/10 p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-auto rounded-2xl border border-white/10 object-contain max-h-[460px]"
                  />
                </div>
                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-[11px] font-bold text-teal-300">
                        {item.badge}
                      </span>
                      <span className="text-[11px] font-mono text-white/45">{item.model}</span>
                    </div>
                    <h3 className="text-xl font-black text-white">{item.title}</h3>
                    <div className="text-xs font-semibold text-amber-300">{item.styleLabel}</div>

                    <div className="pt-2 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                        Grounded Facts Rendered in Visual:
                      </div>
                      <ul className="space-y-1.5 text-xs text-white/75 leading-relaxed">
                        {item.facts.map((f, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-teal-400 font-mono font-bold">{idx + 1}.</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <pre className="rounded-xl bg-black/70 border border-white/10 p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                      {item.cli}
                    </pre>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href={item.imageSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 px-4 py-2 text-xs font-bold text-slate-950"
                      >
                        Open Full 2K PNG ↗
                      </a>
                      <a
                        href={item.provenanceHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 text-xs font-bold text-amber-200"
                      >
                        Inspect .vis.provenance.json
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── END-TO-END WORKFLOWS ── */}
      <section id="workflows" className="py-24 px-6 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              End-to-End Workflows
            </span>
            <h2 className="text-4xl font-black text-white mt-3">
              Four E2E workflows. From browser click to autonomous repo pipeline.
            </h2>
            <p className="text-white/55 mt-3 max-w-2xl">
              Use InfoGenius interactively in the browser with Managed Credits, or wire it directly
              into your local terminal, Claude Code, Cursor, and CI/CD publishing pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {e2eWorkflows.map((wf) => (
              <div
                key={wf.id}
                className="rounded-3xl border border-white/10 bg-[#0d111a] p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-violet-500/20 border border-violet-400/40 px-3 py-1 text-xs font-mono font-bold text-violet-200">
                      {wf.id}
                    </span>
                    <span className="text-xs text-teal-300 font-semibold">{wf.who}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{wf.title}</h3>
                  <ol className="space-y-2.5 text-xs text-white/75 leading-relaxed">
                    {wf.steps.map((s, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="font-mono font-bold text-violet-400">{idx + 1}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/45 uppercase tracking-wider font-semibold">
                      Deliverable Output:
                    </span>
                    <span className="text-amber-300 font-bold">{wf.outputDeliverable}</span>
                  </div>
                  <pre className="rounded-xl bg-black/70 border border-white/10 p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                    {wf.command}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFER, COST, UNIT ECONOMICS & VALUE MATRIX ── */}
      <section id="pricing" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Offer · Cost · Value · Outputs
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
              100× faster than an agency.
              <br />
              Zero hallucinated labels.
            </h2>
            <p className="text-white/55 mt-4 text-base leading-relaxed">
              Start free with 15 Managed Credits (3 full 2K infographics) or bring your own API
              key for free forever. When you want zero-setup managed rendering or the full Claude
              Code / Cursor MCP Plugin, pick a one-time pack below.
            </p>
          </div>

          {/* Unit Economics Comparison Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-white/45">
                Traditional Design Studio
              </div>
              <div className="text-2xl font-black text-white mt-1">$150 – $400 / visual</div>
              <p className="text-xs text-white/50 mt-2">
                2–4 business days turnaround · Manual fact checking · Static raster file with no
                machine-readable provenance or CLI automation.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-white/45">
                Raw ChatGPT / Midjourney Prompting
              </div>
              <div className="text-2xl font-black text-white mt-1">$20 / mo + 45 mins</div>
              <p className="text-xs text-white/50 mt-2">
                Unverified facts · Garbled or misspelled labels · Inconsistent colors across blog
                posts · No 5-slide Markdown decomposer or MCP server.
              </p>
            </div>
            <div className="rounded-2xl border border-teal-400/40 bg-teal-500/10 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                InfoGenius v5.2 Visual Knowledge OS
              </div>
              <div className="text-2xl font-black text-white mt-1">$0.64 – $0.95 / 2K visual</div>
              <p className="text-xs text-teal-100/80 mt-2">
                ~18 seconds · Live Perplexity Sonar &amp; Google Search citations · Locked Brand
                DNA · 5-Slide Carousel Decomposer + .vis.provenance.json sidecar.
              </p>
            </div>
          </div>

          {/* 4 Offer Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {offerTiers.map((tier) => (
              <div
                key={tier.sku}
                className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                  tier.highlight
                    ? 'border-teal-400/60 bg-gradient-to-b from-teal-500/15 via-[#0d131f] to-[#0d111a] shadow-2xl shadow-teal-500/10 scale-[1.01]'
                    : 'border-white/10 bg-[#0d111a]'
                }`}
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {tier.badge}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{tier.name}</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-xs text-white/50">{tier.period}</span>
                    </div>
                    <div className="text-xs font-semibold text-teal-300 mt-1">{tier.unitCost}</div>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{tier.description}</p>

                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                      Included Outputs &amp; Value:
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 leading-relaxed">
                      {tier.outputs.map((out, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-teal-400 font-bold">✓</span>
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href={tier.ctaHref}
                    className={`w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                      tier.highlight
                        ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 hover:opacity-95'
                        : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Credit Consumption Schedule */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-black/50 p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-white/65">
            <span className="font-bold text-white uppercase tracking-wider">
              Managed Credit Schedule:
            </span>
            <span>⚡ Grounded Web Research + Prompt: <strong>1 Credit</strong></span>
            <span>📑 5-Slide Article Decomposition: <strong>3 Credits</strong></span>
            <span>🖼️ 2K Grounded Infographic: <strong>5 Credits</strong></span>
            <span>💎 4K Print-Grade Infographic: <strong>8 Credits</strong></span>
            <span>🔊 Kore TTS Spoken Audio Briefing: <strong>2 Credits</strong></span>
            <span className="text-teal-300 font-semibold">🔑 BYOK Mode: 0 Credits (Free)</span>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Capabilities
            </span>
            <h2 className="text-4xl font-black text-white mt-3">
              Six systems running in parallel.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <GlowCard key={cap.title} color="violet" className="p-6">
                <div className="text-3xl mb-4">{cap.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{cap.body}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL STYLES ── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Styles
            </span>
            <h2 className="text-4xl font-black text-white mt-3">
              Ten v5.2 flagship aesthetics + 18 brand presets.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {styles.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl bg-gradient-to-br ${s.color} border border-white/8 p-5 hover:border-white/20 transition-all duration-200 cursor-default`}
              >
                <div className="text-sm font-bold text-white">{s.label}</div>
                <div className="text-xs text-white/45 mt-1">{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA & PRO PACK ── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <AuroraGradient
            variant="purple"
            intensity="normal"
            className="rounded-3xl border border-violet-500/20 p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-violet-500/40 mx-auto mb-6">
              <Image
                src="/images/mascot/frank-omega-pixar-blue-v1_thumb.jpeg"
                alt="FRANK-Ω"
                width={80}
                height={80}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1 text-xs font-semibold text-teal-300 mb-4">
              15 Free Credits in Web Studio · Local CLI &amp; MCP Plugin Ready
            </span>
            <h2 className="text-4xl font-black text-white mb-4">
              Ready to turn your next article or architecture into 2K visuals?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Use the 3-tab Studio above right now with 15 free workspace credits, or unlock{' '}
              <strong className="text-white">InfoGenius Pro OS ($49)</strong> with 350 Managed
              Credits, the Claude Code / Cursor MCP Plugin, and all 18 brand presets.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#studio"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
              >
                Open Interactive Studio
                <span>↑</span>
              </a>
              <Link
                href="/products/infogenius-pro"
                className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 hover:bg-teal-500/20 px-8 py-4 text-sm font-semibold text-teal-200 transition-all duration-200"
              >
                Explore InfoGenius Pro OS ($49) →
              </Link>
            </div>
          </AuroraGradient>
        </div>
      </section>
    </div>
  )
}
