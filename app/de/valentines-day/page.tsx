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

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

// ─── Visual Divider ─────────────────────────────────────────────────

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full h-48 md:h-72 overflow-hidden"
      aria-hidden="true"
    >
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

// ─── Teilen-Button ──────────────────────────────────────────────────

function TeilenButton() {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = 'https://frankx.ai/de/valentines-day'
    const title = 'Lob der Liebe — Gedichte & Meditationen'

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // User cancelled or not supported
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
      {copied ? 'Link kopiert' : 'Seite teilen'}
    </button>
  )
}

// ─── Gedichte (Zitate) ──────────────────────────────────────────────

const gedichte = [
  {
    quote:
      'Ich bin bei dir, du seist auch noch so ferne, du bist mir nah! Die Sonne sinkt, bald leuchten mir die Sterne. O wärst du da!',
    author: 'Johann Wolfgang von Goethe',
    source: 'Nähe des Geliebten',
    accent: 'gold' as const,
  },
  {
    quote:
      'Dass ein Mensch einen anderen lieben soll, das ist vielleicht das Schwerste, was uns aufgegeben ist, das Äußerste, die letzte Prüfung und Bewährung, die Arbeit, für die alle andere Arbeit nur Vorbereitung ist.',
    author: 'Rainer Maria Rilke',
    source: 'Briefe an einen jungen Dichter',
    accent: 'violet' as const,
  },
  {
    quote:
      'Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar.',
    author: 'Antoine de Saint-Exupéry',
    source: 'Der kleine Prinz',
    accent: 'teal' as const,
  },
  {
    quote:
      'Wo gehen wir denn hin? Immer nach Hause.',
    author: 'Novalis',
    source: 'Heinrich von Ofterdingen',
    accent: 'gold' as const,
  },
  {
    quote:
      'Lasst Raum zwischen euch und lasst die Winde des Himmels zwischen euch tanzen. Liebt einander, doch macht die Liebe nicht zur Fessel: Lasst sie eher ein wogendes Meer sein zwischen den Ufern eurer Seelen.',
    author: 'Khalil Gibran',
    source: 'Der Prophet',
    accent: 'rose' as const,
  },
  {
    quote:
      'Das größte Glück des Lebens ist die Überzeugung, geliebt zu werden — geliebt um unserer selbst willen, oder vielmehr: geliebt trotz unserer selbst.',
    author: 'Victor Hugo',
    source: 'Die Elenden',
    accent: 'violet' as const,
  },
]

// ─── Stimmen der Liebe — Vollständige Gedichte ──────────────────────

const vollGedichte = [
  {
    title: 'Nähe des Geliebten',
    author: 'Johann Wolfgang von Goethe',
    lines: [
      ['Ich denke dein, wenn mir der Sonne Schimmer'],
      ['Vom Meere strahlt;'],
      ['Ich denke dein, wenn sich des Mondes Flimmer'],
      ['In Quellen malt.'],
      [''],
      ['Ich sehe dich, wenn auf dem fernen Wege'],
      ['Der Staub sich hebt;'],
      ['In tiefer Nacht, wenn auf dem schmalen Stege'],
      ['Der Wandrer bebt.'],
      [''],
      ['Ich höre dich, wenn dort mit dumpfem Rauschen'],
      ['Die Welle steigt.'],
      ['Im stillen Haine geh ich oft zu lauschen,'],
      ['Wenn alles schweigt.'],
      [''],
      ['Ich bin bei dir, du seist auch noch so ferne,'],
      ['Du bist mir nah!'],
      ['Die Sonne sinkt, bald leuchten mir die Sterne.'],
      ['O wärst du da!'],
    ],
    accent: 'gold' as const,
  },
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
    accent: 'violet' as const,
  },
]

// ─── Liebesbriefe ans Leben ─────────────────────────────────────────

const prosaBriefe = [
  {
    title: 'Über das Morgenlicht',
    body: [
      'Es gibt eine Art von Liebe, die nichts von dir verlangt.',
      'Sie kommt, bevor du die Augen öffnest. Das erste Licht durch das Fenster, das dich findet, genau dort, wo du bist.',
      'So sagt die Welt: Du bist da. Das genügt.',
    ],
    accent: 'gold' as const,
  },
  {
    title: 'Über die Freundschaft',
    body: [
      'Die Griechen nannten es Philia. Die Liebe, die dich klar sieht, ohne den Schleier der Begierde.',
      'Der Freund, der dir um Mitternacht ein Lied schickt. Die, die sich erinnert, wie du deinen Kaffee trinkst — seit drei Jahren. Der, der schweigt, wenn Schweigen genügt, und alles sagt, wenn es nötig ist.',
      'Liebe ohne Drehbuch. Ohne Zeitplan. Ohne Bedingungen. Nur: Ich sehe dich. Und ich bin noch da.',
    ],
    accent: 'teal' as const,
  },
  {
    title: 'Über gemeinsame Mahlzeiten',
    body: [
      'Jede große Liebesgeschichte enthält eine Küche.',
      'Nicht immer eine prächtige. Manchmal nur einen Tisch, zwei Stühle und etwas Warmes.',
      'Aber die Geschichte ist immer dieselbe: Jemand hat sich die Mühe gemacht, etwas mit den Händen zuzubereiten und es einem anderen hinzustellen. Diese stille Geste — ich habe das für dich gemacht — ist eine der ältesten Liebessprachen, die wir kennen.',
    ],
    accent: 'rose' as const,
  },
  {
    title: 'Über die Einsamkeit',
    body: [
      'Bevor du jemanden gut lieben kannst, musst du allein in einem Raum sitzen und freundlich zu dir selbst sein.',
      'Nicht die aufgesetzte Art. Nicht die Schaumbad-und-Kerzen-Art. Die Art, bei der du dir vergibst, was gestern war. Die Art, bei der du dir um zehn Uhr abends Essen machst und langsam isst, weil du dir die Mühe wert bist.',
      'Auch das ist Liebe. Vielleicht die wichtigste.',
    ],
    accent: 'violet' as const,
  },
]

// ─── Component ──────────────────────────────────────────────────────

export default function DeValentinesDayPage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <ScrollProgress />
      <RosePetals intensity="light" />
      <LanguageSwitcher
        currentLang="de"
        enHref="/valentines-day"
        deHref="/de/valentines-day"
      />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
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
        <div className="absolute w-[300px] h-[300px] bg-violet-500/[0.03] rounded-full blur-[100px] bottom-1/4 left-1/4" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/[0.02] rounded-full blur-[80px] top-1/3 right-1/4" />

        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-rose-300/40 text-sm tracking-[0.3em] uppercase mb-8"
          >
            14. Februar 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mb-8 leading-tight"
          >
            Lob der Liebe
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-body-serif text-lg md:text-xl text-white/40 italic max-w-xl mx-auto leading-relaxed"
          >
            Gedichte, Literatur und Meditationen — für heute, und für jeden.
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

      {/* ─── Eröffnende Meditation ─────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0e] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="font-body-serif text-base md:text-lg text-white/50 leading-relaxed space-y-5 text-center italic">
              <p>Die Liebe ist das gewöhnlichste Wunder.</p>
              <p>
                Sie lebt in der Nachricht, die du fast nicht gesendet hättest.
                In der Mahlzeit, die jemand dir an einem Dienstag zubereitet hat.
                In dem Freund, der durch die ganze Stadt gefahren ist, weil er
                etwas in deiner Stimme gehört hat.
              </p>
              <p>
                Sie braucht keine große Bühne. Sie muss nicht verdient werden.
                Sie will nur bemerkt werden.
              </p>
              <p className="text-white/30">
                Diese Seite ist eine Sammlung — von Gedichten, Passagen und
                kleinen Betrachtungen über die Liebe in all ihren Formen. Für
                jeden. Teile sie mit jemandem, oder behalte sie für dich.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── Was die Dichter wussten ─────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a10] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Was die Dichter wussten
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Manche Wahrheiten überdauern jedes Jahrhundert.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {gedichte.map((poem, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <QuoteCard
                  quote={poem.quote}
                  author={poem.author}
                  source={poem.source}
                  accentColor={poem.accent}
                  variant={i === 0 || i === 1 ? 'large' : 'default'}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual ──────────────────────────────────────────── */}
      <SectionImage src="/images/valentines/rose-petals-hero.png" alt="" />

      {/* ─── Die Stimmen der Liebe — Vollständige Gedichte ──── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0e0a0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Die Stimmen der Liebe
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Vollständige Gedichte aus der deutschen Tradition.
            </p>
          </ScrollReveal>

          <div className="space-y-14">
            {vollGedichte.map((poem, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="relative p-8 md:p-10 rounded-2xl backdrop-blur-sm border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] animate-breathe">
                  <p className="font-display text-lg md:text-xl text-white/60 mb-1 font-light italic">
                    {poem.title}
                  </p>
                  <p className="text-xs text-white/30 tracking-wide mb-6">
                    {poem.author}
                  </p>

                  <div className="font-serif italic text-base md:text-lg text-white/80 leading-[1.9]">
                    {poem.lines.map((line, j) => (
                      <p key={j} className={line[0] === '' ? 'h-4' : ''}>
                        {line[0]}
                        {line[1] && (
                          <span className="text-white/50"> {line[1]}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual ──────────────────────────────────────────── */}
      <SectionImage src="/images/valentines/two-souls.png" alt="" />

      {/* ─── Liebesbriefe ans Leben ──────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#100a0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Liebesbriefe ans Leben
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Kleine Meditationen über die Liebe, die in den kleinen Dingen
              lebt.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {prosaBriefe.map((letter, i) => {
              const accentMap = {
                rose: 'text-rose-300/50',
                gold: 'text-amber-300/50',
                violet: 'text-violet-300/50',
                teal: 'text-teal-300/50',
              }

              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                    <p
                      className={`font-display text-lg md:text-xl font-light italic mb-5 ${accentMap[letter.accent]}`}
                    >
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

      {/* ─── Eine Meditation ─────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0e] to-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-80 h-80 bg-rose-500/[0.03] rounded-full blur-[120px]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
              Eine Meditation
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-5">
                <p>Die Liebe ist nicht eine Sache.</p>
                <p>
                  Sie ist der Freund, der sich erinnert. Die Mutter, die
                  loslässt. Der Fremde, der die Tür eine Sekunde länger aufhält,
                  als er müsste.
                </p>
                <p>
                  Sie ist der Mut zu sagen{' '}
                  <span className="text-rose-300/60">ich weiß es nicht</span>{' '}
                  und die Gnade, es zu hören. Sie ist, jemandem zu vergeben,
                  dass er menschlich ist — angefangen bei dir selbst.
                </p>
                <p>
                  Die Dichter haben Jahrhunderte lang über sie geschrieben,
                  nicht weil sie kompliziert ist, sondern weil sie
                  unerschöpflich ist. Jeder Blickwinkel enthüllt etwas Neues.
                  Jeder Verlust lehrt etwas, das die Freude nicht konnte.
                </p>
                <p>
                  Heute — ob du mit jemandem zusammen bist, jemanden suchst,
                  oder lernst, dir selbst genug zu sein — die Liebe ist bereits
                  da.
                </p>
                <p className="text-white/40">
                  In der Art, wie du diese Worte liest. In der Tatsache, dass du
                  lang genug innegehalten hast, um hinzuschauen.
                </p>
                <p className="text-rose-300/50">Mehr verlangt sie nicht.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Abschluss ──────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[120px]" />

        <div className="relative z-20 max-w-lg mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif italic text-xl md:text-2xl text-white/35 leading-relaxed">
              &bdquo;Und jedem Anfang wohnt ein Zauber inne, der uns beschützt
              und der uns hilft, zu leben.&ldquo;
            </p>
            <p className="text-sm text-rose-300/30 mt-4">— Hermann Hesse</p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-16">
              <p className="text-white/25 text-sm mb-6 italic">
                Kennst du jemanden, der heute ein wenig Schönheit gebrauchen
                könnte?
              </p>
              <TeilenButton />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-12">
              <Link
                href="/valentines-day"
                className="text-xs text-white/20 hover:text-white/40 transition-colors tracking-wide"
              >
                English version &rarr;
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="mt-12 pt-8 border-t border-white/[0.04]">
              <p className="text-xs text-white/15 tracking-wide">
                Mit Sorgfalt kuratiert. 14. Februar 2026.
              </p>
              <p className="text-xs text-white/10 mt-1">FrankX.ai</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
