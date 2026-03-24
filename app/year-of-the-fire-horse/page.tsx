'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ParticleField } from '@/components/valentines/ParticleField'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'
import { QuoteCard } from '@/components/valentines/QuoteCard'

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

  return <div className="fire-scroll-progress" style={{ width: `${progress}%` }} />
}

// ─── Divider ────────────────────────────────────────────────────────

function Divider() {
  return <div className="fire-divider my-4" />
}

// ─── Share Button ───────────────────────────────────────────────────

function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = 'https://frankx.ai/year-of-the-fire-horse'
    const title = 'Year of the Fire Horse 2026'

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // User cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-amber-400/15 text-amber-200/50 text-sm tracking-[0.12em] hover:bg-amber-500/[0.06] hover:border-amber-400/25 hover:text-amber-200/70 transition-all duration-500"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
        />
      </svg>
      {copied ? 'Link copied' : 'Share this page'}
    </button>
  )
}

// ─── Chinese Proverbs ───────────────────────────────────────────────

const horseProverbs = [
  {
    quote:
      '马到成功 — Upon the arrival of the horse, success is secured. When the cavalry arrives, the battle is already won.',
    author: 'Chinese Proverb',
    source: 'Yuan Dynasty',
    accent: 'gold' as const,
  },
  {
    quote:
      '龙马精神 — The spirit of the dragon-horse. Vigorous vitality that does not fade, combining the power of two mythic creatures into one unstoppable force.',
    author: 'Chinese Proverb',
    source: 'Tang Dynasty',
    accent: 'rose' as const,
  },
  {
    quote:
      '一马当先 — One horse takes the lead. Someone must be first. Someone must refuse to wait for permission.',
    author: 'Chinese Proverb',
    accent: 'gold' as const,
  },
  {
    quote:
      '万马奔腾 — Ten thousand horses galloping. The sound of unstoppable collective momentum. Unity surging forward together.',
    author: 'Chinese Proverb',
    accent: 'violet' as const,
  },
  {
    quote:
      '塞翁失马 — The old frontiersman lost his horse. But was it truly a loss? Fortune and misfortune are interchangeable. What feels like defeat today may be tomorrow\u2019s foundation.',
    author: 'Chinese Parable',
    source: 'Huainanzi',
    accent: 'teal' as const,
  },
  {
    quote:
      '老马识途 — The old horse knows the way. Experience is not just time spent. It is the map written on your bones through every wrong turn and every arrival.',
    author: 'Chinese Proverb',
    accent: 'gold' as const,
  },
]

// ─── Thich Nhat Hanh ────────────────────────────────────────────────

const thichQuotes = [
  {
    quote:
      'We can choose how to live our lives now. We can seize any moment and begin anew.',
    author: 'Thich Nhat Hanh',
    accent: 'teal' as const,
  },
  {
    quote:
      'Waking up this morning, I smile. Twenty-four brand new hours are before me. I vow to live fully in each moment and to look at all beings with eyes of compassion.',
    author: 'Thich Nhat Hanh',
    accent: 'gold' as const,
  },
  {
    quote: 'No mud, no lotus.',
    author: 'Thich Nhat Hanh',
    accent: 'teal' as const,
  },
  {
    quote:
      'The past no longer is, the future is not yet here; there is only one moment in which life is available, and that is the present moment.',
    author: 'Thich Nhat Hanh',
    accent: 'violet' as const,
  },
]

// ─── Rumi ───────────────────────────────────────────────────────────

const rumiQuotes = [
  {
    quote: 'Set your life on fire. Seek those who fan your flames.',
    author: 'Rumi',
    accent: 'gold' as const,
  },
  {
    quote:
      'The time has come to turn your heart into a temple of fire.',
    author: 'Rumi',
    accent: 'rose' as const,
  },
  {
    quote:
      'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
    author: 'Rumi',
    accent: 'violet' as const,
  },
  {
    quote: 'The wound is the place where the Light enters you.',
    author: 'Rumi',
    accent: 'gold' as const,
  },
  {
    quote:
      'You are not a drop in the ocean. You are the entire ocean in a drop.',
    author: 'Rumi',
    accent: 'teal' as const,
  },
]

// ─── Lucky Foods ────────────────────────────────────────────────────

const luckyFoods = [
  {
    name: 'Fish',
    chinese: '鱼',
    pinyin: 'Yú',
    meaning: 'Sounds like 余 (surplus). May you have abundance year after year.',
  },
  {
    name: 'Dumplings',
    chinese: '饺子',
    pinyin: 'Jiǎozi',
    meaning:
      'Shaped like silver ingots. Eat more, earn more. An 1,800-year tradition.',
  },
  {
    name: 'Sticky Rice Cake',
    chinese: '年糕',
    pinyin: 'Niángāo',
    meaning: 'Sounds like 年高 — "year high." Rising prosperity, getting better.',
  },
  {
    name: 'Spring Rolls',
    chinese: '春卷',
    pinyin: 'Chūnjuǎn',
    meaning: 'Golden color resembles gold bars. Wealth rolled into every bite.',
  },
  {
    name: 'Longevity Noodles',
    chinese: '长寿面',
    pinyin: 'Chángshòu Miàn',
    meaning: 'Length symbolizes long life. Must never be cut while eating.',
  },
  {
    name: 'Sweet Rice Balls',
    chinese: '汤圆',
    pinyin: 'Tāngyuán',
    meaning:
      'Round shape means reunion — 团圆. Family unity and togetherness.',
  },
  {
    name: 'Oranges',
    chinese: '橙',
    pinyin: 'Chéng',
    meaning: 'Sounds like 成 (success). Each orange is a small prayer.',
  },
  {
    name: 'Whole Steamed Fish',
    chinese: '蒸鱼',
    pinyin: 'Zhēng Yú',
    meaning:
      'Served whole — head and tail — to symbolize a complete year, beginning to end.',
  },
  {
    name: 'Tangerines',
    chinese: '桔',
    pinyin: 'Jú',
    meaning:
      'Contains the character 吉 — good fortune. The fruit of luck itself.',
  },
]

// ─── Nine Principles ────────────────────────────────────────────────

const principles = [
  {
    number: '一',
    digit: '1',
    title: 'Arrive Before You Are Ready',
    body: '马到成功. The horse does not wait until conditions are perfect. It arrives, and success follows the arrival. Ship before you are ready. The readiness was always an illusion.',
  },
  {
    number: '二',
    digit: '2',
    title: 'Burn What No Longer Serves You',
    body: 'Fire purifies. The Fire Horse year demands you release the projects, habits, and relationships that drain your energy without returning it. Let them go. The flames are not destruction — they are clearing.',
  },
  {
    number: '三',
    digit: '3',
    title: 'Move Like Ten Thousand Horses',
    body: '万马奔腾. Momentum is not a single decision. It is the compound effect of showing up every day with the same direction. One horse is fast. Ten thousand are unstoppable.',
  },
  {
    number: '四',
    digit: '4',
    title: 'Honor the Old Horse',
    body: '老马识途. Your experience is not a burden — it is a map. The years you spent learning, failing, and recovering were not wasted. They were reconnaissance. The old horse knows the way because it has walked every wrong path first.',
  },
  {
    number: '五',
    digit: '5',
    title: 'Begin Anew Every Morning',
    body: 'Thich Nhat Hanh taught that renewal is not a once-a-year event. It is a daily practice. Each morning, twenty-four brand new hours. Each breath, a chance to return to the present. Làm Mới — Beginning Anew.',
  },
  {
    number: '六',
    digit: '6',
    title: 'Let the Loss Teach',
    body: '塞翁失马. The frontiersman lost his horse and his neighbors mourned. But the horse returned, bringing wild horses with it. Your losses carry seeds you cannot yet see. Trust the parable.',
  },
  {
    number: '七',
    digit: '7',
    title: 'Set Your Life on Fire',
    body: 'Rumi said it. The Fire Horse year confirms it. Seek the people, the projects, and the pursuits that make you burn brighter. Comfort is not the goal. Aliveness is.',
  },
  {
    number: '八',
    digit: '8',
    title: 'Protect the Table',
    body: 'Every great culture knows: the table is sacred. The dumplings, the fish, the rice cake — they are not just food. They are prayers made edible. Protect the rituals that hold your people together.',
  },
  {
    number: '九',
    digit: '9',
    title: 'Play the Long Game',
    body: 'Nine — 九, jiǔ — sounds like 久, "long-lasting." The highest single digit. The emperor\u2019s number. The Fire Horse returns every 60 years. Think in decades, not days. Build what lasts.',
  },
]

// ─── Component ──────────────────────────────────────────────────────

export default function YearOfTheFireHorsePage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <ScrollProgress />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Fire particle field */}
        <ParticleField variant="fire" />

        {/* Ambient glows — fire colors */}
        <div className="absolute w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[150px] top-1/4 left-1/3" />
        <div className="absolute w-[300px] h-[300px] bg-red-500/[0.03] rounded-full blur-[128px] bottom-1/4 right-1/4" />
        <div className="absolute w-[200px] h-[200px] bg-orange-500/[0.02] rounded-full blur-[80px] top-1/3 left-1/4" />

        {/* Large Chinese character — decorative background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[20rem] md:text-[30rem] font-bold text-white animate-character-glow leading-none">
            馬
          </span>
        </div>

        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-amber-300/40 text-sm tracking-[0.3em] uppercase mb-8"
          >
            February 17, 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mb-6 leading-tight"
          >
            Year of the Fire Horse
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-amber-200/30 text-base tracking-[0.15em] mb-8"
          >
            丙午年 &middot; The Horse Returns in Fire
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="font-body-serif text-lg md:text-xl text-white/40 italic max-w-xl mx-auto leading-relaxed"
          >
            Once every sixty years. A Ring of Fire in the sky.
            Proverbs, poetry, and principles for the year ahead.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16"
          >
            <svg
              className="w-5 h-5 mx-auto text-white/15 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ─── The Cosmic Alignment ──────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a08] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="font-body-serif text-base md:text-lg text-white/50 leading-relaxed space-y-5 text-center italic">
              <p>
                On February 17, 2026, two things happen at once.
              </p>
              <p>
                The Chinese New Year begins &mdash; marking the start of the
                Year of the Fire Horse, the{' '}
                <span className="text-amber-300/60">
                  most intense energy combination
                </span>{' '}
                in the entire sixty-year zodiac cycle. The Horse is already fire.
                Add the Fire element and you get double flame &mdash; 丙午,
                Bǐng Wǔ &mdash; the 43rd combination of the sexagenary cycle.
              </p>
              <p>
                And on the same day, an{' '}
                <span className="text-red-300/60">
                  annular &ldquo;Ring of Fire&rdquo; solar eclipse
                </span>{' '}
                crosses the sky. The sun, the moon, and a ring of fire &mdash;
                all on the first morning of the Fire Horse year.
              </p>
              <p className="text-white/30">
                The last Fire Horse year was 1966. The next will be 2086.
                This one is ours.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── What the Fire Horse Means ────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a08] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              The Fire Horse
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              What sixty years of waiting produces.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm animate-flame-breathe">
              <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-5">
                <p>
                  In Chinese astrology, the Horse represents{' '}
                  <span className="text-amber-300/60">motion</span>,{' '}
                  <span className="text-amber-300/60">freedom</span>, and{' '}
                  <span className="text-amber-300/60">momentum</span>. It is the
                  seventh animal of the zodiac &mdash; the one that runs.
                </p>
                <p>
                  Fire adds passion, speed, and bold action. Together, the Fire
                  Horse is the single most explosive combination in the entire
                  cycle &mdash; charismatic, intense, and impossible to ignore.
                </p>
                <p>
                  The character 马 appears in more Chinese idioms than almost any
                  other animal. The horse was essential to transportation and
                  warfare for millennia. It carries with it the weight of empires
                  and the promise of arrival.
                </p>
                <p className="text-white/40">
                  The Fire Horse does not ask permission. It does not wait for
                  perfect conditions. It arrives &mdash; and upon its arrival,
                  success follows.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Lucky attributes */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-xs text-amber-300/40 tracking-wider uppercase mb-1">Lucky Colors</p>
                <p className="text-sm text-white/50">Red, Purple, Gold</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-xs text-amber-300/40 tracking-wider uppercase mb-1">Lucky Numbers</p>
                <p className="text-sm text-white/50">2, 3, 7, 9</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-xs text-amber-300/40 tracking-wider uppercase mb-1">Element</p>
                <p className="text-sm text-white/50">Fire 火 (Double)</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-xs text-amber-300/40 tracking-wider uppercase mb-1">60-Year Cycle</p>
                <p className="text-sm text-white/50">1966 &rarr; 2026 &rarr; 2086</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── Wisdom of the Horse ──────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0a] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Wisdom of the Horse
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Proverbs that have survived every dynasty.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {horseProverbs.map((proverb, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <QuoteCard
                  quote={proverb.quote}
                  author={proverb.author}
                  source={proverb.source}
                  accentColor={proverb.accent}
                  variant={i === 0 ? 'large' : 'default'}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Beginning Anew — Thich Nhat Hanh ────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#080a0d] to-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-80 h-80 bg-teal-500/[0.03] rounded-full blur-[128px]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Beginning Anew
            </h2>
            <p className="text-center text-white/20 text-sm mb-4 italic">
              Làm Mới &mdash; the practice of renewal.
            </p>
            <p className="text-center text-white/15 text-xs mb-16">
              Thich Nhat Hanh (1926&ndash;2022) &middot; Vietnamese Zen Buddhist Monk &middot; Huế, Vietnam
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {thichQuotes.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <QuoteCard
                  quote={q.quote}
                  author={q.author}
                  accentColor={q.accent}
                  variant={i === 2 ? 'large' : 'wisdom'}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <p className="font-body-serif text-sm md:text-base text-white/35 leading-relaxed italic text-center">
                Thich Nhat Hanh&apos;s &ldquo;Beginning Anew&rdquo; practice
                &mdash; Làm Mới &mdash; is a formal process of acknowledging
                the past and starting fresh. It is the spiritual heart of Tết,
                the Vietnamese New Year. Not a resolution. Not a promise. Simply:
                today, I begin again.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── The Fire Within — Rumi ──────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a08] to-[#0a0a0f]" />
        <div className="absolute right-1/4 top-1/4 w-60 h-60 bg-amber-500/[0.03] rounded-full blur-[128px]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              The Fire Within
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              What Rumi knew about flames.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {rumiQuotes.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <QuoteCard
                  quote={q.quote}
                  author={q.author}
                  accentColor={q.accent}
                  variant={i === 0 || i === 1 ? 'large' : 'default'}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Original Poem ───────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0a] to-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/[0.02] rounded-full blur-[128px]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
              The Fire Horse
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm animate-flame-breathe">
              <div className="font-body-serif text-base md:text-lg text-white/70 leading-[2] italic space-y-6 text-center">
                <p>
                  The fire horse does not knock.<br />
                  It arrives.
                </p>
                <p>
                  Sixty years between each burning,<br />
                  and in between &mdash; the world forgets<br />
                  what it feels like when the ground<br />
                  remembers how to run.
                </p>
                <p>
                  This year is not for the careful.<br />
                  Not for those who measure twice<br />
                  and never cut.<br />
                  Not for the ones who archive their dreams<br />
                  in folders labeled <span className="text-amber-300/50">someday</span>.
                </p>
                <p>
                  The fire horse says:<br />
                  <span className="text-amber-300/60">today</span>.
                </p>
                <p>
                  Build the thing.<br />
                  Ship the song.<br />
                  Write the chapter.<br />
                  Make the call you&apos;ve rehearsed<br />
                  in every shower for six months.
                </p>
                <p>
                  The eclipse comes in the morning<br />
                  and a ring of fire hangs in the sky<br />
                  like a question you already know<br />
                  the answer to.
                </p>
                <p className="text-white/40">
                  The answer is <span className="text-amber-300/50">yes</span>.<br />
                  The answer was always yes.<br />
                  The horse was always coming.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
                <p className="text-sm text-amber-300/40 tracking-wide">
                  &mdash; FrankX, February 2026
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── The Table — Lucky Foods ──────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0c0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              The Table
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Nine foods. Nine prayers made edible.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {luckyFoods.map((food, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="food-card p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] h-full">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl text-amber-300/50">{food.chinese}</span>
                    <div>
                      <p className="text-sm text-white/60 font-medium">{food.name}</p>
                      <p className="text-xs text-white/25">{food.pinyin}</p>
                    </div>
                  </div>
                  <p className="font-body-serif text-sm text-white/35 leading-relaxed italic">
                    {food.meaning}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <p className="mt-8 text-center text-xs text-white/15 italic">
              Most Chinese New Year food symbolism relies on homophones &mdash;
              谐音, xiéyīn &mdash; words that sound alike carry shared fortune.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── Nine Principles ─────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a08] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Nine Principles
            </h2>
            <p className="text-center text-white/20 text-sm mb-4 italic">
              For the Year of the Fire Horse.
            </p>
            <p className="text-center text-white/15 text-xs mb-16">
              九 (jiǔ) &mdash; &ldquo;nine&rdquo; &mdash; sounds like 久, &ldquo;long-lasting.&rdquo;
              The emperor&apos;s number. The highest digit.
            </p>
          </ScrollReveal>

          <div className="space-y-8">
            {principles.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <span className="text-2xl text-amber-300/40">{p.number}</span>
                    <span className="principle-number text-3xl md:text-4xl font-light">
                      {p.digit}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl text-white/60 font-light mb-3">
                      {p.title}
                    </h3>
                    <p className="font-body-serif text-sm md:text-base text-white/40 leading-relaxed italic">
                      {p.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Vietnamese Tết ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#080a0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Tết Nguyên Đán
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Festival of the First Morning.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-5">
                <p>
                  In Vietnam, the Lunar New Year is called Tết &mdash; short for
                  Tết Nguyên Đán, the{' '}
                  <span className="text-teal-300/60">
                    Festival of the First Morning
                  </span>
                  . It falls on the same day as Chinese New Year, sharing the
                  same lunisolar calendar and the same Horse for 2026.
                </p>
                <p>
                  Where Chinese tradition celebrates with dumplings (饺子),
                  Vietnamese families gather around{' '}
                  <span className="text-amber-300/60">Bánh Tết</span> &mdash;
                  cylindrical sticky rice cakes wrapped in banana leaves, filled
                  with mung bean and pork. In the south, yellow apricot blossoms
                  &mdash; <span className="text-amber-300/60">Hoa Mai</span>{' '}
                  &mdash; replace the Chinese plum blossom.
                </p>
                <p>
                  But the heart of Tết is the same: family returns home. Debts
                  are settled. Houses are cleaned. The old year is released. And
                  on the first morning &mdash; the very first visitor through the
                  door sets the fortune for the entire year.
                </p>
                <p className="text-white/35">
                  This practice is called{' '}
                  <span className="text-teal-300/50">xông đất</span> &mdash;
                  &ldquo;the first foot.&rdquo; Choose your first visitor wisely.
                  Choose your first step wisely. Choose your first morning
                  wisely.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── A Second Poem — To the Builders ─────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a08] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
              To the Builders
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="font-body-serif text-base md:text-lg text-white/70 leading-[2] italic space-y-6 text-center">
                <p>
                  This one is for you &mdash;<br />
                  the ones still awake at 2 AM<br />
                  not because you have to be,<br />
                  but because you cannot stop.
                </p>
                <p>
                  For the ones who shipped something<br />
                  on a Tuesday that nobody asked for,<br />
                  and three months later someone wrote<br />
                  to say it changed their workflow.<br />
                  Their business. Their thinking.
                </p>
                <p>
                  For the ones who build<br />
                  not because the market told them to,<br />
                  but because the silence<br />
                  in an empty editor<br />
                  feels like an invitation.
                </p>
                <p>
                  The Fire Horse doesn&apos;t care<br />
                  about your five-year plan.<br />
                  It cares about <span className="text-amber-300/50">this year</span>.<br />
                  <span className="text-amber-300/50">This month</span>.<br />
                  <span className="text-amber-300/50">This morning</span>.
                </p>
                <p className="text-white/40">
                  Build what matters.<br />
                  The horse is already here.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
                <p className="text-sm text-amber-300/40 tracking-wide">
                  &mdash; FrankX, February 2026
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── Vision CTA ─────────────────────────────────────── */}
      <section className="relative px-6 py-16 md:py-20">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="relative z-20 max-w-lg mx-auto text-center">
          <ScrollReveal>
            <p className="text-amber-300/40 text-xs tracking-[0.2em] uppercase mb-3">
              Personal
            </p>
            <h2 className="font-serif italic text-2xl md:text-3xl text-white/50 mb-4">
              2026 Vision
            </h2>
            <p className="text-white/30 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              My personal blueprint for the Year of the Fire Horse &mdash;
              goals, principles, and the deeper why behind everything I&apos;m
              building.
            </p>
            <Link
              href="/year-of-the-fire-horse/vision"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors"
            >
              Read the Vision
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[128px]" />

        <div className="relative z-20 max-w-lg mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif italic text-xl md:text-2xl text-white/35 leading-relaxed">
              &ldquo;And in every beginning dwells a magic that protects us and
              helps us live.&rdquo;
            </p>
            <p className="text-sm text-amber-300/30 mt-4">
              &mdash; Hermann Hesse, &ldquo;Stufen&rdquo;
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-16">
              <p className="text-white/25 text-sm mb-6 italic">
                新年快乐 &mdash; Xīn Nián Kuài Lè &mdash; Happy New Year.
              </p>
              <ShareButton />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-16 pt-8 border-t border-white/[0.04]">
              <p className="text-xs text-white/15 tracking-wide">
                Curated with care. February 17, 2026.
              </p>
              <p className="text-xs text-white/10 mt-1">FrankX.ai</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
