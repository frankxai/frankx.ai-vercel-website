'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

export function PersonalLetter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto text-center">
        <ScrollReveal>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-lora text-sm text-sky-300/50 hover:text-sky-300/80 transition-colors duration-300 tracking-wide"
          >
            {isOpen ? 'Schliessen' : 'Ein persönliches Wort'}
            <span className="ml-2 inline-block transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              &#8964;
            </span>
          </button>
        </ScrollReveal>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-10 text-left">
                <div className="section-divider-dawn mb-10" />

                <div className="font-garamond italic text-white/60 leading-[1.9] text-base md:text-lg space-y-6">
                  <p>
                    Diese Seite ist für dich.
                  </p>
                  <p>
                    Nicht für eine bestimmte Person, nicht für einen bestimmten Moment —
                    sondern für jeden Menschen, der gerade durch etwas geht, das schwer ist.
                    Der nachts wach liegt. Der nach Worten sucht, die er nicht findet.
                  </p>
                  <p>
                    Die Dichter, die hier sprechen, haben alle dasselbe gewusst:
                    Dass Dunkelheit nicht das Ende ist. Dass Schmerz nicht das Gegenteil
                    von Hoffnung ist, sondern ihr Anfang.
                  </p>
                  <p>
                    Rumi schrieb vor 800 Jahren, dass die Wunde der Ort ist, wo das Licht
                    eintritt. Hesse wusste, dass jedem Anfang ein Zauber innewohnt. Und
                    Hafiz sah in der Sonne ein Beispiel für bedingungslose Liebe.
                  </p>
                  <p>
                    Ich wünsche dir, dass du hier etwas findest, das dich berührt.
                    Einen Vers, eine Frequenz, einen Moment der Stille.
                  </p>
                  <p className="text-amber-200/50">
                    Mit Hoffnung,<br />
                    Frank
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
