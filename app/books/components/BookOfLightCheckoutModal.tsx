'use client';

import React, { useState } from 'react';

interface BookOfLightCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookOfLightCheckoutModal({
  isOpen,
  onClose,
}: BookOfLightCheckoutModalProps) {
  const [tier, setTier] = useState<'standard' | 'deluxe'>('deluxe');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const price = tier === 'deluxe' ? 49 : 29;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout/polar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: tier === 'deluxe' ? 'book-of-light-deluxe' : 'book-of-light-digital',
          email: email || undefined,
          originUrl: window.location.href,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.fallbackMode) {
        alert(
          `🌟 The Book of Light — Interactive Edition Unlocked!\n\n${data.message || 'Free preview access active. Polar checkout will be active on production credentials.'}`
        );
        onClose();
      } else {
        setError(data.error || 'Failed to initiate checkout. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07080B]/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0d0f15] border border-amber-500/20 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium">
            <span>✨</span> Interactive Digital Edition · Polar Protected
          </div>
          <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
            The Book of Light
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Six contemplative chapters on inner stillness, attention as sacred currency, and the architecture of sovereign reality + procedural ambient soundscapes.
          </p>
        </div>

        {/* Tier Selector */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setTier('standard')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
              tier === 'standard'
                ? 'bg-amber-950/20 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-serif font-bold text-white">Digital Edition</span>
              <span className="text-xs font-mono font-bold text-amber-400">€29</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Complete 6 interactive chapters + in-browser ambient stem player + PDF &amp; EPUB.
            </p>
          </div>

          <div
            onClick={() => setTier('deluxe')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
              tier === 'deluxe'
                ? 'bg-amber-950/30 border-amber-500/60 shadow-lg ring-1 ring-amber-500/40'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="absolute -top-2.5 right-3 bg-amber-400 text-slate-950 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
              Recommended
            </div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-serif font-bold text-white">Deluxe Master</span>
              <span className="text-xs font-mono font-bold text-amber-400">€49</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              Everything in Digital + lossless 24-bit master WAV stems + audio commentary.
            </p>
          </div>
        </div>

        {/* Inclusions */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">✓</span> 6 Complete Interactive Illustrated Chapters
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">✓</span> Real-Time Web Audio 432 Hz Ambient Stem Mixer
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">✓</span> Interactive Marginalia &amp; Quote Card Exporter
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">✓</span> Lifetime Updates &amp; Future Companion Audio
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email to receive reading access..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500 transition-colors font-mono"
          />

          {error && (
            <p className="text-xs text-rose-400 font-mono bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-tight transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Connecting to Polar...</span>
            ) : (
              <>
                <span>Secure Checkout with Polar (€{price})</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500 font-mono">
          🔒 Secured by Polar.sh · Immediate Access · 30-Day Guarantee
        </p>
      </div>
    </div>
  );
}
