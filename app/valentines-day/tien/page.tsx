'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CherryBlossoms } from '@/components/valentines/CherryBlossoms'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'
import { QuoteCard } from '@/components/valentines/QuoteCard'
import { FloatingOrb } from '@/components/valentines/FloatingOrb'
import { HiddenHeart } from '@/components/valentines/HiddenHeart'
import Link from 'next/link'

// ─── Visual Divider ────────────────────────────────────────────────

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-56 md:h-80 lg:h-96 overflow-hidden" aria-hidden="true">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-40 scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/30 via-transparent to-[#0a0a0f]/30" />
    </div>
  )
}

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

const germanPoems = [
  {
    title: 'Was es ist',
    author: 'Erich Fried',
    lines: [
      ['Es ist Unsinn', 'sagt die Vernunft'],
      ['Es ist was es ist', 'sagt die Liebe'],
      [''],
      ['Es ist Unglück', 'sagt die Berechnung'],
      ['Es ist nichts als Schmerz', 'sagt die Angst'],
      ['Es ist aussichtslos', 'sagt die Einsicht'],
      ['Es ist was es ist', 'sagt die Liebe'],
      [''],
      ['Es ist lächerlich', 'sagt der Stolz'],
      ['Es ist leichtsinnig', 'sagt die Vorsicht'],
      ['Es ist unmöglich', 'sagt die Erfahrung'],
      ['Es ist was es ist', 'sagt die Liebe'],
    ],
    translation:
      'It is what it is, says Love.',
    accent: 'rose' as const,
  },
  {
    title: 'Nähe des Geliebten',
    author: 'Johann Wolfgang von Goethe',
    lines: [
      ['Ich denke dein, wenn mir der Sonne Schimmer', 'vom Meere strahlt;'],
      ['Ich denke dein, wenn sich des Mondes Flimmer', 'in Quellen malt.'],
      [''],
      ['Ich sehe dich, wenn auf dem fernen Wege', 'der Staub sich hebt;'],
      ['In tiefer Nacht, wenn auf dem schmalen Stege', 'der Wandrer bebt.'],
      [''],
      ['Ich bin bei dir, du seist auch noch so ferne,', 'du bist mir nah!'],
      ['Die Sonne sinkt, bald leuchten mir die Sterne.', 'O wärst du da!'],
    ],
    translation:
      'I think of you when the sun shimmers from the sea. I think of you when the moon glimmers in the springs. I am with you, however far away you are — you are near to me.',
    accent: 'gold' as const,
  },
  {
    title: 'Liebes-Lied',
    author: 'Rainer Maria Rilke',
    lines: [
      ['Wie soll ich meine Seele halten, dass'],
      ['sie nicht an deine rührt? Wie soll ich sie'],
      ['hinheben über dich zu andern Dingen?'],
      [''],
      ['Ach gerne möcht ich sie bei irgendwas'],
      ['Verlorenem im Dunkel unterbringen'],
      ['an einer fremden stillen Stelle, die'],
      ['nicht weiterschwingt, wenn deine Tiefen schwingen.'],
    ],
    translation:
      'How shall I hold my soul so that it does not touch yours? How shall I lift it over you to other things? I would so much like to place it among lost things in the dark, in some quiet, unknown place that does not vibrate when your depths vibrate.',
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
      "If you love a flower, let it be. Love is about appreciation.",
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
    description: 'Time deepened. And so did we.',
    glow: 'rose' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Two Cultures',
    description: 'German soul meets Vietnamese grace. Both whole. Both beautiful.',
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

const vietnamesePoems = [
  {
    title: 'Yêu',
    author: 'Xuân Diệu',
    lines: [
      ['Yêu là chết ở trong lòng một ít'],
      ['Vì mấy khi yêu mà chắc được yêu'],
      ['Cho rất nhiều song nhận chẳng bao nhiêu'],
      ['Người ta phụ hoặc thờ ơ chẳng biết.'],
      [''],
      ['Nhưng mà yêu! Yêu vẫn cứ là yêu!'],
      ['Như sóng nước vỗ hoài trên ghềnh đá,'],
      ['Vẫn thương yêu cho đến phút cuối cùng.'],
    ],
    translation:
      'To love is to die a little inside, for how often can we be certain our love is returned? We give so much, yet receive so little. But to love! To love is still to love! Like waves crashing endlessly upon the shore — we love until the very last moment.',
    accent: 'teal' as const,
  },
  {
    title: 'Tương Tư',
    author: 'Nguyễn Bính',
    lines: [
      ['Thôn Đoài ngồi nhớ thôn Đông,'],
      ['Một người chín nhớ mười mong một người.'],
      ['Gió mưa là bệnh của giời,'],
      ['Tương tư là bệnh của tôi yêu nàng.'],
    ],
    translation:
      'From the western village, I sit longing for the eastern one. One heart aches with every kind of yearning for another. Rain and wind are the ailments of the sky. Longing is the ailment of my love for you.',
    accent: 'rose' as const,
  },
  {
    title: 'Đợi Anh Về',
    author: 'Hữu Loan',
    lines: [
      ['Em ơi đợi anh về'],
      ['Đợi anh hoài em nhé'],
      ['Mưa rơi phố đầy'],
      ['Em ơi em đợi'],
      ['Tình đầu như trăng soi'],
      ['Yêu em mãi mãi thôi.'],
    ],
    translation:
      'My love, wait for me to return. Wait for me always, my dear. The rain fills the streets. My love, please wait. First love shines like moonlight. I love you forever and always.',
    accent: 'gold' as const,
  },
]

const timelineMoments = [
  { year: '2018', label: 'The Beginning', detail: 'Two worlds collided' },
  { year: '2019', label: 'Growing Roots', detail: 'Learning each other\'s languages — of love, of silence, of laughter' },
  { year: '2020', label: 'The Crucible', detail: 'When the world stopped, we held on tighter' },
  { year: '2021', label: 'Amsterdam', detail: 'A city of water became our home' },
  { year: '2022', label: 'Building', detail: 'Dreams became blueprints became rooms we lived in' },
  { year: '2023', label: 'IJburg', detail: 'Where the sunrise finds us every morning' },
  { year: '2024', label: 'Deepening', detail: 'The kind of knowing that only years can give' },
  { year: '2025', label: 'Together', detail: 'Still choosing. Still growing. Still us.' },
  { year: '2026', label: 'This Moment', detail: 'Every year, more sure than the last' },
]

// ─── Scroll Progress ────────────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

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
            <div className="absolute w-72 h-72 bg-rose-500/[0.06] rounded-full blur-[128px]" />
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
        {isOpen && <ScrollProgress />}
        {isOpen && <CherryBlossoms intensity="light" />}

        {/* ─── Section 1: Opening Words ───────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
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
                  Eight years of discovering what love truly means.
                  You are every kind of fireworks —
                  the ones that light up the sky,
                  and the ones that glow softly
                  long after everyone else has gone home.
                </p>
                <p>
                  You are the one who makes coffee
                  exactly when I need it.
                  The one who builds a life, beautifully, persistently,
                  in a city made of water.
                </p>
                <p>
                  You are the most extraordinary force in my life.
                  Present as the sunrise. Steady as the tide.
                  Every morning. Always. IJburg.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Visual: Love Energy ─────────────────────────────── */}
        <SectionImage src="/images/valentines/love-fireworks.png" alt="" />

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

        {/* ── Visual: Cherry Blossoms ─────────────────────────── */}
        <SectionImage src="/images/valentines/cherry-blossom.png" alt="" />

        {/* ─── Section 3: Dichter der Liebe — German Poetry ───── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0e0a0d] to-[#0a0a0f]" />

          <div className="relative z-20 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
                Dichter der Liebe
              </h2>
              <p className="text-center text-white/20 text-sm mb-16 italic">Poets of Love</p>
            </ScrollReveal>

            <div className="space-y-14">
              {germanPoems.map((poem, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="relative p-8 md:p-10 rounded-2xl backdrop-blur-sm border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] animate-breathe">
                    {/* Title */}
                    <p className="font-display text-lg md:text-xl text-white/60 mb-1 font-light italic">
                      {poem.title}
                    </p>
                    <p className="text-xs text-white/30 tracking-wide mb-6">{poem.author}</p>

                    {/* German text */}
                    <div className="font-serif italic text-base md:text-lg text-white/80 leading-[1.9] mb-6">
                      {poem.lines.map((line, j) => (
                        <p key={j} className={line[0] === '' ? 'h-4' : ''}>
                          {line[0]}
                          {line[1] && <span className="text-white/50"> {line[1]}</span>}
                        </p>
                      ))}
                    </div>

                    {/* English translation */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      <p className="text-sm text-white/30 italic leading-relaxed">
                        {poem.translation}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Visual: German Romantic Garden ───────────────────── */}
        <SectionImage src="/images/valentines/german-poetry.png" alt="" />

        {/* ─── Section 3b: Nhà Thơ Tình Yêu — Vietnamese Poetry ── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0d0e] to-[#0a0a0f]" />

          <div className="relative z-20 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
                Nhà Thơ Tình Yêu
              </h2>
              <p className="text-center text-white/20 text-sm mb-16 italic">Poets of Love — for your Vietnamese heart</p>
            </ScrollReveal>

            <div className="space-y-14">
              {vietnamesePoems.map((poem, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="relative p-8 md:p-10 rounded-2xl backdrop-blur-sm border border-white/5 bg-gradient-to-br from-teal-500/[0.02] to-amber-500/[0.01] animate-breathe">
                    <p className="font-display text-lg md:text-xl text-white/60 mb-1 font-light italic">
                      {poem.title}
                    </p>
                    <p className="text-xs text-white/30 tracking-wide mb-6">{poem.author}</p>

                    <div className="font-serif italic text-base md:text-lg text-white/80 leading-[1.9] mb-6">
                      {poem.lines.map((line, j) => (
                        <p key={j} className={line[0] === '' ? 'h-4' : ''}>
                          {line[0]}
                        </p>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/[0.06]">
                      <p className="text-sm text-white/30 italic leading-relaxed">
                        {poem.translation}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Visual: Vietnamese Lanterns on Amsterdam Canal ──── */}
        <SectionImage src="/images/valentines/vietnamese-love.png" alt="" />

        {/* ─── Section 4: Our Universe ────────────────────────── */}
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

        {/* ─── Section 4b: Our Timeline ────────────────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0f] to-[#0a0a0f]" />

          <div className="relative z-20 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
                Our Story in Time
              </h2>
            </ScrollReveal>

            <div className="relative">
              <div className="timeline-line" />

              <div className="space-y-12 md:space-y-16">
                {timelineMoments.map((moment, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className={`relative flex items-start gap-6 md:gap-10 ${
                      i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                      {/* Mobile: always left-aligned */}
                      <div className="flex-shrink-0 relative z-10 pl-[12px] md:pl-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                        <div className="timeline-dot" />
                      </div>

                      <div className={`flex-1 pl-6 md:pl-0 ${
                        i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                      }`}>
                        <p className="font-mono text-xs text-rose-400/40 tracking-wider mb-1">{moment.year}</p>
                        <p className="font-display text-lg text-white/70 font-light">{moment.label}</p>
                        <p className="text-sm text-white/35 mt-1 italic">{moment.detail}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Visual: Cultures United — Vietnamese Lanterns on Amsterdam Canal ── */}
        <SectionImage src="/images/valentines/cultures-united.png" alt="" />

        {/* ─── Section 5: Wisdom from the Masters ─────────────── */}
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

        {/* ── Visual: Two Souls Merging ────────────────────────── */}
        <SectionImage src="/images/valentines/two-souls.png" alt="" />

        {/* ─── Section 6: The Art of Loving ───────────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0e] to-[#0a0a0f]" />
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-80 h-80 bg-amber-500/[0.02] rounded-full blur-[128px]" />

          <div className="relative z-20 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
                The Art of Loving
              </h2>
              <p className="text-center text-white/20 text-sm mb-16 italic">Die Kunst des Liebens</p>
            </ScrollReveal>

            {/* Erich Fromm */}
            <ScrollReveal delay={0.2}>
              <div className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm mb-10">
                <p className="font-body-serif text-base md:text-lg text-white/60 leading-relaxed italic mb-6">
                  &ldquo;Love is an activity, a standing in — a giving, a creating.
                  To love someone means to care, to take responsibility,
                  to respect, and to know that person deeply.
                  It is the active concern for the life and growth
                  of that which we love.&rdquo;
                </p>
                <p className="text-sm text-amber-300/50">
                  Erich Fromm <span className="text-white/25">— The Art of Loving, 1956</span>
                </p>
              </div>
            </ScrollReveal>

            {/* Personal Essay */}
            <ScrollReveal delay={0.4}>
              <div className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                <p className="font-display text-lg text-white/50 mb-4 italic font-light">What Eight Years Teach</p>
                <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-4">
                  <p>
                    Eight years is long enough to see someone completely.
                    Every strength, every habit, every tender place.
                    And it is exactly long enough to understand
                    that love is choosing someone —
                    wholly, with full knowledge of who they are —
                    and saying: <span className="text-rose-300/60">yes. Again. Every morning. Yes.</span>
                  </p>
                  <p>
                    The greatest love stories are written
                    in ordinary mornings.
                    In the coffee that appears. In the hand that reaches.
                    In the quiet way two people learn
                    to be a home for each other.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Visual: Lotus Bloom ──────────────────────────────── */}
        <SectionImage src="/images/valentines/lotus-bloom.png" alt="" />

        {/* ─── Section 7: A Poem for You ──────────────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a0e] to-[#0a0a0f]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/[0.04] rounded-full blur-[128px]" />

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
                  <p>Eight years of mornings in IJburg,</p>
                  <p>of your coffee arriving exactly when I need it,</p>
                  <p>of your laughter filling every room,</p>
                  <p>of building something by hand, by heart,</p>
                  <p>by the slow, brave choice</p>
                  <p>to stay and grow together.</p>
                </div>

                <div>
                  <p>They say love is patient.</p>
                  <p>I say love is you —</p>
                  <p>the way you wait for me</p>
                  <p>to finish one more line of code,</p>
                  <p>then gently close the laptop</p>
                  <p>and take my hand.</p>
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
                  <p className="text-rose-300/60">Still yours.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Visual: Amsterdam Water ──────────────────────────── */}
        <SectionImage src="/images/valentines/amsterdam-water.png" alt="" />

        {/* ─── Section 8: The Promise ─────────────────────────── */}
        <section className="relative px-6 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0d] to-[#0a0a0f]" />
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-80 h-80 bg-amber-500/[0.03] rounded-full blur-[128px]" />

          <div className="relative z-20 max-w-xl mx-auto text-center">
            <ScrollReveal>
              <div className="font-body-serif text-lg md:text-xl text-white/60 leading-relaxed italic space-y-6">
                <p>
                  I have something better than roses that last a week.
                </p>
                <p>
                  I have this — a page that lives as long as the internet does.
                  Built with the same tools I use to build everything else,
                  aimed at the only thing that truly matters.
                </p>
                <p>
                  You. Us. This life we chose.
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

        {/* ─── Piano Link ────────────────────────────────────── */}
        <section className="relative px-6 py-12 bg-[#0a0a0f]">
          <div className="relative z-20 text-center">
            <ScrollReveal>
              <Link
                href="/valentines-day/tien/piano"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-rose-400/15 text-rose-200/40 text-sm tracking-[0.15em] hover:bg-rose-500/[0.06] hover:border-rose-400/25 hover:text-rose-200/60 transition-all duration-500"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
                Play Piano
              </Link>
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
