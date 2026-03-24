'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RosePetals } from '@/components/valentines/RosePetals'
import { ParticleField } from '@/components/valentines/ParticleField'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'
import { QuoteCard } from '@/components/valentines/QuoteCard'
import { LanguageSwitcher } from '@/components/valentines/LanguageSwitcher'
import { LanguageBanner } from '@/components/valentines/LanguageBanner'

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

// ─── Visual Divider ─────────────────────────────────────────────────

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-48 md:h-72 overflow-hidden" aria-hidden="true">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-30 scale-105"
        sizes="100vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]/40" />
    </div>
  )
}

function Divider() {
  return <div className="section-divider my-4" />
}

// ─── Share Button ───────────────────────────────────────────────────

function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = 'https://frankx.ai/valentines-day'
    const title = 'In Praise of Love — Poems & Passages for Today'

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // User cancelled or not supported, fall through to copy
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
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-rose-400/15 text-rose-200/50 text-sm tracking-[0.12em] hover:bg-rose-500/[0.06] hover:border-rose-400/25 hover:text-rose-200/70 transition-all duration-500"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
      {copied ? 'Link copied' : 'Share this page'}
    </button>
  )
}

// ─── Poetry Data ────────────────────────────────────────────────────

const poems = [
  {
    quote: 'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.',
    author: 'Rumi',
    accent: 'rose' as const,
  },
  {
    quote: 'I love you without knowing how, or when, or from where. I love you simply, without problems or pride: I love you in this way because I do not know any other way of loving but this, in which there is no I or you, so intimate that your hand upon my chest is my hand, so intimate that when I fall asleep your eyes close.',
    author: 'Pablo Neruda',
    source: 'Sonnet XVII',
    accent: 'gold' as const,
  },
  {
    quote: 'Love is not love which alters when it alteration finds, or bends with the remover to remove. O no! it is an ever-fixed mark that looks on tempests and is never shaken; it is the star to every wand\'ring bark, whose worth\'s unknown, although his height be taken.',
    author: 'William Shakespeare',
    source: 'Sonnet 116',
    accent: 'violet' as const,
  },
  {
    quote: 'Even after all this time, the sun never says to the earth, "You owe me." Look what happens with a love like that. It lights the whole sky.',
    author: 'Hafiz',
    accent: 'gold' as const,
  },
  {
    quote: 'i carry your heart with me (i carry it in my heart) i am never without it (anywhere i go you go, my dear; and whatever is done by only me is your doing, my darling)',
    author: 'e.e. cummings',
    accent: 'rose' as const,
  },
  {
    quote: 'Someone I loved once gave me a box full of darkness. It took me years to understand that this too, was a gift.',
    author: 'Mary Oliver',
    source: 'The Uses of Sorrow',
    accent: 'teal' as const,
  },
]

const bookQuotes = [
  {
    quote: 'Let there be spaces in your togetherness, and let the winds of the heavens dance between you. Love one another, but make not a bond of love: let it rather be a moving sea between the shores of your souls.',
    author: 'Kahlil Gibran',
    source: 'The Prophet',
    accent: 'gold' as const,
  },
  {
    quote: 'For one human being to love another: that is perhaps the most difficult of all our tasks, the ultimate, the last test and proof, the work for which all other work is mere preparation.',
    author: 'Rainer Maria Rilke',
    source: 'Letters to a Young Poet',
    accent: 'violet' as const,
  },
  {
    quote: 'It is only with the heart that one can see rightly; what is essential is invisible to the eye.',
    author: 'Antoine de Saint-Exupéry',
    source: 'The Little Prince',
    accent: 'teal' as const,
  },
  {
    quote: 'She is a friend of my mind. She gather me, man. The pieces I am, she gather them and give them back to me in all the right order.',
    author: 'Toni Morrison',
    source: 'Beloved',
    accent: 'rose' as const,
  },
  {
    quote: 'The greatest happiness of life is the conviction that we are loved — loved for ourselves, or rather, loved in spite of ourselves.',
    author: 'Victor Hugo',
    source: 'Les Misérables',
    accent: 'gold' as const,
  },
  {
    quote: 'The time will come when, with elation, you will greet yourself arriving at your own door, in your own mirror, and each will smile at the other\'s welcome.',
    author: 'Derek Walcott',
    source: 'Love After Love',
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
    translation: 'It is nonsense, says Reason. It is what it is, says Love. It is misfortune, says Calculation. It is nothing but pain, says Fear. It is hopeless, says Insight. It is what it is, says Love. It is ridiculous, says Pride. It is reckless, says Caution. It is impossible, says Experience. It is what it is, says Love.',
    accent: 'rose' as const,
  },
  {
    title: 'Stufen',
    author: 'Hermann Hesse',
    lines: [
      ['Wie jede Blüte welkt und jede Jugend'],
      ['Dem Alter weicht, blüht jede Lebensstufe,'],
      ['Blüht jede Weisheit auch und jede Tugend'],
      ['Zu ihrer Zeit und darf nicht ewig dauern.'],
      [''],
      ['Es muß das Herz bei jedem Lebensrufe'],
      ['Bereit zum Abschied sein und Neubeginne,'],
      ['Um sich in Tapferkeit und ohne Trauern'],
      ['In andre, neue Bindungen zu geben.'],
      [''],
      ['Und jedem Anfang wohnt ein Zauber inne,'],
      ['Der uns beschützt und der uns hilft, zu leben.'],
    ],
    translation: 'As every flower fades and as all youth departs, so life at every stage, so every virtue, so our grasp of truth, blooms in its day and may not last forever. The heart must be prepared at every call of life to part and to begin again — courageously and without any sadness. And in every beginning dwells a magic that protects us and helps us live.',
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
      [''],
      ['Doch alles, was uns anrührt, dich und mich,'],
      ['nimmt uns zusammen wie ein Bogenstrich,'],
      ['der aus zwei Saiten eine Stimme zieht.'],
    ],
    translation: 'How shall I hold my soul so that it does not touch yours? How shall I lift it over you to other things? I would so much like to place it among lost things in the dark, in some quiet unknown place that does not vibrate when your depths vibrate. Yet everything that touches us, you and me, takes us together like a bow\'s stroke that from two strings draws a single voice.',
    accent: 'violet' as const,
  },
]

// ─── Prose Pieces ───────────────────────────────────────────────────

const proseLetters = [
  {
    title: 'On Morning Light',
    body: [
      'There is a kind of love that asks nothing of you.',
      'It arrives before you open your eyes. The first slant of light through the window, finding you exactly where you are.',
      'This is how the world says: you are here. That is enough.',
    ],
    accent: 'gold' as const,
  },
  {
    title: 'On Friendship',
    body: [
      'The Greeks had a word for it — philia. The love that sees you clearly, without the haze of desire.',
      'The friend who texts you a song at midnight. The one who remembers your coffee order from three years ago. The one who says nothing when nothing is needed, and everything when it is.',
      'Love without a script. Without a timeline. Without conditions. Just: I see you. And I\'m still here.',
    ],
    accent: 'teal' as const,
  },
  {
    title: 'On Shared Meals',
    body: [
      'Every great love story contains a kitchen.',
      'Not always a grand one. Sometimes just a table, two chairs, and something warm.',
      'But the story is always the same: someone cared enough to make something with their hands and set it down in front of someone else. That quiet act — I made this for you — is one of the oldest love languages we have.',
    ],
    accent: 'rose' as const,
  },
  {
    title: 'On Solitude',
    body: [
      'Before you can love anyone well, you have to sit alone in a room and be kind to yourself.',
      'Not the performative kind. Not the bubble-bath-and-candles kind. The kind where you forgive yourself for yesterday. The kind where you make yourself dinner at ten in the evening and eat it slowly, because you are worth the effort.',
      'This too is love. Perhaps the most important kind.',
    ],
    accent: 'violet' as const,
  },
]

// ─── Component ──────────────────────────────────────────────────────

export default function ValentinesDayPage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <ScrollProgress />
      <RosePetals intensity="light" />
      <LanguageSwitcher currentLang="en" enHref="/valentines-day" deHref="/de/valentines-day" />
      <LanguageBanner
        targetHref="/de/valentines-day"
        targetLang="de"
        message="Diese Seite ist auch auf Deutsch verfügbar."
        linkText="Zur deutschen Version"
      />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background image — rose petals */}
        <Image
          src="/images/valentines/rose-petals-hero.png"
          alt=""
          fill
          className="object-cover opacity-[0.12] scale-110"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/80 z-[1]" />

        <ParticleField variant="rose-gold" />

        <div className="absolute w-[500px] h-[500px] bg-rose-500/[0.04] rounded-full blur-[150px] top-1/4" />
        <div className="absolute w-[300px] h-[300px] bg-violet-500/[0.03] rounded-full blur-[128px] bottom-1/4 left-1/4" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/[0.02] rounded-full blur-[80px] top-1/3 right-1/4" />

        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-rose-300/40 text-sm tracking-[0.3em] uppercase mb-8"
          >
            February 14, 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mb-8 leading-tight"
          >
            In Praise of Love
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-body-serif text-lg md:text-xl text-white/40 italic max-w-xl mx-auto leading-relaxed"
          >
            Poems, passages, and meditations for today — and for anyone.
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ─── Opening Meditation ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0e] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="font-body-serif text-base md:text-lg text-white/50 leading-relaxed space-y-5 text-center italic">
              <p>
                Love is the most ordinary miracle.
              </p>
              <p>
                It lives in the text you almost didn&apos;t send.
                In the meal someone made you on a Tuesday.
                In the friend who drove across town because they heard something
                in your voice.
              </p>
              <p>
                It doesn&apos;t need a grand stage. It doesn&apos;t need to be earned.
                It only needs to be noticed.
              </p>
              <p className="text-white/30">
                This page is a collection — of poems, passages, and small essays
                about love in all its forms. For anyone.
                Share it with someone, or keep it for yourself.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── What the Poets Knew ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a10] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              What the Poets Knew
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Some truths survive every century.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {poems.map((poem, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <QuoteCard
                  quote={poem.quote}
                  author={poem.author}
                  source={poem.source}
                  accentColor={poem.accent}
                  variant={i === 1 || i === 2 ? 'large' : 'default'}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual ──────────────────────────────────────────── */}
      <SectionImage src="/images/valentines/rose-petals-hero.png" alt="" />

      {/* ─── From the Great Books ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0c10] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              From the Great Books
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              What the novelists and philosophers understood.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {bookQuotes.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <QuoteCard
                  quote={q.quote}
                  author={q.author}
                  source={q.source}
                  accentColor={q.accent}
                  variant={i === 0 ? 'large' : 'wisdom'}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual ──────────────────────────────────────────── */}
      <SectionImage src="/images/valentines/lotus-bloom.png" alt="" />

      {/* ─── Dichter der Liebe — German Poetry ─────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0e0a0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Dichter der Liebe
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Poets of Love — from the German tradition.
            </p>
          </ScrollReveal>

          <div className="space-y-14">
            {germanPoems.map((poem, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="relative p-8 md:p-10 rounded-2xl backdrop-blur-sm border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] animate-breathe">
                  <p className="font-display text-lg md:text-xl text-white/60 mb-1 font-light italic">
                    {poem.title}
                  </p>
                  <p className="text-xs text-white/30 tracking-wide mb-6">{poem.author}</p>

                  <div className="font-serif italic text-base md:text-lg text-white/80 leading-[1.9] mb-6">
                    {poem.lines.map((line, j) => (
                      <p key={j} className={line[0] === '' ? 'h-4' : ''}>
                        {line[0]}
                        {line[1] && <span className="text-white/50"> {line[1]}</span>}
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

      {/* ── Visual ──────────────────────────────────────────── */}
      <SectionImage src="/images/valentines/two-souls.png" alt="" />

      {/* ─── Love Letters to Life ──────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Love Letters to Life
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Short meditations on the love that lives in small things.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {proseLetters.map((letter, i) => {
              const accentMap = {
                rose: 'text-rose-300/50',
                gold: 'text-amber-300/50',
                violet: 'text-violet-300/50',
                teal: 'text-teal-300/50',
              }

              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                    <p className={`font-display text-lg md:text-xl font-light italic mb-5 ${accentMap[letter.accent]}`}>
                      {letter.title}
                    </p>
                    <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-4">
                      {letter.body.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── A Meditation on Love ──────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0e] to-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-80 h-80 bg-rose-500/[0.03] rounded-full blur-[128px]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
              A Meditation
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-5">
                <p>
                  Love is not one thing.
                </p>
                <p>
                  It is the friend who remembers.
                  The parent who lets go.
                  The stranger who holds the door
                  one second longer than they need to.
                </p>
                <p>
                  It is the courage to say <span className="text-rose-300/60">I don&apos;t know</span> and
                  the grace to hear it.
                  It is forgiving someone for being human,
                  starting with yourself.
                </p>
                <p>
                  The poets wrote about it for centuries
                  not because it&apos;s complicated,
                  but because it&apos;s inexhaustible.
                  Every angle reveals something new.
                  Every loss teaches something the joy couldn&apos;t.
                </p>
                <p>
                  Today — whether you are with someone,
                  searching for someone,
                  or learning to be enough on your own —
                  love is already here.
                </p>
                <p className="text-white/40">
                  In the way you read these words.
                  In the fact that you paused long enough to look.
                </p>
                <p className="text-rose-300/50">
                  That&apos;s all it asks.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Book CTA ─────────────────────────────────────────── */}
      <section className="relative px-6 py-16 md:py-20">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="relative z-20 max-w-lg mx-auto text-center">
          <ScrollReveal>
            <p className="text-rose-300/40 text-xs tracking-[0.2em] uppercase mb-3">Read More</p>
            <h2 className="font-serif italic text-2xl md:text-3xl text-white/50 mb-4">
              Love &amp; Poetry
            </h2>
            <p className="text-white/30 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Rumi, Rilke, Goethe, Vietnamese love poetry, and original verse — collected into a free book you can read online.
            </p>
            <Link
              href="/books/love-and-poetry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium hover:bg-rose-500/20 transition-colors"
            >
              Read the Book
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[128px]" />

        <div className="relative z-20 max-w-lg mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif italic text-xl md:text-2xl text-white/35 leading-relaxed">
              &ldquo;Where there is ruin, there is hope for a treasure.&rdquo;
            </p>
            <p className="text-sm text-rose-300/30 mt-4">— Rumi</p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-16">
              <p className="text-white/25 text-sm mb-6 italic">
                Know someone who could use a little beauty today?
              </p>
              <ShareButton />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-16 pt-8 border-t border-white/[0.04]">
              <p className="text-xs text-white/15 tracking-wide">
                Curated with care. February 14, 2026.
              </p>
              <p className="text-xs text-white/10 mt-1">
                FrankX.ai
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
