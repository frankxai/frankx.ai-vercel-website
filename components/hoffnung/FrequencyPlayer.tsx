'use client'

import { ScrollReveal } from '@/components/valentines/ScrollReveal'

const frequencies = [
  {
    hz: 174,
    name: 'Erdung & Sicherheit',
    nameEn: 'Grounding & Security',
    color: '#7C3AED',
    description: 'Lindert Schmerz und gibt ein Gefühl von Sicherheit und Geborgenheit.',
  },
  {
    hz: 285,
    name: 'Heilung & Erneuerung',
    nameEn: 'Healing & Renewal',
    color: '#6366F1',
    description: 'Fördert die Regeneration und Erneuerung des Körpers und Geistes.',
  },
  {
    hz: 396,
    name: 'Befreiung',
    nameEn: 'Liberation',
    color: '#3B82F6',
    description: 'Löst Schuld und Angst. Befreit von emotionalen Blockaden.',
  },
  {
    hz: 432,
    name: 'Natürliche Harmonie',
    nameEn: 'Natural Harmony',
    color: '#38BDF8',
    description: 'Die natürliche Stimmung des Universums. Tiefe Ruhe und Frieden.',
  },
  {
    hz: 528,
    name: 'Frequenz der Liebe',
    nameEn: 'Love Frequency',
    color: '#10B981',
    description: 'Transformation und Wunder. Die Frequenz der Liebe und des Lichts.',
  },
  {
    hz: 639,
    name: 'Verbindung',
    nameEn: 'Connection',
    color: '#F59E0B',
    description: 'Harmonisiert Beziehungen und stärkt die Verbindung zu anderen.',
  },
  {
    hz: 741,
    name: 'Ausdruck & Reinigung',
    nameEn: 'Expression & Cleansing',
    color: '#F97316',
    description: 'Emotionale Reinigung und authentischer Selbstausdruck.',
  },
  {
    hz: 852,
    name: 'Intuition',
    nameEn: 'Intuition',
    color: '#EC4899',
    description: 'Öffnet die innere Wahrnehmung und stärkt die Intuition.',
  },
  {
    hz: 963,
    name: 'Kosmisches Bewusstsein',
    nameEn: 'Cosmic Consciousness',
    color: '#A855F7',
    description: 'Verbindung mit dem Göttlichen und dem kosmischen Bewusstsein.',
  },
]

export function FrequencyPlayer() {
  return (
    <section className="py-24 md:py-32 px-6">
      <ScrollReveal>
        <h2 className="font-garamond text-3xl md:text-4xl text-center text-white/90 mb-4">
          Heilfrequenzen
        </h2>
        <p className="font-lora text-center text-sky-200/50 mb-4 text-sm">
          Healing Frequencies
        </p>
        <p className="font-lora text-center text-white/40 max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
          Die Solfeggio-Frequenzen sind uralte Klangschwingungen, die seit Jahrhunderten
          zur Heilung und Meditation verwendet werden.
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
