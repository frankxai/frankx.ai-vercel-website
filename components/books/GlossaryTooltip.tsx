'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { GlossaryTerm } from '@/lib/glossary';

interface GlossaryTooltipProps {
  term: GlossaryTerm;
  bookSlug: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({
  term,
  bookSlug,
  children,
}: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        className="glossary-term text-current cursor-help"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-describedby={`glossary-${term.term.replace(/\s+/g, '-')}`}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`glossary-${term.term.replace(/\s+/g, '-')}`}
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{
              duration: 0.15,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none"
            style={{ width: 'max-content', maxWidth: '320px' }}
          >
            {/* Tooltip card with liquid glass styling */}
            <div
              className="relative rounded-xl px-4 py-3 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%), rgba(10,10,15,0.95)',
                backdropFilter: 'blur(32px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {/* Specular highlight */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                }}
              />

              {/* Content */}
              <div className="relative space-y-2">
                <div className="font-semibold text-white text-sm leading-tight">
                  {term.term}
                </div>
                <p className="text-white/75 text-xs leading-relaxed">
                  {term.definition}
                </p>
                {term.category && (
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                      {term.category}
                    </span>
                    <Link
                      href={`/books/${bookSlug}/glossary#${term.term.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-[10px] uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Full Definition →
                    </Link>
                  </div>
                )}
              </div>

              {/* Tooltip arrow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 -mt-px"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)',
                  backdropFilter: 'blur(32px)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
