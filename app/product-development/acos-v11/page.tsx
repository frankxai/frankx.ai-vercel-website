'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Play,
  Zap,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Layers,
  Monitor,
  Server,
  Cpu,
  Scissors,
  FileText,
  BarChart3,
  Bot,
  Workflow,
  Globe,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const phases = [
  {
    id: 1,
    name: 'Foundation',
    status: 'complete' as const,
    timeline: 'Feb 2026',
    cost: '$0',
    items: [
      { name: '/video-produce command', done: true, detail: 'Script generation with hook formulas, thumbnail prompts, YouTube metadata' },
      { name: '/video-clip command', done: true, detail: 'Timestamp annotation, viral scoring (1-10), chapter templates' },
      { name: '/video-publish command', done: true, detail: 'Multi-platform metadata: YouTube, TikTok, Reels, X' },
      { name: '/watch hub (public)', done: true, detail: '130+ videos, watchlists, persona filters, trending, blog cross-links' },
      { name: '/admin/youtube (private)', done: true, detail: '5-tab dashboard: Discovery, Annotations, Clip Queue, Bulk Manager' },
      { name: '/content-strategy/video-creation', done: true, detail: 'Content pillars, 4-week calendar, script templates, checklists' },
      { name: 'VideoObject JSON-LD SEO', done: true, detail: 'Schema on /watch + inline on every YouTubeEmbed in blog posts' },
      { name: 'Video production skill', done: true, detail: 'SKILL.md tying commands + data sources + MCP integrations' },
      { name: 'ACOS v11 strategy doc', done: true, detail: '455-line strategy covering MCP research, tools, rollout' },
    ],
  },
  {
    id: 2,
    name: 'Intelligence Layer',
    status: 'next' as const,
    timeline: 'Mar 2026',
    cost: '~$9/mo',
    items: [
      { name: 'YouTube MCP Server', done: false, detail: '40-tool server: search, metadata, trending, comments, captions. Free 10K units/day' },
      { name: 'CapCut MCP Server', done: false, detail: 'VectCutAPI-based: create drafts, add text/effects, render in cloud. Open source' },
      { name: 'Whisper transcription', done: false, detail: 'yt-dlp + faster-whisper pipeline. Local, free, outputs .srt + .txt' },
      { name: '/video-transcribe command', done: false, detail: 'URL or file → download → transcribe → .srt + .txt + summary' },
      { name: '/video-to-blog command', done: false, detail: 'Transcript → structured MDX blog post with headings, callouts, links' },
      { name: 'Analytics tab in /admin/youtube', done: false, detail: 'YouTube MCP data → views, CTR, watch time, audience retention charts' },
      { name: 'TubeBuddy integration', done: false, detail: 'A/B thumbnail testing, SEO scoring. $9/mo Legend plan' },
    ],
  },
  {
    id: 3,
    name: 'Automation Engine',
    status: 'planned' as const,
    timeline: 'Q2 2026',
    cost: '~$48/mo',
    items: [
      { name: 'OpusClip Pro', done: false, detail: '$29/mo. Auto-clip with captions, viral scoring, brand templates' },
      { name: 'OpusClip via n8n or Zapier', done: false, detail: 'Upload video → auto-clip → retrieve clips → queue for review' },
      { name: 'n8n self-hosted workflows', done: false, detail: 'Long→Shorts pipeline, YouTube scheduling, metadata generation' },
      { name: 'Creatomate video rendering', done: false, detail: '$19/mo. Branded intros/outros, thumbnail animations, social templates' },
      { name: 'OpenClaw 24/7 agent', done: false, detail: 'Autonomous content pipeline: monitor → generate → clip → queue' },
      { name: 'Content Flywheel automation', done: false, detail: 'Blog → video script → clips → social → newsletter from one source' },
    ],
  },
  {
    id: 4,
    name: 'Production Studio',
    status: 'future' as const,
    timeline: 'Q3-Q4 2026',
    cost: '~$295 one-time + $48/mo',
    items: [
      { name: 'DaVinci Resolve MCP', done: false, detail: 'Professional editing automation via Resolve scripting API' },
      { name: 'FFmpeg video-audio-mcp', done: false, detail: 'Thumbnail extraction, trimming, format conversion, waveform viz' },
      { name: 'Multi-language support', done: false, detail: 'Auto-translate titles/descriptions/captions for global reach' },
      { name: 'Performance-informed ideation', done: false, detail: 'Analytics → auto-suggest next content calendar based on what worked' },
      { name: 'Real-time trend monitoring', done: false, detail: 'YouTube trending API + niche monitoring → opportunity alerts' },
    ],
  },
]

const toolAnalysis = [
  {
    name: 'CapCut',
    verdict: 'Yes — MCP exists',
    detail: 'No official API, but community-built VectCutAPI + CapCut MCP Server (TypeScript, 11 tools). Can create drafts, add video/audio/text/effects, render in cloud. Open source. OpenClaw can drive CapCut desktop via screen automation.',
    links: [
      { label: 'CapCut MCP Server', url: 'https://lobehub.com/mcp/fancyboi999-capcut-mcp' },
      { label: 'VectCutAPI', url: 'https://github.com/sun-guannan/VectCutAPI' },
    ],
    cost: 'Free (community)',
    fit: 'high' as const,
  },
  {
    name: 'OpusClip',
    verdict: 'Zapier OR n8n (both work)',
    detail: 'Official Zapier integration (Pro plan). For n8n: use HTTP Request node with OpusClip REST API (closed beta, needs 20+ pack annual). Alternative: self-hosted OpusClip clone built with n8n + Python for $5/mo.',
    links: [
      { label: 'OpusClip Zapier', url: 'https://zapier.com/apps/opusclip/integrations' },
      { label: 'OpusClip Clone ($5/mo)', url: 'https://medium.com/@suryaelidanto/how-i-built-an-opus-pro-clone-for-5-mo-using-next-js-n8n-and-python-microservices-architecture-8281c3191db0' },
      { label: 'SupoClip (open source)', url: 'https://github.com/FujiwaraChoki/supoclip' },
    ],
    cost: '$29/mo (Pro) or $5/mo (clone)',
    fit: 'high' as const,
  },
  {
    name: 'Zapier vs n8n',
    verdict: 'Both — different roles',
    detail: 'Zapier: best for claude.ai MCP integrations (Slack, Notion, X, LinkedIn), 7,000+ app connections, no-code. n8n: best for self-hosted complex workflows (video pipelines, batch processing, custom logic), $0 self-hosted, 400+ integrations. Use Zapier for distribution, n8n for production pipelines.',
    links: [
      { label: 'n8n Video Templates (1,327)', url: 'https://n8n.io/workflows/categories/content-creation/' },
      { label: 'n8n vs Zapier', url: 'https://n8n.io/vs/zapier/' },
    ],
    cost: 'Zapier $20/mo + n8n $0 (self-hosted)',
    fit: 'high' as const,
  },
  {
    name: 'OpenClaw',
    verdict: 'Yes — manages Claude sessions',
    detail: 'Open-source 24/7 AI agent with Heartbeat system. Can orchestrate Claude Code sessions via MCP. Community skill exists for Claude Code integration. Best on spare hardware (4GB RAM min) or $5-8/mo VPS. Can manage OpusClip, CapCut, n8n workflows autonomously.',
    links: [
      { label: 'OpenClaw GitHub', url: 'https://github.com/openclaw/openclaw' },
      { label: 'Claude Code Skill', url: 'https://github.com/Enderfga/openclaw-claude-code-skill' },
      { label: 'OpusClip Guide', url: 'https://www.opus.pro/blog/openclaw-opusclip-content-machine' },
    ],
    cost: '$0 (self-hosted) + API costs',
    fit: 'high' as const,
  },
  {
    name: 'YouTube MCP',
    verdict: 'Ready to install',
    detail: '40-tool production-grade server: search, metadata, trending, comments, transcripts, SEO scoring, audience insights. Free 10K API units/day. Multiple community implementations.',
    links: [
      { label: 'pauling-ai (40 tools)', url: 'https://github.com/pauling-ai/youtube-mcp-server' },
      { label: 'kirbah (token-optimized)', url: 'https://github.com/kirbah/mcp-youtube' },
    ],
    cost: 'Free',
    fit: 'high' as const,
  },
  {
    name: 'Creatomate',
    verdict: 'Video rendering API',
    detail: 'Cloud REST API for programmatic video creation. Design templates, swap text/images/music via API. Native n8n integration. Branded intros, thumbnail animations, social clip templates.',
    links: [
      { label: 'Creatomate', url: 'https://creatomate.com/' },
      { label: 'n8n Integration', url: 'https://creatomate.com/blog/how-to-automate-video-creation-with-n8n' },
    ],
    cost: 'Free (10 renders/mo), Pro $19/mo',
    fit: 'medium' as const,
  },
  {
    name: 'Whisper + yt-dlp',
    verdict: 'Free local transcription',
    detail: 'Download any video + transcribe locally. Multiple tools: yt-whisper, youwhisper-cli, yt-dlp-clipper (includes subtitle burning). No API costs. Runs on WSL2.',
    links: [
      { label: 'yt-whisper', url: 'https://github.com/m1guelpf/yt-whisper' },
      { label: 'yt-dlp-clipper', url: 'https://github.com/hammond022/yt-dlp-clipper' },
    ],
    cost: 'Free',
    fit: 'high' as const,
  },
]

const openclawHosting = [
  {
    option: 'Spare Laptop',
    pros: ['Free compute', 'Full hardware access', 'Can run local LLMs (16GB RAM)', 'No monthly cost', 'Can run CapCut desktop'],
    cons: ['Must stay powered on', 'Home network IP changes', 'Power/internet outages kill it', 'Manual maintenance'],
    cost: '$0/mo (electricity only)',
    ram: '8-16GB available',
    best: 'Best for full local stack with CapCut + Whisper + local LLMs',
  },
  {
    option: 'Railway',
    pros: ['Easy Docker deploy', 'Auto-scaling', 'You have affiliate already', 'Git-based deploys', 'Good DX'],
    cons: ['$5-20/mo depending on usage', 'No GPU for Whisper', 'No desktop apps (no CapCut)', 'Ephemeral storage'],
    cost: '$5-20/mo',
    ram: '512MB-8GB configurable',
    best: 'Best for lightweight orchestration (n8n + OpenClaw)',
  },
  {
    option: 'OCI Free Tier',
    pros: ['Truly free forever (ARM A1)', '4 OCPU + 24GB RAM', 'Oracle expertise', 'Static IP', 'Always-on'],
    cons: ['ARM architecture limits some tools', 'OCI networking complexity', 'No GPU', 'Potential non-compete concerns'],
    cost: '$0/mo (free tier)',
    ram: '24GB (4 OCPU ARM)',
    best: 'Best free always-on server. Be mindful of Oracle non-compete.',
  },
  {
    option: 'Hetzner VPS',
    pros: ['$5/mo for 4GB RAM, 2 vCPU', 'Reliable EU hosting', 'Great perf/price', 'NVMe storage'],
    cons: ['Oracle non-compete concern (IaaS)', 'EU latency', 'Manual setup'],
    cost: '$5/mo',
    ram: '4-8GB',
    best: 'Best bang-for-buck VPS, but Oracle non-compete applies.',
  },
]

const costAnalysis = {
  lowVolume: {
    label: 'Solo Creator (3 videos/week)',
    monthly: [
      { item: 'OpusClip Pro', cost: 29 },
      { item: 'TubeBuddy Legend', cost: 9 },
      { item: 'Creatomate Pro', cost: 19 },
      { item: 'Zapier Starter', cost: 20 },
      { item: 'Railway (n8n + OpenClaw)', cost: 10 },
      { item: 'YouTube API', cost: 0 },
      { item: 'Whisper (local)', cost: 0 },
      { item: 'Claude API (ACOS)', cost: 15 },
    ],
    output: '3 long-form + 9-15 Shorts/week',
  },
  highVolume: {
    label: 'Content Machine (daily)',
    monthly: [
      { item: 'OpusClip Pro', cost: 29 },
      { item: 'TubeBuddy Legend', cost: 9 },
      { item: 'Creatomate Pro', cost: 19 },
      { item: 'Zapier Professional', cost: 50 },
      { item: 'Railway (n8n + OpenClaw)', cost: 20 },
      { item: 'YouTube API', cost: 0 },
      { item: 'Whisper (local)', cost: 0 },
      { item: 'Claude API (heavy)', cost: 40 },
      { item: 'Riverside Pro', cost: 15 },
    ],
    output: '7 long-form + 21-35 Shorts/week + daily social',
  },
  free: {
    label: 'Bootstrap (maximize free)',
    monthly: [
      { item: 'SupoClip (open source)', cost: 0 },
      { item: 'vidIQ free tier', cost: 0 },
      { item: 'n8n self-hosted', cost: 0 },
      { item: 'OpenClaw on spare laptop', cost: 0 },
      { item: 'YouTube API', cost: 0 },
      { item: 'Whisper (local)', cost: 0 },
      { item: 'Claude Code (included)', cost: 0 },
      { item: 'CapCut free tier', cost: 0 },
    ],
    output: '2-3 videos/week + 6-10 Shorts/week',
  },
}

const roiModels = [
  {
    strategy: 'High Volume / Low Intelligence',
    description: 'Automated shorts, trending topics, AI-generated scripts, minimal editing. Optimized for views and CPM revenue.',
    investment: '$102/mo (solo tier)',
    output: '30 Shorts + 12 long-form/month',
    metrics: {
      viewsPerMonth: '50K-200K',
      rpm: '$0.40-$3.00',
      revenueRange: '$20-$600/mo',
      breakEven: '2-6 months',
      ceiling: '$2K-5K/mo at scale',
    },
    pros: ['Fast to start', 'Algorithm-friendly volume', 'Tests many topics', 'Low effort per video'],
    cons: ['Low per-video value', 'Audience churn', 'Hard to monetize beyond ads', 'No brand equity'],
  },
  {
    strategy: 'High Quality / High Intelligence',
    description: 'Deep-researched tutorials, premium production, branded visuals, expert positioning. Optimized for authority and multi-revenue.',
    investment: '$182/mo (high volume tier)',
    output: '8-12 long-form + 20 Shorts/month',
    metrics: {
      viewsPerMonth: '20K-100K',
      rpm: '$5.00-$15.00',
      revenueRange: '$100-$1,500/mo (ads)',
      breakEven: '3-6 months',
      ceiling: '$10K-50K/mo (multi-revenue)',
    },
    pros: ['Brand authority', 'Sponsorship deals ($500-5K/video)', 'Product sales funnel', 'Consulting leads', 'Newsletter growth'],
    cons: ['Slower audience growth', 'Higher production time', 'Requires expertise', 'More investment'],
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles = {
    complete: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    next: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    planned: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    future: 'bg-white/10 text-white/50 border-white/10',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[status as keyof typeof styles] || styles.future}`}>
      {status}
    </span>
  )
}

function FitBadge({ fit }: { fit: string }) {
  const styles = {
    high: 'text-emerald-400',
    medium: 'text-amber-400',
    low: 'text-red-400',
  }
  return <span className={`text-xs font-semibold uppercase ${styles[fit as keyof typeof styles]}`}>Fit: {fit}</span>
}

function CostTier({ data, color }: { data: typeof costAnalysis.lowVolume; color: string }) {
  const total = data.monthly.reduce((sum, item) => sum + item.cost, 0)
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-white">{data.label}</h4>
        <span className={`text-lg font-bold ${color}`}>${total}/mo</span>
      </div>
      <div className="space-y-1.5 mb-4">
        {data.monthly.map((item) => (
          <div key={item.item} className="flex justify-between text-sm">
            <span className="text-white/60">{item.item}</span>
            <span className={item.cost === 0 ? 'text-emerald-400' : 'text-white/80'}>{item.cost === 0 ? 'Free' : `$${item.cost}`}</span>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-white/10">
        <p className="text-sm text-white/50">Output: <span className="text-white/80">{data.output}</span></p>
      </div>
    </div>
  )
}

function ExpandableSection({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <Icon className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-lg font-semibold text-white flex-1">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ACOSv11Roadmap() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
          <Link href="/product-development" className="hover:text-emerald-400 transition-colors">Product Development</Link>
          <span>/</span>
          <span className="text-white/60">ACOS v11</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          ACOS v11 <span className="text-emerald-400">Video Intelligence</span>
        </h1>
        <p className="text-lg text-white/60 max-w-3xl leading-relaxed">
          Complete product roadmap for the Video Intelligence System. From foundation commands
          to autonomous 24/7 content pipeline. Every tool analyzed, every cost modeled,
          every tradeoff documented.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/watch" className="text-sm text-emerald-400 flex items-center gap-1 hover:underline">
            <Play className="w-3.5 h-3.5" /> /watch hub <ExternalLink className="w-3 h-3" />
          </Link>
          <Link href="/admin/youtube" className="text-sm text-emerald-400 flex items-center gap-1 hover:underline">
            <Monitor className="w-3.5 h-3.5" /> /admin/youtube <ExternalLink className="w-3 h-3" />
          </Link>
          <Link href="/content-strategy/video-creation" className="text-sm text-emerald-400 flex items-center gap-1 hover:underline">
            <FileText className="w-3.5 h-3.5" /> Content Strategy <ExternalLink className="w-3 h-3" />
          </Link>
          <Link href="/acos" className="text-sm text-emerald-400 flex items-center gap-1 hover:underline">
            <Bot className="w-3.5 h-3.5" /> ACOS Hub <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 space-y-8 pb-24">

        {/* ── Phase Roadmap ────────────────────────────────────────────── */}
        <ExpandableSection title="4-Phase Roadmap" icon={Layers} defaultOpen>
          <div className="space-y-6">
            {phases.map((phase) => (
              <div key={phase.id} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-white/20">0{phase.id}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{phase.name}</h3>
                      <StatusBadge status={phase.status} />
                    </div>
                    <p className="text-xs text-white/40">{phase.timeline} &middot; {phase.cost}</p>
                  </div>
                  <span className="text-sm text-white/30">
                    {phase.items.filter(i => i.done).length}/{phase.items.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {phase.items.map((item) => (
                    <div key={item.name} className="flex items-start gap-2">
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <span className={`text-sm ${item.done ? 'text-white/80' : 'text-white/50'}`}>{item.name}</span>
                        <p className="text-xs text-white/30">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ExpandableSection>

        {/* ── Tool Analysis ────────────────────────────────────────────── */}
        <ExpandableSection title="Tool & Integration Analysis" icon={Zap}>
          <div className="space-y-4">
            {toolAnalysis.map((tool) => (
              <div key={tool.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{tool.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40">{tool.cost}</span>
                    <FitBadge fit={tool.fit} />
                  </div>
                </div>
                <p className="text-sm font-medium text-emerald-400/80 mb-1">{tool.verdict}</p>
                <p className="text-sm text-white/50 leading-relaxed mb-2">{tool.detail}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1"
                    >
                      {link.label} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ExpandableSection>

        {/* ── Zapier vs n8n ───────────────────────────────────────────── */}
        <ExpandableSection title="Zapier vs n8n Decision" icon={Workflow}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.03] p-4">
              <h4 className="font-semibold text-amber-400 mb-2">Keep Zapier For</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-amber-400 shrink-0" />Claude.ai MCP integrations (Slack, Notion, X, LinkedIn)</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-amber-400 shrink-0" />OpusClip official integration (Pro plan)</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-amber-400 shrink-0" />7,000+ app connections for distribution</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-amber-400 shrink-0" />No-code quick automations</li>
              </ul>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.03] p-4">
              <h4 className="font-semibold text-emerald-400 mb-2">Add n8n For</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-emerald-400 shrink-0" />Complex video pipelines (Long → Shorts)</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-emerald-400 shrink-0" />Self-hosted: $0/mo, unlimited executions</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-emerald-400 shrink-0" />Custom logic, branching, batch processing</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-emerald-400 shrink-0" />1,327 content creation templates ready</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-emerald-400 shrink-0" />Direct HTTP to any API (OpusClip, Creatomate)</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/40">
            Verdict: Use both. Zapier for distribution + MCP bridges. n8n for production pipelines + heavy automation.
            Not either/or — they serve different layers.
          </p>
        </ExpandableSection>

        {/* ── OpenClaw Hosting ─────────────────────────────────────────── */}
        <ExpandableSection title="OpenClaw Hosting Options" icon={Server}>
          <p className="text-sm text-white/50 mb-4">
            OpenClaw requires Node.js 20+, Docker, 2GB RAM minimum (4GB recommended).
            Claude manages it via MCP — OpenClaw acts as the always-on orchestration layer
            that wakes up on a Heartbeat, checks for pending tasks, and triggers ACOS commands.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {openclawHosting.map((opt) => (
              <div key={opt.option} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{opt.option}</h4>
                  <span className="text-xs text-emerald-400 font-medium">{opt.cost}</span>
                </div>
                <p className="text-xs text-white/40 mb-2">RAM: {opt.ram}</p>
                <div className="mb-2">
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Pros</p>
                  {opt.pros.map((p) => (
                    <p key={p} className="text-xs text-emerald-400/70 flex items-start gap-1"><span className="mt-0.5">+</span> {p}</p>
                  ))}
                </div>
                <div className="mb-2">
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Cons</p>
                  {opt.cons.map((c) => (
                    <p key={c} className="text-xs text-red-400/70 flex items-start gap-1"><span className="mt-0.5">-</span> {c}</p>
                  ))}
                </div>
                <p className="text-xs text-sky-400 mt-2">{opt.best}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.03] p-4">
            <h4 className="font-semibold text-emerald-400 mb-1">Recommendation: Spare Laptop</h4>
            <p className="text-sm text-white/60">
              Your spare laptop is the best option. Free compute, can run CapCut desktop + Whisper + local LLMs.
              OpenClaw manages Claude Code sessions via MCP. No Oracle non-compete concerns.
              If uptime matters later, add Railway ($10/mo) as fallback.
            </p>
          </div>
        </ExpandableSection>

        {/* ── Quality & Vision ─────────────────────────────────────────── */}
        <ExpandableSection title="Quality Checks: How Claude Sees Videos" icon={Monitor}>
          <div className="space-y-4">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
              <h4 className="font-semibold text-white mb-2">Current Capabilities</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                <li><span className="text-emerald-400 font-medium">Thumbnails:</span> Claude has vision. Can review generated thumbnails via nano-banana MCP or any image file. Checks brand alignment, text legibility, composition against Image Style DNA.</li>
                <li><span className="text-emerald-400 font-medium">Transcripts:</span> Can read and analyze full transcripts. Check pacing, key points, audience retention predictions.</li>
                <li><span className="text-emerald-400 font-medium">Metadata:</span> Title, description, tags — all text-based. Full quality control via ACOS commands.</li>
                <li><span className="text-emerald-400 font-medium">Screenshots:</span> Via Playwright MCP, can take screenshots of YouTube Studio, analytics pages, video frames.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
              <h4 className="font-semibold text-white mb-2">Video Review Pipeline</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                <li><span className="text-sky-400 font-medium">Frame extraction:</span> FFmpeg MCP extracts key frames at intervals → Claude reviews each frame for quality, branding, text readability</li>
                <li><span className="text-sky-400 font-medium">Transcript analysis:</span> Whisper transcription → Claude checks for filler words, dead air, hook strength, CTA clarity</li>
                <li><span className="text-sky-400 font-medium">Clip scoring:</span> OpusClip viral scores + Claude analysis = double-validation before publishing</li>
                <li><span className="text-sky-400 font-medium">Thumbnail A/B:</span> Generate 3-4 variants → Claude ranks against Image Style DNA 7-gate filter → TubeBuddy A/B tests the winner</li>
              </ul>
            </div>
            <p className="text-sm text-white/40">
              Claude cannot watch a video in real-time. But through frame extraction + transcription + metadata analysis,
              it can review ~90% of what matters for quality. The remaining 10% (audio quality, music sync, transitions)
              requires human review or future audio analysis MCP.
            </p>
          </div>
        </ExpandableSection>

        {/* ── Cost Analysis ────────────────────────────────────────────── */}
        <ExpandableSection title="Cost Analysis: 3 Tiers" icon={DollarSign}>
          <div className="grid md:grid-cols-3 gap-4">
            <CostTier data={costAnalysis.free} color="text-emerald-400" />
            <CostTier data={costAnalysis.lowVolume} color="text-amber-400" />
            <CostTier data={costAnalysis.highVolume} color="text-sky-400" />
          </div>
        </ExpandableSection>

        {/* ── ROI Models ───────────────────────────────────────────────── */}
        <ExpandableSection title="ROI: Volume vs Quality" icon={TrendingUp}>
          <div className="grid md:grid-cols-2 gap-6">
            {roiModels.map((model) => (
              <div key={model.strategy} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h4 className="font-bold text-white mb-1">{model.strategy}</h4>
                <p className="text-sm text-white/50 mb-3">{model.description}</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Investment</span>
                    <span className="text-white/80">{model.investment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Output</span>
                    <span className="text-white/80">{model.output}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Views/mo</span>
                    <span className="text-white/80">{model.metrics.viewsPerMonth}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">RPM</span>
                    <span className="text-white/80">{model.metrics.rpm}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Ad Revenue</span>
                    <span className="text-emerald-400">{model.metrics.revenueRange}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Break Even</span>
                    <span className="text-white/80">{model.metrics.breakEven}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Ceiling</span>
                    <span className="font-semibold text-sky-400">{model.metrics.ceiling}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-xs text-emerald-400/60 uppercase mb-1">Pros</p>
                    {model.pros.map((p) => <p key={p} className="text-xs text-white/50">+ {p}</p>)}
                  </div>
                  <div>
                    <p className="text-xs text-red-400/60 uppercase mb-1">Cons</p>
                    {model.cons.map((c) => <p key={c} className="text-xs text-white/50">- {c}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.03] p-4">
            <h4 className="font-semibold text-emerald-400 mb-1">Recommendation: Hybrid Approach</h4>
            <p className="text-sm text-white/60">
              High-quality long-form (2-3/week) for authority + product funnels.
              Auto-generated Shorts from clips (15-20/week) for reach + algorithm.
              The long-form drives $10K-50K/mo ceiling through sponsorships, product sales, consulting.
              The Shorts drive discovery. This is what Ali Abdaal, MKBHD, and top creators actually do.
              YouTube RPM for AI/tech content: $5-15 long-form vs $0.40-3 Shorts.
              Real money is in the funnel, not the CPM.
            </p>
          </div>
        </ExpandableSection>

        {/* ── Revenue Potential ─────────────────────────────────────────── */}
        <ExpandableSection title="Revenue Potential (12-Month Projection)" icon={BarChart3}>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'YouTube Ads', range: '$200-$1,500/mo', note: 'At 50K-200K views/mo' },
                { label: 'Sponsorships', range: '$500-$5,000/video', note: 'At 10K+ subs, AI niche' },
                { label: 'Product Sales', range: '$500-$5,000/mo', note: 'Templates, courses via funnel' },
                { label: 'Consulting Leads', range: '$2K-$10K/mo', note: 'Enterprise AI architecture' },
              ].map((rev) => (
                <div key={rev.label} className="text-center">
                  <p className="text-xs text-white/40 mb-1">{rev.label}</p>
                  <p className="text-sm font-semibold text-emerald-400">{rev.range}</p>
                  <p className="text-xs text-white/30">{rev.note}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Combined Monthly Potential (Month 12)</span>
                <span className="text-xl font-bold text-emerald-400">$3.2K - $21.5K/mo</span>
              </div>
              <p className="text-xs text-white/30 mt-1">Investment: $102-182/mo in tools. ROI: 17x-118x at scale.</p>
            </div>
          </div>
        </ExpandableSection>

        {/* ── Last Updated ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between text-xs text-white/20 pt-8 border-t border-white/[0.06]">
          <span>Last updated: February 20, 2026</span>
          <div className="flex gap-4">
            <Link href="/product-development" className="hover:text-white/40 transition-colors">All Products</Link>
            <Link href="/acos" className="hover:text-white/40 transition-colors">ACOS Hub</Link>
            <Link href="/watch" className="hover:text-white/40 transition-colors">Video Vault</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
