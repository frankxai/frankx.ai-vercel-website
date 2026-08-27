'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

const frequencies = [
  {
    hz: 174,
    name: 'Tiefe & Schwere',
    nameEn: 'Depth & Weight',
    color: '#7C3AED',
    description:
      'Ein symbolischer Hörimpuls für Ruhe, Gewicht und Bodenhaftung.',
  },
  {
    hz: 285,
    name: 'Erneuerung',
    nameEn: 'Renewal',
    color: '#6366F1',
    description:
      'Eine erfahrungsbezogene Einladung, Übergang und Neubeginn wahrzunehmen.',
  },
  {
    hz: 396,
    name: 'Befreiung',
    nameEn: 'Liberation',
    color: '#3B82F6',
    description:
      'Ein symbolischer Rahmen für das Loslassen belastender Gedanken.',
  },
  {
    hz: 432,
    name: 'Natürliche Harmonie',
    nameEn: 'Natural Harmony',
    color: '#38BDF8',
    description:
      'Eine alternative Stimmung, die manche Hörer als weich und ruhig erleben.',
  },
  {
    hz: 528,
    name: 'Wärme',
    nameEn: 'Warmth',
    color: '#10B981',
    description:
      'Ein symbolischer Hörimpuls für Wärme, Güte und Verbundenheit.',
  },
  {
    hz: 639,
    name: 'Verbindung',
    nameEn: 'Connection',
    color: '#F59E0B',
    description:
      'Eine erfahrungsbezogene Einladung, an Verbindung und Beziehung zu denken.',
  },
  {
    hz: 741,
    name: 'Ausdruck',
    nameEn: 'Expression',
    color: '#F97316',
    description:
      'Ein symbolischer Rahmen für Stimme, Ausdruck und offene Aufmerksamkeit.',
  },
  {
    hz: 852,
    name: 'Intuition',
    nameEn: 'Intuition',
    color: '#EC4899',
    description:
      'Eine erfahrungsbezogene Einladung zu stiller, innerer Aufmerksamkeit.',
  },
  {
    hz: 963,
    name: 'Weite',
    nameEn: 'Spaciousness',
    color: '#A855F7',
    description:
      'Ein symbolischer Hörimpuls für Weite, Staunen und persönliche Bedeutung.',
  },
]

export function FrequencyPlayer() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Cinematic roots/moss background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hoffnung/hoffnung-roots-moss.png"
          alt=""
          fill
          className="object-cover object-center"
          quality={80}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/90 via-[#070B14]/75 to-[#070B14]/90" />
      </div>
      <ScrollReveal>
        <h2 className="font-garamond text-3xl md:text-4xl text-center text-white/90 mb-4">
          Klangräume
        </h2>
        <p className="font-lora text-center text-sky-200/50 mb-4 text-sm">
          Symbolic Listening Prompts
        </p>
        <p className="font-lora text-center text-white/40 max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
          Diese Frequenznamen sind kulturelle und symbolische Hörrahmen, keine
          medizinischen Wirkversprechen. Forschung zu Musik und Stress zeigt
          gemischte, stark kontextabhängige Ergebnisse; höre nach persönlicher
          Verträglichkeit.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {frequencies.map((freq, i) => (
          <ScrollReveal key={freq.hz} delay={i * 0.08}>
            <div className="glass-card-dawn p-6 group relative overflow-hidden">
              {/* Animated glow pulse behind card */}
              <div
                className="absolute inset-0 rounded-2xl animate-freq-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${freq.color}15, transparent 70%)`,
                }}
              />

              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className="text-3xl font-light tracking-tight font-garamond"
                  style={{ color: freq.color }}
                >
                  {freq.hz}
                </span>
                <span className="text-white/30 text-sm">Hz</span>
              </div>

              <h3 className="font-garamond text-lg text-white/90 mb-1">
                {freq.name}
              </h3>
              <p className="text-xs text-white/30 mb-3 italic">{freq.nameEn}</p>

              <p className="font-lora text-sm text-white/50 leading-relaxed">
                {freq.description}
              </p>

              {/* Color accent line */}
              <div
                className="h-px mt-4 opacity-20"
                style={{
                  background: `linear-gradient(90deg, ${freq.color}, transparent)`,
                }}
              />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
