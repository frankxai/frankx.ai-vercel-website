'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Globe,
  Search,
  Sparkles,
  Video,
  Music,
  Cpu,
  Code,
  Mic,
  Brain,
  ExternalLink,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  DollarSign,
  TrendingUp,
  Server,
  Zap,
  ArrowRight,
  ChevronDown,
  Terminal,
  ShieldCheck,
  Play
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import {
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  MagneticHover,
  MorphingBackground
} from '@/components/ui/AdvancedAnimations'

import superpowersData from '@/data/tools/superpowers.json'
import programsData from '@/data/affiliate/programs.json'

const categoryIcons: Record<string, any> = {
  'content-creation': FileText,
  'website-building': Globe,
  'research': Search,
  'image': Sparkles,
  'video': Video,
  'music': Music,
  'automation': Cpu,
  'coding': Code,
  'voice': Mic,
  'memory': Brain
}

export default function SuperpowersPage() {
  const [activeTab, setActiveTab] = useState<'stack' | 'mcp' | 'transparency'>('stack')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Map ourLink from programs.json to look up affiliate links dynamically
  const affiliateLinks = useMemo(() => {
    const map = new Map<string, string>()
    programsData.programs.forEach((p: any) => {
      if (p.ourLink) {
        map.set(p.tool.toLowerCase(), p.ourLink)
      }
    })
    return map
  }, [])

  const getToolLink = (toolName: string, defaultLink = '#') => {
    const affiliateLink = affiliateLinks.get(toolName.toLowerCase())
    if (affiliateLink) return affiliateLink

    // If it's a known non-affiliate tool, try to link to its official site or signupUrl
    const matchedProgram = programsData.programs.find(
      (p: any) => p.tool.toLowerCase() === toolName.toLowerCase()
    )
    return matchedProgram?.signupUrl || defaultLink
  }

  // Filter categories and tools based on search and selected category
  const filteredSuperpowers = useMemo(() => {
    return superpowersData.superpowers
      .map((cat: any) => {
        const filteredTools = cat.tools.filter((tool: any) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.for.toLowerCase().includes(searchQuery.toLowerCase())
        )
        const filteredMcp = cat.mcp.filter((mcp: any) =>
          mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mcp.unlocks.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return {
          ...cat,
          tools: filteredTools,
          mcp: filteredMcp
        }
      })
      .filter((cat: any) => {
        const matchesTabCategory = selectedCategory === 'all' || cat.id === selectedCategory
        const hasMatchingContent = cat.tools.length > 0 || cat.mcp.length > 0
        return matchesTabCategory && hasMatchingContent
      })
  }, [selectedCategory, searchQuery])

  // Filter must-know MCPs based on search
  const filteredMustKnowMcps = useMemo(() => {
    return superpowersData.mustKnowMcp.filter((mcp: any) =>
      mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mcp.unlocks.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Split programs into payers vs non-payers
  const { payingPrograms, nonPayingPrograms } = useMemo(() => {
    const payers = programsData.programs.filter((p: any) => p.hasProgram && p.status !== 'dead-end')
    const nonPayers = programsData.programs.filter((p: any) => !p.hasProgram || p.status === 'dead-end')
    return { payingPrograms: payers, nonPayingPrograms: nonPayers }
  }, [])

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'All Superpowers', icon: Sparkles },
      ...superpowersData.superpowers.map((cat: any) => ({
        id: cat.id,
        label: cat.label.split(' (')[0],
        icon: categoryIcons[cat.id] || HelpCircle
      }))
    ]
  }, [])

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 overflow-hidden">
      {/* Morphing ambient glows */}
      <MorphingBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <StaggerContainer className="text-center mb-16">
          <StaggerItem>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>June 2026 Web-Verified Intelligence</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-100 to-cyan-300 bg-clip-text text-transparent">
              AI Superpowers Directory
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
              The ultimate stack of AI tools, custom agent configurations, and Model Context Protocol (MCP) servers. Mapped by creator superpower and built for compounding revenue.
            </p>
          </StaggerItem>

          {/* Quick Info Box / Note */}
          {superpowersData.note && (
            <StaggerItem className="max-w-2xl mx-auto mb-12">
              <GlassmorphicCard variant="default" className="p-4 border-l-4 border-purple-500 bg-purple-950/10 text-left">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-200 leading-relaxed">
                    <strong className="text-purple-300 font-semibold">Architect Note:</strong> {superpowersData.note}
                  </p>
                </div>
              </GlassmorphicCard>
            </StaggerItem>
          )}

          {/* Main Navigation Tabs */}
          <StaggerItem>
            <div className="flex justify-center p-1.5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl max-w-md mx-auto mb-10">
              <button
                onClick={() => { setActiveTab('stack'); setSearchQuery(''); }}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
                  activeTab === 'stack' 
                    ? "bg-gradient-to-r from-[#AB47C7] to-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                )}
                id="tab-superpowers-stack"
              >
                Superpowers Stack
              </button>
              <button
                onClick={() => { setActiveTab('mcp'); setSearchQuery(''); }}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
                  activeTab === 'mcp' 
                    ? "bg-gradient-to-r from-[#AB47C7] to-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                )}
                id="tab-must-know-mcps"
              >
                Must-Know MCPs
              </button>
              <button
                onClick={() => { setActiveTab('transparency'); setSearchQuery(''); }}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
                  activeTab === 'transparency' 
                    ? "bg-gradient-to-r from-[#AB47C7] to-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                )}
                id="tab-affiliate-transparency"
              >
                Transparency Ledger
              </button>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Global Controls: Search & Category Filters (only visible for Stack tab) */}
        {activeTab === 'stack' && (
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tools, capabilities, or MCPs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  id="superpowers-search-input"
                />
              </div>
            </div>

            {/* Category horizontal scrolling bar */}
            <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none justify-start md:justify-center px-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium whitespace-nowrap transition-all duration-300",
                      selectedCategory === cat.id
                        ? "bg-purple-600/20 border-purple-500 text-purple-200"
                        : "bg-slate-900/30 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab 1: Superpowers Stack */}
        <AnimatePresence mode="wait">
          {activeTab === 'stack' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {filteredSuperpowers.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-500 text-lg">No tools or superpowers match your criteria.</p>
                  <button 
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="mt-4 text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredSuperpowers.map((cat: any) => {
                  const CategoryIcon = categoryIcons[cat.id] || HelpCircle
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="group"
                    >
                      <GlassmorphicCard variant="premium" gradient="midnight" className="p-6 sm:p-8 border border-slate-800 group-hover:border-purple-500/20 transition-all duration-300">
                        {/* Category Header */}
                        <div className="flex items-start justify-between border-b border-slate-800/60 pb-6 mb-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors duration-300">
                              <CategoryIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                                {cat.label}
                              </h2>
                              <p className="text-xs text-slate-500 mt-1">Superpower Cluster</p>
                            </div>
                          </div>
                        </div>

                        {/* Category Grid: Tools on the Left, MCP on the Right */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                          
                          {/* Tools Column (7 cols) */}
                          <div className="lg:col-span-7 space-y-4">
                            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-2">
                              <Zap className="w-4 h-4 text-purple-400" />
                              <span>Core Tools Stack</span>
                            </h3>

                            {cat.tools.length === 0 ? (
                              <p className="text-xs text-slate-600">No matching tools found in this category.</p>
                            ) : (
                              <div className="space-y-3">
                                {cat.tools.map((tool: any, idx: number) => {
                                  const link = getToolLink(tool.name)
                                  return (
                                    <div 
                                      key={idx}
                                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:bg-slate-950/70 hover:border-slate-800 transition-all duration-300"
                                    >
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className="font-semibold text-white">{tool.name}</span>
                                          {tool.best && (
                                            <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wide rounded bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 uppercase">
                                              Best Choice
                                            </span>
                                          )}
                                          {tool.affiliate && (
                                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase">
                                              Compounding
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-slate-400">{tool.for}</p>
                                      </div>
                                      
                                      <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-4">
                                        {tool.price && (
                                          <span className="text-xs text-slate-500 font-mono">{tool.price}</span>
                                        )}
                                        {link !== '#' && (
                                          <a 
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold group/link"
                                          >
                                            <span>Acquire</span>
                                            <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>

                          {/* MCP Column (5 cols) */}
                          <div className="lg:col-span-5 space-y-4">
                            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-2">
                              <Server className="w-4 h-4 text-cyan-400" />
                              <span>Model Context Protocol (MCP)</span>
                            </h3>

                            {cat.mcp && cat.mcp.length > 0 ? (
                              <div className="space-y-3">
                                {cat.mcp.map((mcp: any, idx: number) => (
                                  <div 
                                    key={idx}
                                    className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:bg-slate-950/70 transition-all duration-300"
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-semibold text-slate-200 text-xs font-mono">{mcp.name}</span>
                                      {mcp.best && (
                                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase">
                                          Best MCP
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{mcp.unlocks}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-950/20 border border-dashed border-slate-800 text-center">
                                <Info className="w-5 h-5 text-slate-600 mb-2" />
                                <p className="text-xs text-slate-500">No specific MCP server required. Standard model tools suffice.</p>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Special Actions / Metadata Panels */}
                        {(cat.proMove || cat.deepDive || cat.rule) && (
                          <div className="mt-8 pt-6 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cat.proMove && (
                              <div className="p-4 rounded-xl bg-cyan-950/15 border border-cyan-500/10">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">PRO MOVE</span>
                                <p className="text-xs text-cyan-200 leading-relaxed">{cat.proMove}</p>
                              </div>
                            )}

                            {cat.rule && (
                              <div className="p-4 rounded-xl bg-amber-950/15 border border-amber-500/10">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">DESIGN INVARIANT</span>
                                <p className="text-xs text-amber-200 leading-relaxed">{cat.rule}</p>
                              </div>
                            )}

                            {cat.deepDive && (
                              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between md:col-span-2">
                                <div className="flex items-start gap-2.5 mb-3">
                                  <FileText className="w-4 h-4 text-purple-400 mt-0.5" />
                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">DEEP DIVE REPORT</span>
                                    <p className="text-xs text-slate-300">Read our fully verified 2026 playbook on this cluster workflow.</p>
                                  </div>
                                </div>
                                <Link 
                                  href={cat.deepDive}
                                  className="self-start inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold group/dive"
                                >
                                  <span>Read Guide</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover/dive:translate-x-1 transition-transform duration-200" />
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </GlassmorphicCard>
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          )}

          {/* Tab 2: Must-Know MCPs */}
          {activeTab === 'mcp' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Search filter for MCPs */}
              <div className="max-w-xl mx-auto mb-10">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search MCP servers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    id="mcps-search-input"
                  />
                </div>
              </div>

              {filteredMustKnowMcps.length === 0 ? (
                <div className="text-center py-20 text-slate-500">No MCP servers match your query.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMustKnowMcps.map((mcp: any, idx: number) => {
                    const trustColor = {
                      official: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                      microsoft: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                      vendor: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
                      community: 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                    }[mcp.trust as 'official' | 'microsoft' | 'vendor' | 'community'] || 'bg-slate-500/10 border-slate-500/20 text-slate-400'

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <GlassmorphicCard variant="premium" className="p-6 h-full flex flex-col justify-between border border-slate-800 hover:border-purple-500/20 hover:-translate-y-1 transition-all duration-300">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-bold text-white font-mono text-sm">{mcp.name}</span>
                              <span className={cn("px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider border", trustColor)}>
                                {mcp.trust}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6">{mcp.unlocks}</p>
                          </div>
                          <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Integrable</span>
                            <div className="flex gap-1 text-purple-400">
                              <Terminal className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-mono">mcp connect</span>
                            </div>
                          </div>
                        </GlassmorphicCard>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Tab 3: Transparency Ledger */}
          {activeTab === 'transparency' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Introduction & Philosophy */}
              <GlassmorphicCard variant="premium" className="p-6 sm:p-8 border border-slate-800">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-purple-400" />
                  <span>The Honest Affiliate Philosophy</span>
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Frontier foundation labs drive the majority of creator traffic, but they **do not pay** (OpenAI, Anthropic, Google, Runway, Midjourney have no consumer affiliate models). We keep ranking for those big names to offer honest reviews, while placing affiliate paths on **adjacent recurring tools** that naturally fit into the creator workflows. We only recommend tools we run ourselves.
                </p>
                <div className="p-4 rounded-xl bg-purple-950/15 border border-purple-500/10 flex gap-3">
                  <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-purple-300 block mb-1">Canonical Site Disclosure:</span>
                    <p className="text-xs text-purple-200 italic leading-relaxed">
                      &ldquo;{programsData.disclosure}&rdquo;
                    </p>
                  </div>
                </div>
              </GlassmorphicCard>

              {/* Paying Programs Table */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Active Affiliate Programs</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/10">
                  <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                    <thead className="bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Tool</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Commission</th>
                        <th className="px-6 py-4">Billing</th>
                        <th className="px-6 py-4">Network</th>
                        <th className="px-6 py-4">Direct Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      {payingPrograms.map((p: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-900/10 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white">{p.tool}</td>
                          <td className="px-6 py-4 capitalize">{p.category}</td>
                          <td className="px-6 py-4">{p.commission}</td>
                          <td className="px-6 py-4 font-mono text-xs">{p.recurring}</td>
                          <td className="px-6 py-4 text-xs">{p.network}</td>
                          <td className="px-6 py-4">
                            {p.ourLink ? (
                              <a 
                                href={p.ourLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold"
                              >
                                <span>go.agenticincome.ai</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Non-Paying Programs / Dead-Ends */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span>Frontier Foundation Models &amp; Closed Programs</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/10">
                  <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                    <thead className="bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Tool</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Architect Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-400">
                      {nonPayingPrograms.map((p: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-900/10 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-300">{p.tool}</td>
                          <td className="px-6 py-4 capitalize">{p.category}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-0.5 text-[9px] font-bold rounded uppercase",
                              p.status === 'dead-end' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            )}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs leading-relaxed text-slate-500">{p.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info stamp */}
        <div className="mt-20 border-t border-slate-900 pt-8 text-center text-xs text-slate-600">
          <p>Last verified: June 2026. Starlight Intelligence Protocol attested directory.</p>
        </div>
        
      </div>
    </div>
  )
}
