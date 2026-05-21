'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Clock,
  ExternalLink,
  LinkIcon,
  StickyNote,
} from 'lucide-react'
import type { WorkshopModule } from '@/data/workshops'

type AccentColor = 'cyan' | 'violet' | 'amber'

const COLOR_MAP: Record<AccentColor, { circleBg: string; circleText: string; linkText: string; linkBg: string; linkBorder: string; linkHover: string }> = {
  cyan: {
    circleBg: 'bg-cyan-500/[0.12]',
    circleText: 'text-cyan-300',
    linkText: 'text-cyan-400',
    linkBg: 'bg-cyan-500/[0.08]',
    linkBorder: 'border-cyan-500/20',
    linkHover: 'hover:bg-cyan-500/[0.15]',
  },
  violet: {
    circleBg: 'bg-violet-500/[0.12]',
    circleText: 'text-violet-300',
    linkText: 'text-violet-300',
    linkBg: 'bg-violet-500/[0.08]',
    linkBorder: 'border-violet-500/20',
    linkHover: 'hover:bg-violet-500/[0.15]',
  },
  amber: {
    circleBg: 'bg-amber-500/[0.12]',
    circleText: 'text-amber-300',
    linkText: 'text-amber-400',
    linkBg: 'bg-amber-500/[0.08]',
    linkBorder: 'border-amber-500/20',
    linkHover: 'hover:bg-amber-500/[0.15]',
  },
}

export interface ModuleAccordionProps {
  module: WorkshopModule
  index: number
  /** Accent color for the number circle and resource link badges. Defaults to 'cyan'. */
  color?: AccentColor
  /** Initial open state. Defaults to index === 0 (first item). */
  defaultOpen?: boolean
}

export function ModuleAccordion({
  module,
  index,
  color = 'cyan',
  defaultOpen,
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? index === 0)
  const [showNotes, setShowNotes] = useState(false)
  const c = COLOR_MAP[color]

  const panelId = `module-accordion-panel-${index}`
  const buttonId = `module-accordion-button-${index}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
    >
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-inset"
      >
        <div
          className={`w-8 h-8 rounded-full ${c.circleBg} ${c.circleText} flex items-center justify-center text-sm font-semibold flex-shrink-0`}
          aria-hidden="true"
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white">{module.title}</h3>
          <p className="text-sm text-zinc-500 mt-0.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{module.duration}</span>
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed">{module.description}</p>

              {module.resources.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                    Key resources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {module.resources.map((res, i) => {
                      const isExternal = res.href.startsWith('http')
                      return (
                        <Link
                          key={i}
                          href={res.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${c.linkText} ${c.linkBg} border ${c.linkBorder} ${c.linkHover} transition-colors`}
                        >
                          {isExternal ? (
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          ) : (
                            <LinkIcon className="w-3 h-3" aria-hidden="true" />
                          )}
                          {res.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowNotes(!showNotes)
                  }}
                  aria-expanded={showNotes}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
                >
                  <StickyNote className="w-3.5 h-3.5" aria-hidden="true" />
                  {showNotes ? 'Hide' : 'Show'} facilitator notes
                </button>
                <AnimatePresence>
                  {showNotes && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/10">
                        <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wider mb-1.5">
                          Facilitator notes
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {module.instructorNotes}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
