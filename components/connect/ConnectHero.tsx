'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SaveContactButton } from './SaveContactButton'
import { AskAgentCTA } from './AskAgentCTA'

export function ConnectHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mb-5">
        <div
          aria-hidden
          className="absolute inset-0 -m-2 rounded-full bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-violet-500/20 blur-2xl"
        />
        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/15 ring-offset-2 ring-offset-[#0a0a0b] sm:h-28 sm:w-28">
          <Image
            src="/images/portraits/frankx-avatar.png"
            alt="Frank Riemer"
            width={224}
            height={224}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Frank{' '}
        <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
          Riemer
        </span>
      </h1>
      <p className="mt-1.5 text-sm font-medium text-white/70 sm:text-base">
        AI Architect & Creator
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-[15px]">
        Enterprise AI systems, agentic orchestration, and 12K+ AI tracks shipped from
        the studio.
      </p>

      <div className="mt-6 flex w-full max-w-md flex-col gap-2.5 sm:flex-row sm:justify-center">
        <SaveContactButton className="w-full sm:w-auto" />
        <AskAgentCTA className="w-full sm:w-auto" />
      </div>
    </motion.div>
  )
}
