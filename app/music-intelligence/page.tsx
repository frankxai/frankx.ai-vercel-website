import Link from 'next/link'

const AGENTS = [
  { id: 'lyric-writer', name: 'Lyric Writer', desc: 'Lyrics psychology, prosody, AI generation formatting', badge: 'Hub' },
  { id: 'film-sync-composer', name: 'Film & Sync Composer', desc: 'Cue design, brief decoding, sync licensing', badge: 'Hub' },
  { id: 'music-theory-teacher', name: 'Music Theory Teacher', desc: 'Music language taught through what you already make', badge: 'Hub' },
  { id: 'orchestration-architect', name: 'Orchestration Architect', desc: 'Voicing, register, density, doubling for real and AI orchestras', badge: 'Hub' },
  { id: 'vibe-os-master', name: 'Vibe OS Master', desc: 'State-change music: ISO principle, BPM mapping, frequency sessions', badge: 'Vibe OS' },
  { id: 'music-producer', name: 'Music Producer', desc: 'End-to-end production flow: genre, prompt, QC, release', badge: 'FrankX' },
  { id: 'music-suno-mastery', name: 'Suno Mastery', desc: 'Genre-specific production briefs across 12+ styles', badge: 'FrankX' },
  { id: 'music-suno-prompt-architect', name: 'Suno Prompt Architect', desc: '3-variant prompts: anchor, paraphrase, contrarian', badge: 'FrankX' },
  { id: 'music-mastering-qc', name: 'Mastering QC', desc: '-14 LUFS targeting, true-peak, dynamic range via ffmpeg', badge: 'FrankX' },
  { id: 'music-licensing', name: 'Music Licensing', desc: 'Use-case → license classification, platform ToS lookup', badge: 'FrankX' },
]

const AUDIENCES = [
  {
    title: 'Producers & Beatmakers',
    icon: '🎛',
    items: ['Suno prompt engineering', 'Genre production briefs', 'Mastering QC checklist', 'Catalog management'],
    start: '/music',
  },
  {
    title: 'Film & Sync',
    icon: '🎬',
    items: ['Cue design from briefs', 'Spotting sessions', 'One-stop sync packaging', 'Temp-track decoding'],
    start: '/music-intelligence#agents',
  },
  {
    title: 'Orchestras & Composers',
    icon: '🎻',
    items: ['Orchestration plans', 'Voicing specs', 'Hybrid scoring', 'AI prompt translation'],
    start: '/music-intelligence#agents',
  },
  {
    title: 'Educators',
    icon: '📚',
    items: ['Music theory curriculum', '4-tier learning paths', 'AI-generation as lab bench', 'Lesson content generation'],
    start: 'https://ai-music-academy.vercel.app',
  },
  {
    title: 'Content Creators',
    icon: '📱',
    items: ['State-change music selection', 'Vibe OS for focus/energy', 'AI track licensing', 'Free Suno templates'],
    start: '/music/templates',
  },
  {
    title: 'Record Labels',
    icon: '🏷',
    items: ['Licensing classification', 'Metadata standards', 'Sync-readiness reports', 'Royalty structure guidance'],
    start: '/music-intelligence#agents',
  },
]

const ECOSYSTEM = [
  { name: 'FrankX (Private Hub)', role: 'Music agents, 12k+ song catalog', href: 'https://github.com/frankxai/frankx', badge: 'engine' },
  { name: 'Vibe OS', role: 'State-change research + MCP server', href: 'https://github.com/frankxai/vibe-os', badge: 'engine' },
  { name: 'music-intelligence-systems', role: 'Registry, schemas, portable exports', href: 'https://github.com/frankxai/music-intelligence-systems', badge: 'hub' },
  { name: 'AI Music Academy', role: 'Curriculum, portable teaching agents', href: 'https://github.com/frankxai/ai-music-academy', badge: 'education' },
  { name: 'claude-skills-library', role: 'Vibe OS Master skill', href: 'https://github.com/frankxai/claude-skills-library', badge: 'distribution' },
  { name: 'Starlight Intelligence System', role: 'Sound + Music IS verticals', href: 'https://github.com/frankxai/starlight-intelligence-system', badge: 'substrate' },
]

const BADGE_COLORS: Record<string, string> = {
  hub: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  engine: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  education: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  distribution: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  substrate: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  'Hub': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Vibe OS': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'FrankX': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
}

export default function MusicIntelligencePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Music Intelligence System
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The connected stack for{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI music intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed">
            13 portable agents importable into Claude Projects, Custom GPTs, Gemini Gems, Grok, or any coding agent.
            A vibe-os MCP server for state-change music sessions. Research into music psychology and brainwave entrainment.
            Free Suno prompt templates. One ecosystem, multiple repos, one hub.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#agents"
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors font-medium"
            >
              Browse agents
            </Link>
            <Link
              href="/music/templates"
              className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium"
            >
              Free Suno templates
            </Link>
            <a
              href="https://github.com/frankxai/music-intelligence-systems"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium text-gray-300"
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Ecosystem map */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Ecosystem</h2>
          <p className="text-gray-400 mb-8">Six repositories, one coherent system. Each repo owns its assets; the hub registers and exports them.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ECOSYSTEM.map((repo) => (
              <a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{repo.name}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${BADGE_COLORS[repo.badge] ?? ''}`}>{repo.badge}</span>
                </div>
                <p className="text-gray-500 text-sm">{repo.role}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Portable Agents</h2>
          <p className="text-gray-400 mb-2">Import into any AI platform — Claude Projects, Custom GPTs, Gemini Gems, Grok, or as system prompts.</p>
          <p className="text-gray-500 text-sm mb-8">
            Download from{' '}
            <a href="https://github.com/frankxai/music-intelligence-systems/tree/main/exports" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              github.com/frankxai/music-intelligence-systems/exports
            </a>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium">{agent.name}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full border whitespace-nowrap ${BADGE_COLORS[agent.badge] ?? ''}`}>{agent.badge}</span>
                </div>
                <p className="text-gray-400 text-sm">{agent.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl border border-purple-500/20 bg-purple-500/5">
            <p className="text-sm text-gray-400">
              <strong className="text-white">How to import:</strong> Download the file for your platform from the exports directory.
              Paste the contents into your Claude Project instructions, Custom GPT instructions field, or Gemini Gem.
              All GPT exports are under the 8,000-character ceiling.
            </p>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">The Science</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            Vibe OS is built on peer-reviewed research into music psychology, tempo entrainment, and brainwave entrainment.
            Not theory — cited mechanisms with evidence grades.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-2xl mb-3">🎵</div>
              <h3 className="font-semibold mb-2">Tempo entrainment</h3>
              <p className="text-gray-400 text-sm">Heart rate and breathing naturally synchronize toward music tempo (RAS effect). BPM selection is measurable, not decorative. <span className="text-cyan-400">Evidence: strong</span></p>
            </div>
            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-2xl mb-3">🧠</div>
              <h3 className="font-semibold mb-2">Mode and valence</h3>
              <p className="text-gray-400 text-sm">Major/minor mode shifts perceived valence in measurable ways. Context, tempo, and culture modulate the effect. <span className="text-cyan-400">Evidence: strong</span></p>
            </div>
            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-2xl mb-3">🌊</div>
              <h3 className="font-semibold mb-2">ISO principle</h3>
              <p className="text-gray-400 text-sm">Music that matches current arousal level then transitions gradually is more effective for state change than abrupt shifts. <span className="text-amber-400">Evidence: preliminary</span></p>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href="https://github.com/frankxai/vibe-os"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Vibe OS research docs →
            </a>
            <Link href="/vibe" className="text-sm text-purple-400 hover:text-purple-300">
              Vibe OS product →
            </Link>
          </div>
        </div>
      </section>

      {/* Free templates teaser */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-purple-950/20 p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-4">
              Free templates
            </div>
            <h2 className="text-2xl font-bold mb-3">8 Suno Prompt Templates — Research-backed, Copy-Paste Ready</h2>
            <p className="text-gray-400 mb-6 max-w-2xl">
              State-specific Suno prompts derived from vibe-os research presets.
              Each template includes the scientific rationale, so you know why the BPM and mode choices work.
            </p>
            <div className="flex gap-4">
              <Link
                href="/music/templates"
                className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors font-medium text-sm"
              >
                Get free templates
              </Link>
              <Link
                href="/music-lab"
                className="px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium text-sm text-gray-300"
              >
                Music Lab →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Audience grid */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Who it&apos;s for</h2>
          <p className="text-gray-400 mb-8">Different entry points for different use cases.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUDIENCES.map((aud) => (
              <Link
                key={aud.title}
                href={aud.start}
                className="group p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
              >
                <div className="text-2xl mb-3">{aud.icon}</div>
                <h3 className="font-semibold mb-3 group-hover:text-white transition-colors">{aud.title}</h3>
                <ul className="space-y-1">
                  {aud.items.map((item) => (
                    <li key={item} className="text-gray-500 text-sm flex items-start gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MCP server */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Vibe OS MCP Server</h2>
          <p className="text-gray-400 mb-6 max-w-3xl">
            A FastMCP server wrapping the vibe-os Python tools. Install it in Claude Code, Claude Desktop, or Cursor
            and call <code className="text-cyan-300 bg-white/5 px-1 py-0.5 rounded">list_vibe_states</code>,{' '}
            <code className="text-cyan-300 bg-white/5 px-1 py-0.5 rounded">generate_vibe_prompt</code>,{' '}
            <code className="text-cyan-300 bg-white/5 px-1 py-0.5 rounded">design_frequency_session</code>, and more.
          </p>
          <div className="p-4 rounded-xl border border-white/10 bg-black/40 font-mono text-sm">
            <p className="text-gray-500 mb-1"># Install (Claude Code / claude.ai/code)</p>
            <p className="text-green-400">claude mcp add vibe-os -- python3 mcp-server/server.py</p>
            <p className="text-gray-500 mt-3 mb-1"># Or clone and run directly</p>
            <p className="text-gray-300">git clone https://github.com/frankxai/vibe-os</p>
            <p className="text-gray-300">pip install mcp numpy && python3 vibe-os/mcp-server/server.py</p>
          </div>
          <div className="mt-4">
            <a
              href="https://github.com/frankxai/vibe-os/tree/main/mcp-server"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Full install guide →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
