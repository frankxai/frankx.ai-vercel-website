'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CherryBlossoms } from '@/components/valentines/CherryBlossoms'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'
import { QuoteCard } from '@/components/valentines/QuoteCard'
import { FloatingOrb } from '@/components/valentines/FloatingOrb'
import { HiddenHeart } from '@/components/valentines/HiddenHeart'

// ─── Data ──────────────────────────────────────────────────────────

const rumiQuotes = [
  {
    quote:
      'Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.',
    accent: 'rose' as const,
  },
  {
    quote:
      'In your light I learn how to love. In your beauty, how to make poems. You dance inside my chest where no-one sees you, but sometimes I do, and that sight becomes this art.',
    accent: 'gold' as const,
  },
  {
    quote: "Lovers don't finally meet somewhere. They're in each other all along.",
    accent: 'violet' as const,
  },
  {
    quote:
      'A heart filled with love is like a phoenix that no cage can imprison.',
    accent: 'teal' as const,
  },
  {
    quote:
      'This is how I would die into the love I have for you: As pieces of cloud dissolve in sunlight.',
    accent: 'rose' as const,
  },
  {
    quote:
      'Goodbyes are only for those who love with their eyes. Because for those who love with heart and soul, there is no such thing as separation.',
    accent: 'gold' as const,
  },
  {
    quote:
      'Through Love all that is bitter will be sweet, Through Love all that is copper will be gold, Through Love all dregs will turn to purest wine, Through Love all pain will turn to medicine.',
    accent: 'violet' as const,
  },
]

const wisdomQuotes = [
  {
    quote:
      'Love one another, but make not a bond of love. Let it rather be a moving sea between the shores of your souls.',
    author: 'Kahlil Gibran',
    source: 'The Prophet',
    accent: 'gold' as const,
  },
  {
    quote:
      'One is loved because one is loved. No reason is needed for loving.',
    author: 'Paulo Coelho',
    source: 'The Alchemist',
    accent: 'rose' as const,
  },
  {
    quote:
      'It is only with the heart that one can see rightly; what is essential is invisible to the eye.',
    author: 'Antoine de Saint-Exupery',
    source: 'The Little Prince',
    accent: 'violet' as const,
  },
  {
    quote:
      'You must love in such a way that the person you love feels free.',
    author: 'Thich Nhat Hanh',
    accent: 'teal' as const,
  },
  {
    quote:
      'Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.',
    author: 'Lao Tzu',
    source: 'Tao Te Ching',
    accent: 'gold' as const,
  },
  {
    quote:
      'True love has no opposite, because it arises from beyond the mind.',
    author: 'Eckhart Tolle',
    source: 'The Power of Now',
    accent: 'rose' as const,
  },
  {
    quote:
      "If you love a flower, don't pick it up. Because if you pick it up it dies and ceases to be what you love. So if you love a flower, let it be. Love is not about possession. Love is about appreciation.",
    author: 'Osho',
    accent: 'violet' as const,
  },
]

const universeCards = [
  {
    title: 'Amsterdam',
    description: 'We built our world where the city meets the water.',
    glow: 'teal' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Eight Years',
    description: "Time didn't pass. It deepened.",
    glow: 'rose' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Two Cultures',
    description: 'German discipline meets Vietnamese grace.',
    glow: 'gold' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: 'One Home',
    description: 'IJburg, where the sunrise finds us.',
    glow: 'violet' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
]

// ─── Component ──────────────────────────────────────────────────────

export default function TienPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      {/* ─── Envelope Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            {/* Ambient glows */}
            <div className="absolute w-72 h-72 bg-rose-500/[0.06] rounded-full blur-[100px]" />
            <div className="absolute w-56 h-56 bg-violet-500/[0.04] rounded-full blur-[80px] translate-x-24 translate-y-16" />
            <div className="absolute w-40 h-40 bg-amber-500/[0.03] rounded-full blur-[60px] -translate-x-20 -translate-y-12" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="relative z-10 text-center"
            >
              <p className="font-cursive text-5xl md:text-7xl text-rose-200/80 mb-10">
                For Tien
              </p>

              <motion.button
                onClick={() => setIsOpen(true)}
                className="px-10 py-3.5 rounded-full border border-rose-400/20 text-rose-200/60 text-sm tracking-[0.2em] uppercase hover:bg-rose-500/[0.08] hover:border-rose-400/30 transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(244, 114, 182, 0.05)',
                    '0 0 40px rgba(244, 114, 182, 0.12)',
                    '0 0 20px rgba(244, 114, 182, 0.05)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity },
                }}
              >
                Open
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 text-white/15 text-xs tracking-[0.3em] uppercase"
            >
              Valentine&apos;s Day, 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Letter Content ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className={isOpen ? '' : 'pointer-events-none h-0 overflow-hidden'}
      >
        {/* Cherry Blossoms — only render after opening */}
        {isOpen && <CherryBlossoms intensity="light" />}

        {/* ─── Section 1: Opening Words ───────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
          {/* Warm ambient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0e] to-[#0a0a0f]" />

          <div className="relative z-20 max-w-2xl mx-auto text-center">
            <ScrollReveal delay={0.3}>
              <QuoteCard
                quote="I closed my mouth and spoke to you in a hundred silent ways."
                author="Rumi"
                variant="large"
                accentColor="rose"
                className="mb-16"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="space-y-6 font-body-serif text-lg md:text-xl text-white/70 leading-relaxed italic text-left">
                <p>Tien,</p>
                <p>
                  Eight years of learning what love actually means.
                  Not the fireworks kind — the kind that stays.
                  The kind that makes coffee when the other one forgets to sleep.
                  The kind that builds a life, quietly, persistently,
                  in a city made of water.
                </p>
                <p>
                  You are the most consistent force in my life.
                  Not loud, not dramatic — just there.
                  Every morning. Steady as the tide in IJburg.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Section 2: What I See When I See You ───────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a10] to-[#0a0a0f]" />

          <div className="relative z-20 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
                What I See When I See You
              </h2>
            </ScrollReveal>

            <div className="space-y-10">
              {rumiQuotes.map((q, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <QuoteCard
                    quote={q.quote}
                    author="Rumi"
                    accentColor={q.accent}
                    variant={i === 1 ? 'large' : 'default'}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Our Universe ────────────────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0c10] to-[#0a0a0f]" />

          <div className="relative z-20 max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
                Our Universe
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universeCards.map((card, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <FloatingOrb
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    glowColor={card.glow}
                    delay={i * 1.5}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Wisdom from the Masters ─────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0d] to-[#0a0a0f]" />

          <div className="relative z-20 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
                Wisdom from the Masters
              </h2>
            </ScrollReveal>

            <div className="space-y-8">
              {wisdomQuotes.map((q, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <QuoteCard
                    quote={q.quote}
                    author={q.author}
                    source={q.source}
                    accentColor={q.accent}
                    variant="wisdom"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 5: A Poem for You ──────────────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a0e] to-[#0a0a0f]" />

          {/* Ambient glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/[0.04] rounded-full blur-[120px]" />

          <div className="relative z-20 max-w-xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
                A Poem for You
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="font-body-serif text-lg md:text-xl text-white/70 leading-[2] space-y-8 italic">
                <div>
                  <p>Before the algorithms, before the architecture,</p>
                  <p>before I learned to build systems that think —</p>
                  <p>there was a simpler equation.</p>
                </div>

                <div>
                  <p>You, walking through the door.</p>
                  <p className="text-rose-300/60">Everything else, solved.</p>
                </div>

                <div>
                  <p>Eight years.</p>
                  <p>Not the years of fireworks and grand gestures,</p>
                  <p>but the years of quiet mornings in IJburg,</p>
                  <p>of your coffee appearing when I forget to sleep,</p>
                  <p>of building something that has no deploy button,</p>
                  <p>no version control — just the slow, brave choice</p>
                  <p>to stay.</p>
                </div>

                <div>
                  <p>They say love is patient.</p>
                  <p>I say love is you, waiting for me</p>
                  <p>to finish one more line of code,</p>
                  <p>then gently closing the laptop.</p>
                </div>

                <div>
                  <p>The mystics wrote about a field</p>
                  <p>beyond right and wrong.</p>
                  <p>Rumi said he&apos;d meet us there.</p>
                </div>

                <div>
                  <p>I think it&apos;s our kitchen.</p>
                  <p>Around midnight.</p>
                  <p>When the city is quiet</p>
                  <p>and the water outside catches the moon.</p>
                </div>

                <div>
                  <p className="text-rose-300/60">That field.</p>
                  <p className="text-rose-300/60">Every morning.</p>
                  <p className="text-rose-300/60">Still.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Section 6: The Promise ─────────────────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0d] to-[#0a0a0f]" />
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-80 h-80 bg-amber-500/[0.03] rounded-full blur-[100px]" />

          <div className="relative z-20 max-w-xl mx-auto text-center">
            <ScrollReveal>
              <div className="font-body-serif text-lg md:text-xl text-white/60 leading-relaxed italic space-y-6">
                <p>
                  I don&apos;t have roses that last a week.
                </p>
                <p>
                  I have this — a page that lives as long as the internet does.
                  Built with the same tools I use to build everything else,
                  but aimed at the only thing that actually matters.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-16 space-y-2">
                <p className="font-cursive text-3xl md:text-4xl text-rose-200/70">
                  With love, Frank
                </p>
                <p className="text-sm text-white/25 tracking-[0.2em] uppercase mt-4">
                  Valentine&apos;s Day, 2026 — Amsterdam
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Closing Quote ──────────────────────────────────── */}
        <section className="relative px-6 py-20">
          <div className="absolute inset-0 bg-[#0a0a0f]" />
          <div className="relative z-20 max-w-lg mx-auto text-center">
            <ScrollReveal>
              <p className="font-serif italic text-xl md:text-2xl text-white/40 leading-relaxed">
                &ldquo;Love is the whole thing. We are only pieces.&rdquo;
              </p>
              <p className="text-sm text-rose-300/30 mt-4">— Rumi</p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Hidden Heart Easter Egg ────────────────────────── */}
        <section className="relative bg-[#0a0a0f]">
          <HiddenHeart />
        </section>
      </motion.div>
    </div>
  )
}
