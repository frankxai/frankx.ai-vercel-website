'use client'

import { ParticleField } from '@/components/valentines/ParticleField'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dawn particle field */}
      <ParticleField variant="dawn" />

      {/* Radial gradient overlay — dawn horizon */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.06) 0%, transparent 60%), radial-gradient(ellipse at 50% 20%, rgba(56,189,248,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <ScrollReveal delay={0.2} duration={1.2}>
          <h1 className="font-garamond text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white/95 mb-6">
            Hoffnung
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.6} duration={1}>
          <p className="font-lora text-xl md:text-2xl text-sky-200/70 font-light italic">
            Ein Licht in der Dunkelheit
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1} duration={0.8}>
          <p className="font-lora text-base md:text-lg text-amber-200/50 mt-6 max-w-xl mx-auto leading-relaxed">
            Poesie. Musik. Meditation. Heilung.
          </p>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-gentle-float-dawn">
        <div className="w-px h-12 bg-gradient-to-b from-sky-400/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-sky-400/40 mx-auto mt-1" />
      </div>
    </section>
  )
}
