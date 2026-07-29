'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowRight, BookOpen, MapPin, Music4, Workflow } from 'lucide-react'
import { SaveContactButton } from './SaveContactButton'
import { AskAgentCTA } from './AskAgentCTA'

const PROOF = [
  {
    label: '99 agents',
    detail: 'Running locally',
    href: '/agents?from=connect',
    icon: Workflow,
  },
  {
    label: '12,000+ tracks',
    detail: 'Created with AI',
    href: '/music-lab',
    icon: Music4,
  },
  {
    label: 'Field guide',
    detail: 'Open architecture',
    href: '/ai-architecture',
    icon: BookOpen,
  },
]

export function ConnectHero() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111214]/90 shadow-[0_40px_120px_-55px_rgba(16,185,129,0.45)]"
      >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(34,211,238,0.08),transparent_28%)]"
      />

      <div className="relative grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
            <span className="text-emerald-300">Frank Riemer · AI Architect</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" aria-hidden />
              Amsterdam · EMEA
            </span>
          </div>

          <h1 className="max-w-3xl font-display text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.25rem]">
            I build AI systems that turn expertise into{' '}
            <span className="text-emerald-300">leverage.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Former Oracle AI architect. I design agentic systems for experts, founders,
            and enterprise teams—then publish the architecture, tools, and experiments
            behind the work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/work-with-me"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 text-sm font-semibold text-[#07110d] transition-colors hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214]"
            >
              Work with me
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <SaveContactButton className="w-full sm:w-auto" />
            <AskAgentCTA className="w-full sm:w-auto" />
          </div>

          <p className="mt-5 max-w-xl text-xs leading-5 text-white/40">
            Independent project. Former role at Oracle; no current affiliation or
            endorsement is implied.
          </p>
        </div>

        <figure className="relative min-h-[360px] overflow-hidden border-t border-white/10 lg:min-h-[620px] lg:border-l lg:border-t-0">
          <Image
            src="/images/portraits/frank-presenting-oracle-2025.jpg"
            alt="Frank Riemer presenting an enterprise AI agent architecture in 2025"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[56%_center] grayscale-[0.12] contrast-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent lg:bg-gradient-to-r lg:from-[#111214]/30 lg:via-transparent lg:to-transparent"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
            <div>
              <p className="text-sm font-medium text-white">Architecture in the room</p>
              <p className="mt-1 text-xs text-white/58">
                Enterprise AI presentation · 2025
              </p>
            </div>
            <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 backdrop-blur">
              Real work
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="relative grid border-t border-white/10 sm:grid-cols-3">
        {PROOF.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 px-6 py-5 transition-colors hover:bg-white/[0.04] sm:px-8 ${
                index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-300">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{item.label}</span>
                <span className="mt-0.5 block text-xs text-white/50">{item.detail}</span>
              </span>
              <ArrowRight
                className="ml-auto h-3.5 w-3.5 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-white/65"
                aria-hidden
              />
            </Link>
          )
        })}
      </div>
      </motion.div>
    </MotionConfig>
  )
}
