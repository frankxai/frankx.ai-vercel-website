'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

// ─── Feather Particles ──────────────────────────────────────────────

const feathers = Array.from({ length: 14 }, (_, i) => ({
  left: ((i * 61.8) % 100),
  width: 6 + ((i * 3.7) % 12),
  height: 2 + ((i * 1.2) % 4),
  delay: (i * 2.3) % 18,
  duration: 18 + ((i * 4.1) % 14),
  drift: -40 + ((i * 17.3) % 80),
}))

function FeatherField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {feathers.map((f, i) => (
        <div
          key={i}
          className="feather absolute"
          style={{
            left: `${f.left}%`,
            width: `${f.width}px`,
            height: `${f.height}px`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            ['--drift' as string]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Scroll Progress ────────────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-white/20 z-[100] transition-[width] duration-[50ms] linear"
      style={{ width: `${progress}%` }}
    />
  )
}

// ─── Divider ────────────────────────────────────────────────────────

function PoemDivider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
      <div className="mx-4 text-white/10 text-xs tracking-[0.4em]">&middot;</div>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
    </div>
  )
}

// ─── Share Button ───────────────────────────────────────────────────

function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = 'https://frankx.ai/poems/wings'
    const title = 'Wings — A Poem by FrankX'

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // not available
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/8 text-white/30 text-sm tracking-[0.1em] hover:bg-white/[0.03] hover:border-white/15 hover:text-white/50 transition-all duration-500"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
      {copied ? 'Copied' : 'Share'}
    </button>
  )
}

// ─── The Poem ───────────────────────────────────────────────────────

const stanzas = [
  {
    lines: [
      'You flinched when I reached for you',
      'as though my hands were manacles,',
      'as though every word I spoke',
      'was another lock clicking shut.',
    ],
  },
  {
    lines: [
      'I understand.',
      'Someone before me must have loved you',
      'the wrong way round \u2014',
      'called it shelter while they built the walls.',
      'Called it safety while they hid the door.',
    ],
  },
  {
    lines: [
      'So when I stayed,',
      'you heard a cage assembling.',
      'When I asked, "Where are you going?"',
      'you heard, "You are not allowed to leave."',
      'When I said, "Come home,"',
      'you heard a leash pulled tight.',
    ],
  },
  {
    lines: [
      'But that is not what I was building.',
    ],
  },
  {
    lines: [
      'Every question was a lantern,',
      'not a searchlight.',
      'Every silence was a clearing,',
      'not a trap.',
      'Every time I held on tighter',
      'it was not to keep you still \u2014',
      'it was because the wind was coming',
      'and I wanted you to feel it.',
    ],
  },
  {
    lines: [
      'You thought I wanted your surrender.',
      'I wanted your takeoff.',
    ],
  },
  {
    lines: [
      'You saw the blueprint of a cage.',
      'It was a runway.',
    ],
  },
  {
    lines: [
      'I was not building walls around you.',
      'I was building a floor beneath you \u2014',
      'something solid enough',
      'that you could finally jump',
      'without wondering',
      'whether anyone would catch you',
      'if you fell.',
    ],
  },
  {
    lines: [
      'The arms you called chains?',
      'They were open.',
      'The voice you called control?',
      'It was saying:',
      '',
      'Go.',
      'Go further than you think you can.',
      'I will still be here',
      'when you come back down to earth.',
    ],
  },
  {
    lines: [
      'You thought I wanted to own your sky.',
      'I only wanted to show you',
      'it was yours.',
    ],
  },
  {
    lines: [
      'So fly.',
      '',
      'Fly reckless. Fly afraid.',
      'Fly with trembling hands',
      'and a heart that still believes',
      'the worst is coming.',
      '',
      'I am not the worst.',
      'I am the updraft.',
    ],
  },
  {
    lines: [
      'And if one day you look down',
      'from some height I cannot reach,',
      'and you remember the one',
      'who kept whispering, "Higher" \u2014',
      '',
      'that was me.',
      '',
      'That was always me.',
    ],
  },
]

// ─── Page ───────────────────────────────────────────────────────────

export default function WingsPage() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="bg-[#08080c] min-h-screen text-white">
      <ScrollProgress />
      <FeatherField />

      <AnimatePresence mode="wait">
        {!entered ? (
          /* ─── Entrance ─────────────────────────────────── */
          <motion.section
            key="entrance"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-6"
          >
            {/* Ambient glow */}
            <div className="absolute w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[160px]" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="font-body-serif text-white/20 text-xs tracking-[0.35em] uppercase mb-10"
            >
              A poem
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white/85 tracking-wide"
            >
              Wings
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              className="font-body-serif text-white/20 text-sm italic mt-6"
            >
              by Frank
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              onClick={() => setEntered(true)}
              className="mt-20 px-8 py-3 rounded-full border border-white/8 text-white/30 text-sm tracking-[0.15em] hover:bg-white/[0.04] hover:border-white/15 hover:text-white/50 transition-all duration-700"
            >
              Read
            </motion.button>
          </motion.section>
        ) : (
          /* ─── The Poem ─────────────────────────────────── */
          <motion.div
            key="poem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Title */}
            <section className="relative pt-28 md:pt-40 pb-12 px-6">
              <div className="absolute w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[120px] top-20 left-1/2 -translate-x-1/2" />

              <div className="relative z-10 max-w-xl mx-auto text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="font-body-serif text-white/15 text-xs tracking-[0.35em] uppercase mb-8"
                >
                  A poem by Frank
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="font-display text-4xl md:text-6xl font-light text-white/80 tracking-wide mb-6"
                >
                  Wings
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.2 }}
                  className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mx-auto max-w-[120px] animate-line-pulse"
                />
              </div>
            </section>

            {/* Epigraph */}
            <section className="px-6 pb-16 md:pb-24">
              <ScrollReveal>
                <p className="font-body-serif text-center text-white/25 text-sm md:text-base italic max-w-md mx-auto leading-relaxed">
                  You thought I wanted to chain you down
                  <br />
                  and take your freedom.
                  <br />
                  But all I wanted was to give you wings.
                </p>
              </ScrollReveal>
            </section>

            {/* Stanzas */}
            <section className="px-6 pb-20 md:pb-32">
              <div className="max-w-lg mx-auto space-y-0">
                {stanzas.map((stanza, si) => (
                  <div key={si}>
                    <ScrollReveal delay={0.05}>
                      <div className="py-6 md:py-8">
                        <div className="font-body-serif text-base md:text-lg leading-[1.9] md:leading-[2] text-white/70 space-y-0.5">
                          {stanza.lines.map((line, li) =>
                            line === '' ? (
                              <div key={li} className="h-5 md:h-6" />
                            ) : (
                              <p
                                key={li}
                                className={
                                  /* Single short lines get emphasis */
                                  stanza.lines.length === 1 ||
                                  (stanza.lines.filter((l) => l !== '').length <= 2 && line.length < 40)
                                    ? 'text-white/85 text-lg md:text-xl italic'
                                    : ''
                                }
                              >
                                {line}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Subtle divider between stanzas (not after last) */}
                    {si < stanzas.length - 1 && (
                      <div className="flex justify-center">
                        <div className="h-px w-8 bg-white/[0.06]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Closing */}
            <section className="relative px-6 py-20 md:py-32">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent" />

              <div className="relative z-10 max-w-xl mx-auto text-center">
                <ScrollReveal>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto max-w-[80px] mb-12 animate-line-pulse" />

                  <p className="font-display text-2xl md:text-3xl text-white/30 font-light italic leading-relaxed mb-8">
                    That was always me.
                  </p>

                  <p className="font-body-serif text-white/15 text-xs tracking-[0.2em] mb-12">
                    FrankX &middot; 2026
                  </p>

                  <ShareButton />
                </ScrollReveal>
              </div>
            </section>

            {/* Navigation */}
            <section className="px-6 pb-20">
              <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/valentines-day"
                  className="text-white/20 text-sm hover:text-white/40 transition-colors"
                >
                  &larr; Poems &amp; Passages
                </Link>
                <span className="text-white/8 hidden sm:inline">&middot;</span>
                <Link
                  href="/music/mama"
                  className="text-white/20 text-sm hover:text-white/40 transition-colors"
                >
                  Musik f&uuml;r Mama &rarr;
                </Link>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
