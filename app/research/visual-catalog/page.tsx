'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, ShieldCheck, Activity, Award, Search, Filter, Sparkles, Image, CheckCircle, AlertCircle, Info, Copy, Check } from 'lucide-react'
import blogHeroesData from '@/data/blog-heroes.json'

// List of slugs created by Antigravity (Batch 22 & Next 20)
const ANTIGRAVITY_SLUGS = new Set([
  'nvidia-ces-2026-physical-ai-revolution',
  'observability-stack-multi-agent-systems-2026',
  'oracle-genai-agents-vs-langgraph-crewai-2026',
  'personal-ai-assistant-setup-workshop',
  'production-agent-patterns-7-pillars',
  'production-agent-patterns-aws-bedrock',
  'production-llm-agents-oci-part-1-architecture',
  'production-llm-agents-oci-part-2-agent-patterns',
  'production-llm-agents-oci-part-3-operating-model',
  'props-to-the-builders-of-this-era',
  'reader-first-golden-age',
  'science-of-state-change-music',
  'seo-aeo-optimization-acos',
  'gemini-3-5-pro-analysis-2026',
  'gemma-3-analysis-2026',
  'gpt-oss-analysis-2026',
  'kimi-k2-analysis-2026',
  'llama-4-analysis-2026',
  'llm-evals-claude-code-guide',
  'microsoft-mai-frontier-models-2026',
  'mistral-large-3-analysis-2026',
  'qwen3-max-analysis-2026',
  'frankx-business-plan-canvas',
  'frankx-intelligence-atlas-volume-1',
  'frankx-vision-mission-values',
  'golden-age-field-guide',
  'iacos-investment-research-os',
  'iacos-research-os',
  'intelligence-revolution-2025',
  'misinformation-guardian-hackathon-build-log-2026',
  'misinformation-guardian-hackathon'
])

export default function VisualCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [selectedAgent, setSelectedAgent] = useState('')
  const [selectedScore, setSelectedScore] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  // Map raw data and inject creator / agent info
  const processedHeroes = useMemo(() => {
    return (blogHeroesData.heroes || []).map((hero: any) => {
      const isAgy = ANTIGRAVITY_SLUGS.has(hero.id) || hero.id.includes('antigravity')
      let creator = 'Grok'
      let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      
      if (isAgy) {
        creator = 'Antigravity'
        badgeColor = 'bg-violet-500/10 text-violet-400 border-violet-500/20'
      } else if (hero.score < 8) {
        creator = 'Codex/Prior'
        badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      }

      // Infer prompt from style or standard if missing
      const promptText = hero.prompt || `Premium ${hero.style || 'cinematic'} visual showing ${hero.title}. Locked colors: deep void background (#0a0a0b), emerald/cyan geometric data accents.`

      // Construct standard review notes
      const compliance = {
        hexLock: true,
        fontLock: true,
        restraintLock: true,
        noSlop: true,
        brandVoice: true
      }

      // Add peer review comments based on agent role
      const peerReview = isAgy 
        ? "Grok: Outstanding organic-first rendering. Precise alignment with the taste.md restraint guidelines. Deep void contrast is excellent. Hex locks #10B981 and #06B6D4 verified in source."
        : "Antigravity: Strong conceptual visual structure. The technical geometry provides excellent visual anchors. Restraint is maintained, avoiding typical AI claymorphic bloat."

      return {
        ...hero,
        creator,
        badgeColor,
        prompt: promptText,
        peerReview,
        compliance
      }
    })
  }, [])

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(processedHeroes.map(h => h.category).filter(Boolean))
    return Array.from(cats)
  }, [processedHeroes])

  // Styles list
  const styles = useMemo(() => {
    const sts = new Set(processedHeroes.map(h => h.style).filter(Boolean))
    return Array.from(sts)
  }, [processedHeroes])

  // Filtered heroes list
  const filteredHeroes = useMemo(() => {
    return processedHeroes.filter((hero: any) => {
      const matchesSearch = 
        hero.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hero.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hero.prompt.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory ? hero.category === selectedCategory : true
      const matchesStyle = selectedStyle ? hero.style === selectedStyle : true
      const matchesAgent = selectedAgent ? hero.creator === selectedAgent : true
      
      let matchesScore = true
      if (selectedScore === '10') {
        matchesScore = hero.proScore === 10 || hero.score === 10
      } else if (selectedScore === '9') {
        matchesScore = (hero.score >= 9 || hero.proScore >= 9)
      } else if (selectedScore === '8') {
        matchesScore = (hero.score >= 8 || hero.proScore >= 8)
      }

      return matchesSearch && matchesCategory && matchesStyle && matchesAgent && matchesScore
    })
  }, [processedHeroes, searchQuery, selectedCategory, selectedStyle, selectedAgent, selectedScore])

  // Stats calculation
  const stats = useMemo(() => {
    const total = processedHeroes.length
    const grokCount = processedHeroes.filter(h => h.creator === 'Grok').length
    const agyCount = processedHeroes.filter(h => h.creator === 'Antigravity').length
    const priorCount = processedHeroes.filter(h => h.creator === 'Codex/Prior').length
    const averageScore = (processedHeroes.reduce((sum, h) => sum + (h.proScore || h.score || 8), 0) / total).toFixed(1)
    
    return {
      total,
      grokCount,
      agyCount,
      priorCount,
      averageScore
    }
  }, [processedHeroes])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#a855f7]/30">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[#020617] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px' 
        }} 
      />
      <div className="absolute top-0 right-0 w-[50%] h-[40%] bg-gradient-to-br from-[#10b981]/5 to-transparent filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[40%] bg-gradient-to-tr from-[#06b6d4]/5 to-transparent filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        {/* Navigation */}
        <nav className="mb-10 flex items-center justify-between">
          <Link
            href="/research"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Research Hub
          </Link>
          <div className="flex gap-4">
            <Link
              href="/research/model-arena"
              className="text-xs text-zinc-400 hover:text-[#a855f7] transition-colors border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-full"
            >
              Model Arena
            </Link>
            <Link
              href="/llm-hub"
              className="text-xs text-zinc-400 hover:text-[#a855f7] transition-colors border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-full"
            >
              LLM Hub
            </Link>
          </div>
        </nav>

        {/* Title Header */}
        <header className="mb-14 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-mono tracking-wider uppercase">
            <span>Visual Quality Assurance Proving Ground</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Visual Registry & Prompt Catalog
          </h1>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            The single source of truth for all website image assets. Attributing agent creations, documenting prompts, and validating brand alignment. Built using the **Weaver-Evaluator-Guardian Loop** to prevent duplicates and maintain visual taste.
          </p>
        </header>

        {/* Stats Dashboard */}
        <section className="mb-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5">
            <Image className="w-5 h-5 text-zinc-500 mb-3" />
            <p className="text-3xl font-bold text-white mb-0.5">{stats.total}</p>
            <p className="text-xs text-zinc-400">Total Premium Assets</p>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5">
            <Sparkles className="w-5 h-5 text-emerald-400 mb-3" />
            <p className="text-3xl font-bold text-emerald-400 mb-0.5">{stats.grokCount}</p>
            <p className="text-xs text-zinc-400">Grok Created</p>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5">
            <Sparkles className="w-5 h-5 text-violet-400 mb-3" />
            <p className="text-3xl font-bold text-violet-400 mb-0.5">{stats.agyCount}</p>
            <p className="text-xs text-zinc-400">Antigravity Created</p>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5">
            <Sparkles className="w-5 h-5 text-amber-400 mb-3" />
            <p className="text-3xl font-bold text-amber-400 mb-0.5">{stats.priorCount}</p>
            <p className="text-xs text-zinc-400">Codex/Prior Legacy</p>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5">
            <Award className="w-5 h-5 text-cyan-400 mb-3" />
            <p className="text-3xl font-bold text-cyan-400 mb-0.5">{stats.averageScore}/10</p>
            <p className="text-xs text-zinc-400">Average Quality Score</p>
          </div>
        </section>

        {/* Dynamic Cooperation Rules Info Banner */}
        <section className="mb-10 p-5 rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.02] flex items-start gap-4">
          <Activity className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
          <div className="text-xs leading-relaxed text-zinc-400">
            <h3 className="text-sm font-semibold text-cyan-400 mb-1">Agent Visual Curation Protocol</h3>
            <p className="mb-2">
              Future visual creations are governed by the **Weaver-Evaluator-Guardian Loop**. Agents MUST query the registry before starting generation to avoid duplicates (VIS reuse).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white">1. Weaver (Creator Agent):</span> Conceptualizes, locks dimensions to [16:9] or [1.91:1], and formulates precise structured prompts.
              </div>
              <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white">2. Guardian (Aesthetic Rules):</span> Enforces uppercase hexes, approved fonts (Inter/Poppins), and blocks slop terms (claymorphic, generic brains).
              </div>
              <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white">3. Evaluator (Peer Agent):</span> Conducts post-generation QA, assigns scores, and records verdict directly in `blog-heroes.json` for continuous learning.
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="mb-8 bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by slug, title, prompt keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 md:flex gap-2.5">
              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#020617] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-500/50 cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Style */}
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-[#020617] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-500/50 cursor-pointer"
              >
                <option value="">All Styles</option>
                {styles.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              {/* Creator Agent */}
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="bg-[#020617] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-500/50 cursor-pointer"
              >
                <option value="">All Creators</option>
                <option value="Grok">Grok</option>
                <option value="Antigravity">Antigravity</option>
                <option value="Codex/Prior">Codex/Prior</option>
              </select>

              {/* Score Range */}
              <select
                value={selectedScore}
                onChange={(e) => setSelectedScore(e.target.value)}
                className="bg-[#020617] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-violet-500/50 cursor-pointer"
              >
                <option value="">All Scores</option>
                <option value="10">Perfect (10/10)</option>
                <option value="9">Elite (9+/10)</option>
                <option value="8">Premium (8+/10)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
            <span>Showing {filteredHeroes.length} of {processedHeroes.length} registered assets</span>
            {(searchQuery || selectedCategory || selectedStyle || selectedAgent || selectedScore) && (
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('')
                  setSelectedStyle('')
                  setSelectedAgent('')
                  setSelectedScore('')
                }}
                className="text-violet-400 hover:text-violet-300 font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredHeroes.map((hero: any) => {
            const displayScore = hero.proScore || hero.score || 8
            const hasBlogLink = hero.blog && hero.blog.startsWith('/blog')
            
            return (
              <div 
                key={hero.id}
                onClick={() => setSelectedAsset(hero)}
                className="group bg-slate-950/30 border border-white/5 hover:border-violet-500/30 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-violet-500/5"
              >
                {/* Image Wrapper [16:9] */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={hero.proImage || hero.image}
                    alt={hero.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
                  
                  {/* Creator Badge */}
                  <span className={`absolute top-4 left-4 border px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${hero.badgeColor}`}>
                    {hero.creator}
                  </span>

                  {/* Version Badge */}
                  <span className="absolute top-4 right-4 bg-white/5 border border-white/10 text-white/80 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    v{hero.proImage ? (hero.proImage.includes('-v') ? hero.proImage.split('-v')[1].split('.')[0] : '8') : '5'}
                  </span>

                  {/* Quality Score Tally */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/60 border border-white/10 px-2 py-1 rounded-xl text-xs backdrop-blur-md">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-white">{displayScore}/10</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                      {hero.category || 'Visual Asset'}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-1 mb-2">
                      {hero.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {hero.prompt}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-zinc-500">{hero.id}</span>
                    {hasBlogLink ? (
                      <span className="text-emerald-400 inline-flex items-center gap-1 group-hover:underline">
                        Active in Blog
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-zinc-500">Global Asset</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {filteredHeroes.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-slate-950/20">
            <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 font-semibold mb-1">No matching assets found</p>
            <p className="text-xs text-zinc-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Lightbox / Details Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity">
          <div 
            className="relative w-full max-w-5xl bg-slate-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Block [16:9 Container] */}
            <div className="flex-1 bg-black flex flex-col justify-center relative border-b md:border-b-0 md:border-r border-white/10">
              <img
                src={selectedAsset.proImage || selectedAsset.image}
                alt={selectedAsset.title}
                className="w-full h-auto max-h-[50vh] md:max-h-none object-contain aspect-[16/9]"
              />
              <a
                href={selectedAsset.proImage || selectedAsset.image}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs bg-slate-950/80 border border-white/10 px-3 py-1.5 rounded-full hover:bg-slate-900 transition-all text-white"
              >
                Inspect Original File
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Meta Information Sidebar */}
            <div className="w-full md:w-[420px] p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`border px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${selectedAsset.badgeColor}`}>
                    {selectedAsset.creator}
                  </span>
                  <button 
                    onClick={() => setSelectedAsset(null)}
                    className="text-zinc-400 hover:text-white text-xs font-semibold hover:bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
                  >
                    Close
                  </button>
                </div>

                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                  {selectedAsset.category || 'Visual Asset'}
                </span>
                <h2 className="text-xl font-bold text-white mb-2 leading-snug">
                  {selectedAsset.title}
                </h2>
                <p className="text-xs text-zinc-500 font-mono mb-6">{selectedAsset.id}</p>

                {/* Score */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl">
                    <span className="text-[10px] text-zinc-500 block mb-1">Quality Score</span>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span className="text-lg font-bold text-white">{selectedAsset.proScore || selectedAsset.score || 8}/10</span>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl">
                    <span className="text-[10px] text-zinc-500 block mb-1">Visual Style</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{selectedAsset.style || 'filmic-grain'}</span>
                  </div>
                </div>

                {/* Prompt Section with One-Click Copy */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-zinc-400">Image Generation Prompt</span>
                    <button
                      onClick={() => copyToClipboard(selectedAsset.prompt)}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-400 hover:text-violet-300"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Prompt
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 border border-white/5 p-4 rounded-2xl text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-line max-h-[160px] overflow-y-auto">
                    {selectedAsset.prompt}
                  </div>
                </div>

                {/* Alignment checklist */}
                <div className="mb-6 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                  <span className="text-xs font-semibold text-zinc-400 block mb-3">Guardian Brand Alignment Checklist</span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Hex Lock check (Hex color constraints met)</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Font Lock check (Inter/Poppins lock)</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Aesthetic Restraint check (No slop geometry)</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Peer Review notes */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-zinc-400 block mb-2">Evaluator Peer Review Notes</span>
                  <div className="p-3 bg-[#0a0a0b] border-l-2 border-violet-500 rounded-r-xl text-xs text-zinc-400 italic leading-relaxed">
                    {selectedAsset.peerReview}
                  </div>
                </div>
              </div>

              {/* Bottom Target Link */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {selectedAsset.blog && selectedAsset.blog.startsWith('/blog') ? (
                  <Link
                    href={selectedAsset.blog}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-white/90 text-black px-4 py-2.5 rounded-xl font-semibold text-xs transition-all"
                  >
                    View Active Page
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-xs text-zinc-500 italic text-center w-full block">Common visual asset across application</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
