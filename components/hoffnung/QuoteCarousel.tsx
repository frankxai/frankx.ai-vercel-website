'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

const quotes = [
  {
    text: 'Vielleicht sind alle Drachen unseres Lebens Prinzessinnen, die nur darauf warten, uns einmal schön und mutig zu sehen.',
    author: 'Rainer Maria Rilke',
    source: 'Briefe an einen jungen Dichter',
  },
  {
    text: 'Die Wunde ist der Ort, wo das Licht in dich eintritt.',
    author: 'Rumi',
  },
  {
    text: 'Auch aus Steinen, die einem in den Weg gelegt werden, kann man Schönes bauen.',
    author: 'Johann Wolfgang von Goethe',
  },
  {
    text: 'Ich liebte Sie; die Liebe ist vielleicht in meiner Seele noch nicht ganz erloschen; aber sie soll Sie nicht mehr beunruhigen.',
    author: 'Alexander Puschkin',
    source: 'Ich liebte Sie',
  },
  {
    text: 'Und jedem Anfang wohnt ein Zauber inne, der uns beschützt und der uns hilft, zu leben.',
    author: 'Hermann Hesse',
    source: 'Stufen',
  },
  {
    text: 'Und immer noch sagt die Sonne zur Erde nicht: Du schuldest mir etwas. Sieh, was mit einer solchen Liebe geschieht. Sie erleuchtet den ganzen Himmel.',
    author: 'Hafiz',
  },
  {
    text: 'Tell me, what is it you plan to do with your one wild and precious life?',
    author: 'Mary Oliver',
    source: 'The Summer Day',
  },
  {
    text: 'No mud, no lotus.',
    author: 'Thich Nhat Hanh',
  },
]

export function QuoteCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = (index: number) => {
    setActiveIndex((index + quotes.length) % quotes.length)
  }

  return (
    <section className="py-24 md:py-32 px-6">
      <ScrollReveal>
        <h2 className="font-garamond text-3xl md:text-4xl text-center text-white/90 mb-4">
          Stimmen der Hoffnung
        </h2>
        <p className="font-lora text-center text-sky-200/50 mb-12 text-sm">
          Voices of Hope
        </p>
      </ScrollReveal>

      {/* Stationary card — no horizontal scroll */}
      <div className="max-w-xl mx-auto">
        <div className="relative min-h-[220px] md:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="glass-card-dawn p-8 md:p-10 animate-dawn-glow">
                <blockquote className="font-garamond text-lg md:text-xl lg:text-2xl italic leading-relaxed text-white/90 mb-6">
                  &ldquo;{quotes[activeIndex].text}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
                  <cite className="text-sm not-italic tracking-wide text-amber-300/70 whitespace-nowrap">
                    {quotes[activeIndex].author}
                    {quotes[activeIndex].source && (
                      <span className="text-white/30 ml-1">— {quotes[activeIndex].source}</span>
                    )}
                  </cite>
                </footer>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs tracking-wide text-white/70 hover:text-white hover:border-white/25 transition-all"
            aria-label="Vorherige Stimme"
          >
            &larr; Vorherige
          </button>

          <span className="text-xs text-white/30 tabular-nums mx-2">
            {activeIndex + 1} / {quotes.length}
          </span>

          <button
            onClick={() => goTo(activeIndex + 1)}
            className="rounded-full border border-amber-300/30 bg-amber-200/5 px-4 py-2 text-xs tracking-wide text-amber-200/80 hover:text-amber-100 transition-all"
            aria-label="Nächste Stimme"
          >
            Nächste &rarr;
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-5">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-amber-400 w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Zitat ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
