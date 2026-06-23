import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ocean Intelligence System | FrankX',
  description:
    'Guardian agents for the sea. Ocean Intelligence turns open marine data into grounded briefings — reef, bay, and species guardians wired to real data, ethics-bounded, built on Starlight Intelligence.',
  openGraph: {
    title: 'Ocean Intelligence System',
    description:
      'Guardian agents for the sea. Real marine data. Ethics-bounded. Built on SIP.',
  },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const guardians = [
  {
    name: 'Reef Guardian',
    icon: '🪸',
    tagline: 'Heat-stress · bleaching alerts · recovery windows',
    description:
      'Watches Coral Reef Watch thermal anomaly feeds for one reef. Surfaces bleaching risk in plain language with grounded citations — so a field team knows when to look, not just that something changed.',
    signals: ['SST anomaly', 'DHW accumulation', 'ENSO state'],
    color: 'from-cyan-500/20 to-teal-600/10',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  {
    name: 'Bay Guardian',
    icon: '🌊',
    tagline: 'Occurrence · protected areas · coastal signals',
    description:
      'Tracks new species occurrences in a coastal grid, protected-area status changes, and fishing-effort shifts. Gives a bay NGO a daily brief without a data engineering team.',
    signals: ['OBIS occurrences', 'MPA boundaries', 'AIS fishing effort'],
    color: 'from-blue-500/20 to-cyan-600/10',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
    glow: 'shadow-blue-500/20',
  },
  {
    name: 'Species Guardian',
    icon: '🐋',
    tagline: 'IUCN status · tracking data · range shifts',
    description:
      'Follows one species: IUCN Red List updates, acoustic or satellite tracking signals, range shifts from GBIF. Produces a brief a creator or researcher can trust and cite.',
    signals: ['IUCN Red List', 'GBIF occurrences', 'acoustic tracking'],
    color: 'from-emerald-500/20 to-teal-600/10',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
]

const layers = [
  {
    label: 'Layer 1',
    name: 'Blue Life Commons',
    role: 'Trust',
    description: 'Public-good knowledge. Species pages, region briefings, dataset cards, field ethics. Stays free forever — this is what guardians cite.',
    href: 'https://github.com/frankxai/blue-life-commons',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
  },
  {
    label: 'Layer 2',
    name: 'Ocean Intelligence System',
    role: 'Continuity',
    description: 'Open-source machinery. Data connectors to OBIS, GBIF, ERDDAP, Copernicus Marine. Guardian runtime. MCP servers. This repo.',
    href: 'https://github.com/frankxai/ocean-intelligence-system',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/5',
  },
  {
    label: 'Layer 3',
    name: 'Marine Intelligence Systems',
    role: 'Reach',
    description: 'Implementation, design, institutional adoption. Sells speed, integration, reliability — never access to ocean knowledge.',
    href: 'https://github.com/frankxai/music-intelligence-systems',
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/5',
  },
]

const useCases = [
  { who: 'NGO / conservation org', gets: 'Research-OS starting point: connectors + a guardian that turns raw feeds into briefings your team can read and share.' },
  { who: 'Researcher', gets: 'MCP connectors for OBIS, GBIF, ERDDAP, Copernicus Marine — queryable from a notebook or an agent, provenance carried through every response.' },
  { who: 'Creator', gets: 'A grounded source of truth for ocean content. Every claim traces back to a reviewed commons artifact and a Tier 1–2 citation.' },
  { who: 'App developer', gets: 'A normalized surface over fragmented marine APIs — one shape for occurrences, one for ocean state, one for protected areas.' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OceanPage() {
  return (
    <div className="min-h-screen bg-[#040d18] text-white overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 overflow-hidden">

        {/* Deep ocean background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040d18] via-[#061628] to-[#02080f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_80%,rgba(6,182,212,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_60%,rgba(16,185,129,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_80%_55%,rgba(14,165,233,0.06),transparent)]" />

        {/* Animated bioluminescent particles (CSS) */}
        <style>{`
          @keyframes rise-1 { 0% { transform: translateY(0) translateX(0); opacity: 0.9; } 100% { transform: translateY(-280px) translateX(8px); opacity: 0; } }
          @keyframes rise-2 { 0% { transform: translateY(0) translateX(0); opacity: 0.7; } 100% { transform: translateY(-320px) translateX(-6px); opacity: 0; } }
          @keyframes rise-3 { 0% { transform: translateY(0) translateX(0); opacity: 0.8; } 100% { transform: translateY(-260px) translateX(12px); opacity: 0; } }
          @keyframes pulse-glow { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.15); } }
          @keyframes wave-x { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-30px); } }
          @keyframes float-jelly { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-18px) rotate(3deg); } }
          @keyframes sonar { 0% { transform: scale(0.3); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
          @keyframes shimmer { 0% { opacity: 0; transform: translateX(-100%); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateX(100%); } }
          .particle { position: absolute; border-radius: 50%; }
          .p1 { width:4px;height:4px;background:#06b6d4;bottom:35%;left:10%; animation: rise-1 7s ease-in infinite; }
          .p2 { width:3px;height:3px;background:#10b981;bottom:40%;left:13%; animation: rise-2 9s ease-in 1s infinite; }
          .p3 { width:2px;height:2px;background:#0ea5e9;bottom:30%;left:8%; animation: rise-3 6s ease-in 3s infinite; }
          .p4 { width:5px;height:5px;background:#10b981;bottom:38%;left:22%; animation: rise-1 8s ease-in 2s infinite; }
          .p5 { width:3px;height:3px;background:#06b6d4;bottom:42%;left:25%; animation: rise-2 10s ease-in 0.5s infinite; }
          .p6 { width:4px;height:4px;background:#06b6d4;bottom:35%;right:10%; animation: rise-3 7.5s ease-in 1.5s infinite; }
          .p7 { width:3px;height:3px;background:#10b981;bottom:40%;right:14%; animation: rise-1 6.5s ease-in 4s infinite; }
          .p8 { width:5px;height:5px;background:#0284c7;bottom:33%;right:8%; animation: rise-2 9s ease-in 2.5s infinite; }
          .p9 { width:3px;height:3px;background:#10b981;bottom:38%;left:48%; animation: rise-1 8.5s ease-in 0.8s infinite; }
          .p10 { width:2px;height:2px;background:#0ea5e9;bottom:45%;left:52%; animation: rise-3 9.5s ease-in 2s infinite; }
        `}</style>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10'].map(c => (
            <div key={c} className={`particle ${c}`} style={{filter:'blur(1px)'}}/>
          ))}
        </div>

        {/* Sonar pulse rings */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 pointer-events-none">
          {[0, 1.5, 3].map(delay => (
            <div key={delay} className="absolute -inset-8 rounded-full border border-cyan-400/20"
              style={{animation:`sonar 4s ease-out ${delay}s infinite`}}/>
          ))}
        </div>

        {/* Depth scan line */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"
          style={{animation:'wave-x 8s ease-in-out infinite', top:'60%'}}/>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{animation:'pulse-glow 2s ease-in-out infinite'}}/>
            Ocean Intelligence System · frankxai
          </div>

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300">
              Guardian agents
            </span>
            <br/>
            <span className="text-white/90">for the sea.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
            Ocean Intelligence turns open marine data into grounded briefings.
            Reef guardians, bay guardians, species guardians — wired to real data,
            ethics-bounded, built on{' '}
            <Link href="/sis" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Starlight Intelligence
            </Link>
            .
          </p>
          <p className="text-sm text-white/35 mb-10 font-mono">
            Every claim traces to a reviewed commons artifact and a Tier 1–2 citation. No invented facts.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/frankxai/ocean-intelligence-system"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all"
            >
              View on GitHub →
            </a>
            <a
              href="https://github.com/frankxai/blue-life-commons"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/8 hover:text-white/90 transition-all"
            >
              Blue Life Commons
            </a>
          </div>
        </div>

        {/* Ocean floor gradient at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#02080f] to-transparent"/>
        {/* Shimmer line at top of content */}
        <div className="absolute top-0 inset-x-0 h-px overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            style={{animation:'shimmer 5s ease-in-out infinite'}}/>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>dive deeper</span>
          <div className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent"/>
        </div>
      </section>

      {/* ── Three-Layer Architecture ──────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#02080f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(6,182,212,0.04),transparent)]"/>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-cyan-500/70 tracking-widest uppercase mb-3">Architecture</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white/90">Three layers. Each distinct by design.</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Keep them separate on purpose. The commons stays free forever. The intelligence layer acts on it. The business sells speed — never access.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {layers.map((layer, i) => (
              <a
                key={layer.name}
                href={layer.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-xl border ${layer.border} ${layer.bg} p-6 hover:bg-opacity-10 transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Layer connector line (not last) */}
                {i < layers.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-px bg-gradient-to-r from-white/20 to-white/10"/>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 text-xs">›</div>
                  </div>
                )}
                <div className={`text-xs font-mono ${layer.color} opacity-60 mb-2 tracking-widest uppercase`}>{layer.label}</div>
                <h3 className={`text-base font-semibold mb-1 ${layer.color} group-hover:opacity-100 transition-opacity`}>{layer.name}</h3>
                <div className={`text-xs font-mono text-white/40 mb-3`}>→ {layer.role}</div>
                <p className="text-xs text-white/50 leading-relaxed">{layer.description}</p>
              </a>
            ))}
          </div>

          {/* Hard boundary notice */}
          <div className="mt-6 px-4 py-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-300/70 text-xs text-center font-mono">
            Hard boundary: Intelligence System reads from the Commons. Never overrides it. Scientific truth and ethics are upstream.
          </div>
        </div>
      </section>

      {/* ── Ocean Guardians ───────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#02080f] to-[#040d18]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(6,182,212,0.05),transparent)]"/>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-emerald-500/70 tracking-widest uppercase mb-3">Guardian Archetypes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white/90">Long-running agents for places and populations.</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Each guardian is scoped to one reef, one bay, one species — grounded in reviewed commons content, wired to real data connectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {guardians.map(g => (
              <div
                key={g.name}
                className={`group relative rounded-2xl border ${g.border} bg-gradient-to-b ${g.color} p-6 hover:shadow-xl ${g.glow} transition-all duration-300 hover:-translate-y-1.5 overflow-hidden`}
              >
                {/* Background glow pulse */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{background:`radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.08), transparent)`}}/>

                <div className="relative">
                  <div className="text-3xl mb-3">{g.icon}</div>
                  <h3 className="text-lg font-semibold text-white/95 mb-1">{g.name}</h3>
                  <p className="text-xs font-mono text-white/40 mb-4">{g.tagline}</p>
                  <p className="text-sm text-white/60 leading-relaxed mb-5">{g.description}</p>

                  {/* Signal chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {g.signals.map(s => (
                      <span key={s} className={`px-2 py-0.5 rounded-full border ${g.border} text-[10px] font-mono text-white/50`}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Live indicator */}
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${g.dot}`} style={{animation:'pulse-glow 2s ease-in-out infinite'}}/>
                    <span className="text-[10px] font-mono text-white/30">watching</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#040d18]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-sky-500/70 tracking-widest uppercase mb-3">Who it's for</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white/90">What you can build with it.</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map(uc => (
              <div key={uc.who} className="rounded-xl border border-white/8 bg-white/3 p-5 hover:border-cyan-500/30 hover:bg-cyan-500/3 transition-all">
                <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wide">{uc.who}</div>
                <p className="text-sm text-white/60 leading-relaxed">{uc.gets}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data connectors strip ─────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-[#02080f] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono text-white/30 text-center mb-6 tracking-widest uppercase">Connected data sources</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['OBIS','GBIF','ERDDAP','Copernicus Marine','IUCN Red List','Coral Reef Watch','AIS / fishing effort','Protected Planet'].map(src => (
              <span key={src} className="px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-mono hover:border-cyan-500/30 hover:text-cyan-400/70 transition-colors">
                {src}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-[#02080f] to-[#040d18] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.06),transparent)]"/>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🌊</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white/90 mb-4">
            Build a guardian for your part of the sea.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
            Fork the reference implementation. Wire your connectors. Ground it in the commons. Launch a guardian that watches the signals your community can&apos;t watch full-time.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/frankxai/ocean-intelligence-system"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium text-sm hover:from-cyan-500 hover:to-teal-500 transition-all shadow-lg shadow-cyan-900/30"
            >
              Explore the repo →
            </a>
            <a
              href="https://github.com/frankxai/blue-life-commons"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-white/15 text-white/60 font-medium text-sm hover:border-white/30 hover:text-white/80 transition-all"
            >
              Read the commons
            </a>
          </div>

          {/* SIP badge */}
          <div className="mt-12 inline-flex items-center gap-2 text-white/25 text-xs font-mono">
            <span className="w-1 h-1 rounded-full bg-emerald-400/40"/>
            Built on Starlight Intelligence Protocol
          </div>
        </div>
      </section>

    </div>
  )
}
