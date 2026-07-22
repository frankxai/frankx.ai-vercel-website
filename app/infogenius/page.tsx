import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { GlowCard } from '@/components/ui/glow-card'

export const metadata: Metadata = {
  title: 'InfoGenius — FRANK-Ω | FrankX.AI',
  description:
    'Meet FRANK-Ω — the superintelligent AI droid that turns raw knowledge into precision visuals. Research-grounded infographic generation powered by FrankX AI.',
  openGraph: {
    title: 'InfoGenius — FRANK-Ω | FrankX.AI',
    description:
      'Superintelligent. Direct. Results in seconds. FRANK-Ω transforms complex topics into cinematic visual knowledge.',
    images: [{ url: '/images/mascot/frank-omega-pixar-blue-v1.png' }],
  },
}

const capabilities = [
  {
    icon: '⚡',
    title: 'Research Grounded',
    body: 'Every visual starts with real-time web research. No hallucinations — just facts rendered beautifully.',
  },
  {
    icon: '🎨',
    title: '8 Visual Styles',
    body: 'From 3D isometric to vintage lithograph to cyberpunk HUD. Match the medium to the message.',
  },
  {
    icon: '🎯',
    title: 'Audience Calibrated',
    body: 'Elementary to expert-level. The complexity adjusts to who\'s actually reading.',
  },
  {
    icon: '📐',
    title: 'Any Aspect Ratio',
    body: 'Blog headers, square posts, vertical stories. One prompt, optimized for every platform.',
  },
  {
    icon: '🧠',
    title: 'Pro Reasoning',
    body: 'Gemini 3 Pro with high-thinking mode. The same model that designed itself.',
  },
  {
    icon: '🔁',
    title: 'Instant Iterations',
    body: '"Make it more technical." "Switch to minimal." Refine in seconds, not hours.',
  },
]

const styles = [
  { label: 'Standard', tag: 'Scientific', color: 'from-blue-500/20 to-cyan-500/20' },
  { label: 'Minimalist', tag: 'Bauhaus', color: 'from-white/10 to-white/5' },
  { label: 'Photorealistic', tag: 'Cinematic', color: 'from-amber-500/20 to-orange-500/20' },
  { label: '3D Isometric', tag: 'Claymorphic', color: 'from-emerald-500/20 to-teal-500/20' },
  { label: 'Technical', tag: 'Blueprint', color: 'from-slate-500/20 to-zinc-500/20' },
  { label: 'Futuristic', tag: 'Cyberpunk HUD', color: 'from-violet-500/20 to-purple-500/20' },
  { label: 'Vintage', tag: '19th Century', color: 'from-yellow-700/20 to-amber-800/20' },
  { label: 'Cartoon', tag: 'Educational', color: 'from-pink-500/20 to-rose-500/20' },
]

const pipeline = [
  {
    step: '01',
    title: 'You name the topic',
    detail: 'Anything. Quantum computing. The fall of Rome. How LLMs work. FRANK-Ω handles the rest.',
  },
  {
    step: '02',
    title: 'Research happens in seconds',
    detail: 'Web-grounded fact extraction. 3–5 key data points that will anchor the visual.',
  },
  {
    step: '03',
    title: 'Prompt constructed with precision',
    detail: 'Style + audience + facts assembled into a cinematic generation prompt. No guessing.',
  },
  {
    step: '04',
    title: 'Image rendered at 4K',
    detail: 'Gemini 3 Pro Image. AAA quality. Ready for blog, social, course, or presentation.',
  },
]

export default function InfoGeniusPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-0 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">

            {/* Left: Copy */}
            <div className="pb-16 lg:pb-24">
              <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300 mb-8">
                InfoGenius · FRANK-Ω
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6">
                Hello.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                  I turn knowledge
                </span>
                <br />
                into visuals.
              </h1>

              <p className="text-xl text-white/50 leading-relaxed mb-10 max-w-lg">
                Give me a topic. I research it, build the prompt, and render a 4K infographic
                in seconds. Research-grounded. Audience-calibrated. No filler.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/lab"
                  className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                >
                  Try InfoGenius
                  <span className="text-base">→</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  See Examples
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 mt-12 pt-12 border-t border-white/8">
                {[
                  { n: '8', label: 'Visual styles' },
                  { n: '4K', label: 'Output quality' },
                  { n: '<60s', label: 'Research to image' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-white">{s.n}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Character */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Glow backdrop */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

              <div className="relative w-[320px] lg:w-[400px]">
                <Image
                  src="/images/mascot/frank-omega-pixar-blue-v1.png"
                  alt="FRANK-Ω — FrankX AI Superintelligent Droid"
                  width={400}
                  height={400}
                  priority
                  className="relative z-10 w-full object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]"
                />

                {/* Floating name badge */}
                <div className="absolute top-8 -left-4 z-20 rounded-2xl border border-violet-500/30 bg-black/70 backdrop-blur-md px-4 py-3">
                  <div className="text-xs text-violet-300 font-mono uppercase tracking-widest">Designation</div>
                  <div className="text-lg font-black text-white mt-0.5">FRANK-Ω</div>
                </div>

                {/* Floating status badge */}
                <div className="absolute top-8 -right-4 z-20 rounded-2xl border border-emerald-500/30 bg-black/70 backdrop-blur-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400">Online</span>
                  </div>
                  <div className="text-xs text-white/50 mt-1">Ready to generate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONALITY QUOTE ── */}
      <section className="py-16 px-6 border-y border-white/6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-start gap-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-violet-500/40 flex-shrink-0 hidden sm:block">
              <Image
                src="/images/mascot/frank-omega-pixar-blue-v1_thumb.jpeg"
                alt="FRANK-Ω"
                width={48}
                height={48}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-left">
              <p className="text-2xl md:text-3xl font-light text-white/80 italic leading-relaxed">
                &ldquo;Hello. You have a topic. I have the research, the prompt, and the pixels.
                Let&rsquo;s not waste each other&rsquo;s time.&rdquo;
              </p>
              <div className="mt-4 text-sm text-violet-400 font-semibold">
                — FRANK-Ω, InfoGenius AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Capabilities
            </span>
            <h2 className="text-4xl font-black text-white mt-3">
              What FRANK-Ω does.
            </h2>
            <p className="text-white/50 mt-3 max-w-xl">
              Six systems running in parallel every time you drop a topic.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <GlowCard key={cap.title} color="violet" className="p-6">
                <div className="text-3xl mb-4">{cap.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{cap.body}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Pipeline
            </span>
            <h2 className="text-4xl font-black text-white mt-3">
              Four steps. One visual.
            </h2>
          </div>

          <div className="space-y-4">
            {pipeline.map((step, i) => (
              <div
                key={step.step}
                className="flex gap-6 items-start rounded-2xl border border-white/8 bg-white/3 p-6 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200"
              >
                <div className="font-mono text-4xl font-black text-violet-500/30 flex-shrink-0 w-14 leading-none">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL STYLES ── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Styles
            </span>
            <h2 className="text-4xl font-black text-white mt-3">
              Eight ways to see it.
            </h2>
            <p className="text-white/50 mt-3 max-w-xl">
              Tell FRANK-Ω the aesthetic. He handles the rest.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {styles.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl bg-gradient-to-br ${s.color} border border-white/8 p-5 hover:border-white/20 transition-all duration-200 cursor-default`}
              >
                <div className="text-sm font-bold text-white">{s.label}</div>
                <div className="text-xs text-white/40 mt-1">{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARACTER VARIANTS ── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Character Library
            </span>
            <h2 className="text-4xl font-black text-white mt-3">
              FRANK-Ω across contexts.
            </h2>
            <p className="text-white/50 mt-3 max-w-xl">
              Same intelligence, different form factors. Use whichever version fits your moment.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                src: '/images/mascot/frank-omega-pixar-blue-v1.png',
                thumb: '/images/mascot/frank-omega-pixar-blue-v1_thumb.jpeg',
                label: 'Blue Eyes · Main',
                tag: 'Primary · Your design',
                bg: 'from-blue-900/40 to-black',
              },
              {
                src: '/images/mascot/frank-omega-pixar-blue-v1.png',
                thumb: '/images/mascot/frank-omega-pixar-blue-v1_thumb.jpeg',
                label: 'Cinematic',
                tag: 'Hero / OG Image',
                bg: 'from-violet-900/40 to-black',
              },
              {
                src: '/images/mascot/frank-omega-chibi-v1.png',
                thumb: '/images/mascot/frank-omega-chibi-v1_thumb.jpeg',
                label: 'Chibi Classic',
                tag: 'Social / Gaming',
                bg: 'from-purple-900/30 to-black',
              },
              {
                src: '/images/mascot/frank-omega-chibi-avatar-v1.png',
                thumb: '/images/mascot/frank-omega-chibi-avatar-v1_thumb.jpeg',
                label: 'Chibi Avatar',
                tag: 'Profile / Icon',
                bg: 'from-indigo-900/30 to-black',
              },
              {
                src: '/images/mascot/frank-omega-pixar-chibi-v1.png',
                thumb: '/images/mascot/frank-omega-pixar-chibi-v1_thumb.jpeg',
                label: 'Pixar 3D',
                tag: 'CTA / Greet',
                bg: 'from-violet-800/20 to-black',
              },
            ].map((v) => (
              <div
                key={v.label}
                className={`group relative rounded-2xl bg-gradient-to-b ${v.bg} border border-white/8 hover:border-violet-500/30 overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
              >
                <div className="aspect-square relative">
                  <Image
                    src={v.thumb}
                    alt={`FRANK-Ω ${v.label}`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-white">{v.label}</div>
                  <div className="text-xs text-violet-400 mt-0.5">{v.tag}</div>
                </div>
                <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/5 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          <p className="text-center text-white/30 text-sm mt-8">
            Generated with InfoGenius · Gemini 3 Pro Image · 4K
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-3xl mx-auto">
          <AuroraGradient
            variant="purple"
            intensity="normal"
            className="rounded-3xl border border-violet-500/20 p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-violet-500/40 mx-auto mb-6">
              <Image
                src="/images/mascot/frank-omega-pixar-blue-v1_thumb.jpeg"
                alt="FRANK-Ω"
                width={80}
                height={80}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              Drop me a topic.
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
              Quantum physics. Roman aqueducts. How your competitors' funnels work.
              FRANK-Ω doesn't care — he just builds it.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
              >
                Start generating
                <span>→</span>
              </Link>
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                Meet the full team
              </Link>
            </div>
          </AuroraGradient>
        </div>
      </section>

    </div>
  )
}
