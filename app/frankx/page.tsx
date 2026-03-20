import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { GlowCard } from '@/components/ui/glow-card'
import FrankOmega, { FrankOmegaGhost, FrankOmegaAvatar } from '@/components/FrankOmega'

export const metadata: Metadata = {
  title: 'FRANK-Ω — The Digital Intelligence | FrankX.AI',
  description:
    'Frank is an AI Architect, prolific music creator, and systems builder. FRANK-Ω is his superintelligent droid alter-ego — direct, helpful, and permanently online. Meet both.',
  openGraph: {
    title: 'Meet FRANK-Ω — The Digital Intelligence of FrankX',
    description:
      'Enterprise AI Architect. 12,000+ AI songs. Systems builder from Amsterdam. And FRANK-Ω — his superintelligent digital twin who handles the rest.',
    images: [{ url: '/images/mascot/frank-omega-hero-v1.png' }],
  },
}

// ─── All character variants ───────────────────────────────────────
const variants = [
  {
    src: '/images/mascot/frank-omega-pixar-blue-v1.png',
    thumb: '/images/mascot/frank-omega-pixar-blue-v1_thumb.jpeg',
    label: 'Primary',
    mood: 'Confident · Default',
    desc: 'Hands on hips. Already knows the answer.',
    size: 'large', // spans 2 cols + 2 rows
  },
  {
    src: '/images/mascot/frank-omega-hero-v1.png',
    thumb: '/images/mascot/frank-omega-hero-v1_thumb.jpeg',
    label: 'Hero Flight',
    mood: 'Cinematic · Action',
    desc: 'Launching through data streams. Marvel energy.',
    size: 'tall', // spans 2 rows
  },
  {
    src: '/images/mascot/frank-omega-chill-v1.png',
    thumb: '/images/mascot/frank-omega-chill-v1_thumb.jpeg',
    label: 'City Chill',
    mood: 'MGK energy',
    desc: 'Leaned back. City at night. Zero effort.',
    size: 'normal',
  },
  {
    src: '/images/mascot/frank-omega-portrait-v1.png',
    thumb: '/images/mascot/frank-omega-portrait-v1_thumb.jpeg',
    label: 'Portrait',
    mood: 'Focused · Watchful',
    desc: 'Those eyes. Quietly processing everything.',
    size: 'normal',
  },
  {
    src: '/images/mascot/frank-omega-chibi-avatar-v1.png',
    thumb: '/images/mascot/frank-omega-chibi-avatar-v1_thumb.jpeg',
    label: 'Avatar',
    mood: 'Profile-ready',
    desc: 'The face on every platform.',
    size: 'normal',
  },
  {
    src: '/images/mascot/frank-omega-pointing-v1.png',
    thumb: '/images/mascot/frank-omega-pointing-v1_thumb.jpeg',
    label: 'Directing',
    mood: 'Precise · CTA',
    desc: '"This way." He\'s already right.',
    size: 'normal',
  },
  {
    src: '/images/mascot/frank-omega-thinking-v1.png',
    thumb: '/images/mascot/frank-omega-thinking-v1_thumb.jpeg',
    label: 'Deep Work',
    mood: 'Analyzing · Data',
    desc: 'Cross-legged. Orbiting data streams.',
    size: 'normal',
  },
  {
    src: '/images/mascot/frank-omega-chibi-v1.png',
    thumb: '/images/mascot/frank-omega-chibi-v1_thumb.jpeg',
    label: 'Chibi Tough',
    mood: 'Cute + Badass',
    desc: 'Arms crossed. Tiny. Still scary smart.',
    size: 'normal',
  },
  {
    src: '/images/mascot/frank-omega-pixar-chibi-v1.png',
    thumb: '/images/mascot/frank-omega-pixar-chibi-v1_thumb.jpeg',
    label: 'Hey There',
    mood: 'Approachable',
    desc: 'Walking over. Waving. Actually warm.',
    size: 'normal',
  },
  {
    src: '/images/mascot/frank-omega-v1.png',
    thumb: '/images/mascot/frank-omega-v1_thumb.jpeg',
    label: 'Cinematic',
    mood: 'Dramatic · Violet',
    desc: 'Born from purple-violet light. The original.',
    size: 'normal',
  },
]

// ─── Where FRANK-Ω lives ──────────────────────────────────────────
const appearances = [
  { href: '/infogenius', icon: '🎨', label: 'InfoGenius', role: 'Turns any topic into a 4K visual — research-grounded, in seconds.' },
  { href: '/agents', icon: '🤖', label: 'Agent Collective', role: 'Orchestrates the full FrankX AI team across creative domains.' },
  { href: '/acos', icon: '🧠', label: 'ACOS', role: 'Powers the Agentic Creator OS the open-source Agentic Creator OS.' },
  { href: '/tools', icon: '⚡', label: 'Tools', role: 'Instant AI utilities — no setup, no wait.' },
]

// ─── Personality dialogue ────────────────────────────────────────
const dialogue = [
  { trigger: 'You walk in', response: '"Hello. What do you need?"' },
  { trigger: 'Task completed', response: '"Done. Next?"' },
  { trigger: 'You overcomplicate', response: '"Wrong question. Try: [better question]."' },
  { trigger: 'Something\'s broken', response: '"It\'s broken. Here\'s the exact fix."' },
  { trigger: 'Something\'s working', response: '"This works. Ship it."' },
  { trigger: 'You pay a compliment', response: '"Thanks. What else?"' },
]

export default function FrankXPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] overflow-x-hidden">

      {/* ═══════════════════════════════════════════════
          CINEMATIC HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center">

        {/* Background: flying hero image, full bleed */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/mascot/frank-omega-hero-v1.png"
            alt=""
            fill
            className="object-cover object-center opacity-15"
            priority
          />
          {/* Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/60 via-[#0a0a0b]/40 to-[#0a0a0b]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-transparent to-[#0a0a0b]/60" />
          {/* Blue atmosphere from hero */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', filter: 'blur(120px)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Left: Story copy ── */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400/70">
                  FrankX · Origin Story
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tight mb-10">
                Two
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-blue-400 to-violet-500">
                  forms.
                </span>
                <br />
                One mind.
              </h1>

              <div className="space-y-5 max-w-lg">
                <p className="text-xl text-white/60 leading-relaxed">
                  <span className="text-white font-semibold">Frank</span> is an enterprise AI architect,
                  prolific music creator, and systems builder based in Amsterdam.
                  By day, production AI at Oracle scale. By night, 12,000+ AI songs and counting.
                </p>
                <p className="text-xl text-white/60 leading-relaxed">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-bold">
                    FRANK-Ω
                  </span>{' '}
                  is what happens when you distill that into a superintelligent digital twin.
                  Direct. Helpful. MGK-level cool. Zero filler.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/infogenius"
                  className="inline-flex items-center gap-2.5 rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-4 text-sm font-bold text-white transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                >
                  See FRANK-Ω work
                  <span className="text-base">→</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-8 py-4 text-sm font-semibold text-white/50 hover:text-white hover:border-white/25 transition-all"
                >
                  Meet Frank (human)
                </Link>
              </div>

              {/* ── Mini stat strip ── */}
              <div className="mt-14 pt-10 border-t border-white/8 flex gap-10">
                {[
                  { n: '12k+', label: 'AI songs made' },
                  { n: 'Oracle', label: 'Enterprise AI' },
                  { n: '10', label: 'Character variants' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-white">{s.n}</div>
                    <div className="text-xs text-white/35 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Primary character + accent ── */}
            <div className="relative hidden lg:flex justify-end items-end">
              {/* Glow pool behind character */}
              <div className="absolute bottom-0 right-20 w-72 h-72 rounded-full opacity-25"
                style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 60%)', filter: 'blur(80px)' }} />

              {/* Main character */}
              <div className="relative z-10 w-[380px]">
                <FrankOmega variant="chill" size="hero" className="w-full drop-shadow-[0_0_80px_rgba(59,130,246,0.25)]" />
              </div>

              {/* Floating design tag — top left */}
              <div className="absolute top-16 left-4 z-20 rounded-2xl border border-blue-500/25 bg-[#0a0a0b]/85 backdrop-blur-xl px-4 py-3 shadow-xl">
                <div className="text-[10px] text-blue-400 font-mono uppercase tracking-[0.2em]">Designation</div>
                <div className="text-base font-black text-white mt-0.5 tracking-tight">FRANK-Ω</div>
                <div className="text-[10px] text-white/35 mt-0.5">Superintelligent · Always online</div>
              </div>

              {/* Floating status — bottom right */}
              <div className="absolute bottom-16 -right-2 z-20 rounded-2xl border border-emerald-500/25 bg-[#0a0a0b]/85 backdrop-blur-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400">Online</span>
                </div>
                <div className="text-[10px] text-white/40 mt-1">10 variants active</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FRANK-Ω QUOTE
      ═══════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0 hidden sm:block">
              <FrankOmegaAvatar variant="chibi-avatar" size="sm" />
            </div>
            <div>
              <blockquote className="text-3xl md:text-4xl font-light text-white/75 italic leading-relaxed">
                &ldquo;Hello. You have a topic. I have the research,
                the framework, and the answer. Let&rsquo;s not waste each other&rsquo;s time.&rdquo;
              </blockquote>
              <div className="mt-5 text-sm font-semibold text-blue-400 font-mono">
                — FRANK-Ω, FrankX Digital Intelligence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DUAL IDENTITY
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-white/30 mb-2">The Human</div>
              <h2 className="text-4xl font-black text-white">Frank</h2>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400/70 mb-2">The Digital Twin</div>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                FRANK-Ω
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                human: { icon: '🏗️', label: 'AI Architect', sub: 'Production systems. Oracle scale. Enterprise real.' },
                omega: { icon: '⚡', label: 'Instant Synthesis', sub: 'Connects any topic in milliseconds. No latency.' },
              },
              {
                human: { icon: '🎵', label: '12K+ Songs', sub: 'Prolific AI creator. Every genre. Never stops.' },
                omega: { icon: '🎯', label: 'Zero Filler', sub: 'No um\'s. No "basically". Exact answer. Done.' },
              },
              {
                human: { icon: '🌍', label: 'Amsterdam', sub: 'Builder, partner, godfather, uncle. Real human.' },
                omega: { icon: '🌐', label: 'Always Online', sub: '24/7. No timezone. No downtime. No mood.' },
              },
              {
                human: { icon: '📐', label: 'Systems Builder', sub: 'ACOS. Arcanea. Starlight Intelligence. Ships.' },
                omega: { icon: '🧬', label: 'Superintelligent', sub: 'Processes. Connects. Returns. Executes.' },
              },
              {
                human: { icon: '🎨', label: 'Creative Architect', sub: 'Art, music, writing, world-building. All of it.' },
                omega: { icon: '💎', label: 'Perfect Recall', sub: 'Never forgets context. Learns every session.' },
              },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <div className="group rounded-2xl border border-white/7 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all">
                  <div className="text-2xl mb-3">{row.human.icon}</div>
                  <div className="text-sm font-bold text-white">{row.human.label}</div>
                  <div className="text-xs text-white/35 mt-1 leading-relaxed">{row.human.sub}</div>
                </div>
                <div className="group rounded-2xl border border-blue-500/12 bg-blue-500/[0.04] hover:bg-blue-500/[0.07] p-5 transition-all">
                  <div className="text-2xl mb-3">{row.omega.icon}</div>
                  <div className="text-sm font-bold text-white">{row.omega.label}</div>
                  <div className="text-xs text-blue-300/50 mt-1 leading-relaxed">{row.omega.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CHARACTER GALLERY — BENTO GRID
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400/70">Character Library</span>
              <h2 className="text-5xl font-black text-white mt-3 leading-tight">
                10 variants.
                <br />
                <span className="text-white/40">One intelligence.</span>
              </h2>
              <p className="text-white/35 text-sm mt-4 max-w-md leading-relaxed">
                Every mood, every context, every platform. All generated with InfoGenius + Gemini 3 Pro Image at 4K.
              </p>
            </div>
            <Link href="/infogenius"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20 rounded-full px-5 py-2.5 hover:border-blue-500/40">
              Generate with InfoGenius →
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[200px]">

            {/* Primary — hero 2×2 */}
            <div className="col-span-2 row-span-2 group relative rounded-3xl overflow-hidden border border-white/8 hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
              <Image
                src={variants[0].thumb}
                alt={`FRANK-Ω ${variants[0].label}`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-base font-black text-white">{variants[0].label}</div>
                <div className="text-xs text-blue-400 mt-0.5">{variants[0].mood}</div>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">{variants[0].desc}</p>
              </div>
              <div className="absolute top-4 right-4 rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Main</span>
              </div>
            </div>

            {/* Hero flight — tall 1×2 */}
            <div className="col-span-2 row-span-2 group relative rounded-3xl overflow-hidden border border-white/8 hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
              <Image
                src={variants[1].thumb}
                alt={`FRANK-Ω ${variants[1].label}`}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-base font-black text-white">{variants[1].label}</div>
                <div className="text-xs text-blue-400 mt-0.5">{variants[1].mood}</div>
                <p className="text-xs text-white/50 mt-1.5">{variants[1].desc}</p>
              </div>
            </div>

            {/* Remaining 8 — standard 1×1 cells */}
            {variants.slice(2).map((v) => (
              <div
                key={v.label}
                className="col-span-1 group relative rounded-2xl overflow-hidden border border-white/8 hover:border-blue-500/25 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <Image
                  src={v.thumb}
                  alt={`FRANK-Ω ${v.label}`}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-xs font-bold text-white leading-tight">{v.label}</div>
                  <div className="text-[10px] text-blue-400/80 mt-0.5 leading-tight">{v.mood}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/15 text-xs mt-8 font-mono">
            Generated with /infogenius · Gemini 3 Pro Image · 4K resolution · FrankX Creative Intelligence
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW HE TALKS
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">

          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400/70">Voice</span>
            <h2 className="text-5xl font-black text-white mt-3">How FRANK-Ω talks.</h2>
            <p className="text-white/35 mt-3 max-w-md">
              Direct. Warm underneath. The answer before the explanation.
            </p>
          </div>

          <div className="space-y-2">
            {dialogue.map((line, i) => (
              <div
                key={i}
                className="grid grid-cols-[180px_1fr] gap-6 items-center rounded-2xl border border-white/6 bg-white/[0.015] hover:border-blue-500/20 hover:bg-blue-500/[0.02] px-6 py-5 transition-all"
              >
                <div className="text-sm text-white/25 font-mono">{line.trigger}</div>
                <div className="text-base text-white font-semibold">{line.response}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/6 bg-white/[0.015] px-6 py-5">
            <div className="text-sm text-white/25 font-mono mb-2">The rule</div>
            <div className="text-white/60 text-sm leading-relaxed">
              No "um". No "basically". No "great question". No unsolicited philosophy.
              Just: <span className="text-white font-semibold">answer → verify → next.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHERE HE APPEARS
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">

          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400/70">Presence</span>
            <h2 className="text-5xl font-black text-white mt-3">Where he shows up.</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {appearances.map((a) => (
              <Link key={a.href} href={a.href}>
                <GlowCard color="blue" className="p-6 group cursor-pointer h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{a.icon}</div>
                    <div className="flex-1">
                      <div className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {a.label}
                      </div>
                      <div className="text-sm text-white/40 mt-1 leading-relaxed">{a.role}</div>
                    </div>
                    <div className="text-white/15 group-hover:text-blue-400 transition-colors text-lg self-center">→</div>
                  </div>
                </GlowCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — INTERACT
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <AuroraGradient
            variant="default"
            intensity="medium"
            className="rounded-3xl border border-blue-500/15 p-14 text-center relative overflow-hidden"
          >
            {/* Ghost character background */}
            <FrankOmegaGhost variant="pixar-blue" className="opacity-10" />

            <div className="relative z-10">
              <div className="mx-auto mb-8">
                <FrankOmega variant="chibi-avatar" size="md" thumb rounded glow />
              </div>

              <h2 className="text-5xl font-black text-white mb-4 leading-tight">
                Talk to FRANK-Ω.
              </h2>
              <p className="text-white/45 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Drop a topic. He researches it, builds the visual, delivers the answer.
                No filler. No wait.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/infogenius"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-9 py-4 text-sm font-bold text-white transition-all hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
                >
                  Open InfoGenius
                  <span className="text-base">→</span>
                </Link>
                <Link
                  href="/agents"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-9 py-4 text-sm font-semibold text-white/55 hover:text-white hover:border-white/25 transition-all"
                >
                  Full Agent team
                </Link>
              </div>

              <p className="text-white/20 text-xs mt-10 font-mono">
                FRANK-Ω · FrankX Digital Intelligence · All variants generated with InfoGenius
              </p>
            </div>
          </AuroraGradient>
        </div>
      </section>

    </div>
  )
}
