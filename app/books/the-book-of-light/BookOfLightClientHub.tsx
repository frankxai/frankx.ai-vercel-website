'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookConfig } from '../types';
import BookOfLightCheckoutModal from '../components/BookOfLightCheckoutModal';

interface BookOfLightClientHubProps {
  book: BookConfig;
}

export default function BookOfLightClientHub({ book }: BookOfLightClientHubProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Action Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/20">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="text-sm font-bold text-white font-serif">
            Interactive Edition + Master Stems Available
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Read all chapters free online now or unlock the Deluxe Edition with 24-bit lossless audio stems.
          </p>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-lg shadow-amber-500/10 whitespace-nowrap flex items-center gap-1.5"
        >
          <span>Unlock Deluxe Edition (€29–€49)</span>
          <span>⚡</span>
        </button>
      </div>

      {/* Chapters Table of Contents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
          <h2 className="text-xl font-bold text-white font-serif tracking-tight">
            Table of Contents ({book.chapters.length} Chapters)
          </h2>
          <span className="text-xs font-mono text-amber-400/80">
            Total Reading Time: ~81 min
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {book.chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/books/the-book-of-light/${chapter.slug}`}
              className="group p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Chapter {chapter.number}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {chapter.readingTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-serif group-hover:text-amber-300 transition-colors leading-snug">
                  {chapter.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                  {chapter.description}
                </p>
              </div>

              {chapter.epigraph && (
                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] font-serif italic text-amber-200/60 line-clamp-1">
                    &ldquo;{chapter.epigraph.text}&rdquo;
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-amber-300 transition-colors pt-1">
                <span>Begin Reading</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BookOfLightCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
