'use client'

import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Search,
  Key,
  Copy,
  Check,
  Download,
  Volume2,
  Terminal,
  FileJson,
  ExternalLink,
  Layers,
  Loader2,
  ShieldCheck,
  FileText,
  Palette,
  Wand2,
} from 'lucide-react'

interface StyleOption {
  key: string
  label: string
  tag: string
  accent: string
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    key: 'glassmorphic',
    label: '3D Glassmorphic',
    tag: 'v5.2 Flagship · Crystal & Teal',
    accent: 'border-teal-400/40 bg-teal-500/10 text-teal-200',
  },
  {
    key: 'premium',
    label: 'Luxury Brand Visual',
    tag: 'v5.2 Flagship · Apple × DeepMind',
    accent: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
  },
  {
    key: 'da-vinci-technical',
    label: 'Da Vinci Technical',
    tag: 'FrankX Signature · Blueprint',
    accent: 'border-orange-400/40 bg-orange-500/10 text-orange-200',
  },
  {
    key: '3d-isometric',
    label: '3D Isometric Studio',
    tag: 'FrankX Signature · Modular',
    accent: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  },
  {
    key: 'coe-blueprint',
    label: 'GenCreator CoE',
    tag: '6-Pillar Enterprise Architecture',
    accent: 'border-violet-400/40 bg-violet-500/10 text-violet-200',
  },
  {
    key: 'standard',
    label: 'Scientific Illustration',
    tag: 'Clean Editorial',
    accent: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200',
  },
  {
    key: 'minimalist',
    label: 'Bauhaus Minimal',
    tag: 'Swiss Vector Grid',
    accent: 'border-white/30 bg-white/10 text-white',
  },
  {
    key: 'photorealistic',
    label: 'Photorealistic 8K',
    tag: 'Hasselblad 50mm Optical',
    accent: 'border-blue-400/40 bg-blue-500/10 text-blue-200',
  },
  {
    key: 'futuristic',
    label: 'Focused Futuristic',
    tag: 'Restrained Telemetry HUD',
    accent: 'border-purple-400/40 bg-purple-500/10 text-purple-200',
  },
  {
    key: 'vintage',
    label: 'Scientific Lithograph',
    tag: '19th Century Engraving',
    accent: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-200',
  },
]

const SAMPLE_TOPICS = [
  'Sovereign AI Swarm Architecture & Verification Gates',
  'Model Context Protocol (MCP) Server Topology',
  'Agentic Creator OS: 6-Layer Closed-Loop Operating Model',
  'Zero-Knowledge Proofs & Verifiable AI Compute',
]

const SAMPLE_ARTICLE = `# Sovereign AI Agent Swarms: The 6-Layer Operating Architecture

Modern multi-agent systems fail when every agent shares a single unverified context window. To scale autonomous execution without compounding hallucinations, an estate requires a separated maker-verifier topology.

## 1. Core Substrate & Event-Sourced Memory
- 6 semantic memory vaults indexed via SQLite FTS5 + append-only JSONL logs.
- 90-day temporal half-life with contradiction detection and background consolidation.
- Zero-Orphan provenance sidecars attached to every generated code and media artifact.

## 2. Maker vs. Independent Verifier Loop
- One maker owns each isolated git worktree and branch lane.
- An independent verifier model family audits every commit against deterministic gates before promotion.
- Money, credentials, DNS, and external sends fail closed behind named human approval.

## 3. Production Telemetry & Cost Economics
- Dynamic model routing cuts token spend by 68% by routing mechanical checks to deterministic scripts.
- 100% of visual and code outputs emit verifiable receipts into the central scoreboard.`

const STORAGE_KEY = 'frankx_infogenius_byok_key'
const TENANT_STORAGE_KEY = 'frankx_infogenius_tenant_id_v1'

interface TenantWalletSummary {
  tenantId: string
  creditsRemaining: number
  totalCreditsPurchased: number
  totalCreditsUsed: number
  plan: string
  brandPresetsCount?: number
  galleryCount?: number
  recentGallery?: Array<{
    id: string
    topic: string
    style: string
    aspectRatio: string
    imageSize: string
    createdAt: string
  }>
}

interface CreditPackItem {
  sku: string
  name: string
  credits: number
  priceUsd: number
  planUpgrade: string
  badge: string
  description: string
}

interface StudioResult {
  mode: string
  provider: string
  billingMode?: string
  imageModel?: string
  imageDataUrl?: string | null
  topic: string
  style: { key: string; name: string; tag: string }
  audience: { label: string; density: string }
  aspectRatio: string
  imageSize: string
  research: {
    facts: string[]
    visualElements: string[]
    labels: string[]
    context: string
    videoPrompt: string
    searchResults: Array<{ title: string; url: string }>
    sources: string[]
    grounded?: boolean
  }
  imagePrompt: string
  videoPrompt: string
  cliCommand: string
  mdxSnippet: string
  wallet?: {
    tenantId: string
    creditsRemaining: number
    creditsDeducted?: number
    plan: string
  }
  provenance?: Record<string, unknown>
}

interface DecomposedSlide {
  slideNumber: number
  role: string
  title: string
  facts: string[]
  visualElements: string[]
  labels: string[]
  imagePrompt: string
  cliCommand: string
  renderedImageUrl?: string
  isRendering?: boolean
}

interface DecomposedPackResult {
  mode: string
  documentTitle: string
  style: { key: string; name: string }
  aspectRatio: string
  imageSize: string
  slides: DecomposedSlide[]
  batchCliScript: string
}

export default function InfoGeniusStudioWorkbench() {
  const [activeTab, setActiveTab] = useState<'single' | 'decompose' | 'brand'>('single')

  const [topic, setTopic] = useState(SAMPLE_TOPICS[0])
  const [articleText, setArticleText] = useState(SAMPLE_ARTICLE)
  const [style, setStyle] = useState('glassmorphic')
  const [audience, setAudience] = useState<'elementary' | 'highschool' | 'college' | 'expert'>('expert')
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '9:16'>('16:9')
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('2K')
  const [label, setLabel] = useState('')

  // Custom Brand DNA state (Tab 3)
  const [useCustomBrand, setUseCustomBrand] = useState(false)
  const [brandKey, setBrandKey] = useState('custom/sovereign-glass')
  const [brandName, setBrandName] = useState('Sovereign Crystal & Gold')
  const [brandVoidHex, setBrandVoidHex] = useState('#0b0e14')
  const [brandPrimaryHex, setBrandPrimaryHex] = useState('#7fffd4')
  const [brandSecondaryHex, setBrandSecondaryHex] = useState('#ffd700')
  const [brandTextHex, setBrandTextHex] = useState('#ffffff')
  const [brandMaterial, setBrandMaterial] = useState(
    'Frosted translucent crystal cards floating at multiple depths with directional upper-left rim lighting and luminous connection threads'
  )
  const [brandNegative, setBrandNegative] = useState(
    'NEVER flat clipart, NEVER neon cyberpunk clutter, NEVER plastic clay, NEVER illegible text'
  )

  const [apiKey, setApiKey] = useState('')
  const [showKeyInput, setShowKeyInput] = useState(false)
  const [tenantId, setTenantId] = useState('demo-public-workspace')
  const [wallet, setWallet] = useState<TenantWalletSummary | null>(null)
  const [managedGatewayActive, setManagedGatewayActive] = useState(false)
  const [creditPackCatalog, setCreditPackCatalog] = useState<CreditPackItem[]>([])
  const [showCreditsDrawer, setShowCreditsDrawer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [result, setResult] = useState<StudioResult | null>(null)
  const [packResult, setPackResult] = useState<DecomposedPackResult | null>(null)
  const [audioDataUrl, setAudioDataUrl] = useState<string | null>(null)
  const [isNarrating, setIsNarrating] = useState(false)
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const refreshWallet = async (targetTenantId: string) => {
    try {
      const res = await fetch(
        `/api/byok/infogenius?tenantId=${encodeURIComponent(targetTenantId)}`,
        { cache: 'no-store' }
      )
      if (!res.ok) return
      const data = await res.json()
      if (data.wallet) setWallet(data.wallet)
      if (typeof data.managedGatewayActive === 'boolean') {
        setManagedGatewayActive(data.managedGatewayActive)
      }
      if (Array.isArray(data.creditPackCatalog)) {
        setCreditPackCatalog(data.creditPackCatalog)
      }
    } catch {
      // ignore network error on initial load
    }
  }

  useEffect(() => {
    let initialTenant = 'demo-public-workspace'
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setApiKey(saved)
      const savedTenant = window.localStorage.getItem(TENANT_STORAGE_KEY)
      if (savedTenant) {
        initialTenant = savedTenant
        setTenantId(savedTenant)
      } else {
        const generated = `ws-${Math.random().toString(36).slice(2, 9)}`
        window.localStorage.setItem(TENANT_STORAGE_KEY, generated)
        initialTenant = generated
        setTenantId(generated)
      }
    } catch {
      // ignore storage errors
    }
    void refreshWallet(initialTenant)
  }, [])

  const handleSaveKey = (val: string) => {
    setApiKey(val)
    try {
      if (val.trim()) window.localStorage.setItem(STORAGE_KEY, val.trim())
      else window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const handleTenantChange = (nextTenant: string) => {
    const clean = nextTenant.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || 'demo-public-workspace'
    setTenantId(clean)
    try {
      window.localStorage.setItem(TENANT_STORAGE_KEY, clean)
    } catch {
      // ignore
    }
    void refreshWallet(clean)
  }

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedTab(key)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch {
      // ignore
    }
  }

  const synthesizedCustomInstruction = `${brandName}. Background void (${brandVoidHex}). ${brandMaterial}. Primary accent (${brandPrimaryHex}), secondary highlight (${brandSecondaryHex}), crisp legible labels (${brandTextHex}). ${brandNegative}.`
  const synthesizedCustomPalette = [
    `${brandVoidHex} background`,
    `${brandPrimaryHex} primary accent`,
    `${brandSecondaryHex} secondary highlight`,
    `${brandTextHex} typography`,
  ]

  const canRenderWithManagedCredits =
    managedGatewayActive && (wallet?.creditsRemaining ?? 0) >= (imageSize === '4K' ? 8 : 5)

  const runAction = async (action: 'architect' | 'generate') => {
    if (!topic.trim() || isLoading) return
    setIsLoading(true)
    setError(null)
    setAudioDataUrl(null)
    setLoadingStage(
      action === 'generate'
        ? 'Grounding topic via live web search & rendering infographic...'
        : apiKey.trim() || managedGatewayActive
          ? 'Grounding topic via live web search & synthesizing v5.2 prompt...'
          : 'Synthesizing InfoGenius v5.2 Master Visual Prompt & CLI bundle...'
    )

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Tenant-Id': tenantId,
      }
      if (apiKey.trim()) headers['X-User-API-Key'] = apiKey.trim()

      const res = await fetch('/api/byok/infogenius', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          action,
          tenantId,
          topic: topic.trim(),
          style: useCustomBrand ? brandKey : style,
          customStyleName: useCustomBrand ? brandName : undefined,
          customStyleInstruction: useCustomBrand ? synthesizedCustomInstruction : undefined,
          customPalette: useCustomBrand ? synthesizedCustomPalette : undefined,
          audience,
          aspectRatio,
          imageSize,
          label: label.trim() || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        if (data.wallet) {
          setWallet((prev) =>
            prev ? { ...prev, creditsRemaining: data.wallet.creditsRemaining } : prev
          )
          setShowCreditsDrawer(true)
        }
        throw new Error(data.error || 'Request failed')
      }
      setResult(data)
      if (data.wallet) {
        setWallet((prev) =>
          prev
            ? {
                ...prev,
                creditsRemaining: data.wallet.creditsRemaining,
                plan: data.wallet.plan || prev.plan,
              }
            : {
                tenantId: data.wallet.tenantId,
                creditsRemaining: data.wallet.creditsRemaining,
                totalCreditsPurchased: 15,
                totalCreditsUsed: 0,
                plan: data.wallet.plan || 'starter-trial',
              }
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
      setLoadingStage('')
    }
  }

  const runDecomposeArticle = async () => {
    if (!articleText.trim() || isLoading) return
    setIsLoading(true)
    setError(null)
    setLoadingStage(
      apiKey.trim() || managedGatewayActive
        ? 'Decomposing article into 5 architectural visuals via AI Gateway...'
        : 'Decomposing markdown into 5-part Visual Carousel & Diagram Pack...'
    )

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Tenant-Id': tenantId,
      }
      if (apiKey.trim()) headers['X-User-API-Key'] = apiKey.trim()

      const res = await fetch('/api/byok/infogenius', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          action: 'decompose-article',
          tenantId,
          articleText: articleText.trim(),
          style: useCustomBrand ? brandKey : style,
          customStyleName: useCustomBrand ? brandName : undefined,
          customStyleInstruction: useCustomBrand ? synthesizedCustomInstruction : undefined,
          customPalette: useCustomBrand ? synthesizedCustomPalette : undefined,
          audience,
          aspectRatio,
          imageSize,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Decomposition failed')
      setPackResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decomposition failed')
    } finally {
      setIsLoading(false)
      setLoadingStage('')
    }
  }

  const renderSingleSlide = async (slideIndex: number) => {
    if (!packResult) return
    if (!apiKey.trim() && !canRenderWithManagedCredits) {
      setShowCreditsDrawer(true)
      setError(
        'Top up Workspace Credits or connect a BYOK key (Gemini / Vercel AI Gateway / OpenRouter) to render slide pixels.'
      )
      return
    }

    const targetSlide = packResult.slides[slideIndex]
    const updatedSlides = [...packResult.slides]
    updatedSlides[slideIndex] = { ...targetSlide, isRendering: true }
    setPackResult({ ...packResult, slides: updatedSlides })
    setError(null)

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Tenant-Id': tenantId,
      }
      if (apiKey.trim()) headers['X-User-API-Key'] = apiKey.trim()

      const res = await fetch('/api/byok/infogenius', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          action: 'generate',
          tenantId,
          topic: targetSlide.title,
          customFacts: targetSlide.facts,
          style: useCustomBrand ? brandKey : style,
          customStyleName: useCustomBrand ? brandName : undefined,
          customStyleInstruction: useCustomBrand ? synthesizedCustomInstruction : undefined,
          customPalette: useCustomBrand ? synthesizedCustomPalette : undefined,
          audience,
          aspectRatio,
          imageSize,
          label: targetSlide.title,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to render slide')

      if (data.wallet) {
        setWallet((prev) =>
          prev ? { ...prev, creditsRemaining: data.wallet.creditsRemaining } : prev
        )
      }

      const nextSlides = [...packResult.slides]
      nextSlides[slideIndex] = {
        ...targetSlide,
        isRendering: false,
        renderedImageUrl: data.imageDataUrl,
      }
      setPackResult({ ...packResult, slides: nextSlides })
    } catch (err) {
      const nextSlides = [...packResult.slides]
      nextSlides[slideIndex] = { ...targetSlide, isRendering: false }
      setPackResult({ ...packResult, slides: nextSlides })
      setError(err instanceof Error ? err.message : 'Failed to render slide')
    }
  }

  const handleNarrate = async () => {
    if (!result || isNarrating) return
    if (!apiKey.trim() || apiKey.trim().startsWith('sk-or-')) {
      setError('Spoken Kore TTS narration requires a Google Gemini API key in the BYOK drawer.')
      setShowKeyInput(true)
      return
    }
    setIsNarrating(true)
    setError(null)
    try {
      const res = await fetch('/api/byok/infogenius', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-API-Key': apiKey.trim(),
        },
        body: JSON.stringify({
          action: 'narrate',
          topic: result.topic,
          customFacts: result.research.facts,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'TTS failed')
      setAudioDataUrl(data.audioDataUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Narration failed')
    } finally {
      setIsNarrating(false)
    }
  }

  const downloadProvenance = () => {
    if (!result) return
    const payload = result.provenance || {
      schemaVersion: '5.2.0',
      topic: result.topic,
      style: result.style.key,
      audience: result.audience.label,
      aspectRatio: result.aspectRatio,
      research: result.research,
      prompts: {
        imagePrompt: result.imagePrompt,
        videoPrompt: result.videoPrompt,
      },
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `infogenius-${result.style.key}.vis.provenance.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const customPresetJson = {
    key: brandKey,
    namespace: brandKey.split('/')[0] || 'custom',
    name: brandName,
    defaultAspect: aspectRatio,
    palette: synthesizedCustomPalette,
    promptFragment: synthesizedCustomInstruction,
    composition: brandMaterial,
  }

  const downloadCustomPresetJson = () => {
    const blob = new Blob([JSON.stringify(customPresetJson, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${brandKey.replace(/\//g, '-')}.preset.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const detectedProvider = apiKey.trim().startsWith('vck_')
    ? 'Vercel AI Gateway (Sonar + Nano Banana)'
    : apiKey.trim().startsWith('sk-or-')
      ? 'OpenRouter (:online + Nano Banana)'
      : apiKey.trim()
        ? 'Google Gemini Direct (Search + 4K + TTS)'
        : managedGatewayActive
          ? `Managed Vercel AI Gateway (${wallet?.creditsRemaining ?? 15} Credits)`
          : 'Zero-Key Prompt Architect (Free)'

  return (
    <div id="studio" className="rounded-3xl border border-white/10 bg-[#0d111a]/90 backdrop-blur-xl p-6 md:p-10 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-300">
            <Sparkles className="w-3.5 h-3.5" />
            InfoGenius v5.2 Visual Knowledge OS
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white mt-2">
            Research → Visual Knowledge Architect
          </h3>
          <p className="text-sm text-white/50 mt-1">
            Single Topic Studio, Article-to-5-Slide Carousel Decomposer, and Custom Brand DNA Builder.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowCreditsDrawer(!showCreditsDrawer)}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-2.5 text-xs font-bold text-amber-200 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{wallet ? `${wallet.creditsRemaining} Credits` : '15 Trial Credits'}</span>
            <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
              {wallet?.plan || 'starter'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowKeyInput(!showKeyInput)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
              apiKey.trim()
                ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                : 'border-white/15 bg-white/5 text-white/70 hover:text-white hover:border-white/30'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            {apiKey.trim() ? `BYOK Active (${detectedProvider.split(' ')[0]})` : 'BYOK Key (Optional)'}
          </button>
        </div>
      </div>

      {/* Multi-Tenant Workspace Credits & Top-Up Drawer */}
      {showCreditsDrawer && (
        <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/[0.06] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Multi-Tenant Workspace Credit Wallet (Managed Vercel AI Gateway)
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Every workspace starts with <strong>15 free trial credits</strong> (3 full 2K infographics). Top up credits below or connect your own BYOK key for unlimited self-billed rendering.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-white/50">Workspace ID:</span>
              <input
                type="text"
                value={tenantId}
                onChange={(e) => handleTenantChange(e.target.value)}
                className="rounded-lg border border-white/15 bg-black/50 px-2.5 py-1 text-xs font-mono text-amber-200 w-44"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(creditPackCatalog.length > 0
              ? creditPackCatalog
              : [
                  {
                    sku: 'infogenius-credits-100',
                    name: 'InfoGenius 100 Credit Pack',
                    credits: 100,
                    priceUsd: 19,
                    planUpgrade: 'creator-pack',
                    badge: '20 × 2K Visuals',
                    description: '100 Managed Vercel AI Gateway credits for 20 grounded 2K infographics.',
                  },
                  {
                    sku: 'infogenius-pro',
                    name: 'InfoGenius Pro OS + 350 Credits',
                    credits: 350,
                    priceUsd: 49,
                    planUpgrade: 'pro-os',
                    badge: 'Most Popular · 70 × 2K Visuals',
                    description: '350 Managed credits + full Claude Code / Cursor MCP Plugin & 18 Brand Presets.',
                  },
                  {
                    sku: 'infogenius-team-1000',
                    name: 'InfoGenius Agency Team + 1,000 Credits',
                    credits: 1000,
                    priceUsd: 129,
                    planUpgrade: 'team-agency',
                    badge: '200 × 2K Visuals · Multi-Seat',
                    description: '1,000 Managed credits + Custom Brand Style Vault for content teams.',
                  },
                ]
            ).map((pack) => (
              <div
                key={pack.sku}
                className="rounded-xl border border-white/10 bg-black/50 p-4 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                      {pack.badge}
                    </span>
                    <span className="text-sm font-black text-white">${pack.priceUsd}</span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{pack.name}</div>
                  <p className="text-[11px] text-white/55 mt-1 leading-relaxed">{pack.description}</p>
                </div>
                <a
                  href={`/waitlist?intent=infogenius-pro&sku=${encodeURIComponent(pack.sku)}&tenantId=${encodeURIComponent(tenantId)}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 px-3 py-2 text-xs font-bold text-slate-950 transition-all"
                >
                  Top Up +{pack.credits} Credits (${pack.priceUsd})
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode Switcher Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('single')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'single'
              ? 'bg-teal-500/20 border border-teal-400/50 text-teal-200'
              : 'bg-white/[0.03] border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          1. Single Topic Infographic
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('decompose')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'decompose'
              ? 'bg-violet-500/20 border border-violet-400/50 text-violet-200'
              : 'bg-white/[0.03] border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          2. Article / Markdown → 5-Slide Pack
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('brand')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'brand'
              ? 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
              : 'bg-white/[0.03] border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          3. Custom Brand Style Builder
          {useCustomBrand && (
            <span className="ml-1 rounded-full bg-amber-400/30 px-2 py-0.5 text-[10px] text-amber-200">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Optional BYOK Drawer */}
      {showKeyInput && (
        <div className="mt-6 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Client-Side BYOK Vault (Stored only in your browser)
              </div>
              <p className="text-xs text-white/60">
                Paste a <strong>Google AI Studio Key</strong> (Search grounding + 4K Nano Banana Pro + Kore TTS), a <strong>Vercel AI Gateway Key</strong> (<code>vck_...</code>, zero-markup unified Vercel billing), or an <strong>OpenRouter Key</strong> (<code>sk-or-v1-...</code>).
              </p>
            </div>
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:underline shrink-0"
            >
              Get Google AI Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="mt-3 flex gap-3">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => handleSaveKey(e.target.value)}
              placeholder="Paste GEMINI_API_KEY, AI_GATEWAY_API_KEY (vck_...), or OPENROUTER_API_KEY (sk-or-...)"
              className="flex-1 rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-teal-400 focus:outline-none font-mono"
            />
            {apiKey && (
              <button
                type="button"
                onClick={() => handleSaveKey('')}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/60 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM BRAND DNA BUILDER */}
      {activeTab === 'brand' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-white">
                Custom Brand Style Pack Builder (<code>infogenius-presets.json</code>)
              </h4>
              <p className="text-xs text-white/50 mt-0.5">
                Lock your team&apos;s hex palette, material physics, and anti-slop guardrails into a reusable preset for the Web Studio, CLI, and MCP Server.
              </p>
            </div>
            <label className="inline-flex items-center gap-2.5 cursor-pointer rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-200">
              <input
                type="checkbox"
                checked={useCustomBrand}
                onChange={(e) => setUseCustomBrand(e.target.checked)}
                className="rounded accent-amber-400"
              />
              Apply Custom Brand Style to Studio
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Preset Key (namespace/slug)
              </label>
              <input
                type="text"
                value={brandKey}
                onChange={(e) => setBrandKey(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Void Background Hex', val: brandVoidHex, set: setBrandVoidHex },
              { label: 'Primary Accent Hex', val: brandPrimaryHex, set: setBrandPrimaryHex },
              { label: 'Secondary Highlight Hex', val: brandSecondaryHex, set: setBrandSecondaryHex },
              { label: 'Typography Hex', val: brandTextHex, set: setBrandTextHex },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-white/10 bg-black/40 p-3">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-2">
                  {c.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={c.val}
                    onChange={(e) => c.set(e.target.value)}
                    className="h-7 w-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={c.val}
                    onChange={(e) => c.set(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Material, Lighting &amp; Composition Physics
              </label>
              <textarea
                rows={3}
                value={brandMaterial}
                onChange={(e) => setBrandMaterial(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 p-3 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Anti-Slop Negative Constraints
              </label>
              <textarea
                rows={3}
                value={brandNegative}
                onChange={(e) => setBrandNegative(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 p-3 text-xs text-white"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Compiled Preset JSON (Drop into data/ai-ops/infogenius-presets.json)
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copyText('brand-json', JSON.stringify(customPresetJson, null, 2))}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
                >
                  {copiedTab === 'brand-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy JSON
                </button>
                <button
                  type="button"
                  onClick={downloadCustomPresetJson}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 text-xs font-bold text-slate-950"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export .preset.json
                </button>
              </div>
            </div>
            <pre className="rounded-xl bg-black/70 border border-white/10 p-4 text-xs font-mono text-amber-200/90 overflow-x-auto">
              {JSON.stringify(customPresetJson, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 1 & TAB 2 SHARED CONTROLS */}
      {activeTab !== 'brand' && (
        <>
          {activeTab === 'single' ? (
            <div className="mt-6 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                1. Topic, System, or Concept to Visualize
              </label>
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-white/40 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Sovereign AI Swarm Architecture, How Zero-Knowledge Proofs Work..."
                  className="w-full rounded-2xl border border-white/15 bg-black/40 pl-12 pr-4 py-4 text-base font-medium text-white placeholder:text-white/30 focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {SAMPLE_TOPICS.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setTopic(sample)}
                    className={`rounded-full border px-3 py-1 text-xs transition-all ${
                      topic === sample
                        ? 'border-teal-400/50 bg-teal-400/15 text-teal-200 font-semibold'
                        : 'border-white/10 bg-white/[0.03] text-white/50 hover:text-white/80 hover:border-white/20'
                    }`}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                  1. Paste Article, Markdown, Whitepaper, or GitHub README
                </label>
                <button
                  type="button"
                  onClick={() => setArticleText(SAMPLE_ARTICLE)}
                  className="text-xs text-violet-300 hover:underline"
                >
                  Load Sample Architecture Post
                </button>
              </div>
              <textarea
                rows={7}
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                placeholder="Paste your markdown or article text here..."
                className="w-full rounded-2xl border border-white/15 bg-black/40 p-4 text-xs font-mono text-white/90 placeholder:text-white/30 focus:border-violet-400 focus:outline-none leading-relaxed"
              />
            </div>
          )}

          {/* Style Grid */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                2. Visual Presentation Style {useCustomBrand ? `(Custom Brand Override: ${brandName})` : '(10 v5.2 Presets)'}
              </label>
              {useCustomBrand && (
                <button
                  type="button"
                  onClick={() => setUseCustomBrand(false)}
                  className="text-xs text-amber-300 hover:underline"
                >
                  Switch back to standard v5.2 styles
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {STYLE_OPTIONS.map((opt) => {
                const active = !useCustomBrand && style === opt.key
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setUseCustomBrand(false)
                      setStyle(opt.key)
                    }}
                    className={`text-left rounded-2xl border p-3.5 transition-all ${
                      active
                        ? `${opt.accent} shadow-lg scale-[1.01]`
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{opt.label}</div>
                    <div className="text-[11px] opacity-70 mt-0.5 truncate">{opt.tag}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Controls Row: Audience, Aspect Ratio, Resolution, Optional Title */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Audience Density
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as 'elementary' | 'highschool' | 'college' | 'expert')}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-teal-400 focus:outline-none"
              >
                <option value="elementary">Elementary (Ages 6-10 · Minimal)</option>
                <option value="highschool">High School (Textbook · Moderate)</option>
                <option value="college">University (Academic · High Density)</option>
                <option value="expert">Industry Expert (Blueprint · Max Density)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as '16:9' | '1:1' | '9:16')}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-teal-400 focus:outline-none"
              >
                <option value="16:9">16:9 Landscape (Blog Hero / Deck)</option>
                <option value="1:1">1:1 Square (Carousel / LinkedIn)</option>
                <option value="9:16">9:16 Vertical (Stories / Shorts)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Resolution Tier
              </label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value as '1K' | '2K' | '4K')}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-teal-400 focus:outline-none"
              >
                <option value="1K">1K Fast Preview</option>
                <option value="2K">2K Production (Recommended)</option>
                <option value="4K">4K Print / Flagship</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Header Title (Optional)
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Custom banner title..."
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-teal-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="text-xs text-white/50">
              Active Engine: <span className="text-white/80 font-semibold">{detectedProvider}</span>
            </div>

            {activeTab === 'single' ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => runAction('architect')}
                  className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 hover:bg-teal-500/20 px-6 py-3 text-xs font-bold text-teal-200 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                  {apiKey.trim() ? 'Research & Architect Prompt' : 'Architect Prompt & CLI (Free)'}
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    if (!apiKey.trim() && !canRenderWithManagedCredits) {
                      setShowCreditsDrawer(true)
                      setError(
                        'Top up Workspace Credits above or connect a BYOK key (Gemini / Vercel AI Gateway / OpenRouter) to render live 2K/4K images.'
                      )
                      return
                    }
                    runAction('generate')
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-violet-600/25 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Research &amp; Render {imageSize} Infographic{' '}
                  {apiKey.trim() ? '(BYOK)' : `(${imageSize === '4K' ? 8 : 5} Credits)`}
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={runDecomposeArticle}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-violet-600/25 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  Decompose into 5-Slide Visual Pack {apiKey.trim() ? '(AI Grounded)' : '(Free Instant)'}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {isLoading && (
        <div className="mt-6 rounded-2xl border border-teal-500/30 bg-teal-500/5 p-5 flex items-center gap-3 text-sm text-teal-200">
          <Loader2 className="w-5 h-5 animate-spin shrink-0 text-teal-400" />
          <span>{loadingStage}</span>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-medium text-rose-200">
          {error}
        </div>
      )}

      {/* TAB 2 RESULTS: 5-SLIDE DECOMPOSED VISUAL PACK */}
      {activeTab === 'decompose' && packResult && (
        <div className="mt-8 space-y-6 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-300">
                5-Slide Visual Carousel &amp; Architecture Pack
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {packResult.documentTitle}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => copyText('batch-cli', packResult.batchCliScript)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-200 hover:bg-emerald-500/20"
            >
              {copiedTab === 'batch-cli' ? <Check className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
              {copiedTab === 'batch-cli' ? 'Copied All 5 CLI Commands' : 'Copy Batch CLI Script (All 5 Slides)'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {packResult.slides.map((slide, idx) => (
              <div
                key={slide.slideNumber}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-teal-300">
                      {slide.role}
                    </span>
                    <h5 className="text-base font-bold text-white mt-0.5">{slide.title}</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(`slide-prompt-${idx}`, slide.imagePrompt)}
                      className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:text-white"
                    >
                      {copiedTab === `slide-prompt-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      Copy Prompt
                    </button>
                    <button
                      type="button"
                      disabled={slide.isRendering}
                      onClick={() => renderSingleSlide(idx)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-3.5 py-1.5 text-xs font-bold text-white disabled:opacity-50"
                    >
                      {slide.isRendering ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      {slide.renderedImageUrl ? 'Re-Render Slide' : `Render ${packResult.imageSize} Slide`}
                    </button>
                  </div>
                </div>

                <ul className="grid sm:grid-cols-3 gap-2 text-xs text-white/75">
                  {slide.facts.map((f, fIdx) => (
                    <li key={fIdx} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <span className="font-mono text-teal-400 font-bold mr-1.5">{fIdx + 1}.</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {slide.renderedImageUrl && (
                  <div className="overflow-hidden rounded-xl border border-white/15 bg-black/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.renderedImageUrl}
                      alt={slide.title}
                      className="w-full h-auto object-contain max-h-[520px] mx-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1 RESULTS: SINGLE VISUAL DRAWER */}
      {activeTab === 'single' && result && (
        <div className="mt-8 space-y-6 pt-8 border-t border-white/10">
          {result.imageDataUrl && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <h4 className="text-sm font-bold text-white">
                    Rendered {result.imageSize} Infographic ({result.style.name})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleNarrate}
                    disabled={isNarrating}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-white"
                  >
                    {isNarrating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5 text-teal-300" />}
                    Narrate Facts (Kore TTS)
                  </button>
                  <button
                    type="button"
                    onClick={downloadProvenance}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-white"
                  >
                    <FileJson className="w-3.5 h-3.5 text-amber-300" />
                    .vis.provenance.json
                  </button>
                  <a
                    href={result.imageDataUrl}
                    download={`infogenius-${result.style.key}.png`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 px-4 py-2 text-xs font-bold text-slate-950"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PNG
                  </a>
                </div>
              </div>

              {audioDataUrl && (
                <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 p-3 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-teal-200">
                    Gemini 2.5 Flash TTS Narration (Voice: Kore)
                  </span>
                  <audio controls src={audioDataUrl} className="h-8" />
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.imageDataUrl}
                  alt={result.topic}
                  className="w-full h-auto object-contain max-h-[680px] mx-auto"
                />
              </div>
            </div>
          )}

          {/* Grounded Facts + Citations */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  {result.research.grounded ? 'Web-Grounded Knowledge Points' : 'Structured Knowledge Blueprint'}
                </span>
                <span className="text-[11px] text-white/40">{result.audience.label}</span>
              </div>
              <ul className="space-y-2 text-xs text-white/80 leading-relaxed">
                {result.research.facts.map((fact, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="font-mono text-teal-400 font-bold">{idx + 1}.</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
              {result.research.searchResults?.length > 0 && (
                <div className="pt-3 border-t border-white/10">
                  <div className="text-[11px] font-semibold text-white/50 mb-2">
                    Verified Web Grounding Sources ({result.research.searchResults.length}):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.research.searchResults.slice(0, 5).map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-teal-300 hover:border-teal-400/40 truncate max-w-[240px]"
                      >
                        <span className="truncate">{s.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CLI Command + MDX Snippet */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Local Estate CLI Command
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText('cli', result.cliCommand)}
                    className="inline-flex items-center gap-1 text-[11px] text-white/60 hover:text-white"
                  >
                    {copiedTab === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTab === 'cli' ? 'Copied' : 'Copy CLI'}
                  </button>
                </div>
                <pre className="rounded-xl bg-black/70 border border-white/10 p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                  {result.cliCommand} --animate --narrate
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> MDX &lt;LiquidGlassZoom /&gt; Embed
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText('mdx', result.mdxSnippet)}
                    className="inline-flex items-center gap-1 text-[11px] text-white/60 hover:text-white"
                  >
                    {copiedTab === 'mdx' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTab === 'mdx' ? 'Copied' : 'Copy MDX'}
                  </button>
                </div>
                <pre className="rounded-xl bg-black/70 border border-white/10 p-3 text-[11px] font-mono text-amber-200 overflow-x-auto">
                  {result.mdxSnippet}
                </pre>
              </div>
            </div>
          </div>

          {/* Synthesized Master Visual Prompt */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                Synthesized InfoGenius v5.2 Master Visual Prompt
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={downloadProvenance}
                  className="inline-flex items-center gap-1 text-xs text-amber-300 hover:underline"
                >
                  <FileJson className="w-3.5 h-3.5" /> Save .vis.provenance.json
                </button>
                <button
                  type="button"
                  onClick={() => copyText('prompt', result.imagePrompt)}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
                >
                  {copiedTab === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedTab === 'prompt' ? 'Copied Prompt' : 'Copy Full Prompt'}
                </button>
              </div>
            </div>
            <pre className="rounded-xl bg-black/70 border border-white/10 p-4 text-xs font-mono text-white/80 whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
              {result.imagePrompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
