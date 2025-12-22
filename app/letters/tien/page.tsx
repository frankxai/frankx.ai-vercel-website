'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

// Decorative floral SVG component
function FloralAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10C50 10 60 30 50 50C40 30 50 10 50 10Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M50 10C50 10 70 25 50 50C30 25 50 10 50 10Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <circle cx="50" cy="50" r="5" fill="currentColor" fillOpacity="0.3" />
      <path
        d="M30 40C30 40 45 50 50 50C45 50 30 60 30 60"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M70 40C70 40 55 50 50 50C55 50 70 60 70 60"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}

function FloatingPetal({ delay = 0, startX = 50 }: { delay?: number; startX?: number }) {
  return (
    <motion.div
      className="absolute w-3 h-3"
      style={{ left: `${startX}%`, top: '-5%' }}
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ['0vh', '105vh'],
        rotate: [0, 360, 720],
        opacity: [0, 0.6, 0.6, 0],
        x: [0, 30, -20, 40, 0],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      <div
        className="w-full h-full rounded-full bg-gradient-to-br from-rose-400/40 to-pink-300/30"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
      />
    </motion.div>
  )
}

function QuoteCard({
  quote,
  author,
  accentColor = 'rose',
}: {
  quote: string
  author: string
  accentColor?: 'rose' | 'violet' | 'amber' | 'emerald'
}) {
  const colors = {
    rose: 'from-rose-500/20 to-pink-500/10 border-rose-500/30',
    violet: 'from-violet-500/20 to-purple-500/10 border-violet-500/30',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
  }

  return (
    <motion.div
      className={`relative p-8 rounded-2xl bg-gradient-to-br ${colors[accentColor]} border backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <FloralAccent className="absolute top-4 right-4 w-12 h-12 text-white/20" />
      <p className="text-lg md:text-xl text-white/90 italic leading-relaxed mb-4">
        "{quote}"
      </p>
      <p className="text-sm text-slate-400">&mdash; {author}</p>
    </motion.div>
  )
}

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.section
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  )
}

export default function TienLetterPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated floral background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <FloatingPetal key={i} delay={i * 1.5} startX={10 + (i * 7)} />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-rose-600/8 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[120px]" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Decorative top element */}
            <FloralAccent className="w-24 h-24 mx-auto text-rose-400/40 mb-8" />

            <motion.p
              className="text-rose-400/80 text-sm tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              A Letter of Love
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white/95 mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              For Tien
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-rose-200/60 font-light max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Words cannot capture everything you mean to me,
              <br className="hidden md:block" />
              but here is my attempt.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="w-6 h-10 mx-auto border-2 border-rose-400/30 rounded-full p-1"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1.5 h-2.5 bg-rose-400/50 rounded-full mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 pb-32">
        {/* Opening Poem - Original Composition */}
        <Section className="py-16">
          <div className="text-center mb-12">
            <FloralAccent className="w-16 h-16 mx-auto text-rose-400/30 mb-4" />
            <h2 className="text-sm tracking-[0.2em] uppercase text-rose-400/60">
              A Poem for You
            </h2>
          </div>

          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-6 text-xl md:text-2xl text-white/85 font-light leading-relaxed italic">
              <p>In canals of Amsterdam light,</p>
              <p>Your laughter paints the water bright.</p>
              <p>Together we wander, hand in hand,</p>
              <p>Through art and music, sea and sand.</p>
              <p>&nbsp;</p>
              <p>You bring warmth to morning coffee,</p>
              <p>Care in moments small and softly.</p>
              <p>When chaos calls and worlds spin fast,</p>
              <p>Your love becomes my anchored mast.</p>
              <p>&nbsp;</p>
              <p>From concert halls to quiet nights,</p>
              <p>From museum halls to city lights,</p>
              <p>Each adventure etched in time,</p>
              <p>Every moment, yours and mine.</p>
              <p>&nbsp;</p>
              <p>So here's my heart in written word,</p>
              <p>A love song without being heard.</p>
              <p>For all you do and all you are,</p>
              <p>My constant, my guiding star.</p>
            </div>
            <p className="mt-8 text-rose-400/60 text-sm">Written for you, December 2024</p>
          </motion.div>
        </Section>

        {/* Divider */}
        <div className="flex justify-center py-8">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
        </div>

        {/* Personal Letter Section */}
        <Section className="py-16">
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-8 text-center">
              My Love,
            </h2>

            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <p>
                I write this letter knowing that no combination of words could ever truly
                express what you mean to me. But I want to try. I want to capture this
                feeling, this gratitude, this overwhelming sense that I am the luckiest
                person in the world to walk beside you.
              </p>

              <p>
                Our partnership gives me everything. Together we explore the world, not just
                as travelers but as curious souls seeking beauty in every corner. The art
                galleries of Amsterdam where you help me see colors I'd never noticed. The
                concerts where the music moves through us both, creating memories we'll carry
                forever. The beaches where time stops and it's just us, the waves, and the
                endless horizon.
              </p>

              <p>
                Amsterdam has become more beautiful because I see it with you. The canals
                sparkle differently. The cuisine tastes richer when shared across our table.
                Every bike ride through the city, every spontaneous exploration of a new
                neighborhood, every quiet evening at home, they're all treasures because
                you're there.
              </p>

              <p className="text-xl text-white/90 font-light">
                But it's the little moments that move me most.
              </p>

              <p>
                The care you show in small gestures. The way you remember the details I
                forget. The warmth I feel when I come home to you. The love that doesn't
                need words because it lives in the way you look at me, the way you're there
                even when things are hard, the way you believe in me when I forget to
                believe in myself.
              </p>

              <p>
                You help me put my shit together. That's the honest truth. When my mind
                races with a thousand ideas and I feel scattered across too many dreams,
                your presence centers me. Your love gives me the foundation to build from.
                You are my home, and from that home, I can reach for anything.
              </p>
            </div>
          </motion.div>
        </Section>

        {/* Quotes Section */}
        <Section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-sm tracking-[0.2em] uppercase text-rose-400/60 mb-4">
              Words from Poets & Philosophers
            </h2>
            <p className="text-slate-400">
              Others have tried to capture love. Here are words that remind me of us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <QuoteCard
              quote="Whatever our souls are made of, his and mine are the same."
              author="Emily Bront&euml;"
              accentColor="rose"
            />
            <QuoteCard
              quote="I have decided to stick with love. Hate is too great a burden to bear."
              author="Martin Luther King Jr."
              accentColor="violet"
            />
            <QuoteCard
              quote="The best thing to hold onto in life is each other."
              author="Audrey Hepburn"
              accentColor="amber"
            />
            <QuoteCard
              quote="In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
              author="Maya Angelou"
              accentColor="emerald"
            />
          </div>
        </Section>

        {/* Rumi Quote - Full Width */}
        <Section className="py-16">
          <motion.div
            className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-rose-500/10 to-violet-500/5 border border-rose-500/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <FloralAccent className="absolute top-6 left-6 w-16 h-16 text-rose-400/20" />
            <FloralAccent className="absolute bottom-6 right-6 w-16 h-16 text-rose-400/20 rotate-180" />

            <p className="text-2xl md:text-3xl text-white/90 italic leading-relaxed text-center max-w-3xl mx-auto">
              "The minute I heard my first love story, I started looking for you, not knowing
              how blind that was. Lovers don't finally meet somewhere. They're in each other
              all along."
            </p>
            <p className="text-center mt-6 text-rose-400/60">&mdash; Rumi</p>
          </motion.div>
        </Section>

        {/* Essay Section - From 101 Essays That Change Your Life */}
        <Section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-sm tracking-[0.2em] uppercase text-rose-400/60 mb-4">
              A Passage on Partnership
            </h2>
            <p className="text-slate-400 text-sm">
              Inspired by Brianna Wiest's "101 Essays That Will Change The Way You Think"
            </p>
          </div>

          <motion.div
            className="bg-slate-900/50 rounded-2xl p-8 md:p-12 border border-slate-700/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl text-white/90 font-light mb-6">
              On Building a Life Together
            </h3>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                The right relationship is not one that fits perfectly from the start. It is
                one in which two people commit to the ongoing work of choosing each other,
                again and again, through change and growth and all the seasons of a life.
              </p>
              <p>
                Real partnership is not the absence of conflict but the presence of
                commitment. It is knowing that when things get hard, you will face them
                together. It is understanding that love is not just a feeling but a practice,
                renewed each day through small acts of kindness, patience, and attention.
              </p>
              <p>
                The most profound relationships are built not on grand gestures but on the
                accumulation of tiny moments: the morning coffee made just right, the
                listening ear at the end of a long day, the hand reached for in the dark.
                These are the threads that weave a life together.
              </p>
              <p className="text-white/80 italic">
                "You don't find your person. You build a relationship with them. And in that
                building, you build yourself."
              </p>
            </div>
          </motion.div>
        </Section>

        {/* Future Plans Section */}
        <Section className="py-16">
          <div className="text-center mb-12">
            <FloralAccent className="w-16 h-16 mx-auto text-rose-400/30 mb-4" />
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-4">
              What Awaits Us
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              2025 is going to be extraordinary. Here's what I'm dreaming of for us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/5 border border-rose-500/20 hover:border-rose-500/40 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-4">🇯🇵</div>
              <h3 className="text-xl text-white/90 mb-2">Japan</h3>
              <p className="text-slate-400">
                Cherry blossoms in spring. Ancient temples and modern cities. The best food
                we'll ever taste. Walking hand in hand through Kyoto's bamboo groves.
              </p>
            </motion.div>

            <motion.div
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20 hover:border-violet-500/40 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-4">🇰🇷</div>
              <h3 className="text-xl text-white/90 mb-2">Korea</h3>
              <p className="text-slate-400">
                Seoul's electric energy. K-BBQ feasts. Palace gardens and street markets.
                Discovering a culture that blends ancient wisdom with cutting-edge innovation.
              </p>
            </motion.div>

            <motion.div
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-4">🇪🇸</div>
              <h3 className="text-xl text-white/90 mb-2">Tenerife</h3>
              <p className="text-slate-400">
                Volcanic landscapes and black sand beaches. Sunsets that paint the sky in
                impossible colors. Warm nights under the stars, just the two of us.
              </p>
            </motion.div>

            <motion.div
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-4">🎭</div>
              <h3 className="text-xl text-white/90 mb-2">Art & Music</h3>
              <p className="text-slate-400">
                Concerts that move our souls. Museums where we lose track of time. Art shows
                that spark conversations. Creating our own music together, frequencies of love.
              </p>
            </motion.div>
          </div>

          <motion.p
            className="text-center text-slate-300 mt-12 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            And between all these adventures: quiet moments at home, cooking together,
            planning our next chapter, and simply being in each other's presence. The
            ordinary made extraordinary by your company.
          </motion.p>
        </Section>

        {/* Closing */}
        <Section className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <FloralAccent className="w-20 h-20 mx-auto text-rose-400/30 mb-8" />

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              Thank you for being my partner in everything. For the love you give so freely.
              For the patience when I'm difficult. For the joy you bring to every single day.
            </p>

            <p className="text-2xl md:text-3xl text-white/90 font-light mb-4">
              I love you.
            </p>

            <p className="text-xl text-rose-400/80 font-light italic mb-2">
              Today, tomorrow, and all the days after.
            </p>

            <p className="text-slate-500 mt-8">
              Forever yours,
            </p>
            <p className="text-2xl text-white/90 font-light mt-2">
              Frank
            </p>
          </motion.div>
        </Section>

        {/* Pablo Neruda Final Quote */}
        <Section className="py-16">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-xl text-rose-200/70 italic leading-relaxed">
              "I love you without knowing how, or when, or from where.
              <br />
              I love you simply, without problems or pride:
              <br />
              I love you in this way because I do not know any other way of loving
              <br />
              but this, in which there is no I or you,
              <br />
              so intimate that your hand upon my chest is my hand,
              <br />
              so intimate that when I fall asleep your eyes close."
            </p>
            <p className="mt-6 text-slate-500">&mdash; Pablo Neruda</p>
          </motion.div>
        </Section>

        {/* Footer */}
        <motion.footer
          className="pt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-rose-500/30 to-transparent mb-8" />
          <Link
            href="/letters"
            className="text-slate-500 hover:text-rose-400 transition-colors text-sm"
          >
            &larr; Back to Letters
          </Link>
        </motion.footer>
      </div>
    </div>
  )
}
