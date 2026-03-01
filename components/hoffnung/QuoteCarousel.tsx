'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const items = container.querySelectorAll('.quote-carousel-item')
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
    setActiveIndex(index)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % quotes.length
        scrollToIndex(next)
        return next
      })
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused, scrollToIndex])

  // Track scroll position for dot indicators
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const itemWidth = container.scrollWidth / quotes.length
      const index = Math.round(scrollLeft / itemWidth)
      setActiveIndex(Math.min(index, quotes.length - 1))
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="py-24 md:py-32">
      <ScrollReveal>
        <h2 className="font-garamond text-3xl md:text-4xl text-center text-white/90 mb-4">
          Stimmen der Hoffnung
        </h2>
        <p className="font-lora text-center text-sky-200/50 mb-12 text-sm">
          Voices of Hope
        </p>
      </ScrollReveal>

      <div
        ref={scrollRef}
        className="quote-carousel flex gap-6 overflow-x-auto px-6 md:px-12 py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {quotes.map((q, i) => (
          <div
            key={i}
            className="quote-carousel-item w-[85vw] md:w-[500px] lg:w-[550px]"
          >
            <div className="glass-card-dawn p-8 md:p-10 h-full animate-dawn-glow">
              <blockquote className="font-garamond text-lg md:text-xl lg:text-2xl italic leading-relaxed text-white/90 mb-6">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
                <cite className="text-sm not-italic tracking-wide text-amber-300/70 whitespace-nowrap">
                  {q.author}
                  {q.source && (
                    <span className="text-white/30 ml-1">— {q.source}</span>
                  )}
                </cite>
              </footer>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-amber-400 w-6'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to quote ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
