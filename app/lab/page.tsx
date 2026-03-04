import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { GlowCard } from '@/components/ui/glow-card'

export const metadata: Metadata = {
  title: 'FrankX Lab — AI Tools & Experiments',
  description:
    'FRANK-Ω\'s workshop. Research-grounded infographics, creator intelligence, world-building AI, and more. Built by Frank, powered by frontier models.',
  openGraph: {
    title: 'FrankX Lab — AI Tools & Experiments',
    description:
      'The full stack of AI tools Frank has built. InfoGenius, ACOS, Arcanea, Music Lab — bring your own key or subscribe.',
    images: [{ url: '/images/mascot/frank-omega-thinking-v1.png' }],
  },
}

const tools = [
  {
    id: 'infogenius',
    name: 'InfoGenius',
    tagline: 'Research → 4K infographic in 60 seconds',
    description:
      'Drop a topic. FRANK-Ω researches it with Google Search grounding, builds a precision prompt, and renders a cinematic 4K visual. 8 styles, 4 audience levels, video + narration included.',
    href: 'https://aistudio.google.com/app/prompts/new_chat',
    hrefLabel: 'Open in AI Studio',
    externalHref: true,
    status: 'Live' as const,
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    color: 'violet' as const,
    icon: '🎨',
    keyRequired: 'Google AI API key',
    stats: [
      { n: '8', label: 'Visual styles' },
      { n: '4K', label: 'Resolution' },
      { n: '<60s', label: 'Research to image' },
    ],
  },
  {
    id: 'acos',
    name: 'ACOS Score',
    tagline: 'Creator intelligence assessment',
    description:
      'The Agentic Creator OS scoring engine. Evaluate your trajectory across 12 creator dimensions — content, technical, monetization, presence. Know exactly where you stand.',
    href: '/acos',
    hrefLabel: 'Take the Assessment',
    externalHref: false,
    status: 'Beta' as const,
    statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    color: 'blue' as const,
    icon: '⚡',
    keyRequired: null,
    stats: [
      { n: '12', label: 'Dimensions' },
      { n: '1k+', label: 'Builders scored' },
      { n: '40+', label: 'Countries' },
    ],
  },
  {
    id: 'arcanea',
    name: 'Arcanea World',
    tagline: 'AI civilization engine + generative lore',
    description:
      'Five Eldrian entities. Ten Gates. A complete civilization system with AI-generated character art, lore content pipeline, and world-state engine. Arcanea is where Frank\'s worlds come alive.',
    href: '/arcanea',
    hrefLabel: 'Enter the World',
    externalHref: false,
    status: 'Beta' as const,
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    color: 'amber' as const,
    icon: '🌌',
    keyRequired: null,
    stats: [
      { n: '5', label: 'Eldrian entities' },
      { n: '10', label: 'Lore gates' },
      { n: '4K', label: 'Character art' },
    ],
  },
  {
    id: 'music',
    name: 'Music Lab',
    tagline: 'AI prompt architecture for Suno mastery',
    description:
      '12,000+ songs generated. 65 tracks indexed. Frank has cracked the Suno prompt formula across 8+ genres. Access the prompt library, album curation system, and production patterns.',
    href: '/music-lab',
    hrefLabel: 'Explore Music Lab',
    externalHref: false,
    status: 'Coming Soon' as const,
    statusColor: 'text-white/40 bg-white/5 border-white/10',
    color: 'emerald' as const,
    icon: '🎵',
    keyRequired: null,
    stats: [
      { n: '12k+', label: 'Songs generated' },
      { n: '65', label: 'Indexed tracks' },
      { n: '5', label: 'Album concepts' },
    ],
  },
]

const byokSteps = [
  {
    n: '01',
    title: 'Get a Google AI API key',
    body: 'Free to start. Create an account at aistudio.google.com → Get API key. Pay-as-you-go billing for Gemini Pro models.',
  },
  {
    n: '02',
    title: 'Open the tool',
    body: 'Click "Open in AI Studio" on InfoGenius. Your key is selected in the AI Studio interface — no code needed.',
  },
  {
    n: '03',
    title: 'Generate at will',
    body: 'Type any topic. FRANK-Ω researches it in real-time, builds the prompt, and renders your 4K infographic.',
  },
]

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">

      {/* ── Hero ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        {/* Background: FRANK-Ω thinking, ghost */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute right-0 top-0 w-[480px] h-full opacity-[0.06]">
            <Image
              src="/images/mascot/frank-omega-thinking-v1.png"
              alt=""
              fill
              className="object-contain object-right-top"
              priority
            />
          </div>
          {/* Ambient glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
              FrankX Intelligence Lab
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-[0.9] mb-6">
            FRANK-Ω&apos;s{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Workshop.
            </span>
          </h1>

          <p className="text-xl text-white/50 leading-relaxed mb-10 max-w-xl">
            Every tool Frank has built — powered by frontier models. Research-grounded infographics.
            Creator intelligence. World-building AI. Bring your own key or subscribe.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              Explore Tools
              <span>↓</span>
            </Link>
            <Link
              href="#byok"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              How BYOK works
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/8">
            {[
              { n: '4', label: 'AI tools' },
              { n: 'Gemini 3 Pro', label: 'Primary engine' },
              { n: 'BYOK', label: 'Free tier' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white">{s.n}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Grid ── */}
      <section id="tools" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-widest text-violet-400">The Arsenal</span>
            <h2 className="text-4xl font-black text-white mt-3">Tools in the lab</h2>
            <p className="text-white/50 mt-3 max-w-xl">
              Everything Frank ships gets added here. Some are live, some are in beta, some are coming.
              All are real tools with real results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <GlowCard key={tool.id} color={tool.color} className="p-8 flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                      {tool.icon}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg leading-tight">{tool.name}</div>
                      <div className="text-white/50 text-sm mt-0.5">{tool.tagline}</div>
                    </div>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.statusColor}`}>
                    {tool.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {tool.description}
                </p>

                {/* Stats */}
                <div className="flex gap-6">
                  {tool.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-lg font-black text-white">{s.n}</div>
                      <div className="text-[11px] text-white/40 uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/8">
                  {tool.keyRequired && (
                    <span className="text-xs text-white/40">
                      Requires: {tool.keyRequired}
                    </span>
                  )}
                  {tool.status !== 'Coming Soon' ? (
                    <Link
                      href={tool.href}
                      target={tool.externalHref ? '_blank' : undefined}
                      rel={tool.externalHref ? 'noopener noreferrer' : undefined}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/20 hover:border-white/40 px-4 py-2 text-xs font-semibold text-white/70 hover:text-white transition-all duration-200"
                    >
                      {tool.hrefLabel}
                      {tool.externalHref && <span className="text-[10px] opacity-60">↗</span>}
                    </Link>
                  ) : (
                    <span className="ml-auto text-xs text-white/30 italic">Notify me when live →</span>
                  )}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── BYOK Explainer ── */}
      <section id="byok" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-xs uppercase tracking-widest text-blue-400">How it works</span>
            <h2 className="text-4xl font-black text-white mt-3">Bring Your Own Key</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              No subscription required. Connect your own Google AI API key and run frontier-model
              tools at near-zero cost. Frank pays for his experiments — you pay for yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {byokSteps.map((step) => (
              <div key={step.n} className="relative">
                <div className="text-5xl font-black text-white/5 absolute -top-3 left-0 select-none">
                  {step.n}
                </div>
                <div className="pt-10">
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-start gap-4">
              {/* FRANK-Ω avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-500/30 shrink-0">
                <Image
                  src="/images/mascot/frank-omega-chibi-avatar-v1_thumb.jpeg"
                  alt="FRANK-Ω"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-[10px] text-blue-400 font-mono uppercase tracking-widest mb-1">
                  FRANK-Ω · Message
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  &ldquo;Hello. Your key, your data, your bill — I touch nothing I shouldn&apos;t.
                  Gemini Pro models run about $0.001 per image. Generate 1,000 infographics
                  for a dollar. You&apos;re welcome.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pro Tier Teaser ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="p-10 rounded-3xl border border-violet-500/20 bg-violet-500/5 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
                <Image
                  src="/images/mascot/frank-omega-pointing-v1.png"
                  alt=""
                  fill
                  className="object-contain object-bottom-right"
                />
              </div>
            </div>
            <span className="relative inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
                Coming — FrankX Lab Pro
              </span>
            </span>
            <h2 className="relative text-4xl font-black text-white mb-4">
              No key. No friction.{' '}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Just results.
              </span>
            </h2>
            <p className="relative text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
              One subscription. All tools. Frank&apos;s API infrastructure handles the keys,
              billing, and rate limits. You just generate. €19/month when it launches.
            </p>
            <Link
              href="/newsletter"
              className="relative inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              Get early access
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AuroraGradient className="rounded-3xl p-12">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-violet-500/40 mx-auto mb-6">
              <Image
                src="/images/mascot/frank-omega-pixar-blue-v1.png"
                alt="FRANK-Ω"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              Start with InfoGenius.
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
              The live tool is in Google AI Studio. Get your free API key and
              generate your first 4K infographic in under 2 minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://aistudio.google.com/app/prompts/new_chat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
              >
                Open InfoGenius
                <span className="text-xs opacity-60">↗</span>
              </a>
              <Link
                href="/infogenius"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                About InfoGenius
              </Link>
            </div>
          </AuroraGradient>
        </div>
      </section>

    </div>
  )
}
