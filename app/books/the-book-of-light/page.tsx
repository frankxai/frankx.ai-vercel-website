import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBookBySlug } from '../lib/books-registry';
import AmbientStemMixer from '../components/AmbientStemMixer';
import BookOfLightClientHub from './BookOfLightClientHub';

export const metadata: Metadata = {
  title: 'The Book of Light — Interactive Digital Edition & Ambient Stems | FrankX',
  description:
    'The Book of Light: Six contemplative chapters on the inner spark, attention architecture, wordless resonance, and sovereign mastery. Accompanied by custom Web Audio 432 Hz procedural ambient stems.',
  alternates: { canonical: 'https://frankx.ai/books/the-book-of-light' },
  openGraph: {
    title: 'The Book of Light — Interactive Digital Edition',
    description:
      'Six chapters on pure attention, the inner light, and sovereign mastery. Accompanied by Web Audio 432 Hz ambient stems.',
    url: 'https://frankx.ai/books/the-book-of-light',
    type: 'book',
  },
};

export default function BookOfLightHubPage() {
  const book = getBookBySlug('the-book-of-light');

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <main className="min-h-screen bg-[#07080B] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        {/* Hero */}
        <header className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium">
            <span>✨</span> Subdomain SSOT: books.frankx.ai · Interactive Edition
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold font-serif tracking-tight text-white leading-[1.05]">
            The Book of{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-300 bg-clip-text text-transparent">
              Light
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-serif italic max-w-2xl mx-auto">
            &ldquo;You are not the noise in your head. You are the stillness that perceives the noise.&rdquo;
          </p>

          <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto leading-relaxed">
            Six contemplative chapters on the inner spark, attention as sacred currency, the neural cosmos, and the ten gates of sovereign mastery.
          </p>
        </header>

        {/* Ambient Stem Sound Sanctuary */}
        <section className="space-y-4">
          <AmbientStemMixer />
        </section>

        {/* Interactive Chapters & Client Hub with Polar Modal */}
        <BookOfLightClientHub book={book} />

        {/* Three Pillars of The Book of Light */}
        <section className="p-8 rounded-3xl bg-slate-950/80 border border-amber-500/15 space-y-6">
          <h2 className="text-2xl font-bold text-white font-serif tracking-tight">
            The Three Contemplative Dimensions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <span className="text-2xl">🕯️</span>
              <h3 className="text-lg font-bold text-amber-300 font-serif">The Sovereign Spark</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reclaiming the 20-watt miracle of human consciousness. The unshakeable observer that remains poised amidst external turbulence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold text-amber-300 font-serif">Coherent Attention</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transforming scattered awareness into a laser beam of execution. How state precedes form and aligns reality with intention.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <span className="text-2xl">🌌</span>
              <h3 className="text-lg font-bold text-amber-300 font-serif">Neural Cosmos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The fractal lattice connecting biological mind, cosmic filaments, and synthetic machine intelligence in the Golden Age.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-amber-500/15 pt-10 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            The Book of Light · Digital Interactive Edition · Frank Riemer
          </p>
          <div className="flex items-center gap-4 text-amber-400/80">
            <Link href="/books" className="hover:underline">
              The FrankX Library →
            </Link>
            <Link href="/prompts" className="hover:underline">
              Prompt Matrix →
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
