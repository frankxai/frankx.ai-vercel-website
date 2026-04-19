'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-semibold text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 leading-relaxed text-slate-400">{answer}</p>
      </motion.div>
    </div>
  )
}

export function BVKitFAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 backdrop-blur-sm">
      {faqs.map((faq) => (
        <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  )
}
