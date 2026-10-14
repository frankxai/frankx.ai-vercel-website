'use client'

import React, { useState } from 'react'
import {
  Video,
  UserCheck,
  ShoppingBag,
  Music,
  Bot,
  Coins,
  Copy,
  Check,
  ExternalLink,
  Download,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react'

export type WorkflowKey = 'cinematic' | 'soul-id' | 'ugc-product' | 'music-video' | 'agent-mcp' | 'credit-budgeting'

interface WorkflowDef {
  key: WorkflowKey
  title: string
  shortLabel: string
  badge: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  subject: string
  shotSequence: string[]
  acceptanceCheck: string
  stopRule: string
  route: string
}

const WORKFLOWS: WorkflowDef[] = [
  {
    key: 'cinematic',
    title: 'Cinematic 3-Shot Sequence',
    shortLabel: '3-Shot Scene',
    badge: 'Director Mode',
    description: 'Direct a bounded 3-shot narrative (arrival, preparation, decision) with locked camera moves.',
    icon: Video,
    subject: 'Seated presenter in studio with a closed notebook and background piano.',
    shotSequence: [
      'Shot 01 (Arrival): Wide view, door and room geometry stay completely stable.',
      'Shot 02 (Preparation): Medium side view, hand and notebook contact make physical sense.',
      'Shot 03 (Decision): Close eye-level push, face matches reference still and expression holds for exit.',
    ],
    acceptanceCheck: 'Verify geometry and hand contact in stills before animating. Accept clip only if face matches reference.',
    stopRule: 'Stop immediately if identity drifts, hands/props fuse, background warps, or camera cuts unprompted.',
    route: 'Cinema Studio 4.0 / Standard Video Generation',
  },
  {
    key: 'soul-id',
    title: 'Character Consistency (Soul ID)',
    shortLabel: 'Soul ID',
    badge: 'Presenter Lock',
    description: 'Maintain presenter identity across scenes using multi-angle reference stills.',
    icon: UserCheck,
    subject: 'Fixed presenter identity across multiple camera angles and lighting setups.',
    shotSequence: [
      'Ref 01: Neutral eye-level portrait with studio key light.',
      'Ref 02: 45-degree three-quarter view with consistent wardrobe.',
      'Ref 03: Profile view & close-up detail for motion lock.',
    ],
    acceptanceCheck: 'Facial structure, hair line, and wardrobe remain consistent across angle transitions.',
    stopRule: 'Reject shots where facial features transform, eyes misalign, or secondary figures appear.',
    route: 'Soul ID Character Lock + Reference Image Batch',
  },
  {
    key: 'ugc-product',
    title: 'UGC Product Demonstration',
    shortLabel: 'UGC Video',
    badge: 'Product Focus',
    description: 'Structure a product video around one demonstrable claim, physical contact, and CTA.',
    icon: ShoppingBag,
    subject: 'Presenter holding and demonstrating a single product feature.',
    shotSequence: [
      'Shot 01: Product reveal with clear brand label and stable lighting.',
      'Shot 02: Close-up hand interaction with packaging (no finger merging).',
      'Shot 03: Presenter key feature callout with natural gesture and clear exit.',
    ],
    acceptanceCheck: 'Product logo, text legibility, and hand geometry remain intact during movement.',
    stopRule: 'Reject immediately if product shape warps, brand text turns to gibberish, or fingers fuse into packaging.',
    route: 'Product Photoshoot / UGC Video Model',
  },
  {
    key: 'music-video',
    title: 'Music Video Sequence',
    shortLabel: 'Music Video',
    badge: 'Audio-Visual',
    description: 'Cut a synchronized visual sequence to an audio track with mood and lighting continuity.',
    icon: Music,
    subject: 'Rhythmic visual sequence matched to audio track tempo and emotional arc.',
    shotSequence: [
      'Shot 01: Atmosphere setter establishing key color palette and room mood.',
      'Shot 02: Dynamic performance or B-roll shot matching rhythm change.',
      'Shot 03: Climax visual push holding energy into transition.',
    ],
    acceptanceCheck: 'Color grade, contrast, and visual rhythm remain continuous across edit points.',
    stopRule: 'Reject shots with sudden frame stutter, flashing visual artifacts, or mismatched lighting.',
    route: 'Cinema Studio + Custom Audio Sync Track',
  },
  {
    key: 'agent-mcp',
    title: 'Agent / MCP Automation',
    shortLabel: 'Agent / MCP',
    badge: 'Developer Mode',
    description: 'Connect Claude / local agents via Higgsfield MCP for structured job submission and polling.',
    icon: Bot,
    subject: 'Automated video generation workflow via Claude MCP server.',
    shotSequence: [
      'Step 01: Connect MCP server at https://mcp.higgsfield.ai/mcp',
      'Step 02: Run read-only preflight to verify account balance and inspect available tools.',
      'Step 03: Submit bounded brief with authorized credit cap and poll job to terminal status.',
    ],
    acceptanceCheck: 'Preflight verifies account balance and tools; returned job reaches terminal completion without error.',
    stopRule: 'Halt agent execution if credit balance is missing, quota exceeded, or tool errors occur.',
    route: 'Higgsfield MCP Server + Agentic SDK',
  },
  {
    key: 'credit-budgeting',
    title: 'Credit Economics & Budgeting',
    shortLabel: 'Credit Budget',
    badge: 'Yield Optimization',
    description: 'Measure cost per accepted shot rather than raw credit generations.',
    icon: Coins,
    subject: 'Yield-optimized credit allocation and strict retry policy.',
    shotSequence: [
      'Rule 01: Check current credit cost on model selector before issuing first render.',
      'Rule 02: Allocate maximum 2 retry attempts per shot brief.',
      'Rule 03: Log cost, model, and job ID in CSV ledger after each attempt.',
    ],
    acceptanceCheck: 'Cost Per Usable Second = (Total Credits Spent × Credit Rate) / Accepted Timeline Seconds.',
    stopRule: 'Stop generating if 2 consecutive retries fail for the same root cause; refine reference instead.',
    route: 'Shot Ledger CSV + Quota Guard',
  },
]

export default function HiggsfieldWorkbench() {
  const [selectedKey, setSelectedKey] = useState<WorkflowKey>('cinematic')
  const [copied, setCopied] = useState(false)

  const wf = WORKFLOWS.find((w) => w.key === selectedKey) || WORKFLOWS[0]
  const Icon = wf.icon

  const briefText = `HIGGSFIELD PRODUCTION BRIEF — ${wf.title.toUpperCase()}
Workflow: ${wf.title} (${wf.badge}) | Route: ${wf.route}
1. SUBJECT: ${wf.subject}
2. SEQUENCE:\n${wf.shotSequence.map((s) => `  • ${s}`).join('\n')}
3. ACCEPTANCE CHECK: ${wf.acceptanceCheck}
4. STOP RULE: ${wf.stopRule}
Prepared with FrankX Higgsfield Workbench (frankx.ai/guides/higgsfield-ai-video-guide)`.trim()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(briefText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section aria-labelledby="higgsfield-wb-title" className="my-10 rounded-2xl border border-white/10 bg-[#0d1117] p-6 text-white shadow-2xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Production Brief Workbench
            </span>
          </div>
          <h2 id="higgsfield-wb-title" className="text-2xl font-bold tracking-tight text-white">Higgsfield Workflow & Brief Builder</h2>
          <p className="mt-1 text-xs text-white/70">Select a workflow to generate a copy-ready production brief with acceptance and stop rules.</p>
        </div>
        <div className="shrink-0">
          <a href="/go/higgsfield" target="_blank" rel="noopener sponsored" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400" aria-label="Open Higgsfield (Referral Link)">
            <span>Open Higgsfield</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="mt-0.5 text-[10px] text-right text-white/40">Referral Link</p>
        </div>
      </div>

      <div className="mt-5">
        <label id="wf-selector-label" className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">Choose Production Workflow:</label>
        <div role="tablist" aria-labelledby="wf-selector-label" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {WORKFLOWS.map((w) => {
            const isSelected = w.key === selectedKey
            const WIcon = w.icon
            return (
              <button key={w.key} type="button" role="tab" aria-selected={isSelected} aria-controls={`wf-panel-${w.key}`} id={`tab-${w.key}`} onClick={() => setSelectedKey(w.key)} className={`flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${isSelected ? 'border-emerald-500/60 bg-emerald-500/15 text-white font-semibold' : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white'}`}>
                <WIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-white/50'}`} />
                <span className="truncate">{w.shortLabel}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div id={`wf-panel-${wf.key}`} role="tabpanel" aria-labelledby={`tab-${wf.key}`} className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"><Icon className="w-4 h-4" /></div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{wf.title}</h3>
                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{wf.badge}</span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">{wf.description}</p>
            </div>
          </div>
          <button type="button" onClick={handleCopy} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400" aria-label="Copy production brief to clipboard">
            {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Brief Copied!</span></> : <><Copy className="w-3.5 h-3.5 text-white/70" /><span>Copy Brief</span></>}
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/80">
          <div><span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">Subject & Scene:</span><p className="mt-1 rounded-lg border border-white/5 bg-[#090d13] p-2.5 text-white/90 font-mono">{wf.subject}</p></div>
          <div>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">Shot Sequence:</span>
            <ul className="mt-1 space-y-1">{wf.shotSequence.map((step, idx) => (<li key={idx} className="flex items-start gap-2 rounded-lg border border-white/5 bg-[#090d13] p-2 text-white/85"><span className="text-emerald-400 font-mono font-bold">{idx + 1}.</span><span>{step}</span></li>))}</ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider"><ShieldCheck className="w-3.5 h-3.5" /><span>Acceptance Criterion</span></div>
              <p className="mt-1 text-white/80">{wf.acceptanceCheck}</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] uppercase tracking-wider"><AlertTriangle className="w-3.5 h-3.5" /><span>Stop Rule</span></div>
              <p className="mt-1 text-white/80">{wf.stopRule}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-white/80">Worksheets:</span>
          <a href="/downloads/higgsfield-shot-brief.md" download className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"><Download className="w-3 h-3" /><span>Shot Brief (.md)</span></a>
          <a href="/downloads/higgsfield-shot-ledger.csv" download className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"><Download className="w-3 h-3" /><span>Shot Ledger (.csv)</span></a>
        </div>
        <div className="text-white/50 text-[11px]">Route: <code className="text-emerald-300/90">{wf.route}</code></div>
      </div>
    </section>
  )
}
