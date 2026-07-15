'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Copy, Download, Terminal, Settings, Shield, Activity, Cpu, Layers } from 'lucide-react'
import AuroraGradient from '@/components/ui/AuroraGradient'

export default function AgenticCreatorOSPreviewPage() {
  const [activeTab, setActiveTab] = useState<'claude' | 'antigravity' | 'codex' | 'grok' | 'cursor' | 'gemini'>('claude')
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const platforms = {
    claude: {
      name: 'Claude Code',
      icon: '🤖',
      description: 'Run directly inside Anthropic\'s developer agent CLI with full slash commands, hooks, and IAM policies.',
      command: 'git clone https://github.com/frankxai/agentic-creator-os.git\ncd agentic-creator-os\n./install.sh --platform=claude',
      verify: 'claude\n/acos'
    },
    antigravity: {
      name: 'Antigravity (AGY)',
      icon: '⚡',
      description: 'Optimal integration with DeepMind Antigravity using .antigravity/ skills and native context routing.',
      command: 'git clone https://github.com/frankxai/agentic-creator-os.git\ncd agentic-creator-os\n./install.sh --platform=antigravity',
      verify: 'agy'
    },
    codex: {
      name: 'OpenAI Codex',
      icon: '🧠',
      description: 'Configure standard .codex/ workspaces, enabling Codex to dynamically read rules and execution schemas.',
      command: 'git clone https://github.com/frankxai/agentic-creator-os.git\ncd agentic-creator-os\n./install.sh --platform=codex',
      verify: 'cfx'
    },
    grok: {
      name: 'xAI Grok Build',
      icon: '🌌',
      description: 'TUI-optimized personal execution seeds, custom hooks, and native harness adapters.',
      command: 'git clone https://github.com/frankxai/agentic-creator-os.git\ncd agentic-creator-os\n./install.sh --platform=grok',
      verify: 'grok\n/hooks-trust\n/skills harness-integration'
    },
    cursor: {
      name: 'Cursor / Windsurf',
      icon: '💻',
      description: 'Slightly lighter integration via custom context files, system rulesets, and .cursorrules.',
      command: 'git clone https://github.com/frankxai/agentic-creator-os.git\ncd agentic-creator-os\n./install.sh --platform=cursor',
      verify: '# Works automatically via cursor editor window'
    },
    gemini: {
      name: 'Gemini Assist',
      icon: '✨',
      description: 'Bootstraps strict instructions and command maps targeting Gemini CLI and workspace contexts.',
      command: 'git clone https://github.com/frankxai/agentic-creator-os.git\ncd agentic-creator-os\n./install.sh --platform=gemini',
      verify: '# Launches with GEMINI.md loaded in session'
    }
  }

  const packages = [
    {
      name: 'Complete OS Bundle',
      file: 'acos-complete.zip',
      size: '23.2 MB',
      description: 'The full Agentic Creator OS workspace including all core skills, agent profiles, workflows, daemon scripts, and setup hooks.',
      url: '/downloads/acos-complete.zip'
    },
    {
      name: 'Skills Pack',
      file: 'acos-skills-pack.zip',
      size: '23.7 MB',
      description: 'The standalone library of 90+ auto-activating domain knowledge modules (e.g. SEO, suno-ai, framer, and react-expert).',
      url: '/downloads/acos-skills-pack.zip'
    },
    {
      name: 'Agent Pack',
      file: 'acos-agents-pack.zip',
      size: '1.5 MB',
      description: 'Complete collection of 38 specialized agent profiles, prompt schemas, and multi-agent swarm orchestration graphs.',
      url: '/downloads/acos-agents-pack.zip'
    },
    {
      name: 'Hooks Pack',
      file: 'acos-hooks-pack.zip',
      size: '82 KB',
      description: 'Pre-commit, post-commit, and safety gates including directory isolation rules, role policies, and self-modify locks.',
      url: '/downloads/acos-hooks-pack.zip'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Back Header */}
      <div className="border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/5 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Downloads</span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-sm font-medium">Platform Update · v15.0.0</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Agentic Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">OS</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            The universal agent harness and skill engine. Install 90+ skills, 65+ workflows, and 38 specialized agents in your local workspace. Auto-activates based on your live directory context.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
              <Cpu size={14} className="text-purple-400" /> v15.0.0 "Ultimate Creator Experience"
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
              <Settings size={14} className="text-emerald-400" /> Keep-Alive Daemon
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
              <Shield size={14} className="text-cyan-400" /> SQLite Trajectories
            </span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <AuroraGradient variant="purple" className="rounded-3xl border border-white/5 p-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
              <Settings className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Keep-Alive IPC Daemon</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Runs a background tools server (`acosd.mjs`) communicating over Named Pipes or sockets. Reduces startup costs and drops tool call latencies down to &lt;2ms.
            </p>
          </AuroraGradient>

          <AuroraGradient variant="emerald" className="rounded-3xl border border-white/5 p-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Shield className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Role-Based Tool Masking</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Restricts tool accessibility based on active agent profiles (`blog-writer`, `security-auditor`, `engineer`). Dynamically filters tool schemas and enforces path boundaries.
            </p>
          </AuroraGradient>

          <AuroraGradient variant="ocean" className="rounded-3xl border border-white/5 p-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Activity className="text-cyan-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">SQLite Trajectories (AgentDB)</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Uses Node's native `sqlite` engine to log step traces, trajectories, and experience replays, enabling agents to dynamically audit and improve outputs from past sessions.
            </p>
          </AuroraGradient>
        </div>

        {/* Downloads Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Download size={16} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold">Release Package Archives</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.file}
                className="bg-[#0f0f12] border border-white/5 hover:border-purple-500/20 rounded-2xl p-6 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold">{pkg.name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded text-gray-400">
                      {pkg.size}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <code className="text-xs text-gray-500 font-mono select-all">
                    {pkg.file}
                  </code>
                  <a
                    href={pkg.url}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl text-sm transition-all"
                  >
                    <Download size={14} /> Download ZIP
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Terminal Guide */}
        <div className="bg-[#0f0f12] border border-white/5 rounded-3xl p-8 mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Terminal size={16} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold">Quick Start Installation</h2>
          </div>

          <p className="text-gray-400 mb-8 text-sm max-w-2xl leading-relaxed">
            Install and register the ACOS harness adapter directly into your target workspace environment. Toggling each tab displays the target-specific setup script:
          </p>

          {/* Platforms Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 mb-6">
            {(Object.keys(platforms) as Array<keyof typeof platforms>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  activeTab === key
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{platforms[key].icon}</span>
                <span>{platforms[key].name}</span>
              </button>
            ))}
          </div>

          {/* Active Platform Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{platforms[activeTab].name} Integration</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                {platforms[activeTab].description}
              </p>
            </div>

            {/* Code Command */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono px-2">
                <span>Install steps</span>
                <button
                  onClick={() => copyToClipboard(platforms[activeTab].command, `cmd-${activeTab}`)}
                  className="flex items-center gap-1.5 hover:text-white transition-all"
                >
                  {copiedText === `cmd-${activeTab}` ? (
                    <>
                      <Check size={12} className="text-green-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy code
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-black/50 border border-white/5 rounded-2xl p-5 overflow-x-auto text-sm font-mono text-purple-200 select-all leading-relaxed whitespace-pre-wrap">
                {platforms[activeTab].command}
              </pre>
            </div>

            {/* Verify Command */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono px-2">
                <span>Setup check</span>
                <button
                  onClick={() => copyToClipboard(platforms[activeTab].verify, `ver-${activeTab}`)}
                  className="flex items-center gap-1.5 hover:text-white transition-all"
                >
                  {copiedText === `ver-${activeTab}` ? (
                    <>
                      <Check size={12} className="text-green-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy code
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-black/50 border border-white/5 rounded-2xl p-5 overflow-x-auto text-sm font-mono text-emerald-200 select-all leading-relaxed whitespace-pre-wrap">
                {platforms[activeTab].verify}
              </pre>
            </div>
          </div>
        </div>

        {/* Integration Specs */}
        <div className="border-t border-white/5 pt-16 grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-purple-400" /> Sovereign Integration Topology
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Agentic Creator OS junctions core files to standard directories (`~/.claude/` or `.grok/`) using secure filesystem links. This enables unified execution, meaning a single update to your skills catalog immediately upgrades all active coding assistants across your machine.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              System hooks act as a local gatekeeper, preventing accidental data pushes or code modifications unless strict verification conditions are satisfied, keeping dev work safe and consistent.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layers size={16} className="text-emerald-400" /> Open Intelligence Protocol (SIP)
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Designed as an open-core layer of the Starlight Intelligence Protocol, ACOS links securely with local vaults, Personal Data Meshes, and private repositories.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Download individual components to build custom configurations, or host private libraries to coordinate specialized agent swarms that orchestrate complex multi-agent cascades locally.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
