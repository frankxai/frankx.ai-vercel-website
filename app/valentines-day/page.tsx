'use client'

import { motion } from 'framer-motion'
import { ParticleField } from '@/components/valentines/ParticleField'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'
import { QuoteCard } from '@/components/valentines/QuoteCard'
import { EmailSignup } from '@/components/email-signup'

// ─── Showcase Cards ────────────────────────────────────────────────

const showcaseCards = [
  {
    title: 'AI Love Letters',
    description:
      'Personalized poetry that weaves your story with Rumi-level wisdom. Not generated slop — curated, refined, beautiful.',
    gradient: 'from-rose-500/20 to-violet-500/20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: 'Digital Memory Gardens',
    description:
      'Interactive timelines of your relationship milestones. Every moment preserved in a living digital garden.',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Generative Art Portraits',
    description:
      'AI-generated artwork inspired by your love story. Abstract, beautiful, and entirely unique to your relationship.',
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: 'Consciousness Playlists',
    description:
      'Curated soundscapes for love states — from first-date energy to deep companionship. AI-composed, human-felt.',
    gradient: 'from-amber-500/20 to-rose-500/20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
]

// ─── Love Architecture Framework ───────────────────────────────────

const architecturePrinciples = [
  { label: 'Resilient', desc: 'They handle failure gracefully' },
  { label: 'Scalable', desc: 'They grow without breaking' },
  { label: 'Observable', desc: 'You can see what\'s happening inside' },
  { label: 'Eventually Consistent', desc: 'Not always perfect, but always converging' },
]

// ─── Component ─────────────────────────────────────────────────────

export default function ValentinesDayPage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      {/* ─── Hero Section ────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <ParticleField variant="rose-gold" />

        {/* Ambient glow */}
        <div className="absolute w-[500px] h-[500px] bg-rose-500/[0.04] rounded-full blur-[150px] top-1/4" />
        <div className="absolute w-[300px] h-[300px] bg-violet-500/[0.03] rounded-full blur-[100px] bottom-1/4 left-1/4" />

        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-rose-300/50 text-sm tracking-[0.3em] uppercase mb-6"
          >
            February 14, 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mb-6 leading-tight"
          >
            Love, Engineered
            <br />
            <span className="valentine-gradient-text">with Soul</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-body-serif text-lg md:text-xl text-white/50 italic max-w-xl mx-auto"
          >
            An AI Architect&apos;s approach to the most human thing: love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12"
          >
            <svg
              className="w-6 h-6 mx-auto text-white/20 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ─── Philosophy Section ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0e] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <QuoteCard
              quote="The minute I heard my first love story, I started looking for you, not knowing how blind that was. Lovers don't finally meet somewhere. They're in each other all along."
              author="Rumi"
              variant="large"
              accentColor="rose"
              className="mb-12"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="font-body-serif text-base md:text-lg text-white/50 leading-relaxed space-y-4">
              <p>
                The best technology doesn&apos;t replace what makes us human — it amplifies it.
                AI can compose music, generate art, and write poetry.
                But it takes taste, intention, and emotional intelligence to make those tools serve love.
              </p>
              <p>
                This is what happens when an architect stops building systems for a moment
                and builds something for the heart instead.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── The Love Architecture Framework ─────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0c10] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/80 text-center mb-4 font-light">
              The Love Architecture Framework
            </h2>
            <p className="text-center text-white/30 text-sm mb-12 tracking-wide">by Frank Riemer</p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <p className="font-body-serif text-white/60 mb-6 italic">
                In system design, the best architectures are:
              </p>

              <div className="space-y-3 mb-8">
                {architecturePrinciples.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-rose-400/60 mt-1 font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="text-white/80 font-medium">{p.label}</span>
                      <span className="text-white/40"> — {p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-6 space-y-4 font-body-serif text-white/50 italic leading-relaxed">
                <p>The same is true for love.</p>
                <p>
                  A relationship is a distributed system
                  running on two independent nodes
                  that chose to synchronize their state.
                </p>
                <p>
                  There is no master node.
                  There is no single source of truth.
                  There is only the protocol:
                  <span className="text-rose-300/70"> show up, be honest, repair fast.</span>
                </p>
                <p>
                  The uptime that matters isn&apos;t 99.99%.
                  <br />
                  It&apos;s being present at 2 AM
                  <br />
                  when the other node is down.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Experience Showcase ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a10] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/80 text-center mb-4 font-light">
              The Experience
            </h2>
            <p className="text-center text-white/40 text-sm mb-12 max-w-md mx-auto">
              What becomes possible when you combine AI intelligence with emotional depth.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showcaseCards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500">
                  {/* Hover glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl`}
                  />

                  <div className="text-rose-300/50 mb-4">{card.icon}</div>
                  <h3 className="font-display text-xl text-white/85 mb-3 font-medium">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Create Your Own ─────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0e] to-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-500/[0.04] rounded-full blur-[120px]" />

        <div className="relative z-20 max-w-md mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl text-white/80 mb-4 font-light">
              Build Your Own
            </h2>
            <p className="text-white/40 text-sm mb-10">
              Get notified when the AI Love Experience toolkit launches.
              Beautiful templates. Intelligent tools. Real emotion.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <EmailSignup
              listType="newsletter"
              placeholder="Your email"
              buttonText="Notify Me"
              compact
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Footer Quote ────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-24">
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        <div className="relative z-20 max-w-lg mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif italic text-xl md:text-2xl text-white/35 leading-relaxed">
              &ldquo;Out beyond ideas of wrongdoing and rightdoing,
              there is a field. I&apos;ll meet you there.&rdquo;
            </p>
            <p className="text-sm text-rose-300/30 mt-4">— Rumi</p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 pt-8 border-t border-white/[0.04]">
              <p className="text-xs text-white/20 tracking-wide">
                Built with love, intelligence, and a midnight creative session.
              </p>
              <p className="text-xs text-white/15 mt-1">
                FrankX.ai — Build What Matters.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
