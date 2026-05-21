'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

const LEAF_COUNT = 12

const leaves = Array.from({ length: LEAF_COUNT }, (_, i) => ({
  left: ((i * 61.8) % 100),
  size: 6 + ((i * 1.7) % 8),
  delay: (i * 1.5) % 12,
  duration: 10 + ((i * 2.3) % 8),
  drift: ((i * 7.3) % 30) - 15,
  isLight: i % 3 === 0,
}))

export function WorldTreeSection() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      {/* Cinematic forest clearing background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hoffnung/hoffnung-forest-clearing.png"
          alt=""
          fill
          className="object-cover object-center"
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/85 via-[#070B14]/60 to-[#070B14]/85" />
      </div>

      {/* Falling golden leaves */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {leaves.map((leaf, i) => (
          <div
            key={i}
            className={leaf.isLight ? 'golden-leaf-light' : 'golden-leaf'}
            style={{
              position: 'absolute',
              left: `${leaf.left}%`,
              top: '-20px',
              width: `${leaf.size}px`,
              height: `${leaf.size * 1.4}px`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
              '--drift': `${leaf.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-garamond text-3xl md:text-5xl text-white/95 mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            Der Weltenbaum
          </h2>
          <p className="font-lora text-center text-sky-200/60 mb-10 text-sm">
            The World Tree
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-lora text-white/70 leading-relaxed mb-4 text-lg">
            In den ältesten Mythen der Menschheit steht ein Baum, dessen Wurzeln
            die Unterwelt berühren und dessen Krone die Sterne erreicht.
          </p>
          <p className="font-lora text-white/70 leading-relaxed mb-4 text-lg">
            Yggdrasil. Der Lebensbaum. Der Weltenbaum.
          </p>
          <p className="font-lora text-white/50 leading-relaxed mb-12 italic text-base">
            Er verbindet alles, was ist, mit allem, was war, und allem, was sein wird.
            Jedes Blatt ein Leben. Jede Wurzel eine Erinnerung. Jeder Ast eine Hoffnung.
          </p>
        </ScrollReveal>

        {/* Cinematic Lebensbaum portrait image */}
        <ScrollReveal delay={0.4}>
          <div className="relative w-64 md:w-80 aspect-[9/16] mx-auto mb-12 rounded-2xl overflow-hidden animate-breathe-dawn shadow-[0_0_60px_rgba(245,158,11,0.1)]">
            <Image
              src="/images/hoffnung/lebensbaum-hero.png"
              alt="Der Lebensbaum — an ancient tree at dawn"
              fill
              className="object-cover"
              quality={85}
              sizes="(max-width: 768px) 256px, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/60 via-transparent to-[#070B14]/30" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <Link
            href="/lebensbaum"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-card-dawn text-amber-100/80 hover:text-amber-50 transition-all duration-300 font-lora text-sm tracking-wide hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          >
            Erlebe den Lebensbaum
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-1"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
