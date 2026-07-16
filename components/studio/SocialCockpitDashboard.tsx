'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Layers,
  Shield,
  Cpu,
  Brain,
  Zap,
  FileCode,
  Check,
  FileSpreadsheet,
  Globe,
  Lock,
  Play,
  RotateCcw
} from 'lucide-react'

// Agent nodes for our swarm
const AGENT_NODES = [
  { id: 'Orchestrator', label: 'Orchestrator', role: 'Cognitive', desc: 'Routes sequences and manages dynamic parallel agent dispatch loops.', x: 150, y: 80, color: 'from-blue-500 to-indigo-600', glow: 'shadow-blue-500/30' },
  { id: 'Strategist', label: 'Social Strategist', role: 'Cognitive', desc: 'Formats blog drafts and releases into structured social threads.', x: 100, y: 200, color: 'from-blue-500 to-cyan-600', glow: 'shadow-cyan-500/30' },
  { id: 'Psychologist', label: 'Psychologist', role: 'Specialist', desc: 'Audits emotional hooks and spacing to minimize cognitive load.', x: 260, y: 160, color: 'from-purple-500 to-indigo-600', glow: 'shadow-indigo-500/30' },
  { id: 'VibeTracker', label: 'Vibe Tracker', role: 'Specialist', desc: 'Aligns visual frames and copywriting with brand aesthetic lanes.', x: 380, y: 220, color: 'from-purple-500 to-pink-600', glow: 'shadow-purple-500/30' },
  { id: 'FactChecker', label: 'Fact Checker', role: 'Specialist', desc: 'Runs automated searches to check assertions, numbers, and link resolution.', x: 120, y: 340, color: 'from-purple-500 to-violet-600', glow: 'shadow-violet-500/30' },
  { id: 'NewsAnalyst', label: 'News Analyst', role: 'Specialist', desc: 'Tracks model releases, partner feature announcements, and affiliate specs.', x: 260, y: 300, color: 'from-purple-500 to-blue-600', glow: 'shadow-blue-500/30' },
  { id: 'VisualDirector', label: 'Visual Director', role: 'Specialist', desc: 'Engineers visual prompts for Flux/Higgsfield generative media loops.', x: 420, y: 340, color: 'from-pink-500 to-rose-600', glow: 'shadow-rose-500/30' },
  { id: 'Sentinel', label: 'Social Sentinel', role: 'Sentinel', desc: 'Scrubs credentials, verifies signatures, and manages the operator gate.', x: 280, y: 440, color: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/30' }
]

const GRAPH_LINKS = [
  { source: 'Orchestrator', target: 'Strategist' },
  { source: 'Strategist', target: 'Psychologist' },
  { source: 'Psychologist', target: 'VibeTracker' },
  { source: 'VibeTracker', target: 'FactChecker' },
  { source: 'FactChecker', target: 'NewsAnalyst' },
  { source: 'NewsAnalyst', target: 'VisualDirector' },
  { source: 'VisualDirector', target: 'Sentinel' }
]

// Mock Ledger Logs from Google Sheets / Local Database
const INITIAL_LOGS = [
  { id: 'TX-1092', timestamp: '2026-06-15T12:04:12Z', platform: 'Twitter/X', status: 'delivered', keyword: 'SYSTEM', target: 'https://frankx.ai/blog/faceless-youtube-ai-tools-2026', signature: 'sip:sig:0x7a83d2...8a9c' },
  { id: 'TX-1091', timestamp: '2026-06-15T11:42:01Z', platform: 'Instagram', status: 'delivered', keyword: 'FLOW', target: 'https://frankx.ai/studio/music', signature: 'sip:sig:0x5e82b1...3f1a' },
  { id: 'TX-1090', timestamp: '2026-06-14T18:15:30Z', platform: 'LinkedIn', status: 'delivered', keyword: 'CREATOR', target: 'https://frankx.ai/products/agentic-creator-os', signature: 'sip:sig:0x9c3d4a...7e2b' },
  { id: 'TX-1089', timestamp: '2026-06-14T10:05:00Z', platform: 'Twitter/X', status: 'failed', keyword: 'WEALTH', target: 'https://frankx.ai/investor', signature: 'unsigned:operator_refused' }
]

export function SocialCockpitDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>(
    AGENT_NODES.reduce((acc, node) => ({ ...acc, [node.id]: { x: node.x, y: node.y } }), {})
  )
  const [simComments, setSimComments] = useState<{ handle: string; text: string; time: string; show: boolean }[]>([])
  const [consoleLogs, setConsoleLogs] = useState<string[]>(['$ local-RPA-daemon active & listening...'])
  const [notifActive, setNotifActive] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [ledgerLogs, setLedgerLogs] = useState(INITIAL_LOGS)
  const [activeTab, setActiveTab] = useState<'graph' | 'ledger' | 'staging'>('graph')
  const [activeEngine, setActiveEngine] = useState<'playwright' | 'manychat' | 'web3-direct'>('manychat')

  // Run the simulation sequence
  const startSimulation = async () => {
    if (isSimulating) return
    setIsSimulating(true)
    setSimComments([])
    setNotifActive(false)
    
    const log = (msg: string) => {
      setConsoleLogs((prev) => [...prev, `=> ${msg}`])
    }

    log('Crawl monitor initialized on Instagram API/RPA hook...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Simulate bob comment
    setSimComments([{ handle: '@bob_builder', text: 'SYSTEM', time: '1s ago', show: true }])
    log('Found comment matching query triggers: @bob_builder -> "SYSTEM"')
    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (activeEngine === 'manychat') {
      log('Routing trigger through starlight-manychat MCP server...')
      await new Promise((resolve) => setTimeout(resolve, 800))
      log('Invoking update_subscriber_field_by_name(9288102, "SYSTEM_LINK", "https://frankx.ai/blog/faceless-...")')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      log('Invoking trigger_flow(9288102, "content_delivery_flow")')
    } else if (activeEngine === 'playwright') {
      log('Launching persistent Playwright browser context headlessly...')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      log('Navigated to https://instagram.com/direct/new/ - resolving @bob_builder...')
      await new Promise((resolve) => setTimeout(resolve, 1200))
      log('Sending DM payload template locally via RPA simulation...')
    } else {
      log('Web3 direct cast hook triggered - Neynar signer UUID active.')
    }
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNotifActive(true)
    log('DM delivery verified. Saving signature receipt...')

    // Append to local ledger log state
    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      platform: activeEngine === 'manychat' ? 'Instagram (ManyChat)' : 'Twitter/X (RPA)',
      status: 'delivered',
      keyword: 'SYSTEM',
      target: 'https://frankx.ai/blog/faceless-youtube-ai-tools-2026',
      signature: 'sip:sig:0x' + Math.random().toString(16).substring(2, 10) + '...f92a'
    }
    setLedgerLogs((prev) => [newTx, ...prev])
    log('Ledger row appended to Google Sheets Operator Ledger.')
    setIsSimulating(false)
  }

  // Generate node flying packets
  const [packets, setPackets] = useState<{ id: number; from: string; to: string; progress: number }[]>([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (GRAPH_LINKS.length === 0) return
      const randomLink = GRAPH_LINKS[Math.floor(Math.random() * GRAPH_LINKS.length)]
      const newPacket = {
        id: Date.now(),
        from: randomLink.source,
        to: randomLink.target,
        progress: 0
      }
      setPackets((prev) => [...prev, newPacket])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (packets.length === 0) return
    const frame = requestAnimationFrame(() => {
      setPackets((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 0.01 }))
          .filter((p) => p.progress < 1)
      )
    })
    return () => cancelAnimationFrame(frame)
  }, [packets])

  const handleDragNode = (id: string, info: any) => {
    const parentNode = document.getElementById('graph-canvas-container')
    if (!parentNode) return
    const rect = parentNode.getBoundingClientRect()
    const relativeX = info.point.x - rect.left
    const relativeY = info.point.y - rect.top
    setNodePositions((prev) => ({
      ...prev,
      [id]: { x: relativeX, y: relativeY }
    }))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col justify-between border-b border-white/5 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400">
              Starlight Operating Layer
            </p>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl font-display">
            Sovereign Social Command Cockpit
          </h1>
        </div>

        {/* Action Engine Selectors */}
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
          <button
            onClick={() => setActiveEngine('manychat')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition-all ${
              activeEngine === 'manychat'
                ? 'bg-indigo-500/20 text-indigo-300 ring-indigo-500/30'
                : 'bg-white/5 text-white/60 ring-white/10 hover:bg-white/10'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            ManyChat Bridge
          </button>
          <button
            onClick={() => setActiveEngine('playwright')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition-all ${
              activeEngine === 'playwright'
                ? 'bg-blue-500/20 text-blue-300 ring-blue-500/30'
                : 'bg-white/5 text-white/60 ring-white/10 hover:bg-white/10'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            Local Playwright RPA
          </button>
          <button
            onClick={() => setActiveEngine('web3-direct')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition-all ${
              activeEngine === 'web3-direct'
                ? 'bg-purple-500/20 text-purple-300 ring-purple-500/30'
                : 'bg-white/5 text-white/60 ring-white/10 hover:bg-white/10'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            Web3 Direct
          </button>
        </div>
      </div>

      {/* DASHBOARD GRID */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left Column: Swarm Registry & Info */}
        <div className="space-y-6 lg:col-span-1">
          {/* Swarm Nodes List */}
          <div className="rounded-2xl border border-white/5 bg-[#111113] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-white/80">
                Swarm Specialist Registry
              </h2>
              <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-400">
                8 Nodes Active
              </span>
            </div>
            
            <div className="mt-4 max-h-[380px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {AGENT_NODES.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  className={`group relative flex flex-col rounded-xl border p-3.5 transition-all cursor-pointer ${
                    selectedAgent === agent.id
                      ? 'bg-indigo-500/10 border-indigo-500/35 shadow-lg shadow-indigo-500/5'
                      : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {agent.label}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      agent.role === 'Cognitive' 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : agent.role === 'Sentinel'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      {agent.role}
                    </span>
                  </div>
                  
                  {selectedAgent === agent.id ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-[11px] leading-relaxed text-white/60"
                    >
                      {agent.desc}
                    </motion.p>
                  ) : (
                    <p className="mt-1 text-[10px] text-white/40 truncate">
                      {agent.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Staging & Config Card */}
          <div className="rounded-2xl border border-white/5 bg-[#111113] p-5 backdrop-blur-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-1.5">
              <FileCode className="h-4 w-4 text-emerald-400" />
              File Staging Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                <span className="text-white/60">private/social/links.json</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="h-3 w-3" /> Configured
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                <span className="text-white/60">private/voice/style-guide.json</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="h-3 w-3" /> Signed (sip)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">private/auth/credentials.env</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="h-3 w-3" /> Keys Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Graph Visualizer & Staging Previews */}
        <div className="space-y-6 lg:col-span-1">
          {/* Main workspace visual card */}
          <div className="rounded-2xl border border-white/5 bg-[#111113] p-5 backdrop-blur-xl flex flex-col h-[585px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('graph')}
                  className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all ${
                    activeTab === 'graph'
                      ? 'border-indigo-400 text-white'
                      : 'border-transparent text-white/40 hover:text-white/60'
                  }`}
                >
                  Swarm Mesh
                </button>
                <button
                  onClick={() => setActiveTab('ledger')}
                  className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all ${
                    activeTab === 'ledger'
                      ? 'border-indigo-400 text-white'
                      : 'border-transparent text-white/40 hover:text-white/60'
                  }`}
                >
                  Sheets Ledger
                </button>
              </div>
              <span className="text-[10px] text-white/40">Drag nodes to explore</span>
            </div>

            {/* TAB CONTENT: FORCE GRAPH */}
            {activeTab === 'graph' && (
              <div
                id="graph-canvas-container"
                className="relative flex-1 bg-black/30 rounded-xl mt-4 border border-white/[0.02] overflow-hidden"
              >
                {/* SVG Connections */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <defs>
                    <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {GRAPH_LINKS.map((link, idx) => {
                    const sourceNode = nodePositions[link.source]
                    const targetNode = nodePositions[link.target]
                    if (!sourceNode || !targetNode) return null
                    return (
                      <line
                        key={idx}
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke="url(#link-gradient)"
                        strokeWidth="1.5"
                      />
                    )
                  })}

                  {/* Flow packets flying along lines */}
                  {packets.map((packet) => {
                    const start = nodePositions[packet.from]
                    const end = nodePositions[packet.to]
                    if (!start || !end) return null
                    const currentX = start.x + (end.x - start.x) * packet.progress
                    const currentY = start.y + (end.y - start.y) * packet.progress
                    return (
                      <circle
                        key={packet.id}
                        cx={currentX}
                        cy={currentY}
                        r="3.5"
                        fill="#818cf8"
                        className="animate-pulse shadow-glow"
                        style={{ filter: 'drop-shadow(0px 0px 4px #818cf8)' }}
                      />
                    )
                  })}
                </svg>

                {/* Nodes rendering using Framer Motion drag mechanics */}
                {AGENT_NODES.map((agent) => (
                  <motion.div
                    key={agent.id}
                    drag
                    dragMomentum={false}
                    onDrag={(event, info) => handleDragNode(agent.id, info)}
                    style={{
                      left: (nodePositions[agent.id]?.x || agent.x) - 22,
                      top: (nodePositions[agent.id]?.y || agent.y) - 22,
                      position: 'absolute'
                    }}
                    className={`h-11 w-11 rounded-full bg-gradient-to-br ${agent.color} border border-white/20 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 transition-transform shadow-lg ${
                      selectedAgent === agent.id ? 'ring-2 ring-white scale-110 shadow-xl' : ''
                    }`}
                  >
                    {agent.id === 'Orchestrator' && <Cpu className="h-5.5 w-5.5 text-white" />}
                    {agent.id === 'Sentinel' && <Shield className="h-5.5 w-5.5 text-white" />}
                    {agent.id !== 'Orchestrator' && agent.id !== 'Sentinel' && (
                      <Brain className="h-5.5 w-5.5 text-white" />
                    )}
                    
                    {/* Node label */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold text-white/80 bg-black/60 px-1 rounded">
                      {agent.id}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: LEDGER TABLE */}
            {activeTab === 'ledger' && (
              <div className="flex-1 mt-4 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg mb-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Synced with Google Spreadsheet: 1op1HwZ26...
                </div>
                {ledgerLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white/[0.01] border border-white/5 rounded-lg p-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-white/40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      <span className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        log.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1 text-xs">
                      <span className="font-semibold text-white/80">{log.platform} (@{log.keyword})</span>
                      <span className="font-mono text-indigo-400 text-[10px]">{log.id}</span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/40 truncate">{log.target}</p>
                    <div className="flex items-center gap-1 mt-2 text-[9px] text-white/30 font-mono">
                      <Lock className="h-2.5 w-2.5" />
                      <span>{log.signature}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Smartphone Simulator & Logs */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-white/5 bg-[#111113] p-5 backdrop-blur-xl flex flex-col justify-between h-[585px]">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-white/80 border-b border-white/5 pb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" />
              Sovereign Lead Flow Loop
            </h2>

            {/* Smartphone GUI Frame */}
            <div className="relative mx-auto mt-4 h-[380px] w-[220px] rounded-[32px] border-4 border-slate-800 bg-black shadow-2xl overflow-hidden flex flex-col">
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 h-3.5 w-24 -translate-x-1/2 rounded-b-xl bg-slate-800 z-20"></div>
              
              <div className="flex-1 bg-[#0b0f19] p-3 flex flex-col text-[10px] pt-5">
                {/* Phone Status Header */}
                <div className="flex justify-between text-[8px] text-white/30 font-semibold mb-3">
                  <span>13:44</span>
                  <span>5G</span>
                </div>
                
                {/* Post Body preview inside smartphone */}
                <div className="rounded-lg bg-white/5 border border-white/[0.04] p-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3.5 w-3.5 rounded-full bg-indigo-500/20 border border-indigo-400/40"></span>
                    <span className="font-bold text-white/95 text-[9px]">@frankxai</span>
                  </div>
                  <p className="mt-1 text-white/70 text-[8.5px] leading-relaxed">
                    Starlight Sovereign suite bypasses all monthly SaaS fees. Comment 'SYSTEM' below for custom setup.
                  </p>
                </div>

                {/* Live simulation bubble overlay */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {simComments.map((comment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-2 flex flex-col gap-0.5"
                    >
                      <div className="flex justify-between items-center text-[7.5px] font-bold text-indigo-300">
                        <span>{comment.handle}</span>
                        <span className="text-white/30 font-normal">{comment.time}</span>
                      </div>
                      <span className="text-white/90 font-medium text-[8px]">{comment.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Automated notification slide-in */}
                {notifActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-2.5 left-2 right-2 bg-slate-900/95 border border-emerald-500/30 rounded-xl p-2.5 shadow-2xl flex items-start gap-2"
                  >
                    <span className="h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[9px]">
                      ✉️
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-[7px] text-white/40">
                        <span className="font-bold text-emerald-400">Direct Message Sent</span>
                        <span>now</span>
                      </div>
                      <p className="text-white/80 font-medium text-[8px] truncate mt-0.5">
                        "Here is the map: https://frankx.ai/blog/faceless-..."
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Run simulation CTA */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                disabled={isSimulating}
                onClick={startSimulation}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-600 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-500/20"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    Simulate Keyword Trigger
                  </>
                )}
              </button>

              {/* TUI Logger */}
              <div className="bg-black/95 rounded-lg p-2.5 font-mono text-[9px] text-[#38bdf8] h-20 overflow-y-auto border border-white/5 scroll-smooth">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="truncate">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
