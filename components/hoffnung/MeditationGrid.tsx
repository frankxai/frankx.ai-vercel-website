'use client'

import { ScrollReveal } from '@/components/valentines/ScrollReveal'

const meditations = [
  {
    title: 'Atemmeditation',
    titleEn: 'Breathing',
    duration: '10 Min',
    description:
      'Die 4-7-8 Atemtechnik. Einatmen, halten, ausatmen. Der einfachste Weg zu innerem Frieden.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" opacity="0.3" />
        <path d="M12 3c0 5-4 9-4 9s4 4 4 9c0-5 4-9 4-9s-4-4-4-9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Körperreise',
    titleEn: 'Body Scan',
    duration: '15 Min',
    description:
      'Eine geführte Reise durch den Körper. Spüre, wo du Spannung hältst, und lasse sie los.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v6m-3 0h6m-6 0l-2 8m8-8l2 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Dankbarkeit',
    titleEn: 'Gratitude',
    duration: '8 Min',
    description:
      'Drei Dinge, für die du dankbar bist. Nicht große Dinge — kleine Lichter im Alltag.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2.09 6.26L20 9.27l-4.91 3.82L16.18 20 12 16.77 7.82 20l1.09-6.91L4 9.27l5.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Stille',
    titleEn: 'Silence',
    duration: '20 Min',
    description:
      'Keine Anleitung. Keine Worte. Nur du und die Stille. Setz dich hin und atme.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" opacity="0.3" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export function MeditationGrid() {
  return (
    <section className="py-24 md:py-32 px-6">
      <ScrollReveal>
        <h2 className="font-garamond text-3xl md:text-4xl text-center text-white/90 mb-4">
          Meditationen
        </h2>
        <p className="font-lora text-center text-sky-200/50 mb-16 text-sm">
          Meditations
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {meditations.map((med, i) => (
          <ScrollReveal key={med.title} delay={i * 0.1}>
            <div className="glass-card-dawn p-6 group hover:border-sky-400/10 transition-colors duration-500">
              <div className="flex items-start gap-4">
                <div className="text-sky-300/60 group-hover:text-sky-300/90 transition-colors duration-500 mt-1">
                  {med.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-garamond text-xl text-white/90">
                      {med.title}
                    </h3>
                    <span className="text-xs text-white/25 italic">
                      {med.titleEn}
                    </span>
                  </div>
                  <p className="font-lora text-sm text-white/50 leading-relaxed mb-3">
                    {med.description}
                  </p>
                  <span className="text-xs text-amber-300/50 font-lora">
                    {med.duration}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
