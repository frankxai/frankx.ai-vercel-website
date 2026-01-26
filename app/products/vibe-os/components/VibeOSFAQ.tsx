'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface VibeOSFAQProps {
  faq: FAQItem[]
}

export default function VibeOSFAQ({ faq }: VibeOSFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Everything you need to know about Vibe OS
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`group w-full rounded-2xl border text-left transition-all ${
                  openIndex === index
                    ? 'border-cyan-500/30 bg-cyan-500/5'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className={`pr-4 font-semibold transition-colors ${
                    openIndex === index ? 'text-cyan-200' : 'text-white group-hover:text-white/90'
                  }`}>
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 ${
                      openIndex === index ? 'text-cyan-400' : 'text-white/55'
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/5 px-6 pb-6 pt-4">
                        <p className="leading-relaxed text-white/70">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50">
            Still have questions?{' '}
            <a
              href="mailto:hello@frankx.ai?subject=Vibe%20OS%20Question"
              className="text-cyan-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
            >
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
